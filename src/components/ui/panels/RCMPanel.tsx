'use client'

import { useState, useEffect } from 'react'

// Revenue Cycle Management panel
// Animation: claim row turns DENIED (1s) → RCM rework badge (1.8s) → RESUBMITTED status (2.4s)

export default function RCMPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 1000)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 600)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const claimDenied    = phase >= 1
  const reworkBadge    = phase >= 2
  const resubmitted    = phase >= 3

  const claims = [
    { id: '4889', payer: 'BlueCross', amount: '$1,240', status: 'PAID',       bg: '#D1FAE5', color: '#065F46', isAnimated: false },
    { id: '4890', payer: 'Medicare',  amount: '$890',   status: 'PAID',       bg: '#D1FAE5', color: '#065F46', isAnimated: false },
    { id: '4891', payer: 'Aetna',     amount: '$2,100', status: 'PENDING',    bg: '#FEF3C7', color: '#92400E', isAnimated: false },
    { id: '4892', payer: 'Medicaid',  amount: '$760',
      status: resubmitted ? 'RESUBMIT' : claimDenied ? 'DENIED' : 'PENDING',
      bg: resubmitted ? '#DBEAFE' : claimDenied ? '#FEE2E2' : '#FEF3C7',
      color: resubmitted ? '#1D4ED8' : claimDenied ? '#991B1B' : '#92400E',
      isAnimated: true,
    },
    { id: '4893', payer: 'UnitedHC',  amount: '$1,590', status: 'PENDING',    bg: '#FEF3C7', color: '#92400E', isAnimated: false },
  ]

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Revenue Cycle</h4>
        <p className="text-[11px] text-ink4">Mar 26 · 5 claims in flight</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Recovered',   count: resubmitted ? '$760' : '$0',  bg: '#D1FAE5', color: '#065F46' },
          { label: 'Denial Rate', count: '4.2%',                       bg: '#FEE2E2', color: '#991B1B' },
          { label: 'Avg Days',    count: '3.1',                        bg: '#EDE9FE', color: '#5B21B6' },
        ].map((s) => (
          <div key={s.label} className="rounded-[8px] p-2 text-center" style={{ background: s.bg }}>
            <p className="text-[15px] font-bold font-mono leading-none mb-0.5" style={{ color: s.color, transition: 'opacity 0.3s' }}>{s.count}</p>
            <p className="text-[9px] font-semibold" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Claims table */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '40px 1fr 70px 75px' }}
      >
        <span>#</span><span>Payer</span><span>Amount</span><span>Status</span>
      </div>
      {claims.map((c) => (
        <div
          key={c.id}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{
            gridTemplateColumns: '40px 1fr 70px 75px',
            background: c.isAnimated && claimDenied ? '#FFF5F5' : 'transparent',
            transition: 'background 0.5s ease',
          }}
        >
          <span className="font-mono text-ink4 text-[10px]">{c.id}</span>
          <span className="font-medium text-ink">{c.payer}</span>
          <span className="font-mono text-ink4 text-[10px]">{c.amount}</span>
          <span className="status-pill text-[9px]" style={{ background: c.bg, color: c.color, transition: 'background 0.5s ease, color 0.5s ease' }}>
            {c.status}
          </span>
        </div>
      ))}

      {/* Rework badge */}
      <div
        className="mt-3 rounded-[8px] p-2.5 flex items-center gap-2"
        style={{
          background: resubmitted ? '#DBEAFE' : '#FEE2E2',
          border: `1px solid ${resubmitted ? '#BFDBFE' : '#FECACA'}`,
          opacity: reworkBadge ? 1 : 0,
          transform: reworkBadge ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease, background 0.5s ease, border-color 0.5s ease',
        }}
      >
        <span className="text-[11px]">{resubmitted ? '✓' : '⟳'}</span>
        <p className="text-[11px] leading-snug" style={{ color: resubmitted ? '#1D4ED8' : '#991B1B' }}>
          {resubmitted ? 'Claim 4892 resubmitted — $760 recovery in progress' : 'Claim 4892 denied — rework queued automatically'}
        </p>
      </div>

    </div>
  )
}
