<template>
  <section class="specials" id="specials">
    <div class="grain-overlay" aria-hidden="true"></div>
    <div class="container specials-inner">
      <div class="specials-grid">
        <!-- Left: text -->
        <Transition name="fade-slide" mode="out-in">
          <div class="specials-text" :key="activeIndex">
            <span class="eyebrow">Check our Specials</span>
            <h2>
              {{ current.titleLine1 }}
              <span class="accent">{{ current.titleLine2 }}</span>
            </h2>

            <div v-if="current.type === 'list'" class="nearby-content">
              <h4>What's nearby</h4>
              <ul class="nearby-list">
                <li v-for="item in current.transport" :key="item.label">
                  <span class="dot">•</span> {{ item.label }} <span class="km">{{ item.km }}</span>
                </li>
              </ul>
              <h4>Top attractions nearby</h4>
              <ul class="nearby-list">
                <li v-for="item in current.attractions" :key="item.label">
                  <span class="dot">•</span> {{ item.label }} <span class="km">{{ item.km }}</span>
                </li>
              </ul>
            </div>

            <p v-else v-for="(p, i) in current.paragraphs" :key="i" class="body-text">
              {{ p }}
            </p>

            <div class="signature-link">
              <span>{{ current.linkLabel }}</span>
              <svg class="squiggle" viewBox="0 0 80 10" fill="none">
                <path d="M0 5 Q10 0 20 5 T40 5 T60 5 T80 5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </Transition>

        <!-- Right: images -->
        <Transition name="fade-slide" mode="out-in">
          <div class="specials-media" :key="'media-' + activeIndex">
            <div class="media-main">
              <img :src="current.mainImage" :alt="current.titleLine1" />
            </div>
            <div class="media-side">
              <img :src="current.sideImage" :alt="current.titleLine2" />
            </div>
          </div>
        </Transition>
      </div>

      <!-- Number nav -->
      <div class="tab-nav">
        <template v-for="(tab, index) in tabs" :key="tab.id">
          <button
            class="tab-dot"
            :class="{ active: index === activeIndex }"
            @click="activeIndex = index"
          >
            {{ index + 1 }}
          </button>
          <svg v-if="index < tabs.length - 1" class="connector" viewBox="0 0 60 10" fill="none">
            <path d="M0 5 Q7.5 0 15 5 T30 5 T45 5 T60 5" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import img1 from '~/assets/css/img/aambal_main.png'
import img2 from '~/assets/css/img/aambal_side.png'
import img3 from '~/assets/css/img/aambal_side2.png'

const activeIndex = ref(0)

const tabs = ref([
  {
    id: 'events',
    titleLine1: 'events',
    titleLine2: 'space',
    paragraphs: [
      "At our riverfront resort, we take pride in providing a wide range of event handling facilities to cater to your special occasions, celebrations, and gatherings. Nestled amidst the serene beauty of Kerala's riverfront, our resort offers a picturesque backdrop for your events, whether they are personal, corporate, or social.",
      "Our experienced event planning team is dedicated to making your special day a seamless and memorable experience.",
    ],
    linkLabel: 'Event Details',
    mainImage: img1,
    sideImage: img2,
    type: 'text',
  },
  {
    id: 'activities',
    titleLine1: 'kerala',
    titleLine2: 'activities',
    paragraphs: [
      "Welcome to our beautiful riverfront resort in the enchanting state of Kerala, where nature and adventure come together to offer you a truly unforgettable experience. Here, you will find a plethora of activities to immerse yourself in the rich culture, serene landscapes, and thrilling adventures that Kerala has to offer.",
    ],
    linkLabel: 'Explore Activities',
    mainImage: img2,
    sideImage: img3,
    type: 'text',
  },
  {
    id: 'cottages',
    titleLine1: 'riverfront',
    titleLine2: 'cottages',
    paragraphs: [
      "Experience the sheer beauty of the scenic views and peaceful atmosphere that our rooms provide.",
      "Your stay at our resort promises not only a comfortable and relaxing experience but also a deep connection with the serene beauty of the river.",
    ],
    linkLabel: 'View Accommodations',
    mainImage: img3,
    sideImage: img1,
    type: 'text',
  },
  {
    id: 'nearby',
    titleLine1: "what's",
    titleLine2: 'nearby',
    transport: [
      { label: 'Cochin International Airport', km: '6.7 KM' },
      { label: 'Metro Aluva', km: '7.0 KM' },
      { label: 'Railway Station Aluva', km: '8.4 KM' },
      { label: 'Railway Station Ernakulam', km: '28.0 KM' },
    ],
    attractions: [
      { label: 'Mattancherry Palace', km: '37.0 KM' },
      { label: 'Kerala Museum', km: '29.0 KM' },
      { label: 'Hill Palace Museum', km: '30.0 KM' },
      { label: 'Indo-Portuguese Museum', km: '33.0 KM' },
      { label: 'Athirappilly Water Falls', km: '44.0 KM' },
    ],
    linkLabel: 'Get Directions',
    mainImage: img1,
    sideImage: img3,
    type: 'list',
  },
])

