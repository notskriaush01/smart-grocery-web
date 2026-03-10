<template>
  <header class="app-header" :class="{ 'header--scrolled': scrolled }">
    <div class="container header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <span class="logo-icon">🛒</span>
        <span class="logo-text">smartbasket</span>
      </RouterLink>

      <!-- Nav -->
      <nav class="header-nav">
        <div class="nav-dropdown" @click="toggleCategories" v-click-outside="closeCategories">
          <button class="nav-link nav-link--dropdown">
            All Categories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          <div class="dropdown-menu" v-if="categoriesOpen">
            <RouterLink
              v-for="cat in categories"
              :key="cat.slug"
              :to="`/category/${cat.slug}`"
              class="dropdown-item"
              @click="closeCategories"
            >{{ cat.name }}</RouterLink>
          </div>
        </div>
        <RouterLink to="/recipes" class="nav-link">Recipes</RouterLink>
        <RouterLink to="/how-to-use" class="nav-link">How to Use</RouterLink>
      </nav>

      <!-- Search (hidden on mobile, shown via prop or breakpoint) -->
      <div class="header-search" v-if="showSearch">
        <div class="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for products.."
            @keyup.enter="handleSearch"
          />
          <button class="search-submit" @click="handleSearch" aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="header-actions">
        <button class="icon-btn" v-if="!showSearch" @click="$emit('toggle-search')" title="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>

        <button class="icon-btn" @click="handleProfileClick" title="Account">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>

        <RouterLink to="/basket" class="icon-btn" title="Basket">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span class="badge-count" v-if="basketCount > 0">{{ basketCount }}</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import { useRouter } from 'vue-router'

const { isLoggedIn } = useAuth()
const router = useRouter()

const props = defineProps({
  showSearch: { type: Boolean, default: true },
  basketCount: { type: Number, default: 0 }
})

const emit = defineEmits(['toggle-search', 'open-auth'])

function handleProfileClick() {
  if (isLoggedIn.value) {
    router.push('/profile')
  } else {
    emit('open-auth')
  }
}
const scrolled = ref(false)
const categoriesOpen = ref(false)
const searchQuery = ref('')

const categories = [
  { name: 'Fresh Food',          slug: 'fresh-food' },
  { name: 'Bakery',              slug: 'bakery' },
  { name: 'Dairy & Eggs',        slug: 'dairy-eggs' },
  { name: 'Meat & Seafood',      slug: 'meat-seafood' },
  { name: 'Frozen Food',         slug: 'frozen-food' },
  { name: 'Pantry Items',        slug: 'pantry-items' },
  { name: 'Snacks & Beverages',  slug: 'snacks-beverages' },
]

function toggleCategories() {
  categoriesOpen.value = !categoriesOpen.value
}
function closeCategories() {
  categoriesOpen.value = false
}
function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}
function handleScroll() {
  scrolled.value = window.scrollY > 10
}

// Custom directive workaround
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) binding.value()
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: var(--color-white);
  border-bottom: 1.5px solid var(--color-border);
  transition: box-shadow var(--transition-base);
}

.header--scrolled {
  box-shadow: var(--shadow-md);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  height: 100%;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  flex-shrink: 0;
}
.logo-icon {
  font-size: var(--font-size-xl);
}
.logo-text {
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-dark);
  letter-spacing: -0.5px;
}

/* Nav */
.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex-shrink: 0;
}
.nav-link {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-700);
  text-decoration: none;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
}
.nav-link:hover,
.router-link-active.nav-link {
  color: var(--color-primary);
  background: var(--color-primary-subtle);
}

/* Dropdown */
.nav-dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: calc(100% + var(--space-2));
  left: 0;
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
  padding: var(--space-2);
  z-index: 200;
}
.dropdown-item {
  display: block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.dropdown-item:hover {
  background: var(--color-primary-subtle);
  color: var(--color-primary);
}

/* Search */
.header-search {
  flex: 1;
  max-width: 340px;
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.search-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-full);
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.search-submit:hover {
  background: var(--color-primary-dark);
}

@media (max-width: 768px) {
  .header-nav { display: none; }
  .header-search { display: none; }
}
</style> 