'use client'

import { useEffect, useState, useRef } from 'react'

type AnimState = 'searching' | 'scanning' | 'resolved'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const GAP_INDEX = 2 // Wednesday

export default function SchedulerVisual() {
  const [state, setState] = useState<AnimState>('searching')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function cycle() {
      setState('searching')
      timerRef.current = setTimeout(() => {
        setState('scanning')
        timerRef.current = setTimeout(() => {
          setState('resolved')
          timerRef.current = setTimeout(() => {
            cycle()
          }, 1600)
        }, 1200)
      }, 1200)
    }
    cycle()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        width: '220px',
      }}
    >
      {/* Week header */}
      <p style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '10px',
        color: 'rgba(107,63,160,0.35)',
        letterSpacing: '0.04em',
      }}>
        Week of Apr 7 — Coverage
      </p>

      {/* 5-cell strip + day labels */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {DAYS.map((day, i) => {
            const isGap = i === GAP_INDEX
            let cellStyle: React.CSSProperties = {
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
            }

            if (isGap) {
              if (state === 'searching') {
                cellStyle = {
                  ...cellStyle,
                  background: 'rgba(220,38,38,0.04)',
                  border: '1.5px dashed rgba(220,38,38,0.45)',
                  animation: 'gapPulse 0.6s ease-in-out infinite alternate',
                }
              } else if (state === 'scanning') {
                cellStyle = {
                  ...cellStyle,
                  background: 'rgba(107,63,160,0.04)',
                  border: '1.5px dashed rgba(107,63,160,0.6)',
                }
              } else {
                cellStyle = {
                  ...cellStyle,
                  background: 'rgba(107,63,160,0.10)',
                  border: '1.5px solid rgba(107,63,160,0.25)',
                }
              }
            } else {
              cellStyle = {
                ...cellStyle,
                background: 'rgba(107,63,160,0.07)',
              }
            }

            return (
              <div key={day} style={cellStyle}>
                {isGap && state === 'scanning' && (
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: '#6B3FA0',
                    animation: 'scanDot 0.4s ease-in-out infinite alternate',
                  }} />
                )}
                {isGap && state === 'resolved' && (
                  <span style={{ fontSize: '13px', color: '#6B3FA0', fontWeight: 600 }}>✓</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Day labels */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {DAYS.map(day => (
            <div
              key={day}
              style={{
                width: '36px',
                textAlign: 'center',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '9px',
                color: 'rgba(107,63,160,0.25)',
              }}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Status line — only visible in resolved state */}
      <p style={{
        fontFamily: 'var(--font-geist-mono)',
        fontSize: '10px',
        color: '#16A34A',
        opacity: state === 'resolved' ? 1 : 0,
        transform: state === 'resolved' ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        letterSpacing: '0.01em',
      }}>
        Sarah P. matched — schedule updated
      </p>
    </div>
  )
}
