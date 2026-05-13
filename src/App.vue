<script setup lang="ts">
import { ref, watch } from 'vue'
import LunchList from './components/LunchList.vue'
import LunchForm from './components/LunchForm.vue'
import type { LunchOption } from './types/lunch'

import { saveLunchOptions, loadLunchOptions } from './utils/storage'

const lunchOptions = ref<LunchOption[]>(loadLunchOptions())

function addLunchOption(name: string) {
  const option: LunchOption = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    weight: 1,
  }

  lunchOptions.value.push(option)
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
    <h1>午餐選擇器</h1>

    <LunchForm @add="addLunchOption" />

    <LunchList :options="lunchOptions" />
  </main>
</template>

<style scoped></style>
