<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-gray-900 rounded-6xl p-12 md:p-20 text-center relative overflow-hidden">
      <!-- Pattern overlay -->
      <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div class="relative z-10 max-w-2xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold font-serif text-white mb-8">
          Ready to start planning your perfect day?
        </h2>
        <p class="text-gray-400 text-lg mb-10">
          Join thousands of couples who have found their perfect wedding vendors on EverAfter.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink
            to="/register"
            class="bg-primary-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-primary-700 transition-all text-lg shadow-lg shadow-primary-500/20"
          >
            Join as Customer
          </NuxtLink>
          <a
            href="#"
            class="bg-white/10 text-white font-bold py-4 px-10 rounded-2xl hover:bg-white/20 transition-all text-lg backdrop-blur-sm"
          >
            Become a Vendor
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
