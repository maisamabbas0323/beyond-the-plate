import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { sessionDishes } from '@/data/dishes'
import { dishImagery } from '@/data/images'
import { Page } from '@/components/ui/Page'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MacroDonut } from '@/components/ui/MacroDonut'
import { RingProgress } from '@/components/ui/RingProgress'
import { DishImage } from '@/components/ui/DishImage'
import { cn } from '@/lib/utils'

function ChartTooltip({
  active,
  payload,
  label,
  suffix = '',
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color?: string }>
  label?: string
  suffix?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-ink-850/95 px-3.5 py-2 text-xs shadow-card backdrop-blur-md">
      <p className="mb-1 font-medium text-cream-100">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="inline-flex items-center gap-1.5 text-cream-300">
          <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} aria-hidden="true" />
          {entry.name}: <span className="font-semibold text-cream-100">{entry.value}{suffix}</span>
        </p>
      ))}
    </div>
  )
}

function Dashboard() {
  const [selectedId, setSelectedId] = useState(sessionDishes[0].id)
  const dish = sessionDishes.find((item) => item.id === selectedId) ?? sessionDishes[0]
  const n = dish.nutrition
  const imagery = dishImagery(dish)

  const calorieData = sessionDishes.map((item) => ({
    name: item.country,
    short: item.flag,
    calories: item.nutrition.calories,
    selected: item.id === selectedId,
  }))

  const macroComparison = sessionDishes.map((item) => ({
    name: item.flag,
    Protein: item.nutrition.protein,
    Carbs: item.nutrition.carbs,
    Fat: item.nutrition.fat,
  }))

  const radarData = [...n.vitamins, ...n.minerals].map((item) => ({
    nutrient: item.name,
    coverage: item.dv,
  }))

  const donut = [
    { name: 'Protein', value: n.protein, color: '#e9cf84' },
    { name: 'Carbs', value: n.carbs, color: '#8fc0b3' },
    { name: 'Fat', value: n.fat, color: '#d95f35' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
      <div
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        role="group"
        aria-label="Choose a dish to inspect"
      >
        {sessionDishes.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            aria-pressed={item.id === selectedId}
            className={cn(
              'shrink-0 rounded-full border px-3.5 py-2 text-sm transition-all duration-300',
              item.id === selectedId
                ? 'border-gold-500/50 bg-gold-500/15 text-gold-200'
                : 'border-white/10 bg-white/[0.02] text-cream-400 hover:border-white/25',
            )}
          >
            <span className="mr-1.5" aria-hidden="true">{item.flag}</span>
            {item.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={dish.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <div className="glass flex flex-col gap-6 overflow-hidden rounded-[28px] p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
            <DishImage
              src={imagery.src}
              alt={dish.imageAlt}
              gradient={imagery.gradient}
              accent={imagery.accent}
              label={dish.name}
              className="h-40 w-full shrink-0 sm:h-28 sm:w-40 sm:rounded-2xl"
              imgClassName="rounded-2xl"
            />
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                {dish.flag} {dish.region}, {dish.country}
              </p>
              <h3 className="mt-1 font-display text-2xl font-light text-cream-100 sm:text-3xl">{dish.name}</h3>
              <p className="mt-1 font-display text-sm italic text-gold-300/90">{dish.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream-400">{dish.story}</p>
              <Link
                to={`/discover/${dish.id}`}
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
              >
                Read its full story
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="glass rounded-[28px] p-6">
              <p className="text-sm font-medium text-cream-200">One serving</p>
              <p className="mt-1 min-h-10 text-sm text-cream-400">{n.serving}</p>
              <MacroDonut data={donut} centerValue={`${n.calories}`} centerLabel="kcal" height={210} />
              <div className="mt-1 flex justify-center gap-5 text-xs text-cream-400">
                {donut.map((slice) => (
                  <span key={slice.name} className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: slice.color }} aria-hidden="true" />
                    {slice.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass rounded-[28px] p-6">
              <p className="text-sm font-medium text-cream-200">The macro breakdown</p>
              <p className="mt-1 text-xs text-cream-500">Grams per serving</p>
              <div className="mt-5 space-y-5">
                {donut.map((slice) => {
                  const max = 80
                  return (
                    <div key={slice.name} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-cream-300">{slice.name}</span>
                        <span className="tabular-nums text-cream-100">{slice.value}g</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: slice.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(slice.value / max) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/5 pt-5 text-center">
                <div>
                  <p className="text-xs text-cream-500">Fiber</p>
                  <p className="text-sm font-medium tabular-nums text-cream-100">{n.fiber}g</p>
                </div>
                <div>
                  <p className="text-xs text-cream-500">Sugar</p>
                  <p className="text-sm font-medium tabular-nums text-cream-100">{n.sugar}g</p>
                </div>
                <div>
                  <p className="text-xs text-cream-500">Sodium</p>
                  <p className="text-sm font-medium tabular-nums text-cream-100">{n.sodium}mg</p>
                </div>
              </div>
            </div>

            <div className="glass flex flex-col items-center justify-center rounded-[28px] p-6 text-center">
              <p className="self-start text-sm font-medium text-cream-200">Wellbeing score</p>
              <RingProgress value={n.healthScore} size={180} stroke={13}>
                <div className="text-center">
                  <p className="font-display text-5xl font-light text-gold-gradient">{n.healthScore}</p>
                  <p className="text-[10px] uppercase tracking-widest text-cream-500">of 100</p>
                </div>
              </RingProgress>
              <p className="mt-5 text-xs leading-relaxed text-cream-500">
                Micronutrient density per serving. Context, not commandment — no dish is a verdict.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">Calories across the collection</h3>
          <p className="mt-1 text-xs text-cream-500">Per single serving, per dish — the gold bar is the one you&rsquo;re viewing</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={calorieData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="short" tick={{ fill: '#c4ad83', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#c4ad83', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip suffix=" kcal" />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="calories" radius={[8, 8, 0, 0]}>
                  {calorieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.selected ? '#d9b557' : 'rgba(217,181,87,0.25)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">Macro split, dish by dish</h3>
          <p className="mt-1 text-xs text-cream-500">Grams per serving across this issue&rsquo;s collection</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={macroComparison} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="g-protein" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e9cf84" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#e9cf84" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-carbs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8fc0b3" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8fc0b3" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-fat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d95f35" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#d95f35" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#c4ad83', fontSize: 13 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#c4ad83', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip suffix=" g" />} />
                <Area type="monotone" dataKey="Protein" stroke="#e9cf84" strokeWidth={2} fill="url(#g-protein)" />
                <Area type="monotone" dataKey="Carbs" stroke="#8fc0b3" strokeWidth={2} fill="url(#g-carbs)" />
                <Area type="monotone" dataKey="Fat" stroke="#d95f35" strokeWidth={2} fill="url(#g-fat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">Vitamins &amp; minerals</h3>
          <p className="mt-1 text-xs text-cream-500">% of recommended daily intake, single serving</p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="nutrient" tick={{ fill: '#c4ad83', fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="coverage" stroke="#d9b557" fill="#d9b557" fillOpacity={0.22} strokeWidth={2} />
                <Tooltip content={<ChartTooltip suffix="%" />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[28px] p-6 sm:p-7">
          <h3 className="font-display text-lg font-light text-cream-100">What stands out</h3>
          <p className="mt-1 text-xs text-cream-500">The top micronutrient contributors in this serving</p>
          <div className="mt-5 space-y-4">
            {[...n.vitamins, ...n.minerals]
              .sort((a, b) => b.dv - a.dv)
              .slice(0, 6)
              .map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-cream-300">{item.name}</span>
                    <span className="tabular-nums text-gold-300">{item.dv}% DV</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, item.dv)}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-cream-500">
        Figures are estimates built from traditional recipes and standard serving sizes. Traditions outrank
        tables — a dish shared slowly over hours is worth more than any single number.
      </p>
    </div>
  )
}

export function NutritionPage() {
  return (
    <Page className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Nutrition dashboard"
          title="The meal, decoded"
          description="Pick a dish and inspect what a real serving carries — calories, macros, vitamins and minerals, all tied to a recipe and a tradition rather than a vague plate."
        />
      </div>
      <div className="mt-14">
        <Dashboard />
      </div>
    </Page>
  )
}
