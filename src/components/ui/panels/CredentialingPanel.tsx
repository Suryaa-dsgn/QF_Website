'use client'

import { useState, useEffect } from 'react'

// Physician Credentialing panel
// Animation: Dr. Patel row highlights → status CURRENT → EXPIRING → renewal banner slides in

export default function CredentialingPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 1000)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 600)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const patelHighlight = phase >= 1
  const patelExpiring  = phase >= 2
  const bannerVisible  = phase >= 3

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Credential Tracker</h4>
        <p className="text-[11px] text-ink4">24 providers · 3 expiring soon · 1 expired</p>
      </div>

      {/* Summary badges */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {[
          { label: 'Current',  count: 20, bg: '#D1FAE5', color: '#065F46' },
          { label: 'Expiring', count: 3,  bg: '#FEF3C7', color: '#92400E' },
          { label: 'Expired',  count: 1,  bg: '#FEE2E2', color: '#991B1B' },
          { label: 'Pending',  count: 2,  bg: '#EDE9FE', color: '#5B21B6' },
        ].map((s) => (
          <div key={s.label} className="rounded-[8px] p-2 text-center" style={{ background: s.bg }}>
            <p className="text-[16px] font-bold font-mono leading-none" style={{ color: s.color }}>{s.count}</p>
            <p className="text-[9px] font-semibold mt-0.5" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 72px 68px 65px' }}
      >
        <span>Provider</span>
        <span>Credential</span>
        <span>Expires</span>
        <span>Status</span>
      </div>

      {/* Credential rows — Dr. Patel transitions at phase 1 + 2 */}
      {[
        {
          name: 'Dr. Patel',
          cred: 'MD License',
          exp: 'Apr 15 ⚠',
          status:   patelExpiring  ? 'EXPIRING' : 'CURRENT',
          bg:       patelExpiring  ? '#FEF3C7'  : '#D1FAE5',
          color:    patelExpiring  ? '#92400E'  : '#065F46',
          expColor: patelHighlight ? '#92400E'  : '#6B7280',
          rowBg:    patelHighlight ? '#FFFBEB'  : 'transparent',
          borderLeft: patelHighlight ? '3px solid #F59E0B' : '3px solid transparent',
          pl: '6px',
          isPatel: true,
        },
        { name: 'Dr. Kim',    cred: 'DEA Number', exp: 'Apr 20 ⚠', status: 'EXPIRING', bg: '#FEF3C7', color: '#92400E', expColor: '#92400E', rowBg: 'transparent', borderLeft: '3px solid transparent', pl: undefined, isPatel: false },
        { name: 'Dr. Torres', cred: 'MD License', exp: 'Mar 31 ✗', status: 'EXPIRED',  bg: '#FEE2E2', color: '#991B1B', expColor: '#DC2626', rowBg: 'transparent', borderLeft: '3px solid transparent', pl: undefined, isPatel: false },
        { name: 'Dr. Chen',   cred: 'Board Cert', exp: 'Sep 12',   status: 'CURRENT',  bg: '#D1FAE5', color: '#065F46', expColor: '#6B7280', rowBg: 'transparent', borderLeft: '3px solid transparent', pl: undefined, isPatel: false },
        { name: 'Dr. Watson', cred: 'MD License', exp: 'Nov 5',    status: 'CURRENT',  bg: '#D1FAE5', color: '#065F46', expColor: '#6B7280', rowBg: 'transparent', borderLeft: '3px solid transparent', pl: undefined, isPatel: false },
      ].map((row, i) => (
        <div
          key={i}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{
            gridTemplateColumns: '1fr 72px 68px 65px',
            background: row.rowBg,
            borderLeft: row.borderLeft,
            paddingLeft: row.pl,
            transition: 'background 0.5s ease, border-color 0.5s ease',
          }}
        >
          <span className="font-medium text-ink">{row.name}</span>
          <span className="text-ink4 text-[10px]">{row.cred}</span>
          <span
            className="font-mono text-[10px]"
            style={{ color: row.expColor, transition: 'color 0.5s ease' }}
          >
            {row.exp}
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

      {/* Renewal banner — slides in at phase 3 */}
      <div
        className="mt-2 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{
          background: 'rgba(107,63,160,0.06)',
          border: '1px solid rgba(107,63,160,0.15)',
          opacity: bannerVisible ? 1 : 0,
          transform: bannerVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <span className="text-[11px] text-brand">✦</span>
        <p className="text-[11px] text-[#6B3FA0] leading-snug">
          Renewal reminder sent to Dr. Patel — 10 days remaining
        </p>
      </div>

    </div>
  )
}
