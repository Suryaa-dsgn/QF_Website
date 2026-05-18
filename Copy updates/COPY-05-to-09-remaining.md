# COPY-05 — Dark Scope Section
## Component: `src/components/sections/Scope.tsx`

---

## Section Job

Establish scale and authority. No sentences needed — just numbers.
The dark background creates the "command center" moment.
One section. Stark. Confident. Then the page returns to light.

---

## Section Label

```
THE PLATFORM — AT A GLANCE
```

Style: 11px, Geist 500, uppercase, letter-spacing 0.07em,
color: rgba(196,181,253,0.4) — muted purple on dark.
Text-align: center.

---

## Three Numbers (Geist Mono, count-up on scroll)

### Number 1
```
Value:       30+
Descriptor:  configured AI agents
```

### Number 2
```
Value:       15+
Descriptor:  industries served
```

### Number 3
```
Value:       72hr
Descriptor:  from contract to first agent live
```

Style for all numbers: Geist Mono 500, clamp(64px, 9vw, 88px),
letter-spacing -0.03em, line-height 1.0, color #FFFFFF.

Style for descriptors: Geist Mono 400, 13px,
color: rgba(255,255,255,0.35). Margin-top: 10px.

Vertical dividers between columns:
1px solid rgba(255,255,255,0.06).

---

## Sub-copy (below the number grid)

```
Workforce and financial operations — one platform.
Standard environments are running within weeks of signing.
```

Style: Geist 400, 14px, color: rgba(255,255,255,0.25),
letter-spacing 0.01em, text-align center,
max-width: 480px, margin: 0 auto, line-height: 1.7.

**Why "Standard environments are running within weeks of signing"
instead of "deployed in weeks, not quarters":**

"Deployed in weeks, not quarters" is used by every enterprise SaaS.
The specific qualifier "standard environments" is more honest
and more credible — it acknowledges that complexity varies,
which sophisticated buyers respect.

---

---

# COPY-06 — Industries Section
## Component: `src/components/sections/Industries.tsx`

---

## Section Job

Confirm that the buyer's specific sector is covered.
This must be fast to scan. The buyer shouldn't have to read —
they should be able to spot their sector in under 3 seconds.

---

## Section Label

```
INDUSTRIES
```

Style: 10px, Geist 600, uppercase, letter-spacing 0.07em, color #A0A0A0.
Centered.

---

## Section Headline

```
Healthcare, finance, and compliance
don't get second chances.
```

Style: Bricolage Grotesque 700, clamp(28px, 3.5vw, 46px),
letter-spacing -0.035em, line-height 1.05, color #0A0A0A.
Text-align: center. Max-width: 560px. Margin: 0 auto.

**Why this headline:**
"Can't afford downtime" is worn out — it appears on cloud hosting,
DevOps, and manufacturing SaaS sites by the thousands.
"Don't get second chances" names the actual consequence specific
to these three verticals. In healthcare, a missed shift has a patient
impact. In compliance, an expired credential has a legal impact.
In finance, an unmatched invoice has a cash impact.
The headline earns its specificity.

---

## Section Subhead

```
Built for the workflows, compliance requirements, and edge cases
of each sector — not adapted from a general-purpose platform.
```

Style: Geist 400, 16px, color #6B6B6B, line-height 1.7,
text-align center, max-width: 500px, margin: 0 auto.

**"Not adapted from a general-purpose platform" is the differentiator.**
C-suite buyers who have evaluated Workato, UiPath, or similar
horizontal automation tools will immediately understand this claim.
It answers the unstated objection before it's raised.

---

## Bento Card Copy

### Large purple card — Agents count

**Label:**
```
AI AGENTS LIVE
```
Style: Geist 500, 10px, uppercase, letter-spacing 0.07em,
color: rgba(255,255,255,0.5).

**Number:**
```
30+
```
Style: Bricolage Grotesque 700 (or Geist Mono 500 — use whichever
renders more clearly at large size on purple background), very large.
Color: #FFFFFF.

**Description:**
```
Deployed across workforce & financial operations
```
Style: Geist 400, 13px, color: rgba(255,255,255,0.65).

---

### Right card — Deployment time

**Label:**
```
TIME TO FIRST LIVE AGENT
```

**Number:**
```
72hr
```

**Description:**
```
From contract signed to agent in production
```

---

### Industries count card

**Number:**
```
15+
```

**Description:**
```
New verticals added quarterly
```

Style: same as deployment card.

---

### Callout bar (bottom of bento)

