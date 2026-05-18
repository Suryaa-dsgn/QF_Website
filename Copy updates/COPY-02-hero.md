# COPY-02 — Hero Section
## Component: `src/components/sections/Hero.tsx`

---

## Eyebrow Pill

```
Agents working right now
```

Style: 12px, Geist 500, color: brand purple.
Pulsing dot to the left (brand purple, 2.5s animation).
Pill background: rgba(107,63,160,0.07).

**Do not change this line.** It's functional and honest.
It sets up the live dashboard panel immediately.

---

## Hero Headline (H1)

```
When operations break,
they're already handled.
```

Style: Bricolage Grotesque 800, clamp(44px, 5.5vw, 72px),
letter-spacing -0.04em, line-height 1.0, color #0A0A0A.

**Do not add any colour accent or italic to this headline.**
It is written as a complete thought. Any visual disruption
breaks the matter-of-fact confidence of the line.

**Do not rewrite this line.** It is the strongest copy on the site.
The audit confirmed it: "Better than 90% of AI B2B heroes."

---

## Rotating Agent Label

These four phrases cycle every 2.8 seconds below the headline.
Vertical slide animation — current exits up, next enters from below.

**Static prefix (never changes):**
```
Agents currently:
```
Style: 14px, Geist Mono 400, color #A0A0A0

**Cycling phrases (in this order):**
```
1. Filling the shift
2. Matching the invoice
3. Flagging the credential
4. Chasing the payment
```
Style: 14px, Geist Mono 500, color: brand purple

**Why these four:**
Each phrase names one specific agent action across both verticals.
"Filling the shift" = Workforce. "Matching the invoice" = Financial.
"Flagging the credential" = Compliance. "Chasing the payment" = Collections.
Together they communicate platform breadth without a single word of explanation.

---

## Hero Subhead

```
Shift gaps filled before your team wakes up.
Invoices matched before your AR team starts their day.
Credentials renewed before the audit notice arrives.
```

Style: Geist 400, 16px–17px (clamp), line-height 1.75, color #6B6B6B,
max-width 440px. Each sentence on its own line (use `<br />` between them).

**Why this construction:**
Every line is temporal — it answers *when*, not *what*.
"Before your team wakes up" is more specific and human than
"automatically" or "in real time."
Each line covers one vertical: Workforce / Financial / Compliance.

**Do not collapse into a single paragraph.**
The line breaks create rhythm. They make the reader pause
between each claim. That pause is intentional.

---

## CTA Buttons

**Primary:**
```
Book a 20-min demo
```
Style: Geist 500, 14px–15px. Brand purple background (#6B3FA0). White text.
Hover: translateY(-1px), shadow deepens.

**Ghost / Secondary:**
```
See it in action
```
With ArrowRight icon (14px, Lucide). Arrow slides 4px right on hover.
Style: Geist 500, transparent background, border rgba(107,63,160,0.18).

---

## Hero Dashboard Panel

The live ops panel in the hero is product UI, not copy.
But these specific text strings must appear inside the panel exactly as written:

### Browser URL bar
```
app.quickflows.ai / operations
```

### Dashboard title
```
Shift Operations
```

### Dashboard subtitle
```
Thursday · Philadelphia region
```

### Real-time badge
```
Real-time
```
(with pulsing dot)

### Stat card labels (all in Geist Mono)
```
Open Shifts
Gaps Closed
Agents Active
Avg Fill Time
```

### Stat card values (Geist Mono)
```
0 (or 1 during alert phase) — with delta "All covered" or "1 gap detected"
34 — with delta "Today"
3 — with delta "7 in queue"
28s — with delta "↓ 4s vs yesterday"
```

### Table header
```
Recent activity
```
With sub-label: `Showing 4 of 34 today`

### Table column headers
```
Client / Staff    Time    Status    Agent
```

### Table rows (static rows — these are always visible)

Row 1:
```
Post-op Follow-up — Mr. David Chen
14:00–16:00
RESOLVED
A3 · Confirmed 12s ago
```

Row 2:
```
Critical Wound Care — Mrs. Sarah Johnson
08:00–12:00
FILLING
A1 · Agent matching
```

Row 3:
```
Dementia AM Care — North Philly
07:00–11:00
PENDING
A2 · Awaiting response
```

### Animated row (appears during the live loop — phases)

Alert phase (appears at 3s):
```
Nurse Amanda W. — Called in sick
06:00–14:00
OPEN
A1 · Waiting for agent
```

Filling phase (5s–11s):
```
Nurse Amanda W. — Called in sick
06:00–14:00
FILLING
A1 · [countdown]s to fill
```

Resolved phase (11s+):
```
Nurse Amanda W. — Called in sick
06:00–14:00
RESOLVED
A1 · Filled in 28s
```

### Sidebar navigation labels
```
Operations        ← section label
Overview          ← active item
Shifts
Staff
Alerts            ← with badge showing "5"

AI Agents         ← section label
Agent Log
Reports
```

---

## Trust Bar (below hero panel)

### Label
```
Trusted by operations teams at
```
Style: 11px, Geist 500, uppercase, letter-spacing 0.07em,
color: rgba(196,181,253,0.6) — muted purple-tinted white.
Text-align: center.

### Marquee names (placeholder until real logos added)
```
Regional Health Systems
Home Care Alliance
MedBridge Group
CareRx Partners
PrimaCare Inc.
OpsStar Logistics
CapRate REIT
SunCare Systems
MetroHealth Staffing
```

**Important:** When real client logos become available, replace these
names with the actual logo images. Remove the company name text entirely —
logos don't need labels in a trust bar.

Until then, keep these placeholder names. They are recognisable enough
as a category without being specifically deceptive.

---

## Copy Intent Notes

The hero section's job: **show the product working before explaining it.**
The headline names the outcome. The rotating label names specific agent actions.
The subhead gives temporal specificity. The panel shows it happening.

By the time a visitor reaches the trust bar, they should already understand:
- The product is running right now
- It handles shifts, invoices, and credentials
- It acts automatically, without prompting

None of this should be explained. It should be demonstrated.
