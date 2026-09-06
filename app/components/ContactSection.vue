<template>
  <section class="contact" id="contact">
    <div class="grain-overlay" aria-hidden="true"></div>

    <div class="container contact-inner">
      <div class="section-header">
        <span class="mini-logo" aria-hidden="true">
          <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.5">
            <path d="M32 4C32 4 26 14 26 22C26 26.4 28.7 30 32 30C35.3 30 38 26.4 38 22C38 14 32 4 32 4Z"/>
            <path d="M32 30C32 30 20 28 14 20C11 16 10 12 10 12C10 12 16 12 22 16C28 20 32 30 32 30Z"/>
            <path d="M32 30C32 30 44 28 50 20C53 16 54 12 54 12C54 12 48 12 42 16C36 20 32 30 32 30Z"/>
            <line x1="32" y1="30" x2="32" y2="36"/>
          </svg>
        </span>
        <h2>Contact <span class="accent">Us</span></h2>
        <p class="subtitle">
          Whether you have inquiries, special requests, or want to make reservations, this is your direct link to our dedicated team. Feel free to reach out via the provided contact details, and we'll be delighted to assist you in planning your dream getaway or event. Your journey with us begins here.
        </p>
      </div>

      <div class="contact-card">
        <div class="map-wrap">
          <iframe
            src="https://www.google.com/maps?q=Aambal+Resort+and+Events,+Aluva,+Kerala&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Aambal Resort location"
          ></iframe>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-icon">📍</span>
            <div>
              <h4>Location</h4>
              <p>AAMBAL Resort, Chengamanadu Nedumbassery, Ernakulam, Kerala–683578</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">🕐</span>
            <div>
              <h4>Open Hours</h4>
              <p>Monday–Sunday<br />10:00 AM – 10:00 PM</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">✉️</span>
            <div>
              <h4>Email</h4>
              <p>aambalresort@gmail.com<br />contact@aambalresort.in</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📞</span>
            <div>
              <h4>Call</h4>
              <p>+91 9447 036 444<br />+91 9747 036 444<br />+91 9400 814 443<br />0484 2925 444</p>
            </div>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-row">
            <div class="form-field">
              <input v-model="form.name" type="text" required />
              <label>Your Name</label>
            </div>
            <div class="form-field">
              <input v-model="form.email" type="email" required />
              <label>Your Email</label>
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <input v-model="form.subject" type="text" />
              <label>Subject</label>
            </div>
            <div class="form-field">
              <input v-model="form.phone" type="tel" />
              <label>Your Phone No</label>
            </div>
          </div>
          <div class="form-field full">
            <textarea v-model="form.message" rows="5" required></textarea>
            <label>Message</label>
          </div>

          <button type="submit" class="btn-submit">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  subject: '',
  phone: '',
  message: '',
})

function handleSubmit() {
  // Wire this up to an actual form endpoint (email service, backend API, etc.) when ready
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
.contact {
  position: relative;
  background: var(--color-cream);
  padding-block: var(--space-xl);
  overflow: hidden;
}

.grain-overlay {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.06;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/rect%3E%3C/svg%3E");
  animation: grain-shift 0.5s steps(4) infinite;
}

@keyframes grain-shift {
  0%   { transform: translate(0, 0); }
  25%  { transform: translate(-2%, 2%); }
  50%  { transform: translate(2%, -2%); }
  75%  { transform: translate(-1%, 1%); }
  100% { transform: translate(0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .grain-overlay { animation: none; }
}

.contact-inner {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto var(--space-lg);
}

.mini-logo {
  display: inline-flex;
  color: var(--color-accent);
  width: 56px;
  height: 36px;
  margin-bottom: var(--space-sm);
}
.mini-logo svg { width: 100%; height: 100%; }

.section-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-sm);
}

.section-header h2 .accent {
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(90deg, #E9BF6F 0%, #C79C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--color-text-muted);
  line-height: 1.75;
}

/* Card wrapping map + info + form */
.contact-card {
  background: var(--color-white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(15, 59, 45, 0.1);
}

.map-wrap {
  width: 100%;
  height: 320px;
  filter: grayscale(20%) sepia(8%);
}

.map-wrap iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* Info grid */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-bottom: 1px solid rgba(47, 69, 56, 0.1);
}

.info-item {
  display: flex;
  gap: var(--space-sm);
  align-items: flex-start;
}

.info-icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #F7DD9A 0%, #E9BF6F 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.info-item h4 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary-dark);
  margin-bottom: 0.2rem;
}

.info-item p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Form */
.contact-form {
  padding: var(--space-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

.form-field {
  position: relative;
}

.form-field.full {
  margin-bottom: var(--space-lg);
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 0.9rem 0;
  border: none;
  border-bottom: 1.5px solid rgba(47, 69, 56, 0.25);
  background: transparent;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-primary-dark);
  transition: border-color var(--duration-fast) var(--ease-smooth);
}

.form-field textarea {
  resize: vertical;
}

.form-field input:focus,
.form-field textarea:focus {
  outline: none;
  border-bottom-color: var(--color-accent);
}

.form-field label {
  position: absolute;
  top: 0.9rem;
  left: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
  pointer-events: none;
  transition: all var(--duration-fast) var(--ease-smooth);
}

.form-field input:focus + label,
.form-field input:not(:placeholder-shown) + label,
.form-field input:valid + label,
.form-field textarea:focus + label,
.form-field textarea:valid + label {
  top: -0.8rem;
  font-size: 0.75rem;
  color: var(--color-accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.btn-submit {
  display: block;
  margin-inline: auto;
  padding: 0.9rem 2.6rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #F7DD9A 0%, #C79C52 100%);
  color: var(--color-primary-dark);
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: transform var(--duration-fast) var(--ease-bounce),
              box-shadow var(--duration-fast) var(--ease-smooth);
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(199, 156, 82, 0.4);
}

@media (min-width: 700px) {
  .info-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>