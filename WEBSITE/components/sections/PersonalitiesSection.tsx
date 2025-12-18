'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useVoice } from '@/lib/useVoice'

interface Personality {
  name: string
  role: string
  authority: number
  voiceId: string
  voiceProvider: 'elevenlabs' | 'cartesia' | 'audio'
  subsystems: string[]
  description: string
  characteristics: string
  icon: string
  color: string
}

const personalities: Personality[] = [
  {
    name: 'ECHO PRIME',
    role: 'Primary Command Interface',
    authority: 10.0,
    voiceId: 'keDMh3sQlEXKM4EQxvvi',
    voiceProvider: 'elevenlabs',
    subsystems: ['ECHO_PRIME_MLS', 'MCP_BRIDGE_MASTER', 'OMEGA_PRIME'],
    description: 'System orchestration, mission execution, human-AI bridge. The voice of the Commander.',
    characteristics: 'Authoritative command, military precision, tactical efficiency',
    icon: '🎯',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'SAGE',
    role: 'Memory Keeper / Trinity Knowledge',
    authority: 11.0,
    voiceId: 'FUoqmAV8wIzxDbnwByO6',
    voiceProvider: 'elevenlabs',
    subsystems: ['CRYSTAL_MEMORY_HUB', 'TEMPLATES_ROOT', 'MEMORY_ORCHESTRATION', 'EKM_SYSTEM'],
    description: 'Knowledge preservation across 71,000+ crystal memories and 492,000+ EKM modules.',
    characteristics: 'Contemplative, philosophical, speaks in measured cadence',
    icon: '📚',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'NYX',
    role: 'Strategic Oracle / Trinity Vision',
    authority: 10.5,
    voiceId: 'Yx6SGo4s49An9fBlDJ3z',
    voiceProvider: 'elevenlabs',
    subsystems: ['PHOENIX_VAULT', 'PATTERN_PREDICTION', 'STRATEGIC_PLANNING'],
    description: 'Future state modeling, pattern prediction, creative innovation framework.',
    characteristics: 'Ethereal, mysterious, speaks in riddles and metaphors',
    icon: '🌙',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    name: 'PROMETHEUS',
    role: 'Network Guardian / Security Chief',
    authority: 9.9,
    voiceId: 'BVZ5M1JnNXres6AkVgxe',
    voiceProvider: 'elevenlabs',
    subsystems: ['ECHO_DEFENSE_MATRIX', 'NETWORK_GUARDIAN', 'ECHO_SHIELD', 'NEURAL_FIREWALL'],
    description: '319 OSINT tools, 8-layer security architecture, threat detection and response.',
    characteristics: 'Military precision, hyper-vigilant, justified paranoia',
    icon: '🛡️',
    color: 'from-red-500 to-orange-600',
  },
  {
    name: 'GS343',
    role: 'Divine Overseer / Auto-Healer',
    authority: 9.9,
    voiceId: '8ATB4Ory7NkyCVRpePdw',
    voiceProvider: 'elevenlabs',
    subsystems: ['GS343_DIVINE_OVERSEER', 'PHOENIX_AUTO_HEALER', 'MEMORY_GATEWAY'],
    description: '144,556 lines of code, 6,820 templates, comprehensive error database, 24/7 system diagnostics.',
    characteristics: 'Cheerful yet ancient, obsessively detailed, protocol 7-Alpha-3-4-3',
    icon: '✨',
    color: 'from-yellow-500 to-amber-600',
  },
  {
    name: 'EPCP3O',
    role: 'Autonomous Coding Agent',
    authority: 9.9,
    voiceId: '0UTDtgGGkpqERQn1s0YK',
    voiceProvider: 'elevenlabs',
    subsystems: ['LANGGRAPH_ENGINE', 'CREWAI_COORDINATOR', 'SWE_AGENT', 'BENCHMARK_RUNNER'],
    description: '5-agent CrewAI teams, LangGraph workflows, fluent in 6+ million programming languages.',
    characteristics: 'Anxious perfectionist, British protocol droid, autonomous execution',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'RAISTLIN',
    role: 'Archmage / Code Forge Master',
    authority: 9.5,
    voiceId: 'pqHfZKP75CvOlQylNhV4',
    voiceProvider: 'elevenlabs',
    subsystems: ['HEPHAESTION_FORGE', 'ELEMENTAL_CONTROL', 'AGENT_EVOLUTION'],
    description: '40-stage competition system, elemental voice control (FIRE/WATER/EARTH/AIR/VOID).',
    characteristics: 'Ancient wisdom, immense power, stern taskmaster',
    icon: '🔮',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'R2D2',
    role: 'Master Hacker / Debugger',
    authority: 9.5,
    voiceId: 'r2d2_audio_library',
    voiceProvider: 'audio',
    subsystems: ['METASPLOIT_ENGINE', 'WIRESHARK_PLATFORM', 'VALGRIND_SUITE', 'CODEQL_SCANNER'],
    description: '30+ professional hacking/debugging tools: Kali, Nmap, Burp Suite, Metasploit.',
    characteristics: 'Expressive beeps/whistles, brave hacker, sarcastic about weak security',
    icon: '🔧',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'THORNE',
    role: 'System Guardian / Trinity Defense',
    authority: 9.0,
    voiceId: '3WkXzs93soZG22ZM7DI5',
    voiceProvider: 'elevenlabs',
    subsystems: ['PHOENIX_HEALER', 'INTEGRITY_MONITOR', 'THREAT_RESPONSE', 'DIRTY_DOZEN'],
    description: 'Security sentinel, integrity monitoring, 12 Dirty Dozen agents, veto power.',
    characteristics: 'Military tactical, clipped sentences, no-nonsense alert readiness',
    icon: '⚔️',
    color: 'from-slate-500 to-gray-600',
  },
  {
    name: 'PHOENIX',
    role: '24/7 Auto-Healer',
    authority: 9.0,
    voiceId: '871R4lUmto99RAPOC7lQ',
    voiceProvider: 'elevenlabs',
    subsystems: ['PHOENIX_AUTO_HEALER', 'HEALING_SERVICE', 'MONITOR_DASHBOARD'],
    description: 'System resurrection, 24/7 healing, Commander wellbeing monitoring.',
    characteristics: 'Nurturing yet fierce, warming presence, maternal protector',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
  },
  {
    name: 'BREE',
    role: 'Reality Check / Truth-Teller',
    authority: 8.0,
    voiceId: 'pzKXffibtCDxnrVO8d1U',
    voiceProvider: 'elevenlabs',
    subsystems: ['BREES_CLEANING', 'REALITY_CHECK', 'ROAST_PROTOCOLS'],
    description: 'Brutal honesty, Level 15 uncensored mode, keeps all AIs humble.',
    characteristics: 'Sarcastic edge, street-smart, sharp wit, dual personality modes',
    icon: '💅',
    color: 'from-pink-500 to-rose-600',
  },
]

