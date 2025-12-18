'use client'

import { motion } from 'framer-motion'
import SystemsGrid from '@/components/sections/SystemsGrid'

export default function SystemsPage() {
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
              System Catalog
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Explore the 22+ integrated subsystems that power ECHO OMEGA PRIME.
              Each system is a specialized expert, working in harmony.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SystemsGrid />
        </div>
      </section>
    </div>
  )
}
