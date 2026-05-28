'use client'

import { useState, useEffect } from 'react'

// Payment Collection panel
// Animation: Bar animates 0→73% → PrimaCare highlights HIGH → trend text fades in

export default function CollectionPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 800)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 600)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const barFilled       = phase >= 1
  const primaHighlight  = phase >= 2
  const trendVisible    = phase >= 3

  const recoveryRate = 73

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Collection Dashboard</h4>
        <p className="text-[11px] text-ink4">April · 4 accounts · $38,700 outstanding</p>
      </div>

      {/* Recovery rate block */}
      <div className="flex items-end gap-4 mb-3">
        <div>
          <p className="text-[10px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-0.5">Recovery Rate</p>
          <div className="flex items-baseline gap-1">
            <span
              className="font-mono font-bold text-ink leading-none"
              style={{ fontSize: '36px', letterSpacing: '-0.04em' }}
            >
              {recoveryRate}
            </span>
            <span className="font-mono text-ink4 text-[18px] leading-none">%</span>
          </div>
          {/* Trend — fades in at phase 3 */}
          <p
            className="text-[10px] font-mono text-[#16A34A] mt-0.5"
            style={{
              opacity: trendVisible ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            ↑ +4.8% vs last month
          </p>
        </div>

        {/* Progress bar — animates at phase 1 */}
        <div className="flex-1 pb-1">
          <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: barFilled ? `${recoveryRate}%` : '0%',
                background: '#6B3FA0',
                transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-ink4 font-mono">0%</span>
            <span className="text-[9px] text-ink4 font-mono">100%</span>
          </div>
        </div>
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 40px 70px 60px 60px' }}
      >
        <span>Account</span>
        <span>DSO</span>
        <span>Balance</span>
        <span>Priority</span>
        <span>Last Contact</span>
      </div>

      {/* Account rows — PrimaCare highlights at phase 2 */}
      {[
        {
          name: 'PrimaCare Inc.',  dso: 45, balance: '$22,400',
          priority: primaHighlight ? 'HIGH' : 'MED',
          priorityBg:    primaHighlight ? '#FEE2E2' : '#FEF3C7',
          priorityColor: primaHighlight ? '#991B1B' : '#92400E',
          dsoColor:      primaHighlight ? '#DC2626' : '#D97706',
          lastContact: 'Apr 14', isPrima: true,
        },
        { name: 'CareRx Group',    dso: 32, balance: '$9,900',  priority: 'MED',  priorityBg: '#FEF3C7', priorityColor: '#92400E', dsoColor: '#D97706', lastContact: 'Apr 12', isPrima: false },
        { name: 'MedBridge LLC',   dso: 28, balance: '$4,800',  priority: 'MED',  priorityBg: '#FEF3C7', priorityColor: '#92400E', dsoColor: '#D97706', lastContact: 'Apr 13', isPrima: false },
        { name: 'SunCare Systems', dso: 18, balance: '$1,600',  priority: 'LOW',  priorityBg: '#F3F4F6', priorityColor: '#6B7280', dsoColor: '#6B7280', lastContact: 'Apr 10', isPrima: false },
      ].map((row, i) => (
        <div
          key={i}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{
            gridTemplateColumns: '1fr 40px 70px 60px 60px',
            background: row.isPrima && primaHighlight ? '#FFF5F5' : 'transparent',
            transition: 'background 0.5s ease',
          }}
        >
          <span className="font-medium text-ink truncate">{row.name}</span>
          <span
            className="font-mono text-[10px] font-semibold"
            style={{ color: row.dsoColor, transition: 'color 0.5s ease' }}
          >
            {row.dso}d
          </span>
          <span className="font-mono text-ink text-[10px] font-semibold">{row.balance}</span>
          <span
            className="status-pill text-[10px]"
            style={{
              background: row.priorityBg,
              color: row.priorityColor,
              transition: 'background 0.5s ease, color 0.5s ease',
            }}
          >
            {row.priority}
          </span>
          <span className="text-ink4 text-[10px]">{row.lastContact}</span>
        </div>
      ))}

    </div>
  )
}
