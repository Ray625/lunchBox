<script setup lang="ts">
import type { LunchOption } from '@/types/lunch'

defineProps<{
  options: LunchOption[]
  selectedOptionId: string | null
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()
</script>
<template>
  <ul v-if="options.length > 0" class="lunch-list">
    <li
      v-for="(option, index) in options"
      :key="option.id"
      :class="{ selected: option.id === selectedOptionId }"
    >
      <span class="option-index">{{ index + 1 }}</span>
      <span>{{ option.name }}</span>
      <span class="option-weight">x{{ option.weight }}</span>
      <button type="button" :aria-label="`刪除 ${option.name}`" @click="emit('delete', option.id)">
        ×
      </button>
    </li>
  </ul>
  <p v-else class="empty-state">先新增幾個午餐選項</p>
</template>

<style scoped>
.lunch-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 22px;
  padding: 0;
  list-style: none;
}

li {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 5px 6px 5px 14px;
  background: #f9fafb;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

li.selected {
  border-color: #f97316;
  background: #fff7ed;
  box-shadow:
    0 0 0 3px rgba(249, 115, 22, 0.16),
    0 8px 18px rgba(249, 115, 22, 0.16);
}

.option-index {
  display: grid;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 999px;
  color: white;
  background: #f97316;
  font-size: 0.82rem;
  font-weight: 900;
  line-height: 1;
  place-items: center;
}

span {
  min-width: 0;
  overflow: hidden;
  color: #374151;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option-weight {
  flex: 0 0 auto;
  margin-left: 4px;
  border-radius: 999px;
  padding: 3px 7px;
  color: #6b7280;
  background: #ffffff;
  font-size: 0.72rem;
  font-weight: 900;
}

button {
  display: grid;
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  margin-left: 4px;
  border: 0;
  border-radius: 999px;
  padding: 0;
  color: #6b7280;
  background: #ffffff;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1;
  cursor: pointer;
  place-items: center;
  transition:
    color 0.18s ease,
    background 0.18s ease;
}

button:hover {
  color: #b91c1c;
  background: #fee2e2;
}

.empty-state {
  margin: 0 0 22px;
  border: 1px dashed #d1d5db;
  border-radius: 16px;
  padding: 18px;
  color: #6b7280;
  background: rgba(249, 250, 251, 0.7);
  text-align: center;
}
</style>
