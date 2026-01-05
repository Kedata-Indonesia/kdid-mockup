<script setup lang="ts">
import { Heart, Users, Shield, Award } from 'lucide-vue-next'

useHead({
  title: 'How it Works - EverAfter'
})

const steps = [
  {
    number: '01',
    title: 'Browse Vendors',
    description: 'Explore our curated collection of premium wedding vendors. Filter by category, location, and budget to find your perfect match.'
  },
  {
    number: '02',
    title: 'Build Your Package',
    description: 'Add your favorite vendors to your booking list. Mix and match services to create your dream wedding package.'
  },
  {
    number: '03',
    title: 'Secure Checkout',
    description: 'Complete your booking with our secure payment system. Your payment is held in escrow for your protection.'
  },
  {
    number: '04',
    title: 'Plan with Ease',
    description: 'Track your wedding planning progress, communicate with vendors, and enjoy your journey to the perfect day.'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Verified Vendors',
    description: 'Every vendor on our platform is thoroughly vetted and verified for quality and professionalism.'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Our team is here to help you every step of the way, from browsing to your big day.'
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'We partner only with the best vendors to ensure your wedding is nothing short of perfect.'
  }
]
</script>

<template>
  <div class="space-y-24 pb-20">
    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      <div class="text-center max-w-3xl mx-auto">
        <div class="flex items-center justify-center space-x-2 text-primary-600 font-bold mb-4">
          <Heart class="w-5 h-5 fill-current" />
          <span class="uppercase tracking-widest text-sm">How it Works</span>
        </div>
        <h1 class="text-5xl font-bold font-serif mb-6">
          Planning Your Dream Wedding Made Simple
        </h1>
        <p class="text-xl text-gray-500 leading-relaxed">
          EverAfter connects you with Indonesia's finest wedding vendors, making it easy to plan every detail of your special day.
        </p>
      </div>
    </section>

    <!-- Steps -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="step in steps"
          :key="step.number"
          class="relative p-8 bg-white rounded-4xl border border-gray-100 hover:shadow-xl transition-all"
        >
          <div class="text-6xl font-bold text-primary-100 mb-4">{{ step.number }}</div>
          <h3 class="text-xl font-bold mb-3">{{ step.title }}</h3>
          <p class="text-gray-500">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gray-900 rounded-6xl p-12 md:p-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">Why Choose EverAfter?</h2>
          <p class="text-gray-400 text-lg">We're committed to making your wedding planning journey seamless and enjoyable.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center p-8 rounded-4xl bg-white/5 border border-white/10"
          >
            <div class="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">{{ feature.title }}</h3>
            <p class="text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-bold mb-6">Ready to Start Planning?</h2>
      <p class="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
        Join thousands of couples who have found their perfect wedding vendors on EverAfter.
      </p>
      <NuxtLink
        to="/browse"
        class="inline-flex items-center bg-primary-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-primary-700 transition-all text-lg shadow-lg shadow-primary-500/20"
      >
        Browse Vendors
      </NuxtLink>
    </section>
  </div>
</template>
