'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Bell, 
  CheckCheck, 
  ShoppingBag, 
  Tag, 
  Info, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Sparkles,
  ChevronRight,
  Check
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface NotificationItem {
  id: string
  category: 'orders' | 'promo' | 'info'
  title: string
  time: string
  content: string
  unread: boolean
  actionText?: string
  actionUrl?: string
  image?: string
}

export default function NotifikasiPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'orders' | 'promo' | 'info'>('all')
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      category: 'orders',
      title: 'Your Order Is On Its Way',
      time: 'Just now',
      content: 'Our courier is currently delivering your fresh groceries. Please ensure someone is available at the delivery address to receive the package.',
      unread: true,
      actionText: 'Track Order',
      actionUrl: '/profile/pesanan'
    },
    {
      id: 'notif-2',
      category: 'orders',
      title: 'Payment Confirmed',
      time: '2 hours ago',
      content: 'Thank you! Your payment for order #GRC8821 has been successfully confirmed by our system.',
      unread: false
    },
    {
      id: 'notif-3',
      category: 'promo',
      title: 'Flash Sale: 50% Off Organic Vegetables',
      time: '5 hours ago',
      content: 'Today only! Get half-price discounts on all fresh green vegetable categories sourced directly from our trusted farming partners.',
      unread: false,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'notif-4',
      category: 'info',
      title: 'Privacy Policy Update',
      time: '1 day ago',
      content: 'We have updated our privacy policy to provide greater transparency regarding your data.',
      unread: false
    }
  ])

  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
    setToastMessage('All notifications marked as read')
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleItemClick = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n))
  }

  // Count unread notifications
  const totalUnread = notifications.filter(n => n.unread).length
  const ordersCount = notifications.filter(n => n.category === 'orders').length
  const promoCount = notifications.filter(n => n.category === 'promo').length
  const infoCount = notifications.filter(n => n.category === 'info').length

  // Filtered list
  const filteredNotifications = notifications.filter(n => 
    activeCategory === 'all' ? true : n.category === activeCategory
  )

  return (
    <div className="min-h-screen bg-[#FBF9F4] flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow">
        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-24 right-8 bg-[#D1E8CF] border border-[#2D5A27] text-[#154212] px-4 py-3 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 z-50 animate-fade-in">
              <Check size={16} />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Section */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#C2C9BB]/30 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#154212] tracking-tight flex items-center gap-2">
                <Bell size={24} className="text-[#2D5A27]" />
                Notifications
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">
                Stay updated with the latest orders and promotions from Groceria.
              </p>
            </div>

            {totalUnread > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-gray-50 border border-[#2D5A27] text-[#2D5A27] px-5 py-2.5 rounded-full text-xs font-extrabold transition-all"
              >
                <CheckCheck size={16} />
                Mark All as Read
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Aside - Category Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 border border-[#C2C9BB]/30 shadow-sm space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block px-4 py-2">
                  Category
                </span>

                {/* All */}
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[#2D5A27] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Bell size={16} />
                    <span>All</span>
                  </div>
                  {totalUnread > 0 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeCategory === 'all' ? 'bg-[#BCF0AE] text-[#154212]' : 'bg-[#BA1A1A] text-white'
                    }`}>
                      {totalUnread}
                    </span>
                  )}
                </button>

                {/* Orders */}
                <button
                  onClick={() => setActiveCategory('orders')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                    activeCategory === 'orders'
                      ? 'bg-[#2D5A27] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag size={16} />
                    <span>Orders</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{ordersCount}</span>
                </button>

                {/* Promo */}
                <button
                  onClick={() => setActiveCategory('promo')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                    activeCategory === 'promo'
                      ? 'bg-[#2D5A27] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Tag size={16} />
                    <span>Promotions</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{promoCount}</span>
                </button>

                {/* Info */}
                <button
                  onClick={() => setActiveCategory('info')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                    activeCategory === 'info'
                      ? 'bg-[#2D5A27] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Info size={16} />
                    <span>Information</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">{infoCount}</span>
                </button>
              </div>

              {/* Promotional Plus Banner */}
              <div className="bg-[#455535] text-white rounded-2xl p-5 relative overflow-hidden border border-[#BCF0AE]/20 min-h-[180px] flex flex-col justify-between">
                <div className="absolute right-0 top-0 w-20 h-20 bg-[#BCF0AE]/10 rounded-full blur-xl"></div>
                
                <span className="text-[#BCF0AE] text-[10px] font-black uppercase tracking-widest block">
                  Subscribe Plus
                </span>
                
                <p className="text-sm font-extrabold text-[#B6C9A0] mt-2 leading-relaxed">
                  Enjoy unlimited free delivery every day.
                </p>

                <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-xl text-xs font-extrabold transition-all mt-4 w-full flex items-center justify-center gap-1">
                  Try Now
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Notification List Panel */}
            <div className="lg:col-span-3 space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleItemClick(notif.id)}
                    className={`bg-white rounded-2xl p-5 border transition-all relative ${
                      notif.unread 
                        ? 'border-[#2D5A27] shadow-sm' 
                        : 'border-[#C2C9BB]/30 hover:border-gray-300'
                    }`}
                  >
                    {/* Unread Indicator Dot */}
                    {notif.unread && (
                      <span className="absolute top-5 right-5 w-2 h-2 bg-[#2D5A27] rounded-full"></span>
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notif.category === 'orders'
                          ? 'bg-[#EAE8E3] text-gray-700'
                          : notif.category === 'promo'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                      }`}>
                        {notif.category === 'orders' ? (
                          <ShoppingBag size={20} />
                        ) : notif.category === 'promo' ? (
                          <Tag size={20} />
                        ) : (
                          <Info size={20} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-2 flex-grow min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className={`text-sm font-black truncate leading-tight ${
                            notif.unread ? 'text-[#154212]' : 'text-gray-900'
                          }`}>
                            {notif.title}
                          </h3>
                          <span className="text-[10px] text-gray-400 font-bold sm:flex-shrink-0">{notif.time}</span>
                        </div>

                        <p className="text-xs text-gray-500 font-medium leading-relaxed">
                          {notif.content}
                        </p>

                        {/* Promo image banner if available */}
                        {notif.image && (
                          <div className="relative h-40 w-full rounded-xl overflow-hidden mt-3 border border-gray-100">
                            <Image
                              src={notif.image}
                              alt={notif.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Action buttons if available */}
                        {notif.actionText && notif.actionUrl && (
                          <div className="pt-2">
                            <Link
                              href={notif.actionUrl}
                              className="inline-flex items-center gap-1 text-xs font-black text-[#2D5A27] hover:text-[#1C3B18] transition-all"
                            >
                              <span>{notif.actionText}</span>
                              <ChevronRight size={14} className="stroke-[2.5]" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#C2C9BB]/30">
                  <Bell className="mx-auto text-gray-300 mb-4 stroke-[1.5]" size={48} />
                  <h3 className="font-extrabold text-gray-800 text-sm">No Notifications</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    All new notifications for this category will appear here.
                  </p>
                </div>
              )}

              {/* Load More Button */}
              {filteredNotifications.length > 0 && (
                <button className="w-full text-center py-3 text-xs font-extrabold text-gray-700 hover:text-gray-950 transition-all bg-[#EAE8E3] rounded-xl hover:bg-gray-300">
                  View Older Notifications
                </button>
              )}
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
