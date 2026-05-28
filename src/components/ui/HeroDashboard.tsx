'use client'

import { useEffect, useState, useRef } from 'react'

// ─── TYPES ────────────────────────────────────────────────────────

type LoopPhase = 'idle' | 'alert' | 'filling' | 'resolved'

// ─── SIDEBAR ──────────────────────────────────────────────────────

interface NavItem {
  label: string
  active?: boolean
  badge?: string
  badgeColor?: string
  badgeBg?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',      active: true },
  { label: 'Providers',      badge: '8',  badgeColor: '#D97706', badgeBg: 'rgba(217,119,6,0.14)'    },
  { label: 'Patients' },
  { label: 'Referrals' },
  { label: 'Caregivers',     badge: '12', badgeColor: '#D97706', badgeBg: 'rgba(217,119,6,0.14)'    },
  { label: 'Calendar' },
  { label: 'Attendance' },
  { label: 'Reschedule' },
  { label: 'Cancellations' },
  { label: 'Autopilot Logs', badge: '19', badgeColor: '#A78BFA', badgeBg: 'rgba(167,139,250,0.16)' },
]

function Sidebar() {
  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{ width: '152px', background: '#12151E', height: '100%' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 px-3 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-6 h-6 rounded-[6px] flex items-center justify-center flex-shrink-0"
          style={{ background: '#0D9488' }}
        >
          <span className="text-white font-bold font-ui" style={{ fontSize: '13px', lineHeight: 1 }}>Q</span>
        </div>
        <div>
          <p className="font-semibold font-ui leading-none" style={{ fontSize: '11px', color: '#FFFFFF' }}>
            Schedule
          </p>
          <p className="font-ui" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
            powered by Quickflows
          </p>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-2 py-2 overflow-hidden">
        <p
          className="font-ui font-semibold uppercase"
          style={{
            fontSize: '9px',
            letterSpacing: '0.07em',
            color: 'rgba(255,255,255,0.3)',
            padding: '0 6px',
            marginBottom: '4px',
          }}
        >
          NAVIGATION
        </p>

        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-[6px] mb-[1px]"
            style={{
              padding: '5px 8px',
              background: item.active ? 'rgba(13,148,136,0.12)' : 'transparent',
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: item.active ? '#5EEAD4' : 'rgba(255,255,255,0.22)' }}
              />
              <span
                className="font-ui truncate"
                style={{
                  fontSize: '11px',
                  fontWeight: item.active ? 500 : 400,
                  color: item.active ? '#5EEAD4' : 'rgba(255,255,255,0.5)',
                  lineHeight: 1.3,
                }}
              >
                {item.label}
              </span>
            </div>
            {'badge' in item && item.badge && (
              <span
                className="font-mono font-semibold leading-none flex-shrink-0 ml-1"
                style={{
                  fontSize: '9px',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  color: item.badgeColor,
                  background: item.badgeBg,
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* User */}
      <div
        className="flex items-center gap-2 px-3 py-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#6B3FA0' }}
        >
          <span className="text-white font-bold font-ui" style={{ fontSize: '9px' }}>A</span>
        </div>
        <div className="min-w-0">
          <p className="font-ui font-medium leading-none truncate" style={{ fontSize: '10px', color: '#FFFFFF' }}>
            admin
          </p>
          <p className="font-ui truncate" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
            admin@demo.com
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  delta,
  deltaType = 'neutral',
}: {
  label: string
  value: string
  delta: string
  deltaType?: 'positive' | 'negative' | 'neutral'
}) {
  const deltaColor =
    deltaType === 'positive' ? '#16A34A' :
    deltaType === 'negative' ? '#DC2626' :
    '#9CA3AF'

  return (
    <div
      className="rounded-[8px] p-2.5"
      style={{ background: '#FFFFFF', border: '1px solid #F3F4F6' }}
    >
      <p
        className="font-ui uppercase"
        style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: '4px' }}
      >
        {label}
      </p>
      <p
        className="font-mono"
        style={{ fontSize: '17px', fontWeight: 500, letterSpacing: '-0.03em', color: '#0A0A0A', lineHeight: 1, marginBottom: '3px', transition: 'all 0.3s ease' }}
      >
        {value}
      </p>
      <p
        className="font-mono"
        style={{ fontSize: '9px', color: deltaColor, transition: 'color 0.3s ease' }}
      >
        {delta}
      </p>
    </div>
  )
}

// ─── MAIN HERO DASHBOARD ──────────────────────────────────────────

export default function HeroDashboard() {
  const [phase, setPhase]         = useState<LoopPhase>('idle')
  const [countdown, setCountdown] = useState(28)
  const loopRef                   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef              = useRef<ReturnType<typeof setInterval> | null>(null)

  // 15-second animation loop
  useEffect(() => {
    function runLoop() {
      setPhase('idle')
      setCountdown(28)

      // alert at 3 s
      loopRef.current = setTimeout(() => {
        setPhase('alert')

        // filling at 5 s (2 s after alert)
        loopRef.current = setTimeout(() => {
          setPhase('filling')

          let count = 28
          countdownRef.current = setInterval(() => {
            count -= 4
            setCountdown(Math.max(0, count))
            if (count <= 0 && countdownRef.current) clearInterval(countdownRef.current)
          }, 860)

          // resolved at 11 s (6 s after filling)
          loopRef.current = setTimeout(() => {
            setPhase('resolved')
            if (countdownRef.current) clearInterval(countdownRef.current)

            // reset at 14.5 s
            loopRef.current = setTimeout(runLoop, 3500)
          }, 6000)
        }, 2000)
      }, 3000)
    }

    runLoop()

    return () => {
      if (loopRef.current)      clearTimeout(loopRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  // ── Derived stat values ──

  const unassignedVal   = phase === 'resolved' ? '0'    : '1'
  const callOffsVal     = (phase === 'alert' || phase === 'filling') ? '1' : '0'
  const fillRateVal     = phase === 'resolved' ? '100%' : '66.7%'

  const unassignedDelta = phase === 'resolved' ? '✓ All covered'    : '1 needs assignment'
  const callOffsDelta   = phase === 'alert' || phase === 'filling'
    ? '1 active call-off' : phase === 'resolved'
    ? '✓ Resolved' : 'No call-offs today'
  const fillRateDelta   = phase === 'resolved' ? '✓ Full coverage'  : '↑ Improving'

  const unassignedType  = phase === 'resolved' ? 'positive' as const : 'negative'  as const
  const callOffsType    = (phase === 'alert' || phase === 'filling') ? 'negative' as const
    : phase === 'resolved' ? 'positive' as const : 'neutral' as const
  const fillRateType    = phase === 'resolved' ? 'positive' as const : 'neutral' as const

  // ── Starting Soon row ──

  const showLiveRow = phase !== 'idle'

  const rowStyle = phase === 'resolved'
    ? { bg: 'rgba(22,163,74,0.05)',    border: 'rgba(22,163,74,0.14)'    }
    : phase === 'alert'
    ? { bg: 'rgba(217,119,6,0.05)',    border: 'rgba(217,119,6,0.12)'    }
    : { bg: 'rgba(107,63,160,0.05)',   border: 'rgba(107,63,160,0.12)'   }

  const rowPill =
    phase === 'alert'    ? { label: 'OPEN',        bg: '#FEF3C7', color: '#92400E' } :
    phase === 'filling'  ? { label: 'FILLING',     bg: '#EDE9FE', color: '#5B21B6' } :
    phase === 'resolved' ? { label: '✓ CONFIRMED', bg: '#D1FAE5', color: '#065F46' } :
    null

  return (
    <div
      style={{
        width: '680px',
        borderRadius: '16px 16px 0 0',
        border: '1px solid rgba(107,63,160,0.18)',
        boxShadow: '0 32px 80px rgba(107,63,160,0.20), 0 8px 24px rgba(0,0,0,0.10)',
        overflow: 'hidden',
      }}
    >
      {/* ── Browser chrome ── */}
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red"    />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green"  />
        </div>
        <div className="browser-url">app.quickflows.ai / dashboard</div>
      </div>

      {/* ── Dashboard body ── */}
      <div className="flex" style={{ height: '444px' }}>

        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div
          className="flex-1 flex flex-col overflow-hidden bg-white"
          style={{ padding: '14px 18px', minWidth: 0 }}
        >

          {/* Header */}
          <div className="flex items-start justify-between mb-3 flex-shrink-0">
            <div>
              <p
                className="font-ui font-bold"
                style={{ fontSize: '14px', letterSpacing: '-0.02em', color: '#0A0A0A', lineHeight: 1 }}
              >
                Welcome back
              </p>
              <p className="font-ui" style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '3px' }}>
                Thursday · Philadelphia region
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="font-mono font-medium"
                style={{ fontSize: '10px', padding: '3px 7px', borderRadius: '5px', background: '#D1FAE5', color: '#065F46', letterSpacing: '0.02em' }}
              >
                ADMIN
              </span>
              <span
                className="font-mono font-medium flex items-center gap-1"
                style={{ fontSize: '10px', padding: '3px 7px', borderRadius: '5px', background: '#EDE9FE', color: '#5B21B6' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#7C3AED', display: 'inline-block', flexShrink: 0 }}
                />
                Live
              </span>
            </div>
          </div>

          {/* TODAY'S OVERVIEW */}
          <div className="flex-shrink-0 mb-3">
            <p
              className="font-ui uppercase"
              style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.07em', color: '#9CA3AF', marginBottom: '7px' }}
            >
              Today's Overview
            </p>
            <div className="grid grid-cols-4 gap-2">
              <StatCard label="Total Shifts" value="3"            delta="Today"           deltaType="neutral"  />
              <StatCard label="Unassigned"   value={unassignedVal} delta={unassignedDelta} deltaType={unassignedType} />
              <StatCard label="Call-offs"    value={callOffsVal}   delta={callOffsDelta}   deltaType={callOffsType}  />
              <StatCard label="Fill Rate"    value={fillRateVal}   delta={fillRateDelta}   deltaType={fillRateType}  />
            </div>
          </div>

          {/* Middle row: Starting Soon + Caregiver Availability */}
          <div className="grid gap-2 flex-shrink-0 mb-3" style={{ gridTemplateColumns: '1fr 138px' }}>

            {/* Starting Soon */}
            <div
              className="rounded-[8px] p-2.5"
              style={{ background: '#FAFAFA', border: '1px solid #F3F4F6', minHeight: '86px' }}
            >
              <p
                className="font-ui uppercase"
                style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: '7px' }}
              >
                Starting Soon
              </p>

              {!showLiveRow ? (
                <p
                  className="font-ui text-center"
                  style={{ fontSize: '11px', color: '#D1D5DB', paddingTop: '8px' }}
                >
                  No shifts starting in the next hour
                </p>
              ) : (
                <div
                  className="flex items-center gap-2"
                  style={{
                    background: rowStyle.bg,
                    border: `1px solid ${rowStyle.border}`,
                    borderRadius: '6px',
                    padding: '6px 8px',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="font-ui font-medium" style={{ fontSize: '11px', color: '#0A0A0A', marginBottom: '1px' }}>
                      06:00–14:00
                    </p>
                    <p className="font-ui" style={{ fontSize: '10px', color: '#9CA3AF' }}>
                      Amanda W. called out
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {rowPill && (
                      <span
                        className="font-mono font-medium"
                        style={{
                          fontSize: '9px',
                          padding: '2px 6px',
                          borderRadius: '5px',
                          background: rowPill.bg,
                          color: rowPill.color,
                          transition: 'all 0.3s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {rowPill.label}
                      </span>
                    )}
                    {phase === 'filling' && countdown > 0 && (
                      <span
                        className="font-mono font-semibold"
                        style={{ fontSize: '9px', color: '#5B21B6' }}
                      >
                        {countdown}s
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Caregiver Availability */}
            <div className="rounded-[8px] p-2.5" style={{ background: '#FAFAFA', border: '1px solid #F3F4F6' }}>
              <p
                className="font-ui uppercase"
                style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: '7px' }}
              >
                Availability
              </p>
              <div className="flex flex-col gap-1">
                {[
                  { label: 'Active',    value: '7' },
                  { label: 'Scheduled', value: '1' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="font-ui" style={{ fontSize: '10px', color: '#6B7280' }}>{row.label}</span>
                    <span className="font-ui font-semibold" style={{ fontSize: '10px', color: '#0A0A0A' }}>{row.value}</span>
                  </div>
                ))}
                <div
                  className="flex items-center justify-between rounded px-1.5 py-0.5"
                  style={{ background: 'rgba(13,148,136,0.09)' }}
                >
                  <span className="font-ui font-medium" style={{ fontSize: '10px', color: '#0D9488' }}>Available</span>
                  <span className="font-ui font-bold"   style={{ fontSize: '10px', color: '#0D9488' }}>6</span>
                </div>
              </div>
              {/* Utilization bar */}
              <div className="mt-2">
                <div className="rounded-full overflow-hidden" style={{ height: '4px', background: '#F3F4F6' }}>
                  <div
                    className="rounded-full"
                    style={{ height: '4px', width: '14%', background: '#0D9488', transition: 'width 0.5s ease' }}
                  />
                </div>
                <p className="font-mono" style={{ fontSize: '9px', color: '#D1D5DB', marginTop: '3px' }}>14% utilization</p>
              </div>
            </div>
          </div>

          {/* ACTION ITEMS */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Section header */}
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <p className="font-ui font-semibold" style={{ fontSize: '11px', color: '#0A0A0A' }}>Action Items</p>
                <span
                  className="font-mono font-semibold"
                  style={{ fontSize: '9px', padding: '1px 6px', borderRadius: '4px', background: '#FEF3C7', color: '#92400E' }}
                >
                  10
                </span>
              </div>
              <p className="font-ui" style={{ fontSize: '9px', color: '#9CA3AF' }}>Shifts needing assignment</p>
            </div>

            {/* Column headers */}
            <div
              className="grid font-ui flex-shrink-0"
              style={{
                gridTemplateColumns: '1fr 60px 108px 62px',
                fontSize: '9px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#9CA3AF',
                paddingBottom: '6px',
                borderBottom: '1px solid #F3F4F6',
              }}
            >
              <span>Patient</span>
              <span>Date</span>
              <span>Time</span>
              <span>Action</span>
            </div>

            {/* Animated resolved row */}
            <div
              style={{
                maxHeight: phase === 'resolved' ? '40px' : '0px',
                opacity:   phase === 'resolved' ? 1 : 0,
                overflow:  'hidden',
                transition: 'max-height 0.5s ease, opacity 0.4s ease',
              }}
            >
              <div
                className="grid items-center"
                style={{
                  gridTemplateColumns: '1fr 60px 108px 62px',
                  background: 'rgba(22,163,74,0.05)',
                  border: '1px solid rgba(22,163,74,0.15)',
                  borderRadius: '6px',
                  padding: '5px 6px',
                  marginTop: '5px',
                }}
              >
                <span className="font-ui font-medium" style={{ fontSize: '11px', color: '#0A0A0A' }}>Amanda W.</span>
                <span className="font-mono" style={{ fontSize: '10px', color: '#9CA3AF' }}>Today</span>
                <span className="font-mono" style={{ fontSize: '10px', color: '#9CA3AF' }}>06:00–14:00</span>
                <span
                  className="font-mono font-medium"
                  style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: '#D1FAE5', color: '#065F46', whiteSpace: 'nowrap' }}
                >
                  ✓ Confirmed
                </span>
              </div>
            </div>

            {/* Static rows */}
            {[
              { patient: 'James Brown', date: 'May 28', time: '8:00 AM – 12:00 PM' },
              { patient: 'Maria Lee',   date: 'May 28', time: '2:00 PM – 6:00 PM'  },
            ].map((row, i) => (
              <div
                key={i}
                className="grid items-center"
                style={{
                  gridTemplateColumns: '1fr 60px 108px 62px',
                  borderBottom: '1px solid #F9F9F9',
                  padding: '7px 2px',
                }}
              >
                <span className="font-ui font-medium" style={{ fontSize: '11px', color: '#0A0A0A' }}>{row.patient}</span>
                <span className="font-mono"            style={{ fontSize: '10px', color: '#9CA3AF' }}>{row.date}</span>
                <span className="font-mono"            style={{ fontSize: '10px', color: '#9CA3AF' }}>{row.time}</span>
                <span
                  className="font-ui font-medium"
                  style={{ fontSize: '10px', color: '#1D4ED8', cursor: 'default' }}
                >
                  Assign →
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
