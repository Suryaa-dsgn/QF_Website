export default function SchedulerVisual() {
  const days = ['M', 'T', 'W', 'T', 'F']
  const row1 = [true, true, true, true, true]
  const row2 = [true, true, false, true, true]
  const row3 = [true, true, true, true, true]

  return (
    <div className="flex flex-col gap-2 w-[220px]">
      <p className="font-mono text-[10px] text-ink4">Week of Mar 24 — Coverage</p>

      {/* Mini week grid */}
      <div className="grid grid-cols-5 gap-1">
        {/* Headers */}
        {days.map((d, i) => (
          <div key={i} className="text-center font-mono text-[9px] text-ink4">{d}</div>
        ))}

        {/* Row 1 — all filled */}
        {row1.map((_, i) => (
          <div
            key={`r1-${i}`}
            className="h-5 rounded-[3px]"
            style={{ background: '#EDE9FE' }}
          />
        ))}

        {/* Row 2 — gap on Wednesday */}
        {row2.map((filled, i) => (
          <div
            key={`r2-${i}`}
            className="h-5 rounded-[3px] flex items-center justify-center"
            style={{
              background: filled ? '#EDE9FE' : 'rgba(230,57,70,0.10)',
              border: !filled ? '1px dashed #E63946' : 'none',
            }}
          >
            {!filled && <span className="text-[8px] text-[#E63946]">!</span>}
          </div>
        ))}

        {/* Row 3 — all filled */}
        {row3.map((_, i) => (
          <div
            key={`r3-${i}`}
            className="h-5 rounded-[3px]"
            style={{ background: '#EDE9FE' }}
          />
        ))}
      </div>

      {/* AI recommendation */}
      <div
        className="rounded-[6px] px-2.5 py-1.5 flex items-center gap-1.5"
        style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.12)' }}
      >
        <span className="text-brand text-[10px] flex-shrink-0">✦</span>
        <p className="text-[10px] font-ui text-ink3">
          Sarah P. recommended — no OT, certified
        </p>
      </div>
    </div>
  )
}
