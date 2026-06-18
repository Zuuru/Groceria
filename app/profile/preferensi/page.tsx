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
  Target,
  Sparkles,
  Check,
  AlertTriangle,
  Flame,
  Activity,
  Plus,
  X
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface DietOption {
  id: string
  name: string
  description: string
  icon: string
}

interface GoalOption {
  id: string
  name: string
  description: string
  icon: any
}

export default function PreferensiGoalsPage() {
  const sidebarLinks = [
    { name: 'Informasi Akun', href: '/profile', icon: <User size={18} /> },
    { name: 'Riwayat Pesanan', href: '/profile/pesanan', icon: <ShoppingBag size={18} /> },
    { name: 'Wishlist', href: '/profile/wishlist', icon: <Heart size={18} /> },
    { name: 'Daftar Alamat', href: '/profile/alamat', icon: <MapPin size={18} /> },
    { name: 'Preferensi & Goals', href: '/profile/preferensi', icon: <Target size={18} /> },
    { name: 'Groceria Pay', href: '/profile/pay', icon: <Wallet size={18} /> },
  ]

  // Diets list
  const dietOptions: DietOption[] = [
    { id: 'vegan', name: 'Vegan', description: 'Bebas produk hewani sepenuhnya', icon: '🌱' },
    { id: 'vegetarian', name: 'Vegetarian', description: 'Tanpa daging hewan, masih mengonsumsi olahan susu/telur', icon: '🥦' },
    { id: 'keto', name: 'Ketogenik', description: 'Tinggi lemak sehat, rendah karbohidrat', icon: '🥑' },
    { id: 'gluten-free', name: 'Gluten-Free', description: 'Menghindari gandum dan produk mengandung gluten', icon: '🌾' },
    { id: 'low-carb', name: 'Rendah Karbo', description: 'Membatasi asupan karbohidrat harian', icon: '🥚' },
    { id: 'halal', name: 'Halal Certified', description: 'Hanya produk bersertifikat atau berlabel Halal', icon: '🕋' },
    { id: 'organic', name: 'Organik & Alami', description: 'Mengutamakan produk bebas pestisida kimia', icon: '🍎' },
  ]

  // Goals list
  const goalOptions: GoalOption[] = [
    { id: 'weight-loss', name: 'Menurunkan Berat Badan', description: 'Defisit kalori sehat dengan makanan rendah lemak & kaya serat', icon: Flame },
    { id: 'muscle-gain', name: 'Membangun Otot', description: 'Tinggi protein berkualitas untuk mendukung latihan beban', icon: Activity },
    { id: 'better-digestion', name: 'Pencernaan Sehat', description: 'Kaya akan prebiotik, probiotik, dan serat tinggi', icon: Sparkles },
    { id: 'active-lifestyle', name: 'Energi & Stamina', description: 'Karbohidrat kompleks dan vitamin penunjang aktivitas tinggi', icon: Target },
  ]

  // State
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['organic', 'halal'])
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['better-digestion'])
  
  // Allergens State
  const [allergens, setAllergens] = useState<string[]>(['Kacang Tanah', 'Susu Sapi'])
  const [newAllergen, setNewAllergen] = useState('')

  // Nutrient targets
  const [calorieTarget, setCalorieTarget] = useState('2000')
  const [proteinTarget, setProteinTarget] = useState('100')
  const [carbTarget, setCarbTarget] = useState('250')
  const [fatTarget, setFatTarget] = useState('65')

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleDietToggle = (id: string) => {
    setSelectedDiets(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleGoalToggle = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const handleAddAllergen = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAllergen.trim() && !allergens.includes(newAllergen.trim())) {
      setAllergens(prev => [...prev, newAllergen.trim()])
      setNewAllergen('')
    }
  }

  const handleRemoveAllergen = (name: string) => {
    setAllergens(prev => prev.filter(a => a !== name))
  }

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault()
    setToastMessage('Preferensi & Target Nutrisi Anda berhasil disimpan!')
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow">
        {/* Main Content Section */}
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
                    const isActive = link.name === 'Preferensi & Goals'
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

            {/* Main Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-sm relative">
                
                {/* Toast Notification */}
                {toastMessage && (
                  <div className="absolute top-4 right-4 bg-[#D1E8CF] border border-[#2D5A27] text-[#154212] px-4 py-3 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 z-50 animate-fade-in">
                    <Check size={16} />
                    <span>{toastMessage}</span>
                  </div>
                )}

                {/* Form Header */}
                <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight">
                      Preferensi & Goals Kesehatan
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                      Sesuaikan tipe makanan, alergen yang dihindari, dan target harian Anda untuk rekomendasi belanja pintar.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveAll} className="space-y-8">
                  
                  {/* Section 1: Diet Type Preferences */}
                  <div className="space-y-4">
                    <h2 className="text-base font-extrabold text-[#154212] flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#2D5A27] rounded-full inline-block"></span>
                      Preferensi Diet Makanan
                    </h2>
                    <p className="text-xs text-gray-500">
                      Pilih satu atau beberapa jenis gaya makan / diet yang Anda jalani:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {dietOptions.map((diet) => {
                        const isSelected = selectedDiets.includes(diet.id)
                        return (
                          <div
                            key={diet.id}
                            onClick={() => handleDietToggle(diet.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                              isSelected 
                                ? 'border-[#2D5A27] bg-[#F2F7F2]' 
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                            }`}
                          >
                            <span className="text-2xl mt-0.5">{diet.icon}</span>
                            <div className="min-w-0 flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-sm text-gray-900">{diet.name}</span>
                                {isSelected && (
                                  <span className="text-[#2D5A27] bg-[#BCF0AE]/30 p-0.5 rounded-full">
                                    <Check size={14} className="stroke-[3]" />
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1 leading-snug">{diet.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Section 2: Health & Nutritional Goals */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h2 className="text-base font-extrabold text-[#154212] flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#2D5A27] rounded-full inline-block"></span>
                      Goals & Tujuan Kesehatan
                    </h2>
                    <p className="text-xs text-gray-500">
                      Bantu kami menyusun analisis nutrisi harian yang tepat sesuai dengan tujuan Anda:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {goalOptions.map((goal) => {
                        const isSelected = selectedGoals.includes(goal.id)
                        const Icon = goal.icon
                        return (
                          <div
                            key={goal.id}
                            onClick={() => handleGoalToggle(goal.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none ${
                              isSelected 
                                ? 'border-[#2D5A27] bg-[#F2F7F2]' 
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#2D5A27] text-white' : 'bg-gray-100 text-gray-500'}`}>
                              <Icon size={20} />
                            </div>
                            <div className="min-w-0 flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-sm text-gray-900">{goal.name}</span>
                                {isSelected && (
                                  <span className="text-[#2D5A27] bg-[#BCF0AE]/30 p-0.5 rounded-full">
                                    <Check size={14} className="stroke-[3]" />
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1 leading-snug">{goal.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Section 3: Allergies & Avoidances */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h2 className="text-base font-extrabold text-[#154212] flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#2D5A27] rounded-full inline-block"></span>
                      Alergen & Bahan Makanan yang Dihindari
                    </h2>
                    <p className="text-xs text-gray-500">
                      Sistem kami akan memberikan peringatan atau menyembunyikan item belanja yang mengandung bahan makanan berikut:
                    </p>

                    <div className="space-y-3 pt-2">
                      {/* Current Tags */}
                      <div className="flex flex-wrap gap-2">
                        {allergens.map((allergen) => (
                          <span 
                            key={allergen} 
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FFF0F0] text-[#BA1A1A] border border-[#FFDAD9]"
                          >
                            <AlertTriangle size={12} />
                            {allergen}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveAllergen(allergen)}
                              className="hover:text-red-700 focus:outline-none ml-0.5"
                            >
                              <X size={12} className="stroke-[3]" />
                            </button>
                          </span>
                        ))}
                        {allergens.length === 0 && (
                          <span className="text-xs text-gray-400 italic">Tidak ada bahan makanan yang dihindari saat ini.</span>
                        )}
                      </div>

                      {/* Add new tag */}
                      <div className="flex items-center gap-2 max-w-md">
                        <input
                          type="text"
                          value={newAllergen}
                          onChange={(e) => setNewAllergen(e.target.value)}
                          placeholder="Masukkan nama bahan (misal: Telur, Gluten)"
                          className="flex-grow bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-2.5 text-xs text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={handleAddAllergen}
                          className="bg-[#2D5A27] hover:bg-[#1C3B18] text-[#9DD090] p-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 text-xs font-extrabold"
                        >
                          <Plus size={16} />
                          Tambah
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Nutritional Target Limits */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h2 className="text-base font-extrabold text-[#154212] flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#2D5A27] rounded-full inline-block"></span>
                      Target Nutrisi Harian Pribadi
                    </h2>
                    <p className="text-xs text-gray-500">
                      Sesuaikan rentang makro harian Anda. Data ini terintegrasi dengan chatbot AI untuk kalkulasi kecukupan gizi keranjang belanja Anda:
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      {/* Calories */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-gray-700 block">Kalori (kkal)</label>
                        <input
                          type="number"
                          value={calorieTarget}
                          onChange={(e) => setCalorieTarget(e.target.value)}
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-2.5 text-xs text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                          placeholder="2000"
                        />
                      </div>

                      {/* Protein */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-gray-700 block">Protein (gram)</label>
                        <input
                          type="number"
                          value={proteinTarget}
                          onChange={(e) => setProteinTarget(e.target.value)}
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-2.5 text-xs text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                          placeholder="100"
                        />
                      </div>

                      {/* Carbs */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-gray-700 block">Karbohidrat (g)</label>
                        <input
                          type="number"
                          value={carbTarget}
                          onChange={(e) => setCarbTarget(e.target.value)}
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-2.5 text-xs text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                          placeholder="250"
                        />
                      </div>

                      {/* Fat */}
                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-gray-700 block">Lemak (g)</label>
                        <input
                          type="number"
                          value={fatTarget}
                          onChange={(e) => setFatTarget(e.target.value)}
                          className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-2.5 text-xs text-gray-800 font-medium focus:outline-none transition-all shadow-sm"
                          placeholder="65"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#2D5A27] hover:bg-[#1C3B18] text-[#9DD090] px-8 py-3 rounded-xl font-extrabold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Check size={18} className="stroke-[2.5]" />
                      Simpan Perubahan
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
