import Hero             from '@/components/sections/Hero'
import Scope            from '@/components/sections/Scope'
import WorkforceAgents  from '@/components/sections/WorkforceAgents'
import FinancialAgents  from '@/components/sections/FinancialAgents'
import ProofRow         from '@/components/sections/ProofRow'
import Industries       from '@/components/sections/Industries'
import HowItWorks       from '@/components/sections/HowItWorks'
import CTA              from '@/components/sections/CTA'
import Footer           from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* No gap — dark-section background is the visual separator */}
      <Scope />
      <WorkforceAgents />
      <FinancialAgents />
      <ProofRow />
      <Industries />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}
