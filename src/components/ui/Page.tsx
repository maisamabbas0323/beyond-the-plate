import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageProps {
  children: ReactNode
  className?: string
}

export function Page({ children, className }: PageProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn('relative min-h-screen', className)}
    >
      {children}
    </motion.main>
  )
}
