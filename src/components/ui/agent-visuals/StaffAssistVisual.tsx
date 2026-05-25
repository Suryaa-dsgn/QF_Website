export default function StaffAssistVisual() {
  return (
    <div className="flex flex-col gap-2 w-[220px]">
      {/* Chat header */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="2" />
            <circle cx="8" cy="8" r="2" fill="white" />
          </svg>
        </div>
        <span className="font-ui text-[11px] font-semibold text-ink">StaffAssist</span>
        <span className="text-[9px] font-mono text-[#16A34A] ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
          Online
        </span>
      </div>

      {/* Staff message */}
      <div className="self-end bg-brand text-white rounded-[10px] rounded-tr-[3px] px-3 py-1.5 max-w-[160px]">
        <p className="text-[11px] font-ui">Can I swap my Thursday shift?</p>
      </div>

      {/* Agent reply */}
      <div
        className="self-start rounded-[10px] rounded-tl-[3px] px-3 py-1.5 max-w-[190px]"
        style={{ background: 'rgba(107,63,160,0.06)' }}
      >
        <p className="text-[11px] font-ui text-ink">
          Checking eligibility...<br />
          <span className="text-[#16A34A]">✓ Approved. Swap confirmed.</span>
        </p>
      </div>

      {/* Timestamp */}
      <p className="font-mono text-[9px] text-ink4 self-start ml-1">
        Response time: &lt;2s
      </p>
    </div>
  )
}
