// ── Scroll-driven progressive line — Financial Agents data constants ──
//
// SVG viewBox: 0 0 1200 3100
// Left column  x = 200   (LEFT pills)
// Right column x = 1000  (RIGHT pills)
// Corner radius: 30 (achieved via cubic-bezier segments)
//
// Temporal sequence: APARMatching → Collection → Compliance → REITQualifier
//
// SECTION_HEIGHT = 3100 — step 4 proto ends at y≈3020, leaving only
// 80px below it. This ensures step 4 content stays in the viewport at
// progress=1 for viewport heights ≥ 600px.

export const SECTION_HEIGHT = 3100 // px — total scroll distance

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
  L 1000,2500
  C 1000,2530 1000,2530 970,2530
  L 230,2530
  C 200,2530 200,2530 200,2560
  L 200,2630
  L 200,3000
  L 600,3000
  L 600,3100
`

// ── Scroll progress thresholds (0–1 mapped to 0–3100px) ──────────
export const THRESHOLDS = {
  // Pills appear when line reaches their pill-side position
  step1Pill:  530  / 3100,   // 0.171
  step2Pill:  1230 / 3100,   // 0.397
  step3Pill:  1930 / 3100,   // 0.623
  step4Pill:  2630 / 3100,   // 0.848

  // Prototypes appear slightly BEFORE the pill
  step1Proto: 515  / 3100,   // 0.166
  step2Proto: 1215 / 3100,   // 0.392
  step3Proto: 1915 / 3100,   // 0.618
  step4Proto: 2615 / 3100,   // 0.844

  // Bridge labels appear as line draws through each horizontal bridge
  label1: 1130 / 3100,   // 0.365 — CASH SITTING OVERDUE — 45 DAYS OUT
  label2: 1830 / 3100,   // 0.590 — INVOICE CLEARED — TERMS UNDER REVIEW
  label3: 2530 / 3100,   // 0.816 — PIPELINE ARRIVES BEFORE MORNING COFFEE
} as const
