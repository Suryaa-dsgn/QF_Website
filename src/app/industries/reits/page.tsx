import { type Metadata } from 'next'
import IndustryPage, { type IndustryPageConfig } from '@/components/sections/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'Finance & Real Estate | Quickflows',
  description: 'Quickflows financial agents close the books — AP/AR matching, revenue cycle recovery, contract compliance, and REIT deal qualification, automatically.',
}

const config: IndustryPageConfig = {
  category: 'Finance & Real Estate',
  categoryColor: '#059669',
  headline: 'Every invoice. Every deal. Handled.',
  subtext:
    'From AP/AR reconciliation to RCM recovery and REIT deal qualification: Quickflows financial agents close the loop before your team opens it.',

  scenarios: [
    {
      time: 'Claim returned',
      event: '$760 denial',
      problem: "Claim 4892 came back denied. Your billing team hasn't seen it yet.",
      agent: 'Revenue Cycle Management',
      agentColor: '#059669',
      resolution: 'Reworked and resubmitted in 4 min. Recovery in progress.',
      metric: '4 min · $760 recovery initiated',
      panelKey: 'rcm',
    },
    {
      time: 'Invoice #A-2291',
      event: 'Contract mismatch',
      problem: 'Invoice matches PO. But clause 3b requires a 5% volume discount over $5K.',
      agent: 'Contract Compliance',
      agentColor: '#0891B2',
      resolution: '$420 in revenue leakage flagged before payment cleared.',
      metric: '$420 saved · Pre-payment flag',
      panelKey: 'compliance',
    },
    {
      time: 'Friday deadline',
      event: '$12M REIT deal',
      problem: '47 diligence criteria to screen. No analyst available until Monday.',
      agent: 'REIT Deal Qualifier',
      agentColor: '#059669',
      resolution: 'All 47 criteria screened in 8 min. 3 red flags surfaced.',
      metric: '8 min · 3 flags raised',
      panelKey: 'reit',
    },
  ],

  panels: [
    {
      panelKey: 'rcm',
      agentName: 'Revenue Cycle Management',
      suiteLabel: 'Financial Operations',
      suiteColor: '#059669',
      description:
        'Detects denied claims, queues rework automatically, and resubmits — recovering revenue your team would have chased manually.',
    },
    {
      panelKey: 'apar',
      agentName: 'AP / AR Matching',
      suiteLabel: 'Financial Operations',
      suiteColor: '#059669',
      description:
        'Matches invoices to POs, flags discrepancies, and reconciles exceptions — without a human touching the queue.',
    },
  ],

  subIndustries: [
    {
      iconKey: 'activity',
      title: 'Revenue Cycle Management Firms',
      description: 'Invoice reconciliation, collections, and contract compliance automated.',
      agentCount: '4 agents',
    },
    {
      iconKey: 'laptop',
      title: 'SaaS Companies & Services',
      description: 'AP/AR matching and subscription billing dispute resolution.',
      agentCount: '4 agents',
    },
    {
      iconKey: 'factory',
      title: 'B2B Manufacturing Enterprises',
      description: 'Contract validation and payment collection at scale.',
      agentCount: '4 agents',
    },
    {
      iconKey: 'landmark',
      title: 'REITs',
      description: 'AI-powered deal screening, underwriting, and portfolio compliance.',
      agentCount: '4 agents',
    },
  ],

  suiteHref: '/financial',
  suiteLabel: 'Explore Financial Agents',
  suiteAgentCount: 'Financial agents',
  suiteDescription:
    'AP/AR matching, payment collection, revenue cycle recovery, and REIT deal qualification — pre-configured for your stack.',
  secondarySuiteHref: '/compliance',
  secondarySuiteLabel: 'Compliance Agents',
}

export default function Page() {
  return <IndustryPage config={config} />
}
