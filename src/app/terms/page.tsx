import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Quickflows.ai',
  description: 'Terms and conditions governing your use of Quickflows.ai and its services.',
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

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-[14px] text-ink4 font-ui">
                Last updated: May 28, 2026
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[--border] mb-10" />

            {/* Intro */}
            <p className="text-[14px] text-ink3 font-ui leading-relaxed mb-10">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Quickflows AI
              Solutions&rsquo; website, platform, and services (&ldquo;Services&rdquo;). By accessing or using our
              Services, you agree to be bound by these Terms. If you do not agree, please do not
              use our Services.
            </p>

            {/* Content */}
            <Section title="1. Use of Services">
              <p>
                You may use our Services only for lawful purposes and in accordance with these
                Terms. You agree not to use our Services in any way that violates applicable
                law, infringes on the rights of others, or interferes with the operation of our
                platform.
              </p>
              <p>
                Our Services are intended for business use by operations teams, healthcare
                organizations, financial firms, and similar professional entities. You represent
                that you have the authority to bind your organization to these Terms.
              </p>
            </Section>

            <Section title="2. Accounts and Access">
              <p>
                Access to the Quickflows platform is provisioned through our onboarding process.
                You are responsible for maintaining the confidentiality of your login credentials
                and for all activity that occurs under your account. You agree to notify us
                immediately of any unauthorized access.
              </p>
            </Section>

            <Section title="3. Intellectual Property">
              <p>
                All content, software, technology, and materials made available through our
                Services are the exclusive property of Quickflows AI Solutions or its licensors.
                Nothing in these Terms grants you any right to use our trademarks, logos, or
                proprietary technology outside of the normal use of our Services.
              </p>
            </Section>

            <Section title="4. Data and Confidentiality">
              <p>
                You retain ownership of all data you input into the Quickflows platform. We
                process your data solely to provide the Services you have requested and as
                described in our Privacy Policy. We implement appropriate safeguards to protect
                your operational data and treat it as confidential.
              </p>
              <p>
                You grant us a limited license to process your data as necessary to provide,
                maintain, and improve our Services.
              </p>
            </Section>

            <Section title="5. Service Availability">
              <p>
                We aim to provide reliable, high-availability Services. However, we do not
                guarantee uninterrupted access. We reserve the right to perform maintenance,
                updates, or modifications to our platform, and we will endeavor to provide
                advance notice of any planned downtime.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Quickflows AI Solutions shall not be
                liable for any indirect, incidental, special, consequential, or punitive
                damages arising from your use of, or inability to use, our Services.
              </p>
              <p>
                Our total liability to you for any claim arising from these Terms or your use
                of our Services shall not exceed the amounts you have paid to us in the
                three months preceding the claim.
              </p>
            </Section>

            <Section title="7. Termination">
              <p>
                Either party may terminate the agreement at any time with reasonable written
                notice. Upon termination, your access to the Services will cease and we will
                handle your data in accordance with our data retention policies and your
                instructions.
              </p>
            </Section>

            <Section title="8. Modifications to Terms">
              <p>
                We reserve the right to update these Terms at any time. We will notify you of
                material changes by updating the &ldquo;Last updated&rdquo; date and, where appropriate,
                by sending an email notification. Your continued use of our Services after
                changes become effective constitutes your acceptance of the revised Terms.
              </p>
            </Section>

            <Section title="9. Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of
                the State of Georgia, without regard to its conflict of law provisions. Any
                disputes shall be resolved in the courts located in Fulton County, Georgia.
              </p>
            </Section>

            <Section title="10. Contact">
              <p>
                If you have questions about these Terms, please contact us at{' '}
                <a
                  href="mailto:info@quickflows.ai"
                  className="text-brand hover:underline"
                >
                  info@quickflows.ai
                </a>{' '}
                or call{' '}
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
