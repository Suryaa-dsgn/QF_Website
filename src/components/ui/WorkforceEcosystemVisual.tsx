'use client'

import { useState, useEffect } from 'react'

const ecosystemRows = [
  {
    name: 'Burnout Prevention',
    category: 'MONITORING',
    actions: ['Scanning overtime patterns', 'Flagging high-risk staff', 'Monitoring 48 staff'],
  },
  {
    name: 'StaffAssist',
    category: 'SELF-SERVICE',
    actions: ['Answering shift query', 'Processing swap request', 'Showing open shifts'],
  },
  {
    name: 'Scheduler Assist',
    category: 'SCHEDULING',
    actions: ['Identifying coverage gap', 'Generating schedule', 'Scoring 34 staff'],
  },
  {
    name: 'Visit Verification',
    category: 'COMPLIANCE',
    actions: ['Validating GPS timestamp', 'Flagging shortened visit', 'Syncing to billing'],
  },
  {
    name: 'Auto Approval',
    category: 'APPROVALS',
    actions: ['Checking compliance rules', 'Auto-approving request', 'Escalating exception'],
  },
  {
    name: 'Auto Swap',
    category: 'SHIFT OPS',
    actions: ['Matching shift gap', 'Confirming certification', 'Notifying both parties'],
  },
  {
    name: 'Physician Credentialing',
    category: 'CREDENTIALING',
    actions: ['Tracking 48 providers', 'Sending renewal reminder', 'Verifying DEA registration'],
  },
]

export default function WorkforceEcosystemVisual() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [actionIndices, setActionIndices] = useState(ecosystemRows.map(() => 0))
  // Used as animation key to re-trigger fade-in on action change
  const [actionKeys, setActionKeys] = useState(ecosystemRows.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % ecosystemRows.length
        setActionIndices(ai => {
          const updated = [...ai]
          updated[next] = (ai[next] + 1) % ecosystemRows[next].actions.length
          return updated
        })
        setActionKeys(ak => {
          const updated = [...ak]
          updated[next] = ak[next] + 1
          return updated
        })
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-full font-ui"
      style={{
        maxWidth: '480px',
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-2)',
        overflow: 'hidden',
      }}
    >
      {/* Browser chrome */}
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red" />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green" />
        </div>
        <div className="browser-url">app.quickflows.ai / workforce</div>
      </div>

      {/* Agent rows */}
      <div style={{ padding: '16px 24px' }}>
        {ecosystemRows.map((row, i) => {
          const isActive = i === activeIndex
          const isLast = i === ecosystemRows.length - 1

          return (
            <div
              key={row.name}
              style={{
                padding: '9px 0',
                borderBottom: isLast ? 'none' : '1px solid #F3F3F3',
              }}
            >
              {/* Row top: dot + name + category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                {/* Status dot */}
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: isActive ? '#16A34A' : '#D1D5DB',
                    transition: 'background 400ms ease',
                    animation: isActive ? 'agent-dot-pulse 1.5s ease-in-out infinite' : 'none',
                  }}
                />

                {/* Agent name */}
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#0A0A0A' : '#6B7280',
                    transition: 'color 300ms ease, font-weight 300ms ease',
                  }}
                >
                  {row.name}
                </span>

                {/* Category pill */}
                <span
                  style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-geist-mono), monospace',
                    letterSpacing: '0.05em',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: isActive ? 'rgba(107,63,160,0.08)' : 'rgba(0,0,0,0.04)',
                    color: isActive ? '#6B3FA0' : '#A0A0A0',
                    transition: 'all 300ms ease',
                    flexShrink: 0,
                  }}
                >
                  {row.category}
                </span>
              </div>

              {/* Action text */}
              <div style={{ paddingLeft: '14px' }}>
                <span
                  key={actionKeys[i]}
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-geist-mono), monospace',
                    color: isActive ? '#6B3FA0' : '#A0A0A0',
                    transition: 'color 300ms ease',
                    animation: isActive ? 'action-fade-in 300ms ease forwards' : 'none',
                  }}
                >
                  {row.actions[actionIndices[i]]}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
