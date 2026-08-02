import { Skeleton } from '@/components/ui/Skeleton'

export function RouteFallback() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 md:px-10" role="status" aria-label="Loading page">
      <div className="space-y-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-14 w-1/2" />
        <Skeleton className="h-5 w-2/3" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[5/4] w-full rounded-[28px]" />
        ))}
      </div>
    </div>
  )
}
