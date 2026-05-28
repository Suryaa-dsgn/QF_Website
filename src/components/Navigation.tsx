'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import BookDemoButton from '@/components/BookDemoButton'
import {
  Users, DollarSign, ShieldCheck, Heart, TrendingUp, Zap,
  Menu, X, ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── DROPDOWN DATA ────────────────────────────────────────────────

const agentSuites = [
  {
    icon: Users,
    title: 'Workforce Agents',
    subtitle: '8 agents. Scheduling, capacity, call-offs.',
    href: '/workforce',
  },
  {
    icon: DollarSign,
    title: 'Financial Agents',
    subtitle: '4 agents. AR, collections, revenue cycle.',
    href: '/financial',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Agents',
    subtitle: '3 agents. Credentialing, claims, contracts.',
    href: '/compliance',
  },
]

const industries = [
  {
    icon: Heart,
    title: 'Healthcare',
    subtitle: 'Hospitals, home health, SNF.',
    href: '/industries/home-health',
  },
  {
    icon: TrendingUp,
    title: 'Finance & Real Estate',
    subtitle: 'RCM, SaaS, REITs, manufacturing.',
    href: '/industries/reits',
  },
  {
    icon: Zap,
    title: 'Operations & Logistics',
    subtitle: 'Staffing agencies, airports, plants.',
    href: '/industries/logistics',
  },
]

// ─── LOGO MARK ────────────────────────────────────────────────────

function LogoMark({ inverted = false }: { inverted?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={inverted ? '/qf-logo-white.svg' : '/qf-logo-purple.svg'}
      alt="Quickflows mark"
      width={28}
      height={29}
      className="flex-shrink-0"
    />
  )
}

// ─── OFFERINGS DROPDOWN ───────────────────────────────────────────

function OfferingsDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white border border-[--border] rounded-[20px] shadow-[0_20px_60px_rgba(107,63,160,0.13),0_4px_16px_rgba(0,0,0,0.06)] p-8 z-50"
    >

      {/* ── AGENT SUITES ──────────────────────────────────────────── */}
      <p style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: '#6B3FA0',
        fontFamily: 'var(--font-geist-sans)',
      }}>
        Agent Suites
      </p>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {agentSuites.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col p-[18px] rounded-[14px] border border-transparent hover:border-[#E8E4F5] bg-[#FAFAFA] hover:bg-[#F5F3FF] transition-all duration-150 hover:shadow-[0_4px_16px_rgba(107,63,160,0.10)]"
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-[10px] bg-[--brand-08] group-hover:bg-[--brand-12] flex items-center justify-center flex-shrink-0 transition-colors duration-150">
              <item.icon size={18} className="text-brand" />
            </div>
            {/* Text */}
            <p className="text-[15px] font-semibold text-ink mt-3 mb-1 leading-tight">{item.title}</p>
            <p className="text-[12px] text-ink3 leading-[1.5] flex-1">{item.subtitle}</p>
            {/* Arrow */}
            <div className="flex justify-end mt-3">
              <span className="text-[13px] text-brand opacity-0 group-hover:opacity-100 transition-opacity duration-150">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div className="mt-6 mb-5 border-t border-[--border]" />

      {/* ── INDUSTRIES ────────────────────────────────────────────── */}
      <p style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.10em',
        textTransform: 'uppercase', color: '#6B3FA0',
        fontFamily: 'var(--font-geist-sans)',
      }}>
        Industries
      </p>

      <div className="grid grid-cols-3 gap-2 mt-3">
        {industries.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center gap-2.5 py-[10px] px-3 rounded-[10px] hover:bg-[--brand-08] transition-colors duration-150"
          >
            <div className="w-7 h-7 rounded-[8px] bg-[--brand-08] group-hover:bg-[--brand-12] flex items-center justify-center flex-shrink-0 transition-colors duration-150">
              <item.icon size={14} className="text-brand" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink leading-none mb-0.5">{item.title}</p>
              <p className="text-[11px] text-ink4 leading-none">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

    </motion.div>
  )
}

// ─── DESKTOP NAV LINK ─────────────────────────────────────────────

function NavLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'relative text-[14px] text-ink3 hover:text-ink transition-colors duration-150 nav-link-underline',
        className
      )}
    >
      {children}
    </Link>
  )
}

// ─── MOBILE DRAWER ────────────────────────────────────────────────

