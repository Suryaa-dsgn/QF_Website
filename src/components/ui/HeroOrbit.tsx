'use client'

import { useEffect, useRef, useState, type ReactElement } from 'react'

// ── GEOMETRY ──────────────────────────────────────────────────────────────────

const CX          = 480   // hub center x  (wider container: 960px)
const CY          = 240   // hub center y  (taller container: 480px)
const HUB_R       = 48    // hub radius → 96 px diameter
const RX          = 255   // orbit ellipse x-radius  — wider for horizontal breathing room
const RY          = 165   // orbit ellipse y-radius  — taller for vertical breathing room
const FROM_HUB    = 53    // line starts N px from center (clears hub edge + gap)
const BEFORE_NODE = 55    // line ends N px before node center; pills (zIndex:2) cover any remaining overlap (clears pill edge)

// ── TIMING ────────────────────────────────────────────────────────────────────

const HUB_APPEAR   = 400
const REVEAL_START = 800
const REVEAL_STEP  = 1100
const ALL_REVEALED = REVEAL_START + 8 * REVEAL_STEP   // 9600 ms
const CYCLE_WAIT   = 800
const CYCLE_START  = ALL_REVEALED + CYCLE_WAIT         // 10400 ms
const ACTIVE_SLOT  = 1900
const DONE_OFFSET  = 1400
const LOOP_TOTAL   = CYCLE_START + 8 * ACTIVE_SLOT + 800  // full loop ≈ 26.4 s

// ── ICONS (14 × 14, inline SVG, stroke-only, strokeWidth 1.4) ─────────────────

type IconFn = (c: string) => ReactElement

const CalendarIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="3" width="12" height="10.5" rx="1.5" stroke={c} strokeWidth="1.4" />
    <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5 9.5h2M9 9.5h2M5 11.5h6" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const ClipboardIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="3.5" y="2.5" width="9" height="11" rx="1.5" stroke={c} strokeWidth="1.4" />
    <path d="M6.5 2.5A1.5 1.5 0 019.5 2.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M5.5 7h5M5.5 9.5h5M5.5 12h3" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const InvoiceIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z"
      stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M9 2v4h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 9h5M5.5 11h5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const UserMinusIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="4.5" r="2.5" stroke={c} strokeWidth="1.4" />
    <path d="M1.5 14a5 5 0 0110 0" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 8.5h3.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

const CheckCircleIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.4" />
    <path d="M5.5 8.5l2 2 3.5-3.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FileCheckIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L9 2z"
      stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M9 2v4h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 9.5l1.5 1.5 3.5-3.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BarChartIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2 14h12" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    <rect x="3" y="9.5" width="2.5" height="4.5" rx="0.5" stroke={c} strokeWidth="1.4" />
    <rect x="6.75" y="6" width="2.5" height="8" rx="0.5" stroke={c} strokeWidth="1.4" />
    <rect x="10.5" y="2.5" width="2.5" height="11.5" rx="0.5" stroke={c} strokeWidth="1.4" />
  </svg>
)

const IdCardIcon: IconFn = (c) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={c} strokeWidth="1.4" />
    <circle cx="5.5" cy="7.5" r="1.5" stroke={c} strokeWidth="1.4" />
    <path d="M3 12a2.5 2.5 0 015 0" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    <path d="M10 6.5h3M10 8.5h2" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)

// ── OFFERINGS ─────────────────────────────────────────────────────────────────
// Ordered clockwise from upper-left (202.5°) for natural left-to-right sweep.
// Angles use 22.5° offsets so no node sits at exact top/bottom/left/right,
// giving equal clearance all around the elliptical orbit.

type Offering = {
  name: string
  color: string
  angle: number
  icon: IconFn
}

