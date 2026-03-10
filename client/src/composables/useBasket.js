/**
 * useBasket.js — shared basket state persisted to localStorage + backend sync
 */
import { ref, watch, computed } from 'vue'

const STORAGE_KEY = 'sb_basket'
const API_BASE = 'http://localhost:8080/api'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem('sb_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Module-level reactive state (shared across all components)
const items = ref(loadFromStorage())

// Debounce timer for backend sync
let syncTimer = null

function syncToBackend() {
  const user = getCurrentUser()
  if (!user?.userId) return

  clearTimeout(syncTimer)
  syncTimer = setTimeout(async () => {
    try {
      await fetch(`${API_BASE}/users/${user.userId}/basket`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.value })
      })
    } catch (e) {
      console.error('Basket sync failed', e)
    }
  }, 600)
}

// Persist to localStorage + sync to backend on every change
watch(items, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  syncToBackend() //keeps server in sync
}, { deep: true })

export function useBasket() {
  const basketCount = computed(() => items.value.reduce((sum, i) => sum + i.quantity, 0))

  /**
   * Called on login — loads basket from backend and merges with localStorage.
   * Backend is source of truth; localStorage items not in backend are discarded.
   */
  async function loadFromBackend(userId) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/basket`) //fetch from PUT
      if (!res.ok) return
      const backendItems = await res.json()
      if (Array.isArray(backendItems) && backendItems.length > 0) {
        items.value = backendItems
      }
      // If backend is empty but localStorage has items, keep localStorage (first login on new device)
      // Backend will be synced on next change
    } catch (e) {
      console.error('Failed to load basket from backend', e)
    }
  }

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value = [...items.value, { ...product, quantity: 1 }]
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function increaseQty(id) {
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity++
  }

  function decreaseQty(id) {
    const item = items.value.find(i => i.id === id)
    if (item && item.quantity > 1) item.quantity--
    else if (item && item.quantity === 1) removeItem(id)
  }

  function clearBasket() {
    items.value = []
  }

  function loadItems(newItems) {
  items.value = newItems
}

  return { items, basketCount, addItem, removeItem, increaseQty, decreaseQty, clearBasket, loadFromBackend, loadItems }
}