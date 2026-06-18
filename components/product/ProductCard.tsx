'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()  // prevent Link navigation
    e.stopPropagation()
    setLoading(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
    setTimeout(() => setLoading(false), 600)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const imageUrl = product.images[0]
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price

  return (
    <Link href={`/produk/${product.slug}`} className="block">
      <div className="bg-[#f7f9f6] rounded-3xl overflow-hidden border border-gray-100/50 p-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(17,62,33,0.08)] hover:-translate-y-1 group flex flex-col justify-between h-full cursor-pointer">
        <div>
          {/* Image Container */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.badge && (
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${product.badgeColor}`}>
                  {product.badge}
                </span>
              )}
              {product.isFeatured && !product.badge && (
                <span className="bg-[#f4b844] text-[#113E21] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
                  Hot Item
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-rose-500 transition-colors focus:outline-none z-10"
            >
              <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} className={isLiked ? 'text-rose-500' : ''} />
            </button>
          </div>

          {/* Product Details */}
          <div className="px-1">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest">
                {product.category}
              </span>
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star size={12} fill="currentColor" />
                <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
              </div>
            </div>

            <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-1 mb-1 group-hover:text-[#113E21] transition-colors">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
              {product.description}
            </p>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="px-1 pt-2 border-t border-gray-200/50">
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-lg font-extrabold text-[#113E21]">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through font-medium">
                Rp {product.originalPrice!.toLocaleString('id-ID')}
              </span>
            )}
            <span className="text-[10px] text-gray-400 font-semibold">
              /{product.unit}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#113E21] hover:bg-[#1c5030] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <ShoppingCart size={14} />
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}
