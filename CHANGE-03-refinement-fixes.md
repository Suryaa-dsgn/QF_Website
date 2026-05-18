# CHANGE-03 — Homepage Refinement Fixes
## Final polish pass after structural and copy changes

> These are refinement fixes — not structural rebuilds.
> The homepage structure and copy are in good shape.
> These four fixes address visual balance, section clarity,
> and one remaining copy call.
>
> Implement these in order. Each fix is independent —
> they don't depend on each other.

---

## Fix 1 — Hero: Reduce Subhead to Two Lines

### The Problem

The hero left column currently has six stacked elements:
eyebrow pill → headline (2 lines) → rotating label →
subhead (3 lines) → CTA row.

Three lines of subhead creates visual density in the left column
before the eye reaches the product panel. The hero needs to breathe.
The first two subhead lines already cover both verticals (Workforce + Financial).
The third line (credentials) adds compliance but also adds crowding.

### What to Change

**File:** `src/components/sections/Hero.tsx`

**Current subhead (3 lines):**
```tsx
<p className="hero-subhead ...">
  Shift gaps filled before your team wakes up.<br />
  Invoices matched before your AR team starts their day.<br />
  Credentials renewed before the audit notice arrives.
</p>
```

**Updated subhead (2 lines):**
```tsx
<p className="hero-subhead ...">
  Shift gaps filled before your team wakes up.<br className="hidden sm:block" />
  {' '}Invoices matched before your AR team starts their day.
</p>
```

Remove the third line ("Credentials renewed before the audit notice arrives.")
entirely from the hero subhead.

Credentials as a vertical is still covered by:
- The rotating label ("Flagging the credential")
- The Vertical Cards section chips ("Credentialing")
- The Problem section Card 3 (Dr. Patel scenario)

It does not need to be in the hero subhead.

### Additional spacing adjustment

With one fewer line in the subhead, add slightly more
margin-bottom to the subhead so the visual gap between
the subhead and the CTA row feels intentional:

```tsx
// Before
<p className="hero-subhead ... mb-8">

// After
<p className="hero-subhead ... mb-10">
```

This gives the hero left column more air without
changing any other element.

### Mobile note

The `<br className="hidden sm:block" />` ensures the subhead
flows as a single paragraph on mobile (below 480px) and
breaks into two distinct lines on sm and above.

On mobile the full subhead reads as one flowing sentence:
"Shift gaps filled before your team wakes up. Invoices matched
before your AR team starts their day."

That's correct — natural paragraph flow on small screens.

---

## Fix 2 — Visual Separation Between Problem Section and Vertical Cards

### The Problem

The Problem section has three white cards on the grid background.
The Vertical Cards section immediately below also has two white cards
on the same grid background.

Two adjacent card-based sections with the same visual treatment
blur together when scanning. The page doesn't signal a clear shift
between "here's the problem" and "here's your path forward."

### What to Change

Apply a subtle surface treatment to the Vertical Cards section
to visually separate it from the Problem section above.

**Option A — Preferred:** Section background wash

**File:** `src/components/sections/VerticalCards.tsx`

Add a full-width section background wash using a very light
surface colour that sits above the grid but doesn't override it:

```tsx
// VerticalCards.tsx — outer section element
<section
  className="section-padding relative"
  style={{
    background: 'rgba(255, 255, 255, 0.55)',
    // Subtle white wash — the grid shows through faintly beneath it
    // Creates a "lifted" feel vs the pure grid of the Problem section
  }}
>
```

This is a 55% white overlay on the grid background.
The grid lines remain faintly visible underneath.
The section feels slightly more surfaced than the one above.

**Do NOT use a solid white or a different colour.**
The brand system specifies the grid background is always
present. This wash preserves it while creating visual
differentiation.

**Divider alternative (if Option A is too subtle):**

If the background wash doesn't create enough separation
on screen, add a full-width 1px border-top to the section:

