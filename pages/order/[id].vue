<script setup lang="ts">
import {
  ChevronLeft,
  Package,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Download,
  MessageCircle,
  Phone,
  ArrowRight
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const ordersStore = useOrdersStore()
const { formatCurrency } = useProducts()

const order = computed(() => ordersStore.getOrderById(route.params.id as string))

useHead({
  title: computed(() => order.value ? `Order #${order.value.id.slice(0, 8)} - EverAfter` : 'Order - EverAfter')
})

const orderSteps = [
  { id: 1, label: 'Order Placed', description: 'Your order has been received' },
  { id: 2, label: 'Payment Verified', description: 'Payment confirmed by system' },
  { id: 3, label: 'Vendor Confirmed', description: 'Vendors have accepted your booking' },
  { id: 4, label: 'In Preparation', description: 'Services are being prepared' },
  { id: 5, label: 'Completed', description: 'Your event was successful!' }
]

const currentStep = computed(() => {
  if (!order.value) return 0
  switch (order.value.status) {
    case 'completed': return 5
    case 'processing': return 3
    case 'confirmed': return 2
    default: return 1
  }
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div v-if="order" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <button
        @click="router.back()"
        class="flex items-center text-gray-500 hover:text-gray-900 font-medium transition-colors"
      >
        <ChevronLeft class="w-5 h-5 mr-1" /> Back
      </button>
      <button class="flex items-center gap-2 text-primary-600 font-bold hover:underline">
        <Download class="w-5 h-5" />
        Download Invoice
      </button>
    </div>

    <!-- Order Info Card -->
    <div class="bg-white rounded-4xl border border-gray-100 p-8 mb-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div class="text-sm text-gray-500 mb-1">Order ID</div>
          <h1 class="text-2xl font-bold font-serif">#{{ order.id.slice(0, 8).toUpperCase() }}</h1>
        </div>
        <div :class="[
          'px-4 py-2 rounded-full text-sm font-bold',
          order.status === 'completed' ? 'bg-green-100 text-green-700' :
          order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
          'bg-yellow-100 text-yellow-700'
        ]">
          {{ order.status.charAt(0).toUpperCase() + order.status.slice(1) }}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
            <Calendar class="w-5 h-5" />
          </div>
          <div>
            <div class="text-sm text-gray-500">Event Date</div>
            <div class="font-bold">{{ formatDate(order.eventDate) }}</div>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <MapPin class="w-5 h-5" />
          </div>
          <div>
            <div class="text-sm text-gray-500">Location</div>
            <div class="font-bold">{{ order.location }}</div>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            <Clock class="w-5 h-5" />
          </div>
          <div>
            <div class="text-sm text-gray-500">Order Placed</div>
            <div class="font-bold">{{ formatDateTime(order.createdAt) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Tracking -->
    <div class="bg-white rounded-4xl border border-gray-100 p-8 mb-8">
      <h2 class="text-xl font-bold mb-8">Order Tracking</h2>

      <div class="relative">
        <!-- Progress Line -->
        <div class="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200">
          <div
            class="bg-primary-500 w-full transition-all duration-500"
            :style="{ height: `${((currentStep - 1) / (orderSteps.length - 1)) * 100}%` }"
          />
        </div>

        <!-- Steps -->
        <div class="space-y-8">
          <div
            v-for="step in orderSteps"
            :key="step.id"
            class="flex items-start gap-4 relative"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all',
                step.id <= currentStep
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              ]"
            >
              <CheckCircle2 v-if="step.id < currentStep" class="w-5 h-5" />
              <Circle v-else-if="step.id === currentStep" class="w-5 h-5 fill-current" />
              <Circle v-else class="w-5 h-5" />
            </div>
            <div class="flex-1 pb-2">
              <div :class="[
                'font-bold',
                step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
              ]">
                {{ step.label }}
              </div>
              <div :class="[
                'text-sm',
                step.id <= currentStep ? 'text-gray-500' : 'text-gray-300'
              ]">
                {{ step.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Items -->
    <div class="bg-white rounded-4xl border border-gray-100 p-8 mb-8">
      <h2 class="text-xl font-bold mb-6">Booked Services</h2>

      <div class="space-y-4">
        <div
          v-for="item in order.items"
          :key="item.product.id"
          class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
        >
          <div class="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              :src="item.product.images[0]"
              :alt="item.product.name"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-xs font-bold text-primary-600 uppercase tracking-wider">
              {{ item.product.category }}
            </div>
            <h3 class="font-bold text-gray-900 truncate">{{ item.product.name }}</h3>
            <p class="text-sm text-gray-500">by {{ item.product.vendor.name }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">x{{ item.quantity }}</div>
            <div class="font-bold">IDR {{ formatCurrency(item.product.price * item.quantity) }}</div>
          </div>
        </div>
      </div>

      <!-- Totals -->
      <div class="mt-6 pt-6 border-t border-gray-100 space-y-3">
        <div class="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span>IDR {{ formatCurrency(order.total / 1.11) }}</span>
        </div>
        <div class="flex justify-between text-gray-500">
          <span>Tax (PPN 11%)</span>
          <span>IDR {{ formatCurrency(order.total - (order.total / 1.11)) }}</span>
        </div>
        <div class="flex justify-between text-xl font-bold text-gray-900 pt-2">
          <span>Total Paid</span>
          <span>IDR {{ formatCurrency(order.total) }}</span>
        </div>
      </div>
    </div>

    <!-- Need Help -->
    <div class="bg-gray-50 rounded-4xl p-8">
      <h2 class="text-xl font-bold mb-4">Need Help?</h2>
      <p class="text-gray-500 mb-6">
        Our customer service team is ready to assist you with any questions about your order.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <button class="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
          <MessageCircle class="w-5 h-5 text-primary-600" />
          Chat with Us
        </button>
        <button class="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-gray-200 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
          <Phone class="w-5 h-5 text-primary-600" />
          Call Support
        </button>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="max-w-7xl mx-auto px-4 py-32 text-center">
    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
      <Package class="w-10 h-10 text-gray-400" />
    </div>
    <h2 class="text-3xl font-bold mb-4">Order not found</h2>
    <p class="text-gray-500 mb-8">This order doesn't exist or you don't have permission to view it.</p>
    <NuxtLink
      to="/profile"
      class="inline-flex items-center bg-primary-600 text-white font-bold py-4 px-8 rounded-2xl hover:bg-primary-700 transition-all"
    >
      View My Orders <ArrowRight class="w-5 h-5 ml-2" />
    </NuxtLink>
  </div>
</template>
