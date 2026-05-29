'use client'

import { useEffect, useRef, useState } from 'react'

// ── PHASE STATE MACHINE ───────────────────────────────────────────────────────

type Phase = 'idle' | 'claim-in' | 'compliance' | 'rcm' | 'resolved' | 'resetting'

const TOTAL = 17000 // 17s loop

function getPhase(t: number): Phase {
  if (t < 1500)  return 'idle'
  if (t < 4500)  return 'claim-in'
  if (t < 8000)  return 'compliance'
  if (t < 11500) return 'rcm'
  if (t < 16000) return 'resolved'
  return 'resetting'
}

// Active node index per phase (-1 = none)
const PHASE_NODE: Record<Phase, number> = {
  'idle': -1, 'claim-in': 0, 'compliance': 1, 'rcm': 2, 'resolved': 3, 'resetting': -1,
}

type NodeState = 'active' | 'past' | 'future' | 'reset'

function getNodeState(phase: Phase, idx: number): NodeState {
  if (phase === 'resetting') return 'reset'
  if (phase === 'idle') return 'future'
  const active = PHASE_NODE[phase]
  if (idx === active) return 'active'
  if (idx < active)   return 'past'
  return 'future'
}

function nodeOpacity(state: NodeState): number {
  if (state === 'active') return 1
  if (state === 'past')   return 0.75
  if (state === 'future') return 0.25
  return 0
}

// ── GEOMETRY ──────────────────────────────────────────────────────────────────

// All nodes sit at cy=128 in the 680×256 SVG canvas
const NODES = [
  { cx: 88,  label: 'Claim 4892',         sub1: 'CPT 99213 · $760' },
  { cx: 284, label: 'Claims Compliance',   sub1: 'Awaiting claim...' },
  { cx: 480, label: 'Revenue Cycle',       sub1: 'Standby...' },
  { cx: 620, label: 'Recovered',           sub1: '$760 Pending' },
]
const CY = 128

// SVG bezier paths between consecutive nodes (arcs gently upward)
const PATHS = [
  'M 120 128 C 150 110, 222 110, 252 128', // N1→N2
  'M 316 128 C 346 110, 418 110, 448 128', // N2→N3
  'M 512 128 C 535 110, 565 110, 588 128', // N3→N4
]

// Particle configs per path
const PARTICLES = [
  { color: '#0891B2', dur: '1.8s', phases: ['claim-in', 'compliance'] as Phase[] },
  { color: '#059669', dur: '1.6s', phases: ['rcm']                    as Phase[] },
  { color: '#22C55E', dur: '1.4s', phases: ['resolved']               as Phase[] },
]

// Active glow overlay per path — colored solid line when particle is traveling
const PATH_GLOW_COLORS = ['#0891B2', '#059669', '#22C55E']

// ── ACTIVITY LOG ──────────────────────────────────────────────────────────────

const LOG_LINES = [
  { dot: '#94A3B8', text: 'Claim 4892 received — CPT 99213 · $760',      ts: '0:00', trigger: 'claim-in'   as Phase },
  { dot: '#0891B2', text: 'Claims Compliance: modifier conflict on 99213', ts: '0:03', trigger: 'compliance' as Phase },
  { dot: '#059669', text: 'RCM Agent reworking — correcting modifier',     ts: '0:08', trigger: 'rcm'        as Phase },
  { dot: '#22C55E', text: '✓ Claim resubmitted · $760 recovered',          ts: '0:11', trigger: 'resolved'   as Phase },
]

const PHASE_ORDER: Phase[] = ['idle', 'claim-in', 'compliance', 'rcm', 'resolved', 'resetting']

function isLineVisible(phase: Phase, triggerPhase: Phase): boolean {
  if (phase === 'resetting') return false
  return PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(triggerPhase)
}

// ── ICONS (inline SVG, 20×20) ─────────────────────────────────────────────────

function DocumentIcon({ color = '#94A3B8' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="3" width="12" height="14" rx="2" stroke={color} strokeWidth="1.5" />
      <line x1="7" y1="7"  x2="13" y2="7"  stroke={color} strokeWidth="1.3" />
      <line x1="7" y1="10" x2="13" y2="10" stroke={color} strokeWidth="1.3" />
      <line x1="7" y1="13" x2="11" y2="13" stroke={color} strokeWidth="1.3" />
    </svg>
  )
}

