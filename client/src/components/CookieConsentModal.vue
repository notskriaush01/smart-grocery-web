<template>
  <div class="cookie-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
    <div class="cookie-modal card">
      <div class="cookie-modal-icon" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M51.5 34.4C47.5 33.7 44.4 30.2 44.4 25.9C44.4 24.9 44.6 24 44.9 23.1C41.2 21.5 37 20.6 32.6 20.6C17.8 20.6 5.8 32.6 5.8 47.4C5.8 53.9 8.2 59.9 12.2 64H36.8C49.8 62.1 59.8 50.9 59.8 37.4C59.8 36.4 59.7 35.4 59.6 34.5C57.7 35 55.7 35.1 53.8 34.8L51.5 34.4Z"
            fill="var(--color-primary-light)"
          />
          <path
            d="M31.7 8C31.7 12.6 35.4 16.4 40 16.4C40.9 16.4 41.8 16.3 42.6 16C45 15.4 47.5 16.6 49.1 18.8C51.3 21.8 54.8 23.8 58.8 23.8C60.2 23.8 61.5 23.6 62.7 23.2C63.5 25.4 64 27.8 64 30.2C64 47.8 49.7 62.1 32.1 62.1C14.4 62.1 0 47.8 0 30.2C0 14.7 11.1 1.8 25.8 0.4C26.3 4.7 28.6 8 31.7 8Z"
            fill="var(--color-primary)"
          />
          <circle cx="18" cy="27" r="3.5" fill="var(--color-primary-dark)" />
          <circle cx="24" cy="39" r="3.5" fill="var(--color-primary-dark)" />
          <circle cx="36" cy="35" r="3" fill="var(--color-primary-dark)" />
          <circle cx="30" cy="24" r="2.8" fill="var(--color-primary-dark)" />
          <circle cx="44" cy="46" r="3.2" fill="var(--color-primary-dark)" />
        </svg>
      </div>

      <div class="cookie-modal-content">
        <h2 id="cookie-modal-title" class="cookie-modal-title">Cookies</h2>
        <p class="cookie-modal-text">
          We use cookies to improve your experience on our website. You can allow or decline.
        </p>
      </div>

      <div class="cookie-modal-actions">
        <button type="button" class="btn btn-primary cookie-btn" @click="$emit('allow')">Allow</button>
        <button type="button" class="btn btn-outline cookie-btn" @click="$emit('decline')">Decline</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['allow', 'decline'])
</script>

<style scoped>
.cookie-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 350;
  background: rgba(26, 26, 46, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.cookie-modal {
  width: min(560px, 100%);
  border-radius: var(--radius-xl);
  border: 1.5px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
  display: grid;
  gap: var(--space-4);
}

.cookie-modal-icon {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-primary-subtle);
}

.cookie-modal-icon svg {
  width: 30px;
  height: 30px;
}

.cookie-modal-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-2);
}

.cookie-modal-text {
  font-size: var(--font-size-sm);
  color: var(--color-grey-700);
}

.cookie-modal-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  flex-wrap: wrap;
}

.cookie-btn {
  min-width: 110px;
  justify-content: center;
}

@media (max-width: 640px) {
  .cookie-modal {
    padding: var(--space-5);
  }

  .cookie-modal-actions {
    width: 100%;
  }

  .cookie-btn {
    flex: 1;
  }
}
</style>
