'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { ArrowRight, CalendarDays, TrendingUp, ShieldCheck } from 'lucide-react'

// ─── TYPES ───────────────────────────────────────────────────────

interface CapabilityChip {
  label: string
}

interface VerticalCardProps {
  pillLabel: string
  pillColor: string
  pillBg: string
  pillBorder: string
  headline: string[]
  body: string[]
  chips: CapabilityChip[]
  agentCount: string
  ctaLabel: string
  ctaHref: string
  icon: React.ElementType
  delay?: number
}

// ─── VERTICAL CARD ───────────────────────────────────────────────

function VerticalCard({
  pillLabel, pillColor, pillBg, pillBorder,
  headline, body, chips, agentCount, ctaLabel, ctaHref, icon: Icon, delay = 0,
}: VerticalCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                           transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const agentNum = agentCount.split(' ')[0]

  return (
    <div
      ref={ref}
      className="bg-white rounded-[20px] border border-[--border] overflow-hidden flex flex-col"
      style={{
        transition: 'transform 250ms ease-out, border-color 250ms ease-out, box-shadow 250ms ease-out',
      }}
      onMouseEnter={e => {
        const t = e.currentTarget
        t.style.transform = 'translateY(-4px)'
        t.style.borderColor = `${pillColor}30`
        t.style.boxShadow = `0 14px 44px ${pillColor}22`
      }}
      onMouseLeave={e => {
        const t = e.currentTarget
        t.style.transform = 'translateY(0)'
        t.style.borderColor = 'rgba(107,63,160,0.08)'
        t.style.boxShadow = 'none'
      }}
    >
      {/* ── Gradient header ── */}
      <div
        style={{
          position:        'relative',
          overflow:        'hidden',
          padding:         '20px 20px 18px',
          minHeight:       '152px',
          background:      `radial-gradient(circle, ${pillColor}1A 1px, transparent 1px),
                            linear-gradient(145deg, ${pillColor}12 0%, ${pillColor}05 100%)`,
          backgroundSize:  '22px 22px, 100% 100%',
        }}
      >
        {/* Icon box */}
        <div
          style={{
            width:           '38px',
            height:          '38px',
            borderRadius:    '10px',
            background:      `${pillColor}16`,
            border:          `1px solid ${pillColor}28`,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            marginBottom:    '14px',
          }}
        >
          <Icon size={18} color={pillColor} />
        </div>

        {/* Suite label pill */}
        <span
          className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full"
          style={{ color: pillColor, background: pillBg, border: `1px solid ${pillBorder}` }}
        >
          {pillLabel}
        </span>

        {/* Large decorative number — watermark */}
        <span
          style={{
            position:      'absolute',
            right:         '18px',
            bottom:        '-4px',
            fontSize:      '90px',
            fontWeight:    800,
            fontFamily:    'var(--font-bricolage)',
            color:         pillColor,
            opacity:       0.11,
            letterSpacing: '-0.05em',
            lineHeight:    1,
            pointerEvents: 'none',
            userSelect:    'none',
          }}
        >
          {agentNum}
        </span>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '20px 20px 0' }}>
        {/* Headline */}
        <h3
          className="font-display font-bold text-ink mb-2"
          style={{ fontSize: '19px', letterSpacing: '-0.025em', lineHeight: '1.25' }}
        >
          {headline.join(' ')}
        </h3>

        {/* Body */}
        <p
          className="text-ink3 font-ui mb-4"
          style={{ fontSize: '13px', lineHeight: '1.6' }}
        >
          {body.join(' ')}
        </p>

        {/* Capability chips — suite-tinted */}
        <div className="flex flex-wrap gap-1.5">
          {chips.map(chip => (
            <span
              key={chip.label}
              className="text-[11px] font-medium font-ui px-2 py-[3px] rounded-[5px]"
              style={{
                color:      pillColor,
                background: `${pillColor}0D`,
                border:     `1px solid ${pillColor}1F`,
              }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div
        className="flex items-center justify-between mt-auto"
        style={{
          padding:    '12px 20px 20px',
          marginTop:  'auto',
          borderTop:  '1px solid rgba(107,63,160,0.07)',
          marginLeft: '0',
        }}
      >
        <span className="font-mono text-[12px] text-ink4">{agentCount}</span>
        <Link
          href={ctaHref}
          className="flex items-center gap-1.5 text-[13px] font-medium text-brand font-ui group"
        >
          {ctaLabel}
          <ArrowRight
            size={12}
            className="group-hover:translate-x-1 transition-transform duration-150"
          />
        </Link>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────

export default function VerticalCards() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section-padding" style={{ paddingTop: '52px', background: 'rgba(255, 255, 255, 0.55)' }}>
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Label */}
        <p className="text-label text-center mb-4">OUR SOLUTIONS</p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display font-bold text-ink text-center mx-auto mb-12"
          style={{
            fontSize: 'clamp(22px, 2.8vw, 34px)',
            letterSpacing: '-0.03em',
            lineHeight: '1.2',
            maxWidth: '820px',
          }}
        >
          One platform. Three agent suites.{' '}
          <br className="hidden md:block" />
          Everything connected.
        </h2>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <VerticalCard
            pillLabel="Workforce Operations"
            pillColor="#0284C7"
            pillBg="rgba(2,132,199,0.08)"
            pillBorder="rgba(2,132,199,0.15)"
            headline={["Your coordinators shouldn't spend their mornings on the phone."]}
            body={["Eight agents handling every shift, schedule, and staffing decision — so your team doesn't have to."]}
            chips={[
              { label: 'Schedule Optimizer' },
              { label: 'Referral Intake' },
              { label: 'Call-Off Management' },
              { label: 'Auto Approval' },
              { label: 'Capacity Planner' },
              { label: 'Visit Verification' },
            ]}
            agentCount="8 agents"
            ctaLabel="Explore Workforce"
            ctaHref="/workforce"
            icon={CalendarDays}
            delay={0}
          />

          <VerticalCard
            pillLabel="Financial Operations"
            pillColor="#059669"
            pillBg="rgba(5,150,105,0.08)"
            pillBorder="rgba(5,150,105,0.15)"
            headline={["Your AR team shouldn't be your reconciliation team."]}
            body={["Four agents across your full receivables stack — matching, collecting, and recovering revenue automatically."]}
            chips={[
              { label: 'AP/AR Matching' },
              { label: 'Payment Collection' },
              { label: 'Revenue Cycle Mgmt' },
              { label: 'REIT Deal Qualifier' },
            ]}
            agentCount="4 agents"
            ctaLabel="Explore Financial"
            ctaHref="/financial"
            icon={TrendingUp}
            delay={0.08}
          />

          <VerticalCard
            pillLabel="Compliance Agents"
            pillColor="#0891B2"
            pillBg="rgba(8,145,178,0.08)"
            pillBorder="rgba(8,145,178,0.15)"
            headline={["Your compliance gaps don't wait for your team."]}
            body={["Three agents running credentialing, claims checks, and contract audits — around the clock."]}
            chips={[
              { label: 'Provider Credentialing' },
              { label: 'Claims Compliance' },
              { label: 'Contract Compliance' },
            ]}
            agentCount="3 agents"
            ctaLabel="Explore Compliance"
            ctaHref="/compliance"
            icon={ShieldCheck}
            delay={0.16}
          />

        </div>
      </div>
    </section>
  )
}
