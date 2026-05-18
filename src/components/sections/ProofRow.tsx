'use client'

import { useRef, useEffect, useState } from 'react'

// ─── COUNT-UP STAT BLOCK ──────────────────────────────────────────

function StatBlock({
  value,
  suffix,
  label,
  comparison,
  delta,
}: {
  value: number
  suffix: string
  label: string
  comparison: string
  delta: string
}) {
  const [display, setDisplay]   = useState('0')
  const [started, setStarted]   = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true)

          if (prefersReduced) {
            setDisplay(value.toString())
            return
          }

          const startT = performance.now()
          const dur    = 1800

          function tick(t: number) {
            const p     = Math.min((t - startT) / dur, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setDisplay(Math.floor(eased * value).toString())
            if (p < 1) requestAnimationFrame(tick)
            else       setDisplay(value.toString())
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  return (
    <div ref={ref} className="card p-8 flex flex-col h-full">

      {/* Label */}
      <p className="text-label mb-4">{label}</p>

      {/* Giant number */}
      <div className="mb-3">
        <span
          className="font-mono font-bold text-ink"
          style={{ fontSize: 'clamp(52px, 6vw, 76px)', letterSpacing: '-0.03em', lineHeight: '1' }}
        >
          {display}
        </span>
        <span
          className="font-mono text-ink4 ml-0.5"
          style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}
        >
          {suffix}
        </span>
      </div>

      {/* Comparison text */}
      <p className="text-[14px] text-ink3 font-ui leading-snug mb-3">{comparison}</p>

      {/* Delta badge — pushed to bottom */}
      <div className="mt-auto">
        <span className="inline-flex items-center text-[12px] font-mono text-[#16A34A] bg-[#D1FAE5] px-2.5 py-1 rounded-[6px]">
          {delta}
        </span>
      </div>

    </div>
  )
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <div
      className="rounded-[16px] p-8 flex flex-col justify-between h-full"
      style={{
        background: 'rgba(107,63,160,0.04)',
        border:     '1px solid rgba(107,63,160,0.10)',
      }}
    >
      {/* Quote text */}
      <p className="text-[15px] text-ink font-ui leading-[1.7] flex-1 mb-6">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution — pushed to bottom */}
      <div className="flex items-center gap-3 mt-6">
        {/* Initials avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0"
          style={{ background: 'rgba(107,63,160,0.10)', color: '#6B3FA0' }}
        >
          {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-ink font-ui leading-none mb-1">{name}</p>
          <p className="text-[12px] text-ink4 font-ui leading-none">{role}</p>
        </div>
      </div>

    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function ProofRow() {
  return (
    <section className="section-padding">
      <div className="section-container">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-label mb-4">OPERATIONAL BENCHMARKS</p>
          <h2
            className="font-display font-bold text-ink mx-auto"
            style={{
              fontSize:      'clamp(26px, 3.5vw, 44px)',
              letterSpacing: '-0.03em',
              lineHeight:    '1.1',
              maxWidth:      '580px',
            }}
          >
            What efficient operations look like —
            <br className="hidden sm:block" />
            {' '}and what we build toward.
          </h2>
          {/* Framing note — signals intellectual honesty to compliance/investor readers */}
          <p
            className="text-[13px] text-ink4 font-ui text-center mx-auto mt-3"
            style={{ maxWidth: '460px', lineHeight: '1.65' }}
          >
            Figures below represent projected benchmarks from workflow analysis
            and comparable operational deployments. Individual results vary
            based on environment, data quality, and configuration.
          </p>
        </div>

        {/* ── Row 1: STAT | TESTIMONIAL | STAT ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-stretch">

          <StatBlock
            value={28}
            suffix="s"
            label="TARGET FILL TIME"
            comparison="Projected time from callout to confirmed shift coverage, with full agent automation."
            delta="↓ 97% reduction in coordinator time"
          />

          {/* TODO: Replace with verified client testimonial when available */}
          <TestimonialCard
            quote="The volume of coordination that used to hit our team every morning — it's genuinely different now. Things that needed three calls are handled before anyone's at their desk."
            name="Sarah M."
            role="Director of Operations, Regional Home Care Agency"
          />

          <StatBlock
            value={94}
            suffix="%"
            label="PROJECTED MATCH RATE"
            comparison="Of invoice exceptions resolved automatically, without manual reconciliation."
            delta="↑ 31% vs fully manual AR workflows"
          />

        </div>

        {/* ── Row 2: Wide testimonial | Narrow stat ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-stretch">

          {/* TODO: Replace with verified client testimonial when available */}
          <TestimonialCard
            quote="We had people doing reconciliation work that shouldn't have required people at all. That's the part that changed first — and fastest."
            name="James T."
            role="VP Finance, Logistics Company"
          />

          <StatBlock
            value={72}
            suffix="hr"
            label="DEPLOYMENT TARGET"
            comparison="From contract to first live agent — for standard integration environments."
            delta="No rip-and-replace required"
          />

        </div>

      </div>
    </section>
  )
}
