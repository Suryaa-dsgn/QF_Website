'use client'

// Payment Collection panel
// Shows: Large recovery rate + progress bar + accounts table with priority pills

export default function CollectionPanel() {
  const recoveryRate = 73

  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Collection Dashboard</h4>
        <p className="text-[11px] text-ink4">April · 4 accounts · $38,700 outstanding</p>
      </div>

      {/* Recovery rate block */}
      <div className="flex items-end gap-4 mb-3">
        <div>
          <p className="text-[10px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-0.5">Recovery Rate</p>
          <div className="flex items-baseline gap-1">
            <span
              className="font-mono font-bold text-ink leading-none"
              style={{ fontSize: '36px', letterSpacing: '-0.04em' }}
            >
              {recoveryRate}
            </span>
            <span className="font-mono text-ink4 text-[18px] leading-none">%</span>
          </div>
          <p className="text-[10px] font-mono text-[#16A34A] mt-0.5">↑ +4.8% vs last month</p>
        </div>

        {/* Progress bar */}
        <div className="flex-1 pb-1">
          <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${recoveryRate}%`, background: '#6B3FA0' }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-ink4 font-mono">0%</span>
            <span className="text-[9px] text-ink4 font-mono">100%</span>
          </div>
        </div>
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 40px 70px 60px 60px' }}
      >
        <span>Account</span>
        <span>DSO</span>
        <span>Balance</span>
        <span>Priority</span>
        <span>Last Contact</span>
      </div>

      {/* Account rows */}
      {[
        { name: 'PrimaCare Inc.',  dso: 45, balance: '$22,400', priority: 'HIGH', priorityBg: '#FEE2E2', priorityColor: '#991B1B', lastContact: 'Apr 14' },
        { name: 'CareRx Group',    dso: 32, balance: '$9,900',  priority: 'MED',  priorityBg: '#FEF3C7', priorityColor: '#92400E', lastContact: 'Apr 12' },
        { name: 'MedBridge LLC',   dso: 28, balance: '$4,800',  priority: 'MED',  priorityBg: '#FEF3C7', priorityColor: '#92400E', lastContact: 'Apr 13' },
        { name: 'SunCare Systems', dso: 18, balance: '$1,600',  priority: 'LOW',  priorityBg: '#F3F4F6', priorityColor: '#6B7280', lastContact: 'Apr 10' },
      ].map((row, i) => (
        <div
          key={i}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{ gridTemplateColumns: '1fr 40px 70px 60px 60px' }}
        >
          <span className="font-medium text-ink truncate">{row.name}</span>
          <span
            className="font-mono text-[10px] font-semibold"
            style={{ color: row.dso > 40 ? '#DC2626' : row.dso > 25 ? '#D97706' : '#6B7280' }}
          >
            {row.dso}d
          </span>
          <span className="font-mono text-ink text-[10px] font-semibold">{row.balance}</span>
          <span className="status-pill text-[10px]" style={{ background: row.priorityBg, color: row.priorityColor }}>
            {row.priority}
          </span>
          <span className="text-ink4 text-[10px]">{row.lastContact}</span>
        </div>
      ))}

    </div>
  )
}
