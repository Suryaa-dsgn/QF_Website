import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'
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

// Geist Mono — used sparingly for secondary/technical text (timestamps,
// status labels) that isn't part of any page's above-the-fold content.
// Reimplemented from 'geist/font/mono' with preload disabled: that package
// hardcodes preload: true, and since its variable is applied on the root
// layout, Next.js preloads it on every route even when the mono text isn't
// rendered within view in time, triggering an unused-preload console warning.
const geistMono = localFont({
  src: '../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
  variable: '--font-geist-mono',
  adjustFontFallback: false,
  preload: false,
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Roboto Mono',
    'Menlo',
    'Monaco',
    'Liberation Mono',
    'DejaVu Sans Mono',
    'Courier New',
    'monospace',
  ],
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Quickflows.ai — AI-Powered Operations Automation',
  description:
    'Quickflows agents run across your workforce and your finances — catching missed shifts, flagging expirations, reconciling invoices.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
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
      className={`${bricolage.variable} ${GeistSans.variable} ${geistMono.variable}`}
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
