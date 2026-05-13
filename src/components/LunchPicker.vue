<script setup lang="ts">
import type { LunchOption } from '@/types/lunch'

const props = defineProps<{
  options: LunchOption[]
}>()

const emit = defineEmits<{
  pick: [option: LunchOption]
}>()

function pickRandom() {
  if (props.options.length === 0) return

  const index = Math.floor(Math.random() * props.options.length)
  const option = props.options[index]
  if (!option) return

  emit('pick', option)
}
</script>
<template>
  <button type="button" @click="pickRandom" :disabled="options.length === 0">挑一個吧</button>
</template>
