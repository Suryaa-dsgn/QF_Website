'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import BookDemoButton from '@/components/BookDemoButton'
import { cn } from '@/lib/utils'

// ─── STEP 1: INTEGRATION LOGO GRID ───────────────────────────────

const integrations = [
  { name: 'Epic',         abbr: 'EP'  },
  { name: 'Workday',      abbr: 'WD'  },
  { name: 'QuickBooks',   abbr: 'QB'  },
  { name: 'Salesforce',   abbr: 'SF'  },
  { name: 'SAP',          abbr: 'SAP' },
  { name: 'Athena',       abbr: 'ATH' },
  { name: 'NetSuite',     abbr: 'NS'  },
  { name: 'Rippling',     abbr: 'RP'  },
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
    <div ref={ref} className="p-6 h-full flex flex-col font-ui">

      <p className="text-[11px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-4">
        Connected integrations
      </p>

      {/* 4×2 logo grid */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {integrations.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1.5"
          >
            <div
              className="w-12 h-12 rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-center"
              style={{ filter: 'grayscale(0.3)' }}
            >
              <span className="text-[11px] font-bold text-ink3 font-mono tracking-tight">
                {item.abbr}
              </span>
            </div>
            <span className="text-[10px] text-ink4 text-center leading-none">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Live sync indicator */}
      <div
        className="mt-auto rounded-[8px] p-2.5 flex items-center gap-2"
        style={{ background: '#D1FAE5', border: '1px solid #A7F3D0' }}
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
    <div ref={ref} className="p-5 h-full flex flex-col font-ui">

      {/* Header + progress */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[13px] font-semibold text-ink">Agent Setup</p>
          <span className="text-[11px] font-mono text-brand">
            {count > 0 ? '94%' : '0%'} complete
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#F3F0FC] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={{ width: '0%' }}
            animate={count > 0 ? { width: '94%' } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Log lines */}
      <div className="flex flex-col gap-2.5 flex-1">
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
              style={{ color: line.done ? '#16A34A' : '#6B3FA0' }}
            >
              {line.icon}
            </span>

            {/* Text */}
            <span className="text-[12px] text-ink font-medium">{line.text}</span>

            {/* Detail */}
            {line.detail && (
              <span className="text-[11px] text-ink4 font-mono ml-auto flex-shrink-0">
                {line.detail}
              </span>
            )}

            {/* Blinking cursor on last visible line if it's the spinner */}
            {!line.done && i === count - 1 && (
              <span className="text-brand text-[13px] animate-pulse ml-0.5 leading-none">|</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-ink4 mt-4">
        Scheduler Assist · Philadelphia Region · Initialising
      </p>

    </div>
  )
}

// ─── STEP 3: LIVE ACTIVITY FEED ───────────────────────────────────

const feedItems = [
  { time: '2min ago',  text: 'AP/AR Matching reconciled INV-082 — $12,400'                },
  { time: '5min ago',  text: 'AutoApproval approved 3 time-off requests'                   },
  { time: '12min ago', text: 'Physician Credentialing — Dr. Patel renewal initiated'        },
]

const newFeedItem = {
  time: 'Just now',
  text: 'AutoSwap filled 06:00–14:00 — Amanda W. → Sarah P.',
}

function LiveFeed() {
  const [showNew, setShowNew] = useState(false)

  useEffect(() => {
    // Fire first new item after 1.5s, then cycle every 5s
    const initial = setTimeout(() => setShowNew(true), 1500)
    const interval = setInterval(() => {
      setShowNew(false)
      setTimeout(() => setShowNew(true), 800)
    }, 5000)
    return () => { clearTimeout(initial); clearInterval(interval) }
  }, [])

  return (
    <div className="p-5 h-full flex flex-col font-ui">

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
                background:  'rgba(107,63,160,0.06)',
                borderLeft:  '3px solid #6B3FA0',
              }}
            >
              <span className="text-[10px] font-mono text-brand flex-shrink-0 mt-0.5 w-[58px]">
                {newFeedItem.time}
              </span>
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
          <div
            key={i}
            className={cn(
              'flex items-start gap-3 px-3 py-2.5',
              i < feedItems.length - 1 && 'border-b border-[#F3F3F3]'
            )}
          >
            <span className="text-[10px] font-mono text-ink4 flex-shrink-0 mt-0.5 w-[58px]">
              {item.time}
            </span>
            <p className="text-[12px] text-ink3 leading-snug">{item.text}</p>
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

// ─── STEP BLOCK (alternating) ─────────────────────────────────────

interface StepBlockProps {
  number: number
  title: string
  description: string
  detail: string
  isReversed: boolean
  visual: React.ReactNode
}

function StepBlock({ number, title, description, detail, isReversed, visual }: StepBlockProps) {
  return (
    <div className="py-20 border-t border-[--border] max-w-[1120px] mx-auto px-10">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ── Copy column ── */}
        <motion.div
          className={cn(isReversed ? 'md:order-2' : 'md:order-1')}
          initial={{ x: isReversed ? 40 : -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Step number — large muted brand-tinted text */}
          <p
            className="font-mono font-bold leading-none mb-3"
            style={{ fontSize: '48px', letterSpacing: '-0.04em', color: 'rgba(107,63,160,0.12)' }}
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
          </p>

          <p className="text-[13px] font-medium font-ui leading-relaxed max-w-[360px]" style={{ color: '#A0A0A0' }}>
            {detail}
          </p>
        </motion.div>

        {/* ── Visual column — always first on mobile ── */}
        <motion.div
          className={cn(
            isReversed ? 'md:order-1' : 'md:order-2',
            'order-first md:order-none'
          )}
          initial={{ x: isReversed ? -40 : 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="w-full rounded-[16px] overflow-hidden border border-[--border] bg-white"
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
      'One call. We look at your actual workflows — where the gaps are, what your team is doing manually, what systems you\'re already running.',
    detail: 'Works with what you already use.',
    isReversed: false,
    visual: <IntegrationGrid />,
  },
  {
    number: 2,
    title: 'Agents learn your operations. Not a generic template.',
    description:
      'Your staff records, shift history, contract terms, and compliance rules feed the agents directly. The result behaves like your best operator — not a generic automation.',
    detail: 'No manual scripting. No custom dev sprint.',
    isReversed: true,
    visual: <LogFeed />,
  },
  {
    number: 3,
    title: 'You see everything. Agents handle the rest.',
    description:
      'From day one, your team has full visibility into every decision the agents make. You set the rules. The agents do the work.',
    detail: 'Full audit trail. Every action logged.',
    isReversed: false,
    visual: <LiveFeed />,
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding">

      {/* Section header */}
      <div className="text-center max-w-[640px] mx-auto px-10 mb-4">
        <p className="text-label mb-4">WHAT HAPPENS NEXT</p>
        <h2
          className="font-display font-bold text-ink"
          style={{
            fontSize:      'clamp(28px, 4vw, 46px)',
            letterSpacing: '-0.03em',
            lineHeight:    '1.1',
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

      {/* Time-to-value callout bar */}
      <div className="mt-10 max-w-[900px] mx-auto px-10">
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
            From contract signed to first agent live: 72 hours.
          </p>
          <BookDemoButton className="btn-base btn-primary flex-shrink-0">
            Book a demo
          </BookDemoButton>
        </div>
      </div>

    </section>
  )
}
