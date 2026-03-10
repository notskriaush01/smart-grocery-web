<template>
  <div class="page-content">
    <main class="recipe-list-page">
      <section class="recipe-hero" :style="{ backgroundImage: `url(${heroImageUrl})` }">
        <div class="container recipe-hero__inner">
          <h1 class="recipe-hero__title">What to cook today?</h1>
        </div>
      </section>

      <section class="container recipe-list-content">
        <div class="recipe-tabs" role="tablist" aria-label="Recipe categories">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            class="recipe-tab"
            :class="{ 'recipe-tab--active': activeTab === tab }"
            role="tab"
            :aria-selected="activeTab === tab"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="loading" class="recipes-grid">
          <div v-for="n in 6" :key="n" class="recipe-card card recipe-card--loading"></div>
        </div>

        <div v-else-if="filteredRecipes.length" class="recipes-grid">
          <article v-for="recipe in filteredRecipes" :key="recipe.id" class="recipe-card card">
            <h2 class="recipe-card__title">{{ recipe.title }}</h2>
            <p class="recipe-card__tag">{{ recipe.tag }}</p>

            <div class="recipe-card__image-wrap">
              <img
                v-if="recipe.imageUrl"
                :src="`http://localhost:8080${recipe.imageUrl}`"
                :alt="recipe.title"
                class="recipe-card__image"
              />
              <div v-else class="img-placeholder recipe-card__placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            </div>

            <RouterLink :to="`/recipes/${recipe.id}`" class="btn btn-primary recipe-card__cta">
              See More
            </RouterLink>
          </article>
        </div>

        <div v-else class="empty-state">
          <p>No recipes found in this category.</p>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import { recipeService } from '@/services/api.js'

const tabs = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan']
const heroImageUrl = '/recipe-list-hero.png'

const loading = ref(true)
const recipes = ref([])
const activeTab = ref('Breakfast')

const filteredRecipes = computed(() => {
  return recipes.value.filter((recipe) => {
    return (recipe.tag || '').toLowerCase() === activeTab.value.toLowerCase()
  })
})

onMounted(async () => {
  try {
    recipes.value = await recipeService.getAll()
    const firstAvailableTab = tabs.find((tab) =>
      recipes.value.some((recipe) => (recipe.tag || '').toLowerCase() === tab.toLowerCase())
    )
    if (firstAvailableTab) {
      activeTab.value = firstAvailableTab
    }
  } catch {
    recipes.value = []
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.recipe-list-page {
  background: var(--color-white);
}

.recipe-hero {
  min-height: 300px;
  background-color: var(--color-grey-100);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.recipe-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.06) 100%);
}

.recipe-hero__inner {
  min-height: 300px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.recipe-hero__title {
  max-width: 340px;
  font-size: var(--font-size-4xl);
  color: var(--color-primary);
  line-height: var(--line-height-tight);
}

.recipe-list-content {
  padding-top: var(--space-8);
  padding-bottom: var(--space-12);
}

.recipe-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-5);
  margin-bottom: var(--space-8);
}

.recipe-tab {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-500);
  padding-bottom: var(--space-1);
  border-bottom: 2px solid transparent;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.recipe-tab--active {
  color: var(--color-dark-soft);
  border-bottom-color: var(--color-dark-soft);
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-8) var(--space-6);
}

.recipe-card {
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.recipe-card__title {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-snug);
}

.recipe-card__tag {
  align-self: flex-start;
  border: 1.5px solid var(--color-primary-light);
  color: var(--color-primary-dark);
  background: var(--color-primary-subtle);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-4);
}

.recipe-card__image-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-grey-50);
  aspect-ratio: 1.1;
}

.recipe-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recipe-card__placeholder {
  height: 100%;
}

.recipe-card__cta {
  width: 100%;
  justify-content: center;
  margin-top: auto;
}

.recipe-card--loading {
  min-height: 320px;
  background: linear-gradient(90deg, var(--color-grey-100) 25%, var(--color-grey-50) 50%, var(--color-grey-100) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 1024px) {
  .recipes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .recipe-hero,
  .recipe-hero__inner {
    min-height: 220px;
  }

  .recipe-hero__title {
    font-size: var(--font-size-3xl);
    max-width: 260px;
  }

  .recipes-grid {
    grid-template-columns: 1fr;
  }
}
</style>


