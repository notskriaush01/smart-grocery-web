/**
 * api.js — Central API service
 * Backend: Spring Boot @ http://localhost:8080/api
 * Keeps all fetch logic in one place out of the views.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`
  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    ...options.headers
  }

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error ${response.status}`)
  }

  return response.json()
}

// --- Product endpoints ---
export const productService = {

  /** GET /products/top-deals?limit=8 */
  getTopDeals(limit = 8) {
    return request(`/products/top-deals?limit=${limit}`)
  },

  /** GET /products/:id — returns full ProductDTO with storeListings */
  getById(id) {
    return request(`/products/${id}`)
  },

  /**
   * GET /products?category=fresh-food&page=0&size=12&sort=price_asc&search=
   *
   * Returns Spring Page: { content: [], totalPages, totalElements, number }
   *
   * @param {string} categorySlug  - URL slug e.g. "fresh-food", "dairy-eggs"
   * @param {object} options
   * @param {number} options.page  - 1-indexed (we convert to 0-indexed for Spring)
   * @param {number} options.size
   * @param {string} options.sort  - "price_asc" | "price_desc" | "name_asc"
   * @param {string} options.search
   */
  getByCategory(categorySlug, { page = 1, size = 12, sort = 'price_asc', search = '' } = {}) {
    const params = new URLSearchParams({
      category: categorySlug || '',
      page: page - 1,         // Spring is 0-indexed
      size,
      sort,
      search
    })
    return request(`/products?${params}`) //calls GET /products
  },

  /** GET /products/search?q=chicken&page=0&size=12 */
  search(query, { page = 1, size = 12 } = {}) {
    const params = new URLSearchParams({
      q: query,
      page: page - 1,
      size
    })
    return request(`/products/search?${params}`)
  },

  /** GET /products/menu — { "Fresh Food": ["Fruits", ...], ... } */
  getMenu() {
    return request('/products/menu')
  }
}

// --- Basket endpoints ---
export const basketService = {
  getBasket() { return request('/basket') },
  addItem(productId, quantity = 1) {
    return request('/basket/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    })
  },
  removeItem(productId) {
    return request(`/basket/items/${productId}`, { method: 'DELETE' })
  },
  updateQuantity(productId, quantity) {
    return request(`/basket/items/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity })
    })
  }
}

// --- Auth endpoints ---
export const authService = {
  register({ username, email, password }) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    })
  },
  login({ usernameOrEmail, password }) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password })
    })
  }
}

// --- Recipe endpoints ---
export const recipeService = {
  /** GET /recipes */
  getAll() {
    return request('/recipes')
  },

  /** GET /recipes/:id */
  getById(id) {
    return request(`/recipes/${id}`)
  }
}

// --- AI endpoints ---
export const aiService = {
  /**
   * POST /ai/recipes/from-basket
   * Sends basket items to the AI and returns generated recipes.
   *
   * @param {Array<{productId: number, quantity: number}>} items
   * @returns {Promise<{ recipes: Array }>}
   */
  generateRecipesFromBasket(items) {
    return request('/ai/recipes/from-basket', {
      method: 'POST',
      body: JSON.stringify({ items })
    })
  }
}