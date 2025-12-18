'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import technologies from '@/data/technologies.json'
import type { Technology, TechCategory } from '@/lib/types'

const categories: TechCategory[] = [
  'Languages',
  'Frameworks',
  'AI & ML',
  'Databases',
  'Infrastructure',
  'Tools',
]

function ProgressBar({ value, inView }: { value: number; inView: boolean }) {
  return (
    <div className="h-2 bg-background-dark/50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary to-cyan rounded-full"
      />
    </div>
  )
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>('Languages')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredTech = (technologies as Technology[]).filter(
    (tech) => tech.category === activeCategory
  )

  return (
    <div ref={ref}>
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeCategory === category
                ? 'bg-primary text-white shadow-[0_0_20px_rgba(153,0,255,0.4)]'
                : 'bg-background-card/60 text-text-secondary hover:text-white border border-primary/20 hover:border-primary/40'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tech Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-heading font-semibold text-white">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">{tech.description}</p>
                </div>
                <span className="text-2xl font-heading font-bold text-primary">
                  {tech.proficiency}%
                </span>
              </div>
              <ProgressBar value={tech.proficiency} inView={isInView} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
