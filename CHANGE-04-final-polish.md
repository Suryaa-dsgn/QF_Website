# CHANGE-04 — Final Polish Fixes
## Small remaining changes after refinement pass

> These are the last remaining items. All are small.
> None require structural changes.
> Implement in order. Each fix is independent.

---

## Fix 1 — Social Proof: Shorten Headline

### The Problem

The headline "What efficient operations look like — and what we build toward."
renders across 3 lines at standard desktop viewport widths.

For a section whose primary content is large proof numbers,
a 3-line headline makes the section feel top-heavy before
the numbers appear. The second clause ("and what we build toward")
is already covered by the framing note directly below the headline.
It's doing double duty — and losing impact as a result.

### What to Change

**File:** `src/components/sections/ProofRow.tsx`

Find the section headline and update it:

```tsx
// Before
<h2 ...>
  What efficient operations look like —
  <br className="hidden md:block" />
  and what we build toward.
</h2>

// After
<h2 ...>
  What efficient operations
  <br className="hidden md:block" />
  look like.
</h2>
```

The full updated headline copy:
```
What efficient operations
look like.
```

Style: unchanged — Bricolage Grotesque 700,
clamp(26px, 3.5vw, 44px), letter-spacing -0.03em, line-height 1.1.

The framing note directly below handles the "projected benchmarks"
context. The headline no longer needs to carry that qualifier.
Shorter headline = more confident = numbers land harder.

---

## Fix 2 — Hero: Secondary CTA Copy

### The Problem

The secondary ghost CTA currently reads "See it in action".
This phrase is used widely across B2B SaaS as a default
ghost button label. It's not wrong but it's generic enough
to be worth updating.

### What to Change

**File:** `src/components/sections/Hero.tsx`

Find the secondary CTA button text:

```tsx
// Before
<Link href="/demo#video" className="... btn-ghost group">
  See it in action
  <ArrowRight size={15} className="arrow-icon ..." />
</Link>

// After
<Link href="/demo#video" className="... btn-ghost group">
  Watch it run
  <ArrowRight size={15} className="arrow-icon ..." />
</Link>
```

Updated text: `Watch it run`

**Why this works better:**
"Watch it run" implies the product is already running —
which connects directly to the hero panel showing live
agent activity. "See it in action" is passive. "Watch it run"
implies there's something happening worth watching.

No arrow change needed. The existing arrow slide
micro-interaction on hover stays as is.

---

## Fix 3 — Hero: Headline Clamp Adjustment

### The Problem

At mid-range viewport widths (768px–1100px), the hero headline
"When operations break, they're already handled." may render
across 3 lines instead of the intended 2.

A 3-line headline in the hero left column increases the visual
density of the left column and pushes the CTAs further down.

### How to Check First

Before making this change, open the live site and test at
these specific viewport widths using browser dev tools:
- 768px
- 900px
- 1024px
- 1280px

**If the headline renders as 2 lines at 1024px and above:**
No change needed. The 3-line appearance in the screenshot
was a viewport artefact. Do not change the clamp.

**If the headline renders as 3 lines at 1024px or above:**
Apply the fix below.

### The Fix (conditional — only if confirmed needed)

**File:** `src/components/sections/Hero.tsx`

Find the H1 headline font size:

```tsx
// Before
style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}

// After
style={{ fontSize: 'clamp(40px, 5.2vw, 72px)' }}
```

This reduces the minimum and middle clamp values slightly,
giving the headline more room to sit on 2 lines at mid-widths
without reducing the maximum size at full desktop.

**Do not change** the font weight (800), letter-spacing (-0.04em),
or line-height (1.0). Only the clamp values change.

---

## Fix 4 — How It Works: Mobile Step Descriptions

### The Problem

On mobile (375px–480px), the three How It Works steps each render as:

```
[Product panel — full width]
[Step number — large]
[Step title — 1-2 lines]
[Step description — 2-3 sentences]
[Detail line]
```

Three blocks of this length in sequence creates the longest
scroll experience on the entire page for mobile users.
C-suite buyers checking the site on mobile will skip this section.

### What to Change

**File:** `src/components/sections/HowItWorks.tsx`

On mobile viewports (below `md`, 768px), hide the second sentence
of each step description. The step title and first sentence carry
the meaning. The second sentence adds nuance that desktop readers
benefit from but mobile readers don't need to scroll through.

Use a `<span>` wrapper with responsive visibility:

