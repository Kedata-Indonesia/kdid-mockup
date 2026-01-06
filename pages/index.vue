<script setup lang="ts">
useHead({
  title: 'EverAfter - Your Dream Wedding Marketplace'
})

// Scroll animation refs
const promoRef = ref<HTMLElement | null>(null)
const aiRef = ref<HTMLElement | null>(null)
const categoryRef = ref<HTMLElement | null>(null)
const packagesRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

const visibleSections = ref<Set<string>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.section
        if (entry.isIntersecting && id) {
          visibleSections.value.add(id)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
  )

  // Observe all sections
  ;[promoRef, aiRef, categoryRef, packagesRef, ctaRef].forEach((ref) => {
    if (ref.value) observer.observe(ref.value)
  })
})

const isVisible = (section: string) => visibleSections.value.has(section)
</script>

<template>
  <div class="space-y-24 pb-20">
    <LandingHeroSection />

    <div
      ref="promoRef"
      data-section="promo"
      :class="[
        'transition-all duration-700 ease-out',
        isVisible('promo') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    >
      <LandingPromoBanner />
    </div>

    <div
      ref="aiRef"
      data-section="ai"
      :class="[
        'transition-all duration-700 ease-out delay-100',
        isVisible('ai') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    >
      <LandingAiConsultant />
    </div>

    <div
      ref="categoryRef"
      data-section="category"
      :class="[
        'transition-all duration-700 ease-out',
        isVisible('category') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    >
      <LandingCategoryGrid />
    </div>

    <div
      ref="packagesRef"
      data-section="packages"
      :class="[
        'transition-all duration-700 ease-out',
        isVisible('packages') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
    >
      <LandingFeaturedPackages />
    </div>

    <div
      ref="ctaRef"
      data-section="cta"
      :class="[
        'transition-all duration-700 ease-out',
        isVisible('cta') ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      ]"
    >
      <LandingCtaSection />
    </div>
  </div>
</template>
