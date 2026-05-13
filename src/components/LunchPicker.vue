<script setup lang="ts">
import { ref } from 'vue'
import type { LunchOption } from '@/types/lunch'

const props = defineProps<{
  options: LunchOption[]
}>()

const emit = defineEmits<{
  pick: [option: LunchOption | null]
}>()

const isRolling = ref(false)
const displayOption = ref<LunchOption | null>(null)

function pickRandomOption() {
  if (props.options.length === 0) return null

  const index = Math.floor(Math.random() * props.options.length)
  const option = props.options[index]
  if (!option) return null

  return option
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
  <section>
    <button type="button" @click="startRoll" :disabled="options.length === 0 || isRolling">
      {{ isRolling ? '選擇中...' : '挑一個吧' }}
    </button>
    <p v-if="isRolling && displayOption">
      {{ displayOption.name }}
    </p>
    <p v-if="displayOption && !isRolling">今天吃: {{ displayOption.name }}</p>
  </section>
</template>
