import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us | Quickflows.ai',
  description:
    'Meet the team and mission behind Quickflows.ai — AI-powered operations automation built by operators, for operators.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="bg-bg min-h-screen">
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
