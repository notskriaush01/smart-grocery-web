<template>
  <div class="page-content">
    <div class="container">
      <div class="search-header">
        <h1 class="search-title">
          Results for <span class="search-accent">"{{ query }}"</span>
        </h1>
        <p class="search-meta" v-if="!loading">{{ products.length }} product{{ products.length !== 1 ? 's' : '' }} found</p>
      </div>

      <!-- Search bar (repeat for UX) -->
      <div class="search-bar search-inline">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          v-model="localQuery"
          type="text"
          placeholder="Search for..."
          @keyup.enter="runSearch"
        />
        <button class="btn btn-primary btn-sm" @click="runSearch">Search</button>
      </div>

      <!-- Results -->
      <div v-if="loading" class="products-grid">
        <div v-for="n in 8" :key="n" class="product-skeleton card"></div>
      </div>

      <div v-else-if="products.length" class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-basket="addToBasket"
        />
      </div>

      <div v-else class="empty-state">
        <p>No results for "{{ query }}". Try a different search term.</p>
        <RouterLink to="/" class="btn btn-primary" style="margin-top:var(--space-4)">Back to Home</RouterLink>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'
import { productService } from '@/services/api.js'

const route = useRoute()
const router = useRouter()

const query = ref(route.query.q || '')
const localQuery = ref(query.value)
const loading = ref(false)
const products = ref([])

async function runSearch() {
  if (!localQuery.value.trim()) return
  router.push({ path: '/search', query: { q: localQuery.value.trim() } })
}

async function fetchResults(q) {
  if (!q) return
  loading.value = true
  try {
    const res = await productService.search(q)
    products.value = res.content || []
  } catch {
    products.value = []
  } finally {
    loading.value = false
  }
}

import { useBasket } from '@/composables/useBasket.js'
const { addItem } = useBasket()

function addToBasket(product) {
  addItem(product)
}

// Re-fetch when query param changes
watch(() => route.query.q, (q) => {
  query.value = q || ''
  localQuery.value = q || ''
  fetchResults(q)
})

onMounted(() => fetchResults(query.value))
</script>

<style scoped>
.search-header {
  padding: var(--space-10) 0 var(--space-4);
}
.search-title {
  font-size: var(--font-size-3xl);
  color: var(--color-dark);
  margin-bottom: var(--space-2);
}
.search-accent {
  color: var(--color-primary);
}
.search-meta {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
}

.search-inline {
  margin-bottom: var(--space-8);
  max-width: 500px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-5);
  margin-bottom: var(--space-12);
}

.product-skeleton {
  aspect-ratio: 0.75;
  background: linear-gradient(90deg, var(--color-grey-100) 25%, var(--color-grey-50) 50%, var(--color-grey-100) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>