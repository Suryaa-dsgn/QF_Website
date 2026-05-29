'use client'

import { useEffect, useRef, useState } from 'react'
import OperationsPanel from './hero-panels/OperationsPanel'
import ClaimProcessPanel from './hero-panels/ClaimProcessPanel'
import RecoveryBadge from './hero-panels/RecoveryBadge'
import { type Phase } from './hero-panels/types'

// ── ANIMATION STATE MACHINE ───────────────────────────────────────────────────

const TOTAL = 18000

function getPhase(t: number): Phase {
  if (t < 1500)  return 'idle'
  if (t < 4000)  return 'claim-in'
  if (t < 7500)  return 'compliance'
  if (t < 11000) return 'rcm'
  if (t < 16500) return 'resolved'
  return 'resetting'
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

  const t = elapsed % TOTAL
  const phase = getPhase(t)
  const isResetting = phase === 'resetting'

  return (
    <div
      style={{
        position: 'relative',
        width: '760px',
        height: '420px',
      }}
    >
      {/* Panel B — OperationsPanel (background, slightly rotated) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '60px',
          zIndex: 0,
          transform: 'rotate(-2deg)',
          opacity: isResetting ? 0 : 0.88,
          transition: 'opacity 600ms ease',
        }}
      >
        <OperationsPanel phase={phase} />
      </div>

      {/* Panel A — ClaimProcessPanel (main focal panel) */}
      <div
        style={{
          position: 'absolute',
          left: '160px',
          top: 0,
          zIndex: 1,
          opacity: isResetting ? 0 : 1,
          transition: 'opacity 600ms ease',
        }}
      >
        <ClaimProcessPanel phase={phase} />
      </div>

      {/* Panel C — RecoveryBadge (floating foreground, resolved only) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '20px',
          zIndex: 2,
          opacity: phase === 'resolved' ? 1 : 0,
          transform: phase === 'resolved' ? 'translateY(0px)' : 'translateY(10px)',
          transition: 'opacity 500ms ease, transform 500ms ease',
          pointerEvents: phase === 'resolved' ? 'auto' : 'none',
        }}
      >
        <RecoveryBadge />
      </div>
    </div>
  )
}
