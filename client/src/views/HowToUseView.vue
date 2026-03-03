<template>
  <div class="page-content">
    <main class="container how-to-page">
      <section class="intro-section">
        <h1 class="intro-title">How Smart Basket Works</h1>

        <div class="intro-grid">
          <div class="intro-image-wrap">
            <img
              class="intro-image"
              src="/how-smartbasket-works.png"
              alt="How smartbasket works"
            />
          </div>

          <div class="steps-list">
            <article v-for="step in steps" :key="step.number" class="step-card card">
              <h2 class="step-title">
                <span class="step-number">{{ step.number }}.</span>
                {{ step.title }}
              </h2>
              <p class="step-text">{{ step.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="tabs-section">
        <div class="tabs-nav" role="tablist" aria-label="How to use steps">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="tab-btn"
            :class="{ 'tab-btn--active': activeTabId === tab.id }"
            role="tab"
            :aria-selected="activeTabId === tab.id"
            @click="activeTabId = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <article class="tab-content card">
          <h3 class="tab-title">{{ activeTab.title }}</h3>
          <p class="tab-description">{{ activeTab.description }}</p>
          <ul class="tab-list">
            <li v-for="item in activeTab.points" :key="item">{{ item }}</li>
          </ul>
        </article>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppFooter from '@/components/AppFooter.vue'

const steps = [
  {
    number: 1,
    title: 'Add items to your basket',
    text: 'Search for products and add what you need. Build a basket in seconds, with or without an account.'
  },
  {
    number: 2,
    title: 'We compare prices for you',
    text: 'Smartbasket checks matching items across supermarkets and highlights the cheapest options and best deals.'
  },
  {
    number: 3,
    title: 'Choose the best shop & save',
    text: 'Pick the store (or combination) that costs less, swap to alternatives if you want, and shop with confidence.'
  }
]

const tabs = [
  {
    id: 'first',
    label: '1. Build',
    title: '1. Start with your shopping list',
    description:
      'Enter the products you need using the search bar. Add items one by one to your basket. You can search by product name (e.g. milk, pasta, chicken breast). Smartbasket builds your list in real time.',
    points: [
      'Search any grocery product',
      'Add items instantly',
      'Edit quantities anytime',
      'No account required to start'
    ]
  },
  {
    id: 'second',
    label: '2. Compare',
    title: '2. We compare Tesco, ASDA, Lidl & ALDI',
    description:
      'Once your basket is ready, Smartbasket automatically shows you where your basket costs less.',
    points: [
      'Real price comparison',
      'Clear "from lowest price" indication',
      'Transparent store breakdown'
    ]
  },
  {
    id: 'third',
    label: '3. Optimize',
    title: '3. Review alternatives & optimize',
    description:
      'Not happy with the total? You can explore alternative products to reduce your cost. Swap brands, compare sizes, or choose store-brand equivalents to optimise your basket.',
    points: ['View cheaper alternatives', 'Compare price per unit']
  },
  {
    id: 'fourth',
    label: '4. Save',
    title: '4. Choose where to shop & save',
    description:
      'Smartbasket shows which supermarket offers the lowest total for your basket. You can then decide where to shop.',
    points: [
      'See total cost per supermarket',
      'Identify the cheapest option',
      'Save money on every trip',
      'Shop smarter every time'
    ]
  }
]

const activeTabId = ref('first')
const activeTab = computed(() => tabs.find((tab) => tab.id === activeTabId.value) || tabs[0])
</script>

<style scoped>
.how-to-page {
  padding-top: var(--space-10);
  padding-bottom: var(--space-12);
}

.intro-section {
  max-width: 980px;
  margin: 0 auto var(--space-10);
}

/* ── Page title: centred, biggest, moderate letter-spacing ── */
.intro-title {
  text-align: center;
  font-size: var(--font-size-4xl);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.02em;
  color: var(--color-dark);
  margin-bottom: var(--space-8);
}

/* ── Intro grid: image and steps columns same height ── */
.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
  gap: var(--space-4);
  align-items: stretch;
}

/* Image fills the full column height so its bottom matches the last step card */
.intro-image-wrap {
  overflow: hidden;
  border-radius: var(--radius-md);
  display: flex;
}

.intro-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Steps column: distribute three cards evenly across the same height as the image */
.steps-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.step-card {
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.step-number {
  font-family: var(--font-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-dark-soft);
  line-height: var(--line-height-tight);
  margin-right: var(--space-1);
}

/* Step heading — subordinate to page title */
.step-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  margin-bottom: var(--space-2);
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

/* Body text — readable */
.step-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-grey-700);
}

.tabs-section {
  max-width: 980px;
  margin: 0 auto;
}

.tabs-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.tab-btn {
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-grey-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--space-2) 0;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.tab-btn--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-content {
  padding: var(--space-6);
}

/* Tab heading — subordinate to page title */
.tab-title {
  font-size: var(--font-size-xl);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  margin-bottom: var(--space-3);
}

.tab-description {
  margin-bottom: var(--space-4);
  max-width: 900px;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-grey-700);
}

.tab-list {
  list-style: disc;
  padding-left: 1.2rem;
}

.tab-list li {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-grey-700);
  margin-bottom: var(--space-2);
}

@media (max-width: 1024px) {
  .intro-grid {
    grid-template-columns: 1fr;
  }

  .steps-list {
    justify-content: flex-start;
    gap: var(--space-3);
  }
}

@media (max-width: 768px) {
  .how-to-page {
    padding-top: var(--space-8);
  }

  .intro-title {
    font-size: var(--font-size-3xl);
  }

  .tab-content {
    padding: var(--space-5);
  }
}
</style>