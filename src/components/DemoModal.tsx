'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react'

// ─── TYPES ────────────────────────────────────────────────────────

interface FormData {
  name:      string
  email:     string
  company:   string
  role:      string
  interests: string[]
  teamSize:  string
  message:   string
}

const INITIAL: FormData = {
  name: '', email: '', company: '', role: '',
  interests: [], teamSize: '', message: '',
}

// ─── OPTIONS ──────────────────────────────────────────────────────

const interestOptions = [
  {
    id:    'workforce',
    label: 'Workforce Agents',
    sub:   'Scheduling, credentialing, shift coverage & swap automation',
  },
  {
    id:    'financial',
    label: 'Financial Agents',
    sub:   'AR/AP matching, collections, contract compliance auditing',
  },
]

const teamSizes = ['1–50', '51–200', '201–1,000', '1,000+']

// ─── FIELD ────────────────────────────────────────────────────────

function Field({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-ink font-ui">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="h-10 w-full rounded-[10px] border border-[--border] bg-white px-3.5 text-[14px] text-ink font-ui placeholder:text-ink4 focus:outline-none focus:ring-2 focus:ring-[--brand] focus:border-transparent transition-all duration-150"
      />
    </div>
  )
}

// ─── SLIDE VARIANTS ───────────────────────────────────────────────

