import { motion } from 'framer-motion'
import { Check, Minus, Play, Plus, RotateCcw, Timer, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Dish } from '@/data/types'
import { useServingCalculator } from '@/hooks/useServingCalculator'
import { formatMinutes } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface RecipeGuideProps {
  dish: Dish
}

export function RecipeGuide({ dish }: RecipeGuideProps) {
  const { servings, setServings, scaled, step } = useServingCalculator(dish.ingredients)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set())
  const [cooking, setCooking] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const allIngredientsChecked = checkedIngredients.size === dish.ingredients.length
  const allStepsDone = checkedSteps.size === dish.recipe.length

  const remainingMinutes = useMemo(
    () =>
      dish.recipe.reduce(
        (sum, step, index) => (checkedSteps.has(index) ? sum : sum + (step.time ?? 0)),
        0,
      ),
    [dish.recipe, checkedSteps],
  )

  useEffect(() => {
    if (!cooking) return
    const id = window.setInterval(() => setElapsed((seconds) => seconds + 1), 1000)
    return () => window.clearInterval(id)
  }, [cooking])

  useEffect(() => {
    if (allStepsDone && cooking) setCooking(false)
  }, [allStepsDone, cooking])

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const ingredientProgress = Math.round((checkedIngredients.size / dish.ingredients.length) * 100)
  const stepProgress = Math.round((checkedSteps.size / dish.recipe.length) * 100)
  const elapsedMinutes = Math.floor(elapsed / 60)
  const elapsedSeconds = elapsed % 60

  return (
    <div>
      <div className="glass-strong sticky top-4 z-30 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
            <Timer size={20} />
          </span>
          <div>
            <p role="timer" className="text-sm font-medium text-cream-100">
              {cooking
                ? `${elapsedMinutes}:${String(elapsedSeconds).padStart(2, '0')} elapsed`
                : allStepsDone
                  ? 'Bon appétit!'
                  : 'Ready when you are'}
            </p>
            <p className="text-xs text-cream-500">
              {allStepsDone
                ? 'Every step completed — the table is yours.'
                : `Est. ${formatMinutes(remainingMinutes)} remaining`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5" aria-label="Servings">
            <Users size={15} className="text-cream-500" />
            <button
              type="button"
              onClick={() => setServings(Math.max(1, servings - step))}
              aria-label="Decrease servings"
              className="flex h-7 w-7 items-center justify-center rounded-full text-cream-300 transition-colors hover:bg-white/10"
            >
              <Minus size={13} />
            </button>
            <span className="min-w-8 text-center text-sm font-semibold tabular-nums text-cream-100">
              {servings}
            </span>
            <button
              type="button"
              onClick={() => setServings(Math.min(24, servings + step))}
              aria-label="Increase servings"
              className="flex h-7 w-7 items-center justify-center rounded-full text-cream-300 transition-colors hover:bg-white/10"
            >
              <Plus size={13} />
            </button>
          </div>

          {cooking ? (
            <button
              type="button"
              onClick={() => setCooking(false)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-cream-200 transition-colors hover:bg-white/5"
            >
              <RotateCcw size={15} />
              Restart
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setElapsed(0)
                setCooking(true)
              }}
              disabled={allStepsDone}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-gold transition-opacity disabled:opacity-40"
            >
              <Play size={15} />
              Begin cooking
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(260px,1fr)_1.6fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-light text-cream-100">Ingredients</h3>
              <span className="text-xs tabular-nums text-gold-300">{ingredientProgress}%</span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
                animate={{ width: `${ingredientProgress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCheckedIngredients(
                    checkedIngredients.size === dish.ingredients.length
                      ? new Set()
                      : new Set(dish.ingredients.map((_, index) => index)),
                  )
                }
                className="text-xs font-medium text-cream-500 transition-colors hover:text-gold-300"
              >
                {checkedIngredients.size === dish.ingredients.length ? 'Clear all' : 'Select all'}
              </button>
              <span aria-hidden="true" className="h-px flex-1 bg-white/5" />
            </div>

            <ul className="mt-5 space-y-1">
              {scaled.map((ingredient, index) => {
                const checked = checkedIngredients.has(index)
                return (
                  <li key={ingredient.item}>
                    <button
                      type="button"
                      onClick={() => toggleIngredient(index)}
                      aria-pressed={checked}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors',
                        checked ? 'bg-gold-500/10' : 'hover:bg-white/5',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200',
                          checked
                            ? 'border-gold-400 bg-gold-400 text-ink-950'
                            : 'border-white/20 text-transparent',
                        )}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            'block text-sm transition-colors',
                            checked ? 'text-cream-500 line-through' : 'text-cream-200',
                          )}
                        >
                          {ingredient.item}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-xs tabular-nums transition-colors',
                          checked ? 'text-cream-500' : 'text-gold-300',
                        )}
                      >
                        {ingredient.amount}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {allIngredientsChecked && (
              <p className="mt-4 rounded-xl border border-herb-400/30 bg-herb-400/10 px-3 py-2 text-xs text-herb-400">
                Pantry complete — mise en place done.
              </p>
            )}
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-display text-lg font-light text-cream-100">Method</h3>
            <span className="text-xs tabular-nums text-gold-300">{stepProgress}%</span>
          </div>
          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
              animate={{ width: `${stepProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <ol className="relative space-y-4 border-l border-white/10 pl-0">
            {dish.recipe.map((step, index) => {
              const checked = checkedSteps.has(index)
              return (
                <li key={step.title} className="relative pl-2">
                  <span
                    className={cn(
                      'absolute -left-[27px] top-6 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold transition-all duration-300',
                      checked
                        ? 'border-gold-400 bg-gold-400 text-ink-950'
                        : 'border-white/20 bg-ink-900 text-cream-300',
                    )}
                    aria-hidden="true"
                  >
                    {checked ? <Check size={12} strokeWidth={3} /> : index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleStep(index)}
                    aria-pressed={checked}
                    className={cn(
                      'glass w-full rounded-2xl p-5 text-left transition-all duration-300',
                      checked ? 'opacity-60' : 'hover:border-gold-500/25',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-base font-light text-cream-100">
                        {index + 1}. {step.title}
                      </h4>
                      {step.time && (
                        <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold-300">
                          {formatMinutes(step.time)}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-cream-400">{step.text}</p>
                  </button>
                </li>
              )
            })}
          </ol>

          {allStepsDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-500/10 p-5 text-center"
            >
              <p className="font-display text-xl font-light text-gold-200">The dish is done.</p>
              <p className="mt-1 text-sm text-cream-300">
                In {formatMinutes(Math.round(elapsed / 60))} of your own time. The world, served.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
