export default function BurnoutVisual() {
  return (
    <div className="flex flex-col gap-2 w-[200px]">
      <p className="font-mono text-[10px] text-ink4 mb-1">Burnout Risk — 48 staff</p>

      {/* High Risk */}
      <div className="flex items-center gap-2">
        <span className="font-ui text-[11px] text-ink3 w-16">High risk</span>
        <div className="flex-1 bg-white border border-[rgba(107,63,160,0.08)] rounded-full h-2">
          <div className="h-2 rounded-full bg-[#FECACA]" style={{ width: '12%' }} />
        </div>
        <span className="font-mono text-[11px] text-[#E63946] w-4">3</span>
      </div>

      {/* At Risk */}
      <div className="flex items-center gap-2">
        <span className="font-ui text-[11px] text-ink3 w-16">At risk</span>
        <div className="flex-1 bg-white border border-[rgba(107,63,160,0.08)] rounded-full h-2">
          <div className="h-2 rounded-full bg-[#FEF3C7]" style={{ width: '28%' }} />
        </div>
        <span className="font-mono text-[11px] text-[#F4A261] w-4">8</span>
      </div>

      {/* Healthy */}
      <div className="flex items-center gap-2">
        <span className="font-ui text-[11px] text-ink3 w-16">Healthy</span>
        <div className="flex-1 bg-white border border-[rgba(107,63,160,0.08)] rounded-full h-2">
          <div className="h-2 rounded-full bg-[#BBF7D0]" style={{ width: '77%' }} />
        </div>
        <span className="font-mono text-[11px] text-[#16A34A] w-4">37</span>
      </div>

      {/* Alert tag */}
      <div
        className="mt-2 rounded-[6px] px-2.5 py-1.5 text-[10px] font-ui text-[#92400E]"
        style={{ background: '#FEF3C7' }}
      >
        ⚠ 2 staff approaching threshold
      </div>
    </div>
  )
}
