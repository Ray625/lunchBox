import type { LunchOption } from '@/types/lunch'

const STORAGE_KEY = 'lunch-options'

export function saveLunchOptions(options: LunchOption[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(options))
}

export function loadLunchOptions(): LunchOption[] {
  const data = localStorage.getItem(STORAGE_KEY)

  if (!data) return []

  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}
