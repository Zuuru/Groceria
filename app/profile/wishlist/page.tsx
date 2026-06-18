'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Wallet, 
  LogOut,
  Star,
  ShoppingCart,
  Trash2,
  ChevronRight,
  Target
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCartStore } from '@/store/cart.store'

interface WishlistItem {
  id: string
  name: string
  price: number
  unit: string
  rating: number
  tag?: string
  tagColor?: string
  image: string
}

export default function WishlistPage() {
  const { addItem } = useCartStore()
  
  const sidebarLinks = [
    { name: 'Informasi Akun', href: '/profile', icon: <User size={18} /> },
    { name: 'Riwayat Pesanan', href: '/profile/pesanan', icon: <ShoppingBag size={18} /> },
    { name: 'Wishlist', href: '/profile/wishlist', icon: <Heart size={18} /> },
    { name: 'Daftar Alamat', href: '/profile/alamat', icon: <MapPin size={18} /> },
    { name: 'Preferensi & Goals', href: '/profile/preferensi', icon: <Target size={18} /> },
    { name: 'Groceria Pay', href: '/profile/pay', icon: <Wallet size={18} /> },
  ]

  const [wishlist, setWishlist] = useState<WishlistItem[]>([
    {
      id: 'prod-kale',
      name: 'Organic Dino Kale',
      price: 18500,
      unit: 'ikat',
      rating: 4.8,
      tag: 'ORGANIC',
      tagColor: 'bg-[#154212] text-white',
      image: 'https://images.unsplash.com/photo-1628773822503-930a8589e4a3?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'prod-avocado',
      name: 'Alpukat Mentega',
      price: 45000,
      unit: 'kg',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'prod-nuts',
      name: 'Premium Mixed Nuts',
      price: 78000,
      unit: '250g',
      rating: 4.7,
      tag: 'PREMIUM',
      tagColor: 'bg-[#885200] text-white',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'prod-strawberry',
      name: 'Organic Strawberry',
      price: 32000,
      unit: 'pack',
      rating: 5.0,
      tag: 'ORGANIC',
      tagColor: 'bg-[#154212] text-white',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'prod-carrots',
      name: 'Baby Carrots',
      price: 12500,
      unit: 'ikat',
      rating: 4.6,
      tag: 'ORGANIC',
      tagColor: 'bg-[#154212] text-white',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'prod-salad',
      name: 'Superfood Power Bowl',
      price: 65000,
      unit: 'porsi',
      rating: 4.9,
      tag: 'READY TO EAT',
      tagColor: 'bg-[#2E3E20] text-white',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop&q=80'
    }
  ])

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleRemove = (id: string, name: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
    showToast(`${name} dihapus dari wishlist`)
  }

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    })
    showToast(`${item.name} berhasil ditambahkan ke keranjang!`)
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Wishlist Content Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-5 right-5 bg-[#154212] text-[#9DD090] font-bold text-sm px-5 py-3 rounded-xl shadow-2xl border border-[#C2C9BB]/30 transition-all transform translate-y-0 z-50 flex items-center gap-2 animate-bounce">
              <span>{toastMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-[#C2C9BB]/30 shadow-sm space-y-6">
                
                {/* User Info Header in Sidebar */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full border-2 border-[#BCF0AE] overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      alt="Budi Santoso"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-extrabold text-gray-950 truncate text-base leading-tight">
                      Budi Santoso
                    </h2>
                    <span className="text-xs text-gray-500 font-bold block mt-0.5">
                      Member Gold
                    </span>
                  </div>
                </div>

                {/* Sidebar Links */}
                <div className="space-y-1 pt-4 border-t border-gray-100">
                  {sidebarLinks.map((link) => {
                    const isActive = link.name === 'Wishlist'
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${
                          isActive
                            ? 'bg-[#2D5A27] text-[#9DD090]'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    )
                  })}
                  
                  <div className="pt-2 border-t border-gray-100 mt-2">
                    <button
                      onClick={() => alert('Keluar dari akun...')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#BA1A1A] hover:bg-red-50 transition-all text-left"
                    >
                      <LogOut size={18} />
                      <span>Keluar</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Wishlist Main Area */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Header & Count */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-sm">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 mb-3">
                  <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                  <ChevronRight size={12} />
                  <span className="text-gray-800 font-bold">Wishlist Saya</span>
                </div>

                {/* Title and Count */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight">
                      Wishlist Saya
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                      Produk pilihan terbaik yang Anda simpan untuk dibeli nanti.
                    </p>
                  </div>
                  <div className="bg-[#F5F3EE] px-4 py-2 rounded-xl border border-[#C2C9BB]/20 self-start sm:self-auto">
                    <span className="text-xs font-extrabold text-[#154212]">
                      Menampilkan {wishlist.length} Produk
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-2xl overflow-hidden border border-[#C2C9BB]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      
                      {/* Product Image & Badges Overlay */}
                      <div className="relative aspect-video w-full bg-[#F5F3EE] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Tag (e.g. Organic, Premium) */}
                        {item.tag && (
                          <span className={`absolute top-3 left-3 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm ${item.tagColor}`}>
                            {item.tag}
                          </span>
                        )}

                        {/* Remove from wishlist button */}
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="absolute top-3 right-3 p-2 bg-white hover:bg-red-550 rounded-full shadow-md text-red-600 hover:text-white transition-all active:scale-95 group/btn"
                          title="Hapus dari Wishlist"
                        >
                          <Heart size={16} fill="currentColor" className="text-red-600 group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>

                      {/* Info & CTA Area */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        
                        <div className="space-y-2">
                          {/* Rating & Name */}
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-extrabold text-[#1B1C19] text-base leading-snug group-hover:text-[#154212] transition-colors">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg text-xs font-extrabold flex-shrink-0">
                              <Star size={12} fill="currentColor" />
                              <span>{item.rating}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <p className="text-[#154212] font-black text-lg">
                            Rp {item.price.toLocaleString('id-ID')}
                            <span className="text-xs font-bold text-gray-400"> / {item.unit}</span>
                          </p>
                        </div>

                        {/* Add to Cart button */}
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full mt-5 bg-[#154212] hover:bg-[#205421] text-white font-extrabold text-xs py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                        >
                          <ShoppingCart size={14} />
                          PINDAHKAN KE KERANJANG
                        </button>

                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#C2C9BB]/30 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-[#F5F3EE] rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <Heart size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-gray-800 text-base">Wishlist Anda kosong</h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                      Jelajahi produk sehat kami dan tambahkan produk favorit Anda di sini.
                    </p>
                  </div>
                  <Link
                    href="/kategori"
                    className="inline-block bg-[#154212] hover:bg-[#205421] text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-sm"
                  >
                    Mulai Belanja
                  </Link>
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
