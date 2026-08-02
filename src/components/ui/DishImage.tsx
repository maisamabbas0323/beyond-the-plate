import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DishImageProps {
  src: string
  alt: string
  gradient?: string
  accent?: string
  label?: string
  className?: string
  imgClassName?: string
  eager?: boolean
}

/**
 * Progressive image with a graceful editorial fallback: if the photograph
 * fails to load, the frame renders an intentional gradient monogram rather
 * than a broken icon — no layout shift, no empty space.
 */
export function DishImage({
  src,
  alt,
  gradient = 'linear-gradient(135deg,#17171a 0%,#34343a 100%)',
  accent = '#d9b557',
  label,
  className,
  imgClassName,
  eager = false,
}: DishImageProps) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  return (
    <div
      className={cn('relative overflow-hidden bg-ink-800', className)}
      style={{ backgroundImage: gradient, backgroundSize: 'cover' }}
    >
      {state !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden="true"
            className="select-none font-display text-6xl font-light italic text-white/10"
            style={{ color: `${accent}33` }}
          >
            {label?.charAt(0) ?? ''}
          </span>
        </div>
      )}

      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700',
            state === 'ready' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}

      {state === 'loading' && (
        <div aria-hidden="true" className="shimmer-bg animate-shimmer absolute inset-0" />
      )}

      {state === 'ready' && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
        />
      )}
    </div>
  )
}
