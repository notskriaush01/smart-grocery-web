<template>
  <div class="page-content">
    <main class="container about-page">
      <header class="about-header">
        <h1 class="about-kicker">About Us</h1>
      </header>

      <section class="about-hero">
        <div class="about-hero__left">
          <h2 class="about-title">Helping You Save Up to 25% on Your Weekly Groceries</h2>

          <div class="about-pills">
            <p class="about-pill">Compare grocery prices across multiple stores</p>
            <p class="about-pill">Organise your basket where it&apos;s cheapest</p>
            <p class="about-pill">Discover alternative products at lower prices</p>
            <p class="about-pill">Make smarter shopping decisions in seconds.</p>
          </div>
        </div>

        <div class="about-hero__right">
          <div class="about-image-frame card">
            <img src="/about-upper-image.png" alt="Groceries and piggy bank representing savings" />
          </div>
        </div>
      </section>

      <section class="about-story">
        <div class="about-story__left">
          <div class="about-image-frame card">
            <img src="/about-lower-image.png" alt="Small student team collaborating together" />
          </div>
        </div>

        <div class="about-story__right">
          <article class="about-block">
            <h3 class="about-subtitle">Created by a small team of students</h3>
            <p>
              Smart Basket was created by a small team of students who were frustrated by rising grocery prices. We
              realised that most shoppers don&apos;t overpay intentionally, they simply lack visibility.
            </p>
            <p>
              Prices vary significantly between supermarkets, yet comparing them manually is time-consuming and
              inefficient. We decided to build a solution.
            </p>
          </article>

          <article class="about-block">
            <h3 class="about-subtitle">Our mission: Helping you save more.</h3>
            <p>
              Our mission is to make grocery shopping more affordable by providing clear, comparable pricing
              information across stores. No hidden complexity. Just simple, transparent tools that help you spend less,
              save more and shop smarter.
            </p>
          </article>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.about-page {
  padding-top: var(--space-8);
  padding-bottom: var(--space-12);
}

.about-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

/* Page title — largest, centred, normal casing, moderate letter-spacing */
.about-kicker {
  font-size: var(--font-size-4xl);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.02em;
  color: var(--color-dark);
}

.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: var(--space-8);
  align-items: start;
}

/* Section heading — clearly smaller than page title */
.about-title {
  max-width: 640px;
  font-size: var(--font-size-2xl);
  font-family: var(--font-heading);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-8);
}

.about-pills {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 520px;
}

.about-pill {
  width: 100%;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  padding: var(--space-3) var(--space-5);
}

.about-image-frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  min-height: 320px;
}

.about-image-frame img {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
}

.about-story {
  margin-top: var(--space-12);
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: var(--space-8);
  align-items: start;
}

.about-story__left .about-image-frame {
  min-height: 360px;
}

.about-story__left .about-image-frame img {
  min-height: 360px;
}

.about-story__right {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* Sub-heading — one step below section heading */
.about-subtitle {
  font-size: var(--font-size-xl);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-4);
  color: var(--color-dark);
}

/* Body text — readable, not tiny */
.about-block p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-grey-700);
}

.about-block p + p {
  margin-top: var(--space-3);
}

@media (max-width: 1024px) {
  .about-hero,
  .about-story {
    grid-template-columns: 1fr;
  }

  .about-story {
    margin-top: var(--space-10);
  }
}

@media (max-width: 768px) {
  .about-page {
    padding-top: var(--space-6);
  }

  .about-kicker {
    font-size: var(--font-size-3xl);
  }

  .about-title {
    font-size: var(--font-size-xl);
  }

  .about-pill {
    font-size: var(--font-size-sm);
  }
}
</style>