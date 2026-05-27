'use client'

import { useEffect, useState, useRef } from 'react'

export default function BurnoutVisual() {
  const [hours, setHours] = useState(60)
  const [showAlert, setShowAlert] = useState(false)
  const [peaked, setPeaked] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function runCycle() {
      setHours(60)
      setShowAlert(false)
      setPeaked(false)

      timerRef.current = setTimeout(() => {
        const startTime = performance.now()
        const duration = 1500

        function countUp(now: number) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(60 + eased * 8)
          setHours(current)

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(countUp)
          } else {
            setHours(68)
            setPeaked(true)
            timerRef.current = setTimeout(() => {
              setShowAlert(true)
              timerRef.current = setTimeout(() => {
                timerRef.current = setTimeout(runCycle, 800)
              }, 2300)
            }, 200)
          }
        }

        rafRef.current = requestAnimationFrame(countUp)
      }, 500)
    }

    runCycle()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '200px' }}>
      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontWeight: 600,
        fontSize: '22px',
        color: peaked ? '#6B3FA0' : '#0A0A0A',
        transition: 'color 0.4s ease',
        letterSpacing: '-0.01em',
      }}>
        Mark K.
      </p>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
        <span style={{
          fontFamily: 'var(--font-geist-mono)',
          fontWeight: 700,
          fontSize: '32px',
          color: '#0A0A0A',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          {hours}
        </span>
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '14px', color: '#A0A0A0' }}>
          hrs
        </span>
      </div>

      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '11px',
        color: '#A0A0A0',
        marginBottom: '10px',
      }}>
        this week
      </p>

      <div style={{
        opacity: showAlert ? 1 : 0,
        transform: showAlert ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        background: 'rgba(252,211,77,0.12)',
        border: '1px solid rgba(252,211,77,0.45)',
        borderRadius: '6px',
        padding: '4px 12px',
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '11px',
        fontWeight: 500,
        color: '#92400E',
      }}>
        ⚠ Approaching limit — flagged
      </div>
    </div>
  )
}
