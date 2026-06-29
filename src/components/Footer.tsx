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
  { label: 'Healthcare',        href: '/industries/home-health' },
  { label: 'Finance',           href: '/industries/reits'       },
  { label: 'Logistics & Ops',   href: '/industries/logistics'   },
  { label: 'Home Health',       href: '/industries/home-health' },
  { label: 'Staffing Agencies', href: '/industries/logistics'   },
]

const companyLinks = [
  { label: 'About',   href: '/about'   },
  { label: 'FAQ',     href: '/faq'     },
  { label: 'Contact', href: '/contact' },
]

const socialsLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/quickflows-ai-llc/', external: true },
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
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

// ─── QUICKFLOWS MARQUEE BAND ──────────────────────────────────────

const TRACK_TEXT = 'Quickflows                    Quickflows                    Quickflows                    '

function MarqueeSVG({ first }: { first: boolean }) {
  return (
    <svg
      width="10000"
      height="180"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden="true"
    >
      {first && (
        <defs>
          <linearGradient
            id="qfFooterGrad"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="0" y2="163"
          >
            {/* Top of letters: transparent — merges with dark background */}
            <stop offset="0%"   stopColor="#040010" stopOpacity="0" />
            {/* Bottom of letters: soft muted purple glow */}
            <stop offset="100%" stopColor="#7B28CC" stopOpacity="0.65" />
          </linearGradient>
        </defs>
      )}

      {/* Ghost layer: barely-there dark-purple body */}
      <text
        y="163"
        fill="none"
        stroke="rgba(80,25,150,0.18)"
        strokeWidth="2.5"
        style={{
          fontFamily:    'var(--font-bricolage)',
          fontSize:      '220px',
          fontWeight:    800,
          letterSpacing: '6px',
        }}
      >
        {TRACK_TEXT}
      </text>

      {/* Gradient stroke layer — zero fill, faded emergence */}
      <text
        y="163"
        fill="none"
        stroke="url(#qfFooterGrad)"
        strokeWidth="2"
        style={{
          fontFamily:    'var(--font-bricolage)',
          fontSize:      '220px',
          fontWeight:    800,
          letterSpacing: '6px',
        }}
      >
        {TRACK_TEXT}
      </text>
    </svg>
  )
}

function QuickflowsMarquee() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ opacity: 0.8, overflow: 'hidden', height: 'clamp(120px, 13vw, 155px)' }}>
        <div className="footer-marquee">
          <MarqueeSVG first={true}  />
          <MarqueeSVG first={false} />
        </div>
      </div>
    </div>
  )
}

// ─── MAIN FOOTER ──────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer style={{ padding: 0, background: 'transparent' }}>

      {/* ── Dark card — full edge-to-edge, rounded top corners only ── */}
      <div
        style={{
          position:     'relative',
          borderRadius: '20px 20px 0 0',
          overflow:     'hidden',
          background:   'linear-gradient(170deg, #230858 0%, #100220 35%, #070016 65%, #020008 100%)',
        }}
      >
        {/* Dither dot-grid overlay */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
            backgroundSize:  '18px 18px',
            opacity:         0.8,
            zIndex:          0,
            pointerEvents:   'none',
          }}
        />

        {/* ── Two-column body ── */}
        <div
          className="footer-body"
          style={{
            display:  'flex',
            padding:  '44px 48px 40px 48px',
            gap:      '48px',
            position: 'relative',
            zIndex:   1,
          }}
        >
          {/* LEFT: logo + tagline + CTA */}
          <div
            style={{
              width:         '36%',
              flexShrink:    0,
              display:       'flex',
              flexDirection: 'column',
              gap:           '28px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qf-logo-white.svg"
              alt="Quickflows"
              style={{ width: '36px', height: 'auto', display: 'block' }}
            />

            <p
              style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize:   'clamp(16px, 1.5vw, 22px)',
                fontWeight: 400,
                color:      '#FFFFFF',
                lineHeight: 1.4,
                margin:     0,
              }}
            >
              Quickflows helps<br />
              <em>your team work smarter</em><br />
              without spending <em>a lot of time</em>
            </p>

            <Link
              href="https://qf-agent-prototype.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                justifyContent: 'center',
                padding:        '11px 22px',
                background:     '#FFFFFF',
                color:          '#0A0A0A',
                borderRadius:   '10px',
                fontSize:       '14px',
                fontWeight:     600,
                fontFamily:     'var(--font-geist-sans)',
                whiteSpace:     'nowrap',
                width:          'fit-content',
                textDecoration: 'none',
                transition:     'opacity 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Explore Agents
            </Link>
          </div>

          {/* RIGHT: 4 nav columns */}
          <div
            className="footer-nav-grid"
            style={{
              flex:                1,
              display:             'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap:                 '32px',
              alignContent:        'start',
            }}
          >
            <NavCol label="Platform"   links={platformLinks} />
            <NavCol label="Industries" links={industryLinks} />
            <NavCol label="Company"    links={companyLinks}  />
            <NavCol label="Socials"    links={socialsLinks}  />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop:      '1px solid rgba(255,255,255,0.12)',
            padding:        '18px 48px',
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            gap:            '16px',
            flexWrap:       'wrap',
            position:       'relative',
            zIndex:         1,
          }}
        >
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

        {/* ── Quickflows marquee band — inside card, unified layer ── */}
        <QuickflowsMarquee />

      </div>

    </footer>
  )
}
