<script setup lang="ts">
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({
  layout: 'auth'
})

useHead({
  title: 'Forgot Password - EverAfter'
})

const email = ref('')
const isSubmitted = ref(false)
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  isSubmitted.value = true
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Success State -->
      <div v-if="isSubmitted" class="text-center space-y-6">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 class="w-10 h-10 text-green-600" />
        </div>
        <h1 class="text-3xl font-bold font-serif">Check Your Email</h1>
        <p class="text-gray-500">
          We've sent a password reset link to <span class="font-semibold text-gray-700">{{ email }}</span>.
          Please check your inbox and follow the instructions.
        </p>
        <div class="pt-4 space-y-3">
          <NuxtLink
            to="/login"
            class="block w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all text-center"
          >
            Back to Login
          </NuxtLink>
          <button
            @click="isSubmitted = false"
            class="block w-full py-4 text-gray-600 font-bold hover:text-gray-900 transition-colors"
          >
            Try a different email
          </button>
        </div>
      </div>

      <!-- Form State -->
      <div v-else>
        <NuxtLink
          to="/login"
          class="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back to Login
        </NuxtLink>

        <h1 class="text-4xl font-bold font-serif mb-4">Forgot Password?</h1>
        <p class="text-gray-500 mb-8">
          No worries! Enter your email address and we'll send you a link to reset your password.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                v-model="email"
                type="email"
                required
                placeholder="you@example.com"
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
            <span v-else>Send Reset Link</span>
          </button>
        </form>

        <p class="text-center text-gray-500 text-sm mt-8">
          Remember your password?
          <NuxtLink to="/login" class="text-primary-600 font-bold hover:underline">
            Sign in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
