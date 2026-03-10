import { ref, computed } from 'vue'
import { useBasket } from '@/composables/useBasket.js'

const STORAGE_KEY = 'sb_user'

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const user = ref(loadUser())

export function useAuth() {
  const { loadFromBackend, clearBasket } = useBasket()
  const isLoggedIn = computed(() => user.value !== null)

  async function setUser(userData) {
    user.value = userData
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    // Load this user's saved basket from backend, merging with any local items
    if (userData?.userId) {
      await loadFromBackend(userData.userId)
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
    clearBasket()
  }

  return { user, isLoggedIn, setUser, logout }
}