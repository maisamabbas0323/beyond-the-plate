import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  title: string
  description?: string
  children: React.ReactNode
  side?: 'right' | 'top' | 'bottom'
  className?: string
}

export function Tooltip({ title, description, children, side = 'right', className }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enter = () => {
    if (timeout.current) clearTimeout(timeout.current)
    setOpen(true)
  }
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 140)
  }

  const position =
    side === 'right'
      ? 'left-full top-1/2 -translate-y-1/2'
      : side === 'top'
        ? 'bottom-full left-1/2 -translate-x-1/2'
        : 'top-full left-1/2 -translate-x-1/2'

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      {children}

      <motion.span
        role="tooltip"
        aria-hidden={!open}
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.92,
          x: side === 'right' ? (open ? 0 : -6) : 0,
          y: open ? 0 : 4,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'pointer-events-none absolute z-50 whitespace-nowrap',
          position,
          className,
        )}
      >
        <span className="block rounded-2xl border border-gold-500/25 bg-ink-850/95 px-4 py-3 shadow-card backdrop-blur-xl">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            <span className="text-[13px] font-semibold text-cream-50">{title}</span>
          </span>
          {description && (
            <span className="mt-1 block pl-3.5 text-xs font-normal text-cream-400">{description}</span>
          )}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'absolute h-3 w-3 rotate-45 border-gold-500/25 bg-ink-850',
            side === 'right' && '-left-1.5 top-1/2 -translate-y-1/2 border-l border-b',
            side === 'top' && '-bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r',
            side === 'bottom' && '-top-1.5 left-1/2 -translate-x-1/2 border-l border-t',
          )}
        />
      </motion.span>
    </span>
  )
}
