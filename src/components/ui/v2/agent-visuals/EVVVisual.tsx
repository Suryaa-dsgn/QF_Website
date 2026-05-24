const visits = [
  { client: 'Mrs. Garcia', time: '09:00', status: 'VERIFIED', bg: '#D1FAE5', color: '#065F46' },
  { client: 'Mr. Chen',   time: '11:30', status: 'REVIEW',   bg: '#FEF3C7', color: '#92400E' },
  { client: 'Ms. Davis',  time: '14:00', status: 'VERIFIED', bg: '#D1FAE5', color: '#065F46' },
]

export default function EVVVisual() {
  return (
    <div className="flex flex-col gap-2 w-[210px]">
      <p className="font-mono text-[10px] text-ink4">Today's Visit Log</p>

      {visits.map((row) => (
        <div
          key={row.client}
          className="flex items-center justify-between bg-white rounded-[6px] px-2.5 py-1.5 border border-[rgba(107,63,160,0.07)]"
        >
          <div>
            <p className="font-ui text-[11px] font-semibold text-ink leading-none">{row.client}</p>
            <p className="font-mono text-[10px] text-ink4 mt-0.5">{row.time}</p>
          </div>
          <span
            className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-[4px]"
            style={{ background: row.bg, color: row.color }}
          >
            {row.status}
          </span>
        </div>
      ))}

      {/* GPS indicator */}
      <div className="flex items-center gap-1 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block flex-shrink-0" />
        <p className="font-mono text-[9px] text-ink4">GPS validated · Syncing to billing</p>
      </div>
    </div>
  )
}
