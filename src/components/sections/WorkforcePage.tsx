'use client'

import { useState, useEffect, useRef } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import Link from 'next/link'
import BookDemoButton from '@/components/BookDemoButton'

// ── Panel components (default exports) ───────────────────────────
import BurnoutPanel       from '@/components/ui/panels/BurnoutPanel'
import StaffAssistPanel   from '@/components/ui/panels/StaffAssistPanel'
import SchedulerPanel     from '@/components/ui/panels/SchedulerPanel'
import EVVPanel           from '@/components/ui/panels/EVVPanel'
import AutoApprovalPanel  from '@/components/ui/panels/AutoApprovalPanel'
import AutoSwapPanel      from '@/components/ui/panels/AutoSwapPanel'
import CredentialingPanel from '@/components/ui/panels/CredentialingPanel'

// ── Scroll-line data ─────────────────────────────────────────────
import { PATH_D, THRESHOLDS, SECTION_HEIGHT } from '@/data/agentStepsV2'

// ════════════════════════════════════════════════════════════════
// CUSTOM HOOK — maps scroll progress to opacity + y + scale
// ════════════════════════════════════════════════════════════════

function useStepReveal(sv: MotionValue<number>, threshold: number) {
  const opacity = useTransform(
    sv,
    [threshold - 0.01, threshold, threshold + 0.04],
    [0, 0, 1]
  )
  const y = useTransform(
    sv,
    [threshold - 0.01, threshold, threshold + 0.04],
    [24, 24, 0]
  )
  const scale = useTransform(
    sv,
    [threshold - 0.01, threshold, threshold + 0.04],
    [0.97, 0.97, 1]
  )
  return { opacity, y, scale }
}

// ════════════════════════════════════════════════════════════════
// AGENT STEP MARKER — sequence number + prominent pill (Fix 4)
// ════════════════════════════════════════════════════════════════

function AgentStepMarker({
  label,
  index,
  align = 'left',
}: {
  label: string
  index: number
  align?: 'left' | 'right'
}) {
  return (
    <div style={{ textAlign: align }}>
      {/* Sequence number — small, muted, above pill */}
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(107, 63, 160, 0.35)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '10px',
        }}
      >
        Agent {String(index).padStart(2, '0')}
      </span>

      {/* Main label — Bricolage, large, prominent */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: '#6B3FA0',
          color: '#FFFFFF',
          borderRadius: '14px',
          padding: '14px 28px',
          fontFamily: 'var(--font-bricolage)',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          boxShadow:
            '0 8px 32px rgba(107, 63, 160, 0.40), 0 2px 8px rgba(107, 63, 160, 0.20)',
          whiteSpace: 'nowrap',
        }}
      >
        {/* 4-pointed star icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z"
            fill="white"
          />
        </svg>
        {label}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// PROTOTYPE PANEL WRAPPER — floating product UI panel (Fix 2)
// ════════════════════════════════════════════════════════════════

function PrototypeWrapper({
  children,
  width = 560,
  slug,
}: {
  children: React.ReactNode
  width?: number
  slug: string
}) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: '460px',
        background: '#FFFFFF',
        borderRadius: '20px',
        overflow: 'hidden',
        animation: 'panelGlow 3s ease-in-out infinite',
      }}
    >
      {/* Browser chrome */}
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red" />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green" />
        </div>
        <div className="browser-url">app.quickflows.ai / {slug}</div>
      </div>
      {/* Panel content */}
      <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// BRIDGE LABEL — text embedded in line horizontal segment
// ════════════════════════════════════════════════════════════════

