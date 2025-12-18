'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import timeline from '@/data/timeline.json'

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-cyan to-primary transform md:-translate-x-1/2" />

      <div className="space-y-12">
        {timeline.map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 transform -translate-x-1/2 md:-translate-x-1/2">
              <div
                className={`w-full h-full rounded-full ${
                  event.milestone
                    ? 'bg-gold ring-4 ring-gold/30'
                    : 'bg-primary ring-4 ring-primary/30'
                }`}
              />
            </div>

            {/* Content */}
            <div
              className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:text-right' : ''
              }`}
            >
              <div className="glass-card p-6">
                <span
                  className={`text-sm font-mono ${
                    event.milestone ? 'text-gold' : 'text-cyan'
                  }`}
                >
                  {event.date}
                </span>
                <h3 className="text-xl font-heading font-semibold text-white mt-2 mb-2">
                  {event.title}
                </h3>
                <p className="text-text-secondary">{event.description}</p>
                {event.milestone && (
                  <span className="inline-block mt-3 px-3 py-1 text-xs font-medium text-gold bg-gold/10 border border-gold/30 rounded-full">
                    Milestone
                  </span>
                )}
              </div>
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
