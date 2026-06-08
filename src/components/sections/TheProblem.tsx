'use client'

import { useRef, useEffect } from 'react'

// ─── TYPES ───────────────────────────────────────────────────────

interface IncidentCardProps {
  tag: string
  tagColor: string
  tagBg: string
  timestamp: string
  incident: string[]
  status: string
  statusColor: string
  panel: React.ReactNode
  delay?: number
}

// ─── SHARED PANEL STYLES ─────────────────────────────────────────

const PANEL_WRAP: React.CSSProperties = {
  background:   '#FAFAFA',
  border:       '1px solid rgba(107,63,160,0.07)',
  borderRadius: '10px',
  overflow:     'hidden',
  fontFamily:   'var(--font-geist-mono)',
  fontSize:     '11px',
}

const PANEL_HEADER: React.CSSProperties = {
  display:        'flex',
  justifyContent: 'space-between',
  alignItems:     'center',
  padding:        '8px 12px',
  background:     'rgba(107,63,160,0.03)',
  borderBottom:   '1px solid rgba(107,63,160,0.06)',
  color:          '#9CA3AF',
  fontSize:       '10px',
}

const PANEL_ROW: React.CSSProperties = {
  display:        'flex',
  alignItems:     'center',
  padding:        '7px 12px',
  gap:            '8px',
  fontSize:       '11px',
}

const PANEL_FOOTER: React.CSSProperties = {
  display:    'flex',
  alignItems: 'center',
  gap:        '6px',
  padding:    '7px 12px',
  fontSize:   '10px',
}

// ─── WORKFORCE MINI PANEL ────────────────────────────────────────

function WorkforceMiniPanel() {
  return (
    <div style={PANEL_WRAP}>
      <div style={PANEL_HEADER}>
        <span>Shifts · Thursday</span>
        <span style={{ fontSize: '9px' }}>06:00–22:00</span>
      </div>

      {/* Called-out row */}
      <div style={{
        ...PANEL_ROW,
        background:   'rgba(244,162,97,0.09)',
        borderBottom: '1px solid rgba(244,162,97,0.14)',
      }}>
        <span style={{ color: '#9CA3AF', whiteSpace: 'nowrap', minWidth: '82px' }}>06:00–14:00</span>
        <span style={{ color: '#C4B5D9', flex: 1 }}>—</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
            background: '#F4A261',
            animation: 'eyebrow-pulse 2s ease-in-out infinite',
          }} />
          <span style={{ color: '#F4A261', fontWeight: 600, fontSize: '10px', whiteSpace: 'nowrap' }}>
            CALLED OUT
          </span>
        </div>
      </div>

      {/* Normal rows */}
      <div style={{ ...PANEL_ROW, borderBottom: '1px solid rgba(107,63,160,0.05)' }}>
        <span style={{ color: '#C4B5D9', whiteSpace: 'nowrap', minWidth: '82px' }}>14:00–22:00</span>
        <span style={{ color: '#C4B5D9', flex: 1 }}>Sarah K.</span>
        <span style={{ color: '#9CA3AF', fontSize: '10px' }}>✓ Confirmed</span>
      </div>
      <div style={{ ...PANEL_ROW }}>
        <span style={{ color: '#C4B5D9', whiteSpace: 'nowrap', minWidth: '82px' }}>22:00–06:00</span>
        <span style={{ color: '#C4B5D9', flex: 1 }}>Mike T.</span>
        <span style={{ color: '#9CA3AF', fontSize: '10px' }}>✓ Confirmed</span>
      </div>

      <div style={{ ...PANEL_FOOTER, borderTop: '1px solid rgba(244,162,97,0.14)', color: '#F4A261' }}>
        <span>↻ Coordinator: making calls · 47 min</span>
      </div>
    </div>
  )
}

// ─── FINANCIAL MINI PANEL ────────────────────────────────────────

