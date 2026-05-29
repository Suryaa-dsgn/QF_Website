'use client'

import { useEffect, useRef, useState } from 'react'

// ── PHASE HELPERS ─────────────────────────────────────────────────────────────

type Phase = 'trigger' | 'agent' | 'notify' | 'resolved' | 'resetting'
type SectionState = 'active' | 'past' | 'future' | 'reset'

const TOTAL = 18500   // full loop duration (ms)

function getPhase(t: number): Phase {
  if (t < 3500)  return 'trigger'
  if (t < 8000)  return 'agent'
  if (t < 13000) return 'notify'
  if (t < 17000) return 'resolved'
  return 'resetting'
}

const PHASE_IDX: Record<Phase, number> = {
  trigger: 0, agent: 1, notify: 2, resolved: 3, resetting: -1,
}

function getSectionState(phase: Phase, idx: number): SectionState {
  if (phase === 'resetting') return 'reset'
  const cur = PHASE_IDX[phase]
  if (idx === cur) return 'active'
  if (idx < cur)   return 'past'
  return 'future'
}

function sectionOpacity(state: SectionState): number {
  if (state === 'active')  return 1
  if (state === 'past')    return 0.60
  if (state === 'future')  return 0.25
  return 0
}

// ── REPLACEMENT CANDIDATES ────────────────────────────────────────────────────

