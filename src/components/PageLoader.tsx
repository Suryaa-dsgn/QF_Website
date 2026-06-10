'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import MagicRings — SSR false because WebGL requires the browser
const MagicRings = dynamic(() => import('@/components/ui/MagicRings'), { ssr: false })

export default function PageLoader() {
  const [visible, setVisible]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting]   = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Skip if loader already shown this session
    if (sessionStorage.getItem('qf_loader_shown')) return

    setVisible(true)

    // Simulate loading progress — fast start, gradual crawl at the end
    let p = 0
    intervalRef.current = setInterval(() => {
      const inc = p < 65 ? 2.5 : p < 85 ? 1.2 : p < 95 ? 0.5 : 0.2
      p = Math.min(p + inc, 100)
      setProgress(Math.floor(p))

      if (p >= 100) {
        clearInterval(intervalRef.current!)
        // Brief hold at 100%, then fade the overlay out
        setTimeout(() => {
          setExiting(true)
          setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem('qf_loader_shown', '1')
          }, 700) // matches the CSS opacity transition
        }, 350)
      }
    }, 50) // 50 ms tick → ~2.8 s to reach 100%

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        background:      '#F9F8FF',
        // Replicate the site's dot-grid background
        backgroundImage: `
          linear-gradient(rgba(107,63,160,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(107,63,160,0.04) 1px, transparent 1px)
        `,
        backgroundSize:  '44px 44px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        overflow:        'hidden',
        // Fade-out transition
        opacity:         exiting ? 0 : 1,
        transition:      'opacity 700ms ease',
        pointerEvents:   exiting ? 'none' : 'auto',
      }}
    >

      {/* ── WebGL rings — fills the full overlay background ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <MagicRings
          color="#6B3FA0"
          colorTwo="#A855F7"
          ringCount={5}
          speed={0.7}
          attenuation={20}
          lineThickness={1.8}
          baseRadius={0.22}
          radiusStep={0.09}
          scaleRate={0.09}
          noiseAmount={0.04}
          opacity={0.85}
          followMouse={false}
          clickBurst={false}
          ringGap={1.6}
          fadeIn={0.7}
          fadeOut={0.5}
        />
      </div>

      {/* ── Center content — sits above the rings ── */}
      <div
        style={{
          position:      'relative',
          zIndex:        1,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '16px',
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/qf-logo-purple.svg"
          alt="Quickflows"
          style={{ width: '72px', height: 'auto' }}
        />

        {/* Wordmark */}
        <span
          style={{
            fontFamily:    'var(--font-geist-sans)',
            fontSize:      '18px',
            fontWeight:    600,
            color:         '#0A0A0A',
            letterSpacing: '-0.02em',
          }}
        >
          Quickflows
          <span style={{ color: '#6B3FA0' }}>.ai</span>
        </span>

        {/* Progress bar + percentage */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            gap:           '8px',
            width:         '200px',
          }}
        >
          {/* Track */}
          <div
            style={{
              width:        '100%',
              height:       '3px',
              background:   'rgba(107,63,160,0.12)',
              borderRadius: '99px',
              overflow:     'hidden',
            }}
          >
            {/* Fill */}
            <div
              style={{
                height:       '100%',
                width:        `${progress}%`,
                background:   'linear-gradient(90deg, #6B3FA0, #A855F7)',
                borderRadius: '99px',
                transition:   'width 60ms linear',
              }}
            />
          </div>

          {/* Percentage label */}
          <span
            style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize:   '11px',
              color:      'rgba(107,63,160,0.5)',
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

    </div>
  )
}
