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
        <!-- Images -->
        <div class="detail-images">
          <div class="detail-img-main card">
            <img
              v-if="activeImage"
              :src="activeImage"
              :alt="product.name"
            />
            <div v-else class="img-placeholder" style="height:100%">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
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

          <!-- Thumbnail row -->
          <div class="detail-thumbs">
            <div
              v-for="(url, i) in allImages"
              :key="i"
              class="detail-thumb card"
              :class="{ 'detail-thumb--active': activeImage === url }"
              @click="activeImage = url"
            >
              <img v-if="url" :src="url" :alt="`${product.name} view ${i + 1}`" />
              <div v-else class="img-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:24px;height:24px;">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="detail-info">
          <span class="badge">{{ product.category }}</span>
          <h1 class="detail-brand">{{ product.brand }}</h1>
          <h2 class="detail-name">{{ product.name }}</h2>
          <p class="detail-desc" v-if="product.description">{{ product.description }}</p>

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

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import { productService } from '@/services/api.js'
import { useBasket } from '@/composables/useBasket.js'

// ---------------------------------------------------------------------------
// Extra thumbnail images per product name (Wikimedia Commons — free, stable)
// The main image comes from the DB (product.imageUrl).
// These 3 extra URLs are shown as thumbnails on the detail page only.
// ---------------------------------------------------------------------------
const EXTRA_IMAGES = {
  'Apples': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/400px-Honeycrisp.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Apple_slices.jpg/400px-Apple_slices.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg',
  ],
  'Bananas': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/400px-Bananas_white_background_DS.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/400px-Hapus_Mango.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Chocolate-Chip-Cookies-Recipe.jpg/400px-Banana-Chocolate-Chip-Cookies-Recipe.jpg',
  ],
  'Oranges': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Orange-Fruit-Pieces.jpg/400px-Orange-Fruit-Pieces.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
  ],
  'Pears': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Pears_on_a_branch.jpg/400px-Pears_on_a_branch.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pears.jpg/400px-Pears.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/400px-Hapus_Mango.jpg',
  ],
  'Tomatoes': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/TomatoCutaway.jpg/400px-TomatoCutaway.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
  ],
  'Cucumbers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cucumbers_sliced.jpg/400px-Cucumbers_sliced.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
  ],
  'Carrots': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/400px-Tomato_je.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
  ],
  'Bell Peppers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Peppers_grilled.jpg/400px-Peppers_grilled.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/400px-Tomato_je.jpg',
  ],
  'Whole Milk': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
  ],
  'Skimmed Milk': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
  ],
  'Lactose Free Milk': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
  ],
  'Oat Milk': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
  ],
  'Cheddar Cheese': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Edam_cheese.jpg/400px-Edam_cheese.jpg',
  ],
  'Edam Cheese': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Edam_cheese.jpg/400px-Edam_cheese.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
  ],
  'Gouda Cheese': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Gouda_cheese.jpg/400px-Gouda_cheese.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
  ],
  'Mozzarella': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mozzarella_di_bufala.jpg/400px-Mozzarella_di_bufala.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
  ],
  'Irish Butter': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
  ],
  'Salted Butter': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
  ],
  'Unsalted Butter': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
  ],
  'Spreadable Butter': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
  ],
  'Natural Yoghurt': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
  ],
  'Greek Yoghurt': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
  ],
  'Strawberry Yoghurt': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/400px-PerfectStrawberry.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
  ],
  'Blueberry Yoghurt': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Blueberries_with_straw.jpg/400px-Blueberries_with_straw.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
  ],
  'Chicken Breast': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
  ],
  'Chicken Thighs': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
  ],
  'Chicken Drumsticks': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
  ],
  'Chicken Wings': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
  ],
  'Beef Steak': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
  ],
  'Beef Mince': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
  ],
  'Beef Strips': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
  ],
  'Beef Burgers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
  ],
  'Pork Belly': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
  ],
  'Pork Chops': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
  ],
  'Pork Mince': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
  ],
  'Pork Sausages': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
  ],
  'Turkey Mince': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
  ],
  'Turkey Burgers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
  ],
  'Turkey Ham': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
  ],
  'Turkey Slices': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
  ],
  'Ham Slices': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
  ],
  'Chicken Ham': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
  ],
  'Salami': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
  ],
  'Salmon Fillet': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
  ],
  'Cod Fillet': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
  ],
  'Haddock Fillet': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
  ],
  'Tilapia Fillet': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
  ],
  'White Bread': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
  ],
  'Wholegrain Bread': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
  ],
  'Sourdough Bread': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
  ],
  'Rye Bread': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
  ],
  'Croissants': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
  ],
  'Pain au Chocolat': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
  ],
  'Cinnamon Rolls': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
  ],
  'Muffins': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
  ],
  'Carrot Cake': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
  ],
  'Chocolate Cake': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
  ],
  'Cheesecake': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
  ],
  'Lemon Cake': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
  ],
  'Frozen Pizza': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/400px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
  ],
  'Frozen Peas': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
  ],
  'Frozen Mixed Veg': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
  ],
  'Frozen Broccoli': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
  ],
  'Frozen Spinach': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
  ],
  'Frozen Lasagna': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
  ],
  'Frozen Curry': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
  ],
  'Onion Rings': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
  ],
  'Fish Fingers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
  ],
  'Chicken Nuggets': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
  ],
  'Mozzarella Sticks': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mozzarella_di_bufala.jpg/400px-Mozzarella_di_bufala.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
  ],
  'Vanilla Ice Cream': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
  ],
  'Chocolate Ice Cream': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
  ],
  'Strawberry Ice Cream': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/400px-PerfectStrawberry.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
  ],
  'Mint Ice Cream': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
  ],
  'Salted Crisps': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
  ],
  'Tortilla Chips': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
  ],
  'Pretzels': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
  ],
  'Cheese Crackers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
  ],
  'Chocolate Cookies': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
  ],
  'Caramel Biscuits': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
  ],
  'Milk Chocolate Bar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
  ],
  'Chocolate Wafers': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
  ],
  'Cola': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
  ],
  'Orange Juice': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
  ],
  'Apple Juice': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
  ],
  'Lemonade': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
  ],
  'Sparkling Water': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
  ],
  'Still Water': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
  ],
  'Sports Drink': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
  ],
  'Vitamin Drink': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
  ],
  'Black Tea Bags': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
  ],
  'Green Tea': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
  ],
  'Ground Coffee': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
  ],
  'Instant Coffee': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
  ],
  'Pasta Spaghetti': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
  ],
  'Penne Pasta': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
  ],
  'Basmati Rice': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basmati_rice.jpg/400px-Basmati_rice.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
  ],
  'Jasmine Rice': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basmati_rice.jpg/400px-Basmati_rice.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
  ],
  'Plain Flour': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
  ],
  'Baking Powder': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
  ],
  'Icing Sugar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
  ],
  'Brown Sugar': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
  ],
  'Canned Tomatoes': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/400px-Tomato_je.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
  ],
  'Canned Beans': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
  ],
  'Canned Corn': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
  ],
  'Canned Tuna': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
  ],
  'Soy Sauce': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
  ],
  'Mayonnaise': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
  ],
  'Tomato Ketchup': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/400px-Tomato_je.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
  ],
  'BBQ Sauce': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
  ],
  'Paprika': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
  ],
  'Chili Flakes': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
  ],
  'Garlic Powder': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
  ],
  'Black Pepper': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
  ],
}

