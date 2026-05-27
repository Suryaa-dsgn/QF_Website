# WORKFORCE AGENTS PAGE — Scroll-Driven Progressive Line
## Complete implementation plan for Claude Code

> **Read every word of this file before writing a single line of code.**
> This is a complex scroll-driven layout. Understanding the full structure
> before starting is non-negotiable.
>
> This replaces the card grid version in `WorkforcePageV2.tsx` and related V2 files.
> The V2 toggle system in `page.tsx` stays. Only the V2 component content changes.

---

## V2 Safety — What Gets Changed

**Existing files you may touch:**
- `src/components/sections/WorkforcePageV2.tsx` — rewrite entirely
- `src/components/ui/v2/AgentCardGrid.tsx` — delete or leave unused
- `src/components/ui/v2/AgentCardV2.tsx` — leave (unused by new V2)

**New files to create:**
- `src/components/ui/v2/ProgressiveLine.tsx` — the scroll-animated SVG section
- `src/components/ui/v2/AgentStep.tsx` — template for one agent step
- `src/data/agentStepsV2.ts` — content for all 7 steps

**Files that must not change:**
- `src/app/workforce/page.tsx` — only the 3-line toggle was added, do not touch
- All V1 components (AgentSideNav, AgentStoryContent, etc.)
- Any homepage components

---

## What This Page Is

A scroll-driven storytelling section. As the user scrolls down:
1. A brand-purple SVG line progressively draws itself — like a circuit trace
2. At each bend of the line, an agent "step" is revealed — a pill label + short description + floating prototype panel
3. Labels appear centered on the horizontal segments of the line
4. The line connects 7 agents and tells the story of one operational day
5. The entire section starts with an intro headline and ends with a closing headline

There are NO cards. NO grid. NO boxes stacked uniformly.
There is ONE line. Seven moments connected by that line.

---

## Full Page Structure

```
WorkforcePageV2
├── HeroV2                    (same centered hero from current V2)
└── ProgressiveLine section
    ├── SVG overlay           (absolute, full-width, full-height, pointer-events none)
    ├── IntroText             (left-aligned, above the scroll journey)
    ├── AgentStep × 7         (each alternates LEFT/RIGHT)
    └── ClosingText           (centered, below the scroll journey)
```

---

## SECTION 1 — The Scrollable Container

```tsx
<section
  ref={sectionRef}
  className="relative w-full"
  style={{ minHeight: '7500px' }}  // total scroll height for 7 agents
>
  {/* SVG overlay — behind everything */}
  <ProgressiveSVG sectionRef={sectionRef} scrollYProgress={scrollYProgress} />

  {/* Content — positioned above SVG */}
  <div className="relative z-10">
    <IntroText />
    <AgentStep × 7 />
    <ClosingText />
  </div>
</section>
```

The section has `position: relative` and a fixed `minHeight: 7500px`.
This fixed height is what creates the scroll distance.
All child elements use `position: absolute` with specific `top` values.

---

## SECTION 2 — The SVG Progressive Line

### How It Works

One SVG element covers the entire section (absolute positioned, width 100%, height 100%).
Inside it: one `<path>` element.
The path is drawn progressively using `stroke-dashoffset`.
As the user scrolls, the drawn portion increases from 0% to 100%.

### Framer Motion Implementation

```tsx
// In WorkforcePageV2.tsx
import { useRef } from 'react'
import { useScroll } from 'framer-motion'

const sectionRef = useRef<HTMLElement>(null)

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end end'],
})
```

`scrollYProgress` is a MotionValue from 0 (top of section at viewport top) to 1 (bottom of section at viewport bottom). This drives both the SVG line AND each element's appear animation.

### SVG Setup

```tsx
<svg
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'visible',
  }}
  preserveAspectRatio="none"
  viewBox="0 0 1200 7500"
>
  <motion.path
    d={PATH_D}                         // the full path string — defined below
    fill="none"
    stroke="#6B3FA0"                   // brand purple
    strokeWidth="1.5"
    strokeLinecap="round"
    style={{
      pathLength: scrollYProgress,     // Framer Motion maps 0-1 to path drawing
    }}
  />
</svg>
```

**Critical:** Use Framer Motion's built-in `pathLength` style property.
This is the CORRECT way. Do NOT manually calculate stroke-dashoffset.
Framer Motion's `pathLength` accepts a MotionValue from 0 (hidden) to 1 (fully drawn).
`scrollYProgress` goes from 0 to 1 as the section scrolls. Map it directly.

```tsx
// This is all you need for the line animation
<motion.path
  d={PATH_D}
  fill="none"
  stroke="#6B3FA0"
  strokeWidth="1.5"
  strokeLinecap="round"
  style={{ pathLength: scrollYProgress }}
/>
```

### The Path — Exact String

The SVG viewBox is 1200 wide × 7500 tall.
All coordinates below are in SVG units.
Left column center: x = 200
Right column center: x = 1000
Corner radius: 30

The path zigzags: starts LEFT, first bridge goes RIGHT to Step 1 (RIGHT pill),
then bridges go LEFT/RIGHT alternating for each subsequent step.

