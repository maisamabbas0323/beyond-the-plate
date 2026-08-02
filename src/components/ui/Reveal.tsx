import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li' | 'h2' | 'p'
}

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={cn('will-change-transform', className)}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  )
}
