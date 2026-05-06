'use client'

// Auto Approval panel
// Shows: Stat row (auto-approved / escalated / avg time) + approval queue table

export default function AutoApprovalPanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Auto Approval Queue</h4>
        <p className="text-[11px] text-ink4">Today · 18 processed · 1 escalated</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Auto-Approved', count: '14', bg: '#D1FAE5', color: '#065F46' },
          { label: 'Escalated',     count: '1',  bg: '#FEF3C7', color: '#92400E' },
          { label: 'Avg. Time',     count: '3s', bg: '#EDE9FE', color: '#5B21B6' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-[8px] p-2.5 text-center"
            style={{ background: s.bg }}
          >
            <p
              className="text-[18px] font-bold font-mono leading-none mb-0.5"
              style={{ color: s.color }}
            >
              {s.count}
            </p>
            <p className="text-[9px] font-semibold" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 65px 60px 75px' }}
      >
        <span>Request</span>
        <span>Staff</span>
        <span>Type</span>
        <span>Decision</span>
      </div>

      {/* Approval rows */}
      {[
        { req: 'PTO Apr 12',      staff: 'Amanda W.', type: 'Time Off', decision: 'AUTO-APR',  bg: '#D1FAE5', color: '#065F46' },
        { req: 'Swap Apr 9 PM',   staff: 'Tom R.',    type: 'Shift',    decision: 'AUTO-APR',  bg: '#D1FAE5', color: '#065F46' },
        { req: 'OT cover Apr 11', staff: 'Mark S.',   type: 'Overtime', decision: 'ESCALATED', bg: '#FEF3C7', color: '#92400E' },
        { req: 'PTO Apr 15',      staff: 'Janet F.',  type: 'Time Off', decision: 'AUTO-APR',  bg: '#D1FAE5', color: '#065F46' },
        { req: 'Swap Apr 14 AM',  staff: 'Derek P.',  type: 'Shift',    decision: 'AUTO-APR',  bg: '#D1FAE5', color: '#065F46' },
      ].map((row, i) => (
        <div
          key={i}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{ gridTemplateColumns: '1fr 65px 60px 75px' }}
        >
          <span className="font-medium text-ink truncate">{row.req}</span>
          <span className="text-ink4 text-[10px]">{row.staff}</span>
          <span className="text-ink4 text-[10px]">{row.type}</span>
          <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>
            {row.decision}
          </span>
        </div>
      ))}

    </div>
  )
}
