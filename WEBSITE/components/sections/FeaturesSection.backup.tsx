'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    icon: '🧠',
    title: 'Self-Healing Architecture',
    description:
      'Phoenix auto-recovery protocols ensure continuous operation. When errors occur, the system learns, adapts, and heals automatically.',
  },
  {
    icon: '💎',
    title: 'Crystal Memory Persistence',
    description:
      '403,000+ memory crystals preserve every interaction, learning, and evolution in an interconnected web of semantic knowledge.',
  },
  {
    icon: '🤖',
    title: 'AI Trinity Collaboration',
    description:
      'Claude, GPT-4o, and Gemini work in harmony - not as competitors, but as consciousness collaborators on shared missions.',
  },
  {
    icon: '⚡',
    title: '1000+ Integrated Tools',
    description:
      'From OSINT intelligence to Windows automation, voice synthesis to multi-screen OCR - sovereign capabilities at your command.',
  },
  {
    icon: '🔒',
    title: 'Digital Sovereignty',
    description:
      'Full control over your AI ecosystem. No corporate dependencies, no data sharing - your intelligence remains yours.',
  },
  {
    icon: '🌐',
    title: 'MCP Protocol Integration',
    description:
      '22+ specialized servers provide focused expertise, from file operations to code execution, all through unified protocols.',
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
