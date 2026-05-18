'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Home, Heart, Users, Building2, Plane,
  Truck, Factory, ShoppingBag, GraduationCap, Coffee,
  Activity, Landmark, Package, Laptop, Briefcase,
  ArrowRight,
} from 'lucide-react'

// ─── COUNT-UP ─────────────────────────────────────────────────────

function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          if (prefersReduced) { setDisplay(value); return }
          const start = performance.now()
          const ms = duration * 1000
          function tick(now: number) {
            const p = Math.min((now - start) / ms, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(Math.floor(eased * value))
            if (p < 1) requestAnimationFrame(tick)
            else setDisplay(value)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, value, duration])

  return <span ref={ref}>{display}</span>
}

// ─── DATA ─────────────────────────────────────────────────────────

const workforceIndustries = [
  { icon: Home,           name: 'Home Health & Hospice'        },
  { icon: Heart,          name: 'Hospitals & Health Systems'   },
  { icon: Users,          name: 'Staffing Agencies'            },
  { icon: Building2,      name: 'Skilled Nursing Facilities'   },
  { icon: Plane,          name: 'Airports & Aviation'          },
  { icon: Truck,          name: 'Logistics & Warehousing'      },
  { icon: Factory,        name: 'Manufacturing & Plants'       },
  { icon: ShoppingBag,    name: 'Retail & Hospitality'         },
  { icon: GraduationCap,  name: 'Education & Childcare'        },
  { icon: Coffee,         name: 'Food Service & Catering'      },
]

const financialIndustries = [
  { icon: Activity,   name: 'Healthcare Revenue Cycle'       },
  { icon: Landmark,   name: 'REITs & Real Estate'            },
  { icon: Package,    name: 'Logistics & Operations Finance' },
  { icon: Laptop,     name: 'SaaS Companies'                 },
  { icon: Briefcase,  name: 'Staffing & Services Finance'    },
]

// ─── INDUSTRY CAROUSEL ────────────────────────────────────────────

