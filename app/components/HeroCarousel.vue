<template>
  <section class="hero" id="hero" ref="sectionRef">
    <div class="hero-sticky">
      <div class="logo-wrap" :style="{ opacity: headingOpacity }">
  <h1 class="hero-heading">
    Discover An<br />
    Infinite Escape
  </h1>

  <div class="aambal-script">
    Aambal Resorts & Events
  </div>
</div>

      <div 
  class="expand-frame" 
  :style="{ 
    width: frameWidth + '%', 
    height: frameHeight + 'vh', 
    borderRadius: frameRadius + 'px',
    transform: `translateY(${framePosition}px)`,
  }" 
>
        <Transition :name="slideDirection">
          <div :key="activeIndex" class="hero-slide">
            <img :src="current.image" :alt="current.title" class="frame-img" />
            <div class="frame-overlay" :style="{ opacity: contentOpacity }"></div>
            <div class="frame-content" :style="{ opacity: contentOpacity }">
  <img
    v-if="activeIndex === 0"
    :src="aambalLogo"
    alt="Aambal Resort"
    class="slide-aambal-logo"
  />

  <h1>{{ current.title }}</h1>
</div>
          </div>
        </Transition>

        <button class="nav-arrow nav-left" @click="prevPanel" aria-label="Previous">‹</button>
        <button class="nav-arrow nav-right" @click="nextPanel" aria-label="Next">›</button>

        <div class="dot-nav">
          <button
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="dot"
            :class="{ active: index === activeIndex }"
            @click="goToPanel(index)"
            :aria-label="`Go to ${slide.title}`"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import img1 from '~/assets/css/img/aambal_mainn.png'
import img2 from '~/assets/css/img/aambal_sidee.png'
import img3 from '~/assets/css/img/aambal_side22.png'
import aambalLogo from '~/assets/css/img/aambal_logo1.png'

const activeIndex = ref(0)
const sectionRef = ref(null)
const scrollProgress = ref(0)
const slideDirection = ref('slide-left')
const wheelCount = ref(0)
let lastWheelTime = 0

const slides = ref([
  { id: 1, image: img1, title: 'Embrace the Serenity' },
  { id: 2, image: img2, title: 'Nature Meets Luxury' },
  { id: 3, image: img3, title: 'Tranquility on the water' },
])

const current = computed(() => slides.value[activeIndex.value])

function nextPanel() {
  slideDirection.value = 'slide-left'
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
}
function prevPanel() {
  slideDirection.value = 'slide-right'
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length
}
function goToPanel(index) {
  if (index === activeIndex.value) return
  slideDirection.value = index > activeIndex.value ? 'slide-left' : 'slide-right'
  activeIndex.value = index
}
function handleWheel(event) {
  // Only react to downward scrolling
  if (event.deltaY <= 0) return

  // Only start slide scrolling after the hero image
  // has completely expanded
  if (fastProgress.value < 1) return

  // Make sure the hero section is currently active
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()

  if (rect.top > 0 || rect.bottom < window.innerHeight) return

  const now = Date.now()

  // Prevent one physical scroll gesture from being counted
  // multiple times
  if (now - lastWheelTime < 300) return

  lastWheelTime = now

  // Stop the page temporarily while changing slides
  if (activeIndex.value < slides.value.length - 1) {
    event.preventDefault()

    wheelCount.value++

    // Change slide after 2 scroll actions
    if (wheelCount.value >= 2) {
      wheelCount.value = 0
      nextPanel()
    }
  }
}

function handleScroll() {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const sectionHeight = sectionRef.value.offsetHeight
  const viewportHeight = window.innerHeight
  const scrollableDistance = sectionHeight - viewportHeight
  const scrolled = -rect.top
  let progress = scrolled / scrollableDistance
  progress = Math.max(0, Math.min(1, progress))
  scrollProgress.value = progress
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  window.addEventListener('wheel', handleWheel, {
    passive: false
  })

  handleScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)

  window.removeEventListener('wheel', handleWheel)
})

const fastProgress = computed(() => Math.min(scrollProgress.value * 2.2, 1))
const frameWidth = computed(() => 70 + fastProgress.value * 30)
const frameHeight = computed(() => 45 + fastProgress.value * 55)
const frameRadius = computed(() => 0)
const headingOpacity = computed(() => Math.max(0, 1 - fastProgress.value * 1.8))
const contentOpacity = computed(() => Math.max(0, (fastProgress.value - 0.75) / 0.25))
/* NEW — image starts lower */
const framePosition = computed(() => {
  return 140 * (1 - fastProgress.value)
})
</script>

<style scoped> 

@import url('https://fonts.googleapis.com/css2?family=Allura&family=Great+Vibes&display=swap');

.aambal-script {
  margin-top: 3.5rem;
  font-family: "Allura", "Great Vibes", cursive;
  font-size: clamp(2.2rem, 4vw, 4.5rem);
  font-weight: 400;
  line-height: 1;
  color: #e3feda;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.hero {
  position: relative;
  height: 260vh;
  background: var(--color-primary-dark);
}

.hero-sticky { 
  position: sticky; 
  top: 0; 
  height: 100vh; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: flex-end; 
  overflow: hidden; 
}

.logo-wrap {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  transition: opacity 0.1s linear;
  pointer-events: none;
}

.hero-heading {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3rem, 5vw, 5.5rem);
  font-weight: 400;
  line-height: 1.05;
  color: #f4f1e8;
  letter-spacing: -0.03em;
}

.expand-frame { 
  position: relative; 
  overflow: hidden; 
  border-radius: 0;
  flex-shrink: 0;
}

.hero-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.frame-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.frame-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 15, 12, 0.5);
  transition: opacity 0.3s ease;
}

.frame-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.slide-aambal-logo {
  position: absolute;

  top: 18%;
  left: 50%;
  transform: translateX(-50%);

  width: clamp(220px, 20vw, 350px);
  height: auto;

  object-fit: contain;
  z-index: 5;

  margin: 0;
}

.frame-content h1 {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-style: italic;
  color: var(--color-white);
  text-align: center;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: var(--color-white);
  z-index: 3;
  transition: transform var(--duration-fast) var(--ease-bounce);
}
.nav-arrow:hover { transform: translateY(-50%) scale(1.2); }
.nav-left { left: var(--space-md); }
.nav-right { right: var(--space-md); }

.dot-nav {
  position: absolute;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: all var(--duration-fast) var(--ease-smooth);
}
.dot.active {
  background: linear-gradient(135deg, #F7DD9A 0%, #C79C52 100%);
  transform: scale(1.3);
}

.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  position: absolute;
  inset: 0;
  transition: transform 1.4s cubic-bezier(0.77, 0, 0.18, 1);
}
.slide-left-enter-from { transform: translateX(100%); }
.slide-left-leave-to { transform: translateX(-100%); }
.slide-right-enter-from { transform: translateX(-100%); }
.slide-right-leave-to { transform: translateX(100%); }
</style>