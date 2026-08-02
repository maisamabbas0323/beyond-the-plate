import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface FilterChipOption {
  value: string
  label: string
}

interface FilterChipsProps {
  options: FilterChipOption[]
  value: string
  onChange: (value: string) => void
  ariaLabel: string
  className?: string
}

/**
 * A horizontal rail of filter pills. On touch screens it scrolls edge-to-edge
 * with the scrollbar hidden; on larger screens it wraps into tidy rows.
 * The active chip is revealed behind a shared layout pill.
 */
export function FilterChips({ options, value, onChange, ariaLabel, className }: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={cn(
              'relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-300 md:shrink',
              active
                ? 'border-gold-500/60 text-gold-200'
                : 'border-white/10 bg-white/[0.02] text-cream-400 hover:border-white/25 hover:text-cream-200',
            )}
          >
            {active && (
              <motion.span
                layoutId={`chip-active-${ariaLabel}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-full border border-gold-500/50 bg-gold-500/15"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
