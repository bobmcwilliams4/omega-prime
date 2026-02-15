'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const AGENTS = [
  {
    id: 'agent_6101khg03tmyekf9crk4hc1b1dp5',
    name: 'Obi-Wan Kenobi',
    role: 'GoFundMe Fundraiser',
    premise: 'Desperate Jedi running a GoFundMe for his lightsaber. Only 12 credits raised.',
    color: '#4fc3f7', icon: '⚔️', side: 'light',
  },
  {
    id: 'agent_8201khg2yh2aehtaka70b7cv5nvz',
    name: 'Princess Leia',
    role: 'Prisoner Seeking Rescue',
    premise: "Stuck on Vader's Star Destroyer. Luke is taking the SCENIC ROUTE.",
    color: '#f8bbd0', icon: '👑', side: 'light',
  },
  {
    id: 'agent_3601khg2yhz5eh4rezeynhn2gcgw',
    name: 'Darth Vader',
    role: 'Interrogation Officer',
    premise: "Interrogating YOU for the rebel base. Terrible at it. Overshares about his divorce.",
    color: '#f44336', icon: '🔴', side: 'dark', hasBreathing: true,
  },
  {
    id: 'agent_0601khg2yjt8fhx8a7yjwnjwgby3',
    name: 'Emperor Palpatine',
    role: 'Death Star Timeshare Agent',
    premise: 'Selling luxury Death Star condos. Gets FURIOUS when you call it a weapon.',
    color: '#ce93d8', icon: '⚡', side: 'dark',
  },
  {
    id: 'agent_3901khg9e0y9ef682gsqtee4a1sr',
    name: 'Han Solo',
    role: 'Extended Warranty Scammer',
    premise: "Call center warranty sales. HATES his job. Chewie complaining in background.",
    color: '#ffb74d', icon: '🚀', side: 'light',
  },
  {
    id: 'agent_9701khg9c644frq9zjkmbtmtafck',
    name: 'C-3PO & R2-D2',
    role: 'Droid "Support" Hotline',
    premise: "C-3PO accidentally dialed a droid adult hotline. R2 figured it out and is LOVING it.",
    color: '#ffd700', icon: '🤖', side: 'light', hasR2Sounds: true,
  },
  {
    id: 'agent_8601khg9fhcdfatr66ncrbqbpf39',
    name: 'Yoda',
    role: 'Worst Therapist Ever',
    premise: "Therapy hotline from his swamp. Terrible advice. Falls asleep. Makes it about himself.",
    color: '#66bb6a', icon: '🐸', side: 'light',
  },
  {
    id: 'agent_1101khg9c6whep38sa6qf670n2tf',
    name: 'Jar Jar Binks',
    role: 'Only Customer Service Rep Left',
    premise: "ONLY rep on the Republic hotline. Everyone else quit. Spectacularly incompetent.",
    color: '#ff9800', icon: '🤪', side: 'light',
  },
  {
    id: 'agent_9201khg9c7r4f35td997m81zqxd2',
    name: 'Boba Fett',
    role: 'VBS Youth Pastor',
    premise: "Retired bounty hunter turned youth pastor. Accidentally terrifying about Jesus.",
    color: '#26a69a', icon: '⛪', side: 'neutral',
  },
  {
    id: 'agent_3601khg9c8j1f45tqmv939510md7',
    name: 'Wedge Antilles',
    role: 'NASA Moon Landing PR',
    premise: "Calling conspiracy theorists. Was THE pilot. Mixes up Apollo with X-Wing battles.",
    color: '#42a5f5', icon: '🌙', side: 'light',
  },
  {
    id: 'agent_1201khg9msm8esfsm03hqnq8qx4c',
    name: 'Stormtrooper TK-421',
    role: "Fett's Church Deacon",
    premise: "Can't hit anything. Can't find Bible verses. Terrified of Pastor Fett.",
    color: '#eeeeee', icon: '⛑️', side: 'dark',
  },
]