function FinancialMiniPanel() {
  return (
    <div style={PANEL_WRAP}>
      <div style={PANEL_HEADER}>
        <span>AP / AR Queue</span>
        <span style={{ fontSize: '9px' }}>3 items</span>
      </div>

      {/* Normal rows */}
      <div style={{ ...PANEL_ROW, borderBottom: '1px solid rgba(107,63,160,0.05)' }}>
        <span style={{ color: '#C4B5D9', minWidth: '52px' }}>INV-480</span>
        <span style={{ color: '#C4B5D9', flex: 1, textAlign: 'right', paddingRight: '10px' }}>$2,100</span>
        <span style={{ color: '#9CA3AF', fontSize: '10px' }}>✓ Matched</span>
      </div>
      <div style={{ ...PANEL_ROW, borderBottom: '1px solid rgba(107,63,160,0.05)' }}>
        <span style={{ color: '#C4B5D9', minWidth: '52px' }}>INV-481</span>
        <span style={{ color: '#C4B5D9', flex: 1, textAlign: 'right', paddingRight: '10px' }}>$5,800</span>
        <span style={{ color: '#9CA3AF', fontSize: '10px' }}>✓ Matched</span>
      </div>

      {/* Flagged row */}
      <div style={{
        ...PANEL_ROW,
        background:   'rgba(244,162,97,0.09)',
        borderBottom: '1px solid rgba(244,162,97,0.14)',
      }}>
        <span style={{ color: '#D97706', fontWeight: 600, minWidth: '52px' }}>INV-482</span>
        <span style={{ color: '#C4B5D9', flex: 1, textAlign: 'right', paddingRight: '10px' }}>$4,280</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
            background: '#F4A261',
            animation: 'eyebrow-pulse 2s ease-in-out infinite',
          }} />
          <span style={{ color: '#F4A261', fontWeight: 600, fontSize: '10px', whiteSpace: 'nowrap' }}>
            SHORT PAY −$380
          </span>
        </div>
      </div>

      <div style={{ ...PANEL_FOOTER, borderTop: '1px solid rgba(244,162,97,0.14)', color: '#F4A261' }}>
        <span>● Day 4 · Manual cross-reference in progress</span>
      </div>
    </div>
  )
}

// ─── COMPLIANCE MINI PANEL ───────────────────────────────────────

function ComplianceMiniPanel() {
  return (
    <div style={PANEL_WRAP}>
      <div style={PANEL_HEADER}>
        <span>Provider Credentials</span>
        <span style={{ fontSize: '9px' }}>3 providers</span>
      </div>

      {/* Normal rows */}
      <div style={{ ...PANEL_ROW, borderBottom: '1px solid rgba(107,63,160,0.05)' }}>
        <span style={{ color: '#C4B5D9', minWidth: '72px' }}>Dr. Garcia</span>
        <span style={{ color: '#C4B5D9', flex: 1 }}>DEA Reg.</span>
        <span style={{ color: '#C4B5D9', marginRight: '8px', fontSize: '10px' }}>Mar 2027</span>
        <span style={{ color: '#9CA3AF', fontSize: '10px' }}>✓ Current</span>
      </div>
      <div style={{ ...PANEL_ROW, borderBottom: '1px solid rgba(107,63,160,0.05)' }}>
        <span style={{ color: '#C4B5D9', minWidth: '72px' }}>Dr. Chen</span>
        <span style={{ color: '#C4B5D9', flex: 1 }}>NPI</span>
        <span style={{ color: '#C4B5D9', marginRight: '8px', fontSize: '10px' }}>Jun 2026</span>
        <span style={{ color: '#9CA3AF', fontSize: '10px' }}>✓ Current</span>
      </div>

      {/* Expiring row */}
      <div style={{
        ...PANEL_ROW,
        background:   'rgba(230,57,70,0.06)',
        borderBottom: '1px solid rgba(230,57,70,0.12)',
      }}>
        <span style={{ color: '#E63946', fontWeight: 600, minWidth: '72px' }}>Dr. Patel</span>
        <span style={{ color: '#C4B5D9', flex: 1 }}>DEA Reg.</span>
        <span style={{ color: '#E63946', fontWeight: 600, marginRight: '8px', fontSize: '10px' }}>
          11 days
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
            background: '#E63946',
            animation: 'eyebrow-pulse 2s ease-in-out infinite',
          }} />
          <span style={{ color: '#E63946', fontWeight: 600, fontSize: '10px' }}>EXPIRING</span>
        </div>
      </div>

      <div style={{ ...PANEL_FOOTER, borderTop: '1px solid rgba(230,57,70,0.12)', color: '#E63946' }}>
        <span>● Renewal not initiated · Audit: next month</span>
      </div>
    </div>
  )
}

// ─── INCIDENT CARD ───────────────────────────────────────────────

