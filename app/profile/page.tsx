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
  Save, 
  ChevronDown,
  Target 
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Account Information')
  const [gender, setGender] = useState('Male')
  
  // Form States
  const [fullName, setFullName] = useState('Budi Santoso')
  const [email, setEmail] = useState('budi.santoso@email.com')
  const [phone, setPhone] = useState('081234567890')
  const [birthDay, setBirthDay] = useState('05')
  const [birthMonth, setBirthMonth] = useState('May')
  const [birthYear, setBirthYear] = useState('1995')

  const sidebarLinks = [
    { name: 'Account Information', href: '/profile', icon: <User size={18} /> },
    { name: 'Order History', href: '/profile/pesanan', icon: <ShoppingBag size={18} /> },
    { name: 'Wishlist', href: '/profile/wishlist', icon: <Heart size={18} /> },
    { name: 'Saved Addresses', href: '/profile/alamat', icon: <MapPin size={18} /> },
    { name: 'Preferences & Goals', href: '/profile/preferensi', icon: <Target size={18} /> },
    { name: 'Groceria Pay', href: '/profile/pay', icon: <Wallet size={18} /> },
  ]

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Profile changes saved successfully!')
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
                      Gold Member
                    </span>
                  </div>
                </div>

                {/* Sidebar Links */}
                <div className="space-y-1 pt-4 border-t border-gray-100">
                  {sidebarLinks.map((link) => {
                    const isActive = link.name === 'Account Information'
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
                      onClick={() => alert('Signing out...')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-[#BA1A1A] hover:bg-red-50 transition-all text-left"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile Form Canvas Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-sm">
                
                {/* Form Header */}
                <div className="border-b border-gray-100 pb-5 mb-6">
                  <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight">
                    Account Information
                  </h1>
                  <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                    Manage your personal information to streamline your shopping experience.
                  </p>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-800 block">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-800 block">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                        placeholder="email@example.com"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-800 block">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-sm text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                        placeholder="e.g. 081234567890"
                        required
                      />
                    </div>

                  </div>

                  {/* Birth Date & Gender Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Birth Date (Custom Dropdowns matching the layout concept) */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-800 block">Date of Birth</label>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Day */}
                        <div className="relative">
                          <select
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                            className="w-full appearance-none bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3 py-3 pr-8 text-sm text-gray-800 font-medium focus:outline-none transition-all cursor-pointer"
                          >
                            {Array.from({ length: 31 }, (_, i) => {
                              const d = (i + 1).toString().padStart(2, '0')
                              return <option key={d} value={d}>{d}</option>
                            })}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Month */}
                        <div className="relative">
                          <select
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                            className="w-full appearance-none bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3 py-3 pr-8 text-sm text-gray-800 font-medium focus:outline-none transition-all cursor-pointer"
                          >
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Year */}
                        <div className="relative">
                          <select
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            className="w-full appearance-none bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-3 py-3 pr-8 text-sm text-gray-800 font-medium focus:outline-none transition-all cursor-pointer"
                          >
                            {Array.from({ length: 80 }, (_, i) => {
                              const y = (2026 - i).toString()
                              return <option key={y} value={y}>{y}</option>
                            })}
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Gender Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-800 block">Gender</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setGender('Male')}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold text-center transition-all ${
                            gender === 'Male'
                              ? 'bg-[#BCF0AE]/30 border-[#154212] text-[#154212]'
                              : 'bg-[#FBF9F4] border-[#C2C9BB] text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('Female')}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold text-center transition-all ${
                            gender === 'Female'
                              ? 'bg-[#BCF0AE]/30 border-[#154212] text-[#154212]'
                              : 'bg-[#FBF9F4] border-[#C2C9BB] text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          Female
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-[#154212] hover:bg-[#205421] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
