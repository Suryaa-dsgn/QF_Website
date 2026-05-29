import { type Metadata } from 'next'
import IndustryPage, { type IndustryPageConfig } from '@/components/sections/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'Healthcare Operations | Quickflows',
  description: 'Quickflows agents handle shift coverage, EVV compliance, provider credentialing, and referral intake — automatically.',
}

const config: IndustryPageConfig = {
  category: 'Healthcare',
  categoryColor: '#0284C7',
  headline: 'Operations that never stop: covered.',
  subtext:
    'From hospital scheduling to home health EVV compliance: Quickflows agents handle every shift, credential, and visit verification before anyone notices a gap.',

  scenarios: [
    {
      time: '6:02 AM',
      event: 'Shift callout',
      problem: 'Amanda called in sick. 3 patients, no coverage.',
      agent: 'Call-Off Management',
      agentColor: '#0284C7',
      resolution: 'Maria confirmed as replacement. Shift filled in 4 min.',
      metric: '4 min · No coordinator required',
    },
    {
      time: '11 days remaining',
      event: 'DEA license expiry',
      problem: "Dr. Patel's DEA expires soon. Nobody on your team flagged it.",
      agent: 'Provider Credentialing',
      agentColor: '#0891B2',
      resolution: 'Renewal queued at 90, 60, and today. Audit log updated.',
      metric: 'Flagged 90 days out · Zero lapse risk',
    },
    {
      time: '9:28 AM',
      event: 'EVV mismatch',
      problem: 'Visit log says 9:00 AM. EVV timestamp says 9:28 AM. Payer will deny.',
      agent: 'Visit Verification',
      agentColor: '#0284C7',
      resolution: 'Discrepancy flagged before claim submission. Corrected in the system.',
      metric: 'Pre-submission · Denial prevented',
    },
  ],

  panels: [
    {
      panelKey: 'call-off-management',
      agentName: 'Call-Off Management',
      suiteLabel: 'Workforce Operations',
      suiteColor: '#0284C7',
      description:
        'Detects a callout, finds ranked replacements, texts them, and confirms coverage — before your coordinator sits down.',
    },
    {
      panelKey: 'schedule-optimizer',
      agentName: 'Schedule Optimizer',
      suiteLabel: 'Workforce Operations',
      suiteColor: '#0284C7',
      description:
        'Fills scheduling gaps, flags overtime risk, and optimises coverage across all open shifts for the week ahead.',
    },
  ],

  subIndustries: [
    {
      iconKey: 'building2',
      title: 'Hospitals & Health Systems',
      description: 'Workforce scheduling, credentialing, and shift compliance at scale.',
      agentCount: '8 agents',
    },
    {
      iconKey: 'heart',
      title: 'Home Health & Home Care Agencies',
      description: 'EVV compliance, visit verification, and caregiver scheduling automation.',
      agentCount: '8 agents',
    },
    {
      iconKey: 'activity',
      title: 'Long-Term Care & Skilled Nursing',
      description: 'Shift coverage, credential tracking, and regulatory compliance.',
      agentCount: '8 agents',
    },
    {
      iconKey: 'brain',
      title: 'Behavioral Health & Rehabilitation',
      description: 'Staff scheduling and compliance for complex care environments.',
      agentCount: '8 agents',
    },
  ],

  suiteHref: '/workforce',
  suiteLabel: 'Explore Workforce Agents',
  suiteAgentCount: 'Workforce agents',
  suiteDescription:
    'Scheduling, call-offs, EVV, referral intake, capacity planning, and more — configured for healthcare from day one.',
  secondarySuiteHref: '/compliance',
  secondarySuiteLabel: 'Compliance Agents',
}

export default function Page() {
  return <IndustryPage config={config} />
}
