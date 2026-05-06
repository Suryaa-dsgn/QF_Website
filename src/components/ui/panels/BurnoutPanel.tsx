'use client'

// Staff Burnout Prevention panel
// Shows: Risk gauge row + staff risk table + alert banner

export default function BurnoutPanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Burnout Risk Monitor</h4>
        <p className="text-[11px] text-ink4">Week of Mar 24–30 · 48 staff</p>
      </div>

      {/* Risk gauge row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'High Risk', count: 3,  color: '#FEE2E2', textColor: '#991B1B', barColor: '#EF4444' },
          { label: 'At Risk',   count: 8,  color: '#FEF3C7', textColor: '#92400E', barColor: '#F59E0B' },
          { label: 'Healthy',   count: 37, color: '#D1FAE5', textColor: '#065F46', barColor: '#10B981' },
        ].map((item) => (
          <div key={item.label} className="rounded-[8px] p-2.5" style={{ background: item.color }}>
            <p className="text-[10px] font-semibold mb-1" style={{ color: item.textColor }}>{item.label}</p>
            <p className="text-[20px] font-bold font-mono" style={{ color: item.textColor, letterSpacing: '-0.03em' }}>{item.count}</p>
          </div>
        ))}
      </div>

      {/* Staff risk table */}
      <div className="flex flex-col gap-0">
        <div
          className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
          style={{ gridTemplateColumns: '1fr 60px 60px 70px' }}
        >
          <span>Name</span><span>Role</span><span>Hrs/wk</span><span>Risk</span>
        </div>
        {[
          { name: 'Mark S.',  role: 'RN',  hrs: '58h', score: 94, label: 'HIGH RISK', bg: '#FEE2E2', color: '#991B1B' },
          { name: 'Jamie L.', role: 'LPN', hrs: '52h', score: 78, label: 'AT RISK',   bg: '#FEF3C7', color: '#92400E' },
          { name: 'Sarah P.', role: 'CNA', hrs: '44h', score: 45, label: 'HEALTHY',   bg: '#D1FAE5', color: '#065F46' },
          { name: 'David M.', role: 'RN',  hrs: '61h', score: 97, label: 'HIGH RISK', bg: '#FEE2E2', color: '#991B1B' },
        ].map((row) => (
          <div
            key={row.name}
            className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[12px]"
            style={{ gridTemplateColumns: '1fr 60px 60px 70px' }}
          >
            <span className="font-medium text-ink">{row.name}</span>
            <span className="font-mono text-ink4 text-[11px]">{row.role}</span>
            <span className="font-mono text-ink4 text-[11px]">{row.hrs}</span>
            <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>
              {row.label}
            </span>
          </div>
        ))}
      </div>

      {/* Alert banner */}
      <div
        className="mt-3 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
      >
        <span className="text-[12px]">⚠</span>
        <p className="text-[11px] text-[#92400E] leading-snug">
          2 staff approaching burnout threshold — workload redistribution recommended
        </p>
      </div>

    </div>
  )
}
