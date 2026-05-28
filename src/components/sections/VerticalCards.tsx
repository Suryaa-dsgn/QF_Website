'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

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
  delay?: number
}

// ─── VERTICAL CARD ───────────────────────────────────────────────

function VerticalCard({
  pillLabel, pillColor, pillBg, pillBorder,
  headline, body, chips, agentCount, ctaLabel, ctaHref, delay = 0,
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

  return (
    <div
      ref={ref}
      className="bg-white rounded-[16px] p-6 border border-[--border] flex flex-col"
      style={{
        transition: 'transform 250ms ease-out, border-color 250ms ease-out, box-shadow 250ms ease-out',
      }}
      onMouseEnter={e => {
        const t = e.currentTarget
        t.style.transform = 'translateY(-4px)'
        t.style.borderColor = 'rgba(107,63,160,0.18)'
        t.style.boxShadow = '0 12px 40px rgba(107,63,160,0.10)'
      }}
      onMouseLeave={e => {
        const t = e.currentTarget
        t.style.transform = 'translateY(0)'
        t.style.borderColor = 'rgba(107,63,160,0.08)'
        t.style.boxShadow = 'none'
      }}
    >
      {/* Pill */}
      <span
        className="inline-block self-start text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full mb-4"
        style={{ color: pillColor, background: pillBg, border: `1px solid ${pillBorder}` }}
      >
        {pillLabel}
      </span>

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

      {/* Divider */}
      <div className="border-t border-[rgba(107,63,160,0.07)] mb-4" />

      {/* Capability chips */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {chips.map(chip => (
          <span
            key={chip.label}
            className="text-[11px] font-medium font-ui px-2 py-[3px] rounded-[5px]"
            style={{
              color: '#3D3D3D',
              background: '#F5F5F7',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {chip.label}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-auto pt-1">
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
            delay={0.16}
          />

        </div>
      </div>
    </section>
  )
}