**Pill side per step:**
```
Step 1 Scheduler:             RIGHT pill (x=1000)
Step 2 Burnout Prevention:    LEFT pill  (x=200)
Step 3 StaffAssist:           RIGHT pill (x=1000)
Step 4 Auto Swap:             LEFT pill  (x=200)
Step 5 Auto Approval:         RIGHT pill (x=1000)
Step 6 Visit Verification:    LEFT pill  (x=200)
Step 7 Physician Credentialing: RIGHT pill (x=1000)
```

**The bridge label y-positions and text:**
```
Bridge intro→Step1: y=430  (no label, first entry)
Bridge Step1→Step2: y=1430  label: "CATCHING RISK BEFORE IT ESCALATES"
Bridge Step2→Step3: y=2380  label: "STAFF NEEDS ANSWERS"
Bridge Step3→Step4: y=3330  label: "6:04 AM — CALLOUT RECEIVED"
Bridge Step4→Step5: y=4280  label: "REQUESTS ARRIVE OVERNIGHT"
Bridge Step5→Step6: y=5230  label: "CAREGIVERS IN THE FIELD"
Bridge Step6→Step7: y=6180  label: "AUDIT APPROACHING"
```

**Complete PATH_D string:**

```ts
export const PATH_D = `
  M 200,350
  L 200,400
  C 200,430 200,430 230,430
  L 970,430
  C 1000,430 1000,430 1000,460
  L 1000,550
  L 1000,1400
  C 1000,1430 1000,1430 970,1430
  L 230,1430
  C 200,1430 200,1430 200,1460
  L 200,1550
  L 200,2350
  C 200,2380 200,2380 230,2380
  L 970,2380
  C 1000,2380 1000,2380 1000,2410
  L 1000,2500
  L 1000,3300
  C 1000,3330 1000,3330 970,3330
  L 230,3330
  C 200,3330 200,3330 200,3360
  L 200,3450
  L 200,4250
  C 200,4280 200,4280 230,4280
  L 970,4280
  C 1000,4280 1000,4280 1000,4310
  L 1000,4400
  L 1000,5200
  C 1000,5230 1000,5230 970,5230
  L 230,5230
  C 200,5230 200,5230 200,5260
  L 200,5350
  L 200,6150
  C 200,6180 200,6180 230,6180
  L 970,6180
  C 1000,6180 1000,6180 1000,6210
  L 1000,6300
  L 1000,7100
  C 1000,7150 700,7200 600,7250
  L 600,7350
`
```

**Reading the path:** Start at left (x=200), come down, first bridge goes RIGHT to x=1000 (Step 1 pill side), then zigzag back and forth, end at center (x=600) at the closing headline position.

---

## SECTION 3 — Bridge Labels

Each horizontal bridge has a short uppercase label centered on it.
These are NOT SVG text — they are HTML elements absolutely positioned.

```tsx
// Label component
function BridgeLabel({ children, top }: { children: string; top: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,          // matches the bridge y-position in SVG units
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        // The background clips the line — creates "embedded in line" effect
        background: 'var(--bg)',   // same as page background (#F9F8FF)
        padding: '0 12px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(107, 63, 160, 0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </span>
    </div>
  )
}
```

**Critical:** The `top` value of each label (in pixels) must match the y-coordinate
in the SVG viewBox. Since the SVG viewBox is 7500 units tall and the section is
7500px tall, 1 SVG unit = 1 pixel. This means the label's CSS `top` value matches
the bridge y-coordinate directly.

Label positions and text:
```
top: 1430  "CATCHING RISK BEFORE IT ESCALATES"
top: 2380  "STAFF NEEDS ANSWERS"
top: 3330  "6:04 AM — CALLOUT RECEIVED"
top: 4280  "REQUESTS ARRIVE OVERNIGHT"
top: 5230  "CAREGIVERS IN THE FIELD"
top: 6180  "AUDIT APPROACHING"
```

**Label appearance animation:**
Each label fades in when the scroll progress passes its threshold.
Calculate threshold: label_y / 7500 (total section height).

```tsx
// Example for label at top=1430
const labelProgress = 1430 / 7500  // = 0.191
// When scrollYProgress > 0.191, this label fades in
```

Use a `useTransform` to map this:
```tsx
const labelOpacity = useTransform(
  scrollYProgress,
  [labelProgress - 0.01, labelProgress + 0.03],
  [0, 1]
)
```

---

## SECTION 4 — Intro Text (Top of Section)

```tsx
function IntroText() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        left: '40px',
        maxWidth: '460px',
        zIndex: 10,
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          fontWeight: 700,
          color: '#0A0A0A',
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}
      >
        One operational day.
        <br />Seven agents. Nothing missed.
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-geist-sans)',
          fontSize: '16px',
          color: '#6B6B6B',
          lineHeight: 1.7,
          maxWidth: '380px',
        }}
      >
        Scroll through a single shift cycle — from schedule
        to close — and see which agent is handling what.
      </p>
    </div>
  )
}
```

This text sits at the top-left of the section. It does NOT animate on scroll —
it is visible when the section enters the viewport. The line path starts from
below this text block (y=350 in SVG coordinates = 350px from section top).

---

## SECTION 5 — Agent Step Structure

Each of the 7 agents follows this exact template.

### Layout per step

