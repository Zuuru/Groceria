'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ChevronRight, Check, Sparkles, Star, Store, MapPin, Shield } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCartStore } from '@/store/cart.store'
import { ALL_PRODUCTS } from '@/lib/products'

const FILTER_CATEGORIES = [
  { name: 'All Products', slug: 'all' },
  { name: 'Bundling Siap Masak', slug: 'bundling' },
  { name: 'Fresh Fruits', slug: 'buah' },
  { name: 'Fresh Vegetables', slug: 'sayur' },
  { name: 'Healthy Snacks', slug: 'snack' },
  { name: 'Healthy Drinks', slug: 'minuman' },
]

const FILTER_STORE_CATEGORIES = [
  { name: 'All Stores', slug: 'all' },
  { name: 'Salad & Vegetables', slug: 'salad' },
  { name: 'Soup & Broth', slug: 'sop' },
  { name: 'Smoothie & Juices', slug: 'smoothie' },
  { name: 'Fresh Fruits', slug: 'buah' },
  { name: 'Bread & Bakery', slug: 'roti' },
  { name: 'Herbs & Spices', slug: 'bumbu' },
  { name: 'Healthy Snacks', slug: 'snack' },
]

const STORES = [
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

export default function KategoriPage() {
  const addItem = useCartStore((s) => s.addItem)
  
  // Tab view selector: 'produk' or 'toko'
  const [viewMode, setViewMode] = useState<'produk' | 'toko'>('produk')

  // Set initial tab from query string on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('tab') === 'toko') {
        setViewMode('toko')
      }
    }
  }, [])

  // Product states
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState(500000)
  const [onlyOrganic, setOnlyOrganic] = useState(false)
  const [sortBy, setSortBy] = useState('Most Relevant')

  // Store states
  const [selectedStoreCategory, setSelectedStoreCategory] = useState('all')
  const [minRating, setMinRating] = useState<number>(0)

  // Filter products
  let filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) return false
    if (onlyOrganic && !product.isOrganic) return false
    if (product.price > priceRange) return false
    return true
  })

  // Sorting products
  if (sortBy === 'Price: Low to High') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'Price: High to Low') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  }

  // Filter stores
  const filteredStores = STORES.filter((store) => {
    if (selectedStoreCategory !== 'all' && !store.categories.includes(selectedStoreCategory)) return false
    if (store.rating < minRating) return false
    return true
  })

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent, product: (typeof ALL_PRODUCTS)[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    })
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-gray-800 flex flex-col">
      <div className="flex-1">
        <Navbar />

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-500 tracking-wider uppercase mb-3">
            <Link href="/" className="hover:text-[#113E21] transition-colors">HOME</Link>
            <ChevronRight size={12} className="text-gray-400" />
            <span className="text-[#113E21]">{viewMode === 'produk' ? 'ALL PRODUCTS' : 'PARTNER SHOPS'}</span>
          </nav>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#113E21] mb-6 tracking-tight">
            {viewMode === 'produk' ? 'Freshness From The Garden' : 'Trusted Partner Shops'}
          </h1>

          {/* View Mode Toggle Tabs */}
          <div className="flex border-b border-gray-200/80 mb-8 gap-1 sm:gap-2">
            <button
              onClick={() => setViewMode('produk')}
              className={`pb-4 px-4 sm:px-6 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 ${
                viewMode === 'produk'
                  ? 'border-[#113E21] text-[#113E21]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Search Products
            </button>
            <button
              onClick={() => setViewMode('toko')}
              className={`pb-4 px-4 sm:px-6 text-xs sm:text-sm font-black transition-all border-b-2 flex items-center gap-2 ${
                viewMode === 'toko'
                  ? 'border-[#113E21] text-[#113E21]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Search Partner Stores
            </button>
          </div>

          {/* Sidebar + Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Filters */}
            <div className="space-y-6">
              
              {viewMode === 'produk' ? (
                <>
                  {/* Category selector */}
                  <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-[#C2C9BB]/30">
                    <h3 className="text-base font-bold text-[#113E21] mb-4">Category</h3>
                    <div className="space-y-2">
                      {FILTER_CATEGORIES.map((cat) => {
                        const isActive = selectedCategory === cat.slug
                        return (
                          <button
                            key={cat.slug}
                            onClick={() => setSelectedCategory(cat.slug)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                              isActive
                                ? 'bg-[#113E21] text-[#D6E9BE]'
                                : 'text-gray-600 hover:bg-gray-200/50'
                            }`}
                          >
                            <span>{cat.name}</span>
                            {isActive && <Check size={16} className="text-[#D6E9BE]" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-[#C2C9BB]/30">
                    <h3 className="text-base font-bold text-[#113E21] mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="5000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#113E21]"
                      />
                      <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                        <span>Rp 0</span>
                        <span className="text-[#113E21] text-sm">Max: Rp {priceRange.toLocaleString('id-ID')}</span>
                        <span>Rp 500k</span>
                      </div>
                    </div>
                  </div>

                  {/* Organic Switch Toggle */}
                  <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-[#C2C9BB]/30 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#113E21]">Organic Only</span>
                    <button
                      onClick={() => setOnlyOrganic(!onlyOrganic)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        onlyOrganic ? 'bg-[#113E21]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          onlyOrganic ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Store Category selector */}
                  <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-[#C2C9BB]/30">
                    <h3 className="text-base font-bold text-[#113E21] mb-4">Shop Category</h3>
                    <div className="space-y-2">
                      {FILTER_STORE_CATEGORIES.map((cat) => {
                        const isActive = selectedStoreCategory === cat.slug
                        return (
                          <button
                            key={cat.slug}
                            onClick={() => setSelectedStoreCategory(cat.slug)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                              isActive
                                ? 'bg-[#113E21] text-[#D6E9BE]'
                                : 'text-gray-600 hover:bg-gray-200/50'
                            }`}
                          >
                            <span>{cat.name}</span>
                            {isActive && <Check size={16} className="text-[#D6E9BE]" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Store Rating Filter */}
                  <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-[#C2C9BB]/30">
                    <h3 className="text-base font-bold text-[#113E21] mb-4">Minimum Rating</h3>
                    <div className="space-y-2">
                      {[0, 4.7, 4.8, 4.9].map((ratingVal) => {
                        const isActive = minRating === ratingVal
                        return (
                          <button
                            key={ratingVal}
                            onClick={() => setMinRating(ratingVal)}
                            className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm font-bold transition-all text-left ${
                              isActive
                                ? 'bg-[#113E21] text-[#D6E9BE]'
                                : 'text-gray-600 hover:bg-gray-200/50'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {ratingVal === 0 ? 'All Ratings' : `${ratingVal} and above`}
                            </span>
                            {isActive && <Check size={16} className="text-[#D6E9BE]" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              
              {viewMode === 'produk' ? (
                <>
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm font-semibold text-gray-500">
                      Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> selected products
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">SORT BY:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#FBFBF9] border border-[#C2C9BB] text-[#1B1C19] text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#113E21]"
                      >
                        <option>Most Relevant</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Grid */}
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/produk/${product.slug}`}
                          className="bg-white rounded-3xl overflow-hidden border border-[#C2C9BB]/30 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(17,62,33,0.06)] hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
                        >
                          {/* Image Area with Badge */}
                          <div className="relative aspect-square bg-[#F5F3EE] m-3 rounded-2xl overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.badge && (
                              <span className={`absolute top-3 left-3 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                                {product.badge}
                              </span>
                            )}
                          </div>

                          {/* Detail Area */}
                          <div className="px-5 pb-5 flex flex-col justify-between flex-1">
                            <div>
                              <div className="flex items-center gap-0.5 text-amber-400 mb-1">
                                <Star size={11} fill="currentColor" />
                                <span className="text-xs font-semibold text-gray-600">{product.rating} ({product.reviewCount})</span>
                              </div>
                              <h3 className="font-extrabold text-[#1B1C19] text-base group-hover:text-[#113E21] transition-colors leading-snug line-clamp-1 mb-1">
                                {product.name}
                              </h3>
                              <span className="text-xs text-gray-500 font-semibold block mb-4">
                                {product.unit}
                              </span>
                            </div>

                            {/* Price & CTA */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div>
                                <span className="text-base sm:text-lg font-black text-[#113E21]">
                                  Rp {product.price.toLocaleString('id-ID')}
                                </span>
                                {product.originalPrice && (
                                  <span className="block text-[10px] text-gray-400 line-through">
                                    Rp {product.originalPrice.toLocaleString('id-ID')}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                className="bg-[#FFAD4A] hover:bg-[#e89d3d] text-[#704200] p-3 rounded-full transition-all active:scale-95 shadow-sm"
                                title="Add to Cart"
                              >
                                <ShoppingCart size={18} />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-12 text-center border border-[#C2C9BB]/30 space-y-4">
                      <Sparkles className="mx-auto text-gray-300" size={48} />
                      <h3 className="text-lg font-bold text-gray-700">No products match your criteria</h3>
                      <p className="text-sm text-gray-500">Try changing filters or adjusting your price range.</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm font-semibold text-gray-500">
                      Showing <span className="text-gray-900 font-bold">{filteredStores.length}</span> active partner shops
                    </div>
                  </div>

                  {/* Store Grid */}
                  {filteredStores.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredStores.map((store) => (
                        <Link
                          key={store.id}
                          href="/toko"
                          className="bg-white rounded-3xl overflow-hidden border border-[#C2C9BB]/30 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(17,62,33,0.08)] hover:-translate-y-1 group flex flex-col cursor-pointer"
                        >
                          {/* Cover Image */}
                          <div className="relative h-32 overflow-hidden">
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
                              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white border-[3px] border-white shadow-md flex-shrink-0">
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
                    <div className="bg-white rounded-3xl p-12 text-center border border-[#C2C9BB]/30 space-y-4">
                      <Store className="mx-auto text-gray-300" size={48} />
                      <h3 className="text-lg font-bold text-gray-700">No shops match your criteria</h3>
                      <p className="text-sm text-gray-500">Try changing shop filters or adjusting minimum rating.</p>
                    </div>
                  )}
                </>
              )}

              {/* Pagination (only for Products) */}
              {viewMode === 'produk' && filteredProducts.length > 0 && (
                <div className="flex justify-center items-center gap-1.5 pt-8">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#C2C9BB]/30 text-gray-400 hover:bg-gray-100 transition-colors">
                    &lt;
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#113E21] text-[#D6E9BE] font-bold text-sm">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#C2C9BB]/30 text-gray-600 hover:bg-gray-100 transition-colors text-sm">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#C2C9BB]/30 text-gray-600 hover:bg-gray-100 transition-colors text-sm">
                    3
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#C2C9BB]/30 text-gray-400 hover:bg-gray-100 transition-colors">
                    &gt;
                  </button>
                </div>
              )}

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
