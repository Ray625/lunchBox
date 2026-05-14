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
  <ul v-if="options.length > 0" class="lunch-list">
    <li v-for="option in options" :key="option.id">
      <span>{{ option.name }}</span>
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

span {
  min-width: 0;
  overflow: hidden;
  color: #374151;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

button {
  display: grid;
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  margin-left: 8px;
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
