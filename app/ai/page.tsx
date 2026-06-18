'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  RotateCcw, 
  MoreVertical, 
  Sparkles, 
  Coffee, 
  Leaf, 
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface Message {
  sender: 'ai' | 'user'
  text: string
  time: string
  productSuggestion?: {
    name: string
    description: string
    price: number
    image: string
    link: string
  }
}

const PRESET_RESPONSES: Record<string, { text: string; product?: any }> = {
  default: {
    text: "Tentu! Saya menyarankan untuk makan siang yang ringan namun mengenyangkan. Bagaimana dengan salad organik segar dari kebun kami?",
    product: {
      name: "Kale Organik Premium",
      description: "Kale organik super segar dipanen langsung dari petani lokal.",
      price: 24500,
      image: "https://images.unsplash.com/photo-1628773822201-556b89695027?w=600&auto=format&fit=crop&q=80",
      link: "/kategori"
    }
  },
  "what's healthy today? i'm looking for something light for lunch.": {
    text: "Berdasarkan preferensi Anda untuk makan siang yang ringan, saya sangat merekomendasikan Salad Kale Organik Segar. Kale kami baru saja dipanen pagi ini dari kebun regeneratif lokal.",
    product: {
      name: "Kale Organik Premium",
      description: "Kale segar kaya nutrisi, dipanen pagi hari.",
      price: 24500,
      image: "https://images.unsplash.com/photo-1628773822201-556b89695027?w=600&auto=format&fit=crop&q=80",
      link: "/kategori"
    }
  },
  "help me find organic kale": {
    text: "Tentu! Kami memiliki Kale Organik Premium kualitas terbaik dari kebun lokal. Tinggi vitamin K, serat, dan antioksidan.",
    product: {
      name: "Kale Organik Premium",
      description: "Kualitas organik premium bebas pestisida.",
      price: 24500,
      image: "https://images.unsplash.com/photo-1628773822201-556b89695027?w=600&auto=format&fit=crop&q=80",
      link: "/kategori"
    }
  },
  "high-protein snacks": {
    text: "Untuk camilan berprotein tinggi, Anda bisa mencoba Kacang Almond Panggang Organik kami. Tanpa tambahan garam, sangat baik untuk energi harian.",
    product: {
      name: "Kacang Almond Panggang Organik 250g",
      description: "Almond panggang renyah kaya lemak baik dan protein.",
      price: 59000,
      image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=80",
      link: "/kategori"
    }
  },
  "vegan recipes": {
    text: "Ini resep vegan cepat: Alpukat Mentega Jumbo dengan salad tomat cherry manis segar. Lezat, sehat, dan penuh lemak baik yang menyehatkan jantung.",
    product: {
      name: "Alpukat Mentega Jumbo",
      description: "Alpukat mentega super lembut isi 2-3 buah.",
      price: 45000,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
      link: "/kategori"
    }
  }
}

