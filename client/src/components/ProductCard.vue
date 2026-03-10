<template>
  <RouterLink :to="`/product/${product.id}`" class="product-card card">
    <div class="product-card__image">
      <img v-if="resolvedImage" :src="resolvedImage" :alt="product.name" />
      <div v-else class="img-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>

      <span class="product-card__tag badge" v-if="product.category">{{ product.category }}</span>

      <button
        class="product-card__add btn btn-primary btn-sm"
        @click.prevent="handleAdd(product)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>

    <div class="product-card__body">
      <p class="product-card__brand">{{ product.brand }}</p>
      <h6 class="product-card__name">{{ product.name }}</h6>
      <p class="product-card__description" v-if="product.description">{{ product.description }}</p>
      <p class="product-card__price price">from {{ formatPrice(product.lowestPrice) }}</p>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { useBasket } from '@/composables/useBasket.js'
import { getProductImage } from '@/composables/productImages.js'

const props = defineProps({
  product: { type: Object, required: true }
})
defineEmits(['add-to-basket'])

const { addItem } = useBasket()

/**
 * Prefer the DB imageUrl. If it's missing or still points to the old broken
 * Unsplash/Spoonacular hosts, fall back to our local Wikimedia map.
 */
const BROKEN_HOSTS = ['source.unsplash.com', 'spoonacular.com', 'api.spoonacular.com']

const resolvedImage = computed(() => {
  const url = props.product.imageUrl
  if (url && !BROKEN_HOSTS.some(host => url.includes(host))) {
    return url
  }
  return getProductImage(props.product.name)
})

function handleAdd(product) {
  addItem(product)
}

function formatPrice(price) {
  if (price == null) return '–'
  return `£${Number(price).toFixed(2)}`
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  cursor: pointer;
}

.product-card__image {
  position: relative;
  background: var(--color-grey-50);
  border-bottom: 1px solid var(--color-border);
  aspect-ratio: 1;
  overflow: hidden;
}
.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: var(--space-4);
  transition: transform var(--transition-base);
}
.product-card:hover .product-card__image img {
  transform: scale(1.04);
}

.product-card__tag {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
}

.product-card__add {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.product-card:hover .product-card__add {
  opacity: 1;
}

.product-card__body {
  padding: var(--space-3) var(--space-4) var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.product-card__brand {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-card__name {
  font-family: var(--font-heading);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  line-height: var(--line-height-snug);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__description {
  font-size: var(--font-size-xs);
  color: var(--color-grey-500);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card__price {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
}
</style>