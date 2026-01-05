<script setup lang="ts">
import { Heart, Mail, Lock, User, ArrowRight } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Register - EverAfter'
})

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) return

  isLoading.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  authStore.register(name.value, email.value, password.value)
  router.push('/')
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-20">
    <div class="max-w-md w-full bg-white rounded-6xl shadow-2xl overflow-hidden border border-gray-100">
      <!-- Header -->
      <div class="bg-primary-600 p-12 text-center relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div class="relative z-10">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Heart class="text-primary-600 w-8 h-8 fill-current" />
          </div>
          <h2 class="text-3xl font-bold font-serif text-white">Join EverAfter</h2>
          <p class="text-primary-100 mt-2">Start planning your dream day</p>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="p-10 space-y-6">
        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-500 ml-1">Full Name</label>
          <div class="relative">
            <User class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="name"
              required
              type="text"
              placeholder="Your Name"
              class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-500 ml-1">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="email"
              required
              type="email"
              placeholder="name@example.com"
              class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-bold text-gray-500 ml-1">Password</label>
          <div class="relative">
            <Lock class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              v-model="password"
              required
              type="password"
              placeholder="••••••••"
              class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl text-xl shadow-lg shadow-primary-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <span>Create Account</span>
          <ArrowRight class="w-6 h-6" />
        </button>

        <div class="text-center pt-4">
          <span class="text-gray-400 text-sm">Already have an account? </span>
          <NuxtLink to="/login" class="text-primary-600 font-bold hover:underline text-sm">
            Sign in here
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