const current = computed(() => tabs.value[activeIndex.value])
</script>

<style scoped>
.specials {
  position: relative;
  background: #ffe491; 
  padding-block: var(--space-xl);
  overflow: hidden;
}

.specials-inner {
  position: relative;
  z-index: 1;
}

.grain-overlay {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  z-index: 0;
  pointer-events: none;
  opacity: 1.5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain-shift 0.5s steps(4) infinite;
}

@keyframes grain-shift {
  0%   { transform: translate(0, 0); }
  25%  { transform: translate(-2%, 2%); }
  50%  { transform: translate(2%, -2%); }
  75%  { transform: translate(-1%, 1%); }
  100% { transform: translate(0, 0); }
}

.specials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  min-height: 480px;
}

/* Text side */
.eyebrow {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
}

.specials-text h2 {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 5vw, 3.2rem);
  font-weight: 500;
  color: var(--color-primary-dark);
  line-height: 1.1;
  text-transform: capitalize;
  margin-bottom: var(--space-md);
}

.specials-text h2 .accent {
  display: block;
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(90deg, #E9BF6F 0%, #C79C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.body-text {
  color: var(--color-text-muted);
  line-height: 1.75;
  margin-bottom: var(--space-sm);
  max-width: 520px;
}

.nearby-content h4 {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  color: var(--color-primary-dark);
  margin-bottom: var(--space-xs);
  margin-top: var(--space-sm);
}

.nearby-list {
  margin-bottom: var(--space-sm);
}

.nearby-list li {
  color: var(--color-text-muted);
  padding: 0.25rem 0;
  display: flex;
  justify-content: space-between;
  max-width: 420px;
  border-bottom: 1px dashed rgba(47, 69, 56, 0.15);
}

.nearby-list .dot {
  color: var(--color-accent);
  margin-right: 0.4rem;
}

.nearby-list .km {
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.9rem;
}

.signature-link {
  display: inline-flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: var(--space-md);
  font-family: var(--font-body);
  font-size: var(--fs-small);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary-dark);
}

.squiggle {
  width: 70px;
  height: 10px;
  color: var(--color-accent);
}

/* Media side */
.specials-media {
  display: flex;
  gap: var(--space-sm);
  align-items: stretch;
}

.media-main {
  flex: 2;
  border-radius: var(--radius);
  overflow: hidden;
}

.media-side {
  flex: 1;
  border-radius: var(--radius);
  overflow: hidden;
}

.media-main img,
.media-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 420px;
}

/* Number nav */
.tab-nav {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: var(--space-lg);
}

.tab-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--color-text-muted);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--duration-fast) var(--ease-smooth);
}

.tab-dot.active {
  background: linear-gradient(135deg, #F7DD9A 0%, #C79C52 100%);
  border-color: transparent;
  color: var(--color-primary-dark);
  transform: scale(1.1);
}

.connector {
  width: 40px;
  height: 10px;
  color: var(--color-text-muted);
  opacity: 0.4;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (min-width: 900px) {
  .specials-grid {
    grid-template-columns: 0.9fr 1.5fr;
    align-items: center;
  }
  .grain-overlay {
    animation: none;
  }
}

</style>