'use client'

import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Agent } from '@/data/agents'
import { agents } from '@/data/agents'
import CTA    from '@/components/sections/CTA'
import Footer from '@/components/Footer'
import BookDemoButton from '@/components/BookDemoButton'

// ── Workforce panels ──────────────────────────────────────────────
import BurnoutPanel       from '@/components/ui/panels/BurnoutPanel'
import StaffAssistPanel   from '@/components/ui/panels/StaffAssistPanel'
import SchedulerPanel     from '@/components/ui/panels/SchedulerPanel'
import EVVPanel           from '@/components/ui/panels/EVVPanel'
import AutoApprovalPanel  from '@/components/ui/panels/AutoApprovalPanel'
import AutoSwapPanel      from '@/components/ui/panels/AutoSwapPanel'
import CredentialingPanel from '@/components/ui/panels/CredentialingPanel'

// ── Financial panels ──────────────────────────────────────────────
import APARPanel       from '@/components/ui/panels/APARPanel'
import CollectionPanel from '@/components/ui/panels/CollectionPanel'
import CompliancePanel from '@/components/ui/panels/CompliancePanel'
import REITPanel       from '@/components/ui/panels/REITPanel'

// ─── STATIC DATA ──────────────────────────────────────────────────

const panelMap: Record<string, React.ComponentType> = {
  'staff-burnout-prevention': BurnoutPanel,
  'staffassist':              StaffAssistPanel,
  'scheduler-assist':         SchedulerPanel,
  'visit-verification':       EVVPanel,
  'auto-approval':            AutoApprovalPanel,
  'auto-swap':                AutoSwapPanel,
  'physician-credentialing':  CredentialingPanel,
  'ap-ar-matching':           APARPanel,
  'payment-collection':       CollectionPanel,
  'contract-compliance':      CompliancePanel,
  'reit-deal-qualifier':      REITPanel,
}

const heroHeadlines: Record<string, string> = {
  'staff-burnout-prevention': 'Catch burnout before it costs you.',
  'staffassist':              'Every shift question, answered instantly.',
  'scheduler-assist':         'Schedules built before you ask.',
  'visit-verification':       'Every visit verified, automatically.',
  'auto-approval':            'Routine approvals that handle themselves.',
  'auto-swap':                'Every internal swap, optimised intelligently.',
  'physician-credentialing':  'Never let a credential expire again.',
  'ap-ar-matching':           'Every payment. Every invoice. Reconciled.',
  'payment-collection':       'Overdue accounts that collect themselves.',
  'contract-compliance':      'Every invoice checked against every clause.',
  'reit-deal-qualifier':      'Deals screened before you see them.',
}

