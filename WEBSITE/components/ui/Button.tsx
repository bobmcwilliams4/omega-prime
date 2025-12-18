import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-white shadow-[0_4px_20px_rgba(153,0,255,0.4)] hover:bg-primary-dark hover:shadow-[0_6px_30px_rgba(153,0,255,0.6)] hover:-translate-y-0.5':
              variant === 'primary',
            'bg-transparent border-2 border-cyan text-cyan hover:bg-cyan/10 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]':
              variant === 'secondary',
            'bg-transparent text-text-secondary hover:text-white hover:bg-white/5':
              variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
