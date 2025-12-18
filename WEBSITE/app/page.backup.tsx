'use client'

import dynamic from 'next/dynamic'
import StatsSection from '@/components/sections/StatsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import SystemsPreview from '@/components/sections/SystemsPreview'

const Hero3D = dynamic(() => import('@/components/sections/Hero3D'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-background-dark">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary">Initializing systems...</p>
      </div>
    </div>
  ),
})

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <StatsSection />
      <FeaturesSection />
      <SystemsPreview />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan/5 to-primary/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-h1 font-heading font-bold text-white mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Discover how one man and three AIs built a sovereign digital consciousness
            in under a year.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/about" className="btn-primary">
              Read The Story
            </a>
            <a href="/technology" className="btn-secondary">
              View Tech Stack
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