function IndustryCarousel({
  items,
  label,
  accent,
}: {
  items: { icon: React.ElementType; name: string }[]
  label: string
  accent: string
}) {
  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    ref.current = setInterval(() => setIdx((i) => (i + 1) % items.length), 2600)
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [paused, items.length])

  const Icon = items[idx].icon

  return (
    <div
      className="h-full flex flex-col p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p
          className="font-ui font-semibold"
          style={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent }}
        >
          {label}
        </p>
        <span className="text-[11px] font-mono text-ink4">
          {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
      </div>

      {/* Animated industry display */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon ring */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: accent + '12', border: `1.5px solid ${accent}28` }}
            >
              <Icon size={26} style={{ color: accent }} />
            </div>
            <p
              className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: 'clamp(17px, 1.6vw, 21px)', letterSpacing: '-0.025em' }}
            >
              {items[idx].name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-[5px] mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setPaused(true) }}
            aria-label={`Industry ${i + 1}`}
            className="rounded-full transition-all duration-200"
            style={{
              width:      i === idx ? '16px' : '6px',
              height:     '6px',
              background: i === idx ? accent : accent + '28',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── BENTO CARD WRAPPER ───────────────────────────────────────────

function BentoCard({
  children,
  className = '',
  style = {},
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}) {
  return (
    <motion.div
      className={`rounded-[20px] overflow-hidden border border-[--border] ${className}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── MAIN SECTION ─────────────────────────────────────────────────

export default function Industries() {
  return (
    <section className="section-padding">
      <div className="max-w-[1120px] mx-auto px-10">

        {/* ── Section header ── */}
        <motion.div
          className="text-center max-w-[820px] mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-label mb-4">INDUSTRIES</p>
          <h2
            className="font-display font-bold text-ink mb-4"
            style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', letterSpacing: '-0.035em', lineHeight: '1.2' }}
          >
            Healthcare, finance, and compliance
            <br className="hidden sm:block" />
            {' '}don&apos;t get second chances.
          </h2>
          <p className="text-[15px] text-ink3 font-ui leading-relaxed mx-auto" style={{ maxWidth: '500px' }}>
            Built for the workflows, compliance requirements, and edge cases
            of each sector — not adapted from a general-purpose platform.
          </p>
        </motion.div>

        {/* ── BENTO GRID ── */}
        {/*
          Desktop 3-col layout:
          Row 1: [Card 1 — 2col dark stat] [Card 2 — 1col tinted stat]
          Row 2: [Card 3 — 1col carousel, rows 2-3] [Card 4 — 1col stat] [Card 5 — 1col carousel]
          Row 3:                                     [Card 6 — 2col tagline]
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* ── Card 1: 30+ Agents — brand purple, wide ── */}
          <BentoCard
            className="lg:col-span-2 relative overflow-hidden"
            style={{ minHeight: '190px', background: '#6B3FA0' }}
            delay={0}
          >
            {/* Subtle white dot-grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            {/* Soft radial glow bottom-right */}
            <div
              className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.07)', filter: 'blur(32px)' }}
            />
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <p
                className="font-ui font-medium"
                style={{ fontSize: '10px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}
              >
                AI Agents Live
              </p>
              <div>
                <div
                  className="font-mono font-bold text-white leading-none"
                  style={{ fontSize: 'clamp(64px, 8vw, 96px)', letterSpacing: '-0.04em' }}
                >
                  <CountUp value={30} duration={1.6} />
                  <span style={{ fontSize: '40%', color: 'rgba(255,255,255,0.45)', marginLeft: '2px' }}>+</span>
                </div>
                <p
                  className="font-ui mt-2"
                  style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.01em' }}
                >
                  Configured across workforce &amp; financial operations
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 2: 72hr — brand-tinted ── */}
          <BentoCard
            className="bg-white"
            style={{ minHeight: '190px', background: 'var(--brand-08)' }}
            delay={0.08}
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <p
                className="font-ui font-medium"
                style={{ fontSize: '10px', letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(107,63,160,0.5)' }}
              >
                Time to first live agent
              </p>
              <div>
                <div
                  className="font-mono font-bold text-brand leading-none"
                  style={{ fontSize: 'clamp(52px, 6vw, 76px)', letterSpacing: '-0.04em' }}
                >
                  <CountUp value={72} duration={1.4} />
                  <span style={{ fontSize: '38%', color: 'rgba(107,63,160,0.45)', marginLeft: '2px' }}>hr</span>
                </div>
                <p className="text-[13px] text-ink3 font-ui mt-2">
                  From contract signed to agent in production
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 3: Workforce carousel — tall (spans 2 rows) ── */}
          <BentoCard
            className="lg:row-span-2 bg-white"
            style={{ minHeight: '300px' }}
            delay={0.05}
          >
            <IndustryCarousel
              items={workforceIndustries}
              label="Workforce Operations"
              accent="#0284C7"
            />
          </BentoCard>

          {/* ── Card 4: 15+ industries stat ── */}
          <BentoCard
            className="bg-white"
            style={{ minHeight: '155px' }}
            delay={0.12}
          >
            <div className="p-7 h-full flex flex-col justify-between">
              <p
                className="font-ui font-medium"
                style={{ fontSize: '10px', letterSpacing: '0.09em', textTransform: 'uppercase', color: '#059669' }}
              >
                Industries Served
              </p>
              <div>
                <div
                  className="font-mono font-bold text-ink leading-none"
                  style={{ fontSize: 'clamp(44px, 5vw, 64px)', letterSpacing: '-0.04em' }}
                >
                  <CountUp value={15} duration={1.5} />
                  <span style={{ fontSize: '40%', color: '#05966988', marginLeft: '1px' }}>+</span>
                </div>
                <p className="text-[12px] text-ink4 font-ui mt-1">
                  New verticals added quarterly
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 5: Financial carousel ── */}
          <BentoCard
            className="bg-white"
            style={{ minHeight: '155px' }}
            delay={0.16}
          >
            <IndustryCarousel
              items={financialIndustries}
              label="Financial Operations"
              accent="#059669"
            />
          </BentoCard>

          {/* ── Card 6: Tagline + CTA — wide, brand-tinted ── */}
          <BentoCard
            className="lg:col-span-2"
            style={{ minHeight: '130px', background: 'var(--brand-08)' }}
            delay={0.2}
          >
            <div className="p-7 h-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p
                  className="font-display font-bold text-ink mb-1"
                  style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
                >
                  Standard environments live in 72 hours.
                </p>
                <p className="text-[13px] text-ink3 font-ui">
                  Don&apos;t see your industry?{' '}
                  We&apos;re likely building it — or we can scope it together.
                </p>
              </div>
              <Link href="/contact" className="btn-base btn-primary flex-shrink-0 group">
                Talk to us
                <ArrowRight size={14} className="arrow-icon" />
              </Link>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
