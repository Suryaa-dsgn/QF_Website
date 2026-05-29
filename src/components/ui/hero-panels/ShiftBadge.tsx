'use client'

// Static card — visibility/animation managed by parent HeroComposition

export default function ShiftBadge() {
  return (
    <div
      style={{
        width: '198px',
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 16px 44px rgba(107,63,160,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {/* Purple header band */}
      <div
        style={{
          background: 'linear-gradient(135deg, #6B3FA0 0%, #8B5CF6 100%)',
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
            <polyline points="1.5,4.5 3.5,6.5 7.5,2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          Shift Covered
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px' }}>
        {/* Speed number */}
        <div style={{ marginBottom: '2px', display: 'flex', alignItems: 'baseline', gap: '2px' }}>
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
            28
          </span>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#6B3FA0',
              fontFamily: 'var(--font-geist-mono)',
            }}
          >
            s
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
          06:00–14:00 · Maria G.
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-geist-mono)' }}>
              3 patients
            </span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#374151', fontFamily: 'var(--font-geist-mono)' }}>
              Reassigned
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-geist-sans)' }}>
              Coordinator contact
            </span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: '#6B3FA0', fontFamily: 'var(--font-geist-sans)' }}>
              None
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
