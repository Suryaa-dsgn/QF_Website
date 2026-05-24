'use client'

import { useEffect, useRef, useCallback } from 'react'
import { workforceAgents } from '@/data/agents'
import AgentPanelRenderer from './AgentPanelRenderer'
import AgentStoryContent from './AgentStoryContent'

interface AgentScrollContentProps {
  onAgentInView: (index: number) => void
}

export default function AgentScrollContent({ onAgentInView }: AgentScrollContentProps) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const setSectionRef = useCallback((el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el
  }, [])

  useEffect(() => {
    const sections = sectionRefs.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-agent-index') || '0')
            onAgentInView(index)
          }
        })
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    )

    sections.forEach(section => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [onAgentInView])

  return (
    <div
      className="flex-1 min-w-0"
      style={{ paddingLeft: '60px' }}
    >
      {workforceAgents.map((agent, index) => (
        <div key={agent.slug}>
          {/* Agent section */}
          <section
            id={`agent-${agent.slug}`}
            data-agent-index={index}
            ref={(el) => setSectionRef(el, index)}
            className="min-h-screen py-16"
          >
            {/* Prototype card */}
            <div className="mb-12">
              <div
                className="w-full rounded-[16px] overflow-hidden bg-white"
                style={{
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-2)',
                  height: '440px',
                }}
              >
                <div className="browser-chrome">
                  <div className="browser-dots">
                    <div className="browser-dot dot-red" />
                    <div className="browser-dot dot-yellow" />
                    <div className="browser-dot dot-green" />
                  </div>
                  <div className="browser-url">
                    app.quickflows.ai / {agent.slug}
                  </div>
                </div>
                <div className="overflow-hidden" style={{ height: 'calc(100% - 36px)' }}>
                  <AgentPanelRenderer panelType={agent.panelType} />
                </div>
              </div>
            </div>

            {/* Story content */}
            <div style={{ maxWidth: '560px' }}>
              <AgentStoryContent agent={agent} index={index} />
            </div>
          </section>

          {/* Divider between agents (not after the last one) */}
          {index < workforceAgents.length - 1 && (
            <div
              className="flex items-center gap-4 py-4"
              aria-hidden="true"
            >
              <div className="flex-1 h-px bg-[rgba(107,63,160,0.06)]" />
              <span className="font-mono text-[10px] text-ink4 flex-shrink-0">
                {String(index + 2).padStart(2, '0')} ↓
              </span>
              <div className="flex-1 h-px bg-[rgba(107,63,160,0.06)]" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
