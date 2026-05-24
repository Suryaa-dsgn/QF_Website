'use client'

import { Agent } from '@/data/agents'
import { agentStories } from '@/data/agentStories'

interface AgentStoryContentProps {
  agent: Agent
  index: number
}

export default function AgentStoryContent({ agent, index }: AgentStoryContentProps) {
  const story = agentStories[agent.slug]
  if (!story) return null

  return (
    <div>
      {/* Agent number + category */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[11px] text-brand bg-[rgba(107,63,160,0.08)] px-2 py-0.5 rounded-[4px]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-label">{agent.category}</span>
      </div>

      {/* The Moment — narrative headline */}
      <h3
        className="font-display font-bold text-ink mb-4"
        style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.03em', lineHeight: '1.15' }}
      >
        {story.moment}
      </h3>

      {/* Narrative paragraph */}
      <p
        className="text-[15px] text-ink3 font-ui leading-[1.7] mb-6"
        style={{ maxWidth: '500px' }}
      >
        {story.narrative}
      </p>

      {/* 3 action bullets */}
      <ul className="flex flex-col gap-2.5 mb-6">
        {story.actions.map((action, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path
                  d="M1 4L3 6L7 2"
                  stroke="#065F46"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-[14px] text-ink3 font-ui leading-snug">{action}</span>
          </li>
        ))}
      </ul>

      {/* Outcome pill */}
      <div
        className="inline-flex items-center gap-2 text-[12px] font-medium font-ui px-3 py-1.5 rounded-[6px] mb-5"
        style={{ background: '#6B3FA0', color: '#FFFFFF' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>↗</span>
        {story.outcome}
      </div>

      {/* Learn more link */}
      <div>
        <a
          href={`/agents/${agent.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand font-ui group"
        >
          Full agent detail
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="group-hover:translate-x-1 transition-transform duration-150"
          >
            <path
              d="M2 6H10M10 6L7 3M10 6L7 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
