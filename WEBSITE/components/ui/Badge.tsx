import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'cyan' | 'gold' | 'success' | 'warning'
  className?: string
}

export default function Badge({
  children,
  variant = 'primary',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        {
          'bg-primary/20 text-primary border border-primary/30':
            variant === 'primary',
          'bg-cyan/20 text-cyan border border-cyan/30': variant === 'cyan',
          'bg-gold/20 text-gold border border-gold/30': variant === 'gold',
          'bg-green-500/20 text-green-400 border border-green-500/30':
            variant === 'success',
          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30':
            variant === 'warning',
        },
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({
  status,
}: {
  status: 'Active' | 'Development' | 'Planned'
}) {
  const variants = {
    Active: 'success',
    Development: 'warning',
    Planned: 'primary',
  } as const

  return (
    <Badge variant={variants[status]}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
      {status}
    </Badge>
  )
}
