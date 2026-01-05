<script setup lang="ts">
import {
  Star,
  MapPin,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  Grid,
  Image as ImageIcon,
  Info,
  Award,
  Send,
  ChevronUp,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle,
  Layers,
  Tag,
  Instagram,
  Facebook,
  Globe
} from 'lucide-vue-next'
import { CategoryType, type Review } from '~/types'

const route = useRoute()
const router = useRouter()
const { getProductsByVendor, formatCurrency } = useProducts()

const vendorName = computed(() => decodeURIComponent(route.params.name as string))
const vendorServices = computed(() => getProductsByVendor(vendorName.value))
const vendorInfo = computed(() => vendorServices.value.length > 0 ? vendorServices.value[0].vendor : null)

useHead({
  title: computed(() => vendorInfo.value ? `${vendorInfo.value.name} - EverAfter` : 'Vendor - EverAfter')
})

const activeTab = ref<'services' | 'portfolio' | 'availability' | 'reviews' | 'about'>('services')
const showStickyBtn = ref(false)
const currentDate = ref(new Date())
const expandedServiceId = ref<string | null>(null)

// Reviews
const reviews = ref<Review[]>([
  {
    id: '1',
    userName: 'Siska Amalia',
    rating: 5,
    comment: "Working with this vendor was an absolute dream. They were professional from day one and truly understood the vision we had for our big day. Highly recommended!",
    date: '2 months ago'
  },
  {
    id: '2',
    userName: 'Budi Santoso',
    rating: 4,
    comment: "Great service and very punctual. The team was very helpful with last-minute adjustments. Would definitely book again.",
    date: '3 weeks ago'
  }
])

const newReview = ref({
  userName: '',
  rating: 5,
  comment: ''
})
const isSubmitting = ref(false)

// Portfolio images
const portfolioImages = [
  'https://picsum.photos/seed/port1/800/600',
  'https://picsum.photos/seed/port2/800/600',
  'https://picsum.photos/seed/port3/800/600',
  'https://picsum.photos/seed/port4/800/600',
  'https://picsum.photos/seed/port5/800/600',
  'https://picsum.photos/seed/port6/800/600',
]

// Calendar
const bookedDates = [5, 12, 13, 20, 21, 28]

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

const changeMonth = (offset: number) => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + offset, 1)
}

