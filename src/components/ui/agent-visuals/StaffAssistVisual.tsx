'use client'

import { useEffect, useState, useRef } from 'react'

type Phase = 'reset' | 'question' | 'reply' | 'timestamp'

export default function StaffAssistVisual() {
  const [phase, setPhase] = useState<Phase>('reset')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function runCycle() {
      setPhase('reset')
      timerRef.current = setTimeout(() => {
        setPhase('question')
        timerRef.current = setTimeout(() => {
          setPhase('reply')
          timerRef.current = setTimeout(() => {
            setPhase('timestamp')
            timerRef.current = setTimeout(runCycle, 2000)
          }, 600)
        }, 1200)
      }, 200)
    }
    runCycle()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const show = (target: 'question' | 'reply' | 'timestamp'): boolean => {
    if (phase === 'reset') return false
    if (target === 'question') return ['question', 'reply', 'timestamp'].includes(phase)
    if (target === 'reply') return ['reply', 'timestamp'].includes(phase)
    if (target === 'timestamp') return phase === 'timestamp'
    return false
  }

  const bubble = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '230px' }}>
      {/* Staff question — right-aligned */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', ...bubble(show('question')) }}>
        <div style={{
          background: '#6B3FA0',
          color: '#fff',
          borderRadius: '12px 12px 3px 12px',
          padding: '8px 12px',
          maxWidth: '180px',
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: 1.4,
        }}>
          Can I swap my Thursday shift?
        </div>
      </div>

      {/* Agent reply — left-aligned */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', ...bubble(show('reply')) }}>
        <div style={{
          background: 'rgba(107,63,160,0.07)',
          border: '1px solid rgba(107,63,160,0.14)',
          borderRadius: '12px 12px 12px 3px',
          padding: '8px 12px',
          maxWidth: '210px',
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '12px',
          fontWeight: 500,
          color: '#0A0A0A',
          lineHeight: 1.4,
        }}>
          ✓ Sarah P. available. Swap confirmed.
        </div>
      </div>

      {/* Timestamp — centred */}
      <div style={{ display: 'flex', justifyContent: 'center', ...bubble(show('timestamp')) }}>
        <p style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '10px',
          color: '#16A34A',
          letterSpacing: '0.01em',
        }}>
          Response time: 2s
        </p>
      </div>
    </div>
  )
}