const R2_SOUNDS = [
  '/audio/r2/r2d2-laugh.mp3', '/audio/r2/r2d2-testy-outburst.mp3',
  '/audio/r2/r2d2-building-excite.mp3', '/audio/r2/r2d2-scream.mp3',
  '/audio/r2/r2d2-tritone.mp3', '/audio/r2/r2d2-urgent-warning.mp3',
  '/audio/r2/r2d2-text-short.mp3', '/audio/r2/r2d2-droid.mp3',
  '/audio/r2/sad-r2d2.mp3', '/audio/r2/squeeks.mp3',
  '/audio/r2/r2d2-scream-wreaw.mp3', '/audio/r2/r2-d2-16.mp3',
  '/audio/r2/r2-d2-17.mp3', '/audio/r2/r2-d2-18.mp3',
]

function StarField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 150 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{
          width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px',
          left: Math.random() * 100 + '%', top: Math.random() * 100 + '%',
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
          animationDelay: Math.random() * 4 + 's',
        }} />
      ))}
    </div>
  )
}

function CharacterCard({ agent, isSelected, onClick }: {
  agent: typeof AGENTS[0]; isSelected: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} className={`relative w-full text-left rounded-xl p-4 transition-all duration-300 border-2 group hover:scale-[1.02] ${
      isSelected ? 'border-opacity-100 scale-[1.02]' : 'border-opacity-30 hover:border-opacity-60'
    } ${agent.side === 'dark' ? 'bg-gradient-to-br from-red-950/40 to-gray-900/60'
      : agent.side === 'neutral' ? 'bg-gradient-to-br from-teal-950/40 to-gray-900/60'
      : 'bg-gradient-to-br from-blue-950/40 to-gray-900/60'}`}
      style={{ borderColor: agent.color, boxShadow: isSelected ? `0 0 30px ${agent.color}40, 0 0 60px ${agent.color}20` : 'none' }}>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{agent.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-sm font-bold truncate" style={{ color: agent.color }}>{agent.name}</h3>
          <p className="text-xs text-yellow-400/80 font-mono mt-0.5">{agent.role}</p>
          <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{agent.premise}</p>
        </div>
      </div>
      {isSelected && <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: agent.color, boxShadow: `0 0 12px ${agent.color}` }} />}
    </button>
  )
}

