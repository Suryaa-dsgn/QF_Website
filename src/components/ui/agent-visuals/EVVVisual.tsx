'use client'

import { useEffect, useState, useRef } from 'react'

export default function EVVVisual() {
  const [phase, setPhase] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function runCycle() {
      setPhase(0)
      timerRef.current = setTimeout(() => {
        setPhase(1) // visit header + expected row appear
        timerRef.current = setTimeout(() => {
          setPhase(2) // actual row appears
          timerRef.current = setTimeout(() => {
            setPhase(3) // flag line appears
            timerRef.current = setTimeout(runCycle, 2200)
          }, 500)
        }, 1000)
      }, 400)
    }
    runCycle()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const fade = (minPhase: number): React.CSSProperties => ({
    opacity: phase >= minPhase ? 1 : 0,
    transform: phase >= minPhase ? 'translateY(0)' : 'translateY(5px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '220px' }}>
      {/* Visit header */}
      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontWeight: 600,
        fontSize: '13px',
        color: '#0A0A0A',
        ...fade(1),
      }}>
        Mrs. Garcia — 09:00 visit
      </p>

      {/* Expected row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...fade(1) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#A0A0A0' }}>Expected</span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#A0A0A0' }}>60 min</span>
        </div>
        <div style={{ width: '100%', height: '3px', background: '#BBF7D0', borderRadius: '2px' }} />
      </div>

      {/* Actual row — shorter, red */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', ...fade(2) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#E63946' }}>Actual</span>
          <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#E63946' }}>28 min</span>
        </div>
        <div style={{ width: '47%', height: '3px', background: '#FECACA', borderRadius: '2px' }} />
      </div>

      {/* Discrepancy flag */}
      <div style={{
        background: 'rgba(220,38,38,0.06)',
        border: '1px solid rgba(220,38,38,0.18)',
        borderRadius: '6px',
        padding: '5px 10px',
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '11px',
        fontWeight: 500,
        color: '#92400E',
        ...fade(3),
      }}>
        ⚠ Discrepancy flagged — billing hold
      </div>
    </div>
  )
}
