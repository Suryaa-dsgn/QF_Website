'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Building2, Heart, Activity, Brain, Laptop, Factory, Landmark, Users, Plane, Shield, type LucideIcon } from 'lucide-react'
import BookDemoButton from '@/components/BookDemoButton'
import Navigation from '@/components/Navigation'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/Footer'

// Panel components (all imports live in the client component)
import CallOffManagementPanel from '@/components/ui/panels/CallOffManagementPanel'
import ScheduleOptimizerPanel from '@/components/ui/panels/ScheduleOptimizerPanel'
import RCMPanel from '@/components/ui/panels/RCMPanel'
import APARPanel from '@/components/ui/panels/APARPanel'
import CapacityPlannerPanel from '@/components/ui/panels/CapacityPlannerPanel'

// ─── KEY MAPS (all serializable from server pages) ────────────────

export type PanelKey =
  | 'call-off-management'
  | 'schedule-optimizer'
  | 'rcm'
  | 'apar'
  | 'capacity-planner'

export type IconKey =
  | 'building2' | 'heart' | 'activity' | 'brain'
  | 'laptop'    | 'factory' | 'landmark'
  | 'users'     | 'plane'   | 'shield'

const PANEL_MAP: Record<PanelKey, React.ComponentType> = {
  'call-off-management': CallOffManagementPanel,
  'schedule-optimizer':  ScheduleOptimizerPanel,
  'rcm':                 RCMPanel,
  'apar':                APARPanel,
  'capacity-planner':    CapacityPlannerPanel,
}

const ICON_MAP: Record<IconKey, LucideIcon> = {
  building2: Building2,
  heart:     Heart,
  activity:  Activity,
  brain:     Brain,
  laptop:    Laptop,
  factory:   Factory,
  landmark:  Landmark,
  users:     Users,
  plane:     Plane,
  shield:    Shield,
}

// ─── TYPES (fully serializable — no functions/components) ─────────

export interface ScenarioCard {
  time: string
  event: string
  problem: string
  agent: string
  agentColor: string
  resolution: string
  metric: string
}

export interface PanelSpotlight {
  panelKey: PanelKey
  agentName: string
  suiteLabel: string
  suiteColor: string
  description: string
}

export interface SubIndustry {
  iconKey: IconKey
  title: string
  description: string
  agentCount: string
}

export interface IndustryPageConfig {
  category: string
  categoryColor: string
  headline: string
  subtext: string
  scenarios: ScenarioCard[]
  panels: PanelSpotlight[]
  subIndustries: SubIndustry[]
  suiteHref: string
  suiteLabel: string
  suiteAgentCount: string
  suiteDescription: string
  secondarySuiteHref?: string
  secondarySuiteLabel?: string
}

// ─── SCENARIO CARD ────────────────────────────────────────────────

