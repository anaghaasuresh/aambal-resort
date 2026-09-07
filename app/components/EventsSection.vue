<template>
  <section class="events" id="events">
    <div class="events-bg">
      <img
        v-for="(slide, index) in slides"
        :key="'bg-' + slide.id"
        :src="slide.image"
        class="bg-img"
        :class="{ 'bg-active': slotOffset(index) === 0 }"
      />
      <div class="bg-overlay"></div>
    </div>

    <div class="carousel" :class="{ 'arrows-active': arrowsVisible }">
      <button class="arrow arrow-left" @click="prev" aria-label="Previous">‹</button>

      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="card"
        :class="slotClass(index)"
        :style="cardStyle(index)"
        @mousemove="slotOffset(index) === 0 ? handleMouseMove($event) : null"
        @mouseleave="slotOffset(index) === 0 ? resetTilt() : null"
        @click="slotOffset(index) === 0 ? toggleArrows() : null"
      >
        <div class="card-img-wrap">
          <img class="card-img" :src="slide.image" :alt="slide.title" />
        </div>
      </div>

      <Transition name="fade-text">
        <div v-if="centerSlide" :key="centerSlide.id" class="events-text-overlay">
          <span class="tag">Organize Your Events</span>
          <h2>{{ centerSlide.title }}</h2>
          <div class="feature-list">
            <span v-for="(point, i) in centerSlide.points" :key="i" class="feature-item">
              {{ point }}
            </span>
          </div>
        </div>
      </Transition>

      <button class="arrow arrow-right" @click="next" aria-label="Next">›</button>
    </div>
  </section>
</template>

<script setup>
import img1 from '~/assets/css/img/aambal_mainn.png'
import img2 from '~/assets/css/img/aambal_sidee.png'
import img3 from '~/assets/css/img/aambal_side22.png'

const slides = ref([
  { id: 1, image: img1, title: 'Birthday Parties', points: ['Scenic Venue', 'Curated Dining', 'Personalised Service'] },
  { id: 2, image: img2, title: 'Private Parties', points: ['Elegant Spaces', 'Fine Dining', 'Expert Coordination'] },
  { id: 3, image: img3, title: 'Custom Parties', points: ['Bespoke Planning', 'Curated Dining', 'Seamless Coordination'] },
])

const activeIndex = ref(0)
const tiltX = ref(0)
const tiltY = ref(0)
const isTilting = ref(false)
const arrowsVisible = ref(false)
const wrappingId = ref(null)
const wrapDirection = ref(null)

const centerSlide = computed(() => slides.value.find((_, i) => slotOffset(i) === 0))

function toggleArrows() {
  arrowsVisible.value = !arrowsVisible.value
}

function next() {
  const wrapping = slides.value.find((_, i) => slotOffset(i) === -1)
  if (wrapping) {
    wrappingId.value = wrapping.id
    wrapDirection.value = 'forward'
  }
  activeIndex.value = (activeIndex.value + 1) % slides.value.length
  setTimeout(() => { wrappingId.value = null }, 900)
}

function prev() {
  const wrapping = slides.value.find((_, i) => slotOffset(i) === 1)
  if (wrapping) {
    wrappingId.value = wrapping.id
    wrapDirection.value = 'backward'
  }
  activeIndex.value = (activeIndex.value - 1 + slides.value.length) % slides.value.length
  setTimeout(() => { wrappingId.value = null }, 900)
}

function slotOffset(index) {
  const len = slides.value.length
  let offset = index - activeIndex.value
  if (offset > len / 2) offset -= len
  if (offset < -len / 2) offset += len
  return offset
}

function slotClass(index) {
  const offset = slotOffset(index)
  if (offset === 0) return 'is-center'
  if (offset === -1) return 'is-left'
  if (offset === 1) return 'is-right'
  return 'is-hidden'
}

function cardStyle(index) {
  const offset = slotOffset(index)
  const isCenter = offset === 0
  const isWrapping = slides.value[index].id === wrappingId.value

  const baseTransform = {
    '-1': 'translateX(-60%) scale(0.8) rotateY(15deg)',
    '0': `translateX(0) scale(1) rotateY(${tiltY.value}deg) rotateX(${tiltX.value}deg)`,
    '1': 'translateX(60%) scale(0.8) rotateY(-15deg)',
  }[offset] || 'translateX(0) scale(0.6)'

  return {
    transform: baseTransform,
    zIndex: isWrapping ? 1 : (isCenter ? 3 : 2),
    opacity: Math.abs(offset) > 1 ? 0 : 1,
    transition: isCenter && isTilting.value
      ? 'transform 0.1s ease-out, opacity 0.9s'
      : 'transform 0.9s var(--ease-smooth), opacity 0.9s var(--ease-smooth)',
  }
}

function handleMouseMove(e) {
  isTilting.value = true
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  let deltaX = (x - rect.width / 2) / (rect.width / 2)
  let deltaY = (y - rect.height / 2) / (rect.height / 2)
  deltaX = Math.max(-1, Math.min(1, deltaX))
  deltaY = Math.max(-1, Math.min(1, deltaY))
  const maxAngle = 12
  tiltY.value = -deltaX * maxAngle
  tiltX.value = deltaY * maxAngle
}

function resetTilt() {
  isTilting.value = false
  tiltX.value = 0
  tiltY.value = 0
}
</script>

<style scoped>
.events {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-dark);
  overflow: hidden;
}

.events-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1.2s var(--ease-smooth);
}
.bg-active { opacity: 1; }

.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(28, 43, 33, 0.75);
  backdrop-filter: blur(2px);
}

.carousel {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

.carousel:hover .arrow,
.carousel.arrows-active .arrow {
  opacity: 1;
  pointer-events: auto;
}

.card {
  position: absolute;
  width: 650px;
  height: 750px;
  border-radius: var(--radius);
  transition: transform var(--duration-slow) var(--ease-smooth),
              opacity var(--duration-slow) var(--ease-smooth);
  transform-style: preserve-3d;
}

.card-img-wrap {
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.is-center { z-index: 3; }

.events-text-overlay {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 150%;
  max-width: 900px;
  text-align: center;
  z-index: 4;
  color: var(--color-white);
}

.tag {
  display: inline-block;
  border: 1px solid var(--color-white);
  padding: 0.2rem 0.6rem;
  font-size: var(--fs-small);
  margin-bottom: var(--space-sm);
}

.events-text-overlay h2 {
  font-family: var(--font-heading);
  color: var(--color-white);
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-style: italic;
  margin-bottom: var(--space-sm);
}

.feature-list {
  display: flex;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 3rem);
}

.feature-item {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
}

.fade-text-enter-active, .fade-text-leave-active {
  transition: opacity 0.5s ease;
}
.fade-text-enter-from, .fade-text-leave-to { opacity: 0; }

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  font-size: 2rem;
  color: var(--color-white);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-med) var(--ease-smooth),
              transform var(--duration-fast) var(--ease-bounce);
}
.arrow:hover { transform: translateY(-50%) scale(1.2); }
.arrow-left { left: var(--space-sm); }
.arrow-right { right: var(--space-sm); }
</style>