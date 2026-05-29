import { type Metadata } from 'next'
import IndustryPage, { type IndustryPageConfig } from '@/components/sections/industries/IndustryPage'

export const metadata: Metadata = {
  title: 'Operations & Logistics | Quickflows',
  description: 'Quickflows workforce agents automate shift coverage, capacity planning, and compliance across staffing agencies, airports, manufacturing plants, and security firms.',
}

const config: IndustryPageConfig = {
  category: 'Operations & Logistics',
  categoryColor: '#7C3AED',
  headline: '24/7 operations. Zero coverage gaps.',
  subtext:
    'Quickflows workforce agents handle shift coverage, capacity planning, and compliance across staffing agencies, airports, plants, and security firms — automatically.',

  scenarios: [
    {
      time: '3:14 AM',
      event: 'Gate 14 — coverage gap',
      problem: 'Coverage needed in 45 min. Three coordinators are asleep.',
      agent: 'Call-Off Management',
      agentColor: '#7C3AED',
      resolution: 'Replacement contacted and confirmed. Shift filled in 6 min.',
      metric: '6 min · Zero coordinator involvement',
    },
    {
      time: '7 days out',
      event: 'Demand forecast gap',
      problem: "Thursday is showing 3 understaffed shifts next week. Nobody's checked yet.",
      agent: 'Capacity Planner',
      agentColor: '#7C3AED',
      resolution: 'Understaffing flagged. Coverage arranged before the week begins.',
      metric: '7 days early · Proactive resolution',
    },
    {
      time: '11:48 PM',
      event: 'Urgent request queued',
      problem: 'A compliant, urgent request is sitting in the queue. No coordinator available.',
      agent: 'Auto Approval',
      agentColor: '#7C3AED',
      resolution: 'Request validated against policy and approved instantly.',
      metric: 'Instant · Fully compliant',
    },
  ],

  panels: [
    {
      panelKey: 'call-off-management',
      agentName: 'Call-Off Management',
      suiteLabel: 'Workforce Operations',
      suiteColor: '#7C3AED',
      description:
        'Detects a shift gap, ranks available replacements, sends notifications, and confirms coverage — while your team sleeps.',
    },
    {
      panelKey: 'capacity-planner',
      agentName: 'Capacity Planner',
      suiteLabel: 'Workforce Operations',
      suiteColor: '#7C3AED',
      description:
        'Forecasts demand vs. staffed capacity up to 7 days out, flags shortfalls, and surfaces them before they become incidents.',
    },
  ],

  subIndustries: [
    {
      iconKey: 'users',
      title: 'Large Healthcare Staffing Agencies',
      description: 'Automated candidate matching, compliance, and shift fulfillment.',
      agentCount: '8 agents',
    },
    {
      iconKey: 'plane',
      title: 'Airports & Aviation Ground Ops',
      description: 'Shift coverage automation for 24/7 ground operations teams.',
      agentCount: '8 agents',
    },
    {
      iconKey: 'factory',
      title: 'Manufacturing Plants',
      description: 'Workforce scheduling and shift compliance across multiple facilities.',
      agentCount: '8 agents',
    },
    {
      iconKey: 'shield',
      title: 'Private Security Services',
      description: 'Guard scheduling, credential verification, and shift coverage.',
      agentCount: '8 agents',
    },
  ],

  suiteHref: '/workforce',
  suiteLabel: 'Explore Workforce Agents',
  suiteAgentCount: 'Workforce agents',
  suiteDescription:
    'Scheduling, call-offs, capacity planning, auto-approval, and more — configured for round-the-clock operations from day one.',
}

export default function Page() {
  return <IndustryPage config={config} />
}