const route = useRoute()
const loading = ref(true)
const product = ref(null)
const selectedSize = ref(null)
const activeImage = ref(null)

// All 4 images: [main, ...3 extras] — extras fall back to main if product not in map
const allImages = computed(() => {
  if (!product.value) return []
  const main = product.value.imageUrl || null
  const extras = EXTRA_IMAGES[product.value.name] || [main, main, main]
  return [main, ...extras]
})

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
    // Set main image as the initially active image
    activeImage.value = product.value?.imageUrl || null
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
.breadcrumb a:hover {
  color: var(--color-primary);
}

/* Detail grid */
.detail-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: var(--space-10);
  margin-bottom: var(--space-12);
}

/* Images */
.detail-images {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.detail-img-main {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-50);
}
.detail-img-main img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: var(--space-6);
}
.detail-img-actions {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.detail-thumbs {
  display: flex;
  gap: var(--space-3);
}
.detail-thumb {
  flex: 1;
  aspect-ratio: 1;
  cursor: pointer;
  background: var(--color-grey-50);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition-fast);
}
.detail-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.detail-thumb:hover {
  border-color: var(--color-primary);
}
.detail-thumb--active {
  border-color: var(--color-primary);
  border-width: 2px;
}

/* Info */
.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4) 0;
}
.detail-brand {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-dark);
}
.detail-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-grey-700);
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
.props-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.props-item {
  display: flex;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
}
.props-item dt {
  color: var(--color-grey-500);
  min-width: 120px;
}
.props-item dd {
  color: var(--color-dark);
  font-weight: var(--font-weight-medium);
}

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
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .detail-skeleton { grid-template-columns: 1fr; }
}
</style>