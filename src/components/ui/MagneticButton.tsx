import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  ariaLabel?: string
  disabled?: boolean
  loading?: boolean
  loadingLabel?: string
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

/**
 * Lifts toward the cursor on hover — a deliberate, tactile detail. A soft
 * glow breathes on hover, a ripple blooms from the click point, and the
 * button settles with a spring. Falls back to a plain hover state when the
 * user prefers reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
  ariaLabel,
  disabled = false,
  loading = false,
  loadingLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const rippleId = useRef(0)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

  function handleMove(event: React.MouseEvent<HTMLButtonElement>) {
    if (reducedMotion || disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.()
    if (reducedMotion || disabled || loading || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2.2
    const id = ++rippleId.current
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left - size / 2, y: event.clientY - rect.top - size / 2, size },
    ])
    window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700)
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileHover={disabled || loading ? undefined : { scale: 1.03 }}
      whileTap={disabled || loading ? undefined : { scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden transition-opacity duration-300',
        !disabled && !loading && 'hover:shadow-[0_18px_50px_-14px_rgba(201,154,46,0.4)]',
        (disabled || loading) && 'cursor-not-allowed opacity-55',
        className,
      )}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center">
        {loading && <Loader2 size={16} className="mr-2 animate-spin" aria-hidden="true" />}
        {loading && loadingLabel ? loadingLabel : children}
      </span>
    </motion.button>
  )
}
