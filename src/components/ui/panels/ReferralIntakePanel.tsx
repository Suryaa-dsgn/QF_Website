'use client'

import { useState, useEffect } from 'react'

// Referral Intake panel
// Animation: referral card populates (800ms) → provider row highlights (1.6s) → "Summary ready" badge (2.2s)

export default function ReferralIntakePanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 0) t = setTimeout(() => setPhase(1), 800)
    else if (phase === 1) t = setTimeout(() => setPhase(2), 800)
    else if (phase === 2) t = setTimeout(() => setPhase(3), 600)
    else t = setTimeout(() => setPhase(0), 2500) // pause then restart
    return () => clearTimeout(t)
  }, [phase])

  const cardVisible   = phase >= 1
  const providerMatch = phase >= 2
  const summaryReady  = phase >= 3

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Referral Intake</h4>
        <p className="text-[11px] text-ink4">Incoming · Mar 26 · 9:14am</p>
      </div>

      {/* Referral card */}
      <div
        className="rounded-[10px] border border-[#E8E4F5] p-3 mb-3"
        style={{
          background: '#FAFAFA',
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[13px] font-semibold text-ink">Margaret T., 73</p>
            <p className="text-[11px] text-ink4">Post-surgical · Home Health</p>
          </div>
          <span
            className="status-pill text-[9px]"
            style={{ background: summaryReady ? '#D1FAE5' : '#EDE9FE', color: summaryReady ? '#065F46' : '#5B21B6' }}
          >
            {summaryReady ? 'COMPLETE' : 'PROCESSING'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          {[
            { label: 'Visit Freq', value: '5×/week' },
            { label: 'Duration',  value: '60 min'  },
            { label: 'Start',     value: 'Apr 1'   },
          ].map((f) => (
            <div key={f.label}>
              <p className="text-ink4 mb-0.5">{f.label}</p>
              <p className="font-semibold text-ink">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Provider matching */}
      <p className="text-[10px] font-semibold text-ink4 mb-1.5 uppercase tracking-[0.08em]">Provider Match</p>
      <div className="flex flex-col gap-1.5 mb-3">
        {[
          { name: 'Sandra K., RN', match: '96%', avail: 'Available', isMatch: true },
          { name: 'Tom R., LPN',   match: '81%', avail: 'Available', isMatch: false },
        ].map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between rounded-[8px] px-3 py-2"
            style={{
              background: p.isMatch && providerMatch ? '#EDE9FE' : '#F9F8FF',
              border: `1px solid ${p.isMatch && providerMatch ? '#DDD6FE' : '#F0EDFA'}`,
              transition: 'background 0.5s ease, border-color 0.5s ease',
            }}
          >
            <div>
              <p className="text-[12px] font-medium text-ink">{p.name}</p>
              <p className="text-[10px] text-ink4">{p.avail}</p>
            </div>
            <div className="text-right">
              <p
                className="text-[14px] font-bold font-mono"
                style={{ color: p.isMatch && providerMatch ? '#5B21B6' : '#9CA3AF' }}
              >
                {p.match}
              </p>
              <p className="text-[9px] text-ink4">match</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary ready */}
      <div
        className="rounded-[8px] p-2.5 flex items-center gap-2"
        style={{
          background: '#D1FAE5',
          border: '1px solid #A7F3D0',
          opacity: summaryReady ? 1 : 0,
          transform: summaryReady ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <span className="text-[11px]">✓</span>
        <p className="text-[11px] text-[#065F46] leading-snug">
          Intake summary ready — Sandra K. matched, duplicate check clear
        </p>
      </div>

    </div>
  )
}
