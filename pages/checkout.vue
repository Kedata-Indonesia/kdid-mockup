<script setup lang="ts">
import { Calendar, MapPin, Users, Info, ChevronRight, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'Checkout - EverAfter'
})

const { formatCurrency } = useProducts()
const router = useRouter()
const cartStore = useCartStore()
const ordersStore = useOrdersStore()

const step = ref(1)
const formData = ref({
  name: '',
  eventDate: '',
  location: '',
  guests: '',
  notes: '',
  paymentMethod: 'VA'
})

const paymentMethods = [
  { id: 'VA', name: 'Virtual Account (BCA, Mandiri, BNI)', icon: '🏦' },
  { id: 'QRIS', name: 'QRIS (Gopay, OVO, ShopeePay)', icon: '📱' },
  { id: 'CC', name: 'Credit Card', icon: '💳' },
]

const handleSubmit = () => {
  if (step.value === 1) {
    step.value = 2
    window.scrollTo(0, 0)
  } else {
    // Process payment
    ordersStore.addOrder({
      total: cartStore.total,
      items: [...cartStore.items],
      eventDate: formData.value.eventDate,
      location: formData.value.location
    })
    cartStore.clearCart()
    step.value = 3
  }
}

// Redirect if cart is empty
onMounted(() => {
  if (cartStore.isEmpty && step.value !== 3) {
    router.push('/cart')
  }
})
</script>

<template>
  <div>
    <!-- Success State -->
    <div v-if="step === 3" class="max-w-3xl mx-auto px-4 py-32 text-center space-y-8">
    <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-bounce">
      <CheckCircle2 class="w-12 h-12" />
    </div>
    <h1 class="text-5xl font-bold font-serif">Booking Successful!</h1>
    <p class="text-gray-500 text-xl max-w-lg mx-auto leading-relaxed">
      Your payment has been verified. We have notified all vendors and you can now track your wedding preparation progress.
    </p>
    <div class="pt-10 flex flex-col sm:flex-row justify-center gap-4">
      <button
        @click="router.push('/profile')"
        class="bg-gray-900 text-white font-bold py-4 px-10 rounded-2xl hover:bg-gray-800 transition-all text-lg"
      >
        My Orders
      </button>
      <button
        @click="router.push('/')"
        class="bg-primary-50 text-primary-600 font-bold py-4 px-10 rounded-2xl hover:bg-primary-100 transition-all text-lg"
      >
        Back to Home
      </button>
    </div>
  </div>

  <!-- Checkout Form -->
  <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Progress Steps -->
    <div class="flex items-center space-x-4 mb-12">
      <div :class="['flex items-center space-x-2', step >= 1 ? 'text-primary-600' : 'text-gray-400']">
        <div :class="['w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold', step >= 1 ? 'border-primary-600 bg-primary-50' : 'border-gray-300']">
          1
        </div>
        <span class="font-bold">Event Info</span>
      </div>
      <ChevronRight class="w-4 h-4 text-gray-300" />
      <div :class="['flex items-center space-x-2', step >= 2 ? 'text-primary-600' : 'text-gray-400']">
        <div :class="['w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold', step >= 2 ? 'border-primary-600 bg-primary-50' : 'border-gray-300']">
          2
        </div>
        <span class="font-bold">Payment</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <!-- Form -->
      <div>
        <h2 class="text-3xl font-bold font-serif mb-8">
          {{ step === 1 ? 'Tell us about your event' : 'Secure Payment' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Step 1: Event Info -->
          <template v-if="step === 1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Event Name</label>
                <input
                  v-model="formData.name"
                  required
                  type="text"
                  placeholder="E.g. Andi & Siska's Wedding"
                  class="input-field"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Event Date</label>
                <div class="relative">
                  <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    v-model="formData.eventDate"
                    required
                    type="date"
                    class="input-field pl-12"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Location / Venue Name</label>
              <div class="relative">
                <MapPin class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  v-model="formData.location"
                  required
                  type="text"
                  placeholder="Where will it be held?"
                  class="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Approximate Guests</label>
              <div class="relative">
                <Users class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  v-model="formData.guests"
                  type="number"
                  placeholder="e.g. 500"
                  class="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Special Notes for Vendors</label>
              <textarea
                v-model="formData.notes"
                rows="4"
                placeholder="Any specific requests?"
                class="input-field resize-none"
              />
            </div>
          </template>

          <!-- Step 2: Payment -->
          <template v-else>
            <div class="space-y-4">
              <label class="block text-sm font-bold text-gray-700 mb-4">Select Payment Method</label>

              <label
                v-for="method in paymentMethods"
                :key="method.id"
                :class="[
                  'flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all',
                  formData.paymentMethod === method.id
                    ? 'border-primary-600 bg-primary-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                ]"
              >
                <div class="flex items-center space-x-4">
                  <span class="text-2xl">{{ method.icon }}</span>
                  <span class="font-bold text-gray-900">{{ method.name }}</span>
                </div>
                <input
                  v-model="formData.paymentMethod"
                  type="radio"
                  name="payment"
                  :value="method.id"
                  class="w-5 h-5 accent-primary-600"
                />
              </label>

              <div class="bg-gold-50 p-6 rounded-2xl border border-gold-100 flex items-start space-x-3 mt-8">
                <Info class="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <p class="text-xs text-gold-800 leading-relaxed">
                  By proceeding, you agree that your payment will be held in escrow by EverAfter and released to vendors according to the completion stages of your order.
                </p>
              </div>
            </div>
          </template>

          <button
            type="submit"
            class="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl text-xl hover:bg-gray-800 transition-all flex items-center justify-center shadow-xl"
          >
            {{ step === 1 ? 'Continue to Payment' : 'Pay Now' }}
            <ChevronRight class="w-6 h-6 ml-2" />
          </button>
        </form>
      </div>

      <!-- Order Summary -->
      <div>
        <ClientOnly>
          <div class="bg-white rounded-5xl border border-gray-100 p-8 shadow-sm sticky top-24">
            <h3 class="text-xl font-bold mb-6">Order Summary</h3>

            <div class="space-y-4 mb-8">
              <div
                v-for="item in cartStore.items"
                :key="item.product.id"
                class="flex justify-between text-sm"
              >
                <span class="text-gray-500">
                  {{ item.product.name }} (x{{ item.quantity }})
                </span>
                <span class="font-bold">
                  IDR {{ formatCurrency(item.product.price * item.quantity) }}
                </span>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-100 space-y-4">
              <div class="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>IDR {{ formatCurrency(cartStore.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>Tax (PPN 11%)</span>
                <span>IDR {{ formatCurrency(cartStore.tax) }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span>IDR {{ formatCurrency(cartStore.total) }}</span>
              </div>
            </div>
          </div>

          <template #fallback>
            <div class="bg-white rounded-5xl border border-gray-100 p-8 shadow-sm sticky top-24 animate-pulse">
              <div class="h-6 bg-gray-200 rounded w-32 mb-6"></div>
              <div class="space-y-4 mb-8">
                <div class="h-4 bg-gray-200 rounded"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div class="pt-6 border-t border-gray-100 space-y-4">
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                <div class="h-6 bg-gray-200 rounded w-2/3 mt-2"></div>
              </div>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
    </div>
  </div>
</template>
