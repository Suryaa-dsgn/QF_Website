'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

// ─── TYPES ────────────────────────────────────────────────────────

type ShiftStatus = 'RESOLVED' | 'FILLING' | 'OPEN' | 'PENDING'

interface ShiftRow {
  id: string
  client: string
  time: string
  status: ShiftStatus
  agentLabel: string
  agentColor: 'blue' | 'amber' | 'green'
  note: string
}

type LoopPhase = 'idle' | 'alert' | 'filling' | 'resolved'

// ─── STATIC ROWS (always visible) ─────────────────────────────────

const staticRows: ShiftRow[] = [
  {
    id: 'row-1',
    client: 'Post-op Follow-up — Mr. David Chen',
    time: '14:00–16:00',
    status: 'RESOLVED',
    agentLabel: 'A3',
    agentColor: 'green',
    note: 'Confirmed 12s ago',
  },
  {
    id: 'row-2',
    client: 'Critical Wound Care — Mrs. Sarah Johnson',
    time: '08:00–12:00',
    status: 'FILLING',
    agentLabel: 'A1',
    agentColor: 'blue',
    note: 'Agent matching',
  },
  {
    id: 'row-3',
    client: 'Dementia AM Care — North Philly',
    time: '07:00–11:00',
    status: 'PENDING',
    agentLabel: 'A2',
    agentColor: 'amber',
    note: 'Awaiting response',
  },
]

// ─── LIVE ALERT ROW BASE DATA ─────────────────────────────────────

