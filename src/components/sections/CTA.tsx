'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BookDemoButton from '@/components/BookDemoButton'

const FADE_UP = {
  hidden:  { y: 32, opacity: 0 },
  visible: { y: 0,  opacity: 1 },
}

export default function CTA() {
  return (
    <section className="section-padding">
      <div className="max-w-[960px] mx-auto px-10">
        <div
          className="rounded-[24px] px-10 sm:px-16 py-16 sm:py-20 text-center bg-white border border-[--border]"
          style={{ boxShadow: 'var(--shadow-2)' }}
        >

          {/* Label */}
          <motion.p
            className="text-label mb-4"
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            GET STARTED
          </motion.p>

          {/* Headline */}
          <motion.h2
            className="font-display font-bold text-ink mb-5"
            style={{
              fontSize:      'clamp(30px, 3.8vw, 52px)',
              letterSpacing: '-0.035em',
              lineHeight:    '1.05',
            }}
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            From the 6am callout to the{' '}
            <br className="hidden sm:block" />
            month-end close — handled.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            className="text-[16px] text-ink3 font-ui leading-relaxed max-w-[480px] mx-auto mb-8"
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Book a 20-minute call. We&apos;ll show you three agents working
            in scenarios that match your actual operations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7"
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <BookDemoButton className="btn-base btn-primary">
              Book a demo
            </BookDemoButton>
            <Link href="/contact" className="btn-base btn-ghost group">
              Talk to sales
              <ArrowRight size={14} className="arrow-icon text-ink3 group-hover:text-ink" />
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
            variants={FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[12px] text-ink4 font-ui">✓ No credit card required</span>
            <span className="hidden sm:block w-px h-3 bg-[--border]" />
            <span className="text-[12px] text-ink4 font-ui">✓ First agent live within 72 hours</span>
            <span className="hidden sm:block w-px h-3 bg-[--border]" />
            <a
              href="tel:6782670106"
              className="text-[12px] text-ink4 font-ui hover:text-ink transition-colors duration-150"
            >
              678-267-0106
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