const OFFERINGS: Offering[] = [
  { name: 'Schedule Optimizer',     color: '#6B3FA0', angle: 202.5, icon: CalendarIcon   },
  { name: 'Referral Intake',        color: '#0891B2', angle: 247.5, icon: ClipboardIcon  },
  { name: 'Revenue Cycle',          color: '#059669', angle: 292.5, icon: InvoiceIcon    },
  { name: 'Call-Off Management',    color: '#6B3FA0', angle: 337.5, icon: UserMinusIcon  },
  { name: 'Auto Approval',          color: '#059669', angle:  22.5, icon: CheckCircleIcon},
  { name: 'Claims Compliance',      color: '#0891B2', angle:  67.5, icon: FileCheckIcon  },
  { name: 'Capacity Planner',       color: '#6B3FA0', angle: 112.5, icon: BarChartIcon   },
  { name: 'Provider Credentialing', color: '#0891B2', angle: 157.5, icon: IdCardIcon     },
]

// ── GEOMETRY HELPERS ──────────────────────────────────────────────────────────

function nodePos(angle: number) {
  const rad = (angle * Math.PI) / 180
  return { x: CX + RX * Math.cos(rad), y: CY + RY * Math.sin(rad) }
}

function linePoints(angle: number) {
  const { x: nx, y: ny } = nodePos(angle)
  const dx = nx - CX, dy = ny - CY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / dist, uy = dy / dist
  return {
    x1: CX + ux * FROM_HUB,
    y1: CY + uy * FROM_HUB,
    x2: nx - ux * BEFORE_NODE,
    y2: ny - uy * BEFORE_NODE,
  }
}

