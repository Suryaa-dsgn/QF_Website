'use client'

import { useEffect, useRef, useState } from 'react'

// ── DATA ──────────────────────────────────────────────────────────────────────

const AGENTS = [
  { suite: 'WORKFORCE',  name: 'Call-Off Mgmt',   color: '#6B3FA0', left: 36,  top: 48  },
  { suite: 'FINANCIAL',  name: 'AP/AR Matching',  color: '#059669', left: 496, top: 48  },
  { suite: 'COMPLIANCE', name: 'Provider Cred.',  color: '#0891B2', left: 36,  top: 286 },
  { suite: 'FINANCIAL',  name: 'Revenue Cycle',   color: '#059669', left: 496, top: 286 },
] as const

const CHIP_TEXTS = [
  '✓ Shift covered · 28s',
  '✓ 14 invoices matched',
  '✓ Dr. Patel flagged',
  '✓ Claim resubmitted',
]

// Phase cycling (same pattern across the codebase)
const CYCLE   = 9000
const OFFSETS = [0, 2500, 5000, 7000] as const
type Phase = 'idle' | 'running' | 'resolved'

function getPhase(elapsed: number, offset: number): Phase {
  const t = ((elapsed - offset) % CYCLE + CYCLE) % CYCLE
  if (t < 2500) return 'idle'
  if (t < 6500) return 'running'
  return 'resolved'
}

// SVG quadratic bezier paths: node edge → hub edge
// Canvas 680×416, hub center (340, 208), nodes 148px wide × ~82px tall
const SVG_PATHS = [
  'M 184 89 Q 248 150 315 183',   // Node 0 (top-left) → Hub
  'M 496 89 Q 432 150 365 183',   // Node 1 (top-right) → Hub
  'M 184 327 Q 248 280 315 233',  // Node 2 (bottom-left) → Hub
  'M 496 327 Q 432 280 365 233',  // Node 3 (bottom-right) → Hub
]

const PATH_COLORS = [
  'rgba(107,63,160,0.16)',
  'rgba(5,150,105,0.16)',
  'rgba(8,145,178,0.16)',
  'rgba(5,150,105,0.16)',
]

// Particle animation config per path
const PARTICLES = [
  { inColor: '#6B3FA0', inDur: '2.4s', inBegin: '0s',   outDur: '3.0s', outBegin: '1.2s' },
  { inColor: '#059669', inDur: '2.8s', inBegin: '0.7s', outDur: '2.5s', outBegin: '2.0s' },
  { inColor: '#0891B2', inDur: '3.1s', inBegin: '1.4s', outDur: '2.7s', outBegin: '0.3s' },
  { inColor: '#059669', inDur: '2.6s', inBegin: '2.1s', outDur: '3.2s', outBegin: '1.8s' },
]

// ── AGENT NODE ────────────────────────────────────────────────────────────────

