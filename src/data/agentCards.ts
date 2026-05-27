export interface AgentCardData {
  id: string
  slug: string
  sequence: string
  category: string
  categoryColor: string
  categoryBg: string
  categoryBorder: string
  name: string
  bullets: [string, string]
  outcome: string
  visual: string
}

// Agent order is deliberate — temporal sequence of an operational day:
// Scheduler → Burnout Prevention → StaffAssist → Auto Swap →
// Auto Approval → Visit Verification → Physician Credentialing
export const agentCardsData: AgentCardData[] = [
  {
    id: 'scheduler-assist',
    slug: 'scheduler-assist',
    sequence: '01',
    category: 'SCHEDULING',
    categoryColor: '#0284C7',
    categoryBg: 'rgba(2,132,199,0.08)',
    categoryBorder: 'rgba(2,132,199,0.15)',
    name: 'Scheduler Assist',
    bullets: [
      'Identifies coverage gaps the moment they appear',
      'Scores staff and generates the schedule automatically',
    ],
    outcome: 'Fewer unfilled shifts',
    visual: 'scheduler',
  },
  {
    id: 'staff-burnout-prevention',
    slug: 'staff-burnout-prevention',
    sequence: '02',
    category: 'BURNOUT PREVENTION',
    categoryColor: '#DC2626',
    categoryBg: 'rgba(220,38,38,0.07)',
    categoryBorder: 'rgba(220,38,38,0.15)',
    name: 'Staff Burnout Prevention',
    bullets: [
      'Detects over-scheduling and overtime patterns in real time',
      'Flags high-risk staff before the callout happens',
    ],
    outcome: 'Lower turnover costs',
    visual: 'burnout',
  },
  {
    id: 'staffassist',
    slug: 'staffassist',
    sequence: '03',
    category: 'STAFF SELF-SERVICE',
    categoryColor: '#7C3AED',
    categoryBg: 'rgba(124,58,237,0.07)',
    categoryBorder: 'rgba(124,58,237,0.15)',
    name: 'StaffAssist Agent',
    bullets: [
      'Answers schedule and policy questions instantly',
      'Initiates swaps without coordinator involvement',
    ],
    outcome: 'Requests handled in seconds',
    visual: 'staffassist',
  },
  {
    id: 'auto-swap',
    slug: 'auto-swap',
    sequence: '04',
    category: 'SHIFT OPERATIONS',
    categoryColor: '#0284C7',
    categoryBg: 'rgba(2,132,199,0.08)',
    categoryBorder: 'rgba(2,132,199,0.15)',
    name: 'Auto Swap Agent',
    bullets: [
      'Matches the best internal candidate in under 30 seconds',
      'Checks compliance before confirming — no manual review',
    ],
    outcome: 'Shifts filled before second call',
    visual: 'autoswap',
  },
  {
    id: 'auto-approval',
    slug: 'auto-approval',
    sequence: '05',
    category: 'APPROVAL AUTOMATION',
    categoryColor: '#059669',
    categoryBg: 'rgba(5,150,105,0.08)',
    categoryBorder: 'rgba(5,150,105,0.15)',
    name: 'Auto Approval Agent',
    bullets: [
      'Auto-approves compliant requests the moment they arrive',
      'Escalates only genuine exceptions to managers',
    ],
    outcome: 'Managers see only exceptions',
    visual: 'autoapproval',
  },
  {
    id: 'visit-verification',
    slug: 'visit-verification',
    sequence: '06',
    category: 'COMPLIANCE · EVV',
    categoryColor: '#0284C7',
    categoryBg: 'rgba(2,132,199,0.08)',
    categoryBorder: 'rgba(2,132,199,0.15)',
    name: 'Visit Verification',
    bullets: [
      'GPS and time-stamp validation on every single visit',
      'Flags discrepancies before billing runs — not after',
    ],
    outcome: 'Zero compliance exposure',
    visual: 'evv',
  },
  {
    id: 'physician-credentialing',
    slug: 'physician-credentialing',
    sequence: '07',
    category: 'CREDENTIALING',
    categoryColor: '#7C3AED',
    categoryBg: 'rgba(124,58,237,0.07)',
    categoryBorder: 'rgba(124,58,237,0.15)',
    name: 'Physician Credentialing',
    bullets: [
      'Tracks every licence expiry across your provider roster',
      'Initiates renewals at 90, 60, and 30 days automatically',
    ],
    outcome: 'Zero expired credentials at audit',
    visual: 'credentialing',
  },
]
