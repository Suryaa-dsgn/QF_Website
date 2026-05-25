const providers = [
  { name: 'Dr. Rogers', cred: 'MD Licence (PA)',   expires: 'Jun 2026', status: 'CURRENT',  bg: '#D1FAE5', color: '#065F46', expiring: false },
  { name: 'Dr. Patel',  cred: 'DEA Registration',  expires: '11 days',  status: 'EXPIRING', bg: '#FEF3C7', color: '#92400E', expiring: true  },
  { name: 'Dr. Chen',   cred: 'Board Cert',         expires: 'Dec 2025', status: 'CURRENT',  bg: '#D1FAE5', color: '#065F46', expiring: false },
]

export default function CredentialingVisual() {
  return (
    <div className="flex flex-col gap-1.5 w-[230px]">
      <p className="font-mono text-[10px] text-ink4 mb-0.5">Provider Credentials — 48 providers</p>

      {providers.map((row) => (
        <div
          key={row.name}
          className="flex items-center justify-between bg-white rounded-[6px] px-2.5 py-1.5 border"
          style={{ borderColor: row.expiring ? '#FDE68A' : 'rgba(107,63,160,0.07)' }}
        >
          <div>
            <p className="font-ui text-[10px] font-semibold text-ink">{row.name}</p>
            <p className="font-mono text-[9px] text-ink4">{row.cred}</p>
          </div>
          <div className="text-right">
            <span
              className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-[4px] block"
              style={{ background: row.bg, color: row.color }}
            >
              {row.status}
            </span>
            <p className="font-mono text-[9px] text-ink4 mt-0.5">{row.expires}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
