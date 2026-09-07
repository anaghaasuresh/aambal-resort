<template>
  <footer class="footer">

    <!-- Decorative top line -->
    <div class="container footer-content">

      <!-- =====================
           BRAND SECTION
      ====================== -->

      <div class="footer-brand">

        <div class="footer-logo">
          <div class="logo-icon">
  <img :src="logo" alt="Aambal Resort Logo" />
</div>

          <div>
            <h2>Aambal</h2>
            <span>Resort & Events</span>
          </div>
        </div>

        <p>
          Discover tranquility at our riverside resort, where nature,
          comfort and unforgettable celebrations come together.
        </p>

        <!-- Social Icons -->

        <div class="social-links">

          <a href="#" aria-label="Instagram">
            <span>◎</span>
          </a>

          <a href="#" aria-label="Facebook">
            <span>f</span>
          </a>

          <a href="#" aria-label="YouTube">
            <span>▶</span>
          </a>

        </div>

      </div>


      <!-- =====================
           QUICK LINKS
      ====================== -->

      <div class="footer-column">

        <h3>Explore</h3>

        <ul>

          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>

          <li>
            <NuxtLink to="#about">About Us</NuxtLink>
          </li>

          <li>
            <NuxtLink to="#specials">Our Specials</NuxtLink>
          </li>

          <li>
            <NuxtLink to="#events">Events</NuxtLink>
          </li>

          <li>
            <NuxtLink to="#gallery">Gallery</NuxtLink>
          </li>

        </ul>

      </div>


      <!-- =====================
           CONTACT
      ====================== -->

      <div class="footer-column">

        <h3>Contact Us</h3>

        <div class="contact-item">

          <span class="contact-icon">⌖</span>

          <p>
            Aambal Resort & Events<br />
            Kerala, India
          </p>

        </div>


        <div class="contact-item">

          <span class="contact-icon">☎</span>

          <a href="tel:+919447036444">
            +91 9447 036 444
          </a>

        </div>


        <div class="contact-item">

          <span class="contact-icon">✉</span>

          <a href="mailto:info@aambalresort.com">
            info@aambalresort.com
          </a>

        </div>

      </div>


      <!-- =====================
           HOURS
      ====================== -->

      <div class="footer-column hours">

        <h3>Opening Hours</h3>

        <div class="hours-row">

          <span>Monday – Sunday</span>

          <strong>10:00 AM – 10:00 PM</strong>

        </div>

        <div class="gold-line"></div>

        <p>
          Plan your peaceful getaway or your next unforgettable celebration with us.
        </p>

      </div>

    </div>


    <!-- =====================
         BOTTOM FOOTER
    ====================== -->

    <div class="footer-bottom">

      <div class="container footer-bottom-content">

        <p>
          © {{ new Date().getFullYear() }}
          Aambal Resort & Events. All Rights Reserved.
        </p>

        <div class="footer-bottom-links">

          <a href="#">Privacy Policy</a>

          <span></span>

          <a href="#">Terms & Conditions</a>

        </div>

      </div>

    </div>

  </footer>
</template>

<script setup>
import logo from '~/assets/css/img/aamballogoonly.png'
</script>

<style scoped>

.logo-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.footer {
  position: relative;

  background:
    radial-gradient(
      circle at 50% 0%,
      rgba(199, 156, 82, 0.16),
      transparent 35%
    ),
    linear-gradient(
      135deg,
      #031b09 0%,
      #082b0d 45%,
      #0d3513 100%
    );

  color: #f5efd7;

  padding-top: 4rem;

  overflow: hidden;
}



/* =========================
   MAIN GRID
========================= */

.footer-content {
  position: relative;
  z-index: 2;

  display: grid;

  grid-template-columns:
    1.6fr
    1fr
    1.2fr
    1.3fr;

  gap: 4rem;

  padding-bottom: 4rem;
}

/* =========================
   BRAND
========================= */

.footer-brand {
  max-width: 330px;
}


.footer-logo {
  display: flex;

  align-items: center;

  gap: 0.9rem;

  margin-bottom: 1.5rem;
}


.logo-icon {
  width: 52px;
  height: 52px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  border: 1px solid rgba(247, 221, 154, 0.45);

  background: rgba(255, 255, 255, 0.04);
}


.logo-icon svg {
  width: 30px;
  height: 30px;

  stroke: #e9bf6f;

  stroke-width: 1.7;
}


