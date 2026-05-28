import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Quickflows.ai',
  description: 'How Quickflows collects, uses, and protects your information.',
}

// ─── PROSE SECTION ────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2
        className="font-display font-bold text-ink mb-3"
        style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      <div className="text-[14px] text-ink3 font-ui leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <>
      <Navigation />

      <main className="bg-bg min-h-screen">
        <section className="pt-[100px] pb-[100px] sm:pt-[120px] sm:pb-[120px]">
          <div className="max-w-[760px] mx-auto px-6 sm:px-10">

            {/* Header */}
            <div className="mb-10">
              <p className="text-label mb-3">LEGAL</p>
              <h1
                className="font-display font-bold text-ink mb-3"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.035em', lineHeight: '1.05' }}
              >
                Privacy Policy
              </h1>
              <p className="text-[14px] text-ink4 font-ui">
                Last updated: May 28, 2026
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[--border] mb-10" />

            {/* Content */}
            <Section title="1. Information We Collect">
              <p>
                We collect information you provide directly to us when you fill out a contact form,
                request a demo, or communicate with our team. This includes your name, work email
                address, company name, and any details you share about your operations.
              </p>
              <p>
                We also collect limited technical data automatically when you visit our website,
                including your IP address, browser type, pages visited, and referring URLs. This
                is used solely to improve our website and understand how visitors interact with
                our content.
              </p>
            </Section>

            <Section title="2. How We Use Your Information">
              <p>
                We use the information we collect to respond to your inquiries, schedule product
                demonstrations, send relevant updates about Quickflows, and improve our services.
                We do not sell, rent, or share your personal information with third parties for
                their own marketing purposes.
              </p>
              <p>
                We may use your email address to send you product updates, case studies, or
                operational insights that we believe are relevant to your role. You can
                unsubscribe at any time by clicking the unsubscribe link in any email we send.
              </p>
            </Section>

            <Section title="3. Data Security">
              <p>
                We take the security of your information seriously. We use industry-standard
                encryption and access controls to protect your data. Our systems are designed to
                prevent unauthorized access, disclosure, or alteration of the information we hold.
              </p>
              <p>
                However, no method of transmission over the internet is 100% secure. While we
                strive to protect your information, we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="4. Cookies">
              <p>
                Our website uses cookies and similar technologies to provide a better browsing
                experience, analyze traffic, and understand how you interact with our content.
                You can control cookie settings through your browser preferences.
              </p>
            </Section>

            <Section title="5. Third-Party Services">
              <p>
                We use trusted third-party services for analytics, customer communication, and
                scheduling (such as our demo booking system). These services process data on our
                behalf and are bound by their own privacy policies. We do not share personally
                identifiable information with these services beyond what is necessary to
                operate our website and communicate with you.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain your personal information for as long as necessary to fulfil the
                purposes for which it was collected, or as required by applicable law. If you
                would like us to delete your information, please contact us at{' '}
                <a
                  href="mailto:info@quickflows.ai"
                  className="text-brand hover:underline"
                >
                  info@quickflows.ai
                </a>
                .
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>
                Depending on your location, you may have rights to access, correct, or delete
                your personal information. You may also have the right to restrict or object to
                certain processing of your data. To exercise any of these rights, please contact
                us at{' '}
                <a
                  href="mailto:info@quickflows.ai"
                  className="text-brand hover:underline"
                >
                  info@quickflows.ai
                </a>
                .
              </p>
            </Section>

            <Section title="8. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                significant changes by updating the &ldquo;Last updated&rdquo; date at the top of this page.
                Your continued use of our website after changes are posted constitutes your
                acceptance of the updated policy.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <p>
                If you have any questions about this Privacy Policy or how we handle your data,
                please reach out to us at{' '}
                <a
                  href="mailto:info@quickflows.ai"
                  className="text-brand hover:underline"
                >
                  info@quickflows.ai
                </a>{' '}
                or call us at{' '}
                <a href="tel:6782670106" className="text-brand hover:underline">
                  678-267-0106
                </a>
                .
              </p>
            </Section>

            {/* Back link */}
            <div className="mt-10 pt-8 border-t border-[--border]">
              <Link
                href="/"
                className="text-[13px] text-ink3 font-ui hover:text-ink transition-colors duration-150"
              >
                ← Back to home
              </Link>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