```tsx
<section
  className="section-padding"
  style={{
    borderTop: '1px solid rgba(107, 63, 160, 0.06)',
    // Brand-tinted, very subtle — not a heavy rule
  }}
>
```

Use either the background wash OR the border-top, not both.

### Also: Increase spacing between sections

The current `section-padding` gives 120px top/bottom on desktop.
The Problem section should have slightly more bottom padding
to create breathing room before the Vertical Cards:

```tsx
// TheProblem.tsx — outer section element
<section
  className="section-padding"
  style={{ paddingBottom: '140px' }}  // slightly more than standard 120px
>
```

This creates a longer pause between the two sections
without adding any visible divider element.

---

## Fix 3 — Social Proof: Row Height Alignment

### The Problem

The second row of the Social Proof section has:
- Left: wide testimonial card (tall — long quote text)
- Right: narrow stat card showing 72hr (shorter — less content)

The stat card is shorter than the testimonial card, creating
a misaligned bottom edge on the row. The stat card's delta tag
("No rip-and-replace required") floats in the middle of the card
rather than sitting at the bottom, which looks unfinished.

### What to Change

**File:** `src/components/sections/ProofRow.tsx`
(or wherever `StatCard` and `TestimonialCard` components are defined)

**Step 1 — Grid alignment:**

Ensure both proof row grids use `items-stretch`:

```tsx
// Row 1 — three columns
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-stretch">

// Row 2 — two columns (wide testimonial + narrow stat)
<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-stretch">
```

**Step 2 — Stat card internal layout:**

The stat card must use flex column with space-between so the
delta tag is always pushed to the bottom regardless of card height:

```tsx
function StatCard({ label, value, suffix, description, delta }: StatCardProps) {
  return (
    <div className="card flex flex-col justify-between p-8">  {/* flex col + space-between */}

      {/* Top group — stays at top */}
      <div>
        <p className="text-label mb-4">{label}</p>
        <div className="mb-2 leading-none">
          <span className="text-data-xl text-ink">{value}</span>
          <span
            className="font-mono text-ink4 ml-0.5"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            {suffix}
          </span>
        </div>
        <p className="text-[14px] text-ink3 font-ui leading-snug">{description}</p>
      </div>

      {/* Bottom group — always at bottom via mt-auto */}
      <div className="mt-auto pt-4">
        <span className="inline-flex items-center text-[12px] font-mono text-[#16A34A] bg-[#D1FAE5] px-2.5 py-1 rounded-[6px]">
          {delta}
        </span>
      </div>

    </div>
  )
}
```

**Step 3 — Testimonial card internal layout:**

The testimonial card must also use flex column with space-between
so the attribution row is always pushed to the bottom:

```tsx
function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div
      className="rounded-[16px] p-8 flex flex-col justify-between"  {/* flex col + space-between */}
      style={{
        background: 'rgba(107,63,160,0.04)',
        border: '1px solid rgba(107,63,160,0.10)',
      }}
    >
      {/* Quote — stays at top */}
      <p className="text-[15px] text-ink font-ui leading-[1.65]">
        "{quote}"
      </p>

      {/* Attribution — always at bottom via mt-6 (fixed gap, not auto) */}
      <div className="flex items-center gap-3 mt-6">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold flex-shrink-0"
          style={{ background: 'rgba(107,63,160,0.10)', color: '#6B3FA0' }}
        >
          {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <div>
          <p className="text-[14px] font-semibold text-ink font-ui leading-none mb-1">{name}</p>
          <p className="text-[12px] text-ink4 font-ui leading-none">{role}</p>
        </div>
      </div>

    </div>
  )
}
```

**Result:** Both rows now have cards that grow to the same height
(via `items-stretch`), with content anchored to the top and
bottom edges of each card regardless of height.

---

## Fix 4 — Industries Bento: Callout Line

### The Decision

The bento callout currently reads:
```
Deployed in weeks. Not quarters.
```

