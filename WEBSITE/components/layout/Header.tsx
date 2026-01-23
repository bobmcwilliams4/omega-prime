'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Systems', href: '/systems' },
  { label: 'Technology', href: '/technology' },
  { label: 'SENTINEL', href: '/sentinel' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background-dark/80 backdrop-blur-xl border-b border-primary/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-heading font-bold text-xl">
                E
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-cyan opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-xl text-gradient">
                ECHO OMEGA PRIME
              </span>
              <div className="text-xs text-text-muted">Authority 11.0</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-text-secondary hover:text-white transition-colors duration-200 font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-cyan group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={cn(
                  'w-full h-0.5 bg-current transform transition-all duration-300',
                  isMobileMenuOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 bg-current transition-all duration-300',
                  isMobileMenuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'w-full h-0.5 bg-current transform transition-all duration-300',
                  isMobileMenuOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background-dark/95 backdrop-blur-xl border-b border-primary/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg text-text-secondary hover:text-white hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
