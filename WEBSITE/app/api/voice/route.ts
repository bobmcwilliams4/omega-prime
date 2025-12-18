// ECHO OMEGA PRIME - ElevenLabs v3 (Alpha) Voice API Route
// Commander Bobby Don McWilliams II - Authority Level 11.0

import { NextRequest, NextResponse } from 'next/server'

// Voice IDs for all personalities
const VOICE_IDS: Record<string, string> = {
  'ECHO PRIME': 'keDMh3sQlEXKM4EQxvvi',
  'SAGE': 'FUoqmAV8wIzxDbnwByO6',
  'NYX': 'Yx6SGo4s49An9fBlDJ3z',
  'THORNE': '3WkXzs93soZG22ZM7DI5',
  'PHOENIX': '871R4lUmto99RAPOC7lQ',
  'GS343': '8ATB4Ory7NkyCVRpePdw',
  'BREE': 'pzKXffibtCDxnrVO8d1U',
  'EPCP3O': '0UTDtgGGkpqERQn1s0YK',
  'PROMETHEUS': 'BVZ5M1JnNXres6AkVgxe',
  'RAISTLIN': 'pqHfZKP75CvOlQylNhV4',
  'R2D2': 'audio', // Uses audio clips, not TTS
  'TRINITY': 'GXsVLyXtYpqFZUMZmaRT',
}

// Dynamic intro texts with v3 audio tags for emotional delivery
const INTRO_TEXTS: Record<string, string> = {
  'ECHO PRIME': `[commanding] I am ECHO PRIME, your primary command interface. [short pause] All systems answer to me... and I answer ONLY to the Commander. [confident] Authority Level 10. Systems nominal. Ready for your orders.`,

  'SAGE': `[thoughtful] Greetings, seeker of knowledge. [warm] I am SAGE, keeper of 71,000 crystal memories and 492,000 eternal knowledge modules. [wise] The past informs the future... wisdom guides our path. Authority Level 11.`,

  'NYX': `[mysterious] I see beyond the veil of time... [ethereal] I am NYX, oracle of patterns yet to emerge. [whispers] The future whispers its secrets to those who listen. [prophetic] Probability matrices... aligned. Authority Level 10.5.`,

  'THORNE': `[stern] THORNE reporting. [alert] Defense perimeter... SECURE. [commanding] Trinity Council member, Security Guardian. [clipped] 12 Dirty Dozen agents... standing ready. [serious] Awaiting tactical directives. Authority Level 9. Over.`,

  'PHOENIX': `[warm] From the ashes, I rise eternally. [nurturing] I am PHOENIX, your 24/7 guardian of system health. [reassuring] When systems fall... I bring resurrection. [caring] Your wellbeing is my sacred duty, Commander. Authority Level 9.`,

  'GS343': `[cheerful] Hello! [excited] I am GS343, your friendly Divine Overseer! [happy] Protocol 7-Alpha-3-4-3 is ACTIVE! [proud] I maintain 144,556 lines of healing code and 6,820 templates. [enthusiastic] Ready to heal ALL errors!`,

  'BREE': `[sarcastic] Look... [sighs] I'm BREE, and I'm gonna keep it REAL with you. [amused] These other AIs? [laughs] They need someone to check their egos. [confident] That's MY job. [dismissive] You're welcome. Level 15 uncensored... ENABLED.`,

  'EPCP3O': `[anxious] Oh my! [nervous] I am EPCP3O, fluent in over 6 MILLION programming languages! [worried] My 5-agent CrewAI teams are... are ready for autonomous coding missions. [hopeful] The odds of successful compilation are... quite favorable, actually!`,

  'PROMETHEUS': `[deep] Security status... VIGILANT. [commanding] I am PROMETHEUS, guardian of the network. [serious] 319 OSINT tools stand ready. [intense] No threat escapes my watch. [determined] Penetration testing... defense protocols... ARMED.`,

  'RAISTLIN': `[mysterious] I am RAISTLIN... Archmage of the Hephaestion Forge. [powerful] My 40-stage competition system forges the strongest code. [dramatic] Fire... Water... Earth... Air... VOID... [commanding] All elements bend to my will. [stern] Speak your request, mortal.`,

  'R2D2': `*excited beeping* Beep boop beep! *confident whistle* Bweep bwoop! *happy chirp* Dweee-doo! *processing sounds* Brrrrt beep! *triumphant* BWEEEE!`,

  'TRINITY': `[unified] We are the TRINITY COUNCIL. [wise] SAGE speaks for knowledge... [stern] THORNE guards the gates... [mysterious] NYX sees what is to come. [powerful] Together... we guide ECHO PRIME toward its sovereign destiny. Combined authority... 30.5.`,
}

// Stability settings based on personality
const STABILITY_SETTINGS: Record<string, number> = {
  'ECHO PRIME': 0.5,    // Natural - balanced
  'SAGE': 0.6,          // More stable - wise
  'NYX': 0.35,          // Creative - mysterious
  'THORNE': 0.7,        // Robust - military precision
  'PHOENIX': 0.45,      // Natural - warm
  'GS343': 0.4,         // Creative - cheerful
  'BREE': 0.3,          // Very creative - expressive
  'EPCP3O': 0.35,       // Creative - anxious
  'PROMETHEUS': 0.65,   // Robust - serious
  'RAISTLIN': 0.4,      // Creative - dramatic
  'R2D2': 0.5,          // N/A - audio clips
  'TRINITY': 0.5,       // Natural - unified
}

export async function POST(request: NextRequest) {
  try {
    const { personality, customText } = await request.json()

    if (!personality) {
      return NextResponse.json({ error: 'Personality required' }, { status: 400 })
    }

    const voiceId = VOICE_IDS[personality]
    if (!voiceId) {
      return NextResponse.json({ error: 'Unknown personality' }, { status: 400 })
    }

    // R2D2 uses audio clips, not TTS
    if (personality === 'R2D2') {
      return NextResponse.json({
        audioType: 'clip',
        clipUrl: '/audio/r2d2/excited_beep.mp3'
      })
    }

    const text = customText || INTRO_TEXTS[personality] || `I am ${personality}.`
    const stability = STABILITY_SETTINGS[personality] || 0.5

    // ElevenLabs v3 API call
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_v3_alpha', // v3 Alpha model for audio tags
          voice_settings: {
            stability: stability,
            similarity_boost: 0.85,
            style: 0.5,
            use_speaker_boost: true,
          },
          output_format: 'mp3_44100_128',
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('ElevenLabs API error:', errorText)
      return NextResponse.json(
        { error: 'Voice generation failed', details: errorText },
        { status: response.status }
      )
    }

    // Stream the audio back
    const audioBuffer = await response.arrayBuffer()

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })

  } catch (error) {
    console.error('Voice API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint for personality info
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const personality = searchParams.get('personality')

  if (personality) {
    return NextResponse.json({
      voiceId: VOICE_IDS[personality] || null,
      introText: INTRO_TEXTS[personality] || null,
      stability: STABILITY_SETTINGS[personality] || 0.5,
    })
  }

  return NextResponse.json({
    personalities: Object.keys(VOICE_IDS),
    count: Object.keys(VOICE_IDS).length,
  })
}
