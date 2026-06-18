# 🥗 NutriMart — Healthy Food E-Commerce

> Aplikasi e-commerce berbasis Next.js untuk produk makanan sehat, organik, dan bergizi.

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js |
| Payment | Midtrans / Stripe |
| Storage | Cloudinary (gambar produk) |
| Deployment | Vercel |

---

## Struktur Folder

```
nutrimart/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (shop)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx              # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Product detail
│   │   ├── categories/
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   └── checkout/
│   │       └── page.tsx
│   ├── account/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Profile
│   │   └── orders/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Dashboard
│   │   ├── products/
│   │   └── orders/
│   └── api/
│       ├── auth/
│       ├── products/
│       ├── cart/
│       ├── orders/
│       └── payment/
│
├── components/
│   ├── ui/                           # Reusable UI components
│   ├── layout/                       # Navbar, Footer, Sidebar
│   ├── product/                      # ProductCard, ProductGrid, etc.
│   ├── cart/                         # CartItem, CartSummary, etc.
│   └── checkout/                     # CheckoutForm, PaymentForm, etc.
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   └── utils.ts
│
├── store/
│   ├── cart.store.ts
│   └── user.store.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
│   └── images/
│
├── types/
│   └── index.ts
│
└── hooks/
    ├── useCart.ts
    └── useProducts.ts
```

---

## Fitur Utama

### Customer (User)
- [ ] Registrasi & Login (email + Google OAuth)
- [ ] Browse produk dengan filter (kategori, harga, rating)
- [ ] Search produk
- [ ] Detail produk dengan nutrisi info
- [ ] Keranjang belanja (real-time)
- [ ] Checkout dengan alamat pengiriman
- [ ] Pembayaran (transfer bank, e-wallet, kartu kredit)
- [ ] Riwayat pesanan & tracking
- [ ] Ulasan & rating produk
- [ ] Wishlist

### Admin
- [ ] Dashboard analytics (penjualan, produk terlaris)
- [ ] Manajemen produk (CRUD)
- [ ] Manajemen kategori
- [ ] Manajemen pesanan
- [ ] Manajemen pengguna

---

## Cara Mulai

```bash
# 1. Clone & Install
npx create-next-app@latest nutrimart --typescript --tailwind --app
cd nutrimart

# 2. Install dependencies
npm install prisma @prisma/client
npm install next-auth
npm install zustand
npm install @midtrans/midtrans-client
npm install cloudinary

# 3. Setup environment
cp .env.example .env.local

# 4. Setup database
npx prisma init
npx prisma db push
npx prisma generate

# 5. Jalankan dev server
npm run dev
```
