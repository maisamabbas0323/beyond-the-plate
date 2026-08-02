import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Apple, ArrowRight } from 'lucide-react'
import { getDish } from '@/data/dishes'
import { RingProgress } from '@/components/ui/RingProgress'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Pill } from '@/components/ui/Pill'
import { Skeleton } from '@/components/ui/Skeleton'

const MacroDonut = lazy(() =>
  import('@/components/ui/MacroDonut').then((m) => ({ default: m.MacroDonut })),
)

export function NutritionTeaser() {
  const pho = getDish('pho')!

  const donut = [
    { name: 'Protein', value: pho.nutrition.protein, color: '#e9cf84' },
    { name: 'Carbs', value: pho.nutrition.carbs, color: '#8fc0b3' },
    { name: 'Fat', value: pho.nutrition.fat, color: '#d95f35' },
  ]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Nutrition dashboard"
            title="Good food, measured with respect"
            description="A bowl of phở isn't a spreadsheet — but understanding what fuels it changes how you enjoy it. Every dish in the collection ships with a full nutritional portrait."
          />
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Pill tone="gold">
                <Apple size={13} /> {pho.nutrition.calories} kcal per serving
              </Pill>
              <Pill>Health score {pho.nutrition.healthScore}/100</Pill>
              <Pill>{pho.nutrition.protein}g protein</Pill>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <Link
              to="/nutrition"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 px-7 py-3.5 text-sm font-semibold text-gold-300 transition-colors hover:bg-gold-500/10"
            >
              Open the dashboard
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={2} className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="glass rounded-[32px] p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-cream-200">{pho.name}</p>
              <span className="text-lg" aria-hidden="true">{pho.flag}</span>
            </div>
            <Suspense
              fallback={<Skeleton className="mx-auto aspect-square h-[200px] rounded-full" />}
            >
              <MacroDonut data={donut} centerValue={`${pho.nutrition.calories}`} centerLabel="kcal" />
            </Suspense>
            <div className="mt-2 flex justify-center gap-5 text-xs text-cream-400">
              {donut.map((slice) => (
                <span key={slice.name} className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: slice.color }} aria-hidden="true" />
                  {slice.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center sm:block">
            <div className="glass rounded-[32px] p-6">
              <RingProgress value={pho.nutrition.healthScore} size={150} stroke={10}>
                <div className="text-center">
                  <p className="font-display text-4xl font-light text-gold-gradient">
                    {pho.nutrition.healthScore}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-cream-500">Health score</p>
                </div>
              </RingProgress>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
