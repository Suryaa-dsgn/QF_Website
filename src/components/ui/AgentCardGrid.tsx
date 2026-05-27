'use client'

import { useEffect, useRef, forwardRef } from 'react'
import Link from 'next/link'
import { agentCardsData } from '@/data/agentCards'
import AgentCard from './AgentCard'

// ── CTA card — 8th grid position ────────────────────────────────
const CTACard = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="rounded-[20px] border border-[rgba(107,63,160,0.10)] flex flex-col items-center justify-center text-center px-8 py-12"
      style={{ background: 'rgba(107,63,160,0.03)', minHeight: '100%' }}
    >
      <span
        className="text-[10px] font-semibold font-ui uppercase tracking-[0.07em] mb-4 inline-block rounded-full px-[10px] py-[2px]"
        style={{
          color: '#059669',
          background: 'rgba(5,150,105,0.08)',
          border: '1px solid rgba(5,150,105,0.15)',
        }}
      >
        Financial Operations
      </span>
      <h3
        className="font-display font-bold text-ink mb-3"
        style={{ fontSize: '20px', letterSpacing: '-0.025em', lineHeight: '1.2' }}
      >
        Looking for financial automation?
      </h3>
      <p className="text-[13px] text-ink3 font-ui mb-6 leading-snug max-w-[200px]">
        Four agents across AP/AR, collections, and contract compliance.
      </p>
      <Link
        href="/agents"
        className="btn-base btn-primary"
        style={{ fontSize: '14px', padding: '10px 20px' }}
      >
        Explore Financial →
      </Link>
    </div>
  )
})
CTACard.displayName = 'CTACard'

// ── Main card grid ───────────────────────────────────────────────
export function AgentCardGrid() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    cardRefs.current.forEach((card, i) => {
      if (!card) return

      if (prefersReduced) {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
        return
      }

      card.style.opacity = '0'
      card.style.transform = 'translateY(40px)'
      card.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`

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
      {/* 7 agent cards — refs passed directly via forwardRef */}
      {agentCardsData.map((agent, i) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          ref={(el) => { cardRefs.current[i] = el }}
        />
      ))}

      {/* 8th position — CTA card */}
      <CTACard ref={(el) => { cardRefs.current[7] = el }} />
    </div>
  )
}