```
For a RIGHT-pill step (Steps 1, 3, 5, 7):
  LEFT SIDE (x: 40px to 560px):     Prototype panel
  RIGHT SIDE (x: 640px to 1080px):  Pill + description text

For a LEFT-pill step (Steps 2, 4, 6):
  LEFT SIDE (x: 40px to 420px):     Pill + description text
  RIGHT SIDE (x: 500px to 1080px):  Prototype panel
```

### The Pill

```tsx
function AgentPill({ label, side }: { label: string; side: 'left' | 'right' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#6B3FA0',   // brand purple — solid, same as Auxia's blue
        color: '#FFFFFF',
        borderRadius: '999px',
        padding: '10px 20px',
        fontFamily: 'var(--font-geist-sans)',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        boxShadow: '0 4px 16px rgba(107, 63, 160, 0.35)',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Small icon — 4-pointed star, same style as Auxia's arrow icon */}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z"
          fill="white"
        />
      </svg>
      {label}
    </div>
  )
}
```

### Description text (below the pill)

```tsx
<p
  style={{
    fontFamily: 'var(--font-geist-sans)',
    fontSize: '14px',
    color: '#6B6B6B',
    lineHeight: 1.65,
    maxWidth: '280px',
    marginTop: '14px',
    textAlign: side === 'left' ? 'left' : 'right',
    // Right-aligned for right-side text, left-aligned for left-side text
  }}
>
  {description}
</p>
```

### Prototype Panel (the floating product UI)

```tsx
<div
  style={{
    width: '560px',
    height: '460px',
    background: '#FFFFFF',
    borderRadius: '20px',
    boxShadow: `
      0 2px 8px rgba(0, 0, 0, 0.04),
      0 12px 40px rgba(0, 0, 0, 0.08),
      0 32px 80px rgba(0, 0, 0, 0.06)
    `,
    overflow: 'hidden',
    // No border — elevation only
  }}
>
  {/* Browser chrome */}
  <div className="browser-chrome">
    <div className="browser-dots">
      <div className="browser-dot dot-red" />
      <div className="browser-dot dot-yellow" />
      <div className="browser-dot dot-green" />
    </div>
    <div className="browser-url">app.quickflows.ai / {agentSlug}</div>
  </div>
  {/* Agent panel — full height */}
  <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
    <AgentPanelComponent />
  </div>
</div>
```

### Step animation — how each step appears

Each step's pill + description text + prototype panel all start invisible
and animate in when the scroll progress reaches that step's threshold.

```tsx
// Scroll progress threshold for each step's pill position
const stepThresholds = {
  1: 550 / 7500,    // = 0.073
  2: 1550 / 7500,   // = 0.207
  3: 2500 / 7500,   // = 0.333
  4: 3450 / 7500,   // = 0.460
  5: 4400 / 7500,   // = 0.587
  6: 5350 / 7500,   // = 0.713
  7: 6300 / 7500,   // = 0.840
}

// For each step, the pill appears at its threshold.
// The prototype appears 0.02 progress units BEFORE the pill
// (prototype already visible when line arrives — creates a more natural reveal)

// Animation values for a step appearing at threshold T:
// opacity: [0, 0, 1] at [T-0.01, T, T+0.03]
// translateY: [20, 20, 0] at [T-0.01, T, T+0.03]
```

---

## SECTION 6 — All 7 Agent Steps — Complete Specification

Each step has:
- `top` — the absolute y-position from the top of the scroll section (in pixels)
- `pillSide` — which side the pill appears on
- `pillLabel` — text inside the pill
- `description` — 1–2 sentence description below pill
- `panelComponent` — which existing panel component to render
- `agentSlug` — for the browser URL bar

---

### Step 1: Scheduler Assist

```
top:          480px
pillSide:     RIGHT (x: 640px–1000px)
pillLabel:    "Scheduler Assist"
description:  "Identifies coverage gaps the moment they appear
               and builds the optimised schedule before anyone
               opens a spreadsheet."
panelComponent: SchedulerPanel
agentSlug:    scheduler-assist
prototypePosition: LEFT (x: 40px, y: 460px)
prototypeSize: 560px wide × 460px tall
```

**Absolute positioning:**
```tsx
// Pill + text
<div style={{ position: 'absolute', top: '490px', right: '40px', textAlign: 'right' }}>
  <AgentPill label="Scheduler Assist" side="right" />
  <p style={{ textAlign: 'right', maxWidth: '280px', marginLeft: 'auto' }}>
    Identifies coverage gaps the moment they appear and builds
    the optimised schedule before anyone opens a spreadsheet.
  </p>
</div>

// Prototype panel
<div style={{ position: 'absolute', top: '460px', left: '40px' }}>
  {/* 560×460 panel */}
</div>
```

---

### Step 2: Staff Burnout Prevention

```
top:          1480px
pillSide:     LEFT (x: 40px–400px)
pillLabel:    "Burnout Prevention"
description:  "Monitors hours, overtime, and absence patterns in real
               time. Flags high-risk staff before the callout happens."
panelComponent: BurnoutPanel
agentSlug:    staff-burnout-prevention
prototypePosition: RIGHT (x: 500px, y: 1460px)
prototypeSize: 580px wide × 460px tall
```

