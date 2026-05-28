'use client'

import { useState, useEffect } from 'react'

// Claims Compliance panel
// Animation: claim card populates (800ms) → modifier conflict flags red (1.6s) → auto-corrected badge (2.3s)

export default function ClaimsCompliancePanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 800)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 700)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const cardVisible  = phase >= 1
  const conflictShown = phase >= 2
  const corrected    = phase >= 3

  const rules = [
    { label: 'HCPCS Code',       status: 'PASS', always: true  },
    { label: 'Diagnosis Code',   status: 'PASS', always: true  },
    { label: 'Modifier 25',
      status: corrected ? 'FIXED' : conflictShown ? 'FAIL' : 'PASS',
      always: false,
    },
    { label: 'Documentation',   status: 'PASS', always: true  },
    { label: 'Payer NPI',       status: 'PASS', always: true  },
  ]

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Claims Compliance</h4>
        <p className="text-[11px] text-ink4">Pre-submission check · Claim 4892</p>
      </div>

      {/* Claim card */}
      <div
        className="rounded-[10px] border p-3 mb-3"
        style={{
          background: '#FAFAFA',
          border: '1px solid #E8E4F5',
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[12px] font-semibold text-ink">Claim #4892</p>
            <p className="text-[11px] text-ink4">Margaret T. · Medicaid · Mar 26</p>
          </div>
          <span
            className="status-pill text-[9px]"
            style={{
              background: corrected ? '#D1FAE5' : conflictShown ? '#FEE2E2' : '#EDE9FE',
              color: corrected ? '#065F46' : conflictShown ? '#991B1B' : '#5B21B6',
              transition: 'background 0.5s ease, color 0.5s ease',
            }}
          >
            {corrected ? 'CORRECTED' : conflictShown ? 'CONFLICT' : 'CHECKING'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          {[
            { label: 'CPT Code', value: '99213'    },
            { label: 'Modifier', value: '25'        },
            { label: 'Amount',   value: '$760.00'   },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-ink4 mb-0.5">{f.label}</p>
              <p className="font-semibold font-mono text-ink">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance checklist */}
      <p className="text-[10px] font-semibold text-ink4 mb-1.5 uppercase tracking-[0.08em]">Rule Check</p>
      <div className="flex flex-col gap-1 mb-3">
        {rules.map((r) => {
          const isFail = !r.always && conflictShown && !corrected
          const isFixed = !r.always && corrected
          const bg = isFixed ? '#D1FAE5' : isFail ? '#FEE2E2' : '#F0FDF4'
          const color = isFixed ? '#065F46' : isFail ? '#991B1B' : '#16A34A'
          const icon = isFixed ? '✓' : isFail ? '✕' : '✓'
          return (
            <div
              key={r.label}
              className="flex items-center justify-between rounded-[6px] px-2.5 py-1.5"
              style={{ background: bg, transition: 'background 0.5s ease' }}
            >
              <span className="text-[11px] text-ink font-medium">{r.label}</span>
              <span className="text-[10px] font-semibold" style={{ color, transition: 'color 0.5s ease' }}>
                {icon} {r.status}
              </span>
            </div>
          )
        })}
      </div>

      {/* Auto-corrected badge */}
      <div
        className="rounded-[8px] p-2.5 flex items-center gap-2"
        style={{
          background: '#D1FAE5',
          border: '1px solid #A7F3D0',
          opacity: corrected ? 1 : 0,
          transform: corrected ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <span className="text-[11px]">✓</span>
        <p className="text-[11px] text-[#065F46] leading-snug">
          Modifier conflict auto-corrected — claim ready for submission
        </p>
      </div>

    </div>
  )
}
