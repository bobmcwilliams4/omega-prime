'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import systems from '@/data/systems.json'
import Badge, { StatusBadge } from '@/components/ui/Badge'

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
}

export default function SystemsPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const previewSystems = systems.slice(0, 6)

  return (
    <section ref={ref} className="py-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #9900ff 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">System Catalog</h2>
          <p className="section-subtitle">
            Explore the integrated subsystems powering ECHO OMEGA PRIME
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewSystems.map((system, index) => (
            <motion.div
              key={system.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/systems/${system.slug}`}>
                <div className="glass-card-hover p-6 h-full group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">
                      {iconMap[system.icon] || '📦'}
                    </span>
                    <StatusBadge status={system.status as 'Active' | 'Development' | 'Planned'} />
                  </div>

                  <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {system.name}
                  </h3>

                  <p className="text-sm text-cyan mb-3">{system.tagline}</p>

                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {system.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {system.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="primary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/systems"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Systems
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