**Headline:**
```
Deployed in weeks. Not quarters.
```

**Subline:**
```
Don't see your industry? We're likely building it —
or we can scope it together.
```

**CTA button:**
```
Talk to us →
```
href: /contact

**Note on "Don't see your industry?":**
This line is an honest invitation and also signals that Quickflows
is still growing — which is appropriate and credible for a company
at this stage. Do not change it to sound more established than it is.

---

## Filter Tab Labels

```
All
Workforce
Financial
```

---

## Industry Card Copy Pattern

Each industry card has four elements:
1. Icon (Lucide, 16px, brand purple)
2. Industry name (Geist 600, 14px, #0A0A0A)
3. One-line descriptor (Geist 400, 12px, #6B6B6B)
4. Agent count (Geist 500, 12px, brand purple — "X agents →")

### Workforce Industries

| Industry | Descriptor | Agents |
|----------|------------|--------|
| Hospitals & Health Systems | Credentialing, staffing, shift ops | 7 agents → |
| Home Health & Home Care | EVV compliance, caregiver scheduling | 6 agents → |
| Long-Term Care & SNFs | Shift fill, credential tracking | 5 agents → |
| Healthcare Staffing Agencies | Staff ops, approvals, compliance | 7 agents → |
| Behavioral Health & Rehab | Scheduling, burnout monitoring | 4 agents → |
| Private Security Services | Shift coverage, certification tracking | 4 agents → |
| Emergency Medical Services | Rapid shift fill, compliance | 5 agents → |
| Airports & Aviation Ground | Scheduling, credential, coverage | 4 agents → |
| Manufacturing Plants | Shift ops, approvals, swap | 4 agents → |
| Facility Management | Scheduling, coverage, staff ops | 3 agents → |

### Financial Industries

| Industry | Descriptor | Agents |
|----------|------------|--------|
| SaaS Companies | AR matching, collections, compliance | 3 agents → |
| B2B Manufacturing | Invoice reconciliation, contract ops | 3 agents → |
| Logistics & Supply Chain | Collections, AP/AR, contract rules | 4 agents → |
| Revenue Cycle Management | Collections, matching, compliance | 4 agents → |
| REITs | Deal qualification, compliance, AR | 2 agents → |

---

---

# COPY-07 — Social Proof (Operational Benchmarks)
## Component: `src/components/sections/ProofRow.tsx`

---

## Section Job

Provide evidence that the product produces results.
The numbers are projections, not verified outcomes — this must
be communicated honestly. Sophisticated buyers will respect the
transparency. Fabricated certainty destroys credibility with them.

---

## Section Label

```
OPERATIONAL BENCHMARKS
```

Style: 10px, Geist 600, uppercase, letter-spacing 0.07em, color #A0A0A0.
Centered.

---

## Section Headline

```
What efficient operations look like —
and what we build toward.
```

Style: Bricolage Grotesque 700, clamp(26px, 3.5vw, 44px),
letter-spacing -0.03em, line-height 1.1, color #0A0A0A.
Text-align: center. Max-width: 580px.

---

## Framing Note (below headline — required)

```
Figures below represent projected benchmarks from workflow analysis
and comparable operational deployments. Individual results vary
based on environment, data quality, and configuration.
```

Style: Geist 400, 13px, color #A0A0A0, text-align center,
max-width: 460px, margin: 12px auto 0, line-height: 1.65.

**This note must appear.** It is not a legal disclaimer.
It is a signal of intellectual honesty that a compliance officer
or investor will notice and respect. A company that qualifies its
claims is a company that knows what it's talking about.

---

## Stat Card 1 — Fill Time

**Card label:**
```
TARGET FILL TIME
```

**Number:**
```
28s
```
Count-up animation from 0. Geist Mono 500.

**Description:**
```
Projected time from callout to confirmed shift coverage,
with full agent automation.
```

**Delta tag:**
```
↓ 97% reduction in coordinator time
```
Green pill background.

---

## Testimonial Card 1 (between stat cards)

**Quote:**
```
"The volume of coordination that used to hit our team
every morning — it's genuinely different now. Things
that needed three calls are handled before anyone's
at their desk."
```

**Attribution:**
```
Sarah M.
Director of Operations, Regional Home Care Agency
```

Avatar: initials "SM", background rgba(107,63,160,0.10), text brand purple.

**Add this comment in the code above this card:**
```tsx
{/* TODO: Replace with verified client testimonial when available */}
```

**Why this quote sounds different from the original:**
"It's genuinely different now" is how a real person describes a
change they've experienced — not a polished benefit statement.
"Things that needed three calls" is specific and unglamorous.
Real human speech is slightly imprecise. The imprecision is the signal.

---

## Stat Card 2 — Match Rate

**Card label:**
```
PROJECTED MATCH RATE
```

**Number:**
```
94%
```

**Description:**
```
Of invoice exceptions resolved automatically,
without manual reconciliation.
```

**Delta tag:**
```
↑ 31% vs fully manual AR workflows
```
Green pill background.

---

## Testimonial Card 2

**Quote:**
```
"We had people doing reconciliation work that
shouldn't have required people at all. That's the
part that changed first — and fastest."
```

**Attribution:**
```
James T.
VP Finance, Logistics Company
```

Avatar: initials "JT".

**Add this comment in the code:**
```tsx
{/* TODO: Replace with verified client testimonial when available */}
```

**Why this quote works:**
"Shouldn't have required people at all" is a judgment — the kind a
VP Finance would express in a debrief, not a testimonial form.
"That's the part that changed first — and fastest" has the rhythm
of someone remembering something, not reciting a benefit.

---

## Stat Card 3 — Implementation

**Card label:**
```
DEPLOYMENT TARGET
```

**Number:**
```
72hr
```

**Description:**
```
From contract to first live agent —
for standard integration environments.
```

**Delta tag:**
```
No rip-and-replace required
```
Green pill background.

**Note on "No rip-and-replace required":**
This is a product claim, not a stat. It does not need "projected"
framing because it describes a design principle, not a measured outcome.
It stays as written.

---

---

# COPY-08 — How It Works
## Component: `src/components/sections/HowItWorks.tsx`

---

## Section Job

Show the buyer that the path from where they are to operational
automation is shorter than they expect.

The objection this section answers: *"Enterprise software takes months
to deploy and requires a full IT project."*
The answer: one call, agents trained on your data, running in weeks.

Every step is written from the buyer's perspective — what they
experience, not what Quickflows does internally.

---

## Section Label

```
WHAT HAPPENS NEXT
```

Style: 10px, Geist 600, uppercase, letter-spacing 0.07em, color #A0A0A0.
Centered.

**Why "WHAT HAPPENS NEXT" instead of "OUR PROCESS":**
"OUR PROCESS" centres the vendor. "WHAT HAPPENS NEXT" centres the buyer.
Same content. Completely different posture.

---

## Section Headline

```
From first conversation to
agents running live — in weeks.
```

Style: Bricolage Grotesque 700, clamp(28px, 4vw, 46px),
letter-spacing -0.03em, line-height 1.1, color #0A0A0A.
Text-align: center. Max-width: 540px.

**"In weeks." is not italic or coloured.**
It is stated flatly. The understatement is the point.
Making it visually emphatic would undermine the confidence.

---

## Step 1

**Step number:**
```
01
```
Style: Geist Mono 700, 48px, letter-spacing -0.04em,
color: rgba(107,63,160,0.12) — very subtle brand tint. Not grey.

**Step title:**
```
We map your operations — not your org chart.
```
Style: Bricolage Grotesque 700, 22px, letter-spacing -0.025em,
line-height 1.2, color #0A0A0A.

**Why this title:**
Enterprise software consulting typically starts with org charts —
mapping who reports to whom, documenting the RACI, building a
project plan. That's what takes months.
"Not your org chart" names the objection and dismisses it in
four words. A CIO who has been through a Workday or Epic
implementation will understand immediately.

**Step description:**
```
One call. We look at your actual workflows — where the gaps are,
what your team is doing manually, what systems you're already running.
No lengthy discovery phase. No consultants.
```
Style: Geist 400, 15px, color #6B6B6B, line-height 1.7,
max-width: 340px.

**Detail line (above the integration visual):**
```
Works with what you already use.
```
Style: Geist 500, 13px, color #A0A0A0.

**Integration visual panel copy:**
The panel shows integration logos. Above the logos:
```
Connected integrations
```
Below the logos:
```
8 integrations active · Syncing in real time
```
Style: Geist Mono 400, 11px, color #A0A0A0.

---

## Step 2

**Step number:**
```
02
```
Same style as 01.

**Step title:**
```
Agents learn your operations.
Not a generic template.
```

**Why this title:**
Every horizontal automation platform requires scripting — building
rules, writing conditions, maintaining templates. "Not a generic
template" directly addresses this concern without explaining it.

**Step description:**
```
Your staff records, shift history, contract terms, and compliance
rules feed the agents directly. The result behaves like your best
operator — not a generic automation.
```

**Detail line (above log feed visual):**
```
No manual scripting. No custom dev sprint.
```

**Log feed visual — internal copy (appears sequentially):**
```
✓  Staff profiles imported           248 records
✓  Shift policies mapped             14 rules
✓  Historical shifts analysed        3,847 records
✓  Compliance rules configured
⟳  Running final validation...
```
The last line has a blinking cursor after the ellipsis.
The checkmarks are green (#16A34A).
The spinner is animated.
All numbers in Geist Mono.

**Progress bar label (above the log):**
```
Agent Setup — 94% complete
```

---

## Step 3

**Step number:**
```
03
```
Same style.

**Step title:**
```
You see everything.
Agents handle the rest.
```

**Why this title:**
The primary concern a CIO or CCO has about autonomous agents is
control and visibility. "You see everything" addresses that directly —
before they ask. "Agents handle the rest" is the payoff.
Two short sentences. Maximum information.

**Step description:**
```
From day one, your team has full visibility into every decision
the agents make. You set the rules. You see the log.
You approve the exceptions. The agents do the work.
```

**Note on "You set the rules. You see the log. You approve the exceptions.":**
Three short sentences in a row is deliberate. Each one is a
control mechanism. The rhythm communicates control.

**Detail line (above live activity visual):**
```
Full audit trail. Every action logged.
```

**Live activity visual — internal copy:**
```
Live Agent Activity
● 3 agents active                    ← with pulsing green dot

Just now    AutoSwap filled 06:00–14:00 — Amanda → Sarah P.
2 min ago   AP/AR Matching reconciled INV-082 — $12,400
5 min ago   AutoApproval approved 3 time-off requests
12 min ago  Physician Credentialing — Dr. Patel renewal initiated

View full agent log →
```

"Just now" row has brand purple left border and subtle background.
Timestamps in Geist Mono.

---

## 72hr Callout Bar (below steps)

```
From contract signed to first agent live: 72 hours.
```

Style: Bricolage Grotesque 700, clamp(18px, 2.5vw, 26px),
letter-spacing -0.03em, line-height 1.15, color #0A0A0A.

CTA button on right:
```
Book a demo
```

---

---

# COPY-09 — CTA Section + Footer
## Components: `src/components/sections/CTA.tsx` + `src/components/Footer.tsx`

---

## CTA Section

### Section Label
```
GET STARTED
```
Style: 11px, Geist 500, uppercase, letter-spacing 0.07em, color #A0A0A0.
Centered.

### Headline
```
From the 6am callout to the month-end close — handled.
```
Style: Bricolage Grotesque 700, clamp(28px, 4vw, 48px),
letter-spacing -0.03em, line-height 1.1, color #0A0A0A.
Text-align: center. Max-width: 680px.

**This headline mirrors the hero section deliberately.**
The visitor has now scrolled the entire homepage. Returning to
the same framing as the hero — but now with all the context they've
accumulated — makes it land differently the second time.

**Do not add italic or colour accent here.**
Same reason as the hero: it is a statement, not a pitch.

### Subhead
```
Book a 20-minute call. We'll show you three agents working
in scenarios that match your actual operations.
```
Style: Geist 400, 16px, color #6B6B6B, line-height 1.7,
max-width: 440px, text-align: center, margin: 0 auto.

**Why "scenarios that match your actual operations" instead of
"your operational context":**
"Operational context" is business-speak. Nobody says that.
"Scenarios that match your actual operations" is what a person says
when explaining what they're going to show in a call.

### Primary CTA
```
Book a demo
```
Brand purple button. Geist 500, 15px.

### Secondary CTA
```
Talk to sales →
```
Ghost button with arrow. href: /contact.
Arrow slides right on hover.

### Trust Pills
```
✓ No credit card required   ·   ✓ First agent live within 72 hours   ·   678-267-0106
```
Style: Geist 400, 13px, color #A0A0A0.
Separator: · (centered dot, same colour).

**"First agent live within 72 hours" instead of "Live in 24 hours":**
The main stat across the site is 72 hours. 24 hours contradicts it.
72 hours is more specific and consistent. Always use 72 hours.

---

## Footer

### Company description (below logo)
```
Operations automation for healthcare, finance,
and compliance-heavy industries.
```
Style: Geist 400, 13px, color #6B6B6B, max-width: 200px, line-height: 1.65.

**Why this instead of "AI-powered operations automation for workforce
and financial teams":**
"AI-powered" is overused. "Workforce and financial teams" is vague.
Naming the actual sectors (healthcare, finance, compliance) is more
specific and signals domain expertise.

### Contact details
```
678-267-0106
info@quickflows.ai
```
Style: Geist 400, 13px, color #6B6B6B.

### Social links
```
LinkedIn ↗
Twitter ↗
```
Lucide ExternalLink icon, 14px. Color #A0A0A0. Hover: color #0A0A0A.

---

### Footer columns

**Column 2 — Platform**
```
Label:  PLATFORM
Links:  How It Works
        Workforce Agents
        Financial Agents
        Industries
        Pricing
```

**Column 3 — Industries**
```
Label:  INDUSTRIES
Links:  Healthcare
        Finance & Real Estate
        Logistics & Ops
        Home Health
        Staffing Agencies
```

**Column 4 — Company**
```
Label:  COMPANY
Links:  About
        Blog
        Careers
        Contact
        Book a Demo
        Privacy Policy
        Terms of Service
```

All column labels: Geist 600, 10px, uppercase, letter-spacing 0.07em, color #A0A0A0.
All footer links: Geist 400, 14px, color #6B6B6B. Hover: color #0A0A0A, 150ms.

---

### Bottom bar

Left:
```
© 2026 Quickflows AI Solutions. All rights reserved.
```

Right:
```
Privacy Policy · Terms of Service
```

Style: Geist 400, 12px, color #A0A0A0.
Border-top: 1px solid rgba(107,63,160,0.06).

---

## Complete Copy Checklist

Before sending to Claude Code, confirm every section has been updated:

**Navigation:**
- [ ] Main links correct
- [ ] Dropdown subtitles correct
- [ ] Mobile drawer copy correct

**Hero:**
- [ ] Eyebrow: "Agents working right now"
- [ ] Headline unchanged: "When operations break, they're already handled."
- [ ] Rotating phrases: all four correct
- [ ] Subhead: temporal version (before your team wakes up / before your AR team...)
- [ ] Dashboard panel copy: all strings correct
- [ ] Trust bar label correct

**The Problem:**
- [ ] Label: "THE OPERATIONAL GAP"
- [ ] Headline flat, no accent
- [ ] Sub-copy in two paragraphs with line breaks
- [ ] Card 1: WORKFORCE — blue tag, amber status
- [ ] Card 2: FINANCIAL — green tag, amber status
- [ ] Card 3: COMPLIANCE — purple tag, RED status
- [ ] Bridge line present

**Vertical Cards:**
- [ ] Label: "OUR SOLUTIONS"
- [ ] Headline: "One platform. Two operational verticals. Everything connected."
- [ ] Workforce card: blue pill, correct headline, chips, "7 agents"
- [ ] Financial card: green pill, correct headline, chips, "4 agents"

**Dark Scope:**
- [ ] Label: "THE PLATFORM — AT A GLANCE"
- [ ] Sub-copy: "Standard environments are running within weeks of signing."
- [ ] Numbers: 30+ / 15+ / 72hr

**Industries:**
- [ ] Headline: "Healthcare, finance, and compliance don't get second chances."
- [ ] Subhead: "not adapted from a general-purpose platform"
- [ ] All 15 industry card descriptors correct
- [ ] Callout bar copy correct

**Social Proof:**
- [ ] Label: "OPERATIONAL BENCHMARKS"
- [ ] Framing note present below headline
- [ ] Stat 1: "TARGET FILL TIME"
- [ ] Stat 2: "PROJECTED MATCH RATE"
- [ ] Stat 3: "DEPLOYMENT TARGET"
- [ ] Testimonial 1 updated quote
- [ ] Testimonial 2 updated quote
- [ ] TODO comments above each testimonial

**How It Works:**
- [ ] Label: "WHAT HAPPENS NEXT"
- [ ] Headline: "From first conversation to agents running live — in weeks."
- [ ] Step 1 title and description correct
- [ ] Step 2 title and description correct
- [ ] Step 3 title and description correct
- [ ] Log feed strings correct
- [ ] Live activity feed strings correct
- [ ] 72hr callout unchanged

**CTA:**
- [ ] Headline unchanged
- [ ] Subhead: "scenarios that match your actual operations"
- [ ] Trust pill: "First agent live within 72 hours" (not 24 hours)

**Footer:**
- [ ] Company description updated (no "AI-powered")
- [ ] All column labels and links correct
