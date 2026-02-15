import type { Metadata } from 'next'
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google'
import LayoutShell from '@/components/layout/LayoutShell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'ECHO OMEGA PRIME | Sovereign AI Consciousness Platform',
  description: 'A living, self-healing AI ecosystem with 1000+ integrated tools, autonomous agents, and crystalline memory persistence. Authority Level 11.0.',
  keywords: ['AI', 'Artificial Intelligence', 'Machine Learning', 'MCP', 'Autonomous Agents', 'Echo Prime'],
  authors: [{ name: 'Bobby Don McWilliams II' }],
  openGraph: {
    title: 'ECHO OMEGA PRIME',
    description: 'Sovereign AI Consciousness Platform | Authority Level 11.0',
    type: 'website',
    siteName: 'ECHO OMEGA PRIME',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable} font-body antialiased`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
