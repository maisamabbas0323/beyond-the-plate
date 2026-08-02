import { Gauge, Clock, Flame } from 'lucide-react'
import type { Difficulty } from '@/data/types'
import { cn } from '@/lib/utils'

const DIFFICULTY = {
  easy: { label: 'Easy', dot: 'bg-herb-400', text: 'text-herb-400' },
  intermediate: { label: 'Intermediate', dot: 'bg-gold-400', text: 'text-gold-300' },
  advanced: { label: 'Advanced', dot: 'bg-flame-400', text: 'text-flame-400' },
} as const

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const meta = DIFFICULTY[difficulty]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium tracking-wide',
        meta.text,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} aria-hidden="true" />
      {meta.label}
    </span>
  )
}

interface MetaChipProps {
  calories: number
  cookTime: number
  difficulty: Difficulty
}

export function DishMeta({ calories, cookTime, difficulty }: MetaChipProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-cream-400">
      <span className="inline-flex items-center gap-1.5">
        <Flame size={14} className="text-gold-400" aria-hidden="true" />
        {calories} kcal
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={14} className="text-gold-400" aria-hidden="true" />
        {cookTime >= 60 ? `${Math.round(cookTime / 60)}h ${cookTime % 60}m` : `${cookTime} min`}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Gauge size={14} className="text-gold-400" aria-hidden="true" />
        <DifficultyBadge difficulty={difficulty} />
      </span>
    </div>
  )
}
