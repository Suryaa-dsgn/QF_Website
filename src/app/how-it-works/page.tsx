import { type Metadata } from 'next'
import Navigation from '@/components/Navigation'
import HowItWorks from '@/components/sections/HowItWorks'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How It Works | Quickflows',
  description:
    'From first conversation to agents running live — in under 100 hours. See exactly how Quickflows deploys and operates.',
}

export default function Page() {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '60px' }}>
        <HowItWorks extended />
      </div>
      <Footer />
    </>
  )
}
