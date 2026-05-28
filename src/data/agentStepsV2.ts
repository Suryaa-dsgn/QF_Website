// Scroll-line geometry for the Workforce Agents page
// 8 agents, SECTION_HEIGHT = 6200px
// Bridges at y = 430, 1130, 1830, 2530, 3230, 3930, 4630, 5330
// Odd steps (1,3,5,7): line comes down LEFT (x=200), bridges RIGHT (to x=1000)
// Even steps (2,4,6,8): line comes down RIGHT (x=1000), bridges LEFT (to x=200)
//
// Horizontal close at y=5850 (30px below step-8 prototype bottom at y=5820)
// so the line fully clears the prototype card before turning to centre.

export const SECTION_HEIGHT = 6200

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
  L 1000,5300
  C 1000,5330 1000,5330 970,5330
  L 230,5330
  C 200,5330 200,5330 200,5360
  L 200,5430
  L 200,5850
  L 600,5850
  L 600,6050
`

// Element positions — all proto tops = bridge_y + 30
// Step 1: proto LEFT  top=460,  pill RIGHT top=490
// Step 2: proto RIGHT top=1160, pill LEFT  top=1190
// Step 3: proto LEFT  top=1860, pill RIGHT top=1890
// Step 4: proto RIGHT top=2560, pill LEFT  top=2590
// Step 5: proto LEFT  top=3260, pill RIGHT top=3290
// Step 6: proto RIGHT top=3960, pill LEFT  top=3990
// Step 7: proto LEFT  top=4660, pill RIGHT top=4690
// Step 8: proto RIGHT top=5360, pill LEFT  top=5390

export const THRESHOLDS = {
  // Prototype panels appear slightly before pill text
  step1Proto: 515  / 6200,   // 0.083
  step1Pill:  530  / 6200,   // 0.085
  step2Proto: 1215 / 6200,   // 0.196
  step2Pill:  1230 / 6200,   // 0.198
  step3Proto: 1915 / 6200,   // 0.309
  step3Pill:  1930 / 6200,   // 0.311
  step4Proto: 2615 / 6200,   // 0.422
  step4Pill:  2630 / 6200,   // 0.424
  step5Proto: 3315 / 6200,   // 0.535
  step5Pill:  3330 / 6200,   // 0.537
  step6Proto: 4015 / 6200,   // 0.648
  step6Pill:  4030 / 6200,   // 0.650
  step7Proto: 4715 / 6200,   // 0.761
  step7Pill:  4730 / 6200,   // 0.763
  step8Proto: 5415 / 6200,   // 0.874
  step8Pill:  5430 / 6200,   // 0.876

  // Bridge labels — centred at each bridge_y horizontal crossing
  label1: 1130 / 6200,   // 0.182 — between step 1 and 2
  label2: 1830 / 6200,   // 0.295 — between step 2 and 3
  label3: 2530 / 6200,   // 0.408 — between step 3 and 4
  label4: 3230 / 6200,   // 0.521 — between step 4 and 5
  label5: 3930 / 6200,   // 0.634 — between step 5 and 6
  label6: 4630 / 6200,   // 0.747 — between step 6 and 7
  label7: 5330 / 6200,   // 0.860 — between step 7 and 8

  closing: 5850 / 6200,  // 0.944
} as const
