<template>
  <div class="page-content">
    <div class="container">
      <div class="profile-wrap">

        <!-- Left: profile card -->
        <div class="profile-card card">
          <div class="profile-avatar">{{ avatarInitial }}</div>
          <h1 class="profile-username">{{ user.username }}</h1>
          <p class="profile-email">{{ user.email }}</p>

          <nav class="profile-nav">
            <button :class="['nav-btn', activeTab === 'lists' && 'active']" @click="activeTab = 'lists'">
              🛒 Shopping Lists
            </button>
            <button :class="['nav-btn', activeTab === 'settings' && 'active']" @click="activeTab = 'settings'">
              ⚙️ Account Settings
            </button>
          </nav>

          <button class="logout-btn" @click="handleLogout">Log out</button>
        </div>

        <!-- Right: tab content -->
        <div class="profile-section">

          <!-- Shopping Lists tab -->
          <div v-if="activeTab === 'lists'">
            <h2 class="profile-section-title">Shopping Lists</h2>
            <p v-if="loadingLists" class="profile-hint">Loading...</p>
            <p v-else-if="!shoppingLists.length" class="profile-hint">
              No saved lists yet. Add items to your basket and click "Save as Shopping List".
            </p>
            <div v-else class="lists-grid">
              <div v-for="list in shoppingLists" :key="list.id" class="list-card card">
                <div class="list-card-header">
                  <div>
                    <p class="list-name">{{ list.name }}</p>
                    <p class="list-meta">{{ list.items.length }} items · {{ formatDate(list.savedAt) }}</p>
                  </div>
                  <div class="list-actions">
                    <button class="btn btn-outline btn-sm" @click="loadList(list)">Load</button>
                    <button class="delete-btn" @click="deleteList(list.id)">✕</button>
                  </div>
                </div>
                <div class="list-items-preview">
                  <span v-for="item in list.items.slice(0, 4)" :key="item.id" class="preview-chip">
                    {{ item.name }}
                  </span>
                  <span v-if="list.items.length > 4" class="preview-chip muted">+{{ list.items.length - 4 }} more</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Settings tab -->
          <div v-if="activeTab === 'settings'">
            <h2 class="profile-section-title">Account Settings</h2>
            <div class="settings-card card">
              <div class="settings-field">
                <label>Username</label>
                <input v-model="settingsForm.username" class="input" type="text" />
              </div>
              <div class="settings-field">
                <label>Email</label>
                <input v-model="settingsForm.email" class="input" type="email" />
              </div>
              <div class="settings-divider"></div>
              <p class="settings-label">Change Password</p>
              <div class="settings-field">
                <label>New Password</label>
                <input v-model="settingsForm.newPassword" class="input" type="password" placeholder="Leave blank to keep current" />
              </div>
              <div class="settings-field">
                <label>Confirm Password</label>
                <input v-model="settingsForm.confirmPassword" class="input" type="password" />
              </div>
              <p v-if="settingsError" class="settings-error">{{ settingsError }}</p>
              <p v-if="settingsSuccess" class="settings-success">{{ settingsSuccess }}</p>
              <button class="btn btn-primary" @click="saveSettings" :disabled="savingSettings">
                {{ savingSettings ? 'Saving…' : 'Save Changes' }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import { useAuth } from '@/composables/useAuth.js'
import { useBasket } from '@/composables/useBasket.js'

const router = useRouter()
const { user, logout } = useAuth()
const { loadItems } = useBasket()

const activeTab = ref('lists')
const avatarInitial = computed(() => user.value?.username?.charAt(0).toUpperCase() || '?')

// --- Shopping Lists ---
const shoppingLists = ref([])
const loadingLists = ref(false)

async function fetchLists() {
  if (!user.value) return
  loadingLists.value = true
  try {
    const res = await fetch(`http://localhost:8080/api/users/${user.value.userId}/shopping-lists`)
    shoppingLists.value = await res.json()
  } catch (e) {
    console.error('Failed to load shopping lists', e)
  } finally {
    loadingLists.value = false
  }
}

async function deleteList(listId) {
  if (!confirm('Delete this list?')) return
  shoppingLists.value = shoppingLists.value.filter(l => l.id !== listId)
  await fetch(`http://localhost:8080/api/users/${user.value.userId}/shopping-lists`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lists: shoppingLists.value })
  })
}

