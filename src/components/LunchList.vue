<script setup lang="ts">
import type { LunchOption } from '@/types/lunch'

defineProps<{
  options: LunchOption[]
}>()
</script>
<template>
  <ul>
    <li v-for="option in options" :key="option.id">
      {{ option.name }}
    </li>
  </ul>
</template>
