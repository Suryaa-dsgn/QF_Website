'use client'

import { useState, useEffect } from 'react'

// Schedule Optimizer panel
// Animation: gap cell highlights amber (900ms) → "Optimization running" → cell turns green + banner (2.4s)

export default function ScheduleOptimizerPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 900)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 900)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 600)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const gapHighlighted = phase >= 1
  const bannerVisible  = phase >= 2
  const gapResolved    = phase >= 3

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const rows = [
    {
      name: 'Sarah P.',
      role: 'RN',
      slots: ['AM', 'AM', null, 'PM', 'AM', null, null],
    },
    {
      name: 'Mark S.',
      role: 'LPN',
      slots: ['PM', null, 'AM', 'AM', 'PM', 'AM', null],
    },
    {
      name: 'Jamie L.',
      role: 'CNA',
      slots: ['AM', 'PM', 'PM', null, 'AM', null, 'PM'],
    },
    {
      name: 'Derek P.',
      role: 'RN',
      slots: [null, 'AM', 'PM', 'AM', null, 'PM', 'AM'],
    },
  ]

  // Slot at row 1 (Mark S.), day 1 (Tue) is the animated gap
  const getSlotStyle = (rowIdx: number, dayIdx: number, slot: string | null) => {
    const isAnimatedGap = rowIdx === 1 && dayIdx === 1
    if (isAnimatedGap) {
      if (gapResolved) return { bg: '#D1FAE5', text: '#065F46', label: 'AM' }
      if (gapHighlighted) return { bg: '#FEF3C7', text: '#92400E', label: '—' }
      return { bg: '#F9F8FF', text: '#9CA3AF', label: '—' }
    }
    if (!slot) return { bg: '#F9F8FF', text: '#D1D5DB', label: '—' }
    return { bg: '#EDE9FE', text: '#5B21B6', label: slot }
  }

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Schedule Optimizer</h4>
        <p className="text-[11px] text-ink4">Week of Mar 24–30 · 4 staff</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Gaps Resolved', count: gapResolved ? '3' : '2', bg: '#D1FAE5', color: '#065F46' },
          { label: 'OT Saved',      count: '6h',                    bg: '#EDE9FE', color: '#5B21B6' },
          { label: 'Efficiency',    count: '94%',                   bg: '#DBEAFE', color: '#1D4ED8' },
        ].map((s) => (
          <div key={s.label} className="rounded-[8px] p-2 text-center" style={{ background: s.bg }}>
            <p className="text-[17px] font-bold font-mono leading-none mb-0.5" style={{ color: s.color, transition: 'opacity 0.3s' }}>
              {s.count}
            </p>
            <p className="text-[9px] font-semibold" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Schedule grid */}
      <div className="overflow-hidden">
        {/* Day headers */}
        <div className="grid mb-1" style={{ gridTemplateColumns: '72px repeat(7, 1fr)', gap: '2px' }}>
          <div />
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[9px] font-semibold text-ink4">{d}</div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, ri) => (
          <div key={row.name} className="grid mb-1" style={{ gridTemplateColumns: '72px repeat(7, 1fr)', gap: '2px' }}>
            <div className="flex items-center gap-1 pr-1">
              <span className="text-[11px] font-medium text-ink truncate">{row.name}</span>
              <span className="text-[9px] text-ink4 font-mono">{row.role}</span>
            </div>
            {row.slots.map((slot, di) => {
              const { bg, text, label } = getSlotStyle(ri, di, slot)
              return (
                <div
                  key={di}
                  className="rounded-[4px] flex items-center justify-center text-[9px] font-semibold"
                  style={{
                    height: '22px',
                    background: bg,
                    color: text,
                    transition: 'background 0.5s ease, color 0.5s ease',
                  }}
                >
                  {label}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Banner */}
      <div
        className="mt-3 rounded-[8px] p-2.5 flex items-center gap-2"
        style={{
          background: gapResolved ? '#D1FAE5' : '#EDE9FE',
          border: `1px solid ${gapResolved ? '#A7F3D0' : '#DDD6FE'}`,
          opacity: bannerVisible ? 1 : 0,
          transform: bannerVisible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease, background 0.5s ease',
        }}
      >
        <span className="text-[11px]">{gapResolved ? '✓' : '⟳'}</span>
        <p className="text-[11px] leading-snug" style={{ color: gapResolved ? '#065F46' : '#5B21B6' }}>
          {gapResolved ? 'Optimization complete — 3 gaps resolved, 6h overtime saved' : 'Running recommendation solver…'}
        </p>
      </div>

    </div>
  )
}
