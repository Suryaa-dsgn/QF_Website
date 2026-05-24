# WORKFORCE AGENTS PAGE — Design & Implementation Plan
## File: `src/app/workforce/page.tsx` + supporting components

> **Read this entire file before writing any code.**
> This page uses a specific sticky-scroll pattern.
> The layout, IntersectionObserver logic, and section structure
> must all be in place before any styling is applied.
>
> Brand colors, fonts, and design tokens are already defined
> in globals.css and tailwind.config.ts. Use them.
> Do not introduce new colors or font choices.

---

## Page Overview

Two distinct parts:

```
1. HERO SECTION          — full viewport, standard layout
2. STICKY SCROLL SECTION — two-column sticky navigation pattern
```

The sticky scroll section is the primary design challenge.
The hero is straightforward.

---

## Part 1: Hero Section

### Layout
```
Full viewport height: min-h-[calc(100vh-60px)]
Two columns: [left 50%] [right 50%]
Align: items-center
Max-width: 1120px, centered, px-10
```

### Left Column — Copy

```
Vertical label pill (top):
  "WORKFORCE OPERATIONS"
  Style: same as section labels throughout site
  Color: blue (#0284C7), bg rgba(2,132,199,0.08)
  Margin-bottom: 24px

Headline (Bricolage Grotesque 700):
  "Seven agents.
   One workforce
   that runs itself."
  Size: clamp(40px, 5vw, 64px)
  Letter-spacing: -0.04em
  Line-height: 1.0

Subhead (Geist 400, 16px, muted, max-width 400px):
  "From the 6am callout to the last shift of the month.
   Every shift, credential, and approval — handled."
  Margin-top: 20px

Agent count row (margin-top: 28px):
  "7 agents across shift coverage, credentialing,
   and workforce compliance."
  Style: Geist Mono 400, 13px, color #A0A0A0

CTA row (margin-top: 32px):
  Primary: "Book a demo"
  Ghost: "Explore Financial →"
```

### Right Column — Agent Ecosystem Visual

A composite visual showing all 7 agents as a mini command
center. NOT a single agent panel — a grid of small status
indicators showing all 7 agents active simultaneously.

```tsx
// Component: WorkforceEcosystemVisual
// Located: src/components/ui/WorkforceEcosystemVisual.tsx

// Layout: a floating panel (browser-frame style)
// Inside: 7 small agent status rows, each showing:
//   - Agent name
//   - Current action (animates sequentially)
//   - Status indicator (pulsing green dot = active)

// The 7 rows cycle through active states with a stagger:
// Every 2 seconds, one agent "fires" an action
// The action text changes, the dot pulses brighter

// Panel styling:
//   background: #FFFFFF
//   border: 1px solid var(--border)
//   border-radius: 16px
//   box-shadow: var(--shadow-2)
//   padding: 20px 24px
//   width: 100%
//   max-width: 480px

// Browser chrome at top (same as hero panel)

// 7 agent rows inside:
interface AgentStatusRow {
  name: string        // e.g. "StaffAssist"
  category: string    // e.g. "Self-Service"
  action: string[]    // cycling actions, one shows at a time
  // e.g. ["Answering shift query", "Processing swap request", "Updating availability"]
}
```

**Agent rows data for the ecosystem visual:**
```ts
const ecosystemRows = [
  {
    name: 'Burnout Prevention',
    category: 'MONITORING',
    actions: ['Scanning overtime patterns', 'Flagging high-risk staff', 'Monitoring 48 staff'],
  },
  {
    name: 'StaffAssist',
    category: 'SELF-SERVICE',
    actions: ['Answering shift query', 'Processing swap request', 'Showing open shifts'],
  },
  {
    name: 'Scheduler Assist',
    category: 'SCHEDULING',
    actions: ['Identifying coverage gap', 'Generating schedule', 'Scoring 34 staff'],
  },
  {
    name: 'Visit Verification',
    category: 'COMPLIANCE',
    actions: ['Validating GPS timestamp', 'Flagging shortened visit', 'Syncing to billing'],
  },
  {
    name: 'Auto Approval',
    category: 'APPROVALS',
    actions: ['Checking compliance rules', 'Auto-approving request', 'Escalating exception'],
  },
  {
    name: 'Auto Swap',
    category: 'SHIFT OPS',
    actions: ['Matching shift gap', 'Confirming certification', 'Notifying both parties'],
  },
  {
    name: 'Physician Credentialing',
    category: 'CREDENTIALING',
    actions: ['Tracking 48 providers', 'Sending renewal reminder', 'Verifying DEA registration'],
  },
]
```

