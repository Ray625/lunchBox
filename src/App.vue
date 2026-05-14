<script setup lang="ts">
import { ref, watch } from 'vue'
import LunchList from './components/LunchList.vue'
import LunchForm from './components/LunchForm.vue'
import LunchPicker from './components/LunchPicker.vue'
import type { LunchOption } from './types/lunch'

import { saveLunchOptions, loadLunchOptions } from './utils/storage'

const MAX_OPTIONS = 10

const lunchOptions = ref<LunchOption[]>(loadLunchOptions().slice(0, MAX_OPTIONS))
const selectedOptionId = ref<string | null>(null)

function addLunchOption(name: string) {
  if (lunchOptions.value.length >= MAX_OPTIONS) return

  const option: LunchOption = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    weight: 1,
  }

  lunchOptions.value.push(option)
}

function deleteLunchOption(id: string) {
  lunchOptions.value = lunchOptions.value.filter((option) => {
    return option.id !== id
  })

  if (selectedOptionId.value === id) {
    selectedOptionId.value = null
  }
}

function selectLunchOption(option: LunchOption | null) {
  selectedOptionId.value = option?.id ?? null
}

watch(
  lunchOptions,
  (value) => {
    saveLunchOptions(value)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <main>
    <section class="app-shell">
      <header class="app-header">
        <p>午餐輪盤</p>
        <span class="option-count">{{ lunchOptions.length }}/{{ MAX_OPTIONS }}</span>
      </header>

      <LunchForm
        :option-count="lunchOptions.length"
        :max-options="MAX_OPTIONS"
        @add="addLunchOption"
      />

      <LunchList
        :options="lunchOptions"
        :selected-option-id="selectedOptionId"
        @delete="deleteLunchOption"
      />
      <LunchPicker :options="lunchOptions" @pick="selectLunchOption" />
    </section>
  </main>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  color: #1f2937;
  background:
    radial-gradient(circle at top left, rgba(250, 204, 21, 0.2), transparent 32rem),
    linear-gradient(135deg, #fff7ed 0%, #f8fafc 48%, #eff6ff 100%);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

:global(button),
:global(input) {
  font: inherit;
}

main {
  display: grid;
  min-height: 100vh;
  padding: 28px 16px;
  place-items: center;
}

.app-shell {
  width: min(100%, 440px);
  padding: 28px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(14px);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.app-header p {
  margin: 0;
  color: #f97316;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.option-count {
  color: #9ca3af;
  font-size: 0.9rem;
  font-weight: 900;
}

@media (max-width: 420px) {
  main {
    padding: 14px;
  }

  .app-shell {
    padding: 22px 18px;
    border-radius: 22px;
  }
}
</style>