function lineLen(angle: number) {
  const { x1, y1, x2, y2 } = linePoints(angle)
  return Math.max(1, Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2))
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function HeroOrbit() {
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef<number>(Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Date.now() - startRef.current)
    }, 100)
    return () => clearInterval(id)
  }, [])

  // ── Timing derivation (loops every LOOP_TOTAL ms) ────────────────────────

  const t = elapsed % LOOP_TOTAL

  const hubVisible = t >= HUB_APPEAR

  const revealCount =
    t < REVEAL_START
      ? 0
      : Math.min(OFFERINGS.length, Math.floor((t - REVEAL_START) / REVEAL_STEP) + 1)

  const cycleT      = Math.max(0, t - CYCLE_START)
  const activeIndex = t < CYCLE_START
    ? -1
    : Math.floor(cycleT / ACTIVE_SLOT) % OFFERINGS.length
  const slotT  = cycleT % ACTIVE_SLOT
  const isDone = activeIndex >= 0 && slotT >= DONE_OFFSET

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        position: 'relative',
        width: '960px',
        height: '480px',
        background: 'linear-gradient(150deg, #FEFEFF 0%, #F6F3FF 55%, #EFF8FF 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(107,63,160,0.08)',
        overflow: 'hidden',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {/* ── Dot grid ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(107,63,160,0.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          zIndex: 0,
        }}
      />

      {/* ── Central radial glow ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 210px 170px at ${CX}px ${CY}px, rgba(107,63,160,0.10), rgba(8,145,178,0.04) 55%, transparent 75%)`,
          zIndex: 0,
        }}
      />

      {/* ── Ripple ring A (first wave, delay 0s) ── */}
      <div
        style={{
          position: 'absolute',
          left: `${CX - HUB_R}px`,
          top: `${CY - HUB_R}px`,
          width: `${HUB_R * 2}px`,
          height: `${HUB_R * 2}px`,
          borderRadius: '50%',
          border: '1.5px solid rgba(107,63,160,0.45)',
          animation: hubVisible ? 'hero-ripple 3s ease-out infinite 0s' : 'none',
          opacity: hubVisible ? undefined : 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Ripple ring B (second wave, staggered 1.5s) ── */}
      <div
        style={{
          position: 'absolute',
          left: `${CX - HUB_R}px`,
          top: `${CY - HUB_R}px`,
          width: `${HUB_R * 2}px`,
          height: `${HUB_R * 2}px`,
          borderRadius: '50%',
          border: '1.5px solid rgba(107,63,160,0.45)',
          animation: hubVisible ? 'hero-ripple 3s ease-out infinite 1.5s' : 'none',
          opacity: hubVisible ? undefined : 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── SVG spoke lines ── */}
      <svg
        width="960"
        height="480"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
      >
        {OFFERINGS.map((o, i) => {
          const { x1, y1, x2, y2 } = linePoints(o.angle)
          const len      = lineLen(o.angle)
          const revealed = revealCount > i
          const isActive = activeIndex === i

          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={o.color}
              strokeDasharray={len}
              style={{
                strokeDashoffset: revealed ? 0 : len,
                strokeWidth: isActive ? 2 : 1.2,
                opacity: revealed ? (isActive ? 0.65 : 0.20) : 0,
                transition: 'stroke-dashoffset 250ms ease, opacity 400ms ease, stroke-width 400ms ease',
              }}
            />
          )
        })}
      </svg>

      {/* ── Offering pill nodes ── */}
      {OFFERINGS.map((o, i) => {
        const { x, y } = nodePos(o.angle)
        const revealed = revealCount > i
        const isActive = activeIndex === i

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(-50%, -50%) scale(${revealed ? 1 : 0.72})`,
              opacity: revealed ? 1 : 0,
              transition: 'opacity 380ms ease, transform 380ms cubic-bezier(0.34,1.56,0.64,1)',
              zIndex: 2,
            }}
          >
            {/* Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '8px 14px 8px 8px',
                background: '#FFFFFF',
                border: `1px solid ${isActive ? o.color + '30' : 'rgba(107,63,160,0.10)'}`,
                borderRadius: '22px',
                boxShadow: isActive
                  ? `0 0 0 3px ${o.color}14, 0 6px 20px rgba(0,0,0,0.10)`
                  : '0 2px 10px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)',
                whiteSpace: 'nowrap',
                transition: 'background 400ms ease, border-color 400ms ease, box-shadow 400ms ease',
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: isActive ? `${o.color}20` : `${o.color}12`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 400ms ease',
                }}
              >
                {o.icon(isActive ? o.color : o.color + 'CC')}
              </div>

              {/* Name */}
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: isActive ? '#0A0A0A' : '#1A1A1A',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}
              >
                {o.name}
              </span>
            </div>

            {/* Status badge — appears below the pill when active */}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                marginTop: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: isActive ? 1 : 0,
                transition: 'opacity 300ms ease',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '9px',
                  fontFamily: 'var(--font-geist-mono)',
                  fontWeight: 600,
                  color: isDone ? '#16A34A' : o.color,
                  background: isDone ? '#DCFCE7' : `${o.color}12`,
                  border: `1px solid ${isDone ? '#BBF7D0' : o.color + '28'}`,
                  padding: '3px 9px',
                  borderRadius: '20px',
                  whiteSpace: 'nowrap',
                  transition: 'color 350ms ease, background 350ms ease, border-color 350ms ease',
                }}
              >
                {isDone ? '✓ Done' : '↻ Running'}
              </span>
            </div>
          </div>
        )
      })}

      {/* ── Center Hub ── */}
      <div
        style={{
          position: 'absolute',
          left: `${CX - HUB_R}px`,
          top: `${CY - HUB_R}px`,
          width: `${HUB_R * 2}px`,
          height: `${HUB_R * 2}px`,
          zIndex: 3,
        }}
      >
        {/* Inner ring (subtle reference glow) */}
        <div
          className="animate-pulse"
          style={{
            position: 'absolute',
            inset: '-4px',
            border: '2px solid rgba(107,63,160,0.18)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Hub circle */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #5B2F90 0%, #7C3AED 50%, #6B3FA0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow:
              '0 12px 40px rgba(107,63,160,0.50), 0 4px 12px rgba(107,63,160,0.30), inset 0 1px 0 rgba(255,255,255,0.15)',
            opacity: hubVisible ? 1 : 0,
            transform: hubVisible ? 'scale(1)' : 'scale(0.65)',
            transition: 'opacity 600ms cubic-bezier(0.34,1.56,0.64,1), transform 600ms cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/qf-logo-white.svg"
            alt="Quickflows"
            width={40}
            height={42}
            style={{ display: 'block' }}
          />
        </div>
      </div>

    </div>
  )
}
