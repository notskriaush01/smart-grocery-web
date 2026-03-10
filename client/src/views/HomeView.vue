<template>
  <div class="page-content">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1 class="hero-title">Shop smart,<br/><span class="hero-accent">save more.</span></h1>
          <p class="hero-subtitle">Tired of watching your grocery bill climb? Smart Basket instantly compares your shopping list across every major UK supermarket, from Tesco to Aldi, ensuring you never overpay for your weekly shop again.</p>
          <div class="hero-search search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              v-model="heroSearch"
              type="text"
              placeholder="Start saving..."
              @keyup.enter="handleHeroSearch"
            />
          </div>
        </div>
        <div class="hero-illustration" aria-hidden="true">
          <div class="hero-blob"></div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Explore Deals by Categories</h2>
        <div class="categories-scroll">
          <RouterLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/category/${cat.slug}`"
            class="category-chip"
          >
            <span class="category-chip__icon">{{ cat.icon }}</span>
            <span class="category-chip__name">{{ cat.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Top Deals -->
    <section class="section section--alt">
      <div class="container">
        <h2 class="section-title">Today's Top Deals</h2>

        <div v-if="loading" class="products-grid">
          <div v-for="n in 8" :key="n" class="product-skeleton card"></div>
        </div>

        <div v-else-if="topDeals.length" class="products-grid">
          <ProductCard
            v-for="product in topDeals"
            :key="product.id"
            :product="product"
            @add-to-basket="addToBasket"
          />
        </div>

        <div v-else class="empty-state">
          <p>No deals found right now. Check back soon!</p>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import ProductCard from '@/components/ProductCard.vue'
import { productService } from '@/services/api.js'

const router = useRouter()
const heroSearch = ref('')
const loading = ref(true)
const topDeals = ref([])

const categories = [
  { name: 'Fresh Food',         slug: 'fresh-food',       icon: '🥦' },
  { name: 'Bakery',             slug: 'bakery',           icon: '🍞' },
  { name: 'Dairy & Eggs',       slug: 'dairy-eggs',       icon: '🥛' },
  { name: 'Meat & Seafood',     slug: 'meat-seafood',     icon: '🥩' },
  { name: 'Frozen Food',        slug: 'frozen-food',      icon: '❄️' },
  { name: 'Pantry Items',       slug: 'pantry-items',     icon: '🥫' },
  { name: 'Snacks & Beverages', slug: 'snacks-beverages', icon: '🍿' },
]

function handleHeroSearch() {
  if (heroSearch.value.trim()) {
    router.push({ path: '/search', query: { q: heroSearch.value } })
  }
}

import { useBasket } from '@/composables/useBasket.js'
const { addItem } = useBasket()

function addToBasket(product) {
  addItem(product)
}

onMounted(async () => {
  try {
    topDeals.value = await productService.getTopDeals()
  } catch (e) {
    topDeals.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Hero */
.hero {
  background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-soft) 100%);
  padding: var(--space-16) 0;
  overflow: hidden;
}

.hero-inner {
  display: flex;
  align-items: center;
  gap: var(--space-10);
  position: relative;
}

.hero-content {
  flex: 1;
  max-width: 560px;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-white);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-4);
}

.hero-accent {
  color: var(--color-primary);
}

.hero-subtitle {
  color: var(--color-grey-300);
  font-size: var(--font-size-md);
  margin-bottom: var(--space-8);
  line-height: var(--line-height-base);
}

.hero-search {
  background: var(--color-white);
  border-color: transparent;
  max-width: 420px;
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-base);
}
.hero-search input {
  font-size: var(--font-size-base);
}

.hero-illustration {
  flex: 1;
  position: relative;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-blob {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at 40% 40%, var(--color-primary) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.2;
}

/* Section */
.section {
  padding: var(--space-12) 0;
}
.section--alt {
  background: var(--color-grey-50);
}

/* Categories */
.categories-scroll {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  padding-bottom: var(--space-2);
  scrollbar-width: none;
}
.categories-scroll::-webkit-scrollbar { display: none; }

.category-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  flex-shrink: 0;
  padding: var(--space-4);
  background: var(--color-white);
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--color-border);
  min-width: 90px;
  transition: all var(--transition-base);
}
.category-chip:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-subtle);
  transform: translateY(-2px);
}

.category-chip__icon {
  font-size: var(--font-size-2xl);
}
.category-chip__name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-grey-700);
  text-align: center;
}

/* Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-5);
}

/* Skeleton */
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