<template>
  <section class="gallery" id="gallery">
    <div class="container gallery-header">
      <h2>Some photos from <span class="accent">AAMBAL</span> Resort</h2>
      <p class="subtitle">Explore the beauty of our riverside resort through captivating photos.</p>
    </div>

    <div
      ref="scroller"
      class="strip-scroller"
      :class="{ 'is-dragging': isDragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="endDrag"
      @pointercancel="endDrag"
    >
      <img
        v-for="(photo, i) in photos"
        :key="i"
        :src="photo"
        class="strip-img"
        draggable="false"
        alt="Aambal Resort"
      />
    </div>

    <div class="gallery-controls">
      <button class="arrow-btn" aria-label="Previous photos" @click="scrollStrip(-1)">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button class="arrow-btn" aria-label="Next photos" @click="scrollStrip(1)">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import img1 from '~/assets/css/img/aambal_main.png'
import img2 from '~/assets/css/img/aambal_side.png'
import img3 from '~/assets/css/img/aambal_side2.png'

// Placeholder set — swap each entry for your real photos as they're ready.
// Reusing the 3 available images to fill out the 10-photo strip for now.
const photos = ref([img1, img2, img3, img1, img2, img3, img1, img2, img3, img1])

const scroller = ref(null)

function scrollStrip(direction) {
  const el = scroller.value
  if (!el) return
  el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' })
}

const isDragging = ref(false)
let startX = 0
let startScroll = 0

function onPointerDown(e) {
  if (e.pointerType !== 'mouse') return      // touch already scrolls natively
  isDragging.value = true
  startX = e.clientX
  startScroll = scroller.value.scrollLeft
  scroller.value.setPointerCapture(e.pointerId)
}

function onPointerMove(e) {
  if (!isDragging.value) return
  scroller.value.scrollLeft = startScroll - (e.clientX - startX)
}

function endDrag(e) {
  if (!isDragging.value) return
  isDragging.value = false
  scroller.value.releasePointerCapture(e.pointerId)
}

</script>

<style scoped>
.gallery {
  background:#1d3f07;
  padding-top: var(--space-xl);
  padding-bottom: 25vh;
  overflow: hidden;
}

.gallery-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.gallery-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3.55rem);
  font-weight: 500;
  color: #e5ffd3;
  margin-bottom: var(--space-sm);
}

.gallery-header h2 .accent {
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(90deg, #E9BF6F 0%, #C79C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #afce9b;
  font-size: 1rem;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

.strip-scroller {
  display: flex;
  overflow-x: auto;
  padding: 3rem 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  cursor: grab;
  user-select: none;
}

.strip-scroller::-webkit-scrollbar {
  display: none;
}

.strip-scroller.is-dragging {
  cursor: grabbing;
  scroll-snap-type: none;
}

.strip-img {
  width: 620px;
  height: 460px;
  object-fit: cover;
  flex-shrink: 0;
  pointer-events: none;

  border-radius: 28px;        /* the rounded corners */
  margin-right: 48px;         /* the gap between cards */
  scroll-snap-align: start;
}

.strip-img:nth-child(5n + 2) {
  width: 900px;
}

.gallery-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.arrow-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(229, 255, 211, 0.35);
  background: transparent;
  color: #e5ffd3;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}

.arrow-btn:hover {
  border-color: #E9BF6F;
  color: #E9BF6F;
}

@media (max-width: 600px) {
  .strip-img {
    width: 300px;
    height: 230px;
    border-radius: 20px;
    margin-right: 24px;
  }

  .strip-img:nth-child(5n + 2) {
    width: 420px;
  }
}
</style>