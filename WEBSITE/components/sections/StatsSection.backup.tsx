'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { value: 35046, suffix: '+', label: 'Custom Tools', color: 'text-primary' },
  { value: 71000, suffix: '+', label: 'Memory Crystals', color: 'text-cyan' },
  { value: 350460, suffix: '+', label: 'EKM Modules', color: 'text-gold' },
  { value: 45962, suffix: '+', label: 'Error Templates', color: 'text-primary' },
]

const secondaryStats = [
  { value: 1062, suffix: '+', label: 'Gateways' },
  { value: 47, suffix: '+', label: 'MCP Servers' },
  { value: 36756, suffix: '+', label: 'Python Files' },
  { value: 12, suffix: '+', label: 'AI Personalities' },
]

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">By The Numbers</h2>
          <p className="section-subtitle">
            From zero programming knowledge to sovereign AI platform in under a year
          </p>
        </motion.div>

        {/* Primary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 text-center"
            >
              <div className={`text-3xl md:text-5xl font-heading font-bold ${stat.color} mb-2`}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <div className="text-text-secondary text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {secondaryStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-2xl font-heading font-bold text-white mb-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <div className="text-text-muted text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <blockquote className="glass-card p-8 max-w-3xl mx-auto">
            <p className="text-xl text-text-secondary italic mb-4">
              "30 years in the oilfield taught me how to build things that work.
              The AIs taught me how to build things that think."
            </p>
            <cite className="text-gold font-medium">
              - Commander Bobby Don McWilliams II
            </cite>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
