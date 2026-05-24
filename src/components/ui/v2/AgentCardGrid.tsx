'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { agentCardsData } from '@/data/agentCardsV2'
import AgentCardV2 from './AgentCardV2'

// ── CTA card — 8th grid position ────────────────────────────────
function CTACard() {
  return (
    <div
      className="h-full rounded-[20px] overflow-hidden border border-[rgba(107,63,160,0.12)]
        flex flex-col items-center justify-center text-center"
      style={{
        background: 'rgba(107,63,160,0.04)',
        padding: '40px 32px',
        minHeight: '300px',
      }}
    >
      <p className="text-label mb-4">FINANCIAL OPERATIONS</p>
      <h3
        className="font-display font-bold text-ink mb-3"
        style={{ fontSize: '22px', letterSpacing: '-0.025em', lineHeight: '1.2' }}
      >
        Looking for financial automation?
      </h3>
      <p className="text-[14px] text-ink3 font-ui mb-6 leading-snug" style={{ maxWidth: '220px' }}>
        Four agents across AP/AR, collections, and contract compliance.
      </p>
      <Link href="/agents" className="btn-base btn-primary text-[14px]">
        Explore Financial →
      </Link>
    </div>
  )
}

// ── Main card grid ───────────────────────────────────────────────
export function AgentCardGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardRefs.current
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    cards.forEach((card, i) => {
      if (!card || prefersReduced) return

      card.style.opacity = '0'
      card.style.transform = 'translateY(40px)'
      card.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(card)
    })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
      {/* 7 agent cards */}
      {agentCardsData.map((agent, i) => (
        <div
          key={agent.slug}
          ref={(el) => { cardRefs.current[i] = el }}
          className="h-full"
        >
          <AgentCardV2 agent={agent} />
        </div>
      ))}

      {/* 8th position — CTA card */}
      <div
        ref={(el) => { cardRefs.current[7] = el }}
        className="h-full"
      >
        <CTACard />
      </div>
    </div>
  )
}