type Stat = { value: string; label: string; delta: string }
const agentStats: Record<string, Stat[]> = {
  'staff-burnout-prevention': [
    { value: '67%', label: 'Fewer last-minute callouts',       delta: '↓ vs 6-month baseline'   },
    { value: '3×',  label: 'Faster at-risk identification',    delta: 'vs manual review process' },
    { value: '28%', label: 'Lower employee turnover rate',     delta: 'after 90 days live'       },
  ],
  'staffassist': [
    { value: '<30s', label: 'Average query resolution time',   delta: '↓ vs 2hr manual routing'  },
    { value: '85%',  label: 'Reduction in HR escalations',     delta: 'month-over-month average'  },
    { value: '94%',  label: 'Staff satisfaction score',        delta: 'post-deployment survey'    },
  ],
  'scheduler-assist': [
    { value: '28s',  label: 'Average shift fill time',         delta: '↓ 97% vs manual'          },
    { value: '98%',  label: 'Schedule coverage rate',          delta: 'across all regions'        },
    { value: '60%',  label: 'Scheduling time saved per week',  delta: 'same headcount'           },
  ],
  'visit-verification': [
    { value: '99.8%', label: 'Visit verification accuracy',   delta: 'EVV compliant'            },
    { value: '0',     label: 'Missed billing submissions',     delta: 'since deployment'         },
    { value: '40%',   label: 'Faster reimbursement cycle',    delta: 'vs manual claims process' },
  ],
  'auto-approval': [
    { value: '3s',  label: 'Average approval decision time',   delta: '↓ vs 4hr manual queue'   },
    { value: '89%', label: 'Requests auto-approved',           delta: 'no manager required'      },
    { value: '0',   label: 'Compliance violations',            delta: 'since deployment'         },
  ],
  'auto-swap': [
    { value: '28s',  label: 'Average time to replacement',    delta: '↓ 97% faster'            },
    { value: '94%',  label: 'Internal fill rate',             delta: 'before agency fallback'   },
    { value: '73%',  label: 'Reduction in agency spend',      delta: 'month-over-month'         },
  ],
  'physician-credentialing': [
    { value: '0',    label: 'Expired credentials in audit',   delta: 'since deployment'         },
    { value: '90d',  label: 'Advance expiry alert window',    delta: 'at 90, 60, and 30 days'  },
    { value: '100%', label: 'Audit-ready documentation',      delta: 'at all times'             },
  ],
  'ap-ar-matching': [
    { value: '94%', label: 'First-pass match rate',           delta: '↑ 31% vs manual'         },
    { value: '14d', label: 'DSO reduction (average)',         delta: 'across client accounts'   },
    { value: '$0',  label: 'Manual reconciliation cost',      delta: 'fully automated'          },
  ],
  'payment-collection': [
    { value: '73%', label: 'Recovery rate on overdue accounts', delta: '↑ 4.8% vs last quarter' },
    { value: '40%', label: 'Faster dispute resolution',         delta: 'classified and routed'   },
    { value: '3×',  label: 'Collection team productivity',      delta: 'same headcount'          },
  ],
  'contract-compliance': [
    { value: '100%', label: 'Invoices validated before payment', delta: 'every billing cycle'        },
    { value: '$420', label: 'Avg leakage caught per violation',  delta: 'before payment released'    },
    { value: '0',    label: 'Contract violations missed',        delta: 'since deployment'           },
  ],
  'reit-deal-qualifier': [
    { value: '87%',  label: 'Faster deal screening',            delta: 'vs manual underwriting'     },
    { value: '12+',  label: 'Metrics analyzed per deal',        delta: 'IRR, DSCR, CoC, LTV...'    },
    { value: '4hrs', label: 'Underwriting turnaround',          delta: 'vs 4 days manual process'  },
  ],
}

