'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const els = sectionRef.current.querySelectorAll('.cta-animate')

      gsap.from(els, {
        y:        32,
        opacity:  0,
        duration: 0.8,
        stagger:  0.1,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 75%',
        },
      })
    }

    initGSAP()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="max-w-[960px] mx-auto px-10">
        <div
          className="rounded-[24px] px-10 sm:px-16 py-16 sm:py-20 text-center bg-white border border-[--border]"
          style={{ boxShadow: 'var(--shadow-2)' }}
        >

          {/* Label */}
          <p className="cta-animate text-label mb-4">GET STARTED</p>

          {/* Headline */}
          <h2
            className="cta-animate font-display font-bold text-ink mb-5"
            style={{
              fontSize:      'clamp(30px, 3.8vw, 52px)',
              letterSpacing: '-0.035em',
              lineHeight:    '1.05',
            }}
          >
            From the 6am callout to the{' '}
            <br className="hidden sm:block" />
            month-end close — handled.
          </h2>

          {/* Subhead */}
          <p className="cta-animate text-[16px] text-ink3 font-ui leading-relaxed max-w-[480px] mx-auto mb-8">
            Book a 20-min demo and see three Quickflows agents working live
            in your operational context.
          </p>

          {/* CTAs */}
          <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
            <Link href="/demo" className="btn-base btn-primary">
              Book a demo
            </Link>
            <Link href="/contact" className="btn-base btn-ghost group">
              Talk to sales
              <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
            </Link>
          </div>

          {/* Trust pills */}
          <div className="cta-animate flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="text-[12px] text-ink4 font-ui">✓ No credit card required</span>
            <span className="hidden sm:block w-px h-3 bg-[--border]" />
            <span className="text-[12px] text-ink4 font-ui">✓ Live in 24 hours</span>
            <span className="hidden sm:block w-px h-3 bg-[--border]" />
            <a
              href="tel:6782670106"
              className="text-[12px] text-ink4 font-ui hover:text-ink transition-colors duration-150"
            >
              678-267-0106
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
