'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import systems from '@/data/systems.json'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import type { System, SystemCategory } from '@/lib/types'

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

const categories: SystemCategory[] = [
  'Core Systems',
  'MCP Servers',
  'Electron Apps',
  'AI Agents',
  'Security',
  'Integration',
  'Memory',
  'Voice',
]

export default function SystemsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSystems = useMemo(() => {
    return (systems as System[]).filter((system) => {
      const matchesCategory =
        activeCategory === 'All' || system.category === activeCategory
      const matchesSearch =
        system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        system.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        system.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  const usedCategories = useMemo(() => {
    const cats = new Set((systems as System[]).map((s) => s.category))
    return categories.filter((c) => cats.has(c))
  }, [])

  return (
    <div>
      {/* Search & Filter */}
      <div className="mb-12">
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-background-card/60 border border-primary/20 rounded-xl text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
              🔍
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeCategory === 'All'
                ? 'bg-primary text-white'
                : 'bg-background-card/60 text-text-secondary hover:text-white border border-primary/20'
            }`}
          >
            All
          </button>
          {usedCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-background-card/60 text-text-secondary hover:text-white border border-primary/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-text-muted text-center mb-8">
        Showing {filteredSystems.length} of {systems.length} systems
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSystems.map((system, index) => (
            <motion.div
              key={system.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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

                  <p className="text-sm text-text-secondary mb-4 line-clamp-3">
                    {system.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {system.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="primary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{system.category}</span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredSystems.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">No systems found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