```tsx
// Pill + text
<div style={{ position: 'absolute', top: '1490px', left: '40px' }}>
  <AgentPill label="Burnout Prevention" side="left" />
  <p style={{ textAlign: 'left', maxWidth: '280px' }}>
    Monitors hours, overtime, and absence patterns in real time.
    Flags high-risk staff before the callout happens.
  </p>
</div>

// Prototype panel
<div style={{ position: 'absolute', top: '1460px', left: '500px' }}>
  {/* 580×460 panel */}
</div>
```

---

### Step 3: StaffAssist

```
top:          2430px
pillSide:     RIGHT
pillLabel:    "StaffAssist Agent"
description:  "Answers schedule and swap queries instantly. No
               coordinator, no phone tag, no wait."
panelComponent: StaffAssistPanel
agentSlug:    staffassist
prototypePosition: LEFT (40px, 2410px)
prototypeSize: 560×460
```

---

### Step 4: Auto Swap

```
top:          3380px
pillSide:     LEFT
pillLabel:    "Auto Swap"
description:  "Finds the best internal match in under 30 seconds,
               checks compliance, and confirms — while the
               coordinator is still on their first call."
panelComponent: AutoSwapPanel (use existing from panels folder)
agentSlug:    auto-swap
prototypePosition: RIGHT (500px, 3360px)
prototypeSize: 580×460
```

---

### Step 5: Auto Approval

```
top:          4330px
pillSide:     RIGHT
pillLabel:    "Auto Approval"
description:  "Compliant requests approved the moment they arrive.
               Exceptions escalated with the reason stated. Nothing
               waits until morning."
panelComponent: AutoApprovalPanel
agentSlug:    auto-approval
prototypePosition: LEFT (40px, 4310px)
prototypeSize: 560×460
```

---

### Step 6: Visit Verification

```
top:          5280px
pillSide:     LEFT
pillLabel:    "Visit Verification"
description:  "GPS and timestamp validation on every visit. Any
               discrepancy is flagged before billing runs — not after."
panelComponent: EVVPanel
agentSlug:    visit-verification
prototypePosition: RIGHT (500px, 5260px)
prototypeSize: 580×460
```

---

### Step 7: Physician Credentialing

```
top:          6230px
pillSide:     RIGHT
pillLabel:    "Physician Credentialing"
description:  "Every licence, every provider. Tracked automatically.
               Renewals initiated at 90, 60, and 30 days."
panelComponent: CredentialingPanel
agentSlug:    physician-credentialing
prototypePosition: LEFT (40px, 6210px)
prototypeSize: 560×460
```

---

## SECTION 7 — Closing Text

The line terminates at the closing element.
The closing is centered, positioned at the bottom of the section.

```tsx
function ClosingText() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '7100px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10,
        maxWidth: '640px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 700,
          color: '#0A0A0A',
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          marginBottom: '20px',
        }}
      >
        All seven. Running simultaneously.
        While your team focuses on what needs them.
      </h3>
      <Link href="/demo" className="btn-base btn-primary">
        Book a demo
      </Link>
    </div>
  )
}
```

The line path endpoint is x=600, y=7350 — directly above this text block.
The visual effect: the line drops from Step 7 (right side) and curves
to center, terminating just above the closing headline.

---

## SECTION 8 — Element Appear Animations

### The system

Every pill, description, and prototype uses Framer Motion `useTransform`
to animate opacity and translateY based on `scrollYProgress`.

```tsx
// Helper function — returns opacity and y MotionValues for a given threshold
function useStepReveal(
  scrollYProgress: MotionValue<number>,
  threshold: number // 0 to 1
) {
  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.01, threshold, threshold + 0.04],
    [0, 0, 1]
  )
  const y = useTransform(
    scrollYProgress,
    [threshold - 0.01, threshold, threshold + 0.04],
    [24, 24, 0]
  )
  return { opacity, y }
}
```

### Thresholds for every element

```ts
// Pills appear when line reaches their position
const THRESHOLDS = {
  step1Pill:   550 / 7500,   // 0.073
  step2Pill:   1550 / 7500,  // 0.207
  step3Pill:   2500 / 7500,  // 0.333
  step4Pill:   3450 / 7500,  // 0.460
  step5Pill:   4400 / 7500,  // 0.587
  step6Pill:   5350 / 7500,  // 0.713
  step7Pill:   6300 / 7500,  // 0.840

  // Prototypes appear slightly BEFORE the pill (line is approaching the panel side first)
  step1Proto:  530 / 7500,   // 0.071
  step2Proto:  1530 / 7500,  // 0.204
  step3Proto:  2480 / 7500,  // 0.331
  step4Proto:  3430 / 7500,  // 0.457
  step5Proto:  4380 / 7500,  // 0.584
  step6Proto:  5330 / 7500,  // 0.711
  step7Proto:  6280 / 7500,  // 0.837

  // Labels appear as line draws through bridge
  label1:  1430 / 7500,  // 0.191
  label2:  2380 / 7500,  // 0.317
  label3:  3330 / 7500,  // 0.444
  label4:  4280 / 7500,  // 0.571
  label5:  5230 / 7500,  // 0.697
  label6:  6180 / 7500,  // 0.824

  closing: 7100 / 7500,  // 0.947
}
```

### Applying the animation

