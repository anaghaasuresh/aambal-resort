<template>
  <section class="events" id="events" ref="sectionRef">
    <div class="events-sticky">
      <h2 class="events-heading" :style="{ opacity: headingOpacity }">
        Organize Your <span class="accent">Events</span>, "Where Memorable Moments Find Their Perfect Venue"
      </h2>

      <div
        class="expand-frame"
        :style="{
          width: frameWidth + '%',
          height: frameHeight + 'vh',
          borderRadius: frameRadius + 'px',
        }"
      >
        <Transition :name="slideDirection">
  <img
    :key="activeIndex"
    :src="current.image"
    :alt="current.title"
    class="frame-img"
  />
</Transition>

        <div class="frame-overlay" :style="{ opacity: contentOpacity }"></div>

        <div class="frame-content" :style="{ opacity: contentOpacity }">
         <Transition :name="slideDirection">
  <div :key="activeIndex" class="event-slide">

    <img
      :src="current.image"
      :alt="current.title"
      class="frame-img"
    />

    <div
      class="frame-overlay"
      :style="{ opacity: contentOpacity }"
    ></div>

    <div
      class="frame-content"
      :style="{ opacity: contentOpacity }"
    >
      <div class="panel-body">

        <span class="panel-title">
          {{ current.title }}
        </span>

        <div class="feature-list">
          <span
            v-for="(point, i) in current.points"
            :key="i"
            class="feature-item"
          >
            {{ point }}
          </span>
        </div>

      </div>
    </div>

  </div>
</Transition>

          <button class="nav-arrow nav-left" @click="prevPanel" aria-label="Previous">‹</button>
          <button class="nav-arrow nav-right" @click="nextPanel" aria-label="Next">›</button>

          <div class="dot-nav">
            <button
              v-for="(panel, index) in panels"
              :key="panel.title"
              class="dot"
              :class="{ active: index === activeIndex }"
              @click="goToPanel(index)"
              :aria-label="`Go to ${panel.title}`"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import img1 from '~/assets/css/img/birthday.png'
import img2 from '~/assets/css/img/custom.png'
import img3 from '~/assets/css/img/private.png'

const activeIndex = ref(0)
const sectionRef = ref(null)
const scrollProgress = ref(0)
const slideDirection = ref('slide-left')

const panels = ref([
  {
    title: 'Birthday Parties',
    points: [
      'Scenic Venue',
      'Curated Dining',
      'Personalised Service',
    ],
    image: img1,
  },

  {
    title: 'Private Parties',
    points: [
      'Elegant Spaces',
      'Fine Dining',
      'Expert Coordination',
    ],
    image: img2,
  },

  {
    title: 'Custom Parties',
    points: [
      'Bespoke Planning',
      'Curated Dining',
      'Seamless Coordination',
    ],
    image: img3,
  },
])
const current = computed(() => panels.value[activeIndex.value])

function nextPanel() {
  slideDirection.value = 'slide-left'

  activeIndex.value =
    (activeIndex.value + 1) % panels.value.length
}

function prevPanel() {
  slideDirection.value = 'slide-right'

  activeIndex.value =
    (activeIndex.value - 1 + panels.value.length) %
    panels.value.length
}
function goToPanel(index) {
  if (index === activeIndex.value) return

  slideDirection.value =
    index > activeIndex.value
      ? 'slide-left'
      : 'slide-right'

  activeIndex.value = index
}

// Scroll-driven expand: as the section scrolls through view, progress goes 0 -> 1
function handleScroll() {
  if (!sectionRef.value) return
  const rect = sectionRef.value.getBoundingClientRect()
  const sectionHeight = sectionRef.value.offsetHeight
  const viewportHeight = window.innerHeight

  // total scrollable distance within this section (section is taller than viewport)
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

// Derived values driven by scroll progress
// Make the animation complete very quickly
const fastProgress = computed(() => {
  return Math.min(scrollProgress.value * 2.2, 1)
})

// Image expands quickly to fullscreen
const frameWidth = computed(() => {
  return 45 + fastProgress.value * 55
})

const frameHeight = computed(() => {
  return 45 + fastProgress.value * 55
})

// Rounded corners disappear quickly
const frameRadius = computed(() => {
  return 24 - fastProgress.value * 24
})

// Heading fades away early
const headingOpacity = computed(() => {
  return Math.max(0, 1 - fastProgress.value * 1.8)
})

// Content appears after fullscreen is reached
const contentOpacity = computed(() => {
  return Math.max(
    0,
    (fastProgress.value - 0.75) / 0.25
  )
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Italiana&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&display=swap');
.events {
  position: relative;
  height: 180vh; 
  background:#1d3f07;
}

.events-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.events-heading {
  position: absolute;
  top: 10%;
  text-align: center;
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3.5vw, 3.1rem);
  font-weight: 500;
  color: #e5ffd3;
  max-width: 900px;
  padding-inline: var(--space-md);
  z-index: 2;
  transition: opacity 0.1s linear;
}

.events-heading .accent {
  font-style: italic;
  background: linear-gradient(90deg, #F7DD9A 0%, #C79C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.expand-frame {
  position: relative;
  overflow: hidden;
  transition: border-radius 0.1s linear;
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
  background: rgba(10, 15, 12, 0.6);
  transition: opacity 0.3s ease;
}

.frame-content { 
  position: absolute; 
  inset: 0; 

  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: flex-end; 

  padding-left: var(--space-lg);
  padding-right: var(--space-lg);
  padding-bottom: 18vh;

  transition: opacity 0.3s ease; 
  pointer-events: none; 
}

.frame-content > * {
  pointer-events: auto;
}

.panel-title {
  display: block;

  font-family: 'Cormorant Garamond', serif !important;
  font-weight: 400;

  font-size: clamp(2.8rem, 5vw, 4.5rem);

  color: #f3c577;

  margin-bottom: 1.5rem;
  line-height: 0.95;
}
.panel-body {
  max-width: 800px;
  width: 100%;
  text-align: center;
  color: var(--color-white);
}

.panel-body h3 {
  font-family: var(--font-body);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-white);
  border-bottom: 2px solid var(--color-accent);
  display: inline-block;
  padding-bottom: 0.35rem;
  margin-bottom: 0;
}

.feature-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 4rem);

  margin: 0;
  padding: 0;
  list-style: none;
}
.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.55rem;

  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;

  white-space: nowrap;
}

.feature-item {
  font-family: 'Tangerine', cursive !important;
  font-weight: 700;

  color: rgba(248, 238, 216, 0.95);

  font-size: clamp(1rem, 2vw, 2rem);

  white-space: nowrap;
  line-height: 1;
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

.nav-arrow:hover {
  transform: translateY(-50%) scale(1.2);
}

.nav-left { left: var(--space-md); }
.nav-right { right: var(--space-md); }

.dot-nav {
  position: absolute;
  bottom: var(--space-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
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


/* ========================================
   NEXT IMAGE
   Current image moves LEFT
   New image enters from RIGHT
======================================== */

.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  inset: 0;

  transition: transform 1.4s cubic-bezier(0.77, 0, 0.18, 1);
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}


/* ========================================
   PREVIOUS IMAGE
   Current image moves RIGHT
   Previous image enters from LEFT
======================================== */

.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  inset: 0;

  transition: transform 1.4s cubic-bezier(0.77, 0, 0.18, 1);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}


/* ========================================
   SLIDE CONTAINER
======================================== */

.event-slide {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;
}
</style>