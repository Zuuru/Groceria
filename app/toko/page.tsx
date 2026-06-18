'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Shield, MapPin, MessageCircle, Store, Search, ShoppingCart } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCartStore } from '@/store/cart.store'
import { ALL_PRODUCTS, GROCERIA_STORE } from '@/lib/products'

export default function TokoPage() {
  const addItem = useCartStore((s) => s.addItem)
  
  const [activeTab, setActiveTab] = useState<'produk' | 'kategori' | 'review' | 'informasi'>('produk')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isFollowed, setIsFollowed] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Filter products based on search query and category (if activeTab is 'produk')
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = [
    { name: 'All Categories', slug: 'all' },
    { name: 'Fresh Fruits', slug: 'buah' },
    { name: 'Fresh Vegetables', slug: 'sayur' },
    { name: 'Healthy Snacks', slug: 'snack' },
    { name: 'Healthy Drinks', slug: 'minuman' },
  ]

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed)
    setToastMessage(isFollowed ? 'Unfollowed shop' : 'Successfully followed shop!')
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleAddToCart = (e: React.MouseEvent, product: typeof ALL_PRODUCTS[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    })
    setToastMessage(`${product.name} successfully added to cart!`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Review Dummy Data
  const REVIEWS = [
    {
      name: 'Amanda Rizky',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      comment: '"The produce is extremely fresh, the carrots are sweet and crunchy, and the packaging is very neat and secure. Will definitely be a regular customer!"',
      date: 'Yesterday',
      productName: 'Wortel Baby Lokal'
    },
    {
      name: 'Budi Pratama',
      rating: 5,
      comment: '"The avocados are amazing! Creamy, ripe, and not rotten at all. Delivery was very fast."',
      date: '3 days ago',
      productName: 'Premium Hass Avocado'
    },
    {
      name: 'Dewi Lestari',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      rating: 4,
      comment: '"The cold-pressed juice is delicious and pure with no added sugar. The strawberries are fresh too, just a bit sour but perfect for diet."',
      date: '1 week ago',
      productName: 'Cold-Pressed Green Detox Juice'
    }
  ]

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-[#154212] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-[#BCF0AE]/20 transition-all animate-bounce">
              <span className="bg-[#BCF0AE] text-[#154212] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
              <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
            </div>
          )}

          {/* 1. Shop Header Section */}
          <section className="bg-white rounded-2xl border border-[#C2C9BB]/30 shadow-sm overflow-hidden">
            {/* Cover Area */}
            <div className="relative h-48 w-full bg-gradient-to-r from-[#2D5A27] to-[#154212]">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="absolute bottom-4 left-6 text-white/50 text-[10px] font-bold tracking-widest uppercase">
                Groceria Official Partner
              </div>
            </div>

            {/* Shop Info Card */}
            <div className="p-6 pt-0 relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* Profile Picture Overlay */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-10 sm:-mt-12 z-10">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-white p-1 border-4 border-white shadow-md flex-shrink-0">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#F5F3EE]">
                    <Image
                      src={GROCERIA_STORE.avatar}
                      alt={GROCERIA_STORE.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-[#154212] tracking-tight">
                      {GROCERIA_STORE.name}
                    </h1>
                    <span className="bg-[#2D5A27] text-[#9DD090] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Shield size={10} strokeWidth={2.5} />
                      {GROCERIA_STORE.badge}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-[#1B1C19] font-extrabold">{GROCERIA_STORE.rating}</span>
                      <span>({GROCERIA_STORE.reviewCount} reviews)</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#154212]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleFollowToggle}
                  className={`flex-grow md:flex-grow-0 px-6 py-2.5 rounded-full text-xs font-black transition-all active:scale-95 ${
                    isFollowed 
                      ? 'bg-[#F5F3EE] text-[#42493E] border border-gray-300' 
                      : 'bg-[#154212] hover:bg-[#205c1c] text-white'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow Store'}
                </button>
                <Link
                  href="/chat"
                  className="flex-grow md:flex-grow-0 px-6 py-2.5 rounded-full text-xs font-black border-2 border-[#154212] text-[#154212] hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={14} />
                  Chat
                </Link>
              </div>
            </div>
          </section>

          {/* 2. Highlight banner / Seasonal deals */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Promo Card */}
            <div className="lg:col-span-2 bg-[#2D5A27] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[200px] sm:min-h-[220px]">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=500&auto=format&fit=crop&q=80"
                    alt="Promo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 relative z-10 max-w-md">
                <span className="bg-[#FFAD4A] text-[#704200] text-[9px] font-black px-2.5 py-1 rounded-md tracking-wider uppercase">
                  SEASONAL DEALS
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#9DD090] leading-tight">
                  Fresh Harvest from Lembang Farm
                </h2>
                <p className="text-xs text-[#9DD090] font-medium leading-relaxed">
                  Enjoy the freshness of vegetables and fruits picked directly this morning. Special follower discount up to 30%.
                </p>
              </div>
              <button 
                onClick={() => {
                  setSelectedCategory('all')
                  const el = document.getElementById('tab-nav')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-white hover:bg-gray-100 text-[#154212] text-xs font-bold px-5 py-2.5 rounded-full w-fit mt-4 transition-all"
              >
                Shop Now
              </button>
            </div>

            {/* Store Stats Box */}
            <div className="bg-white rounded-2xl border border-[#C2C9BB]/30 p-6 flex flex-col justify-between gap-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Store Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F5F3EE] p-3.5 rounded-xl text-center">
                  <span className="block text-xl font-extrabold text-[#154212]">85k</span>
                  <span className="text-[10px] text-gray-500 font-bold">Followers</span>
                </div>
                <div className="bg-[#F5F3EE] p-3.5 rounded-xl text-center">
                  <span className="block text-xl font-extrabold text-[#154212]">{GROCERIA_STORE.responseRate}</span>
                  <span className="text-[10px] text-gray-500 font-bold">Chat Response</span>
                </div>
                <div className="bg-[#F5F3EE] p-3.5 rounded-xl text-center">
                  <span className="block text-xl font-extrabold text-[#154212]">{GROCERIA_STORE.location}</span>
                  <span className="text-[10px] text-gray-500 font-bold">Store Location</span>
                </div>
                <div className="bg-[#F5F3EE] p-3.5 rounded-xl text-center">
                  <span className="block text-xl font-extrabold text-[#154212]">{GROCERIA_STORE.joinYear}</span>
                  <span className="text-[10px] text-gray-500 font-bold">Joined</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Internal Navigation & Search Bar */}
          <div id="tab-nav" className="bg-white rounded-2xl border border-[#C2C9BB]/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-20 z-40">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'produk', label: 'Products' },
                { id: 'kategori', label: 'Categories' },
                { id: 'review', label: 'Reviews' },
                { id: 'informasi', label: 'Store Info' },
              ].map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#154212] text-[#D6E9BE]' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Live Search (only visible for produk and kategori tabs) */}
            {(activeTab === 'produk' || activeTab === 'kategori') && (
              <div className="relative flex-grow md:max-w-xs">
                <input
                  type="text"
                  placeholder="Search in this store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F5F3EE] border border-gray-200 focus:border-[#154212] rounded-full pl-10 pr-4 py-2 text-xs font-semibold focus:outline-none transition-colors"
                />
                <Search size={14} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            )}
          </div>

          {/* 4. Tab Contents */}
          {activeTab === 'produk' && (
            <div className="space-y-6">
              {/* Category Quick Filter */}
              <div className="flex flex-wrap gap-1.5 pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-[#BCF0AE] text-[#154212] shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#C2C9BB]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Grid Product */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/produk/${product.slug}`}
                      className="bg-white rounded-2xl overflow-hidden border border-[#C2C9BB]/30 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(17,62,33,0.06)] hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
                    >
                      {/* Image Area with Badge */}
                      <div className="relative aspect-square bg-[#F5F3EE] m-3 rounded-xl overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <span className={`absolute top-2.5 left-2.5 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Detail Area */}
                      <div className="px-4 pb-4 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center gap-1 text-amber-500 mb-1">
                            <Star size={11} fill="currentColor" />
                            <span className="text-[10px] font-bold text-gray-500">{product.rating}</span>
                          </div>
                          <h3 className="font-extrabold text-[#1B1C19] text-sm group-hover:text-[#113E21] transition-colors leading-snug line-clamp-1 mb-1">
                            {product.name}
                          </h3>
                          <span className="text-[10px] text-gray-400 font-bold block mb-3">
                            {product.unit}
                          </span>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                          <div>
                            <span className="text-sm sm:text-base font-black text-[#113E21]">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                            {product.originalPrice && (
                              <span className="block text-[9px] text-gray-400 line-through">
                                Rp {product.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="bg-[#FFAD4A] hover:bg-[#e89d3d] text-[#704200] p-2 sm:p-2.5 rounded-full transition-all active:scale-95 shadow-sm"
                            title="Add to Cart"
                          >
                            <ShoppingCart size={15} />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#C2C9BB]/30 space-y-3">
                  <h3 className="text-sm font-bold text-gray-700">No products match your search</h3>
                  <p className="text-xs text-gray-500">Try using other keywords or select another category.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'kategori' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.filter(c => c.slug !== 'all').map((cat) => {
                const count = ALL_PRODUCTS.filter(p => p.categorySlug === cat.slug).length
                const sampleProducts = ALL_PRODUCTS.filter(p => p.categorySlug === cat.slug).slice(0, 3)

                return (
                  <div
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug)
                      setActiveTab('produk')
                    }}
                    className="bg-white rounded-2xl border border-[#C2C9BB]/30 p-5 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold text-[#154212] text-base">{cat.name}</h3>
                        <span className="bg-[#BCF0AE] text-[#154212] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          {count} Products
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Premium collection of healthy produce and groceries.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {sampleProducts.map((p, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg bg-[#F5F3EE] p-1.5 overflow-hidden flex items-center justify-center">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>

                    <span className="text-xs text-[#154212] font-bold block hover:underline text-right">
                      View Category →
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'review' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-[#C2C9BB]/30 p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-5xl font-black text-[#154212] block">4.9</span>
                  <div className="flex justify-center sm:justify-start text-amber-500 gap-0.5">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-xs text-gray-400 block font-bold mt-1">Overall rating from buyers</span>
                </div>

                <div className="h-px w-full sm:h-16 sm:w-px bg-gray-200"></div>

                <div className="flex-grow space-y-1.5 w-full">
                  {[
                    { stars: 5, percentage: 92 },
                    { stars: 4, percentage: 6 },
                    { stars: 3, percentage: 1 },
                    { stars: 2, percentage: 0 },
                    { stars: 1, percentage: 1 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                      <span className="w-3">{row.stars}</span>
                      <Star size={11} fill="currentColor" className="text-amber-500" />
                      <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${row.percentage}%` }}></div>
                      </div>
                      <span className="w-8 text-right">{row.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {REVIEWS.map((review, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {review.avatar ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                            <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#BCF0AE] text-[#154212] font-bold flex items-center justify-center flex-shrink-0 text-sm">
                            {review.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-[#1B1C19] text-xs sm:text-sm">{review.name}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} fill={i < review.rating ? 'currentColor' : 'none'} />
                            ))}
                            <span className="text-[10px] text-gray-400 font-bold ml-1">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        ✓ Verified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#42493E] italic leading-relaxed">{review.comment}</p>
                    
                    <div className="text-[11px] font-semibold text-gray-400 bg-[#F5F3EE] px-3 py-1.5 rounded-lg w-fit">
                      Product: <span className="text-gray-600 font-bold">{review.productName}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'informasi' && (
            <div className="bg-white rounded-2xl border border-[#C2C9BB]/30 p-6 md:p-8 max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-lg font-black text-[#154212] mb-3">About {GROCERIA_STORE.name}</h2>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  {GROCERIA_STORE.name} is committed to always bringing premium quality ingredients, 100% organic, healthy, and fresh directly from our selected farming partners across various regions of Indonesia. We guarantee that every vegetable, fruit, snack, and juice that reaches your dining table is in peak freshness.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shipping Information</h3>
                  <ul className="text-xs sm:text-sm font-semibold text-gray-600 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-[#154212] font-black">✓</span>
                      <span>Instant & Sameday delivery for the JABODETABEK region.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#154212] font-black">✓</span>
                      <span>Orders placed before 2:00 PM WIB are shipped on the same day.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#154212] font-black">✓</span>
                      <span>Product freshness guarantee or your money back / replacement.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Store Operating Hours</h3>
                  <div className="text-xs sm:text-sm font-semibold text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="text-gray-800 font-bold">07:00 - 18:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="text-gray-800 font-bold">08:00 - 15:00 WIB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday & Holidays:</span>
                      <span className="text-gray-500 font-medium">Closed (Orders Only)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 text-xs font-semibold text-gray-500 justify-between items-center">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#154212]" />
                  Main Warehouse: {GROCERIA_STORE.location}
                </span>
                <span className="flex items-center gap-1">
                  <Shield size={14} className="text-[#154212]" />
                  Established Since {GROCERIA_STORE.joinYear}
                </span>
              </div>
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  )
}