function ScenarioCardEl({ card, delay }: { card: ScenarioCard; delay: number }) {
  return (
    <motion.div
      className="bg-white rounded-[16px] border border-[--border] overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Incident header */}
      <div
        className="px-5 py-3 flex items-center gap-2 flex-wrap"
        style={{ background: 'rgba(220,38,38,0.05)', borderBottom: '1px solid rgba(220,38,38,0.08)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#DC2626' }} />
        <span className="text-[11px] font-mono font-semibold" style={{ color: '#DC2626' }}>{card.time}</span>
        <span className="text-[11px] text-ink4 font-ui">—</span>
        <span className="text-[11px] text-ink4 font-ui">{card.event}</span>
      </div>

      {/* Problem */}
      <div className="px-5 pt-4 pb-3 flex-1">
        <p className="font-display font-semibold text-ink leading-snug" style={{ fontSize: '14px', letterSpacing: '-0.015em' }}>
          {card.problem}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-[--border]" />

      {/* Agent + Resolution */}
      <div className="px-5 py-4 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-semibold font-mono px-2 py-[3px] rounded-[4px]"
            style={{ color: card.agentColor, background: card.agentColor + '14' }}
          >
            {card.agent}
          </span>
          <span className="text-[11px] text-ink4 font-ui">activated</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-[#16A34A] text-[12px] font-semibold mt-[1px] flex-shrink-0">✓</span>
          <p className="text-[13px] text-ink font-ui leading-snug">{card.resolution}</p>
        </div>
        <span className="text-[11px] font-mono text-ink4">{card.metric}</span>
      </div>
    </motion.div>
  )
}

// ─── PANEL SPOTLIGHT CARD ─────────────────────────────────────────

function PanelSpotlightEl({ spotlight, delay }: { spotlight: PanelSpotlight; delay: number }) {
  const Panel = PANEL_MAP[spotlight.panelKey]
  return (
    <motion.div
      className="bg-white rounded-[20px] border border-[--border] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-5 border-b border-[--border]">
        <span
          className="inline-block text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full mb-3"
          style={{ color: spotlight.suiteColor, background: spotlight.suiteColor + '12', border: `1px solid ${spotlight.suiteColor}20` }}
        >
          {spotlight.suiteLabel}
        </span>
        <h3 className="font-display font-bold text-ink mb-1" style={{ fontSize: '16px', letterSpacing: '-0.02em' }}>
          {spotlight.agentName}
        </h3>
        <p className="text-[13px] text-ink3 font-ui leading-relaxed">{spotlight.description}</p>
      </div>
      <div className="h-[260px] overflow-hidden">
        <Panel />
      </div>
    </motion.div>
  )
}

// ─── SUB-INDUSTRY TILE ────────────────────────────────────────────

function SubIndustryTile({ sub, delay }: { sub: SubIndustry; delay: number }) {
  const Icon = ICON_MAP[sub.iconKey]
  return (
    <motion.div
      className="bg-white rounded-[14px] border border-[--border] p-6 flex flex-col gap-2"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-9 h-9 rounded-[8px] bg-[--brand-08] flex items-center justify-center mb-1">
        <Icon size={16} className="text-brand" />
      </div>
      <p className="text-[15px] font-semibold text-ink font-ui">{sub.title}</p>
      <p className="text-[13px] text-ink3 font-ui leading-relaxed flex-1">{sub.description}</p>
      <div className="mt-1">
        <span className="text-[11px] font-mono text-ink4 bg-[--brand-08] px-2 py-0.5 rounded-[4px]">{sub.agentCount}</span>
      </div>
    </motion.div>
  )
}

// ─── MAIN INDUSTRY PAGE ───────────────────────────────────────────

export default function IndustryPage({ config }: { config: IndustryPageConfig }) {
  return (
    <>
      <Navigation />

      {/* ── 1. HERO ── */}
      <section className="pt-36 pb-20 text-center">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1 rounded-full mb-6"
              style={{ color: config.categoryColor, background: config.categoryColor + '12', border: `1px solid ${config.categoryColor}25` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.categoryColor }} />
              {config.category}
            </span>

            <h1
              className="font-display font-bold text-ink mx-auto"
              style={{ fontSize: 'clamp(30px, 4.5vw, 54px)', letterSpacing: '-0.04em', lineHeight: '1.1', maxWidth: '820px', marginBottom: '20px' }}
            >
              {config.headline}
            </h1>

            <p
              className="text-[16px] text-ink3 font-ui leading-relaxed mx-auto mb-9"
              style={{ maxWidth: '520px' }}
            >
              {config.subtext}
            </p>

            <div className="flex items-center justify-center">
              <BookDemoButton className="btn-base btn-primary">Talk to an Expert</BookDemoButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SCENARIO STRIP ── */}
      <section className="section-padding" style={{ paddingTop: '28px' }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label">REAL OPERATIONAL SCENARIOS</p>
            <h2
              className="font-display font-bold text-ink mt-2"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-0.03em', lineHeight: '1.2' }}
            >
              The moments that matter — handled automatically.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.scenarios.map((card, i) => (
              <ScenarioCardEl key={i} card={card} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. AGENT PANEL SPOTLIGHT ── */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label">AGENTS IN ACTION</p>
            <h2
              className="font-display font-bold text-ink mt-2"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-0.03em', lineHeight: '1.2' }}
            >
              See exactly what runs, in real time.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {config.panels.map((spotlight, i) => (
              <PanelSpotlightEl key={i} spotlight={spotlight} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SUB-INDUSTRY TILES ── */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.55)' }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label">WHO WE SERVE</p>
            <h2
              className="font-display font-bold text-ink mt-2"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-0.03em', lineHeight: '1.2' }}
            >
              Every segment. Every edge case.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.subIndustries.map((sub, i) => (
              <SubIndustryTile key={i} sub={sub} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SUITE BRIDGE CTA ── */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="rounded-[20px] border p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: 'var(--brand-08)', borderColor: 'var(--border)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="text-label mb-2">RECOMMENDED AGENT SUITE</p>
              <h3
                className="font-display font-bold text-ink mb-1"
                style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '-0.025em', lineHeight: '1.2' }}
              >
                {config.suiteAgentCount} built for {config.category.toLowerCase()}.
              </h3>
              <p className="text-[14px] text-ink3 font-ui">{config.suiteDescription}</p>
              {config.secondarySuiteHref && config.secondarySuiteLabel && (
                <Link href={config.secondarySuiteHref} className="inline-flex items-center gap-1 text-[13px] text-brand font-ui mt-2 hover:underline">
                  Also explore {config.secondarySuiteLabel}
                  <ArrowRight size={11} />
                </Link>
              )}
            </div>
            <Link href={config.suiteHref} className="btn-base btn-primary flex-shrink-0 group">
              {config.suiteLabel}
              <ArrowRight size={14} className="arrow-icon" />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTA />
      <Footer />
    </>
  )
}
