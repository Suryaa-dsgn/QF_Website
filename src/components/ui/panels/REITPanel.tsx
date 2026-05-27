'use client'

import { useState, useEffect } from 'react'

// REIT Deal Qualifier panel
// Animation: Score ring draws from 0→87 → risk flags fade in staggered

const SCORE = 87
const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ≈ 282.74

export default function REITPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),   // Score ring animates 0 → 87
      setTimeout(() => setPhase(2), 1400),  // Risk flags staggered fade in
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const ringFilled  = phase >= 1
  const flagsVisible = phase >= 2

  const strokeDash = ringFilled ? (SCORE / 100) * CIRCUMFERENCE : 0

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Deal header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Riverside Commons</h4>
        <p className="text-[11px] text-ink4">Multifamily · 84 units · Dallas, TX</p>
      </div>

      {/* Score ring + metrics side by side */}
      <div className="flex items-center gap-5 mb-4">

        {/* SVG Score ring — animates at phase 1 */}
        <div className="relative flex-shrink-0" style={{ width: '90px', height: '90px' }}>
          <svg width="90" height="90" viewBox="0 0 100 100">
            {/* Track */}
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke="#F3F0FC"
              strokeWidth="7"
            />
            {/* Progress — strokeDasharray transitions via CSS */}
            <circle
              cx="50" cy="50" r={RADIUS}
              fill="none"
              stroke="#6B3FA0"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${strokeDash} ${CIRCUMFERENCE}`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1)' }}
            />
          </svg>
          {/* Score label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-mono font-bold text-ink leading-none"
              style={{
                fontSize: '22px',
                letterSpacing: '-0.04em',
                opacity: ringFilled ? 1 : 0,
                transition: 'opacity 0.4s ease 0.3s',
              }}
            >
              {SCORE}
            </span>
            <span className="text-[9px] font-semibold text-ink4">/100</span>
          </div>
        </div>

        {/* Metrics grid 2×3 — always visible */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-2 flex-1">
          {[
            { label: 'IRR',      value: '18.2%', target: '≥ 15%',   pass: true },
            { label: 'DSCR',     value: '1.38x', target: '≥ 1.25x', pass: true },
            { label: 'Cap Rate', value: '6.7%',  target: '≥ 5.5%',  pass: true },
            { label: 'LTV',      value: '72%',   target: '≤ 75%',   pass: true },
            { label: 'CoC',      value: '9.1%',  target: '≥ 8%',    pass: true },
            { label: 'Vacancy',  value: '4.2%',  target: '≤ 8%',    pass: true },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-[9px] font-semibold text-ink4 uppercase tracking-[0.04em]">{m.label}</p>
              <p className="font-mono font-bold text-ink text-[13px] leading-tight">{m.value}</p>
              <p className="text-[9px] text-ink4">{m.pass ? '✓' : '✗'} {m.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#F3F3F3] mb-3" />

      {/* Risk flags — staggered fade in at phase 2 */}
      <p className="text-[10px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-2">Risk assessment</p>
      <div className="flex flex-col gap-1.5">
        {[
          { icon: '⚠', text: 'Rent growth projection (5.2%) above Dallas market avg — sensitivity check recommended', warn: true,  delay: '0s'    },
          { icon: '✓', text: 'Debt service coverage within IC thresholds across all rate scenarios',                  warn: false, delay: '0.12s' },
          { icon: '✓', text: 'Sponsor track record verified — 3 comparable exits, avg 22% IRR',                      warn: false, delay: '0.24s' },
        ].map((flag, i) => (
          <div
            key={i}
            className="flex items-start gap-2 rounded-[6px] px-2.5 py-1.5"
            style={{
              background: flag.warn ? '#FFFBEB' : '#F0FDF4',
              border:     flag.warn ? '1px solid #FDE68A' : '1px solid #BBF7D0',
              opacity: flagsVisible ? 1 : 0,
              transform: flagsVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 0.4s ease ${flag.delay}, transform 0.4s ease ${flag.delay}`,
            }}
          >
            <span
              className="text-[11px] flex-shrink-0 font-semibold"
              style={{ color: flag.warn ? '#92400E' : '#16A34A' }}
            >
              {flag.icon}
            </span>
            <p
              className="text-[10px] leading-snug"
              style={{ color: flag.warn ? '#92400E' : '#166534' }}
            >
              {flag.text}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
