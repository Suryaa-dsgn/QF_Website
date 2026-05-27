'use client'

import { useState, useEffect } from 'react'

// Auto Swap panel
// Animation: Gap alert → scanning → Amanda W. appears → Tom R. appears → confirm button

export default function AutoSwapPanel() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 900),   // Amanda W. card fades in
      setTimeout(() => setPhase(2), 1400),  // Tom R. card fades in
      setTimeout(() => setPhase(3), 2200),  // Label resolves + action button appears
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const candidate1Visible = phase >= 1
  const candidate2Visible = phase >= 2
  const actionVisible     = phase >= 3
  const scanDone          = phase >= 3

  const candidates = [
    {
      name: 'Amanda W.', role: 'RN', cert: 'Wound Care ✓', hrs: '32h/wk',
      score: 97,
      bg: 'rgba(107,63,160,0.06)', border: 'rgba(107,63,160,0.2)',
      scoreBg: '#6B3FA0', scoreColor: '#fff',
      visible: candidate1Visible,
    },
    {
      name: 'Tom R.', role: 'RN', cert: 'Wound Care ✓', hrs: '38h/wk',
      score: 82,
      bg: '#FAFAFA', border: '#F3F3F3',
      scoreBg: '#F3F3F3', scoreColor: '#6B7280',
      visible: candidate2Visible,
    },
  ]

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Auto Swap Engine</h4>
        <p className="text-[11px] text-ink4">Shift gap detected — matching in progress</p>
      </div>

      {/* Gap alert card — always visible */}
      <div
        className="rounded-[10px] p-3 mb-4"
        style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-[12px] font-semibold text-[#92400E]">Open Gap — Thu Apr 10, PM Shift</p>
          <span className="status-pill text-[10px]" style={{ background: '#FEE2E2', color: '#991B1B' }}>
            URGENT
          </span>
        </div>
        <p className="text-[11px] text-[#78350F]">Clinical Wound Care · 14:00–22:00 · RN required</p>
      </div>

      {/* Scanning → resolved label */}
      <div className="flex items-center gap-2 mb-2 h-[16px]">
        {scanDone ? (
          <p className="text-[10px] font-semibold text-ink4 uppercase tracking-[0.06em]">
            Best match candidates
          </p>
        ) : (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#6B3FA0',
                animation: 'gapPulse 0.7s ease-in-out infinite alternate',
                flexShrink: 0,
              }}
            />
            <p className="text-[10px] font-semibold text-[#6B3FA0] uppercase tracking-[0.06em]">
              Scanning candidates…
            </p>
          </>
        )}
      </div>

      {/* Candidate cards — reveal one by one */}
      <div className="flex flex-col gap-2">
        {candidates.map((c) => (
          <div
            key={c.name}
            className="rounded-[10px] p-2.5 flex items-center justify-between"
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              opacity: c.visible ? 1 : 0,
              transform: c.visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white border border-[#E9E3FA] flex items-center justify-center text-[10px] font-bold text-brand flex-shrink-0">
                {c.name.split(' ').map((w: string) => w[0]).join('')}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-ink leading-none">{c.name}</p>
                <p className="text-[10px] text-ink4">{c.role} · {c.cert} · {c.hrs}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className="rounded-[6px] px-2 py-1 text-center min-w-[36px]"
                style={{ background: c.scoreBg }}
              >
                <p className="text-[13px] font-bold font-mono leading-none" style={{ color: c.scoreColor }}>
                  {c.score}
                </p>
                <p className="text-[8px]" style={{ color: c.scoreColor }}>score</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons — appear with glow at phase 3 */}
      <div
        className="mt-3 flex gap-2"
        style={{
          opacity: actionVisible ? 1 : 0,
          transform: actionVisible ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <div
          className="flex-1 text-center py-1.5 rounded-[6px] text-[11px] font-semibold cursor-default"
          style={{
            background: '#6B3FA0',
            color: '#fff',
            boxShadow: actionVisible ? '0 0 0 3px rgba(107,63,160,0.22)' : 'none',
            transition: 'box-shadow 0.6s ease 0.2s',
          }}
        >
          Confirm Amanda W.
        </div>
        <div
          className="px-3 py-1.5 rounded-[6px] text-[11px] font-semibold cursor-default"
          style={{ background: '#F3F3F3', color: '#6B7280' }}
        >
          Skip
        </div>
      </div>

    </div>
  )
}
