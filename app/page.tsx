import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductTabs } from '@/components/product/ProductTabs'
import { prisma } from '@/lib/prisma'
import { ShieldCheck, Truck, Percent, CreditCard, ArrowRight, Star, Quote } from 'lucide-react'
import { StoreProducts } from '@/components/home/StoreProducts'
import { HighRatedStores } from '@/components/home/HighRatedStores'
import { PerspectiveCarousel } from '@/components/home/PerspectiveCarousel'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { FlashSaleBanner } from '@/components/home/FlashSaleBanner'

export const revalidate = 0 // Disable cache for database fresh retrieval

export default async function Home() {
  let products = []
  let categories = []

  try {
    // Attempt database retrieval
    products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: {
          select: { name: true, slug: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true }
    })
  } catch (error) {
    console.error('Error fetching database data, using fallback mock data:', error)
  }

  // Fallback data if DB is empty or fails
  if (products.length === 0) {
    categories = [
      { id: '1', name: 'Fruit & Vegetable', slug: 'fruit-veg' },
      { id: '2', name: 'Snack Sehat', slug: 'snack-sehat' },
      { id: '3', name: 'Minuman Sehat', slug: 'minuman-sehat' },
    ]

    products = [
      {
        id: '1',
        name: 'Premium Hass Avocado',
        slug: 'premium-hass-avocado',
        price: 24500,
        images: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
        description: 'Alpukat Hass pilihan dengan tekstur super creamy dan mentega. Dipanen langsung dari kebun organik bersertifikat untuk menjamin kualitas rasa dan nutrisi terbaik bagi keluarga Anda.',
        category: { name: 'Fruit & Vegetable', slug: 'fruit-veg' },
        isFeatured: true
      },
      {
        id: '2',
        name: 'Garden Carrots 500g',
        slug: 'garden-carrots',
        price: 18500,
        images: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80',
        description: 'Crunchy sweet organic carrots grown locally by our trusted farming partners.',
        category: { name: 'Fruit & Vegetable', slug: 'fruit-veg' },
        isFeatured: false
      },
      {
        id: '3',
        name: 'Fuji Apples 1kg',
        slug: 'fuji-apples',
        price: 42000,
        images: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80',
        description: 'Sweet, crisp and juicy red Fuji apples. High fiber and antioxidants.',
        category: { name: 'Fruit & Vegetable', slug: 'fruit-veg' },
        isFeatured: true
      }
    ]
  }



  // Testimonials
  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'The quality of the products is unmatched. I feel like I am shopping at a high-end farmers market but from the comfort of my home.'
    },
    {
      name: 'Michael T.',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Professional service, my weekly greens were delivered fresh and perfectly packed. Highly recommended!'
    },
    {
      name: 'Emma S.',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
      rating: 5,
      quote: 'Great selection, fast delivery, and the customer support is always so helpful. Definitely a loyal subscriber now.'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[#113E21] text-white pt-10 pb-16 sm:pb-20 flex flex-col items-center overflow-hidden">
        {/* Background Image Texture */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/assets/bg.png"
            alt="Organic Farm Background"
            fill
            className="object-cover opacity-[0.15]"
            priority
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          {/* Badge */}
          <ScrollReveal variant="fade-down" delay={100} duration={600}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 tracking-wider">
              100% Organic & Natural Food Store
            </div>
          </ScrollReveal>
          
          {/* Title */}
          <ScrollReveal variant="fade-up" delay={200} duration={800}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto uppercase">
              Fresh, Delicious & <br />
              <span className="text-[#f4b844]">Delivered To Your Door!</span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal variant="fade-up" delay={300} duration={800}>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-medium">
              Premium organic vegetables, fresh fruits, natural juices, and healthy snacks handpicked and delivered fresh daily.
            </p>
          </ScrollReveal>
          
          {/* Actions */}
          <ScrollReveal variant="fade-up" delay={400} duration={800}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/kategori"
                className="bg-[#f4b844] hover:bg-amber-500 text-[#113E21] font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 shadow-lg shadow-amber-500/10 hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="#why-choose-us"
                className="bg-white hover:bg-gray-100 text-[#113E21] font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 shadow-lg hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Perspective 3D Carousel inside Hero Section */}
        <div className="w-full mt-10 pb-4">
          <PerspectiveCarousel />
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="bg-white py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <ScrollReveal variant="fade-right" duration={900}>
            <div className="text-center md:text-left space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Featured Service</span>
              <h2 className="text-3xl font-extrabold text-[#113E21]">WHY CHOOSE US?</h2>
            </div>
          </ScrollReveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <ScrollReveal variant="fade-left" delay={0} duration={900} className="h-full">
              <div className="group relative h-80 rounded-3xl overflow-hidden shadow-md cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&auto=format&fit=crop&q=80"
                  alt="Fruits basket"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <ShieldCheck className="text-[#f4b844] mb-3" size={32} />
                  <h3 className="text-lg font-bold text-white mb-1">Wide Selection Of Fresh Foods</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">Over 500+ organic farm-fresh items curated for your lifestyle.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal variant="fade-left" delay={150} duration={900} className="h-full">
              <div className="group relative h-80 rounded-3xl overflow-hidden shadow-md cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80"
                  alt="Delivery"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <Truck className="text-[#f4b844] mb-3" size={32} />
                  <h3 className="text-lg font-bold text-white mb-1">Fast & Reliable Delivery</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">Same-day delivery service directly to your door in perfect condition.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Card 3 (Orange/Gold Featured Promo Card) */}
            <ScrollReveal variant="fade-left" delay={300} duration={900} className="h-full flex">
              <div className="w-full bg-[#f4b844] rounded-3xl p-6 flex flex-col justify-between shadow-md text-[#113E21] hover:scale-[1.02] transition-transform duration-300">
                <div className="bg-[#113E21] text-white p-3 rounded-2xl w-fit">
                  <Percent size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase mb-1 tracking-tight">Exclusive Deals & Discounts</h3>
                  <p className="text-xs font-semibold opacity-90 leading-relaxed">Up to 70% off during flash sales and special weekend events.</p>
                </div>
                <Link href="#products" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider group mt-4">
                  Shop Deals <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal variant="fade-left" delay={450} duration={900} className="h-full">
              <div className="group relative h-80 rounded-3xl overflow-hidden shadow-md cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=600&auto=format&fit=crop&q=80"
                  alt="Secure Payment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <CreditCard className="text-[#f4b844] mb-3" size={32} />
                  <h3 className="text-lg font-bold text-white mb-1">Secure & Easy Payment</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">Encrypted transactions via bank transfer, e-wallet, or credit card.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Market Products Section */}
      <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <ScrollReveal variant="fade-up" duration={700}>
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Our Pick</span>
              <h2 className="text-3xl font-extrabold text-[#113E21] tracking-tight">OUR MARKET PRODUCTS</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">The finest selection of fresh organic produce handpicked from our official partner stores.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={800}>
            <StoreProducts />
          </ScrollReveal>
        </div>
      </section>

      {/* High Ratings Stores Section */}
      <section className="bg-[#fbfcfa] py-16 sm:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <ScrollReveal variant="fade-up" duration={700}>
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Recommended Shops</span>
              <h2 className="text-3xl font-extrabold text-[#113E21] tracking-tight">HIGH RATING STORES</h2>
              <p className="text-xs text-gray-500 max-w-md mx-auto">Partner shops with outstanding service and the highest customer feedback ratings.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200} duration={800}>
            <HighRatedStores />
          </ScrollReveal>
        </div>
      </section>

      {/* Flash Sale Banner Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="scale-up" duration={900}>
            <FlashSaleBanner />
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-[#fbfcfa] py-16 sm:py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <ScrollReveal variant="fade-up" duration={700}>
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Testimonials</span>
              <h2 className="text-3xl font-extrabold text-[#113E21]">WHAT OUR CUSTOMERS SAY</h2>
            </div>
          </ScrollReveal>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 200} duration={800} className="h-full">
                <div
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative group hover:shadow-[0_10px_30px_rgba(17,62,33,0.04)] hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Quote Icon Background decoration */}
                  <Quote className="absolute top-6 right-8 text-emerald-800/5 group-hover:text-emerald-800/10 transition-colors" size={48} />
                  
                  {/* Rating stars */}
                  <div className="flex gap-0.5 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{t.name}</h4>
                      <span className="text-xs text-[#113E21] font-semibold">{t.role}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
