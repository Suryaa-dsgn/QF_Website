'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { workforceAgents } from '@/data/agents'
import WorkforceEcosystemVisual from '@/components/ui/WorkforceEcosystemVisual'
import AgentSideNav from '@/components/ui/AgentSideNav'
import AgentScrollContent from '@/components/ui/AgentScrollContent'
import BookDemoButton from '@/components/BookDemoButton'
import Link from 'next/link'

export default function WorkforcePage() {
  const [activeAgentIndex, setActiveAgentIndex] = useState(0)

  const handleAgentInView = useCallback((index: number) => {
    setActiveAgentIndex(index)
  }, [])

  const handleAgentClick = useCallback((index: number) => {
    setActiveAgentIndex(index)
    const target = document.getElementById(`agent-${workforceAgents[index].slug}`)
    if (target) {
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.scrollTo(target, { offset: -100, duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  return (
    <>
      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section
        className="flex items-center"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — copy */}
            <div>
              {/* Section pill */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
                style={{
                  background: 'rgba(2,132,199,0.08)',
                  border: '1px solid rgba(2,132,199,0.15)',
                }}
              >
                <span
                  className="text-[11px] font-semibold font-ui uppercase tracking-[0.06em]"
                  style={{ color: '#0284C7' }}
                >
                  Workforce Operations
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-display font-bold text-ink"
                style={{
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  letterSpacing: '-0.04em',
                  lineHeight: '1.0',
                }}
              >
                Seven agents.<br />
                One workforce<br />
                that runs itself.
              </h1>

              {/* Subhead */}
              <p
                className="text-[16px] text-ink3 font-ui mt-5 leading-[1.65]"
                style={{ maxWidth: '400px' }}
              >
                From the 6am callout to the last shift of the month.
                Every shift, credential, and approval — handled.
              </p>

              {/* Agent count */}
              <p
                className="font-mono text-[13px] mt-7"
                style={{ color: '#A0A0A0' }}
              >
                7 agents across shift coverage, credentialing, and workforce compliance.
              </p>

              {/* CTAs */}
              <div className="flex items-center gap-3 mt-8 flex-wrap">
                <BookDemoButton className="btn-base btn-primary text-[15px]">
                  Book a demo
                </BookDemoButton>
                <Link href="/agents" className="btn-base btn-ghost text-[14px]">
                  Explore Financial <span className="arrow-icon">→</span>
                </Link>
              </div>
            </div>

            {/* Right — ecosystem visual */}
            <div className="flex justify-center lg:justify-end">
              <WorkforceEcosystemVisual />
            </div>

          </div>
        </div>
      </section>

      {/* ── STICKY SCROLL SECTION ─────────────────────────────────── */}
      <section className="py-24">

        {/* Mobile chip nav (hidden on desktop) */}
        <div className="lg:hidden sticky top-[60px] z-30 bg-[#F9F8FF]/90 backdrop-blur-sm border-b border-[--border] px-6 py-3 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {workforceAgents.map((agent, i) => (
              <button
                key={agent.slug}
                onClick={() => handleAgentClick(i)}
                className={cn(
                  'flex-shrink-0 text-[12px] font-medium px-3 py-1.5 rounded-[6px] font-ui transition-colors',
                  i === activeAgentIndex
                    ? 'bg-brand text-white'
                    : 'bg-white border border-[--border] text-ink3'
                )}
              >
                {String(i + 1).padStart(2, '0')} {agent.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop two-column layout */}
        <div className="max-w-[1120px] mx-auto px-10 flex items-start">

          {/* Left panel — sticky nav (desktop only) */}
          <div className="hidden lg:contents">
            <AgentSideNav
              activeIndex={activeAgentIndex}
              onAgentClick={handleAgentClick}
            />
          </div>

          {/* Right panel — scrolling content */}
          <AgentScrollContent onAgentInView={handleAgentInView} />

        </div>
      </section>
    </>
  )
}
