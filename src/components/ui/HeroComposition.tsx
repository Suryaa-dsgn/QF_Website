'use client'

import { useEffect, useRef, useState } from 'react'
import { type Phase } from './hero-panels/types'
import { type SetPhase, getSetPhase, SET_DURATION, TOTAL } from './hero-panels/setTypes'

// ── PANEL IMPORTS ─────────────────────────────────────────────────────────────

import OperationsPanel      from './hero-panels/OperationsPanel'
// Set 0 — Claims/RCM
import ClaimProcessPanel    from './hero-panels/ClaimProcessPanel'
import RecoveryBadge        from './hero-panels/RecoveryBadge'
// Set 1 — Referral Intake
import ReferralProcessPanel from './hero-panels/ReferralProcessPanel'
import IntakeBadge          from './hero-panels/IntakeBadge'
// Set 2 — Call-Off Management
import CallOffProcessPanel  from './hero-panels/CallOffProcessPanel'
import ShiftBadge           from './hero-panels/ShiftBadge'

// ── CONSTANTS ─────────────────────────────────────────────────────────────────

// Duration of fade-in at the start and fade-out at the end of each set.
// Only ONE set is ever rendered — the wrapper fades out, set switches at opacity
// 0, new set fades in. No double-rendering, no panel bleed-through.
const FADE_MS = 600

// ── SetPhase → Phase MAPPING ──────────────────────────────────────────────────
// ClaimProcessPanel and OperationsPanel use the legacy Phase type.
// Step1 → 'compliance', step2 → 'rcm' matches activatePhase values in AGENTS data.

const CLAIMS_PHASE_MAP: Record<SetPhase, Phase> = {
  idle:      'idle',
  trigger:   'claim-in',
  step1:     'compliance',
  step2:     'rcm',
  resolved:  'resolved',
  resetting: 'resetting',   // overridden below via displaySetPhase
}

// ── PANEL LAYER STYLES ────────────────────────────────────────────────────────

const BACK_BASE: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: '60px',
  zIndex: 0,
  transform: 'rotate(-2deg)',
}

const MAIN_BASE: React.CSSProperties = {
  position: 'absolute',
  left: '160px',
  top: 0,
  zIndex: 1,
}

const BADGE_BASE: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  top: '20px',
  zIndex: 2,
  transition: 'opacity 500ms ease, transform 500ms ease',
}

// ── COMPOSITION ───────────────────────────────────────────────────────────────

export default function HeroComposition() {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef<number>(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Date.now() - startRef.current)
    }, 200)
    return () => clearInterval(id)
  }, [])

  // ── Global timing ──
  const t_global = elapsed % TOTAL
  const setIndex = Math.floor(t_global / SET_DURATION) % 3   // 0 | 1 | 2
  const t_local  = t_global % SET_DURATION                    // 0–12999ms

  // ── Phase computation ──
  const setPhase = getSetPhase(t_local)

  // During the resetting window, keep panels frozen in their resolved/success
  // state so the fade-out shows the finished UI — not a blank reset state.
  const displaySetPhase: SetPhase = setPhase === 'resetting' ? 'resolved' : setPhase
  const claimsPhase = CLAIMS_PHASE_MAP[displaySetPhase]

  // Badge visible only during the active resolved window (not during fade in/out)
  const badgeVisible = setPhase === 'resolved'

  // ── Wrapper opacity envelope ──
  // Fade in: 0→1 over first FADE_MS. Fully visible through middle. Fade out:
  // 1→0 over last FADE_MS. Set switch happens at t_local=0 when opacity is 0.
  // CSS transition 'opacity 200ms linear' smoothly fills between 200ms poll steps.
  const wrapperOpacity =
    t_local < FADE_MS
      ? t_local / FADE_MS
      : t_local > SET_DURATION - FADE_MS
      ? Math.max(0, 1 - (t_local - (SET_DURATION - FADE_MS)) / FADE_MS)
      : 1

  return (
    <div style={{ position: 'relative', width: '760px', height: '420px' }}>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: wrapperOpacity,
          transition: 'opacity 200ms linear',
        }}
      >

        {/* ── SET 0: Claims / RCM ────────────────────────────── */}
        {setIndex === 0 && (
          <>
            <div style={{ ...BACK_BASE, opacity: 0.88 }}>
              <OperationsPanel phase={claimsPhase} variant={1} />
            </div>
            <div style={MAIN_BASE}>
              <ClaimProcessPanel phase={claimsPhase} />
            </div>
            <div
              style={{
                ...BADGE_BASE,
                opacity: badgeVisible ? 1 : 0,
                transform: badgeVisible ? 'translateY(0px)' : 'translateY(10px)',
                pointerEvents: badgeVisible ? 'auto' : 'none',
              }}
            >
              <RecoveryBadge />
            </div>
          </>
        )}

        {/* ── SET 1: Referral Intake ──────────────────────────── */}
        {setIndex === 1 && (
          <>
            <div style={{ ...BACK_BASE, opacity: 0.88 }}>
              <OperationsPanel phase={claimsPhase} variant={2} />
            </div>
            <div style={MAIN_BASE}>
              <ReferralProcessPanel phase={displaySetPhase} />
            </div>
            <div
              style={{
                ...BADGE_BASE,
                opacity: badgeVisible ? 1 : 0,
                transform: badgeVisible ? 'translateY(0px)' : 'translateY(10px)',
                pointerEvents: badgeVisible ? 'auto' : 'none',
              }}
            >
              <IntakeBadge />
            </div>
          </>
        )}

        {/* ── SET 2: Call-Off Management ──────────────────────── */}
        {setIndex === 2 && (
          <>
            <div style={{ ...BACK_BASE, opacity: 0.88 }}>
              <OperationsPanel phase={claimsPhase} variant={3} />
            </div>
            <div style={MAIN_BASE}>
              <CallOffProcessPanel phase={displaySetPhase} />
            </div>
            <div
              style={{
                ...BADGE_BASE,
                opacity: badgeVisible ? 1 : 0,
                transform: badgeVisible ? 'translateY(0px)' : 'translateY(10px)',
                pointerEvents: badgeVisible ? 'auto' : 'none',
              }}
            >
              <ShiftBadge />
            </div>
          </>
        )}

      </div>
    </div>
  )
}
