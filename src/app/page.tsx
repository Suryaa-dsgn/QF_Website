import Hero        from '@/components/sections/Hero'
import About       from '@/components/sections/About'
import Scope       from '@/components/sections/Scope'
import Industries  from '@/components/sections/Industries'
import ProofRow    from '@/components/sections/ProofRow'
import HowItWorks  from '@/components/sections/HowItWorks'
import CTA         from '@/components/sections/CTA'
import Footer      from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      {/* dark-section stripe acts as the visual break before Industries */}
      <Scope />
      <Industries />
      <ProofRow />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}
