<template>
  <div class="page-content">
    <div class="container">
      <div class="basket-header">
        <h1 class="basket-title">My Basket — Compare Prices</h1>
        <p class="basket-subtitle">Add items to your basket for comparing prices. Find the best supermarket for your shop.</p>
      </div>

      <div v-if="basketItems.length && user" class="save-basket-bar">
        <button class="btn btn-primary" @click="saveBasket">💾 Save as Shopping List</button>
      </div>

      <!-- Empty state -->
      <div v-if="!basketItems.length" class="empty-state">
        <p>Your basket is empty.</p>
        <RouterLink to="/" class="btn btn-primary" style="margin-top:var(--space-4)">Browse Products</RouterLink>
      </div>

      <!-- Loading state -->
      <div v-if="loading" style="padding: var(--space-8); text-align:center; color: var(--color-grey-500)">
        Comparing prices...
      </div>

      <!-- Table -->
      <div v-else class="basket-table-wrap">
        <table class="basket-table">
          <thead>
            <tr>
              <th class="col-item">Item</th>
              <th class="col-qty">Qty.</th>
              <th v-for="store in stores" :key="store.id" class="col-store">{{ store.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in basketItems" :key="item.id" class="basket-row">
              <td class="col-item">
                <div class="item-cell">
                  <div class="item-img">
                    <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" />
                    <div v-else class="img-placeholder" style="width:48px;height:48px;border-radius:var(--radius-sm)">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:20px;height:20px;">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                      </svg>
                    </div>
                  </div>
                  <div class="item-info">
                    <p class="item-name">{{ item.name }}</p>
                    <p class="item-brand">{{ item.brand }}</p>
                    <button class="item-remove" @click="removeItem(item.id)">Remove</button>
                  </div>
                </div>
              </td>
              <td class="col-qty">
                <div class="qty-control">
                  <button class="qty-btn" @click="decreaseQty(item.id)">−</button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="increaseQty(item.id)">+</button>
                </div>
              </td>
              <td
                v-for="store in stores"
                :key="store.id"
                class="col-store"
                :class="{ 'price-best': isBestPrice(item, store.id) }"
              >
                <span class="price" v-if="getStorePrice(item, store.id)">
                  {{ formatPrice(getStorePrice(item, store.id) * item.quantity) }}
                </span>
                <span v-else class="unavailable">–</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="subtotal-row">
              <td colspan="2">Subtotal</td>
              <td v-for="store in stores" :key="store.id" class="col-store">
                <span class="price">{{ formatPrice(getSubtotal(store.id)) }}</span>
              </td>
            </tr>
            <tr class="tax-row">
              <td colspan="2">Sales Tax</td>
              <td v-for="store in stores" :key="store.id" class="col-store">
                <div class="skeleton-bar"></div>
              </td>
            </tr>
            <tr class="total-row">
              <td colspan="2"><strong>Total</strong></td>
              <td v-for="store in stores" :key="store.id" class="col-store">
                <strong class="price" :class="{ 'price-best': isBestStore(store.id) }">
                  {{ formatPrice(getSubtotal(store.id)) }}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- ───────────────────────────────────────────
           AI RECIPE SECTION
           Only shown when user is logged in + basket has items
      ─────────────────────────────────────────────── -->
      <div v-if="basketItems.length && user" class="ai-recipe-section">
        <div class="ai-recipe-header">
          <div class="ai-badge">✦ AI</div>
          <div>
            <h2 class="ai-recipe-title">Recipe Ideas from Your Basket</h2>
            <p class="ai-recipe-subtitle">Let AI suggest what you can cook with the items in your basket.</p>
          </div>
        </div>

        <button
          class="btn-generate"
          :disabled="recipeLoading"
          @click="generateRecipes"
        >
          <span v-if="recipeLoading" class="btn-spinner"></span>
          <span v-else>✦</span>
          {{ recipeLoading ? 'Generating recipes…' : 'Generate Recipes' }}
        </button>

        <!-- Error state -->
        <div v-if="recipeError" class="recipe-error">
          {{ recipeError }}
        </div>

        <!-- Recipe cards -->
        <div v-if="recipes.length" class="recipe-grid">
          <div
            v-for="(recipe, idx) in recipes"
            :key="idx"
            class="recipe-card"
          >
            <div class="recipe-card-index">{{ String(idx + 1).padStart(2, '0') }}</div>
            <h3 class="recipe-card-name">{{ recipe.name }}</h3>

            <div class="recipe-section">
              <p class="recipe-section-label">Ingredients</p>
              <ul class="recipe-ingredients">
                <li v-for="(ing, i) in recipe.ingredients" :key="i">
                  <span class="ing-qty">{{ ing.quantity }}</span>
                  <span class="ing-name">{{ ing.item }}</span>
                </li>
              </ul>
            </div>

            <div class="recipe-section">
              <p class="recipe-section-label">Steps</p>
              <ol class="recipe-steps">
                <li v-for="(step, s) in recipe.steps" :key="s">{{ step }}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <!-- Not logged in nudge -->
      <div v-else-if="basketItems.length && !user" class="ai-recipe-locked">
        <span class="ai-badge">✦ AI</span>
        <p><RouterLink to="/profile">Sign in</RouterLink> to generate recipe ideas from your basket.</p>
      </div>

    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import { useBasket } from '@/composables/useBasket.js'
import { useAuth } from '@/composables/useAuth.js'

const { items: basketItems, increaseQty, decreaseQty, removeItem } = useBasket()
const { user } = useAuth()

// ── Price comparison ──────────────────────────────────────────────────────────
const stores = ref([])
const compareData = ref(null)
const loading = ref(false)

async function fetchCompare() {
  if (!basketItems.value.length) { compareData.value = null; return }
  loading.value = true
  try {
    const body = {
      items: basketItems.value.map(i => ({ productId: i.id, quantity: i.quantity }))
    }
    const res = await fetch('http://localhost:8080/api/basket/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    compareData.value = await res.json()

    if (compareData.value?.storeBreakdowns?.length) {
      stores.value = compareData.value.storeBreakdowns.map(s => ({
        id: s.storeId,
        name: s.storeName
      }))
    }
  } catch (e) {
    console.error('Basket compare failed', e)
  } finally {
    loading.value = false
  }
}

watch(basketItems, fetchCompare, { deep: true })
onMounted(fetchCompare)

// ── Save basket ───────────────────────────────────────────────────────────────
async function saveBasket() {
  if (!user.value) return
  const name = prompt('Name this shopping list:')
  if (!name?.trim()) return

  const res = await fetch(`http://localhost:8080/api/users/${user.value.userId}/shopping-lists`)
  const lists = await res.json()

  const newList = {
    id: Date.now(),
    name: name.trim(),
    savedAt: new Date().toISOString(),
    items: basketItems.value
  }
  lists.push(newList)

  await fetch(`http://localhost:8080/api/users/${user.value.userId}/shopping-lists`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lists })
  })
  alert(`"${name}" saved!`)
}

