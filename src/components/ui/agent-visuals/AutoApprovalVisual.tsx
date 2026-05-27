'use client'

import { useEffect, useState, useRef } from 'react'

export default function AutoApprovalVisual() {
  const [phase, setPhase] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function runCycle() {
      setPhase(0)
      timerRef.current = setTimeout(() => {
        setPhase(1) // time label + request card visible
        timerRef.current = setTimeout(() => {
          setPhase(2) // ✓ status line appears inside card
          timerRef.current = setTimeout(() => {
            setPhase(3) // "While you were asleep." appears
            timerRef.current = setTimeout(runCycle, 2000)
          }, 400)
        }, 800)
      }, 300)
    }
    runCycle()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const fade = (minPhase: number): React.CSSProperties => ({
    opacity: phase >= minPhase ? 1 : 0,
    transition: 'opacity 0.4s ease',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '230px' }}>
      {/* Time */}
      <p style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '12px',
        color: '#A0A0A0',
        ...fade(1),
      }}>
        11:47 PM
      </p>

      {/* Request card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid rgba(107,63,160,0.08)',
        borderRadius: '10px',
        padding: '12px 14px',
        width: '100%',
        ...fade(1),
      }}>
        <p style={{
          fontFamily: 'var(--font-geist-sans)',
          fontWeight: 600,
          fontSize: '12px',
          color: '#0A0A0A',
          marginBottom: '6px',
        }}>
          Jamie L. — Time off Apr 15
        </p>
        <p style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '11px',
          color: '#16A34A',
          ...fade(2),
        }}>
          ✓ Auto-approved. Policy clear.
        </p>
      </div>

      {/* Night label */}
      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '11px',
        color: '#A0A0A0',
        fontStyle: 'italic',
        ...fade(3),
      }}>
        While you were asleep.
      </p>
    </div>
  )
}
