'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'

interface SlideItem {
  id: number
  productId: string
  slug: string
  src: string
  alt: string
  tag: string
  tagColor: string
  title: string
  description: string
  price: string
  numericPrice: number
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    productId: 'prod-bundling-anak-kos',
    slug: 'paket-hemat-anak-kos',
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Hemat Anak Kos',
    tag: 'HEMAT',
    tagColor: 'bg-yellow-500',
    title: 'Paket Hemat Anak Kos',
    description: 'Solusi makan sehat dan kenyang untuk anak kos dengan harga terjangkau. Tersedia pilihan lauk beragam, nasi, dan sayur segar untuk 5 hari penuh.',
    price: 'Rp 35.000',
    numericPrice: 35000,
  },
  {
    id: 2,
    productId: 'prod-bundling-bulking',
    slug: 'paket-bulking',
    src: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Bulking',
    tag: 'PROTEIN',
    tagColor: 'bg-red-600',
    title: 'Paket Bulking',
    description: 'Dirancang khusus untuk kamu yang sedang program penambahan massa otot. Tinggi kalori, kaya protein dari daging, telur, dan kacang-kacangan pilihan.',
    price: 'Rp 89.000',
    numericPrice: 89000,
  },
  {
    id: 3,
    productId: 'prod-bundling-diet',
    slug: 'paket-diet-sehat',
    src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Diet Sehat',
    tag: 'DIET',
    tagColor: 'bg-green-500',
    title: 'Paket Diet Sehat',
    description: 'Kombinasi sayuran hijau, protein rendah lemak, dan karbohidrat kompleks. Bantu capai target berat badan ideal tanpa rasa lapar berlebih.',
    price: 'Rp 65.000',
    numericPrice: 65000,
  },
  {
    id: 4,
    productId: 'prod-bundling-vegetarian',
    slug: 'paket-vegetarian',
    src: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Vegetarian',
    tag: 'VEGAN',
    tagColor: 'bg-emerald-600',
    title: 'Paket Vegetarian',
    description: 'Lengkap dari alam, bebas daging. Sayuran segar, tahu, tempe, dan buah-buahan pilihan yang memenuhi kebutuhan nutrisi harian secara optimal.',
    price: 'Rp 72.000',
    numericPrice: 72000,
  },
  {
    id: 5,
    productId: 'prod-bundling-keluarga',
    slug: 'paket-keluarga',
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Keluarga',
    tag: 'KELUARGA',
    tagColor: 'bg-orange-500',
    title: 'Paket Keluarga',
    description: 'Sajian lengkap untuk seluruh keluarga. Porsi besar dengan menu bervariasi — dari ayam goreng, ikan bakar, hingga sup sayuran yang bergizi.',
    price: 'Rp 145.000',
    numericPrice: 145000,
  },
  {
    id: 6,
    productId: 'prod-bundling-meal-prep',
    slug: 'paket-meal-prep-mingguan',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Meal Prep Mingguan',
    tag: 'WEEKLY',
    tagColor: 'bg-blue-600',
    title: 'Paket Meal Prep Mingguan',
    description: 'Hemat waktu dengan persiapan makan seminggu sekaligus. Bahan-bahan sudah dipotong dan dibagi per porsi, siap masak kapan saja.',
    price: 'Rp 120.000',
    numericPrice: 120000,
  },
  {
    id: 7,
    productId: 'prod-bundling-lifestyle',
    slug: 'paket-healthy-lifestyle',
    src: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Healthy Lifestyle',
    tag: 'LIFESTYLE',
    tagColor: 'bg-purple-600',
    title: 'Paket Healthy Lifestyle',
    description: 'Dirancang untuk gaya hidup aktif dan seimbang. Buah, sayur, biji-bijian, dan superfood terpilih yang mendukung energi dan kesehatan optimal.',
    price: 'Rp 95.000',
    numericPrice: 95000,
  },
  {
    id: 8,
    productId: 'prod-bundling-praktis',
    slug: 'paket-masak-praktis',
    src: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=80',
    alt: 'Paket Masak Praktis',
    tag: 'PRAKTIS',
    tagColor: 'bg-pink-500',
    title: 'Paket Masak Praktis',
    description: 'Bahan masakan segar sudah siap diolah — dicuci, dipotong, dan dilengkapi bumbu rahasia. Masak enak cukup dalam 15 menit!',
    price: 'Rp 55.000',
    numericPrice: 55000,
  },
]

