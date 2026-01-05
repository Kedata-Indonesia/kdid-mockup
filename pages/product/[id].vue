<script setup lang="ts">
import {
  Star,
  MapPin,
  ShieldCheck,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Calendar,
  ArrowRight,
  X,
  ZoomIn
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const { getProductById, formatCurrency } = useProducts()

const product = computed(() => getProductById(route.params.id as string))

const quantity = ref(1)
const activeImage = ref(0)
const isAdded = ref(false)
const showLightbox = ref(false)

const handleAddToCart = () => {
  if (!product.value) return

  cartStore.addToCart(product.value, quantity.value)
  isAdded.value = true

  setTimeout(() => {
    isAdded.value = false
  }, 2000)
}

const openLightbox = (index: number) => {
  activeImage.value = index
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (!product.value) return
  activeImage.value = (activeImage.value + 1) % product.value.images.length
}

const prevImage = () => {
  if (!product.value) return
  activeImage.value = (activeImage.value - 1 + product.value.images.length) % product.value.images.length
}

// Handle keyboard navigation
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!showLightbox.value) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})

useHead({
  title: computed(() => product.value ? `${product.value.name} - EverAfter` : 'Product - EverAfter')
})
</script>

<template>
  <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Back Button -->
    <button
      @click="router.back()"
      class="flex items-center text-gray-500 hover:text-gray-900 mb-8 font-medium transition-colors"
    >
      <ChevronLeft class="w-5 h-5 mr-1" /> Back to Browse
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Gallery -->
      <div class="space-y-4">
        <div
          @click="openLightbox(activeImage)"
          class="aspect-[4/3] rounded-5xl overflow-hidden bg-gray-100 shadow-lg relative cursor-zoom-in group"
        >
          <img
            :src="product.images[activeImage]"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              <ZoomIn class="w-6 h-6 text-gray-700" />
            </div>
          </div>
        </div>
        <div class="flex space-x-4">
          <button
            v-for="(img, i) in product.images"
            :key="i"
            @click="activeImage = i"
            :class="[
              'w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all',
              activeImage === i
                ? 'border-primary-500 shadow-md scale-105'
                : 'border-transparent opacity-70 hover:opacity-100'
            ]"
          >
            <img :src="img" class="w-full h-full object-cover" alt="" />
          </button>
        </div>
      </div>

      <!-- Info -->
      <div class="space-y-8">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {{ product.category }}
            </span>
            <div class="flex items-center space-x-3">
              <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 class="w-5 h-5 text-gray-400" />
              </button>
              <button class="p-2 rounded-full hover:bg-rose-50 transition-colors group">
                <Heart class="w-5 h-5 text-gray-400 group-hover:text-rose-500 group-hover:fill-rose-500" />
              </button>
            </div>
          </div>

          <h1 class="text-4xl font-bold font-serif text-gray-900 mb-4">
            {{ product.name }}
          </h1>

          <div class="flex items-center space-x-6 text-sm">
            <div class="flex items-center text-gold-600 font-bold">
              <Star class="w-4 h-4 fill-current mr-1" />
              {{ product.vendor.rating }}
              <span class="text-gray-400 font-normal ml-1">
                ({{ product.vendor.reviews }} reviews)
              </span>
            </div>
            <div class="flex items-center text-gray-500">
              <MapPin class="w-4 h-4 mr-1 text-primary-500" />
              {{ product.vendor.location }}
            </div>
          </div>
        </div>

        <!-- Booking Card -->
        <div class="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
          <div class="flex items-end space-x-2">
            <span class="text-3xl font-bold text-gray-900">
              IDR {{ formatCurrency(product.price) }}
            </span>
            <span v-if="product.category === 'Catering'" class="text-gray-400 mb-1">
              / pax
            </span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <span class="font-semibold text-gray-700">Quantity</span>
            <div class="flex items-center space-x-4">
              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Minus class="w-4 h-4" />
              </button>
              <span class="font-bold w-8 text-center">{{ quantity }}</span>
              <button
                @click="quantity++"
                class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            @click="handleAddToCart"
            :class="[
              'w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-2',
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20'
            ]"
          >
            <template v-if="isAdded">
              <Check class="w-6 h-6" />
              <span>Added to Bookings!</span>
            </template>
            <template v-else>
              <span>Add to Bookings</span>
            </template>
          </button>
        </div>

        <!-- Info Cards -->
        <div class="space-y-6">
          <div class="flex items-center p-4 bg-blue-50 rounded-2xl text-blue-800 text-sm">
            <ShieldCheck class="w-5 h-5 mr-3 flex-shrink-0" />
            <p>EverAfter Guarantee: Secure payments & verified professional vendors.</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 border border-gray-100 rounded-2xl bg-white flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                <Calendar class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-gray-400">Availability</div>
                <div class="text-sm font-bold">Instantly Available</div>
              </div>
            </div>
            <div class="p-4 border border-gray-100 rounded-2xl bg-white flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition-colors">
              <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <MessageCircle class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-gray-400">Vendor</div>
                <div class="text-sm font-bold">Chat Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Section -->
    <div class="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2 space-y-12">
        <section>
          <h2 class="text-2xl font-bold mb-6">About this Service</h2>
          <p class="text-gray-600 leading-relaxed text-lg">
            {{ product.description }}
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-6">Key Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(feat, i) in product.features"
              :key="i"
              class="flex items-center space-x-3 text-gray-700 bg-white p-4 rounded-2xl border border-gray-50"
            >
              <div class="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <Check class="w-4 h-4" />
              </div>
              <span>{{ feat }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Vendor Card -->
      <div>
        <NuxtLink
          :to="`/vendor/${encodeURIComponent(product.vendor.name)}`"
          class="sticky top-24 block bg-white rounded-4xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group"
        >
          <h3 class="text-xl font-bold mb-6 flex items-center justify-between">
            Vendor Information
            <ArrowRight class="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" />
          </h3>

          <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden">
              <img
                :src="`https://picsum.photos/seed/${product.vendor.name}/200`"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 class="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {{ product.vendor.name }}
              </h4>
              <p class="text-sm text-gray-500">Verified Partner</p>
            </div>
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Member Since</span>
              <span class="font-bold text-gray-700">2023</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Total Projects</span>
              <span class="font-bold text-gray-700">450+</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Response Rate</span>
              <span class="font-bold text-green-600">98%</span>
            </div>
          </div>

          <div class="block text-center w-full py-3 rounded-xl border-2 border-primary-100 text-primary-600 font-bold group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
            View Vendor Profile
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showLightbox"
          class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button
            @click="closeLightbox"
            class="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          >
            <X class="w-6 h-6" />
          </button>

          <!-- Navigation Buttons -->
          <button
            v-if="product.images.length > 1"
            @click="prevImage"
            class="absolute left-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft class="w-8 h-8" />
          </button>

          <button
            v-if="product.images.length > 1"
            @click="nextImage"
            class="absolute right-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight class="w-8 h-8" />
          </button>

          <!-- Image -->
          <div class="max-w-5xl max-h-[85vh] px-4">
            <img
              :src="product.images[activeImage]"
              :alt="product.name"
              class="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>

          <!-- Thumbnails -->
          <div
            v-if="product.images.length > 1"
            class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3"
          >
            <button
              v-for="(img, i) in product.images"
              :key="i"
              @click="activeImage = i"
              :class="[
                'w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
                activeImage === i
                  ? 'border-white scale-110'
                  : 'border-white/30 opacity-60 hover:opacity-100'
              ]"
            >
              <img :src="img" class="w-full h-full object-cover" alt="" />
            </button>
          </div>

          <!-- Counter -->
          <div class="absolute top-6 left-6 text-white/80 text-sm font-medium">
            {{ activeImage + 1 }} / {{ product.images.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>

  <!-- Not Found -->
  <div v-else class="max-w-7xl mx-auto px-4 py-32 text-center">
    <h2 class="text-3xl font-bold mb-4">Product not found</h2>
    <NuxtLink to="/browse" class="text-primary-600 hover:underline">
      Return to browse
    </NuxtLink>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
