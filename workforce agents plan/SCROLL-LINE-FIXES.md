# SCROLL LINE PAGE — Fix Plan
## Addressing all 7 reported issues

> **Read all fixes before touching any code.**
> These fixes require coordinated changes across the SVG path,
> section height, thresholds, and element positions simultaneously.
> Changing one without the others will break the layout.
>
> Implementation order is at the bottom. Follow it exactly.

---

## Overview of All Fixes

| # | Issue | Root Cause | Fix |
|---|-------|-----------|-----|
| 1 | Too much vertical padding between components | SECTION_HEIGHT = 7500px is too large | Reduce to 5800px, recompute all positions |
| 2 | No prototype animation | Static panel components in use | Add entrance scale animation + ensure internal loops run |
| 3 | Copy not relatable | Descriptions are 1 sentence / generic | Rewrite all 7 using specific operational scenes |
| 4 | Pill not eye-catching | Small font, weak visual weight | Redesign pill: Bricolage, larger, agent number above |
| 5 | Line covered by navbar / draws too fast | Animation starts when section hits viewport top | Add scroll buffer + adjust useScroll offset |
| 6 | Gap between agents | Same root cause as Fix 1 | Resolved by Fix 1 |
| 7 | End section overlap + CTA disappears | SVG line terminates through closing text; opacity animation exits | Reposition SVG path end + fix opacity range |

---

## FIX 1 + 6 — Reduce Section Height and All Element Positions

### Why

The current `SECTION_HEIGHT: 7500px` with 7 steps means each step is ~950px.
A typical laptop viewport is 900px. Each agent requires 10+ viewport heights of scrolling.
This creates the large gaps between agents visible in the screenshot.

### New Values — Replace Everywhere

```ts
// NEW value
const SECTION_HEIGHT = 5800   // was 7500

// Each step is 700px apart (was 950px)
// Total breakdown:
// Intro section: 0–450px
// Steps 1–7: 700px each (450 + 7×700 = 5350px)
// Closing: 5400–5800px
```

### New Absolute Top Positions for Every Element

Replace ALL `top` values in `WorkforcePageV2.tsx`:

```
Intro text:          top: 80px    (unchanged)
Line start:          SVG y=350    (unchanged)

Step 1 prototype:    top: 460px
Step 1 pill+text:    top: 490px
Step 1 ends at:      ~1100px

Step 2 prototype:    top: 1160px
Step 2 pill+text:    top: 1190px
Step 2 ends at:      ~1800px

Step 3 prototype:    top: 1860px
Step 3 pill+text:    top: 1890px
Step 3 ends at:      ~2500px

Step 4 prototype:    top: 2560px
Step 4 pill+text:    top: 2590px
Step 4 ends at:      ~3200px

Step 5 prototype:    top: 3260px
Step 5 pill+text:    top: 3290px
Step 5 ends at:      ~3900px

Step 6 prototype:    top: 3960px
Step 6 pill+text:    top: 3990px
Step 6 ends at:      ~4600px

Step 7 prototype:    top: 4660px
Step 7 pill+text:    top: 4690px
Step 7 ends at:      ~5300px

Closing text:        top: 5350px
```

### Updated PATH_D

Replace the `PATH_D` constant in `src/data/agentStepsV2.ts` with this exact string:

```ts
export const PATH_D = `
  M 200,350
  L 200,410
  C 200,430 200,430 230,430
  L 970,430
  C 1000,430 1000,430 1000,460
  L 1000,530
  L 1000,1100
  C 1000,1130 1000,1130 970,1130
  L 230,1130
  C 200,1130 200,1130 200,1160
  L 200,1230
  L 200,1830
  C 200,1860 200,1860 230,1860
  L 970,1860
  C 1000,1860 1000,1860 1000,1890
  L 1000,1960
  L 1000,2530
  C 1000,2560 1000,2560 970,2560
  L 230,2560
  C 200,2560 200,2560 200,2590
  L 200,2660
  L 200,3230
  C 200,3260 200,3260 230,3260
  L 970,3260
  C 1000,3260 1000,3260 1000,3290
  L 1000,3360
  L 1000,3930
  C 1000,3960 1000,3960 970,3960
  L 230,3960
  C 200,3960 200,3960 200,3990
  L 200,4060
  L 200,4630
  C 200,4660 200,4660 230,4660
  L 970,4660
  C 1000,4660 1000,4660 1000,4690
  L 1000,4760
  L 1000,5300
  C 1000,5340 800,5380 600,5400
  L 600,5500
