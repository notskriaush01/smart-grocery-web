<template>
  <div class="page-content">
    <main class="recipe-detail-page" v-if="loading">
      <section class="container recipe-skeleton-wrap">
        <div class="recipe-hero-skeleton card"></div>
        <div class="recipe-text-skeleton">
          <div class="skeleton-line" style="width: 280px; height: 40px"></div>
          <div class="skeleton-line" style="width: 120px; height: 26px"></div>
          <div class="skeleton-line" style="width: 100%; height: 14px"></div>
          <div class="skeleton-line" style="width: 100%; height: 14px"></div>
          <div class="skeleton-line" style="width: 80%; height: 14px"></div>
        </div>
      </section>
    </main>

    <main class="recipe-detail-page" v-else-if="recipe">
      <section class="container hero-section">
        <div class="hero-media card">
          <button class="hero-back icon-btn" @click="goBack" aria-label="Back to recipes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img :src="heroImageUrl" alt="Recipe hero" class="hero-image" />
        </div>
      </section>

      <section class="container intro-section">
        <h1 class="recipe-title">{{ recipe.title }}</h1>
        <span class="recipe-tag">{{ recipe.tag || 'Recipe' }}</span>

        <div class="intro-grid">
          <div>
            <p class="recipe-description">{{ recipe.shortDescription || 'No description available.' }}</p>
            <p v-if="allergensText" class="allergens"><strong>Allergens:</strong> {{ allergensText }}</p>
          </div>

          <dl class="meta-list">
            <div class="meta-row">
              <dt>Total time:</dt>
              <dd>{{ recipe.prepMinutes ?? '-' }} mins</dd>
            </div>
            <div class="meta-row">
              <dt>Prep time:</dt>
              <dd>{{ recipe.cookMinutes ?? '-' }} mins</dd>
            </div>
            <div class="meta-row">
              <dt>Cooking difficulty:</dt>
              <dd>{{ recipe.difficulty || '-' }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="container tabs-section">
        <div class="detail-tabs" role="tablist" aria-label="Recipe details tabs">
          <button
            type="button"
            class="detail-tab"
            :class="{ 'detail-tab--active': activeTab === 'ingredients' }"
            role="tab"
            :aria-selected="activeTab === 'ingredients'"
            @click="activeTab = 'ingredients'"
          >
            Ingredients & Nutritional Value
          </button>
          <button
            type="button"
            class="detail-tab"
            :class="{ 'detail-tab--active': activeTab === 'instructions' }"
            role="tab"
            :aria-selected="activeTab === 'instructions'"
            @click="activeTab = 'instructions'"
          >
            Instructions
          </button>
        </div>
      </section>

      <section class="container content-section" v-if="activeTab === 'ingredients'">
        <div class="content-grid">
          <article class="card ingredients-card">
            <div class="ingredients-header">
              <h2 class="content-title">Ingredients</h2>
              <button
                type="button"
                class="btn btn-primary add-all-btn"
                @click="addAllToBasket"
                :disabled="!ingredientsList.length"
              >
                Add All to Basket
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.5h7.9a2 2 0 0 0 2-1.5L21 7H7" />
                </svg>
              </button>
            </div>
            <div class="ingredients-grid" v-if="ingredientsList.length">
              <div class="ingredient-item" v-for="(item, idx) in ingredientsList" :key="`${item.productName}-${idx}`">
                <div class="ingredient-icon img-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div class="ingredient-body">
                  <p class="ingredient-qty">{{ item.quantity || '1' }}</p>
                  <p class="ingredient-name">{{ item.productName }}</p>
                </div>
              </div>
            </div>
            <div v-else class="empty-state">
              <p>No ingredients available.</p>
            </div>
          </article>

          <article class="card nutrition-card">
            <h2 class="content-title">Nutritional Value</h2>
            <div class="nutrition-summary" v-if="nutritionPairs.length">
              <div class="nutrition-row" v-for="pair in nutritionPairs" :key="pair.key">
                <p>{{ pair.label }}:</p>
                <p>{{ pair.value }}</p>
              </div>
            </div>
            <div v-else class="empty-state nutrition-empty">
              <p>No nutrition data available.</p>
            </div>
          </article>
        </div>
      </section>

      <section class="container content-section" v-else>
        <article class="card instructions-card">
          <h2 class="content-title">Instructions</h2>

          <ol class="instructions-list" v-if="instructionsList.length">
            <li v-for="(step, idx) in instructionsList" :key="idx">{{ step }}</li>
          </ol>

          <p v-else class="recipe-description">No instructions available for this recipe yet.</p>
        </article>
      </section>
    </main>

    <main class="recipe-detail-page" v-else>
      <section class="container empty-state" style="padding-top: var(--space-12); padding-bottom: var(--space-12)">
        <p>Recipe not found.</p>
        <RouterLink to="/recipes" class="btn btn-primary" style="margin-top: var(--space-4)">Back to Recipes</RouterLink>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import { recipeService } from '@/services/api.js'
import { useBasket } from '@/composables/useBasket.js'

const route = useRoute()
const router = useRouter()

const heroImageUrl = '/recipe-ingredients-hero.png'
const loading = ref(true)
const recipe = ref(null)
const activeTab = ref('ingredients')
const { addItem } = useBasket()

const ingredientsList = computed(() => recipe.value?.ingredients || [])

const instructionsList = computed(() => {
  const source = recipe.value?.steps ?? recipe.value?.instructions
  if (Array.isArray(source)) return source
  if (typeof source === 'string' && source.trim()) {
    return source
      .split(/\r?\n|\./)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
})

const allergensText = computed(() => {
  const source = recipe.value?.allergens
  if (Array.isArray(source)) return source.join(', ')
  if (typeof source === 'string') return source
  return ''
})

const nutritionPairs = computed(() => {
  const source = recipe.value?.nutrition
  if (!source || typeof source !== 'object') return []
  return Object.entries(source).map(([key, value]) => ({
    key,
    label: formatKey(key),
    value: String(value)
  }))
})

function formatKey(value) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push('/recipes')
}

function addAllToBasket() {
  ingredientsList.value.forEach((item, index) => {
    const quantity = Math.max(1, Number(item.quantity) || 1)
    const mappedProduct = {
      id: item.productId ?? `${route.params.id}-${index}-${item.productName}`,
      name: item.productName,
      brand: recipe.value?.title || 'Recipe',
      imageUrl: item.imageUrl || null,
      storePrices: item.storePrices || {}
    }

    for (let i = 0; i < quantity; i += 1) {
      addItem(mappedProduct)
    }
  })
}

onMounted(async () => {
  try {
    recipe.value = await recipeService.getById(route.params.id)
  } catch {
    recipe.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.recipe-detail-page {
  padding-bottom: var(--space-12);
}

.hero-section {
  padding-top: var(--space-6);
}

.hero-media {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 360px;
  background: var(--color-grey-100);
}

.hero-image {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
}

.hero-back {
  position: absolute;
  top: var(--space-5);
  left: var(--space-5);
  z-index: 1;
  background: var(--color-white);
}

.intro-section {
  text-align: center;
  padding-top: var(--space-10);
}

.recipe-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-3);
}

.recipe-tag {
  display: inline-flex;
  border: 1.5px solid var(--color-primary-light);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-dark);
  background: var(--color-primary-subtle);
  margin-bottom: var(--space-8);
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-8);
  text-align: left;
}

