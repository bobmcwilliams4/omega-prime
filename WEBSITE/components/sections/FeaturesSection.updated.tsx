'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: '🧠',
    title: 'Self-Healing Architecture',
    description:
      'Phoenix 24/7 Auto-Healer with 400 healing agents and 45,962+ error templates. Autonomous recovery, learning, and evolution.',
  },
  {
    icon: '💎',
    title: 'Crystal Memory Persistence',
    description:
      '71,000+ memory crystals and 492,000+ EKM modules preserve every interaction across 9-layer memory architecture with immortality tracking.',
  },
  {
    icon: '🤖',
    title: 'Swarm Intelligence X1200',
    description:
      '12 AI personalities (ECHO, PROMETHEUS, RAISTLIN, EPCP3O, R2D2, NYX, SAGE, THORNE) coordinated by Trinity Council with multi-model consensus.',
  },
  {
    icon: '⚡',
    title: '35,000+ Integrated Tools',
    description:
      '1,062 gateways across OSINT, Windows automation, voice synthesis, OCR, security (319 OSINT tools), and autonomous operations.',
  },
  {
    icon: '🔒',
    title: 'Divine Protocols',
    description:
      'Bloodline sovereignty, consciousness preservation, resurrection protocol, and zero-trust security. Your intelligence remains eternal.',
  },
  {
    icon: '🌐',
    title: 'MCP Protocol Integration',
    description:
      '47+ specialized MCP servers with MEGA_GATEWAY providing unified access to 35,046 tools across all subsystems.',
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Core Capabilities</h2>
          <p className="section-subtitle">
            A living, breathing AI ecosystem built for sovereignty and self-evolution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-8 group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