`
```

**Path logic (so you can verify):**
- Line starts at LEFT (x=200), comes down from y=350
- First bridge goes RIGHT (x=200 → x=1000) at y=430 — Step 1 is RIGHT pill
- Drops to Step 1 pill at y=530, continues to y=1100
- Bridge at y=1130 goes LEFT — Step 2 is LEFT pill
- Drops to Step 2 pill at y=1230, continues to y=1830
- Bridge at y=1860 goes RIGHT — Step 3 is RIGHT pill
- Continues this alternation through all 7 steps
- Final curve at y=5300 goes from RIGHT (x=1000) to center (x=600)
- Line terminates at y=5500 — ABOVE the closing text at top=5350

### Updated THRESHOLDS

Replace the `THRESHOLDS` export in `src/data/agentStepsV2.ts`:

```ts
// All values = y_position / SECTION_HEIGHT (5800)
export const THRESHOLDS = {
  // Pills — appear when line arrives at pill node
  step1Pill:  530  / 5800,   // 0.091
  step2Pill:  1230 / 5800,   // 0.212
  step3Pill:  1960 / 5800,   // 0.338
  step4Pill:  2660 / 5800,   // 0.459
  step5Pill:  3360 / 5800,   // 0.579
  step6Pill:  4060 / 5800,   // 0.700
  step7Pill:  4760 / 5800,   // 0.821

  // Prototypes — appear 0.015 BEFORE their pill
  // (panel materialises as line approaches from the opposite side)
  step1Proto: 515  / 5800,   // 0.089
  step2Proto: 1215 / 5800,   // 0.210
  step3Proto: 1945 / 5800,   // 0.335
  step4Proto: 2645 / 5800,   // 0.456
  step5Proto: 3345 / 5800,   // 0.577
  step6Proto: 4045 / 5800,   // 0.697
  step7Proto: 4745 / 5800,   // 0.818

  // Bridge labels — appear when line draws through bridge midpoint
  label1: 1130 / 5800,   // 0.195  "CATCHING RISK BEFORE IT ESCALATES"
  label2: 1860 / 5800,   // 0.321  "STAFF NEEDS ANSWERS"
  label3: 2560 / 5800,   // 0.441  "6:04 AM — CALLOUT RECEIVED"
  label4: 3260 / 5800,   // 0.562  "REQUESTS ARRIVE OVERNIGHT"
  label5: 3960 / 5800,   // 0.683  "CAREGIVERS IN THE FIELD"
  label6: 4660 / 5800,   // 0.803  "AUDIT APPROACHING"

  // Closing — appear near end of scroll
  closing: 5300 / 5800,  // 0.914
}
```

### Updated Bridge Label CSS top values

The HTML bridge label `<div>`s must have `top` values matching their SVG y-coordinates:
```
label1: top: 1130px   "CATCHING RISK BEFORE IT ESCALATES"
label2: top: 1860px   "STAFF NEEDS ANSWERS"
label3: top: 2560px   "6:04 AM — CALLOUT RECEIVED"
label4: top: 3260px   "REQUESTS ARRIVE OVERNIGHT"
label5: top: 3960px   "CAREGIVERS IN THE FIELD"
label6: top: 4660px   "AUDIT APPROACHING"
```

Also update `viewBox` in the SVG to match new height:
```tsx
viewBox={`0 0 1200 5800`}   // was 7500
```

---

## FIX 2 — Prototype Panel Animations

### Two levels of animation needed

**Level 1: Entrance animation** — the panel container itself animates when it appears.
**Level 2: Internal animation** — the panel's content is alive (loops running).

### Level 1: Entrance animation

In `WorkforcePageV2.tsx`, every prototype `motion.div` currently only has `opacity` and `y`.
Add `scale` to each prototype's reveal animation:

```tsx
// Update the useStepReveal helper to also return scale
function useStepReveal(sv: MotionValue<number>, threshold: number) {
  return {
    opacity: useTransform(sv, [threshold - 0.01, threshold, threshold + 0.04], [0, 0, 1]),
    y: useTransform(sv, [threshold - 0.01, threshold, threshold + 0.04], [24, 24, 0]),
    scale: useTransform(sv, [threshold - 0.01, threshold, threshold + 0.04], [0.97, 0.97, 1]),
  }
}
```

