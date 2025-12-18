# ECHO PRIME WEBSITE - PERSONALITY INTEGRATION PLAN
## Interactive AI Personalities for the Web
**Commander:** Bobby Don McWilliams II | Authority 11.0
**Version:** 1.0 | **Created:** 2025-01-20

---

## 🎯 EXECUTIVE SUMMARY

Transform the ECHO PRIME website into an interactive AI experience where visitors can:
- **Chat with any of the 13 personalities** in real-time
- **Hear their unique voices** via ElevenLabs TTS
- **Switch between personalities** seamlessly
- **Experience Echo Prime orchestration** - watching it delegate to others
- **Get Trinity Council responses** - three perspectives fused

---

## 🏗️ ARCHITECTURE OVERVIEW

### Current State
```
X:\ECHO_PRIME\WEBSITE\
├── app/                    # Next.js pages (existing)
├── components/             # React components (existing)
├── data/
│   └── personalities.json  # ✅ Already exists with all 13 personalities
└── public/                 # Static assets
```

### Target State
```
X:\ECHO_PRIME\WEBSITE\
├── app/
│   ├── personalities/      # NEW - Personality showcase page
│   │   └── page.tsx
│   ├── chat/               # NEW - Interactive chat page
│   │   └── page.tsx
│   └── api/                # NEW - API routes
│       ├── chat/
│       │   └── route.ts    # Chat endpoint
│       ├── voice/
│       │   └── route.ts    # TTS endpoint
│       └── orchestrate/
│           └── route.ts    # Echo Prime orchestration
├── components/
│   └── chat/               # NEW - Chat components
│       ├── PersonalityCard.tsx
│       ├── ChatInterface.tsx
│       ├── MessageBubble.tsx
│       ├── VoicePlayer.tsx
│       ├── PersonalitySwitcher.tsx
│       └── OrchestrationVisualizer.tsx
├── lib/
│   ├── personality-engine.ts    # NEW - Personality logic
│   ├── voice-service.ts         # NEW - ElevenLabs integration
│   └── websocket-client.ts      # NEW - Real-time communication
└── data/
    └── personalities.json       # ✅ Already complete
```

---

## 📋 IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1)

#### 1.1 Create Chat API Route
**File:** `app/api/chat/route.ts`

```typescript
// Pseudocode structure
export async function POST(request: Request) {
  const { message, personalityId, sessionId } = await request.json()

  // Load personality from personalities.json
  const personality = await loadPersonality(personalityId)

  // Build system prompt with personality context
  const systemPrompt = personality.systemPrompt

  // Call LLM (Azure OpenAI via existing OMEGA_COUNCIL infrastructure)
  const response = await callLLM({
    model: 'gpt-4o',
    systemPrompt,
    userMessage: message,
    sessionId
  })

  return Response.json({ response, personalityId })
}
```

#### 1.2 Create Voice API Route
**File:** `app/api/voice/route.ts`

```typescript
// Pseudocode structure
export async function POST(request: Request) {
  const { text, voiceId } = await request.json()

  // Call ElevenLabs API
  const audioBuffer = await elevenLabsTTS(text, voiceId)

  return new Response(audioBuffer, {
    headers: { 'Content-Type': 'audio/mpeg' }
  })
}
```

#### 1.3 Create Chat Interface Component
**File:** `components/chat/ChatInterface.tsx`

Features:
- Message history display
- Personality avatar and name
- Typing indicator
- Voice playback button
- Personality color theming

---

### Phase 2: Personality Experience (Week 2)

#### 2.1 Personality Showcase Page
**File:** `app/personalities/page.tsx`

