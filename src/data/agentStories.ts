export const agentStories: Record<string, {
  moment: string
  narrative: string
  actions: string[]
  outcome: string
}> = {

  'staff-burnout-prevention': {
    moment: "The nurse who called out last Monday called out again today.",
    narrative: "It's Tuesday. One of your ICU nurses has logged 68 hours this week. Nobody on the floor flagged it — because nobody had time to check the scheduling history. Burnout doesn't announce itself. It shows up as a callout at 6am.",
    actions: [
      "Detects over-scheduling spikes and overtime patterns in real time",
      "Monitors sentiment signals and absence history across your roster",
      "Flags high-risk staff before the callout happens — not after",
    ],
    outcome: "Lower turnover. Fewer emergency callouts. Your best staff still there in six months.",
  },

  'staffassist': {
    moment: "David wants to know if he can swap Thursday. That shouldn't take three messages.",
    narrative: "He texts his coordinator. She's handling twelve other things. His message sits there. By the time she responds, the open shift has already been assigned. The swap never happened. David asks again next week.",
    actions: [
      "Answers schedule and policy questions instantly, 24 hours a day",
      "Shows eligible open shifts and swap options based on David's certifications",
      "Initiates the swap request and confirms both parties — no coordinator required",
    ],
    outcome: "Coordinators stop being the switchboard. Staff get answers in seconds.",
  },

  'scheduler-assist': {
    moment: "Three callouts. Twelve open shifts. Forty-eight hours. One spreadsheet.",
    narrative: "It's Friday afternoon. The scheduling manager opens the coverage report and starts working through it manually — cross-referencing availability, certifications, and OT limits one name at a time. This is how every Friday afternoon works.",
    actions: [
      "Identifies every coverage gap the moment a callout is logged",
      "Scores available staff against certifications, availability, and OT limits",
      "Generates the optimised schedule and simulates impact before publishing",
    ],
    outcome: "A filled schedule in hours. Not a panic on Monday morning.",
  },

  'visit-verification': {
    moment: "The billing record says 9am. The GPS log says 28 minutes, not 60.",
    narrative: "A caregiver visited Mrs. Garcia. The visit was logged as complete. But the timestamp doesn't match the duration. Nobody catches it until billing runs — and by then, the compliance window is already at risk.",
    actions: [
      "Validates every visit with GPS coordinates and time-stamp on arrival and departure",
      "Flags shortened or missed visits in real time — before billing is submitted",
      "Syncs verified visit data directly to billing with the full audit trail attached",
    ],
    outcome: "No compliance exposure. No missed reimbursements. No reconciliation backlog.",
  },

  'auto-approval': {
    moment: "It's 11pm. A compliant time-off request is sitting in a queue waiting for morning.",
    narrative: "A caregiver submits a request for next Thursday. No conflicts. No OT. Policy clear. It's a straightforward approval. But it sits there until the manager checks in at 9am — eight hours after it could have been resolved.",
    actions: [
      "Checks every request against licence, overtime, and policy rules immediately",
      "Auto-approves compliant requests the moment they're submitted",
      "Escalates only genuine exceptions to managers — with the reason clearly stated",
    ],
    outcome: "Compliant requests handled overnight. Managers see only what actually needs them.",
  },

  'auto-swap': {
    moment: "6:02am. Amanda called in sick. The coordinator opens the contact list.",
    narrative: "The ward needs coverage by 7am. She starts calling down the list one by one. Third call picks up. By the time it's confirmed, 44 minutes have passed and the day shift has already started short.",
    actions: [
      "Identifies the best-match internal staff against skills, certifications, and OT status",
      "Checks compliance on every candidate before making contact",
      "Sends the request and confirms the swap with both parties — in under 30 seconds",
    ],
    outcome: "The shift is covered before the coordinator's second call. Agency spend goes down.",
  },

  'physician-credentialing': {
    moment: "Dr. Patel's DEA registration expires in 11 days. Nobody flagged it.",
    narrative: "The audit is in four weeks. The admin team finds out when someone pulls the record to check an unrelated billing issue. The renewal process takes 10 business days minimum. This is the scenario that leads to a compliance incident.",
    actions: [
      "Tracks every licence and certification expiry across your entire provider roster",
      "Verifies credentials against state and federal regulatory databases automatically",
      "Sends renewal reminders at 90, 60, and 30 days — then initiates the renewal process",
    ],
    outcome: "Zero expired credentials at audit. No legal exposure. The admin team stops being a calendar.",
  },

}
