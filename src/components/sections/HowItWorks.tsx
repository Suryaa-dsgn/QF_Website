'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Layers, Cpu } from 'lucide-react'
import BookDemoButton from '@/components/BookDemoButton'
import { cn } from '@/lib/utils'

// ─── STEP 1: INTEGRATION LOGO GRID ───────────────────────────────

const integrations = [
  { name: 'Epic',         abbr: 'EP',  dot: '#0284C7' },
  { name: 'Workday',      abbr: 'WD',  dot: '#D97706' },
  { name: 'QuickBooks',   abbr: 'QB',  dot: '#059669' },
  { name: 'Salesforce',   abbr: 'SF',  dot: '#0891B2' },
  { name: 'SAP',          abbr: 'SAP', dot: '#7C3AED' },
  { name: 'Athena',       abbr: 'ATH', dot: '#0284C7' },
  { name: 'NetSuite',     abbr: 'NS',  dot: '#059669' },
  { name: 'Rippling',     abbr: 'RP',  dot: '#D97706' },
]

function IntegrationGrid() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="p-6 h-full flex flex-col font-ui"
      style={{ background: 'linear-gradient(145deg, #FAFAFA 0%, #F5F3FF 100%)' }}
    >
      <p className="text-[11px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-4">
        Connected integrations
      </p>

      {/* 4×2 logo grid */}
      <div className="grid grid-cols-4 gap-3 mb-1">
        {integrations.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className="relative w-12 h-12 rounded-[10px] border border-[#E8E4F5] bg-white flex items-center justify-center"
              style={{ boxShadow: '0 1px 4px rgba(107,63,160,0.08)' }}
            >
              {/* Category dot */}
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: item.dot }}
              />
              <span className="text-[11px] font-bold text-ink3 font-mono tracking-tight">
                {item.abbr}
              </span>
            </div>
            <span className="text-[10px] text-ink4 text-center leading-none">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* QF Hub connector — data-flow funnel */}
      <div className="flex flex-col items-center my-2">
        <svg width="120" height="16" viewBox="0 0 120 16" fill="none" aria-hidden="true">
          <line x1="20"  y1="0" x2="60" y2="16" stroke="rgba(107,63,160,0.18)" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="60"  y1="0" x2="60" y2="16" stroke="rgba(107,63,160,0.18)" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="100" y1="0" x2="60" y2="16" stroke="rgba(107,63,160,0.18)" strokeWidth="1" strokeDasharray="3 3"/>
        </svg>
        <div
          className="w-8 h-8 rounded-[8px] flex items-center justify-center"
          style={{ background: '#6B3FA0', boxShadow: '0 0 10px rgba(107,63,160,0.3)' }}
        >
          <span className="text-white text-[9px] font-bold font-mono tracking-tight">QF</span>
        </div>
      </div>

      {/* Live sync indicator */}
      <div
        className="mt-auto rounded-[8px] p-2.5 flex items-center gap-2"
        style={{ background: '#F0FDF4', border: '1px solid #A7F3D0' }}
      >
        <span className="w-2 h-2 rounded-full bg-[#16A34A] flex-shrink-0 animate-pulse" />
        <p className="text-[11px] text-[#065F46] font-medium">
          8 integrations active · Syncing in real time
        </p>
      </div>
    </div>
  )
}

// ─── STEP 2: AGENT LOG FEED ───────────────────────────────────────

const logLines = [
  { icon: '✓', text: 'Staff profiles imported',       detail: '248 records',   done: true  },
  { icon: '✓', text: 'Shift policies mapped',          detail: '14 rules',      done: true  },
  { icon: '✓', text: 'Historical shifts analysed',     detail: '3,847 records', done: true  },
  { icon: '✓', text: 'Compliance rules configured',    detail: null,            done: true  },
  { icon: '⟳', text: 'Running final validation...',   detail: null,            done: false },
]

