'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import type { System } from '@/lib/types'

const iconMap: Record<string, string> = {
  brain: '🧠',
  database: '💾',
  server: '🖥️',
  shield: '🛡️',
  desktop: '💻',
  network: '🌐',
  microphone: '🎤',
  terminal: '⌨️',
  eye: '👁️',
  link: '🔗',
  sparkles: '✨',
  book: '📚',
  template: '📋',
}

interface SystemPageClientProps {
  system: System
  relatedSystems: System[]
}

export default function SystemPageClient({
  system,
  relatedSystems,
}: SystemPageClientProps) {
  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/systems" className="hover:text-primary transition-colors">
            Systems
          </Link>
          <span>/</span>
          <span className="text-white">{system.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 border border-primary/30 flex items-center justify-center text-6xl">
                  {iconMap[system.icon] || '📦'}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <StatusBadge status={system.status as 'Active' | 'Development' | 'Planned'} />
                  <Badge variant="cyan">{system.category}</Badge>
                  <Badge variant="gold">v{system.version}</Badge>
                </div>

                <h1 className="text-h1 font-heading font-bold text-white mb-2">
                  {system.name}
                </h1>

                <p className="text-xl text-cyan mb-6">{system.tagline}</p>

                <p className="text-lg text-text-secondary max-w-3xl">
                  {system.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-card p-8"
              >
                <h2 className="text-h3 font-heading font-semibold text-white mb-6">
                  Features
                </h2>
                <ul className="space-y-4">
                  {system.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✦</span>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Architecture Diagram Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-8"
              >
                <h2 className="text-h3 font-heading font-semibold text-white mb-6">
                  Architecture
                </h2>
                <div className="bg-background-dark/50 rounded-xl p-12 text-center border border-primary/10">
                  <div className="text-4xl mb-4">🏗️</div>
                  <p className="text-text-muted">
                    Architecture diagram for {system.name}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-heading font-semibold text-white mb-4">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {system.technologies.map((tech) => (
                    <Badge key={tech} variant="primary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Related Systems */}
              {relatedSystems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-lg font-heading font-semibold text-white mb-4">
                    Related Systems
                  </h3>
                  <div className="space-y-3">
                    {relatedSystems.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/systems/${related.slug}`}
                        className="block p-3 rounded-lg bg-background-dark/50 hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">
                            {iconMap[related.icon] || '📦'}
                          </span>
                          <div>
                            <p className="text-white font-medium">
                              {related.name}
                            </p>
                            <p className="text-xs text-text-muted">
                              {related.tagline}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Back Link */}
              <Link
                href="/systems"
                className="btn-secondary w-full text-center block"
              >
                ← Back to Systems
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
