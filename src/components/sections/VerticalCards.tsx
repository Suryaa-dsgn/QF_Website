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
      className="bg-white rounded-[16px] p-9 border border-[--border] flex flex-col"
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
      {/* Vertical pill */}
      <span
        className="inline-block self-start text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full mb-5"
        style={{ color: pillColor, background: pillBg, border: `1px solid ${pillBorder}` }}
      >
        {pillLabel}
      </span>

      {/* Headline */}
      <h3
        className="font-display font-bold text-ink mb-3"
        style={{ fontSize: '22px', letterSpacing: '-0.025em', lineHeight: '1.2' }}
      >
        {headline.map((line, i) => (
          <span key={i}>
            {line}
            {i < headline.length - 1 && <br />}
          </span>
        ))}
      </h3>

      {/* One-liner body */}
      <p
        className="text-ink3 font-ui mb-5"
        style={{ fontSize: '15px', lineHeight: '1.65', maxWidth: '340px' }}
      >
        {body.map((line, i) => (
          <span key={i}>
            {line}
            {i < body.length - 1 && <br />}
          </span>
        ))}
      </p>

      {/* Divider */}
      <div className="border-t border-[rgba(107,63,160,0.07)] mb-5" />

      {/* Capability chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {chips.map(chip => (
          <span
            key={chip.label}
            className="text-[12px] font-medium font-ui px-2.5 py-1 rounded-[6px]"
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

      {/* Bottom row — agent count + CTA link */}
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="font-mono text-[13px] text-ink4">{agentCount}</span>
        <Link
          href={ctaHref}
          className="flex items-center gap-1.5 text-[14px] font-medium text-brand font-ui group"
        >
          {ctaLabel}
          <ArrowRight
            size={13}
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
    <section className="section-padding bg-bg" style={{ paddingTop: '80px' }}>
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Label */}
        <p className="text-label text-center mb-4">OUR SOLUTIONS</p>

        {/* Headline — no colour accent, structural statement */}
        <h2
          ref={headlineRef}
          className="font-display font-bold text-ink text-center mx-auto mb-12"
          style={{
            fontSize: 'clamp(26px, 3.5vw, 42px)',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            maxWidth: '520px',
          }}
        >
          One platform. Two operational verticals.{' '}
          <br className="hidden md:block" />
          Everything connected.
        </h2>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <VerticalCard
            pillLabel="Workforce Operations"
            pillColor="#0284C7"
            pillBg="rgba(2,132,199,0.08)"
            pillBorder="rgba(2,132,199,0.15)"
            headline={[
              "Your coordinators shouldn't spend",
              'their mornings on the phone.',
            ]}
            body={[
              'Seven agents that handle every shift, credential,',
              "and staffing decision — so your team doesn't have to.",
            ]}
            chips={[
              { label: 'Shift Coverage' },
              { label: 'Credentialing' },
              { label: 'Auto-Approval' },
              { label: 'Visit Verification' },
              { label: 'Burnout Prevention' },
            ]}
            agentCount="7 agents"
            ctaLabel="Explore Workforce"
            ctaHref="/workforce"
            delay={0}
          />

          <VerticalCard
            pillLabel="Financial Operations"
            pillColor="#059669"
            pillBg="rgba(5,150,105,0.08)"
            pillBorder="rgba(5,150,105,0.15)"
            headline={[
              "Your AR team shouldn't be",
              'your reconciliation team.',
            ]}
            body={[
              'Four agents across your full receivables stack —',
              'matching, collecting, and enforcing contracts automatically.',
            ]}
            chips={[
              { label: 'AP/AR Matching' },
              { label: 'Payment Collection' },
              { label: 'Contract Compliance' },
              { label: 'Deal Qualification' },
            ]}
            agentCount="4 agents"
            ctaLabel="Explore Financial"
            ctaHref="/financial"
            delay={0.08}
          />

        </div>
      </div>
    </section>
  )
}
