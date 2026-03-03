<template>
  <div class="page-content">
    <div class="container policy-page">
      <header class="policy-header">
        <h1 class="policy-title">Privacy Policy</h1>
        <p class="policy-updated">Last Updated: February 25, 2026</p>
        <p class="policy-intro">
          This page explains what data we collect, why we collect it, and how we use it to provide our services.
        </p>
      </header>

      <section class="policy-section card">
        <h2>1. Introduction</h2>
        <p>
          Smart Basket is committed to protecting your personal data. This Privacy Policy explains how we collect, use,
          and safeguard your information when you use our website and services to compare grocery prices across the UK.
        </p>
      </section>

      <section class="policy-section card">
        <h2>2. What Data We Collect</h2>
        <p>We collect information to provide a better experience for our users. This is categorized as follows:</p>

        <h3>a) Account Information</h3>
        <p>When you create an account on Smart Basket, we collect information provided directly by you:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Encrypted password (stored in hashed form)</li>
        </ul>
        <p class="policy-note">Note: You may browse the website as a guest without creating an account.</p>

        <h3>b) Basket and Saved Product Data</h3>
        <p>When you are logged in and interact with our tools, we store:</p>
        <ul>
          <li>Products added to your basket</li>
          <li>Saved product selections linked to your account</li>
        </ul>
        <p>This data is necessary for core functionality, allowing you to manage and compare your selected items.</p>

        <h3>c) Search and Usage Data</h3>
        <p>To improve our service, we may collect information regarding your activity:</p>
        <ul>
          <li>Search queries</li>
          <li>Pages visited</li>
          <li>Interactions with website features</li>
          <li>Time spent on specific pages</li>
        </ul>

        <h3>d) Technical Information</h3>
        <p>We automatically collect technical data via server logs for security and maintenance:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type and operating system</li>
          <li>Date and time of access</li>
        </ul>
      </section>

      <section class="policy-section card">
        <h2>3. How We Use Your Data</h2>
        <p>We use the data collected for the following purposes:</p>
        <ul>
          <li>
            <strong>Account Management:</strong>
            To create and maintain your account, verify your identity, and enable secure login.
          </li>
          <li>
            <strong>Security and Authentication:</strong>
            To send verification or password reset emails and to detect or prevent fraudulent activity.
          </li>
          <li>
            <strong>Website Functionality:</strong>
            To provide accurate search results and ensure the website operates correctly.
          </li>
          <li>
            <strong>Improvement and Performance:</strong>
            To analyze user interaction, fix technical issues, and improve usability.
          </li>
        </ul>

        <p class="policy-note">Our Commitment:</p>
        <ul>
          <li>We do not sell your personal data.</li>
          <li>We do not use your data for advertising purposes.</li>
          <li>We do not send marketing emails.</li>
        </ul>
      </section>

      <section class="policy-section card">
        <h2>4. Legal Basis for Processing (UK GDPR)</h2>
        <p>Under the UK General Data Protection Regulation (UK GDPR), we process personal data based on:</p>
        <ul>
          <li>
            <strong>Contract:</strong>
            Necessary to provide the services you request (for example, managing your account and basket).
          </li>
          <li>
            <strong>Legitimate Interests:</strong>
            To maintain website security, prevent misuse, and improve performance, provided these interests do not
            override your rights.
          </li>
          <li>
            <strong>Legal Obligation:</strong>
            To comply with any applicable legal or regulatory requirements.
          </li>
        </ul>
      </section>

      <section class="policy-section card">
        <h2>5. Data Sharing</h2>
        <p>
          <strong>Important Note:</strong>
          Smart Basket is currently a student project operating in a local development environment and is not yet
          publicly hosted.
        </p>
        <ul>
          <li>We do not sell, rent, or trade personal data to third parties.</li>
          <li>
            If the website is deployed in the future, data may be processed by a hosting provider acting strictly as a
            data processor under secure conditions.
          </li>
          <li>We do not share data for marketing or advertising.</li>
        </ul>
      </section>

      <section class="policy-section card">
        <h2>6. Data Retention</h2>
        <p>We retain personal data only for as long as necessary:</p>
        <ul>
          <li><strong>Account Data:</strong> Stored for as long as the user account remains active.</li>
          <li><strong>Technical Data:</strong> Retained for a limited period for security and troubleshooting.</li>
          <li>
            <strong>Account Deletion:</strong>
            Currently, Smart Basket does not have an automated deletion button. Users wishing to delete their data
            should follow the instructions in the Contact Information section below.
          </li>
        </ul>
      </section>

      <section class="policy-section card">
        <h2>7. Your Data Protection Rights</h2>
        <p>Under UK GDPR, you have the following rights:</p>
        <ul>
          <li><strong>Right of Access:</strong> Request a copy of the data we hold about you.</li>
          <li><strong>Right to Rectification:</strong> Request correction of inaccurate data.</li>
          <li>
            <strong>Right to Erasure:</strong>
            Request deletion of your data where no legal basis for processing remains.
          </li>
          <li>
            <strong>Right to Restrict or Object:</strong>
            Limit or object to how we process your data based on legitimate interests.
          </li>
          <li><strong>Right to Data Portability:</strong> Request your data in a machine-readable format.</li>
        </ul>
        <p>
          To exercise these rights, please contact us directly. You also have the right to lodge a complaint with a
          data protection supervisory authority.
        </p>
      </section>

      <section class="policy-section card">
        <h2>8. Security</h2>
        <p>
          We take reasonable, proportionate steps to protect personal data within the scope of this student project.
        </p>
        <ul>
          <li>Passwords are encrypted (hashed).</li>
          <li>Access is restricted within the development environment.</li>
        </ul>
        <p class="policy-note">
          Disclaimer: As this is a student project, security measures are basic. No method of electronic storage is
          100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.policy-page {
  padding-top: var(--space-10);
  padding-bottom: var(--space-12);
}

/* ── Page title: centred, biggest, moderate letter-spacing, normal casing ── */
.policy-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.policy-title {
  font-size: var(--font-size-4xl);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.02em;
  color: var(--color-dark);
  margin-bottom: var(--space-2);
}

.policy-updated {
  font-size: var(--font-size-sm);
  color: var(--color-grey-500);
  margin-bottom: var(--space-4);
}

.policy-intro {
  max-width: 680px;
  margin: 0 auto;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-grey-700);
}

.policy-section {
  padding: var(--space-6);
  margin-bottom: var(--space-5);
  border-radius: var(--radius-lg);
}

/* Section heading — clearly below page title */
.policy-section h2 {
  font-size: var(--font-size-xl);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-3);
  color: var(--color-dark);
}

/* Sub-heading within a section */
.policy-section h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-top: var(--space-4);
  margin-bottom: var(--space-2);
  color: var(--color-grey-900);
}

/* Body text — readable */
.policy-section p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  margin-bottom: var(--space-3);
  color: var(--color-grey-700);
}

.policy-section ul {
  list-style: disc;
  padding-left: 1.2rem;
  margin-bottom: var(--space-3);
}

.policy-section li {
  color: var(--color-grey-700);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

.policy-note {
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}

@media (max-width: 768px) {
  .policy-page {
    padding-top: var(--space-8);
  }

  .policy-title {
    font-size: var(--font-size-3xl);
  }

  .policy-section {
    padding: var(--space-5);
  }
}
</style>