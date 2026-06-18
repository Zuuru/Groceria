import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Groceria — Healthy Food E-Commerce",
  description: "Aplikasi e-commerce berbasis Next.js untuk produk makanan sehat, organik, dan bergizi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#fcfdfc] text-[#1c241e] font-sans">
        {children}
      </body>
    </html>
  );
}
