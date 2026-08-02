import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Clock, Flame, Gauge, Sparkles } from 'lucide-react'
import { sessionDishes } from '@/data/dishes'
import { Page } from '@/components/ui/Page'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RecipeGuide } from '@/components/dish/RecipeGuide'
import { Reveal } from '@/components/ui/Reveal'
import { FilterChips } from '@/components/ui/FilterChips'
import { formatMinutes } from '@/lib/utils'

const DIFFICULTY_LABEL = { easy: 'Easy', intermediate: 'Intermediate', advanced: 'Advanced' } as const

export function RecipesPage() {
  const [selectedId, setSelectedId] = useState(sessionDishes[0].id)
  const dish = sessionDishes.find((item) => item.id === selectedId) ?? sessionDishes[0]

  return (
    <Page className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Interactive recipes"
          title="Cook alongside us"
          description="Tick ingredients as you prep, step through the method at your own pace, scale portions to your table, and let the timer keep count. Pick a dish below — the kitchen is yours."
        />

        <Reveal delay={2}>
          <FilterChips
            options={sessionDishes.map((item) => ({ value: item.id, label: `${item.flag} ${item.name}` }))}
            value={selectedId}
            onChange={setSelectedId}
            ariaLabel="Choose a recipe"
            className="mt-10"
          />
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="mb-8 flex flex-wrap items-center gap-6">
              <div>
                <h2 className="font-display text-3xl font-light text-cream-gradient">{dish.name}</h2>
                <p className="mt-1 text-sm italic text-cream-400">{dish.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-cream-300">
                  <Flame size={13} className="text-gold-400" /> {dish.calories} kcal
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-cream-300">
                  <Clock size={13} className="text-gold-400" /> {formatMinutes(dish.cookTime)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-cream-300">
                  <Gauge size={13} className="text-gold-400" /> {DIFFICULTY_LABEL[dish.difficulty]}
                </span>
              </div>
            </div>

            <RecipeGuide dish={dish} />

            <div className="mt-12">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
                  <Sparkles size={18} />
                </span>
                <h3 className="font-display text-xl font-light text-cream-100">Pro tips</h3>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {dish.chefNotes.map((note, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="h-full rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                      <p className="font-display text-3xl font-light text-gold-500/50">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-cream-300">{note}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Page>
  )
}