This is the one remaining "contrast structure" cliché on the site.
In the bento context it reads as a punchy callout, which is more
forgivable than if it were a section headline. However, updating
it makes the page fully consistent with the dry, specific voice
used everywhere else.

### What to Change

**File:** `src/components/sections/Industries.tsx`
(or wherever the Industries bento callout is rendered)

Find the callout headline and description inside the bento:

**Current:**
```tsx
<p className="font-semibold text-ink ...">
  Deployed in weeks. <span className="italic text-brand">Not quarters.</span>
</p>
<p className="text-ink3 text-[13px] ...">
  Don't see your industry? We're likely building it —
  or we can scope it together.
</p>
```

**Updated headline:**
```tsx
<p className="font-semibold text-ink ...">
  Standard environments live in 72 hours.
</p>
```

Remove the italic brand-coloured "Not quarters." completely.
The new line is specific (72 hours), honest, and consistent
with the Deployment Target stat in the Social Proof section.

**Keep the sub-line unchanged:**
```tsx
<p className="text-ink3 text-[13px] ...">
  Don't see your industry? We're likely building it —
  or we can scope it together.
</p>
```

This line is honest and inviting. Do not change it.

**Keep the CTA button unchanged:**
```tsx
<button ...>Talk to us →</button>
```

---

## Verification Checks

After implementing all four fixes, check each one:

### Fix 1 — Hero subhead
- [ ] Subhead shows exactly 2 lines: fill + invoices only
- [ ] Third line (credentials) removed from hero subhead
- [ ] `mb-10` on subhead (slightly more than before)
- [ ] Mobile: subhead flows as single paragraph (no forced break)
- [ ] Desktop (sm+): single `<br />` creates two-line structure
- [ ] Hero left column feels less dense overall

### Fix 2 — Problem → Vertical Cards separation
- [ ] Vertical Cards section has background wash (`rgba(255,255,255,0.55)`) OR border-top (`rgba(107,63,160,0.06)`) — not both
- [ ] Problem section has `paddingBottom: '140px'`
- [ ] Scanning the page, the two sections feel visually distinct
- [ ] Grid texture still visible in Vertical Cards section (not solid white)

### Fix 3 — Social Proof row alignment
- [ ] Both grid rows have `items-stretch`
- [ ] All stat cards use `flex flex-col justify-between`
- [ ] All testimonial cards use `flex flex-col justify-between`
- [ ] Delta tags are at the bottom of stat cards (`mt-auto`)
- [ ] Attribution rows are at the bottom of testimonial cards (`mt-6`)
- [ ] Row 1: stat | testimonial | stat — all same height ✓
- [ ] Row 2: wide testimonial | narrow stat — both same height ✓
- [ ] No floating content in the middle of any card

### Fix 4 — Industries bento callout
- [ ] Callout headline: "Standard environments live in 72 hours."
- [ ] No italic text in callout headline
- [ ] No brand colour accent in callout headline
- [ ] "Don't see your industry?" sub-line unchanged
- [ ] "Talk to us →" button unchanged

---

## Final Site-Wide Checks

Run these after all fixes are applied:

```bash
# Check for remaining banned phrases
grep -r "operational context" src/
grep -r "what humans do best" src/
grep -r "zero disruption" src/
grep -r "Not quarters" src/
grep -r "deployed in weeks" src/  # lowercase check

# Should all return zero results
```

Also manually verify:
- [ ] No exclamation marks in any visible copy (nav, hero, sections, CTA, footer, about page)
- [ ] All operational numbers (28s, 94%, 72hr, 30+, 15+) render in Geist Mono font
- [ ] All section headlines render in Bricolage Grotesque at correct weights (700–800)
- [ ] Trust bar placeholder names still present (to be replaced with real logos)
- [ ] Social proof TODO comments present above testimonial cards
- [ ] Team section avatar circles are neutral grey (#E5E7EB), not brand purple
