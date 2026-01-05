import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,

    userInitial: (state) => state.user?.name.charAt(0).toUpperCase() || '',
  },

  actions: {
    login(email: string, _password: string, name?: string) {
      // Mock login - in production, this would call an API
      this.user = {
        id: `usr-${Date.now()}`,
        name: name || 'User',
        email: email,
      }
      return true
    },

    register(name: string, email: string, _password: string) {
      // Mock registration - in production, this would call an API
      this.user = {
        id: `usr-${Date.now()}`,
        name: name,
        email: email,
      }
      return true
    },

    logout() {
      this.user = null
    },

    updateProfile(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    },
  },

  persist: true,
})
