export interface AgentCardData {
  slug: string
  category: string
  name: string
  bullets: [string, string]
  outcome: string
  visual: string
}

export const agentCardsData: AgentCardData[] = [
  {
    slug: 'staff-burnout-prevention',
    category: 'BURNOUT PREVENTION',
    name: 'Staff Burnout Prevention',
    bullets: [
      'Detects over-scheduling and overtime spikes automatically',
      'Flags high-risk staff before the callout happens',
    ],
    outcome: 'Lower turnover costs',
    visual: 'burnout',
  },
  {
    slug: 'staffassist',
    category: 'STAFF SELF-SERVICE',
    name: 'StaffAssist Agent',
    bullets: [
      'Answers schedule and policy questions instantly',
      'Initiates swaps without coordinator involvement',
    ],
    outcome: 'Requests handled in seconds',
    visual: 'staffassist',
  },
  {
    slug: 'scheduler-assist',
    category: 'SCHEDULING',
    name: 'Scheduler Assist',
    bullets: [
      'Identifies coverage gaps the moment they appear',
      'Scores available staff and auto-generates the schedule',
    ],
    outcome: 'Fewer unfilled shifts',
    visual: 'scheduler',
  },
  {
    slug: 'visit-verification',
    category: 'COMPLIANCE · EVV',
    name: 'Visit Verification',
    bullets: [
      'GPS and time-based visit validation on every visit',
      'Flags missed or shortened visits before billing',
    ],
    outcome: 'Zero compliance exposure',
    visual: 'evv',
  },
  {
    slug: 'auto-approval',
    category: 'APPROVAL AUTOMATION',
    name: 'Auto Approval Agent',
    bullets: [
      'Auto-approves compliant requests instantly, overnight',
      'Escalates only genuine exceptions to managers',
    ],
    outcome: 'Managers see only exceptions',
    visual: 'autoapproval',
  },
  {
    slug: 'auto-swap',
    category: 'SHIFT OPTIMISATION',
    name: 'Auto Swap Agent',
    bullets: [
      'Matches the best internal candidate in under 30 seconds',
      'Checks compliance before confirming the swap',
    ],
    outcome: 'Shifts filled before second call',
    visual: 'autoswap',
  },
  {
    slug: 'physician-credentialing',
    category: 'CREDENTIALING',
    name: 'Physician Credentialing',
    bullets: [
      'Tracks every licence expiry across your provider roster',
      'Sends reminders at 90, 60, and 30 days automatically',
    ],
    outcome: 'Zero expired credentials at audit',
    visual: 'credentialing',
  },
]
