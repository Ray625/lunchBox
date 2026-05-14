<script setup lang="ts">
import { ref } from 'vue'
import type { LunchOption } from '@/types/lunch'

const props = defineProps<{
  options: LunchOption[]
}>()

const emit = defineEmits<{
  pick: [option: LunchOption | null]
}>()

const pointerRef = ref<HTMLDivElement | null>(null)

const rotation = ref(0)
const isRolling = ref(false)
const displayOption = ref<LunchOption | null>(null)

const center = 100
const radius = 90

const colors = [
  '#f87171',
  '#fb923c',
  '#facc15',
  '#4ade80',
  '#2dd4bf',
  '#60a5fa',
  '#818cf8',
  '#a78bfa',
  '#f472b6',
  '#94a3b8',
]

function degToRad(deg: number) {
  return (deg * Math.PI) / 180
}

// 算出圖形的點x, y座標
function polarToCartesian(angle: number) {
  const rad = degToRad(angle - 90)

  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad),
  }
}

// 算出文字的x, y座標
function getTextPosition(index: number) {
  const sliceAngle = 360 / props.options.length
  const startAngle = index * sliceAngle
  const middleAngle = startAngle + sliceAngle / 2

  const textRadius = 65

  const rad = degToRad(middleAngle - 90)

  return {
    x: center + textRadius * Math.cos(rad),
    y: center + textRadius * Math.sin(rad),
  }
}

function createSlicePath(index: number) {
  if (props.options.length === 0) return ''

  const sliceAngle = 360 / props.options.length
  const startAngle = index * sliceAngle
  const endAngle = startAngle + sliceAngle

  const start = polarToCartesian(startAngle)
  const end = polarToCartesian(endAngle)

  const largeArcFlag = sliceAngle > 180 ? 1 : 0

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ')
}

function pickRandomOption() {
  if (props.options.length === 0) return null

  const index = Math.floor(Math.random() * props.options.length)
  const option = props.options[index]
  if (!option) return null

  return option
}

function getMiddleAngle(index: number) {
  const sliceAngle = 360 / props.options.length
  return index * sliceAngle + sliceAngle / 2
}

function getTextTransform(index: number) {
  const { x, y } = getTextPosition(index)
  const angle = getMiddleAngle(index)

  const readableAngle = angle > 90 && angle < 270 ? angle + 180 : angle

  return `rotate(${readableAngle}, ${x}, ${y})`
}

function spin() {
  if (props.options.length === 0 || isRolling.value) return

  isRolling.value = true
  displayOption.value = null

  const winnerIndex = Math.floor(Math.random() * props.options.length)
  const sliceAngle = 360 / props.options.length

  const startAngle = winnerIndex * sliceAngle

  const padding = sliceAngle * 0.08
  const targetAngle = startAngle + padding + Math.random() * (sliceAngle - padding * 2)

  const currentAngle = rotation.value % 360
  const diff = (targetAngle - currentAngle + 360) % 360

  const fullSpins = 360 * (Math.floor(Math.random() * 3) + 1)

  rotation.value += fullSpins + diff

  pointerRef.value?.addEventListener(
    'transitionend',
    (event) => {
      if (event.propertyName !== 'transform') return

      displayOption.value = props.options[winnerIndex] ?? null
      isRolling.value = false
    },
    { once: true },
  )
}

function startRoll() {
  if (props.options.length === 0 || isRolling.value) return

  isRolling.value = true

  let count = 0
  const maxCount = 20

  const timer = window.setInterval(() => {
    displayOption.value = pickRandomOption()
    count++

    if (count >= maxCount) {
      window.clearInterval(timer)

      const finalOption = pickRandomOption()
      displayOption.value = finalOption
      isRolling.value = false
      emit('pick', finalOption)
    }
  }, 80)
}
</script>
<template>
  <section class="picker">
    <div class="wheel-wrap">
      <svg viewBox="0 0 200 200" class="wheel">
        <path
          v-for="(option, index) in props.options"
          :key="option.id"
          :d="createSlicePath(index)"
          :fill="colors[index % colors.length]"
        />
        <text
          v-for="(option, index) in props.options"
          :key="`${option.id}-text`"
          :x="getTextPosition(index).x"
          :y="getTextPosition(index).y"
          :transform="getTextTransform(index)"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="white"
          font-size="18"
          font-weight="900"
        >
          {{ index + 1 }}
        </text>
        <circle
          v-if="props.options.length === 0"
          cx="100"
          cy="100"
          r="88"
          fill="#f3f4f6"
          stroke="#e5e7eb"
          stroke-width="2"
        />
        <text
          v-if="props.options.length === 0"
          x="100"
          y="100"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#9ca3af"
          font-size="10"
          font-weight="700"
        >
          等待選項
        </text>
      </svg>
      <div
        ref="pointerRef"
        class="pointer-rotator"
        :style="{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }"
      >
        <div class="pointer-triangle"></div>
      </div>
      <div class="wheel-center"></div>
    </div>
    <div class="picker-actions">
      <button type="button" @click="spin" :disabled="options.length === 0 || isRolling">
        {{ isRolling ? '旋轉中...' : '挑一個吧' }}
      </button>
      <p class="result" :class="{ pending: isRolling }">
        <template v-if="isRolling && displayOption">{{ displayOption.name }}</template>
        <template v-else-if="displayOption">今天吃：{{ displayOption.name }}</template>
        <template v-else>按下按鈕開始抽</template>
      </p>
    </div>
  </section>
</template>
<style scoped>
.picker {
  display: grid;
  gap: 22px;
  justify-items: center;
}

.wheel-wrap {
  position: relative;
  width: min(100%, 340px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffffff;
  box-shadow:
    inset 0 0 0 10px rgba(255, 255, 255, 0.72),
    0 18px 40px rgba(15, 23, 42, 0.16);
}

.pointer-rotator {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  z-index: 3;
  transition: transform 2s cubic-bezier(0.22, 1, 0.36, 1.05);
}

.pointer-triangle {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 44px solid #111827;
  filter: drop-shadow(0 3px 3px rgba(15, 23, 42, 0.24));
  transform: translate(-50%, -100%);
}

.wheel {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.wheel-center {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 5;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  box-shadow:
    0 0 0 4px #111827,
    0 6px 14px rgba(15, 23, 42, 0.26);
  transform: translate(-50%, -50%);
}

.picker-actions {
  display: grid;
  width: 100%;
  gap: 12px;
  justify-items: center;
}

button {
  width: min(100%, 260px);
  min-height: 54px;
  border: 0;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, #f97316, #ef4444);
  font-size: 1.08rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 14px 28px rgba(239, 68, 68, 0.24);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    box-shadow 0.18s ease;
}

button:hover:not(:disabled) {
  box-shadow: 0 18px 34px rgba(239, 68, 68, 0.3);
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.result {
  min-height: 44px;
  margin: 0;
  border-radius: 14px;
  padding: 10px 16px;
  color: #111827;
  background: #fff7ed;
  font-weight: 900;
  text-align: center;
}

.result.pending {
  color: #f97316;
}
</style>