.footer-logo h2 {
  font-family: var(--font-heading);

  font-size: 2rem;

  font-weight: 500;

  margin: 0;

  color: #f5efd7;
}


.footer-logo span {
  display: block;

  margin-top: 0.15rem;

  color: #d7b66c;

  font-size: 0.75rem;

  letter-spacing: 0.15em;

  text-transform: uppercase;
}


.footer-brand p {
  color: rgba(245, 239, 215, 0.7);

  line-height: 1.8;

  font-size: 0.95rem;

  margin-bottom: 1.8rem;
}


/* =========================
   SOCIAL ICONS
========================= */

.social-links {
  display: flex;

  gap: 0.7rem;
}


.social-links a {
  width: 40px;
  height: 40px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  border: 1px solid rgba(247, 221, 154, 0.25);

  color: #e9bf6f;

  text-decoration: none;

  transition: all 0.3s ease;
}


.social-links a:hover {
  background: #c79c52;

  color: #143a0c;

  transform: translateY(-4px);
}


/* =========================
   FOOTER COLUMNS
========================= */

.footer-column h3 {
  font-family: var(--font-heading);

  font-size: 1.3rem;

  font-weight: 500;

  color: #f7dd9a;

  margin-bottom: 1.4rem;

  position: relative;
}


.footer-column h3::after {
  content: '';

  position: absolute;

  left: 0;
  bottom: -0.6rem;

  width: 35px;
  height: 2px;

  background: linear-gradient(
    90deg,
    #f7dd9a,
    #c79c52
  );
}


/* =========================
   LINKS
========================= */

.footer-column ul {
  list-style: none;

  padding: 0;
  margin: 0;

  display: flex;

  flex-direction: column;

  gap: 0.8rem;
}


.footer-column a {
  color: rgba(245, 239, 215, 0.72);

  text-decoration: none;

  font-size: 0.92rem;

  transition: all 0.25s ease;
}


.footer-column a:hover {
  color: #e9bf6f;

  padding-left: 5px;
}


/* =========================
   CONTACT
========================= */

.contact-item {
  display: flex;

  align-items: flex-start;

  gap: 0.75rem;

  margin-bottom: 1rem;
}


.contact-icon {
  color: #d7b66c;

  font-size: 1.1rem;

  margin-top: 0.1rem;
}


.contact-item p {
  margin: 0;

  color: rgba(245, 239, 215, 0.72);

  line-height: 1.6;

  font-size: 0.9rem;
}


/* =========================
   HOURS
========================= */

.hours-row {
  display: flex;

  flex-direction: column;

  gap: 0.45rem;

  margin-bottom: 1.2rem;
}


.hours-row span {
  color: rgba(245, 239, 215, 0.65);

  font-size: 0.9rem;
}


.hours-row strong {
  color: #f7dd9a;

  font-size: 0.9rem;

  font-weight: 500;
}


.gold-line {
  width: 100%;

  height: 1px;

  background: rgba(247, 221, 154, 0.2);

  margin-bottom: 1.2rem;
}


.hours p {
  color: rgba(245, 239, 215, 0.65);

  font-size: 0.9rem;

  line-height: 1.7;
}


/* =========================
   BOTTOM
========================= */

.footer-bottom {
  border-top:
    1px solid rgba(247, 221, 154, 0.12);

  background:
    rgba(0, 0, 0, 0.12);

  padding: 1.4rem 0;
}


.footer-bottom-content {
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 1rem;
}


.footer-bottom p {
  margin: 0;

  color: rgba(245, 239, 215, 0.5);

  font-size: 0.8rem;
}


.footer-bottom-links {
  display: flex;

  align-items: center;

  gap: 0.8rem;
}


.footer-bottom-links a {
  color: rgba(245, 239, 215, 0.55);

  text-decoration: none;

  font-size: 0.8rem;

  transition: color 0.2s ease;
}


.footer-bottom-links a:hover {
  color: #e9bf6f;
}


.footer-bottom-links span {
  width: 4px;
  height: 4px;

  border-radius: 50%;

  background: #c79c52;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 1100px) {

  .footer-content {
    grid-template-columns:
      repeat(2, 1fr);

    gap: 3rem;
  }

}


@media (max-width: 650px) {

  .footer {
    padding-top: 4rem;
  }


  .footer-content {
    grid-template-columns: 1fr;

    gap: 2.5rem;
  }


  .footer-brand {
    max-width: 100%;
  }


  .footer-bottom-content {
    flex-direction: column;

    text-align: center;
  }

}
</style>