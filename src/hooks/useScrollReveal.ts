'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  y?: number           // distance to travel (default 32)
  opacity?: boolean    // fade in (default true)
  delay?: number       // delay in seconds (default 0)
  duration?: number    // duration in seconds (default 0.75)
  stagger?: number     // if ref is a container, stagger children by this amount
  threshold?: number   // IntersectionObserver threshold (default 0.15)
}

// Lightweight scroll reveal without GSAP
// Use this for simple reveals. Use GSAP directly for complex sequences.
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    y = 32,
    opacity = true,
    delay = 0,
    duration = 0.75,
    threshold = 0.15,
  } = options

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.transform = `translateY(${y}px)`
    if (opacity) el.style.opacity = '0'
    el.style.transition = `transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, opacity ${duration}s ease ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'translateY(0)'
          if (opacity) el.style.opacity = '1'
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
