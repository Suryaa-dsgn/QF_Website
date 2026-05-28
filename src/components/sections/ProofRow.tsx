'use client'

import { useState } from 'react'

// ─── STAT DATA ────────────────────────────────────────────────────

const STATS = [
  {
    value:      '28',
    suffix:     's',
    label:      'TARGET FILL TIME',
    comparison: 'Projected time from callout to confirmed shift coverage, with full agent automation.',
    delta:      '↓ 97% reduction in coordinator time',
  },
  {
    value:      '78',
    suffix:     '%',
    label:      'REFERRAL INTAKE TIME SAVED',
    comparison: 'Reduction in coordinator time from referral receipt to confirmed intake summary — agent handles parsing, provider matching, and draft preparation automatically.',
    delta:      '↓ 160 min → 22 min per referral',
  },
  {
    value:      '94',
    suffix:     '%',
    label:      'PROJECTED MATCH RATE',
    comparison: 'Of invoice exceptions resolved automatically, without manual reconciliation.',
    delta:      '↑ 31% vs fully manual AR workflows',
  },
  {
    value:      '95',
    suffix:     '%',
    label:      'CREDENTIALING TIME SAVED',
    comparison: 'Reduction in manual time spent monitoring provider licenses, DEA registrations, and board certifications — per provider, per month.',
    delta:      '↓ ~2.5 hrs → 8 min per provider per month',
  },
  {
    value:      '96',
    suffix:     '%',
    label:      'PRE-SUBMISSION CATCH RATE',
    comparison: 'Of billing modifier conflicts and claim code errors flagged before payer submission by the Claims Compliance agent.',
    delta:      '↓ 4.2-min avg correction vs. 14-day payer denial cycle',
  },
]

// ─── BENCHMARK CARD ───────────────────────────────────────────────

interface Stat {
  value: string
  suffix: string
  label: string
  comparison: string
  delta: string
}

function BenchmarkCard({
  stat,
  onEnter,
  onLeave,
}: {
  stat: Stat
  onEnter: () => void
  onLeave: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => { setHovered(true);  onEnter() }}
      onMouseLeave={() => { setHovered(false); onLeave() }}
      style={{
        width:        '360px',
        minHeight:    '280px',
        flexShrink:   0,
        display:      'flex',
        flexDirection:'column',
        padding:      '28px',
        borderRadius: '20px',
        background:   hovered ? '#6B3FA0' : '#FFFFFF',
        border:       hovered ? '1px solid transparent' : '1px solid rgba(107,63,160,0.08)',
        boxShadow:    hovered
          ? '0 16px 48px rgba(107,63,160,0.30)'
          : '0 2px 8px rgba(107,63,160,0.06)',
        transition:   'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        cursor:       'default',
        userSelect:   'none',
      }}
    >
      {/* Label */}
      <p
        className="font-ui uppercase"
        style={{
          fontSize:      '10px',
          fontWeight:    600,
          letterSpacing: '0.07em',
          color:         hovered ? 'rgba(255,255,255,0.5)' : '#A0A0A0',
          marginBottom:  '14px',
          transition:    'color 0.3s ease',
        }}
      >
        {stat.label}
      </p>

      {/* Big number */}
      <div style={{ marginBottom: '12px', lineHeight: 1 }}>
        <span
          className="font-mono font-bold"
          style={{
            fontSize:      'clamp(52px, 5vw, 68px)',
            letterSpacing: '-0.03em',
            color:         hovered ? '#FFFFFF' : '#0A0A0A',
            transition:    'color 0.3s ease',
          }}
        >
          {stat.value}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize:   'clamp(26px, 2.5vw, 34px)',
            color:      hovered ? 'rgba(255,255,255,0.45)' : '#9CA3AF',
            marginLeft: '2px',
            transition: 'color 0.3s ease',
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Description */}
      <p
        className="font-ui leading-snug"
        style={{
          fontSize:   '13px',
          color:      hovered ? 'rgba(255,255,255,0.65)' : '#6B7280',
          transition: 'color 0.3s ease',
          flex:       1,
        }}
      >
        {stat.comparison}
      </p>

      {/* Delta badge — pushed to bottom */}
      <div style={{ marginTop: '18px' }}>
        <span
          className="font-mono"
          style={{
            display:      'inline-flex',
            alignItems:   'center',
            fontSize:     '11px',
            fontWeight:   500,
            padding:      '4px 10px',
            borderRadius: '6px',
            background:   hovered ? 'rgba(255,255,255,0.14)' : '#D1FAE5',
            color:        hovered ? '#FFFFFF'                 : '#16A34A',
            transition:   'background 0.3s ease, color 0.3s ease',
            whiteSpace:   'normal',
          }}
        >
          {stat.delta}
        </span>
      </div>
    </div>
  )
}

// ─── BENCHMARK CAROUSEL ───────────────────────────────────────────

function BenchmarkCarousel() {
  const [paused, setPaused] = useState(false)
  const doubled = [...STATS, ...STATS]

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:       'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex benchmark-carousel"
        style={{
          gap:                '20px',
          width:              'max-content',
          padding:            '12px 20px 20px',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((stat, i) => (
          <BenchmarkCard
            key={i}
            stat={stat}
            onEnter={() => setPaused(true)}
            onLeave={() => setPaused(false)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function ProofRow() {
  return (
    <section className="section-padding" style={{ overflow: 'hidden' }}>

      {/* Section header */}
      <div className="section-container">
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
            What efficient operations
            <br className="hidden md:block" />
            {' '}look like.
          </h2>
          <p
            className="text-[13px] text-ink4 font-ui text-center mx-auto mt-3"
            style={{ maxWidth: '460px', lineHeight: '1.65' }}
          >
            Figures below represent projected benchmarks from workflow analysis
            and comparable operational deployments. Individual results vary
            based on environment, data quality, and configuration.
          </p>
        </div>
      </div>

      {/* Infinite carousel — full width, bleeds past container */}
      <BenchmarkCarousel />

    </section>
  )
}
