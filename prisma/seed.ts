import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.review.deleteMany({})
  await prisma.wishlist.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.payment.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.address.deleteMany({})
  await prisma.nutrition.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})

  // Seed categories
  const snackCat = await prisma.category.create({
    data: {
      name: 'Snack Sehat',
      slug: 'snack-sehat',
      description: 'Camilan bergizi tinggi serat, rendah gula, dan tanpa bahan pengawet.',
      image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=60',
    },
  })

  const drinkCat = await prisma.category.create({
    data: {
      name: 'Minuman Sehat',
      slug: 'minuman-sehat',
      description: 'Jus murni, kombucha, teh herbal, susu almon, dan cairan penambah imun tubuh.',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop&q=60',
    },
  })

  const supplementCat = await prisma.category.create({
    data: {
      name: 'Suplemen & Vitamin',
      slug: 'suplemen',
      description: 'Suplemen organik bersertifikasi untuk kebugaran dan stamina harian Anda.',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60',
    },
  })

  const fruitCat = await prisma.category.create({
    data: {
      name: 'Fruit & Vegetable',
      slug: 'fruit-veg',
      description: 'Sayur dan buah segar organik pilihan dipetik langsung dari kebun.',
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=500&auto=format&fit=crop&q=60',
    },
  })

  // Seed products
  // Product 0: Premium Hass Avocado
  const p0 = await prisma.product.create({
    data: {
      name: 'Premium Hass Avocado',
      slug: 'premium-hass-avocado',
      description: 'Alpukat Hass pilihan dengan tekstur super creamy dan mentega. Dipanen langsung dari kebun organik bersertifikat untuk menjamin kualitas rasa dan nutrisi terbaik bagi keluarga Anda.',
      price: 24500,
      stock: 150,
      weight: 500,
      images: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&auto=format&fit=crop&q=80,https://images.unsplash.com/photo-1604000301190-2e57fa503bb2?w=800&auto=format&fit=crop&q=80,https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&auto=format&fit=crop&q=80',
      isFeatured: true,
      categoryId: fruitCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      fiber: 6.7,
      sugar: 0.7,
      sodium: 7,
      servingSize: '100g',
      productId: p0.id,
    },
  })

  // Product 1: Organic Almonds
  const p1 = await prisma.product.create({
    data: {
      name: 'Kacang Almond Panggang Organik 250g',
      slug: 'kacang-almond-panggang-organik-250g',
      description: 'Kacang Almond panggang utuh pilihan tanpa garam tambahan. Sangat tinggi serat, lemak baik (omega-3), dan protein. Camilan ideal untuk diet sehat Anda.',
      price: 59000,
      stock: 120,
      weight: 250,
      images: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      categoryId: snackCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 160,
      protein: 6,
      carbs: 6,
      fat: 14,
      fiber: 3.5,
      sugar: 1,
      sodium: 0,
      servingSize: '28g',
      productId: p1.id,
    },
  })

  // Product 2: Granola Bites
  const p2 = await prisma.product.create({
    data: {
      name: 'Granola Bites Cokelat Pisang 125g',
      slug: 'granola-bites-cokelat-pisang-125g',
      description: 'Kombinasi gandum panggang renyah, pisang kering manis alami, dan cokelat hitam premium. Dikemas dalam ukuran sekali makan yang praktis.',
      price: 32500,
      stock: 85,
      weight: 125,
      images: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      categoryId: snackCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 130,
      protein: 3,
      carbs: 19,
      fat: 5,
      fiber: 2,
      sugar: 5,
      sodium: 45,
      servingSize: '30g',
      productId: p2.id,
    },
  })

  // Product 3: Organic Chia Seeds
  const p3 = await prisma.product.create({
    data: {
      name: 'Superfood Organic Chia Seeds 200g',
      slug: 'superfood-organic-chia-seeds-200g',
      description: 'Chia Seeds organik kualitas super dari Amerika Latin. Kaya akan serat pangan, kalsium, antioksidan, dan omega-3. Sangat cocok sebagai campuran oatmeal, smoothie, atau pudding.',
      price: 45000,
      stock: 150,
      weight: 200,
      images: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      categoryId: supplementCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 138,
      protein: 4.7,
      carbs: 12,
      fat: 8.7,
      fiber: 9.8,
      sugar: 0,
      sodium: 5,
      servingSize: '28g',
      productId: p3.id,
    },
  })

  // Product 4: Cold Pressed Green Juice
  const p4 = await prisma.product.create({
    data: {
      name: 'Cold-Pressed Green Detox Juice 250ml',
      slug: 'cold-pressed-green-detox-juice-250ml',
      description: 'Jus peras dingin harian yang terbuat dari kale segar, bayam organik, apel hijau, timun, lemon, dan jahe. Tanpa tambahan air maupun gula.',
      price: 35000,
      stock: 40,
      weight: 250,
      images: 'https://images.unsplash.com/photo-1610970881699-44a5587caaec?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      categoryId: drinkCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 90,
      protein: 2,
      carbs: 20,
      fat: 0.5,
      fiber: 3,
      sugar: 12,
      sodium: 25,
      servingSize: '250ml',
      productId: p4.id,
    },
  })

  // Product 5: Kombucha Berries
  const p5 = await prisma.product.create({
    data: {
      name: 'Kombucha Teh Fermentasi Wild Berries 330ml',
      slug: 'kombucha-teh-fermentasi-wild-berries-330ml',
      description: 'Minuman probiotik alami hasil fermentasi teh hitam organik dengan buah berry liar segar. Membantu menyehatkan pencernaan dan meningkatkan imun tubuh.',
      price: 28000,
      stock: 60,
      weight: 330,
      images: 'https://images.unsplash.com/photo-1598214886806-c87b2a370944?w=600&auto=format&fit=crop&q=80',
      isFeatured: false,
      categoryId: drinkCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 60,
      protein: 0,
      carbs: 14,
      fat: 0,
      fiber: 0,
      sugar: 10,
      sodium: 10,
      servingSize: '330ml',
      productId: p5.id,
    },
  })

  // Product 6: Raw Forest Honey
  const p6 = await prisma.product.create({
    data: {
      name: 'Madu Hutan Murni Raw Honey 500g',
      slug: 'madu-hutan-murni-raw-honey-500g',
      description: 'Madu hutan liar alami yang dipanen langsung dari sarang lebah Apis Dorsata. Tanpa proses pemanasan atau pasteurisasi, menjaga enzim alami tetap aktif.',
      price: 95000,
      stock: 75,
      weight: 500,
      images: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
      isFeatured: true,
      categoryId: supplementCat.id,
    },
  })

  await prisma.nutrition.create({
    data: {
      calories: 64,
      protein: 0,
      carbs: 17,
      fat: 0,
      fiber: 0,
      sugar: 16,
      sodium: 1,
      servingSize: '21g',
      productId: p6.id,
    },
  })

  console.log('✅ Database berhasil di-seed dengan data makanan sehat premium!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
