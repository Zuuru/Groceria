'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Check, 
  ArrowLeft, 
  Share2,
  MapPin,
  Shield,
  MessageCircle,
  Store,
  ChevronRight,
  Package,
  Truck
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCartStore } from '@/store/cart.store'
import { getProductBySlug, GROCERIA_STORE, ALL_PRODUCTS } from '@/lib/products'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Review data dummy yang realistis
const REVIEWS = [
  {
    name: 'Amanda Rizky',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    comment: '"Gila sih, alpukatnya beneran mentega banget! Datengnya juga masih seger, pas banget buat MPASI anak."',
    reviewImage: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=200&auto=format&fit=crop&q=80',
    date: '3 hari lalu',
    verified: true,
  },
  {
    name: 'Budi Pratama',
    initials: 'BP',
    rating: 5,
    comment: '"Pengiriman cepet banget, packing aman pake bubble wrap tebel. Buahnya dapet yang kualitas ekspor."',
    reviewImages: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604000301190-2e57fa503bb2?w=200&auto=format&fit=crop&q=80',
    ],
    moreImagesCount: 2,
    date: '1 minggu lalu',
    verified: true,
  }
]

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params)
  const addItem = useCartStore((s) => s.addItem)

  // Look up the real product from the catalog
  const product = getProductBySlug(slug)

  // Fallback weight options if product has none
  const defaultWeightOptions = [
    { label: '500g', price: product?.price ?? 0, originalPrice: product?.originalPrice ?? product?.price ?? 0, discount: product?.discount ?? '0%' },
  ]
  const weightOptions = product?.weightOptions ?? defaultWeightOptions

  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0])
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const galleryImages = product?.images ?? [
    'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80'
  ]

  const handleAddToCart = () => {
    if (!product) return
    const variantSuffix = product.weightOptions ? ` (${selectedWeight.label})` : ''
    addItem({
      id: `${product.id}-${selectedWeight.label}`,
      name: `${product.name}${variantSuffix}`,
      price: selectedWeight.price,
      image: galleryImages[0],
    })
    setToastMessage(`${product.name}${variantSuffix} berhasil ditambahkan ke keranjang!`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100)
  }

  const handleChatClick = () => {
    alert('Membuka chat dengan penjual...')
  }

  // Related products (same category, exclude current)
  const relatedProducts = ALL_PRODUCTS
    .filter(p => p.categorySlug === product?.categorySlug && p.id !== product?.id)
    .slice(0, 3)

  // If product not found, show 404-style message
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FCFDFC]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="text-center space-y-4 px-4">
            <div className="text-8xl">🔍</div>
            <h1 className="text-2xl font-extrabold text-[#154212]">Produk Tidak Ditemukan</h1>
            <p className="text-gray-500">Produk dengan slug <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">{slug}</code> tidak ada di katalog kami.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#154212] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#205c1c] transition-all">
              <ArrowLeft size={16} />
              Kembali ke Beranda
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const hasDiscount = !!product.originalPrice && product.originalPrice > selectedWeight.price

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFDFC]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-6">
          <Link href="/" className="hover:text-[#113E21] transition-colors">Beranda</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link href="/kategori" className="hover:text-[#113E21] transition-colors">Katalog</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-[#154212]">{product.name}</span>
        </nav>

        {/* Main Back + Share row */}
        <div className="mb-6 flex items-center justify-between">
          <Link 
            href="/kategori"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#113E21] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Katalog</span>
          </Link>
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors" title="Bagikan">
            <Share2 size={18} />
          </button>
        </div>

        {/* ── Bento Product Detail Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* LEFT: Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-[24px] overflow-hidden bg-[#f7f9f6] border border-gray-100 shadow-md group flex items-center justify-center p-6">
              <Image
                src={galleryImages[activeImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 transition-all duration-500 group-hover:scale-105"
              />
              {product.isOrganic && (
                <div className="absolute top-4 left-4 bg-[#154212] text-white text-[11px] font-extrabold tracking-widest px-4 py-1.5 rounded-full shadow-md">
                  ORGANIC CERTIFIED
                </div>
              )}
              {product.badge && !product.isOrganic && (
                <div className={`absolute top-4 left-4 text-[11px] font-extrabold tracking-widest px-4 py-1.5 rounded-full shadow-md ${product.badgeColor}`}>
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden bg-white border-2 transition-all p-1.5 ${
                      activeImageIndex === idx 
                        ? 'border-[#154212] ring-2 ring-[#BCF0AE]/30 scale-[0.94] shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#f7f9f6]">
                      <Image
                        src={img}
                        alt={`${product.name} foto ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-6 space-y-5 lg:pl-4">
            
            {/* Title */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">{product.category}</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#154212] tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating} ({product.reviewCount} Ulasan)</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm font-semibold text-gray-600">Terjual {product.soldCount}</span>
            </div>

            {/* Price Block */}
            <div className="bg-[#F5F3EE] p-5 rounded-2xl space-y-3 border border-[#EAE8E3]">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-black text-[#154212]">
                  Rp {selectedWeight.price.toLocaleString('id-ID')}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      Rp {selectedWeight.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="bg-[#FFAD4A] text-[#704200] text-xs font-black px-2.5 py-1 rounded-md tracking-wide">
                      DISKON {selectedWeight.discount}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-[#154212] font-semibold">
                <span className="inline-flex items-center justify-center bg-[#BCF0AE] text-[#154212] w-5 h-5 rounded-full">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span>Stok {product.stock}</span>
              </div>
            </div>

            {/* Weight Options */}
            {product.weightOptions && product.weightOptions.length > 1 && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-[#1B1C19] uppercase tracking-wider">Pilih Varian Berat</h3>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedWeight(opt)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${
                        selectedWeight.label === opt.label
                          ? 'bg-[#BCF0AE] border-[#154212] text-[#154212] shadow-sm'
                          : 'bg-transparent border-gray-200 text-[#42493E] hover:border-[#C2C9BB]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#1B1C19] uppercase tracking-wider">Deskripsi Produk</h3>
              <p className="text-sm text-[#42493E] leading-relaxed">{product.description}</p>
            </div>

            {/* Ingredients Slider */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-[#1B1C19] uppercase tracking-wider">Bahan Dalam Paket</h3>
                <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                  {product.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex-shrink-0 w-20 flex flex-col items-center gap-1.5">
                      <div className="w-16 h-16 relative rounded-full overflow-hidden border border-[#EAE8E3] bg-[#F5F3EE]">
                        <Image src={ing.image} alt={ing.name} fill className="object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-center text-[#42493E] leading-tight line-clamp-2">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cooking Steps */}
            {product.cookingSteps && product.cookingSteps.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-[#1B1C19] uppercase tracking-wider">Cara Penyajian / Memasak</h3>
                <div className="space-y-2.5">
                  {product.cookingSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#154212] text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-[#42493E] pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Highlights */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#154212]" />
                <span>Pengiriman Hari Ini</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-[#154212]" />
                <span>Garansi Kesegaran</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Package size={14} className="text-[#154212]" />
                <span>Packing Aman</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-2 bg-[#154212] hover:bg-[#205c1c] text-white font-bold py-3.5 px-6 rounded-full text-sm sm:text-base transition-all active:scale-95 shadow-md shadow-emerald-950/10 cursor-pointer"
                >
                  <ShoppingCart size={18} />
                  <span>Tambah ke Keranjang</span>
                </button>
                <Link
                  href="/chat"
                  className="p-3.5 rounded-full border-2 border-[#154212] hover:bg-gray-50 text-[#154212] transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Hubungi Toko"
                >
                  <MessageCircle size={20} />
                </Link>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3.5 rounded-full border-2 transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
                    isWishlisted 
                      ? 'border-red-400 bg-red-50 text-red-500' 
                      : 'border-[#154212] hover:bg-gray-50 text-[#154212]'
                  }`}
                  title="Tambah ke Wishlist"
                >
                  <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} />
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#885200] hover:bg-[#9e6205] text-white font-black py-3.5 px-6 rounded-full text-sm sm:text-base tracking-wider uppercase transition-all active:scale-95 shadow-md shadow-amber-950/10 cursor-pointer"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* ── Informasi Toko ── */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl border border-[#EAE8E3] p-6">
            <h2 className="text-base font-extrabold text-[#154212] mb-4">Informasi Toko</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Store Avatar */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F5F3EE]">
                <Image
                  src={GROCERIA_STORE.avatar}
                  alt={GROCERIA_STORE.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Store Info */}
              <div className="flex-grow space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-[#1B1C19] text-base">{GROCERIA_STORE.name}</h3>
                  <span className="bg-[#BCF0AE] text-[#154212] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <Shield size={9} strokeWidth={3} />
                    {GROCERIA_STORE.badge}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-[#154212]" />
                    {GROCERIA_STORE.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-amber-400" fill="currentColor" />
                    {GROCERIA_STORE.rating} ({GROCERIA_STORE.reviewCount.toLocaleString('id-ID')} ulasan)
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={11} className="text-[#154212]" />
                    Respon {GROCERIA_STORE.responseRate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Store size={11} className="text-[#154212]" />
                    Bergabung {GROCERIA_STORE.joinYear}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/toko"
                className="flex-shrink-0 border-2 border-[#154212] text-[#154212] font-bold text-xs px-5 py-2.5 rounded-full hover:bg-[#154212] hover:text-white transition-all"
              >
                Kunjungi Toko
              </Link>
            </div>
          </div>
        </section>

        {/* ── Ulasan Pembeli ── */}
        <section className="border-t border-[#C2C9BB]/40 pt-10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#154212]">Ulasan Pembeli</h2>
              <p className="text-sm text-[#42493E]">Apa kata mereka yang sudah merasakan kesegarannya</p>
            </div>
            <button className="text-sm font-bold text-[#154212] hover:underline flex items-center gap-1">
              Lihat Semua <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  {review.avatar ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                      <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#BCF0AE] text-[#154212] font-bold flex items-center justify-center flex-shrink-0">
                      {review.initials}
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#1B1C19] text-sm">{review.name}</h4>
                      {review.verified && (
                        <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full uppercase tracking-wide">✓ Terverifikasi</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill={i < review.rating ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#42493E] italic leading-relaxed">{review.comment}</p>
                
                {/* Single review image */}
                {review.reviewImage && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100">
                    <Image src={review.reviewImage} alt="Review" fill className="object-cover" />
                  </div>
                )}

                {/* Multiple review images */}
                {review.reviewImages && (
                  <div className="flex gap-2">
                    {review.reviewImages.map((img, i) => (
                      <div key={i} className={`relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 ${i === review.reviewImages!.length - 1 && review.moreImagesCount ? 'bg-gray-900/40' : 'bg-[#f7f9f6]'}`}>
                        <Image 
                          src={img} 
                          alt={`Review ${i + 1}`} 
                          fill 
                          className={`object-contain p-1 ${i === review.reviewImages!.length - 1 && review.moreImagesCount ? 'opacity-40' : ''}`} 
                        />
                        {i === review.reviewImages!.length - 1 && review.moreImagesCount && (
                          <span className="absolute inset-0 flex items-center justify-center z-10 text-white font-extrabold text-sm">
                            +{review.moreImagesCount}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Produk Lainnya (Related) ── */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-[#C2C9BB]/40 pt-10 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-[#154212]">Produk Sejenis</h2>
              <Link href="/kategori" className="text-sm font-bold text-[#154212] hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/produk/${related.slug}`}
                  className="bg-white rounded-2xl border border-[#EAE8E3] p-4 hover:shadow-md hover:-translate-y-0.5 transition-all group flex gap-4 items-center"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F5F3EE] flex-shrink-0">
                    <Image
                      src={related.images[0]}
                      alt={related.name}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-[#1B1C19] text-sm line-clamp-2 mb-1 group-hover:text-[#154212] transition-colors">{related.name}</h4>
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={11} fill="currentColor" className="text-amber-400" />
                      <span className="text-xs text-gray-500">{related.rating}</span>
                    </div>
                    <span className="text-sm font-black text-[#154212]">Rp {related.price.toLocaleString('id-ID')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#154212] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-[#BCF0AE]/20">
          <span className="bg-[#BCF0AE] text-[#154212] w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  )
}
