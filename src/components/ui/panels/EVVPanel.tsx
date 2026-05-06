'use client'

// Visit Verification (EVV) panel
// Shows: Visit log table with GPS status + one highlighted flagged row + alert banner

export default function EVVPanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Visit Verification (EVV)</h4>
        <p className="text-[11px] text-ink4">Today · 12 visits · 2 flagged</p>
      </div>

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 65px 40px 65px' }}
      >
        <span>Client / Staff</span>
        <span>In / Out</span>
        <span>GPS</span>
        <span>Status</span>
      </div>

      {/* Visit rows */}
      {[
        { client: 'Mr. Chen / Amanda W.', time: '07:02–09:15', gps: '✓', status: 'VERIFIED',  bg: '#D1FAE5', color: '#065F46', highlight: false },
        { client: 'Mrs. Park / Tom R.',   time: '08:00–09:45', gps: '✓', status: 'VERIFIED',  bg: '#D1FAE5', color: '#065F46', highlight: false },
        { client: 'Mr. Garcia / Lisa M.', time: '09:30–??:??', gps: '⚠', status: 'FLAGGED',   bg: '#FEE2E2', color: '#991B1B', highlight: true  },
        { client: 'Mrs. Lee / Derek P.',  time: '10:00–11:30', gps: '✓', status: 'VERIFIED',  bg: '#D1FAE5', color: '#065F46', highlight: false },
        { client: 'Mr. White / Janet F.', time: '11:15–12:45', gps: '✓', status: 'PENDING',   bg: '#FEF3C7', color: '#92400E', highlight: false },
      ].map((row, i) => (
        <div
          key={i}
          className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
          style={{
            gridTemplateColumns: '1fr 65px 40px 65px',
            background: row.highlight ? '#FFF5F5' : 'transparent',
          }}
        >
          <span className="font-medium text-ink truncate">{row.client}</span>
          <span className="font-mono text-ink4 text-[10px]">{row.time}</span>
          <span
            className="text-center text-[11px] font-bold"
            style={{ color: row.gps === '✓' ? '#16A34A' : '#DC2626' }}
          >
            {row.gps}
          </span>
          <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>
            {row.status}
          </span>
        </div>
      ))}

      {/* Alert banner */}
      <div
        className="mt-3 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}
      >
        <span className="text-[12px]">⚑</span>
        <p className="text-[11px] text-[#991B1B] leading-snug">
          Mr. Garcia visit check-out missing — billing hold applied automatically
        </p>
      </div>

    </div>
  )
}
