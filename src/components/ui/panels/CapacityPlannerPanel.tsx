'use client'

import { useState, useEffect } from 'react'

// Capacity Planner panel
// Animation: bars draw (700ms) → shortfall row highlights red (1.5s) → warning label (2.2s)

export default function CapacityPlannerPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 700)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 700)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const barsDrawn      = phase >= 1
  const shortfallShown = phase >= 2
  const warningShown   = phase >= 3

  const weeks = [
    { label: 'W1 Mar 24', demand: 42, capacity: 45, shortfall: false },
    { label: 'W2 Mar 31', demand: 48, capacity: 44, shortfall: true  },
    { label: 'W3 Apr 7',  demand: 50, capacity: 43, shortfall: true  },
    { label: 'W4 Apr 14', demand: 39, capacity: 46, shortfall: false },
  ]

  const MAX = 52

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Capacity Planner</h4>
        <p className="text-[11px] text-ink4">4-week forecast · 12 providers</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Shortfall Wks', count: '2',   bg: '#FEE2E2', color: '#991B1B' },
          { label: 'Overage Wks',   count: '0',   bg: '#D1FAE5', color: '#065F46' },
          { label: 'Utilisation',   count: '97%', bg: '#EDE9FE', color: '#5B21B6' },
        ].map((s) => (
          <div key={s.label} className="rounded-[8px] p-2 text-center" style={{ background: s.bg }}>
            <p className="text-[17px] font-bold font-mono leading-none mb-0.5" style={{ color: s.color }}>{s.count}</p>
            <p className="text-[9px] font-semibold" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex flex-col gap-2 mb-3">
        {weeks.map((w) => {
          const demandW = barsDrawn ? (w.demand / MAX) * 100 : 0
          const capW    = barsDrawn ? (w.capacity / MAX) * 100 : 0
          const isShortfall = w.shortfall && shortfallShown
          return (
            <div key={w.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-ink">{w.label}</span>
                <span
                  className="text-[9px] font-semibold"
                  style={{ color: isShortfall ? '#991B1B' : '#065F46' }}
                >
                  {isShortfall ? `−${w.demand - w.capacity} shortfall` : 'Covered'}
                </span>
              </div>
              <div className="relative h-[6px] rounded-full bg-[#F3F0FA] overflow-hidden mb-0.5">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${capW}%`,
                    background: isShortfall ? '#FCA5A5' : '#A7F3D0',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
              <div className="relative h-[6px] rounded-full bg-[#F3F0FA] overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${demandW}%`,
                    background: isShortfall ? '#EF4444' : '#6B3FA0',
                    transition: 'width 0.6s ease',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-3">
        {[
          { color: '#A7F3D0', label: 'Capacity' },
          { color: '#6B3FA0', label: 'Demand'   },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div className="w-3 h-1.5 rounded-full" style={{ background: l.color }} />
            <span className="text-[9px] text-ink4">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div
        className="rounded-[8px] p-2.5 flex items-start gap-2"
        style={{
          background: '#FEE2E2',
          border: '1px solid #FECACA',
          opacity: warningShown ? 1 : 0,
          transform: warningShown ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <span className="text-[11px]">⚠</span>
        <p className="text-[11px] text-[#991B1B] leading-snug">
          2 roles understaffed weeks of Mar 31 & Apr 7 — recruitment queue opened
        </p>
      </div>

    </div>
  )
}