function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [offeringsOpen, setOfferingsOpen] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed top-0 right-0 bottom-0 w-[320px] bg-[#F9F8FF] backdrop-blur-xl border-l border-[--border] z-50 flex flex-col"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-[60px] border-b border-[--border]">
              <div className="flex items-center gap-2">
                <LogoMark />
                <span className="text-[13px] font-semibold tracking-[-0.02em]">Quickflows.ai</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[--brand-08] transition-colors"
                aria-label="Close menu"
              >
                <X size={18} className="text-ink3" />
              </button>
            </div>

            {/* Drawer links */}
            <div className="flex-1 overflow-y-auto px-4 py-4">

              {/* About link — before Offerings */}
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center px-3 py-3.5 text-[16px] font-medium text-ink hover:bg-[--brand-08] rounded-[8px] transition-colors"
              >
                About
              </Link>

              {/* Offerings accordion */}
              <button
                onClick={() => setOfferingsOpen(!offeringsOpen)}
                className="w-full flex items-center justify-between px-3 py-3.5 text-[16px] font-medium text-ink hover:bg-[--brand-08] rounded-[8px] transition-colors"
              >
                Offerings
                <motion.div
                  animate={{ rotate: offeringsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-ink4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {offeringsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-3 pb-2">
                      <p className="text-label mt-3 mb-2">Agent Suites</p>
                      {agentSuites.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-2 py-2.5 text-[14px] text-ink3 hover:text-ink rounded-[8px] hover:bg-[--brand-08] transition-colors"
                        >
                          <item.icon size={15} className="text-brand flex-shrink-0" />
                          {item.title}
                        </Link>
                      ))}
                      <p className="text-label mt-3 mb-2">Industries</p>
                      {industries.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 px-2 py-2.5 text-[14px] text-ink3 hover:text-ink rounded-[8px] hover:bg-[--brand-08] transition-colors"
                        >
                          <item.icon size={15} className="text-brand flex-shrink-0" />
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Simple nav links */}
              {[
                { label: 'How It Works', href: '/how-it-works' },
                { label: 'Contact Us',   href: '/contact' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={onClose}
                  className="flex items-center px-3 py-3.5 text-[16px] font-medium text-ink hover:bg-[--brand-08] rounded-[8px] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Drawer footer — CTAs */}
            <div className="px-4 pb-6 border-t border-[--border] pt-4 flex flex-col gap-3">
              <Link
                href="/signin"
                onClick={onClose}
                className="w-full text-center py-3 text-[15px] font-medium text-ink3 hover:text-ink transition-colors"
              >
                Sign in
              </Link>
              <BookDemoButton className="btn-base btn-primary w-full text-center">
                Talk to an Expert
              </BookDemoButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── MAIN NAVIGATION ──────────────────────────────────────────────

export default function Navigation() {
  const [isScrolled, setIsScrolled]       = useState(false)
  const [isOfferingsOpen, setIsOfferingsOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen]   = useState(false)
  const offeringsRef  = useRef<HTMLDivElement>(null)
  const closeTimeout  = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Frosted glass on scroll
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (offeringsRef.current && !offeringsRef.current.contains(e.target as Node)) {
        setIsOfferingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Hover with delay — prevents flicker when crossing gap to dropdown
  const handleOfferingsEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setIsOfferingsOpen(true)
  }
  const handleOfferingsLeave = () => {
    closeTimeout.current = setTimeout(() => setIsOfferingsOpen(false), 150)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 h-[60px]',
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isScrolled
            ? 'bg-[#F9F8FF]/88 backdrop-blur-[20px] border-b border-[--border]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1120px] mx-auto h-full flex items-center justify-between px-10">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <LogoMark />
            <span className="text-[13px] font-semibold tracking-[-0.02em] text-ink">
              Quickflows.ai
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden lg:flex items-center gap-7">

            <NavLink href="/about">About</NavLink>

            {/* Offerings with hover dropdown */}
            <div
              ref={offeringsRef}
              className="relative"
              onMouseEnter={handleOfferingsEnter}
              onMouseLeave={handleOfferingsLeave}
            >
              <button
                className={cn(
                  'flex items-center gap-1.5 text-[14px] transition-colors duration-150 relative nav-link-underline',
                  isOfferingsOpen ? 'text-ink' : 'text-ink3 hover:text-ink'
                )}
              >
                Offerings
                <motion.div
                  animate={{ rotate: isOfferingsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="text-ink4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOfferingsOpen && <OfferingsDropdown />}
              </AnimatePresence>
            </div>

            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/signin"
              className="text-[14px] font-medium text-ink3 hover:text-ink transition-colors duration-150"
            >
              Sign in
            </Link>
            <BookDemoButton className="btn-base btn-primary !py-[9px] !px-[18px] !text-[14px]">
              Talk to an Expert
            </BookDemoButton>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[8px] hover:bg-[--brand-08] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} className="text-ink" />
          </button>

        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  )
}
