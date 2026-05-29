export type Phase =
  | 'idle'
  | 'claim-in'
  | 'compliance'
  | 'rcm'
  | 'resolved'
  | 'resetting'

const PHASE_ORDER: Phase[] = [
  'idle', 'claim-in', 'compliance', 'rcm', 'resolved', 'resetting',
]

/** Returns true if `phase` is at or past `target` in the animation sequence */
export function phaseGte(phase: Phase, target: Phase): boolean {
  return PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target)
}