// Scroll detection
onMounted(() => {
  const handleScroll = () => {
    showStickyBtn.value = window.scrollY > 400
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

const scrollToServices = () => {
  activeTab.value = 'services'
  const element = document.getElementById('vendor-content-section')
  if (element) {
    const headerOffset = 100
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const toggleServiceDetails = (id: string) => {
  expandedServiceId.value = expandedServiceId.value === id ? null : id
}

const handleSubmitReview = () => {
  if (!newReview.value.userName || !newReview.value.comment) return

  isSubmitting.value = true
  setTimeout(() => {
    reviews.value.unshift({
      id: Date.now().toString(),
      userName: newReview.value.userName,
      rating: newReview.value.rating,
      comment: newReview.value.comment,
      date: 'Just now'
    })
    newReview.value = { userName: '', rating: 5, comment: '' }
    isSubmitting.value = false
  }, 600)
}

const getCustomizationOptions = (category: CategoryType) => {
  switch (category) {
    case CategoryType.VENUE: return ['Indoor/Outdoor layout', 'Time slot selection', 'Vendor preference']
    case CategoryType.CATERING: return ['Custom menu sets', 'Dietary adjustments', 'Service style']
    case CategoryType.PHOTOGRAPHY: return ['Album style', 'Shooting duration', 'Delivery format']
    case CategoryType.DECORATION: return ['Color palette', 'Floral types', 'Lighting intensity']
    default: return ['Standard flexibility', 'Initial consultation', 'Minor adjustments']
  }
}

const tabs = [
  { id: 'services', label: 'Services', icon: Grid },
  { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
  { id: 'availability', label: 'Availability', icon: Calendar },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'about', label: 'About', icon: Info },
]
</script>

<template>
  <!-- Not Found -->
  <div v-if="!vendorInfo" class="max-w-7xl mx-auto px-4 py-20 text-center">
    <h2 class="text-3xl font-bold mb-4">Vendor not found</h2>
    <NuxtLink to="/browse" class="text-primary-600 hover:underline">Return to browse</NuxtLink>
  </div>

  <div v-else class="pb-20 relative">
    <!-- Cover / Header -->
    <div class="relative h-96 w-full">
      <img
        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
        class="w-full h-full object-cover"
        alt="Vendor Banner"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <!-- Back Button -->
      <div class="absolute top-8 left-8">
        <button
          @click="router.back()"
          class="flex items-center text-white bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-all font-medium"
        >
          <ChevronLeft class="w-5 h-5 mr-1" /> Back
        </button>
      </div>

      <!-- Vendor Info -->
      <div class="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-6">
          <div class="flex items-center space-x-6">
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-4xl bg-white border-4 border-white overflow-hidden shadow-2xl">
              <img :src="`https://picsum.photos/seed/${vendorInfo.name}/400`" class="w-full h-full object-cover" :alt="vendorInfo.name" />
            </div>
            <div class="text-white space-y-2">
              <div class="flex flex-wrap items-center gap-3">
                <h1 class="text-3xl md:text-5xl font-bold font-serif">{{ vendorInfo.name }}</h1>
                <div class="flex items-center bg-blue-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/40">
                  <ShieldCheck class="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                  VERIFIED PARTNER
                </div>
              </div>
              <div class="flex items-center space-x-4 text-sm md:text-base opacity-90">
                <div class="flex items-center">
                  <Star class="w-4 h-4 text-gold-400 fill-current mr-1" />
                  <span class="font-bold">{{ vendorInfo.rating }}</span>
                  <span class="ml-1 opacity-70">({{ vendorInfo.reviews }} reviews)</span>
                </div>
                <div class="flex items-center">
                  <MapPin class="w-4 h-4 mr-1" />
                  {{ vendorInfo.location }}
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-3 w-full md:w-auto">
            <button class="flex-1 md:flex-none bg-white text-gray-900 font-bold px-8 py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all shadow-xl">
              <MessageCircle class="w-5 h-5" />
              <span>Contact Vendor</span>
            </button>
            <button class="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all">
              <Heart class="w-6 h-6" />
            </button>
            <button class="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all">
              <Share2 class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div id="vendor-content-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <!-- Tabs -->
      <div class="flex space-x-8 border-b border-gray-100 mb-12 overflow-x-auto scrollbar-hide">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id as any"
          :class="[
            'pb-4 flex items-center space-x-2 font-bold text-sm transition-all border-b-2 whitespace-nowrap',
            activeTab === tab.id
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          ]"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="product in vendorServices"
          :key="product.id"
          :class="[
            'group bg-white rounded-5xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-fit',
            expandedServiceId === product.id ? 'ring-2 ring-primary-100' : ''
          ]"
        >
          <div class="flex flex-col sm:flex-row h-full">
            <div class="relative w-full sm:w-64 h-64 sm:h-auto overflow-hidden">
              <img :src="product.images[0]" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="product.name" />
            </div>
            <div class="flex-1 p-8 flex flex-col">
              <div class="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-2">{{ product.category }}</div>
              <h3 class="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">{{ product.name }}</h3>
              <p class="text-gray-500 text-sm mb-6 line-clamp-2">{{ product.description }}</p>

              <div class="mt-auto pt-6 border-t border-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div class="text-xl font-bold text-gray-900">IDR {{ formatCurrency(product.price) }}</div>
                <div class="flex items-center space-x-3">
                  <button
                    @click="toggleServiceDetails(product.id)"
                    :class="[
                      'flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all',
                      expandedServiceId === product.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    ]"
                  >
                    <Info class="w-4 h-4" />
                    <span>{{ expandedServiceId === product.id ? 'Close' : 'Quick View' }}</span>
                    <ChevronDown :class="['w-4 h-4 transition-transform duration-300', expandedServiceId === product.id ? 'rotate-180' : '']" />
                  </button>
                  <NuxtLink
                    :to="`/product/${product.id}`"
                    class="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <ArrowRight class="w-5 h-5" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Expanded Details -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <div v-if="expandedServiceId === product.id" class="px-8 pb-8 pt-0 border-t border-gray-50 bg-gray-50/50">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div class="space-y-4">
                  <h4 class="flex items-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <CheckCircle class="w-4 h-4 mr-2 text-green-500" />
                    What's Included
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(f, i) in product.features" :key="i" class="text-xs text-gray-600 flex items-center">
                      <div class="w-1 h-1 bg-primary-400 rounded-full mr-2" />
                      {{ f }}
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="flex items-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <Layers class="w-4 h-4 mr-2 text-blue-500" />
                    Customization
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(opt, i) in getCustomizationOptions(product.category)" :key="i" class="text-xs text-gray-600 flex items-center">
                      <div class="w-1 h-1 bg-primary-400 rounded-full mr-2" />
                      {{ opt }}
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="flex items-center text-sm font-bold text-gray-900 uppercase tracking-wider">
                    <Tag class="w-4 h-4 mr-2 text-amber-500" />
                    Pricing Breakdown
                  </h4>
                  <div class="space-y-2">
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Base Package</span>
                      <span>85%</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Service & Equip.</span>
                      <span>10%</span>
                    </div>
                    <div class="flex justify-between text-xs text-gray-500">
                      <span>Admin Fee</span>
                      <span>5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Portfolio Tab -->
      <div v-else-if="activeTab === 'portfolio'" class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <div
          v-for="(img, i) in portfolioImages"
          :key="i"
          class="rounded-4xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-500"
        >
          <img :src="img" class="w-full h-auto" :alt="`Project ${i}`" />
        </div>
      </div>

      <!-- Availability Tab -->
      <div v-else-if="activeTab === 'availability'" class="max-w-4xl mx-auto space-y-12">
        <div class="flex flex-col md:flex-row gap-12">
          <!-- Calendar -->
          <div class="flex-1 bg-white p-8 rounded-5xl border border-gray-100 shadow-sm">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xl font-bold font-serif">
                {{ currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }) }}
              </h3>
              <div class="flex space-x-2">
                <button @click="changeMonth(-1)" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronLeft class="w-5 h-5 text-gray-600" />
                </button>
                <button @click="changeMonth(1)" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ChevronRight class="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2 text-center mb-4">
              <div v-for="d in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="d" class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {{ d }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-2">
              <div v-for="i in getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())" :key="`empty-${i}`" />
              <div
                v-for="day in getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())"
                :key="day"
                :class="[
                  'aspect-square flex items-center justify-center rounded-2xl text-sm font-bold transition-all',
                  bookedDates.includes(day)
                    ? 'bg-gray-50 text-gray-300 line-through cursor-not-allowed'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100 cursor-pointer shadow-sm'
                ]"
              >
                {{ day }}
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="w-full md:w-72 space-y-8">
            <div class="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
              <h4 class="font-bold text-gray-900 border-b border-gray-50 pb-4">Availability Legend</h4>
              <div class="space-y-4">
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-primary-50 rounded-lg shadow-sm" />
                  <span class="text-sm font-medium text-gray-600">Available Slots</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-6 h-6 bg-gray-50 border border-gray-100 rounded-lg" />
                  <span class="text-sm font-medium text-gray-400">Fully Booked</span>
                </div>
              </div>
            </div>

            <div class="bg-primary-900 text-white p-8 rounded-4xl shadow-xl relative overflow-hidden">
              <Clock class="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
              <div class="relative z-10 space-y-4">
                <h4 class="font-bold text-lg leading-tight">Fast Response Guaranteed</h4>
                <p class="text-primary-100 text-sm opacity-80">Bookings for prime dates fill up fast. We recommend booking at least 6-8 months in advance.</p>
                <button @click="scrollToServices" class="text-xs font-bold text-primary-400 hover:text-white underline transition-colors">See Packages</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Tab -->
      <div v-else-if="activeTab === 'reviews'" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="space-y-6">
          <!-- Rating Summary -->
          <div class="bg-white p-8 rounded-4xl border border-gray-100 text-center">
            <div class="text-5xl font-bold text-gray-900 mb-2">{{ vendorInfo.rating }}</div>
            <div class="flex justify-center mb-4">
              <Star
                v-for="s in 5"
                :key="s"
                :class="['w-6 h-6', s <= Math.floor(vendorInfo.rating) ? 'text-gold-500 fill-current' : 'text-gray-200']"
              />
            </div>
            <div class="text-gray-500 font-medium">Based on {{ vendorInfo.reviews }} reviews</div>
          </div>

          <!-- Review Form -->
          <div class="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
            <h3 class="text-xl font-bold mb-6 font-serif">Leave a Review</h3>
            <form @submit.prevent="handleSubmitReview" class="space-y-4">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Display Name</label>
                <input
                  v-model="newReview.userName"
                  type="text"
                  required
                  placeholder="Your Name"
                  class="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:outline-none text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Rating</label>
                <div class="flex space-x-2">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    @click="newReview.rating = star"
                    class="focus:outline-none"
                  >
                    <Star :class="['w-6 h-6', star <= newReview.rating ? 'text-gold-500 fill-current' : 'text-gray-300']" />
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Review Comment</label>
                <textarea
                  v-model="newReview.comment"
                  required
                  rows="4"
                  placeholder="Share your experience..."
                  class="w-full bg-gray-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-400 focus:outline-none text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-primary-600 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-primary-700 transition-all disabled:opacity-50 shadow-lg shadow-primary-500/20"
              >
                <template v-if="isSubmitting">
                  <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </template>
                <template v-else>
                  <Send class="w-4 h-4" />
                  <span>Post Review</span>
                </template>
              </button>
            </form>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="lg:col-span-2 space-y-8">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="p-8 bg-white rounded-4xl border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold uppercase">
                  {{ review.userName.charAt(0) }}
                </div>
                <div>
                  <div class="font-bold">{{ review.userName }}</div>
                  <div class="text-xs text-gray-400">{{ review.date }}</div>
                </div>
              </div>
              <div class="flex">
                <Star
                  v-for="s in 5"
                  :key="s"
                  :class="['w-4 h-4', s <= review.rating ? 'text-gold-500 fill-current' : 'text-gray-200']"
                />
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed italic">"{{ review.comment }}"</p>
          </div>
        </div>
      </div>

      <!-- About Tab -->
      <div v-else-if="activeTab === 'about'" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div class="lg:col-span-2 space-y-12">
          <section>
            <h2 class="text-3xl font-bold mb-6 font-serif">Our Story</h2>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              With over 10 years of experience in the luxury wedding industry, {{ vendorInfo.name }} has become synonymous with elegance, attention to detail, and unparalleled service. We believe that every couple has a unique story, and our mission is to translate that story into a visual masterpiece.
            </p>
            <p class="text-gray-600 text-lg leading-relaxed">
              Our team of dedicated professionals works tirelessly to ensure every detail, from the grandest gesture to the smallest nuance, is executed with perfection.
            </p>
          </section>

          <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gold-50 rounded-3xl border border-gold-100 flex items-start space-x-4">
              <Award class="w-8 h-8 text-gold-600 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 mb-1">Award Winning</h4>
                <p class="text-sm text-gray-600">Voted Best in Category at the 2024 Wedding Industry Awards.</p>
              </div>
            </div>
            <div class="p-6 bg-primary-50 rounded-3xl border border-primary-100 flex items-start space-x-4">
              <Calendar class="w-8 h-8 text-primary-600 flex-shrink-0" />
              <div>
                <h4 class="font-bold text-gray-900 mb-1">Expert Planning</h4>
                <p class="text-sm text-gray-600">Average booking period of 12 months with full project tracking.</p>
              </div>
            </div>
          </section>
        </div>

        <div class="space-y-8">
          <div class="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm space-y-6">
            <h3 class="font-bold text-lg mb-2">Location & Contact</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3 text-sm text-gray-600">
                <MapPin class="w-5 h-5 text-primary-500 mt-0.5" />
                <span>{{ vendorInfo.location }}</span>
              </div>
              <div class="flex items-start space-x-3 text-sm text-gray-600">
                <Calendar class="w-5 h-5 text-primary-500 mt-0.5" />
                <span>Mon - Fri: 09:00 - 18:00</span>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-50 flex items-center space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                <Instagram class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook class="w-5 h-5" />
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all">
                <Globe class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Book Now Button -->
    <Transition
      enter-active-class="transition duration-500"
      enter-from-class="translate-y-20 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-300"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-20 opacity-0"
    >
      <div v-if="showStickyBtn" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          @click="scrollToServices"
          class="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl shadow-primary-500/40 flex items-center space-x-3 group active:scale-95 transition-all"
        >
          <Calendar class="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span class="text-lg">Book Now</span>
          <ChevronUp class="w-5 h-5 opacity-50" />
        </button>
      </div>
    </Transition>
  </div>
</template>
