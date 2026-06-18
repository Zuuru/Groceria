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
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  ChevronDown,
  Gift,
  Building,
  Check,
  Plus,
  Send,
  X,
  CreditCard
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface Transaction {
  id: string
  title: string
  date: string
  amount: number
  type: 'in' | 'out'
  status: 'Berhasil' | 'Diproses' | 'Gagal'
}

export default function GroceriaPayPage() {
  const sidebarLinks = [
    { name: 'Informasi Akun', href: '/profile', icon: <User size={18} /> },
    { name: 'Riwayat Pesanan', href: '/profile/pesanan', icon: <ShoppingBag size={18} /> },
    { name: 'Wishlist', href: '/profile/wishlist', icon: <Heart size={18} /> },
    { name: 'Daftar Alamat', href: '/profile/alamat', icon: <MapPin size={18} /> },
    { name: 'Preferensi & Goals', href: '/profile/preferensi', icon: <Target size={18} /> },
    { name: 'Groceria Pay', href: '/profile/pay', icon: <Wallet size={18} /> },
  ]

  // Balance & Transactions State
  const [balance, setBalance] = useState(1250000)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'GRO-12345',
      title: 'Pembayaran Pesanan #GRO-12345',
      date: '24 Okt 2023 • 14:30',
      amount: 245000,
      type: 'out',
      status: 'Berhasil'
    },
    {
      id: 'TOP-BCA',
      title: 'Top Up via BCA',
      date: '22 Okt 2023 • 09:15',
      amount: 500000,
      type: 'in',
      status: 'Berhasil'
    },
    {
      id: 'GRO-12111',
      title: 'Pembayaran Pesanan #GRO-12111',
      date: '20 Okt 2023 • 18:20',
      amount: 85500,
      type: 'out',
      status: 'Berhasil'
    },
    {
      id: 'TRF-BUDI',
      title: 'Transfer ke Budi Raharjo',
      date: '18 Okt 2023 • 10:05',
      amount: 150000,
      type: 'out',
      status: 'Berhasil'
    }
  ])

  // Modals & Forms State
  const [showTopUpModal, setShowTopUpModal] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [topUpBank, setTopUpBank] = useState('BCA')
  const [transferRecipient, setTransferRecipient] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Filter State
  const [filterMonth, setFilterMonth] = useState('Bulan Ini')

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(topUpAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Masukkan jumlah top up yang valid!')
      return
    }

    setBalance(prev => prev + amount)
    
    const newTx: Transaction = {
      id: `TOP-${Date.now().toString().slice(-6)}`,
      title: `Top Up via ${topUpBank}`,
      date: 'Baru saja',
      amount: amount,
      type: 'in',
      status: 'Berhasil'
    }

    setTransactions(prev => [newTx, ...prev])
    setShowTopUpModal(false)
    setTopUpAmount('')
    
    setToastMessage(`Top Up sebesar Rp ${amount.toLocaleString('id-ID')} Berhasil!`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = parseFloat(transferAmount)
    if (!transferRecipient.trim()) {
      alert('Masukkan nama penerima!')
      return
    }
    if (isNaN(amount) || amount <= 0) {
      alert('Masukkan jumlah transfer yang valid!')
      return
    }
    if (amount > balance) {
      alert('Saldo tidak mencukupi!')
      return
    }

    setBalance(prev => prev - amount)

    const newTx: Transaction = {
      id: `TRF-${Date.now().toString().slice(-6)}`,
      title: `Transfer ke ${transferRecipient}`,
      date: 'Baru saja',
      amount: amount,
      type: 'out',
      status: 'Berhasil'
    }

    setTransactions(prev => [newTx, ...prev])
    setShowTransferModal(false)
    setTransferRecipient('')
    setTransferAmount('')

    setToastMessage(`Transfer sebesar Rp ${amount.toLocaleString('id-ID')} Berhasil!`)
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
                    const isActive = link.name === 'Groceria Pay'
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
            <div className="lg:col-span-3 space-y-6">
              
              {/* Toast Notification */}
              {toastMessage && (
                <div className="fixed top-24 right-8 bg-[#D1E8CF] border border-[#2D5A27] text-[#154212] px-4 py-3 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 z-50 animate-fade-in">
                  <Check size={16} />
                  <span>{toastMessage}</span>
                </div>
              )}

              {/* Title Section */}
              <div className="bg-white rounded-2xl p-6 border border-[#C2C9BB]/30 shadow-sm">
                <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight">
                  Groceria Pay
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                  Kelola saldo dan transaksi keuangan Anda dengan mudah.
                </p>
              </div>

              {/* Balance & Actions Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Balance Card Section */}
                <div className="md:col-span-2 bg-[#2D5A27] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden border border-[#1C3B18] shadow-md flex flex-col justify-between min-h-[200px]">
                  {/* Decorative Elements */}
                  <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#BCF0AE]/10 rounded-full blur-2xl"></div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#9DD090]">
                        Total Saldo
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                        Rp {balance.toLocaleString('id-ID')}
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="bg-[#BCF0AE]/20 px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-[#BCF0AE]">
                        GP
                      </span>
                      <span className="text-xs font-bold text-[#9DD090]">
                        VISA
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-end">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowTopUpModal(true)}
                        className="bg-[#BCF0AE] hover:bg-[#a1e591] text-[#154212] px-6 py-2.5 rounded-full text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Plus size={16} />
                        Top Up
                      </button>
                      
                      <button 
                        onClick={() => setShowTransferModal(true)}
                        className="bg-transparent hover:bg-white/10 border-2 border-[#BCF0AE] text-[#BCF0AE] px-6 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5"
                      >
                        <Send size={14} />
                        Transfer
                      </button>
                    </div>
                    
                    <span className="text-xs font-medium opacity-80 tracking-widest font-mono">
                      **** 4432
                    </span>
                  </div>
                </div>

                {/* Quick Shortcuts Section */}
                <div className="bg-white rounded-3xl p-6 border border-[#C2C9BB]/30 shadow-sm flex flex-col justify-between">
                  <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider block mb-4">
                    Akses Cepat
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4 flex-grow">
                    <div className="bg-[#FBF9F4] hover:bg-[#F2F7F2] p-4 rounded-2xl border border-gray-100 flex flex-col justify-between cursor-pointer transition-all hover:border-[#2D5A27]">
                      <div className="w-9 h-9 rounded-xl bg-[#BCF0AE]/30 flex items-center justify-center text-[#2D5A27]">
                        <ShoppingBag size={18} />
                      </div>
                      <span className="text-xs font-extrabold text-[#154212] mt-2">History</span>
                    </div>

                    <div className="bg-[#FBF9F4] hover:bg-[#FFF8F0] p-4 rounded-2xl border border-gray-100 flex flex-col justify-between cursor-pointer transition-all hover:border-amber-400">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                        <Wallet size={18} />
                      </div>
                      <span className="text-xs font-extrabold text-amber-900 mt-2">Pay</span>
                    </div>

                    <div className="bg-[#FBF9F4] hover:bg-emerald-50 p-4 rounded-2xl border border-gray-100 flex flex-col justify-between cursor-pointer transition-all hover:border-emerald-500">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <Gift size={18} />
                      </div>
                      <span className="text-xs font-extrabold text-emerald-950 mt-2">Vouchers</span>
                    </div>

                    <div className="bg-[#FBF9F4] hover:bg-slate-100 p-4 rounded-2xl border border-gray-100 flex flex-col justify-between cursor-pointer transition-all hover:border-slate-500">
                      <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700">
                        <Building size={18} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 mt-2">Bank</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Transactions & Promo Split Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Transaction History Section */}
                <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-[#C2C9BB]/30 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="font-extrabold text-[#154212] text-sm md:text-base">
                      Riwayat Transaksi
                    </h3>
                    
                    <div className="flex items-center gap-1 bg-[#FBF9F4] border border-[#C2C9BB]/50 px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 cursor-pointer hover:bg-gray-100">
                      <Calendar size={14} />
                      <span>{filterMonth}</span>
                      <ChevronDown size={12} />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="py-4 flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'in' ? 'bg-[#D1E8CF] text-[#2D5A27]' : 'bg-[#FFF0F0] text-[#BA1A1A]'
                          }`}>
                            {tx.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-gray-900 truncate">{tx.title}</h4>
                            <span className="text-xs text-gray-500 block mt-0.5">{tx.date}</span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className={`font-extrabold text-sm block ${
                            tx.type === 'in' ? 'text-[#2D5A27]' : 'text-[#BA1A1A]'
                          }`}>
                            {tx.type === 'in' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                          </span>
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D1E8CF] text-[#2D5A27]">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full text-center py-2.5 text-xs font-extrabold text-[#2D5A27] hover:text-[#1C3B18] transition-all bg-[#F2F7F2] rounded-xl hover:bg-[#e4efe4]">
                    Lihat Semua Transaksi
                  </button>
                </div>

                {/* Promo Card Section */}
                <div className="bg-white rounded-3xl p-6 border border-[#C2C9BB]/30 shadow-sm flex flex-col justify-between gap-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-[#154212] text-sm md:text-base">
                      Promo Eksklusif
                    </h3>
                    <button className="text-xs font-extrabold text-[#2D5A27] hover:underline">
                      Lihat Semua
                    </button>
                  </div>

                  {/* Promo Graphic Banner */}
                  <div className="bg-[#D6E9BE] rounded-2xl p-5 relative overflow-hidden flex-grow flex flex-col justify-between min-h-[200px] border border-[#BCF0AE]">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    
                    <div className="bg-[#2D5A27] text-[#BCF0AE] text-[9px] font-black px-2 py-0.5 rounded self-start tracking-wider">
                      ORGANIC DEAL
                    </div>

                    <div className="space-y-1 mt-4">
                      <h4 className="text-lg font-black text-[#154212] leading-tight">
                        5% Cashback for<br />Organic Vegetables
                      </h4>
                      <p className="text-[10px] text-[#3C4C2C] font-bold">
                        Gunakan Groceria Pay hari ini!
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-700">S&K Berlaku</span>
                      <button className="bg-[#2D5A27] text-white p-1.5 rounded-full hover:bg-[#1C3B18] transition-all">
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 border border-[#C2C9BB] shadow-xl relative animate-scale-up">
            <button 
              onClick={() => setShowTopUpModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black text-[#154212] mb-2 flex items-center gap-2">
              <Wallet className="text-[#2D5A27]" />
              Top Up Saldo
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-medium">
              Silakan masukkan nominal pengisian saldo dan pilih bank tujuan transfer.
            </p>

            <form onSubmit={handleTopUpSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Metode Pembayaran</label>
                <select 
                  value={topUpBank}
                  onChange={(e) => setTopUpBank(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-xs text-gray-800 font-bold focus:outline-none transition-all shadow-sm"
                >
                  <option value="BCA">BCA Virtual Account</option>
                  <option value="Mandiri">Mandiri Virtual Account</option>
                  <option value="BNI">BNI Virtual Account</option>
                  <option value="BRI">BRI Virtual Account</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Jumlah Top Up (Rp)</label>
                <input 
                  type="number"
                  required
                  placeholder="Minimal Rp 10.000"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-sm text-gray-800 font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>

              {/* Quick Select Amounts */}
              <div className="grid grid-cols-3 gap-2">
                {['50000', '100000', '200000'].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setTopUpAmount(amt)}
                    className="py-2 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#2D5A27] text-[10px] font-bold text-gray-700 transition-all hover:text-[#2D5A27]"
                  >
                    Rp {parseInt(amt).toLocaleString('id-ID')}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D5A27] hover:bg-[#1C3B18] text-[#9DD090] py-3 rounded-xl font-extrabold text-xs transition-all shadow-md mt-6 flex items-center justify-center gap-1.5"
              >
                <Check size={16} />
                Lanjutkan Pembayaran
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 border border-[#C2C9BB] shadow-xl relative animate-scale-up">
            <button 
              onClick={() => setShowTransferModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-black text-[#154212] mb-2 flex items-center gap-2">
              <Send className="text-[#2D5A27]" />
              Transfer Saldo
            </h3>
            <p className="text-xs text-gray-500 mb-6 font-medium">
              Kirim saldo ke member Groceria lain secara instan dan bebas biaya admin.
            </p>

            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Nama Penerima / Username</label>
                <input 
                  type="text"
                  required
                  placeholder="Masukkan nama penerima"
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-xs text-gray-800 font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">Jumlah Transfer (Rp)</label>
                <input 
                  type="number"
                  required
                  placeholder="Jumlah transfer"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full bg-[#FBF9F4] border border-[#C2C9BB] focus:border-[#154212] rounded-xl px-4 py-3 text-sm text-gray-800 font-bold focus:outline-none transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D5A27] hover:bg-[#1C3B18] text-[#9DD090] py-3 rounded-xl font-extrabold text-xs transition-all shadow-md mt-6 flex items-center justify-center gap-1.5"
              >
                <Check size={16} />
                Konfirmasi Transfer
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
