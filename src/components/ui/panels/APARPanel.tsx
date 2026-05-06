'use client'

// AP/AR Matching panel
// Shows: Stat row + reconciliation table with REVIEW row highlighted + short-pay detail card

export default function APARPanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">AP / AR Reconciliation</h4>
        <p className="text-[11px] text-ink4">This week · 4 invoices · 1 review needed</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Matched',   count: '3',    bg: '#D1FAE5', color: '#065F46' },
          { label: 'Short-Pay', count: '1',    bg: '#FEF3C7', color: '#92400E' },
          { label: 'Pending',   count: '0',    bg: '#F3F4F6', color: '#6B7280' },
        ].map((s) => (
          <div key={s.label} className="rounded-[8px] p-2.5 text-center" style={{ background: s.bg }}>
            <p className="text-[18px] font-bold font-mono leading-none mb-0.5" style={{ color: s.color }}>
              {s.count}
            </p>
            <p className="text-[9px] font-semibold" style={{ color: s.color }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '55px 1fr 68px 68px 70px' }}
      >
        <span>Ref</span>
        <span>Customer</span>
        <span>Invoiced</span>
        <span>Received</span>
        <span>Status</span>
      </div>

      {/* Invoice rows */}
      {[
        { ref: 'INV-081', customer: 'PrimaCare Inc.',  amount: '$12,400', received: '$12,400', status: 'MATCHED', bg: '#D1FAE5', color: '#065F46', highlight: false },
        { ref: 'INV-079', customer: 'CareRx Group',    amount: '$8,750',  received: '$8,750',  status: 'MATCHED', bg: '#D1FAE5', color: '#065F46', highlight: false },
        { ref: 'INV-082', customer: 'Bellmore Ltd.',   amount: '$5,800',  received: '$5,300',  status: 'REVIEW',  bg: '#FEF3C7', color: '#92400E', highlight: true  },
        { ref: 'INV-080', customer: 'MedBridge LLC',   amount: '$3,200',  received: '$3,200',  status: 'MATCHED', bg: '#D1FAE5', color: '#065F46', highlight: false },
      ].map((row, i) => (
        <div key={i}>
          <div
            className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
            style={{
              gridTemplateColumns: '55px 1fr 68px 68px 70px',
              background: row.highlight ? '#FFFBEB' : 'transparent',
            }}
          >
            <span className="font-mono text-ink4 text-[10px]">{row.ref}</span>
            <span className="font-medium text-ink truncate">{row.customer}</span>
            <span className="font-mono text-ink4 text-[10px]">{row.amount}</span>
            <span className="font-mono text-[10px]" style={{ color: row.highlight ? '#92400E' : '#4B5563' }}>
              {row.received}
            </span>
            <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>
              {row.status}
            </span>
          </div>

          {/* Expand short-pay detail inline below the highlighted row */}
          {row.highlight && (
            <div
              className="mx-0 my-1 rounded-[8px] p-2.5 flex items-start gap-2"
              style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
            >
              <span className="text-[11px]">⚠</span>
              <p className="text-[11px] text-[#92400E] leading-snug">
                Short-pay detected — <strong>$500 deduction</strong>. Auto-dispute letter sent to Bellmore Ltd.
              </p>
            </div>
          )}
        </div>
      ))}

    </div>
  )
}
