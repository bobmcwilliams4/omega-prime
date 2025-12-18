import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9900ff',
          dark: '#6600cc',
          glow: 'rgba(153,0,255,0.5)',
          light: '#b833ff',
        },
        cyan: {
          DEFAULT: '#00ffff',
          glow: 'rgba(0,255,255,0.3)',
          dark: '#00cccc',
        },
        gold: {
          DEFAULT: '#ffd700',
          dark: '#ccac00',
        },
        background: {
          dark: '#0a0a0f',
          card: '#1a1a2e',
          gradient: '#1a0a2e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0b0',
          muted: '#606070',
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'Rajdhani', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        hero: 'clamp(3rem, 8vw, 6rem)',
        h1: 'clamp(2rem, 5vw, 3.5rem)',
        h2: 'clamp(1.5rem, 3vw, 2.5rem)',
        h3: 'clamp(1.25rem, 2vw, 1.75rem)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'particle': 'particle 20s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(153,0,255,0.5), 0 0 40px rgba(153,0,255,0.3)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(153,0,255,0.8), 0 0 80px rgba(153,0,255,0.5)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'particle': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(720deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
}

export default config
