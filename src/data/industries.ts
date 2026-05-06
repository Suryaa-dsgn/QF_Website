import {
  Heart, Building2, Truck, Home, Users, Factory,
  Plane, ShoppingBag, Zap, TrendingUp, Stethoscope,
  Briefcase, Globe, School, Coffee,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type IndustryVertical = 'workforce' | 'financial'

export interface Industry {
  id: string
  slug: string
  name: string
  descriptor: string
  vertical: IndustryVertical
  agentCount: string
  icon: LucideIcon
}

export const industries: Industry[] = [
  // ── WORKFORCE ──────────────────────────────────────
  {
    id: 'home-health',
    slug: 'home-health',
    name: 'Home Health & Hospice',
    descriptor: 'Scheduling, EVV compliance, burnout prevention.',
    vertical: 'workforce',
    agentCount: '5 agents',
    icon: Home,
  },
  {
    id: 'hospitals',
    slug: 'hospitals',
    name: 'Hospitals & Health Systems',
    descriptor: 'Credentialing, shift gaps, approval automation.',
    vertical: 'workforce',
    agentCount: '6 agents',
    icon: Stethoscope,
  },
  {
    id: 'staffing-agencies',
    slug: 'staffing-agencies',
    name: 'Staffing Agencies',
    descriptor: 'Rapid placements, compliance, self-service portals.',
    vertical: 'workforce',
    agentCount: '5 agents',
    icon: Users,
  },
  {
    id: 'skilled-nursing',
    slug: 'skilled-nursing',
    name: 'Skilled Nursing Facilities',
    descriptor: 'Overtime control, credential tracking, scheduling.',
    vertical: 'workforce',
    agentCount: '5 agents',
    icon: Heart,
  },
  {
    id: 'airports',
    slug: 'airports',
    name: 'Airports & Aviation',
    descriptor: 'Shift coverage, certifications, real-time swaps.',
    vertical: 'workforce',
    agentCount: '4 agents',
    icon: Plane,
  },
  {
    id: 'logistics',
    slug: 'logistics',
    name: 'Logistics & Warehousing',
    descriptor: 'High-volume shift scheduling, gap detection.',
    vertical: 'workforce',
    agentCount: '4 agents',
    icon: Truck,
  },
  {
    id: 'manufacturing',
    slug: 'manufacturing',
    name: 'Manufacturing & Plants',
    descriptor: 'Safety compliance, shift optimisation, burnout.',
    vertical: 'workforce',
    agentCount: '4 agents',
    icon: Factory,
  },
  {
    id: 'retail',
    slug: 'retail',
    name: 'Retail & Hospitality',
    descriptor: 'Peak scheduling, staff self-service, swap management.',
    vertical: 'workforce',
    agentCount: '3 agents',
    icon: ShoppingBag,
  },
  {
    id: 'education',
    slug: 'education',
    name: 'Education & Childcare',
    descriptor: 'Substitute scheduling, credentials, approval flows.',
    vertical: 'workforce',
    agentCount: '3 agents',
    icon: School,
  },
  {
    id: 'food-service',
    slug: 'food-service',
    name: 'Food Service & Catering',
    descriptor: 'Shift coverage, compliance, self-service queries.',
    vertical: 'workforce',
    agentCount: '3 agents',
    icon: Coffee,
  },
  // ── FINANCIAL ──────────────────────────────────────
  {
    id: 'healthcare-rcm',
    slug: 'healthcare-rcm',
    name: 'Healthcare RCM',
    descriptor: 'AR reconciliation, collections, contract audits.',
    vertical: 'financial',
    agentCount: '4 agents',
    icon: Building2,
  },
  {
    id: 'reits',
    slug: 'reits',
    name: 'REITs & Real Estate',
    descriptor: 'Deal qualification, IRR, DSCR, risk scoring.',
    vertical: 'financial',
    agentCount: '1 agent',
    icon: TrendingUp,
  },
  {
    id: 'saas-finance',
    slug: 'saas-finance',
    name: 'SaaS & Tech Companies',
    descriptor: 'Subscription billing, AR matching, dispute resolution.',
    vertical: 'financial',
    agentCount: '3 agents',
    icon: Zap,
  },
  {
    id: 'professional-services',
    slug: 'professional-services',
    name: 'Professional Services',
    descriptor: 'Invoice compliance, collections, contract enforcement.',
    vertical: 'financial',
    agentCount: '3 agents',
    icon: Briefcase,
  },
  {
    id: 'global-operations',
    slug: 'global-operations',
    name: 'Global Operations',
    descriptor: 'Multi-currency AR, cross-border collections.',
    vertical: 'financial',
    agentCount: '4 agents',
    icon: Globe,
  },
]

export const workforceIndustries = industries.filter(i => i.vertical === 'workforce')
export const financialIndustries = industries.filter(i => i.vertical === 'financial')
