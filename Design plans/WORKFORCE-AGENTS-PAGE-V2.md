# WORKFORCE AGENTS PAGE — Version 2 (Card Grid Design)
## Parallel implementation plan for Claude Code

---

## ⚠️ CRITICAL SAFETY INSTRUCTIONS — READ FIRST

This is a parallel V2 experiment. The existing implementation must
remain completely untouched and functional at all times.

### What the existing files are
The current workforce page lives in:
- `src/app/workforce/page.tsx` — the main page (DO NOT REWRITE)
- `src/components/ui/AgentSideNav.tsx` — sticky left nav (DO NOT TOUCH)
- `src/components/ui/WorkforceEcosystemVisual.tsx` — hero visual (DO NOT TOUCH)
- `src/components/ui/AgentStoryContent.tsx` — story content (DO NOT TOUCH)
- Any other components created during V1 implementation (DO NOT TOUCH)

### What you are allowed to do
1. Create new files with V2 suffix/suffix
2. Make ONE minimal addition to `page.tsx` — a 3-line toggle at the top
3. Everything else lives in new V2 files

### The toggle system

Add ONLY these lines to the very top of `src/app/workforce/page.tsx`,
before all existing code:

```tsx
// ─── VERSION TOGGLE ─────────────────────────────────────────────
// Change "main" to "v2" to test the card grid design
// Change back to "main" to restore the original implementation
const DESIGN_VERSION: "main" | "v2" = "main"

// V2 import (tree-shaken when DESIGN_VERSION is "main")
import WorkforcePageV2 from '@/components/sections/WorkforcePageV2'

// Add at the very start of the page component function, before any JSX:
if (DESIGN_VERSION === "v2") {
  return <WorkforcePageV2 />
}
// ── existing code below this line is untouched ──
```

**Rules:**
- Only ONE version renders at a time
- Both versions must NOT render simultaneously
- The existing implementation continues exactly as before when toggle is "main"
- No logic, state, or styling from V2 bleeds into the existing files

---

## Files to Create (V2 only)

```
src/
└── components/
    └── sections/
        └── WorkforcePageV2.tsx              ← Main V2 page wrapper
    └── ui/
        └── v2/
            ├── AgentCardGrid.tsx            ← Card grid section
            ├── AgentCardV2.tsx              ← Individual card component
            └── agent-visuals/
                ├── BurnoutVisual.tsx        ← Top half visual per agent
                ├── StaffAssistVisual.tsx
                ├── SchedulerVisual.tsx
                ├── EVVVisual.tsx
                ├── AutoApprovalVisual.tsx
                ├── AutoSwapVisual.tsx
                └── CredentialingVisual.tsx
```

The folder `src/components/ui/v2/` is exclusively for V2 files.
Nothing outside this folder (except `WorkforcePageV2.tsx`) is touched.

---

## After Final Decision — Cleanup Guide

**If V2 is approved and replaces V1:**
1. Delete all original V1-specific components (AgentSideNav, AgentStoryContent, etc.)
2. Remove the toggle from `page.tsx`
3. Move V2 component content into `page.tsx` directly
4. Delete the `src/components/ui/v2/` folder
5. Delete `WorkforcePageV2.tsx`

**If V1 is kept:**
1. Remove the 3-line toggle from `page.tsx`
2. Delete `WorkforcePageV2.tsx` entirely
3. Delete `src/components/ui/v2/` folder entirely
4. No other files touched

---

## Page Overview (V2)

```
/workforce

Part 1: HERO             — full viewport, same structure as V1
Part 2: CARD GRID        — 2-column card grid, all 7 agents
```

The sticky scroll pattern from V1 is replaced entirely by the card grid.
There is no sticky left panel in V2.

---

## Part 1: Hero Section (V2)

The hero is visually similar to V1 but slightly simplified —
centered layout rather than two-column, because the cards
below communicate the product depth more efficiently.

