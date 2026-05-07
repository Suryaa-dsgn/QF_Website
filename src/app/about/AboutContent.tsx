'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Users, ShieldCheck } from 'lucide-react'
import BookDemoButton from '@/components/BookDemoButton'

// ─── TEAM DATA ────────────────────────────────────────────────────

const team = [
  { name: 'Shudhanshu Shekhar', role: 'Founder & CEO', initials: 'SS' },
  { name: 'Sundar Puli',        role: 'Co-Founder',    initials: 'SP' },
  { name: 'Anuj Singh',         role: 'Co-Founder',    initials: 'AS' },
  { name: 'Sagar Singh',        role: 'Co-Founder',    initials: 'SS' },
]

// ─── VALUES DATA ──────────────────────────────────────────────────

const values = [
  {
    icon: Zap,
    title: 'Speed over process',
    description:
      "Operations can't wait. Our agents go live in 72 hours, not 72 weeks — with zero disruption to your existing stack.",
  },
  {
    icon: Users,
    title: 'Operators first',
    description:
      'Every feature is designed for the people running shifts, not just reviewing dashboards. We built this from the floor up.',
  },
  {
    icon: ShieldCheck,
    title: 'AI that earns trust',
    description:
      'Transparent actions, clear reasoning. Agents that work alongside your team — not instead of it.',
  },
]

// ─── TEAM CARD ────────────────────────────────────────────────────

function TeamCard({
  name,
  role,
  initials,
  index,
}: {
  name: string
  role: string
  initials: string
  index: number
}) {
  return (
    <motion.div
      className="card card-hover text-center p-8 flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Initials avatar — 80px (larger than homepage 64px) */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
        style={{ background: 'var(--brand)' }}
      >
        <span
          className="font-display font-bold text-white"
          style={{ fontSize: '22px', letterSpacing: '-0.02em' }}
        >
          {initials}
        </span>
      </div>
      <p
        className="font-display font-bold text-ink mb-1.5 leading-snug"
        style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
      >
        {name}
      </p>
      <p className="text-[13px] text-ink3 font-ui">{role}</p>
    </motion.div>
  )
}

// ─── VALUE CARD ───────────────────────────────────────────────────

function ValueCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType
  title: string
  description: string
  index: number
}) {
  return (
    <motion.div
      className="rounded-[16px] border border-[--border] p-6 bg-white flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--brand-08)' }}
      >
        <Icon size={18} style={{ color: 'var(--brand)' }} />
      </div>
      <div>
        <p
          className="font-display font-bold text-ink mb-2"
          style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
        >
          {title}
        </p>
        <p className="text-[14px] text-ink3 font-ui leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// ─── MAIN CONTENT ─────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <>
      {/* ── A) Hero header ── */}
      <section className="pt-[100px] pb-[80px] sm:pt-[120px] sm:pb-[100px]">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="text-center max-w-[680px] mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label mb-4">ABOUT US</p>
            <h1
              className="font-display font-bold text-ink mb-5"
              style={{
                fontSize:      'clamp(32px, 4vw, 56px)',
                letterSpacing: '-0.035em',
                lineHeight:    '1.05',
              }}
            >
              Built by operators,
              <br />
              <span className="italic text-brand">for operators.</span>
            </h1>
            <p className="text-[16px] text-ink3 font-ui leading-relaxed">
              Quickflows.ai automates the high-volume, time-critical work across
              workforce and financial operations — so your team can focus on what
              humans do best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── B) Mission card ── */}
      <section className="pb-[60px]">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="rounded-[20px] px-10 py-9 flex flex-col md:flex-row items-start md:items-center gap-8"
            style={{
              background: 'var(--brand-08)',
              border:     '1px solid var(--border)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1">
              <p
                className="font-display font-bold text-ink mb-3"
                style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
              >
                Our mission
              </p>
              <p className="text-[15px] text-ink3 font-ui leading-relaxed max-w-[640px]">
                To eliminate the operational blind spots and manual bottlenecks that cost
                healthcare and operations teams millions every year — replacing spreadsheets,
                phone trees, and gut-feel decisions with intelligent, always-on AI agents that
                act in real time, in your existing workflows, without a months-long
                implementation.
              </p>
            </div>
            <BookDemoButton className="btn-base btn-ghost group flex-shrink-0">
              See it in action
              <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
            </BookDemoButton>
          </motion.div>
        </div>
      </section>

      {/* ── C) What We Believe ── */}
      <section className="pb-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label mb-3">WHAT WE BELIEVE</p>
            <h2
              className="font-display font-bold text-ink"
              style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', letterSpacing: '-0.03em' }}
            >
              The principles behind every agent we build.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <ValueCard key={v.title} {...v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── D) Team section ── */}
      <section className="pb-[80px]">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-label mb-3">OUR TEAM</p>
            <h2
              className="font-display font-bold text-ink"
              style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', letterSpacing: '-0.03em' }}
            >
              The people behind the platform.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <TeamCard key={member.name} {...member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── E) Bottom CTA strip ── */}
      <section className="pb-[100px] sm:pb-[120px]">
        <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
          <motion.div
            className="rounded-[20px] px-10 py-12 flex flex-col items-center text-center gap-5"
            style={{
              background: 'var(--brand-08)',
              border:     '1px solid var(--border)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-display font-bold text-ink"
              style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.03em' }}
            >
              Ready to see Quickflows in action?
            </h2>
            <p className="text-[15px] text-ink3 font-ui leading-relaxed max-w-[460px]">
              20 minutes. No prep needed. See three agents working live in your
              operational context.
            </p>
            <BookDemoButton className="btn-base btn-primary">
              Book a 20-min demo →
            </BookDemoButton>
          </motion.div>
        </div>
      </section>
    </>
  )
}
