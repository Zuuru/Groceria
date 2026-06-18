// lib/products.ts — Katalog produk terpusat (shared across pages)

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  discount?: string
  unit: string
  badge?: string
  badgeColor?: string
  isOrganic: boolean
  isFeatured?: boolean
  images: string[]
  category: string
  categorySlug: string
  description: string
  rating: number
  reviewCount: number
  soldCount: string
  stock: string
  weightOptions?: {
    label: string
    price: number
    originalPrice: number
    discount: string
  }[]
  ingredients?: {
    name: string
    image: string
  }[]
  cookingSteps?: string[]
}

export interface Store {
  name: string
  location: string
  rating: number
  reviewCount: number
  responseRate: string
  joinYear: number
  badge: string
  avatar: string
}

// Toko virtual Groceria
export const GROCERIA_STORE: Store = {
  name: 'Groceria Official Store',
  location: 'Jakarta Selatan',
  rating: 4.9,
  reviewCount: 3420,
  responseRate: '98%',
  joinYear: 2021,
  badge: 'Terpercaya',
  avatar: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=200&auto=format&fit=crop&q=80'
}

export const ALL_PRODUCTS: Product[] = [
  // ─── Bundling Siap Masak ───
  {
    id: 'prod-bundling-anak-kos',
    name: 'Paket Hemat Anak Kos',
    slug: 'paket-hemat-anak-kos',
    price: 35000,
    originalPrice: 50000,
    discount: '30%',
    unit: '1 Paket (Porsi 3-4 hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Solusi makan sehat hemat untuk anak kos! Paket ini berisi bahan-bahan lengkap yang mudah dimasak dalam 10 menit. Nutrisi terjaga, kantong tetap aman, cocok untuk 3-4 hari ke depan.',
    rating: 4.8,
    reviewCount: 312,
    soldCount: '2500+',
    stock: 'Ready',
    ingredients: [
      { name: 'Telur Organik', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=80' },
      { name: 'Buncis Segar', image: 'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tomat Cherry', image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=200&auto=format&fit=crop&q=80' },
      { name: 'Wortel Baby', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&auto=format&fit=crop&q=80' },
      { name: 'Bawang Putih', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Rebus telur selama 8-10 menit hingga matang, kupas kulitnya.',
      'Cuci bersih semua sayuran dan potong sesuai selera.',
      'Tumis bawang putih hingga harum dengan sedikit minyak.',
      'Masukkan sayuran, tambahkan garam dan merica secukupnya.',
      'Sajikan bersama telur rebus dan nasi hangat.'
    ]
  },
  {
    id: 'prod-bundling-bulking',
    name: 'Paket Bulking',
    slug: 'paket-bulking',
    price: 89000,
    originalPrice: 115000,
    discount: '22%',
    unit: '1 Paket (Porsi 5-6 hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Paket high-protein untuk kamu yang lagi masa bulking. Berisi sumber protein hewani dan nabati berkualitas tinggi, karbohidrat kompleks, dan sayuran pendukung. Dukung pertumbuhan otot optimal dengan nutrisi yang tepat.',
    rating: 4.9,
    reviewCount: 198,
    soldCount: '1800+',
    stock: 'Ready',
    ingredients: [
      { name: 'Dada Ayam', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11560?w=200&auto=format&fit=crop&q=80' },
      { name: 'Telur Organik', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kacang Almond', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200&auto=format&fit=crop&q=80' },
      { name: 'Brokoli', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ubi Jalar', image: 'https://images.unsplash.com/photo-1596097635121-14b38c5d7b2a?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Marinasi dada ayam dengan bumbu minimal 30 menit.',
      'Panggang atau rebus ayam hingga matang sempurna.',
      'Rebus ubi jalar dan brokoli hingga empuk.',
      'Sajikan dengan telur orak-arik dan taburi almond.',
      'Bagi menjadi 5-6 porsi dalam wadah meal prep kedap udara.'
    ]
  },
  {
    id: 'prod-bundling-diet',
    name: 'Paket Diet Sehat',
    slug: 'paket-diet-sehat',
    price: 65000,
    originalPrice: 82000,
    discount: '21%',
    unit: '1 Paket (Program 5 Hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Program diet 5 hari berbasis makanan segar rendah kalori dan tinggi serat. Setiap paket dirancang untuk membantu mencapai target berat badan ideal tanpa rasa lapar. Sertakan buah dan sayuran organik segar pilihan.',
    rating: 4.8,
    reviewCount: 423,
    soldCount: '3200+',
    stock: 'Ready',
    ingredients: [
      { name: 'Selada Romaine', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kale Organik', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80' },
      { name: 'Apel Hijau', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Timun Segar', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Lemon Segar', image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Cuci bersih seluruh bahan sayuran dan buah.',
      'Potong kale dan selada kasar, sobek dengan tangan agar segar.',
      'Iris tipis timun dan apel hijau, peras lemon di atasnya.',
      'Campurkan semua bahan dalam mangkuk besar.',
      'Sajikan tanpa dressing berlebih, cukup lemon dan garam himalaya.'
    ]
  },
  {
    id: 'prod-bundling-vegetarian',
    name: 'Paket Vegetarian',
    slug: 'paket-vegetarian',
    price: 72000,
    originalPrice: 90000,
    discount: '20%',
    unit: '1 Paket (Porsi 4-5 hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Paket lengkap untuk gaya hidup vegetarian yang lezat dan bergizi. Berisi beragam sayuran segar, protein nabati, serta rempah pilihan untuk membuat hidangan vegetarian yang kaya rasa dan penuh nutrisi.',
    rating: 4.7,
    reviewCount: 178,
    soldCount: '1400+',
    stock: 'Ready',
    ingredients: [
      { name: 'Tahu Organik', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&auto=format&fit=crop&q=80' },
      { name: 'Edamame', image: 'https://images.unsplash.com/photo-1517711055453-0be61e94b8ab?w=200&auto=format&fit=crop&q=80' },
      { name: 'Bayam Organik', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&auto=format&fit=crop&q=80' },
      { name: 'Paprika Merah', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&auto=format&fit=crop&q=80' },
      { name: 'Jamur Shitake', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Potong tahu menjadi kubus dan goreng hingga keemasan.',
      'Tumis bawang dan paprika merah hingga harum.',
      'Masukkan jamur shitake dan bayam, aduk rata.',
      'Tambahkan tahu goreng dan edamame.',
      'Bumbui dengan kecap dan minyak wijen, sajikan hangat.'
    ]
  },
  {
    id: 'prod-bundling-keluarga',
    name: 'Paket Keluarga',
    slug: 'paket-keluarga',
    price: 145000,
    originalPrice: 185000,
    discount: '22%',
    unit: '1 Paket (Porsi 4-5 orang, 3 hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Paket besar untuk keluarga tercinta! Berisi aneka bahan masakan segar dan bergizi yang cukup untuk 4-5 orang selama 3 hari. Hemat waktu belanja, hemat pengeluaran, dan tetap sehat bersama keluarga.',
    rating: 4.9,
    reviewCount: 534,
    soldCount: '4100+',
    stock: 'Ready',
    ingredients: [
      { name: 'Ayam Potong', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11560?w=200&auto=format&fit=crop&q=80' },
      { name: 'Wortel Baby', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kentang', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80' },
      { name: 'Brokoli', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&auto=format&fit=crop&q=80' },
      { name: 'Tomat Segar', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Bagi bahan menjadi 3 porsi untuk 3 hari memasak.',
      'Cuci ayam dan marinasi malam sebelumnya.',
      'Masak sayuran segar di hari H untuk menjaga nutrisi.',
      'Variasikan cara memasak: tumis, sup, atau pepes.',
      'Simpan sisa bahan di kulkas dalam wadah tertutup rapat.'
    ]
  },
  {
    id: 'prod-bundling-meal-prep',
    name: 'Paket Meal Prep Mingguan',
    slug: 'paket-meal-prep-mingguan',
    price: 120000,
    originalPrice: 155000,
    discount: '23%',
    unit: '1 Paket (Meal prep 7 hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Hemat waktu dengan menyiapkan makanan sehat selama seminggu dalam sekali masak! Paket ini berisi bahan-bahan yang sudah diperhitungkan porsinya untuk 7 hari. Ideal untuk kamu yang sibuk tapi tetap ingin makan sehat.',
    rating: 4.8,
    reviewCount: 289,
    soldCount: '2200+',
    stock: 'Ready',
    ingredients: [
      { name: 'Dada Ayam', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11560?w=200&auto=format&fit=crop&q=80' },
      { name: 'Telur Organik', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=80' },
      { name: 'Quinoa', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=200&auto=format&fit=crop&q=80' },
      { name: 'Brokoli', image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&auto=format&fit=crop&q=80' },
      { name: 'Ubi Jalar', image: 'https://images.unsplash.com/photo-1596097635121-14b38c5d7b2a?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Siapkan semua bahan dan wadah kedap udara pada hari Minggu.',
      'Masak quinoa sesuai instruksi, dinginkan sebelum disimpan.',
      'Panggang ayam dalam oven dengan bumbu minimal.',
      'Kukus brokoli dan ubi jalar hingga empuk.',
      'Bagi ke 7 wadah meal prep, simpan di kulkas untuk seminggu.'
    ]
  },
  {
    id: 'prod-bundling-lifestyle',
    name: 'Paket Healthy Lifestyle',
    slug: 'paket-healthy-lifestyle',
    price: 95000,
    originalPrice: 120000,
    discount: '21%',
    unit: '1 Paket (Mingguan)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Mulai perjalanan hidup sehatmu dengan paket kurator terbaik kami. Berisi superfood, sayuran organik, buah segar, dan bahan minuman detox. Dirancang untuk mendukung energi, imunitas, dan kesehatan optimal.',
    rating: 4.9,
    reviewCount: 367,
    soldCount: '2900+',
    stock: 'Ready',
    ingredients: [
      { name: 'Alpukat Hass', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&auto=format&fit=crop&q=80' },
      { name: 'Kale Organik', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80' },
      { name: 'Stroberi Segar', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&auto=format&fit=crop&q=80' },
      { name: 'Jahe Organik', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200&auto=format&fit=crop&q=80' },
      { name: 'Lemon Segar', image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Setiap pagi, buat minuman detox dari lemon, jahe, dan air hangat.',
      'Sarapan dengan smoothie kale, stroberi, dan alpukat.',
      'Makan siang dengan salad hijau segar dan protein pilihan.',
      'Camilan sore dengan buah segar.',
      'Konsumsi secara konsisten selama 7 hari untuk hasil optimal.'
    ]
  },
  {
    id: 'prod-bundling-praktis',
    name: 'Paket Masak Praktis',
    slug: 'paket-masak-praktis',
    price: 55000,
    originalPrice: 70000,
    discount: '21%',
    unit: '1 Paket (Porsi 2 orang, 3 hari)',
    badge: 'BUNDLING',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80'
    ],
    category: 'Bundling Siap Masak',
    categorySlug: 'bundling',
    description: 'Masak cepat, tetap lezat! Paket ini cocok untuk kamu yang punya waktu terbatas tapi tidak ingin mengorbankan kualitas makanan. Semua bahan sudah dipotong dan dibumbui, tinggal masak dalam 15 menit.',
    rating: 4.7,
    reviewCount: 241,
    soldCount: '1900+',
    stock: 'Ready',
    ingredients: [
      { name: 'Fillet Ayam', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d11560?w=200&auto=format&fit=crop&q=80' },
      { name: 'Paprika Mix', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&auto=format&fit=crop&q=80' },
      { name: 'Bawang Bombay', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200&auto=format&fit=crop&q=80' },
      { name: 'Bumbu Racik', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&auto=format&fit=crop&q=80' },
      { name: 'Minyak Zaitun', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=80' },
    ],
    cookingSteps: [
      'Semua bahan sudah tersedia dipotong dan siap masak.',
      'Panaskan minyak zaitun dalam wajan anti lengket.',
      'Tumis bawang bombay hingga transparan.',
      'Masukkan fillet ayam, masak 5 menit setiap sisi.',
      'Tambahkan paprika dan bumbu racik, aduk rata dan sajikan.'
    ]
  },

  // ─── Buah-buahan ───
  {
    id: 'prod-avocado',
    name: 'Premium Hass Avocado',
    slug: 'premium-hass-avocado',
    price: 24500,
    originalPrice: 32000,
    discount: '25%',
    unit: 'Per 500g',
    badge: 'ORGANIK',
    badgeColor: 'bg-[#D6E9BE] text-[#111F05]',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1604000301190-2e57fa503bb2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Buah-buahan',
    categorySlug: 'buah',
    description: 'Alpukat Hass pilihan dengan tekstur super creamy dan mentega. Dipanen langsung dari kebun organik bersertifikat untuk menjamin kualitas rasa dan nutrisi terbaik bagi keluarga Anda. Kaya akan lemak sehat, vitamin E, dan kalium.',
    rating: 4.9,
    reviewCount: 128,
    soldCount: '500+',
    stock: 'Ready',
    weightOptions: [
      { label: '500g', price: 24500, originalPrice: 32000, discount: '25%' },
      { label: '1kg', price: 48000, originalPrice: 64000, discount: '25%' },
      { label: '2kg', price: 90000, originalPrice: 120000, discount: '25%' }
    ]
  },
  {
    id: 'prod-strawberry',
    name: 'Organic Strawberry Fresh',
    slug: 'organic-strawberry-fresh',
    price: 32000,
    originalPrice: 40000,
    discount: '20%',
    unit: '1 pack (250g)',
    badge: 'ORGANIK',
    badgeColor: 'bg-[#D6E9BE] text-[#111F05]',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1439205520-08c2c25f3f28?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Buah-buahan',
    categorySlug: 'buah',
    description: 'Stroberi organik segar dipetik langsung dari kebun dataran tinggi. Manis alami tanpa pestisida, kaya antioksidan, vitamin C, dan serat. Ideal untuk smoothie, dessert, atau camilan sehat.',
    rating: 5.0,
    reviewCount: 94,
    soldCount: '300+',
    stock: 'Ready',
    weightOptions: [
      { label: '250g', price: 32000, originalPrice: 40000, discount: '20%' },
      { label: '500g', price: 60000, originalPrice: 75000, discount: '20%' },
    ]
  },
  {
    id: 'prod-banana',
    name: 'Pisang Cavendish Organik',
    slug: 'pisang-cavendish-organik',
    price: 18500,
    unit: '1 Sisir (±1kg)',
    badge: '',
    badgeColor: '',
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Buah-buahan',
    categorySlug: 'buah',
    description: 'Pisang Cavendish organik lokal dari perkebunan Jawa Barat. Manis alami, kaya potasium dan energi. Baik untuk sarapan, pre-workout, atau MPASI bayi.',
    rating: 4.7,
    reviewCount: 67,
    soldCount: '400+',
    stock: 'Ready',
  },
  // ─── Sayuran ───
  {
    id: 'prod-kale',
    name: 'Kale Organik Premium',
    slug: 'kale-organik-premium',
    price: 24500,
    unit: 'Per 250 gram',
    badge: 'ORGANIK',
    badgeColor: 'bg-[#D6E9BE] text-[#111F05]',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Sayuran Segar',
    categorySlug: 'sayur',
    description: 'Kale hijau organik kualitas premium, segar dipetik pagi hari. Superfood tinggi vitamin K, C, A, dan mineral penting. Cocok untuk smoothie green, salad, atau dikukus.',
    rating: 4.8,
    reviewCount: 81,
    soldCount: '600+',
    stock: 'Ready',
  },
  {
    id: 'prod-tomato',
    name: 'Tomat Cherry Merah',
    slug: 'tomat-cherry-merah',
    price: 32000,
    originalPrice: 38000,
    discount: '16%',
    unit: 'Per 500 gram',
    badge: 'BEST SELLER',
    badgeColor: 'bg-[#FFDDBB] text-[#2B1700]',
    isOrganic: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Sayuran Segar',
    categorySlug: 'sayur',
    description: 'Tomat cherry merah segar, manis dengan sedikit asam segar. Kaya lycopene, vitamin C, dan antioksidan. Ideal untuk salad, pasta, atau dikonsumsi langsung.',
    rating: 4.6,
    reviewCount: 112,
    soldCount: '800+',
    stock: 'Ready',
  },
  {
    id: 'prod-carrot',
    name: 'Wortel Baby Lokal',
    slug: 'wortel-baby-lokal',
    price: 12000,
    unit: 'Per 500 gram',
    badge: '',
    badgeColor: '',
    isOrganic: false,
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Sayuran Segar',
    categorySlug: 'sayur',
    description: 'Wortel baby lokal segar, renyah, dan manis alami. Kaya beta-karoten dan vitamin A yang baik untuk kesehatan mata. Bisa dikonsumsi mentah sebagai camilan atau dimasak.',
    rating: 4.5,
    reviewCount: 43,
    soldCount: '350+',
    stock: 'Ready',
  },
  {
    id: 'prod-salad',
    name: 'Garden Mix Salad Bag',
    slug: 'garden-mix-salad-bag',
    price: 28900,
    unit: 'Porsi 2 Orang',
    badge: 'READY TO EAT',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: false,
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Sayuran Segar',
    categorySlug: 'sayur',
    description: 'Campuran sayuran salad segar ready-to-eat. Berisi selada merah, rucola, bayam muda, radicchio, dan edible flowers. Sudah dicuci bersih dan siap disantap dengan dressing pilihan.',
    rating: 4.8,
    reviewCount: 55,
    soldCount: '250+',
    stock: 'Ready',
  },
  // ─── Snack Sehat ───
  {
    id: 'prod-almond',
    name: 'Kacang Almond Panggang Organik',
    slug: 'kacang-almond-panggang-organik',
    price: 59000,
    unit: '250g',
    badge: 'PREMIUM',
    badgeColor: 'bg-[#FFDDBB] text-[#2B1700]',
    isOrganic: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Snack Sehat',
    categorySlug: 'snack',
    description: 'Kacang Almond panggang utuh pilihan tanpa garam tambahan. Sangat tinggi serat, lemak baik (omega-3), dan protein. Camilan ideal untuk diet sehat Anda.',
    rating: 4.9,
    reviewCount: 203,
    soldCount: '1200+',
    stock: 'Ready',
  },
  {
    id: 'prod-granola',
    name: 'Granola Bites Cokelat Pisang',
    slug: 'granola-bites-cokelat-pisang',
    price: 32500,
    unit: '125g',
    badge: '',
    badgeColor: '',
    isOrganic: false,
    images: [
      'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Snack Sehat',
    categorySlug: 'snack',
    description: 'Kombinasi gandum panggang renyah, pisang kering manis alami, dan cokelat hitam premium. Dikemas dalam ukuran sekali makan yang praktis.',
    rating: 4.6,
    reviewCount: 78,
    soldCount: '500+',
    stock: 'Ready',
  },
  // ─── Minuman Sehat ───
  {
    id: 'prod-greenjuice',
    name: 'Cold-Pressed Green Detox Juice',
    slug: 'cold-pressed-green-detox-juice',
    price: 35000,
    unit: '250ml',
    badge: 'COLD PRESSED',
    badgeColor: 'bg-emerald-100 text-emerald-800',
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Minuman Sehat',
    categorySlug: 'minuman',
    description: 'Jus peras dingin harian yang terbuat dari kale segar, bayam organik, apel hijau, timun, lemon, dan jahe. Tanpa tambahan air maupun gula.',
    rating: 4.7,
    reviewCount: 136,
    soldCount: '700+',
    stock: 'Ready',
  },
  {
    id: 'prod-kombucha',
    name: 'Kombucha Wild Berries',
    slug: 'kombucha-wild-berries',
    price: 28000,
    unit: '330ml',
    badge: 'PROBIOTIK',
    badgeColor: 'bg-purple-100 text-purple-800',
    isOrganic: false,
    images: [
      'https://images.unsplash.com/photo-1598214886806-c87b2a370944?w=800&auto=format&fit=crop&q=80',
    ],
    category: 'Minuman Sehat',
    categorySlug: 'minuman',
    description: 'Minuman probiotik alami hasil fermentasi teh hitam organik dengan buah berry liar segar. Membantu menyehatkan pencernaan dan meningkatkan imun tubuh.',
    rating: 4.5,
    reviewCount: 89,
    soldCount: '400+',
    stock: 'Ready',
  },
]

// Lookup product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}
