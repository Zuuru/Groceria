'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#f3f4f1] text-[#2c3d30] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight text-[#113E21]">GROCE</span>
              <span className="text-2xl font-bold tracking-tight text-[#f4b844]">TO</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              We deliver fresh, high-quality, and 100% organic groceries right to your doorstep. Eating healthy has never been this simple.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-white rounded-full hover:bg-[#113E21] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-[#113E21] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-[#113E21] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2 pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-[#113E21]" />
                <span>Raya Darmo No. 42, Surabaya, ID</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-[#113E21]" />
                <span>+62 (31) 555-0199</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-[#113E21]" />
                <span>support@groceto.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#113E21] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-[#113E21] transition-colors">Home</Link></li>
              <li><a href="#products" className="hover:text-[#113E21] transition-colors">Products</a></li>
              <li><a href="#why-choose-us" className="hover:text-[#113E21] transition-colors">Why Choose Us</a></li>
              <li><a href="#testimonials" className="hover:text-[#113E21] transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#113E21] mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-[#113E21] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#113E21] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#113E21] transition-colors">Delivery Information</a></li>
              <li><a href="#" className="hover:text-[#113E21] transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#113E21] mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get the latest updates, special deals, and healthy recipes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#113E21] focus:border-transparent text-gray-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#113E21] text-white hover:bg-[#1a5530] font-semibold text-sm py-2 px-4 rounded-xl transition-all shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Groceto Organics. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