Apply `scale` to every `motion.div` that wraps a prototype panel:
```tsx
<motion.div style={{ opacity: s1Proto.opacity, y: s1Proto.y, scale: s1Proto.scale, ... }}>
```

Also add `transition` to the prototype wrapper for smoother entrance:
```tsx
<motion.div
  style={{ opacity: s1Proto.opacity, y: s1Proto.y, scale: s1Proto.scale }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
```

### Level 2: Add a subtle pulsing glow to the panel border

Wrap each prototype panel in a container that has an animated border glow.
This makes the panel feel "live" even while the internal content is loading:

```tsx
// Inside PrototypeWrapper component — add animated border glow
<div
  style={{
    // existing styles...
    // Remove boxShadow from here and replace with:
    boxShadow: `
      0 2px 8px rgba(0,0,0,0.04),
      0 12px 40px rgba(0,0,0,0.08),
      0 0 0 1px rgba(107,63,160,0.08)
    `,
    // Add animation on the wrapper itself for the glow:
    animation: 'panelGlow 3s ease-in-out infinite',
  }}
>
```

Add to `globals.css`:
```css
@keyframes panelGlow {
  0%, 100% { box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(107,63,160,0.08); }
  50%       { box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 16px 50px rgba(107,63,160,0.12), 0 0 0 1px rgba(107,63,160,0.18); }
}
```

### Level 3: Ensure existing panel animations are running

The existing panel components (BurnoutPanel, StaffAssistPanel, etc.) have internal
animation loops in `useEffect`. These should start automatically when the component
mounts. However, because they're inside `motion.div` with opacity 0 initially, the
component IS mounted but invisible.

To make the animations feel fresh when the panel appears, add a `key` prop to each
panel component that resets it when visible:

```tsx
// Track which panels have become visible
const [visiblePanels, setVisiblePanels] = useState<Set<number>>(new Set())

// When a panel's opacity crosses 0.5, mark it visible and give it a new key
// Use useMotionValueEvent for this
useMotionValueEvent(s1Proto.opacity, 'change', v => {
  if (v > 0.5 && !visiblePanels.has(1)) {
    setVisiblePanels(prev => new Set([...prev, 1]))
  }
})
// Repeat for s2Proto.opacity through s7Proto.opacity

// In JSX, use the visible state as part of key:
<SchedulerPanel key={`scheduler-${visiblePanels.has(1) ? 'visible' : 'hidden'}`} />
```

This forces each panel to remount when it becomes visible — restarting its
internal animation from the beginning, so users see the animation from the start.

---

## FIX 3 — Storytelling Copy

Replace ALL description strings in `WorkforcePageV2.tsx`.
Use exactly the copy written here. Do not paraphrase or shorten.

### Step 1: Scheduler Assist (RIGHT pill)
```
Description text (below pill, right-aligned, max-width 300px):

"Your scheduling manager opens the coverage report on Friday afternoon.
Three callouts. Twelve open shifts. Forty-eight hours to fill them.

Scheduler Assist already has the optimised schedule ready — scored
against availability, certifications, and overtime limits — before
anyone opens a spreadsheet."
```

### Step 2: Staff Burnout Prevention (LEFT pill)
```
"It's Tuesday. One of your ICU nurses has logged 68 hours this week.
Nobody on the floor flagged it — because nobody had time to check the
scheduling history.

Burnout Prevention monitors patterns across your entire roster and
flags the risk before it becomes your next 6am callout."
```

### Step 3: StaffAssist (RIGHT pill)
```
"David wants to know if he can swap Thursday. He texts his coordinator,
who's already handling twelve other things.

StaffAssist answers in two seconds — checks his eligibility, finds an
available swap partner, and initiates the request. The coordinator
never had to pick up the phone."
```

### Step 4: Auto Swap (LEFT pill)
```
"6:04am. Amanda called in sick for the 7am shift. Your coordinator
opens the contact list and starts working through it.

Auto Swap finds Sarah P., confirms her certification and overtime
status, and sends the confirmation — in 28 seconds. Before the
coordinator reaches their third call."
```

### Step 5: Auto Approval (RIGHT pill)
```
"11:47pm. Jamie L. submits a time-off request for next Thursday. No
conflicts. No overtime. Policy clear.

Auto Approval processes it immediately. When Jamie checks his phone
in the morning, it's already done. The manager never had to log in."
```

### Step 6: Visit Verification (LEFT pill)
```
"Mrs. Garcia's visit is logged as complete at 9am. The GPS record shows
a 28-minute visit — not the scheduled 60.

Visit Verification flags the discrepancy before billing runs. The
billing team never saw it. The compliance team never had to explain it."
```

