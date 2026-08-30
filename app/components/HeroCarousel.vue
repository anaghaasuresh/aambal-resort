<template>
  <section class="hero">
    <div class="hero-bg">
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
  <div v-if="slotOffset(index) === 0" class="card-content">
    <span v-if="slide.isLogo" class="tag logo-tag">
  <img :src="slide.tag" alt="Aambal" />
</span>

<span v-else class="tag">
  {{ slide.tag }}
</span>
    <h1>{{ slide.title }}</h1>
    <p>{{ slide.subtitle }}</p>
  </div>
</div>

  <!-- Text now OUTSIDE the card, overlaid on top of the whole carousel -->
  <Transition name="fade-text">
    <div v-if="centerSlide" :key="centerSlide.id" class="hero-text-overlay">
      <span class="tag">{{ centerSlide.tag }}</span>
      <h1>{{ centerSlide.title }}</h1>
      <p>{{ centerSlide.subtitle }}</p>
    </div>
  </Transition>

  <button class="arrow arrow-right" @click="next" aria-label="Next">›</button>
</div>
  </section>
</template>

<script setup>

import hero1 from '~/assets/css/img/aambal_mainn.png'
import hero2 from '~/assets/css/img/aambal_sidee.png'
import hero3 from '~/assets/css/img/aambal_side22.png' 

import aambalLogo from '~/assets/css/img/aambal_logo1.png'
const centerSlide = computed(() => {
  return slides.value.find((_, i) => slotOffset(i) === 0)
})

const arrowsVisible = ref(false)

function toggleArrows() {
  arrowsVisible.value = !arrowsVisible.value
}

const slides = ref([
  { id: 1, image: hero1, tag: aambalLogo, isLogo: true, title: 'Aambal Resort', subtitle: 'Tranquility on the water' },

  { id: 2, image: hero2, tag: '#Events', isLogo: false, title: 'Celebrate in Style', subtitle: 'Placeholder subtitle' },

  { id: 3, image: hero3, tag: '#Nature', isLogo: false, title: 'Escape to Green', subtitle: 'Placeholder subtitle' },
])

const activeIndex = ref(0)
const tiltX = ref(0)
const tiltY = ref(0)
const isTilting = ref(false)

const wrappingId = ref(null)
const wrapDirection = ref(null)

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

// how far this slide is from the active one: -1 = left, 0 = center, 1 = right
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
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-dark);
  overflow: hidden;
}

.hero-bg {
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

.bg-active {
  opacity: 1;
}

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
  top:40px;
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
  /* no overflow here — text needs to spill past this box */
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

.is-center {
  z-index: 3;
}

.card-content {
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
  color: #F4F1DF;
  border: 1px solid var(--color-white);
  padding: 0.2rem 0.6rem;
  font-size: var(--fs-small);
  margin-bottom: var(--space-sm);
}
/* LOGO ONLY — no box */
.logo-tag {
  border: none;
  padding: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -190px;
}

.logo-tag img {
  width: 300px;
  height: auto;
  display: block;
}


.card-content h1 {
  font-family: var(--font-heading);

    background: linear-gradient(
    90deg,
    #062007 0%,
    #062007 50%,
    #062007 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  color: var(--color-white);
  font-size: 5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.1;
  margin-bottom: var(--space-sm);
}

.card-content p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.6;
}

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

.arrow:hover {
  transform: translateY(-50%) scale(1.2);
}

.arrow-left { left: var(--space-sm); }
.arrow-right { right: var(--space-sm); }
</style>