```tsx
// For each step's pill
const { opacity: pillOpacity, y: pillY } = useStepReveal(scrollYProgress, THRESHOLDS.step1Pill)

<motion.div style={{ opacity: pillOpacity, y: pillY }}>
  <AgentPill label="Scheduler Assist" side="right" />
  <p>...</p>
</motion.div>

// For the prototype panel
const { opacity: protoOpacity, y: protoY } = useStepReveal(scrollYProgress, THRESHOLDS.step1Proto)

<motion.div style={{ opacity: protoOpacity, y: protoY }}>
  {/* panel */}
</motion.div>
```

---

## SECTION 9 — Complete Component Code Structure

### `WorkforcePageV2.tsx`

```tsx
'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion'
import Link from 'next/link'

// Existing panel imports
import { BurnoutPanel } from '@/components/ui/panels/BurnoutPanel'
import { StaffAssistPanel } from '@/components/ui/panels/StaffAssistPanel'
import { SchedulerPanel } from '@/components/ui/panels/SchedulerPanel'
import { EVVPanel } from '@/components/ui/panels/EVVPanel'
import { AutoApprovalPanel } from '@/components/ui/panels/AutoApprovalPanel'
import { AutoSwapPanel } from '@/components/ui/panels/AutoSwapPanel'
import { CredentialingPanel } from '@/components/ui/panels/CredentialingPanel'

// The SVG path — import from constants file
import { PATH_D, THRESHOLDS, BRIDGE_LABELS } from '@/data/agentStepsV2'

// ─── CONSTANTS ─────────────────────────────────────────────────────

const SECTION_HEIGHT = 7500  // px — total scroll distance

// ─── HELPERS ───────────────────────────────────────────────────────

function useStepReveal(sv: MotionValue<number>, threshold: number) {
  return {
    opacity: useTransform(sv, [threshold - 0.01, threshold, threshold + 0.04], [0, 0, 1]),
    y: useTransform(sv, [threshold - 0.01, threshold, threshold + 0.04], [24, 24, 0]),
  }
}

// ─── PILL ──────────────────────────────────────────────────────────

function AgentPill({ label }: { label: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      background: '#6B3FA0', color: '#ffffff',
      borderRadius: '999px', padding: '10px 22px',
      fontFamily: 'var(--font-geist-sans)', fontSize: '14px', fontWeight: 500,
      letterSpacing: '-0.01em', whiteSpace: 'nowrap',
      boxShadow: '0 4px 20px rgba(107, 63, 160, 0.35)',
    }}>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z" fill="white"/>
      </svg>
      {label}
    </div>
  )
}

// ─── PROTOTYPE PANEL WRAPPER ────────────────────────────────────────

function PrototypeWrapper({
  children, topPx, leftPx, width = 560,
}: {
  children: React.ReactNode, topPx: number, leftPx: number, width?: number
}) {
  return (
    <div style={{
      position: 'absolute', top: `${topPx}px`, left: `${leftPx}px`,
      width: `${width}px`, height: '460px',
      background: '#FFFFFF', borderRadius: '20px', overflow: 'hidden',
      boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08), 0 32px 80px rgba(0,0,0,0.06)`,
    }}>
      <div className="browser-chrome">
        <div className="browser-dots">
          <div className="browser-dot dot-red" />
          <div className="browser-dot dot-yellow" />
          <div className="browser-dot dot-green" />
        </div>
        <div className="browser-url">app.quickflows.ai</div>
      </div>
      <div style={{ height: 'calc(100% - 36px)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

// ─── BRIDGE LABEL ──────────────────────────────────────────────────

function BridgeLabelEl({
  topPx, children, sv, threshold,
}: {
  topPx: number, children: string, sv: MotionValue<number>, threshold: number
}) {
  const opacity = useTransform(sv, [threshold - 0.01, threshold + 0.02], [0, 1])
  return (
    <motion.div
      style={{
        position: 'absolute', top: `${topPx}px`, left: '50%', zIndex: 10,
        transform: 'translate(-50%, -50%)',
        background: 'var(--bg)', padding: '0 12px',
        opacity,
      }}
    >
      <span style={{
        fontFamily: 'var(--font-geist-mono)', fontSize: '9px', fontWeight: 500,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(107, 63, 160, 0.45)', whiteSpace: 'nowrap',
      }}>
        {children}
      </span>
    </motion.div>
  )
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────

export default function WorkforcePageV2() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Reveal values for all 7 steps
  const s1Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step1Pill)
  const s1Proto = useStepReveal(scrollYProgress, THRESHOLDS.step1Proto)
  const s2Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step2Pill)
  const s2Proto = useStepReveal(scrollYProgress, THRESHOLDS.step2Proto)
  const s3Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step3Pill)
  const s3Proto = useStepReveal(scrollYProgress, THRESHOLDS.step3Proto)
  const s4Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step4Pill)
  const s4Proto = useStepReveal(scrollYProgress, THRESHOLDS.step4Proto)
  const s5Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step5Pill)
  const s5Proto = useStepReveal(scrollYProgress, THRESHOLDS.step5Proto)
  const s6Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step6Pill)
  const s6Proto = useStepReveal(scrollYProgress, THRESHOLDS.step6Proto)
  const s7Pill  = useStepReveal(scrollYProgress, THRESHOLDS.step7Pill)
  const s7Proto = useStepReveal(scrollYProgress, THRESHOLDS.step7Proto)
  const closing = useStepReveal(scrollYProgress, THRESHOLDS.closing)

  return (
    <div>
      {/* ── HERO (same as current V2) ── */}
      <HeroV2 />

      {/* ── SCROLL SECTION ── */}
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{ height: `${SECTION_HEIGHT}px` }}
      >
        {/* SVG Line Overlay */}
        <svg
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none', overflow: 'visible',
          }}
          preserveAspectRatio="none"
          viewBox={`0 0 1200 ${SECTION_HEIGHT}`}
        >
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="#6B3FA0"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* Content layer */}
        <div className="relative z-10 max-w-[1120px] mx-auto px-10">

          {/* ── INTRO TEXT ── */}
          <div style={{ position: 'absolute', top: '80px', left: '40px', maxWidth: '460px' }}>
            <h2 style={{
              fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(28px,3.5vw,42px)',
              fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.035em',
              lineHeight: 1.1, marginBottom: '16px',
            }}>
              One operational day.
              <br />Seven agents. Nothing missed.
            </h2>
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '16px',
              color: '#6B6B6B', lineHeight: 1.7, maxWidth: '360px',
            }}>
              Scroll through a single shift cycle — from schedule to close —
              and see which agent is handling what.
            </p>
          </div>

          {/* ── BRIDGE LABELS ── */}
          <BridgeLabelEl topPx={1430} sv={scrollYProgress} threshold={THRESHOLDS.label1}>
            CATCHING RISK BEFORE IT ESCALATES
          </BridgeLabelEl>
          <BridgeLabelEl topPx={2380} sv={scrollYProgress} threshold={THRESHOLDS.label2}>
            STAFF NEEDS ANSWERS
          </BridgeLabelEl>
          <BridgeLabelEl topPx={3330} sv={scrollYProgress} threshold={THRESHOLDS.label3}>
            6:04 AM — CALLOUT RECEIVED
          </BridgeLabelEl>
          <BridgeLabelEl topPx={4280} sv={scrollYProgress} threshold={THRESHOLDS.label4}>
            REQUESTS ARRIVE OVERNIGHT
          </BridgeLabelEl>
          <BridgeLabelEl topPx={5230} sv={scrollYProgress} threshold={THRESHOLDS.label5}>
            CAREGIVERS IN THE FIELD
          </BridgeLabelEl>
          <BridgeLabelEl topPx={6180} sv={scrollYProgress} threshold={THRESHOLDS.label6}>
            AUDIT APPROACHING
          </BridgeLabelEl>

          {/* ── STEP 1: SCHEDULER (RIGHT pill, LEFT prototype) ── */}
          <motion.div style={{ ...s1Proto, position: 'absolute', top: '460px', left: '40px' }}>
            <PrototypeWrapper topPx={0} leftPx={0}><SchedulerPanel /></PrototypeWrapper>
          </motion.div>
          <motion.div style={{
            ...s1Pill, position: 'absolute', top: '490px', right: '40px', textAlign: 'right',
          }}>
            <AgentPill label="Scheduler Assist" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px', marginLeft: 'auto',
              textAlign: 'right',
            }}>
              Identifies coverage gaps the moment they appear and builds the optimised
              schedule before anyone opens a spreadsheet.
            </p>
          </motion.div>

          {/* ── STEP 2: BURNOUT (LEFT pill, RIGHT prototype) ── */}
          <motion.div style={{ ...s2Pill, position: 'absolute', top: '1490px', left: '40px' }}>
            <AgentPill label="Burnout Prevention" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px',
            }}>
              Monitors hours and overtime patterns in real time. Flags high-risk staff
              before the callout happens.
            </p>
          </motion.div>
          <motion.div style={{ ...s2Proto, position: 'absolute', top: '1460px', left: '500px' }}>
            <PrototypeWrapper topPx={0} leftPx={0} width={580}><BurnoutPanel /></PrototypeWrapper>
          </motion.div>

          {/* ── STEP 3: STAFFASSIST (RIGHT pill, LEFT prototype) ── */}
          <motion.div style={{ ...s3Proto, position: 'absolute', top: '2410px', left: '40px' }}>
            <PrototypeWrapper topPx={0} leftPx={0}><StaffAssistPanel /></PrototypeWrapper>
          </motion.div>
          <motion.div style={{
            ...s3Pill, position: 'absolute', top: '2440px', right: '40px', textAlign: 'right',
          }}>
            <AgentPill label="StaffAssist Agent" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px', marginLeft: 'auto',
              textAlign: 'right',
            }}>
              Answers schedule and swap queries instantly. No coordinator, no phone tag, no wait.
            </p>
          </motion.div>

          {/* ── STEP 4: AUTO SWAP (LEFT pill, RIGHT prototype) ── */}
          <motion.div style={{ ...s4Pill, position: 'absolute', top: '3390px', left: '40px' }}>
            <AgentPill label="Auto Swap" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px',
            }}>
              Finds the best internal match in under 30 seconds, checks compliance,
              and confirms — before the coordinator finishes their first call.
            </p>
          </motion.div>
          <motion.div style={{ ...s4Proto, position: 'absolute', top: '3360px', left: '500px' }}>
            <PrototypeWrapper topPx={0} leftPx={0} width={580}><AutoSwapPanel /></PrototypeWrapper>
          </motion.div>

          {/* ── STEP 5: AUTO APPROVAL (RIGHT pill, LEFT prototype) ── */}
          <motion.div style={{ ...s5Proto, position: 'absolute', top: '4310px', left: '40px' }}>
            <PrototypeWrapper topPx={0} leftPx={0}><AutoApprovalPanel /></PrototypeWrapper>
          </motion.div>
          <motion.div style={{
            ...s5Pill, position: 'absolute', top: '4340px', right: '40px', textAlign: 'right',
          }}>
            <AgentPill label="Auto Approval" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px', marginLeft: 'auto',
              textAlign: 'right',
            }}>
              Compliant requests approved the moment they arrive. Exceptions escalated.
              Nothing waits until morning.
            </p>
          </motion.div>

          {/* ── STEP 6: VISIT VERIFICATION (LEFT pill, RIGHT prototype) ── */}
          <motion.div style={{ ...s6Pill, position: 'absolute', top: '5290px', left: '40px' }}>
            <AgentPill label="Visit Verification" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px',
            }}>
              GPS and timestamp validation on every visit. Any discrepancy flagged
              before billing runs — not after.
            </p>
          </motion.div>
          <motion.div style={{ ...s6Proto, position: 'absolute', top: '5260px', left: '500px' }}>
            <PrototypeWrapper topPx={0} leftPx={0} width={580}><EVVPanel /></PrototypeWrapper>
          </motion.div>

          {/* ── STEP 7: PHYSICIAN CREDENTIALING (RIGHT pill, LEFT prototype) ── */}
          <motion.div style={{ ...s7Proto, position: 'absolute', top: '6210px', left: '40px' }}>
            <PrototypeWrapper topPx={0} leftPx={0}><CredentialingPanel /></PrototypeWrapper>
          </motion.div>
          <motion.div style={{
            ...s7Pill, position: 'absolute', top: '6240px', right: '40px', textAlign: 'right',
          }}>
            <AgentPill label="Physician Credentialing" />
            <p style={{
              fontFamily: 'var(--font-geist-sans)', fontSize: '14px', color: '#6B6B6B',
              lineHeight: 1.65, maxWidth: '260px', marginTop: '14px', marginLeft: 'auto',
              textAlign: 'right',
            }}>
              Every licence, every provider. Tracked automatically.
              Renewals initiated at 90, 60, and 30 days.
            </p>
          </motion.div>

          {/* ── CLOSING TEXT ── */}
          <motion.div style={{
            ...closing,
            position: 'absolute', top: '7100px', left: '50%',
            transform: 'translateX(-50%)', textAlign: 'center', maxWidth: '640px',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(26px,3vw,40px)',
              fontWeight: 700, color: '#0A0A0A', letterSpacing: '-0.035em',
              lineHeight: 1.1, marginBottom: '24px',
            }}>
              All seven. Running simultaneously.
              <br />While your team focuses on what needs them.
            </h3>
            <Link href="/demo" className="btn-base btn-primary">Book a demo</Link>
          </motion.div>

        </div>
      </section>
    </div>
  )
}
```

---

## SECTION 10 — Data File

Create `src/data/agentStepsV2.ts`:

```ts
export const SECTION_HEIGHT = 7500

