<template>
  <header class="site-header">
    <div class="top-contact-bar">
  <div class="contact-item">
    <span class="contact-icon">▯</span>
    <span>+91 9447 036 444</span>
  </div>

  <div class="contact-item">
    <span class="contact-icon">▯</span>
    <span>+91 9747 036 444</span>
  </div>

  <div class="contact-item">
    <span class="contact-icon">◷</span>
    <span>Mon-Sun: 10:00 AM - 10:00 PM</span>
  </div>
</div>
    <div class="container nav-wrapper">
      <div class="nav-pill" :class="{ scrolled: isScrolled }">
        <NuxtLink to="/" class="logo">
  <img :src="logo" alt="Aambal Resort & Events" class="logo-img" />
</NuxtLink>

        <nav class="nav-links">
          <a href="#home" class="nav-link active">Home</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#specials" class="nav-link">Specials</a>
          <a href="#events" class="nav-link">Events</a>
          <a href="#gallery" class="nav-link">Gallery</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>

        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <Transition name="slide-down">
      <nav v-if="isMenuOpen" class="nav-mobile">
        <a href="#home" @click="isMenuOpen = false">Home</a>
        <a href="#about" @click="isMenuOpen = false">About</a>
        <a href="#specials" @click="isMenuOpen = false">Specials</a>
        <a href="#events" @click="isMenuOpen = false">Events</a>
        <a href="#gallery" @click="isMenuOpen = false">Gallery</a>
        <a href="#contact" @click="isMenuOpen = false">Contact</a>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import logo from '~/assets/css/img/aambal_logo.png'
const isScrolled = ref(false)
const isMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>

.site-header {
  position: fixed;
  top: 42px;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav-wrapper {
  display: flex;
  justify-content: center;
}

.nav-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);

  width: 92%;
  max-width: 850px;

  padding: 0.25rem 0.45rem 0.25rem 0.9rem;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.22);

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);

  transition:
    background var(--duration-med) var(--ease-smooth),
    box-shadow var(--duration-med) var(--ease-smooth);
}

.nav-pill.scrolled {
  /* background: rgba(255, 255, 255, 0.85); */
  border-color: rgba(255, 255, 255, 0.4);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.3rem;
}

.logo-text {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-white);
  white-space: nowrap;
}

.logo-img {
  height: 38px;
  width: auto;
}

.nav-pill.scrolled .logo-text {
  color: var(--color-primary-dark);
}

.nav-links {
  display: none;
  align-items: 
  enter;
  gap: 0.3rem;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--color-white);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  white-space: nowrap;
  transition: background-color var(--duration-fast) var(--ease-smooth),
              color var(--duration-fast) var(--ease-smooth);
}

.nav-pill.scrolled .nav-link {
  color: var(--color-primary-dark);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-pill.scrolled .nav-link:hover {
  background: rgba(47, 69, 56, 0.08);
}

.nav-link.active {
  background: var(--color-primary);
  color: var(--color-white) !important;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0.5rem;
  flex-shrink: 0;
}

.menu-toggle span {
  width: 20px;
  height: 2px;
  background: var(--color-white);
}

.nav-pill.scrolled .menu-toggle span {
  background: var(--color-primary-dark);
}

.nav-mobile {
  position: fixed;
  top: 5rem;
  left: var(--space-sm);
  right: var(--space-sm);
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-radius: var(--radius);
  padding: var(--space-md);
  gap: var(--space-sm);
  z-index: 99;
}

.nav-mobile a {
  color: var(--color-primary-dark);
  font-weight: 500;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all var(--duration-med) var(--ease-smooth);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.top-contact-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  height: 34px;

  background: rgba(15, 59, 45, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  color: #F4F1DF;

  font-size: 0.78rem;
  font-weight: 500;

  z-index: 101;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.contact-icon {
  color: #D6E9A5;
  font-size: 0.9rem;
}

@media (min-width: 900px) {
  .nav-links {
    display: flex;
  }
  .menu-toggle {
    display: none;
  }
}
</style>