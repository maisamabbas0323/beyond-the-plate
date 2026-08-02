import { Reveal } from './Reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
          <span className="h-px w-8 bg-gold-500/50" aria-hidden="true" />
          <span className="text-balance">{eyebrow}</span>
          {align === 'center' && <span className="h-px w-8 bg-gold-500/50" aria-hidden="true" />}
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight text-cream-gradient sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={2}>
          <p
            className={cn(
              'mt-5 text-base leading-relaxed text-cream-400 md:text-lg',
              align === 'left' ? 'max-w-xl' : 'mx-auto max-w-2xl',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
