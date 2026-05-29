'use client'

// Static card — visibility/animation managed by parent HeroComposition

export default function RecoveryBadge() {
  return (
    <div
      style={{
        width: '198px',
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow:
          '0 16px 44px rgba(34,197,94,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {/* Green header band */}
      <div
        style={{
          background: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
        }}
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <polyline
              points="1.5,4.5 3.5,6.5 7.5,2"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          Claim Recovered
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px' }}>
        {/* Amount */}
        <div style={{ marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '30px',
              fontWeight: 700,
              color: '#0A0A0A',
              fontFamily: 'var(--font-geist-mono)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            $760
          </span>
        </div>

        <p
          style={{
            fontSize: '11px',
            color: '#6B7280',
            margin: '0 0 12px',
            fontFamily: 'var(--font-geist-sans)',
            lineHeight: 1.4,
          }}
        >
          Claim 4892 · Blue Cross
        </p>

        {/* Divider + metrics */}
        <div
          style={{
            borderTop: '1px solid #F4F0FB',
            paddingTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: '#9CA3AF',
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              Resolved in
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#374151',
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              4 min 28s
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: '#9CA3AF',
                fontFamily: 'var(--font-geist-sans)',
              }}
            >
              Manual review
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: '#16A34A',
                fontFamily: 'var(--font-geist-sans)',
              }}
            >
              None
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