export const PATH_D = `
  M 200,350 L 200,400
  C 200,430 200,430 230,430 L 970,430
  C 1000,430 1000,430 1000,460
  L 1000,1400
  C 1000,1430 1000,1430 970,1430 L 230,1430
  C 200,1430 200,1430 200,1460
  L 200,2350
  C 200,2380 200,2380 230,2380 L 970,2380
  C 1000,2380 1000,2380 1000,2410
  L 1000,3300
  C 1000,3330 1000,3330 970,3330 L 230,3330
  C 200,3330 200,3330 200,3360
  L 200,4250
  C 200,4280 200,4280 230,4280 L 970,4280
  C 1000,4280 1000,4280 1000,4310
  L 1000,5200
  C 1000,5230 1000,5230 970,5230 L 230,5230
  C 200,5230 200,5230 200,5260
  L 200,6150
  C 200,6180 200,6180 230,6180 L 970,6180
  C 1000,6180 1000,6180 1000,6210
  L 1000,7050
  C 1000,7100 800,7150 600,7200
  L 600,7350
`

export const THRESHOLDS = {
  step1Pill:  550  / 7500,
  step2Pill:  1550 / 7500,
  step3Pill:  2500 / 7500,
  step4Pill:  3450 / 7500,
  step5Pill:  4400 / 7500,
  step6Pill:  5350 / 7500,
  step7Pill:  6300 / 7500,

  step1Proto: 530  / 7500,
  step2Proto: 1530 / 7500,
  step3Proto: 2480 / 7500,
  step4Proto: 3430 / 7500,
  step5Proto: 4380 / 7500,
  step6Proto: 5330 / 7500,
  step7Proto: 6280 / 7500,

  label1: 1430 / 7500,
  label2: 2380 / 7500,
  label3: 3330 / 7500,
  label4: 4280 / 7500,
  label5: 5230 / 7500,
  label6: 6180 / 7500,

  closing: 7100 / 7500,
}
```

---

## SECTION 11 — Mobile Behaviour (<1024px)

On mobile, the scroll-driven SVG section is replaced entirely by a simple linear stack.
The SVG, absolute positioning, and scroll animation do NOT work on mobile.

```tsx
// At the top of WorkforcePageV2.tsx
const [isMobile, setIsMobile] = useState(false)
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 1024)
  check()
  window.addEventListener('resize', check, { passive: true })
  return () => window.removeEventListener('resize', check)
}, [])