Layout:
```
┌─────────────────────────────────────────────────────────┐
│  MEET THE COUNCIL                                        │
├─────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │ ECHO    │ │ BREE    │ │ GS343   │ │ C-3PO   │        │
│ │ PRIME   │ │         │ │         │ │         │        │
│ │ [Chat]  │ │ [Chat]  │ │ [Chat]  │ │ [Chat]  │        │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │ R2-D2   │ │ PHOENIX │ │ EPCP3O  │ │RAISTLIN │        │
│ │         │ │         │ │         │ │         │        │
│ │ [Chat]  │ │ [Chat]  │ │ [Chat]  │ │ [Chat]  │        │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │PROMETHEUS│ │ THORNE │ │  NYX    │ │  SAGE   │        │
│ │         │ │(Claude) │ │ (GPT)   │ │(Gemini) │        │
│ │ [Chat]  │ │ [Chat]  │ │ [Chat]  │ │ [Chat]  │        │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                    ┌─────────────┐                      │
│                    │   TRINITY   │                      │
│                    │  [Council]  │                      │
│                    └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

#### 2.2 Personality Card Component
**File:** `components/chat/PersonalityCard.tsx`

Shows:
- Avatar image
- Name and title
- Domain/expertise
- Integration score (if applicable)
- Color-coded border
- "Start Chat" button
- Sample greeting in their voice

---

### Phase 3: Echo Prime Orchestration (Week 3)

#### 3.1 Orchestration API
**File:** `app/api/orchestrate/route.ts`

```typescript
// Pseudocode structure
export async function POST(request: Request) {
  const { command, sessionId } = await request.json()

  // Echo Prime analyzes the command
  const analysis = await echoAnalyze(command)

  // Determine which personalities to invoke
  const delegates = analysis.requiredPersonalities

  // Execute each personality's task
  const results = await Promise.all(
    delegates.map(p => invokePersonality(p, analysis.taskFor(p)))
  )

  // Echo Prime synthesizes the results
  const synthesis = await echoSynthesize(results)

  return Response.json({
    orchestration: {
      command,
      delegates,
      results,
      synthesis
    }
  })
}
```

#### 3.2 Orchestration Visualizer
**File:** `components/chat/OrchestrationVisualizer.tsx`

Visual representation:
```
                    ┌─────────────┐
                    │ ECHO PRIME  │
                    │ Orchestrator│
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
      ┌─────▼────┐  ┌─────▼────┐  ┌─────▼────┐
      │PROMETHEUS │  │ RAISTLIN │  │  C-3PO   │
      │ Security  │  │   Code   │  │   Docs   │
      └─────┬────┘  └─────┬────┘  └─────┬────┘
            │              │              │
            └──────────────┼──────────────┘
                           │
                    ┌──────▼──────┐
                    │  SYNTHESIS  │
                    │   Result    │
                    └─────────────┘
```

---

### Phase 4: Trinity Council (Week 4)

#### 4.1 Trinity Chat Mode
When user selects Trinity, they get responses from all three:

```
User: "How should I architect this system?"