function AgentNode({
  agent,
  phase,
  chipVisible,
  chipText,
}: {
  agent: typeof AGENTS[number]
  phase: Phase
  chipVisible: boolean
  chipText: string
}) {
  const isRunning  = phase === 'running'
  const isResolved = phase === 'resolved'
  const dotColor   = isResolved ? '#22C55E' : isRunning ? agent.color : '#CBD5E1'
  const statusText = isResolved ? '✓ Resolved' : isRunning ? 'Processing...' : 'Monitoring'
  const statusColor = isResolved ? '#16A34A' : isRunning ? '#374151' : '#9CA3AF'

  return (
    <div
      style={{
        position: 'absolute',
        left: `${agent.left}px`,
        top:  `${agent.top}px`,
        width: '148px',
        zIndex: 1,
      }}
    >
      {/* Floating activity chip */}
      <div
        style={{
          position: 'absolute',
          top: '-28px',
          left: '50%',
          transform: chipVisible
            ? 'translateX(-50%) translateY(0px)'
            : 'translateX(-50%) translateY(5px)',
          opacity: chipVisible ? 1 : 0,
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          background: agent.color + '14',
          border: `1px solid ${agent.color}30`,
          borderRadius: '20px',
          padding: '3px 9px',
          fontSize: '9px',
          fontWeight: 600,
          color: agent.color,
          fontFamily: 'var(--font-geist-mono)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {chipText}
      </div>

      {/* Node card */}
      <div
        style={{
          background: '#FFFFFF',
          border: `1px solid ${isRunning ? agent.color + '35' : agent.color + '1A'}`,
          borderRadius: '14px',
          padding: '12px 13px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          boxShadow: '0 2px 10px rgba(107,63,160,0.07)',
          transition: 'border-color 500ms ease',
        }}
      >
        {/* Suite chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: agent.color, flexShrink: 0,
          }} />
          <span style={{
            fontSize: '8px', fontWeight: 700, letterSpacing: '0.10em',
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

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div
            className={isRunning ? 'animate-pulse' : ''}
            style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: dotColor, flexShrink: 0,
              transition: 'background 400ms ease',
            }}
          />
          <span style={{
            fontSize: '9px', color: statusColor,
            fontFamily: 'var(--font-geist-sans)',
            transition: 'color 300ms ease',
          }}>
            {statusText}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function HeroAgentFlow() {
  const startRef = useRef<number>(Date.now())
  const [elapsed, setElapsed]         = useState(0)
  const [chipIdx, setChipIdx]         = useState(0)
  const [chipVisible, setChipVisible] = useState(false)

  // Phase ticker
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 400)
    return () => clearInterval(id)
  }, [])

  // Activity chip cycler — shows each node's chip for 1.8s, then moves to next
  useEffect(() => {
    const id = setInterval(() => {
      setChipVisible(true)
      setTimeout(() => {
        setChipVisible(false)
        setTimeout(() => setChipIdx(i => (i + 1) % 4), 400)
      }, 1800)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const phases = (AGENTS as readonly (typeof AGENTS[number])[]).map((_, i) =>
    getPhase(elapsed, OFFSETS[i])
  )

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
      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: '44px',
        background: 'rgba(255,255,255,0.92)',
        borderBottom: '1px solid #F0EDF8',
      }}>
        {/* Logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5"
              fill="#0D9488" fillOpacity="0.12" />
            <polygon points="10,3 16,6.5 16,13.5 10,17 4,13.5 4,6.5"
              fill="none" stroke="#0D9488" strokeWidth="1.2" />
            <text x="10" y="13.5" textAnchor="middle" fontSize="7"
              fontWeight="700" fill="#0D9488" fontFamily="monospace">Q</text>
          </svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>
            Quickflows AI Platform
          </span>
        </div>

        {/* Live pill */}
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

      {/* ── Agent Flow Canvas ── */}
      <div
        style={{
          position: 'relative',
          height: '416px',
          backgroundImage: 'radial-gradient(circle, rgba(107,63,160,0.055) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          backgroundColor: '#FAFAF9',
        }}
      >
        {/* SVG — paths + animated particles (below nodes) */}
        <svg
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          width="680"
          height="416"
          viewBox="0 0 680 416"
        >
          {/* Static dashed guide lines */}
          {SVG_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={PATH_COLORS[i]}
              strokeWidth="1.5"
              strokeDasharray="5 10"
              fill="none"
            />
          ))}

          {/* Animated particles */}
          {PARTICLES.map((p, i) => (
            <g key={i}>
              {/* Inbound: node → hub */}
              <circle r="4" fill={p.inColor} fillOpacity="0.85">
                <animateMotion
                  path={SVG_PATHS[i]}
                  dur={p.inDur}
                  begin={p.inBegin}
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </circle>

              {/* Outbound: hub → node */}
              <circle r="3" fill="#0D9488" fillOpacity="0.60">
                <animateMotion
                  path={SVG_PATHS[i]}
                  dur={p.outDur}
                  begin={p.outBegin}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyPoints="1;0"
                  keyTimes="0;1"
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* 4 Agent Nodes */}
        {AGENTS.map((agent, i) => (
          <AgentNode
            key={i}
            agent={agent}
            phase={phases[i]}
            chipVisible={chipVisible && chipIdx === i}
            chipText={CHIP_TEXTS[i]}
          />
        ))}

        {/* Central Hub */}
        <div
          style={{
            position: 'absolute',
            left: '304px',
            top: '172px',
            width: '72px',
            height: '72px',
            zIndex: 1,
          }}
        >
          {/* Outer pulse ring */}
          <div
            className="animate-pulse"
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              border: '2px solid rgba(13,148,136,0.22)',
              pointerEvents: 'none',
            }}
          />
          {/* Inner hub circle */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
              boxShadow:
                '0 8px 32px rgba(13,148,136,0.40), 0 2px 8px rgba(13,148,136,0.20)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1px',
            }}
          >
            <span style={{
              fontSize: '20px', fontWeight: 700, color: '#FFFFFF',
              lineHeight: 1, fontFamily: 'var(--font-geist-mono)',
            }}>
              Q
            </span>
            <span style={{
              fontSize: '8px', color: 'rgba(255,255,255,0.65)',
              fontFamily: 'var(--font-geist-sans)', letterSpacing: '0.05em',
            }}>
              Platform
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
