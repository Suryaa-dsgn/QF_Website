'use client'

import { useState, useEffect } from 'react'

// Visit Verification (EVV) panel
// Animation: Garcia row transitions PENDING → FLAGGED → alert banner slides in

export default function EVVPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 1200)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const garciaFlagged = phase >= 1
  const alertVisible  = phase >= 2

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Visit Verification (EVV)</h4>
        <p className="text-[11px] text-ink4">Today · 12 visits · 2 flagged</p>
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 65px 40px 65px' }}
      >
        <span>Client / Staff</span>
        <span>In / Out</span>
        <span>GPS</span>
        <span>Status</span>
      </div>

      {/* Visit rows — Garcia row transitions at phase 1 */}
      {[
        {
          client: 'Mr. Chen / Amanda W.', time: '07:02–09:15',
          gps: '✓', gpsColor: '#16A34A',
          status: 'VERIFIED', bg: '#D1FAE5', color: '#065F46',
          rowBg: 'transparent', isGarcia: false,
        },
        {
          client: 'Mrs. Park / Tom R.', time: '08:00–09:45',
          gps: '✓', gpsColor: '#16A34A',
          status: 'VERIFIED', bg: '#D1FAE5', color: '#065F46',
          rowBg: 'transparent', isGarcia: false,
        },
        {
          client: 'Mr. Garcia / Lisa M.', time: '09:30–??:??',
          gps: garciaFlagged ? '⚠' : '?',
          gpsColor: garciaFlagged ? '#DC2626' : '#9CA3AF',
          status: garciaFlagged ? 'FLAGGED' : 'PENDING',
          bg:    garciaFlagged ? '#FEE2E2' : '#F3F4F6',
          color: garciaFlagged ? '#991B1B' : '#6B7280',
          rowBg: garciaFlagged ? '#FFF5F5' : 'transparent',
          isGarcia: true,
        },
        {
          client: 'Mrs. Lee / Derek P.', time: '10:00–11:30',
          gps: '✓', gpsColor: '#16A34A',
          status: 'VERIFIED', bg: '#D1FAE5', color: '#065F46',
          rowBg: 'transparent', isGarcia: false,
        },
        {
          client: 'Mr. White / Janet F.', time: '11:15–12:45',
          gps: '✓', gpsColor: '#16A34A',
          status: 'PENDING', bg: '#FEF3C7', color: '#92400E',
          rowBg: 'transparent', isGarcia: false,
        },
      ].map((row, i) => (
        <div
          key={i}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{
            gridTemplateColumns: '1fr 65px 40px 65px',
            background: row.rowBg,
            transition: 'background 0.5s ease',
          }}
        >
          <span className="font-medium text-ink truncate">{row.client}</span>
          <span className="font-mono text-ink4 text-[10px]">{row.time}</span>
          <span
            className="text-center text-[11px] font-bold"
            style={{ color: row.gpsColor, transition: 'color 0.5s ease' }}
          >
            {row.gps}
          </span>
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

      {/* Alert banner — slides in at phase 2 */}
      <div
        className="mt-3 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{
          background: '#FEE2E2',
          border: '1px solid #FECACA',
          opacity: alertVisible ? 1 : 0,
          transform: alertVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <span className="text-[12px]">⚑</span>
        <p className="text-[11px] text-[#991B1B] leading-snug">
          Mr. Garcia visit check-out missing — billing hold applied automatically
        </p>
      </div>

    </div>
  )
}