function LogFeed() {
  const [count, setCount] = useState(0)
  const ref     = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          let i = 0
          function next() {
            if (i < logLines.length) {
              setCount(++i)
              setTimeout(next, 380)
            }
          }
          setTimeout(next, 500)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="p-5 h-full flex flex-col font-ui relative overflow-hidden"
      style={{ background: '#0D0D14' }}
    >
      {/* Subtle purple glow at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, rgba(107,63,160,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Header + progress */}
      <div className="mb-5 relative">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Agent Setup
          </p>
          <span className="text-[11px] font-mono" style={{ color: '#A78BFA' }}>
            {count > 0 ? '94%' : '0%'} complete
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.07)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: '#7C3AED' }}
            initial={{ width: '0%' }}
            animate={count > 0 ? { width: '94%' } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Log lines */}
      <div className="flex flex-col gap-2.5 flex-1 relative">
        {logLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ x: -8, opacity: 0 }}
            animate={i < count ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5"
          >
            {/* Icon */}
            <span
              className="text-[12px] w-4 flex-shrink-0 font-mono font-bold"
              style={{ color: line.done ? '#22C55E' : '#A78BFA' }}
            >
              {line.icon}
            </span>

            {/* Text */}
            <span
              className="text-[12px] font-medium"
              style={{ color: line.done ? '#94A3B8' : 'white' }}
            >
              {line.text}
            </span>

            {/* Detail */}
            {line.detail && (
              <span
                className="text-[11px] font-mono ml-auto flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                {line.detail}
              </span>
            )}

            {/* Blinking cursor */}
            {!line.done && i === count - 1 && (
              <span
                className="text-[13px] animate-pulse ml-0.5 leading-none"
                style={{ color: '#A78BFA' }}
              >
                |
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-[11px] mt-4 relative font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>
        Scheduler Assist · Philadelphia Region · Initialising
      </p>
    </div>
  )
}

// ─── STEP 3: LIVE ACTIVITY FEED ───────────────────────────────────

const feedItems = [
  { time: '2min ago',  text: 'AP/AR Matching reconciled INV-082 — $12,400'         },
  { time: '5min ago',  text: 'AutoApproval approved 3 time-off requests'            },
  { time: '12min ago', text: 'Physician Credentialing — Dr. Patel renewal initiated' },
]

const newFeedItem = {
  time: 'Just now',
  text: 'AutoSwap filled 06:00–14:00 — Amanda W. → Sarah P.',
}

function LiveFeed() {
  const [showNew, setShowNew] = useState(false)

  useEffect(() => {
    const initial = setTimeout(() => setShowNew(true), 1500)
    const interval = setInterval(() => {
      setShowNew(false)
      setTimeout(() => setShowNew(true), 800)
    }, 5000)
    return () => { clearTimeout(initial); clearInterval(interval) }
  }, [])

  return (
    <div
      className="p-5 h-full flex flex-col font-ui"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFE 100%)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-semibold text-ink">Live Agent Activity</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#16A34A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
          3 agents active
        </span>
      </div>

      {/* New item slot — fixed height to prevent layout jump */}
      <div style={{ minHeight: '52px' }} className="mb-1">
        <AnimatePresence mode="wait">
          {showNew && (
            <motion.div
              key="new"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 rounded-[8px] px-3 py-2.5"
              style={{
                background: 'rgba(107,63,160,0.06)',
                border:     '1px solid rgba(107,63,160,0.14)',
              }}
            >
              <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse flex-shrink-0" />
                <span className="text-[10px] font-mono text-brand w-[52px]">
                  {newFeedItem.time}
                </span>
              </div>
              <p className="text-[12px] text-ink font-medium leading-snug">
                {newFeedItem.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Static historical items */}
      <div className="flex flex-col flex-1">
        {feedItems.map((item, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 px-3 py-2.5">
              <span className="text-[10px] font-mono text-ink4 flex-shrink-0 mt-0.5 w-[58px]">
                {item.time}
              </span>
              <p className="text-[12px] text-ink3 leading-snug">{item.text}</p>
            </div>
            {i < feedItems.length - 1 && (
              <div className="mx-3 h-px opacity-50" style={{ background: '#E5E7EB' }} />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-[11px] text-brand font-medium mt-3">
        View full agent log →
      </p>
    </div>
  )
}

// ─── ROI STRIP ────────────────────────────────────────────────────

interface ROIStatProps {
  prefix?: string
  value: number
  suffix: string
  label: string
  delta: string
}

function ROIStat({ prefix, value, suffix, label, delta }: ROIStatProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          if (prefersReduced) { setDisplayValue(value); return }
          const startTime  = performance.now()
          const durationMs = 1800
          function update(now: number) {
            const elapsed  = now - startTime
            const progress = Math.min(elapsed / durationMs, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(update)
            else setDisplayValue(value)
          }
          requestAnimationFrame(update)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, value])

  return (
    <div
      ref={ref}
      className="rounded-[16px] p-5 flex flex-col"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mb-2 leading-none">
        <span
          className="font-mono font-bold text-white"
          style={{ fontSize: 'clamp(26px, 2.6vw, 36px)' }}
        >
          {prefix && (
            <span className="text-white/40 mr-0.5" style={{ fontSize: '65%' }}>{prefix}</span>
          )}
          {displayValue}
          <span className="text-white/40 ml-0.5" style={{ fontSize: '55%' }}>{suffix}</span>
        </span>
      </div>
      <p
        className="text-[10px] font-medium font-ui mb-3 uppercase tracking-[0.06em]"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        {label}
      </p>
      <p className="text-[11px] font-ui mt-auto" style={{ color: 'rgba(255,255,255,0.22)' }}>
        {delta}
      </p>
    </div>
  )
}

function ROIStrip() {
  return (
    <div className="w-full py-20 relative" style={{ background: '#08080F' }}>
      {/* Dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      <div className="max-w-[1120px] mx-auto px-10 relative">
        {/* Section label */}
        <p
          className="text-center mb-3 text-[11px] font-medium font-ui uppercase tracking-[0.10em]"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Return on Investment
        </p>

        {/* Headline */}
        <h2
          className="text-center text-white font-display font-bold mb-10"
          style={{
            fontSize:      'clamp(20px, 2.2vw, 28px)',
            letterSpacing: '-0.03em',
            lineHeight:    '1.2',
          }}
        >
          What running on Quickflows actually returns.
        </h2>

        {/* 4 stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ROIStat
            prefix="$"
            value={420}
            suffix="K+"
            label="Annual financial impact"
            delta="↑ Conservative estimate across workforce + financial suites"
          />
          <ROIStat
            value={97}
            suffix="%"
            label="Call-off time reduction"
            delta="↓ 45 min manual → 28 sec automated"
          />
          <ROIStat
            value={83}
            suffix="%"
            label="Denied claims recovered"
            delta="↑ 2× the industry manual recovery benchmark"
          />
          <ROIStat
            value={31}
            suffix="%"
            label="Overtime cost reduction"
            delta="↓ 7-day ahead forecasting vs. reactive staffing"
          />
        </div>

        {/* Disclaimer */}
        <p
          className="text-center mt-8 text-[11px] font-ui"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          * Figures represent projected benchmarks based on workflow analysis and comparable deployments.
        </p>
      </div>
    </div>
  )
}

// ─── ENGAGEMENT MODELS ───────────────────────────────────────────

const models = [
  {
    icon: Zap,
    accentColor: '#6B3FA0',
    objective: 'Fastest time-to-value',
    title: 'Standard Deployment',
    description:
      'Deploy our pre-configured agent suites across Workforce, Financial, and Compliance operations. Standard environments are live in under 100 hours — no custom development required.',
  },
  {
    icon: Layers,
    accentColor: '#0284C7',
    objective: 'Tailored to your workflows',
    title: 'Guided Configuration',
    description:
      'Work with our implementation team to map your exact rules, payer configurations, and integrations. Agents are tuned to how your operation actually runs — not a generic template.',
  },
  {
    icon: Cpu,
    accentColor: '#059669',
    objective: 'Purpose-built for complexity',
    title: 'Custom Agents',
    description:
      'Have unique staffing contracts, complex payer rules, or proprietary workflows? We build purpose-specific agents on the Quickflows platform to handle them precisely.',
  },
]

function EngagementModels() {
  return (
    <section className="section-padding">
      <div className="max-w-[1120px] mx-auto px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-label mb-4">FLEXIBLE ENGAGEMENT</p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize:      'clamp(24px, 2.8vw, 36px)',
              letterSpacing: '-0.03em',
              lineHeight:    '1.15',
            }}
          >
            Choose the path that fits your team.
          </h2>
          <p className="text-[15px] text-ink3 font-ui mt-4 max-w-[480px] mx-auto leading-relaxed">
            From immediate deployment to fully custom agents — we meet you where your operations are.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {models.map((model, i) => {
            const Icon = model.icon
            return (
              <motion.div
                key={model.title}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[16px] border border-[--border] p-7 flex flex-col"
                style={{ boxShadow: 'var(--shadow-1)' }}
              >
                {/* Icon container */}
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-5 flex-shrink-0"
                  style={{ background: model.accentColor + '12' }}
                >
                  <Icon size={18} style={{ color: model.accentColor }} />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-ink mb-1.5"
                  style={{ fontSize: '17px', letterSpacing: '-0.02em' }}
                >
                  {model.title}
                </h3>

                {/* Objective label */}
                <p
                  className="text-[11px] font-semibold font-ui mb-3 uppercase tracking-[0.05em]"
                  style={{ color: model.accentColor }}
                >
                  {model.objective}
                </p>

                {/* Description */}
                <p className="text-[13px] text-ink3 font-ui leading-relaxed">
                  {model.description}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

// ─── STEP BLOCK ───────────────────────────────────────────────────

interface StepBlockProps {
  number: number
  title: string
  description: string
  descriptionMobileHidden?: string
  detail: string
  isReversed: boolean
  visual: React.ReactNode
}

function StepBlock({ number, title, description, descriptionMobileHidden, detail, isReversed, visual }: StepBlockProps) {
  return (
    <div className="py-20 border-t border-[--border] max-w-[1120px] mx-auto px-10">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ── Copy column ── */}
        <motion.div
          className={cn(isReversed ? 'md:order-2' : 'md:order-1')}
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Step number — large decorative brand-tinted numeral */}
          <p
            className="font-mono font-bold leading-none mb-3"
            style={{ fontSize: '72px', letterSpacing: '-0.04em', color: 'rgba(107,63,160,0.08)' }}
          >
            0{number}
          </p>

          <h3
            className="font-display font-bold text-ink mb-3"
            style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
          >
            {title}
          </h3>

          <p className="text-[15px] text-ink3 font-ui mb-3 leading-relaxed max-w-[360px]">
            {description}
            {descriptionMobileHidden && (
              <span className="hidden md:inline">{' '}{descriptionMobileHidden}</span>
            )}
          </p>

          <p
            className="hidden md:block text-[13px] font-medium font-ui leading-relaxed max-w-[360px]"
            style={{ color: '#A0A0A0' }}
          >
            {detail}
          </p>
        </motion.div>

        {/* ── Visual column — always first on mobile ── */}
        <motion.div
          className={cn(
            isReversed ? 'md:order-1' : 'md:order-2',
            'order-first md:order-none'
          )}
          initial={{ y: 28, opacity: 0, scale: 0.97 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-full rounded-[16px] overflow-hidden border border-[--border]"
            style={{ height: '320px', boxShadow: 'var(--shadow-2)' }}
          >
            {visual}
          </div>
        </motion.div>

      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

const steps = [
  {
    number: 1,
    title: 'We map your operations — not your org chart.',
    description:
      "One call. We look at your actual workflows — where the gaps are, what your team is doing manually, what systems you're already running.",
    detail: 'Works with what you already use.',
    isReversed: false,
    visual: <IntegrationGrid />,
  },
  {
    number: 2,
    title: 'Agents learn your operations. Not a generic template.',
    description:
      'Your staff records, shift history, contract terms, and compliance rules feed the agents directly.',
    descriptionMobileHidden:
      'The result behaves like your best operator — not a generic automation.',
    detail: 'No manual scripting. No custom dev sprint.',
    isReversed: true,
    visual: <LogFeed />,
  },
  {
    number: 3,
    title: 'You see everything. Agents handle the rest.',
    description:
      'From day one, your team has full visibility into every decision the agents make.',
    descriptionMobileHidden:
      'You set the rules. The agents do the work.',
    detail: 'Full audit trail. Every action logged.',
    isReversed: false,
    visual: <LiveFeed />,
  },
]

interface HowItWorksProps {
  /** Set true on the /how-it-works page to show the ROI strip, engagement models, and callout */
  extended?: boolean
}

export default function HowItWorks({ extended = false }: HowItWorksProps) {
  return (
    <>
      <section className="section-padding">
        {/* Section header */}
        <div className="text-center max-w-[860px] mx-auto px-10 mb-4">
          <p className="text-label mb-4">WHAT HAPPENS NEXT</p>
          <h2
            className="font-display font-bold text-ink"
            style={{
              fontSize:      'clamp(24px, 3.4vw, 40px)',
              letterSpacing: '-0.03em',
              lineHeight:    '1.2',
            }}
          >
            From first conversation to
            <br className="hidden md:block" />
            {' '}agents running live — in weeks.
          </h2>
        </div>

        {/* Step blocks */}
        {steps.map((step) => (
          <StepBlock key={step.number} {...step} />
        ))}
      </section>

      {/* Extended sections — /how-it-works page only */}
      {extended && (
        <>
          <ROIStrip />
          <EngagementModels />
          <div className="py-16 max-w-[900px] mx-auto px-10">
            <div
              className="rounded-[16px] px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-[--border]"
              style={{ boxShadow: 'var(--shadow-1)' }}
            >
              <p
                className="font-display font-bold text-ink"
                style={{
                  fontSize:      'clamp(18px, 2.2vw, 26px)',
                  letterSpacing: '-0.03em',
                  lineHeight:    '1.2',
                }}
              >
                From contract signed to first agent live: under 100 hours.
              </p>
              <BookDemoButton className="btn-base btn-primary flex-shrink-0">
                Book a demo
              </BookDemoButton>
            </div>
          </div>
        </>
      )}
    </>
  )
}