type Step = { title: string; desc: string }
const agentSteps: Record<string, Step[]> = {
  'staff-burnout-prevention': [
    { title: 'Sync workforce data',        desc: 'Import staff records, shift logs, and overtime data from your HRIS and scheduling platform.'                                   },
    { title: 'Continuous risk monitoring', desc: 'Agent tracks overtime spikes, scheduling anomalies, and feedback signals across all staff in real time.'                       },
    { title: 'Alerts fire before burnout', desc: 'High-risk staff flagged 7–14 days ahead of breaking point, with workload redistribution recommendations ready.'               },
  ],
  'staffassist': [
    { title: 'Connect staff directory',        desc: 'Import employee profiles, schedules, PTO balances, and HR policy documents from your systems.'                            },
    { title: 'Staff ask, agent answers',       desc: 'Natural language queries resolved in under 30 seconds — shift availability, swap requests, PTO balance checks.'           },
    { title: 'Requests actioned end-to-end',   desc: 'Agent initiates PTO, swap requests, and approval flows without any manager involvement.'                                  },
  ],
  'scheduler-assist': [
    { title: 'Import your roster',             desc: 'Connect your scheduling platform and staff records, including certifications and overtime eligibility.'                    },
    { title: 'Agent detects and fills gaps',   desc: 'Continuously monitors for open shifts and callouts. Best-fit staff ranked and matched instantly.'                         },
    { title: 'Schedules confirmed automatically', desc: 'Matched staff notified, confirmations collected, schedule published — before the shift starts.'                       },
  ],
  'visit-verification': [
    { title: 'Connect care visit systems',     desc: 'Link to your EVV platform and billing system for real-time visit data ingestion.'                                         },
    { title: 'Every visit validated instantly',desc: 'GPS location, timestamps, and care records cross-checked automatically at visit completion.'                              },
    { title: 'Clean data flows to billing',    desc: 'Verified visits sync directly. Flagged visits held until resolved — no revenue left behind.'                             },
  ],
  'auto-approval': [
    { title: 'Configure your approval rules',  desc: 'Define thresholds: overtime limits, licence requirements, PTO caps, and coverage minimums.'                               },
    { title: 'Requests checked in real time',  desc: 'Each request validated against your configured rules in under 3 seconds, 24 hours a day.'                                },
    { title: 'Compliant approved, exceptions escalated', desc: 'Managers only see the requests that genuinely need human judgment.'                                            },
  ],
  'auto-swap': [
    { title: 'Sync staff and shift data',      desc: 'Connect your scheduling platform with staff records including skills, certifications, and current hours.'                 },
    { title: 'Gap detected — candidates ranked', desc: 'Agent scores every available staff member against the open shift requirements in real time.'                           },
    { title: 'Best match confirmed instantly', desc: 'Compliance verified, both parties notified, shift confirmed — all within 28 seconds.'                                    },
  ],
  'physician-credentialing': [
    { title: 'Import your provider roster',    desc: 'Upload provider directory, licence numbers, and certification records from any source format.'                            },
    { title: 'Agent tracks every expiry',      desc: 'Continuously monitors renewal deadlines across all credential types and all providers.'                                   },
    { title: 'Renewals triggered automatically', desc: 'Outreach sent at 90, 60, and 30 days. Renewals verified against regulatory databases and logged.'                     },
  ],
  'ap-ar-matching': [
    { title: 'Connect your financial systems', desc: 'Integrate ERP, billing platform, and bank feeds for automated transaction ingestion.'                                     },
    { title: 'Invoices matched automatically', desc: 'Agent cross-references every bank transaction against open invoices — matched in seconds.'                                },
    { title: 'Exceptions escalated, clean cases closed', desc: 'Short-pays flagged with auto-dispute letters. Matched invoices marked paid instantly.'                        },
  ],
  'payment-collection': [
    { title: 'Import outstanding AR data',     desc: 'Connect your AR ledger and customer records for full portfolio visibility.'                                               },
    { title: 'Accounts scored by recovery likelihood', desc: 'Agent ranks each account by risk, DSO, and collection probability — highest-value accounts first.'             },
    { title: 'Automated outreach sequences run', desc: 'Reminders sent, disputes classified and routed, escalations triggered automatically.'                                 },
  ],
  'contract-compliance': [
    { title: 'Upload your contracts',          desc: 'Agent parses agreement terms and converts every clause into enforceable validation logic.'                                },
    { title: 'Every invoice checked before payment', desc: 'Each line item validated against the relevant contract rules in real time.'                                       },
    { title: 'Violations flagged with dollar impact', desc: 'Non-compliant invoices held. Dispute letters auto-generated with exact leakage amount.'                         },
  ],
  'reit-deal-qualifier': [
    { title: 'Define your investment criteria', desc: 'Configure IC thresholds: IRR targets, DSCR floors, LTV limits, and risk parameters.'                                   },
    { title: 'Deals screened automatically',   desc: 'Agent simulates IRR, DSCR, cash flow, and risk scenarios for every incoming deal.'                                       },
    { title: 'IC-ready scorecard delivered',   desc: 'Full deal scorecard with red flags highlighted — before it reaches the review room.'                                    },
  ],
}

// ─── AGENT HERO ───────────────────────────────────────────────────