const slide = {
  enter:  (d: number) => ({ x: d * 36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (d: number) => ({ x: d * -36, opacity: 0 }),
}

// ─── MAIN MODAL ───────────────────────────────────────────────────

export default function DemoModal() {
  const [open, setOpen]   = useState(false)
  const [step, setStep]   = useState(1)
  const [dir,  setDir]    = useState(1)
  const [form, setForm]   = useState<FormData>(INITIAL)

  /* ── Trigger via custom event ── */
  useEffect(() => {
    const handler = () => { setOpen(true); setStep(1); setDir(1); setForm(INITIAL) }
    window.addEventListener('open-demo', handler)
    return () => window.removeEventListener('open-demo', handler)
  }, [])

  /* ── Escape key ── */
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => { setStep(1); setForm(INITIAL) }, 320)
  }

  const update =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const toggleInterest = (id: string) =>
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id],
    }))

  const goNext = () => { setDir(1);  setStep(s => s + 1) }
  const goBack = () => { setDir(-1); setStep(s => s - 1) }

  const step1Valid = form.name.trim() && form.email.includes('@') && form.company.trim()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(10,10,10,0.5)', backdropFilter: 'blur(6px)' }}
            onClick={handleClose}
          />

          {/* ── Modal card ── */}
          <motion.div
            className="relative bg-white rounded-[24px] w-full max-w-[520px] overflow-hidden"
            style={{
              boxShadow:
                '0 0 0 1px rgba(107,63,160,0.08), 0 24px 80px rgba(107,63,160,0.18), 0 8px 24px rgba(0,0,0,0.10)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{    scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Progress bar (steps 1-2) ── */}
            {step < 3 && (
              <div className="h-[3px] w-full" style={{ background: 'var(--border)' }}>
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--brand)' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}

            {/* ── Modal header (steps 1-2) ── */}
            {step < 3 && (
              <div className="flex items-start justify-between px-8 pt-7">
                <div>
                  <p className="text-label mb-1">Talk to an Expert</p>
                  <p className="text-[12px] text-ink4 font-ui">
                    Step {step} of 2 — {step === 1 ? 'Your details' : 'What to show you'}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[--brand-08] text-ink4 hover:text-ink mt-0.5"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* ── Animated step content ── */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>

                {/* ─────── STEP 1 ─────── */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 pt-5 pb-8"
                  >
                    <h2
                      className="font-display font-bold text-ink mb-1"
                      style={{ fontSize: '22px', letterSpacing: '-0.025em' }}
                    >
                      Tell us about you.
                    </h2>
                    <p className="text-[14px] text-ink3 font-ui mb-6 leading-relaxed">
                      We&apos;ll personalise the demo to your actual operations.
                    </p>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Full Name"  id="name"
                          placeholder="Jane Smith"
                          value={form.name}  onChange={update('name')}
                          required
                        />
                        <Field
                          label="Work Email" id="email" type="email"
                          placeholder="jane@company.com"
                          value={form.email} onChange={update('email')}
                          required
                        />
                      </div>
                      <Field
                        label="Company"    id="company"
                        placeholder="Acme Health Systems"
                        value={form.company} onChange={update('company')}
                        required
                      />
                      <Field
                        label="Your Role"  id="role"
                        placeholder="e.g. VP of Operations"
                        value={form.role}  onChange={update('role')}
                      />
                    </div>

                    <button
                      onClick={goNext}
                      disabled={!step1Valid}
                      className="btn-base btn-primary w-full text-center mt-7"
                      style={{ opacity: step1Valid ? 1 : 0.4, cursor: step1Valid ? 'pointer' : 'not-allowed' }}
                    >
                      Continue
                      <ArrowRight size={14} className="arrow-icon" />
                    </button>
                  </motion.div>
                )}

                {/* ─────── STEP 2 ─────── */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="px-8 pt-5 pb-8"
                  >
                    <h2
                      className="font-display font-bold text-ink mb-1"
                      style={{ fontSize: '22px', letterSpacing: '-0.025em' }}
                    >
                      What would you like to see?
                    </h2>
                    <p className="text-[14px] text-ink3 font-ui mb-6 leading-relaxed">
                      Select one or both — we&apos;ll run a live session tailored to your verticals.
                    </p>

                    {/* Interest selector */}
                    <div className="mb-5">
                      <p className="text-[11px] font-semibold text-ink4 font-ui uppercase tracking-[0.07em] mb-2.5">
                        Agent Suite
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {interestOptions.map(opt => {
                          const sel = form.interests.includes(opt.id)
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => toggleInterest(opt.id)}
                              className="flex items-center gap-4 p-4 rounded-[14px] border text-left transition-all duration-150"
                              style={{
                                borderColor: sel ? 'var(--brand)' : 'rgba(107,63,160,0.10)',
                                background:  sel ? 'var(--brand-08)' : '#FAFAFA',
                              }}
                            >
                              {/* Custom checkbox */}
                              <div
                                className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150"
                                style={{
                                  borderColor: sel ? 'var(--brand)' : 'rgba(0,0,0,0.18)',
                                  background:  sel ? 'var(--brand)' : 'transparent',
                                }}
                              >
                                {sel && <Check size={11} className="text-white" strokeWidth={3} />}
                              </div>
                              <div>
                                <p className="text-[14px] font-semibold text-ink font-ui leading-none mb-1">
                                  {opt.label}
                                </p>
                                <p className="text-[12px] text-ink4 font-ui leading-snug">{opt.sub}</p>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Team size */}
                    <div className="mb-5">
                      <p className="text-[11px] font-semibold text-ink4 font-ui uppercase tracking-[0.07em] mb-2.5">
                        Team Size
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {teamSizes.map(size => {
                          const sel = form.teamSize === size
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setForm(p => ({ ...p, teamSize: size }))}
                              className="px-4 py-2 rounded-pill text-[13px] font-ui font-medium border transition-all duration-150"
                              style={{
                                borderColor: sel ? 'var(--brand)' : 'rgba(107,63,160,0.10)',
                                background:  sel ? 'var(--brand)' : '#FAFAFA',
                                color:       sel ? 'white' : 'var(--ink3)',
                              }}
                            >
                              {size}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 mb-7">
                      <label className="text-[13px] font-medium text-ink font-ui">
                        Anything specific to prepare?
                        <span className="text-ink4 ml-1 font-normal">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Focus on shift-swap automation for our nursing staff…"
                        value={form.message}
                        onChange={update('message')}
                        className="w-full rounded-[10px] border border-[--border] bg-white px-3.5 py-2.5 text-[14px] text-ink font-ui placeholder:text-ink4 focus:outline-none focus:ring-2 focus:ring-[--brand] focus:border-transparent transition-all duration-150 resize-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button
                        onClick={goBack}
                        className="btn-base btn-ghost flex-shrink-0 gap-1.5"
                      >
                        <ArrowLeft size={14} />
                        Back
                      </button>
                      <button
                        onClick={goNext}
                        className="btn-base btn-primary flex-1 text-center"
                      >
                        Book My Demo
                        <ArrowRight size={14} className="arrow-icon" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─────── SUCCESS ─────── */}
                {step === 3 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 py-14 flex flex-col items-center text-center"
                  >
                    {/* Animated check */}
                    <motion.div
                      className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'var(--brand)' }}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.08, duration: 0.45, type: 'spring', stiffness: 280, damping: 18 }}
                    >
                      <Check size={32} className="text-white" strokeWidth={2.5} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h2
                        className="font-display font-bold text-ink mb-2"
                        style={{ fontSize: '26px', letterSpacing: '-0.03em' }}
                      >
                        You&apos;re all set!
                      </h2>
                      <p className="text-[15px] text-ink3 font-ui leading-relaxed max-w-[340px] mb-8">
                        We&apos;ll reach out within a few hours to confirm your
                        20-minute live session — no slides, just working agents.
                      </p>

                      <div
                        className="rounded-[14px] px-5 py-4 mb-8 text-left"
                        style={{ background: 'var(--brand-08)', border: '1px solid var(--border)' }}
                      >
                        {[
                          '✓ Personalised to your vertical',
                          '✓ Live agents, your use case',
                          '✓ No prep needed from your side',
                        ].map(item => (
                          <p key={item} className="text-[13px] text-ink3 font-ui py-1">{item}</p>
                        ))}
                      </div>

                      <button onClick={handleClose} className="btn-base btn-ghost">
                        Done
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
