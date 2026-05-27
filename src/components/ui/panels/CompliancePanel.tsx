'use client'

import { useState, useEffect } from 'react'

// Contract Compliance panel
// Animation: All PASS → volume discount flips FAIL → violation card slides in → badge appears

export default function CompliancePanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),  // Volume discount row: PASS → FAIL
      setTimeout(() => setPhase(2), 1800),  // Violation card slides in
      setTimeout(() => setPhase(3), 2400),  // Header badge appears + summary updates
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const discountFails    = phase >= 1
  const violationVisible = phase >= 2
  const badgeVisible     = phase >= 3

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header — violation badge appears at phase 3 */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h4 className="text-[13px] font-semibold text-ink">Contract Compliance Check</h4>
          <p className="text-[11px] text-ink4">Bellmore Group · Services Agreement 2024</p>
        </div>
        <span
          className="status-pill text-[10px] flex-shrink-0 ml-2"
          style={{
            background: '#FEE2E2',
            color: '#991B1B',
            opacity: badgeVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          1 VIOLATION
        </span>
      </div>

      {/* Divider */}
      <div className="border-b border-[#F3F3F3] mt-2 mb-3" />

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 70px 55px' }}
      >
        <span>Clause</span>
        <span>Rule</span>
        <span>Status</span>
      </div>

      {/* Rule rows — volume discount transitions at phase 1 */}
      {[
        { clause: 'Net 30 payment terms',    rule: '≤ 30 days',  status: 'PASS', bg: '#D1FAE5', color: '#065F46', isDiscount: false },
        {
          clause: 'Volume discount (>$5k)',
          rule: '−5%',
          status: discountFails ? 'FAIL' : 'PASS',
          bg:     discountFails ? '#FEE2E2' : '#D1FAE5',
          color:  discountFails ? '#991B1B' : '#065F46',
          isDiscount: true,
        },
        { clause: 'Late fee cap after 30d',  rule: '≤ 15%',   status: 'PASS', bg: '#D1FAE5', color: '#065F46', isDiscount: false },
        { clause: 'Service-level walk-back', rule: 'Premium', status: 'PASS', bg: '#D1FAE5', color: '#065F46', isDiscount: false },
      ].map((row, i) => (
        <div key={i}>
          <div
            className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
            style={{
              gridTemplateColumns: '1fr 70px 55px',
              background: row.isDiscount && discountFails ? '#FFF5F5' : 'transparent',
              transition: 'background 0.5s ease',
            }}
          >
            <span
              className="font-medium truncate"
              style={{
                color: row.isDiscount && discountFails ? '#991B1B' : '#0A0A0A',
                transition: 'color 0.5s ease',
              }}
            >
              {row.clause}
            </span>
            <span className="font-mono text-[10px] text-ink4">{row.rule}</span>
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

          {/* Violation card — slides in below discount row at phase 2 */}
          {row.isDiscount && (
            <div
              className="my-1 rounded-[8px] p-2.5"
              style={{
                background: '#FEE2E2',
                border: '1px solid #FECACA',
                opacity: violationVisible ? 1 : 0,
                transform: violationVisible ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] text-[#991B1B] leading-snug">
                  Discount not applied on INV-082. <strong>$420 revenue leakage</strong> detected.
                </p>
                <div
                  className="flex-shrink-0 px-2 py-0.5 rounded-[4px] text-[10px] font-semibold cursor-default"
                  style={{ background: '#991B1B', color: '#fff' }}
                >
                  Dispute
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Summary banner */}
      <div
        className="mt-2 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.15)' }}
      >
        <span className="text-[11px] text-brand">✦</span>
        <p className="text-[11px] text-[#6B3FA0] leading-snug">
          {badgeVisible
            ? '3 of 4 clauses validated. 1 violation auto-flagged before payment released.'
            : '4 of 4 clauses validated. Invoice cleared for payment.'}
        </p>
      </div>

    </div>
  )
}
