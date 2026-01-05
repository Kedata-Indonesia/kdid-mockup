<script setup lang="ts">
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, CreditCard } from 'lucide-vue-next'

useHead({
  title: 'Your Bookings - EverAfter'
})

const { formatCurrency } = useProducts()
const cartStore = useCartStore()
const router = useRouter()
</script>

<template>
  <div>
    <ClientOnly>
      <!-- Empty Cart -->
      <div v-if="cartStore.isEmpty" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div class="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag class="w-10 h-10 text-primary-300" />
        </div>
        <h2 class="text-3xl font-bold mb-4 font-serif">Your bookings are empty</h2>
        <p class="text-gray-500 max-w-md mx-auto mb-10 text-lg">
          Looks like you haven't started building your dream wedding package yet. Explore our curated vendors!
        </p>
        <NuxtLink
          to="/browse"
          class="bg-primary-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 inline-flex items-center"
        >
          Browse Vendors <ArrowRight class="w-5 h-5 ml-2" />
        </NuxtLink>
      </div>

      <!-- Cart Content -->
      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold font-serif mb-12">Review Your Bookings</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-6">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="bg-white rounded-4xl border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow"
        >
          <!-- Image -->
          <div class="w-full sm:w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              :src="item.product.images[0]"
              :alt="item.product.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Details -->
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                  {{ item.product.category }}
                </span>
                <h3 class="text-xl font-bold text-gray-900 mt-1">
                  {{ item.product.name }}
                </h3>
                <p class="text-sm text-gray-500 italic mt-1">
                  by {{ item.product.vendor.name }}
                </p>
              </div>
              <button
                @click="cartStore.removeFromCart(item.product.id)"
                class="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </div>

            <div class="flex justify-between items-end pt-4">
              <!-- Quantity Controls -->
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-3 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  <button
                    @click="cartStore.updateQuantity(item.product.id, Math.max(1, item.quantity - 1))"
                    class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-primary-600"
                  >
                    <Minus class="w-3.5 h-3.5" />
                  </button>
                  <span class="font-bold text-sm min-w-[20px] text-center">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                    class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-primary-600"
                  >
                    <Plus class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <!-- Total -->
              <div class="text-right">
                <div class="text-sm text-gray-400">Total</div>
                <div class="text-xl font-bold text-gray-900">
                  IDR {{ formatCurrency(item.product.price * item.quantity) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/browse"
          class="inline-flex items-center text-primary-600 font-bold hover:underline py-4"
        >
          <Plus class="w-4 h-4 mr-2" /> Add more services
        </NuxtLink>
      </div>

      <!-- Summary -->
      <div class="space-y-6">
        <div class="bg-gray-900 text-white rounded-5xl p-8 shadow-2xl sticky top-24">
          <h3 class="text-2xl font-bold mb-8 font-serif">Booking Summary</h3>

          <div class="space-y-4 mb-8 border-b border-gray-800 pb-8">
            <div class="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span class="text-white font-medium">
                IDR {{ formatCurrency(cartStore.subtotal) }}
              </span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Tax (PPN 11%)</span>
              <span class="text-white font-medium">
                IDR {{ formatCurrency(cartStore.tax) }}
              </span>
            </div>
            <div class="flex justify-between text-gray-400 italic">
              <span>Voucher</span>
              <span class="text-green-400 font-medium">-</span>
            </div>
          </div>

          <div class="flex justify-between items-end mb-10">
            <span class="text-lg text-gray-400 font-medium">Total Amount</span>
            <span class="text-3xl font-bold text-white">
              IDR {{ formatCurrency(cartStore.total) }}
            </span>
          </div>

          <button
            @click="router.push('/checkout')"
            class="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl text-xl shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center"
          >
            Checkout <ArrowRight class="w-6 h-6 ml-2" />
          </button>

          <div class="mt-8 flex items-center justify-center space-x-3 text-gray-500 text-xs">
            <CreditCard class="w-4 h-4" />
            <span>Secured by Midtrans / Xendit</span>
          </div>
        </div>
        </div>
        </div>
      </div>

      <template #fallback>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="h-10 bg-gray-200 rounded w-64 mb-12 animate-pulse"></div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2 space-y-6">
              <div class="bg-white rounded-4xl border border-gray-100 p-6 h-48 animate-pulse"></div>
            </div>
            <div>
              <div class="bg-gray-200 rounded-5xl p-8 h-80 animate-pulse"></div>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