### Layout
```
Full viewport: min-h-[calc(100vh-60px)]
Single column, centered
Max-width: 800px, margin: 0 auto
Padding: 0 40px
Align-content: center
```

### Copy (exact — do not paraphrase)

**Vertical label pill:**
```
WORKFORCE OPERATIONS
```
Color: #0284C7, bg: rgba(2,132,199,0.08), border: rgba(2,132,199,0.15)
Style: 10px, Geist 600, uppercase, letter-spacing 0.06em, pill shape
Display: inline-flex, centered

**Headline (Bricolage Grotesque 700):**
```
Seven agents.
One workforce that runs itself.
```
Size: clamp(44px, 5.5vw, 72px)
Letter-spacing: -0.04em
Line-height: 1.0
Color: #0A0A0A
Text-align: center
Max-width: 700px, margin: 0 auto
Margin-bottom: 20px

**Subhead (Geist 400):**
```
From the 6am callout to the last shift of the month.
Every shift, credential, and approval — handled automatically.
```
Size: 17px
Line-height: 1.7
Color: #6B6B6B
Text-align: center
Max-width: 480px, margin: 0 auto
Margin-bottom: 36px

**CTA row (centered, gap 12px):**
```
Primary:   "Book a demo"
Ghost:     "Explore Financial →"
```

### Scroll indicator (below CTAs)
A subtle animated scroll cue — a small vertical line with a
moving dot — to hint that cards are below.

```tsx
// Animated scroll indicator
<div className="flex flex-col items-center mt-16 gap-2">
  <div
    className="w-px bg-gradient-to-b from-transparent via-[rgba(107,63,160,0.3)] to-transparent"
    style={{ height: '60px' }}
  >
    <div
      className="w-px h-3 bg-brand"
      style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
    />
  </div>
  <p className="text-label text-[10px]">7 agents below</p>
</div>

// In globals.css:
// @keyframes scrollDot {
//   0%   { transform: translateY(0); opacity: 1; }
//   100% { transform: translateY(48px); opacity: 0; }
// }
```

---

## Part 2: Card Grid Section

### Section header

```
Section padding: 80px 40px 120px
Max-width: 1120px, centered

Label: "WORKFORCE AGENTS" (text-label, centered)
Margin-bottom: 56px
```

No large section headline here — the hero already said it.
The label is enough to orient the reader into the card content.

### Grid layout

```
display: grid
grid-template-columns: 1fr 1fr
gap: 20px
max-width: 1120px
margin: 0 auto
```

7 cards in a 2-column grid:
- Row 1: Burnout Prevention / StaffAssist
- Row 2: Scheduler Assist / Visit Verification
- Row 3: Auto Approval / Auto Swap
- Row 4: Physician Credentialing / [See All Agents CTA card]

The 8th position (bottom right) is a CTA card — see spec below.

---

## Card Design Specification

### Card container

```css
background:    #FFFFFF
border:        1px solid rgba(107,63,160,0.08)
border-radius: 20px
overflow:      hidden
cursor:        pointer

/* Hover */
transform:     translateY(-5px)
box-shadow:    0 16px 48px rgba(107,63,160,0.10)
border-color:  rgba(107,63,160,0.16)
transition:    transform 250ms ease-out,
               box-shadow 250ms ease-out,
               border-color 250ms ease-out
```

### Top half — Illustration area

```css
height:         260px
background:     rgba(107,63,160,0.04)
/* Very subtle lavender tint — barely perceptible on the grid background */
/* This is what creates the visual split from the white bottom half */
padding:        28px
position:       relative
overflow:       hidden
display:        flex
align-items:    center
justify-content: center
```

**What lives inside the illustration area:**
A simplified, abstract mini-visual of the agent in action.
NOT a full dashboard panel — a small, centered composition
of 1-3 UI elements that communicate the agent's function.

The illustration sits on the tinted background with generous
breathing room. Think: 60-70% of the area is empty background.
The visual element is compact, centered, and purposeful.

