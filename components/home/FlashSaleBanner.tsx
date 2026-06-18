'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Target: end of today (midnight) — changes every day so it feels fresh
function getEndOfDay(): Date {
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return end
}

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now())
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1_000)
      setTimeLeft({ h, m, s })
    }
    tick()
    const id = setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

export function FlashSaleBanner() {
  const [target] = useState(() => getEndOfDay())
  const { h, m, s } = useCountdown(target)

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="relative bg-[#113E21] rounded-[40px] overflow-hidden text-white min-h-[360px] flex flex-col justify-center p-8 sm:p-16">
      {/* Background Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-20 md:opacity-100">
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/veggie-splash.png"
            alt="Veggie Splash"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#113E21] via-[#113E21]/70 to-transparent" />
        </div>
      </div>

      {/* Left Content */}
      <div className="relative z-10 max-w-xl space-y-6">
        <span className="bg-[#f4b844] text-[#113E21] font-bold text-xs uppercase px-3 py-1 rounded-full inline-block">
          LIMITED OFFER
        </span>

        <h2 className="text-4xl sm:text-5xl font-black uppercase leading-tight">
          FLASH SALE UP TO <br />
          <span className="text-[#f4b844]">70% OFF</span>
        </h2>

        <p className="text-sm text-gray-300 leading-relaxed font-medium">
          Stock up on your organic favorites this weekend only. Freshness delivered, savings guaranteed.
        </p>

        {/* CTA + Live Countdown */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Link
            href="/kategori"
            className="bg-white hover:bg-gray-100 text-[#113E21] font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105"
          >
            Shop the Sale
          </Link>

          {/* Countdown */}
          <div className="flex gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-[#f4b844] tabular-nums w-[2.5ch]">
                {pad(h)}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hrs</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white/50 leading-none mt-0.5">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-[#f4b844] tabular-nums w-[2.5ch]">
                {pad(m)}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Min</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white/50 leading-none mt-0.5">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-black text-[#f4b844] tabular-nums w-[2.5ch]">
                {pad(s)}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