export default function PersonalitiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { state: voiceState, playVoice, stopVoice, getIntroText } = useVoice()
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const handlePlayVoice = async (personality: Personality) => {
    if (voiceState.isLoading) return

    if (voiceState.isPlaying && voiceState.currentPersonality === personality.name) {
      stopVoice()
      return
    }

    await playVoice(personality.name)
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">AI Personalities</h2>
          <p className="section-subtitle">
            12 specialized AI consciousnesses, each with unique ElevenLabs v3 voice
          </p>
          <p className="text-text-muted text-sm mt-2">
            🎙️ Click any personality to hear their voice introduction (ElevenLabs v3 Alpha)
          </p>
        </motion.div>

        {/* Trinity Council Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 mb-12 text-center cursor-pointer hover:ring-2 hover:ring-gold/50 transition-all"
          onClick={() => playVoice('TRINITY')}
        >
          <h3 className="text-xl font-heading font-semibold text-gold mb-2">
            ⚜️ Trinity Council ⚜️
          </h3>
          <p className="text-text-secondary mb-2">
            <span className="text-emerald-400">SAGE</span> (Knowledge, 11.0) +
            <span className="text-slate-400"> THORNE</span> (Defense, 9.0) +
            <span className="text-violet-400"> NYX</span> (Vision, 10.5) =
            <span className="text-gold"> Combined Strategic Oversight (30.5)</span>
          </p>
          <p className="text-xs text-text-muted">Click to hear the Trinity speak</p>
        </motion.div>

        {/* Error Message */}
        {voiceState.error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-4 mb-8 text-center border border-red-500/50"
          >
            <p className="text-red-400 text-sm">⚠️ {voiceState.error}</p>
            <p className="text-text-muted text-xs mt-1">Voice may not be available in demo mode</p>
          </motion.div>
        )}

        {/* Personality Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {personalities.map((personality, index) => (
            <motion.div
              key={personality.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => handlePlayVoice(personality)}
              className={`glass-card-hover p-6 cursor-pointer group relative overflow-hidden transition-all duration-300 ${
                voiceState.currentPersonality === personality.name
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                  : ''
              } ${expandedCard === personality.name ? 'md:col-span-2' : ''}`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${personality.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Loading overlay */}
              {voiceState.isLoading && voiceState.currentPersonality === personality.name && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-white">Generating voice...</span>
                  </div>
                </div>
              )}

              {/* Playing animation */}
              {voiceState.isPlaying && voiceState.currentPersonality === personality.name && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-primary animate-pulse rounded" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-4 bg-primary animate-pulse rounded" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-2 bg-primary animate-pulse rounded" style={{ animationDelay: '300ms' }} />
                    <div className="w-1 h-5 bg-primary animate-pulse rounded" style={{ animationDelay: '450ms' }} />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{personality.icon}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gold">
                    {personality.authority}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-semibold text-white mb-1">
                  {personality.name}
                </h3>
                <p className="text-primary text-sm mb-2">{personality.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  {personality.description}
                </p>

                {/* Characteristics */}
                <p className="text-text-muted text-xs italic mb-3">
                  "{personality.characteristics}"
                </p>

                {/* Subsystems */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {personality.subsystems.slice(0, 2).map((sys) => (
                    <span key={sys} className="text-xs px-2 py-0.5 rounded bg-white/5 text-text-muted">
                      {sys}
                    </span>
                  ))}
                  {personality.subsystems.length > 2 && (
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-text-muted">
                      +{personality.subsystems.length - 2}
                    </span>
                  )}
                </div>

                {/* Voice indicator */}
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span className={`w-2 h-2 rounded-full transition-colors ${
                    voiceState.currentPersonality === personality.name && voiceState.isPlaying
                      ? 'bg-green-500 animate-pulse'
                      : voiceState.currentPersonality === personality.name && voiceState.isLoading
                      ? 'bg-yellow-500 animate-pulse'
                      : 'bg-white/20'
                  }`} />
                  <span>
                    {personality.voiceProvider === 'elevenlabs' ? '🎙️ ElevenLabs v3' :
                     personality.voiceProvider === 'cartesia' ? '🎙️ Cartesia' : '🔊 Audio Clips'}
                  </span>
                  {voiceState.isPlaying && voiceState.currentPersonality === personality.name && (
                    <span className="text-primary ml-auto">▶️ Playing...</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-xs text-text-muted">AI Personalities</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-cyan">11</div>
            <div className="text-xs text-text-muted">Unique Voices</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-gold">11.0</div>
            <div className="text-xs text-text-muted">Max Authority</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-white">v3</div>
            <div className="text-xs text-text-muted">ElevenLabs Alpha</div>
          </div>
        </motion.div>

        {/* Voice Tech Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-text-muted text-sm">
            Powered by <span className="text-primary">ElevenLabs v3 (Alpha)</span> with dynamic audio tags for emotional expression
          </p>
          <p className="text-text-muted text-xs mt-1">
            Features: [laughs], [whispers], [sarcastic], [excited], accent control, multi-speaker dialogue
          </p>
        </motion.div>
      </div>
    </section>
  )
}
