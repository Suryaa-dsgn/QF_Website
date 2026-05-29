'use client'

import { type Phase } from './types'

// ── AGENT DATA ────────────────────────────────────────────────────────────────

const AGENTS = [
  {
    suite: 'WORKFORCE',
    color: '#6B3FA0',
    name: 'Call-Off Mgmt',
    activeText: 'Monitoring',
    doneText: '✓ Shift filled',
    time: '2m ago',
    activatePhase: null as Phase | null,
  },
  {
    suite: 'COMPLIANCE',
    color: '#0891B2',
    name: 'Claims Compliance',
    activeText: '↻ Reviewing claim',
    doneText: '✓ Modifier fixed',
    time: 'now',
    activatePhase: 'compliance' as Phase,
  },
  {
    suite: 'FINANCIAL',
    color: '#059669',
    name: 'RCM Agent',
    activeText: '↻ Reworking claim',
    doneText: '✓ Resubmitted',
    time: 'now',
    activatePhase: 'rcm' as Phase,
  },
  {
    suite: 'COMPLIANCE',
    color: '#0891B2',
    name: 'Provider Cred.',
    activeText: 'Monitoring',
    doneText: '✓ Renewal queued',
    time: '5m ago',
    activatePhase: null as Phase | null,
  },
] as const

type AgentRowState = 'done' | 'active' | 'pending'

const ORDER: Phase[] = ['idle', 'claim-in', 'compliance', 'rcm', 'resolved', 'resetting']

function getRowState(phase: Phase, activatePhase: Phase | null): AgentRowState {
  if (phase === 'resetting' || phase === 'idle') {
    return activatePhase === null ? 'done' : 'pending'
  }
  if (activatePhase === null) return 'done'
  const phaseIdx = ORDER.indexOf(phase)
  const activateIdx = ORDER.indexOf(activatePhase)
  if (phaseIdx < activateIdx)  return 'pending'
  if (phaseIdx === activateIdx) return 'active'
  return 'done'
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function OperationsPanel({ phase }: { phase: Phase }) {
  return (
    <div
      style={{
        width: '320px',
        background: '#FFFFFF',
        borderRadius: '16px',
        boxShadow:
          '0 4px 20px rgba(107,63,160,0.08), 0 1px 6px rgba(0,0,0,0.04)',
        border: '1px solid rgba(107,63,160,0.08)',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          height: '38px',
          background: '#FAFAF9',
          borderBottom: '1px solid #F0EDF8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#6B3FA0',
            }}
          />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#0A0A0A' }}>
            Operations
          </span>
          <span
            style={{
              fontSize: '9px',
              color: '#9CA3AF',
              fontFamily: 'var(--font-geist-mono)',
            }}
          >
            4 active
          </span>
        </div>

        {/* Live pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            background: '#F0FDF4',
            borderRadius: '20px',
            border: '1px solid #BBF7D0',
          }}
        >
          <div
            className="animate-pulse"
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#22C55E',
            }}
          />
          <span
            style={{ fontSize: '10px', fontWeight: 600, color: '#16A34A' }}
          >
            Live
          </span>
        </div>
      </div>

      {/* Agent rows */}
      <div style={{ padding: '6px 0' }}>
        {AGENTS.map((agent, i) => {
          const state = getRowState(phase, agent.activatePhase)
          const dotColor =
            state === 'active'
              ? agent.color
              : state === 'done'
              ? '#22C55E'
              : '#CBD5E1'
          const statusText =
            state === 'active'
              ? agent.activeText
              : state === 'done'
              ? agent.doneText
              : 'Monitoring...'
          const timeText = state === 'active' ? 'now' : agent.time

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '9px 14px',
                background: state === 'active' ? `${agent.color}08` : 'transparent',
                transition: 'background 500ms ease',
              }}
            >
              {/* Icon square */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  flexShrink: 0,
                  background: `${agent.color}12`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: agent.color,
                  }}
                />
              </div>

              {/* Name + status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                    margin: '0 0 2px',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {agent.name}
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    margin: 0,
                    color: state === 'active' ? '#374151' : '#9CA3AF',
                    fontFamily: 'var(--font-geist-mono)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'color 400ms ease',
                  }}
                >
                  {statusText}
                </p>
              </div>

              {/* Status indicator */}
              <div
                style={{
                  flexShrink: 0,
                  marginLeft: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '3px',
                }}
              >
                <div
                  className={state === 'active' ? 'animate-pulse' : ''}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: dotColor,
                    transition: 'background 400ms ease',
                  }}
                />
                <span
                  style={{
                    fontSize: '9px',
                    color: '#C4C9D4',
                    fontFamily: 'var(--font-geist-mono)',
                  }}
                >
                  {timeText}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid #F0EDF8',
          padding: '7px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FAFAF9',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            color: '#C4C9D4',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          6 tasks/min ↑
        </span>
        <span
          style={{
            fontSize: '10px',
            color: '#C4C9D4',
            fontFamily: 'var(--font-geist-mono)',
          }}
        >
          ↑ 284 events
        </span>
      </div>
    </div>
  )
}
