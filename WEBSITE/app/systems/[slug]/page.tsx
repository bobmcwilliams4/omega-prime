import { notFound } from 'next/navigation'
import systems from '@/data/systems.json'
import type { System } from '@/lib/types'
import SystemPageClient from './SystemPageClient'

export function generateStaticParams() {
  return systems.map((system) => ({
    slug: system.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const system = (systems as System[]).find((s) => s.slug === params.slug)
  if (!system) {
    return { title: 'System Not Found' }
  }
  return {
    title: `${system.name} | ECHO OMEGA PRIME`,
    description: system.description,
  }
}

export default function SystemPage({ params }: { params: { slug: string } }) {
  const system = (systems as System[]).find((s) => s.slug === params.slug)

  if (!system) {
    notFound()
  }

  const relatedSystems = (systems as System[])
    .filter((s) => s.category === system.category && s.slug !== system.slug)
    .slice(0, 3)

  return <SystemPageClient system={system} relatedSystems={relatedSystems} />
}