const liveAlertRowBase: Omit<ShiftRow, 'status' | 'note'> = {
  id: 'live-row',
  client: 'Nurse Amanda W. — Called in sick',
  time: '06:00–14:00',
  agentLabel: 'A1',
  agentColor: 'blue',
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────

const agentDotColors = {
  blue:  { bg: '#DBEAFE', text: '#1D4ED8' },
  amber: { bg: '#FEF3C7', text: '#92400E' },
  green: { bg: '#D1FAE5', text: '#065F46' },
}

const statusConfig: Record<ShiftStatus, { label: string; className: string }> = {
  RESOLVED: { label: 'RESOLVED', className: 'pill-green'  },
  FILLING:  { label: 'FILLING',  className: 'pill-purple' },
  OPEN:     { label: 'OPEN',     className: 'pill-amber'  },
  PENDING:  { label: 'PENDING',  className: 'pill-grey'   },
}

function AgentDot({ label, color }: { label: string; color: 'blue' | 'amber' | 'green' }) {
  const { bg, text } = agentDotColors[color]
  return (
    <div
      className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold border-[1.5px] border-white"
      style={{ background: bg, color: text }}
    >
      {label}
    </div>
  )
}

function StatusPill({ status }: { status: ShiftStatus }) {
  const { label, className } = statusConfig[status]
  return <span className={cn('status-pill', className)}>{label}</span>
}

function ShiftRowItem({ row, isNew = false }: { row: ShiftRow; isNew?: boolean }) {
  return (
    <div
      className={cn(
        'grid items-center gap-2 py-2 border-b border-[#F9F8FF] last:border-0',
        isNew && 'bg-[#FFFBEB] rounded-[6px] px-2 -mx-2'
      )}
      style={{ gridTemplateColumns: '1fr 90px 80px auto', fontSize: '12px' }}
    >
      <span className="text-ink font-medium truncate font-ui">{row.client}</span>
      <span className="text-ink4 font-mono text-[11px]">{row.time}</span>
      <StatusPill status={row.status} />
      <div className="flex items-center gap-1.5">
        <AgentDot label={row.agentLabel} color={row.agentColor} />
        <span className="text-ink4 text-[11px] hidden xl:block">{row.note}</span>
      </div>
    </div>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  delta,
  deltaPositive = true,
}: {
  label: string
  value: string
  delta: string
  deltaPositive?: boolean
}) {
  return (
    <div className="bg-[#FAFAFA] border border-[#F3F3F3] rounded-[10px] p-3">
      <p className="text-[10px] font-medium text-ink4 uppercase tracking-[0.05em] mb-1 font-ui">
        {label}
      </p>
      <p className="text-data-md text-ink leading-none mb-1">{value}</p>
      <p className={cn('text-[10px] font-mono', deltaPositive ? 'text-[#16A34A]' : 'text-[#F4A261]')}>
        {delta}
      </p>
    </div>
  )
}

// ─── SIDEBAR ──────────────────────────────────────────────────────

function Sidebar() {
  return (
    <div
      className="flex flex-col bg-[#FAFAFA] border-r border-[#F3F0FC] flex-shrink-0"
      style={{ width: '180px' }}
    >
      {/* Logo */}
      <div className="px-3 py-3 border-b border-[#F3F0FC]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-[#0A0A0A] rounded-[5px] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2C8 2 13 5.5 13 9.5C13 12.5 10.8 14.5 8 14.5"
                stroke="white" strokeWidth="1.8" strokeLinecap="round"
              />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-ink tracking-[-0.02em]">Quickflows</span>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.07em] text-ink4 px-2 mb-1">
          Operations
        </p>

        {/* Active item */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-[6px] bg-[--brand-08] border-l-[2px] border-brand">
          <div className="w-1.5 h-1.5 rounded-full bg-brand" />
          <span className="text-[11px] font-medium text-brand">Overview</span>
        </div>

        {['Shifts', 'Staff'].map((item) => (
          <div key={item} className="flex items-center gap-1.5 px-2 py-1.5 rounded-[6px]">
            <div className="w-1.5 h-1.5 rounded-full bg-ink4/40" />
            <span className="text-[11px] text-ink3">{item}</span>
          </div>
        ))}

        {/* Alerts with badge */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-[6px]">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-ink4/40" />
            <span className="text-[11px] text-ink3">Alerts</span>
          </div>
          <span className="text-[9px] bg-[#FEE2E2] text-[#991B1B] px-1.5 py-0.5 rounded-[4px] font-mono font-medium">
            5
          </span>
        </div>

        <p className="text-[9px] font-semibold uppercase tracking-[0.07em] text-ink4 px-2 mt-2 mb-1">
          AI Agents
        </p>

        {['Agent Log', 'Reports'].map((item) => (
          <div key={item} className="flex items-center gap-1.5 px-2 py-1.5 rounded-[6px]">
            <div className="w-1.5 h-1.5 rounded-full bg-ink4/40" />
            <span className="text-[11px] text-ink3">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN HERO PANEL ──────────────────────────────────────────────

export default function HeroPanel() {
  const [phase, setPhase]       = useState<LoopPhase>('idle')
  const [countdown, setCountdown] = useState(28)
  const loopRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 15-second animation loop
  useEffect(() => {
    function runLoop() {
      setPhase('idle')
      setCountdown(28)

      // Phase: alert fires at 3 s
      loopRef.current = setTimeout(() => {
        setPhase('alert')

        // Phase: agent picks up at 5 s (2 s after alert)
        loopRef.current = setTimeout(() => {
          setPhase('filling')

          // Countdown 28 → 0 over ~6 s (7 ticks × 860 ms)
          let count = 28
          countdownRef.current = setInterval(() => {
            count -= 4
            setCountdown(Math.max(0, count))
            if (count <= 0 && countdownRef.current) {
              clearInterval(countdownRef.current)
            }
          }, 860)

          // Phase: resolved at 11 s (6 s after filling)
          loopRef.current = setTimeout(() => {
            setPhase('resolved')
            if (countdownRef.current) clearInterval(countdownRef.current)

            // Reset at 14.5 s (3.5 s after resolved)
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

  // Derive live row state from phase
  const liveRowData: ShiftRow | null = (() => {
    if (phase === 'idle')     return null
    if (phase === 'alert')    return { ...liveAlertRowBase, status: 'OPEN',     note: 'Waiting for agent' }
    if (phase === 'filling')  return { ...liveAlertRowBase, status: 'FILLING',  note: countdown > 0 ? `${countdown}s to fill` : 'Confirming...' }
    if (phase === 'resolved') return { ...liveAlertRowBase, status: 'RESOLVED', note: 'Filled in 28s', agentColor: 'green' }
    return null
  })()

  return (
    <div
      className="w-full rounded-t-[20px] border border-[#E9E3FA] overflow-hidden bg-white"
      style={{ boxShadow: 'var(--shadow-3)' }}
    >
      {/* Browser chrome */}
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red" />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green" />
        </div>
        <div className="browser-url">app.quickflows.ai / operations</div>
      </div>

      {/* Dashboard layout */}
      <div className="flex" style={{ height: '340px' }}>

        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 overflow-hidden flex flex-col px-5 py-4">

          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-semibold text-ink font-ui leading-none mb-1">
                Shift Operations
              </h3>
              <p className="text-[11px] text-ink4 font-ui">Thursday · Philadelphia region</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-brand bg-[--brand-08] border border-[--border] px-2 py-1 rounded-[6px] font-ui">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Real-time
            </span>
          </div>

          {/* Stat cards — 4 columns */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <StatCard
              label="Open Shifts"
              value={phase === 'resolved' || phase === 'idle' ? '0' : '1'}
              delta={phase === 'resolved' || phase === 'idle' ? 'All covered' : '1 gap detected'}
              deltaPositive={phase !== 'alert' && phase !== 'filling'}
            />
            <StatCard label="Gaps Closed"   value="34"  delta="Today"           deltaPositive />
            <StatCard label="Agents Active" value="3"   delta="7 in queue"      deltaPositive />
            <StatCard label="Avg Fill Time" value="28s" delta="↓ 4s vs yesterday" deltaPositive />
          </div>

          {/* Shift table */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold text-ink3 font-ui">Recent activity</p>
              <p className="text-[10px] text-ink4 font-ui">Showing 4 of 34 today</p>
            </div>

            {/* Column headers */}
            <div
              className="grid text-[10px] font-semibold text-ink4 font-ui pb-1.5 border-b border-[#F3F3F3] mb-1"
              style={{ gridTemplateColumns: '1fr 90px 80px auto' }}
            >
              <span>Client / Staff</span>
              <span>Time</span>
              <span>Status</span>
              <span>Agent</span>
            </div>

            {/* Live animated row */}
            <div
              className="transition-all duration-500 overflow-hidden"
              style={{
                maxHeight: liveRowData ? '48px' : '0px',
                opacity:   liveRowData ? 1 : 0,
              }}
            >
              {liveRowData && (
                <ShiftRowItem row={liveRowData} isNew={phase === 'alert'} />
              )}
            </div>

            {/* Static rows */}
            {staticRows.map((row) => (
              <ShiftRowItem key={row.id} row={row} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
