'use client'

import { useState, useEffect } from 'react'

// Scheduler Assist panel
// Animation: AI banner appears → PM gap cell fills → PM shift row resolves to Covered

export default function SchedulerPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 900),   // AI banner fades in
      setTimeout(() => setPhase(2), 1800),  // PM grid cell fills green
      setTimeout(() => setPhase(3), 2400),  // PM shift row → Covered
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const bannerVisible = phase >= 1
  const pmFilled      = phase >= 2
  const pmCovered     = phase >= 3

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Scheduler Assist</h4>
        <p className="text-[11px] text-ink4">Week of Apr 7–13 · Philadelphia Region</p>
      </div>

      {/* AI suggestion banner — hidden until phase 1 */}
      <div
        className="rounded-[8px] p-2.5 mb-3 flex items-start gap-2"
        style={{
          background: 'rgba(107,63,160,0.06)',
          border: '1px solid rgba(107,63,160,0.15)',
          opacity: bannerVisible ? 1 : 0,
          transform: bannerVisible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <span className="text-[12px] text-brand">✦</span>
        <p className="text-[11px] text-[#6B3FA0] leading-snug font-medium">
          AI suggests swapping Tue PM shift — saves 6h overtime and fills coverage gap
        </p>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center text-[10px] font-semibold text-ink4">{day}</div>
        ))}
      </div>

      {/* Coverage grid — Tue cell transitions at phase 2 */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {[
          { label: '4/4', filled: true,    highlight: false  },
          { label: pmFilled ? '3/4' : '2/4', filled: pmFilled, highlight: !pmFilled },
          { label: '4/4', filled: true,    highlight: false  },
          { label: '4/4', filled: true,    highlight: false  },
          { label: '2/4', filled: false,   highlight: false  },
          { label: '3/3', filled: true,    highlight: false  },
          { label: '3/3', filled: true,    highlight: false  },
        ].map((day, i) => (
          <div
            key={i}
            className="rounded-[6px] p-1.5 text-center"
            style={{
              background: day.highlight ? '#FEF3C7' : day.filled ? '#D1FAE5' : '#F3F3F3',
              border: day.highlight ? '1px solid #FDE68A' : '1px solid transparent',
              transition: 'background 0.5s ease, border-color 0.5s ease',
            }}
          >
            <p
              className="text-[11px] font-mono font-semibold"
              style={{
                color: day.highlight ? '#92400E' : day.filled ? '#065F46' : '#6B7280',
                transition: 'color 0.5s ease',
              }}
            >
              {day.label}
            </p>
          </div>
        ))}
      </div>

      {/* Shift rows — PM row resolves at phase 3 */}
      <div className="flex flex-col gap-2">
        {[
          {
            shift: 'AM (6a–2p)',
            staff: 'Maria K., Tom R., Janet F., Lisa M.',
            status: 'Covered', bg: '#D1FAE5', color: '#065F46',
          },
          {
            shift: 'PM (2p–10p)',
            staff: pmCovered ? 'Amanda W. added — coverage restored' : 'Gap detected — 1 RN needed',
            status: pmCovered ? 'Covered' : 'Gap',
            bg: pmCovered ? '#D1FAE5' : '#FEF3C7',
            color: pmCovered ? '#065F46' : '#92400E',
          },
          {
            shift: 'NOC (10p–6a)',
            staff: 'Lisa M., Derek P.',
            status: 'Covered', bg: '#D1FAE5', color: '#065F46',
          },
        ].map((row) => (
          <div
            key={row.shift}
            className="grid items-center gap-2 text-[11px]"
            style={{ gridTemplateColumns: '80px 1fr 58px' }}
          >
            <span className="font-mono text-ink4 text-[10px]">{row.shift}</span>
            <span className="text-ink3 truncate">{row.staff}</span>
            <span
              className="status-pill text-[10px]"
              style={{
                background: row.bg,
                color: row.color,
                transition: 'background 0.5s ease, color 0.5s ease',
              }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
