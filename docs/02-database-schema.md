# 🗄️ Database Schema — Prisma

File: `prisma/schema.prisma`

---

## Setup Koneksi

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## Models

### User & Auth

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  password      String?
  image         String?
  role          Role      @default(CUSTOMER)
  phone         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts  Account[]
  sessions  Session[]
  addresses Address[]
  orders    Order[]
  reviews   Review[]
  wishlist  Wishlist[]
  cart      Cart?
}

enum Role {
  CUSTOMER
  ADMIN
}

// NextAuth models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

### Produk & Kategori

```prisma
model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  image       String?
  createdAt   DateTime  @default(now())

  products Product[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String   @db.Text
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  weight      Float?   // gram
  images      String[] // array URL dari Cloudinary
  isActive    Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])

  nutrition   Nutrition?
  reviews     Review[]
  wishlist    Wishlist[]
  cartItems   CartItem[]
  orderItems  OrderItem[]
}

model Nutrition {
  id          String  @id @default(cuid())
  calories    Float   // kkal per serving
  protein     Float   // gram
  carbs       Float   // gram
  fat         Float   // gram
  fiber       Float?  // gram
  sugar       Float?  // gram
  sodium      Float?  // mg
  servingSize String  // contoh: "100g" atau "1 porsi"

  productId String  @unique
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}
```

---

### Keranjang

```prisma
model Cart {
  id        String     @id @default(cuid())
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt

  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
}

model CartItem {
  id        String  @id @default(cuid())
  quantity  Int     @default(1)

  cartId    String
  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)

  productId String
  product   Product @relation(fields: [productId], references: [id])

  @@unique([cartId, productId])
}
```

---

### Pesanan

```prisma
model Order {
  id          String      @id @default(cuid())
  orderNumber String      @unique @default(cuid())
  status      OrderStatus @default(PENDING)
  totalPrice  Decimal     @db.Decimal(10, 2)
  shippingFee Decimal     @db.Decimal(10, 2) @default(0)
  notes       String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  userId    String
  user      User        @relation(fields: [userId], references: [id])
  addressId String
  address   Address     @relation(fields: [addressId], references: [id])
  items     OrderItem[]
  payment   Payment?
}

enum OrderStatus {
  PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

model OrderItem {
  id        String  @id @default(cuid())
  quantity  Int
  price     Decimal @db.Decimal(10, 2) // harga saat order

  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)

  productId String
  product   Product @relation(fields: [productId], references: [id])
}
```

---

### Pembayaran & Alamat

```prisma
model Payment {
  id            String        @id @default(cuid())
  method        PaymentMethod
  status        PaymentStatus @default(PENDING)
  amount        Decimal       @db.Decimal(10, 2)
  transactionId String?       // dari payment gateway
  paidAt        DateTime?
  createdAt     DateTime      @default(now())

  orderId String @unique
  order   Order  @relation(fields: [orderId], references: [id])
}

enum PaymentMethod {
  BANK_TRANSFER
  CREDIT_CARD
  GOPAY
  OVO
  DANA
  COD
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model Address {
  id           String  @id @default(cuid())
  label        String  // contoh: "Rumah", "Kantor"
  recipientName String
  phone        String
  street       String
  city         String
  province     String
  postalCode   String
  isDefault    Boolean @default(false)

  userId String
  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  orders Order[]
}

model Review {
  id        String   @id @default(cuid())
  rating    Int      // 1-5
  comment   String?
  createdAt DateTime @default(now())

  userId    String
  user      User    @relation(fields: [userId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
}

model Wishlist {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())

  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])

  @@unique([userId, productId])
}
```

---

## Seed Data

File: `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'snack-sehat' },
      update: {},
      create: {
        name: 'Snack Sehat',
        slug: 'snack-sehat',
        description: 'Camilan bergizi rendah gula dan pengawet',
        image: '/images/categories/snack.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'minuman-sehat' },
      update: {},
      create: {
        name: 'Minuman Sehat',
        slug: 'minuman-sehat',
        description: 'Jus, smoothie, teh herbal, dan minuman alami',
        image: '/images/categories/drinks.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'suplemen' },
      update: {},
      create: {
        name: 'Suplemen & Vitamin',
        slug: 'suplemen',
        description: 'Suplemen alami untuk mendukung kesehatan tubuh',
        image: '/images/categories/suplemen.jpg',
      },
    }),
  ])

  console.log('✅ Seed berhasil:', { categories: categories.length })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Tambahkan di `package.json`:
```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

Jalankan seed:
```bash
npx prisma db seed
```
