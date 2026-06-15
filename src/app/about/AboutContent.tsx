'use client'

import { motion } from 'framer-motion'
import { Zap, Users, ShieldCheck } from 'lucide-react'

// ─── CONSTANTS ────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const

const stats = [
  { value: '30+',  label: 'AI agents configured' },
  { value: '<100hr', label: 'Average time to live'  },
  { value: '15+',  label: 'Industries served'     },
]

const missionParagraphs = [
  "Most operational failures aren't dramatic. They're quiet. A missed shift. An unmatched invoice. A credential that nobody renewed.",
  "These aren't technology problems — they're coordination problems. They happen when the right data exists in one system and the right action never follows in another.",
  "Our mission is to design and deploy intelligent systems that solve complex operational, financial, and workforce challenges across industries. We transform how organizations operate through purpose-built AI agents — not by replacing your team, but by handling the work that shouldn't require them in the first place.",
]

const values = [
  {
    icon: Zap,
    tag: 'SPEED',
    title: 'Speed over process',
    description:
      "Operations don't pause for onboarding. Standard environments go live in under 100 hours — no consultants, no scripting phase, no project team required.",
  },
  {
    icon: Users,
    tag: 'OPERATORS',
    title: 'Operators first',
    description:
      "Every feature is designed for the person who needs a shift filled at 6am — not the person who reviews the report about it on Friday.",
  },
  {
    icon: ShieldCheck,
    tag: 'TRUST',
    title: 'AI that earns trust',
    description:
      'Every decision is logged, auditable, and visible to your team. Nothing happens in a black box. Your team sets the rules. Agents follow them.',
  },
]

const team = [
  { name: 'Shudhanshu Shekhar', role: 'Founder & CEO', initials: 'SS' },
  { name: 'Sundar Puli',        role: 'Co-Founder',    initials: 'SP' },
  { name: 'Anuj Singh',         role: 'Co-Founder',    initials: 'AS' },
  { name: 'Sagar Singh',        role: 'Co-Founder',    initials: 'SS' },
]

// ─── MAIN CONTENT ─────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <PrinciplesSection />
      {/* <TeamSection /> — hidden until bios are ready */}
      <CTASection />
    </>
  )
}

