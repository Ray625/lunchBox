<script setup lang="ts">
import type { LunchOption } from '@/types/lunch'

defineProps<{
  options: LunchOption[]
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()
</script>
<template>
  <ul>
    <li v-for="option in options" :key="option.id">
      {{ option.name }}
      <button type="button" @click="emit('delete', option.id)">刪除</button>
    </li>
  </ul>
</template>
