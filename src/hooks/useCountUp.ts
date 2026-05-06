'use client'

import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number     // seconds (default 1.8)
  suffix?: string       // 's', '%', 'hr', etc.
  decimals?: number     // decimal places (default 0)
  startOnView?: boolean // use IntersectionObserver (default true)
}

export function useCountUp({
  end,
  duration = 1.8,
  suffix = '',
  decimals = 0,
  startOnView = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState('0' + suffix)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!startOnView) {
      start()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          start()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted])

  function start() {
    const startTime = performance.now()
    const endDuration = duration * 1000

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / endDuration, 1)
      // power2.out easing
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end
      const formatted = decimals > 0
        ? current.toFixed(decimals)
        : Math.floor(current).toString()
      setValue(formatted + suffix)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        setValue(end.toFixed(decimals) + suffix)
      }
    }

    requestAnimationFrame(update)
  }

  return { value, ref }
}
