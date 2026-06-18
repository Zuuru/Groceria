'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Search, 
  Navigation, 
  Store, 
  Clock, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  Heart,
  Star,
  Map as MapIcon
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

// Nearby stores mock data
const NEARBY_STORES = [
  {
    id: 1,
    name: 'Groceria Hub - Sunset Road',
    address: 'Sunset Road No. 88, Kuta, Badung, Bali',
    distance: '1.2 km',
    deliveryTime: '15-20 min',
    rating: 4.9,
    reviews: 1240,
    isOpen: true,
    lat: 45,
    lng: 55,
    tag: 'Terdekat'
  },
  {
    id: 2,
    name: 'Groceria Hub - Denpasar Timur',
    address: 'Jl. Gatot Subroto No. 42, Denpasar Timur',
    distance: '3.5 km',
    deliveryTime: '25-30 min',
    rating: 4.8,
    reviews: 890,
    isOpen: true,
    lat: 30,
    lng: 70,
    tag: 'Stok Terlengkap'
  },
  {
    id: 3,
    name: 'Groceria Express - Jimbaran',
    address: 'Jl. Raya Uluwatu No. 101, Jimbaran, Badung',
    distance: '7.8 km',
    deliveryTime: '40-45 min',
    rating: 4.7,
    reviews: 420,
    isOpen: false,
    lat: 70,
    lng: 25,
    tag: 'Buka Besok'
  }
]

// Sample addresses mock data
const SAVED_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Rumah (Amanda Rizky)',
    address: 'Sunset Road No. 88, Kuta, Badung, Bali - 80361',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Kantor (Design Studio)',
    address: 'Jl. Merdeka No. 12, Denpasar Barat, Bali - 80111',
    isDefault: false
  }
]

