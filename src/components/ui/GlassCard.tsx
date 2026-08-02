import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-3xl',
        hover && 'transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]',
        className,
      )}
    >
      {children}
    </div>
  )
}
