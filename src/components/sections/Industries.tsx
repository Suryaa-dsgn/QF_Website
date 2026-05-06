'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { industries } from '@/data/industries'
import type { Industry } from '@/data/industries'

// ─── FILTER TABS ──────────────────────────────────────────────────

const tabs = ['All', 'Workforce', 'Financial'] as const
type Tab = typeof tabs[number]

function FilterTabs({
  active,
  onChange,
}: {
  active: Tab
  onChange: (t: Tab) => void
}) {
  return (
    <div className="relative flex items-center gap-1 p-1 bg-white border border-[--border] rounded-pill w-fit mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="relative px-5 py-1.5 text-[13px] font-medium font-ui z-10 transition-colors duration-150 rounded-pill"
          style={{ color: active === tab ? '#fff' : '#6B6B6B' }}
        >
          {/* Sliding pill background */}
          {active === tab && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 bg-brand rounded-pill"
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ zIndex: -1 }}
            />
          )}
          {tab}
        </button>
      ))}
    </div>
  )
}

// ─── INDUSTRY CARD ────────────────────────────────────────────────

function IndustryCard({ industry }: { industry: Industry }) {
  const isWorkforce = industry.vertical === 'workforce'
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="card card-hover block group"
      style={{ padding: '20px 22px' }}
    >
      {/* Icon + vertical badge row */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-[8px] bg-[--brand-08] flex items-center justify-center flex-shrink-0">
          <industry.icon size={16} className="text-brand" />
        </div>
        <span
          className="text-[9px] font-semibold font-ui uppercase tracking-[0.06em] mt-0.5"
          style={{ color: isWorkforce ? '#0284C7' : '#059669' }}
        >
          {isWorkforce ? 'WORKFORCE' : 'FINANCIAL'}
        </span>
      </div>

      {/* Name */}
      <p className="text-[14px] font-semibold text-ink font-ui mb-1 leading-snug">
        {industry.name}
      </p>

      {/* Descriptor */}
      <p className="text-[12px] text-ink4 font-ui mb-3 leading-snug">
        {industry.descriptor}
      </p>

      {/* Agent count */}
      <p className="text-[12px] font-medium text-brand font-ui">
        {industry.agentCount} →
      </p>
    </Link>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function Industries() {
  const [activeTab, setActiveTab] = useState<Tab>('All')

  const filtered = industries.filter((ind) => {
    if (activeTab === 'All')       return true
    if (activeTab === 'Workforce') return ind.vertical === 'workforce'
    if (activeTab === 'Financial') return ind.vertical === 'financial'
    return true
  })

  return (
    <section className="section-padding">
      <div className="section-container">

        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-label mb-4">INDUSTRIES</p>
          <h2
            className="font-display font-bold text-ink mb-5"
            style={{
              fontSize:      'clamp(28px, 3.5vw, 44px)',
              letterSpacing: '-0.03em',
              lineHeight:    '1.05',
            }}
          >
            Built for the industries that{' '}
            <span className="italic text-brand">can&apos;t afford downtime.</span>
          </h2>
          <p className="text-[15px] text-ink3 font-ui max-w-[480px] mx-auto leading-relaxed mb-8">
            Quickflows agents are pre-configured for the operational patterns of
            15 industries across workforce and financial operations.
          </p>

          {/* Filter tabs */}
          <FilterTabs active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Card grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((industry, i) => (
              <motion.div
                key={industry.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <IndustryCard industry={industry} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom note */}
        <p className="text-center text-[13px] text-ink4 font-ui mt-8">
          Don&apos;t see your industry?{' '}
          <Link href="/demo" className="text-brand font-medium hover:underline">
            Talk to us →
          </Link>
        </p>

      </div>
    </section>
  )
}
