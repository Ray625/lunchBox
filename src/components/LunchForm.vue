<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  add: [name: string]
}>()

const name = ref('')

function handleSumbit() {
  const value = name.value.trim()

  if (!value) return

  emit('add', value)
  name.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSumbit">
    <input v-model="name" type="text" placeholder="輸入午餐選項" />
    <button type="submit">新增</button>
  </form>
</template>
