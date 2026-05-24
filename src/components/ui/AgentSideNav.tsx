'use client'

import { cn } from '@/lib/utils'
import { workforceAgents } from '@/data/agents'

interface AgentSideNavProps {
  activeIndex: number
  onAgentClick: (index: number) => void
}

export default function AgentSideNav({ activeIndex, onAgentClick }: AgentSideNavProps) {
  return (
    <div
      className="flex flex-col"
      style={{
        width: '260px',
        flexShrink: 0,
        position: 'sticky',
        top: '80px',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } as React.CSSProperties}
    >
      {/* Section label */}
      <p className="text-label mb-5" style={{ paddingLeft: '14px' }}>
        Workforce Agents
      </p>

      {/* Agent list */}
      <div className="flex flex-col gap-0.5">
        {workforceAgents.map((agent, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={agent.slug}
              onClick={() => onAgentClick(index)}
              className={cn(
                'flex items-start gap-3 px-3 py-2.5 rounded-[8px] text-left w-full',
                'border-l-2 transition-all duration-[250ms]',
                isActive
                  ? 'border-brand bg-[rgba(107,63,160,0.04)]'
                  : 'border-transparent hover:border-[rgba(107,63,160,0.2)] hover:bg-[rgba(107,63,160,0.02)]'
              )}
            >
              {/* Agent number */}
              <span
                className={cn(
                  'font-mono text-[11px] flex-shrink-0 mt-0.5 w-6',
                  isActive ? 'text-brand' : 'text-[#C4B5FD]'
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Agent name + category */}
              <div>
                <p
                  className={cn(
                    'text-[14px] leading-none mb-1 transition-all duration-200',
                    isActive
                      ? 'text-ink font-semibold'
                      : 'text-ink4 font-medium'
                  )}
                >
                  {agent.name}
                </p>

                {/* Category — only visible when active */}
                <p
                  className={cn(
                    'text-[10px] uppercase tracking-[0.06em] font-semibold font-ui transition-all duration-200',
                    isActive
                      ? 'text-brand opacity-100'
                      : 'opacity-0'
                  )}
                >
                  {agent.category}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Progress indicator at bottom */}
      <div className="mt-auto pt-6 px-4">
        <div className="flex gap-1">
          {workforceAgents.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-0.5 flex-1 rounded-full transition-all duration-300',
                i === activeIndex ? 'bg-brand' : 'bg-[rgba(107,63,160,0.15)]'
              )}
            />
          ))}
        </div>
        <p className="text-[11px] font-mono text-ink4 mt-2">
          {activeIndex + 1} / {workforceAgents.length}
        </p>
      </div>
    </div>
  )
}
