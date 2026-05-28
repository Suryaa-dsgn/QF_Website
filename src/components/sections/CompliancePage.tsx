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
import CredentialingPanel   from '@/components/ui/panels/CredentialingPanel'
import ClaimsCompliancePanel from '@/components/ui/panels/ClaimsCompliancePanel'
import CompliancePanel      from '@/components/ui/panels/CompliancePanel'

// ── Scroll-line data ──────────────────────────────────────────────
import { PATH_D, THRESHOLDS, SECTION_HEIGHT } from '@/data/complianceStepsV1'

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
          color: 'rgba(8, 145, 178, 0.35)',
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
          background: '#0891B2',
          color: '#FFFFFF',
          borderRadius: '14px',
          padding: '14px 28px',
          fontFamily: 'var(--font-bricolage)',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          boxShadow:
            '0 8px 32px rgba(8, 145, 178, 0.40), 0 2px 8px rgba(8, 145, 178, 0.20)',
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
          color: 'rgba(8, 145, 178, 0.45)',
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
// MOBILE COMPLIANCE STACK — linear fallback for <1024px
// ════════════════════════════════════════════════════════════════

const MOBILE_STEPS = [
  {
    index: 1,
    slug: 'provider-credentialing',
    label: 'Provider Credentialing',
    Panel: CredentialingPanel,
    desc: "Dr. Patel's DEA registration expires in 11 days. Nobody flagged it. Provider Credentialing flagged it — at 90 days, 60 days, and today. Renewal document queued. Audit log updated. No compliance gap.",
  },
  {
    index: 2,
    slug: 'claims-compliance',
    label: 'Claims Compliance',
    Panel: ClaimsCompliancePanel,
    desc: 'Claim 4892: modifier conflict on CPT 99213. Claims Compliance flagged it before submission. Corrected and resubmitted in 4 minutes. No denial. No revenue lost.',
  },
  {
    index: 3,
    slug: 'contract-compliance',
    label: 'Contract Compliance',
    Panel: CompliancePanel,
    desc: "Bellmore's invoice matches the PO. But clause 3b requires a 5% volume discount on orders over $5,000. Contract Compliance flagged $420 in revenue leakage before payment cleared. Dispute filed automatically.",
  },
]

function MobileComplianceStack() {
  return (
    <div style={{ padding: '56px 20px 0', maxWidth: '560px', margin: '0 auto' }}>

      {/* Section header */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'clamp(28px, 7vw, 40px)',
            fontWeight: 700,
            color: '#0A0A0A',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: '12px',
          }}
        >
          Zero compliance gaps.
          <br />Three agents. Always on.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '15px',
            color: '#6B7280',
            lineHeight: 1.7,
          }}
        >
          From credentialing to contract terms — every agent, every check.
        </p>
      </div>

      {/* Step cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {MOBILE_STEPS.map(({ index, slug, label, Panel, desc }) => (
          <div
            key={slug}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(8,145,178,0.10)',
              borderRadius: '20px',
              padding: '28px 24px',
              boxShadow: '0 2px 12px rgba(8,145,178,0.06)',
            }}
          >
            {/* Agent pill — AgentStepMarker already renders the "Agent 01" label above the pill */}
            <AgentStepMarker label={label} index={index} align="left" />

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-geist-sans)',
                fontSize: '14px',
                color: '#6B7280',
                lineHeight: 1.75,
                margin: '20px 0 24px',
              }}
            >
              {desc}
            </p>

            {/* Animated panel — full 460px height matches desktop; loops continuously */}
            <div
              style={{
                width: '100%',
                height: '520px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(8,145,178,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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

      {/* Closing CTA card */}
      <div
        style={{
          marginTop: '24px',
          marginBottom: '64px',
          padding: '40px 28px',
          background: '#0A0A0A',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: 'clamp(24px, 6vw, 32px)',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '10px',
          }}
        >
          All three. Running around the clock.
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.65,
            marginBottom: '24px',
          }}
        >
          While your compliance team focuses on exceptions.
        </p>
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
              color: '#0891B2',
              background: 'rgba(8,145,178,0.08)',
              border: '1px solid rgba(8,145,178,0.18)',
            }}
          >
            Compliance &amp; Credentialing
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
          Three agents.{' '}
          <br className="hidden sm:block" />
          Zero compliance{' '}
          <br className="hidden sm:block" />
          gaps.
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
          From provider credentialing to contract terms.
          Every credential, claim, and clause — verified automatically.
        </p>

        {/* CTAs */}
        <div className="hero-animate flex items-center justify-center gap-3 flex-wrap">
          <BookDemoButton className="btn-base btn-primary">
            Talk to an Expert
          </BookDemoButton>
          <Link href="/workforce" className="btn-base btn-ghost group">
            Explore Workforce <span className="arrow-icon">→</span>
          </Link>
        </div>

        {/* Scroll cue */}
        <div
          className="hero-animate hidden md:flex flex-col items-center gap-2 mt-14"
          aria-hidden="true"
        >
          <div
            className="relative overflow-hidden"
            style={{ width: '1px', height: '52px', background: 'rgba(8,145,178,0.12)' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1px',
                height: '16px',
                background: 'rgba(8,145,178,0.5)',
                animation: 'scrollCue 1.8s ease-in-out infinite',
              }}
            />
          </div>
          <p
            className="font-mono"
            style={{
              fontSize: '9px',
              letterSpacing: '0.08em',
              color: 'rgba(8,145,178,0.3)',
              textTransform: 'uppercase',
            }}
          >
            3 agents below
          </p>
        </div>

      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════════════
