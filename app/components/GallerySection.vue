<template>
  <section class="gallery" id="gallery">
    <div class="container gallery-header">
      <h2>Some photos from <span class="accent">AAMBAL</span> Resort</h2>
      <p class="subtitle">Explore the beauty of our riverside resort through captivating photos.</p>
    </div>

    <div
      class="filmstrip-wrap"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="endDrag"
    >
      <div
        class="filmstrip"
        :class="{ 'auto-scroll': !isDragging }"
        :style="{ transform: `translateX(${offsetX}px)` }"
      >
        <img
          v-for="(photo, i) in loopedPhotos"
          :key="i"
          :src="photo"
          class="strip-img"
          draggable="false"
          alt="Aambal Resort"
        />
      </div>
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

// duplicate the set once so the loop can scroll seamlessly
const loopedPhotos = computed(() => [...photos.value, ...photos.value])

const offsetX = ref(0)
const isDragging = ref(false)
const startX = ref(0)
const startOffset = ref(0)

function getX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX
}

function startDrag(e) {
  isDragging.value = true
  startX.value = getX(e)
  startOffset.value = offsetX.value
}

function onDrag(e) {
  if (!isDragging.value) return
  const delta = getX(e) - startX.value
  offsetX.value = startOffset.value + delta
}

function endDrag() {
  isDragging.value = false
}
</script>

<style scoped>
.gallery {
  background:#1d3f07;
  padding-block: var(--space-xl) var(--space-lg);
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

.filmstrip-wrap {
  overflow: hidden;
  cursor: grab;
  user-select: none;
}

.filmstrip-wrap:active {
  cursor: grabbing;
}

.filmstrip {
  display: flex;
  width: max-content;
}

.filmstrip.auto-scroll {
  animation: scroll-left 40s linear infinite;
}

.strip-img {
  width: 620px; 
  height: 460px;  
  object-fit: cover;
  flex-shrink: 0;
  pointer-events: none;
}

@keyframes scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@media (max-width: 600px) {
  .strip-img {
    width: 300px; 
    height: 230px;
  }
}
</style>