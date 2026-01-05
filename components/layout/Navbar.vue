<script setup lang="ts">
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-vue-next'

const cartStore = useCartStore()
const authStore = useAuthStore()
const route = useRoute()

const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <Heart class="text-white w-6 h-6 fill-current" />
          </div>
          <span class="text-2xl font-bold font-serif text-gray-900 tracking-tight">EverAfter</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/browse"
            class="text-gray-600 hover:text-primary-600 transition-colors font-medium"
          >
            Browse Vendors
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-gray-600 hover:text-primary-600 transition-colors font-medium"
          >
            How it Works
          </NuxtLink>

          <div class="flex items-center space-x-6 pl-6 border-l border-gray-200">
            <!-- Cart -->
            <NuxtLink to="/cart" class="relative text-gray-600 hover:text-primary-600">
              <ShoppingBag class="w-6 h-6" />
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {{ cartStore.totalItems }}
              </span>
            </NuxtLink>

            <!-- User -->
            <NuxtLink
              :to="authStore.isAuthenticated ? '/profile' : '/login'"
              class="text-gray-600 hover:text-primary-600"
            >
              <div v-if="authStore.isAuthenticated" class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-gold-200 flex items-center justify-center text-gold-700 font-bold text-sm">
                  {{ authStore.userInitial }}
                </div>
              </div>
              <User v-else class="w-6 h-6" />
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center space-x-4">
          <NuxtLink to="/cart" class="relative text-gray-600">
            <ShoppingBag class="w-6 h-6" />
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>
          <button @click="isMenuOpen = !isMenuOpen" class="text-gray-600">
            <X v-if="isMenuOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4"
      >
        <NuxtLink
          to="/browse"
          @click="closeMenu"
          class="block text-lg font-medium py-2"
        >
          Browse Vendors
        </NuxtLink>
        <NuxtLink
          to="/about"
          @click="closeMenu"
          class="block text-lg font-medium py-2"
        >
          How it Works
        </NuxtLink>
        <NuxtLink
          :to="authStore.isAuthenticated ? '/profile' : '/login'"
          @click="closeMenu"
          class="block text-lg font-medium py-2"
        >
          {{ authStore.isAuthenticated ? 'My Profile' : 'Login / Register' }}
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>
