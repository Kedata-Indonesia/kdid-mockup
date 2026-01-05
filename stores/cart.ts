import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'
import { TAX_RATE } from '~/utils/constants'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),

    subtotal: (state) => state.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),

    tax: (state) => {
      const subtotal = state.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
      return subtotal * TAX_RATE
    },

    total(): number {
      return this.subtotal + this.tax
    },

    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addToCart(product: Product, quantity: number = 1) {
      const existing = this.items.find(item => item.product.id === product.id)

      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },

    removeFromCart(productId: string) {
      const index = this.items.findIndex(item => item.product.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.product.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.items = []
    },
  },

  persist: true,
})
