import { defineNuxtPlugin } from '#app'
import type { Pinia } from 'pinia'

export default defineNuxtPlugin(({ $pinia }) => {
  const pinia = $pinia as Pinia

  // Simple localStorage persistence for stores with persist: true
  pinia.use(({ store }) => {
    const storeId = store.$id

    // Load from localStorage on init
    const savedState = localStorage.getItem(`pinia-${storeId}`)
    if (savedState) {
      try {
        store.$patch(JSON.parse(savedState))
      } catch (e) {
        console.error(`Error loading state for ${storeId}:`, e)
      }
    }

    // Save to localStorage on change
    store.$subscribe((_, state) => {
      try {
        localStorage.setItem(`pinia-${storeId}`, JSON.stringify(state))
      } catch (e) {
        console.error(`Error saving state for ${storeId}:`, e)
      }
    })
  })
})
