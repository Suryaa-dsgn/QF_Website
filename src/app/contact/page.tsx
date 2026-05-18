import type { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BookDemoButton from '@/components/BookDemoButton'

export const metadata: Metadata = {
  title: 'Contact Us | Quickflows.ai',
  description:
    'Get in touch with the Quickflows team. Tell us about your operations and see how AI agents can help.',
}

// ─── FIELD COMPONENT ──────────────────────────────────────────────

function Field({
  label,
  id,
  type = 'text',
  placeholder,
  required = true,
  isTextarea = false,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
  required?: boolean
  isTextarea?: boolean
}) {
  const base =
    'w-full rounded-[10px] border border-[--border] bg-white px-4 text-[14px] text-ink font-ui placeholder:text-ink4 focus:outline-none focus:ring-2 focus:ring-[--brand] focus:ring-offset-0 transition-shadow duration-150'

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-medium text-ink font-ui"
      >
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          required={required}
          className={`${base} py-3 resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`${base} h-11`}
        />
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <main className="bg-bg min-h-screen">
        <section className="pt-[100px] pb-[100px] sm:pt-[120px] sm:pb-[120px]">
          <div className="max-w-[960px] mx-auto px-6 sm:px-10">

            {/* ── Header ── */}
            <div className="text-center mb-12">
              <p className="text-label mb-4">CONTACT</p>
              <h1
                className="font-display font-bold text-ink mb-4"
                style={{
                  fontSize:      'clamp(30px, 3.8vw, 52px)',
                  letterSpacing: '-0.035em',
                  lineHeight:    '1.05',
                }}
              >
                Let&apos;s talk{' '}
                <span className="italic text-brand">operations.</span>
              </h1>
              <p className="text-[16px] text-ink3 font-ui leading-relaxed max-w-[480px] mx-auto">
                Tell us about your team and we&apos;ll show you exactly which agents will
                have the most impact — usually within 24 hours.
              </p>
            </div>

            {/* ── Two-column layout ── */}
            <div className="grid md:grid-cols-[1fr_360px] gap-8 items-start">

              {/* LEFT — Contact form */}
              <div
                className="rounded-[20px] bg-white border border-[--border] p-8"
                style={{ boxShadow: 'var(--shadow-2)' }}
              >
                <h2
                  className="font-display font-bold text-ink mb-6"
                  style={{ fontSize: '20px', letterSpacing: '-0.025em' }}
                >
                  Send us a message
                </h2>

                <form
                  method="POST"
                  action="#"
                  className="flex flex-col gap-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="Full Name"
                      id="name"
                      placeholder="Jane Smith"
                    />
                    <Field
                      label="Work Email"
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <Field
                    label="Company"
                    id="company"
                    placeholder="Acme Health Systems"
                  />

                  <Field
                    label="Message"
                    id="message"
                    placeholder="Tell us about your team size, current challenges, and what you're hoping to automate..."
                    isTextarea
                  />

                  <button
                    type="submit"
                    className="btn-base btn-primary w-full text-center mt-1"
                  >
                    Send message
                  </button>

                  <p className="text-[12px] text-ink4 font-ui text-center">
                    We typically respond within a few hours during business hours.
                  </p>
                </form>
              </div>

              {/* RIGHT — Info card */}
              <div className="flex flex-col gap-4">

                {/* Contact details */}
                <div
                  className="rounded-[20px] p-7 border border-[--border]"
                  style={{ background: 'var(--brand-08)' }}
                >
                  <p
                    className="font-display font-bold text-ink mb-5"
                    style={{ fontSize: '17px', letterSpacing: '-0.02em' }}
                  >
                    Reach us directly
                  </p>

                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-[11px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-1 font-ui">
                        Phone
                      </p>
                      <a
                        href="tel:6782670106"
                        className="text-[15px] font-medium text-ink font-ui hover:text-brand transition-colors duration-150"
                      >
                        678-267-0106
                      </a>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-ink4 uppercase tracking-[0.06em] mb-1 font-ui">
                        Email
                      </p>
                      <a
                        href="mailto:info@quickflows.ai"
                        className="text-[15px] font-medium text-ink font-ui hover:text-brand transition-colors duration-150"
                      >
                        info@quickflows.ai
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-[--border-mid] my-6" />

                  <p
                    className="font-display font-bold text-ink mb-2"
                    style={{ fontSize: '16px', letterSpacing: '-0.02em' }}
                  >
                    Prefer a live demo?
                  </p>
                  <p className="text-[13px] text-ink3 font-ui leading-relaxed mb-5">
                    See three Quickflows agents working live —
                    20 minutes, no prep needed, tailored to your actual operations.
                  </p>
                  <BookDemoButton className="btn-base btn-primary w-full text-center">
                    Book a 20-min demo →
                  </BookDemoButton>
                </div>

                {/* Trust note */}
                <div className="rounded-[14px] bg-white border border-[--border] px-5 py-4 flex flex-col gap-2">
                  {[
                    '✓ No credit card required',
                    '✓ Live in 24 hours',
                    '✓ Works with your existing stack',
                  ].map((item) => (
                    <p key={item} className="text-[13px] text-ink3 font-ui">
                      {item}
                    </p>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
