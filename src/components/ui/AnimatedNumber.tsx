import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  format?: (value: number) => string
}

export function AnimatedNumber({
  value,
  duration = 1.6,
  className,
  format = (n) => String(n),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reducedMotion) {
      node.textContent = format(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [value, duration, format, inView, reducedMotion])

  return (
    <span ref={ref} className={className} aria-label={format(value)}>
      {format(0)}
    </span>
  )
}