```tsx
// Step 1 description
<p className="text-[15px] text-ink3 font-ui leading-[1.7] max-w-[340px]">
  One call. We look at your actual workflows — where the gaps are,
  what your team is doing manually, what systems you're already running.
  {/* Second sentence hidden on mobile */}
  <span className="hidden md:inline">
    {' '}No lengthy discovery phase. No consultants.
  </span>
</p>
```

Wait — Step 1 description was already trimmed to 2 sentences in CHANGE-02.
Apply this pattern only to sentences beyond the first in each step:

```tsx
// Step 1 — first sentence always visible, second hidden on mobile
<p ...>
  One call. We look at your actual workflows — where the gaps are,
  what your team is doing manually, what systems you're already running.
</p>
// (Already 1 sentence after CHANGE-02 trim — no change needed for Step 1)

// Step 2 — first sentence always, second hidden on mobile
<p ...>
  Your staff records, shift history, contract terms, and compliance
  rules feed the agents directly.{' '}
  <span className="hidden md:inline">
    The result behaves like your best operator — not a generic automation.
  </span>
</p>

// Step 3 — first sentence always, remaining hidden on mobile
<p ...>
  From day one, your team has full visibility into every decision
  the agents make.{' '}
  <span className="hidden md:inline">
    You set the rules. The agents do the work.
  </span>
</p>
```

**Result on mobile:** Each step shows the title + first sentence only.
Tight. Scannable. The detail lines still appear beneath each step.

**Result on desktop (md+):** Full descriptions visible. No change.

### Also on mobile — hide the detail lines

The detail lines ("Works with what you already use." /
"No manual scripting. No custom dev sprint." /
"Full audit trail. Every action logged.") are useful
on desktop where they sit above the product panels.

On mobile the panels are stacked above the copy, so
the detail lines lose their visual relationship to the panels.
Hide them on mobile:

```tsx
// Each detail line
<p
  className="hidden md:block text-[13px] text-ink4 font-ui font-medium"
  style={{ ... }}
>
  Works with what you already use.
</p>
```

Apply `hidden md:block` to all three detail lines.

---

## Verification Checklist

### Fix 1 — Social Proof headline
- [ ] Headline reads: "What efficient operations / look like."
- [ ] "and what we build toward." removed completely
- [ ] Renders as 2 lines on desktop
- [ ] Framing note still present below headline (unchanged)

### Fix 2 — Hero secondary CTA
- [ ] Secondary CTA text: "Watch it run" (not "See it in action")
- [ ] Arrow icon unchanged
- [ ] Arrow slide micro-interaction on hover still works
- [ ] href unchanged (/demo#video or equivalent)

### Fix 3 — Hero headline clamp (conditional)
- [ ] Checked at 768px, 900px, 1024px, 1280px in dev tools
- [ ] If 2 lines at 1024px: no change made
- [ ] If 3 lines at 1024px: clamp updated to (40px, 5.2vw, 72px)

### Fix 4 — How It Works mobile
- [ ] Step 2 second sentence hidden below md (768px)
- [ ] Step 3 second + third sentences hidden below md
- [ ] All three detail lines hidden below md
- [ ] Mobile (375px): each step shows title + 1 sentence only
- [ ] Desktop (768px+): full descriptions and detail lines visible
- [ ] Check on 375px, 480px, 768px viewports

---

## Final Site-Wide Verification

After all CHANGE files (01 through 04) are applied,
do one final pass with these checks:

```bash
# Banned phrases — should all return zero results
grep -rn "operational context" src/
grep -rn "what humans do best" src/
grep -rn "zero disruption" src/
grep -rn "Not quarters" src/
grep -rn "See it in action" src/
grep -rn "Built by operators" src/
grep -rn "deployed in weeks" src/
```

Manual checks:
- [ ] No exclamation marks in any user-facing copy
- [ ] Hero subhead: 2 lines only (shift + invoices)
- [ ] Social Proof headline: 2 lines ("What efficient operations / look like.")
- [ ] Social Proof framing note present and visible
- [ ] Stat card delta tags at bottom of cards (mt-auto)
- [ ] Testimonial attribution at bottom of cards
- [ ] Industries bento: "Standard environments live in 72 hours."
- [ ] About page: no "Built by operators, for operators"
- [ ] About page: no "what humans do best"
- [ ] About page: team avatars are grey (#E5E7EB), not brand purple
- [ ] Footer: "Operations automation for healthcare, finance, and compliance-heavy industries."
- [ ] All proof numbers in Geist Mono font
- [ ] All section headlines in Bricolage Grotesque 700–800