function loadList(list) {
  // Load list items into basket
  loadItems(list.items)
  router.push('/basket')
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// --- Account Settings ---
const settingsForm = ref({ username: '', email: '', newPassword: '', confirmPassword: '' })
const settingsError = ref('')
const settingsSuccess = ref('')
const savingSettings = ref(false)

function initSettings() {
  settingsForm.value.username = user.value?.username || ''
  settingsForm.value.email = user.value?.email || ''
}

async function saveSettings() {
  settingsError.value = ''
  settingsSuccess.value = ''

  if (settingsForm.value.newPassword && settingsForm.value.newPassword !== settingsForm.value.confirmPassword) {
    settingsError.value = 'Passwords do not match.'
    return
  }

  savingSettings.value = true
  try {
    const body = {
      username: settingsForm.value.username,
      email: settingsForm.value.email,
      ...(settingsForm.value.newPassword && { newPassword: settingsForm.value.newPassword })
    }
    const res = await fetch(`http://localhost:8080/api/users/${user.value.userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(await res.text())
    settingsSuccess.value = 'Changes saved!'
    settingsForm.value.newPassword = ''
    settingsForm.value.confirmPassword = ''
  } catch (e) {
    settingsError.value = e.message || 'Failed to save changes.'
  } finally {
    savingSettings.value = false
  }
}

function handleLogout() {
  logout()
  router.push('/')
}

onMounted(() => {
  fetchLists()
  initSettings()
})
</script>

<style scoped>
.profile-wrap {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-10);
  padding: var(--space-10) 0 var(--space-16);
  align-items: start;
}

/* Left card */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-8);
  text-align: center;
  position: sticky;
  top: calc(var(--header-height) + var(--space-6));
}
.profile-avatar {
  width: 80px; height: 80px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-extrabold);
  display: flex; align-items: center; justify-content: center;
}
.profile-username { font-size: var(--font-size-xl); color: var(--color-dark); }
.profile-email { font-size: var(--font-size-sm); color: var(--color-grey-500); margin-top: calc(-1 * var(--space-1)); }

.profile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  margin-top: var(--space-2);
}
.nav-btn {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  border: none;
  background: none;
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-700);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}
.nav-btn:hover { background: var(--color-grey-100); }
.nav-btn.active { background: var(--color-primary); color: var(--color-white); }

.logout-btn {
  margin-top: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: none;
  color: var(--color-danger);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.logout-btn:hover { background: #fef2f2; border-color: var(--color-danger); }

/* Section */
.profile-section-title {
  font-size: var(--font-size-xl);
  color: var(--color-dark);
  margin-bottom: var(--space-5);
}
.profile-hint { font-size: var(--font-size-sm); color: var(--color-grey-500); }

/* Lists */
.lists-grid { display: flex; flex-direction: column; gap: var(--space-4); }
.list-card { padding: var(--space-4) var(--space-5); }
.list-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-4); margin-bottom: var(--space-3); }
.list-name { font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); color: var(--color-dark); }
.list-meta { font-size: var(--font-size-xs); color: var(--color-grey-500); margin-top: var(--space-1); }
.list-actions { display: flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }
.btn-sm { padding: var(--space-1) var(--space-3); font-size: var(--font-size-xs); }
.delete-btn {
  width: 28px; height: 28px;
  border-radius: var(--radius-full);
  border: none; background: none;
  color: var(--color-grey-400);
  cursor: pointer; font-size: var(--font-size-sm);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--transition-fast);
}
.delete-btn:hover { background: #fef2f2; color: var(--color-danger); }
.list-items-preview { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.preview-chip {
  font-size: var(--font-size-xs);
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
  background: var(--color-grey-100);
  color: var(--color-grey-700);
}
.preview-chip.muted { color: var(--color-grey-400); }

/* Settings */
.settings-card { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); }
.settings-field { display: flex; flex-direction: column; gap: var(--space-1); }
.settings-field label { font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-grey-700); }
.input {
  padding: var(--space-2) var(--space-3);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-dark);
  outline: none;
  transition: border-color var(--transition-fast);
}
.input:focus { border-color: var(--color-primary); }
.settings-divider { border: none; border-top: 1px solid var(--color-border); margin: var(--space-2) 0; }
.settings-label { font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-dark); margin-bottom: calc(-1 * var(--space-2)); }
.settings-error { font-size: var(--font-size-sm); color: var(--color-danger); }
.settings-success { font-size: var(--font-size-sm); color: var(--color-success); }

@media (max-width: 768px) {
  .profile-wrap { grid-template-columns: 1fr; }
  .profile-card { position: static; }
}
</style>