// In the JSX:
{isMobile ? <MobileAgentStack /> : <ScrollSection ... />}
```

`MobileAgentStack` — a simple vertical list:
- Each agent: pill (full-width centered) + short description + prototype panel (full-width, 280px tall)
- No SVG, no absolute positioning, no scroll animation
- Standard vertical flex layout with 60px gap between agents
- Prototype panels capped at 280px height, overflow hidden

---

## SECTION 12 — Implementation Order

**Do not skip steps. Do not combine steps.**

```
Step 1: Create src/data/agentStepsV2.ts with PATH_D and THRESHOLDS
Step 2: Rebuild WorkforcePageV2.tsx — hero only (no scroll section yet)
Step 3: Add the scroll section with ONLY the SVG line (no pills, no prototypes)
         Test: set DESIGN_VERSION="v2", scroll down — verify the purple line draws
Step 4: Add ONLY the intro text (position absolute at top: 80px)
Step 5: Add ONLY Step 1 (Scheduler) — pill + prototype
         Verify: pill and prototype appear at correct scroll position
Step 6: Add bridge labels (all 6)
Step 7: Add Steps 2–7 one at a time, verifying each before moving to next
Step 8: Add closing text
Step 9: Add MobileAgentStack and isMobile detection
Step 10: Final verification against checklist below
```

---

## SECTION 13 — Lenis / Smooth Scroll Note

The `useScroll` from Framer Motion works with Lenis by default when Lenis
is integrated with GSAP ticker. No additional setup needed.

However, if the scroll values feel laggy or incorrect, verify that
the `scrollYProgress` value is updating correctly by adding a temporary:
```tsx
useMotionValueEvent(scrollYProgress, 'change', v => console.log('scroll:', v))
```
Check that it goes from 0 to 1 as you scroll through the section.
If it jumps to 1 too early or doesn't reach 1, adjust the `offset` parameter
in `useScroll`:
```tsx
useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
```

---

## Final Checklist

**SVG Line:**
- [ ] Line is brand purple (#6B3FA0)
- [ ] Stroke width: 1.5px
- [ ] Line draws from top as page scrolls, retracts when scrolling back
- [ ] Line begins at y=350 (below intro text)
- [ ] Line terminates at y=7350 (above closing headline)
- [ ] First bridge goes RIGHT (from x=200 to x=1000) at y=430
- [ ] All corners are rounded (cubic bezier curves, not sharp angles)
- [ ] Final curve goes from right (x=1000) to center (x=600)

**Bridge Labels:**
- [ ] 6 labels total (between steps 1→2, 2→3, 3→4, 4→5, 5→6, 6→7)
- [ ] Labels centered horizontally on page (left: 50%, transform)
- [ ] Background matches page bg (#F9F8FF) — clips the line behind text
- [ ] Font: Geist Mono, 9px, uppercase, letter-spacing 0.14em
- [ ] Color: rgba(107,63,160,0.45)
- [ ] Each fades in when scroll reaches its bridge threshold

**Agent Pills:**
- [ ] Brand purple background (#6B3FA0), white text, pill shape (border-radius 999px)
- [ ] Star icon to the left of label text
- [ ] Box shadow: 0 4px 20px rgba(107,63,160,0.35)
- [ ] Steps 1,3,5,7: pill on RIGHT side, text right-aligned
- [ ] Steps 2,4,6: pill on LEFT side, text left-aligned
- [ ] Each pill fades in (opacity 0→1) + rises (y: 24→0) at its threshold

**Prototype Panels:**
- [ ] 560px wide (LEFT prototypes) or 580px (RIGHT prototypes)
- [ ] 460px tall
- [ ] White background, no border, border-radius 20px
- [ ] Shadow: 3-layer as specified
- [ ] Browser chrome at top (dots + URL bar)
- [ ] Correct agent panel component in each
- [ ] Each fades in slightly BEFORE its pill (proto threshold < pill threshold)

**Descriptions:**
- [ ] Geist 400, 14px, #6B6B6B, line-height 1.65
- [ ] Max-width 260px
- [ ] Right-aligned for right-side pills
- [ ] Left-aligned for left-side pills
- [ ] Copy is exactly as specified

**Intro Text:**
- [ ] Position: absolute, top: 80px, left: 40px
- [ ] Visible immediately (no scroll animation)
- [ ] Bricolage Grotesque 700 headline
- [ ] Max-width 460px

**Closing Text:**
- [ ] Position: absolute, top: 7100px, centered
- [ ] Fades in at threshold 0.947
- [ ] Book a demo button (brand purple)

**Mobile:**
- [ ] Linear vertical stack below 1024px
- [ ] No SVG, no absolute positioning
- [ ] Prototype panels: full width, 280px tall

**V2 Safety:**
- [ ] DESIGN_VERSION="main" in page.tsx before committing
- [ ] DESIGN_VERSION="v2" restores this implementation
- [ ] No existing V1 components modified