### Step 7: Physician Credentialing (RIGHT pill)
```
"Dr. Patel's DEA registration expires in 11 days. The audit is in four
weeks. Physician Credentialing flagged it at 90 days, sent a reminder
at 60, and initiated the renewal at 30.

Your admin team found out about it when it was already handled."
```

### Description text styling update

Because the copy is now 3-4 sentences (up from 1-2), increase the
`max-width` of description text from `260px` to `300px` on desktop.
Also increase `font-size` from `14px` to `15px` for readability.

```tsx
// Updated description text style
<p style={{
  fontFamily: 'var(--font-geist-sans)',
  fontSize: '15px',           // was 14px
  color: '#6B6B6B',
  lineHeight: 1.75,           // was 1.65
  maxWidth: '300px',          // was 260px
  marginTop: '14px',
  // alignment stays the same (right for right-side pills, left for left-side)
}}>
```

---

## FIX 4 — Make Agent Pill Prominent

### Replace the current `AgentPill` component entirely

The current pill: small, rounded, brand purple — works but disappears visually.
The new design: a two-part marker. Sequence number above, bold pill below.

```tsx
// Replace AgentPill with AgentStepMarker
function AgentStepMarker({
  label,
  index,
  align = 'left',
}: {
  label: string
  index: number
  align?: 'left' | 'right'
}) {
  return (
    <div style={{ textAlign: align }}>
      {/* Sequence number — small, muted, above pill */}
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: '11px',
          fontWeight: 500,
          color: 'rgba(107, 63, 160, 0.35)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '10px',
        }}
      >
        Agent {String(index).padStart(2, '0')}
      </span>

      {/* Main label — Bricolage, large, prominent */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: '#6B3FA0',
          color: '#FFFFFF',
          borderRadius: '14px',     // slightly rectangular, not full pill
          padding: '14px 28px',
          fontFamily: 'var(--font-bricolage)',  // Bricolage for visual weight
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          boxShadow: '0 8px 32px rgba(107, 63, 160, 0.40), 0 2px 8px rgba(107, 63, 160, 0.20)',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Star icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z" fill="white" />
        </svg>
        {label}
      </div>
    </div>
  )
}
```

### Update all 7 pill usages in the JSX

Replace every instance of:
```tsx
<AgentPill label="..." />
```

With:
```tsx
<AgentStepMarker label="..." index={1} align="right" />  // or align="left" for left pills
<AgentStepMarker label="..." index={2} align="left" />
// etc.
```

Index values: 1 through 7 in order of steps.
`align="right"` for steps 1, 3, 5, 7 (RIGHT pills).
`align="left"` for steps 2, 4, 6 (LEFT pills).

---

## FIX 5 — Line Visibility / Scroll Timing

### Problem

When `useScroll` uses `offset: ['start start', 'end end']`, the animation
starts counting from the moment the section top reaches the viewport top.
At this moment, the user is looking at the intro text (top of section)
and the line starts at SVG y=350. But since the viewport is ~900px,
the line's starting point (y=350) is only 350px below the section top —
visible only if the user looks down. As they scroll, the line is already
drawing through the first bridge while the start of the line scrolls behind the navbar.

### Fix Part A — Add a scroll buffer before animation begins

In `WorkforcePageV2.tsx`, after creating `scrollYProgress`, add this transform:

```tsx
const { scrollYProgress: rawProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end end'],
})

// Buffer: animation doesn't start until user scrolls 8% into section
// and finishes at 95% (leaves breathing room at the end)
const scrollYProgress = useTransform(
  rawProgress,
  [0, 0.08, 0.95, 1],
  [0, 0, 1, 1]
)
```

This means:
- First 8% of scroll (8% × 5800 = 464px of scrolling) = line at y=0 (not drawing yet)
- Between 8% and 95% = line draws progressively
- Last 5% = line fully drawn, nothing more to reveal

Pass this `scrollYProgress` (not `rawProgress`) to all animations.

### Fix Part B — Adjust useScroll offset for navbar

Change the `offset` to account for the 60px navbar:

```tsx
const { scrollYProgress: rawProgress } = useScroll({
  target: sectionRef,
  offset: ['start 60px', 'end end'],
  // This means: rawProgress = 0 when section top is 60px below viewport top
  // i.e., just appearing below the fixed navbar
})
```

