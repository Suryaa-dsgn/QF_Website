'use client'

import Link from 'next/link'

// ─── NAV DATA ─────────────────────────────────────────────────────

const platformLinks = [
  { label: 'How It Works',      href: '/how-it-works' },
  { label: 'Workforce Agents',  href: '/workforce'    },
  { label: 'Financial Agents',  href: '/financial'    },
  { label: 'Compliance Agents', href: '/compliance'   },
]

const industryLinks = [
  { label: 'Healthcare',            href: '/industries/home-health' },
  { label: 'Finance & Real Estate', href: '/industries/reits'       },
  { label: 'Logistics & Ops',       href: '/industries/logistics'   },
  { label: 'Home Health',           href: '/industries/home-health' },
  { label: 'Staffing Agencies',     href: '/industries/logistics'   },
]

const companyLinks = [
  { label: 'About',   href: '/about'   },
  { label: 'FAQ',     href: '/faq'     },
  { label: 'Contact', href: '/contact' },
]

const socialsLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/quickflows-ai-llc/' },
]

// ─── NAV COLUMN ────────────────────────────────────────────────────

function NavCol({
  label,
  links,
}: {
  label: string
  links: { label: string; href: string; external?: boolean }[]
}) {
  return (
    <div>
      <p
        style={{
          fontSize:      '10px',
          fontWeight:    600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.45)',
          marginBottom:  '16px',
          fontFamily:    'var(--font-geist-sans)',
        }}
      >
        {label}
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map((link) =>
          link.external ? (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  gap:            '6px',
                  fontSize:       '13px',
                  color:          'rgba(255,255,255,0.75)',
                  fontFamily:     'var(--font-geist-sans)',
                  textDecoration: 'none',
                  transition:     'color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              >
                {link.label}
                <span style={{ fontSize: '11px', opacity: 0.7 }}>↗</span>
              </a>
            </li>
          ) : (
            <li key={link.label}>
              <Link
                href={link.href}
                style={{
                  fontSize:   '13px',
                  color:      'rgba(255,255,255,0.75)',
                  fontFamily: 'var(--font-geist-sans)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

// ─── MAIN FOOTER ──────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer style={{ padding: '0 24px 32px', background: 'transparent' }}>

      {/* ── Outer wrapper — position:relative lets logo bleed outside card ── */}
      <div style={{ position: 'relative' }}>

        {/* ── Notch mask — covers top-left of card so page background shows through ── */}
        <div
          style={{
            position:                'absolute',
            top:                     0,
            left:                    0,
            width:                   '264px',
            height:                  '230px',
            background:              '#F9F8FF',
            borderBottomRightRadius: '24px',
            zIndex:                  2,
            pointerEvents:           'none',
          }}
        />

        {/* ── Q logo — sits directly on page background in the notch ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/qf-logo-purple.svg"
          alt=""
          aria-hidden="true"
          style={{
            position:      'absolute',
            top:           '16px',
            left:          '16px',
            width:         '224px',
            height:        'auto',
            display:       'block',
            zIndex:        3,
            pointerEvents: 'none',
            userSelect:    'none',
          }}
        />

        {/* ── Card ── */}
        <div
          style={{
            borderRadius: '20px',
            overflow:     'hidden',
            background:   'linear-gradient(155deg, #5C10AA 0%, #3B0764 30%, #1A0545 60%, #0D021F 100%)',
          }}
        >

          {/* ── Section 1: Nav columns ── */}
          <div
            style={{
              padding: '44px 48px 36px 312px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '32px',
            }}
            className="footer-nav-grid"
          >
            <NavCol label="Platform"   links={platformLinks} />
            <NavCol label="Industries" links={industryLinks} />
            <NavCol label="Company"    links={companyLinks}  />
            <NavCol
              label="Socials"
              links={socialsLinks.map(l => ({ ...l, external: true }))}
            />
          </div>

          {/* ── Section 2: Tagline + CTA ── */}
          <div
            style={{
              padding:        '0 48px 44px',
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'flex-end',
              gap:            '32px',
            }}
            className="footer-tagline-row"
          >
            <h2
              style={{
                fontFamily:    'var(--font-bricolage)',
                fontSize:      'clamp(36px, 4.5vw, 66px)',
                fontWeight:    500,
                color:         '#FFFFFF',
                letterSpacing: '0.01em',
                lineHeight:    1.05,
                margin:        0,
              }}
            >
              Quickflows helps
              <br />your team work smarter
              <br />without spending a lot of time
            </h2>

            <Link
              href="/workforce"
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                justifyContent:  'center',
                padding:         '14px 28px',
                background:      '#FFFFFF',
                color:           '#0A0A0A',
                borderRadius:    '12px',
                fontSize:        '15px',
                fontWeight:      600,
                fontFamily:      'var(--font-geist-sans)',
                whiteSpace:      'nowrap',
                flexShrink:      0,
                textDecoration:  'none',
                transition:      'opacity 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Explore Agents
            </Link>
          </div>

          {/* ── Section 3: Bottom bar ── */}
          <div
            style={{
              borderTop:      '1px solid rgba(255,255,255,0.12)',
              padding:        '18px 48px',
              display:        'flex',
              justifyContent: 'space-between',
              alignItems:     'center',
              gap:            '16px',
              flexWrap:       'wrap',
            }}
          >
            {/* Copyright */}
            <p
              style={{
                fontSize:   '12px',
                color:      'rgba(255,255,255,0.45)',
                fontFamily: 'var(--font-geist-sans)',
                margin:     0,
              }}
            >
              © 2026 Quickflows AI Solutions. All rights reserved.
            </p>

            {/* Email */}
            <a
              href="mailto:info@quickflows.ai"
              style={{
                fontSize:       '12px',
                color:          'rgba(255,255,255,0.45)',
                fontFamily:     'var(--font-geist-sans)',
                textDecoration: 'none',
                transition:     'color 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              info@quickflows.ai
            </a>

            {/* Privacy + Terms */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                href="/privacy"
                style={{
                  fontSize:       '12px',
                  color:          'rgba(255,255,255,0.45)',
                  fontFamily:     'var(--font-geist-sans)',
                  textDecoration: 'none',
                  transition:     'color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                Privacy Policy
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
              <Link
                href="/terms"
                style={{
                  fontSize:       '12px',
                  color:          'rgba(255,255,255,0.45)',
                  fontFamily:     'var(--font-geist-sans)',
                  textDecoration: 'none',
                  transition:     'color 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                Terms of Services
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
