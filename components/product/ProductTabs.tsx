'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { ALL_PRODUCTS } from '@/lib/products'

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductTabsProps {
  // Keeping the old interface for legacy compatibility, but we'll also use ALL_PRODUCTS
  products?: unknown[]
  categories?: Category[]
}

export function ProductTabs({ }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<string>('all')

  // Use ALL_PRODUCTS from the centralized catalog 
  const filteredProducts = activeTab === 'all'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter((p) => p.categorySlug === activeTab)

  // Derive tabs from the catalog
  const tabs = [
    { slug: 'all', name: 'All Products' },
    { slug: 'buah', name: 'Fresh Fruits' },
    { slug: 'sayur', name: 'Organic Vegetables' },
    { slug: 'snack', name: 'Healthy Snacks' },
    { slug: 'minuman', name: 'Healthy Drinks' },
  ]

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            onClick={() => setActiveTab(tab.slug)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.slug
                ? 'bg-[#f4b844] text-[#113E21] shadow-md shadow-amber-500/10'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}
