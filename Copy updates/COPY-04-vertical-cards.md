# COPY-04 — Two Vertical Cards
## Component: `src/components/sections/VerticalCards.tsx`

---

## Section Job

Give the buyer a clear fork in the road.

After The Problem section, they recognise their world.
Now they need to know: which door is mine?

This section must be fast to scan. Two options. Clear outcomes.
Links to depth. No over-explanation.

---

## Section Label

```
OUR SOLUTIONS
```

Style: 10px, Geist 600, uppercase, letter-spacing 0.07em, color #A0A0A0.
Centered.

---

## Section Headline

```
One platform. Two operational verticals.
Everything connected.
```

Style: Bricolage Grotesque 700, clamp(26px, 3.5vw, 42px),
letter-spacing -0.03em, line-height 1.1, color #0A0A0A.
Text-align: center. Max-width: 520px. Margin: 0 auto.

**Do not add colour accent or italic to any part of this headline.**
It is a structural statement. It should feel like architecture, not a tagline.

The line break falls after "verticals." on desktop:
```
One platform. Two operational verticals.
Everything connected.
```

On mobile, let it wrap naturally — no forced breaks.

---

## Workforce Operations Card

### Vertical pill
```
WORKFORCE OPERATIONS
```
Pill colour: #0284C7 (blue)
Pill background: rgba(2,132,199,0.08)
Pill border: rgba(2,132,199,0.15)
Style: 10px, Geist 600, uppercase, letter-spacing 0.06em,
padding: 3px 10px, border-radius: 999px, display: inline-block.

### Card headline
```
Your coordinators shouldn't spend
their mornings on the phone.
```
Style: Bricolage Grotesque 700, 22px, letter-spacing -0.025em,
line-height 1.2, color #0A0A0A.

**Why this construction:**
Naming what the team *shouldn't* be doing signals that we understand
their frustration, not just their workflow. It's buyer-empathetic
without being sentimental.

### One-liner body
```
Seven agents that handle every shift, credential,
and staffing decision — so your team doesn't have to.
```
Style: Geist 400, 15px, color #6B6B6B, line-height 1.65,
max-width: 340px.

**The em dash (—) is doing specific work here.**
"So your team doesn't have to" is the consequence of the automation —
placed after the em dash, it lands harder than if it were woven in.

### Divider
1px solid rgba(107,63,160,0.07). Full width.

### Capability chips (in this order)
```
Shift Coverage
Credentialing
Auto-Approval
Visit Verification
Burnout Prevention
```
Style: Geist 500, 12px, color #3D3D3D, background #F5F5F7,
border: 1px solid rgba(0,0,0,0.06), padding: 4px 10px,
border-radius: 6px, flex-wrap: wrap, gap: 6px.

**These chips are breadcrumbs, not a feature list.**
They tease what's inside the /workforce page without explaining
each one. A CIO seeing "Credentialing" and "Visit Verification"
immediately knows this is built for healthcare staffing — without
reading a single sentence about it.

### Bottom row

Left:
```
7 agents
```
Style: Geist Mono 400, 13px, color #A0A0A0.

Right (link):
```
Explore Workforce →
```
Style: Geist 500, 14px, color: brand purple (#6B3FA0).
Arrow icon: Lucide ArrowRight, 13px, slides 4px right on hover.
href: /workforce

---

## Financial Operations Card

### Vertical pill
```
FINANCIAL OPERATIONS
```
Pill colour: #059669 (green)
Pill background: rgba(5,150,105,0.08)
Pill border: rgba(5,150,105,0.15)
Same pill style as Workforce.

### Card headline
```
Your AR team shouldn't be
your reconciliation team.
```
Style: same as Workforce headline.

**Why this construction:**
"AR team" and "reconciliation team" are the same people doing two
different jobs. Naming that tension is more powerful than saying
"reduce manual reconciliation." The reader fills in the consequence.

### One-liner body
```
Four agents across your full receivables stack —
matching, collecting, and enforcing contracts automatically.
```
Style: same as Workforce body.

**"Receivables stack" is deliberate.**
It's the language a CFO or VP Finance uses internally.
It signals we know their world without pointing at it.

### Divider
Same as Workforce.

### Capability chips (in this order)
```
AP/AR Matching
Payment Collection
Contract Compliance
Deal Qualification
```
Same chip style as Workforce.

### Bottom row

Left:
```
4 agents
```
Style: Geist Mono 400, 13px, color #A0A0A0.

Right (link):
```
Explore Financial →
```
href: /financial
Same style and hover behaviour as Workforce.

---

## Copy Intent Notes

**Both card headlines follow the same pattern:**
"Your [team] shouldn't [be doing this thing they currently do]."

This pattern works because:
1. It acknowledges the current reality without criticising the company
2. It implies the product handles it without claiming to fix everything
3. It's emotionally intelligent — not a feature pitch, a posture

**The chips communicate vertical specificity without body copy.**
A compliance team checking the site will see "Credentialing" and
"Visit Verification" and immediately understand the target.
A CFO will see "AP/AR Matching" and "Contract Compliance" and do the same.
No explanation needed. That's the goal.
