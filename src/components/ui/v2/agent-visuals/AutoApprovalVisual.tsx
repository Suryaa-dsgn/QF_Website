export default function AutoApprovalVisual() {
  return (
    <div className="flex flex-col gap-2 w-[220px]">
      <p className="font-mono text-[10px] text-ink4">Approval Queue</p>

      {/* Auto-approved */}
      <div
        className="rounded-[8px] px-3 py-2 border"
        style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-ui text-[11px] font-semibold text-ink leading-tight">
            Jamie L. — Time off Apr 15
          </p>
          <span className="font-mono text-[9px] text-[#16A34A] bg-[#D1FAE5] px-1.5 py-0.5 rounded flex-shrink-0">
            AUTO
          </span>
        </div>
        <p className="font-ui text-[10px] text-ink4 mt-0.5">No conflicts · Policy clear · ✓ Approved</p>
      </div>

      {/* Escalated */}
      <div
        className="rounded-[8px] px-3 py-2 border"
        style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-ui text-[11px] font-semibold text-ink leading-tight">
            David M. — Overtime request
          </p>
          <span className="font-mono text-[9px] text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded flex-shrink-0">
            ESC
          </span>
        </div>
        <p className="font-ui text-[10px] text-ink4 mt-0.5">OT limit exceeded · Sent to manager</p>
      </div>

      <p className="font-mono text-[9px] text-ink4 text-right">
        16 auto-resolved today · 2 escalated
      </p>
    </div>
  )
}
