'use client'

import { useState, useEffect } from 'react'

// Staff Burnout Prevention panel
// Animation: David M. row highlights red → alert banner slides in

export default function BurnoutPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 1200)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const davidHighlight = phase >= 1
  const alertVisible   = phase >= 2

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Burnout Risk Monitor</h4>
        <p className="text-[11px] text-ink4">Week of Mar 24–30 · 48 staff</p>
      </div>

      {/* Risk gauge row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'High Risk', count: 3,  color: '#FEE2E2', textColor: '#991B1B' },
          { label: 'At Risk',   count: 8,  color: '#FEF3C7', textColor: '#92400E' },
          { label: 'Healthy',   count: 37, color: '#D1FAE5', textColor: '#065F46' },
        ].map((item) => (
          <div key={item.label} className="rounded-[8px] p-2.5" style={{ background: item.color }}>
            <p className="text-[10px] font-semibold mb-1" style={{ color: item.textColor }}>{item.label}</p>
            <p className="text-[20px] font-bold font-mono" style={{ color: item.textColor, letterSpacing: '-0.03em' }}>{item.count}</p>
          </div>
        ))}
      </div>

      {/* Staff risk table */}
      <div className="flex flex-col gap-0">
        <div
          className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
          style={{ gridTemplateColumns: '1fr 60px 60px 70px' }}
        >
          <span>Name</span><span>Role</span><span>Hrs/wk</span><span>Risk</span>
        </div>
        {[
          { name: 'Mark S.',  role: 'RN',  hrs: '58h', label: 'HIGH RISK', bg: '#FEE2E2', color: '#991B1B', isDavid: false },
          { name: 'Jamie L.', role: 'LPN', hrs: '52h', label: 'AT RISK',   bg: '#FEF3C7', color: '#92400E', isDavid: false },
          { name: 'Sarah P.', role: 'CNA', hrs: '44h', label: 'HEALTHY',   bg: '#D1FAE5', color: '#065F46', isDavid: false },
          { name: 'David M.', role: 'RN',  hrs: '61h', label: 'HIGH RISK', bg: '#FEE2E2', color: '#991B1B', isDavid: true  },
        ].map((row) => (
          <div
            key={row.name}
            className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[12px]"
            style={{
              gridTemplateColumns: '1fr 60px 60px 70px',
              background: row.isDavid && davidHighlight ? '#FFF5F5' : 'transparent',
              borderLeft: row.isDavid && davidHighlight ? '3px solid #EF4444' : '3px solid transparent',
              paddingLeft: row.isDavid ? '6px' : undefined,
              transition: 'background 0.5s ease, border-color 0.5s ease',
            }}
          >
            <span className="font-medium text-ink">{row.name}</span>
            <span className="font-mono text-ink4 text-[11px]">{row.role}</span>
            <span className="font-mono text-ink4 text-[11px]">{row.hrs}</span>
            <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>
              {row.label}
            </span>
          </div>
        ))}
      </div>

      {/* Alert banner — slides in at phase 2 */}
      <div
        className="mt-3 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{
          background: '#FEF3C7',
          border: '1px solid #FDE68A',
          opacity: alertVisible ? 1 : 0,
          transform: alertVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <span className="text-[12px]">⚠</span>
        <p className="text-[11px] text-[#92400E] leading-snug">
          2 staff approaching burnout threshold — workload redistribution recommended
        </p>
      </div>

    </div>
  )
}