// ── AI Recipes ────────────────────────────────────────────────────────────────
const recipeLoading = ref(false)
const recipeError = ref(null)
const recipes = ref([])

async function generateRecipes() {
  if (!basketItems.value.length || recipeLoading.value) return

  recipeLoading.value = true
  recipeError.value = null
  recipes.value = []

  try {
    const body = {
      items: basketItems.value.map(i => ({ productId: i.id, quantity: i.quantity }))
    }

    const res = await fetch('http://localhost:8080/api/ai/recipes/from-basket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`)
    }

    const data = await res.json()

    if (data.error) {
      recipeError.value = `Could not generate recipes: ${data.error}`
    } else if (Array.isArray(data.recipes)) {
      recipes.value = data.recipes
    } else {
      recipeError.value = 'Unexpected response from AI. Please try again.'
    }
  } catch (e) {
    console.error('Recipe generation failed', e)
    recipeError.value = 'Something went wrong. Please try again.'
  } finally {
    recipeLoading.value = false
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatPrice(val) {
  if (val == null) return '–'
  return `£${Number(val).toFixed(2)}`
}

function getStorePrice(item, storeId) {
  const breakdown = compareData.value?.storeBreakdowns?.find(s => s.storeId === storeId)
  const line = breakdown?.items?.find(i => i.productId === item.id)
  return line ? Number(line.unitPrice) : null
}

function isBestPrice(item, storeId) {
  const prices = stores.value
    .map(s => getStorePrice(item, s.id))
    .filter(p => p != null)
  if (!prices.length) return false
  return getStorePrice(item, storeId) === Math.min(...prices)
}

function getSubtotal(storeId) {
  const breakdown = compareData.value?.storeBreakdowns?.find(s => s.storeId === storeId)
  return breakdown ? Number(breakdown.storeTotal) : 0
}

function isBestStore(storeId) {
  const totals = stores.value.map(s => getSubtotal(s.id)).filter(t => t > 0)
  if (!totals.length) return false
  return getSubtotal(storeId) === Math.min(...totals)
}
</script>

<style scoped>
.basket-header {
  padding: var(--space-10) 0 var(--space-6);
}
.basket-title {
  font-size: var(--font-size-3xl);
  color: var(--color-dark);
  margin-bottom: var(--space-2);
}
.basket-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
}

.basket-table-wrap {
  overflow-x: auto;
  margin-bottom: var(--space-12);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.basket-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.basket-table thead {
  background: var(--color-dark);
  color: var(--color-white);
}
.basket-table thead th {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
}

.basket-row {
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition-fast);
}
.basket-row:hover {
  background: var(--color-grey-50);
}

.save-basket-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--space-4);
}

