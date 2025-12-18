'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
}

export default function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className={cn('relative group', className)}>
      {/* Language Badge */}
      <div className="absolute top-3 left-4 text-xs text-text-muted font-mono uppercase tracking-wider">
        {language}
      </div>

      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 px-3 py-1 text-xs bg-primary/20 hover:bg-primary/40 text-primary rounded-md transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>

      {/* Code Content */}
      <pre className="bg-background-card rounded-xl p-4 pt-10 overflow-x-auto border border-primary/20 scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-dark">
        <code className="font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-text-muted w-12 text-right pr-4 flex-shrink-0">
                  {i + 1}
                </span>
              )}
              <span className="text-text-primary">{line || ' '}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
