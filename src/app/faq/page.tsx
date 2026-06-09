import Navigation from '@/components/Navigation'
import FAQ        from '@/components/sections/FAQ'
import CTA        from '@/components/sections/CTA'
import Footer     from '@/components/Footer'

export const metadata = {
  title: 'FAQ | Quickflows',
  description: 'Common questions from CIOs, CCOs, and operations leaders about Quickflows AI agents.',
}

export default function Page() {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '60px' }}>
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
