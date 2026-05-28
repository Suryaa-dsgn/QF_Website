'use client'

import { useState, useEffect } from 'react'

// Call-Off Management panel
// Animation: call-off alert appears (800ms) → replacement list populates (1.6s) → confirmation (2.3s)

export default function CallOffManagementPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 800)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 700)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const alertVisible   = phase >= 1
  const listPopulated  = phase >= 2
  const confirmed      = phase >= 3

  const replacements = [
    { name: 'Maria G.', role: 'CNA', status: 'Available', fit: '98%', isTop: true  },
    { name: 'Tom R.',   role: 'CNA', status: 'Available', fit: '87%', isTop: false },
    { name: 'Derek P.', role: 'CNA', status: 'On-call',  fit: '74%', isTop: false },
  ]

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Call-Off Management</h4>
        <p className="text-[11px] text-ink4">Today · 6:02am</p>
      </div>

      {/* Call-off alert */}
      <div
        className="rounded-[10px] border p-3 mb-3"
        style={{
          background: '#FEF3C7',
          border: '1px solid #FDE68A',
          opacity: alertVisible ? 1 : 0,
          transform: alertVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-semibold text-[#92400E]">Amanda W. — Called Out</p>
            <p className="text-[11px] text-[#B45309]">AM Shift · Home Health · Zone 4</p>
          </div>
          <span className="status-pill text-[9px]" style={{ background: '#FEE2E2', color: '#991B1B' }}>
            GAP
          </span>
        </div>
      </div>

      {/* Replacement list */}
      <p className="text-[10px] font-semibold text-ink4 mb-1.5 uppercase tracking-[0.08em]">Best Replacements</p>
      <div className="flex flex-col gap-1.5 mb-3">
        {replacements.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-[8px] px-3 py-2"
            style={{
              background: r.isTop && confirmed ? '#D1FAE5' : r.isTop ? '#EDE9FE' : '#F9F8FF',
              border: `1px solid ${r.isTop && confirmed ? '#A7F3D0' : r.isTop ? '#DDD6FE' : '#F0EDFA'}`,
              opacity: listPopulated ? 1 : 0,
              transform: listPopulated ? 'translateY(0)' : 'translateY(6px)',
              transition: `opacity 0.35s ease ${i * 0.1}s, transform 0.35s ease ${i * 0.1}s, background 0.5s ease, border-color 0.5s ease`,
            }}
          >
            <div>
              <p className="text-[12px] font-medium text-ink">{r.name} <span className="text-ink4 text-[10px] font-mono">{r.role}</span></p>
              <p className="text-[10px] text-ink4">{r.isTop && confirmed ? 'Shift confirmed ✓' : r.status}</p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-bold font-mono" style={{ color: r.isTop ? '#5B21B6' : '#9CA3AF' }}>
                {r.fit}
              </p>
              <p className="text-[9px] text-ink4">fit</p>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation banner */}
      <div
        className="rounded-[8px] p-2.5 flex items-center gap-2"
        style={{
          background: '#D1FAE5',
          border: '1px solid #A7F3D0',
          opacity: confirmed ? 1 : 0,
          transform: confirmed ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <span className="text-[11px]">✓</span>
        <p className="text-[11px] text-[#065F46] leading-snug">
          Amanda → Maria G. Gap time: 16 min. Schedule updated.
        </p>
      </div>

    </div>
  )
}
