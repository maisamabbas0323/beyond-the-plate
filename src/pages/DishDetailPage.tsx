import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Lightbulb, Sparkles, Globe2 } from 'lucide-react'
import { useRef } from 'react'
import { getDish, relatedDishes } from '@/data/dishes'
import { dishImagery } from '@/data/images'
import { Page } from '@/components/ui/Page'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Pill } from '@/components/ui/Pill'
import { DishImage } from '@/components/ui/DishImage'
import { DishMeta } from '@/components/ui/DifficultyBadge'
import { DishCard } from '@/components/dish/DishCard'
import { NutritionPanel } from '@/components/dish/NutritionPanel'
import { RecipeGuide } from '@/components/dish/RecipeGuide'
import { formatMinutes } from '@/lib/utils'

function DetailHero({ id }: { id: string }) {
  const dish = getDish(id)!
  const imagery = dishImagery(dish)
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 140])

  return (
    <section ref={root} className="relative flex min-h-[86svh] items-end overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <DishImage
          src={imagery.src}
          alt={dish.imageAlt}
          gradient={imagery.gradient}
          accent={imagery.accent}
          label={dish.name}
          className="h-full w-full"
          eager
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/20" />

      <div className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
        <Link
          to="/discover"
          className="group inline-flex items-center gap-2 text-sm text-cream-300 transition-colors hover:text-gold-300"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Discover
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="gold" className="text-sm">
              <span aria-hidden="true">{dish.flag}</span> {dish.country}
            </Pill>
            <Pill>{dish.localName}</Pill>
          </div>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-white sm:text-7xl md:text-8xl">
            {dish.name}
          </h1>
          <p className="mt-5 max-w-xl font-display text-lg italic text-cream-300 sm:text-xl">
            {dish.tagline}
          </p>
          <div className="mt-7">
            <DishMeta calories={dish.calories} cookTime={dish.cookTime} difficulty={dish.difficulty} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StorySection({ id }: { id: string }) {
  const dish = getDish(id)!
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHeading eyebrow="The story" title="Where it began" />
          <Reveal delay={2}>
            <p className="mt-8 text-lg leading-relaxed text-cream-300">
              <span className="float-left mr-3 mt-1 font-display text-6xl font-light leading-[0.8] text-gold-gradient">
                {dish.history.charAt(0)}
              </span>
              {dish.history.slice(1)}
            </p>
          </Reveal>
        </div>
        <Reveal delay={3} className="lg:pt-20">
          <div className="glass rounded-[28px] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Cultural significance</p>
            <p className="mt-4 text-sm leading-relaxed text-cream-300">{dish.significance}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TimelineSection({ id }: { id: string }) {
  const dish = getDish(id)!
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
      <SectionHeading eyebrow="Through time" title="A short history on a plate" align="center" />
      <ol className="relative mx-auto mt-14 max-w-2xl space-y-12 border-l border-white/10 pl-8">
        {dish.timeline.map((entry, index) => (
          <Reveal key={entry.era} delay={index * 0.12}>
            <li className="relative">
              <span
                className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-gold-500/50 bg-ink-900"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{entry.era}</p>
              <h3 className="mt-2 font-display text-xl font-light text-cream-100">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-400">{entry.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function FactsSection({ id }: { id: string }) {
  const dish = getDish(id)!
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass rounded-[28px] p-7 md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
              <Lightbulb size={18} />
            </span>
            <h3 className="font-display text-xl font-light text-cream-100">Chef&rsquo;s recommendations</h3>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {dish.chefNotes.map((note, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <p className="font-display text-3xl font-light text-gold-500/50">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream-300">{note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="glass rounded-[28px] p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
              <Sparkles size={18} />
            </span>
            <h3 className="font-display text-xl font-light text-cream-100">Fun facts</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {dish.funFacts.map((fact, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-cream-400">
                <span className="mt-0.5 text-gold-400" aria-hidden="true">✦</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-[28px] p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
              <Globe2 size={18} />
            </span>
            <h3 className="font-display text-xl font-light text-cream-100">Regional variations</h3>
          </div>
          <ul className="mt-5 space-y-3">
            {dish.variations.map((variation) => (
              <li key={variation.name} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-sm font-medium text-gold-200">{variation.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-cream-400">{variation.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function TraditionSection({ id }: { id: string }) {
  const dish = getDish(id)!
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
      <div className="glass-strong relative overflow-hidden rounded-[36px] p-8 text-center sm:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(201,154,46,0.12),transparent_65%)]"
        />
        <BookOpen className="mx-auto text-gold-400" size={28} aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl font-light text-cream-gradient sm:text-3xl">
          How it is shared
        </h3>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-cream-300">{dish.tradition}</p>
        {dish.festival && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-5 py-2.5 text-sm text-gold-200">
            <span aria-hidden="true">🎉</span> {dish.festival}
          </p>
        )}
      </div>
    </section>
  )
}

export function DishDetailPage() {
  const { id } = useParams<{ id: string }>()
  const dish = id ? getDish(id) : undefined

  if (!dish) {
    return (
      <Page className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-6xl font-light text-gold-gradient">404</p>
        <p className="mt-4 text-cream-400">This dish is still simmering. It isn&rsquo;t on the menu yet.</p>
        <Link
          to="/discover"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-ink-950"
        >
          <ArrowLeft size={15} /> Back to Discover
        </Link>
      </Page>
    )
  }

  const related = relatedDishes(dish)

  return (
    <Page>
      <DetailHero id={dish.id} />
      <StorySection id={dish.id} />
      <TimelineSection id={dish.id} />

      <section id="recipe" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="The recipe"
              title="Cook it, step by step"
              description={`${dish.ingredients.length} ingredients, ${dish.recipe.length} steps, and about ${formatMinutes(dish.cookTime)} from first chop to last garnish.`}
            />
            <Reveal delay={2}>
              <Pill tone="gold">{dish.cookTime >= 60 ? `${Math.round(dish.cookTime / 60)}h ${dish.cookTime % 60}m` : `${dish.cookTime} min`} total</Pill>
            </Reveal>
          </div>
          <RecipeGuide dish={dish} />
        </div>
      </section>

      <section id="nutrition" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Nutrition"
              title="What fuels the flavour"
              description="Approximate values per serving, drawn from standard recipe databases and regional portion norms."
            />
          </div>
          <NutritionPanel nutrition={dish.nutrition} />
        </div>
      </section>

      <TraditionSection id={dish.id} />
      <FactsSection id={dish.id} />

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <SectionHeading eyebrow="Keep exploring" title="Dishes that pair well" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <DishCard key={item.id} dish={item} index={index} />
          ))}
        </div>
      </section>
    </Page>
  )
}
