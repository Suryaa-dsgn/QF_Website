'use client'

import { useEffect, useState, useRef } from 'react'

export default function AutoSwapVisual() {
  const [phase, setPhase] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    function runCycle() {
      setPhase(0)
      setSeconds(0)

      timerRef.current = setTimeout(() => {
        setPhase(1) // alert visible

        timerRef.current = setTimeout(() => {
          setPhase(2) // divider draws in

          timerRef.current = setTimeout(() => {
            setPhase(3) // resolution line visible

            // count 0 → 28
            const startTime = performance.now()
            function tick(now: number) {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / 600, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setSeconds(Math.round(eased * 28))
              if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick)
              } else {
                setSeconds(28)
                setPhase(4) // final hold
                timerRef.current = setTimeout(runCycle, 2500)
              }
            }
            rafRef.current = requestAnimationFrame(tick)
          }, 700)
        }, 500)
      }, 300)
    }

    runCycle()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const fade = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(6px)',
    transition: 'opacity 0.4s ease, transform 0.4s ease',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '230px' }}>
      {/* Alert line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', ...fade(phase >= 1) }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#F4A261', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#F4A261' }}>
          6:04 AM — Gap detected
        </span>
      </div>

      {/* Divider — draws in */}
      <div style={{
        width: phase >= 2 ? '100%' : '0%',
        height: '1px',
        background: 'rgba(107,63,160,0.10)',
        transition: 'width 0.5s ease',
        margin: '10px 0',
      }} />

      {/* Resolution line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', alignSelf: 'flex-start', ...fade(phase >= 3) }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
        <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#16A34A' }}>
          6:04:28 AM — Sarah P. confirmed
        </span>
      </div>

      {/* Fill time — large centrepiece */}
      <div style={{ marginTop: '16px', textAlign: 'center', ...fade(phase >= 3) }}>
        <span style={{
          fontFamily: 'var(--font-geist-mono)',
          fontWeight: 700,
          fontSize: '44px',
          color: '#6B3FA0',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}>
          {seconds}s
        </span>
        <p style={{
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '10px',
          color: '#A0A0A0',
          marginTop: '3px',
        }}>
          average fill time
        </p>
      </div>
    </div>
  )
}
