'use client'

import { useState, useEffect, useRef } from 'react'
import {
  useMotionValue,
  useTransform,
  motion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import Link from 'next/link'
import BookDemoButton from '@/components/BookDemoButton'
import Footer from '@/components/Footer'

// ── Panel components ──────────────────────────────────────────────
import ScheduleOptimizerPanel from '@/components/ui/panels/ScheduleOptimizerPanel'
import BurnoutPanel           from '@/components/ui/panels/BurnoutPanel'
import EVVPanel               from '@/components/ui/panels/EVVPanel'
import ReferralIntakePanel    from '@/components/ui/panels/ReferralIntakePanel'
import CapacityPlannerPanel   from '@/components/ui/panels/CapacityPlannerPanel'
import StaffAssistPanel       from '@/components/ui/panels/StaffAssistPanel'
import CallOffManagementPanel from '@/components/ui/panels/CallOffManagementPanel'
import AutoApprovalPanel      from '@/components/ui/panels/AutoApprovalPanel'

// ── Scroll-line data ──────────────────────────────────────────────
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
// AGENT STEP MARKER — sequence number + prominent pill
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
// PROTOTYPE PANEL WRAPPER
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
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red" />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green" />
        </div>
        <div className="browser-url">app.quickflows.ai / {slug}</div>
      </div>
      <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// BRIDGE LABEL
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
// DESCRIPTION TEXT
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
// MOBILE WORKFORCE STACK — linear fallback for <1024px
// ════════════════════════════════════════════════════════════════

const MOBILE_STEPS = [
  {
    index: 1,
    slug: 'schedule-optimizer',
    label: 'Schedule Optimizer',
    Panel: ScheduleOptimizerPanel,
    desc: 'Tuesday PM has three coverage gaps. Overtime risk flags before the shift even starts. Schedule Optimizer scanned 847 records, identified clustering opportunities, and resolved three conflicts before the coordinator opened the dashboard.',
  },
  {
    index: 2,
    slug: 'staff-burnout-prevention',
    label: 'Staff Burnout Prevention',
    Panel: BurnoutPanel,
    desc: 'The nurse who called out last Monday called out again today. Three callouts in six days. 54-hour week. Burnout Prevention flagged her pattern on Wednesday — before the fourth callout happened. Intervention scheduled.',
  },
  {
    index: 3,
    slug: 'visit-verification',
    label: 'Visit Verification (EVV)',
    Panel: EVVPanel,
    desc: "The billing record says 9am. The EVV log says 28 minutes, not 60. Visit Verification flagged the discrepancy before the billing sync ran. GPS confirmed arrival and departure. Claim corrected automatically.",
  },
  {
    index: 4,
    slug: 'referral-intake',
    label: 'Referral Intake',
    Panel: ReferralIntakePanel,
    desc: 'New referral: 73-year-old post-surgical, home care 5×/week. Referral Intake extracted demographics, checked for duplicates, matched against two providers with capacity, and surfaced an intake summary in 40 seconds.',
  },
  {
    index: 5,
    slug: 'capacity-planner',
    label: 'Capacity Planner',
    Panel: CapacityPlannerPanel,
    desc: 'Three providers, six open shifts for next week. Capacity Planner forecasted shortfalls by 11am Monday — before anyone asked. Two understaffed weeks flagged. Recruitment queue opened. No firefighting on Friday.',
  },
  {
    index: 6,
    slug: 'staffassist',
    label: 'StaffAssist',
    Panel: StaffAssistPanel,
    desc: "She asks if she can request PTO for April 12th. It's a Thursday — one other RN already off. PTO balance confirmed: 3 days left. Request submitted. Response within 2 hours. No manager involved.",
  },
  {
    index: 7,
    slug: 'call-off-management',
    label: 'Call-Off Management',
    Panel: CallOffManagementPanel,
    desc: '6:02am. Amanda called in sick. Call-Off Management recorded the call-off, found the best available replacement, and updated the schedule. Maria confirmed by 6:18am. Gap time: 16 minutes. No phone calls.',
  },
  {
    index: 8,
    slug: 'auto-approval',
    label: 'Auto Approval',
    Panel: AutoApprovalPanel,
    desc: "It's 11pm. A compliant time-off request is sitting in a queue. 14 requests processed this week. The compliant ones cleared automatically — licence, overtime, policy all checked. Managers only see the exceptions.",
  },
]

function MobileWorkforceStack() {
  return (
    <div className="section-container py-20">
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
          The 6am callout.
          <br />Eight agents. Nothing uncovered.
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
          From schedule gaps to the last approval — every agent, every step.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {MOBILE_STEPS.map(({ index, slug, label, Panel, desc }) => (
          <div key={slug}>
            <div className="mb-4">
              <AgentStepMarker label={label} index={index} align="left" />
            </div>
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
          All eight. Running simultaneously.
        </h3>
        <BookDemoButton className="btn-base btn-primary">Talk to an Expert</BookDemoButton>
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
              border: '1px solid rgba(2,132,199,0.18)',
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
          Eight agents.{' '}
          <br className="hidden sm:block" />
          One workforce{' '}
          <br className="hidden sm:block" />
          that runs itself.
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
          Every shift, credential, and approval — handled.
        </p>

        {/* CTAs */}
        <div className="hero-animate flex items-center justify-center gap-3 flex-wrap">
          <BookDemoButton className="btn-base btn-primary">
            Talk to an Expert
          </BookDemoButton>
          <Link href="/financial" className="btn-base btn-ghost group">
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
            8 agents below
          </p>
        </div>

      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════
// DESKTOP SCROLL SECTION — SVG line + 8 agent steps
// ════════════════════════════════════════════════════════════════

function ScrollSection({ sv }: { sv: MotionValue<number> }) {
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
  const s8Pill  = useStepReveal(sv, THRESHOLDS.step8Pill)
  const s8Proto = useStepReveal(sv, THRESHOLDS.step8Proto)

  // Panel visibility — remount key restarts panel animations on entry
  const [visiblePanels, setVisiblePanels] = useState<Set<number>>(new Set())

  useMotionValueEvent(s1Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(1)) return prev; const s = new Set(prev); s.add(1); return s })
  })
  useMotionValueEvent(s2Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(2)) return prev; const s = new Set(prev); s.add(2); return s })
  })
  useMotionValueEvent(s3Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(3)) return prev; const s = new Set(prev); s.add(3); return s })
  })
  useMotionValueEvent(s4Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(4)) return prev; const s = new Set(prev); s.add(4); return s })
  })
  useMotionValueEvent(s5Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(5)) return prev; const s = new Set(prev); s.add(5); return s })
  })
  useMotionValueEvent(s6Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(6)) return prev; const s = new Set(prev); s.add(6); return s })
  })
  useMotionValueEvent(s7Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(7)) return prev; const s = new Set(prev); s.add(7); return s })
  })
  useMotionValueEvent(s8Proto.opacity, 'change', v => {
    if (v > 0.5) setVisiblePanels(prev => { if (prev.has(8)) return prev; const s = new Set(prev); s.add(8); return s })
  })

  // Closing text — IntersectionObserver (stays visible once reached)
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
      {/* ── SVG LINE OVERLAY ──────────────────────────────────── */}
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
        {/* Static lead-in stub: always visible, connects header to animated line */}
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

        {/* ── INTRO TEXT ──────────────────────────────────────── */}
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
            The 6am callout.
            <br />Eight agents. Nothing uncovered.
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
            Scroll through a single week on-call — from the first schedule gap
            to the last approval — and see which agent is handling what.
          </p>
        </div>

        {/* ── BRIDGE LABELS ───────────────────────────────────── */}
        <BridgeLabelEl topPx={1130} sv={sv} threshold={THRESHOLDS.label1}>
          TUESDAY PM HAS THREE GAPS — OVERTIME RISK FLAGGED AT 11PM
        </BridgeLabelEl>
        <BridgeLabelEl topPx={1830} sv={sv} threshold={THRESHOLDS.label2}>
          THE NURSE WHO CALLED OUT LAST MONDAY — CALLED OUT AGAIN
        </BridgeLabelEl>
        <BridgeLabelEl topPx={2530} sv={sv} threshold={THRESHOLDS.label3}>
          THE BILLING RECORD SAYS 9AM. THE EVV LOG SAYS 28 MINUTES.
        </BridgeLabelEl>
        <BridgeLabelEl topPx={3230} sv={sv} threshold={THRESHOLDS.label4}>
          NEW REFERRAL ARRIVING TUESDAY. NOBODY CHECKED CAPACITY.
        </BridgeLabelEl>
        <BridgeLabelEl topPx={3930} sv={sv} threshold={THRESHOLDS.label5}>
          THREE PROVIDERS. SIX OPEN SHIFTS. FORECAST OUT BY FRIDAY.
        </BridgeLabelEl>
        <BridgeLabelEl topPx={4630} sv={sv} threshold={THRESHOLDS.label6}>
          6:02AM. AMANDA CALLED IN SICK.
        </BridgeLabelEl>
        <BridgeLabelEl topPx={5330} sv={sv} threshold={THRESHOLDS.label7}>
          {"IT'S 11PM. A COMPLIANT REQUEST IS SITTING IN A QUEUE."}
        </BridgeLabelEl>

        {/* ── STEP 1: SCHEDULE OPTIMIZER (LEFT proto, RIGHT pill) ── */}
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
          <PrototypeWrapper slug="schedule-optimizer" width={560}>
            <ScheduleOptimizerPanel key={`schedopt-${visiblePanels.has(1) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: '490px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s1Pill.opacity, y: s1Pill.y }}>
            <AgentStepMarker label="Schedule Optimizer" index={1} align="right" />
            <Desc align="right">
              Tuesday PM has a gap. Overtime risk flags before the shift even starts.
              <br /><br />
              Schedule Optimizer scanned 847 records, identified geographic clustering
              opportunities, and resolved three coverage conflicts before the coordinator
              opened the dashboard.
            </Desc>
          </motion.div>
        </div>

        {/* ── STEP 2: STAFF BURNOUT PREVENTION (RIGHT proto, LEFT pill) ── */}
        <div
          style={{
            position: 'absolute',
            top: '1190px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s2Pill.opacity, y: s2Pill.y }}>
            <AgentStepMarker label="Staff Burnout Prevention" index={2} align="left" />
            <Desc align="left">
              The nurse who called out last Monday called out again today.
              Three callouts in six days. 54-hour week.
              <br /><br />
              Burnout Prevention flagged her pattern on Wednesday — before
              the fourth callout happened. Intervention scheduled.
            </Desc>
          </motion.div>
        </div>
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

        {/* ── STEP 3: VISIT VERIFICATION EVV (LEFT proto, RIGHT pill) ── */}
        <motion.div
          style={{
            opacity: s3Proto.opacity,
            y: s3Proto.y,
            scale: s3Proto.scale,
            position: 'absolute',
            top: '1860px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="visit-verification" width={560}>
            <EVVPanel key={`evv-${visiblePanels.has(3) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: '1890px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s3Pill.opacity, y: s3Pill.y }}>
            <AgentStepMarker label="Visit Verification (EVV)" index={3} align="right" />
            <Desc align="right">
              The billing record says 9am. The EVV log says 28 minutes, not 60.
              <br /><br />
              Visit Verification flagged the discrepancy before the billing sync ran.
              GPS confirmed arrival and departure. Claim corrected automatically.
            </Desc>
          </motion.div>
        </div>

        {/* ── STEP 4: REFERRAL INTAKE (RIGHT proto, LEFT pill) ── */}
        <div
          style={{
            position: 'absolute',
            top: '2590px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s4Pill.opacity, y: s4Pill.y }}>
            <AgentStepMarker label="Referral Intake" index={4} align="left" />
            <Desc align="left">
              New referral: 73-year-old post-surgical, home care 5×/week.
              <br /><br />
              Referral Intake extracted demographics, matched against two providers
              with capacity, checked for duplicates. Intake summary ready in 40 seconds.
            </Desc>
          </motion.div>
        </div>
        <motion.div
          style={{
            opacity: s4Proto.opacity,
            y: s4Proto.y,
            scale: s4Proto.scale,
            position: 'absolute',
            top: '2560px',
            left: '500px',
          }}
        >
          <PrototypeWrapper slug="referral-intake" width={580}>
            <ReferralIntakePanel key={`referral-${visiblePanels.has(4) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── STEP 5: CAPACITY PLANNER (LEFT proto, RIGHT pill) ── */}
        <motion.div
          style={{
            opacity: s5Proto.opacity,
            y: s5Proto.y,
            scale: s5Proto.scale,
            position: 'absolute',
            top: '3260px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="capacity-planner" width={560}>
            <CapacityPlannerPanel key={`capacity-${visiblePanels.has(5) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: '3290px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s5Pill.opacity, y: s5Pill.y }}>
            <AgentStepMarker label="Capacity Planner" index={5} align="right" />
            <Desc align="right">
              Three providers. Six open shifts for next week.
              <br /><br />
              Capacity Planner forecasted shortfalls by 11am Monday — before anyone
              asked. Two understaffed weeks flagged. Recruitment queue opened.
              No firefighting on Friday.
            </Desc>
          </motion.div>
        </div>

        {/* ── STEP 6: STAFFASSIST (RIGHT proto, LEFT pill) ── */}
        <div
          style={{
            position: 'absolute',
            top: '3990px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s6Pill.opacity, y: s6Pill.y }}>
            <AgentStepMarker label="StaffAssist" index={6} align="left" />
            <Desc align="left">
              {"She asks if she can request PTO for April 12th. It's a Thursday — one other RN already off."}
              <br /><br />
              PTO balance confirmed: 3 days left. Request submitted.
              Response within 2 hours. No manager involved.
            </Desc>
          </motion.div>
        </div>
        <motion.div
          style={{
            opacity: s6Proto.opacity,
            y: s6Proto.y,
            scale: s6Proto.scale,
            position: 'absolute',
            top: '3960px',
            left: '500px',
          }}
        >
          <PrototypeWrapper slug="staffassist" width={580}>
            <StaffAssistPanel key={`staffassist-${visiblePanels.has(6) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── STEP 7: CALL-OFF MANAGEMENT (LEFT proto, RIGHT pill) ── */}
        <motion.div
          style={{
            opacity: s7Proto.opacity,
            y: s7Proto.y,
            scale: s7Proto.scale,
            position: 'absolute',
            top: '4660px',
            left: '40px',
          }}
        >
          <PrototypeWrapper slug="call-off-management" width={560}>
            <CallOffManagementPanel key={`calloff-${visiblePanels.has(7) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>
        <div
          style={{
            position: 'absolute',
            top: '4690px',
            right: '40px',
            textAlign: 'right',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s7Pill.opacity, y: s7Pill.y }}>
            <AgentStepMarker label="Call-Off Management" index={7} align="right" />
            <Desc align="right">
              6:02am. Amanda called in sick.
              <br /><br />
              Call-Off Management recorded the call-off, found the best available
              replacement, and updated the schedule. Maria confirmed by 6:18am.
              Gap time: 16 minutes. No phone calls.
            </Desc>
          </motion.div>
        </div>

        {/* ── STEP 8: AUTO APPROVAL (RIGHT proto, LEFT pill) ── */}
        <div
          style={{
            position: 'absolute',
            top: '5390px',
            left: '40px',
            background: '#F9F8FF',
            padding: '0 16px 16px',
            borderRadius: '8px',
          }}
        >
          <motion.div style={{ opacity: s8Pill.opacity, y: s8Pill.y }}>
            <AgentStepMarker label="Auto Approval" index={8} align="left" />
            <Desc align="left">
              {"It's 11pm. A compliant time-off request is sitting in a queue."}
              <br /><br />
              14 requests processed this week. The compliant ones cleared
              automatically — licence, overtime, policy all checked.
              Managers only see the exceptions.
            </Desc>
          </motion.div>
        </div>
        <motion.div
          style={{
            opacity: s8Proto.opacity,
            y: s8Proto.y,
            scale: s8Proto.scale,
            position: 'absolute',
            top: '5360px',
            left: '500px',
          }}
        >
          <PrototypeWrapper slug="auto-approval" width={580}>
            <AutoApprovalPanel key={`autoapproval-${visiblePanels.has(8) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── CLOSING TEXT ────────────────────────────────────── */}
        <div
          ref={closingRef}
          style={{
            position: 'absolute',
            top: '5850px',
            left: '50%',
            maxWidth: '680px',
            textAlign: 'center',
            zIndex: 10,
            background: '#F9F8FF',
            padding: '40px 48px',
            borderRadius: '20px',
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
            All eight. Running simultaneously.
            <br />While your team focuses on what actually needs them.
          </h3>
          <BookDemoButton className="btn-base btn-primary">
            Talk to an Expert
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
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const sectionRef = useRef<HTMLElement>(null)
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      // progress = 0 when section top hits viewport bottom (section just entering)
      // progress = 1 when section bottom hits viewport bottom
      // This matches the thresholds which are calibrated as y_px / SECTION_HEIGHT
      const progress = (window.innerHeight - rect.top) / el.offsetHeight
      scrollYProgress.set(Math.max(0, Math.min(1, progress)))
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [scrollYProgress])

  return (
    <div>
      <Hero />
      {isMobile ? (
        <MobileWorkforceStack />
      ) : (
        <section
          ref={sectionRef}
          className="relative w-full"
          style={{ height: `${SECTION_HEIGHT}px` }}
        >
          <ScrollSection sv={scrollYProgress} />
        </section>
      )}
      <Footer />
    </div>
  )
}
