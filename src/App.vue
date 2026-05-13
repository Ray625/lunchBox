<script setup lang="ts">
import { ref } from 'vue'
import LunchList from './components/LunchList.vue'
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
</script>

<template>
  <main>
    <h1>午餐選擇器</h1>

    <LunchList :options="lunchOptions" />
  </main>
</template>

<style scoped></style>
