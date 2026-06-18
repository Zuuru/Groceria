# 🗺️ Roadmap Pengembangan — NutriMart

Panduan urutan pengerjaan yang direkomendasikan dari awal hingga siap production.

---

## Phase 1 — Fondasi (Minggu 1–2)

### Setup Proyek
- [ ] Inisialisasi Next.js 14 dengan App Router, TypeScript, Tailwind
- [ ] Konfigurasi ESLint + Prettier
- [ ] Setup Git repository & `.gitignore`
- [ ] Buat file `.env.local` dan `.env.example`

### Database
- [ ] Setup PostgreSQL lokal (atau Supabase untuk cloud)
- [ ] Inisialisasi Prisma & tulis `schema.prisma` lengkap
- [ ] Jalankan `prisma db push` dan generate client
- [ ] Buat seed data (kategori + beberapa produk contoh)

### Auth
- [ ] Install & konfigurasi NextAuth.js
- [ ] Buat halaman `/login` dan `/register`
- [ ] Implementasi login dengan email/password
- [ ] Tambahkan Google OAuth
- [ ] Protect route admin dengan middleware

---

## Phase 2 — Halaman Utama (Minggu 3–4)

### Layout & Navigasi
- [ ] Buat `Navbar` dengan keranjang & user dropdown
- [ ] Buat `Footer` dengan link & sosial media
- [ ] Buat layout utama `(shop)/layout.tsx`

### Homepage
- [ ] Hero section dengan CTA
- [ ] Section kategori produk
- [ ] Section produk unggulan (featured)
- [ ] Section keunggulan (mengapa memilih NutriMart)
- [ ] Section testimoni pelanggan

### Halaman Produk
- [ ] Listing produk dengan grid responsif
- [ ] Filter berdasarkan kategori
- [ ] Search produk (live search)
- [ ] Sorting (harga, popularitas, terbaru)
- [ ] Pagination
- [ ] Halaman detail produk dengan:
  - [ ] Galeri foto
  - [ ] Info nutrisi
  - [ ] Tombol tambah ke keranjang
  - [ ] Rating & ulasan

---

## Phase 3 — Transaksi (Minggu 5–6)

### Keranjang Belanja
- [ ] Tambah/hapus item dari keranjang
- [ ] Update kuantitas
- [ ] Ringkasan harga total
- [ ] Keranjang persisten (Zustand + localStorage)

### Checkout
- [ ] Form alamat pengiriman
- [ ] Pilih atau tambah alamat baru
- [ ] Pilih metode pembayaran
- [ ] Ringkasan pesanan sebelum bayar
- [ ] Konfirmasi & submit pesanan

### Pembayaran (Midtrans)
- [ ] Integrasi Midtrans Snap
- [ ] Webhook handler untuk update status pesanan
- [ ] Halaman sukses & gagal bayar
- [ ] Kirim email konfirmasi pesanan

---

## Phase 4 — Akun Pengguna (Minggu 7)

### Halaman Akun
- [ ] Edit profil (nama, foto, nomor HP)
- [ ] Manajemen alamat
- [ ] Riwayat pesanan dengan status
- [ ] Detail pesanan
- [ ] Wishlist produk
- [ ] Ganti password

---

## Phase 5 — Admin Dashboard (Minggu 8–9)

### Dashboard
- [ ] Statistik penjualan (grafik)
- [ ] Total pendapatan, pesanan, produk, pelanggan
- [ ] Pesanan terbaru
- [ ] Produk stok menipis

### Manajemen Produk
- [ ] List semua produk (tabel + pagination)
- [ ] Tambah produk baru (form + upload gambar ke Cloudinary)
- [ ] Edit produk
- [ ] Hapus / nonaktifkan produk
- [ ] Input informasi nutrisi

### Manajemen Pesanan
- [ ] List semua pesanan dengan filter status
- [ ] Update status pesanan (PAID → PROCESSING → SHIPPED → DELIVERED)
- [ ] Detail pesanan

---

## Phase 6 — Polish & Launch (Minggu 10)

### Performa & SEO
- [ ] Optimasi gambar dengan `next/image`
- [ ] Metadata SEO di setiap halaman
- [ ] Open Graph untuk social sharing
- [ ] Sitemap.xml
- [ ] Loading skeleton / skeleton screens

### Testing
- [ ] Manual testing semua flow utama
- [ ] Test pembayaran dengan sandbox Midtrans
- [ ] Cek responsivitas mobile
- [ ] Cek accessibility dasar

### Deployment
- [ ] Setup project di Vercel
- [ ] Setup database production (Supabase / Railway / Neon)
- [ ] Konfigurasi environment variables di Vercel
- [ ] Setup custom domain
- [ ] Monitor dengan Vercel Analytics

---

## Urutan Prioritas Fitur

```
Must Have (MVP):
✅ Auth (login/register)
✅ Browse & search produk
✅ Keranjang belanja
✅ Checkout & pembayaran
✅ Riwayat pesanan (user)
✅ Manajemen produk (admin)

Should Have:
⭐ Ulasan & rating produk
⭐ Filter & sorting lanjutan
⭐ Email notifikasi
⭐ Wishlist

Nice to Have:
💡 Live chat support
💡 Program loyalitas / poin
💡 Rekomendasi produk (AI)
💡 Langganan produk berkala
```

---

## Estimasi Waktu

| Phase | Deskripsi | Estimasi |
|-------|-----------|----------|
| 1 | Fondasi & Setup | 1–2 minggu |
| 2 | Halaman utama & produk | 2 minggu |
| 3 | Keranjang & transaksi | 2 minggu |
| 4 | Akun pengguna | 1 minggu |
| 5 | Admin dashboard | 2 minggu |
| 6 | Polish & deployment | 1 minggu |
| **Total** | | **~9–10 minggu** |

> Estimasi untuk pengerjaan solo full-time. Bisa lebih cepat jika tim atau fokus MVP dulu.
