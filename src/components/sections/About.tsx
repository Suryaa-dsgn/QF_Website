'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BookDemoButton from '@/components/BookDemoButton'

// ─── TEAM DATA ────────────────────────────────────────────────────

const team = [
  { name: 'Shudhanshu Shekhar', role: 'Founder & CEO', initials: 'SS' },
  { name: 'Sundar Puli',        role: 'Co-Founder',     initials: 'SP' },
  { name: 'Anuj Singh',         role: 'Co-Founder',     initials: 'AS' },
  { name: 'Sagar Singh',        role: 'Co-Founder',     initials: 'SS' },
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
      className="card card-hover text-center p-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Initials avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
        style={{ background: '#E5E7EB' }}
      >
        <span
          className="font-display font-bold"
          style={{ fontSize: '18px', letterSpacing: '-0.02em', color: '#6B6B6B' }}
        >
          {initials}
        </span>
      </div>

      {/* Name */}
      <p
        className="font-display font-bold text-ink mb-1 leading-snug"
        style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
      >
        {name}
      </p>

      {/* Role */}
      <p className="text-[13px] text-ink3 font-ui">{role}</p>
    </motion.div>
  )
}

// ─── MAIN SECTION ─────────────────────────────────────────────────

export default function About() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1120px] mx-auto px-10">

        {/* ── Section header ── */}
        <motion.div
          className="text-center max-w-[680px] mx-auto mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-label mb-4">ABOUT US</p>
          <h2
            className="font-display font-bold text-ink mb-5"
            style={{
              fontSize:      'clamp(30px, 3.8vw, 48px)',
              letterSpacing: '-0.035em',
              lineHeight:    '1.05',
            }}
          >
            A team that has been on both sides of operational drag.
          </h2>
          <p className="text-[16px] text-ink3 font-ui leading-relaxed">
            Quickflows.ai is an operations automation platform built for healthcare,
            staffing, and financial teams that keep essential services running. We automate
            the high-volume, time-critical work — shift coverage, credentialing, billing
            reconciliation — so your team can focus on work that actually moves the business.
          </p>
        </motion.div>

        {/* ── Mission card ── */}
        <motion.div
          className="rounded-[20px] px-10 py-9 mb-16 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{
            background:   'var(--brand-08)',
            border:       '1px solid var(--border)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex-1">
            <p
              className="font-display font-bold text-ink mb-2"
              style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '-0.025em', lineHeight: '1.15' }}
            >
              Our mission
            </p>
            <p className="text-[15px] text-ink3 font-ui leading-relaxed max-w-[620px]">
              To eliminate the operational blind spots and manual bottlenecks that cost
              healthcare and operations teams millions every year — replacing spreadsheets,
              phone trees, and gut-feel decisions with intelligent, always-on AI agents that
              act in real time.
            </p>
          </div>
          <BookDemoButton className="btn-base btn-ghost group flex-shrink-0">
            Watch it run
            <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
          </BookDemoButton>
        </motion.div>

        {/* ── Team subsection ── */}
        <div>
          {/* Sub-label */}
          <motion.p
            className="text-label text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            OUR TEAM
          </motion.p>

          {/* 4-col card grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <TeamCard key={member.name} {...member} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