function BridgeLabelEl({
  topPx,
  children,
  sv,
  threshold,
}: {
  topPx: number
  children: string
  sv: MotionValue<number>
  threshold: number
}) {
  const opacity = useTransform(sv, [threshold - 0.01, threshold + 0.02], [0, 1])
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${topPx}px`,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        // Page-background fill clips the line behind the text
        background: '#F9F8FF',
        padding: '0 12px',
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(107, 63, 160, 0.45)',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════
// DESCRIPTION TEXT — paragraph below each step marker (Fix 3)
// ════════════════════════════════════════════════════════════════

function Desc({
  children,
  align = 'left',
}: {
  children: React.ReactNode
  align?: 'left' | 'right'
}) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '15px',
        color: '#6B6B6B',
        lineHeight: 1.75,
        maxWidth: '300px',
        marginTop: '14px',
        marginLeft: align === 'right' ? 'auto' : undefined,
        textAlign: align,
      }}
    >
      {children}
    </p>
  )
}

// ════════════════════════════════════════════════════════════════
// MOBILE AGENT STACK — linear fallback for <1024px
// ════════════════════════════════════════════════════════════════

const MOBILE_STEPS = [
  {
    index: 1,
    slug: 'scheduler-assist',
    label: 'Scheduler Assist',
    Panel: SchedulerPanel,
    desc: 'Your scheduling manager opens the coverage report on Friday afternoon. Three callouts. Twelve open shifts. Forty-eight hours to fill them. Scheduler Assist already has the optimised schedule ready — scored against availability, certifications, and overtime limits — before anyone opens a spreadsheet.',
  },
  {
    index: 2,
    slug: 'staff-burnout-prevention',
    label: 'Burnout Prevention',
    Panel: BurnoutPanel,
    desc: "It's Tuesday. One of your ICU nurses has logged 68 hours this week. Nobody on the floor flagged it — because nobody had time to check the scheduling history. Burnout Prevention monitors patterns across your entire roster and flags the risk before it becomes your next 6am callout.",
  },
  {
    index: 3,
    slug: 'staffassist',
    label: 'StaffAssist Agent',
    Panel: StaffAssistPanel,
    desc: "David wants to know if he can swap Thursday. He texts his coordinator, who's already handling twelve other things. StaffAssist answers in two seconds — checks his eligibility, finds an available swap partner, and initiates the request. The coordinator never had to pick up the phone.",
  },
  {
    index: 4,
    slug: 'auto-swap',
    label: 'Auto Swap',
    Panel: AutoSwapPanel,
    desc: '6:04am. Amanda called in sick for the 7am shift. Your coordinator opens the contact list and starts working through it. Auto Swap finds Sarah P., confirms her certification and overtime status, and sends the confirmation — in 28 seconds. Before the coordinator reaches their third call.',
  },
  {
    index: 5,
    slug: 'auto-approval',
    label: 'Auto Approval',
    Panel: AutoApprovalPanel,
    desc: "11:47pm. Jamie L. submits a time-off request for next Thursday. No conflicts. No overtime. Policy clear. Auto Approval processes it immediately. When Jamie checks his phone in the morning, it's already done. The manager never had to log in.",
  },
  {
    index: 6,
    slug: 'visit-verification',
    label: 'Visit Verification',
    Panel: EVVPanel,
    desc: "Mrs. Garcia's visit is logged as complete at 9am. The GPS record shows a 28-minute visit — not the scheduled 60. Visit Verification flags the discrepancy before billing runs. The billing team never saw it. The compliance team never had to explain it.",
  },
  {
    index: 7,
    slug: 'physician-credentialing',
    label: 'Physician Credentialing',
    Panel: CredentialingPanel,
    desc: "Dr. Patel's DEA registration expires in 11 days. The audit is in four weeks. Physician Credentialing flagged it at 90 days, sent a reminder at 60, and initiated the renewal at 30. Your admin team found out about it when it was already handled.",
  },
]

function MobileAgentStack() {
  return (
    <div className="section-container py-20">
      {/* Section header */}
      <div className="mb-14 text-center">
        <h2
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'clamp(26px, 5vw, 38px)',
            fontWeight: 700,
            color: '#0A0A0A',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          One operational day.
          <br />Seven agents. Nothing missed.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '15px',
            color: '#6B6B6B',
            lineHeight: 1.7,
            maxWidth: '380px',
            margin: '0 auto',
          }}
        >
          From schedule to close — every agent, every step.
        </p>
      </div>

      {/* Stacked agent steps */}
      <div className="flex flex-col gap-16">
        {MOBILE_STEPS.map(({ index, slug, label, Panel, desc }) => (
          <div key={slug}>
            {/* Step marker */}
            <div className="mb-4">
              <AgentStepMarker label={label} index={index} align="left" />
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '15px',
                color: '#6B6B6B',
                lineHeight: 1.75,
                marginBottom: '20px',
                maxWidth: '400px',
              }}
            >
              {desc}
            </p>

            {/* Prototype panel — full width, 280px tall */}
            <div
              style={{
                width: '100%',
                height: '280px',
                background: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div className="browser-chrome">
                <div className="browser-dots">
                  <div className="browser-dot dot-red" />
                  <div className="browser-dot dot-yellow" />
                  <div className="browser-dot dot-green" />
                </div>
                <div className="browser-url">app.quickflows.ai / {slug}</div>
              </div>
              <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
                <Panel />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Closing CTA */}
      <div className="text-center mt-20">
        <h3
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'clamp(22px, 4vw, 34px)',
            fontWeight: 700,
            color: '#0A0A0A',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}
        >
          All seven. Running simultaneously.
        </h3>
        <BookDemoButton className="btn-base btn-primary">Book a demo</BookDemoButton>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const children = el.querySelectorAll('.hero-animate')
    children.forEach((child, i) => {
      const c = child as HTMLElement
      c.style.opacity = '0'
      c.style.transform = 'translateY(20px)'
      c.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s,
                            transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          c.style.opacity = '1'
          c.style.transform = 'translateY(0)'
        })
      })
    })
  }, [])

  return (
    <section
      className="flex flex-col items-center justify-center text-center px-10"
      style={{ minHeight: 'calc(100vh - 60px)', paddingTop: '80px', paddingBottom: '60px' }}
    >
      <div ref={heroRef} className="max-w-[680px] mx-auto">

        {/* Category pill */}
        <div className="hero-animate mb-6">
          <span
            className="inline-block text-[10px] font-semibold font-ui uppercase tracking-[0.07em] px-3 py-1 rounded-full"
            style={{
              color: '#0284C7',
              background: 'rgba(2,132,199,0.08)',
              border: '1px solid rgba(2,132,199,0.15)',
            }}
          >
            Workforce Operations
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-animate font-display font-extrabold text-ink"
          style={{
            fontSize: 'clamp(40px, 5.5vw, 68px)',
            letterSpacing: '-0.04em',
            lineHeight: '1.0',
            marginBottom: '20px',
          }}
        >
          Seven agents.{' '}
          <br className="hidden sm:block" />
          One workforce that{' '}
          <br className="hidden sm:block" />
          runs itself.
        </h1>

        {/* Subhead */}
        <p
          className="hero-animate font-ui text-ink3 mx-auto"
          style={{
            fontSize: '17px',
            lineHeight: '1.7',
            maxWidth: '440px',
            marginBottom: '32px',
          }}
        >
          From the 6am callout to the last shift of the month.
          Every shift, credential, and approval — handled automatically.
        </p>

        {/* CTAs */}
        <div className="hero-animate flex items-center justify-center gap-3 flex-wrap">
          <BookDemoButton className="btn-base btn-primary">
            Book a demo
          </BookDemoButton>
          <Link href="/agents" className="btn-base btn-ghost group">
            Explore Financial <span className="arrow-icon">→</span>
          </Link>
        </div>

        {/* Scroll cue */}
        <div
          className="hero-animate hidden md:flex flex-col items-center gap-2 mt-14"
          aria-hidden="true"
        >
          <div
            className="relative overflow-hidden"
            style={{ width: '1px', height: '52px', background: 'rgba(107,63,160,0.12)' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1px',
                height: '16px',
                background: 'rgba(107,63,160,0.5)',
                animation: 'scrollCue 1.8s ease-in-out infinite',
              }}
            />
          </div>
          <p
            className="font-mono"
            style={{
              fontSize: '9px',
              letterSpacing: '0.08em',
              color: 'rgba(107,63,160,0.3)',
              textTransform: 'uppercase',
            }}
          >
            7 agents below
          </p>
        </div>

      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════
// DESKTOP SCROLL SECTION — SVG line + all 7 agent steps
// ════════════════════════════════════════════════════════════════

function ScrollSection({ sv }: { sv: MotionValue<number> }) {
  // ── Reveal motion values — all hooks at top level ──────────
  const s1Pill  = useStepReveal(sv, THRESHOLDS.step1Pill)
  const s1Proto = useStepReveal(sv, THRESHOLDS.step1Proto)
  const s2Pill  = useStepReveal(sv, THRESHOLDS.step2Pill)
  const s2Proto = useStepReveal(sv, THRESHOLDS.step2Proto)
  const s3Pill  = useStepReveal(sv, THRESHOLDS.step3Pill)
  const s3Proto = useStepReveal(sv, THRESHOLDS.step3Proto)
  const s4Pill  = useStepReveal(sv, THRESHOLDS.step4Pill)
  const s4Proto = useStepReveal(sv, THRESHOLDS.step4Proto)
  const s5Pill  = useStepReveal(sv, THRESHOLDS.step5Pill)
  const s5Proto = useStepReveal(sv, THRESHOLDS.step5Proto)
  const s6Pill  = useStepReveal(sv, THRESHOLDS.step6Pill)
  const s6Proto = useStepReveal(sv, THRESHOLDS.step6Proto)
  const s7Pill  = useStepReveal(sv, THRESHOLDS.step7Pill)
  const s7Proto = useStepReveal(sv, THRESHOLDS.step7Proto)

  // ── Panel visibility — force remount when panel appears (Fix 2 Level 3) ─
  const [visiblePanels, setVisiblePanels] = useState<Set<number>>(new Set())

  useMotionValueEvent(s1Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(1)) return prev
      const s = new Set(prev); s.add(1); return s
    })
  })
  useMotionValueEvent(s2Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(2)) return prev
      const s = new Set(prev); s.add(2); return s
    })
  })
  useMotionValueEvent(s3Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(3)) return prev
      const s = new Set(prev); s.add(3); return s
    })
  })
  useMotionValueEvent(s4Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(4)) return prev
      const s = new Set(prev); s.add(4); return s
    })
  })
  useMotionValueEvent(s5Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(5)) return prev
      const s = new Set(prev); s.add(5); return s
    })
  })
  useMotionValueEvent(s6Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(6)) return prev
      const s = new Set(prev); s.add(6); return s
    })
  })
  useMotionValueEvent(s7Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => {
      if (prev.has(7)) return prev
      const s = new Set(prev); s.add(7); return s
    })
  })

  // ── Closing text — IntersectionObserver (Fix 7) ─────────────
  const closingRef = useRef<HTMLDivElement>(null)
  const [closingVisible, setClosingVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setClosingVisible(true) },
      { threshold: 0.2 }
    )
    if (closingRef.current) observer.observe(closingRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── SVG LINE OVERLAY (absolute, full section) ─────────── */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        preserveAspectRatio="none"
        viewBox={`0 0 1200 ${SECTION_HEIGHT}`}
      >
        {/* Static lead-in stub: always visible, connects header to animated line start */}
        <line
          x1="200" y1="80"
          x2="200" y2="430"
          stroke="#6B3FA0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="#6B3FA0"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: sv }}
        />
      </svg>

      {/* ── CONTENT LAYER ─────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
        }}
      >

        {/* ── INTRO TEXT ─────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            maxWidth: '460px',
            zIndex: 10,
            background: '#F9F8FF',
            paddingRight: '24px',
            paddingBottom: '20px',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bricolage)',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            One operational day.
            <br />Seven agents. Nothing missed.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-geist-sans)',
              fontSize: '16px',
              color: '#6B6B6B',
              lineHeight: 1.7,
              maxWidth: '360px',
            }}
          >
            Scroll through a single shift cycle — from schedule to close —
            and see which agent is handling what.
          </p>
        </div>

        {/* ── BRIDGE LABELS (Fix 1 — new top values) ─────────── */}
        <BridgeLabelEl topPx={1130} sv={sv} threshold={THRESHOLDS.label1}>
          CATCHING RISK BEFORE IT ESCALATES
        </BridgeLabelEl>
        <BridgeLabelEl topPx={1860} sv={sv} threshold={THRESHOLDS.label2}>
          STAFF NEEDS ANSWERS
        </BridgeLabelEl>
        <BridgeLabelEl topPx={2560} sv={sv} threshold={THRESHOLDS.label3}>
          6:04 AM — CALLOUT RECEIVED
        </BridgeLabelEl>
        <BridgeLabelEl topPx={3260} sv={sv} threshold={THRESHOLDS.label4}>
          REQUESTS ARRIVE OVERNIGHT
        </BridgeLabelEl>
        <BridgeLabelEl topPx={3960} sv={sv} threshold={THRESHOLDS.label5}>
          CAREGIVERS IN THE FIELD
        </BridgeLabelEl>
        <BridgeLabelEl topPx={4660} sv={sv} threshold={THRESHOLDS.label6}>
          AUDIT APPROACHING
        </BridgeLabelEl>

        {/* ── STEP 1: SCHEDULER (RIGHT pill, LEFT prototype) ─── */}
        <motion.div
          style={{
            opacity: s1Proto.opacity,
            y: s1Proto.y,
            scale: s1Proto.scale,
            position: 'absolute',
            top: '460px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="scheduler-assist" width={560}>
            <SchedulerPanel key={`scheduler-${visiblePanels.has(1) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <motion.div
          style={{
            opacity: s1Pill.opacity,
            y: s1Pill.y,
            position: 'absolute',
            top: '490px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="Scheduler Assist" index={1} align="right" />
          <Desc align="right">
            Your scheduling manager opens the coverage report on Friday afternoon.
            Three callouts. Twelve open shifts. Forty-eight hours to fill them.
            <br /><br />
            Scheduler Assist already has the optimised schedule ready — scored
            against availability, certifications, and overtime limits — before
            anyone opens a spreadsheet.
          </Desc>
        </motion.div>

        {/* ── STEP 2: BURNOUT (LEFT pill, RIGHT prototype) ────── */}
        <motion.div
          style={{
            opacity: s2Pill.opacity,
            y: s2Pill.y,
            position: 'absolute',
            top: '1190px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="Burnout Prevention" index={2} align="left" />
          <Desc align="left">
            {`It's Tuesday. One of your ICU nurses has logged 68 hours this week.
            Nobody on the floor flagged it — because nobody had time to check the
            scheduling history.`}
            <br /><br />
            Burnout Prevention monitors patterns across your entire roster and
            flags the risk before it becomes your next 6am callout.
          </Desc>
        </motion.div>
        <motion.div
          style={{
            opacity: s2Proto.opacity,
            y: s2Proto.y,
            scale: s2Proto.scale,
            position: 'absolute',
            top: '1160px',
            left: '500px',
          }}
        >
          <PrototypeWrapper slug="staff-burnout-prevention" width={580}>
            <BurnoutPanel key={`burnout-${visiblePanels.has(2) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── STEP 3: STAFFASSIST (RIGHT pill, LEFT prototype) ── */}
        <motion.div
          style={{
            opacity: s3Proto.opacity,
            y: s3Proto.y,
            scale: s3Proto.scale,
            position: 'absolute',
            top: '1890px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="staffassist" width={560}>
            <StaffAssistPanel key={`staffassist-${visiblePanels.has(3) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <motion.div
          style={{
            opacity: s3Pill.opacity,
            y: s3Pill.y,
            position: 'absolute',
            top: '1890px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="StaffAssist Agent" index={3} align="right" />
          <Desc align="right">
            David wants to know if he can swap Thursday. He texts his coordinator,
            {`who's already handling twelve other things.`}
            <br /><br />
            StaffAssist answers in two seconds — checks his eligibility, finds an
            available swap partner, and initiates the request. The coordinator
            never had to pick up the phone.
          </Desc>
        </motion.div>

        {/* ── STEP 4: AUTO SWAP (LEFT pill, RIGHT prototype) ─── */}
        <motion.div
          style={{
            opacity: s4Pill.opacity,
            y: s4Pill.y,
            position: 'absolute',
            top: '2590px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="Auto Swap" index={4} align="left" />
          <Desc align="left">
            6:04am. Amanda called in sick for the 7am shift. Your coordinator
            opens the contact list and starts working through it.
            <br /><br />
            Auto Swap finds Sarah P., confirms her certification and overtime
            status, and sends the confirmation — in 28 seconds. Before the
            coordinator reaches their third call.
          </Desc>
        </motion.div>
        <motion.div
          style={{
            opacity: s4Proto.opacity,
            y: s4Proto.y,
            scale: s4Proto.scale,
            position: 'absolute',
            top: '2590px',
            left: '500px',
          }}
        >
          <PrototypeWrapper slug="auto-swap" width={580}>
            <AutoSwapPanel key={`autoswap-${visiblePanels.has(4) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── STEP 5: AUTO APPROVAL (RIGHT pill, LEFT prototype) */}
        <motion.div
          style={{
            opacity: s5Proto.opacity,
            y: s5Proto.y,
            scale: s5Proto.scale,
            position: 'absolute',
            top: '3290px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="auto-approval" width={560}>
            <AutoApprovalPanel key={`autoapproval-${visiblePanels.has(5) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <motion.div
          style={{
            opacity: s5Pill.opacity,
            y: s5Pill.y,
            position: 'absolute',
            top: '3290px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="Auto Approval" index={5} align="right" />
          <Desc align="right">
            11:47pm. Jamie L. submits a time-off request for next Thursday. No
            conflicts. No overtime. Policy clear.
            <br /><br />
            Auto Approval processes it immediately. When Jamie checks his phone
            in the morning, {`it's already done. The manager never had to log in.`}
          </Desc>
        </motion.div>

        {/* ── STEP 6: VISIT VERIFICATION (LEFT pill, RIGHT proto) */}
        <motion.div
          style={{
            opacity: s6Pill.opacity,
            y: s6Pill.y,
            position: 'absolute',
            top: '3990px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="Visit Verification" index={6} align="left" />
          <Desc align="left">
            {`Mrs. Garcia's visit is logged as complete at 9am. The GPS record shows
            a 28-minute visit — not the scheduled 60.`}
            <br /><br />
            Visit Verification flags the discrepancy before billing runs. The
            billing team never saw it. The compliance team never had to explain it.
          </Desc>
        </motion.div>
        <motion.div
          style={{
            opacity: s6Proto.opacity,
            y: s6Proto.y,
            scale: s6Proto.scale,
            position: 'absolute',
            top: '3990px',
            left: '500px',
          }}
        >
          <PrototypeWrapper slug="visit-verification" width={580}>
            <EVVPanel key={`evv-${visiblePanels.has(6) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── STEP 7: CREDENTIALING (RIGHT pill, LEFT prototype) */}
        <motion.div
          style={{
            opacity: s7Proto.opacity,
            y: s7Proto.y,
            scale: s7Proto.scale,
            position: 'absolute',
            top: '4690px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="physician-credentialing" width={560}>
            <CredentialingPanel key={`credentialing-${visiblePanels.has(7) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <motion.div
          style={{
            opacity: s7Pill.opacity,
            y: s7Pill.y,
            position: 'absolute',
            top: '4690px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <AgentStepMarker label="Physician Credentialing" index={7} align="right" />
          <Desc align="right">
            {`Dr. Patel's DEA registration expires in 11 days. The audit is in four
            weeks. Physician Credentialing flagged it at 90 days, sent a reminder
            at 60, and initiated the renewal at 30.`}
            <br /><br />
            Your admin team found out about it when it was already handled.
          </Desc>
        </motion.div>

        {/* ── CLOSING TEXT — IntersectionObserver, background masks line (Fix 7) */}
        <div
          ref={closingRef}
          style={{
            position: 'absolute',
            top: '5350px',
            left: '50%',
            maxWidth: '680px',
            textAlign: 'center',
            zIndex: 10,
            // White background masks the SVG line passing behind this element
            background: '#F9F8FF',
            padding: '40px 48px',
            borderRadius: '20px',
            // Combined centering + reveal animation via CSS transition
            opacity: closingVisible ? 1 : 0,
            transform: closingVisible
              ? 'translateX(-50%) translateY(0px)'
              : 'translateX(-50%) translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-bricolage)',
              fontSize: 'clamp(26px, 3vw, 40px)',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            All seven. Running simultaneously.
            <br />While your team focuses on what needs them.
          </h3>
          <BookDemoButton className="btn-base btn-primary">
            Book a demo
          </BookDemoButton>
        </div>

      </div>
    </>
  )
}

// ════════════════════════════════════════════════════════════════
// PAGE ROOT
// ════════════════════════════════════════════════════════════════

export default function WorkforcePage() {
  // Mobile detection — hooks always run (rules of hooks)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // Scroll tracking — always created, passed to ScrollSection on desktop
  const sectionRef = useRef<HTMLElement>(null)

  // Direct mapping: scrollYProgress=0 when section enters viewport, 1 when it exits.
  // No buffer — thresholds are calibrated against this direct range.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div>
      {/* Hero — always rendered */}
      <Hero />

      {/* Scroll section (desktop) vs linear stack (mobile) */}
      {isMobile ? (
        <MobileAgentStack />
      ) : (
        <section
          ref={sectionRef}
          className="relative w-full"
          style={{ height: `${SECTION_HEIGHT}px` }}
        >
          <ScrollSection sv={scrollYProgress} />
        </section>
      )}
    </div>
  )
}
