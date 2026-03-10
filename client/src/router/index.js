import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductListView from '@/views/ProductListView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import BasketView from '@/views/BasketView.vue'
import SearchView from '@/views/SearchView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RecipeListView from '@/views/RecipeListView.vue'
import RecipeIngredientsView from '@/views/RecipeIngredientsView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import HowToUseView from '@/views/HowToUseView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import ContactUsView from '@/views/ContactUsView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/search', name: 'Search', component: SearchView },
  { path: '/recipes', name: 'RecipeList', component: RecipeListView },
  { path: '/recipes/:id', name: 'RecipeIngredients', component: RecipeIngredientsView },
  { path: '/category/:slug', name: 'ProductList', component: ProductListView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
  { path: '/basket', name: 'Basket', component: BasketView },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    //meta: { requiresAuth: true }
  },
  { path: '/about-us', name: 'AboutUs', component: AboutUsView },
  { path: '/contact', name: 'ContactUs', component: ContactUsView },
  { path: '/how-to-use', name: 'HowToUse', component: HowToUseView },
  { path: '/privacy-policy', name: 'PrivacyPolicy', component: PrivacyPolicyView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

// Guard — redirect to home if not logged in
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const raw = localStorage.getItem('sb_user')
    if (!raw) return { path: '/' }
  }
  return true
})

export default router
