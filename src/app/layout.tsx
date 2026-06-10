import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Bricolage_Grotesque } from 'next/font/google'
import { LenisProvider } from '@/components/LenisProvider'
import Navigation from '@/components/Navigation'
import DemoModal  from '@/components/DemoModal'
import PageLoader from '@/components/PageLoader'
import './globals.css'

// Bricolage Grotesque — display only.
// Variable font: weight must be omitted (or 'variable') when using axes.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Quickflows.ai — AI-Powered Operations Automation',
  description:
    'Quickflows agents run across your workforce and your finances — catching missed shifts, flagging expirations, reconciling invoices.',
  icons: {
    icon: '/qf-logo-purple.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={GeistSans.className}>
        <PageLoader />
        <LenisProvider>
          <Navigation />
          <main>{children}</main>
          <DemoModal />
        </LenisProvider>
      </body>
    </html>
  )
}