**The visual/illustration boundary:**
The split between top and bottom halves is created by:
- Top: `rgba(107,63,160,0.04)` background (very subtle tint)
- Natural border: `border-top: 1px solid rgba(107,63,160,0.07)` on bottom half
- Bottom: `#FFFFFF` background

NO heavy divider. NO gradient. The color contrast IS the divider.

### Bottom half — Content area

```css
background:   #FFFFFF
padding:      22px 24px 24px
border-top:   1px solid rgba(107,63,160,0.07)
```

**Internal layout (top to bottom):**

```
[Category pill]          ← 10px, colored by vertical type
[Agent name]             ← Geist 600, 16px, #0A0A0A, margin-top 8px
[2 bullets]              ← Geist 400, 13px, #6B6B6B, margin-top 10px
[Bottom row]             ← flex, space-between, margin-top 16px
  [Outcome tag]            ← small pill, brand purple
  [Arrow →]                ← 28px circle, brand purple bg
```

**Category pill:**
```
Font:       Geist 600, 10px, uppercase, letter-spacing 0.06em
Color:      #0284C7 (workforce blue)
Background: rgba(2,132,199,0.08)
Border:     1px solid rgba(2,132,199,0.14)
Padding:    2px 9px
Border-radius: 999px
```

**Agent name:**
```
Font:         Geist 700, 16px
Color:        #0A0A0A
Letter-spacing: -0.01em
Line-height:  1.2
Margin-top:   8px
```

**2 bullets (condensed from the 3-bullet story content):**
```
Display:     flex flex-col gap-1
Each bullet: flex, items-start, gap-2

Dot:         4px circle, #6B3FA0, margin-top 6px, flex-shrink-0
Text:        Geist 400, 13px, #6B6B6B, line-height 1.4
Max 1 line per bullet — truncate if needed
```

**Bottom row:**

Left — Outcome tag:
```
Font:       Geist Mono 500, 10px
Color:      #6B3FA0
Background: rgba(107,63,160,0.07)
Border:     1px solid rgba(107,63,160,0.12)
Padding:    3px 8px
Border-radius: 6px
```

Right — Arrow button:
```
Size:         28×28px circle
Background:   rgba(107,63,160,0.08)
Color:        #6B3FA0
Border:       1px solid rgba(107,63,160,0.15)
Border-radius: 999px
Icon:         ArrowRight, 13px
Hover:        background rgba(107,63,160,0.15), arrow translates 2px right
```

Full card links to: `/agents/${agent.slug}`
The entire card is clickable (wrapper `<Link>` or `onClick`).

---

## Agent Mini-Visuals (Top Half of Each Card)

Each visual is a small React component.
All visuals share the same background: `rgba(107,63,160,0.04)`.
All visual elements use white surfaces with brand-tinted borders.
All text in visuals uses Geist Mono for numbers, Geist for labels.

### Visual 1: Burnout Prevention

A simple risk gauge — three horizontal bars with labels and levels.

```tsx
// BurnoutVisual.tsx
<div className="flex flex-col gap-2 w-[200px]">
  {/* Header */}
  <p className="font-mono text-[10px] text-ink4 mb-1">Burnout Risk — 48 staff</p>

  {/* High Risk bar */}
  <div className="flex items-center gap-2">
    <span className="font-ui text-[11px] text-ink3 w-16">High risk</span>
    <div className="flex-1 bg-white border border-[rgba(107,63,160,0.08)] rounded-full h-2">
      <div className="h-2 rounded-full bg-[#FECACA]" style={{ width: '12%' }} />
    </div>
    <span className="font-mono text-[11px] text-[#E63946] w-4">3</span>
  </div>

  {/* At Risk bar */}
  <div className="flex items-center gap-2">
    <span className="font-ui text-[11px] text-ink3 w-16">At risk</span>
    <div className="flex-1 bg-white border border-[rgba(107,63,160,0.08)] rounded-full h-2">
      <div className="h-2 rounded-full bg-[#FEF3C7]" style={{ width: '28%' }} />
    </div>
    <span className="font-mono text-[11px] text-[#F4A261] w-4">8</span>
  </div>

  {/* Healthy bar */}
  <div className="flex items-center gap-2">
    <span className="font-ui text-[11px] text-ink3 w-16">Healthy</span>
    <div className="flex-1 bg-white border border-[rgba(107,63,160,0.08)] rounded-full h-2">
      <div className="h-2 rounded-full bg-[#BBF7D0]" style={{ width: '77%' }} />
    </div>
    <span className="font-mono text-[11px] text-[#16A34A] w-4">37</span>
  </div>

  {/* Alert tag */}
  <div
    className="mt-2 rounded-[6px] px-2.5 py-1.5 text-[10px] font-ui text-[#92400E]"
    style={{ background: '#FEF3C7' }}
  >
    ⚠ 2 staff approaching threshold
  </div>
</div>
```

