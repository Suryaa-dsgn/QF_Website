'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

// ─── DATA ─────────────────────────────────────────────────────────

interface FaqItem {
  q: string
  a: string
}

interface FaqSection {
  id: string
  label: string
  items: FaqItem[]
}

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: 'implementation',
    label: 'Implementation & Setup',
    items: [
      {
        q: 'How long does it actually take to go from signed contract to agents running live?',
        a: 'Standard environments are live in under 100 hours. That\'s typically two to four weeks depending on how quickly your team completes the workflow mapping session and provides API credentials for your existing systems. Complex multi-system integrations may take an additional week. We give you a written go-live date before work begins.',
      },
      {
        q: 'Do we need to replace our existing systems — scheduling software, EHR, billing platform?',
        a: 'No. Quickflows connects to your existing systems via API. Nothing gets replaced. Agents read from and write to your current tools. If your system has an API or data export capability, we can work with it.',
      },
      {
        q: 'Do we need an internal IT team or consultants to get started?',
        a: 'No. Onboarding is handled entirely by Quickflows. We manage integration setup, configuration, and testing. You\'ll need someone who can approve API access to your existing systems — typically a 20–30 minute task. No developer resources or consultants required.',
      },
      {
        q: 'What does the onboarding process look like, step by step?',
        a: 'Four stages. First, a 90-minute workflow mapping session where we document your processes, exception rules, and escalation paths. Second, integration setup — we connect to your systems and validate data flows (2–3 days). Third, a supervised test run where agents operate on live data with a human reviewing every decision. Fourth, a controlled go-live with autonomous agents and your team monitoring the audit dashboard. Total: under 100 hours from contract to live.',
      },
    ],
  },
  {
    id: 'control',
    label: 'Control & Accountability',
    items: [
      {
        q: 'What decisions can agents make autonomously, and what gets escalated to a human?',
        a: 'You define this during configuration. By default, agents handle routine, rule-based decisions — filling an open shift from an approved candidate pool, matching an invoice to a PO within tolerance, flagging a credential renewal. Anything outside configured thresholds gets escalated immediately with full context. You set the thresholds and can adjust them at any time.',
      },
      {
        q: 'If an agent makes a wrong decision, what happens and who is accountable?',
        a: 'Every agent action is logged with a full decision trace — what data it used, what rule it applied, and what it decided. If a decision is wrong, you can see exactly why and correct the underlying rule. We are accountable for the platform performing as configured. You are accountable for the rules you set. We work through any operational errors together under our SLA.',
      },
      {
        q: 'Can we configure the rules the agents operate within?',
        a: 'Yes, fully. During onboarding we translate your existing policies — collective bargaining rules, payer contract terms, credentialing requirements — into agent configuration. After go-live, you can adjust thresholds, add exceptions, and update rules through your operations dashboard without involving Quickflows. Changes take effect immediately.',
      },
      {
        q: 'Can we pause or turn off individual agents without disrupting others?',
        a: 'Yes. Each agent runs independently. Pausing the Call-Off Management agent has no effect on the Claims Compliance agent or any other. When an agent is paused, those tasks revert to your existing manual process. You can pause, resume, or retire individual agents from the dashboard at any time.',
      },
      {
        q: 'Is there a full audit trail of every decision an agent makes?',
        a: 'Yes. Every action — every shift assignment, every invoice match, every credential flag — is logged with timestamp, data inputs, rule applied, and outcome. Audit logs are exportable and retained for a minimum of seven years to support compliance reviews, payer audits, and regulatory inquiries.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security & Compliance',
    items: [
      {
        q: 'Where is our operational data stored, and who can access it?',
        a: 'Data is stored in SOC 2 Type II compliant infrastructure within the United States. Access is restricted to your organisation\'s users and Quickflows engineers who require it for support purposes. All access is logged. We do not share your operational data with any third party.',
      },
      {
        q: 'How is data handled at the end of a contract?',
        a: 'On contract termination, your data is exported and delivered to you in full within 30 days. Following your confirmation of receipt, all data is deleted from Quickflows systems within 60 days. You receive a written deletion confirmation.',
      },
      {
        q: 'Does Quickflows use our operational data to train models?',
        a: 'No. Your operational data is used exclusively to run your agents. It is never used to train, fine-tune, or benchmark Quickflows models or any third-party model. This is contractually guaranteed.',
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing & Commercial',
    items: [
      {
        q: 'How is Quickflows priced — per agent, per seat, or by operational volume?',
        a: 'Pricing is per agent suite, not per seat or per transaction. You pay a flat monthly fee for each suite you activate (Workforce, Financial, Compliance). There are no per-transaction or per-decision charges. Volume is unlimited within your contracted suite.',
      },
      {
        q: 'Is there a minimum contract commitment?',
        a: 'The standard commitment is 12 months. We offer this because operational improvements — particularly in scheduling and claims recovery — compound over time, and short-term pilots consistently underestimate value. Quarterly contracts are available in specific circumstances; ask your account contact.',
      },
      {
        q: 'What does implementation and onboarding cost?',
        a: 'Onboarding is included in the contract for standard environments. There is no separate implementation fee for organisations with one or two systems to integrate. Complex multi-system environments with custom compliance rules may carry a scoped onboarding fee — this is identified and agreed before contract signing.',
      },
      {
        q: 'Can we start with one vertical and expand later?',
        a: 'Yes. Most customers start with Workforce Operations — it typically shows the fastest measurable return — and expand to Financial or Compliance agents in subsequent contract years. Suites are independently licensed and can be added at any renewal point.',
      },
    ],
  },
  {
    id: 'technical',
    label: 'Technical Fit',
    items: [
      {
        q: 'What happens if our data quality or historical records are incomplete?',
        a: 'Agents adapt to the data you have. We assess data quality during onboarding and flag any gaps that would affect specific capabilities. Most organisations have sufficient data to run core agents from day one. Where historical data is incomplete — for example, for credential renewal forecasting — agents begin with conservative defaults and improve as data accumulates.',
      },
      {
        q: 'Can the agents learn our specific policies and compliance rules, or do they use generic templates?',
        a: 'Every agent is configured to your specific rules — your collective bargaining agreement, your payer contracts, your credentialing requirements, your approval thresholds. There are no generic templates. Configuration is done during onboarding and owned by your organisation. Rule changes are always explicit and human-approved.',
      },
      {
        q: 'What happens if our primary systems go down?',
        a: 'Agents detect upstream system unavailability and pause affected workflows automatically. Your team receives an immediate notification. No decisions are made on incomplete data. When systems come back online, queued tasks are processed in order. Critical escalations that cannot wait are routed to your team during any outage window.',
      },
    ],
  },
  {
    id: 'commit',
    label: 'Before You Commit',
    items: [
      {
        q: 'Can we see agents running in scenarios specific to our operations before signing?',
        a: 'Yes. We run a scoped demonstration using anonymised versions of your actual workflow scenarios — not generic demos. If you can share three to five examples of current operational incidents (call-offs, denied claims, credential renewals), we build the demonstration around those. Request a demo through the contact form.',
      },
      {
        q: 'Do you work with organisations at our size and scale?',
        a: 'Quickflows is designed for mid-market to enterprise operations — typically organisations managing 150+ staff, processing 500+ invoices per month, or maintaining credentialing for 100+ providers. We work with health systems, staffing agencies, REITs, and logistics operators. If your scale falls significantly outside that range, we\'ll tell you honestly whether we\'re the right fit.',
      },
      {
        q: 'What does a typical first 30 days look like for a new customer?',
        a: 'Days 1–7: workflow mapping and integration setup. Days 8–14: supervised test run — agents active, humans reviewing every decision. Days 15–21: phased go-live, starting with the highest-volume workflows. Days 22–30: full autonomous operation with daily check-ins from your Quickflows contact. By day 30, most customers have a clear view of operational impact and are seeing measurable reductions in coordinator workload.',
      },
      {
        q: 'Will this replace our coordinators, AR team, or admin staff?',
        a: 'No — and we think this question deserves a direct answer. Agents handle the coordination work: the calls, the cross-referencing, the monitoring, the routine approvals. Your coordinators, AR staff, and admin team shift from doing that work to overseeing it. The volume they can handle increases significantly. In practice, organisations use this capacity to stop relying on overtime, reduce agency spend, and let experienced staff focus on cases that actually need human judgment. We have not seen a deployment where staff were made redundant as a direct result of Quickflows.',
      },
    ],
  },
]

// ─── ACCORDION ITEM ───────────────────────────────────────────────

function AccordionItem({
  id,
  idx,
  item,
  isOpen,
  onToggle,
}: {
  id: string
  idx: number
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div>
      {/* Question row */}
      <button
        onClick={onToggle}
        style={{
          width:          '100%',
          display:        'flex',
          alignItems:     'flex-start',
          gap:            '16px',
          padding:        '18px 0',
          textAlign:      'left',
          background:     'none',
          border:         'none',
          cursor:         'pointer',
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily:  'var(--font-geist-mono)',
            fontSize:    '11px',
            fontWeight:  600,
            color:       'rgba(107,63,160,0.35)',
            minWidth:    '24px',
            paddingTop:  '3px',
            flexShrink:  0,
            userSelect:  'none',
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>

        {/* Question text */}
        <span
          style={{
            flex:        1,
            fontSize:    '16px',
            fontWeight:  500,
            color:       '#0A0A0A',
            lineHeight:  1.45,
            fontFamily:  'var(--font-geist-sans)',
          }}
        >
          {item.q}
        </span>

        {/* Chevron */}
        <ChevronDown
          size={16}
          style={{
            color:      '#9CA3AF',
            flexShrink: 0,
            marginTop:  '3px',
            transform:  isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </button>

      {/* Answer panel */}
      <div
        style={{
          maxHeight:  isOpen ? '1000px' : '0',
          overflow:   'hidden',
          transition: 'max-height 380ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          style={{
            paddingLeft:   '40px',
            paddingBottom: '20px',
            paddingRight:  '8px',
            fontSize:      '14px',
            lineHeight:    1.8,
            color:         '#4B5563',
            fontFamily:    'var(--font-geist-sans)',
            margin:        0,
          }}
        >
          {item.a}
        </p>
      </div>

      {/* Hairline divider */}
      <div style={{ height: '1px', background: 'rgba(107,63,160,0.06)' }} />
    </div>
  )
}

// ─── FAQ SECTION BLOCK ────────────────────────────────────────────

function FaqSectionBlock({
  section,
  openItems,
  onToggle,
}: {
  section: FaqSection
  openItems: string[]
  onToggle: (id: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} id={section.id}>
      {/* Section header */}
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '16px',
          marginBottom: '4px',
          paddingTop:   '8px',
        }}
      >
        <span
          style={{
            fontSize:      '10px',
            fontWeight:    600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color:         '#6B3FA0',
            fontFamily:    'var(--font-geist-sans)',
            flexShrink:    0,
          }}
        >
          {section.label}
        </span>
        <div
          style={{
            flex:       1,
            height:     '1px',
            background: 'rgba(107,63,160,0.10)',
          }}
        />
      </div>

      {/* Top divider of first question */}
      <div style={{ height: '1px', background: 'rgba(107,63,160,0.06)' }} />

      {/* Questions */}
      {section.items.map((item, idx) => {
        const id = `${section.id}-${idx}`
        return (
          <AccordionItem
            key={id}
            id={id}
            idx={idx}
            item={item}
            isOpen={openItems.includes(id)}
            onToggle={() => onToggle(id)}
          />
        )
      })}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────

export default function FAQ() {
  const [openItems, setOpenItems]           = useState<string[]>([])
  const [activeSection, setActiveSection]   = useState<string>('implementation')
  const heroRef                             = useRef<HTMLDivElement>(null)
  const pillsRef                            = useRef<HTMLDivElement>(null)

  // Hero reveal
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)'

    const timer = setTimeout(() => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 80)
    return () => clearTimeout(timer)
  }, [])

  // IntersectionObserver — track which section is in view for active pill
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    FAQ_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function toggleItem(id: string) {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    // Account for sticky nav (60px) + sticky pills (~57px)
    const pillsHeight = pillsRef.current?.offsetHeight ?? 57
    const top = el.getBoundingClientRect().top + window.scrollY - 60 - pillsHeight - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="section-padding" style={{ paddingTop: '80px', paddingBottom: '20px' }}>
      <div
        className="max-w-[860px] mx-auto"
        style={{ paddingLeft: '24px', paddingRight: '24px' }}
      >

        {/* ── Hero header ─────────────────────────────────────────── */}
        <div ref={heroRef} style={{ marginBottom: '56px', textAlign: 'center' }}>
          <p className="text-label" style={{ marginBottom: '16px' }}>
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h1
            className="font-display font-bold text-ink"
            style={{
              fontSize:      'clamp(28px, 4vw, 48px)',
              letterSpacing: '-0.03em',
              lineHeight:    1.1,
              marginBottom:  '16px',
            }}
          >
            Honest answers to hard questions.
          </h1>
          <p
            className="font-ui text-ink3"
            style={{
              fontSize:  '15px',
              lineHeight: 1.65,
              maxWidth:  '540px',
              margin:    '0 auto',
            }}
          >
            Common questions from CIOs, CCOs, and operations teams evaluating Quickflows.
          </p>
        </div>

      </div>

      {/* ── Sticky category filter pills ────────────────────────────── */}
      <div
        ref={pillsRef}
        style={{
          position:        'sticky',
          top:             '60px',
          zIndex:          10,
          background:      'rgba(249,248,255,0.94)',
          backdropFilter:  'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom:    '1px solid rgba(107,63,160,0.07)',
          borderTop:       '1px solid rgba(107,63,160,0.05)',
          padding:         '10px 24px',
          marginBottom:    '0',
        }}
      >
        <div
          style={{
            maxWidth:    '860px',
            margin:      '0 auto',
            display:     'flex',
            gap:         '8px',
            overflowX:   'auto',
            scrollbarWidth: 'none',
          }}
          className="hide-scrollbar"
        >
          {FAQ_SECTIONS.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  fontSize:     '12px',
                  fontWeight:   500,
                  fontFamily:   'var(--font-geist-sans)',
                  padding:      '6px 14px',
                  borderRadius: '20px',
                  border:       isActive ? '1px solid transparent' : '1px solid rgba(107,63,160,0.10)',
                  background:   isActive ? '#6B3FA0' : 'rgba(107,63,160,0.05)',
                  color:        isActive ? '#FFFFFF' : '#6B7280',
                  cursor:       'pointer',
                  whiteSpace:   'nowrap',
                  flexShrink:   0,
                  transition:   'all 180ms ease',
                }}
              >
                {section.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── FAQ sections ────────────────────────────────────────────── */}
      <div
        className="max-w-[860px] mx-auto"
        style={{ paddingLeft: '24px', paddingRight: '24px' }}
      >
      <div
        style={{
          background:    '#FFFFFF',
          borderRadius:  '16px',
          padding:       '40px 32px 52px',
          display:       'flex',
          flexDirection: 'column',
          gap:           '52px',
        }}
      >
        {FAQ_SECTIONS.map((section) => (
          <FaqSectionBlock
            key={section.id}
            section={section}
            openItems={openItems}
            onToggle={toggleItem}
          />
        ))}
      </div>
      </div>

      {/* ── Download CTA ────────────────────────────────────────────── */}
      <div
        className="max-w-[860px] mx-auto"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '32px' }}
      >
        <div
          style={{
            background:    'linear-gradient(135deg, rgba(107,63,160,0.06) 0%, rgba(107,63,160,0.02) 100%)',
            border:        '1px solid rgba(107,63,160,0.12)',
            borderRadius:  '16px',
            padding:       '28px 32px',
            display:       'flex',
            alignItems:    'center',
            justifyContent: 'space-between',
            gap:           '24px',
            flexWrap:      'wrap',
          }}
        >
          <div>
            <p
              style={{
                fontSize:   '13px',
                fontWeight: 600,
                color:      '#6B3FA0',
                fontFamily: 'var(--font-geist-sans)',
                margin:     '0 0 4px',
                letterSpacing: '0.01em',
              }}
            >
              QUICKFLOWS FAQ
            </p>
            <p
              style={{
                fontSize:   '15px',
                fontWeight: 500,
                color:      '#0A0A0A',
                fontFamily: 'var(--font-geist-sans)',
                margin:     '0 0 2px',
              }}
            >
              Download the full FAQ as a PDF
            </p>
            <p
              style={{
                fontSize:   '13px',
                color:      '#6B7280',
                fontFamily: 'var(--font-geist-sans)',
                margin:     0,
              }}
            >
              23 questions across 6 categories — share with your team.
            </p>
          </div>
          <a
            href="/quickflows-faq.pdf"
            download="Quickflows-FAQ.pdf"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '12px 22px',
              background:     '#6B3FA0',
              color:          '#FFFFFF',
              borderRadius:   '10px',
              fontSize:       '14px',
              fontWeight:     600,
              fontFamily:     'var(--font-geist-sans)',
              textDecoration: 'none',
              whiteSpace:     'nowrap',
              flexShrink:     0,
              transition:     'opacity 150ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1v8M7 9l-3-3M7 9l3-3M2 12h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download PDF
          </a>
        </div>
      </div>

      {/* Bottom spacing before CTA */}
      <div style={{ height: '64px' }} />
    </section>
  )
}
