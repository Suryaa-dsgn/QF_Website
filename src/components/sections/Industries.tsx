'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Building2, Activity, ArrowRight,
  Calendar, AlertCircle, MapPin, UserPlus, BarChart2,
  MessageCircle, PhoneOff, CheckSquare,
  RefreshCw, CreditCard,
  ShieldCheck, FileCheck, FileText,
  ChevronLeft, ChevronRight,
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

// ─── AGENT DATA ───────────────────────────────────────────────────

const workforceAgents = [
  { icon: Calendar,       name: 'Schedule Optimizer'        },
  { icon: AlertCircle,    name: 'Staff Burnout Prevention'  },
  { icon: MapPin,         name: 'Visit Verification (EVV)'  },
  { icon: UserPlus,       name: 'Referral Intake'           },
  { icon: BarChart2,      name: 'Capacity Planner'          },
  { icon: MessageCircle,  name: 'StaffAssist'               },
  { icon: PhoneOff,       name: 'Call-Off Management'       },
  { icon: CheckSquare,    name: 'Auto Approval'             },
]

const financialAgents = [
  { icon: RefreshCw,   name: 'AP / AR Matching'           },
  { icon: CreditCard,  name: 'Payment Collection'         },
  { icon: Activity,    name: 'Revenue Cycle Management'   },
  { icon: Building2,   name: 'REIT Deal Qualifier'        },
]

const complianceAgents = [
  { icon: ShieldCheck,  name: 'Provider Credentialing' },
  { icon: FileCheck,    name: 'Claims Compliance'      },
  { icon: FileText,     name: 'Contract Compliance'    },
]

// ─── AGENT CAROUSEL ───────────────────────────────────────────────

function AgentCarousel({
  items,
  label,
  accent,
  href,
}: {
  items: { icon: React.ElementType; name: string }[]
  label: string
  accent: string
  href: string
}) {
  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => setIdx((i) => (i + 1) % items.length), 2600)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [paused, items.length])

  const handlePrev = () => {
    setIdx((i) => (i - 1 + items.length) % items.length)
    setPaused(true)
  }
  const handleNext = () => {
    setIdx((i) => (i + 1) % items.length)
    setPaused(true)
  }

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

      {/* Animated agent display — clicking leads to the suite page */}
      <Link
        href={href}
        className="flex-1 flex flex-col items-center justify-center text-center group"
        style={{ cursor: 'pointer' }}
      >
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
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
              style={{ background: accent + '12', border: `1.5px solid ${accent}28` }}
            >
              <Icon size={26} style={{ color: accent }} />
            </div>
            <p
              className="font-display font-bold text-ink leading-tight transition-colors duration-150"
              style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', letterSpacing: '-0.025em', color: 'inherit' }}
            >
              {items[idx].name}
            </p>
            {/* Subtle "view" hint on hover */}
            <p
              className="text-[11px] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: accent }}
            >
              View suite →
            </p>
          </motion.div>
        </AnimatePresence>
      </Link>

      {/* Navigation: arrows + dots */}
      <div className="flex items-center justify-center gap-3 mt-5">
        {/* Prev arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous agent"
          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150"
          style={{ background: accent + '14', color: accent }}
        >
          <ChevronLeft size={13} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-[5px]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setPaused(true) }}
              aria-label={`Agent ${i + 1}`}
              className="rounded-full transition-all duration-200"
              style={{
                width:      i === idx ? '16px' : '6px',
                height:     '6px',
                background: i === idx ? accent : accent + '28',
              }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={handleNext}
          aria-label="Next agent"
          className="w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-150"
          style={{ background: accent + '14', color: accent }}
        >
          <ChevronRight size={13} />
        </button>
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
          Row 1: [Card 1 — 2col dark stat] [Card 2 — 1col industries stat]
          Row 2: [Card 3 — 1col carousel, rows 2-3] [Card 4 — Financial] [Card 5 — Compliance]
          Row 3:                                     [Card 6 — 2col tagline CTA]
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
                  Configured across workforce, financial &amp; compliance
                </p>
              </div>
            </div>
          </BentoCard>

          {/* ── Card 2: 15+ Industries ── */}
          <BentoCard
            className="bg-white"
            style={{ minHeight: '190px' }}
            delay={0.08}
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
                  style={{ fontSize: 'clamp(52px, 6vw, 76px)', letterSpacing: '-0.04em' }}
                >
                  <CountUp value={15} duration={1.5} />
                  <span style={{ fontSize: '38%', color: '#05966988', marginLeft: '2px' }}>+</span>
                </div>
                <p className="text-[13px] text-ink3 font-ui mt-2">
                  New verticals added quarterly
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
            <AgentCarousel
              items={workforceAgents}
              label="Workforce Operations"
              accent="#0284C7"
              href="/workforce"
            />
          </BentoCard>

          {/* ── Card 4: Financial carousel ── */}
          <BentoCard
            className="bg-white"
            style={{ minHeight: '155px' }}
            delay={0.12}
          >
            <AgentCarousel
              items={financialAgents}
              label="Financial Operations"
              accent="#059669"
              href="/financial"
            />
          </BentoCard>

          {/* ── Card 5: Compliance carousel — NEW ── */}
          <BentoCard
            className="bg-white"
            style={{ minHeight: '155px' }}
            delay={0.16}
          >
            <AgentCarousel
              items={complianceAgents}
              label="Compliance Agents"
              accent="#0891B2"
              href="/compliance"
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
                  Standard environments live in under 100 hours.
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
