'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingCart, MapPin, Bell, User, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const cartCount = useCartStore((s) => s.totalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkBg = pathname === '/'

  const navLinks = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/kategori', label: 'Categories', active: pathname?.startsWith('/kategori') },
    { href: '/ai', label: 'AI', active: pathname === '/ai' },
  ]

  // Styles dynamic variables
  const navBg = isDarkBg ? 'bg-[#113E21] text-white' : 'bg-[#FBF9F4] text-[#113E21] border-b border-[#C2C9BB]/30'
  const logoColor = isDarkBg ? 'text-[#f4b844]' : 'text-[#113E21]'
  const linkActiveColor = isDarkBg ? 'text-[#f4b844]' : 'text-[#113E21]'
  const linkInactiveColor = isDarkBg ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-[#113E21]'
  const underlineColor = isDarkBg ? 'bg-[#f4b844]' : 'bg-[#113E21]'
  const iconColor = isDarkBg ? 'text-white hover:text-[#f4b844]' : 'text-[#113E21] hover:text-[#f4b844]'
  const cartBtnClass = isDarkBg 
    ? 'bg-white text-[#113E21] hover:bg-gray-100 shadow-md' 
    : 'bg-white text-[#113E21] border border-[#C2C9BB] hover:bg-gray-50 shadow-sm'

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg} py-5 sm:py-6`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`text-xl sm:text-2xl font-black tracking-wider ${logoColor} inline-block`}
            >
              GROCERIA
            </motion.span>
          </Link>

          {/* Center Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm sm:text-base font-bold transition-colors relative py-1 ${
                  link.active ? linkActiveColor : linkInactiveColor
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {link.active && (
                  <motion.span
                    layoutId="activeUnderline"
                    className={`absolute bottom-0 left-0 w-full h-[2px] ${underlineColor} rounded-full`}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/lokasi" title="Location" className={`p-1 ${iconColor} transition-colors`}>
              <motion.div
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <MapPin size={20} />
              </motion.div>
            </Link>
            <Link href="/notifikasi" title="Notifications" className={`p-1 ${iconColor} transition-colors`}>
              <motion.div
                whileHover={{ scale: 1.15, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={20} />
              </motion.div>
            </Link>
            <Link href="/profile" title="Account" className={`p-1 ${iconColor} transition-colors`}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <User size={20} />
              </motion.div>
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all ${cartBtnClass}`}
            >
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={16} />
                <span>Cart</span>
                {mounted && cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-[#f4b844] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-1 ${isDarkBg ? 'text-white' : 'text-[#113E21]'} hover:text-[#f4b844] transition-colors`}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-1 overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    link.active
                      ? 'text-[#f4b844] bg-white/5'
                      : isDarkBg
                        ? 'text-white hover:text-[#f4b844] hover:bg-white/5'
                        : 'text-gray-700 hover:text-[#113E21] hover:bg-[#113E21]/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