### Fix Part C — Make line start lower in SVG

In `PATH_D`, move the line's starting point from `M 200,350` to `M 200,430`.
This means the line starts drawing at y=430 (the first bridge) instead of from y=350.
There's no visible vertical line above the first bridge — it goes straight into the zigzag:

```ts
export const PATH_D = `
  M 200,430
  C 200,430 200,430 230,430
  L 970,430
  C 1000,430 1000,430 1000,460
  L 1000,530
  ...rest of path unchanged...
`
```

This removes the short vertical stub at the top — the line begins directly at the horizontal bridge. The user sees the line start going RIGHT from the very beginning, which is more visually intentional.

---

## FIX 7 — End Section: Line Overlap + CTA Disappearing

### Problem A: SVG line overlaps the closing headline

The current path ends with a curve from x=1000 to x=600 that passes
through the area where the closing text lives (`top: 5350px`).

Fix: The path now ends at y=5500 (closing text is at top: 5350px).
The curve approaches FROM ABOVE and terminates at y=5500, which is
BELOW the closing text. The closing text sits between y=5350 and y=5500.

BUT the line still passes THROUGH the text during its curve segment.

The real fix: Add a white background to the closing text container
that is wider than the text, masking the line behind it:

```tsx
// Closing text container
<motion.div
  style={{
    position: 'absolute',
    top: '5350px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    maxWidth: '680px',
    zIndex: 10,              // must be above SVG (which is z-index 0)
    // The background masks the SVG line behind this element:
    background: 'var(--bg)',  // same as page background
    padding: '40px 48px',
    borderRadius: '20px',
    opacity: closingOpacity,
  }}
>
```

The white background on the closing card masks the line.
The line visually appears to terminate at the card edge.

### Problem B: Closing text fades out before user can read it

The current opacity animation uses:
```tsx
useTransform(scrollYProgress, [threshold - 0.01, threshold, threshold + 0.04], [0, 0, 1])
```

Once the animation reaches 1.0 at `threshold + 0.04 = 0.914 + 0.04 = 0.954`,
if `scrollYProgress` continues to 1.0, the useTransform returns 1.0 (last value in range).
The text should STAY at opacity 1.0 after appearing.

Check that the `useStepReveal` helper has the last opacity value as `1` (not a lower value).
If the helper is:
```tsx
useTransform(sv, [t-0.01, t, t+0.04], [0, 0, 1])
```
This is correct — once progress passes `t+0.04`, opacity stays at `1`.

If text is still disappearing, the issue might be that the `scale` transform is going
ABOVE 1.0. Check the `scale` transform — it should also terminate at `1`:
```tsx
scale: useTransform(sv, [t-0.01, t, t+0.04], [0.97, 0.97, 1])
// After t+0.04, scale stays at 1.0 — correct
```

If closing text still disappears: do NOT use `useStepReveal` for the closing element.
Instead, use a simple IntersectionObserver to show it when it enters the viewport:

```tsx
// For closing text only — use IntersectionObserver instead of scroll progress
const closingRef = useRef<HTMLDivElement>(null)
const [closingVisible, setClosingVisible] = useState(false)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setClosingVisible(true) },
    { threshold: 0.2 }
  )
  if (closingRef.current) observer.observe(closingRef.current)
  return () => observer.disconnect()
}, [])

// In JSX:
<div
  ref={closingRef}
  style={{
    opacity: closingVisible ? 1 : 0,
    transform: closingVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
    // ... other positioning styles
  }}
>
```

This ensures the closing section becomes visible and STAYS visible once the user
scrolls to it — regardless of what `scrollYProgress` is doing.

### Problem C: Closing section `top` value

Change closing text `top` to `5350px` (was `5400px`).
This gives it more space above the path endpoint at y=5500.

---

## Implementation Order — Do Not Deviate

