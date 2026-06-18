'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Star, MapPin, ShoppingCart, ArrowRight, ChevronLeft, ChevronRight, Package } from 'lucide-react'
import { ALL_PRODUCTS } from '@/lib/products'
import { useCartStore } from '@/store/cart.store'

// Mock store origins for regular products
const STORE_MAP: Record<string, { name: string; avatar: string; location: string }> = {
  'prod-avocado': {
    name: 'Fresh Meadows Farm',
    avatar: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120&auto=format&fit=crop&q=80',
    location: 'Lembang, Bandung',
  },
  'prod-strawberry': {
    name: 'Berry Hills Organik',
    avatar: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=120&auto=format&fit=crop&q=80',
    location: 'Ciwidey, Bandung',
  },
  'prod-kale': {
    name: 'Green Valley Co.',
    avatar: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=120&auto=format&fit=crop&q=80',
    location: 'Bogor, Jawa Barat',
  },
  'prod-tomato': {
    name: 'Artisan Bakery Co.',
    avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&auto=format&fit=crop&q=80',
    location: 'Jakarta Selatan',
  },
  'prod-almond': {
    name: 'NutriSnack House',
    avatar: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=120&auto=format&fit=crop&q=80',
    location: 'Tangerang Selatan',
  },
  'prod-greenjuice': {
    name: 'Global Flavors',
    avatar: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=120&auto=format&fit=crop&q=80',
    location: 'Kemang, Jakarta',
  },
}

const FEATURED_IDS = [
  'prod-avocado',
  'prod-strawberry',
  'prod-kale',
  'prod-tomato',
  'prod-almond',
  'prod-greenjuice',
]

// All 8 bundling IDs
const BUNDLING_IDS = [
  'prod-bundling-anak-kos',
  'prod-bundling-bulking',
  'prod-bundling-diet',
  'prod-bundling-vegetarian',
  'prod-bundling-keluarga',
  'prod-bundling-meal-prep',
  'prod-bundling-lifestyle',
  'prod-bundling-praktis',
]

export function StoreProducts() {
  const addItem = useCartStore((s) => s.addItem)
  const carouselRef = useRef<HTMLDivElement>(null)

  const featured = FEATURED_IDS
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof ALL_PRODUCTS

  const bundlingProducts = BUNDLING_IDS
    .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof ALL_PRODUCTS

  const handleAdd = (e: React.MouseEvent, product: (typeof ALL_PRODUCTS)[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] })
  }

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = 300
    carouselRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="space-y-14">

      {/* ── Bundling Siap Masak Carousel ── */}
      <div className="space-y-5">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Package size={18} className="text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#113E21] leading-tight">Bundling Siap Masak</h2>
              <p className="text-xs text-gray-500">Paket lengkap, tinggal masak — hemat & praktis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
            <Link
              href="/kategori?cat=bundling"
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#113E21] hover:underline"
            >
              Lihat Semua <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-3 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bundlingProducts.map((product, idx) => (
              <Link
                key={product.id}
                href={`/produk/${product.slug}`}
                className="flex-shrink-0 w-[220px] bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(17,62,33,0.10)] hover:-translate-y-1 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-[140px] overflow-hidden bg-[#F5F3EE]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Discount Badge */}
                  {product.discount && (
                    <span className="absolute top-2.5 right-2.5 bg-[#FFAD4A] text-[#704200] text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                      -{product.discount}
                    </span>
                  )}

                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-extrabold text-[13px] leading-tight line-clamp-2 drop-shadow">
                      {product.name}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                  {/* Rating + sold */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={11} fill="currentColor" className="text-amber-500" />
                      <span className="text-[11px] font-bold text-gray-700">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-semibold">🔥 {product.soldCount} terjual</span>
                  </div>

                  {/* Description */}
                  <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-sm font-black text-[#113E21]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-[10px] text-gray-400 line-through">
                          Rp {product.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className="bg-[#113E21] hover:bg-[#1a5630] text-white p-2 rounded-full transition-all active:scale-95 shadow-sm"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      {/* ── Regular Products Grid ── */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => {
            const store = STORE_MAP[product.id]
            return (
              <Link
                key={product.id}
                href={`/produk/${product.slug}`}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(17,62,33,0.08)] hover:-translate-y-1 group flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold text-gray-600">{product.rating}</span>
                      <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                    </div>
                    <h3 className="font-extrabold text-[#1B1C19] text-sm sm:text-base group-hover:text-[#113E21] transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Store Info Bar */}
                  {store && (
                    <div className="flex items-center gap-2.5 bg-[#F5F3EE] rounded-xl px-3 py-2 mb-3">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                        <Image src={store.avatar} alt={store.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-extrabold text-[#1B1C19] block truncate">{store.name}</span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-0.5">
                          <MapPin size={8} /> {store.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-base font-black text-[#113E21]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-[10px] text-gray-400 line-through">
                          Rp {product.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className="bg-[#FFAD4A] hover:bg-[#e89d3d] text-[#704200] p-2.5 rounded-full transition-all active:scale-95 shadow-sm"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* See More */}
        <div className="flex justify-center">
          <Link
            href="/kategori"
            className="inline-flex items-center gap-2 bg-[#113E21] hover:bg-[#1a5630] text-white font-bold text-sm px-8 py-3 rounded-full transition-all hover:scale-105 shadow-md shadow-emerald-950/10"
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
