import Link from 'next/link'

// ─── NAV DATA ─────────────────────────────────────────────────────

const platformLinks = [
  { label: 'How It Works',      href: '/#how-it-works'                },
  { label: 'Workforce Agents',  href: '/workforce'                    },
  { label: 'Financial Agents',  href: '/financial'                    },
  { label: 'Industries',        href: '/industries'                   },
  { label: 'Pricing',           href: '/pricing'                      },
]

const industryLinks = [
  { label: 'Healthcare',           href: '/industries/hospitals'         },
  { label: 'Finance & Real Estate', href: '/industries/reits'            },
  { label: 'Logistics & Ops',      href: '/industries/logistics'         },
  { label: 'Home Health',          href: '/industries/home-health'       },
  { label: 'Staffing Agencies',    href: '/industries/staffing-agencies' },
]

const companyLinks = [
  { label: 'About',            href: '/about'   },
  { label: 'Blog',             href: '/blog'    },
  { label: 'Careers',         href: '/careers' },
  { label: 'Contact',          href: '/contact' },
  { label: 'Book a Demo',      href: '/contact' },
  { label: 'Privacy Policy',   href: '/privacy' },
  { label: 'Terms of Service', href: '/terms'   },
]

// ─── LOGO MARK ────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="flex items-center gap-2 mb-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/qf-logo-black.svg"
        alt="Quickflows mark"
        width={26}
        height={27}
        className="flex-shrink-0"
      />
      <span className="text-[15px] font-semibold text-ink tracking-[-0.02em]">
        Quickflows.ai
      </span>
    </div>
  )
}

// ─── FOOTER COLUMN ────────────────────────────────────────────────

function FooterCol({
  label,
  links,
}: {
  label: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <p
        style={{
          fontSize:      '10px',
          fontWeight:    600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color:         'rgba(10,10,10,0.35)',
          marginBottom:  '16px',
          fontFamily:    'var(--font-geist-sans)',
        }}
      >
        {label}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13px] text-ink3 font-ui hover:text-ink transition-colors duration-150"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── MAIN FOOTER ──────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-[--border] bg-white">
      <div className="max-w-[1120px] mx-auto px-10 py-16">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div>
            <LogoMark />

            <p className="text-[13px] text-ink4 font-ui leading-relaxed mb-5 max-w-[220px]">
              Operations automation for healthcare, finance, and compliance-heavy industries.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-1.5 mb-5">
              <a
                href="tel:6782670106"
                className="text-[13px] text-ink3 font-ui hover:text-ink transition-colors duration-150"
              >
                678-267-0106
              </a>
              <a
                href="mailto:info@quickflows.ai"
                className="text-[13px] text-ink3 font-ui hover:text-ink transition-colors duration-150"
              >
                info@quickflows.ai
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-ink4 font-ui font-medium hover:text-ink transition-colors duration-150"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-ink4 font-ui font-medium hover:text-ink transition-colors duration-150"
              >
                Twitter ↗
              </a>
            </div>
          </div>

          {/* Col 2 — Platform */}
          <FooterCol label="Platform"    links={platformLinks} />

          {/* Col 3 — Industries */}
          <FooterCol label="Industries"  links={industryLinks} />

          {/* Col 4 — Company */}
          <FooterCol label="Company"     links={companyLinks}  />

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[--border] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-ink4 font-ui">
            © 2026 Quickflows AI Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-[12px] text-ink4 font-ui hover:text-ink transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <span className="text-ink4/40 text-[10px]">·</span>
            <Link
              href="/terms"
              className="text-[12px] text-ink4 font-ui hover:text-ink transition-colors duration-150"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
