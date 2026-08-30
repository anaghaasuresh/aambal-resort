<template>
  <section class="about" id="about">
    <div class="container about-grid">
      <div class="about-media" @click="playVideo">
  <img
    :src="aboutImage"
    alt="Aerial view of Aambal Resort riverside"
    class="about-img"
  />

  <button class="play-btn" aria-label="Play video" @click.stop="playVideo">
    <span class="play-icon">▶</span>
  </button>
</div>

<!-- YouTube Video Popup -->
<Transition name="video-fade">
  <div v-if="isVideoOpen" class="video-modal" @click.self="closeVideo">
    <div class="video-container">

      <button class="close-video" @click="closeVideo" aria-label="Close video">
        ×
      </button>

      <iframe
        src="https://www.youtube.com/embed/ZT0nER4JXEo?autoplay=1"
        title="Aambal Resort & Event Center"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      ></iframe>

    </div>
  </div>
</Transition>

      <div class="about-content">
        <span class="eyebrow">About Aambal Resort & Events</span>

        <h2>
          Discover Tranquility at Our Riverside Resort with
          <span class="highlight">Versatile Event Spaces & Charming Cottages.</span>
        </h2>

        <p class="lead">
          Nestled on the pristine banks of a picturesque river, our riverfront resort is a hidden gem offering a serene escape masterfully crafted by <strong>Nature Holidays and Events</strong>.
        </p>

        <p class="italic-text">
          With charming cottages, we offer an intimate and exclusive retreat for those seeking tranquility. But that's not all — our resort is not just about relaxation; it's also a place for celebrations and gatherings.
        </p>

        <ul class="feature-list">
          <li>
            <span class="check">✓</span>
            Offers an intimate and peaceful getaway, where the soothing river melodies are your constant companion.
          </li>
          <li>
            <span class="check">✓</span>
            Hosting your special event at our resort means combining natural beauty with sophistication.
          </li>
          <li>
            <span class="check">✓</span>
            Experience the warmth of our charming cottages, each thoughtfully designed to provide comfort and style. Whether you're seeking a romantic retreat or a family vacation, our accommodations offer a home away from home.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
// Swap this import for your actual aerial/riverside photo once available
import aboutImage from '~/assets/css/img/aambal_vdo.png'

const isVideoOpen = ref(false)

function playVideo() {
  isVideoOpen.value = true
}

function closeVideo() {
  isVideoOpen.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quintessential&display=swap');

.about {
  background: linear-gradient(
    135deg,
    #143a0c 0%,
    #636c2c 50%,
    #143a0c 100%
  );
  padding-block: var(--space-xl);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
  align-items: center;
}

/* Media side */
.about-media {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
}

.about-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s var(--ease-smooth);
}

.about-media:hover .about-img {
  transform: scale(1.04);
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F7DD9A 0%, #E9BF6F 50%, #C79C52 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: transform var(--duration-fast) var(--ease-bounce);
}

.about-media:hover .play-btn {
  transform: translate(-50%, -50%) scale(1.1);
}

.play-icon {
  color: var(--color-primary-dark);
  font-size: 1.4rem;
  margin-left: 4px; /* optical centering for the play triangle */
}

/* =========================
   VIDEO POPUP
========================= */

.video-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(6px);

  padding: 2rem;
}

.video-container {
  position: relative;
  width: min(900px, 90vw);
  aspect-ratio: 16 / 9;

  background: #000;
  border-radius: 12px;
  overflow: visible;

  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
}

.video-container iframe {
  width: 100%;
  height: 100%;

  display: block;

  border: none;
  border-radius: 12px;
}

.close-video {
  position: absolute;

  top: -45px;
  right: 0;

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.15);
  color: white;

  font-size: 28px;
  line-height: 1;

  cursor: pointer;

  transition: all 0.25s ease;
}

.close-video:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.08);
}

/* Popup animation */

.video-fade-enter-active,
.video-fade-leave-active {
  transition: opacity 0.3s ease;
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
}

.video-fade-enter-active .video-container {
  animation: videoPop 0.35s ease;
}

@keyframes videoPop {
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Content side */
.eyebrow {
  display: inline-block;
  font-family: var(--font-body);
  font-size: var(--fs-small);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
}

.about-content h2 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 500;
  color:#082809;
  line-height: 1.3;
  margin-bottom: var(--space-md);
}

.about-content h2 .highlight {
  background: linear-gradient(90deg, #113a16 0%, #0b4304 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  display: block;
}

.lead {
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: var(--space-sm);
}

.lead strong {
  color: var(--color-primary-dark);
  font-weight: 600;
}

.italic-text {
  font-size: 1.2rem;
  font-style: italic;
  color: #082908;
  line-height: 1.7;
  margin-bottom: var(--space-md);
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: #b08c49;
  /* color: var(--color-text); */
  line-height: 1.6;
}

.check {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F7DD9A 0%, #C79C52 100%);
  color: var(--color-primary-dark);
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 0.15rem;
}

@media (min-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-xl);
  }

  .about-media {
    height: 750px;
  }
}
</style>