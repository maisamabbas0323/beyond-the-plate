import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RingProgressProps {
  value: number
  size?: number
  stroke?: number
  className?: string
  children?: React.ReactNode
}

export function RingProgress({
  value,
  size = 160,
  stroke = 12,
  className,
  children,
}: RingProgressProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reducedMotion = useReducedMotion()

  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))

  const progressRef = useRef(0)
  useEffect(() => {
    if (inView) progressRef.current = clamped
  }, [inView, clamped])

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${Math.round(value)} percent`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gold)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            inView
              ? { strokeDashoffset: circumference * (1 - (reducedMotion ? 1 : clamped) / 100) }
              : undefined
          }
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ring-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e9cf84" />
            <stop offset="100%" stopColor="#9c7a22" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}
