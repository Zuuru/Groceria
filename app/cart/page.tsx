'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  Truck, 
  CreditCard, 
  Tag, 
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCartStore } from '@/store/cart.store'

export default function CartCheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore()
  
  // State for checkout options
  const [selectedCourier, setSelectedCourier] = useState<'sameday' | 'instant' | 'regular'>('sameday')
  const [selectedPayment, setSelectedPayment] = useState<'gopay' | 'ovo' | 'transfer' | 'cod'>('gopay')
  const [voucherCode, setVoucherCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [voucherError, setVoucherError] = useState('')
  const [voucherSuccess, setVoucherSuccess] = useState('')
  
  // Order flow states
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  // Cost calculation helper
  const courierCost = {
    sameday: 15000,
    instant: 25000,
    regular: 9000
  }

  const subtotal = totalPrice()
  const shippingFee = items.length > 0 ? courierCost[selectedCourier] : 0
  const finalTotal = subtotal + shippingFee - appliedDiscount

  const handleApplyVoucher = () => {
    setVoucherError('')
    setVoucherSuccess('')
    if (voucherCode.toUpperCase() === 'GROCERIASEGAR') {
      const discount = Math.round(subtotal * 0.1) // 10% discount
      setAppliedDiscount(discount)
      setVoucherSuccess('Voucher applied successfully! 10% discount applied.')
    } else if (!voucherCode) {
      setVoucherError('Please enter a voucher code first.')
    } else {
      setVoucherError('Invalid voucher code.')
    }
  }

  const handleProcessCheckout = () => {
    if (items.length === 0) return
    setIsProcessing(true)
    
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
      clearCart()
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FBF9F4] flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow max-w-xl mx-auto w-full px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-8 sm:p-12 shadow-sm space-y-6">
            <div className="w-20 h-20 bg-[#BCF0AE] text-[#154212] rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#154212]">Order Placed Successfully!</h1>
              <p className="text-sm text-[#42493E] leading-relaxed">
                Thank you for your purchase. Your order is being processed and our courier will deliver your fresh groceries shortly.
              </p>
            </div>
            <div className="bg-[#F5F3EE] rounded-2xl p-4 text-left border border-gray-100 text-xs sm:text-sm text-[#42493E] space-y-2">
              <div className="flex justify-between font-bold text-[#1B1C19]">
                <span>Payment Method:</span>
                <span className="uppercase">{selectedPayment}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1B1C19]">
                <span>Delivery:</span>
                <span className="capitalize">{selectedCourier} Delivery</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-2 font-black text-[#154212]">
                <span>Total Payment:</span>
                <span>Rp {finalTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <Link 
              href="/" 
              className="block w-full bg-[#154212] hover:bg-[#205c1c] text-white font-bold py-3.5 px-6 rounded-full text-sm transition-all active:scale-95 text-center shadow-md shadow-emerald-950/10"
            >
              Back to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-6">
          <Link href="/" className="hover:text-[#113E21] transition-colors">Home</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-[#154212]">Cart & Checkout</span>
        </nav>

        <h1 className="text-3xl font-black text-[#154212] tracking-tight mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-12 text-center max-w-md mx-auto space-y-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-[#1B1C19]">Your Cart is Empty</h2>
              <p className="text-sm text-gray-500">Choose from our organic fresh produce to start your healthy lifestyle.</p>
            </div>
            <Link 
              href="/kategori" 
              className="inline-flex items-center gap-2 bg-[#154212] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#205c1c] transition-all"
            >
              <ArrowLeft size={16} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Cart Items list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-black text-[#154212] border-b border-gray-100 pb-3">Product List ({items.length})</h2>
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 items-center">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 bg-[#F5F3EE] rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      
                      {/* Product details */}
                      <div className="flex-grow min-w-0">
                        <h3 className="font-extrabold text-[#1B1C19] text-sm sm:text-base truncate">{item.name}</h3>
                        <span className="text-xs text-gray-400 font-bold block mb-1">Portion / Variety</span>
                        <span className="text-sm font-black text-[#154212]">Rp {item.price.toLocaleString('id-ID')}</span>
                      </div>
                      
                      {/* Quantity Controller & Delete */}
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex items-center bg-[#F5F3EE] rounded-full border border-gray-200">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-gray-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors text-gray-600"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address Box */}
              <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-black text-[#154212]">Shipping Address</h2>
                  <button className="text-xs font-bold text-[#154212] hover:underline">Change Address</button>
                </div>
                <div className="border border-[#C2C9BB]/40 rounded-2xl p-4 bg-[#F5F3EE] flex gap-3 items-start">
                  <MapPin className="text-[#154212] mt-0.5 flex-shrink-0" size={18} />
                  <div className="space-y-1">
                    <span className="font-extrabold text-[#1B1C19] text-sm">Home - Amanda Rizky</span>
                    <p className="text-xs text-gray-500">+62 812-3456-7890</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Sunset Road No. 88, Kuta, Badung, Bali - 80361 (Next to Minimarket, Across from Petrol Station)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Checkout details & payment summary */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Courier Delivery method selection */}
              <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-black text-[#154212]">Select Delivery Method</h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'sameday', label: 'Sameday Delivery', desc: 'Arrives in 6-8 hours', price: 15000 },
                    { id: 'instant', label: 'Instant Delivery', desc: 'Arrives in 1-2 hours', price: 25000 },
                    { id: 'regular', label: 'Regular Courier', desc: 'Arrives tomorrow morning', price: 9000 }
                  ].map((courier) => (
                    <button
                      key={courier.id}
                      onClick={() => setSelectedCourier(courier.id as any)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all flex justify-between items-center ${
                        selectedCourier === courier.id 
                          ? 'border-[#154212] bg-[#BCF0AE]/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${
                          selectedCourier === courier.id ? 'bg-[#154212] text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <Truck size={18} />
                        </div>
                        <div>
                          <span className="font-extrabold text-xs sm:text-sm text-[#1B1C19] block">{courier.label}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">{courier.desc}</span>
                        </div>
                      </div>
                      <span className="font-black text-xs sm:text-sm text-[#154212]">
                        Rp {courier.price.toLocaleString('id-ID')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment selection */}
              <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-black text-[#154212]">Select Payment Method</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'gopay', name: 'GoPay', logo: 'GoPay' },
                    { id: 'ovo', name: 'OVO', logo: 'OVO' },
                    { id: 'transfer', name: 'Bank Transfer', logo: 'Bank Transfer' },
                    { id: 'cod', name: 'Cash on Delivery', logo: 'COD' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id as any)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 h-20 ${
                        selectedPayment === method.id 
                          ? 'border-[#154212] bg-[#BCF0AE]/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-extrabold text-xs text-[#1B1C19]">{method.logo}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voucher section */}
              <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-3">
                <h2 className="text-sm font-black text-[#154212] uppercase tracking-wider">Apply Voucher</h2>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Enter code (e.g. GROCERIASEGAR)"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full bg-[#F5F3EE] border border-gray-200 focus:border-[#154212] rounded-full pl-9 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-colors"
                    />
                    <Tag size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                  </div>
                  <button 
                    onClick={handleApplyVoucher}
                    className="bg-[#154212] hover:bg-[#205c1c] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors active:scale-95"
                  >
                    Apply
                  </button>
                </div>
                {voucherError && <p className="text-red-500 text-[10px] font-bold px-1">{voucherError}</p>}
                {voucherSuccess && <p className="text-emerald-700 text-[10px] font-bold px-1">{voucherSuccess}</p>}
              </div>

              {/* Order Summary & Pay */}
              <div className="bg-white rounded-3xl border border-[#C2C9BB]/30 p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-black text-[#154212] border-b border-gray-100 pb-3">Payment Summary</h2>
                <div className="space-y-2.5 text-xs sm:text-sm font-semibold text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-[#1B1C19]">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee ({selectedCourier})</span>
                    <span className="text-[#1B1C19]">Rp {shippingFee.toLocaleString('id-ID')}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Voucher Discount</span>
                      <span>- Rp {appliedDiscount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-100 pt-3 text-sm sm:text-base font-black text-[#154212]">
                    <span>Total Payment</span>
                    <span>Rp {finalTotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleProcessCheckout}
                    disabled={isProcessing}
                    className="w-full bg-[#154212] hover:bg-[#205c1c] disabled:bg-gray-300 text-white font-black py-4 px-6 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all active:scale-95 shadow-md shadow-emerald-950/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Pay Now (Rp {finalTotal.toLocaleString('id-ID')})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
