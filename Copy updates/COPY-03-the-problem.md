# COPY-03 — The Problem Section
## Component: `src/components/sections/TheProblem.tsx`

---

## Section Job

Make the buyer feel recognised before they feel sold to.

A CIO or CCO reading this section should feel mild discomfort —
not alarm, but a quiet recognition of *"yes, that's exactly what
Tuesday morning looks like."* That recognition is what builds trust.
Nothing is dramatised. Nothing is exaggerated.
These are mundane operational moments named with precision.

---

## Section Label

```
THE OPERATIONAL GAP
```

Style: 10px, Geist 600, uppercase, letter-spacing 0.07em, color #A0A0A0.
Centered.

---

## Headline

```
Most operational drag doesn't look like a crisis.
```

Style: Bricolage Grotesque 700, clamp(28px, 4vw, 46px),
letter-spacing -0.035em, line-height 1.05, color #0A0A0A.
Text-align: center. Max-width: 640px. Margin: 0 auto.

**Critical: Do NOT add italic, colour accent, or any visual emphasis
to any word in this headline.**

The power of this line is its flatness. It is stating a fact, not
making a pitch. Any visual emphasis turns it into marketing copy.
Leave it plain.

---

## Sub-copy

Render as two separate paragraphs, not one block.

**Paragraph 1 (three lines, each on its own line with `<br />`):**
```
It looks like your coordinator on hold at 6:03am.
An invoice sitting in manual review for four days.
A credential renewal that almost slipped through.
```

**Paragraph 2:**
```
None of it is failing. It's just costing more than it should,
every single day.
```

Style: Geist 400, 16px, line-height 1.75, color #6B6B6B.
Text-align: center. Max-width: 500px. Margin: 0 auto.
Gap between the two paragraphs: 16px.

**Do not collapse into a single paragraph.**
The separation gives the reader a breath between the scenarios
and the consequence. That pause matters.

---

## Three Incident Cards

These are the visual centrepiece. They function as operational
log entries — the kind a CIO would see in their own systems.
Specific, timestamped, unresolved.

Each card has the same structure:
1. Vertical tag (top left)
2. Timestamp
3. Two incident lines
4. Status indicator (bottom)

---

### Card 1 — Workforce

**Tag:**
```
WORKFORCE
```
Tag colour: #0284C7 (blue)
Tag background: rgba(2,132,199,0.07)

**Timestamp:**
```
06:03 AM — Thursday
```
Style: Geist Mono 400, 11px, color #A0A0A0

**Incident lines:**
```
Amanda W. called in sick for the 7:00 shift.
No backup scheduled. Coordinator making calls.
```
Style: Geist 600, 15px (semibold, not bold), color #0A0A0A,
line-height 1.5

**Status:**
```
● Still unresolved — 47 minutes later
```
Dot colour: #F4A261 (amber)
Text colour: #F4A261 (amber)
Style: Geist Mono 400, 11px

---

### Card 2 — Financial

**Tag:**
```
FINANCIAL
```
Tag colour: #059669 (green)
Tag background: rgba(5,150,105,0.07)

**Timestamp:**
```
Day 4 in review queue
```

**Incident lines:**
```
Invoice INV-482 — short-pay unresolved.
AR team is manually cross-referencing the contract.
```

**Status:**
```
● Awaiting manual resolution
```
Dot colour: #F4A261 (amber)
Text colour: #F4A261 (amber)

---

### Card 3 — Compliance

**Tag:**
```
COMPLIANCE
```
Tag colour: #7C3AED (purple — distinct from brand purple)
Tag background: rgba(124,58,237,0.07)

**Timestamp:**
```
11 days to expiry
```

**Incident lines:**
```
Dr. Patel — DEA Registration.
Renewal not initiated. Audit next month.
```

**Status:**
```
● No action taken
```
Dot colour: #E63946 (red — more urgent than the others)
Text colour: #E63946

**Why the third card is red:**
Compliance failures have harder consequences than operational delays.
The colour escalation (amber → amber → red) communicates severity
without explaining it. The reader feels it.

---

## Bridge Line (below the three cards)

```
None of these are emergencies.
But they happen every day. And across a workforce
or a receivables stack, they add up fast.
```

Style: Geist 400, 15px, color #A0A0A0, text-align center,
max-width 460px, margin: 40px auto 0, line-height 1.7.

**Why this line:**
It returns the reader from the specific scenarios to the broader
consequence — without using the word "cost" or "efficiency."
"They add up fast" is more honest than any statistic here.

---

## What This Section Does NOT Do

- Does not mention Quickflows by name
- Does not pitch any feature or agent
- Does not use the word "solution"
- Does not end with a CTA

This section's only job is recognition.
The product response comes in the next sections.
If this section tries to do too much, the recognition is lost.
