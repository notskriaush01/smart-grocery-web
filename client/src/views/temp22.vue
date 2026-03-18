<template>
  <div class="page-content">
    <div class="container" v-if="loading">
      <div class="detail-skeleton">
        <div class="skeleton-img card"></div>
        <div class="skeleton-info">
          <div class="skeleton-line" style="width:40%; height:14px;"></div>
          <div class="skeleton-line" style="width:70%; height:28px;"></div>
          <div class="skeleton-line" style="width:90%; height:14px;"></div>
        </div>
      </div>
    </div>

    <div class="container" v-else-if="product">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <RouterLink to="/">Home</RouterLink>
        <span>›</span>
        <RouterLink :to="`/category/${product.categorySlug}`">{{ product.category }}</RouterLink>
        <span>›</span>
        <span>{{ product.name }}</span>
      </nav>

      <!-- Main detail block -->
      <div class="detail-grid">
        <!-- Image -->
        <div class="detail-images">
          <div class="detail-img-main card">
            <img
              v-if="product.imageUrl"
              :src="product.imageUrl"
              :alt="product.name"
              class="main-img"
              @click="lightboxOpen = true"
              title="Click to enlarge"
            />
            <div v-else class="img-placeholder" style="height:100%">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>

            <!-- Enlarge hint -->
            <div class="enlarge-hint" v-if="product.imageUrl">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
              Enlarge
            </div>

            <div class="detail-img-actions">
              <button class="icon-btn" @click="addToBasket" title="Add to basket">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </button>
              <button class="icon-btn" title="Share">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="detail-info">
          <span class="badge">{{ product.category }}</span>
          <!---<h1 class="detail-brand">{{ product.brand }}</h1>-->
          <h1 class="detail-name">{{ product.name }}</h1>
          <p class="detail-sub" v-if="product.subcategory">{{ product.subcategory }}</p>
          <!-- Properties -->
          <div class="detail-props" v-if="product.properties">
            <h4 class="detail-section-title">Product Properties</h4>
            <dl class="props-list">
              <div v-for="(val, key) in product.properties" :key="key" class="props-item">
                <dt>{{ key }}</dt>
                <dd>{{ val }}</dd>
              </div>
            </dl>
          </div>

          <!-- Sizes -->
          <div class="detail-sizes" v-if="product.sizes?.length">
            <h4 class="detail-section-title">Sizes</h4>
            <div class="sizes-grid">
              <button
                v-for="size in product.sizes"
                :key="size.id"
                class="size-option"
                :class="{ 'size-option--selected': selectedSize?.id === size.id }"
                @click="selectedSize = size"
              >
                <div class="img-placeholder size-img">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:20px;height:20px;">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                  </svg>
                </div>
                <span class="size-label">{{ size.label }}</span>
                <span class="size-weight">{{ size.weight }}</span>
                <span class="size-price price">{{ formatPrice(size.lowestPrice) }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Where to Buy -->
      <section class="section-block">
        <h3 class="detail-section-title">Where to buy</h3>
        <div class="stores-grid" v-if="product.storeListings?.length">
          <div
            v-for="listing in product.storeListings"
            :key="listing.storeId"
            class="store-card card"
          >
            <div class="store-card__logo">
              <img v-if="listing.storeLogo" :src="listing.storeLogo" :alt="listing.storeName" />
              <div v-else class="img-placeholder" style="height:60px">
                <span style="font-weight:700;font-size:1.1rem;color:var(--color-primary)">{{ listing.storeName }}</span>
              </div>
            </div>
            <div class="store-card__body">
              <p class="price" style="font-size:var(--font-size-lg)">{{ formatPrice(listing.price) }}</p>
              <small>{{ formatUnitPrice(listing) }}</small>
            </div>
          </div>
        </div>
        <div v-else class="empty-state" style="padding:var(--space-8)">
          <p>No store listings found.</p>
        </div>
      </section>
    </div>

    <div v-else class="container empty-state">
      <p>Product not found.</p>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxOpen" class="lightbox" @click="lightboxOpen = false">
        <button class="lightbox__close" @click="lightboxOpen = false" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <img
          :src="product.imageUrl"
          :alt="product.name"
          @click.stop
        />
      </div>
    </Teleport>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import { productService } from '@/services/api.js'
import { useBasket } from '@/composables/useBasket.js'

const route = useRoute()
const loading = ref(true)
const product = ref(null)
const selectedSize = ref(null)
const lightboxOpen = ref(false)

// Close lightbox on Escape key
function onKeydown(e) {
  if (e.key === 'Escape') lightboxOpen.value = false
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

function formatPrice(price) {
  if (price == null) return '–'
  return `£${Number(price).toFixed(2)}`
}
function formatUnitPrice(listing) {
  if (!listing.unitPrice) return ''
  return `${formatPrice(listing.unitPrice)} per 100g`
}

const { addItem } = useBasket()
function addToBasket() {
  if (product.value) addItem(product.value)
}

onMounted(async () => {
  try {
    product.value = await productService.getById(route.params.id)
    if (product.value?.sizes?.length) {
      selectedSize.value = product.value.sizes[0]
    }
  } catch {
    product.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-6) 0 var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
}
.breadcrumb a {
  color: var(--color-grey-500);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.breadcrumb a:hover { color: var(--color-primary); }

/* Detail grid */
.detail-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--space-10);
  margin-bottom: var(--space-12);
}

/* Main image */
.detail-images { display: flex; flex-direction: column; gap: var(--space-3); }

.detail-img-main {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-50);
}
.main-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: var(--space-6);
  cursor: zoom-in;
  transition: transform var(--transition-base);
}
.detail-img-main:hover .main-img { transform: scale(1.03); }

