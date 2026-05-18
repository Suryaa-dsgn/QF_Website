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
  delay?: number
}

// ─── INCIDENT CARD ───────────────────────────────────────────────

function IncidentCard({
  tag, tagColor, tagBg, timestamp, incident, status, statusColor, delay = 0,
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
      className="bg-white rounded-[14px] p-6 border border-[--border] cursor-default"
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
      {/* Tag */}
      <span
        className="inline-block text-[10px] font-semibold uppercase tracking-[0.07em] px-2 py-0.5 rounded-[4px] mb-3"
        style={{ color: tagColor, background: tagBg }}
      >
        {tag}
      </span>

      {/* Timestamp */}
      <p className="font-mono text-[11px] text-ink4 mb-2">{timestamp}</p>

      {/* Incident lines */}
      <div className="mb-4 mt-2">
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

  // Animate sub-copy and bridge line — fixed: each gets its own observer,
  // all observers collected and disconnected together in cleanup
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
    <section className="section-padding bg-bg">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Label */}
        <p className="text-label text-center mb-5">THE OPERATIONAL GAP</p>

        {/* Headline — flat, no colour accent (intentional) */}
        <AnimatedHeadline />

        {/* Sub-copy — two paragraphs, line breaks hidden on mobile */}
        <div
          ref={subRef}
          className="text-center mx-auto mt-6 mb-14"
          style={{ maxWidth: '500px' }}
        >
          <p className="text-[16px] text-ink3 font-ui" style={{ lineHeight: '1.75' }}>
            It looks like your coordinator on hold at 6:03am.
            <br className="hidden sm:block" />
            An invoice sitting in manual review for four days.
            <br className="hidden sm:block" />
            A credential renewal that almost slipped through.
          </p>
          <p className="text-[16px] text-ink3 font-ui mt-4" style={{ lineHeight: '1.75' }}>
            None of it is failing. It&apos;s just costing more than it should,
            every single day.
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
            delay={0.16}
          />
        </div>

        {/* Bridge line */}
        <p
          ref={bridgeRef}
          className="text-center mx-auto mt-10 text-[15px] text-ink4 font-ui"
          style={{ maxWidth: '460px', lineHeight: '1.7' }}
        >
          None of these are emergencies. But they happen every day.
          And across a workforce or a receivables stack, they add up fast.
        </p>

      </div>
    </section>
  )
}
