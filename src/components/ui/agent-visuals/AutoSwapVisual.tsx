export default function AutoSwapVisual() {
  return (
    <div className="flex flex-col gap-2 w-[220px]">
      {/* Trigger */}
      <div
        className="rounded-[6px] px-2.5 py-1.5 text-[10px] font-ui text-[#92400E]"
        style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
      >
        ⚠ Amanda W. — Called in sick · 06:00–14:00
      </div>

      {/* Candidate cards row */}
      <div className="flex items-center gap-2">
        {/* Candidate A — top match */}
        <div
          className="flex-1 rounded-[8px] px-2.5 py-2 border text-center"
          style={{ background: 'rgba(107,63,160,0.04)', borderColor: 'rgba(107,63,160,0.14)' }}
        >
          <div className="w-6 h-6 rounded-full bg-brand text-white font-mono text-[9px] flex items-center justify-center mx-auto mb-1">
            SP
          </div>
          <p className="font-ui text-[10px] font-semibold text-ink">Sarah P.</p>
          <p className="font-mono text-[9px] text-[#16A34A]">94% match</p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#6B3FA0" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Candidate B */}
        <div
          className="flex-1 rounded-[8px] px-2.5 py-2 border text-center"
          style={{ background: '#FAFAFA', borderColor: 'rgba(107,63,160,0.08)' }}
        >
          <div className="w-6 h-6 rounded-full bg-[#D1FAE5] text-[#065F46] font-mono text-[9px] flex items-center justify-center mx-auto mb-1">
            JK
          </div>
          <p className="font-ui text-[10px] font-semibold text-ink3">James K.</p>
          <p className="font-mono text-[9px] text-ink4">87% match</p>
        </div>
      </div>

      <p className="font-mono text-[9px] text-ink4 text-center">
        Confirmed in 28s · No agency needed
      </p>
    </div>
  )
}
