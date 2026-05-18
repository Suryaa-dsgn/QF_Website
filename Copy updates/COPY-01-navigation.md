# COPY-01 — Navigation
## Component: `src/components/Navigation.tsx`

---

## Main Nav Links

```
About
Offerings          ← dropdown trigger
How It Works
Contact Us
```

```
Sign in            ← ghost text link, right side
Book a demo        ← primary CTA button, right side
```

**Note on "How It Works":** This links to the How It Works section on the homepage
(or a dedicated page if one exists). Keep the label as is — it's conventional but
functional, and nav labels are not the place to be clever.

**Note on "Book a demo":** This is the only place on the nav that gets the brand
purple button treatment. All other links are plain text. The contrast is intentional —
one clear action.

---

## Offerings Dropdown

### Left column header
```
AGENT SUITES
```
Style: 10px, Geist 600, uppercase, letter-spacing 0.07em, color: brand purple

### Left column items

**Row 1:**
```
Title:    Workforce Agents
Subtitle: 7 agents. Shifts, credentials, scheduling.
href:     /workforce
```

**Row 2:**
```
Title:    Financial Agents
Subtitle: 4 agents. AR, collections, compliance.
href:     /financial
```

### Right column header
```
INDUSTRIES
```
Style: same as left column header

### Right column items

**Row 1:**
```
Title:    Healthcare
Subtitle: Hospitals, home health, SNF.
href:     /industries/hospitals
```

**Row 2:**
```
Title:    Finance & Real Estate
Subtitle: RCM, SaaS, REITs, manufacturing.
href:     /industries/reits
```

**Row 3:**
```
Title:    Operations & Logistics
Subtitle: Staffing agencies, airports, plants.
href:     /industries/logistics
```

---

## Mobile Drawer

### Drawer header
```
Quickflows.ai      ← logo + wordmark
```

### Accordion: Offerings
```
Offerings          ← accordion trigger label
```

When expanded, shows:
```
AGENT SUITES
  Workforce Agents
  Financial Agents

INDUSTRIES
  Healthcare
  Finance & Real Estate
  Operations & Logistics
```

### Other links
```
How It Works
Contact Us
```

### Drawer footer CTAs
```
Sign in            ← text link
Book a demo        ← full-width primary button
```

---

## Copy Notes

The nav copy is intentionally plain. This is correct.
Navigation labels should be functional, not clever.
The brand voice lives in the page copy, not in nav labels.

Do not rename "About" to "Our Story" or similar.
Do not rename "Contact Us" to "Let's Talk" or similar.
These changes signal a lack of confidence in the product.