---

### Visual 2: StaffAssist

A mini chat interface — one question bubble, one instant reply.

```tsx
// StaffAssistVisual.tsx
<div className="flex flex-col gap-2 w-[220px]">
  {/* Chat header */}
  <div className="flex items-center gap-1.5 mb-1">
    <div className="w-4 h-4 rounded-full bg-brand flex items-center justify-center">
      <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
        <path d="M8 2C8 2 13 5.5 13 9.5C13 12.5 10.8 14.5 8 14.5"
          stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="8" cy="8" r="2" fill="white"/>
      </svg>
    </div>
    <span className="font-ui text-[11px] font-semibold text-ink">StaffAssist</span>
    <span
      className="text-[9px] font-mono text-[#16A34A] ml-auto flex items-center gap-1"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
      Online
    </span>
  </div>

  {/* Staff message */}
  <div className="self-end bg-brand text-white rounded-[10px] rounded-tr-[3px] px-3 py-1.5 max-w-[160px]">
    <p className="text-[11px] font-ui">Can I swap my Thursday shift?</p>
  </div>

  {/* Agent reply */}
  <div
    className="self-start rounded-[10px] rounded-tl-[3px] px-3 py-1.5 max-w-[190px]"
    style={{ background: 'rgba(107,63,160,0.06)' }}
  >
    <p className="text-[11px] font-ui text-ink">
      Checking eligibility...
      <br/>
      <span className="text-[#16A34A]">✓ Approved. Swap confirmed.</span>
    </p>
  </div>

  {/* Timestamp */}
  <p className="font-mono text-[9px] text-ink4 self-start ml-1">
    Response time: &lt;2s
  </p>
</div>
```

---

### Visual 3: Scheduler Assist

A simplified week grid with one gap cell highlighted + AI label.

```tsx
// SchedulerVisual.tsx
<div className="flex flex-col gap-2 w-[220px]">
  <p className="font-mono text-[10px] text-ink4">Week of Mar 24 — Coverage</p>

  {/* Mini grid: 5 columns (Mon-Fri), 3 rows */}
  <div className="grid grid-cols-5 gap-1">
    {/* Headers */}
    {['M','T','W','T','F'].map(d => (
      <div key={d} className="text-center font-mono text-[9px] text-ink4">{d}</div>
    ))}
    {/* Row 1 — all filled */}
    {[true,true,true,true,true].map((filled, i) => (
      <div key={i}
        className="h-5 rounded-[3px]"
        style={{ background: filled ? '#EDE9FE' : 'transparent' }}
      />
    ))}
    {/* Row 2 — gap on Wednesday */}
    {[true,true,false,true,true].map((filled, i) => (
      <div key={i}
        className="h-5 rounded-[3px] flex items-center justify-center"
        style={{
          background: filled ? '#EDE9FE' : 'rgba(230,57,70,0.10)',
          border: !filled ? '1px dashed #E63946' : 'none'
        }}
      >
        {!filled && <span className="text-[8px] text-[#E63946]">!</span>}
      </div>
    ))}
    {/* Row 3 — all filled */}
    {[true,true,true,true,true].map((filled, i) => (
      <div key={i}
        className="h-5 rounded-[3px]"
        style={{ background: filled ? '#EDE9FE' : 'transparent' }}
      />
    ))}
  </div>

  {/* AI recommendation */}
  <div
    className="rounded-[6px] px-2.5 py-1.5 flex items-center gap-1.5"
    style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.12)' }}
  >
    <span className="text-brand text-[10px]">✦</span>
    <p className="text-[10px] font-ui text-ink3">
      Sarah P. recommended — no OT, certified
    </p>
  </div>
</div>
```