function AgentHero({ agent }: { agent: Agent }) {
  const PanelComponent = panelMap[agent.slug]
  const headline       = heroHeadlines[agent.slug] || agent.headline

  return (
    <section className="pt-28 pb-20">
      <div className="max-w-[1120px] mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            className="flex flex-col"
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Category eyebrow */}
            <span className="eyebrow-pill mb-6 w-fit">
              <span className="eyebrow-dot" />
              {agent.category}
            </span>

            {/* Headline */}
            <h1
              className="font-display font-extrabold text-ink mb-4 leading-[1.05]"
              style={{ fontSize: 'clamp(32px, 3.6vw, 54px)', letterSpacing: '-0.04em' }}
            >
              {headline}
            </h1>

            {/* Tagline */}
            <p className="text-[17px] text-ink3 font-ui leading-relaxed mb-3">
              {agent.tagline}
            </p>

            {/* Subhead */}
            <p className="text-[15px] text-ink4 font-ui leading-relaxed mb-6 max-w-[460px]">
              {agent.subhead}
            </p>

            {/* Outcome pill */}
            <div className="inline-flex items-center gap-2 bg-[#6B3FA0] text-white text-[12px] font-medium px-3 py-1.5 rounded-[6px] font-ui mb-7 w-fit">
              <span className="text-white/70">↗</span>
              {agent.outcome}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <BookDemoButton className="btn-base btn-primary">
                Book a demo
              </BookDemoButton>
              <Link href="#how-it-works" className="btn-base btn-ghost group">
                See how it works
                <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
              </Link>
            </div>
          </motion.div>

          {/* ── Right: live panel ── */}
          {PanelComponent && (
            <motion.div
              className="hidden sm:block"
              initial={{ x: 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-full rounded-[16px] overflow-hidden border border-[--border] flex flex-col bg-white"
                style={{ height: '400px', boxShadow: 'var(--shadow-3)' }}
              >
                <div className="browser-chrome flex-shrink-0">
                  <div className="browser-dots">
                    <div className="browser-dot dot-red" />
                    <div className="browser-dot dot-yellow" />
                    <div className="browser-dot dot-green" />
                  </div>
                  <div className="browser-url">app.quickflows.ai / {agent.slug}</div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <PanelComponent />
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  )
}

// ─── AGENT CAPABILITIES ───────────────────────────────────────────

function AgentCapabilities({ agent }: { agent: Agent }) {
  return (
    <section className="section-padding border-t border-[--border]">
      <div className="section-container">

        <div className="text-center mb-10">
          <p className="text-label mb-3">CAPABILITIES</p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
          >
            What {agent.name} does
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {agent.bullets.map((bullet, i) => (
            <motion.div
              key={i}
              className="card p-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 h-8 rounded-full bg-[#D1FAE5] flex items-center justify-center mb-4 flex-shrink-0">
                <Check size={16} className="text-[#065F46]" strokeWidth={2.5} />
              </div>
              <p className="text-[14px] font-medium text-ink font-ui leading-snug">{bullet}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── AGENT IMPACT (3 stats) ───────────────────────────────────────

function AgentImpact({ agent }: { agent: Agent }) {
  const stats = agentStats[agent.slug] ?? []
  if (!stats.length) return null

  return (
    <section className="section-padding border-t border-[--border]" style={{ background: '#FAFAFA' }}>
      <div className="section-container">

        <div className="text-center mb-12">
          <p className="text-label mb-3">IMPACT</p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
          >
            Results operators see in the first 90 days
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono font-bold text-ink leading-none mb-3"
                style={{ fontSize: 'clamp(44px, 5vw, 68px)', letterSpacing: '-0.04em' }}
              >
                {stat.value}
              </p>
              <p className="text-[15px] font-semibold text-ink font-ui mb-2 leading-snug">
                {stat.label}
              </p>
              <span className="inline-flex items-center text-[11px] font-mono text-[#16A34A] bg-[#D1FAE5] px-2.5 py-1 rounded-[5px]">
                {stat.delta}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── AGENT HOW IT WORKS ───────────────────────────────────────────

function AgentHowItWorks({ agent }: { agent: Agent }) {
  const steps = agentSteps[agent.slug] ?? []
  if (!steps.length) return null

  return (
    <section id="how-it-works" className="section-padding border-t border-[--border]">
      <div className="section-container">

        <div className="text-center mb-12">
          <p className="text-label mb-3">HOW IT WORKS</p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
          >
            From connection to live in 72 hours
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-[900px] mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="font-mono font-bold text-ink4/20 leading-none mb-3"
                style={{ fontSize: '40px', letterSpacing: '-0.04em' }}
              >
                0{i + 1}
              </p>
              <h3 className="text-[16px] font-semibold text-ink font-ui mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-[14px] text-ink3 font-ui leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── RELATED AGENTS ───────────────────────────────────────────────

function RelatedAgents({ agent }: { agent: Agent }) {
  const related = agents
    .filter((a) => a.vertical === agent.vertical && a.slug !== agent.slug)
    .slice(0, 3)

  if (!related.length) return null

  return (
    <section className="section-padding border-t border-[--border]">
      <div className="section-container">

        <div className="text-center mb-10">
          <p className="text-label mb-3">EXPLORE MORE</p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', letterSpacing: '-0.03em', lineHeight: '1.1' }}
          >
            More {agent.vertical === 'workforce' ? 'Workforce' : 'Financial'} agents
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {related.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/agents/${a.slug}`} className="card card-hover block p-6 group">
                <p className="text-label mb-2">{a.category}</p>
                <h3 className="text-[16px] font-semibold text-ink font-ui mb-2 leading-snug">
                  {a.name}
                </h3>
                <p className="text-[13px] text-ink3 font-ui leading-snug mb-4">{a.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand font-ui group-hover:gap-2.5 transition-all duration-150">
                  Learn more
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-150" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────

export default function AgentContent({ agent }: { agent: Agent }) {
  return (
    <>
      <AgentHero       agent={agent} />
      <AgentCapabilities agent={agent} />
      <AgentImpact     agent={agent} />
      <AgentHowItWorks agent={agent} />
      <RelatedAgents   agent={agent} />
      <CTA />
      <Footer />
    </>
  )
}
