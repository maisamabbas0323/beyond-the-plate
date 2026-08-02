import { cn } from '@/lib/utils'

const TONES = {
  cream: 'border-white/10 text-cream-300',
  gold: 'border-gold-500/30 text-gold-300',
  ghost: 'border-white/5 text-cream-400/70',
} as const

interface PillProps {
  children: React.ReactNode
  tone?: keyof typeof TONES
  className?: string
}

export function Pill({ children, tone = 'cream', className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border bg-white/[0.03] px-3 py-1 text-xs font-medium tracking-wide',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
