<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  optionCount: number
  maxOptions: number
}>()

const emit = defineEmits<{
  add: [name: string]
}>()

const name = ref('')
const message = ref('')

const isFull = computed(() => props.optionCount >= props.maxOptions)

watch(
  () => props.optionCount,
  () => {
    if (!isFull.value) message.value = ''
  },
)

function handleSubmit() {
  const value = name.value.trim()

  if (!value) return
  if (isFull.value) {
    message.value = `最多只能放 ${props.maxOptions} 個選項，先刪掉一個再新增。`
    return
  }

  emit('add', value)
  name.value = ''
  message.value = ''
}
</script>

<template>
  <form class="lunch-form" @submit.prevent="handleSubmit">
    <div class="field-row">
      <input
        v-model="name"
        type="text"
        placeholder="輸入午餐選項"
        :aria-invalid="isFull && !!message"
      />
      <button type="submit">新增</button>
    </div>
    <p v-if="message" class="limit-message">{{ message }}</p>
  </form>
</template>

<style scoped>
.lunch-form {
  margin-bottom: 16px;
}

.field-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

input {
  width: 100%;
  min-height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  padding: 0 15px;
  color: #111827;
  background: #ffffff;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input::placeholder {
  color: #9ca3af;
}

input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.14);
}

input[aria-invalid='true'] {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.12);
}

button {
  min-height: 48px;
  border: 0;
  border-radius: 14px;
  padding: 0 18px;
  color: white;
  background: #111827;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

button:hover {
  background: #f97316;
  box-shadow: 0 10px 20px rgba(249, 115, 22, 0.22);
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

.limit-message {
  margin: 8px 0 0;
  font-size: 0.82rem;
  font-weight: 800;
}

.limit-message {
  color: #dc2626;
}

@media (max-width: 360px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
</style>
