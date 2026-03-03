import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductListView from '@/views/ProductListView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import BasketView from '@/views/BasketView.vue'
import SearchView from '@/views/SearchView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/search', name: 'Search', component: SearchView },
  { path: '/category/:slug', name: 'ProductList', component: ProductListView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
  { path: '/basket', name: 'Basket', component: BasketView },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    //meta: { requiresAuth: true }
  },
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