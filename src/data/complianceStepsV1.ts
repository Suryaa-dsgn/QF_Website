// ── Scroll-driven progressive line — Compliance Agents data constants ──
//
// SVG viewBox: 0 0 1200 2800
// Left column  x = 200   (LEFT pills)
// Right column x = 1000  (RIGHT pills)
// Corner radius: 30 (achieved via cubic-bezier segments)
//
// Temporal sequence: ProviderCredentialing → ClaimsCompliance → ContractCompliance
//
// SECTION_HEIGHT = 2800 — horizontal closing at y=2400, 80px below
// the ContractCompliance prototype bottom (y≈2320), so the line clears the card.

export const SECTION_HEIGHT = 2800 // px — total scroll distance

// ── SVG path: zigzags left ↔ right, tail ends at bottom of section ──
// Starts directly at first bridge — static stub covers y=80→y=430
export const PATH_D = `
  M 200,430
  C 200,430 200,430 230,430
  L 970,430
  C 1000,430 1000,430 1000,460
  L 1000,530
  L 1000,1100
  C 1000,1130 1000,1130 970,1130
  L 230,1130
  C 200,1130 200,1130 200,1160
  L 200,1230
  L 200,1800
  C 200,1830 200,1830 230,1830
  L 970,1830
  C 1000,1830 1000,1830 1000,1860
  L 1000,1930
  L 1000,2400
  L 600,2400
  L 600,2700
`

// ── Scroll progress thresholds (0–1 mapped to 0–2800px) ──────────
export const THRESHOLDS = {
  // Prototypes appear slightly before pill text
  step1Proto: 515  / 2800,   // 0.184
  step1Pill:  530  / 2800,   // 0.189
  step2Proto: 1215 / 2800,   // 0.434
  step2Pill:  1230 / 2800,   // 0.439
  step3Proto: 1915 / 2800,   // 0.684
  step3Pill:  1930 / 2800,   // 0.689

  // Bridge labels — centred at each bridge_y horizontal crossing
  label1: 1130 / 2800,   // 0.404 — between step 1 and 2
  label2: 1830 / 2800,   // 0.654 — between step 2 and 3

  closing: 2550 / 2800,  // 0.911
} as const