const CARD_W = 200
const GAP = 16
const EXPANDED_W = 460

export function PerspectiveCarousel() {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Track container width dynamically
  useEffect(() => {
    if (!containerRef.current) return
    setContainerWidth(containerRef.current.offsetWidth)

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Auto-play timer
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SLIDES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [isHovered])

  if (!mounted) {
    return (
      <div className="w-full bg-transparent py-8 flex flex-col items-center overflow-hidden min-h-[440px]">
        {/* Safe server-side loading skeleton or empty track */}
      </div>
    )
  }

  const totalTrackWidth = (SLIDES.length - 1) * (CARD_W + GAP) + EXPANDED_W
  const idealTranslate = containerWidth / 2 - (activeIdx * (CARD_W + GAP) + EXPANDED_W / 2)
  const padding = 32
  const maxTranslate = padding
  const minTranslate = containerWidth - totalTrackWidth - padding

  const translateValue =
    totalTrackWidth < containerWidth
      ? (containerWidth - totalTrackWidth) / 2
      : Math.min(maxTranslate, Math.max(minTranslate, idealTranslate))

  const handleCardClick = (idx: number, slug: string) => {
    if (activeIdx === idx) {
      router.push(`/produk/${slug}`)
    } else {
      setActiveIdx(idx)
    }
  }

  const handleAddToCart = (e: React.MouseEvent, slide: SlideItem) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: slide.productId,
      name: slide.title,
      price: slide.numericPrice,
      image: slide.src,
    })
  }

  return (
    <div className="w-full bg-transparent py-8 flex flex-col items-center overflow-hidden">
      <div
        ref={containerRef}
        className="w-full px-4 overflow-hidden relative py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex gap-4 items-center transition-transform duration-700 ease-out"
          style={{ transform: `translateX(${translateValue}px)` }}
        >
          {SLIDES.map((slide, idx) => {
            const isExpanded = activeIdx === idx

            return (
              <div
                key={slide.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => handleCardClick(idx, slide.slug)}
                className={`relative h-[400px] rounded-[24px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-white/10 group flex-shrink-0 ${
                  isExpanded ? 'w-[460px]' : 'w-[200px]'
                }`}
                style={{ width: isExpanded ? `${EXPANDED_W}px` : `${CARD_W}px` }}
              >
                {/* Background Image */}
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 300px, 500px"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-300" />

                {/* Tag Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-[6px] uppercase ${slide.tagColor}`}
                  >
                    {slide.tag}
                  </span>
                </div>

                {/* Cart button on expanded */}
                {isExpanded && (
                  <button
                    onClick={(e) => handleAddToCart(e, slide)}
                    className="absolute top-4 right-4 z-20 flex w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto"
                    title="Tambah ke Keranjang"
                  >
                    <ShoppingCart size={16} strokeWidth={2} />
                  </button>
                )}

                {/* Content Area */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end pointer-events-none">
                  {/* Title */}
                  <h3
                    className={`text-white font-extrabold leading-tight tracking-wide transition-all duration-300 ${
                      isExpanded
                        ? 'text-xl sm:text-2xl max-w-[90%] mb-2'
                        : 'text-sm max-w-full mb-1'
                    }`}
                  >
                    {slide.title}
                  </h3>

                  {/* Description — only on expanded card */}
                  {isExpanded && (
                    <p className="text-white/75 text-xs leading-relaxed mb-3 max-w-[85%] line-clamp-3">
                      {slide.description}
                    </p>
                  )}

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`font-bold transition-all duration-300 ${
                        isExpanded ? 'text-green-400 text-sm' : 'text-green-300 text-xs'
                      }`}
                    >
                      {slide.price}
                    </span>

                    {isExpanded && (
                      <span className="text-white text-xs font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-auto cursor-pointer hover:text-green-300">
                        <span className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                          <ArrowRight size={11} />
                        </span>
                        Pesan Sekarang
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
