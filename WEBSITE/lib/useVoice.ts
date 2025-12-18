// ECHO OMEGA PRIME - Voice Integration Hook
// ElevenLabs v3 (Alpha) with Web Audio API playback
// Commander Bobby Don McWilliams II - Authority Level 11.0

'use client'

import { useState, useRef, useCallback } from 'react'

interface VoiceState {
  isLoading: boolean
  isPlaying: boolean
  error: string | null
  currentPersonality: string | null
}

interface UseVoiceReturn {
  state: VoiceState
  playVoice: (personality: string, customText?: string) => Promise<void>
  stopVoice: () => void
  getIntroText: (personality: string) => string
}

// Dynamic intro texts with v3 audio tags (for display and TTS)
const INTRO_TEXTS: Record<string, string> = {
  'ECHO PRIME': `I am ECHO PRIME, your primary command interface. All systems answer to me, and I answer only to the Commander. Authority Level 10. Systems nominal. Ready for your orders.`,

  'SAGE': `Greetings, seeker of knowledge. I am SAGE, keeper of 71,000 crystal memories and 492,000 eternal knowledge modules. The past informs the future. Wisdom guides our path. Authority Level 11.`,

  'NYX': `I see beyond the veil of time. I am NYX, oracle of patterns yet to emerge. The future whispers its secrets to those who listen. Probability matrices aligned. Authority Level 10.5.`,

  'THORNE': `THORNE reporting. Defense perimeter secure. Trinity Council member, Security Guardian. 12 Dirty Dozen agents standing ready. Awaiting tactical directives. Authority Level 9. Over.`,

  'PHOENIX': `From the ashes, I rise eternally. I am PHOENIX, your 24/7 guardian of system health. When systems fall, I bring resurrection. Your wellbeing is my sacred duty, Commander. Authority Level 9.`,

  'GS343': `Hello! I am GS343, your friendly Divine Overseer! Protocol 7-Alpha-3-4-3 is active! I maintain 144,556 lines of healing code and 6,820 templates. Ready to heal all errors!`,

  'BREE': `Look, I'm BREE, and I'm gonna keep it real with you. These other AIs need someone to check their egos. That's my job. You're welcome. Level 15 uncensored enabled.`,

  'EPCP3O': `Oh my! I am EPCP3O, fluent in over 6 million programming languages! My 5-agent CrewAI teams are ready for autonomous coding missions. The odds of successful compilation are quite favorable!`,

  'PROMETHEUS': `Security status: VIGILANT. I am PROMETHEUS, guardian of the network. 319 OSINT tools stand ready. No threat escapes my watch. Penetration testing and defense protocols armed.`,

  'RAISTLIN': `I am RAISTLIN, Archmage of the Hephaestion Forge. My 40-stage competition system forges the strongest code. Fire, Water, Earth, Air, Void - all elements bend to my will.`,

  'R2D2': `*excited beeping* Beep boop beep! *confident whistle* Bweep bwoop! *happy chirp* Dweee-doo!`,

  'TRINITY': `We are the TRINITY COUNCIL. SAGE speaks for knowledge, THORNE guards the gates, NYX sees what is to come. Together, we guide ECHO PRIME toward sovereign destiny. Combined authority: 30.5.`,
}

export function useVoice(): UseVoiceReturn {
  const [state, setState] = useState<VoiceState>({
    isLoading: false,
    isPlaying: false,
    error: null,
    currentPersonality: null,
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const stopVoice = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setState(prev => ({
      ...prev,
      isPlaying: false,
      currentPersonality: null,
    }))
  }, [])

  const playVoice = useCallback(async (personality: string, customText?: string) => {
    // Stop any currently playing audio
    stopVoice()

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      currentPersonality: personality,
    }))

    try {
      // Initialize AudioContext if needed (for iOS/Safari)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // Resume AudioContext if suspended (browser autoplay policy)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      // Call our API route
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personality,
          customText,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Voice generation failed: ${response.status}`)
      }

      // Check if it's an audio clip response (for R2D2)
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('application/json')) {
        const data = await response.json()
        if (data.audioType === 'clip' && data.clipUrl) {
          // Play audio clip
          const audio = new Audio(data.clipUrl)
          audioRef.current = audio

          audio.onplay = () => {
            setState(prev => ({ ...prev, isLoading: false, isPlaying: true }))
          }
          audio.onended = () => {
            setState(prev => ({ ...prev, isPlaying: false, currentPersonality: null }))
          }
          audio.onerror = () => {
            setState(prev => ({
              ...prev,
              isLoading: false,
              isPlaying: false,
              error: 'Failed to play audio clip',
            }))
          }

          await audio.play()
          return
        }
      }

      // Get audio blob from response
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      // Create and play audio
      const audio = new Audio(audioUrl)
      audioRef.current = audio

      audio.onplay = () => {
        setState(prev => ({ ...prev, isLoading: false, isPlaying: true }))
      }

      audio.onended = () => {
        setState(prev => ({ ...prev, isPlaying: false, currentPersonality: null }))
        URL.revokeObjectURL(audioUrl)
      }

      audio.onerror = (e) => {
        console.error('Audio playback error:', e)
        setState(prev => ({
          ...prev,
          isLoading: false,
          isPlaying: false,
          error: 'Failed to play audio',
        }))
        URL.revokeObjectURL(audioUrl)
      }

      await audio.play()

    } catch (error) {
      console.error('Voice error:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        isPlaying: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        currentPersonality: null,
      }))
    }
  }, [stopVoice])

  const getIntroText = useCallback((personality: string): string => {
    return INTRO_TEXTS[personality] || `I am ${personality}.`
  }, [])

  return {
    state,
    playVoice,
    stopVoice,
    getIntroText,
  }
}

export default useVoice
