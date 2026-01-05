<script setup lang="ts">
import { Sparkles, ArrowRight } from 'lucide-vue-next'

const prompt = ref('')
const aiAdvice = ref<string | null>(null)
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!prompt.value.trim()) return

  isLoading.value = true

  try {
    const response = await $fetch('/api/ai/recommendations', {
      method: 'POST',
      body: { prompt: prompt.value }
    })
    aiAdvice.value = response.advice
  } catch (error) {
    aiAdvice.value = "I'm having trouble connecting right now, but you should definitely start by looking at our curated venues!"
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gradient-to-br from-gold-50 to-primary-50 rounded-5xl p-8 md:p-16 border border-gold-200 relative overflow-hidden">
      <!-- Decoration -->
      <div class="absolute top-0 right-0 p-12 opacity-10 hidden lg:block">
        <Sparkles class="w-64 h-64 text-gold-500" />
      </div>

      <div class="relative z-10 max-w-3xl">
        <div class="flex items-center space-x-2 text-gold-600 font-bold mb-4">
          <Sparkles class="w-5 h-5" />
          <span class="uppercase tracking-widest text-sm">AI Wedding Consultant</span>
        </div>

        <h2 class="text-4xl font-bold mb-6 text-gray-900">
          Feeling Overwhelmed? <br />Let our AI help you plan.
        </h2>

        <p class="text-lg text-gray-600 mb-8">
          Describe your dream wedding—style, guest count, or budget—and our AI assistant will suggest the perfect vendor combinations.
        </p>

        <form @submit.prevent="handleSubmit" class="relative mb-8">
          <textarea
            v-model="prompt"
            placeholder="E.g., I want an intimate rustic garden wedding for 50 people in Surakarta with a budget of 30 million..."
            class="w-full bg-white/80 backdrop-blur rounded-2xl p-6 border border-gold-200 focus:ring-2 focus:ring-primary-400 focus:outline-none text-gray-800 min-h-[120px] shadow-inner resize-none"
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="absolute bottom-4 right-4 bg-gray-900 text-white font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <template v-if="isLoading">
              <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </template>
            <template v-else>
              <span>Get Advice</span>
              <ArrowRight class="w-4 h-4" />
            </template>
          </button>
        </form>

        <!-- AI Response -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-if="aiAdvice"
            class="bg-white p-6 rounded-2xl shadow-xl border border-gold-100"
          >
            <h4 class="font-bold text-gray-900 mb-3 flex items-center">
              <div class="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-white mr-3">
                <Sparkles class="w-4 h-4" />
              </div>
              Our Personalized Suggestion
            </h4>
            <div class="prose prose-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {{ aiAdvice }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
