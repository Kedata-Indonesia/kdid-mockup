<script setup lang="ts">
import { Heart, Instagram, Facebook, Twitter, Youtube } from 'lucide-vue-next'

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram', hoverClass: 'hover:bg-pink-600' },
  { icon: Facebook, href: '#', label: 'Facebook', hoverClass: 'hover:bg-blue-600' },
  { icon: Twitter, href: '#', label: 'Twitter', hoverClass: 'hover:bg-sky-500' },
  { icon: Youtube, href: '#', label: 'Youtube', hoverClass: 'hover:bg-red-600' },
]
</script>

<template>
  <footer class="bg-gray-900 text-white pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
        <!-- Brand -->
        <div class="col-span-2">
          <div class="flex items-center space-x-2 mb-4 md:mb-6">
            <Heart class="text-primary-500 w-6 h-6 md:w-8 md:h-8 fill-current" />
            <span class="text-2xl md:text-3xl font-bold font-serif tracking-tight">EverAfter</span>
          </div>
          <p class="text-gray-400 max-w-sm mb-6 md:mb-8 text-sm md:text-base">
            The premium marketplace for your dream wedding. We connect you with the finest vendors to make your special day truly unforgettable.
          </p>
          <div class="flex space-x-3 md:space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              :class="[
                'w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center transition-colors cursor-pointer',
                social.hoverClass
              ]"
            >
              <component :is="social.icon" class="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-base md:text-lg font-bold mb-4 md:mb-6">Quick Links</h4>
          <ul class="space-y-2 md:space-y-4 text-gray-400 text-sm md:text-base">
            <li>
              <NuxtLink to="/browse?category=Venue" class="hover:text-primary-400 transition-colors">
                Find Venues
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/browse?category=Catering" class="hover:text-primary-400 transition-colors">
                Catering
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/browse?category=Decoration" class="hover:text-primary-400 transition-colors">
                Decoration
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/browse?category=Photography" class="hover:text-primary-400 transition-colors">
                Photography
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="text-base md:text-lg font-bold mb-4 md:mb-6">Support</h4>
          <ul class="space-y-2 md:space-y-4 text-gray-400 text-sm md:text-base">
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors">Help Center</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors">Terms</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors">Privacy</a>
            </li>
            <li>
              <a href="#" class="hover:text-primary-400 transition-colors">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {{ new Date().getFullYear() }} Kedata Indonesia Digital. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
