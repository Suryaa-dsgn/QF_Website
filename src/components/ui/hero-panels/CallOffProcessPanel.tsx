'use client'

import { type SetPhase } from './setTypes'

// ── HELPERS ───────────────────────────────────────────────────────────────────

function getShiftPill(phase: SetPhase): { text: string; bg: string; color: string } {
  if (phase === 'resolved')  return { text: '✓ Covered',    bg: '#DCFCE7', color: '#16A34A' }
  if (phase === 'step2')     return { text: '↻ Filling',    bg: '#FEF3C7', color: '#D97706' }
  if (phase === 'step1')     return { text: '↻ Searching',  bg: '#F5F3FF', color: '#6B3FA0' }
  if (phase === 'trigger')   return { text: '● Open',       bg: '#FEE2E2', color: '#DC2626' }
  return                            { text: '● Monitoring', bg: '#F3F4F6', color: '#9CA3AF' }
}

function getHeaderStatus(phase: SetPhase): { text: string; color: string } {
  if (phase === 'resolved')  return { text: '✓ Covered',    color: '#16A34A' }
  if (phase === 'step2')     return { text: '↻ Filling',    color: '#059669' }
  if (phase === 'step1')     return { text: '↻ Searching',  color: '#6B3FA0' }
  if (phase === 'trigger')   return { text: '⚠ Alert',      color: '#D97706' }
  return                            { text: '● Monitoring', color: '#9CA3AF' }
}

function getProgressPct(phase: SetPhase): number {
  const map: Record<SetPhase, number> = {
    idle: 0, trigger: 20, step1: 50, step2: 80, resolved: 100, resetting: 0,
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
    <div style={{ display: 'flex', gap: '12px', paddingBottom: isLast ? 0 : '16px' }}>
      {/* Left column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: '16px' }}>
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
              <polyline points="1,3 2.5,4.5 5,1.5" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : isActive ? (
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: color }} />
          ) : null}
        </div>

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

      {/* Right column */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
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
          {detailText || ' '}
        </p>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function CallOffProcessPanel({ phase }: { phase: SetPhase }) {
  const pill         = getShiftPill(phase)
  const headerStatus = getHeaderStatus(phase)
  const progressPct  = getProgressPct(phase)
  const isResetting  = phase === 'resetting'

  // Agent 1 — Call-Off Management
  const a1Active = phase === 'step1'
  const a1Past   = !isResetting && (phase === 'step2' || phase === 'resolved')
  const a1Status = a1Active ? 'Scanning 47 available staff'
    : a1Past   ? 'Best match identified'
    :             'Monitoring shifts'
  const a1Detail = a1Active ? '⚡ Maria G. — 98% fit, 2.1mi'
    : a1Past   ? '✓ Maria G. selected'
    :             ''

  // Agent 2 — Auto Approval
  const a2Active = phase === 'step2'
  const a2Past   = !isResetting && phase === 'resolved'
  const a2Status = a2Active ? 'Notifying Maria G.'
    : a2Past   ? 'Shift confirmed'
    :             'On standby'
  const a2Detail = a2Active ? '→ SMS sent · awaiting reply'
    : a2Past   ? '✓ Accepted in 28s'
    :             ''

  const cardBg = phase === 'resolved' ? '#F0FDF4'
    : (phase === 'trigger' || phase === 'step1' || phase === 'step2') ? '#FFFBF5'
    : '#FAFAF9'

  return (
    <div
      style={{
        width: '420px',
        background: '#FFFFFF',
        borderRadius: '20px',
        boxShadow: '0 24px 64px rgba(107,63,160,0.18), 0 8px 24px rgba(0,0,0,0.10)',
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
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6B3FA0' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>Alert: Shift Gap</span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              color: '#6B3FA0',
              letterSpacing: '0.09em',
              fontFamily: 'var(--font-geist-mono)',
              textTransform: 'uppercase',
              background: 'rgba(107,63,160,0.08)',
              padding: '2px 7px',
              borderRadius: '20px',
            }}
          >
            Workforce
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

      {/* ── Shift card ── */}
      <div
        style={{
          padding: '14px 18px 16px',
          background: cardBg,
          borderBottom: '1px solid #F0EDF8',
          transition: 'background 600ms ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
              Shift
            </p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0A', margin: '0 0 4px', lineHeight: 1.25 }}>
              06:00–14:00 · Today
            </p>
            <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0, fontFamily: 'var(--font-geist-mono)' }}>
              Amanda W. · 6:02 AM
            </p>
          </div>

          <div
            style={{
              padding: '4px 10px',
              background: pill.bg,
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: 600,
              color: pill.color,
              fontFamily: 'var(--font-geist-mono)',
              flexShrink: 0,
              marginLeft: '12px',
              transition: 'background 500ms ease, color 500ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {pill.text}
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div style={{ padding: '18px 18px 14px' }}>
        <TimelineStep
          color="#6B3FA0"
          suiteLabel="Workforce"
          agentName="Call-Off Management"
          statusText={a1Status}
          detailText={a1Detail}
          isActive={a1Active}
          isPast={a1Past}
          isLast={false}
        />
        <TimelineStep
          color="#059669"
          suiteLabel="Workforce"
          agentName="Auto Approval"
          statusText={a2Status}
          detailText={a2Detail}
          isActive={a2Active}
          isPast={a2Past}
          isLast
        />
      </div>

      {/* ── Progress bar ── */}
      <div style={{ borderTop: '1px solid #F0EDF8', padding: '11px 18px 13px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', color: '#9CA3AF', textTransform: 'uppercase', fontFamily: 'var(--font-geist-mono)' }}>
            Progress
          </span>
          <span style={{ fontSize: '9px', color: '#6B7280', fontFamily: 'var(--font-geist-mono)' }}>
            {progressPct}%
          </span>
        </div>
        <div style={{ height: '3px', background: '#F0EDF8', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background: progressPct === 100
                ? 'linear-gradient(90deg, #16A34A, #22C55E)'
                : 'linear-gradient(90deg, #6B3FA0, #059669)',
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
        <span style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'var(--font-geist-mono)' }}>
          28s · No coordinator contact
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
          ✓ Covered
        </span>
      </div>
    </div>
  )
}
