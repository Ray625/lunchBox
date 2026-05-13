<script setup lang="ts">
import { ref, watch } from 'vue'
import LunchList from './components/LunchList.vue'
import LunchForm from './components/LunchForm.vue'
import LunchPicker from './components/LunchPicker.vue'
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

function deleteLunchOption(id: string) {
  lunchOptions.value = lunchOptions.value.filter((option) => {
    return option.id !== id
  })
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
    <h2>哩賈霸未</h2>

    <LunchForm @add="addLunchOption" />

    <LunchList :options="lunchOptions" @delete="deleteLunchOption" />
    <LunchPicker :options="lunchOptions" />
  </main>
</template>

<style scoped></style>
