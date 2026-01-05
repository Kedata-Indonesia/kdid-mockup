export enum CategoryType {
  VENUE = 'Venue',
  CATERING = 'Catering',
  PHOTOGRAPHY = 'Photography',
  MAKEUP = 'Makeup & Attire',
  DECORATION = 'Decoration',
  ENTERTAINMENT = 'Entertainment',
}

export interface Vendor {
  name: string
  location: string
  rating: number
  reviews: number
}

export interface Product {
  id: string
  name: string
  category: CategoryType
  price: number
  description: string
  images: string[]
  vendor: Vendor
  features: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Order {
  id: string
  date: string
  createdAt: string
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
  items: CartItem[]
  eventDate?: string
  location?: string
}

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
}

export interface Category {
  name: CategoryType
  icon: string
  color: string
}
