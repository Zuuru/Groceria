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
  Plus,
  Map,
  Edit2,
  Trash2,
  Check,
  Target
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface Address {
  id: string
  label: string
  recipientName: string
  phone: string
  street: string
  city: string
  province: string
  postalCode: string
  isDefault: boolean
}

export default function AddressListPage() {
  const sidebarLinks = [
    { name: 'Informasi Akun', href: '/profile', icon: <User size={18} /> },
    { name: 'Riwayat Pesanan', href: '/profile/pesanan', icon: <ShoppingBag size={18} /> },
    { name: 'Wishlist', href: '/profile/wishlist', icon: <Heart size={18} /> },
    { name: 'Daftar Alamat', href: '/profile/alamat', icon: <MapPin size={18} /> },
    { name: 'Preferensi & Goals', href: '/profile/preferensi', icon: <Target size={18} /> },
    { name: 'Groceria Pay', href: '/profile/pay', icon: <Wallet size={18} /> },
  ]

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      label: 'Rumah',
      recipientName: 'Budi Santoso',
      phone: '+62 812-3456-7890',
      street: 'Jl. Kemang Raya No. 10, RT.01/RW.02, Bangka, Mampang Prapatan',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Kantor',
      recipientName: 'Budi Santoso (Groceria Corp)',
      phone: '+62 812-3456-7890',
      street: 'Menara Imperium Lt. 22, Jl. H. R. Rasuna Said Kav. 1, Guntur, Setiabudi',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12980',
      isDefault: false
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingAddr, setEditingAddr] = useState<Address | null>(null)

  // Form Fields State
  const [label, setLabel] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')

  const handleSetDefault = (id: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id))
    }
  }

  const openAddForm = () => {
    setEditingAddr(null)
    setLabel('')
    setRecipientName('Budi Santoso')
    setPhone('+62 812-3456-7890')
    setStreet('')
    setCity('')
    setProvince('')
    setPostalCode('')
    setShowForm(true)
  }

  const openEditForm = (addr: Address) => {
    setEditingAddr(addr)
    setLabel(addr.label)
    setRecipientName(addr.recipientName)
    setPhone(addr.phone)
    setStreet(addr.street)
    setCity(addr.city)
    setProvince(addr.province)
    setPostalCode(addr.postalCode)
    setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingAddr) {
      // Update
      setAddresses(prev => 
        prev.map(addr => addr.id === editingAddr.id 
          ? { ...addr, label, recipientName, phone, street, city, province, postalCode } 
          : addr
        )
      )
    } else {
      // Create
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label,
        recipientName,
        phone,
        street,
        city,
        province,
        postalCode,
        isDefault: addresses.length === 0
      }
      setAddresses(prev => [...prev, newAddr])
    }
    
    setShowForm(false)
  }

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
                    const isActive = link.name === 'Daftar Alamat'
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

            {/* Address List Main Area */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Form / Dialog overlay (displayed in-page for a clean SPA feeling) */}
              {showForm ? (
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-md animate-fadeIn">
                  <div className="border-b border-gray-100 pb-4 mb-5">
                    <h2 className="text-lg font-black text-[#154212]">
                      {editingAddr ? 'Ubah Alamat' : 'Tambah Alamat Baru'}
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Label Alamat</label>
                        <input
                          type="text"
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                          placeholder="Contoh: Rumah, Kantor, Kost"
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Nama Penerima</label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Nama lengkap penerima"
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Nomor Telepon</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contoh: +62 812-3456-7890"
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Kode Pos</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="Kode Pos"
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 block">Alamat Lengkap (Jalan, RT/RW, No. Rumah)</label>
                      <textarea
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Tulis alamat lengkap Anda"
                        rows={2}
                        className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Kota/Kabupaten</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Contoh: Jakarta Selatan"
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">Provinsi</label>
                        <input
                          type="text"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          placeholder="Contoh: DKI Jakarta"
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#154212] hover:bg-[#205421] text-white rounded-xl text-xs font-bold"
                      >
                        Simpan Alamat
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-sm space-y-6">
                  
                  {/* Header */}
                  <div className="border-b border-gray-100 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight">
                        Alamat Saya
                      </h1>
                      <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                        Kelola alamat pengiriman belanjaan harian Anda.
                      </p>
                    </div>

                    <button
                      onClick={openAddForm}
                      className="bg-[#154212] hover:bg-[#205421] text-white font-extrabold text-xs px-4 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 self-start sm:self-auto"
                    >
                      <Plus size={14} />
                      Tambah Alamat Baru
                    </button>
                  </div>

                  {/* Addresses Grid */}
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`bg-white rounded-2xl p-5 border shadow-sm transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 relative ${
                          addr.isDefault 
                            ? 'border-[#154212] bg-[#154212]/[0.01]' 
                            : 'border-[#C2C9BB]/30'
                        }`}
                      >
                        {/* Address Detail Info */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-gray-800">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="bg-[#D6E9BE] text-[#3C4C2C] text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full">
                                Utama
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-1 text-xs">
                            <p className="font-extrabold text-gray-700">{addr.recipientName}</p>
                            <p className="text-gray-500 font-semibold">{addr.phone}</p>
                            <p className="text-gray-600 font-semibold leading-relaxed max-w-xl mt-1">
                              {addr.street}, {addr.city}, {addr.province} {addr.postalCode}
                            </p>
                          </div>
                        </div>

                        {/* Actions (Right) */}
                        <div className="flex flex-wrap md:flex-col items-center md:items-end justify-between md:justify-start gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 w-full md:w-auto">
                          
                          {/* Set Default Button */}
                          {!addr.isDefault ? (
                            <button
                              onClick={() => handleSetDefault(addr.id)}
                              className="text-[10px] font-black text-[#154212] border border-[#154212]/30 hover:border-[#154212] hover:bg-[#154212]/5 px-3 py-1.5 rounded-xl transition-all"
                            >
                              Jadikan Utama
                            </button>
                          ) : (
                            <span className="text-[10px] font-black text-emerald-800 flex items-center gap-1">
                              <Check size={12} /> Terpilih Sebagai Utama
                            </span>
                          )}

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openEditForm(addr)}
                              className="p-2 border border-[#C2C9BB] text-gray-500 hover:text-[#154212] hover:border-[#154212] rounded-xl transition-all"
                              title="Ubah Alamat"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(addr.id)}
                              className="p-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Hapus Alamat"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}

                    {addresses.length === 0 && (
                      <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-[#C2C9BB] space-y-3">
                        <Map className="mx-auto text-gray-300" size={40} />
                        <h3 className="font-bold text-gray-600 text-sm">Belum ada alamat tersimpan</h3>
                        <p className="text-xs text-gray-500">Tambahkan alamat baru untuk mempermudah pengiriman produk.</p>
                      </div>
                    )}
                  </div>

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