---

### Visual 4: Visit Verification (EVV)

A small verification card with GPS indicator and status.

```tsx
// EVVVisual.tsx
<div className="flex flex-col gap-2 w-[210px]">
  <p className="font-mono text-[10px] text-ink4">Today's Visit Log</p>

  {/* 3 visit rows */}
  {[
    { client: 'Mrs. Garcia', time: '09:00', status: 'VERIFIED', color: '#D1FAE5', text: '#065F46' },
    { client: 'Mr. Chen',   time: '11:30', status: 'REVIEW',   color: '#FEF3C7', text: '#92400E' },
    { client: 'Ms. Davis',  time: '14:00', status: 'VERIFIED', color: '#D1FAE5', text: '#065F46' },
  ].map((row) => (
    <div
      key={row.client}
      className="flex items-center justify-between bg-white rounded-[6px] px-2.5 py-1.5 border border-[rgba(107,63,160,0.07)]"
    >
      <div>
        <p className="font-ui text-[11px] font-semibold text-ink leading-none">{row.client}</p>
        <p className="font-mono text-[10px] text-ink4 mt-0.5">{row.time}</p>
      </div>
      <span
        className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-[4px]"
        style={{ background: row.color, color: row.text }}
      >
        {row.status}
      </span>
    </div>
  ))}

  {/* GPS indicator */}
  <div className="flex items-center gap-1 mt-1">
    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
    <p className="font-mono text-[9px] text-ink4">GPS validated · Syncing to billing</p>
  </div>
</div>
```

---

### Visual 5: Auto Approval

An approval queue — two items, one auto-approved, one escalated.

```tsx
// AutoApprovalVisual.tsx
<div className="flex flex-col gap-2 w-[220px]">
  <p className="font-mono text-[10px] text-ink4">Approval Queue</p>

  {/* Auto-approved item */}
  <div
    className="rounded-[8px] px-3 py-2 border"
    style={{ background: '#F0FDF4', borderColor: '#BBF7D0' }}
  >
    <div className="flex items-center justify-between">
      <p className="font-ui text-[11px] font-semibold text-ink">Jamie L. — Time off Apr 15</p>
      <span className="font-mono text-[9px] text-[#16A34A] bg-[#D1FAE5] px-1.5 py-0.5 rounded">AUTO</span>
    </div>
    <p className="font-ui text-[10px] text-ink4 mt-0.5">No conflicts · Policy clear · ✓ Approved</p>
  </div>

  {/* Escalated item */}
  <div
    className="rounded-[8px] px-3 py-2 border"
    style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}
  >
    <div className="flex items-center justify-between">
      <p className="font-ui text-[11px] font-semibold text-ink">David M. — Overtime request</p>
      <span className="font-mono text-[9px] text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded">ESC</span>
    </div>
    <p className="font-ui text-[10px] text-ink4 mt-0.5">OT limit exceeded · Sent to manager</p>
  </div>

  <p className="font-mono text-[9px] text-ink4 text-right">
    16 auto-resolved today · 2 escalated
  </p>
</div>
```

---

### Visual 6: Auto Swap

Two caregiver cards with a swap arrow between them.

