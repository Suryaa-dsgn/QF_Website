export type SetPhase =
  | 'idle'
  | 'trigger'
  | 'step1'
  | 'step2'
  | 'resolved'
  | 'resetting'

export const SET_DURATION = 13000   // ms per set (~1.38× faster than original 18s)
export const TOTAL        = SET_DURATION * 3  // 39s full 3-set cycle

/** Compute the current phase from time-within-set (0–SET_DURATION). */
export function getSetPhase(t: number): SetPhase {
  if (t < 1100)  return 'idle'       // 1.1s  — calm before event
  if (t < 3000)  return 'trigger'    // 1.9s  — event arrives
  if (t < 5500)  return 'step1'      // 2.5s  — first agent active
  if (t < 8000)  return 'step2'      // 2.5s  — second agent active
  if (t < 12000) return 'resolved'   // 4.0s  — success state (badge visible)
  return 'resetting'                  // 1.0s  — panels fade to 0
}
