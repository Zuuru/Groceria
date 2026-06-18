'use client'

import React, { useEffect, useRef, useState } from 'react'

type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'fade'

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  duration?: number // in ms
  delay?: number // in ms
  threshold?: number // 0 to 1
  once?: boolean
  className?: string
  as?: keyof React.JSX.IntrinsicElements
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  duration = 800,
  delay = 0,
  threshold = 0.1,
  once = true,
  className = '',
  as: Component = 'div',
}) => {
  // Always start VISIBLE — prevents SSR/hydration blank flashes
  const [isRevealed, setIsRevealed] = useState(true)
  // Controls whether we apply animation styles at all
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Wait 150ms for all children (PerspectiveCarousel, etc.) to finish
    // their own mount effects and re-render with real content, so our
    // getBoundingClientRect() reads the correct final position.
    const timer = setTimeout(() => {
      const currentRef = ref.current
      if (!currentRef) return

      const rect = currentRef.getBoundingClientRect()
      // If ANY part of the element overlaps the viewport, don't animate
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0

      if (alreadyVisible) {
        // Keep revealed, no animation
        setIsRevealed(true)
        return
      }

      // Element is fully below the fold — set up reveal animation
      setShouldAnimate(true)
      setIsRevealed(false)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            if (once) observer.unobserve(currentRef)
          } else if (!once) {
            setIsRevealed(false)
          }
        },
        { threshold }
      )
      observer.observe(currentRef)

      return () => observer.unobserve(currentRef)
    }, 150)

    return () => clearTimeout(timer)
  }, [threshold, once])

  const getRevealStyles = (): React.CSSProperties => {
    if (!shouldAnimate || isRevealed) {
      return { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
    }
    switch (variant) {
      case 'fade-up':
        return { opacity: 0, transform: 'translate3d(0, 40px, 0)' }
      case 'fade-down':
        return { opacity: 0, transform: 'translate3d(0, -40px, 0)' }
      case 'fade-left':
        return { opacity: 0, transform: 'translate3d(80px, 0, 0)' }
      case 'fade-right':
        return { opacity: 0, transform: 'translate3d(-80px, 0, 0)' }
      case 'scale-up':
        return { opacity: 0, transform: 'translate3d(0, 0, 0) scale(0.95)' }
      case 'fade':
      default:
        return { opacity: 0 }
    }
  }

  const style: React.CSSProperties = {
    transitionProperty: shouldAnimate ? 'opacity, transform' : 'none',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDuration: `${duration}ms`,
    // Delay applies when REVEALING (coming into view), not when hiding
    transitionDelay: shouldAnimate && isRevealed ? `${delay}ms` : '0ms',
    willChange: shouldAnimate ? 'transform, opacity' : 'auto',
    ...getRevealStyles(),
  }

  return React.createElement(
    Component,
    { ref: ref as React.Ref<HTMLElement>, style, className },
    children
  )
}