td {
  padding: var(--space-4);
  vertical-align: middle;
}

.col-item { min-width: 260px; }
.col-qty { width: 100px; text-align: center; }
.col-store { width: 100px; text-align: center; }

/* Item cell */
.item-cell {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}
.item-img { flex-shrink: 0; }
.item-img img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}
.item-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  font-size: var(--font-size-sm);
}
.item-brand {
  color: var(--color-grey-500);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-snug);
}
.item-remove {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-decoration: underline;
  margin-top: var(--space-1);
  font-family: var(--font-body);
}

/* Qty */
.qty-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  justify-content: center;
}
.qty-btn {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border);
  background: var(--color-white);
  cursor: pointer;
  font-size: var(--font-size-base);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  font-family: var(--font-body);
}
.qty-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}
.qty-value {
  font-weight: var(--font-weight-semibold);
  min-width: 20px;
  text-align: center;
}

.unavailable { color: var(--color-grey-300); }

.price-best .price {
  color: var(--color-success);
  font-weight: var(--font-weight-bold);
}

/* Tfoot */
.basket-table tfoot tr td {
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
  border-top: 1px solid var(--color-border);
}
.subtotal-row { background: var(--color-grey-50); }
.total-row { background: var(--color-grey-100); }
.total-row td {
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
}

.skeleton-bar {
  height: 12px;
  border-radius: var(--radius-sm);
  background: var(--color-grey-200, #e0e0e8);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

/* ─── AI Recipe Section ─────────────────────────────────────────────────────── */
.ai-recipe-section {
  margin: var(--space-10) 0 var(--space-16);
  padding: var(--space-8);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-grey-50, #fafafa);
}

.ai-recipe-header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.ai-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1) var(--space-3);
  background: var(--color-dark);
  color: var(--color-white);
  border-radius: var(--radius-full, 9999px);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-heading);
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 3px;
}

.ai-recipe-title {
  font-size: var(--font-size-xl);
  font-family: var(--font-heading);
  color: var(--color-dark);
  margin-bottom: var(--space-1);
}

.ai-recipe-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
}

/* Generate button */
.btn-generate {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--color-dark);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-body);
  cursor: pointer;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
  margin-bottom: var(--space-6);
}
.btn-generate:hover:not(:disabled) {
  opacity: 0.85;
  transform: translateY(-1px);
}
.btn-generate:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Spinner */
.btn-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error */
.recipe-error {
  padding: var(--space-4);
  background: #fff3f3;
  border: 1px solid #f5c6c6;
  border-radius: var(--radius-md);
  color: #c0392b;
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-4);
}

/* Recipe grid */
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-6);
}

.recipe-card {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  position: relative;
  animation: fadeInUp 0.4s ease both;
}

.recipe-card:nth-child(2) { animation-delay: 0.08s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.recipe-card-index {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-heading);
  color: var(--color-grey-400, #aaa);
  letter-spacing: 0.08em;
  margin-bottom: var(--space-2);
}

.recipe-card-name {
  font-size: var(--font-size-lg);
  font-family: var(--font-heading);
  color: var(--color-dark);
  margin-bottom: var(--space-4);
  line-height: 1.3;
}

.recipe-section {
  margin-bottom: var(--space-4);
}

.recipe-section-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-grey-500);
  margin-bottom: var(--space-2);
}

.recipe-ingredients {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.recipe-ingredients li {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  align-items: baseline;
}

.ing-qty {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
  min-width: 60px;
  flex-shrink: 0;
  font-size: var(--font-size-xs);
}

.ing-name {
  color: var(--color-dark);
}

.recipe-steps {
  padding-left: var(--space-5);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.recipe-steps li {
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
  line-height: 1.6;
}

/* Locked state (not logged in) */
.ai-recipe-locked {
  margin: var(--space-8) 0 var(--space-12);
  padding: var(--space-5) var(--space-6);
  border: 1.5px dashed var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
}

.ai-recipe-locked a {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>