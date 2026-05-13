<script setup lang="ts">
import { ref } from 'vue'
import LunchList from './components/LunchList.vue'
import LunchForm from './components/LunchForm.vue'
import type { LunchOption } from './types/lunch'

const lunchOptions = ref<LunchOption[]>([
  {
    id: '1',
    name: '八方雲集',
    createdAt: Date.now(),
    weight: 1,
  },
  {
    id: '2',
    name: '韓式',
    createdAt: Date.now(),
    weight: 1,
  },
  {
    id: '3',
    name: '燒臘',
    createdAt: Date.now(),
    weight: 1,
  },
])

function addLunchOption(name: string) {
  const option: LunchOption = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    weight: 1,
  }

  lunchOptions.value.push(option)
}
</script>

<template>
  <main>
    <h1>午餐選擇器</h1>

    <LunchForm @add="addLunchOption" />

    <LunchList :options="lunchOptions" />
  </main>
</template>

<style scoped></style>
