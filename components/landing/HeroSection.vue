<script setup lang="ts">
import { Search, MapPin } from 'lucide-vue-next'

const router = useRouter()

const searchQuery = ref('')
const locationQuery = ref('')
const scrollY = ref(0)

const handleSearch = () => {
  router.push({
    path: '/browse',
    query: {
      q: searchQuery.value || undefined,
      location: locationQuery.value || undefined
    }
  })
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Parallax transform - background moves at 0.4x speed
const parallaxStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.4}px) scale(1.1)`
}))
</script>

<template>
  <section class="relative h-[85vh] flex items-center overflow-hidden">
    <!-- Parallax Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
        class="w-full h-[120%] object-cover will-change-transform"
        :style="parallaxStyle"
        alt="Wedding Hero"
      />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      <div class="max-w-2xl animate-fade-in">
        <h1 class="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
          Crafting Your <br />
          <span class="text-primary-400 italic">Dream Wedding</span>
        </h1>
        <p class="text-xl text-gray-200 mb-10 leading-relaxed font-light">
          Connect with top-tier vendors, discover breathtaking venues, and plan every detail of your special day in one seamless platform.
        </p>

        <!-- Search Form -->
        <form @submit.prevent="handleSearch" class="max-w-3xl">
          <!-- Mobile: Stacked layout -->
          <div class="md:hidden backdrop-blur-xl bg-white/10 p-4 rounded-3xl shadow-2xl shadow-black/20 border border-white/20 space-y-3">
            <div class="flex items-center gap-3">
              <Search class="text-white/70 w-5 h-5 flex-shrink-0" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="What are you looking for?"
                class="bg-transparent border-none text-white placeholder-white/50 focus:outline-none focus:ring-0 flex-1 min-w-0 py-2"
              />
            </div>
            <div class="flex items-center gap-3">
              <MapPin class="text-white/70 w-5 h-5 flex-shrink-0" />
              <input
                v-model="locationQuery"
                type="text"
                placeholder="Location"
                class="bg-transparent border-none text-white placeholder-white/50 focus:outline-none focus:ring-0 flex-1 min-w-0 py-2"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full transition-all"
            >
              Search
            </button>
          </div>

          <!-- Desktop: Horizontal layout -->
          <div class="hidden md:flex backdrop-blur-xl bg-white/10 p-3 pl-6 rounded-full shadow-2xl shadow-black/20 items-center gap-1 border border-white/20">
            <Search class="text-white/70 w-5 h-5 flex-shrink-0" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="What are you looking for?"
              class="bg-transparent border-none text-white placeholder-white/50 focus:outline-none focus:ring-0 flex-1 min-w-0 px-3 py-2"
            />
            <MapPin class="text-white/70 w-5 h-5 flex-shrink-0 ml-2" />
            <input
              v-model="locationQuery"
              type="text"
              placeholder="Location"
              class="bg-transparent border-none text-white placeholder-white/50 focus:outline-none focus:ring-0 flex-1 min-w-0 px-3 py-2"
            />
            <button
              type="submit"
              class="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full transition-all ml-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
