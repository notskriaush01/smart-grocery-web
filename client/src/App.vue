<template>
  <AppHeader
    :basket-count="basketCount"
    @open-auth="authOpen = true"
  />
  <RouterView />
  <CookieConsentModal
    v-if="showCookieModal"
    @allow="handleCookieConsent('allow')"
    @decline="handleCookieConsent('decline')"
  />
  <AuthSidebar v-model="authOpen" @login-success="onLoginSuccess" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CookieConsentModal from '@/components/CookieConsentModal.vue'

const showCookieModal = ref(false)
const COOKIE_CONSENT_KEY = 'cookie_consent'

function handleCookieConsent(choice) {
  localStorage.setItem(COOKIE_CONSENT_KEY, choice)
  showCookieModal.value = false
}

onMounted(() => {
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
  showCookieModal.value = !savedConsent
})

import AuthSidebar from '@/components/AuthSidebar.vue'
import { useBasket } from '@/composables/useBasket.js'

const { basketCount } = useBasket()
const authOpen = ref(false)

function onLoginSuccess(user) {
  console.log('Logged in:', user)
  // TODO: store user info when backend is ready
}
</script>
