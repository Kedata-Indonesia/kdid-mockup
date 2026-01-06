<script setup lang="ts">
import { Filter, Search, MapPin, Star, ArrowRight } from 'lucide-vue-next'
import { CategoryType } from '~/types'

useHead({
  title: 'Browse Vendors - EverAfter'
})

const route = useRoute()
const { products, locations, formatCurrency } = useProducts()

// Filters
const search = ref('')
const selectedCategory = ref<string>('All')
const priceRange = ref<number>(100000000)
const selectedLocation = ref('All Locations')

// Initialize from query params
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }
  if (route.query.q) {
    search.value = route.query.q as string
  }
})

const categories = computed(() => ['All', ...Object.values(CategoryType)])

const filteredProducts = computed(() => {
  return products.filter(p => {
    const matchesSearch = !search.value ||
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.vendor.name.toLowerCase().includes(search.value.toLowerCase())

    const matchesCategory = selectedCategory.value === 'All' || p.category === selectedCategory.value

    const matchesPrice = p.price <= priceRange.value

    return matchesSearch && matchesCategory && matchesPrice
  })
})

const clearFilters = () => {
  search.value = ''
  selectedCategory.value = 'All'
  priceRange.value = 100000000
  selectedLocation.value = 'All Locations'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    <!-- Mobile: Horizontal Category Pills -->
    <div class="md:hidden -mx-4 px-4 mb-6 overflow-x-auto scrollbar-hide">
      <div class="flex gap-2 pb-2" style="width: max-content;">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'py-2 px-4 rounded-full text-sm font-semibold whitespace-nowrap transition-all',
            selectedCategory === cat
              ? 'bg-primary-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters Sidebar (Desktop only) -->
      <aside class="hidden md:block w-64 space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4 flex items-center">
            <Filter class="w-5 h-5 mr-2" /> Filters
          </h3>

          <div class="space-y-6">
            <!-- Category Filter -->
            <div>
              <label class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                Category
              </label>
              <div class="space-y-2">
                <button
                  v-for="cat in categories"
                  :key="cat"
                  @click="selectedCategory = cat"
                  :class="[
                    'block w-full text-left px-3 py-2 rounded-lg transition-colors',
                    selectedCategory === cat
                      ? 'bg-primary-50 text-primary-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  ]"
                >
                  {{ cat }}
                </button>
              </div>
            </div>

            <!-- Price Filter -->
            <div>
              <label class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                Price Max (IDR)
              </label>
              <input
                v-model="priceRange"
                type="range"
                min="0"
                max="100000000"
                step="1000000"
                class="w-full accent-primary-600"
              />
              <div class="flex justify-between text-xs font-bold text-gray-400 mt-2">
                <span>0</span>
                <span>100M</span>
              </div>
              <div class="mt-2 text-sm font-bold text-gray-700">
                Up to IDR {{ formatCurrency(priceRange) }}
              </div>
            </div>

            <!-- Location Filter -->
            <div>
              <label class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
                Location
              </label>
              <select
                v-model="selectedLocation"
                class="w-full bg-white border border-gray-200 rounded-lg p-2 text-gray-700"
              >
                <option v-for="loc in locations" :key="loc">{{ loc }}</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1">
        <!-- Top Bar -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div class="relative w-full sm:max-w-md">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="search"
              type="text"
              placeholder="Search vendors or services..."
              class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all shadow-sm"
            />
          </div>
          <div class="text-gray-500 text-sm">
            Showing <span class="font-bold text-gray-900">{{ filteredProducts.length }}</span> results
          </div>
        </div>

        <!-- Grid -->
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all flex flex-col sm:flex-row h-full"
          >
            <!-- Image -->
            <div class="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
              <img
                :src="product.images[0]"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 p-6 flex flex-col">
              <div class="flex justify-between items-start mb-2">
                <span class="text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                  {{ product.category }}
                </span>
                <div class="flex items-center text-gold-600 text-xs font-bold">
                  <Star class="w-3 h-3 fill-current mr-1" />
                  {{ product.vendor.rating }}
                </div>
              </div>

              <h3 class="text-lg font-bold mb-1 group-hover:text-primary-600 transition-colors leading-tight">
                {{ product.name }}
              </h3>

              <NuxtLink
                :to="`/vendor/${encodeURIComponent(product.vendor.name)}`"
                class="text-xs text-gray-400 italic mb-4 hover:text-primary-600 transition-colors"
              >
                by {{ product.vendor.name }}
              </NuxtLink>

              <p class="text-gray-500 text-xs mb-4 line-clamp-2">
                {{ product.description }}
              </p>

              <div class="flex items-center text-gray-400 text-[10px] mb-4">
                <MapPin class="w-3 h-3 mr-1" />
                {{ product.vendor.location }}
              </div>

              <div class="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                <div class="text-sm font-bold text-gray-900">
                  IDR {{ formatCurrency(product.price) }}
                  <span
                    v-if="product.category === CategoryType.CATERING"
                    class="text-[10px] font-normal text-gray-400"
                  >
                    /pax
                  </span>
                </div>
                <NuxtLink
                  :to="`/product/${product.id}`"
                  class="text-primary-600 font-bold text-sm flex items-center hover:underline"
                >
                  Details <ArrowRight class="w-4 h-4 ml-1" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20 bg-gray-50 rounded-6xl">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Search class="w-8 h-8 text-gray-300" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
          <p class="text-gray-500">Try adjusting your filters or search query.</p>
          <button
            @click="clearFilters"
            class="mt-6 text-primary-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  </div>
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