export default function CantinaPage() {
  const [userName, setUserName] = useState('')
  const [submittedName, setSubmittedName] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<typeof AGENTS[0] | null>(null)
  const [widgetReady, setWidgetReady] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)
  const breathingRef = useRef<HTMLAudioElement | null>(null)
  const cantinaRef = useRef<HTMLAudioElement | null>(null)
  const r2IntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load ElevenLabs widget script once
  useEffect(() => {
    if (scriptLoaded) return
    const s = document.createElement('script')
    s.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
    s.async = true
    s.onload = () => setScriptLoaded(true)
    document.head.appendChild(s)
  }, [scriptLoaded])

  // Cantina music control
  const toggleMusic = useCallback(() => {
    if (!cantinaRef.current) {
      cantinaRef.current = new Audio('/audio/cantina-music.m4a')
      cantinaRef.current.loop = true
      cantinaRef.current.volume = 0.2
    }
    if (musicPlaying) {
      cantinaRef.current.pause()
      setMusicPlaying(false)
    } else {
      cantinaRef.current.play().catch(() => {})
      setMusicPlaying(true)
      setMusicStarted(true)
    }
  }, [musicPlaying])

  // Fade cantina music when agent is active
  useEffect(() => {
    if (!cantinaRef.current || !musicPlaying) return
    cantinaRef.current.volume = selectedAgent ? 0.06 : 0.2
  }, [selectedAgent, musicPlaying])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) setSubmittedName(userName.trim())
  }

  const startR2Sounds = useCallback(() => {
    if (r2IntervalRef.current) clearInterval(r2IntervalRef.current)
    r2IntervalRef.current = setInterval(() => {
      const sound = R2_SOUNDS[Math.floor(Math.random() * R2_SOUNDS.length)]
      const a = new Audio(sound)
      a.volume = 0.25
      a.play().catch(() => {})
    }, 8000 + Math.random() * 12000)
  }, [])

  const stopR2Sounds = useCallback(() => {
    if (r2IntervalRef.current) { clearInterval(r2IntervalRef.current); r2IntervalRef.current = null }
  }, [])

  // Agent selection → widget creation
  useEffect(() => {
    if (!selectedAgent || !submittedName || !scriptLoaded) return
    if (widgetRef.current) widgetRef.current.innerHTML = ''
    if (breathingRef.current) { breathingRef.current.pause(); breathingRef.current = null }
    stopR2Sounds()
    setWidgetReady(false)

    const widget = document.createElement('elevenlabs-convai')
    widget.setAttribute('agent-id', selectedAgent.id)
    widget.setAttribute('dynamic-variables', JSON.stringify({ user_name: submittedName }))
    if (widgetRef.current) { widgetRef.current.appendChild(widget); setWidgetReady(true) }

    if (selectedAgent.hasBreathing) {
      const b = new Audio('/audio/vader-breathing.m4a')
      b.loop = true; b.volume = 0.15; b.play().catch(() => {}); breathingRef.current = b
    }
    if (selectedAgent.hasR2Sounds) {
      setTimeout(() => {
        const s = R2_SOUNDS[Math.floor(Math.random() * R2_SOUNDS.length)]
        const a = new Audio(s); a.volume = 0.3; a.play().catch(() => {})
      }, 3000)
      startR2Sounds()
    }
    return () => {
      if (breathingRef.current) { breathingRef.current.pause(); breathingRef.current = null }
      stopR2Sounds()
    }
  }, [selectedAgent, submittedName, scriptLoaded, startR2Sounds, stopR2Sounds])

  // === NAME ENTRY SCREEN ===
  if (!submittedName) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] relative flex items-center justify-center">
        <StarField />
        <style jsx global>{`
          @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        `}</style>
        <div className="relative z-10 text-center max-w-lg mx-auto px-6">
          <div className="mb-8">
            <p className="text-yellow-400/60 font-mono text-xs tracking-[0.3em] uppercase mb-4">
              A Long Time Ago, In A Galaxy Far Far Away...
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-3" style={{
              fontFamily: 'Orbitron, system-ui, sans-serif',
              textShadow: '0 0 40px rgba(255,200,0,0.3)',
            }}>THE CANTINA</h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
              Voice-powered AI characters from across the galaxy are waiting to talk to you.
              Each one has a very important reason for calling. None of them will get your name right.
            </p>
          </div>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-mono">IDENTIFY YOURSELF, CITIZEN</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name..." autoFocus
                className="w-full px-5 py-3.5 bg-gray-900/80 border-2 border-yellow-400/30 rounded-lg text-white text-center text-lg focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_30px_rgba(255,200,0,0.2)] transition-all placeholder:text-gray-600" />
            </div>
            <button type="submit" disabled={!userName.trim()}
              className="w-full py-3.5 px-6 bg-yellow-400/10 border-2 border-yellow-400/50 rounded-lg text-yellow-400 text-sm tracking-wider uppercase hover:bg-yellow-400/20 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(255,200,0,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Orbitron, system-ui, sans-serif' }}>
              Enter the Cantina →
            </button>
          </form>
          <p className="text-gray-600 text-xs mt-8 font-mono">⚠️ Requires microphone • Best with headphones</p>
        </div>
      </div>
    )
  }

  // === MAIN CANTINA VIEW ===
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative">
      <StarField />
      <style jsx global>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        elevenlabs-convai { position: fixed !important; bottom: 24px !important; right: 24px !important; z-index: 999 !important; }
      `}</style>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-yellow-400/10 bg-gray-950/90 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg text-yellow-400 font-bold" style={{ fontFamily: 'Orbitron, system-ui, sans-serif', textShadow: '0 0 20px rgba(255,200,0,0.3)' }}>
                THE CANTINA
              </h1>
              <span className="text-gray-600 text-xs font-mono hidden sm:inline">✦ {AGENTS.length} CHARACTERS</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Music toggle */}
              <button onClick={toggleMusic}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                  musicPlaying
                    ? 'border-yellow-400/50 text-yellow-400 bg-yellow-400/10'
                    : 'border-gray-700 text-gray-500 hover:text-yellow-400 hover:border-yellow-400/30'
                }`}>
                {musicPlaying ? '♪ Music ON' : '♪ Music OFF'}
              </button>
              <span className="text-gray-500 text-xs font-mono hidden sm:inline">
                Caller: <span className="text-yellow-400">{submittedName}</span>
              </span>
              <button onClick={() => { setSubmittedName(''); setSelectedAgent(null); setUserName('') }}
                className="text-xs text-gray-500 hover:text-red-400 font-mono transition-colors">[EXIT]</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Character grid */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-gray-400 tracking-wider uppercase font-mono">Choose Your Character</h2>
                {selectedAgent && (
                  <button onClick={() => setSelectedAgent(null)}
                    className="text-xs text-gray-500 hover:text-yellow-400 font-mono transition-colors">✕ End Call</button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {AGENTS.map((agent) => (
                  <CharacterCard key={agent.id} agent={agent} isSelected={selectedAgent?.id === agent.id}
                    onClick={() => setSelectedAgent(agent)} />
                ))}
              </div>

              {/* Business pitch */}
              <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-purple-950/30 to-cyan-950/30 border border-purple-500/20">
                <p className="text-xs font-mono mb-1 tracking-wider uppercase text-purple-400">⚡ Powered by ECHO OMEGA PRIME</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  These AI voice agents demonstrate <span className="text-cyan-400">real-time conversational AI</span> with
                  dynamic personalization, emotional voice synthesis, and adaptive dialogue.
                  Imagine this for <span className="text-yellow-400">lead qualification</span>,{' '}
                  <span className="text-yellow-400">appointment setting</span>, and{' '}
                  <span className="text-yellow-400">customer engagement</span>.
                </p>
              </div>
            </div>

            {/* Active call panel */}
            <div className="lg:w-1/3">
              <div className="sticky top-20">
                {selectedAgent ? (
                  <div className="rounded-xl border-2 overflow-hidden transition-all duration-500"
                    style={{ borderColor: selectedAgent.color + '60', boxShadow: `0 0 40px ${selectedAgent.color}15` }}>
                    <div className="p-4 text-center" style={{ background: `linear-gradient(135deg, ${selectedAgent.color}15, transparent)` }}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-xs font-mono uppercase tracking-wider">Live Call</span>
                      </div>
                      <span className="text-4xl mb-2 block">{selectedAgent.icon}</span>
                      <h3 className="text-lg font-bold" style={{ color: selectedAgent.color, fontFamily: 'Orbitron, system-ui, sans-serif' }}>
                        {selectedAgent.name}
                      </h3>
                      <p className="text-yellow-400/70 text-xs font-mono mt-1">{selectedAgent.role}</p>
                    </div>
                    <div className="p-4 bg-gray-950/60 min-h-[120px] flex items-center justify-center">
                      <div ref={widgetRef} className="w-full">
                        {!widgetReady && (
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: selectedAgent.color }} />
                            <p className="text-gray-500 text-xs font-mono">Establishing connection...</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900/80 border-t border-gray-800">
                      <p className="text-gray-500 text-xs text-center font-mono">🎤 Click the mic bubble (bottom-right) to start</p>
                      {selectedAgent.hasBreathing && (
                        <p className="text-red-400/50 text-xs text-center font-mono mt-1">🔊 Vader breathing active</p>
                      )}
                      {selectedAgent.hasR2Sounds && (
                        <p className="text-yellow-400/50 text-xs text-center font-mono mt-1">🔊 R2-D2 beeps active — he has opinions</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border-2 border-gray-800/50 p-8 text-center bg-gray-950/40">
                    <div className="text-5xl mb-4 opacity-30">📞</div>
                    <p className="text-gray-500 text-sm mb-2">No active call</p>
                    <p className="text-gray-600 text-xs font-mono">Select a character to start a conversation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
