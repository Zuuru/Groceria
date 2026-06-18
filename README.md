# 🥦 Groceria — Healthy Food E-Commerce

> Platform belanja bahan makanan sehat berbasis web yang dirancang untuk memudahkan masyarakat mengakses produk organik, segar, dan bergizi dengan pengalaman belanja yang premium dan modern.

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Database](#3-database)
4. [Decision](#4-decision)
5. [Workflow](#5-workflow)

---

## 1. Project Overview

**Groceria** adalah aplikasi e-commerce makanan sehat yang menyediakan berbagai produk organik, mulai dari sayuran segar, buah-buahan, minuman sehat, snack bergizi, hingga paket bundling meal plan. Aplikasi ini dibangun untuk lomba dengan fokus pada pengalaman pengguna yang premium dan estetika visual modern.

### ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🏠 **Homepage Premium** | Hero section dengan carousel paket produk 3D interaktif |
| 🛍️ **Katalog Produk** | Browsing produk berdasarkan kategori dengan filter |
| 🛒 **Keranjang Belanja** | Manajemen cart persisten menggunakan localStorage |
| 🔐 **Autentikasi** | Login/Register dengan JWT session (Credentials Provider) |
| 👤 **Profil Pengguna** | Manajemen data diri, alamat pengiriman, dan riwayat pesanan |
| 💳 **Checkout & Pembayaran** | Alur pemesanan dengan berbagai metode pembayaran |
| 🔔 **Notifikasi** | Halaman notifikasi untuk update status pesanan |
| 💬 **AI Chat** | Asisten belanja berbasis AI untuk rekomendasi produk |
| ⭐ **Ulasan & Wishlist** | Review produk dan daftar produk favorit |
| 🏪 **Toko Partner** | Tampilan toko mitra dengan rating tertinggi |
| 🧑‍💼 **Seller Dashboard** | Panel seller untuk kelola produk, stok, dan pesanan masuk |

### 🎨 Desain & Branding

- **Primary Color:** `#113E21` (Forest Green)
- **Accent Color:** `#f4b844` (Golden Amber)
- **Style:** Dark modern, glassmorphism, smooth micro-animations
- **Font:** Inter / System UI sans-serif
- **Tema:** Organic, Natural, Premium Healthy Lifestyle

### 🌐 Pages / Routes

```
/               → Homepage
/kategori       → Halaman semua kategori produk
/produk/[slug]  → Detail produk
/toko           → Halaman toko partner
/cart           → Keranjang belanja
/profile        → Profil pengguna
/notifikasi     → Pusat notifikasi
/chat           → AI Chat Assistant
/ai             → AI feature page
/seller         → Seller dashboard (kelola produk & pesanan)
/seller/produk  → Manajemen produk seller
/seller/pesanan → Daftar pesanan masuk
```

---

## 2. Architecture

### 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                  │
│   React 19 + Next.js 16 App Router + Tailwind CSS   │
└────────────────────┬────────────────────────────────┘
                     │ HTTP / Server Components
┌────────────────────▼────────────────────────────────┐
│               NEXT.JS SERVER LAYER                   │
│  ┌─────────────────┐   ┌──────────────────────────┐ │
│  │  App Router     │   │   API Routes             │ │
│  │  (RSC + SSR)    │   │   /api/auth/[...nextauth]│ │
│  └────────┬────────┘   └─────────────┬────────────┘ │
│           │                          │               │
│  ┌────────▼──────────────────────────▼────────────┐ │
│  │              Business Logic (lib/)              │ │
│  │  auth.ts  │  prisma.ts  │  products.ts          │ │
│  └────────────────────────┬────────────────────────┘ │
└───────────────────────────┼─────────────────────────┘
                            │ Prisma ORM
┌───────────────────────────▼─────────────────────────┐
│                  DATABASE (SQLite)                    │
│              prisma/dev.db                           │
└──────────────────────────────────────────────────────┘
```

### 📁 Struktur Direktori

```
groceria/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (font, metadata)
│   ├── page.tsx                # Homepage (SSR)
│   ├── globals.css             # Global styles
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/  # NextAuth.js handler
│   ├── ai/                     # AI assistant page
│   ├── cart/                   # Cart page
│   ├── chat/                   # Chat page
│   ├── kategori/               # Category listing
│   ├── notifikasi/             # Notifications
│   ├── produk/                 # Product detail [slug]
│   ├── profile/                # User profile
│   └── toko/                   # Store listing
│
├── components/                 # Reusable UI components
│   ├── home/
│   │   ├── PerspectiveCarousel.tsx   # 3D sliding carousel
│   │   ├── StoreProducts.tsx         # Product bundling display
│   │   └── HighRatedStores.tsx       # Top-rated stores
│   ├── layout/
│   │   ├── Navbar.tsx                # Navigation bar
│   │   └── Footer.tsx                # Footer
│   └── product/
│       ├── ProductCard.tsx            # Product card UI
│       └── ProductTabs.tsx            # Category tabs filter
│
├── lib/                        # Server-side utilities
│   ├── auth.ts                 # NextAuth configuration
│   ├── prisma.ts               # Prisma singleton client
│   └── products.ts             # Product data & helpers
│
├── store/                      # Client-side state (Zustand)
│   └── cart.store.ts           # Cart state management
│
├── prisma/                     # Database layer
│   ├── schema.prisma           # Data models
│   ├── seed.ts                 # Seeding script
│   └── dev.db                  # SQLite database file
│
├── public/                     # Static assets
│   └── assets/
│       └── bg.png              # Hero background texture
│
├── docs/                       # Documentation
├── design.yaml                 # Design system specification
├── next.config.ts              # Next.js configuration
├── package.json
└── tsconfig.json
```

### 🧩 Component Architecture

```
App (page.tsx — Server Component)
│
├── Navbar                          [Client Component]
├── Hero Section
│   └── PerspectiveCarousel         [Client Component]
│       └── 8 Food Package Slides
├── Why Choose Us Section
├── Market Products Section
│   └── StoreProducts               [Client Component]
│       └── ProductCard             [Client Component]
├── High Rating Stores Section
│   └── HighRatedStores             [Client Component]
├── Flash Sale Banner
├── Testimonials Section
└── Footer                          [Client Component]
```

### 🔄 Data Flow

```
Browser Request
    │
    ▼
Next.js Server (RSC)
    │── prisma.product.findMany()  ──► SQLite DB
    │── prisma.category.findMany() ──► SQLite DB
    │
    ▼
Server renders HTML with data
    │
    ▼
Client hydration
    │
    ▼
Zustand (cart.store) ◄──► localStorage (persisted)
```

---

## 3. Database

### 🗄️ Database Engine

- **Engine:** SQLite (via Prisma ORM)
- **File:** `prisma/dev.db`
- **ORM:** Prisma Client v5

> SQLite dipilih untuk kemudahan setup lokal tanpa konfigurasi server database eksternal. Untuk production, migrasi ke PostgreSQL/MySQL bisa dilakukan hanya dengan mengubah `provider` di `schema.prisma`.

### 📊 Entity Relationship Diagram

```
┌──────────┐     ┌──────────┐     ┌───────────────┐
│  User    │────<│  Order   │────<│  OrderItem    │
│          │     │          │     │               │
│ id       │     │ id       │     │ id            │
│ name     │     │ orderNum │     │ quantity      │
│ email    │     │ status   │     │ price         │
│ password │     │ totalPrice│    │ orderId       │
│ role     │     │ shippingFee│   │ productId ────┼──┐
│ phone    │     │ userId   │     └───────────────┘  │
│ image    │     │ addressId│                         │
└──────────┘     └──────────┘                         │
     │                │                               │
     │           ┌────▼─────┐                         │
     │           │ Payment  │                         │
     │           │          │                         │
     │           │ id       │                         │
     │           │ method   │                         │
     │           │ status   │                         │
     │           │ amount   │                         │
     │           └──────────┘                         │
     │                                                │
     ├────────<  Address                              │
     ├────────<  Review ──────────────────────────────┤
     ├────────<  Wishlist ─────────────────────────────┤
     ├────────<  Account  (NextAuth)                  │
     ├────────<  Session  (NextAuth)                  │
     └────────1  Store   (jika role = SELLER)─────────┤
                    │                                 │
                    └────────<  Product ──────────────┘
                                                      │
┌─────────────────────────────────────────────────────┘
│
▼
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Product  │────>│ Category │     │  Store   │
│          │     │          │     │          │
│ id       │     │ id       │     │ id       │
│ name     │     │ name     │     │ name     │
│ slug     │     │ slug     │     │ description│
│ price    │     │ description│   │ image    │
│ stock    │     │ image    │     │ rating   │
│ images   │     └──────────┘     │ userId   │
│ isActive │                      └──────────┘
│ isFeatured│
│ storeId  │ (FK → Store)
└────┬─────┘
     │
     └────────> Nutrition (1:1)
```

### 📋 Models Detail

#### `User`
| Field | Type | Keterangan |
|-------|------|-----------|
| id | String (cuid) | Primary key |
| name | String? | Nama pengguna |
| email | String (unique) | Email login |
| password | String? | Bcrypt hash |
| role | String | `CUSTOMER`, `SELLER`, atau `ADMIN` |
| phone | String? | Nomor telepon |

#### `Product`
| Field | Type | Keterangan |
|-------|------|-----------|
| id | String (cuid) | Primary key |
| name | String | Nama produk |
| slug | String (unique) | URL-friendly identifier |
| price | Float | Harga dalam Rupiah |
| stock | Int | Stok tersedia |
| images | String | JSON/URL gambar produk |
| isActive | Boolean | Visibilitas produk |
| isFeatured | Boolean | Tampil di featured section |
| categoryId | String | FK → Category |
| storeId | String | FK → Store (pemilik produk) |

#### `Store` (dimiliki oleh User dengan role SELLER)
| Field | Type | Keterangan |
|-------|------|-----------|
| id | String (cuid) | Primary key |
| name | String | Nama toko |
| description | String? | Deskripsi toko |
| image | String? | Logo/banner toko |
| rating | Float | Rata-rata rating toko |
| userId | String (unique) | FK → User (1:1) |

#### `Nutrition` (1:1 dengan Product)
| Field | Type | Keterangan |
|-------|------|-----------|
| calories | Float | kkal per serving |
| protein | Float | gram |
| carbs | Float | gram |
| fat | Float | gram |
| fiber | Float? | gram |
| sugar | Float? | gram |
| sodium | Float? | mg |
| servingSize | String | contoh: "100g" |

#### `Order`
| Field | Type | Keterangan |
|-------|------|-----------|
| status | String | PENDING → PAID → PROCESSING → SHIPPED → DELIVERED → COMPLETED |
| sellerId | String? | FK → User (seller yang memproses pesanan) |
| totalPrice | Float | Total harga |
| shippingFee | Float | Ongkos kirim |

#### `Payment`
| Field | Type | Keterangan |
|-------|------|-----------|
| method | String | BANK_TRANSFER, GOPAY, OVO, DANA, COD |
| status | String | PENDING, PAID, FAILED, REFUNDED |
| amount | Float | Nominal pembayaran |

### 🌱 Seeding

```bash
# Jalankan seed untuk mengisi data awal
npx prisma db seed

# Reset dan re-seed
npx prisma migrate reset
```

Data seed mencakup: kategori produk, produk sample, data nutrisi, akun demo (customer, seller, admin), dan data toko sample.

---

## 4. Decision

### 🤔 Keputusan Teknis & Alasannya

#### 4.1 Framework: Next.js 16 (App Router)

**Dipilih karena:**
- **Server Components (RSC)** memungkinkan fetch data langsung dari database di server tanpa round-trip API tambahan — lebih cepat dan lebih sederhana
- **App Router** memberikan co-location antara layouts, pages, dan loading states
- **Built-in Image Optimization** untuk performa gambar produk yang optimal
- **TypeScript-first** ecosystem yang mature

**Alternatif yang dipertimbangkan:** Vite + React SPA → ditolak karena membutuhkan API layer terpisah untuk SSR/SEO

---

#### 4.2 Database: SQLite + Prisma ORM

**Dipilih karena:**
- **Zero-config setup** — tidak perlu install/run server database eksternal
- **Prisma** memberikan type-safety penuh dengan auto-generated client
- **Mudah migrasi** ke PostgreSQL/MySQL di production hanya dengan ganti `provider`
- Cocok untuk skala lomba/prototype tanpa overhead infrastruktur

**Alternatif yang dipertimbangkan:** PostgreSQL → memerlukan setup Docker atau cloud DB, tidak praktis untuk development lokal

---

#### 4.3 Autentikasi: NextAuth.js v4 (Credentials Provider + JWT)

**Dipilih karena:**
- **JWT session strategy** — stateless, tidak perlu tabel session di DB untuk setiap request
- **Credentials Provider** memungkinkan custom login form dengan email/password yang di-hash dengan bcrypt
- **PrismaAdapter** untuk sinkronisasi user model antara NextAuth dan Prisma
- Built-in CSRF protection dan secure cookies

**Keputusan:** Session strategy `jwt` (bukan `database`) dipilih untuk performa lebih baik karena tidak perlu lookup ke DB di setiap request yang membutuhkan auth.

---

#### 4.4 State Management: Zustand

**Dipilih karena:**
- **Minimal boilerplate** dibanding Redux
- **Persist middleware** built-in untuk sinkronisasi cart ke `localStorage` secara otomatis
- **TypeScript-first** API yang clean
- Ringan (~1kb) dan tidak butuh Provider wrapper di root

```ts
// Cart persisted ke localStorage secara otomatis
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({ ... }),
    { name: 'nutrimart-cart' }
  )
)
```

---

#### 4.5 Styling: Tailwind CSS v4

**Dipilih karena:**
- **Utility-first** memungkinkan iterasi desain yang sangat cepat
- **No CSS file bloat** — hanya class yang digunakan yang di-include
- v4 menggunakan **CSS-native cascade layers** yang lebih performant
- Konsisten dengan design system yang telah didefinisikan di `design.yaml`

---

#### 4.6 Carousel: Custom Perspective Carousel (tanpa library)

**Dipilih karena:**
- Library carousel pihak ketiga sering membawa overhead besar
- Custom implementation memberikan kontrol penuh atas animasi, timing, dan behavior
- Menggunakan `ResizeObserver` untuk responsivitas dinamis tanpa `window.resize` polling
- Auto-play dengan pause-on-hover tanpa kompleksitas tambahan

**Trade-off:** Waktu implementasi lebih lama, namun hasilnya lebih ringan dan sesuai desain yang diinginkan

---

#### 4.7 Images: Unsplash (CDN) + Next/Image

**Dipilih karena:**
- Menyediakan foto produk makanan berkualitas tinggi secara gratis
- `next/image` otomatis mengoptimasi format (WebP), ukuran, dan lazy loading
- Remote patterns dikonfigurasi di `next.config.ts` untuk keamanan

---

## 5. Workflow

### 🔄 Development Workflow

#### Setup Awal

```bash
# 1. Clone repositori
git clone <repo-url>
cd groceria

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env: tambahkan NEXTAUTH_SECRET dan DATABASE_URL

# 4. Inisialisasi database
npx prisma generate
npx prisma db push

# 5. Seed data awal (opsional)
npx prisma db seed

# 6. Jalankan development server
npm run dev
```

#### Environment Variables

```env
# .env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

---

### 🚀 User Journey / Flow

#### Flow: Pengunjung → Pembeli

```
[Landing Page]
      │
      ▼
[Browse Kategori]  ◄──────────────────────────┐
      │                                        │
      ▼                                        │
[Detail Produk]                                │
      │                                        │
      ▼                                        │
[Tambah ke Cart] ──► [Cart Page]              │
      │                    │                  │
      │                    ▼                  │
      │              [Login/Register]          │
      │                    │                  │
      │                    ▼                  │
      │              [Checkout Form]           │
      │              (Alamat + Pembayaran)     │
      │                    │                  │
      │                    ▼                  │
      │              [Order Confirmed]         │
      │                    │                  │
      │                    ▼                  │
      │              [Notifikasi Update]       │
      │                    │                  │
      └────────────────────┘ (Beli lagi)
```

#### Flow: Seller (Kelola Toko & Pesanan)

```
[Register / Login sebagai SELLER]
        │
        ▼
[Seller Dashboard /seller]
        │
        ├──► [Kelola Produk /seller/produk]
        │         │
        │         ├── Tambah produk baru
        │         ├── Edit harga / stok
        │         └── Nonaktifkan produk
        │
        ├──► [Pesanan Masuk /seller/pesanan]
        │         │
        │         ├── Lihat pesanan PAID
        │         ├── Update status → PROCESSING
        │         └── Update status → SHIPPED
        │
        └──► [Profil Toko]
                  │
                  └── Edit nama, deskripsi, gambar toko
```

#### Flow: Autentikasi

```
[POST /api/auth/signin]
        │
        ▼
[Credentials Provider]
        │
        ├── Find user by email (Prisma)
        ├── bcrypt.compare(password, hash)
        │
        ▼
[JWT Token dibuat]
        │
        ├── token.id = user.id
        ├── token.role = user.role  // CUSTOMER | SELLER | ADMIN
        └── token.storeId = user.store?.id  // hanya jika role SELLER
                │
                ▼
        [session.user tersedia di seluruh app]
```

---

### 🛠️ Development Commands

```bash
# Development server (hot reload)
npm run dev

# Build untuk production
npm run build

# Start production server
npm start

# Lint check
npm run lint

# Prisma Studio (GUI database browser)
npx prisma studio

# Generate Prisma Client setelah schema berubah
npx prisma generate

# Push schema ke database (dev)
npx prisma db push

# Seed database
npx prisma db seed
```

---

### 📦 Deployment Workflow

```
Local Dev
    │
    ├── npm run build  →  Validasi TypeScript + ESLint
    │
    ▼
Staging/Production
    │
    ├── Set environment variables
    ├── npx prisma generate
    ├── npx prisma db push (atau migrate deploy untuk production)
    ├── npm run build
    └── npm start
```

> **Catatan:** Untuk deployment production, disarankan migrasi dari SQLite ke **PostgreSQL** (Supabase, Neon, atau Railway) dengan mengubah `provider = "postgresql"` di `schema.prisma`.

---

### 🔍 Testing Checklist

- [ ] Homepage carousel berjalan dan auto-play berfungsi
- [ ] Hover kartu carousel menampilkan deskripsi & harga
- [ ] Filter kategori produk berfungsi
- [ ] Tambah produk ke cart tersimpan setelah refresh
- [ ] Login dengan email & password berhasil
- [ ] Profil user menampilkan data yang benar
- [ ] Navigasi antar halaman tidak error
- [ ] Responsive di mobile (min 375px) dan desktop
- [ ] Login sebagai seller dapat mengakses `/seller` dashboard
- [ ] Seller dapat menambah dan mengedit produk miliknya
- [ ] Seller dapat melihat dan mengupdate status pesanan masuk
- [ ] Customer tidak dapat mengakses route `/seller`

---

## 👥 Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.2.9 |
| Language | TypeScript | ^5 |
| UI Runtime | React | 19.2.4 |
| Styling | Tailwind CSS | ^4 |
| ORM | Prisma | ^5.20.0 |
| Database | SQLite | (via Prisma) |
| Auth | NextAuth.js | ^4.24.14 |
| State | Zustand | ^5.0.14 |
| Icons | Lucide React | ^1.17.0 |
| Password | bcryptjs | ^3.0.3 |

---

<div align="center">

**Groceria** — *Fresh. Natural. Delivered.*

Made with 💚 for healthy living

</div>
