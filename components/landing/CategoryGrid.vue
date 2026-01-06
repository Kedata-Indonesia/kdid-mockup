<script setup lang="ts">
const { categories } = useProducts()

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8 md:mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
      <p class="text-gray-500">Find exactly what you need for your celebration</p>
    </div>

    <!-- Mobile: Horizontal Scrollable Pills -->
    <div class="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
      <div class="flex gap-3 pb-2" style="width: max-content;">
        <NuxtLink
          v-for="(cat, index) in categories"
          :key="cat.name"
          :to="`/browse?category=${cat.name}`"
          :class="[
            'flex items-center gap-3 py-3 px-5 rounded-full bg-white border border-gray-100 shadow-sm active:scale-95 transition-all',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          ]"
          :style="{ transitionDelay: isVisible ? `${index * 60}ms` : '0ms', transitionDuration: '400ms' }"
        >
          <div
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0',
              cat.color
            ]"
          >
            {{ cat.icon }}
          </div>
          <span class="font-semibold text-gray-800 whitespace-nowrap">{{ cat.name }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Desktop: Grid Layout -->
    <div class="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
      <NuxtLink
        v-for="(cat, index) in categories"
        :key="cat.name"
        :to="`/browse?category=${cat.name}`"
        :class="[
          'group flex flex-col items-center p-8 rounded-3xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 transition-all text-center',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        ]"
        :style="{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms', transitionDuration: '500ms' }"
      >
        <div
          :class="[
            'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform',
            cat.color
          ]"
        >
          {{ cat.icon }}
        </div>
        <span class="font-semibold text-gray-800">{{ cat.name }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
