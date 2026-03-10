<template>
  <div class="page-content">
    <main class="container contact-page">
      <header class="contact-header">
        <h1 class="contact-title">Get in touch today</h1>
        <p class="contact-subtitle">
          Questions, feedback, or partnership inquiries? Reach out and we'll get back to you as soon as possible.
        </p>
      </header>

      <section class="contact-grid">
        <form class="contact-form card" @submit.prevent>
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">Name</label>
              <input id="contact-name" type="text" class="form-input" placeholder="John Carter" />
            </div>
            <div class="form-group">
              <label for="contact-email" class="form-label">Email</label>
              <input id="contact-email" type="email" class="form-input" placeholder="example@email.com" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="contact-phone" class="form-label">Phone</label>
              <input id="contact-phone" type="tel" class="form-input" placeholder="(123) 456 - 789" />
            </div>
            <div class="form-group">
              <label for="contact-company" class="form-label">Company</label>
              <input id="contact-company" type="text" class="form-input" placeholder="Facebook" />
            </div>
          </div>

          <div class="form-group">
            <label for="contact-message" class="form-label">Leave us message</label>
            <textarea
              id="contact-message"
              class="form-input form-textarea"
              rows="6"
              placeholder="Please type your message here..."
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary contact-submit">Send message</button>
        </form>

        <aside class="contact-image card">
          <img :src="contactImageUrl" alt="People using Smart Basket app in a kitchen" />
        </aside>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue'

const contactImageUrl = '/contact-us-image.png'
</script>

<style scoped>
.contact-page {
  padding-top: var(--space-10);
  padding-bottom: var(--space-12);
}

.contact-header {
  text-align: center;
  max-width: 760px;
  margin: 0 auto var(--space-8);
}

.contact-title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-3);
}

.contact-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-grey-500);
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: var(--space-8);
  align-items: stretch;
}

.contact-form {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-grey-50);
  color: var(--color-dark);
  font-size: var(--font-size-sm);
  outline: none;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.form-input:focus {
  border-color: var(--color-primary);
  background: var(--color-white);
}

.form-textarea {
  border-radius: var(--radius-lg);
  resize: vertical;
  min-height: 120px;
}

.contact-submit {
  align-self: flex-start;
  min-width: 140px;
}

.contact-image {
  border-radius: var(--radius-xl);
  overflow: hidden;
  min-height: 100%;
}

.contact-image img {
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-image img {
    min-height: 340px;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding-top: var(--space-8);
  }

  .contact-title {
    font-size: var(--font-size-3xl);
  }

  .contact-form {
    padding: var(--space-5);
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
