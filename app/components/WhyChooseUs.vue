<template>
  <section class="why-choose" id="why-choose">
    <div class="grain-overlay" aria-hidden="true"></div>
    <div class="container why-choose-inner">
      <div class="section-header">
        <span class="mini-logo" aria-hidden="true">
  <svg viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.5">
    <path d="M32 4C32 4 26 14 26 22C26 26.4 28.7 30 32 30C35.3 30 38 26.4 38 22C38 14 32 4 32 4Z"/>
    <path d="M32 30C32 30 20 28 14 20C11 16 10 12 10 12C10 12 16 12 22 16C28 20 32 30 32 30Z"/>
    <path d="M32 30C32 30 44 28 50 20C53 16 54 12 54 12C54 12 48 12 42 16C36 20 32 30 32 30Z"/>
    <path d="M32 30C32 30 24 32 18 30C14 28.5 12 26 12 26C12 26 17 24 23 25C28 26 32 30 32 30Z"/>
    <path d="M32 30C32 30 40 32 46 30C50 28.5 52 26 52 26C52 26 47 24 41 25C36 26 32 30 32 30Z"/>
    <line x1="32" y1="30" x2="32" y2="36"/>
  </svg>
</span>

        <h2>Why choose <span class="script">Our Resort</span></h2>

        <p class="subtitle">
          Select our riverfront resort for an enchanting experience where stunning views, water-based activities, and a tranquil atmosphere converge to create unforgettable moments along the river's edge.
        </p>
      </div>

      <div class="cards-grid">
        <div v-for="card in cards" :key="card.title" class="why-card">
          <div class="why-card-img">
            <img :src="card.image" :alt="card.title" />
          </div>
          <div class="why-card-body">
            <h3>{{ card.title }}</h3>
            <div class="card-divider"></div>
            <p>{{ card.text }}</p>
          </div>
          <span class="corner-leaf" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill="currentColor"/>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Swap these placeholder images for real event-space/river/relaxation photos when available
import img1 from '~/assets/css/img/aambal_main.png'
import img2 from '~/assets/css/img/aambal_side.png'
import img3 from '~/assets/css/img/aambal_side2.png'

const cards = ref([
  {
    title: 'Versatile Event Spaces',
    text: 'Our resort offers a variety of versatile event spaces, accommodating a wide range of gatherings, from weddings to corporate conferences.',
    image: img1,
  },
  {
    title: 'Scenic Views',
    text: 'Our resort offers breathtaking riverfront views, creating a serene and picturesque backdrop for your stay.',
    image: img2,
  },
  {
    title: 'Relaxation and Romance',
    text: 'The peaceful ambiance of our riverfront setting makes it the perfect choice for a romantic getaway or a serene escape from the hustle and bustle of everyday life.',
    image: img3,
  },
])
</script>

<style scoped>
.grain-overlay {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.15;
  mix-blend-mode: overlay;
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
  .grain-overlay {
    animation: none;
  }
}

.why-choose {
  position: relative;
  padding-block: var(--space-xl);
  background: linear-gradient(
    135deg,
    #bcb597 0%,
    #a6b06a 50%,
    #bcb597 100%
  );
  overflow: hidden;
}

.why-choose-inner {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto var(--space-lg);
}

.mini-logo {
  display: inline-flex;
  color: var(--color-accent);
  width: 56px;
  height: 36px;
  margin-bottom: var(--space-sm);
}

.mini-logo svg {
  width: 100%;
  height: 100%;
}

.section-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  color: #123a0a;
  margin-bottom: var(--space-sm);
}

.section-header h2 .script {
  font-family: var(--font-heading);
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(90deg, #E9BF6F 0%, #C79C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #e9e3c4;
  font-size: 1rem;
  line-height: 1.7;
}

/* Cards */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  align-items: stretch;
}

.why-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--duration-med) var(--ease-smooth);
  display: flex;
  flex-direction: column;
}

.why-card:hover {
  transform: translateY(-6px);
}

.why-card-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.why-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s var(--ease-smooth);
}

/* Smooth fade from image into card */
.why-card-img::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  height: 110px;

  background: linear-gradient(
    to bottom,
    rgba(97, 109, 27, 0) 0%,
    rgba(97, 109, 27, 0.15) 25%,
    rgba(97, 109, 27, 0.71) 90%,
    #616d1b 100%
  );

  pointer-events: none;
}

.why-card:hover .why-card-img img {
  transform: scale(1.06);
}

.why-card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-md) var(--space-md) var(--space-lg);
  text-align: center;
  background: linear-gradient(180deg, #616d1b 0%, #39530e 100%);
  color: var(--color-white);
}

.why-card-body h3 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: var(--space-xs);
}

.card-divider {
  width: 36px;
  height: 2px;
  background: linear-gradient(90deg, #F7DD9A 0%, #C79C52 100%);
  margin: 0 auto var(--space-sm);
}

.why-card-body p {
  font-size: 0.92rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
}

.corner-leaf {
  position: absolute;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  color: var(--color-accent);
  opacity: 0.8;
}

.corner-leaf svg {
  width: 100%;
  height: 100%;
}

.bg-arc {
  position: absolute;
  top: 320px; /* adjust this — should sit just above where your cards start */
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0F3B2D 0%, #0A2D22 100%);
  border-radius: 50% 50% 0 0 / 70px 70px 0 0;
  z-index: 0;
} 

@media (min-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
    align-items: stretch;
  }
}
</style>