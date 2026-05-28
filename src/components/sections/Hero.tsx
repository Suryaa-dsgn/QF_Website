'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroDashboard from '@/components/ui/HeroDashboard'
import BookDemoButton from '@/components/BookDemoButton'

// ─── ROTATING PHRASES ─────────────────────────────────────────────

const rotatingPhrases = [
  'Filling the shift',
  'Matching the invoice',
  'Flagging the credential',
  'Chasing the payment',
]

// ─── TRUST BAR ────────────────────────────────────────────────────

const trustNames = [
  'Regional Health Systems',
  'Home Care Alliance',
  'MedBridge Group',
  'CareRx Partners',
  'PrimaCare Inc.',
  'OpsStar Logistics',
  'CapRate REIT',
  'SunCare Systems',
  'MetroHealth Staffing',
]

function TrustBar() {
  return (
    <div className="mt-10 border-t border-[--border] py-6">
      <p
        className="text-center text-label mb-5"
        style={{ color: '#C4B5FD' }}
      >
        Trusted by operations teams at
      </p>

      {/* Infinite marquee with edge fade */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div className="flex items-center trust-marquee" style={{ width: 'max-content' }}>
          {[...trustNames, ...trustNames].map((name, i) => (
            <div key={i} className="flex items-center px-8">
              <span
                className="text-[14px] font-medium whitespace-nowrap"
                style={{ color: '#C4B5FD' }}
              >
                {name}
              </span>
              <span className="ml-8 w-px h-4 bg-[#E9E3FA] flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── HERO SECTION ─────────────────────────────────────────────────

export default function Hero() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  // Rotate phrase every 2.8 s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((i) => (i + 1) % rotatingPhrases.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // GSAP entrance animation — runs once on mount, client-side only
  useEffect(() => {
    if (hasAnimated) return

    const initGSAP = async () => {
      // Respect reduced-motion preference
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        setHasAnimated(true)
        return
      }

      const { gsap } = await import('gsap')

      // Set initial hidden states
      gsap.set([
        '.hero-eyebrow',
        '.hero-headline-word',
        '.hero-rotating',
        '.hero-subhead',
        '.hero-cta-primary',
        '.hero-cta-ghost',
      ], { opacity: 0 })

      gsap.set('.hero-headline-word', { y: '110%' })
      gsap.set(
        ['.hero-eyebrow', '.hero-rotating', '.hero-subhead', '.hero-cta-primary', '.hero-cta-ghost'],
        { y: 20 }
      )
      gsap.set('.hero-panel-wrapper', { opacity: 0, y: 32, scale: 0.97 })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setHasAnimated(true),
      })

      tl
        // 1. Eyebrow pill
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 })
        // 2. Headline word curtain reveal
        .to('.hero-headline-word', { opacity: 1, y: 0, duration: 0.75, stagger: 0.035 }, '-=0.4')
        // 3. Rotating label
        .to('.hero-rotating', { opacity: 1, y: 0, duration: 0.5 }, '-=0.45')
        // 4. Subhead
        .to('.hero-subhead', { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        // 5. Primary CTA
        .to('.hero-cta-primary', { opacity: 1, y: 0, duration: 0.45 }, '-=0.35')
        // 6. Ghost CTA
        .to('.hero-cta-ghost', { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
        // 7. Panel entrance
        .to('.hero-panel-wrapper', { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power2.out' }, '-=0.3')
    }

    initGSAP()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Split a headline string into per-word <span>s for the curtain reveal
  // The parent div has overflow-hidden — words start at y:110% below the clip
  const splitLine = (text: string) =>
    text.split(' ').map((word, i) => (
      <span
        key={i}
        className="hero-headline-word inline-block"
        style={{ marginRight: '0.28em' }}
      >
        {word}
      </span>
    ))

  return (
    <section
      ref={heroRef}
      className="min-h-[calc(100vh-60px)] flex flex-col justify-center pt-[60px] overflow-x-clip"
    >
      {/* ── Main grid ── */}
      <div className="max-w-[1280px] mx-auto w-full px-10 pt-6 pb-0">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-6 items-center">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col">

            {/* Eyebrow pill */}
            <div className="hero-eyebrow mb-5">
              <span className="eyebrow-pill">
                <span className="eyebrow-dot" />
                Agents working right now
              </span>
            </div>

            {/* H1 — each line needs overflow-hidden for curtain clip */}
            <h1
              className="font-display font-extrabold tracking-[-0.04em] leading-[1.05] text-ink mb-4"
              style={{ fontSize: 'clamp(32px, 3.0vw, 56px)' }}
            >
              <div className="overflow-hidden leading-[1.1]">
                {splitLine('When operations break,')}
              </div>
              <div className="overflow-hidden leading-[1.1]">
                {splitLine("they're already handled.")}
              </div>
            </h1>

            {/* Rotating agent label */}
            <div className="hero-rotating flex items-center gap-2 mb-4 h-6 overflow-hidden">
              <span className="text-[13px] font-medium text-ink4 font-mono flex-shrink-0">
                Agents currently:
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPhraseIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{   y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="text-[13px] font-medium text-brand font-mono"
                >
                  {rotatingPhrases[currentPhraseIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Subhead */}
            <p className="hero-subhead text-[15px] lg:text-[16px] text-ink3 leading-[1.8] max-w-[440px] mb-10">
              Shift gaps filled before your team wakes up.
              <br className="hidden sm:block" />
              {' '}Invoices matched before your AR team starts their day.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <BookDemoButton className="hero-cta-primary btn-base btn-primary">
                Talk to an Expert
              </BookDemoButton>
              <BookDemoButton className="hero-cta-ghost btn-base btn-ghost group">
                Watch it run
                <ArrowRight
                  size={15}
                  className="arrow-icon text-ink3 group-hover:text-ink"
                />
              </BookDemoButton>
            </div>

          </div>

          {/* ── RIGHT: Dashboard panel ── */}
          {/* Hidden on mobile, visible on lg+ — bleeds past right edge intentionally */}
          <div className="hero-panel-wrapper hidden lg:block">
            <div className="lg:translate-x-8 xl:translate-x-14">
              <HeroDashboard />
            </div>
          </div>

        </div>
      </div>

      {/* ── Trust bar ── */}
      <div className="max-w-[1280px] mx-auto w-full px-10">
        <TrustBar />
      </div>
    </section>
  )
}
