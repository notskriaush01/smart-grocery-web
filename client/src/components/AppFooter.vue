<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <RouterLink to="/" class="logo">
          <span class="logo-icon">🛒</span>
          <span class="logo-text">smartbasket</span>
        </RouterLink>
        <p class="footer-tagline">Shop smart, save more.</p>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h6 class="footer-col-title">Company</h6>
          <RouterLink to="/about-us" class="footer-link">About Us</RouterLink>
          <RouterLink to="/privacy-policy" class="footer-link">Privacy & Policy</RouterLink>
          <RouterLink to="/how-to-use" class="footer-link">How to Use</RouterLink>
        </div>
        <div class="footer-col">
          <h6 class="footer-col-title">Support</h6>
          <RouterLink to="/contact" class="footer-link">Contact us</RouterLink>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p class="footer-copy">
          Copyright © 2026 Smartbasket | All Rights Reserved |
          <RouterLink to="/privacy-policy" class="footer-legal-link">Privacy Policy</RouterLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No logic needed — purely presentational
</script>

<style scoped>
.app-footer {
  background: var(--color-grey-50);
  border-top: 1.5px solid var(--color-border);
  margin-top: auto;
}

.footer-inner {
  display: flex;
  gap: var(--space-16);
  padding: var(--space-12) var(--space-6);
  align-items: flex-start;
}

/* Brand */
.footer-brand {
  flex: 1;
  max-width: 280px;
}
.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  margin-bottom: var(--space-4);
}
.logo-icon {
  font-size: var(--font-size-lg);
  background: var(--color-primary);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  font-family: var(--font-heading);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-dark);
}
.footer-tagline {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
  line-height: var(--line-height-base);
}

/* Links */
.footer-links {
  display: flex;
  gap: var(--space-16);
}
.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.footer-col-title {
  font-family: var(--font-heading);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  margin-bottom: var(--space-1);
}
.footer-link {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.footer-link:hover {
  color: var(--color-primary);
}

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding: var(--space-4) 0;
}
.footer-copy {
  font-size: var(--font-size-xs);
  color: var(--color-grey-500);
  text-align: center;
}
.footer-legal-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: var(--font-size-xs);
}
.footer-legal-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer-inner {
    flex-direction: column;
    gap: var(--space-8);
  }
  .footer-brand { max-width: 100%; }
}
</style>