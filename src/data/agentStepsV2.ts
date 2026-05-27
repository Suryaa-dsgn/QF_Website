// ── Scroll-driven progressive line — data constants ────────────────
//
// SVG viewBox: 0 0 1200 5800
// Left column  x = 200   (LEFT pills)
// Right column x = 1000  (RIGHT pills)
// Corner radius: 30 (achieved via cubic-bezier segments)
//
// Temporal sequence: Scheduler → Burnout → StaffAssist → AutoSwap →
//                    AutoApproval → EVV → Credentialing

export const SECTION_HEIGHT = 5800 // px — total scroll distance (was 7500)

// ── SVG path: zigzags left ↔ right, ends centred at closing text ──
// Starts directly at first bridge — no vertical stub at top (Fix 5C)
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
  L 200,1830
  C 200,1860 200,1860 230,1860
  L 970,1860
  C 1000,1860 1000,1860 1000,1890
  L 1000,1960
  L 1000,2530
  C 1000,2560 1000,2560 970,2560
  L 230,2560
  C 200,2560 200,2560 200,2590
  L 200,2660
  L 200,3230
  C 200,3260 200,3260 230,3260
  L 970,3260
  C 1000,3260 1000,3260 1000,3290
  L 1000,3360
  L 1000,3930
  C 1000,3960 1000,3960 970,3960
  L 230,3960
  C 200,3960 200,3960 200,3990
  L 200,4060
  L 200,4630
  C 200,4660 200,4660 230,4660
  L 970,4660
  C 1000,4660 1000,4660 1000,4690
  L 1000,4760
  L 1000,5300
  C 1000,5340 800,5380 600,5400
`

// ── Scroll progress thresholds (0–1 mapped to 0–5800px) ──────────
export const THRESHOLDS = {
  // Pills appear when line reaches their pill-side position
  step1Pill:  530  / 5800,   // 0.091
  step2Pill:  1230 / 5800,   // 0.212
  step3Pill:  1960 / 5800,   // 0.338
  step4Pill:  2660 / 5800,   // 0.459
  step5Pill:  3360 / 5800,   // 0.579
  step6Pill:  4060 / 5800,   // 0.700
  step7Pill:  4760 / 5800,   // 0.821

  // Prototypes appear slightly BEFORE the pill
  step1Proto: 515  / 5800,   // 0.089
  step2Proto: 1215 / 5800,   // 0.210
  step3Proto: 1945 / 5800,   // 0.335
  step4Proto: 2645 / 5800,   // 0.456
  step5Proto: 3345 / 5800,   // 0.577
  step6Proto: 4045 / 5800,   // 0.697
  step7Proto: 4745 / 5800,   // 0.818

  // Bridge labels appear as line draws through each horizontal bridge
  label1: 1130 / 5800,   // 0.195  — CATCHING RISK BEFORE IT ESCALATES
  label2: 1860 / 5800,   // 0.321  — STAFF NEEDS ANSWERS
  label3: 2560 / 5800,   // 0.441  — 6:04 AM — CALLOUT RECEIVED
  label4: 3260 / 5800,   // 0.562  — REQUESTS ARRIVE OVERNIGHT
  label5: 3960 / 5800,   // 0.683  — CAREGIVERS IN THE FIELD
  label6: 4660 / 5800,   // 0.803  — AUDIT APPROACHING

  // Closing headline
  closing: 5300 / 5800,  // 0.914
} as const
