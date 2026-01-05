import { defineStore } from 'pinia'
import type { Order, CartItem } from '~/types'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
  }),

  getters: {
    hasOrders: (state) => state.orders.length > 0,

    getOrderById: (state) => (id: string) => state.orders.find(order => order.id === id),

    recentOrders: (state) => state.orders.slice(0, 5),
  },

  actions: {
    addOrder(orderData: {
      total: number
      items: CartItem[]
      eventDate?: string
      location?: string
    }) {
      const newOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 100000)}`,
        date: new Date().toISOString().split('T')[0],
        total: orderData.total,
        status: 'Paid',
        items: [...orderData.items],
        eventDate: orderData.eventDate,
        location: orderData.location,
      }

      this.orders.unshift(newOrder)
      return newOrder
    },

    updateOrderStatus(orderId: string, status: Order['status']) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = status
      }
    },
  },

  persist: true,
})
