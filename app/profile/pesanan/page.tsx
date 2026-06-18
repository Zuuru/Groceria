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
  Truck, 
  RotateCcw,
  Search,
  ExternalLink,
  Target
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function OrderHistoryPage() {
  const sidebarLinks = [
    { name: 'Informasi Akun', href: '/profile', icon: <User size={18} /> },
    { name: 'Riwayat Pesanan', href: '/profile/pesanan', icon: <ShoppingBag size={18} /> },
    { name: 'Wishlist', href: '/profile/wishlist', icon: <Heart size={18} /> },
    { name: 'Daftar Alamat', href: '/profile/alamat', icon: <MapPin size={18} /> },
    { name: 'Preferensi & Goals', href: '/profile/preferensi', icon: <Target size={18} /> },
    { name: 'Groceria Pay', href: '/profile/pay', icon: <Wallet size={18} /> },
  ]

  const orders = [
    {
      id: '#ORD-882910',
      date: '10 Jun 2026',
      status: 'Sedang dikirim',
      statusColor: 'bg-amber-100 text-amber-800',
      borderColor: 'border-l-4 border-l-amber-500',
      info: 'Estimasi tiba: Hari ini, 16:30 - 17:00',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&auto=format&fit=crop&q=80',
      itemsCount: 3,
      itemName: 'Kale Organik Premium + 2 produk lainnya',
      total: 245500,
      action: 'Lacak',
      isDeliver: true
    },
    {
      id: '#ORD-871223',
      date: '12 Mar 2024',
      status: 'Selesai',
      statusColor: 'bg-emerald-100 text-emerald-800',
      borderColor: 'border-l-4 border-l-emerald-500',
      info: 'Tiba pada: 12 Mar 2024, 09:15',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&auto=format&fit=crop&q=80',
      itemsCount: 2,
      itemName: 'Alpukat Mentega Jumbo + 1 produk lainnya',
      total: 128000,
      action: 'Beli Lagi',
      isDeliver: false
    },
    {
      id: '#ORD-861002',
      date: '28 Feb 2024',
      status: 'Selesai',
      statusColor: 'bg-emerald-100 text-emerald-800',
      borderColor: 'border-l-4 border-l-emerald-500',
      info: 'Tiba pada: 28 Feb 2024, 11:40',
      image: 'https://images.unsplash.com/photo-1561131248-c5039074a702?w=120&auto=format&fit=crop&q=80',
      itemsCount: 1,
      itemName: 'Tomat Cherry Merah 500g',
      total: 32000,
      action: 'Beli Lagi',
      isDeliver: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Profile Content Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    const isActive = link.name === 'Riwayat Pesanan'
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

            {/* Order History Main Area */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-sm">
                
                {/* Form Header */}
                <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight">
                      Riwayat Pesanan
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                      Lacak pengiriman dan lihat semua riwayat transaksi belanja sehat Anda.
                    </p>
                  </div>

                  {/* Order Search bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari ID pesanan..."
                      className="bg-[#F5F3EE] border border-[#C2C9BB]/30 rounded-xl py-2 px-4 pl-9 text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#154212]"
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className={`bg-white rounded-2xl p-5 border border-[#C2C9BB]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden relative ${order.borderColor}`}
                    >
                      {/* Left: Product & General Details */}
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-16 h-16 bg-[#F5F3EE] rounded-xl overflow-hidden flex-shrink-0 border border-[#C2C9BB]/20">
                          <Image
                            src={order.image}
                            alt="Order item"
                            fill
                            className="object-cover p-1"
                          />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-sm text-[#1B1C19]">{order.id}</span>
                            <span className="text-[10px] text-gray-400 font-bold">{order.date}</span>
                            <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-gray-700 truncate max-w-[280px]">
                            {order.itemName}
                          </h4>
                          <p className="text-xs text-gray-500 font-semibold">{order.info}</p>
                        </div>
                      </div>

                      {/* Right: Tagihan & Action Buttons */}
                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                        <div className="text-left md:text-right">
                          <span className="text-[10px] font-bold text-gray-400 block">Total Tagihan</span>
                          <span className="text-base font-black text-[#154212]">
                            Rp {order.total.toLocaleString('id-ID')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert(`Membuka rincian pesanan ${order.id}`)}
                            className="p-2 border border-[#C2C9BB] text-gray-500 hover:text-gray-700 rounded-xl transition-all"
                            title="Rincian Pesanan"
                          >
                            <ExternalLink size={16} />
                          </button>

                          {order.isDeliver ? (
                            <button className="bg-[#154212] hover:bg-[#205421] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm">
                              <Truck size={14} />
                              {order.action}
                            </button>
                          ) : (
                            <button className="bg-white border border-[#154212] hover:bg-[#154212]/5 text-[#154212] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all">
                              <RotateCcw size={14} />
                              {order.action}
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
