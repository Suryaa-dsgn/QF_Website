'use client'

import { useEffect, useRef, useState } from 'react'

// ── AGENT DATA ────────────────────────────────────────────────────────────────

const AGENTS = [
  {
    id: 1,
    name: 'Call-Off Management',
    suite: 'WORKFORCE',
    color: '#6B3FA0',
    idle:     { status: 'Monitoring shift schedule',              metric: '8 shifts monitored' },
    running:  { status: 'Shift gap detected — finding replacement', metric: '3 candidates ranked' },
    resolved: { status: '✓ Shift covered in 28 seconds',          metric: '100% fill rate' },
  },
  {
    id: 2,
    name: 'AP / AR Matching',
    suite: 'FINANCIAL',
    color: '#059669',
    idle:     { status: 'Scanning invoice queue',          metric: '47 invoices pending' },
    running:  { status: 'Matching 14 invoices to POs',     metric: '$28,400 in process' },
    resolved: { status: '✓ 14 matched · 3 exceptions flagged', metric: '3 exceptions queued' },
  },
  {
    id: 3,
    name: 'Provider Credentialing',
    suite: 'COMPLIANCE',
    color: '#0891B2',
    idle:     { status: 'Monitoring 200 providers',            metric: 'All credentials valid' },
    running:  { status: 'Flag: Dr. Patel — 11 days to expiry', metric: '1 action required'   },
    resolved: { status: '✓ Renewal queued',                    metric: 'Audit log updated'    },
  },
  {
    id: 4,
    name: 'Revenue Cycle Mgmt',
    suite: 'FINANCIAL',
    color: '#059669',
    idle:     { status: 'Reviewing claims queue',       metric: '12 claims tracked'     },
    running:  { status: 'Claim 4892 denied — reworking', metric: '$760 at risk'          },
    resolved: { status: '✓ Resubmitted',                metric: 'Recovery in progress'  },
  },
] as const

type Phase = 'idle' | 'running' | 'resolved'

const FEED_EVENTS = [
  { color: '#6B3FA0', text: 'Shift 06:00–14:00 covered',  time: '28s ago' },
  { color: '#059669', text: '14 invoices reconciled',      time: '1m ago'  },
  { color: '#0891B2', text: 'Dr. Patel renewal queued',    time: '2m ago'  },
  { color: '#059669', text: 'Claim 4892 resubmitted',      time: '4m ago'  },
  { color: '#6B3FA0', text: 'Capacity gap resolved',       time: '6m ago'  },
]

// ── EVENT FLOW STRIP DATA ─────────────────────────────────────────────────────

const FLOW_DOTS = [
  { color: '#6B3FA0', delay: '0s',   duration: '3.2s' },
  { color: '#059669', delay: '1.0s', duration: '2.9s' },
  { color: '#0891B2', delay: '2.1s', duration: '3.5s' },
  { color: '#6B3FA0', delay: '3.2s', duration: '3.0s' },
  { color: '#059669', delay: '4.3s', duration: '2.7s' },
  { color: '#0891B2', delay: '5.4s', duration: '3.3s' },
]

// ── ANIMATION HELPERS ─────────────────────────────────────────────────────────

const CYCLE   = 9000            // ms per full card cycle
const OFFSETS = [0, 2500, 5000, 7000] as const

function getPhase(elapsed: number, offset: number): Phase {
  const t = ((elapsed - offset) % CYCLE + CYCLE) % CYCLE
  if (t < 2500) return 'idle'
  if (t < 6500) return 'running'
  return 'resolved'
}

// ── EVENT FLOW STRIP ──────────────────────────────────────────────────────────

