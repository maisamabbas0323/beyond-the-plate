import { motion } from 'framer-motion'
import type { Nutrition } from '@/data/types'
import { MacroDonut } from '@/components/ui/MacroDonut'
import { RingProgress } from '@/components/ui/RingProgress'

function MacroBar({
  label,
  grams,
  color,
}: {
  label: string
  grams: number
  color: string
}) {
  const max = 80
  const pct = Math.min(100, (grams / max) * 100)
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-cream-300">{label}</span>
        <span className="tabular-nums text-cream-100">
          {grams}g
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

function NutrientRow({ name, value, unit, dv }: { name: string; value: number; unit: string; dv: number }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="w-28 shrink-0">
        <p className="text-xs text-cream-300">{name}</p>
      </div>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(100, dv)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
      <p className="w-24 shrink-0 text-right text-xs tabular-nums text-cream-400">
        {value}{unit} · <span className="text-gold-300">{dv}%</span>
      </p>
    </div>
  )
}

export function NutritionPanel({ nutrition }: { nutrition: Nutrition }) {
  const macros = [
    { name: 'Protein', value: nutrition.protein, color: '#e9cf84' },
    { name: 'Carbs', value: nutrition.carbs, color: '#8fc0b3' },
    { name: 'Fat', value: nutrition.fat, color: '#d95f35' },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(260px,1fr)_2fr]">
      <div className="space-y-6">
        <div className="glass rounded-[28px] p-6">
          <p className="text-sm font-medium text-cream-200">Serving</p>
          <p className="mt-1 text-sm text-cream-400">{nutrition.serving}</p>
          <MacroDonut data={macros} centerValue={`${nutrition.calories}`} centerLabel="kcal" height={200} />
          <div className="mt-1 flex justify-center gap-5 text-xs text-cream-400">
            {macros.map((slice) => (
              <span key={slice.name} className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: slice.color }} aria-hidden="true" />
                {slice.name}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-[28px] p-6">
          <p className="mb-4 text-sm font-medium text-cream-200">Health score</p>
          <div className="flex items-center justify-center">
            <RingProgress value={nutrition.healthScore} size={140} stroke={11}>
              <div className="text-center">
                <p className="font-display text-3xl font-light text-gold-gradient">{nutrition.healthScore}</p>
                <p className="text-[10px] uppercase tracking-widest text-cream-500">/ 100</p>
              </div>
            </RingProgress>
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-cream-500">
            A balanced estimate of micronutrient density per serving — not a verdict, just context.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">Macronutrients</h3>
          <div className="mt-5 space-y-4">
            <MacroBar label="Protein" grams={nutrition.protein} color="#e9cf84" />
            <MacroBar label="Carbohydrates" grams={nutrition.carbs} color="#8fc0b3" />
            <MacroBar label="Fat" grams={nutrition.fat} color="#d95f35" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-5 text-center">
            <div>
              <p className="text-xs text-cream-500">Fiber</p>
              <p className="mt-0.5 text-sm font-medium tabular-nums text-cream-100">{nutrition.fiber}g</p>
            </div>
            <div>
              <p className="text-xs text-cream-500">Sugar</p>
              <p className="mt-0.5 text-sm font-medium tabular-nums text-cream-100">{nutrition.sugar}g</p>
            </div>
            <div>
              <p className="text-xs text-cream-500">Sodium</p>
              <p className="mt-0.5 text-sm font-medium tabular-nums text-cream-100">{nutrition.sodium}mg</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">Vitamins</h3>
          <div className="mt-4 divide-y divide-white/5">
            {nutrition.vitamins.map((v) => (
              <NutrientRow key={v.name} {...v} />
            ))}
          </div>
        </div>

        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">Minerals</h3>
          <div className="mt-4 divide-y divide-white/5">
            {nutrition.minerals.map((m) => (
              <NutrientRow key={m.name} {...m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