function IncidentCard({
  tag, tagColor, tagBg, timestamp, incident, status, statusColor, panel, delay = 0,
}: IncidentCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                           transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="bg-white rounded-[14px] border border-[--border] overflow-hidden cursor-default"
      style={{ transition: 'transform 200ms ease-out, box-shadow 200ms ease-out' }}
      onMouseEnter={e => {
        const t = e.currentTarget
        t.style.transform = 'translateY(-3px)'
        t.style.boxShadow = '0 6px 24px rgba(107,63,160,0.08)'
      }}
      onMouseLeave={e => {
        const t = e.currentTarget
        t.style.transform = 'translateY(0)'
        t.style.boxShadow = 'none'
      }}
    >
      {/* ── Text section ── */}
      <div style={{ padding: '20px 20px 16px' }}>

        {/* Tag + Timestamp */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span
            className="inline-block text-[10px] font-semibold uppercase tracking-[0.07em] px-2 py-0.5 rounded-[4px]"
            style={{ color: tagColor, background: tagBg }}
          >
            {tag}
          </span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '10px', color: '#9CA3AF' }}>
            {timestamp}
          </span>
        </div>

        {/* Incident lines */}
        <div className="mb-3">
          {incident.map((line, i) => (
            <p key={i} className="text-[15px] font-semibold text-ink leading-snug font-ui">
              {line}
            </p>
          ))}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: statusColor }}
          />
          <span className="font-mono text-[11px]" style={{ color: statusColor }}>
            {status}
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div style={{ borderTop: '1px solid rgba(107,63,160,0.07)' }} />

      {/* ── Visual mini-panel ── */}
      <div style={{ padding: '14px' }}>
        {panel}
      </div>
    </div>
  )
}

// ─── ANIMATED HEADLINE ───────────────────────────────────────────

function AnimatedHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <h2
      ref={ref}
      className="font-display font-bold text-ink text-center mx-auto"
      style={{
        fontSize: 'clamp(28px, 4vw, 46px)',
        letterSpacing: '-0.035em',
        lineHeight: '1.05',
        maxWidth: '640px',
      }}
    >
      Most operational drag doesn&apos;t look like a crisis.
    </h2>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────

export default function TheProblem() {
  const subRef    = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const targets: { el: HTMLElement; delay: number }[] = [
      { el: subRef.current!,    delay: 0.1 },
      { el: bridgeRef.current!, delay: 0.2 },
    ].filter(t => t.el != null)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const observers: IntersectionObserver[] = []

    targets.forEach(({ el, delay }) => {
      if (prefersReduced) return

      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s,
                             transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            obs.disconnect()
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  return (
    <section className="section-padding bg-bg" style={{ paddingBottom: '100px' }}>
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Label */}
        <p className="text-label text-center mb-5">THE OPERATIONAL GAP</p>

        {/* Headline */}
        <AnimatedHeadline />

        {/* Sub-copy */}
        <div
          ref={subRef}
          className="text-center mx-auto mt-6 mb-14"
          style={{ maxWidth: '520px' }}
        >
          <p className="text-[16px] text-ink3 font-ui" style={{ lineHeight: '1.8' }}>
            A coordinator on the phone at 6am trying to fill one shift. An invoice in manual
            review for the fourth day running. A physician credential expiring in eleven days
            with nothing initiated. Not crises — just what operations costs when coordination
            still runs on calls, inboxes, and whoever notices first.
          </p>
        </div>

        {/* Three incident cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IncidentCard
            tag="WORKFORCE"
            tagColor="#0284C7"
            tagBg="rgba(2,132,199,0.07)"
            timestamp="06:03 AM — Thursday"
            incident={[
              'Amanda W. called in sick for the 7:00 shift.',
              'No backup scheduled. Coordinator making calls.',
            ]}
            status="Still unresolved — 47 minutes later"
            statusColor="#F4A261"
            panel={<WorkforceMiniPanel />}
            delay={0}
          />
          <IncidentCard
            tag="FINANCIAL"
            tagColor="#059669"
            tagBg="rgba(5,150,105,0.07)"
            timestamp="Day 4 in review queue"
            incident={[
              'Invoice INV-482 — short-pay unresolved.',
              'AR team is manually cross-referencing the contract.',
            ]}
            status="Awaiting manual resolution"
            statusColor="#F4A261"
            panel={<FinancialMiniPanel />}
            delay={0.08}
          />
          <IncidentCard
            tag="COMPLIANCE"
            tagColor="#7C3AED"
            tagBg="rgba(124,58,237,0.07)"
            timestamp="11 days to expiry"
            incident={[
              'Dr. Patel — DEA Registration.',
              'Renewal not initiated. Audit next month.',
            ]}
            status="No action taken"
            statusColor="#E63946"
            panel={<ComplianceMiniPanel />}
            delay={0.16}
          />
        </div>

        {/* Bridge line */}
        <p
          ref={bridgeRef}
          className="text-center mx-auto mt-10 text-[15px] text-ink4 font-ui"
          style={{ maxWidth: '460px', lineHeight: '1.7' }}
        >
          Multiply this across a hundred shifts, a thousand invoices, and a compliance calendar that nobody owns — and the cost becomes structural.
        </p>

      </div>
    </section>
  )
}