export default function LocationPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStore, setSelectedStore] = useState(NEARBY_STORES[0])
  const [activeAddress, setActiveAddress] = useState(SAVED_ADDRESSES[0])
  const [isLocating, setIsLocating] = useState(false)
  const [customPin, setCustomPin] = useState({ lat: 40, lng: 45 })
  const [notification, setNotification] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUseCurrentLocation = () => {
    setIsLocating(true)
    setTimeout(() => {
      setIsLocating(false)
      setCustomPin({ lat: 38, lng: 42 })
      setNotification('Lokasi GPS Anda berhasil ditentukan!')
      setTimeout(() => setNotification(''), 3000)
    }, 1500)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#154212]"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">
              <Link href="/" className="hover:text-[#113E21] transition-colors">Home</Link>
              <ChevronRight size={12} className="text-gray-300" />
              <span className="text-[#154212]">Lokasi & Toko</span>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 bg-white rounded-full border border-[#C2C9BB]/30 hover:bg-[#F5F3EE] transition-colors text-[#154212]">
                <ArrowLeft size={16} />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-[#154212] tracking-tight">Pilih Lokasi & Toko</h1>
            </div>
          </div>
          
          {/* Active location summary badge */}
          <div className="bg-[#154212] text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-md w-fit">
            <div className="bg-[#f4b844] text-[#154212] p-1.5 rounded-lg">
              <MapPin size={18} />
            </div>
            <div className="text-xs">
              <span className="text-gray-300 font-medium block">Mengirim ke:</span>
              <span className="font-extrabold truncate max-w-[180px] block">{activeAddress.label}</span>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-2 text-xs font-bold shadow-sm"
            >
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Map & Address selectors */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Custom SVG/CSS Map Mockup */}
            <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-4 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-2">
                  <MapIcon size={18} className="text-[#154212]" />
                  <span className="font-black text-sm text-[#154212] uppercase tracking-wider">Peta Cakupan Layanan</span>
                </div>
                <span className="bg-[#BCF0AE]/30 text-[#154212] font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                  Live Radar
                </span>
              </div>

              {/* Map Canvas Visual */}
              <div className="h-80 w-full rounded-2xl bg-[#E8EFE5] relative overflow-hidden border border-[#C2C9BB]/20 select-none">
                
                {/* Simulated Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#C2C9BB_1px,transparent_1px),linear-gradient(to_bottom,#C2C9BB_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25]"></div>
                
                {/* Map graphics - Streets (SVG roads) */}
                <svg className="absolute inset-0 w-full h-full text-[#BAC6B5]" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
                  <path d="M -50 150 Q 200 120 400 200 T 900 180" />
                  <path d="M 100 -50 L 120 400" strokeWidth="8" />
                  <path d="M 320 -50 Q 280 200 400 450" />
                  <path d="M -50 280 L 850 280" />
                </svg>

                <svg className="absolute inset-0 w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4">
                  <path d="M -50 150 Q 200 120 400 200 T 900 180" />
                  <path d="M 100 -50 L 120 400" />
                </svg>

                {/* User Current Delivery pinpoint */}
                <motion.div 
                  className="absolute cursor-pointer z-10"
                  style={{ left: `${customPin.lng}%`, top: `${customPin.lat}%` }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-30 animate-ping"></span>
                    <div className="bg-red-500 text-white p-2 rounded-full shadow-lg border-2 border-white relative z-10">
                      <MapPin size={18} />
                    </div>
                  </div>
                  <div className="absolute top-11 left-1/2 -translate-x-1/2 bg-[#1B1C19] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                    Lokasi Anda
                  </div>
                </motion.div>

                {/* Store Pinpoints */}
                {NEARBY_STORES.map((store) => (
                  <motion.div
                    key={store.id}
                    className="absolute cursor-pointer z-10"
                    style={{ left: `${store.lng}%`, top: `${store.lat}%` }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedStore(store)}
                  >
                    <div className={`p-2 rounded-full border-2 shadow-md ${
                      selectedStore.id === store.id 
                        ? 'bg-[#154212] text-[#f4b844] border-[#f4b844]' 
                        : 'bg-white text-[#154212] border-white'
                    }`}>
                      <Store size={16} />
                    </div>
                    {selectedStore.id === store.id && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#154212] text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow border border-[#f4b844] whitespace-nowrap">
                        {store.name.split(' - ')[1] || store.name}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Accuracy Info / Button */}
                <button 
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-[#154212] border border-[#C2C9BB]/40 px-3.5 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:bg-gray-100"
                >
                  <Navigation size={14} className={isLocating ? "animate-spin" : ""} />
                  <span>{isLocating ? 'Mencari GPS...' : 'GPS Saat Ini'}</span>
                </button>
              </div>
            </div>

            {/* Address List Selection */}
            <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-[#154212]">Alamat Pengiriman Saya</h2>
              
              <div className="grid grid-cols-1 gap-3">
                {SAVED_ADDRESSES.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setActiveAddress(addr)}
                    className={`text-left p-4 rounded-2xl border-2 transition-all flex justify-between items-start ${
                      activeAddress.id === addr.id
                        ? 'border-[#154212] bg-[#BCF0AE]/10'
                        : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2.5 rounded-xl mt-0.5 ${
                        activeAddress.id === addr.id ? 'bg-[#154212] text-white' : 'bg-gray-200/70 text-gray-500'
                      }`}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-[#1B1C19]">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="bg-[#154212] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                              Utama
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{addr.address}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Search Bar Input */}
              <div className="relative pt-2">
                <input
                  type="text"
                  placeholder="Cari lokasi atau alamat lain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F5F3EE] border border-gray-200 focus:border-[#154212] rounded-full pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none transition-colors"
                />
                <Search size={16} className="absolute left-4 top-5.5 text-gray-400" />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Store list and details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Store List */}
            <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="text-lg font-black text-[#154212]">Toko Terdekat</h2>
                <span className="text-xs font-bold text-gray-400">{NEARBY_STORES.length} Toko ditemukan</span>
              </div>

              <div className="space-y-3">
                {NEARBY_STORES.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 relative ${
                      selectedStore.id === store.id
                        ? 'border-[#154212] bg-[#BCF0AE]/10 shadow-sm'
                        : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'
                    }`}
                  >
                    {/* Badge Tag */}
                    <span className={`absolute top-4 right-4 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      store.isOpen 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {store.tag}
                    </span>

                    <div className="flex gap-3">
                      <div className={`p-2.5 rounded-xl ${
                        selectedStore.id === store.id ? 'bg-[#154212] text-[#f4b844]' : 'bg-gray-200/70 text-gray-500'
                      }`}>
                        <Store size={18} />
                      </div>
                      <div className="space-y-0.5 max-w-[70%]">
                        <h3 className="font-extrabold text-sm text-[#1B1C19] truncate">{store.name}</h3>
                        <p className="text-[11px] text-gray-500 truncate">{store.address}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 border-t border-gray-100/60 pt-2.5 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-[#154212]" />
                        <span>{store.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-[#154212]" />
                        <span>{store.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span className="text-gray-800">{store.rating}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Store Detailed Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStore.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[#154212] text-white rounded-3xl p-6 shadow-md space-y-6 relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <Store size={220} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#f4b844] text-[#154212] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Toko Aktif
                    </span>
                  </div>
                  <h3 className="text-xl font-black">{selectedStore.name}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">{selectedStore.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Metode Pengiriman</span>
                    <p className="text-xs font-extrabold">Instant & Sameday</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jam Operasional</span>
                    <p className="text-xs font-extrabold">{selectedStore.isOpen ? 'Buka · Tutup 21:00' : 'Tutup · Buka Besok 07:00'}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/kategori"
                    className="block w-full bg-[#f4b844] hover:bg-amber-500 text-[#154212] font-extrabold py-3.5 px-6 rounded-full text-xs sm:text-sm tracking-wider uppercase text-center transition-all active:scale-95 shadow-md shadow-amber-500/10"
                  >
                    Belanja dari Toko Ini
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}
