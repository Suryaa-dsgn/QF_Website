// ─── DURATIONS ───────────────────────────────────────
export const dur = {
  instant: 0.08,   // hover fills, active states
  fast:    0.20,   // button press, tab switch, dropdown
  medium:  0.45,   // card reveals, image fades
  slow:    0.75,   // hero text, section enters
  xslow:   1.00,   // hero visual entrance
  count:   1.80,   // number count-up (GSAP)
} as const

// ─── EASING CURVES ───────────────────────────────────
// Use as Framer Motion transition ease arrays
export const ease = {
  primary: [0.16, 1, 0.3, 1],      // scroll reveals — fast start, gentle settle
  snappy:  [0.4, 0, 0.2, 1],       // UI interactions, tabs, dropdowns
  smooth:  [0.25, 0.1, 0.25, 1],   // general purpose
} as const

// ─── REVEAL DISTANCES ────────────────────────────────
export const dist = {
  subtle: 8,    // micro-interactions
  normal: 24,   // card / text reveals
  large:  32,   // section-level reveals
  hero:   48,   // hero visual entrance
} as const

// ─── STAGGER TIMINGS ─────────────────────────────────
export const stagger = {
  tight:  0.05,   // 5-6 dense items
  normal: 0.08,   // standard card grids (3-4 items)
  loose:  0.12,   // 3-step process cards
} as const

// ─── GSAP SCROLL TRIGGER DEFAULTS ────────────────────
// Reference these when setting up ScrollTrigger instances
export const scrollTrigger = {
  standard: 'top 85%',   // most elements
  early:    'top 90%',   // near top of page
  late:     'top 70%',   // heavy/large elements
} as const

// ─── HERO LOOP TIMING (milliseconds) ─────────────────
export const heroLoop = {
  total:      15000,  // full loop duration
  alertFire:   3000,  // when alert appears
  agentPickup: 5000,  // when agent starts
  resolved:   12000,  // when resolved
  reset:      14500,  // when state resets
} as const
