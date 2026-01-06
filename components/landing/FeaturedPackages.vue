<script setup lang="ts">
import { Star, MapPin, ArrowRight } from 'lucide-vue-next'
import { CategoryType } from '~/types'

const { products, formatCurrency } = useProducts()
const featuredProducts = computed(() => products.slice(0, 3))

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
    { threshold: 0.15 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-16 rounded-6xl">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
      <div>
        <h2 class="text-4xl font-bold mb-4">Featured Packages</h2>
        <p class="text-gray-500">Top-rated services curated by our experts</p>
      </div>
      <NuxtLink
        to="/browse"
        class="text-primary-600 font-bold flex items-center hover:underline"
      >
        View All <ArrowRight class="w-5 h-5 ml-2" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(product, index) in featuredProducts"
        :key="product.id"
        :class="[
          'group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]"
        :style="{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }"
      >
        <!-- Image -->
        <div class="relative h-64 overflow-hidden">
          <img
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 flex items-center">
            <Star class="w-3 h-3 text-gold-500 fill-current mr-1" />
            {{ product.vendor.rating }}
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2">
            {{ product.category }}
          </div>
          <h3 class="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
            {{ product.name }}
          </h3>
          <div class="flex items-center text-gray-400 text-sm mb-4">
            <MapPin class="w-4 h-4 mr-1" />
            {{ product.vendor.location }}
          </div>

          <div class="flex justify-between items-center pt-4 border-t border-gray-50">
            <div class="text-lg font-bold text-gray-900">
              IDR {{ formatCurrency(product.price) }}
              <span
                v-if="product.category === CategoryType.CATERING"
                class="text-sm font-normal text-gray-400"
              >
                /pax
              </span>
            </div>
            <NuxtLink
              :to="`/product/${product.id}`"
              class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors"
            >
              <ArrowRight class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
