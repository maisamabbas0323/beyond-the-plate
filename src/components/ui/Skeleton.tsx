import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('shimmer-bg animate-shimmer rounded-xl bg-ink-800', className)}
    />
  )
}
