'use client'

import { useState, useEffect } from 'react'

// Chat-style interface showing a conversation with StaffAssist

const messages = [
  { role: 'staff', text: 'Can I request PTO for April 12th?' },
  { role: 'agent', text: "Checking your balance... ✓\nYou have 3 days available. April 12 is a Thursday — 1 other RN already off. Shall I submit?" },
  { role: 'staff', text: 'Yes please' },
  { role: 'agent', text: "Done ✓ Request submitted. You'll hear back within 2 hours." },
]

export default function StaffAssistPanel() {
  const [visibleCount, setVisibleCount] = useState(0)

  // Reveal messages one by one — like a real chat loading
  useEffect(() => {
    if (visibleCount < messages.length) {
      const t = setTimeout(() => setVisibleCount(v => v + 1), 800)
      return () => clearTimeout(t)
    }
  }, [visibleCount])

  return (
    <div className="flex flex-col h-full font-ui">

      {/* Chat header */}
      <div className="px-4 py-3 border-b border-[#F3F3F3] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-[--brand-08] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C8 2 13 5.5 13 9.5C13 12.5 10.8 14.5 8 14.5" stroke="#6B3FA0" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="2" fill="#6B3FA0"/>
          </svg>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-ink leading-none">StaffAssist</p>
          <p className="text-[10px] text-[#16A34A] flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2.5 overflow-hidden">
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'staff' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[75%] rounded-[10px] px-3 py-2 text-[12px] leading-snug whitespace-pre-line"
              style={
                msg.role === 'staff'
                  ? { background: '#6B3FA0', color: '#fff' }
                  : { background: 'rgba(107,63,160,0.06)', color: '#0A0A0A' }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-[#F3F3F3]">
        <div className="flex items-center gap-2 bg-[#F9F8FF] border border-[--border] rounded-[8px] px-3 py-2">
          <span className="text-[12px] text-ink4 flex-1">Ask StaffAssist...</span>
          <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 4H7M7 4L4.5 1.5M7 4L4.5 6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

    </div>
  )
}
