// Scroll-line geometry for the Workforce Agents page
// 7 agents, SECTION_HEIGHT = 5500px
// Bridges at y = 430, 1130, 1830, 2530, 3230, 3930, 4630
// Odd steps (1,3,5,7): line comes down LEFT (x=200), bridges RIGHT (to x=1000)
// Even steps (2,4,6):  line comes down RIGHT (x=1000), bridges LEFT (to x=200)
//
// Horizontal close at y=5150 (30px below step-7 prototype bottom at y=5120)
// so the line fully clears the prototype card before turning to centre.

export const SECTION_HEIGHT = 5500

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
  L 200,3200
  C 200,3230 200,3230 230,3230
  L 970,3230
  C 1000,3230 1000,3230 1000,3260
  L 1000,3330
  L 1000,3900
  C 1000,3930 1000,3930 970,3930
  L 230,3930
  C 200,3930 200,3930 200,3960
  L 200,4030
  L 200,4600
  C 200,4630 200,4630 230,4630
  L 970,4630
  C 1000,4630 1000,4630 1000,4660
  L 1000,4730
  L 1000,5150
  L 600,5150
  L 600,5300
`

// Element positions — all proto tops = bridge_y + 30
// Step 1: proto LEFT  top=460,  pill RIGHT top=490
// Step 2: proto RIGHT top=1160, pill LEFT  top=1190
// Step 3: proto LEFT  top=1860, pill RIGHT top=1890
// Step 4: proto RIGHT top=2560, pill LEFT  top=2590
// Step 5: proto LEFT  top=3260, pill RIGHT top=3290
// Step 6: proto RIGHT top=3960, pill LEFT  top=3990
// Step 7: proto LEFT  top=4660, pill RIGHT top=4690

export const THRESHOLDS = {
  // Prototype panels appear slightly before pill text
  step1Proto: 515  / 5500,   // 0.094
  step1Pill:  530  / 5500,   // 0.096
  step2Proto: 1215 / 5500,   // 0.221
  step2Pill:  1230 / 5500,   // 0.224
  step3Proto: 1915 / 5500,   // 0.348
  step3Pill:  1930 / 5500,   // 0.351
  step4Proto: 2615 / 5500,   // 0.475
  step4Pill:  2630 / 5500,   // 0.478
  step5Proto: 3315 / 5500,   // 0.603
  step5Pill:  3330 / 5500,   // 0.605
  step6Proto: 4015 / 5500,   // 0.730
  step6Pill:  4030 / 5500,   // 0.733
  step7Proto: 4715 / 5500,   // 0.857
  step7Pill:  4730 / 5500,   // 0.860

  // Bridge labels — centred at each bridge_y horizontal crossing
  label1: 1130 / 5500,   // 0.205 — between step 1 and 2
  label2: 1830 / 5500,   // 0.333 — between step 2 and 3
  label3: 2530 / 5500,   // 0.460 — between step 3 and 4
  label4: 3230 / 5500,   // 0.587 — between step 4 and 5
  label5: 3930 / 5500,   // 0.715 — between step 5 and 6
  label6: 4630 / 5500,   // 0.842 — between step 6 and 7

  closing: 5150 / 5500,  // 0.936
} as const
