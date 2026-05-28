'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { financialAgents } from '@/data/agents'
import { cn } from '@/lib/utils'
import type { Agent } from '@/data/agents'

// Import financial panel components
import APARPanel       from '@/components/ui/panels/APARPanel'
import CollectionPanel from '@/components/ui/panels/CollectionPanel'
import CompliancePanel from '@/components/ui/panels/CompliancePanel'
import REITPanel       from '@/components/ui/panels/REITPanel'

// Map slug → panel component
const panelComponents: Record<string, React.ComponentType> = {
  'ap-ar-matching':      APARPanel,
  'payment-collection':  CollectionPanel,
  'contract-compliance': CompliancePanel,
  'reit-deal-qualifier': REITPanel,
}

// ─── COPY BLOCK ──────────────────────────────────────────────────

function CopyBlock({ agent }: { agent: Agent }) {
  return (
    <div>

      {/* Category tag */}
      <p className="text-label mb-3">{agent.category}</p>

      {/* Headline */}
      <h3
        className="font-display font-bold text-ink mb-2"
        style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
      >
        {agent.headline}
      </h3>

      {/* Tagline */}
      <p className="text-[16px] text-ink3 font-ui mb-4 leading-snug">{agent.tagline}</p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2 mb-5">
        {agent.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={10} className="text-[#065F46]" strokeWidth={3} />
            </div>
            <span className="text-[14px] text-ink3 font-ui leading-snug">{b}</span>
          </li>
        ))}
      </ul>

      {/* Outcome pill */}
      <div className="inline-flex items-center gap-2 bg-[#6B3FA0] text-white text-[12px] font-medium px-3 py-1.5 rounded-[6px] font-ui mb-4">
        <span className="text-white/70">↗</span>
        {agent.outcome}
      </div>

      {/* Learn more link */}
      <div>
        <Link
          href={`/agents/${agent.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand group font-ui"
        >
          Learn more
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-150" />
        </Link>
      </div>

    </div>
  )
}

// ─── AGENT BLOCK (alternating layout) ────────────────────────────

interface AgentBlockProps {
  agent: Agent
  isReversed: boolean
  panelComponent: React.ComponentType
}

function AgentBlock({ agent, isReversed, panelComponent: PanelComponent }: AgentBlockProps) {
  return (
    <div className="py-20 border-t border-[--border] max-w-[1120px] mx-auto px-10">
      <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Copy column */}
        <motion.div
          className={cn(isReversed ? 'md:order-2' : 'md:order-1')}
          initial={{ x: isReversed ? 40 : -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <CopyBlock agent={agent} />
        </motion.div>

        {/* Panel column — always first on mobile (order-first) */}
        <motion.div
          className={cn(
            isReversed ? 'md:order-1' : 'md:order-2',
            'order-first md:order-none'  // panel on top mobile
          )}
          initial={{ x: isReversed ? -40 : 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="rounded-[16px] overflow-hidden border border-[--border] flex flex-col"
            style={{ height: '360px', boxShadow: 'var(--shadow-2)' }}
          >
            {/* Browser chrome */}
            <div className="browser-chrome flex-shrink-0">
              <div className="browser-dots">
                <div className="browser-dot dot-red" />
                <div className="browser-dot dot-yellow" />
                <div className="browser-dot dot-green" />
              </div>
              <div className="browser-url">app.quickflows.ai / {agent.slug}</div>
            </div>
            {/* Panel content */}
            <div className="flex-1 overflow-hidden bg-white">
              <PanelComponent />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function FinancialAgents() {
  return (
    <section className="section-padding">

      {/* Section header */}
      <div className="text-center max-w-[640px] mx-auto px-10 mb-4">
        <p className="text-label mb-4">FINANCIAL OPERATIONS</p>
        <h2
          className="font-display font-bold text-ink mb-5"
          style={{ fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.035em', lineHeight: '1.05' }}
        >
          Four agents that close the books{' '}
          <span className="italic text-brand">before you open them.</span>
        </h2>
        <p className="text-[16px] text-ink3 font-ui leading-relaxed max-w-[480px] mx-auto mb-8">
          Invoice matching, collections, contract enforcement, and deal screening — all automated.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/demo" className="btn-base btn-primary">Talk to an Expert</Link>
          <Link href="/financial" className="btn-base btn-ghost group">
            See all agents
            <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
          </Link>
        </div>
      </div>

      {/* Agent blocks — alternating layout */}
      <div>
        {financialAgents.map((agent, index) => {
          const PanelComponent = panelComponents[agent.slug]
          if (!PanelComponent) return null
          return (
            <AgentBlock
              key={agent.slug}
              agent={agent}
              isReversed={index % 2 !== 0}
              panelComponent={PanelComponent}
            />
          )
        })}
      </div>

    </section>
  )
}
