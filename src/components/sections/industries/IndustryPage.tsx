'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Heart, Activity, Brain, Laptop, Factory, Landmark, Users, Plane, Shield, type LucideIcon } from 'lucide-react'
import BookDemoButton from '@/components/BookDemoButton'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Panel components (all imports live in the client component)
import CallOffManagementPanel from '@/components/ui/panels/CallOffManagementPanel'
import ScheduleOptimizerPanel from '@/components/ui/panels/ScheduleOptimizerPanel'
import RCMPanel               from '@/components/ui/panels/RCMPanel'
import APARPanel               from '@/components/ui/panels/APARPanel'
import CapacityPlannerPanel    from '@/components/ui/panels/CapacityPlannerPanel'
import CredentialingPanel      from '@/components/ui/panels/CredentialingPanel'
import EVVPanel                from '@/components/ui/panels/EVVPanel'
import CompliancePanel         from '@/components/ui/panels/CompliancePanel'
import REITPanel               from '@/components/ui/panels/REITPanel'
import AutoApprovalPanel       from '@/components/ui/panels/AutoApprovalPanel'

// ─── KEY MAPS (all serializable from server pages) ────────────────

export type PanelKey =
  | 'call-off-management'
  | 'schedule-optimizer'
  | 'rcm'
  | 'apar'
  | 'capacity-planner'
  | 'credentialing'
  | 'evv'
  | 'compliance'
  | 'reit'
  | 'auto-approval'

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
  'credentialing':       CredentialingPanel,
  'evv':                 EVVPanel,
  'compliance':          CompliancePanel,
  'reit':                REITPanel,
  'auto-approval':       AutoApprovalPanel,
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
  panelKey: PanelKey
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
  panels?: PanelSpotlight[]
  subIndustries: SubIndustry[]
  suiteHref: string
  suiteLabel: string
  suiteAgentCount: string
  suiteDescription: string
  secondarySuiteHref?: string
  secondarySuiteLabel?: string
}

// ─── SCENARIO CAROUSEL ───────────────────────────────────────────

function ScenarioCarousel({ scenarios, accentColor }: { scenarios: ScenarioCard[]; accentColor: string }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const advance = useCallback(
    () => setActive(i => (i + 1) % scenarios.length),
    [scenarios.length]
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(advance, 5000)
    return () => clearInterval(id)
  }, [advance, paused, active])

  const goTo = (i: number) => setActive(i)
  const prev = () => goTo((active - 1 + scenarios.length) % scenarios.length)
  const next = () => goTo((active + 1) % scenarios.length)

  const card = scenarios[active]
  const Panel = PANEL_MAP[card.panelKey]

  const navBtnStyle: React.CSSProperties = {
    width: '32px', height: '32px', borderRadius: '50%',
    border: '1px solid rgba(107,63,160,0.15)',
    background: 'rgba(107,63,160,0.04)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(107,63,160,0.08)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(107,63,160,0.05)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%]">

        {/* ── LEFT: story text ── */}
        <div style={{
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(107,63,160,0.015)',
          borderRight: '1px solid rgba(107,63,160,0.06)',
        }}>
          {/* Slide counter */}
          <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(107,63,160,0.35)', marginBottom: '20px', letterSpacing: '0.06em' }}>
            {String(active + 1).padStart(2, '0')} / {String(scenarios.length).padStart(2, '0')}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {/* Incident badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                <span className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>{card.time}</span>
                <span style={{ color: 'rgba(107,63,160,0.25)', fontSize: '11px' }}>—</span>
                <span style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '11px', color: '#6B7280' }}>{card.event}</span>
              </div>

              {/* Problem headline */}
              <h3 style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(17px, 1.8vw, 22px)',
                fontWeight: 700,
                color: '#0A0A0A',
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                marginBottom: '20px',
              }}>
                {card.problem}
              </h3>

              {/* Agent badge */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: card.agentColor,
                  background: card.agentColor + '12',
                  border: `1px solid ${card.agentColor}25`,
                  borderRadius: '20px',
                  padding: '3px 10px',
                }}>
                  {card.agent}
                </span>
              </div>

              {/* Resolution */}
              <p style={{ fontFamily: 'var(--font-geist-sans)', fontSize: '13px', color: '#4B5563', lineHeight: 1.7, marginBottom: '12px' }}>
                <span style={{ color: '#16A34A', fontWeight: 600, marginRight: '4px' }}>✓</span>
                {card.resolution}
              </p>

              {/* Metric */}
              <p style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '11px', color: 'rgba(107,63,160,0.50)', marginBottom: '28px' }}>
                {card.metric}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div style={{ height: '2px', background: 'rgba(107,63,160,0.08)', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px' }}>
            <motion.div
              key={`bar-${active}-${paused}`}
              initial={{ width: '0%' }}
              animate={{ width: paused ? '0%' : '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
              style={{ height: '100%', background: accentColor, borderRadius: '2px' }}
            />
          </div>

          {/* Navigation: dots + arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {scenarios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: i === active ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === active ? accentColor : 'rgba(107,63,160,0.18)',
                    transition: 'all 250ms ease',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <div style={{ flex: 1 }} />

            {/* Arrow buttons */}
            <button onClick={prev} style={navBtnStyle}>
              <ChevronLeft size={14} style={{ color: 'rgba(107,63,160,0.55)' }} />
            </button>
            <button onClick={next} style={navBtnStyle}>
              <ChevronRight size={14} style={{ color: 'rgba(107,63,160,0.55)' }} />
            </button>
          </div>
        </div>

        {/* ── RIGHT: animated panel ── */}
        <div style={{ minHeight: '500px', overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`panel-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {Panel && <Panel />}
            </motion.div>
          </AnimatePresence>
        </div>

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
            <p className="text-label">IN YOUR OPERATIONS</p>
            <h2
              className="font-display font-bold text-ink mt-2"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-0.03em', lineHeight: '1.2' }}
            >
              What this actually looks like when an agent handles it instead of your team.
            </h2>
          </motion.div>

          <ScenarioCarousel scenarios={config.scenarios} accentColor={config.categoryColor} />
        </div>
      </section>

      {/* ── 3. WHO WE SERVE ── */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.55)' }}>
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label">THE ORGANIZATIONS</p>
            <h2
              className="font-display font-bold text-ink mt-2"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-0.03em', lineHeight: '1.2' }}
            >
              Industries where gaps have consequences.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {config.subIndustries.map((sub, i) => (
              <SubIndustryTile key={i} sub={sub} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SUITE BRIDGE CTA ── */}
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

      <Footer />
    </>
  )
}
