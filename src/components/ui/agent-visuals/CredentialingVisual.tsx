'use client'

import { useEffect, useState, useRef } from 'react'

export default function CredentialingVisual() {
  const [days, setDays] = useState(30)
  const [showRenewal, setShowRenewal] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function runCycle() {
      setDays(30)
      setShowRenewal(false)

      timerRef.current = setTimeout(() => {
        const startTime = performance.now()
        const duration = 1700

        function countDown(now: number) {
          const elapsed = now - startTime
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(30 - eased * 19) // 30 → 11
          setDays(current)

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(countDown)
          } else {
            setDays(11)
            timerRef.current = setTimeout(() => {
              setShowRenewal(true)
              timerRef.current = setTimeout(runCycle, 2300)
            }, 200)
          }
        }
        rafRef.current = requestAnimationFrame(countDown)
      }, 400)
    }

    runCycle()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', width: '200px' }}>
      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontWeight: 600,
        fontSize: '18px',
        color: '#0A0A0A',
        letterSpacing: '-0.01em',
      }}>
        Dr. Patel
      </p>
      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '11px',
        color: '#6B6B6B',
        marginBottom: '10px',
      }}>
        DEA Registration
      </p>

      <span style={{
        fontFamily: 'var(--font-geist-mono)',
        fontWeight: 700,
        fontSize: '48px',
        color: '#F4A261',
        letterSpacing: '-0.04em',
        lineHeight: 1,
      }}>
        {days}
      </span>
      <p style={{
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '10px',
        color: '#A0A0A0',
        marginBottom: '10px',
      }}>
        days to expiry
      </p>

      <p style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '10px',
        color: '#16A34A',
        opacity: showRenewal ? 1 : 0,
        transform: showRenewal ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        letterSpacing: '0.01em',
      }}>
        ✓ Renewal initiated automatically
      </p>
    </div>
  )
}
