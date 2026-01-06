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
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">Explore by Category</h2>
      <p class="text-gray-500">Find exactly what you need for your celebration</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
