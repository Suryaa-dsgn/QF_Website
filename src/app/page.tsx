import Hero          from '@/components/sections/Hero'
import TheProblem    from '@/components/sections/TheProblem'
import VerticalCards from '@/components/sections/VerticalCards'
import Scope         from '@/components/sections/Scope'
import Industries from '@/components/sections/Industries'
import ProofRow   from '@/components/sections/ProofRow'
import HowItWorks from '@/components/sections/HowItWorks'
import CTA        from '@/components/sections/CTA'
import Footer     from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TheProblem />
      <VerticalCards />
      <Scope />
      <Industries />
      <ProofRow />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  )
}