const CANDIDATES = [
  { name: 'Maria S.',  status: 'Available', statusColor: '#22C55E', match: '98%', selected: true  },
  { name: 'James K.',  status: 'Scheduled', statusColor: '#F59E0B', match: '91%', selected: false },
  { name: 'Priya T.',  status: 'Available', statusColor: '#22C55E', match: '87%', selected: false },
]

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function HeroCallOffFlow() {
  const startRef = useRef<number>(Date.now())
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 200)
    return () => clearInterval(id)
  }, [])

  const t = elapsed % TOTAL
  const phase = getPhase(t)

  // Which step is each section in?
  const ss = [0, 1, 2, 3].map(i => getSectionState(phase, i))
  const ops = ss.map(sectionOpacity)

  // Candidate cards: visible once we reach agent phase
  const candidatesIn = phase === 'agent' || phase === 'notify' || phase === 'resolved'

  // Agent status text
  const agentStatus = phase === 'notify' || phase === 'resolved'
    ? '✓ Replacement found — notifying'
    : 'Analyzing coverage gap...'

  // Notification reply: appears 4s into notify phase
  const replyVisible = t >= 12000 && phase !== 'resetting'

  // Timer (counts 0 → 28 during notify phase, stays at 28 after)
  const timerCount = t >= 8000 ? Math.min(28, Math.floor((t - 8000) / 180)) : 0

  // Incident status pill
  const covered = phase === 'resolved'

  // Transition helper (same string reused everywhere)
  const tr = 'opacity 600ms ease, background 600ms ease, filter 600ms ease'

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

      {/* ════ Header ════ */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', height: '44px',
        background: 'rgba(255,255,255,0.94)',
        borderBottom: '1px solid #F0EDF8',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6B3FA0' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A' }}>
            Call-Off Management
          </span>
          <span style={{
            fontSize: '9px', fontWeight: 700, color: '#6B3FA0', letterSpacing: '0.09em',
            fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase',
            background: 'rgba(107,63,160,0.08)', padding: '2px 7px', borderRadius: '20px',
          }}>
            Workforce
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

      {/* ════ Section 1 — Trigger ════ */}
      <div style={{
        opacity: ops[0], transition: tr,
        padding: '16px 20px 18px',
        background: ss[0] === 'active' ? '#FFFBF2' : '#FAFAF9',
        borderBottom: '1px solid #F0EDF8',
        minHeight: '88px',
      }}>
        {/* Row 1 — Alert label + timestamp */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              className={ss[0] === 'active' ? 'animate-pulse' : ''}
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#DC2626', flexShrink: 0 }}
            />
            <span style={{
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
              color: '#DC2626', fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase',
            }}>
              Call-Off Alert
            </span>
          </div>
          <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-geist-mono)' }}>
            6:02 AM · Thursday
          </span>
        </div>

        {/* Row 2 — Incident + status pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A0A0A', margin: '0 0 3px', lineHeight: 1.3 }}>
              Amanda W. called out sick
            </p>
            <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>
              Shift 06:00–14:00 · 3 patients unassigned
            </p>
          </div>
          <div style={{
            padding: '4px 11px',
            background: covered ? '#DCFCE7' : '#FEE2E2',
            border: `1px solid ${covered ? '#BBF7D0' : '#FECACA'}`,
            borderRadius: '20px',
            fontSize: '10px', fontWeight: 600,
            color: covered ? '#16A34A' : '#DC2626',
            fontFamily: 'var(--font-geist-mono)',
            transition: 'all 500ms ease',
            flexShrink: 0, marginLeft: '12px',
          }}>
            {covered ? '✓ Covered' : '● Uncovered'}
          </div>
        </div>
      </div>

      {/* ════ Section 2 — Agent ════ */}
      <div style={{
        opacity: ops[1], transition: tr,
        padding: '14px 20px 16px',
        background: '#FFFFFF',
        borderBottom: '1px solid #F0EDF8',
        minHeight: '138px',
      }}>
        {/* Agent header row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              className={ss[1] === 'active' ? 'animate-pulse' : ''}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6B3FA0', flexShrink: 0 }}
            />
            <span style={{
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em',
              color: '#6B3FA0', fontFamily: 'var(--font-geist-mono)', textTransform: 'uppercase',
            }}>
              Call-Off Management
            </span>
          </div>
          <span style={{
            fontSize: '10px',
            color: phase === 'notify' || phase === 'resolved' ? '#16A34A' : '#9CA3AF',
            fontFamily: 'var(--font-geist-mono)',
            transition: 'color 400ms ease',
          }}>
            {agentStatus}
          </span>
        </div>

        {/* Candidate cards */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {CANDIDATES.map((c, i) => {
            const isSelected = c.selected && (phase === 'notify' || phase === 'resolved')
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: '#FAFAF9',
                  border: `1px solid ${isSelected ? 'rgba(107,63,160,0.35)' : '#E8E4F5'}`,
                  borderRadius: '10px',
                  padding: '10px 12px',
                  opacity: candidatesIn ? 1 : 0,
                  transform: candidatesIn ? 'translateY(0px)' : 'translateY(8px)',
                  transition: `opacity 400ms ease ${i * 200}ms, transform 400ms ease ${i * 200}ms, border-color 400ms ease`,
                }}
              >
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#0A0A0A', margin: '0 0 5px', lineHeight: 1.2 }}>
                  {c.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '5px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: c.statusColor }} />
                  <span style={{ fontSize: '10px', color: '#6B7280' }}>{c.status}</span>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 600,
                  color: c.selected ? '#6B3FA0' : '#9CA3AF',
                  fontFamily: 'var(--font-geist-mono)',
                }}>
                  {c.match} match
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ════ Section 3 — Notification ════ */}
      <div style={{
        opacity: ops[2], transition: tr,
        padding: '14px 20px 16px',
        background: ss[2] === 'active' ? '#F8F9FC' : '#FAFAF9',
        borderBottom: '1px solid #F0EDF8',
        minHeight: '112px',
      }}>
        {/* Notification sent row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
          <span style={{ fontSize: '13px', lineHeight: 1, flexShrink: 0 }}>📱</span>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>
            Notification sent →{' '}
            <span style={{ color: '#6B3FA0' }}>Maria S.</span>
          </span>
          <div style={{
            fontSize: '9px', color: '#16A34A', fontFamily: 'var(--font-geist-mono)',
            background: '#DCFCE7', border: '1px solid #BBF7D0',
            borderRadius: '20px', padding: '2px 8px', flexShrink: 0,
          }}>
            ● Delivered 6:02:04 AM
          </div>
        </div>

        {/* Message quote */}
        <p style={{
          fontSize: '11px', color: '#9CA3AF', margin: '0 0 10px',
          fontFamily: 'var(--font-geist-mono)', paddingLeft: '20px',
        }}>
          "Open shift available: 06:00–14:00, Philadelphia"
        </p>

        {/* Reply row — appears after a delay in notify phase */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: '20px',
          opacity: replyVisible ? 1 : 0,
          transform: replyVisible ? 'translateY(0px)' : 'translateY(6px)',
          transition: 'opacity 400ms ease, transform 400ms ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: '#6B7280' }}>Maria replied:</span>
            <span style={{
              fontSize: '10px', fontWeight: 700, color: '#16A34A',
              background: '#DCFCE7', border: '1px solid #BBF7D0',
              borderRadius: '20px', padding: '3px 10px',
              fontFamily: 'var(--font-geist-mono)',
            }}>
              ✓ CONFIRMED
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'var(--font-geist-mono)' }}>
              Response time:
            </span>
            <span style={{
              fontSize: '14px', fontWeight: 700, color: '#6B3FA0',
              fontFamily: 'var(--font-geist-mono)', minWidth: '28px',
            }}>
              {timerCount}s
            </span>
          </div>
        </div>
      </div>

      {/* ════ Section 4 — Resolution ════ */}
      <div style={{
        opacity: ops[3], transition: tr,
        padding: '16px 20px 20px',
        background: ss[3] === 'active' ? '#F0FDF4' : '#FAFAF9',
        minHeight: '96px',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {/* Left: resolution heading + detail */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                fontSize: '14px', fontWeight: 800, color: '#16A34A',
                letterSpacing: '-0.01em',
              }}>
                ✓ SHIFT COVERED
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#4B7A5A', margin: '0 0 4px' }}>
              06:00–14:00 · Maria S. confirmed · 3 patients reassigned
            </p>
          </div>

          {/* Right: badges */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', flexShrink: 0, marginLeft: '16px' }}>
            <span style={{
              fontSize: '10px', color: '#6B7280',
              background: '#F3F4F6', border: '1px solid #E5E7EB',
              borderRadius: '20px', padding: '3px 10px',
              fontFamily: 'var(--font-geist-mono)', whiteSpace: 'nowrap',
            }}>
              Zero coordinator involvement
            </span>
            <span style={{
              fontSize: '12px', fontWeight: 700, color: '#6B3FA0',
              fontFamily: 'var(--font-geist-mono)',
            }}>
              28 seconds
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}