function EventFlowStrip({ elapsed }: { elapsed: number }) {
  const count = 284 + Math.floor(elapsed / 1800)
  return (
    <div style={{
      padding: '0 18px',
      height: '40px',
      background: '#F8F6FF',
      borderBottom: '1px solid #F0EDF8',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* Left label */}
      <span style={{
        fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
        color: '#C4B5D9', fontFamily: 'var(--font-geist-mono)',
        textTransform: 'uppercase', flexShrink: 0,
      }}>
        Event Stream
      </span>

      {/* Track + traveling dots */}
      <div style={{ flex: 1, position: 'relative', height: '1px', background: '#E5E0F5', overflow: 'visible' }}>
        {FLOW_DOTS.map((dot, i) => (
          <div
            key={i}
            className="flow-dot"
            style={{
              background: dot.color,
              animationDuration: dot.duration,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      {/* Right: processed counter */}
      <span style={{
        fontSize: '10px', color: '#9CA3AF',
        fontFamily: 'var(--font-geist-mono)', flexShrink: 0,
      }}>
        ↑ {count}
      </span>
    </div>
  )
}

// ── AGENT CARD ────────────────────────────────────────────────────────────────

function AgentCard({ agent, phase }: { agent: typeof AGENTS[number]; phase: Phase }) {
  const isRunning  = phase === 'running'
  const isResolved = phase === 'resolved'

  const borderColor = isRunning
    ? agent.color + '44'
    : isResolved
    ? agent.color + '28'
    : '#F0EDF8'

  const dotColor = isResolved ? '#22C55E' : isRunning ? agent.color : '#CBD5E1'
  const statusColor = isResolved ? '#16A34A' : isRunning ? '#111827' : '#9CA3AF'

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: `1px solid ${borderColor}`,
        borderRadius: '14px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        transition: 'border-color 500ms ease',
        minHeight: '108px',
      }}
    >
      {/* Suite chip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: agent.color, flexShrink: 0,
        }} />
        <span style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
          color: agent.color, fontFamily: 'var(--font-geist-mono)',
          textTransform: 'uppercase',
        }}>
          {agent.suite}
        </span>
      </div>

      {/* Agent name */}
      <p style={{
        fontSize: '12px', fontWeight: 600, color: '#0A0A0A',
        fontFamily: 'var(--font-geist-sans)', lineHeight: 1.2, margin: 0,
      }}>
        {agent.name}
      </p>

      {/* Status row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
        <div
          className={isRunning ? 'animate-pulse' : ''}
          style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: dotColor, flexShrink: 0, marginTop: '2px',
            transition: 'background 400ms ease',
          }}
        />
        <span style={{
          fontSize: '11px', color: statusColor,
          fontFamily: 'var(--font-geist-sans)', lineHeight: 1.4,
          transition: 'color 300ms ease',
        }}>
          {agent[phase].status}
        </span>
      </div>

      {/* Metric */}
      <p style={{
        fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-geist-mono)',
        marginTop: 'auto', margin: 0,
      }}>
        {agent[phase].metric}
      </p>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function HeroAgentPanel() {
  const startRef  = useRef<number>(Date.now())
  const [elapsed, setElapsed]     = useState(0)
  const [feedHead, setFeedHead]   = useState(0)
  const [feedVisible, setFeedVisible] = useState(true)

  // Tick every 400ms to drive card phase transitions
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 400)
    return () => clearInterval(id)
  }, [])

  // Rotate feed every 3.5s with a quick fade
  useEffect(() => {
    const id = setInterval(() => {
      setFeedVisible(false)
      setTimeout(() => {
        setFeedHead(h => (h + 1) % FEED_EVENTS.length)
        setFeedVisible(true)
      }, 250)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const phases = (AGENTS as readonly (typeof AGENTS[number])[]).map((_, i) =>
    getPhase(elapsed, OFFSETS[i])
  )

  const visibleFeed = [0, 1, 2].map(i =>
    FEED_EVENTS[(feedHead + i) % FEED_EVENTS.length]
  )

  return (
    <div
      style={{
        width: '680px',
        borderRadius: '16px 16px 0 0',
        boxShadow: '0 32px 80px rgba(107,63,160,0.20), 0 8px 24px rgba(0,0,0,0.10)',
        overflow: 'hidden',
        border: '1px solid rgba(107,63,160,0.10)',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {/* ── Browser Chrome ── */}
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red" />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green" />
        </div>
        <div className="browser-url">app.quickflows.ai / operations</div>
      </div>

      {/* ── Panel Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 18px',
        background: '#FAFAF9',
        borderBottom: '1px solid #F0EDF8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '22px', height: '22px', background: '#0D9488',
            borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-geist-mono)' }}>
              Q
            </span>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A' }}>Operations</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'var(--font-geist-mono)' }}>
            6 tasks/min ↑
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 10px', background: '#F0FDF4',
            borderRadius: '20px', border: '1px solid #BBF7D0',
          }}>
            <div
              className="animate-pulse"
              style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }}
            />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#16A34A' }}>Live</span>
          </div>
        </div>
      </div>

      {/* ── Event Flow Strip ── */}
      <EventFlowStrip elapsed={elapsed} />

      {/* ── Active Agents ── */}
      <div style={{ background: '#FFFFFF', padding: '16px 18px 14px' }}>
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
          color: '#9CA3AF', textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)', marginBottom: '10px',
        }}>
          Active Agents
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} phase={phases[i]} />
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid #F0EDF8', margin: '0 18px' }} />

      {/* ── Recent Activity Feed ── */}
      <div style={{ padding: '12px 18px 18px', background: '#FAFAF9' }}>
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
          color: '#9CA3AF', textTransform: 'uppercase',
          fontFamily: 'var(--font-geist-mono)', marginBottom: '8px',
        }}>
          Recent Activity
        </p>

        <div
          style={{
            display: 'flex', flexDirection: 'column', gap: '7px',
            opacity: feedVisible ? 1 : 0,
            transition: 'opacity 250ms ease',
          }}
        >
          {visibleFeed.map((event, i) => (
            <div key={`${feedHead}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: event.color, flexShrink: 0,
              }} />
              <span style={{
                fontSize: '11px', color: '#374151',
                fontFamily: 'var(--font-geist-sans)', flex: 1,
              }}>
                ✓ {event.text}
              </span>
              <span style={{
                fontSize: '10px', color: '#9CA3AF',
                fontFamily: 'var(--font-geist-mono)', flexShrink: 0,
              }}>
                {event.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
