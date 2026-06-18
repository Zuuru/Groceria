'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Search, 
  Paperclip, 
  Mic, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  ArrowLeft,
  Check,
  CheckCheck,
  ShoppingCart
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface Message {
  id: string
  sender: 'buyer' | 'seller'
  text: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
  productPreview?: {
    name: string
    price: string
    image: string
  }
}

interface Chat {
  id: string
  name: string
  avatar: string
  status: 'ONLINE' | 'OFFLINE'
  lastActive: string
  unreadCount: number
  messages: Message[]
  isTyping?: boolean
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'fresh-meadows',
      name: 'Fresh Meadows Farm',
      avatar: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&auto=format&fit=crop&q=80',
      status: 'ONLINE',
      lastActive: '10:45 AM',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-1',
          sender: 'buyer',
          text: 'Hello! Is this avocado set still available? And are they ripe for today?',
          time: '10:42 AM',
          status: 'read',
          productPreview: {
            name: 'Premium Organic Avocado (3pcs)',
            price: '$4.50',
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&auto=format&fit=crop&q=80'
          }
        },
        {
          id: 'msg-2',
          sender: 'seller',
          text: 'Yes, the Organic Avocados are in stock! We just received a fresh batch this morning. They are perfectly ripe and ready to eat today.',
          time: '10:45 AM'
        }
      ]
    },
    {
      id: 'artisan-bakery',
      name: 'Artisan Bakery Co.',
      avatar: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80',
      status: 'OFFLINE',
      lastActive: 'Yesterday',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-3',
          sender: 'seller',
          text: 'Your order #1204 has been picked up.',
          time: 'Yesterday'
        }
      ]
    },
    {
      id: 'global-flavors',
      name: 'Global Flavors',
      avatar: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&auto=format&fit=crop&q=80',
      status: 'OFFLINE',
      lastActive: 'Feb 20',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-4',
          sender: 'seller',
          text: 'Thank you for shopping with us!',
          time: 'Feb 20'
        }
      ]
    }
  ])

  const [activeChatId, setActiveChatId] = useState<string>('fresh-meadows')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [inputMessage, setInputMessage] = useState<string>('')
  const [isMobileView, setIsMobileView] = useState<boolean>(false)
  const [mobileShowDetail, setMobileShowDetail] = useState<boolean>(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, activeChatId])

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const now = new Date()
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      text: inputMessage,
      time: timeString,
      status: 'sent'
    }

    // Add message
    setChats(prevChats => prevChats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          lastActive: timeString,
          messages: [...c.messages, newMessage]
        }
      }
      return c
    }))

    setInputMessage('')

    // Mock seller auto-typing and response
    setTimeout(() => {
      setChats(prevChats => prevChats.map(c => {
        if (c.id === activeChatId) {
          return { ...c, isTyping: true }
        }
        return c
      }))
    }, 1000)

    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const sellerResponse: Message = {
        id: `msg-seller-${Date.now()}`,
        sender: 'seller',
        text: 'Thank you for contacting us! Your order or inquiry will be processed by our support team shortly. Please stand by.',
        time: responseTime
      }

      setChats(prevChats => prevChats.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            isTyping: false,
            lastActive: responseTime,
            messages: [...c.messages, sellerResponse]
          }
        }
        return c
      }))
    }, 3000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F4]">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {/* Main Bento Chat Container */}
        <div className="flex-grow bg-white rounded-2xl border border-[#C2C9BB]/30 shadow-sm overflow-hidden flex min-h-[600px] max-h-[750px] relative">
          
          {/* SIDEBAR: CHAT LIST */}
          <div className={`${
            isMobileView && mobileShowDetail ? 'hidden' : 'flex'
          } w-full md:w-80 flex-col border-r border-[#C2C9BB]/30 bg-white flex-shrink-0`}>
            
            {/* Header */}
            <div className="p-4 border-b border-[#C2C9BB]/10 space-y-3">
              <h1 className="text-xl font-black text-[#154212]">Messages</h1>
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F0EEE9] focus:bg-[#EAE8E3] border-0 focus:ring-1 focus:ring-[#154212] rounded-full pl-10 pr-4 py-2 text-xs font-semibold focus:outline-none transition-all"
                />
                <Search size={14} className="absolute left-3.5 top-3 text-[#72796E]" />
              </div>
            </div>

            {/* Chat List Scrollable */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filteredChats.map((chat) => {
                const isActive = chat.id === activeChatId
                const lastMessage = chat.messages[chat.messages.length - 1]
                
                return (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id)
                      if (isMobileView) setMobileShowDetail(true)
                    }}
                    className={`w-full text-left p-4 flex gap-3 items-center transition-all ${
                      isActive 
                        ? 'bg-[#A1D494]/30 border-l-4 border-[#154212]' 
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#F5F3EE] flex-shrink-0">
                      <Image
                        src={chat.avatar}
                        alt={chat.name}
                        fill
                        className="object-cover"
                      />
                      {chat.status === 'ONLINE' && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full"></span>
                      )}
                    </div>

                    {/* Chat Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-extrabold text-[#1B1C19] text-xs sm:text-sm truncate">
                          {chat.name}
                        </h3>
                        <span className="text-[10px] text-[#72796E] font-medium ml-2 flex-shrink-0">
                          {chat.lastActive}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${isActive ? 'text-[#154212] font-semibold' : 'text-[#72796E]'}`}>
                        {lastMessage ? lastMessage.text : 'No messages yet'}
                      </p>
                    </div>
                  </button>
                )
              })}

              {filteredChats.length === 0 && (
                <div className="p-8 text-center text-[#72796E] text-xs">
                  No chats found.
                </div>
              )}
            </div>
          </div>

          {/* MAIN CHAT AREA */}
          <div className={`${
            isMobileView && !mobileShowDetail ? 'hidden' : 'flex'
          } flex-grow flex flex-col bg-[#FBF9F4]`}>
            
            {/* Chat Area Header */}
            <div className="p-4 bg-white border-b border-[#C2C9BB]/30 flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center gap-3">
                {isMobileView && (
                  <button 
                    onClick={() => setMobileShowDetail(false)}
                    className="p-1 rounded-full hover:bg-gray-100 text-[#72796E] mr-1"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}

                {/* Partner Avatar */}
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F5F3EE] flex-shrink-0">
                  <Image
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Partner Info */}
                <div>
                  <h2 className="font-extrabold text-[#154212] text-sm sm:text-base leading-snug">
                    {activeChat.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${
                      activeChat.status === 'ONLINE' ? 'bg-[#22C55E]' : 'bg-gray-400'
                    }`}></span>
                    <span className="text-[10px] text-[#72796E] font-bold uppercase tracking-wider">
                      {activeChat.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call/Options Icons */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-gray-100 text-[#72796E] transition-colors" title="Call">
                  <Phone size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-[#72796E] transition-colors" title="Video Call">
                  <Video size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-[#72796E] transition-colors" title="More options">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Chat Content Scroll */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Date Separator */}
              <div className="flex justify-center my-4">
                <span className="bg-[#F0EEE9] text-[#42493E] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Today
                </span>
              </div>

              {/* Message List */}
              {activeChat.messages.map((msg) => {
                const isBuyer = msg.sender === 'buyer'
                return (
                  <div 
                    key={msg.id}
                    className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'} max-w-lg ${
                      isBuyer ? 'ml-auto' : 'mr-auto'
                    } space-y-1`}
                  >
                    {/* Product Preview inside Chat */}
                    {msg.productPreview && (
                      <div className="bg-white border border-[#C2C9BB]/30 rounded-xl overflow-hidden shadow-sm max-w-xs flex items-center p-3 gap-3 mb-1.5 transition-all hover:shadow-md">
                        <div className="relative w-12 h-12 bg-[#F5F3EE] rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={msg.productPreview.image}
                            alt={msg.productPreview.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-[#1B1C19] text-xs truncate">
                            {msg.productPreview.name}
                          </h4>
                          <span className="text-xs font-black text-[#154212]">
                            {msg.productPreview.price}
                          </span>
                        </div>
                        <Link 
                          href="/kategori" 
                          className="p-1.5 bg-gray-50 hover:bg-[#A1D494]/20 rounded-full text-[#72796E] hover:text-[#154212] transition-colors"
                        >
                          <ShoppingCart size={14} />
                        </Link>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isBuyer
                        ? 'bg-[#154212] text-white rounded-tr-none'
                        : 'bg-[#EAE8E3] text-[#1B1C19] rounded-tl-none'
                    }`}>
                      <p>{msg.text}</p>
                    </div>

                    {/* Timestamp & Status */}
                    <div className="flex items-center gap-1 text-[9px] text-[#72796E] font-medium px-1">
                      <span>{msg.time}</span>
                      {isBuyer && (
                        <span>
                          {msg.status === 'read' ? (
                            <CheckCheck size={11} className="text-emerald-500" />
                          ) : msg.status === 'delivered' ? (
                            <CheckCheck size={11} className="text-gray-400" />
                          ) : (
                            <Check size={11} className="text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Seller Typing Indicator */}
              {activeChat.isTyping && (
                <div className="flex flex-col items-start mr-auto space-y-1.5">
                  <div className="flex items-center gap-1 bg-[#EAE8E3] px-4 py-3.5 rounded-2xl rounded-tl-none shadow-sm">
                    <span className="w-2.5 h-2.5 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2.5 h-2.5 bg-[#154212] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-[10px] text-[#72796E] font-bold px-1">
                    Store is typing...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Area Input Footer */}
            <div className="p-4 bg-[#FBF9F4] border-t border-[#C2C9BB]/30 flex gap-3 items-center">
              
              {/* Input Wrapper */}
              <div className="flex-1 bg-[#F5F3EE] border border-[#72796E]/40 hover:border-[#72796E] focus-within:border-[#154212] rounded-2xl px-3 py-1 flex items-center transition-colors">
                
                {/* Paperclip/Attachment Button */}
                <button className="p-2 text-[#42493E] hover:text-[#154212] transition-colors" title="Attach image">
                  <Paperclip size={18} />
                </button>

                {/* Input Textbox */}
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-2 py-2 text-sm text-[#1B1C19]"
                />

                {/* Voice message button */}
                <button className="p-2 text-[#42493E] hover:text-[#154212] transition-colors" title="Record message">
                  <Mic size={18} />
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={`p-3.5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  inputMessage.trim() 
                    ? 'bg-[#154212] hover:bg-[#205c1c] text-white active:scale-95' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title="Send"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
