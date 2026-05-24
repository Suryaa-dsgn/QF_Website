'use client'

import { useEffect } from 'react'
import type Lenis from '@studio-freight/lenis'

let lenisInstance: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    // Only runs on client. Guard against SSR.
    if (typeof window === 'undefined') return

    const initLenis = async () => {
      const LenisModule = await import('@studio-freight/lenis')
      const LenisClass = LenisModule.default

      lenisInstance = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      })
      ;(window as any).__lenis = lenisInstance

      // Integrate with GSAP ScrollTrigger if GSAP is loaded
      const tryConnectGSAP = async () => {
        try {
          const { gsap } = await import('gsap')
          const { ScrollTrigger } = await import('gsap/ScrollTrigger')
          gsap.registerPlugin(ScrollTrigger)
          lenisInstance?.on('scroll', ScrollTrigger.update)
          gsap.ticker.add((time) => lenisInstance?.raf(time * 1000))
          gsap.ticker.lagSmoothing(0)
        } catch {
          // GSAP not available, run Lenis standalone
          function raf(time: number) {
            lenisInstance?.raf(time)
            requestAnimationFrame(raf)
          }
          requestAnimationFrame(raf)
        }
      }

      tryConnectGSAP()
    }

    initLenis()

    return () => {
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [])
}