```tsx
// AutoSwapVisual.tsx
<div className="flex flex-col gap-2 w-[220px]">
  {/* Trigger */}
  <div
    className="rounded-[6px] px-2.5 py-1.5 text-[10px] font-ui text-[#92400E]"
    style={{ background: '#FEF3C7', border: '1px solid #FDE68A' }}
  >
    ⚠ Amanda W. — Called in sick · 06:00–14:00
  </div>

  {/* Candidates row */}
  <div className="flex items-center gap-2">
    {/* Candidate A */}
    <div
      className="flex-1 rounded-[8px] px-2.5 py-2 border text-center"
      style={{ background: 'rgba(107,63,160,0.04)', borderColor: 'rgba(107,63,160,0.14)' }}
    >
      <div className="w-6 h-6 rounded-full bg-brand text-white font-mono text-[9px] flex items-center justify-center mx-auto mb-1">
        SP
      </div>
      <p className="font-ui text-[10px] font-semibold text-ink">Sarah P.</p>
      <p className="font-mono text-[9px] text-[#16A34A]">94% match</p>
    </div>

    {/* Arrow */}
    <div className="flex-shrink-0 flex items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#6B3FA0" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    </div>

    {/* Candidate B */}
    <div
      className="flex-1 rounded-[8px] px-2.5 py-2 border text-center"
      style={{ background: '#FAFAFA', borderColor: 'rgba(107,63,160,0.08)' }}
    >
      <div className="w-6 h-6 rounded-full bg-[#D1FAE5] text-[#065F46] font-mono text-[9px] flex items-center justify-center mx-auto mb-1">
        JK
      </div>
      <p className="font-ui text-[10px] font-semibold text-ink3">James K.</p>
      <p className="font-mono text-[9px] text-ink4">87% match</p>
    </div>
  </div>

  <p className="font-mono text-[9px] text-ink4 text-center">
    Confirmed in 28s · No agency needed
  </p>
</div>
```

---

### Visual 7: Physician Credentialing

A simple credential tracker table — 3 rows, one expiring.

```tsx
// CredentialingVisual.tsx
<div className="flex flex-col gap-1.5 w-[230px]">
  <p className="font-mono text-[10px] text-ink4 mb-0.5">Provider Credentials — 48 providers</p>

  {[
    { name: 'Dr. Rogers', cred: 'MD Licence (PA)',  expires: 'Jun 2026', status: 'CURRENT',  bg: '#D1FAE5', color: '#065F46' },
    { name: 'Dr. Patel',  cred: 'DEA Registration', expires: '11 days',  status: 'EXPIRING', bg: '#FEF3C7', color: '#92400E' },
    { name: 'Dr. Chen',   cred: 'Board Cert',        expires: 'Dec 2025', status: 'CURRENT',  bg: '#D1FAE5', color: '#065F46' },
  ].map((row) => (
    <div
      key={row.name}
      className="flex items-center justify-between bg-white rounded-[6px] px-2.5 py-1.5 border border-[rgba(107,63,160,0.07)]"
      style={row.status === 'EXPIRING' ? { borderColor: '#FDE68A' } : {}}
    >
      <div>
        <p className="font-ui text-[10px] font-semibold text-ink">{row.name}</p>
        <p className="font-mono text-[9px] text-ink4">{row.cred}</p>
      </div>
      <div className="text-right">
        <span
          className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-[4px] block"
          style={{ background: row.bg, color: row.color }}
        >
          {row.status}
        </span>
        <p className="font-mono text-[9px] text-ink4 mt-0.5">{row.expires}</p>
      </div>
    </div>
  ))}
</div>
```

---

## Card Content Data (all 7 agents)

Use this data inside `AgentCardV2.tsx`. All copy is exact — do not paraphrase.

