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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3
        className="font-ui font-semibold text-ink mb-2"
        style={{ fontSize: '14px' }}
      >
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
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
                Last Updated: June 29, 2026
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[--border] mb-10" />

            {/* Intro */}
            <div className="text-[14px] text-ink3 font-ui leading-relaxed mb-8">
              <p>
                This Privacy Policy describes how Quickflows.ai (&ldquo;Quickflows,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, uses, discloses, and safeguards information when you use our services, including our workflow automation platform and any third-party health data integrations accessed on your behalf.
              </p>
              <p className="mt-3">
                This Policy applies to all users and is specifically designed to comply with applicable federal and state privacy laws, including the Health Insurance Portability and Accountability Act (HIPAA), the Federal Trade Commission Act (FTC Act), and applicable state consumer protection statutes. Our health data practices also align with the CARIN Alliance Code of Conduct, the ONC Model Privacy Notice (MPN), and CMS recommended best practices for app developers.
              </p>
            </div>

            {/* Content */}
            <Section title="1. Information We Collect">
              <SubSection title="1.1 Information You Provide">
                <p>
                  We collect information you provide directly to us when you:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Fill out a contact form, request a demo, or register for an account</li>
                  <li>Communicate with our team via email or phone</li>
                  <li>Authorize our application to access your health information through a third-party health plan API (such as SelectHealth)</li>
                </ul>
                <p>
                  This may include your name, work email address, company name, phone number, and any details you share about your operations.
                </p>
              </SubSection>

              <SubSection title="1.2 Health Information Accessed via Third-Party APIs">
                <p>
                  When you explicitly authorize Quickflows to connect with a health plan&rsquo;s API on your behalf (e.g., SelectHealth&rsquo;s Patient Access API), we may access the following categories of health data as permitted by your authorization:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li><strong>Claims and Explanation of Benefits (EOB) data</strong> &ndash; including insurance claims history, cost-sharing information, and payment records</li>
                  <li><strong>Clinical data</strong> &ndash; including diagnoses, medications, lab results, and clinical notes</li>
                  <li><strong>Coverage and benefits information</strong> &ndash; including plan details, deductibles, copays, and coverage limits</li>
                  <li><strong>Provider information</strong> &ndash; including in-network providers and care team details</li>
                </ul>
                <p>
                  This data is accessed solely through FHIR-based APIs using SMART on FHIR / OAuth 2.0 authorization flows, and only with your explicit, informed consent.
                </p>
              </SubSection>

              <SubSection title="1.3 Technical and Usage Data">
                <p>
                  We automatically collect limited technical data when you visit our website or use our platform, including your IP address, browser type, pages visited, and referring URLs. This is used solely to improve our services and understand how visitors interact with our content.
                </p>
              </SubSection>
            </Section>

            <Section title="2. How We Use Your Information">
              <SubSection title="2.1 Permitted Uses">
                <p>We use the information we collect only for the following purposes:</p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>To provide and operate our workflow automation platform and services</li>
                  <li>To fulfill the specific purpose for which you authorized access to your health information</li>
                  <li>To respond to your inquiries, schedule demonstrations, and send relevant service updates</li>
                  <li>To improve our platform, fix bugs, and enhance the user experience</li>
                  <li>To comply with applicable legal obligations</li>
                </ul>
              </SubSection>

              <SubSection title="2.2 Health Data – Strict Use Limitations">
                <p>
                  Health information accessed through third-party APIs (including claims, clinical, coverage, and provider data) is used ONLY for the specific purpose you authorized. We will not:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Use your health data for advertising, marketing, or promotional purposes</li>
                  <li>Use your health data to make or inform employment decisions</li>
                  <li>Use your health data for credit, insurance underwriting, or financial decisions not authorized by you</li>
                  <li>Use your health data for any secondary purpose beyond what you explicitly authorized</li>
                </ul>
                <p>
                  This limitation is a core commitment of our service and aligns with the CARIN Alliance Code of Conduct and CMS recommended best practices for third-party app developers.
                </p>
              </SubSection>
            </Section>

            <Section title="3. We Will Never Sell Your Health Data">
              <p>
                Quickflows does not sell, rent, trade, or otherwise transfer your personal information or health data to third parties for their own commercial purposes. This prohibition applies unconditionally, including in the event of a business transaction such as a merger, acquisition, or sale of assets.
              </p>
              <p>
                In the event of a change of ownership or business acquisition, any acquirer will be required to honor the terms of this Privacy Policy or obtain fresh consent from you before using your information in any manner inconsistent with it.
              </p>
            </Section>

            <Section title="4. How We Share Your Information">
              <p>
                We do not share your personal or health information except in the following limited circumstances:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li><strong>Service Providers:</strong> We share data with trusted third-party vendors (e.g., cloud hosting, analytics, customer communication tools) who process data on our behalf and are contractually required to protect it and use it only as directed by Quickflows.</li>
                <li><strong>Health Plan APIs:</strong> When you authorize API connections (e.g., SelectHealth), data is exchanged only as required to fulfill your authorized request.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government authority, or to protect the rights, property, or safety of Quickflows, our users, or the public.</li>
                <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit prior consent.</li>
              </ul>
              <p>
                We do not share your health data with data brokers, advertisers, or any third party for purposes unrelated to the service you have requested.
              </p>
            </Section>

            <Section title="5. HIPAA and Health Data Compliance">
              <p>
                To the extent that Quickflows accesses, processes, or stores Protected Health Information (PHI) as defined under HIPAA, we comply with all applicable requirements of the Health Insurance Portability and Accountability Act of 1996 and its implementing regulations (45 CFR Parts 160 and 164).
              </p>
              <p>
                Where required, we enter into Business Associate Agreements (BAAs) with covered entities and other business associates. We implement administrative, physical, and technical safeguards to protect the confidentiality, integrity, and availability of PHI in accordance with the HIPAA Security Rule.
              </p>
              <p>
                We also comply with all applicable state health privacy laws, which may provide additional protections beyond HIPAA.
              </p>
            </Section>

            <Section title="6. Regulatory Framework Compliance">
              <p>
                Our privacy and data handling practices are designed to comply with and align with the following frameworks, as required by SelectHealth and other health plan API access agreements:
              </p>

              <SubSection title="6.1 CARIN Alliance Code of Conduct">
                <p>
                  We adhere to the CARIN Alliance Code of Conduct, which establishes responsible data practices for third-party health applications, including:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Transparency about data collection and use</li>
                  <li>Prohibition on selling health data</li>
                  <li>Limiting data use to authorized purposes</li>
                  <li>Providing users with meaningful control over their data</li>
                  <li>CARIN Alliance Code of Conduct</li>
                </ul>
              </SubSection>

              <SubSection title="6.2 FTC Privacy and Security Recommendations">
                <p>
                  We follow the FTC&rsquo;s &ldquo;Start with Security&rdquo; framework, including:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Collecting only the data necessary for the services we provide</li>
                  <li>Protecting data in storage and transmission with industry-standard encryption</li>
                  <li>Implementing access controls to limit who can view sensitive information</li>
                  <li>Maintaining a data breach response plan</li>
                  <li>FTC Start with Security Guide</li>
                </ul>
              </SubSection>

              <SubSection title="6.3 CMS Recommended Best Practices">
                <p>
                  We follow CMS recommended best practices for payers and app developers operating under the CMS Interoperability and Patient Access Rule (CMS-9115-F), including responsible handling of patient data obtained via FHIR APIs.
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>CMS Best Practices for Payers and App Developers</li>
                </ul>
              </SubSection>

              <SubSection title="6.4 ONC Model Privacy Notice (MPN)">
                <p>
                  In alignment with the ONC Model Privacy Notice, we provide clear, plain-language disclosures about:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>What data we collect (see Section 1)</li>
                  <li>How we use your data (see Section 2)</li>
                  <li>Whether we sell your data &ndash; We do not (see Section 3)</li>
                  <li>Who we share your data with (see Section 4)</li>
                  <li>How you can delete your data (see Section 9)</li>
                  <li>What happens if our business is acquired (see Section 3)</li>
                  <li>ONC Model Privacy Notice</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="7. Your Rights and Controls">
              <SubSection title="7.1 Right to Revoke Health Data Access">
                <p>You may revoke Quickflows&rsquo; access to your health data at any time by:</p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Contacting us at{' '}
                    <a href="mailto:info@quickflows.ai" className="text-brand hover:underline">
                      info@quickflows.ai
                    </a>
                  </li>
                  <li>Revoking access directly through your health plan&rsquo;s member portal (e.g., SelectHealth&rsquo;s developer portal)</li>
                </ul>
                <p>
                  Upon revocation, we will cease accessing your health data and will delete or de-identify any previously retrieved data within 30 days, unless we are legally required to retain it.
                </p>
              </SubSection>

              <SubSection title="7.2 Access, Correction, and Deletion">
                <p>
                  Depending on your location and applicable law, you may have the right to:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Access the personal information or health data we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information or health data</li>
                  <li>Restrict or object to certain processing of your data</li>
                  <li>Receive a copy of your data in a portable format</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{' '}
                  <a href="mailto:info@quickflows.ai" className="text-brand hover:underline">
                    info@quickflows.ai
                  </a>
                  . We will respond within 30 days.
                </p>
              </SubSection>

              <SubSection title="7.3 Know What Health Data Was Accessed">
                <p>
                  Upon request, we will provide you with a summary of what health data was accessed through third-party API connections on your behalf and when that access occurred.
                </p>
              </SubSection>
            </Section>

            <Section title="8. Data Security">
              <p>
                We implement industry-standard administrative, physical, and technical safeguards to protect your information, including:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Encryption of data in transit (TLS 1.2 or higher) and at rest (AES-256)</li>
                <li>Role-based access controls limiting who can access sensitive data</li>
                <li>Regular security assessments and vulnerability management</li>
                <li>Secure credential management for API tokens and OAuth credentials</li>
                <li>Employee training on data privacy and security practices</li>
              </ul>
              <p>
                In the event of a data breach that affects your personal information or health data, we will notify you and applicable regulatory authorities within 60 days of discovering the breach (or within the timeframe required by applicable law, whichever is sooner). Notification will include the nature of the breach, the types of data affected, and the steps we are taking in response.
              </p>
              <p>
                No method of transmission over the internet is 100% secure. While we implement strong safeguards, we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Data Retention and Deletion">
              <p>
                We retain your personal information and health data for as long as necessary to provide our services or as required by applicable law. Health data accessed via third-party APIs is retained only as long as needed to fulfill the authorized purpose.
              </p>
              <p>
                If you wish to have your data deleted, please contact us at{' '}
                <a href="mailto:info@quickflows.ai" className="text-brand hover:underline">
                  info@quickflows.ai
                </a>
                . We will delete or de-identify your data within 30 days of your request, subject to any legal retention requirements.
              </p>
            </Section>

            <Section title="10. Cookies and Tracking Technologies">
              <p>
                Our website uses cookies and similar technologies to provide a better browsing experience, analyze traffic, and understand how you interact with our content. We do not use cookies to track your health-related activities.
              </p>
              <p>
                You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.
              </p>
            </Section>

            <Section title="11. Third-Party Services and Links">
              <p>
                We use trusted third-party service providers for analytics, customer communication, scheduling, and cloud infrastructure. These providers process data on our behalf and are contractually bound to protect it and use it only as directed.
              </p>
              <p>
                Our platform may include links to third-party websites or services. This Privacy Policy does not apply to those third-party sites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services you access.
              </p>
            </Section>

            <Section title="12. Children's Privacy">
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us at{' '}
                <a href="mailto:info@quickflows.ai" className="text-brand hover:underline">
                  info@quickflows.ai
                </a>{' '}
                and we will delete it promptly.
              </p>
            </Section>

            <Section title="13. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. We will notify you of material changes by:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Updating the &ldquo;Last Updated&rdquo; date at the top of this page</li>
                <li>Sending an email notification to registered users where appropriate</li>
              </ul>
              <p>
                Your continued use of our services after changes are posted constitutes your acceptance of the updated policy. If you do not agree to the updated policy, you should stop using our services and may request deletion of your data.
              </p>
            </Section>

            <Section title="14. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-ink">Quickflows.ai</p>
                <p>
                  Email:{' '}
                  <a href="mailto:info@quickflows.ai" className="text-brand hover:underline">
                    info@quickflows.ai
                  </a>
                </p>
                <p>
                  Phone:{' '}
                  <a href="tel:6782670106" className="text-brand hover:underline">
                    678-267-0106
                  </a>
                </p>
                <p>Website: quickflows.ai</p>
              </div>
              <p>
                We are committed to resolving any privacy concerns promptly and transparently.
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
