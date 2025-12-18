'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({
  children,
  className,
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        'bg-background-card/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-6',
        'shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]',
        hover &&
          'transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_32px_rgba(153,0,255,0.2),0_0_60px_rgba(153,0,255,0.1)]',
        glow && 'relative',
        className
      )}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
      )}
      {children}
    </motion.div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h3
      className={cn(
        'text-xl font-heading font-semibold text-white',
        className
      )}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-text-secondary text-sm mt-1', className)}>
      {children}
    </p>
  )
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('', className)}>{children}</div>
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-primary/10', className)}>
      {children}
    </div>
  )
}
