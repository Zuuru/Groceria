# 🧩 Komponen — Next.js E-Commerce

Panduan membangun komponen utama aplikasi NutriMart.

---

## 1. ProductCard

File: `components/product/ProductCard.tsx`

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: { name: string }
  nutrition?: { calories: number }
  averageRating?: number
  reviewCount?: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem)

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      {/* Gambar produk */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images[0] || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Tombol wishlist */}
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-500">
          <Heart size={16} />
        </button>
        {/* Badge kalori */}
        {product.nutrition && (
          <span className="absolute bottom-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {product.nutrition.calories} kkal
          </span>
        )}
      </div>

      {/* Info produk */}
      <div className="p-4">
        <span className="text-xs text-green-600 font-medium uppercase tracking-wide">
          {product.category.name}
        </span>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 font-semibold text-gray-800 line-clamp-2 hover:text-green-700 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-sm text-gray-600">
              {product.averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Harga & Tambah keranjang */}
        <div className="flex items-center justify-between mt-3">
          <p className="font-bold text-gray-900">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded-xl transition-colors"
          >
            <ShoppingCart size={14} />
            Tambah
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## 2. Navbar

File: `components/layout/Navbar.tsx`

```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useCartStore } from '@/store/cart.store'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()
  const cartCount = useCartStore((s) => s.totalItems())

  const navLinks = [
    { href: '/products', label: 'Semua Produk' },
    { href: '/categories/snack-sehat', label: 'Snack' },
    { href: '/categories/minuman-sehat', label: 'Minuman' },
    { href: '/categories/suplemen', label: 'Suplemen' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-700">Nutri</span>
            <span className="text-2xl font-bold text-gray-800">Mart</span>
          </Link>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-green-700 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Link href="/products?q=" className="p-2 text-gray-500 hover:text-green-700">
              <Search size={20} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-500 hover:text-green-700">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-2">
                  <User size={20} className="text-gray-500" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-50">Profil Saya</Link>
                  <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">Pesanan</Link>
                  <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl transition-colors">
                Masuk
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-1 text-gray-600 hover:text-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
```

---

## 3. Cart Store (Zustand)

File: `store/cart.store.ts`

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  images: string[]
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'nutrimart-cart', // key di localStorage
    }
  )
)
```

---

## 4. API Route — Produk

File: `app/api/products/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('q')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')

  try {
    const where = {
      isActive: true,
      ...(category && { category: { slug: category } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { name: true, slug: true } },
          nutrition: true,
          _count: { select: { reviews: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil produk' }, { status: 500 })
  }
}
```
