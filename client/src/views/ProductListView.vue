<template>
  <div class="page-content">
    <div class="container">
      <h1 class="list-title">{{ categoryName }}</h1>

      <!-- Filters row -->
      <div class="filters-row">
        <div class="search-bar filters-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Search in category..." />
        </div>
        <select class="sort-select" v-model="sortBy">
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name A–Z</option>
        </select>
      </div>

      <!-- Grid -->
      <div v-if="loading" class="products-grid">
        <div v-for="n in 12" :key="n" class="product-skeleton card"></div>
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
        <p>No products found in this category.</p>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
        <button
          v-for="p in totalPages"
          :key="p"
          :class="{ active: p === currentPage }"
          @click="goToPage(p)"
        >{{ p }}</button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'
import { productService } from '@/services/api.js'
import { useBasket } from '@/composables/useBasket.js'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const products = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const sortBy = ref('price_asc')

const CATEGORY_NAMES = {
  'meat-seafood': 'Meat & Seafood',
  'dairy-eggs': 'Dairy & Eggs',
  'bakery-bread': 'Bakery & Bread',
  'fresh-food': 'Fresh Food',
  'frozen-food': 'Frozen Food',
  'snacks-beverages': 'Snacks & Beverages',
}

const categorySlug = computed(() => route.params.slug || '')
const categoryName = computed(() => {
  if (!categorySlug.value) return 'All Products'
  if (CATEGORY_NAMES[categorySlug.value]) return CATEGORY_NAMES[categorySlug.value]
  return categorySlug.value
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
})

async function fetchProducts() {
  loading.value = true
  try {
    const res = await productService.getByCategory(categorySlug.value, {
      page: currentPage.value,
      sort: sortBy.value,
      search: searchQuery.value
    })
    products.value = res.content || res
    totalPages.value = res.totalPages || 1
  } catch {
    products.value = []
  } finally {
    loading.value = false
  }
}

function goToPage(p) {
  if (p < 1 || p > totalPages.value) return
  currentPage.value = p
}

const { addItem } = useBasket()

function addToBasket(product) {
  addItem(product)
}

watch([currentPage, sortBy, categorySlug], fetchProducts)
watch(searchQuery, () => {
  currentPage.value = 1
  fetchProducts()
})

onMounted(fetchProducts)
</script>

<style scoped>
.list-title {
  padding: var(--space-10) 0 var(--space-6);
  font-size: var(--font-size-3xl);
  color: var(--color-dark);
}

.filters-row {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
  align-items: center;
}

.filters-search {
  flex: 1;
  min-width: 240px;
}

.sort-select {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
  background: var(--color-white);
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}
.sort-select:focus {
  border-color: var(--color-primary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-5);
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

.products-grid {
  margin-bottom: var(--space-12);
}

.empty-state {
  margin-bottom: var(--space-12);
}

.pagination {
  margin-bottom: var(--space-12);
}
</style>
