<script setup lang="ts">
import { Search, MapPin } from 'lucide-vue-next'

const router = useRouter()

const searchQuery = ref('')
const locationQuery = ref('')

const handleSearch = () => {
  router.push({
    path: '/browse',
    query: {
      q: searchQuery.value || undefined,
      location: locationQuery.value || undefined
    }
  })
}
</script>

<template>
  <section class="relative h-[85vh] flex items-center overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
        class="w-full h-full object-cover"
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
        <form @submit.prevent="handleSearch" class="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl">
          <div class="flex-1 flex items-center px-4 py-3 border-r border-gray-100">
            <Search class="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="What are you looking for?"
              class="bg-transparent text-gray-900 focus:outline-none w-full"
            />
          </div>
          <div class="flex-1 flex items-center px-4 py-3 border-r border-gray-100">
            <MapPin class="text-gray-400 w-5 h-5 mr-3 flex-shrink-0" />
            <input
              v-model="locationQuery"
              type="text"
              placeholder="Location (e.g. Surakarta)"
              class="bg-transparent text-gray-900 focus:outline-none w-full"
            />
          </div>
          <button
            type="submit"
            class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-500/20"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