```
Step 1: Update src/data/agentStepsV2.ts
         - Change SECTION_HEIGHT to 5800
         - Replace PATH_D with new string
         - Replace THRESHOLDS with new values

Step 2: Update WorkforcePageV2.tsx — section container only
         - Change section height from 7500px to 5800px
         - Update SVG viewBox to "0 0 1200 5800"
         - Add useTransform buffer for scrollYProgress (Fix 5A)
         - Change useScroll offset (Fix 5B)
         Do NOT touch element positions yet.
         Test: confirm section is 5800px tall, scroll works.

Step 3: Update PATH_D start point (Fix 5C)
         - Change M 200,350 to M 200,430
         Test: scroll through section, verify line draws from bridge.

Step 4: Rewrite AgentStepMarker component (Fix 4)
         - Replace AgentPill entirely
         - Update all 7 usages with correct index and align values
         Test: verify pills render with Bricolage, large, with number above.

Step 5: Update all element top positions to new values (Fix 1+6)
         - Update all 7 prototype positions
         - Update all 7 pill+text positions
         - Update all 6 bridge label top values
         - Update closing text top to 5350px
         Test: scroll through entire section, verify positioning.

Step 6: Replace all description copy with storytelling versions (Fix 3)
         - Replace all 7 descriptions exactly as written in Fix 3
         - Update maxWidth to 300px, fontSize to 15px
         Test: read each description, confirm copy is in place.

Step 7: Add prototype entrance animation (Fix 2 Level 1+2)
         - Update useStepReveal to return scale
         - Apply scale to all prototype motion.divs
         - Add panelGlow keyframe to globals.css
         - Add panelGlow animation to PrototypeWrapper
         Test: watch each panel appear — confirm scale entrance + glow.

Step 8: Add panel remount on visible (Fix 2 Level 3)
         - Add useMotionValueEvent for each proto opacity
         - Add visiblePanels state
         - Add key prop to each panel component
         Test: verify animations restart when panels appear.

Step 9: Fix closing section (Fix 7)
         - Add background + padding to closing text container
         - Change opacity animation to IntersectionObserver approach
         - Verify closing text appears and stays visible
         - Verify SVG line does not visually overlap the closing card
         Test: scroll to bottom, confirm text + CTA are stable.

Step 10: Final full-scroll verification
          Scroll through the entire section slowly and check every element.
```

---

## Complete Checklist After All Fixes

**Section height:**
- [ ] `SECTION_HEIGHT = 5800` in data file
- [ ] `height: 5800px` on section element
- [ ] `viewBox="0 0 1200 5800"` on SVG

**Line:**
- [ ] PATH_D updated with new coordinates
- [ ] Line starts at M 200,430 (no vertical stub at top)
- [ ] All 7 bridges present with correct left/right alternation
- [ ] Line curve terminates at x=600, y=5500 (below closing card)
- [ ] scrollYProgress has 8% buffer before drawing starts
- [ ] useScroll offset is `['start 60px', 'end end']`

**Element positions:**
- [ ] All 7 prototypes at correct top values (as per table above)
- [ ] All 7 pill+texts at correct top values
- [ ] All 6 bridge labels at correct top values (px matching SVG y)
- [ ] Closing text at top: 5350px with background: var(--bg), padding: 40px 48px

**THRESHOLDS:**
- [ ] All 14 threshold values (7 pills + 7 prototypes) updated
- [ ] All 6 label thresholds updated
- [ ] Closing threshold: 5300/5800 = 0.914

**Agent step markers (Fix 4):**
- [ ] AgentPill component replaced with AgentStepMarker
- [ ] Sequence numbers 01–07 appear above each pill
- [ ] Font: Bricolage Grotesque 700, 18px
- [ ] Border-radius: 14px (rectangular, not full pill)
- [ ] Shadow: two-layer brand purple shadow
- [ ] Steps 1,3,5,7: align="right"
- [ ] Steps 2,4,6: align="left"

**Storytelling copy (Fix 3):**
- [ ] All 7 descriptions replaced with exact copy from Fix 3
- [ ] Description maxWidth: 300px
- [ ] Description fontSize: 15px
- [ ] Description lineHeight: 1.75

**Prototype animations (Fix 2):**
- [ ] useStepReveal returns scale (0.97→1.0)
- [ ] All prototype motion.divs have scale applied
- [ ] panelGlow keyframe added to globals.css
- [ ] panelGlow animation applied to PrototypeWrapper
- [ ] Panel remount on visible implemented (useMotionValueEvent + key prop)

**Closing section (Fix 7):**
- [ ] Closing text has background: var(--bg), padding: 40px 48px, borderRadius: 20px
- [ ] Closing text visibility uses IntersectionObserver (NOT scrollYProgress opacity)
- [ ] Closing text stays visible once it appears — does not fade back out
- [ ] SVG line curve ends at y=5500 — below the closing card

**Mobile:**
- [ ] isMobile detection unchanged
- [ ] MobileAgentStack renders linear stack below 1024px
- [ ] Updated copy reflected in MobileAgentStack descriptions as well
