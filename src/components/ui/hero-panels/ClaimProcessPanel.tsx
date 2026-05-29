'use client'

import { type Phase, phaseGte } from './types'

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getClaimPill(phase: Phase): { text: string; bg: string; color: string } {
  if (phase === 'resolved')   return { text: '✓ Recovered', bg: '#DCFCE7', color: '#16A34A' }
  if (phase === 'rcm')        return { text: '↻ Reworking',  bg: '#FEF3C7', color: '#D97706' }
  if (phase === 'compliance') return { text: '↻ Reviewing',  bg: '#FEF3C7', color: '#D97706' }
  if (phase === 'claim-in')   return { text: '● Denied',     bg: '#FEE2E2', color: '#DC2626' }
  return                             { text: '● Queued',     bg: '#F3F4F6', color: '#9CA3AF' }
}

function getHeaderStatus(phase: Phase): { text: string; color: string } {
  if (phase === 'resolved')   return { text: '✓ Recovered',  color: '#16A34A' }
  if (phase === 'rcm')        return { text: '↻ Reworking',  color: '#059669' }
  if (phase === 'compliance') return { text: '↻ Analyzing',  color: '#0891B2' }
  if (phase === 'claim-in')   return { text: '⚠ Alert',      color: '#D97706' }
  return                             { text: '● Monitoring', color: '#9CA3AF' }
}

function getProgressPct(phase: Phase): number {
  const map: Record<Phase, number> = {
    idle: 0, 'claim-in': 20, compliance: 50, rcm: 80, resolved: 100, resetting: 0,
  }
  return map[phase]
}

// ── TIMELINE STEP ─────────────────────────────────────────────────────────────

type StepProps = {
  color: string
  suiteLabel: string
  agentName: string
  statusText: string
  detailText: string
  isActive: boolean
  isPast: boolean
  isLast: boolean
}

