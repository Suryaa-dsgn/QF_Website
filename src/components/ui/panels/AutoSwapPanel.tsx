'use client'

// Auto Swap panel
// Shows: Shift gap alert card + two candidate comparison cards + action row

export default function AutoSwapPanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Auto Swap Engine</h4>
        <p className="text-[11px] text-ink4">Shift gap detected — matching in progress</p>
      </div>

      {/* Gap alert card */}
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

      {/* Candidate match cards */}
      <p className="text-[10px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-2">
        Best match candidates
      </p>
      <div className="flex flex-col gap-2">
        {[
          {
            name: 'Amanda W.', role: 'RN', cert: 'Wound Care ✓', hrs: '32h/wk',
            score: 97, badge: 'TOP MATCH',
            bg: 'rgba(107,63,160,0.06)', border: 'rgba(107,63,160,0.2)',
            scoreBg: '#6B3FA0', scoreColor: '#fff',
          },
          {
            name: 'Tom R.', role: 'RN', cert: 'Wound Care ✓', hrs: '38h/wk',
            score: 82, badge: '2ND',
            bg: '#FAFAFA', border: '#F3F3F3',
            scoreBg: '#F3F3F3', scoreColor: '#6B7280',
          },
        ].map((c) => (
          <div
            key={c.name}
            className="rounded-[10px] p-2.5 flex items-center justify-between"
            style={{ background: c.bg, border: `1px solid ${c.border}` }}
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
                <p
                  className="text-[13px] font-bold font-mono leading-none"
                  style={{ color: c.scoreColor }}
                >
                  {c.score}
                </p>
                <p className="text-[8px]" style={{ color: c.scoreColor }}>score</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex gap-2">
        <div
          className="flex-1 text-center py-1.5 rounded-[6px] text-[11px] font-semibold cursor-default"
          style={{ background: '#6B3FA0', color: '#fff' }}
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
