import Link from 'next/link'
import { AgentCardData } from '@/data/agentCards'
import AgentVisualRenderer from './AgentVisualRenderer'

interface AgentCardProps {
  agent: AgentCardData
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="group block h-full rounded-[20px] overflow-hidden border border-[rgba(107,63,160,0.08)] bg-white no-underline
        transition-[transform,box-shadow,border-color] duration-[250ms] ease-out
        hover:-translate-y-[5px] hover:shadow-[0_16px_48px_rgba(107,63,160,0.10)] hover:border-[rgba(107,63,160,0.16)]"
    >
      {/* ── TOP HALF — illustration area ─────────────────────── */}
      <div
        className="flex items-center justify-center p-7 overflow-hidden"
        style={{
          height: '260px',
          background: 'rgba(107,63,160,0.04)',
        }}
      >
        <AgentVisualRenderer visual={agent.visual} />
      </div>

      {/* ── BOTTOM HALF — content ─────────────────────────────── */}
      <div
        className="px-6"
        style={{
          paddingTop: '22px',
          paddingBottom: '24px',
          background: '#FFFFFF',
          borderTop: '1px solid rgba(107,63,160,0.07)',
        }}
      >
        {/* Category pill */}
        <div
          className="inline-flex items-center text-[10px] font-semibold font-ui uppercase tracking-[0.06em] rounded-full"
          style={{
            color: '#0284C7',
            background: 'rgba(2,132,199,0.08)',
            border: '1px solid rgba(2,132,199,0.14)',
            padding: '2px 9px',
          }}
        >
          {agent.category}
        </div>

        {/* Agent name */}
        <h3
          className="font-ui font-bold text-ink leading-[1.2] mt-2"
          style={{ fontSize: '16px', letterSpacing: '-0.01em' }}
        >
          {agent.name}
        </h3>

        {/* 2 bullets */}
        <ul className="flex flex-col gap-1 mt-[10px]">
          {agent.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2">
              <div
                className="w-1 h-1 rounded-full bg-brand flex-shrink-0"
                style={{ marginTop: '6px' }}
              />
              <span className="text-[13px] font-ui text-ink3 leading-[1.4] line-clamp-1">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom row — outcome tag + arrow */}
        <div className="flex items-center justify-between mt-4">
          {/* Outcome tag */}
          <div
            className="inline-flex items-center font-mono font-medium text-[10px] rounded-[6px]"
            style={{
              color: '#6B3FA0',
              background: 'rgba(107,63,160,0.07)',
              border: '1px solid rgba(107,63,160,0.12)',
              padding: '3px 8px',
            }}
          >
            {agent.outcome}
          </div>

          {/* Arrow circle */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
              group-hover:bg-[rgba(107,63,160,0.15)] transition-colors duration-[250ms]"
            style={{
              background: 'rgba(107,63,160,0.08)',
              border: '1px solid rgba(107,63,160,0.15)',
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-[250ms]"
            >
              <path
                d="M2.5 6.5H10.5M10.5 6.5L7.5 3.5M10.5 6.5L7.5 9.5"
                stroke="#6B3FA0"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