// ─── A) HERO ──────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="pt-[100px] pb-0 sm:pt-[120px]">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Header — centered, max 640px */}
        <motion.div
          className="text-center mx-auto"
          style={{ maxWidth: '640px' }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-label mb-5">ABOUT US</p>
          <h1
            className="font-display font-bold text-ink mb-6"
            style={{
              fontSize:      'clamp(36px, 4.5vw, 56px)',
              letterSpacing: '-0.04em',
              lineHeight:    '1.05',
            }}
          >
            Most software reports the problem.
            <br />
            Quickflows closes it.
          </h1>
          <p
            className="font-ui leading-[1.75]"
            style={{ fontSize: '16px', color: '#6B6B6B', maxWidth: '520px', margin: '0 auto' }}
          >
            We spent years inside operations teams watching coordinators, billing
            staff, and compliance officers burn hours on work that a well-configured
            system should handle. Quickflows is what we built instead.
          </p>
        </motion.div>

        {/* Micro-stats strip */}
        <motion.div
          className="mt-16 grid grid-cols-3"
          style={{ borderTop: '1px solid var(--border)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center py-8 sm:py-10"
              style={{ borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}
            >
              <span
                className="font-mono font-medium text-ink"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span
                className="font-ui text-ink4 mt-2"
                style={{ fontSize: '12px', letterSpacing: '0.01em' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ─── B) MISSION (DARK SECTION) ────────────────────────────────────

function MissionSection() {
  return (
    <section className="dark-section w-full py-20 lg:py-28 mt-0">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start">

          {/* Left — anchor headline */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              className="font-ui mb-5"
              style={{
                fontSize:      '11px',
                fontWeight:    500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color:         'rgba(196,181,253,0.5)',
              }}
            >
              OUR MISSION
            </p>
            <h2
              className="font-display font-bold text-white"
              style={{
                fontSize:      'clamp(28px, 4vw, 44px)',
                letterSpacing: '-0.035em',
                lineHeight:    '1.05',
              }}
            >
              The operational gap is solvable.
            </h2>
            <div
              style={{
                width:      '48px',
                height:     '1px',
                background: 'rgba(255,255,255,0.15)',
                marginTop:  '24px',
              }}
            />
          </motion.div>

          {/* Right — three paragraphs */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {missionParagraphs.map((p, i) => (
              <p
                key={i}
                className="font-ui leading-[1.75]"
                style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)' }}
              >
                {p}
              </p>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── C) PRINCIPLES ────────────────────────────────────────────────

function PrinciplesSection() {
  return (
    <section className="py-20 lg:py-28" style={{ background: 'var(--brand-08)' }}>
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-label mb-4">WHAT WE BELIEVE</p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(26px, 3vw, 40px)', letterSpacing: '-0.035em', lineHeight: '1.05' }}
          >
            The principles behind every agent we build.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                style={{
                  background:     'radial-gradient(circle, rgba(107,63,160,0.07) 1px, transparent 1px), linear-gradient(145deg, rgba(107,63,160,0.04) 0%, #FFFFFF 55%)',
                  backgroundSize: '20px 20px, 100% 100%',
                  border:        '1px solid rgba(107,63,160,0.09)',
                  borderRadius:  '20px',
                  padding:       '32px',
                  position:      'relative',
                  overflow:      'hidden',
                  display:       'flex',
                  flexDirection: 'column',
                  boxShadow:     '0 2px 12px rgba(107,63,160,0.06)',
                  transition:    'transform 250ms ease-out, box-shadow 250ms ease-out, border-color 250ms ease-out, background 250ms ease-out',
                  cursor:        'default',
                }}
                onMouseEnter={e => {
                  const t = e.currentTarget
                  t.style.transform      = 'translateY(-4px)'
                  t.style.borderColor    = 'rgba(107,63,160,0.20)'
                  t.style.boxShadow      = '0 16px 48px rgba(107,63,160,0.10), 0 4px 12px rgba(107,63,160,0.05)'
                  t.style.background     = 'radial-gradient(circle, rgba(107,63,160,0.09) 1px, transparent 1px), linear-gradient(145deg, rgba(107,63,160,0.07) 0%, #FFFFFF 55%)'
                  t.style.backgroundSize = '20px 20px, 100% 100%'
                }}
                onMouseLeave={e => {
                  const t = e.currentTarget
                  t.style.transform      = 'translateY(0)'
                  t.style.borderColor    = 'rgba(107,63,160,0.09)'
                  t.style.boxShadow      = '0 2px 12px rgba(107,63,160,0.06)'
                  t.style.background     = 'radial-gradient(circle, rgba(107,63,160,0.07) 1px, transparent 1px), linear-gradient(145deg, rgba(107,63,160,0.04) 0%, #FFFFFF 55%)'
                  t.style.backgroundSize = '20px 20px, 100% 100%'
                }}
              >
                {/* Accent mark — short top-edge line */}
                <div style={{
                  position:     'absolute',
                  top:          0,
                  left:         '32px',
                  width:        '28px',
                  height:       '2px',
                  background:   '#6B3FA0',
                  borderRadius: '0 0 2px 2px',
                }} />

                {/* Ghost icon watermark */}
                <div style={{
                  position:      'absolute',
                  bottom:        '20px',
                  right:         '20px',
                  pointerEvents: 'none',
                  userSelect:    'none',
                  lineHeight:    0,
                }}>
                  <Icon size={88} style={{ color: 'rgba(107,63,160,0.07)' }} />
                </div>

                {/* 3D icon badge */}
                <div style={{
                  width:          '48px',
                  height:         '48px',
                  borderRadius:   '14px',
                  background:     'linear-gradient(145deg, rgba(107,63,160,0.16) 0%, rgba(107,63,160,0.09) 100%)',
                  border:         '1px solid rgba(107,63,160,0.18)',
                  boxShadow:      'inset 0 1px 0 rgba(255,255,255,0.80), 0 4px 14px rgba(107,63,160,0.20), 0 1px 3px rgba(107,63,160,0.10)',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  marginBottom:   '24px',
                  flexShrink:     0,
                }}>
                  <Icon size={22} style={{ color: '#6B3FA0' }} />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-ink"
                  style={{ fontSize: '18px', letterSpacing: '-0.03em', lineHeight: '1.2', marginBottom: '12px' }}
                >
                  {v.title}
                </h3>

                {/* Description */}
                <p
                  className="font-ui"
                  style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.75', flex: 1 }}
                >
                  {v.description}
                </p>

                {/* Footer tag */}
                <div style={{
                  marginTop:    '28px',
                  paddingTop:   '20px',
                  borderTop:    '1px solid rgba(107,63,160,0.07)',
                }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize:      '9px',
                      fontWeight:    600,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color:         'rgba(107,63,160,0.40)',
                    }}
                  >
                    {v.tag}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

// ─── D) TEAM ──────────────────────────────────────────────────────

function TeamSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-label mb-4">THE FOUNDING TEAM</p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-0.035em', lineHeight: '1.05' }}
          >
            The founding team.
          </h2>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member, i) => (
            /*
              TODO: Replace placeholder with:
              - Real photo (circular crop, min 160×160px, professional)
              - Verified bio sentence (see format below)

              Bio sentence format:
              "[Name] spent [X] years in [relevant background/industry]
              before [co-founding Quickflows / building X]."

              Write it in third person. Lead with something they did,
              not something they believe or are passionate about.
            */
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              style={{
                background:   '#FFFFFF',
                border:       '1px solid var(--border)',
                borderRadius: '20px',
                overflow:     'hidden',   /* clips accent bar to card radius */
              }}
            >
              {/* Top accent bar — 3px brand purple strip */}
              <div style={{ height: '3px', width: '100%', background: '#6B3FA0' }} />

              {/* Card content */}
              <div
                className="flex flex-col items-center text-center"
                style={{ padding: '28px' }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center mb-4 flex-shrink-0"
                  style={{
                    width:        '88px',
                    height:       '88px',
                    borderRadius: '50%',
                    background:   'rgba(107,63,160,0.08)',
                    border:       '1px solid var(--border)',
                  }}
                >
                  <span
                    className="font-display font-bold"
                    style={{ fontSize: '22px', color: '#6B3FA0', letterSpacing: '-0.02em' }}
                  >
                    {member.initials}
                  </span>
                </div>

                {/* Name */}
                <p
                  className="font-display font-bold text-ink mb-1 leading-snug"
                  style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
                >
                  {member.name}
                </p>

                {/* Role — brand color */}
                <p
                  className="font-ui mb-4"
                  style={{ fontSize: '12px', color: '#6B3FA0', fontWeight: 500, letterSpacing: '0.01em' }}
                >
                  {member.role}
                </p>

                {/* Bio placeholder */}
                <p
                  className="font-ui italic leading-snug"
                  style={{ fontSize: '12px', color: '#A0A0A0' }}
                >
                  Background and bio coming soon.
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── E) CTA (SOLID BRAND PURPLE) ─────────────────────────────────

function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[960px] mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            background:   '#6B3FA0',
            borderRadius: '24px',
            overflow:     'hidden',
            position:     'relative',
            padding:      'clamp(48px, 8vw, 72px) clamp(32px, 6vw, 64px)',
          }}
        >
          {/* Layer 1: dot-grid overlay */}
          <div
            style={{
              position:            'absolute',
              inset:               0,
              backgroundImage:     'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
              backgroundSize:      '28px 28px',
              pointerEvents:       'none',
              zIndex:              0,
            }}
          />

          {/* Layer 2: white radial glow bottom-right */}
          <div
            style={{
              position:   'absolute',
              bottom:     '-40px',
              right:      '-40px',
              width:      '320px',
              height:     '320px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex:     0,
            }}
          />

          {/* Content */}
          <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>

            {/* Label */}
            <p
              className="font-ui mb-4"
              style={{
                fontSize:      '11px',
                fontWeight:    500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color:         'rgba(255,255,255,0.45)',
              }}
            >
              GET STARTED
            </p>

            {/* Headline */}
            <h2
              className="font-display font-bold text-white mb-4 mx-auto"
              style={{
                fontSize:      'clamp(26px, 3.5vw, 44px)',
                letterSpacing: '-0.035em',
                lineHeight:    '1.05',
                maxWidth:      '580px',
              }}
            >
              See Quickflows working live.
            </h2>

            {/* Sub-copy */}
            <p
              className="font-ui mb-8 mx-auto"
              style={{
                fontSize:   '15px',
                color:      'rgba(255,255,255,0.60)',
                lineHeight: '1.7',
                maxWidth:   '400px',
              }}
            >
              20 minutes. No prep needed.
              We&apos;ll show you three agents running in scenarios that
              match your actual operations.
            </p>

            {/* White primary button — dispatches demo modal event */}
            <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
              <button
                onClick={() => window.dispatchEvent(new Event('open-demo'))}
                className="btn-base"
                style={{
                  background: '#FFFFFF',
                  color:      '#6B3FA0',
                  border:     'none',
                  fontWeight: 600,
                }}
              >
                Talk to an Expert →
              </button>
            </div>

            {/* Trust line */}
            <p
              className="font-ui"
              style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}
            >
              No credit card required &nbsp;·&nbsp; First agent live in under 100 hours
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