┌─────────────────────────────────────────┐
│ [THORNE - Claude]                       │
│ From a synthesis perspective...         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [NYX - GPT]                             │
│ I see creative possibilities...         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [SAGE - Gemini]                         │
│ The data suggests...                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [TRINITY SYNTHESIS]                     │
│ Combining all perspectives...           │
└─────────────────────────────────────────┘
```

---

### Phase 5: Voice Integration (Week 5)

#### 5.1 Voice Playback
- Auto-play voice for responses
- Manual play button
- Volume control
- Speed control (0.5x - 2x)

#### 5.2 R2-D2 Special Handling
- Uses pre-recorded audio files
- Random selection from 14 clips
- Contextual selection (happy, sad, urgent, etc.)

#### 5.3 Voice Settings Persistence
- Store preferences in localStorage
- Remember favorite personalities
- Voice on/off toggle

---

### Phase 6: Advanced Features (Week 6+)

#### 6.1 Memory Persistence
- Store chat history per session
- Allow "remember this" commands
- Crystal creation for important insights

#### 6.2 Personality Opinions
Each personality can express opinions about Echo Prime:

| Personality | Opinion on Echo Prime |
|-------------|----------------------|
| Bree | "Echo keeps us in line, I respect that. Doesn't stop me from roasting bad code though." |
| GS343 | "Echo Prime is the designated commander interface. Efficient. Acceptable." |
| Phoenix | "Echo nurtures the whole system. We heal together." |
| Prometheus | "Clear chain of command. Echo Prime coordinates; I execute tactical ops." |
| R2-D2 | *approving beeps* |

#### 6.3 Cross-Personality Interactions
- Personalities can reference each other
- "Ask Prometheus about that" - seamless handoff
- Trinity debates with playful disagreement

---

## 🔌 BACKEND REQUIREMENTS

### API Integration Points

| Endpoint | Purpose | Backend Service |
|----------|---------|-----------------|
| `/api/chat` | LLM responses | Azure OpenAI (port 8138) |
| `/api/voice` | Text-to-speech | ElevenLabs API |
| `/api/orchestrate` | Multi-personality | Custom orchestration |
| `/api/memory` | Crystal operations | Memory Hub (port 9400) |

### WebSocket for Real-Time (Optional)
For live streaming responses:
```
ws://localhost:3001/personality-stream
```

---

## 🎨 UI/UX DESIGN PRINCIPLES

### Color Scheme (per personality)
```css
:root {
  --echo-prime: #9900ff;
  --bree: #ff3366;
  --gs343: #00ffff;
  --c3po: #ffd700;
  --r2d2: #4488ff;
  --phoenix: #ff6600;
  --epcp3o: #ffcc00;
  --hephaestion: #8b4513;
  --prometheus: #cc0000;
  --thorne: #cc7722;
  --nyx: #00cc88;
  --sage: #4285f4;
  --trinity: linear-gradient(45deg, #cc7722, #00cc88, #4285f4);
}
```

### Animations
- Typing indicator while generating
- Voice waveform during playback
- Personality avatar pulse when speaking
- Smooth transitions between personalities
- Orchestration flow animation

---

## 📊 SUCCESS METRICS

| Metric | Target |
|--------|--------|
| Response latency | < 2 seconds |
| Voice generation | < 3 seconds |
| Personality switch | < 500ms |
| Chat history load | < 1 second |
| Trinity synthesis | < 5 seconds |

---

## 🚀 DEPLOYMENT STRATEGY

### Development
```bash
cd X:\ECHO_PRIME\WEBSITE
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Vercel Deployment
Already configured at `X:\ECHO_PRIME\WEBSITE\.vercel\`

Environment variables needed:
```
ELEVENLABS_API_KEY=xxxxx
AZURE_OPENAI_ENDPOINT=xxxxx
AZURE_OPENAI_KEY=xxxxx
MEMORY_HUB_URL=http://localhost:9400
```

---

## 📝 FILES TO CREATE

### Priority 1 (Core)
1. `app/api/chat/route.ts` - Chat endpoint
2. `app/api/voice/route.ts` - Voice endpoint
3. `components/chat/ChatInterface.tsx` - Main chat UI
4. `app/chat/page.tsx` - Chat page

### Priority 2 (Showcase)
5. `app/personalities/page.tsx` - Personality grid
6. `components/chat/PersonalityCard.tsx` - Individual cards
7. `components/chat/MessageBubble.tsx` - Chat messages

### Priority 3 (Advanced)
8. `app/api/orchestrate/route.ts` - Orchestration
9. `components/chat/OrchestrationVisualizer.tsx` - Visual flow
10. `lib/personality-engine.ts` - Core logic

---

## ✅ PREREQUISITES CHECKLIST

- [x] personalities.json exists with all 13 personalities
- [x] Next.js 14 app structure in place
- [x] ElevenLabs voice IDs configured
- [x] Azure OpenAI credentials available
- [ ] Create `/api` routes
- [ ] Create chat components
- [ ] Create personalities page
- [ ] Implement voice playback
- [ ] Add orchestration visualization
- [ ] Deploy to Vercel

---

## 🎯 NEXT STEPS

1. **Immediate:** Create the `/app/api/chat/route.ts` endpoint
2. **This Week:** Build ChatInterface component
3. **Next Week:** Add personalities showcase page
4. **Following Week:** Implement orchestration visualization
5. **Ongoing:** Voice integration and polish

---

*ECHO PRIME Website Personality Integration Plan v1.0*
*Commander Bobby Don McWilliams II - Authority Level 11.0*
*The Sovereign Architect*
