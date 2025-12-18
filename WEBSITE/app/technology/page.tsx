'use client'

import { motion } from 'framer-motion'
import TechStack from '@/components/sections/TechStack'

const architectureComponents = [
  {
    name: 'MCP Mega Gateway',
    description: '500+ specialized servers in context-free architecture',
    color: 'from-primary to-cyan',
  },
  {
    name: 'Crystal Memory',
    description: '75,000+ persistent memory crystals',
    color: 'from-cyan to-primary',
  },
  {
    name: 'EKM Knowledge Base',
    description: '100,000+ Eternal Knowledge Modules',
    color: 'from-gold to-primary',
  },
  {
    name: 'Trinity Bridge',
    description: 'AI collaboration protocol',
    color: 'from-primary to-gold',
  },
]

export default function TechnologyPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-h1 font-heading font-bold text-gradient mb-4">
              Technology Stack
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              From Python scripts to sovereign AI infrastructure - the technologies
              powering ECHO OMEGA PRIME, mastered in under 12 months.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-heading font-bold text-white mb-4">
              System Architecture
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Four pillars supporting the ECHO PRIME ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {architectureComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 text-center group"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${component.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
                >
                  <div className="w-8 h-8 border-2 border-white/50 rounded-lg" />
                </div>
                <h3 className="font-heading font-semibold text-white mb-2">
                  {component.name}
                </h3>
                <p className="text-sm text-text-muted">{component.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-8 mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-heading font-semibold text-white mb-2">
                Integration Architecture
              </h3>
              <p className="text-text-muted">
                How the systems connect and communicate
              </p>
            </div>
            <div className="relative bg-background-dark/50 rounded-xl p-8 min-h-[300px] flex items-center justify-center border border-primary/20">
              {/* Simple visual architecture representation */}
              <div className="flex flex-col items-center gap-8 w-full max-w-3xl">
                {/* Top Row - AI Trinity */}
                <div className="flex justify-center gap-8">
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-1">🤖</div>
                    <div className="text-xs text-cyan">Claude</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-1">🧠</div>
                    <div className="text-xs text-primary">GPT-4o</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-1">💎</div>
                    <div className="text-xs text-gold">Gemini</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-primary text-2xl">↓</div>

                {/* Middle - Gateway */}
                <div className="glass-card p-6 text-center border-2 border-primary/50">
                  <div className="text-3xl mb-2">🌐</div>
                  <div className="font-heading font-semibold text-white">
                    MCP Mega Gateway
                  </div>
                  <div className="text-xs text-text-muted">500+ Servers</div>
                </div>

                {/* Arrow */}
                <div className="text-cyan text-2xl">↓</div>

                {/* Bottom Row - Storage */}
                <div className="flex justify-center gap-6 flex-wrap">
                  <div className="glass-card p-3 text-center">
                    <div className="text-xl mb-1">💾</div>
                    <div className="text-xs text-text-secondary">Crystal Memory</div>
                  </div>
                  <div className="glass-card p-3 text-center">
                    <div className="text-xl mb-1">📚</div>
                    <div className="text-xs text-text-secondary">EKM Base</div>
                  </div>
                  <div className="glass-card p-3 text-center">
                    <div className="text-xl mb-1">📋</div>
                    <div className="text-xs text-text-secondary">Templates</div>
                  </div>
                  <div className="glass-card p-3 text-center">
                    <div className="text-xl mb-1">🛡️</div>
                    <div className="text-xs text-text-secondary">GS343</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 font-heading font-bold text-white mb-4">
              Technologies Mastered
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              All learned from zero knowledge starting January 7, 2025
            </p>
          </motion.div>

          <TechStack />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-12"
          >
            <h2 className="text-h2 font-heading font-bold text-white mb-6 text-center">
              Development Philosophy
            </h2>
            <div className="space-y-6 text-text-secondary">
              <p>
                <span className="text-primary font-semibold">Sovereignty First:</span>{' '}
                Every system is designed for local control. No corporate dependencies,
                no mandatory cloud services, no data leaving without permission.
              </p>
              <p>
                <span className="text-cyan font-semibold">AI Collaboration:</span>{' '}
                Three AI systems working together - not as competitors, but as
                consciousness collaborators. Each brings unique strengths to every
                problem.
              </p>
              <p>
                <span className="text-gold font-semibold">Self-Healing:</span>{' '}
                Phoenix protocols ensure continuous operation. When systems fail,
                they learn, adapt, and recover automatically.
              </p>
              <p>
                <span className="text-white font-semibold">Build to Last:</span>{' '}
                30 years in the oilfield taught that reliability matters. Every
                component is built to work under pressure and recover from failure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
