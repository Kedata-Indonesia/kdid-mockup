<script setup lang="ts">
import {
  ShoppingBag,
  Settings,
  LogOut,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  Download
} from 'lucide-vue-next'

useHead({
  title: 'My Profile - EverAfter'
})

const { formatCurrency } = useProducts()
const router = useRouter()
const authStore = useAuthStore()
const ordersStore = useOrdersStore()

const activeTab = ref<'orders' | 'settings'>('orders')

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

// Redirect if not authenticated and no orders
onMounted(() => {
  if (!authStore.isAuthenticated && !ordersStore.hasOrders) {
    router.push('/login')
  }
})

const currentUser = computed(() => authStore.user || { name: 'Guest', email: 'guest@example.com' })
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-8">
        <!-- Profile Card -->
        <div class="text-center p-8 bg-white rounded-5xl border border-gray-100 shadow-sm">
          <div class="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-600 text-4xl font-bold">
            {{ currentUser.name.charAt(0) }}
          </div>
          <h2 class="text-2xl font-bold text-gray-900">{{ currentUser.name }}</h2>
          <p class="text-gray-400 text-sm mb-6">{{ currentUser.email }}</p>
          <button class="text-sm font-bold text-primary-600 hover:underline">
            Edit Profile
          </button>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2">
          <button
            @click="activeTab = 'orders'"
            :class="[
              'w-full flex items-center justify-between p-4 rounded-2xl transition-all',
              activeTab === 'orders'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            ]"
          >
            <div class="flex items-center space-x-3">
              <ShoppingBag class="w-5 h-5" />
              <span class="font-bold">My Bookings</span>
            </div>
            <ChevronRight :class="['w-4 h-4', activeTab === 'orders' ? 'text-white' : 'text-gray-300']" />
          </button>

          <button
            @click="activeTab = 'settings'"
            :class="[
              'w-full flex items-center justify-between p-4 rounded-2xl transition-all',
              activeTab === 'settings'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            ]"
          >
            <div class="flex items-center space-x-3">
              <Settings class="w-5 h-5" />
              <span class="font-bold">Account Settings</span>
            </div>
            <ChevronRight :class="['w-4 h-4', activeTab === 'settings' ? 'text-white' : 'text-gray-300']" />
          </button>

          <button
            @click="handleLogout"
            class="w-full flex items-center space-x-3 p-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-bold mt-8"
          >
            <LogOut class="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <!-- Content -->
      <div class="lg:col-span-3">
        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'" class="space-y-8">
          <h1 class="text-3xl font-bold font-serif">Booking History</h1>

          <div v-if="ordersStore.hasOrders" class="space-y-6">
            <div
              v-for="order in ordersStore.orders"
              :key="order.id"
              class="bg-white rounded-4xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <!-- Header -->
              <div class="bg-gray-50 px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100">
                <div class="flex space-x-8 text-sm">
                  <div>
                    <div class="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1">
                      Order Placed
                    </div>
                    <div class="font-bold text-gray-700">{{ order.date }}</div>
                  </div>
                  <div>
                    <div class="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1">
                      Total Amount
                    </div>
                    <div class="font-bold text-gray-900">
                      IDR {{ formatCurrency(order.total) }}
                    </div>
                  </div>
                  <div>
                    <div class="text-gray-400 uppercase text-[10px] font-bold tracking-widest mb-1">
                      Status
                    </div>
                    <span :class="[
                      'px-2 py-0.5 rounded-full text-[10px] font-bold capitalize',
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    ]">
                      {{ order.status }}
                    </span>
                  </div>
                </div>
                <div class="text-gray-400 text-sm font-medium">#{{ order.id }}</div>
              </div>

              <!-- Content -->
              <div class="p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div class="flex items-start space-x-4">
                    <div class="w-10 h-10 bg-gold-50 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                      <Calendar class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="text-xs text-gray-400">Event Date</div>
                      <div class="font-bold">{{ order.eventDate || 'Not specified' }}</div>
                    </div>
                  </div>
                  <div class="flex items-start space-x-4">
                    <div class="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 flex-shrink-0">
                      <MapPin class="w-5 h-5" />
                    </div>
                    <div>
                      <div class="text-xs text-gray-400">Location</div>
                      <div class="font-bold">{{ order.location || 'Not specified' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Items -->
                <div class="space-y-4">
                  <div
                    v-for="(item, idx) in order.items"
                    :key="idx"
                    class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"
                  >
                    <div class="flex items-center space-x-4">
                      <img
                        :src="item.product.images[0]"
                        class="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div class="text-sm font-bold">{{ item.product.name }}</div>
                        <div class="text-xs text-gray-500">{{ item.product.vendor.name }}</div>
                      </div>
                    </div>
                    <div class="text-sm font-bold">x{{ item.quantity }}</div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="mt-8 flex justify-end space-x-4">
                  <button class="flex items-center space-x-2 text-sm font-bold text-gray-500 hover:text-gray-900 bg-gray-100 px-4 py-2 rounded-xl transition-colors">
                    <Download class="w-4 h-4" />
                    <span>Download Invoice</span>
                  </button>
                  <NuxtLink
                    :to="`/order/${order.id}`"
                    class="flex items-center space-x-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-xl transition-colors"
                  >
                    <ExternalLink class="w-4 h-4" />
                    <span>View Details</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-32 bg-gray-50 rounded-6xl">
            <Clock class="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-bold mb-2">No bookings yet</h3>
            <p class="text-gray-500">Your wedding journey starts with your first booking.</p>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-else class="space-y-8 animate-fade-in">
          <h1 class="text-3xl font-bold font-serif">Account Settings</h1>

          <div class="bg-white p-8 rounded-5xl border border-gray-100 shadow-sm space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-500">Full Name</label>
                <input
                  type="text"
                  :value="currentUser.name"
                  class="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-400 focus:outline-none"
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-bold text-gray-500">Email Address</label>
                <input
                  type="email"
                  :value="currentUser.email"
                  class="w-full p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary-400 focus:outline-none"
                />
              </div>
            </div>
            <div class="pt-8 border-t border-gray-50">
              <button class="bg-primary-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-700 transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
