<script setup lang="ts">
import { ArrowRight, Sparkles, Clock } from 'lucide-vue-next'

const promos = [
  {
    id: 1,
    title: 'Early Bird Special',
    subtitle: 'Book before March 2026',
    discount: '15% OFF',
    description: 'Get exclusive discounts on all venue bookings',
    bgColor: 'from-primary-500 to-rose-500',
    icon: Sparkles
  },
  {
    id: 2,
    title: 'Complete Package Deal',
    subtitle: 'Limited Time Offer',
    discount: 'Save 5M',
    description: 'Book venue + catering + decoration together',
    bgColor: 'from-indigo-500 to-purple-600',
    icon: Clock
  }
]

const currentPromo = ref(0)

onMounted(() => {
  setInterval(() => {
    currentPromo.value = (currentPromo.value + 1) % promos.length
  }, 5000)
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-4xl">
      <TransitionGroup name="slide">
        <div
          v-for="(promo, index) in promos"
          v-show="currentPromo === index"
          :key="promo.id"
          :class="[
            'bg-gradient-to-r p-8 md:p-12 text-white relative',
            promo.bgColor
          ]"
        >
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div class="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-4 sm:gap-6 text-center md:text-left">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <component :is="promo.icon" class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div class="text-white/80 text-xs sm:text-sm font-medium mb-1">{{ promo.subtitle }}</div>
                <h3 class="text-xl sm:text-2xl md:text-3xl font-bold font-serif">{{ promo.title }}</h3>
                <p class="text-white/80 mt-1 text-sm sm:text-base">{{ promo.description }}</p>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto">
              <div class="text-center">
                <div class="text-3xl sm:text-4xl md:text-5xl font-bold">{{ promo.discount }}</div>
                <div class="text-white/80 text-xs sm:text-sm">on selected items</div>
              </div>
              <NuxtLink
                to="/browse"
                class="bg-white text-gray-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:bg-gray-100 transition-all flex items-center shadow-xl w-full sm:w-auto justify-center"
              >
                Shop Now <ArrowRight class="w-5 h-5 ml-2" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Indicators -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <button
          v-for="(_, index) in promos"
          :key="index"
          @click="currentPromo = index"
          :class="[
            'w-2 h-2 rounded-full transition-all',
            currentPromo === index ? 'w-8 bg-white' : 'bg-white/50'
          ]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-leave-active {
  position: absolute;
  width: 100%;
}
</style>
