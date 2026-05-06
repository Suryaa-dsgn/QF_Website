'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

// ─── COUNT-UP STAT ────────────────────────────────────────────────

interface ScopeStatProps {
  value: number
  suffix: string
  descriptor: string
  duration?: number
}

function ScopeStat({ value, suffix, descriptor, duration = 1.8 }: ScopeStatProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const [hasStarted, setHasStarted]     = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)

          // Jump straight to final value if reduced motion is on
          if (prefersReduced) {
            setDisplayValue(value.toString())
            return
          }

          // power2.out count-up — slows near the end like a slot machine
          const startTime   = performance.now()
          const durationMs  = duration * 1000

          function update(currentTime: number) {
            const elapsed  = currentTime - startTime
            const progress = Math.min(elapsed / durationMs, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
            const current  = Math.floor(eased * value)

            setDisplayValue(current.toString())

            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              setDisplayValue(value.toString()) // exact final value
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, value, duration])

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-8">
      {/* Giant Geist Mono number */}
      <div className="text-data-xl text-white leading-none mb-3">
        {displayValue}
        {/* Suffix — smaller, muted */}
        <span className="text-white/40 ml-0.5" style={{ fontSize: '45%' }}>
          {suffix}
        </span>
      </div>

      {/* Descriptor */}
      <p className="text-[13px] text-white/40 font-ui font-medium leading-none">
        {descriptor}
      </p>
    </div>
  )
}

// ─── MAIN SCOPE SECTION ───────────────────────────────────────────

export default function Scope() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Fade in the whole section when it enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'dark-section w-full py-24 lg:py-32',
        'transition-opacity duration-700',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="max-w-[900px] mx-auto px-10">

        {/* Section label */}
        <p
          className="text-center mb-12 lg:mb-16 font-ui"
          style={{
            fontSize:      '11px',
            fontWeight:    500,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color:         'rgba(196, 181, 253, 0.5)',
          }}
        >
          The platform — in three numbers
        </p>

        {/* Stat grid — 3-col desktop, 1-col mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            borderTop:    '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="py-10 lg:py-16 border-b md:border-b-0 md:border-r"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <ScopeStat
              value={11}
              suffix=""
              descriptor="AI agents"
              duration={1.5}
            />
          </div>

          <div
            className="py-10 lg:py-16 border-b md:border-b-0 md:border-r"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <ScopeStat
              value={15}
              suffix="+"
              descriptor="industries served"
              duration={1.6}
            />
          </div>

          <div className="py-10 lg:py-16">
            <ScopeStat
              value={2}
              suffix=""
              descriptor="verticals"
              duration={1.2}
            />
          </div>
        </div>

        {/* One-line subtext */}
        <p
          className="text-center mt-8 font-ui"
          style={{
            fontSize:      '14px',
            color:         'rgba(255,255,255,0.25)',
            letterSpacing: '0.01em',
          }}
        >
          Workforce Operations and Financial Operations — one platform, one interface, one team.
        </p>

      </div>
    </section>
  )
}
