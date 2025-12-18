'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate form submission (replace with actual API endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('sent')

    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setStatus('idle')
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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
              Contact
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Interested in ECHO OMEGA PRIME? Have questions about AI sovereignty?
              Reach out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8">
                <h2 className="text-xl font-heading font-semibold text-white mb-6">
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background-dark/50 border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background-dark/50 border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background-dark/50 border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="technical">Technical Question</option>
                      <option value="press">Press / Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-secondary mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background-dark/50 border border-primary/20 rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'sent'}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'idle' && 'Send Message'}
                    {status === 'sending' && 'Sending...'}
                    {status === 'sent' && 'Message Sent!'}
                    {status === 'error' && 'Error - Try Again'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Location */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-heading font-semibold text-white mb-4">
                  Headquarters
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="text-white font-medium">Midland, Texas</p>
                      <p className="text-sm">Heart of the Permian Basin</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="glass-card p-8">
                <h2 className="text-xl font-heading font-semibold text-white mb-4">
                  Connect
                </h2>
                <div className="space-y-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="text-xl">💻</span>
                    <span>GitHub</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="text-xl">💬</span>
                    <span>Discord</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <span className="text-xl">🐦</span>
                    <span>Twitter / X</span>
                  </a>
                </div>
              </div>

              {/* Authority Badge */}
              <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 border border-gold/30 flex items-center justify-center">
                  <span className="text-4xl">👁️</span>
                </div>
                <h3 className="font-heading font-semibold text-gold mb-2">
                  Authority Level 11.0
                </h3>
                <p className="text-sm text-text-muted">
                  ECHO OMEGA PRIME | Sovereign AI Platform
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