.enlarge-hint {
  position: absolute;
  bottom: var(--space-3);
  left: var(--space-3);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-xs);
  color: var(--color-grey-500);
  background: rgba(255,255,255,0.85);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.detail-img-main:hover .enlarge-hint { opacity: 1; }

.detail-img-actions {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Info */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4) 0;
}
.detail-name {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-dark);
  line-height: var(--line-height-tight);
}
.detail-sub {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
  font-family: var(--font-body);
}
.detail-desc {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
}
.detail-section-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  margin-bottom: var(--space-3);
}

/* Props */
.props-list { display: flex; flex-direction: column; gap: var(--space-1); }
.props-item { display: flex; gap: var(--space-3); font-size: var(--font-size-sm); }
.props-item dt { color: var(--color-grey-500); min-width: 120px; }
.props-item dd { color: var(--color-dark); font-weight: var(--font-weight-medium); }

/* Sizes */
.sizes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--space-3);
}
.size-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: var(--font-body);
}
.size-option:hover { border-color: var(--color-primary); }
.size-option--selected {
  border-color: var(--color-primary);
  background: var(--color-primary-subtle);
}
.size-img { width: 60px; height: 60px; }
.size-label { font-size: var(--font-size-xs); font-weight: var(--font-weight-semibold); color: var(--color-dark); }
.size-weight { font-size: var(--font-size-xs); color: var(--color-grey-500); }
.size-price { font-size: var(--font-size-xs); }

/* Stores */
.section-block { margin-bottom: var(--space-12); }
.stores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-4);
}
.store-card { display: flex; flex-direction: column; overflow: visible; }
.store-card__logo {
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-50);
}
.store-card__logo img { max-height: 48px; object-fit: contain; }
.store-card__body { padding: var(--space-3) var(--space-4); }

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  animation: fadeIn 0.2s ease;
}
.lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
  cursor: default;
}
.lightbox__close {
  position: absolute;
  top: var(--space-5);
  right: var(--space-5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1.5px solid rgba(255,255,255,0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.lightbox__close:hover { background: rgba(255,255,255,0.22); }

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Skeleton */
.detail-skeleton {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--space-10);
  padding: var(--space-8) 0;
}
.skeleton-img {
  aspect-ratio: 1;
  background: var(--color-grey-100);
  animation: shimmer 1.4s infinite;
}
.skeleton-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding-top: var(--space-4);
}
.skeleton-line {
  background: var(--color-grey-100);
  border-radius: var(--radius-sm);
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  0%   { opacity: 1; }
  50%  { opacity: 0.5; }
  100% { opacity: 1; }
}

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .detail-skeleton { grid-template-columns: 1fr; }
}
</style>