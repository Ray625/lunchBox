<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  optionCount: number
  maxOptions: number
}>()

const emit = defineEmits<{
  add: [payload: { name: string; weight: number }]
}>()

const name = ref('')
const weight = ref(1)
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

  emit('add', {
    name: value,
    weight: weight.value,
  })
  name.value = ''
  weight.value = 1
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
      <div class="weight-field">
        <label for="lunch-weight">機率</label>
        <select id="lunch-weight" v-model.number="weight">
          <option :value="0.5">x0.5</option>
          <option :value="1">x1</option>
          <option :value="2">x2</option>
          <option :value="3">x3</option>
          <option :value="4">x4</option>
          <option :value="5">x5</option>
        </select>
      </div>
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
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 10px;
}

.weight-field {
  display: inline-grid;
  grid-template-columns: auto 82px;
  align-items: center;
  gap: 6px;
}

label {
  color: #6b7280;
  font-size: 0.78rem;
  font-weight: 900;
  white-space: nowrap;
}

input,
select {
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

select {
  appearance: none;
  background:
    linear-gradient(45deg, transparent 50%, #6b7280 50%) right 15px center / 6px 6px no-repeat,
    linear-gradient(135deg, #6b7280 50%, transparent 50%) right 10px center / 6px 6px no-repeat,
    #ffffff;
  cursor: pointer;
  font-weight: 800;
  padding-right: 28px;
}

input::placeholder {
  color: #9ca3af;
}

input:focus,
select:focus {
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
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
  }

  .weight-field {
    grid-template-columns: auto 76px;
    gap: 5px;
  }

  input,
  select,
  button {
    min-height: 44px;
  }

  input {
    padding: 0 12px;
  }

  select {
    padding-left: 10px;
    padding-right: 24px;
  }

  button {
    padding: 0 14px;
  }
}
</style>
