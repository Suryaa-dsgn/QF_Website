'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { AgentCardData } from '@/data/agentCards'
import AgentVisualRenderer from './AgentVisualRenderer'

interface AgentCardProps {
  agent: AgentCardData
  className?: string
}

const AgentCard = forwardRef<HTMLDivElement, AgentCardProps>(
  ({ agent, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group rounded-[20px] overflow-hidden border border-[rgba(107,63,160,0.08)] bg-white',
          className
        )}
        style={{
          transition: 'transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out',
        }}
        onMouseEnter={e => {
          const t = e.currentTarget
          t.style.transform = 'translateY(-5px)'
          t.style.boxShadow = '0 16px 48px rgba(107,63,160,0.10)'
          t.style.borderColor = 'rgba(107,63,160,0.18)'
        }}
        onMouseLeave={e => {
          const t = e.currentTarget
          t.style.transform = 'translateY(0)'
          t.style.boxShadow = 'none'
          t.style.borderColor = 'rgba(107,63,160,0.08)'
        }}
      >
        {/* ── TOP HALF — visual area ─────────────────────────────── */}
        <div
          className="flex items-center justify-center relative overflow-hidden"
          style={{
            height: '260px',
            background: 'rgba(107,63,160,0.04)',
          }}
        >
          {/* Sequence watermark — top-left */}
          <span
            className="absolute top-4 left-5 font-mono text-[11px]"
            style={{ color: 'rgba(107,63,160,0.2)' }}
          >
            {agent.sequence}
          </span>

          {/* Animated visual */}
          <AgentVisualRenderer visual={agent.visual} />
        </div>

        {/* ── BOTTOM HALF — content ─────────────────────────────── */}
        <div
          className="px-6 py-5"
          style={{ borderTop: '1px solid rgba(107,63,160,0.07)' }}
        >
          {/* Category pill — dynamic colour per category */}
          <span
            className="inline-block text-[10px] font-semibold font-ui uppercase tracking-[0.06em] px-2.5 py-0.5 rounded-full mb-2"
            style={{
              color: agent.categoryColor,
              background: agent.categoryBg,
              border: `1px solid ${agent.categoryBorder}`,
            }}
          >
            {agent.category}
          </span>

          {/* Agent name */}
          <h3
            className="font-ui font-bold text-ink leading-snug mb-3"
            style={{ fontSize: '16px', letterSpacing: '-0.01em' }}
          >
            {agent.name}
          </h3>

          {/* 2 bullets */}
          <ul className="flex flex-col gap-1.5 mb-4">
            {agent.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2">
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: '#6B3FA0', marginTop: '7px' }}
                />
                <span
                  className="font-ui text-ink3 leading-snug"
                  style={{ fontSize: '13px' }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom row — outcome tag + arrow link */}
          <div className="flex items-center justify-between">
            {/* Outcome tag */}
            <span
              className="font-mono text-[10px] font-medium px-2 py-1 rounded-[5px]"
              style={{
                color: '#6B3FA0',
                background: 'rgba(107,63,160,0.07)',
                border: '1px solid rgba(107,63,160,0.12)',
              }}
            >
              {agent.outcome}
            </span>

            {/* Arrow circle — the card's navigation target */}
            <Link
              href={`/agents/${agent.slug}`}
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: '28px',
                height: '28px',
                background: 'rgba(107,63,160,0.08)',
                border: '1px solid rgba(107,63,160,0.15)',
                color: '#6B3FA0',
                transition: 'background 200ms ease, transform 200ms ease',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(107,63,160,0.16)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(107,63,160,0.08)'
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2.5 6.5H10.5M10.5 6.5L7.5 3.5M10.5 6.5L7.5 9.5"
                  stroke="#6B3FA0"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }
)

AgentCard.displayName = 'AgentCard'
export default AgentCard
