'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { workforceAgents } from '@/data/agents'
import { cn } from '@/lib/utils'

// Import each agent's panel component
import BurnoutPanel      from '@/components/ui/panels/BurnoutPanel'
import StaffAssistPanel  from '@/components/ui/panels/StaffAssistPanel'
import SchedulerPanel    from '@/components/ui/panels/SchedulerPanel'
import EVVPanel          from '@/components/ui/panels/EVVPanel'
import AutoApprovalPanel from '@/components/ui/panels/AutoApprovalPanel'
import AutoSwapPanel     from '@/components/ui/panels/AutoSwapPanel'
import CredentialingPanel from '@/components/ui/panels/CredentialingPanel'

// Map slug → panel component
const panelComponents: Record<string, React.ComponentType> = {
  'staff-burnout-prevention': BurnoutPanel,
  'staffassist':              StaffAssistPanel,
  'scheduler-assist':         SchedulerPanel,
  'visit-verification':       EVVPanel,
  'auto-approval':            AutoApprovalPanel,
  'auto-swap':                AutoSwapPanel,
  'physician-credentialing':  CredentialingPanel,
}

// ─── AGENT DETAIL (active state) ─────────────────────────────────

function AgentDetail({ agent }: { agent: typeof workforceAgents[0] }) {
  return (
    <div className="py-6">

      {/* Category tag */}
      <p className="text-label text-brand mb-3">{agent.category}</p>

      {/* Headline */}
      <h3
        className="font-display font-bold text-ink mb-2 leading-tight"
        style={{ fontSize: 'clamp(20px, 2vw, 26px)', letterSpacing: '-0.03em' }}
      >
        {agent.headline}
      </h3>

      {/* Tagline */}
      <p className="text-[16px] text-ink3 font-ui mb-4 leading-snug">{agent.tagline}</p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2 mb-5">
        {agent.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={10} className="text-[#065F46]" strokeWidth={3} />
            </div>
            <span className="text-[14px] text-ink3 font-ui leading-snug">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Outcome pill */}
      <div className="inline-flex items-center gap-2 bg-[#6B3FA0] text-white text-[12px] font-medium px-3 py-1.5 rounded-[6px] font-ui mb-4">
        <span className="text-white/70">↗</span>
        {agent.outcome}
      </div>

      {/* Learn more link */}
      <div>
        <Link
          href={`/agents/${agent.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:gap-2.5 transition-all duration-150 font-ui group"
        >
          Learn more
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-150" />
        </Link>
      </div>

    </div>
  )
}

// ─── DESKTOP STICKY SCROLL ────────────────────────────────────────

function DesktopSticky() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((el, index) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index)
          }
        },
        {
          // Fire when item is in the middle 20% band of the viewport
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const ActivePanelComponent = panelComponents[workforceAgents[activeIndex].slug]

  return (
    <div className="relative">
      {/* Grid: left agent list (45%) + right panel (55%) */}
      <div className="grid lg:grid-cols-[45fr_55fr] gap-16 items-start max-w-[1120px] mx-auto px-10">

        {/* ── LEFT: Scrollable agent list ── */}
        <div>
          {workforceAgents.map((agent, index) => (
            <div
              key={agent.slug}
              ref={el => { itemRefs.current[index] = el }}
              className={cn(
                'border-b border-[--border] transition-all duration-300',
                index === activeIndex ? 'opacity-100' : 'opacity-35'
              )}
              style={{ minHeight: '280px' }}
            >
              {index === activeIndex ? (
                <AgentDetail agent={agent} />
              ) : (
                <button
                  className="w-full text-left py-5 text-[16px] font-semibold text-ink3 font-ui flex items-center justify-between"
                  onClick={() => {
                    itemRefs.current[index]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                  }}
                >
                  {agent.name}
                  <span className="text-label text-brand/60">{agent.category}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* ── RIGHT: Sticky cross-fading panel ── */}
        <div className="hidden lg:block" style={{ position: 'sticky', top: '100px' }}>

          {/* Panel with cross-fade transition */}
          <div className="relative" style={{ height: '480px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={workforceAgents[activeIndex].slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div
                  className="w-full h-full bg-white border border-[--border] rounded-[16px] overflow-hidden flex flex-col"
                  style={{ boxShadow: 'var(--shadow-2)' }}
                >
                  {/* Browser chrome */}
                  <div className="browser-chrome flex-shrink-0">
                    <div className="browser-dots">
                      <div className="browser-dot dot-red" />
                      <div className="browser-dot dot-yellow" />
                      <div className="browser-dot dot-green" />
                    </div>
                    <div className="browser-url">
                      app.quickflows.ai / {workforceAgents[activeIndex].slug}
                    </div>
                  </div>
                  {/* Panel content */}
                  <div className="flex-1 overflow-hidden">
                    <ActivePanelComponent />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {workforceAgents.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === activeIndex
                    ? 'w-4 h-1.5 bg-brand'
                    : 'w-1.5 h-1.5 bg-ink4/30'
                )}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── MOBILE STACKED CARDS ─────────────────────────────────────────

function MobileStacked() {
  return (
    <div className="flex flex-col divide-y divide-[--border] max-w-[1120px] mx-auto px-6">
      {workforceAgents.map((agent) => {
        const PanelComponent = panelComponents[agent.slug]
        return (
          <div key={agent.slug} className="py-12">
            {/* Panel on top */}
            <div
              className="w-full rounded-[12px] overflow-hidden border border-[--border] mb-8 flex flex-col"
              style={{ height: '280px', boxShadow: 'var(--shadow-1)' }}
            >
              <div className="browser-chrome flex-shrink-0">
                <div className="browser-dots">
                  <div className="browser-dot dot-red" />
                  <div className="browser-dot dot-yellow" />
                  <div className="browser-dot dot-green" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <PanelComponent />
              </div>
            </div>
            {/* Copy below */}
            <AgentDetail agent={agent} />
          </div>
        )
      })}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function WorkforceAgents() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section className="section-padding">

      {/* Section header */}
      <div className="text-center max-w-[640px] mx-auto px-10 mb-16">
        <p className="text-label mb-4">WORKFORCE OPERATIONS</p>
        <h2
          className="font-display font-bold text-ink mb-5"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em', lineHeight: '1.05' }}
        >
          Seven agents. One workforce{' '}
          <span className="italic text-brand">that runs itself.</span>
        </h2>
        <p className="text-[16px] text-ink3 font-ui leading-relaxed max-w-[480px] mx-auto mb-8">
          From the 6am callout to the last shift of the month — Quickflows handles
          your workforce operations.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/demo" className="btn-base btn-primary">Talk to an Expert</Link>
          <Link href="/workforce" className="btn-base btn-ghost group">
            See all agents
            <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
          </Link>
        </div>
      </div>

      {/* Agent content — sticky scroll on desktop, stacked on mobile */}
      {isMobile ? <MobileStacked /> : <DesktopSticky />}

    </section>
  )
}