function ShieldIcon({ color = '#0891B2' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2 L17 5.5 L17 10 C17 14 13.5 17 10 18 C6.5 17 3 14 3 10 L3 5.5 Z"
        stroke={color} strokeWidth="1.5" fill={color + '1A'} />
      <line x1="10" y1="8" x2="10" y2="11.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="13.5" r="0.85" fill={color} />
    </svg>
  )
}

function RefreshIcon({ color = '#059669' }: { color?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10 A6 6 0 1 1 8 15.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <polyline points="5,13 8,15.5 5.5,18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" fill="none" />
      <polyline points="6.5,10 9,12.5 13.5,7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIconGray() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
      <polyline points="6.5,10 9,12.5 13.5,7.5" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── NODE CIRCLE STYLES ────────────────────────────────────────────────────────

function getNodeCircleStyle(idx: number, state: NodeState): React.CSSProperties {
  const base: React.CSSProperties = {
    width: '64px', height: '64px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'opacity 600ms ease, box-shadow 600ms ease, background 600ms ease, border-color 600ms ease',
    border: '1px solid transparent',
    position: 'relative',
  }

  if (state === 'reset') return { ...base, background: '#F8FAFC', opacity: 0 }

  if (idx === 0) {
    return {
      ...base,
      background: state === 'active' ? '#F1F5F9' : '#F8FAFC',
      border: `1px solid ${state === 'active' ? '#CBD5E1' : '#E2E8F0'}`,
      boxShadow: state === 'active' ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
    }
  }
  if (idx === 1) {
    return {
      ...base,
      background: state === 'active' ? '#ECFEFF' : state === 'past' ? '#F0FAFE' : '#F8FFFE',
      border: `1px solid ${state === 'active' ? '#67E8F9' : state === 'past' ? '#A5F3FC' : '#E0F7FA'}`,
      boxShadow: state === 'active' ? '0 0 0 3px rgba(8,145,178,0.20), 0 4px 16px rgba(8,145,178,0.16)' : 'none',
    }
  }
  if (idx === 2) {
    return {
      ...base,
      background: state === 'active' ? '#F0FDF4' : state === 'past' ? '#F4FDF7' : '#FAFFFE',
      border: `1px solid ${state === 'active' ? '#86EFAC' : state === 'past' ? '#A7F3D0' : '#E0FAF0'}`,
      boxShadow: state === 'active' ? '0 0 0 3px rgba(5,150,105,0.20), 0 4px 16px rgba(5,150,105,0.16)' : 'none',
    }
  }
  // idx === 3 (Recovered)
  if (state === 'active') {
    return {
      ...base,
      background: 'linear-gradient(135deg, #22C55E 0%, #059669 100%)',
      border: '1px solid #16A34A',
      boxShadow: '0 0 0 6px rgba(34,197,94,0.22), 0 8px 24px rgba(34,197,94,0.25)',
    }
  }
  return {
    ...base,
    background: state === 'past' ? '#F0FDF4' : '#F8FAFC',
    border: `1px solid ${state === 'past' ? '#BBF7D0' : '#E2E8F0'}`,
  }
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function HeroClaimsPipeline() {
  const startRef = useRef<number>(Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 200)
    return () => clearInterval(id)
  }, [])

  const t = elapsed % TOTAL
  const phase = getPhase(t)
  const nodeStates = [0, 1, 2, 3].map(i => getNodeState(phase, i))
  const allFade = phase === 'resetting'
  const tr = 'opacity 600ms ease'

  // Dynamic subtext per node per phase
  const nodeSubtexts = [
    // N1 — static
    'CPT 99213 · $760',
    // N2 — compliance
    phase === 'compliance' ? '⚠ Modifier conflict' : phase === 'rcm' || phase === 'resolved' ? '✓ Conflict flagged' : 'Awaiting claim...',
    // N3 — rcm
    phase === 'rcm' ? 'Reworking claim...' : phase === 'resolved' ? '✓ Rework complete' : 'Standby...',
    // N4
    phase === 'resolved' ? '$760 Recovered' : '$760 Pending',
  ]

  return (
    <div
      style={{
        width: '680px',
        borderRadius: '20px',
        boxShadow: '0 32px 80px rgba(107,63,160,0.20), 0 8px 24px rgba(0,0,0,0.10)',
        overflow: 'hidden',
        border: '1px solid rgba(107,63,160,0.10)',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >

      {/* ══ Header ══ */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: '44px',
        background: 'rgba(255,255,255,0.94)',
        borderBottom: '1px solid #F0EDF8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#059669' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>
            Claims Pipeline
          </span>
          <span style={{
            fontSize: '9px', fontWeight: 700, color: '#059669', letterSpacing: '0.09em',
            fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase',
            background: 'rgba(5,150,105,0.08)', padding: '2px 7px', borderRadius: '20px',
          }}>
            Financial
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 10px', background: '#F0FDF4',
          borderRadius: '20px', border: '1px solid #BBF7D0',
        }}>
          <div className="animate-pulse"
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#16A34A' }}>Live</span>
        </div>
      </div>

      {/* ══ Pipeline Canvas ══ */}
      <div
        style={{
          position: 'relative',
          height: '256px',
          backgroundImage: 'radial-gradient(circle, rgba(107,63,160,0.055) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          backgroundColor: '#FAFAF9',
          opacity: allFade ? 0 : 1,
          transition: tr,
        }}
      >
        {/* SVG — static dashed lines + glow overlays + particles */}
        <svg
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          width="680" height="256" viewBox="0 0 680 256"
        >
          {/* Static dashed guide lines */}
          {PATHS.map((d, i) => (
            <path
              key={`dash-${i}`}
              d={d}
              stroke="#E2D9F3"
              strokeWidth="1.5"
              strokeDasharray="5 8"
              fill="none"
            />
          ))}

          {/* Active glow overlays */}
          {PATHS.map((d, i) => {
            const vis = PARTICLES[i].phases.includes(phase)
            return (
              <path
                key={`glow-${i}`}
                d={d}
                stroke={PATH_GLOW_COLORS[i]}
                strokeWidth="2"
                fill="none"
                style={{
                  opacity: vis ? 0.30 : 0,
                  transition: 'opacity 600ms ease',
                }}
              />
            )
          })}

          {/* Animated particles */}
          {PARTICLES.map((p, i) => {
            const vis = p.phases.includes(phase)
            return (
              <g key={`particle-${i}`} style={{ opacity: vis ? 1 : 0, transition: 'opacity 500ms ease' }}>
                {/* Main dot */}
                <circle r="4" fill={p.color} fillOpacity="0.90">
                  <animateMotion
                    path={PATHS[i]}
                    dur={p.dur}
                    begin="0s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                </circle>
                {/* Trailing glow */}
                <circle r="2.5" fill={p.color} fillOpacity="0.35">
                  <animateMotion
                    path={PATHS[i]}
                    dur={p.dur}
                    begin="0.15s"
                    repeatCount="indefinite"
                    calcMode="linear"
                  />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* ── Node circles (absolutely positioned over SVG) ── */}
        {NODES.map((node, i) => {
          const state = nodeStates[i]
          const circleLeft = node.cx - 32
          const circleTop  = CY - 32
          const labelLeft  = node.cx - 60
          const labelTop   = CY + 36

          return (
            <div key={i} style={{ position: 'absolute', zIndex: 1 }}>
              {/* Circle */}
              <div
                style={{
                  position: 'absolute',
                  left: `${circleLeft}px`,
                  top: `${circleTop}px`,
                  opacity: nodeOpacity(state),
                  transition: 'opacity 600ms ease',
                  ...getNodeCircleStyle(i, state),
                }}
              >
                {i === 0 && <DocumentIcon color={state === 'active' ? '#64748B' : '#CBD5E1'} />}
                {i === 1 && <ShieldIcon   color={state === 'future' ? '#BAE6FD' : '#0891B2'} />}
                {i === 2 && <RefreshIcon  color={state === 'future' ? '#A7F3D0' : '#059669'} />}
                {i === 3 && state === 'active' ? <CheckIcon /> : i === 3 ? <CheckIconGray /> : null}

                {/* Pulsing dot for active agent nodes */}
                {(i === 1 || i === 2) && state === 'active' && (
                  <div
                    className="animate-pulse"
                    style={{
                      position: 'absolute',
                      top: '6px', right: '6px',
                      width: '8px', height: '8px',
                      borderRadius: '50%',
                      background: i === 1 ? '#0891B2' : '#059669',
                    }}
                  />
                )}
              </div>

              {/* Name label */}
              <div
                style={{
                  position: 'absolute',
                  left: `${labelLeft}px`,
                  top: `${labelTop}px`,
                  width: '120px',
                  textAlign: 'center',
                  opacity: nodeOpacity(state),
                  transition: 'opacity 600ms ease',
                }}
              >
                <p style={{
                  fontSize: '11px', fontWeight: 600, color: '#0A0A0A',
                  margin: '0 0 3px', lineHeight: 1.2,
                  fontFamily: 'var(--font-geist-sans)',
                }}>
                  {node.label}
                </p>
                <p style={{
                  fontSize: '10px',
                  color: i === 1 && state === 'active' ? '#0E7490'
                       : i === 1 && state === 'past'   ? '#16A34A'
                       : i === 2 && state === 'active' ? '#047857'
                       : i === 2 && state === 'past'   ? '#16A34A'
                       : i === 3 && state === 'active' ? '#16A34A'
                       : '#9CA3AF',
                  margin: 0, lineHeight: 1.3,
                  fontFamily: 'var(--font-geist-mono)',
                  transition: 'color 400ms ease',
                }}>
                  {nodeSubtexts[i]}
                </p>
              </div>
            </div>
          )
        })}

        {/* ── Floating badges ── */}

        {/* N2: conflict badge */}
        <div style={{
          position: 'absolute',
          left: `${284 - 44}px`,
          top: `${CY - 32 - 26}px`,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: phase === 'compliance' ? 1 : 0,
          transform: phase === 'compliance' ? 'translateY(0px)' : 'translateY(4px)',
          transition: 'opacity 400ms ease, transform 400ms ease',
          background: '#FEF3C7',
          border: '1px solid #FDE68A',
          borderRadius: '12px',
          padding: '3px 9px',
          fontSize: '9px', fontWeight: 700, color: '#92400E',
          fontFamily: 'var(--font-geist-mono)',
          whiteSpace: 'nowrap',
        }}>
          ⚠ Modifier conflict
        </div>

        {/* N4: recovered badge */}
        <div style={{
          position: 'absolute',
          left: `${620 - 52}px`,
          top: `${CY - 32 - 26}px`,
          zIndex: 3,
          pointerEvents: 'none',
          opacity: phase === 'resolved' ? 1 : 0,
          transform: phase === 'resolved' ? 'translateY(0px)' : 'translateY(4px)',
          transition: 'opacity 500ms ease, transform 500ms ease',
          background: '#DCFCE7',
          border: '1px solid #BBF7D0',
          borderRadius: '12px',
          padding: '3px 9px',
          fontSize: '9px', fontWeight: 700, color: '#15803D',
          fontFamily: 'var(--font-geist-mono)',
          whiteSpace: 'nowrap',
        }}>
          $760 recovered
        </div>

      </div>

      {/* ══ Activity Strip ══ */}
      <div style={{
        height: '128px',
        background: '#F8F6FF',
        borderTop: '1px solid #EDE9FB',
        padding: '12px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        opacity: allFade ? 0 : 1,
        transition: tr,
        overflow: 'hidden',
      }}>
        <p style={{
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
          color: '#C4B5D9', fontFamily: 'var(--font-geist-mono)',
          textTransform: 'uppercase', marginBottom: '4px',
        }}>
          Claim Activity
        </p>

        {LOG_LINES.map((line, i) => {
          const visible = isLineVisible(phase, line.trigger)
          return (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0px)' : 'translateY(6px)',
                transition: `opacity 400ms ease ${i * 60}ms, transform 400ms ease ${i * 60}ms`,
              }}
            >
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: line.dot, flexShrink: 0,
              }} />
              <span style={{
                fontSize: '11px', color: '#374151',
                fontFamily: 'var(--font-geist-sans)', flex: 1, lineHeight: 1.4,
              }}>
                {line.text}
              </span>
              <span style={{
                fontSize: '10px', color: '#9CA3AF',
                fontFamily: 'var(--font-geist-mono)', flexShrink: 0,
              }}>
                {line.ts}
              </span>
            </div>
          )
        })}
      </div>

    </div>
  )
}
