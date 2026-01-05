import { CategoryType, type Product, type Category } from '~/types'

export const CATEGORIES: Category[] = [
  { name: CategoryType.VENUE, icon: '🏰', color: 'bg-blue-50' },
  { name: CategoryType.CATERING, icon: '🍽️', color: 'bg-orange-50' },
  { name: CategoryType.PHOTOGRAPHY, icon: '📸', color: 'bg-purple-50' },
  { name: CategoryType.DECORATION, icon: '💐', color: 'bg-pink-50' },
  { name: CategoryType.MAKEUP, icon: '💄', color: 'bg-rose-50' },
  { name: CategoryType.ENTERTAINMENT, icon: '🎵', color: 'bg-indigo-50' },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Heritage Grand Ballroom',
    category: CategoryType.VENUE,
    price: 45000000,
    description: 'A luxurious historical ballroom with capacity up to 1000 guests. Features majestic chandeliers and premium acoustics.',
    images: ['https://picsum.photos/seed/venue1/800/600', 'https://picsum.photos/seed/venue2/800/600'],
    vendor: {
      name: 'Heritage Hotels Group',
      location: 'Slamet Riyadi, Surakarta',
      rating: 4.9,
      reviews: 128
    },
    features: ['Valet Parking', 'Full AC', 'Private VIP Room', 'Standard Sound System']
  },
  {
    id: '2',
    name: 'Rustic Garden Dreams Package',
    category: CategoryType.DECORATION,
    price: 15000000,
    description: 'Transform your venue into a whimsical garden with our rustic decor package. Includes fresh flowers and wooden elements.',
    images: ['https://picsum.photos/seed/decor1/800/600'],
    vendor: {
      name: 'Bloom & Twig Decor',
      location: 'Colomadu, Karanganyar',
      rating: 4.7,
      reviews: 85
    },
    features: ['Custom Entrance Arch', 'Photo Booth Area', 'Bridal Stage Decor', 'Table Centerpieces']
  },
  {
    id: '3',
    name: 'Gourmet Indonesian Buffet',
    category: CategoryType.CATERING,
    price: 125000,
    description: 'Authentic flavors of the archipelago prepared by award-winning chefs. Minimum 500 pax.',
    images: ['https://picsum.photos/seed/food1/800/600'],
    vendor: {
      name: 'Sari Rasa Catering',
      location: 'Banjarsari, Surakarta',
      rating: 4.8,
      reviews: 210
    },
    features: ['Live Stall Options', 'Dessert Corner', 'Halal Certified', 'Waitstaff Included']
  },
  {
    id: '4',
    name: 'Timeless Cinematic Wedding Film',
    category: CategoryType.PHOTOGRAPHY,
    price: 8500000,
    description: 'Capture every emotional moment with our cinematic video and high-res photo package.',
    images: ['https://picsum.photos/seed/photo1/800/600'],
    vendor: {
      name: 'Eternal Frames',
      location: 'Grogol, Sukoharjo',
      rating: 4.9,
      reviews: 56
    },
    features: ['2 Photographers', '1 Videographer', 'Drone Footage', 'Custom USB Box']
  },
  {
    id: '5',
    name: 'Traditional Javanese Paes Ageng',
    category: CategoryType.MAKEUP,
    price: 5500000,
    description: 'Specialized makeup for traditional Javanese weddings with attention to cultural details.',
    images: ['https://picsum.photos/seed/makeup1/800/600'],
    vendor: {
      name: 'Rias Putri Ayu',
      location: 'Laweyan, Surakarta',
      rating: 4.6,
      reviews: 42
    },
    features: ['Trial Session', 'Accessories Included', 'Bridesmaids Touch-up', 'Quality Cosmetics']
  },
  {
    id: '6',
    name: 'Premium Wedding Band Package',
    category: CategoryType.ENTERTAINMENT,
    price: 12000000,
    description: 'Live band performance with professional musicians. Includes sound system and lighting setup.',
    images: ['https://picsum.photos/seed/band1/800/600'],
    vendor: {
      name: 'Harmoni Entertainment',
      location: 'Jebres, Surakarta',
      rating: 4.8,
      reviews: 67
    },
    features: ['5-Piece Band', 'Sound System', 'LED Lighting', 'MC Services']
  }
]

export const LOCATIONS = [
  'All Locations',
  'Surakarta',
  'Yogyakarta',
  'Jakarta',
  'Semarang',
  'Bandung'
]

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(amount)
}

export const TAX_RATE = 0.11 // 11% PPN