**Animation logic:**
```tsx
// One agent "fires" at a time, cycling every 2.5 seconds
// Active agent: action text animates in (fade + y: 8→0)
// Active dot: opacity 1, animate pulse
// Inactive agents: dot opacity 0.25, action shows last state

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex(i => (i + 1) % 7)
  }, 2500)
  return () => clearInterval(interval)
}, [])
```

**Each row visual:**
```
[Status dot (6px circle)] [Agent name — Geist 600, 13px] [Category pill]
[Action text — Geist Mono 400, 11px, color #A0A0A0, animates]
[Thin border-bottom between rows, except last]
```

Active row: dot pulses green (#16A34A), action text in brand purple
Inactive row: dot grey (#D1D5DB), action text in ink-faint (#A0A0A0)

---

## Part 2: Sticky Scroll Section

This is the core of the page.

### Overall Layout

```
Section: width 100%, background: var(--bg) [same page background, grid continues]

Inner container: display flex, align-items: flex-start
  max-width: 1120px, margin: 0 auto, padding: 0 40px
  
  ├── Left panel: width 260px, flex-shrink: 0
  │              position: sticky
  │              top: 80px  [accounts for 60px nav + 20px breathing room]
  │              height: calc(100vh - 100px)
  │              overflow-y: auto
  │              padding: 0 0 40px 0
  │
  └── Right panel: flex: 1
                   padding-left: 60px
                   [scrolls normally]
```

**Critical:** The sticky left panel must have `align-self: flex-start`
on the parent container to prevent it stretching full height.

```tsx
// Outer section wrapper
<section className="py-24">
  <div
    className="max-w-[1120px] mx-auto px-10 flex items-start gap-0"
  >
    <LeftPanel activeAgentIndex={activeAgentIndex} onAgentClick={handleAgentClick} />
    <RightPanel onAgentInView={setActiveAgentIndex} />
  </div>
</section>
```

---

### Left Panel Component

```tsx
// src/components/ui/AgentSideNav.tsx
'use client'

interface AgentSideNavProps {
  agents: Agent[]
  activeIndex: number
  onAgentClick: (index: number, slug: string) => void
}

// Panel structure:
//
// [Section label — "WORKFORCE AGENTS", 10px uppercase, muted]
// [7 agent items, stacked vertically]

// Each agent item:
//
// ┌─────────────────────────────────────┐
// │  [Number]  [Agent Name]             │
// │            [Category tag]           │
// └─────────────────────────────────────┘
//
// Active state:
//   - border-left: 2px solid var(--brand) [#6B3FA0]
//   - Agent name: color #0A0A0A, font-weight 600
//   - Category: color var(--brand)
//   - Background: rgba(107,63,160,0.04)
//   - Transition: all 250ms ease
//
// Inactive state:
//   - border-left: 2px solid transparent
//   - Agent name: color #A0A0A0, font-weight 400
//   - Category: hidden (display none or opacity 0)
//   - Background: transparent
//   - Cursor: pointer
//   - Hover: border-left color rgba(107,63,160,0.25)
//             agent name color #6B6B6B

// Agent number:
//   Geist Mono 400, 11px, color #C4B5FD (muted purple-tinted)
//   Width: 28px, flex-shrink 0
//   Active: color var(--brand)

// Agent name:
//   Geist 500 (inactive) / 600 (active), 14px

// Category tag (only visible when active):
//   Geist 500, 10px, uppercase, letter-spacing 0.06em
//   Color: var(--brand)
//   Margin-top: 2px

// Item padding: 10px 12px 10px 14px
// Item border-radius: 8px
// Gap between items: 2px
```

**Full component code:**

```tsx
'use client'

import { cn } from '@/lib/utils'
import { workforceAgents } from '@/data/agents'

interface AgentSideNavProps {
  activeIndex: number
  onAgentClick: (index: number) => void
}

export default function AgentSideNav({ activeIndex, onAgentClick }: AgentSideNavProps) {
  return (
    <div
      className="flex flex-col"
      style={{
        width: '260px',
        flexShrink: 0,
        position: 'sticky',
        top: '80px',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        // Hide scrollbar but allow scroll
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Section label */}
      <p
        className="text-label mb-5"
        style={{ paddingLeft: '14px' }}
      >
        Workforce Agents
      </p>

      {/* Agent list */}
      <div className="flex flex-col gap-0.5">
        {workforceAgents.map((agent, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={agent.slug}
              onClick={() => onAgentClick(index)}
              className={cn(
                'flex items-start gap-3 px-3 py-2.5 rounded-[8px] text-left w-full',
                'border-l-2 transition-all duration-250',
                isActive
                  ? 'border-brand bg-[rgba(107,63,160,0.04)]'
                  : 'border-transparent hover:border-[rgba(107,63,160,0.2)] hover:bg-[rgba(107,63,160,0.02)]'
              )}
            >
              {/* Agent number */}
              <span
                className={cn(
                  'font-mono text-[11px] flex-shrink-0 mt-0.5 w-6',
                  isActive ? 'text-brand' : 'text-[#C4B5FD]'
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Agent name + category */}
              <div>
                <p
                  className={cn(
                    'text-[14px] leading-none mb-1 transition-all duration-200',
                    isActive
                      ? 'text-ink font-semibold'
                      : 'text-ink4 font-medium'
                  )}
                >
                  {agent.name}
                </p>

                {/* Category — only visible when active */}
                <p
                  className={cn(
                    'text-[10px] uppercase tracking-[0.06em] font-semibold font-ui transition-all duration-200',
                    isActive
                      ? 'text-brand opacity-100'
                      : 'opacity-0'
                  )}
                >
                  {agent.category}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Progress indicator at bottom */}
      <div className="mt-auto pt-6 px-4">
        <div className="flex gap-1">
          {workforceAgents.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-0.5 flex-1 rounded-full transition-all duration-300',
                i === activeIndex ? 'bg-brand' : 'bg-[rgba(107,63,160,0.15)]'
              )}
            />
          ))}
        </div>
        <p className="text-[11px] font-mono text-ink4 mt-2">
          {activeIndex + 1} / {workforceAgents.length}
        </p>
      </div>
    </div>
  )
}
```

---

### Right Panel — Agent Sections

The right panel contains 7 sequential agent sections.
Each agent section is structured as:

```
[Agent Section]
  ├── Prototype card (the animated product UI)
  ├── [Gap: 48px — close, not huge]
  └── Story content
      ├── Agent tag + number
      ├── "The moment" narrative (1-2 sentences)
      ├── 3 action bullets
      ├── Outcome line
      └── "Learn more" link
```

Each agent section must have:
1. A unique `id` for scroll targeting: `id={`agent-${agent.slug}`}`
2. A `ref` for IntersectionObserver
3. Enough height to register scroll: `min-height: 100vh`

**Critical:** Do NOT set min-height to less than 100vh.
The IntersectionObserver needs scroll distance to work correctly.
If sections are too short, multiple agents fire simultaneously.

```tsx
// Right panel component: src/components/ui/AgentScrollContent.tsx
'use client'

interface AgentScrollContentProps {
  onAgentInView: (index: number) => void
}
```

---

### IntersectionObserver Logic

```tsx
// In the parent page component (workforce/page.tsx)
'use client'

import { useState, useRef, useCallback } from 'react'

export default function WorkforcePage() {
  const [activeAgentIndex, setActiveAgentIndex] = useState(0)

  // Track which agent is in view
  const handleAgentInView = useCallback((index: number) => {
    setActiveAgentIndex(index)
  }, [])

  // Handle left nav click → scroll to agent section
  const handleAgentClick = useCallback((index: number) => {
    setActiveAgentIndex(index)
    const target = document.getElementById(`agent-${workforceAgents[index].slug}`)
    if (target) {
      // Use Lenis smooth scroll if available, fallback to native
      const lenis = (window as any).__lenis
      if (lenis) {
        lenis.scrollTo(target, { offset: -100, duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  return (
    <>
      <HeroSection />
      <StickyScrollSection
        activeAgentIndex={activeAgentIndex}
        onAgentInView={handleAgentInView}
        onAgentClick={handleAgentClick}
      />
    </>
  )
}
```

**Observer setup inside the right panel:**

```tsx
// Inside AgentScrollContent component
useEffect(() => {
  const sections = sectionRefs.current

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-agent-index') || '0')
          onAgentInView(index)
        }
      })
    },
    {
      // Trigger when the section crosses the vertical center of the viewport
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0,
    }
  )

  sections.forEach(section => {
    if (section) observer.observe(section)
  })

  return () => observer.disconnect()
}, [onAgentInView])
```

---

### Each Agent Section Structure

```tsx
// Template for a single agent section
function AgentSection({
  agent,
  index,
  sectionRef,
}: {
  agent: Agent
  index: number
  sectionRef: (el: HTMLElement | null) => void
}) {
  return (
    <section
      id={`agent-${agent.slug}`}
      data-agent-index={index}
      ref={sectionRef}
      className="min-h-screen py-16"
      // min-h-screen ensures enough scroll distance for IntersectionObserver
    >
      {/* ── PROTOTYPE CARD ─────────────────────────── */}
      <div className="mb-12">
        {/* Browser frame wrapper */}
        <div
          className="w-full rounded-[16px] border border-[--border] overflow-hidden bg-white"
          style={{ boxShadow: 'var(--shadow-2)', height: '440px' }}
        >
          <div className="browser-chrome">
            <div className="browser-dots">
              <div className="browser-dot dot-red" />
              <div className="browser-dot dot-yellow" />
              <div className="browser-dot dot-green" />
            </div>
            <div className="browser-url">
              app.quickflows.ai / {agent.slug}
            </div>
          </div>
          <div className="h-[calc(100%-36px)] overflow-hidden">
            {/* Render the specific agent's animated panel component */}
            <AgentPanelRenderer panelType={agent.panelType} />
          </div>
        </div>
      </div>

      {/* ── STORY CONTENT ──────────────────────────── */}
      {/* Gap between prototype and story: 48px (mb-12 above) */}
      <div className="max-w-[560px]">
        <AgentStoryContent agent={agent} index={index} />
      </div>

    </section>
  )
}
```

---

### Agent Story Content Component

```tsx
// src/components/ui/AgentStoryContent.tsx
// The storytelling section below each prototype

function AgentStoryContent({ agent, index }: { agent: Agent, index: number }) {
  return (
    <div>

      {/* Agent number + category */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[11px] text-brand bg-[rgba(107,63,160,0.08)] px-2 py-0.5 rounded-[4px]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-label">{agent.category}</span>
      </div>

      {/* The Moment — narrative headline */}
      <h3
        className="font-display font-bold text-ink mb-4"
        style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', letterSpacing: '-0.03em', lineHeight: '1.15' }}
      >
        {agentStories[agent.slug].moment}
      </h3>

      {/* Narrative paragraph — the specific scenario */}
      <p
        className="text-[15px] text-ink3 font-ui leading-[1.7] mb-6"
        style={{ maxWidth: '500px' }}
      >
        {agentStories[agent.slug].narrative}
      </p>

      {/* 3 action bullets */}
      <ul className="flex flex-col gap-2.5 mb-6">
        {agentStories[agent.slug].actions.map((action, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#D1FAE5] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path d="M1 4L3 6L7 2" stroke="#065F46" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-[14px] text-ink3 font-ui leading-snug">{action}</span>
          </li>
        ))}
      </ul>

      {/* Outcome pill */}
      <div
        className="inline-flex items-center gap-2 text-[12px] font-medium font-ui px-3 py-1.5 rounded-[6px] mb-5"
        style={{ background: '#6B3FA0', color: '#FFFFFF' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>↗</span>
        {agentStories[agent.slug].outcome}
      </div>

      {/* Learn more link */}
      <div>
        <a
          href={`/agents/${agent.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand font-ui group"
        >
          Full agent detail
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            className="group-hover:translate-x-1 transition-transform duration-150">
            <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </a>
      </div>

    </div>
  )
}
```

---

### Story Content Data — All 7 Agents

Create this in: `src/data/agentStories.ts`

```ts
export const agentStories: Record<string, {
  moment: string
  narrative: string
  actions: string[]
  outcome: string
}> = {

  'staff-burnout-prevention': {
    moment: "The nurse who called out last Monday called out again today.",
    narrative: "It's Tuesday. One of your ICU nurses has logged 68 hours this week. Nobody on the floor flagged it — because nobody had time to check the scheduling history. Burnout doesn't announce itself. It shows up as a callout at 6am.",
    actions: [
      "Detects over-scheduling spikes and overtime patterns in real time",
      "Monitors sentiment signals and absence history across your roster",
      "Flags high-risk staff before the callout happens — not after",
    ],
    outcome: "Lower turnover. Fewer emergency callouts. Your best staff still there in six months.",
  },

  'staffassist': {
    moment: "David wants to know if he can swap Thursday. That shouldn't take three messages.",
    narrative: "He texts his coordinator. She's handling twelve other things. His message sits there. By the time she responds, the open shift has already been assigned. The swap never happened. David asks again next week.",
    actions: [
      "Answers schedule and policy questions instantly, 24 hours a day",
      "Shows eligible open shifts and swap options based on David's certifications",
      "Initiates the swap request and confirms both parties — no coordinator required",
    ],
    outcome: "Coordinators stop being the switchboard. Staff get answers in seconds.",
  },

  'scheduler-assist': {
    moment: "Three callouts. Twelve open shifts. Forty-eight hours. One spreadsheet.",
    narrative: "It's Friday afternoon. The scheduling manager opens the coverage report and starts working through it manually — cross-referencing availability, certifications, and OT limits one name at a time. This is how every Friday afternoon works.",
    actions: [
      "Identifies every coverage gap the moment a callout is logged",
      "Scores available staff against certifications, availability, and OT limits",
      "Generates the optimised schedule and simulates impact before publishing",
    ],
    outcome: "A filled schedule in hours. Not a panic on Monday morning.",
  },

  'visit-verification': {
    moment: "The billing record says 9am. The GPS log says 28 minutes, not 60.",
    narrative: "A caregiver visited Mrs. Garcia. The visit was logged as complete. But the timestamp doesn't match the duration. Nobody catches it until billing runs — and by then, the compliance window is already at risk.",
    actions: [
      "Validates every visit with GPS coordinates and time-stamp on arrival and departure",
      "Flags shortened or missed visits in real time — before billing is submitted",
      "Syncs verified visit data directly to billing with the full audit trail attached",
    ],
    outcome: "No compliance exposure. No missed reimbursements. No reconciliation backlog.",
  },

  'auto-approval': {
    moment: "It's 11pm. A compliant time-off request is sitting in a queue waiting for morning.",
    narrative: "A caregiver submits a request for next Thursday. No conflicts. No OT. Policy clear. It's a straightforward approval. But it sits there until the manager checks in at 9am — eight hours after it could have been resolved.",
    actions: [
      "Checks every request against licence, overtime, and policy rules immediately",
      "Auto-approves compliant requests the moment they're submitted",
      "Escalates only genuine exceptions to managers — with the reason clearly stated",
    ],
    outcome: "Compliant requests handled overnight. Managers see only what actually needs them.",
  },

  'auto-swap': {
    moment: "6:02am. Amanda called in sick. The coordinator opens the contact list.",
    narrative: "The ward needs coverage by 7am. She starts calling down the list one by one. Third call picks up. By the time it's confirmed, 44 minutes have passed and the day shift has already started short.",
    actions: [
      "Identifies the best-match internal staff against skills, certifications, and OT status",
      "Checks compliance on every candidate before making contact",
      "Sends the request and confirms the swap with both parties — in under 30 seconds",
    ],
    outcome: "The shift is covered before the coordinator's second call. Agency spend goes down.",
  },

  'physician-credentialing': {
    moment: "Dr. Patel's DEA registration expires in 11 days. Nobody flagged it.",
    narrative: "The audit is in four weeks. The admin team finds out when someone pulls the record to check an unrelated billing issue. The renewal process takes 10 business days minimum. This is the scenario that leads to a compliance incident.",
    actions: [
      "Tracks every licence and certification expiry across your entire provider roster",
      "Verifies credentials against state and federal regulatory databases automatically",
      "Sends renewal reminders at 90, 60, and 30 days — then initiates the renewal process",
    ],
    outcome: "Zero expired credentials at audit. No legal exposure. The admin team stops being a calendar.",
  },

}
```

---

### Divider Between Agents

Between each agent section in the right panel, add a visual
separator so the scroll transition feels intentional:

```tsx
// Between agent sections — NOT inside them
<div
  className="flex items-center gap-4 py-4"
  aria-hidden="true"
>
  <div className="flex-1 h-px bg-[rgba(107,63,160,0.06)]" />
  <span className="font-mono text-[10px] text-ink4 flex-shrink-0">
    {String(index + 2).padStart(2, '0')} ↓
  </span>
  <div className="flex-1 h-px bg-[rgba(107,63,160,0.06)]" />
</div>
```

This appears between agents in the right panel only —
never inside an agent's own section.

---

### Scroll Behaviour Notes

**Lenis integration:**
The global Lenis instance should already be running from layout.tsx.
The `handleAgentClick` function tries to use the Lenis instance
stored on `window.__lenis`. Make sure the Lenis setup in
`LenisProvider.tsx` assigns: `window.__lenis = lenis` after init.

```ts
// In LenisProvider.tsx — add after Lenis init
;(window as any).__lenis = lenisInstance
```

**Scroll offset for nav click:**
When clicking a left nav item, scroll the target section into view
with an offset of `-80px` to account for the sticky nav bar.
The agent's prototype card should appear near the top of viewport.

**rootMargin explanation:**
The IntersectionObserver uses `rootMargin: '-35% 0px -35% 0px'`.
This means a section only registers as "in view" when its top
edge is at 35% from the top of the viewport and its bottom
is 35% from the bottom. This creates a 30% "active zone"
in the middle of the screen.

This prevents the active agent from switching too early
during fast scrolling, and ensures the left nav only
highlights the agent the user is actually reading.

---

## Mobile Behaviour (< 1024px)

On mobile, the sticky two-column layout collapses entirely.

```
Mobile layout:
  ├── Hero section: single column, panel below text
  └── Agents section: linear scroll, no sticky panel
      ├── Horizontal scrollable chip row at top:
      │   [01 Burnout] [02 StaffAssist] [03 Scheduler]...
      │   (scrollable, active chip highlights)
      └── 7 agent sections stacked vertically:
          ├── Prototype panel (full width, height 280px)
          ├── Story content (below, no gap constraint)
          └── Divider before next agent
```

```tsx
// Hide left panel on mobile
<div className="hidden lg:block">
  <AgentSideNav ... />
</div>

// Show mobile chip nav instead
<div className="lg:hidden sticky top-[60px] z-30 bg-bg/90 backdrop-blur-sm border-b border-[--border] px-6 py-3 overflow-x-auto">
  <div className="flex gap-2 w-max">
    {workforceAgents.map((agent, i) => (
      <button
        key={agent.slug}
        onClick={() => handleAgentClick(i)}
        className={cn(
          'flex-shrink-0 text-[12px] font-medium px-3 py-1.5 rounded-[6px] font-ui transition-colors',
          i === activeAgentIndex
            ? 'bg-brand text-white'
            : 'bg-white border border-[--border] text-ink3'
        )}
      >
        {String(i + 1).padStart(2, '0')} {agent.name.split(' ')[0]}
      </button>
    ))}
  </div>
</div>
```

Mobile prototype panel height: `height: 280px` (reduced from 440px desktop).
Mobile story content: full width, no max-width constraint.

---

## File Structure

```
src/
├── app/
│   └── workforce/
│       └── page.tsx                    ← Main page component
│
├── components/
│   └── ui/
│       ├── WorkforceEcosystemVisual.tsx ← Hero right column animation
│       ├── AgentSideNav.tsx             ← Sticky left navigation
│       └── AgentStoryContent.tsx        ← Story section below prototype
│
└── data/
    └── agentStories.ts                  ← Story content for all 7 agents
```

The existing agent panel components from PLAN-05 are reused
for the prototype cards in each agent section:
`BurnoutPanel`, `StaffAssistPanel`, `SchedulerPanel`,
`EVVPanel`, `AutoApprovalPanel`, `AutoSwapPanel`, `CredentialingPanel`

Import these from their existing locations in:
`src/components/ui/panels/`

---

## Implementation Order

Build in this exact order. Do not jump ahead.

```
Step 1: Create agentStories.ts data file
Step 2: Create WorkforceEcosystemVisual.tsx (hero visual)
Step 3: Build the hero section in page.tsx
Step 4: Create AgentSideNav.tsx (left panel, no interaction yet)
Step 5: Create basic right panel with 7 agent sections and IDs
Step 6: Add IntersectionObserver to right panel
Step 7: Wire activeIndex state between left and right panels
Step 8: Add click-to-scroll on left nav items
Step 9: Create AgentStoryContent.tsx and populate all 7 stories
Step 10: Add dividers between agent sections
Step 11: Test scroll behaviour at multiple viewport widths
Step 12: Add mobile chip navigation
Step 13: Final check: reduced motion, keyboard navigation
```

---

## Checklist

### Hero
- [ ] Two-column layout on desktop, single column on mobile
- [ ] Workforce Operations pill: blue (#0284C7)
- [ ] Headline in Bricolage Grotesque 700, large
- [ ] WorkforceEcosystemVisual: 7 agent rows with cycling animation
- [ ] Active agent row pulses green, action text animates

### Left Panel
- [ ] `position: sticky`, `top: 80px`
- [ ] `height: calc(100vh - 100px)`
- [ ] Scrollbar hidden (scrollbarWidth: none)
- [ ] Active item: brand purple border-left, dark text, category visible
- [ ] Inactive item: muted text, category hidden
- [ ] Progress indicator (7 dots / progress bar) at bottom
- [ ] Hover state on inactive items
- [ ] Transition: 250ms on all active state changes

### Right Panel
- [ ] 7 agent sections, each with unique `id` and `data-agent-index`
- [ ] Each section `min-h-screen`
- [ ] Prototype card: 440px height, browser chrome, correct panel component
- [ ] Gap between prototype and story: 48px (mb-12)
- [ ] Story content: moment headline, narrative, 3 bullets, outcome pill, link
- [ ] Divider between agents: thin line with agent number

### Interaction
- [ ] IntersectionObserver: `rootMargin: '-35% 0px -35% 0px'`
- [ ] Left nav updates automatically on scroll
- [ ] Clicking left nav item scrolls to that agent section
- [ ] Lenis smooth scroll used for nav click
- [ ] `window.__lenis` assigned in LenisProvider.tsx

### Mobile
- [ ] Left panel hidden below 1024px
- [ ] Horizontal chip nav visible below 1024px, sticky
- [ ] Active chip: brand purple background
- [ ] Prototype panels: 280px height on mobile
- [ ] Story content full width on mobile

### Copy
- [ ] All 7 story narratives from agentStories.ts — use exactly as written
- [ ] No paraphrasing or "improvement" of story copy
- [ ] Outcome pills in brand purple (#6B3FA0) with white text