function TimelineStep({
  color, suiteLabel, agentName,
  statusText, detailText,
  isActive, isPast, isLast,
}: StepProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        paddingBottom: isLast ? 0 : '16px',
      }}
    >
      {/* Left column: node + connector */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexShrink: 0,
          width: '16px',
        }}
      >
        {/* Node circle */}
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            flexShrink: 0,
            background: isPast ? '#DCFCE7' : isActive ? color + '22' : '#F1F5F9',
            border: `2px solid ${isPast ? '#22C55E' : isActive ? color : '#CBD5E1'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 500ms ease, border-color 500ms ease',
          }}
        >
          {isPast ? (
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
              <polyline
                points="1,3 2.5,4.5 5,1.5"
                stroke="#16A34A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : isActive ? (
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: color,
              }}
            />
          ) : null}
        </div>

        {/* Connector line */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: '1px',
              marginTop: '3px',
              background: isPast ? '#BBF7D0' : '#E2E8F0',
              minHeight: '16px',
              transition: 'background 500ms ease',
            }}
          />
        )}
      </div>

      {/* Right column: content */}
      <div style={{ flex: 1 }}>
        {/* Suite + Agent name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '5px',
          }}
        >
          <span
            style={{
              fontSize: '8px',
              fontWeight: 700,
              letterSpacing: '0.09em',
              color: isActive || isPast ? color : '#D1D5DB',
              fontFamily: 'var(--font-geist-mono)',
              textTransform: 'uppercase',
              transition: 'color 400ms ease',
            }}
          >
            {suiteLabel}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: isActive || isPast ? '#0A0A0A' : '#CBD5E1',
              fontFamily: 'var(--font-geist-sans)',
              transition: 'color 400ms ease',
            }}
          >
            {agentName}
          </span>
        </div>

        {/* Status text */}
        <p
          style={{
            fontSize: '11px',
            margin: '0 0 4px',
            lineHeight: 1.45,
            color: isActive ? '#374151' : isPast ? '#6B7280' : '#9CA3AF',
            fontFamily: 'var(--font-geist-sans)',
            transition: 'color 400ms ease',
          }}
        >
          {statusText}
        </p>

        {/* Detail/action text */}
        <p
          style={{
            fontSize: '10px',
            margin: 0,
            color: isPast ? '#16A34A' : '#9CA3AF',
            fontFamily: 'var(--font-geist-mono)',
            opacity: (isActive || isPast) && detailText ? 1 : 0,
            transition: 'opacity 400ms ease, color 400ms ease',
          }}
        >
          {detailText || ' '}
        </p>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function ClaimProcessPanel({ phase }: { phase: Phase }) {
  const claimPill    = getClaimPill(phase)
  const headerStatus = getHeaderStatus(phase)
  const progressPct  = getProgressPct(phase)
  const isResetting  = phase === 'resetting'

  // Agent 1 — Claims Compliance
  const a1Active = phase === 'compliance'
  const a1Past   = !isResetting && phaseGte(phase, 'rcm')
  const a1Status = a1Active ? 'Reviewing claim 4892'
    : a1Past   ? 'Modifier corrected'
    :             'Awaiting incoming claim'
  const a1Detail = a1Active ? '⚠ Modifier conflict on CPT 99213'
    : a1Past   ? '✓ Standard modifier applied'
    :             ''

  // Agent 2 — Revenue Cycle
  const a2Active = phase === 'rcm'
  const a2Past   = !isResetting && phaseGte(phase, 'resolved')
  const a2Status = a2Active ? 'Reworking claim 4892'
    : a2Past   ? 'Claim resubmitted'
    :             'On standby'
  const a2Detail = a2Active ? '→ Resubmission prepared'
    : a2Past   ? '✓ $760 recovery in progress'
    :             ''

  const claimBg = phase === 'resolved' ? '#F0FDF4'
    : (phase === 'claim-in' || phase === 'compliance' || phase === 'rcm') ? '#FFFBF0'
    : '#FAFAF9'

  return (
    <div
      style={{
        width: '420px',
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow:
          '0 24px 64px rgba(107,63,160,0.18), 0 8px 24px rgba(0,0,0,0.10)',
        border: '1px solid rgba(107,63,160,0.10)',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 18px',
          height: '44px',
          background: 'rgba(255,255,255,0.96)',
          borderBottom: '1px solid #F0EDF8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#059669',
            }}
          />
          <span
            style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}
          >
            Claim 4892
          </span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              color: '#059669',
              letterSpacing: '0.09em',
              fontFamily: 'var(--font-geist-mono)',
              textTransform: 'uppercase',
              background: 'rgba(5,150,105,0.08)',
              padding: '2px 7px',
              borderRadius: '20px',
            }}
          >
            RCM
          </span>
        </div>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: headerStatus.color,
            fontFamily: 'var(--font-geist-mono)',
            transition: 'color 400ms ease',
          }}
        >
          {headerStatus.text}
        </span>
      </div>

      {/* ── Claim card ── */}
      <div
        style={{
          padding: '14px 18px 16px',
          background: claimBg,
          borderBottom: '1px solid #F0EDF8',
          transition: 'background 600ms ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.10em',
                color: '#9CA3AF',
                fontFamily: 'var(--font-geist-mono)',
                textTransform: 'uppercase',
                margin: '0 0 5px',
              }}
            >
              Case
            </p>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#0A0A0A',
                margin: '0 0 4px',
                lineHeight: 1.25,
              }}
            >
              CPT 99213 · $760
            </p>
            <p
              style={{
                fontSize: '11px',
                color: '#9CA3AF',
                margin: 0,
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              Blue Cross · 6:09 AM
            </p>
          </div>

          {/* Status pill */}
          <div
            style={{
              padding: '4px 10px',
              background: claimPill.bg,
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: 600,
              color: claimPill.color,
              fontFamily: 'var(--font-geist-mono)',
              flexShrink: 0,
              marginLeft: '12px',
              transition: 'background 500ms ease, color 500ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {claimPill.text}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div style={{ padding: '18px 18px 14px' }}>
        <TimelineStep
          color="#0891B2"
          suiteLabel="Compliance"
          agentName="Claims Compliance"
          statusText={a1Status}
          detailText={a1Detail}
          isActive={a1Active}
          isPast={a1Past}
          isLast={false}
        />
        <TimelineStep
          color="#059669"
          suiteLabel="Financial"
          agentName="Revenue Cycle"
          statusText={a2Status}
          detailText={a2Detail}
          isActive={a2Active}
          isPast={a2Past}
          isLast
        />
      </div>

      {/* ── Progress bar ── */}
      <div
        style={{
          borderTop: '1px solid #F0EDF8',
          padding: '11px 18px 13px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#9CA3AF',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-mono)',
            }}
          >
            Progress
          </span>
          <span
            style={{
              fontSize: '9px',
              color: '#6B7280',
              fontFamily: 'var(--font-geist-mono)',
            }}
          >
            {progressPct}%
          </span>
        </div>
        <div
          style={{
            height: '3px',
            background: '#F0EDF8',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background:
                progressPct === 100
                  ? 'linear-gradient(90deg, #16A34A, #22C55E)'
                  : 'linear-gradient(90deg, #6B3FA0, #0891B2)',
              borderRadius: '3px',
              transition: 'width 800ms ease, background 600ms ease',
            }}
          />
        </div>
      </div>

      {/* ── Resolution footer ── */}
      <div
        style={{
          borderTop: '1px solid #F0EDF8',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAF9',
          opacity: phase === 'resolved' ? 1 : 0,
          transition: 'opacity 500ms ease',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            color: '#6B7280',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          4 min 28s · Zero manual review
        </span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#16A34A',
            background: '#DCFCE7',
            border: '1px solid #BBF7D0',
            borderRadius: '20px',
            padding: '2px 8px',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          ✓ Recovered
        </span>
      </div>
    </div>
  )
}