export default function AiChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Halo! I'm your Groceria AI guide. I'm here to help you find the freshest organic produce and plan meals that fuel your vitality. How can I help you nourish your body today?",
      time: '09:41 AM'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const formatTime = () => {
    const date = new Date()
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`
  }

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: formatTime()
    }
    
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const lowerQuery = textToSend.toLowerCase().trim()
      const matched = PRESET_RESPONSES[lowerQuery] || PRESET_RESPONSES['default']
      
      const aiMsg: Message = {
        sender: 'ai',
        text: matched.text,
        time: formatTime(),
        productSuggestion: matched.product
      }

      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1200)
  }

  const suggestionPills = [
    "What's healthy today?",
    "Help me find organic kale",
    "High-protein snacks",
    "Vegan recipes"
  ]

  const recents = [
    { text: "High protein breakfast idea", icon: <Coffee size={14} className="text-[#154212]" /> },
    { text: "Seasonal greens in Jakarta", icon: <Leaf size={14} className="text-gray-500" /> }
  ]

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-gray-800 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sidebar - Desktop Only */}
            <div className="hidden lg:block space-y-6">
              
              {/* Profile Card */}
              <div className="bg-[#F5F3EE] rounded-2xl p-5 border border-[#C2C9BB]/30">
                <h3 className="text-lg font-black text-[#154212] mb-2">VERA AI</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  Your personal health-conscious assistant for fresh, organic discoveries.
                </p>
                
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 tracking-wider uppercase mb-3">
                    RECENT CONSULTATIONS
                  </h4>
                  <div className="space-y-2">
                    {recents.map((recent, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(recent.text)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#E4E2DD] hover:bg-[#dcdad5] transition-all rounded-xl text-left text-xs font-bold text-gray-800"
                      >
                        {recent.icon}
                        <span className="truncate">{recent.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Promo / Today's Vitality Card */}
              <div className="bg-[#2D5A27] text-[#9DD090] rounded-2xl p-6 space-y-4 shadow-md">
                <h3 className="text-lg font-black text-[#9DD090] flex items-center gap-2">
                  <Sparkles size={18} /> Today's Vitality
                </h3>
                <p className="text-xs leading-relaxed text-[#BCF0AE]/90">
                  Your personal health-conscious assistant for fresh, organic discoveries.
                </p>
                <Link
                  href="/kategori"
                  className="inline-flex items-center gap-2 bg-[#BCF0AE] hover:bg-[#aee69f] text-[#002201] text-xs font-black tracking-widest px-4 py-2 rounded-full transition-all"
                >
                  LEARN MORE <ArrowRight size={14} />
                </Link>
              </div>

            </div>

            {/* Chatbot Area */}
            <div className="lg:col-span-3 flex flex-col bg-white rounded-3xl border border-[#C2C9BB]/30 shadow-sm overflow-hidden h-[600px]">
              
              {/* Chat Header */}
              <div className="bg-[#FBF9F4] border-b border-[#C2C9BB]/30 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#154212] text-white p-2.5 rounded-full flex items-center justify-center">
                    <Bot size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-[#154212]">VERA AI</h2>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                      <span className="w-1.5 h-1.5 bg-[#154212] rounded-full animate-pulse"></span>
                      Ready to assist
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400">
                  <button 
                    onClick={() => {
                      setMessages([
                        {
                          sender: 'ai',
                          text: "Halo! I'm your Groceria AI guide. I'm here to help you find the freshest organic produce and plan meals that fuel your vitality. How can I help you nourish your body today?",
                          time: '09:41 AM'
                        }
                      ])
                    }}
                    title="Mulai Ulang Chat" 
                    className="p-2 hover:bg-[#F5F3EE] hover:text-gray-600 rounded-full transition-all"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button className="p-2 hover:bg-[#F5F3EE] hover:text-gray-600 rounded-full transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Content (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                {messages.map((msg, index) => {
                  const isAi = msg.sender === 'ai'
                  return (
                    <div key={index} className={`flex items-start gap-3 ${isAi ? '' : 'justify-end'}`}>
                      {/* Avatar for AI */}
                      {isAi && (
                        <div className="bg-[#BCF0AE] text-[#2D5A27] p-2 rounded-full flex-shrink-0">
                          <Bot size={16} />
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div className={`max-w-[80%] flex flex-col space-y-1.5 ${isAi ? '' : 'items-end'}`}>
                        <div className={`rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
                          isAi 
                            ? 'bg-[#EAE8E3] text-[#1B1C19] rounded-tl-none' 
                            : 'bg-[#154212] text-white rounded-tr-none'
                        }`}>
                          <p>{msg.text}</p>

                          {/* Inline product recommendation if available */}
                          {msg.productSuggestion && (
                            <div className="mt-4 bg-[#FBF9F4] rounded-xl border border-[#C2C9BB]/30 p-3.5 flex items-center gap-4 text-gray-800 shadow-inner">
                              <div className="relative w-16 h-16 bg-[#F5F3EE] rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={msg.productSuggestion.image}
                                  alt={msg.productSuggestion.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-extrabold text-sm text-[#1B1C19] truncate">
                                  {msg.productSuggestion.name}
                                </h4>
                                <p className="text-[10px] text-gray-500 line-clamp-1 mb-1.5">
                                  {msg.productSuggestion.description}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-black text-[#154212]">
                                    Rp {msg.productSuggestion.price.toLocaleString('id-ID')}
                                  </span>
                                  <Link
                                    href={msg.productSuggestion.link}
                                    className="text-[10px] font-black text-white bg-[#154212] px-3 py-1 rounded-full hover:bg-[#205421] transition-all"
                                  >
                                    Beli Sekarang
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <span className="text-[9px] text-gray-400 font-bold px-1">
                          {msg.time}
                        </span>
                      </div>

                      {/* Avatar for User */}
                      {!isAi && (
                        <div className="bg-[#FFAD4A] text-[#704200] p-2 rounded-full flex-shrink-0">
                          <User size={16} />
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#BCF0AE] text-[#2D5A27] p-2 rounded-full flex-shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="bg-[#EAE8E3] text-gray-500 rounded-2xl rounded-tl-none px-5 py-3.5 shadow-sm text-sm">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Pills */}
              <div className="px-6 py-2 border-t border-[#C2C9BB]/20 overflow-x-auto flex gap-2 scrollbar-none bg-white">
                {suggestionPills.map((pill) => (
                  <button
                    key={pill}
                    onClick={() => handleSend(pill)}
                    className="flex-shrink-0 border border-[#C2C9BB] hover:border-[#154212] hover:bg-[#154212]/5 text-[#1B1C19] text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-white border-t border-[#C2C9BB]/30 flex items-center gap-3">
                <div className="flex-1 bg-[#F5F3EE] rounded-full px-4 py-2 border border-[#C2C9BB]/30 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                    placeholder="Ask Groceria AI about nutrition, products..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <button title="Gunakan Suara" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Mic size={18} />
                  </button>
                </div>

                <button
                  onClick={() => handleSend(inputText)}
                  className="bg-[#154212] hover:bg-[#205421] text-[#BCF0AE] px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Ask</span>
                  <Send size={14} className="text-[#BCF0AE]" />
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
