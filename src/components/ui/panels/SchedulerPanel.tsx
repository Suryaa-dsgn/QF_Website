'use client'

// Scheduler Assist panel
// Shows: AI suggestion banner + week coverage grid + shift rows

export default function SchedulerPanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="mb-3">
        <h4 className="text-[13px] font-semibold text-ink">Scheduler Assist</h4>
        <p className="text-[11px] text-ink4">Week of Apr 7–13 · Philadelphia Region</p>
      </div>

      {/* AI suggestion banner */}
      <div
        className="rounded-[8px] p-2.5 mb-3 flex items-start gap-2"
        style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.15)' }}
      >
        <span className="text-[12px] text-brand">✦</span>
        <p className="text-[11px] text-[#6B3FA0] leading-snug font-medium">
          AI suggests swapping Tue PM shift — saves 6h overtime and fills coverage gap
        </p>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center text-[10px] font-semibold text-ink4">{day}</div>
        ))}
      </div>

      {/* Coverage grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {[
          { label: '4/4', filled: true,  highlight: false },
          { label: '3/4', filled: false, highlight: true  },
          { label: '4/4', filled: true,  highlight: false },
          { label: '4/4', filled: true,  highlight: false },
          { label: '2/4', filled: false, highlight: false },
          { label: '3/3', filled: true,  highlight: false },
          { label: '3/3', filled: true,  highlight: false },
        ].map((day, i) => (
          <div
            key={i}
            className="rounded-[6px] p-1.5 text-center"
            style={{
              background: day.highlight ? '#FEF3C7' : day.filled ? '#D1FAE5' : '#F3F3F3',
              border: day.highlight ? '1px solid #FDE68A' : '1px solid transparent',
            }}
          >
            <p
              className="text-[11px] font-mono font-semibold"
              style={{ color: day.highlight ? '#92400E' : day.filled ? '#065F46' : '#6B7280' }}
            >
              {day.label}
            </p>
          </div>
        ))}
      </div>

      {/* Shift coverage rows */}
      <div className="flex flex-col gap-2">
        {[
          { shift: 'AM (6a–2p)',   staff: 'Maria K., Tom R., Janet F., Lisa M.', status: 'Covered', bg: '#D1FAE5', color: '#065F46' },
          { shift: 'PM (2p–10p)', staff: 'Gap detected — 1 RN needed',          status: 'Gap',     bg: '#FEF3C7', color: '#92400E' },
          { shift: 'NOC (10p–6a)', staff: 'Lisa M., Derek P.',                   status: 'Covered', bg: '#D1FAE5', color: '#065F46' },
        ].map((row) => (
          <div
            key={row.shift}
            className="grid items-center gap-2 text-[11px]"
            style={{ gridTemplateColumns: '80px 1fr 58px' }}
          >
            <span className="font-mono text-ink4 text-[10px]">{row.shift}</span>
            <span className="text-ink3 truncate">{row.staff}</span>
            <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>{row.status}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
