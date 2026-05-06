'use client'

// Contract Compliance panel
// Shows: Header with VIOLATION badge + contract rules table (FAIL row highlighted) + violation card

export default function CompliancePanel() {
  return (
    <div className="p-4 h-full overflow-hidden font-ui text-ink">

      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h4 className="text-[13px] font-semibold text-ink">Contract Compliance Check</h4>
          <p className="text-[11px] text-ink4">Bellmore Group · Services Agreement 2024</p>
        </div>
        <span className="status-pill text-[10px] flex-shrink-0 ml-2" style={{ background: '#FEE2E2', color: '#991B1B' }}>
          1 VIOLATION
        </span>
      </div>

      {/* Divider */}
      <div className="border-b border-[#F3F3F3] mt-2 mb-3" />

      {/* Column headers */}
      <div
        className="grid text-[10px] font-semibold text-ink4 pb-1.5 border-b border-[#F3F3F3] mb-1"
        style={{ gridTemplateColumns: '1fr 70px 55px' }}
      >
        <span>Clause</span>
        <span>Rule</span>
        <span>Status</span>
      </div>

      {/* Rule rows */}
      {[
        { clause: 'Net 30 payment terms',    rule: '≤ 30 days',  status: 'PASS', bg: '#D1FAE5', color: '#065F46', fail: false },
        { clause: 'Volume discount (>$5k)',  rule: '−5%',        status: 'FAIL', bg: '#FEE2E2', color: '#991B1B', fail: true  },
        { clause: 'Late fee cap after 30d',  rule: '≤ 15%',      status: 'PASS', bg: '#D1FAE5', color: '#065F46', fail: false },
        { clause: 'Service-level walk-back', rule: 'Premium',    status: 'PASS', bg: '#D1FAE5', color: '#065F46', fail: false },
      ].map((row, i) => (
        <div key={i}>
          <div
            className="grid items-center py-1.5 border-b border-[#F9F8FF] text-[11px]"
            style={{
              gridTemplateColumns: '1fr 70px 55px',
              background: row.fail ? '#FFF5F5' : 'transparent',
            }}
          >
            <span
              className="font-medium truncate"
              style={{ color: row.fail ? '#991B1B' : '#0A0A0A' }}
            >
              {row.clause}
            </span>
            <span className="font-mono text-[10px] text-ink4">{row.rule}</span>
            <span className="status-pill text-[10px]" style={{ background: row.bg, color: row.color }}>
              {row.status}
            </span>
          </div>

          {/* Violation detail card — inline below FAIL row */}
          {row.fail && (
            <div
              className="my-2 rounded-[8px] p-2.5"
              style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] text-[#991B1B] leading-snug">
                  Discount not applied on INV-082. <strong>$420 revenue leakage</strong> detected.
                </p>
                <div
                  className="flex-shrink-0 px-2 py-0.5 rounded-[4px] text-[10px] font-semibold cursor-default"
                  style={{ background: '#991B1B', color: '#fff' }}
                >
                  Dispute
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Summary banner */}
      <div
        className="mt-2 rounded-[8px] p-2.5 flex items-start gap-2"
        style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.15)' }}
      >
        <span className="text-[11px] text-brand">✦</span>
        <p className="text-[11px] text-[#6B3FA0] leading-snug">
          3 of 4 clauses validated. 1 violation auto-flagged before payment released.
        </p>
      </div>

    </div>
  )
}
