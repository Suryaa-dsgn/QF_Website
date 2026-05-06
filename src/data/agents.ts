export type AgentVertical = 'workforce' | 'financial'

export interface Agent {
  slug: string
  name: string
  vertical: AgentVertical
  category: string
  headline: string        // max 8 words
  tagline: string         // 1 line display
  subhead: string         // max 2 lines body copy
  bullets: string[]       // max 3 items
  outcome: string         // business impact — 1 sentence
  panelType: string       // which UI panel component to render
}

export const agents: Agent[] = [
  {
    slug: 'staff-burnout-prevention',
    name: 'Staff Burnout Prevention',
    vertical: 'workforce',
    category: 'BURNOUT PREVENTION',
    headline: 'Catch burnout before it becomes a callout.',
    tagline: 'Proactively detect fatigue across your workforce.',
    subhead: 'Monitor overtime, sentiment signals, and scheduling patterns to flag high-risk staff before they call in sick.',
    bullets: [
      'Detects over-scheduling and overtime spikes automatically',
      'Monitors sentiment and feedback signals across your team',
      'Flags high-risk fatigue scenarios before they cause disruption',
    ],
    outcome: 'Lower turnover costs, fewer last-minute disruptions.',
    panelType: 'burnout',
  },
  {
    slug: 'staffassist',
    name: 'StaffAssist Agent',
    vertical: 'workforce',
    category: 'STAFF SELF-SERVICE',
    headline: 'An AI every frontline worker can talk to.',
    tagline: 'Schedule queries, swaps, time-off — no waiting.',
    subhead: 'StaffAssist answers policy questions, surfaces eligible open shifts, and initiates requests without manager involvement.',
    bullets: [
      'Answers schedule and policy queries instantly',
      'Shows open shifts based on staff eligibility',
      'Initiates swap requests without manager involvement',
    ],
    outcome: 'Reduced coordination friction, empowered staff.',
    panelType: 'staffassist',
  },
  {
    slug: 'scheduler-assist',
    name: 'Scheduler Assist Agent',
    vertical: 'workforce',
    category: 'SCHEDULING INTELLIGENCE',
    headline: 'Optimised schedules, built before you ask.',
    tagline: 'Identify gaps, generate schedules, simulate impact.',
    subhead: 'Scheduler Assist covers gaps, recommends best-fit staff via scoring models, and simulates schedule impact before publishing.',
    bullets: [
      'Auto-generates optimised schedules with no coverage gaps',
      'Recommends best-fit staff via real-time scoring models',
      'Simulates schedule impact before anyone is notified',
    ],
    outcome: 'Faster scheduling cycles, fewer unfilled shifts.',
    panelType: 'scheduler',
  },
  {
    slug: 'visit-verification',
    name: 'Visit Verification (EVV)',
    vertical: 'workforce',
    category: 'COMPLIANCE · HOME HEALTH',
    headline: 'GPS-verified compliance on every visit.',
    tagline: 'EVV validation, automatically — before billing sync.',
    subhead: 'Every visit is validated by GPS, time-stamp, and image capture. Missed or shortened visits are flagged before billing runs.',
    bullets: [
      'GPS and time-based visit validation (EVV compliant)',
      'Flags missed or shortened visits in real time',
      'Syncs verified visit data directly to billing',
    ],
    outcome: 'Reduced compliance risk, faster reimbursements.',
    panelType: 'evv',
  },
  {
    slug: 'auto-approval',
    name: 'Auto Approval Agent',
    vertical: 'workforce',
    category: 'APPROVAL AUTOMATION',
    headline: 'Routine approvals that handle themselves.',
    tagline: 'Compliant requests resolved. Exceptions escalated.',
    subhead: 'AutoApproval handles compliant shift and time-off requests automatically, checking licence, overtime, and policy rules before confirming.',
    bullets: [
      'Auto-approves compliant shift and time-off requests',
      'Checks licence, overtime, and compliance rules instantly',
      'Escalates only genuine exceptions to managers',
    ],
    outcome: 'Reduced admin burden, faster decision cycles.',
    panelType: 'autoapproval',
  },
  {
    slug: 'auto-swap',
    name: 'Auto Swap Agent',
    vertical: 'workforce',
    category: 'SHIFT OPTIMISATION',
    headline: 'Every internal swap, optimised intelligently.',
    tagline: 'Suggest, match, verify — before confirmation.',
    subhead: 'AutoSwap finds the best internal swap match, confirms certifications and overtime status, and notifies both parties instantly.',
    bullets: [
      'Suggests optimised internal swaps with match scoring',
      'Minimises overtime and matches skills and certifications',
      'Ensures compliance before any swap is confirmed',
    ],
    outcome: 'Increased internal utilisation, reduced agency cost.',
    panelType: 'autoswap',
  },
  {
    slug: 'physician-credentialing',
    name: 'Physician Credentialing',
    vertical: 'workforce',
    category: 'CREDENTIALING',
    headline: 'Never let a credential expire again.',
    tagline: 'Track, verify, renew — audit-ready, automatically.',
    subhead: 'Track every licence and certification across your entire provider roster. Reminders fire at 90, 60, and 30 days. Renewals verified automatically.',
    bullets: [
      'Tracks licence and certification expirations across all providers',
      'Verifies credentials against regulatory databases automatically',
      'Maintains complete audit-ready documentation at all times',
    ],
    outcome: 'Reduced compliance risk, minimised legal exposure.',
    panelType: 'credentialing',
  },
  {
    slug: 'ap-ar-matching',
    name: 'AP/AR Matching Agent',
    vertical: 'financial',
    category: 'AP/AR MATCHING',
    headline: 'Every payment. Every invoice. Reconciled.',
    tagline: 'Automate reconciliation across your entire receivables stack.',
    subhead: 'Match bank transactions to invoices automatically. Resolve short-pays. Flag anomalies. Learn from every reconciliation cycle.',
    bullets: [
      'Matches bank transactions to invoices automatically',
      'Resolves short-pays and deductions without manual work',
      'Flags anomalies for human review — nothing slips through',
    ],
    outcome: 'Reduced DSO, improved cash visibility, no manual reconciliation.',
    panelType: 'apar',
  },
  {
    slug: 'payment-collection',
    name: 'Payment Collection Agent',
    vertical: 'financial',
    category: 'PAYMENT COLLECTION',
    headline: 'Overdue accounts that collect themselves.',
    tagline: 'Intelligent collections — prioritised, automated, tracked.',
    subhead: 'Prioritise overdue accounts by risk and recovery likelihood. Automate reminder workflows. Classify dispute types and route them to resolution.',
    bullets: [
      'Prioritises overdue accounts by risk and recovery likelihood',
      'Automates reminder workflows across the collection sequence',
      'Classifies dispute types and routes each to resolution',
    ],
    outcome: 'Improved cash flow, faster dispute closure.',
    panelType: 'collection',
  },
  {
    slug: 'contract-compliance',
    name: 'Contract Compliance Agent',
    vertical: 'financial',
    category: 'CONTRACT COMPLIANCE',
    headline: 'Every invoice checked against every clause.',
    tagline: 'Extract contract terms, convert to rules, validate automatically.',
    subhead: 'The agent extracts key contract terms, converts them to enforceable rule trees, and validates every invoice before payment — flagging violations with exact dollar impact.',
    bullets: [
      'Extracts key terms and obligations from any contract',
      'Validates every invoice line against configured contract rules',
      'Flags violations with exact dollar impact before payment',
    ],
    outcome: 'Reduced revenue leakage, no manual contract validation.',
    panelType: 'compliance',
  },
  {
    slug: 'reit-deal-qualifier',
    name: 'REIT Deal Qualifier',
    vertical: 'financial',
    category: 'REIT DEAL QUALIFIER',
    headline: 'Deals screened before you even see them.',
    tagline: 'IRR, DSCR, cash flow, risk — all before IC review.',
    subhead: 'Screen deals against your investment criteria automatically. Simulate IRR, DSCR, and cash flow. Score risk. Flag red flags before the IC room.',
    bullets: [
      'Screens deals against your investment criteria automatically',
      'Simulates IRR, DSCR, and cash flow models instantly',
      'Flags red flags and gaps before the IC review meeting',
    ],
    outcome: 'Faster underwriting cycles, higher-quality pipeline.',
    panelType: 'reit',
  },
]

export const workforceAgents = agents.filter(a => a.vertical === 'workforce')
export const financialAgents = agents.filter(a => a.vertical === 'financial')

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug)
}
