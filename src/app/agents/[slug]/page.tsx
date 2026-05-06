import { getAgentBySlug, agents } from '@/data/agents'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import AgentContent from './AgentContent'

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const agent = getAgentBySlug(slug)
  if (!agent) return {}
  return {
    title: `${agent.name} | Quickflows.ai`,
    description: agent.subhead,
  }
}

export default function AgentPage({ params }: { params: { slug: string } }) {
  const agent = getAgentBySlug(params.slug)
  if (!agent) notFound()
  return <AgentContent agent={agent} />
}