// DESKTOP SCROLL SECTION — SVG line + 3 agent steps
// ════════════════════════════════════════════════════════════════

function ScrollSection({ sv }: { sv: MotionValue<number> }) {
  const s1Pill  = useStepReveal(sv, THRESHOLDS.step1Pill)
  const s1Proto = useStepReveal(sv, THRESHOLDS.step1Proto)
  const s2Pill  = useStepReveal(sv, THRESHOLDS.step2Pill)
  const s2Proto = useStepReveal(sv, THRESHOLDS.step2Proto)
  const s3Pill  = useStepReveal(sv, THRESHOLDS.step3Pill)
  const s3Proto = useStepReveal(sv, THRESHOLDS.step3Proto)

  // Panel visibility — remount key to restart animations on entry
  const [visiblePanels, setVisiblePanels] = useState<Set<number>>(new Set())

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
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="#0891B2"
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
            Zero compliance gaps.
            <br />Three agents. Always on.
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
            Scroll through a single compliance cycle — from provider credentialing
            to contract enforcement — and see which agent is handling what.
          </p>
        </div>

        {/* ── BRIDGE LABELS ───────────────────────────────────── */}
        <BridgeLabelEl topPx={1130} sv={sv} threshold={THRESHOLDS.label1}>
          DR. CHEN CREDENTIALED. FIRST CLAIM IN THE SYSTEM.
        </BridgeLabelEl>
        <BridgeLabelEl topPx={1830} sv={sv} threshold={THRESHOLDS.label2}>
          CLAIM DENIED. CONTRACT TERMS NEED REVIEW.
        </BridgeLabelEl>

        {/* ── STEP 1: PROVIDER CREDENTIALING (RIGHT pill, LEFT prototype) ── */}
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
          <PrototypeWrapper slug="provider-credentialing" width={560}>
            <CredentialingPanel key={`cred-${visiblePanels.has(1) ? 'v' : 'h'}`} />
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
            <AgentStepMarker label="Provider Credentialing" index={1} align="right" />
            <Desc align="right">
              {"Dr. Patel's DEA registration expires in 11 days. Nobody flagged it."}
              <br /><br />
              Provider Credentialing flagged it. Reminder sent at 90 days, 60 days, and today.
              Renewal document queued. Audit log updated. Complete.
            </Desc>
          </motion.div>
        </div>

        {/* ── STEP 2: CLAIMS COMPLIANCE (LEFT pill, RIGHT prototype) ── */}
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
            <AgentStepMarker label="Claims Compliance" index={2} align="left" />
            <Desc align="left">
              Claim 4892 has a modifier conflict — CPT 99213 with modifier 25
              requires additional documentation.
              <br /><br />
              Claims Compliance flagged it before submission. Corrected and resubmitted
              in 4 minutes. No denial. No revenue lost.
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
          <PrototypeWrapper slug="claims-compliance" width={580}>
            <ClaimsCompliancePanel key={`claims-${visiblePanels.has(2) ? 'v' : 'h'}`} />
          </PrototypeWrapper>
        </motion.div>

        {/* ── STEP 3: CONTRACT COMPLIANCE (RIGHT pill, LEFT prototype) ── */}
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
          <PrototypeWrapper slug="contract-compliance" width={560}>
            <CompliancePanel key={`contract-${visiblePanels.has(3) ? 'v' : 'h'}`} />
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
            <AgentStepMarker label="Contract Compliance" index={3} align="right" />
            <Desc align="right">
              {"Bellmore's invoice matches the PO. Amounts add up."}
              <br /><br />
              But clause 3b of the services agreement requires a 5% volume discount
              on orders over $5,000. Contract Compliance flagged $420 in revenue
              leakage before payment cleared. Dispute filed automatically.
            </Desc>
          </motion.div>
        </div>

        {/* ── CLOSING TEXT ────────────────────────────────────── */}
        <div
          ref={closingRef}
          style={{
            position: 'absolute',
            top: '2400px',
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
            All three. Running around the clock.
            <br />While your compliance team focuses on exceptions.
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

export default function CompliancePage() {
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

      {/* Mobile layout — visible below lg, hidden on desktop */}
      <div className="block lg:hidden">
        <MobileComplianceStack />
      </div>

      {/* Desktop scroll section — hidden below lg (display:none collapses the height) */}
      <section
        ref={sectionRef}
        className="hidden lg:block relative w-full"
        style={{ height: `${SECTION_HEIGHT}px` }}
      >
        <ScrollSection sv={scrollYProgress} />
      </section>

      <Footer />
    </div>
  )
}