```ts
// src/data/agentCardsV2.ts

export const agentCardsData = [
  {
    slug: 'staff-burnout-prevention',
    category: 'BURNOUT PREVENTION',
    name: 'Staff Burnout Prevention',
    bullets: [
      'Detects over-scheduling and overtime spikes automatically',
      'Flags high-risk staff before the callout happens',
    ],
    outcome: 'Lower turnover costs',
    visual: 'burnout',
  },
  {
    slug: 'staffassist',
    category: 'STAFF SELF-SERVICE',
    name: 'StaffAssist Agent',
    bullets: [
      'Answers schedule and policy questions instantly',
      'Initiates swaps without coordinator involvement',
    ],
    outcome: 'Requests handled in seconds',
    visual: 'staffassist',
  },
  {
    slug: 'scheduler-assist',
    category: 'SCHEDULING',
    name: 'Scheduler Assist',
    bullets: [
      'Identifies coverage gaps the moment they appear',
      'Scores available staff and auto-generates the schedule',
    ],
    outcome: 'Fewer unfilled shifts',
    visual: 'scheduler',
  },
  {
    slug: 'visit-verification',
    category: 'COMPLIANCE · EVV',
    name: 'Visit Verification',
    bullets: [
      'GPS and time-based visit validation on every visit',
      'Flags missed or shortened visits before billing',
    ],
    outcome: 'Zero compliance exposure',
    visual: 'evv',
  },
  {
    slug: 'auto-approval',
    category: 'APPROVAL AUTOMATION',
    name: 'Auto Approval Agent',
    bullets: [
      'Auto-approves compliant requests instantly, overnight',
      'Escalates only genuine exceptions to managers',
    ],
    outcome: 'Managers see only exceptions',
    visual: 'autoapproval',
  },
  {
    slug: 'auto-swap',
    category: 'SHIFT OPTIMISATION',
    name: 'Auto Swap Agent',
    bullets: [
      'Matches the best internal candidate in under 30 seconds',
      'Checks compliance before confirming the swap',
    ],
    outcome: 'Shifts filled before second call',
    visual: 'autoswap',
  },
  {
    slug: 'physician-credentialing',
    category: 'CREDENTIALING',
    name: 'Physician Credentialing',
    bullets: [
      'Tracks every licence expiry across your provider roster',
      'Sends reminders at 90, 60, and 30 days automatically',
    ],
    outcome: 'Zero expired credentials at audit',
    visual: 'credentialing',
  },
]
```

---

## The 8th Card — CTA Card

The 8th position in the grid is a call-to-action card.
Same dimensions as agent cards. Different internal layout.

```tsx
// CTA card — 8th position in the grid
<div
  className="rounded-[20px] overflow-hidden border border-[rgba(107,63,160,0.12)]"
  style={{
    background: 'rgba(107,63,160,0.04)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
    textAlign: 'center',
    minHeight: '100%',
  }}
>
  <p className="text-label mb-4">FINANCIAL OPERATIONS</p>
  <h3
    className="font-display font-bold text-ink mb-3"
    style={{ fontSize: '22px', letterSpacing: '-0.025em', lineHeight: '1.2' }}
  >
    Looking for financial automation?
  </h3>
  <p className="text-[14px] text-ink3 font-ui mb-6 leading-snug">
    Four agents across AP/AR, collections, and contract compliance.
  </p>
  <Link href="/financial" className="btn-base btn-primary">
    Explore Financial →
  </Link>
</div>
```

---

## Main V2 Component

```tsx
// src/components/sections/WorkforcePageV2.tsx
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AgentCardGrid } from '@/components/ui/v2/AgentCardGrid'

export default function WorkforcePageV2() {
  return (
    <div>
      {/* Hero */}
      <HeroV2 />

      {/* Card Grid */}
      <section className="pb-[120px]">
        <div className="section-container">
          <p className="text-label text-center mb-14">WORKFORCE AGENTS</p>
          <AgentCardGrid />
        </div>
      </section>
    </div>
  )
}
```

---

## Scroll Animation

Cards animate in on scroll with a stagger. Use the same
IntersectionObserver pattern as the rest of the site.

