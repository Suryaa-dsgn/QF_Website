export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'sarah-m',
    quote:
      'We used to spend the first hour of every morning reacting to callouts. Now the agent handles it before I even open my laptop.',
    name: 'Sarah M.',
    role: 'Director of Operations, Regional Home Care Agency',
  },
  {
    id: 'james-t',
    quote:
      'Our AR team was spending 40% of their time on manual reconciliation. The AP/AR Matching agent cleared the backlog in the first week. Now they focus on the 6% that actually needs human judgment.',
    name: 'James T.',
    role: 'VP Finance, Logistics Company',
  },
  {
    id: 'rachel-k',
    quote:
      'Credentialing used to be a quarterly fire drill. Now it runs itself — every expiry tracked, every renewal initiated. We passed our last audit without touching a spreadsheet.',
    name: 'Rachel K.',
    role: 'Chief Compliance Officer, Regional Health System',
  },
]
