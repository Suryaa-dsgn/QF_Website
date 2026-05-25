'use client'

import Link from 'next/link'
import BookDemoButton from '@/components/BookDemoButton'
import { AgentCardGrid } from '@/components/ui/AgentCardGrid'

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="flex items-center justify-center pt-[80px] pb-12"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="w-full px-10 flex flex-col items-center md:items-center text-left md:text-center"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        {/* Workforce pill */}
        <div
          className="inline-flex items-center text-[10px] font-semibold font-ui uppercase tracking-[0.06em] rounded-full mb-6"
          style={{
            color: '#0284C7',
            background: 'rgba(2,132,199,0.08)',
            border: '1px solid rgba(2,132,199,0.15)',
            padding: '4px 13px',
          }}
        >
          Workforce Operations
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-ink"
          style={{
            fontSize: 'clamp(44px, 5.5vw, 72px)',
            letterSpacing: '-0.04em',
            lineHeight: '1.0',
            maxWidth: '700px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Seven agents.<br />
          One workforce that runs itself.
        </h1>

        {/* Subhead */}
        <p
          className="font-ui"
          style={{
            fontSize: '17px',
            lineHeight: '1.7',
            color: '#6B6B6B',
            maxWidth: '480px',
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          From the 6am callout to the last shift of the month.
          Every shift, credential, and approval — handled automatically.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <BookDemoButton className="btn-base btn-primary text-[15px]">
            Book a demo
          </BookDemoButton>
          <Link href="/agents" className="btn-base btn-ghost text-[14px]">
            Explore Financial <span className="arrow-icon">→</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex flex-col items-center mt-16 gap-2">
          <div
            className="relative overflow-hidden w-px"
            style={{
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, rgba(107,63,160,0.3), transparent)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-px h-3 bg-brand"
              style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
            />
          </div>
          <p className="text-label" style={{ fontSize: '10px' }}>7 agents below</p>
        </div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function WorkforcePage() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      {/* Card grid section */}
      <section className="pb-[120px]">
        <div className="section-container">
          <p className="text-label text-center mb-14">Workforce Agents</p>
          <AgentCardGrid />
        </div>
      </section>
    </div>
  )
}