```tsx
// Inside AgentCardGrid.tsx
// Each card gets a ref, observer triggers y:40→0 + opacity, 80ms stagger

useEffect(() => {
  const cards = cardRefs.current
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  cards.forEach((card, i) => {
    if (!card || prefersReduced) return

    card.style.opacity = '0'
    card.style.transform = 'translateY(40px)'
    card.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                             transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(card)
  })
}, [])
```

---

## Mobile Behaviour (< 768px)

```
Grid: 1 column (single card per row)
Card top half: height 200px (reduced from 260px)
Card bottom half: padding 18px 20px
Hero: same as desktop but text-align left (not center)
Hero headline: clamp(36px, 8vw, 52px)
No scroll indicator on mobile
```

```tsx
// Grid responsive class
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
```

---

## Implementation Order

Build in exactly this sequence:

```
Step 1:  Create src/data/agentCardsV2.ts with all card data
Step 2:  Create all 7 visual components in src/components/ui/v2/agent-visuals/
Step 3:  Create AgentCardV2.tsx (card shell with top/bottom halves)
Step 4:  Create AgentCardGrid.tsx (grid + scroll animation)
Step 5:  Create WorkforcePageV2.tsx (hero + card grid)
Step 6:  Add 3-line toggle to src/app/workforce/page.tsx (MINIMAL CHANGE ONLY)
Step 7:  Set DESIGN_VERSION = "v2" and test locally
Step 8:  Verify V1 still works by setting DESIGN_VERSION = "main"
Step 9:  Test card hover states, animations, link behaviour
Step 10: Test on mobile (375px, 768px)
Step 11: Set back to DESIGN_VERSION = "main" before committing
```

---

## Checklist

### Safety
- [ ] `DESIGN_VERSION = "main"` is the default commit value
- [ ] Existing page.tsx has only 3 added lines (toggle + import + early return)
- [ ] No existing component files were modified
- [ ] Both versions render correctly independently
- [ ] No shared mutable state between V1 and V2

### Hero V2
- [ ] Centered layout (not two-column like V1)
- [ ] Workforce pill: blue (#0284C7)
- [ ] Headline: Bricolage Grotesque 700, centered
- [ ] Subhead: Geist 400, centered, muted
- [ ] Scroll indicator animation works

### Cards
- [ ] Grid: 2 columns on md+, 1 column on mobile
- [ ] Card border-radius: 20px
- [ ] Top half: rgba(107,63,160,0.04) background, height 260px
- [ ] Natural divider: border-top 1px solid rgba(107,63,160,0.07) on bottom half
- [ ] Bottom half: white background
- [ ] Category pill: blue, correct color
- [ ] Agent name: Geist 700, 16px
- [ ] 2 bullets: concise, 1 line each
- [ ] Outcome tag: brand purple, Geist Mono
- [ ] Arrow circle: 28px, brand purple
- [ ] Card hover: translateY(-5px), shadow deepens, border darkens
- [ ] Entire card is clickable → /agents/[slug]
- [ ] 8th card (CTA card) renders correctly

### Agent Visuals (top half)
- [ ] BurnoutVisual: risk bars with count numbers
- [ ] StaffAssistVisual: chat bubbles, 2 messages
- [ ] SchedulerVisual: week grid with gap highlighted
- [ ] EVVVisual: 3 visit rows, one REVIEW status
- [ ] AutoApprovalVisual: 2 queue items (AUTO + ESC)
- [ ] AutoSwapVisual: 2 candidate cards with arrow
- [ ] CredentialingVisual: 3 provider rows, one EXPIRING

### Animations
- [ ] Cards stagger on scroll: y:40→0, opacity, 80ms apart
- [ ] Reduced motion: renders at final state immediately
- [ ] Card hover transition: 250ms ease-out
- [ ] Arrow on card hover: translates 2px right

### Mobile
- [ ] Single column grid on mobile
- [ ] Top half height: 200px on mobile
- [ ] All 7 agent cards + CTA card visible
