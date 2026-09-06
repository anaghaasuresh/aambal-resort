<template>
  <section class="facilities" id="facilities">
    <div class="container facilities-inner">
      <div class="section-header">
        <span class="eyebrow">Check our Facilities</span>
        <h2>Check our <span class="accent">Facilities</span></h2>
      </div>

      <div class="filter-pills">
        <button
          v-for="filter in filters"
          :key="filter.id"
          class="pill"
          :class="{ active: activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <TransitionGroup name="fade-list" tag="div" class="facilities-grid">
        <div
          v-for="category in filteredCategories"
          :key="category.title"
          class="facility-row"
        >
          <div class="row-header">
            <h4>{{ category.title }}</h4>
            <span class="dots"></span>
            <button class="expand-btn" aria-label="Expand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 7L7 17M7 17H14M7 17V10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <p class="tags">
            <span v-for="(tag, i) in category.tags" :key="i" class="tag">
              {{ tag }} <span class="check">✓</span>
            </span>
          </p>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
const activeFilter = ref('all')

const filters = ref([
  { id: 'all', label: 'Show All' },
  { id: 'general', label: 'General' },
  { id: 'cottages', label: 'Cottages' },
  { id: 'events', label: 'Events' },
])

const categories = ref([
  { group: 'general', title: 'Parking', tags: ['Accessible parking', 'Free private parking is possible on site (reservation is not needed)'] },
  { group: 'general', title: 'Outdoor & View', tags: ['Garden view', 'Lake view', 'Sun Set'] },
  { group: 'general', title: 'Reception services', tags: ['Invoice provided', 'Tour desk', 'Express check-in/check-out', '24-hour front desk'] },
  { group: 'general', title: 'Safety & security', tags: ['Fire extinguishers', 'CCTV outside property', 'CCTV in common areas', 'Key access', '24-hour security'] },
  { group: 'general', title: 'Languages spoken', tags: ['English', 'Hindi', 'Malayalam', 'Tamil'] },
  { group: 'general', title: 'Internet', tags: ['WiFi is available in all areas and is free of charge'] },
  { group: 'general', title: 'Transport', tags: ['Car hire', 'Airport shuttle (Additional charge)'] },
  { group: 'general', title: 'Food & Drink', tags: ['Breakfast in the room', 'Room service', 'Special diet menus (on request)'] },
  { group: 'general', title: 'Entertainment and family services', tags: ['Swimming Pool', 'Fishing'] },

  { group: 'cottages', title: 'Cottages', tags: ['Double Rooms AC/Non-AC', 'Delux Rooms'] },
  { group: 'cottages', title: 'Room Amenities', tags: ['Socket near the bed', 'Clothes rack', 'Soundproofing', 'Private entrance', 'Fan', 'AC'] },
  { group: 'cottages', title: 'Bedroom', tags: ['Wardrobe or closet', 'Extra long beds (> 2 metres)'] },
  { group: 'cottages', title: 'Media & Technology', tags: ['Flat-screen TV', 'Satellite channels', 'Telephone', 'Wifi'] },
  { group: 'cottages', title: 'Bathroom', tags: ['Toilet paper', 'Towels', 'Bath or shower', 'Private bathroom', 'Toilet', 'Free toiletries'] },

  { group: 'events', title: 'Events', tags: ['Corporate Retreats', 'Family Reunions', 'Birthday Parties', 'Anniversary Celebrations', 'Honeymoon Getaways', 'Educational Workshops', 'Wedding receptions'] },
])

const filteredCategories = computed(() => {
  if (activeFilter.value === 'all') return categories.value
  return categories.value.filter(c => c.group === activeFilter.value)
})
</script>

<style scoped>
.facilities {
  background: #fff9d1;
  padding-block: var(--space-xl);
}

.section-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.eyebrow {
  display: none; /* hidden visually, kept for structure/SEO */
}

.section-header h2 {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  color: var(--color-primary-dark);
}

.section-header h2 .accent {
  font-style: italic;
  font-weight: 600;
  background: linear-gradient(90deg, #E9BF6F 0%, #C79C52 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Filter pills */
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: var(--space-lg);
}

.pill {
  padding: 0.55rem 1.4rem;
  border-radius: 999px;
  border: 1.5px solid var(--color-accent);
  background: transparent;
  color: var(--color-primary-dark);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--duration-fast) var(--ease-smooth);
}

.pill.active {
  background: linear-gradient(135deg, #F7DD9A 0%, #C79C52 100%);
  border-color: transparent;
  color: var(--color-primary-dark);
}

.pill:hover:not(.active) {
  background: rgba(199, 156, 82, 0.1);
}

/* Grid of rows */
.facilities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm) var(--space-xl); /* was var(--space-md) — tighter vertical gap */
}

.facility-row {
  padding-block: 0.4rem; /* was var(--space-sm) */
}

.row-header {
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  margin-bottom: 0.3rem; /* was 0.4rem */
  flex-wrap: nowrap; /* ensure title never wraps to 2 lines */
}

.row-header h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem; /* slightly smaller, was 1.2rem */
  font-weight: 600;
  color: var(--color-primary-dark);
  white-space: nowrap;
  flex-shrink: 0; /* title keeps its full width, never gets compressed */
}

.dots {
  flex: 1;
  border-bottom: 1px dotted rgba(47, 69, 56, 0.3);
  transform: translateY(-4px);
}

.expand-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid rgba(47, 69, 56, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: all var(--duration-fast) var(--ease-smooth);
}

.expand-btn svg {
  width: 14px;
  height: 14px;
}

.expand-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: rotate(180deg);
}

.tags {
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.5; 
  font-size: 0.95rem;
}

.tag {
  margin-right: 0.5rem;
}

.check {
  color: var(--color-accent);
  font-style: normal;
  margin-right: 0.5rem;
}

/* Transition for filter switching */
.fade-list-enter-active,
.fade-list-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-list-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.fade-list-leave-active {
  position: absolute;
}

@media (min-width: 900px) {
  .facilities-grid {
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-xl);
  }
}
</style>