.recipe-description {
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
}

.allergens {
  margin-top: var(--space-5);
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
}

.meta-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: var(--space-5);
}

.meta-row dt {
  font-size: var(--font-size-sm);
  color: var(--color-dark);
  font-weight: var(--font-weight-semibold);
}

.meta-row dd {
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
  text-transform: lowercase;
}

.tabs-section {
  padding-top: var(--space-10);
}

.detail-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-10);
}

.detail-tab {
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  color: var(--color-grey-500);
  border-bottom: 2px solid transparent;
  padding-bottom: var(--space-2);
}

.detail-tab--active {
  color: var(--color-dark-soft);
  border-bottom-color: var(--color-dark-soft);
}

.content-section {
  padding-top: var(--space-8);
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: var(--space-6);
}

.ingredients-card,
.nutrition-card,
.instructions-card {
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.ingredients-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.content-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-6);
}

.ingredients-header .content-title {
  margin-bottom: 0;
}

.add-all-btn {
  white-space: nowrap;
  padding-left: var(--space-5);
  padding-right: var(--space-5);
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5) var(--space-8);
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.ingredient-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ingredient-icon svg {
  width: 22px;
  height: 22px;
}

.ingredient-body {
  display: flex;
  align-items: baseline;
  flex-direction: row;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.ingredient-qty {
  font-size: var(--font-size-md);
  color: var(--color-grey-700);
  margin: 0;
  white-space: nowrap;
}

.ingredient-name {
  font-size: var(--font-size-xl);
  color: var(--color-dark-soft);
  line-height: var(--line-height-snug);
  margin: 0;
}

.nutrition-card {
  align-self: start;
}

.nutrition-summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.nutrition-row {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
}

.nutrition-row p {
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
}

.nutrition-row p:first-child {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
}

.instructions-list {
  list-style: decimal;
  padding-left: 1.2rem;
}

.instructions-list li {
  color: var(--color-grey-700);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-3);
}

.nutrition-empty {
  padding: var(--space-6) 0;
}

.recipe-skeleton-wrap {
  padding-top: var(--space-6);
}

.recipe-hero-skeleton {
  min-height: 360px;
  background: linear-gradient(90deg, var(--color-grey-100) 25%, var(--color-grey-50) 50%, var(--color-grey-100) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.recipe-text-skeleton {
  margin-top: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skeleton-line {
  background: var(--color-grey-100);
  border-radius: var(--radius-sm);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
    opacity: 1;
  }
  100% {
    background-position: -200% 0;
    opacity: 0.75;
  }
}

@media (max-width: 1024px) {
  .intro-grid {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-image,
  .hero-media,
  .recipe-hero-skeleton {
    min-height: 240px;
  }

  .recipe-title {
    font-size: var(--font-size-2xl);
  }

  .detail-tabs {
    gap: var(--space-6);
    flex-wrap: wrap;
  }

  .detail-tab {
    font-size: var(--font-size-base);
  }

  .content-title {
    font-size: var(--font-size-2xl);
  }

  .ingredients-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .add-all-btn {
    width: 100%;
    justify-content: center;
  }

  .ingredients-grid {
    grid-template-columns: 1fr;
  }

  .ingredient-name {
  font-size: var(--font-size-xl);
  color: var(--color-dark-soft);
  line-height: var(--line-height-snug);
  margin: 0;
}
}
</style>



