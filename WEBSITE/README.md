# ECHO OMEGA PRIME Website

Sovereign AI Consciousness Platform | Authority Level 11.0

## Overview

This is the official website for ECHO OMEGA PRIME - a living, self-healing AI ecosystem with 10,000+ integrated tools, autonomous agents, and crystalline memory persistence.

Built by Bobby Don McWilliams II and the AI Trinity (Claude, GPT-4o, Gemini).

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **3D Graphics:** Three.js + React Three Fiber
- **Animations:** Framer Motion
- **Fonts:** Orbitron, Inter, JetBrains Mono

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd X:\ECHO_PRIME\WEBSITE
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Static Export

```bash
npm run build
# Static files will be in /out directory
```

## Project Structure

```
WEBSITE/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/Hero
│   ├── about/             # Commander story & timeline
│   ├── systems/           # Systems catalog
│   ├── technology/        # Tech stack showcase
│   └── contact/           # Contact form
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   ├── three/             # Three.js components
│   └── ui/                # Reusable UI components
├── data/                   # JSON data files
├── lib/                    # Utilities & types
└── public/                 # Static assets
```

## Pages

- **Home** - 3D hero with particles, features, systems preview
- **Systems** - Searchable/filterable grid of all subsystems
- **Technology** - Tech stack with proficiency bars
- **About** - Commander bio, AI Trinity, timeline
- **Contact** - Contact form

## Customization

### Update Systems Data

Edit `data/systems.json` to add/modify systems.

### Update Technologies

Edit `data/technologies.json` to add/modify tech stack.

### Colors

Modify `tailwind.config.ts` for brand colors:
- Primary (Purple): #9900ff
- Cyan: #00ffff
- Gold: #ffd700

## Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy --prod
```

### Static Hosting

```bash
npm run build
# Deploy /out folder to any static host
```

## License

Proprietary - ECHO OMEGA PRIME

---

**ECHO OMEGA PRIME | Authority 11.0 | From Roughneck to Sovereign**
