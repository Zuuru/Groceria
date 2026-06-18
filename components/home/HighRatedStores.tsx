'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Shield, ArrowRight, Store } from 'lucide-react'

interface HighRatedStore {
  id: string
  name: string
  avatar: string
  cover: string
  location: string
  rating: number
  reviewCount: number
  badge: string
  productCount: number
  specialties: string[]
  categories: string[]
}

const STORES: HighRatedStore[] = [
  {
    id: 'store-1',
    name: 'Salad Bowl Co.',
    avatar: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    location: 'Menteng, Jakarta',
    rating: 4.9,
    reviewCount: 2840,
    badge: 'Top Rated',
    productCount: 42,
    specialties: ['Salad', 'Vegetables'],
    categories: ['salad', 'sayuran'],
  },
  {
    id: 'store-2',
    name: 'Nusantara Healthy Soup',
    avatar: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=120&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    location: 'Kemang, Jakarta',
    rating: 4.9,
    reviewCount: 1960,
    badge: 'Trusted',
    productCount: 28,
    specialties: ['Soup', 'Kitchen Spices'],
    categories: ['sop', 'bumbu'],
  },
  {
    id: 'store-3',
    name: 'Smoothie Bliss',
    avatar: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=120&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&auto=format&fit=crop&q=80',
    location: 'Bali',
    rating: 4.8,
    reviewCount: 1520,
    badge: 'Premium',
    productCount: 35,
    specialties: ['Smoothie', 'Fresh Juice'],
    categories: ['smoothie', 'jus'],
  },
  {
    id: 'store-4',
    name: 'Nusantara Fruit Market',
    avatar: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=120&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=600&auto=format&fit=crop&q=80',
    location: 'Bandung, Jawa Barat',
    rating: 4.8,
    reviewCount: 3100,
    badge: 'Trusted',
    productCount: 56,
    specialties: ['Local Fruits', 'Imported Fruits'],
    categories: ['buah'],
  },
  {
    id: 'store-5',
    name: 'Organic Grain House',
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    location: 'Yogyakarta',
    rating: 4.7,
    reviewCount: 890,
    badge: 'Organic',
    productCount: 22,
    specialties: ['Bread', 'Granola'],
    categories: ['roti', 'snack'],
  },
  {
    id: 'store-6',
    name: 'Heritage Spice House',
    avatar: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=120&auto=format&fit=crop&q=80',
    cover: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    location: 'Surabaya, Jawa Timur',
    rating: 4.7,
    reviewCount: 1250,
    badge: 'Trusted',
    productCount: 38,
    specialties: ['Spices', 'Soup'],
    categories: ['bumbu', 'sop'],
  },
]

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'salad', label: 'Salad' },
  { id: 'sop', label: 'Soup & Broth' },
  { id: 'smoothie', label: 'Smoothie & Juice' },
  { id: 'buah', label: 'Fresh Fruits' },
  { id: 'roti', label: 'Bread & Bakery' },
  { id: 'bumbu', label: 'Herbs & Spices' },
  { id: 'snack', label: 'Healthy Snacks' },
]

export function HighRatedStores() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredStores =
    activeFilter === 'all'
      ? STORES
      : STORES.filter((s) => s.categories.includes(activeFilter))

  // Always show max 6
  const displayStores = filteredStores.slice(0, 6)

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeFilter === tab.id
                ? 'bg-[#f4b844] text-[#113E21] shadow-md shadow-amber-500/10'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stores Grid */}
      {displayStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayStores.map((store) => (
            <Link
              key={store.id}
              href="/toko"
              className="bg-white rounded-3xl overflow-hidden border border-gray-100/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(17,62,33,0.08)] hover:-translate-y-1 group flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={store.cover}
                  alt={store.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Badge */}
                <span className="absolute top-3 right-3 bg-[#BCF0AE] text-[#154212] text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Shield size={9} strokeWidth={3} />
                  {store.badge}
                </span>
              </div>

              {/* Store Info */}
              <div className="p-5 flex flex-col flex-1 justify-between -mt-7 relative z-10">
                {/* Avatar overlapping cover */}
                <div className="flex items-end gap-3 mb-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white border-[3px] border-white shadow-md flex-shrink-0">
                    <Image
                      src={store.avatar}
                      alt={store.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 pb-0.5">
                    <h3 className="font-extrabold text-[#1B1C19] text-sm sm:text-base truncate group-hover:text-[#113E21] transition-colors">
                      {store.name}
                    </h3>
                    <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                      <MapPin size={9} /> {store.location}
                    </span>
                  </div>
                </div>

                {/* Rating & Stats */}
                <div className="flex items-center gap-4 mb-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Star size={13} fill="currentColor" className="text-amber-500" />
                    <span className="font-extrabold text-[#1B1C19]">{store.rating}</span>
                    <span className="text-gray-400">({store.reviewCount.toLocaleString('en-US')})</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Store size={11} className="text-[#154212]" />
                    <span className="font-bold">{store.productCount} Products</span>
                  </div>
                </div>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {store.specialties.map((s) => (
                    <span
                      key={s}
                      className="bg-[#F5F3EE] text-[#42493E] text-[10px] font-bold px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100/60 space-y-3">
          <h3 className="text-sm font-bold text-gray-700">No stores found for this category</h3>
          <p className="text-xs text-gray-500">Try selecting another filter to find your favorite store.</p>
        </div>
      )}

      {/* See More */}
      <div className="flex justify-center">
        <Link
          href="/kategori?tab=toko"
          className="inline-flex items-center gap-2 bg-[#113E21] hover:bg-[#1a5630] text-white font-bold text-sm px-8 py-3 rounded-full transition-all hover:scale-105 shadow-md shadow-emerald-950/10"
        >
          View All Stores
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
