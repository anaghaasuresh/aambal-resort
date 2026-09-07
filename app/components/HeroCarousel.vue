<template>
  <section class="hero" id="hero" ref="sectionRef">
    <div class="hero-sticky">
      <div class="logo-wrap" :style="{ opacity: headingOpacity }">
        <img :src="aambalLogo" alt="Aambal Resort" class="hero-logo" />
      </div>

      <div
        class="expand-frame"
        :style="{
          width: frameWidth + '%',
          height: frameHeight + 'vh',
          borderRadius: frameRadius + 'px',
        }"
      >
        <Transition :name="slideDirection">
          <div :key="activeIndex" class="hero-slide">
            <img :src="current.image" :alt="current.title" class="frame-img" />
            <div class="frame-overlay" :style="{ opacity: contentOpacity }"></div>
            <div class="frame-content" :style="{ opacity: contentOpacity }">
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
  handleScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const fastProgress = computed(() => Math.min(scrollProgress.value * 2.2, 1))
const frameWidth = computed(() => 45 + fastProgress.value * 55)
const frameHeight = computed(() => 45 + fastProgress.value * 55)
const frameRadius = computed(() => 24 - fastProgress.value * 24)
const headingOpacity = computed(() => Math.max(0, 1 - fastProgress.value * 1.8))
const contentOpacity = computed(() => Math.max(0, (fastProgress.value - 0.75) / 0.25))
</script>

<style scoped>
.hero {
  position: relative;
  height: 180vh;
  background: var(--color-primary-dark);
}

.hero-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-wrap {
  position: absolute;
  top: 10%;
  z-index: 2;
  transition: opacity 0.1s linear;
}

.hero-logo {
  height: 90px;
  width: auto;
}

.expand-frame {
  position: relative;
  overflow: hidden;
  transition: border-radius 0.1s linear;
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
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  transition: opacity 0.3s ease;
  pointer-events: none;
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