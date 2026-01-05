<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Simple header -->
    <header class="py-6">
      <div class="max-w-7xl mx-auto px-4">
        <NuxtLink to="/" class="flex items-center justify-center space-x-2">
          <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
            <Heart class="text-white w-6 h-6 fill-current" />
          </div>
          <span class="text-2xl font-bold font-serif text-gray-900 tracking-tight">EverAfter</span>
        </NuxtLink>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <!-- Simple footer -->
    <footer class="py-6 text-center text-gray-500 text-sm">
      <p>&copy; {{ new Date().getFullYear() }} EverAfter. All rights reserved.</p>
    </footer>
  </div>
</template>
