import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { Flame, Landmark, Quote, Sprout, Waves, Utensils, CalendarDays, ArrowRight } from 'lucide-react'
import { cultureChapters, festivals } from '@/data/culture'
import { CULTURE_IMAGE, dishImagery } from '@/data/images'
import { getDish } from '@/data/dishes'
import { Page } from '@/components/ui/Page'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DishImage } from '@/components/ui/DishImage'
import { cn } from '@/lib/utils'

const ACCENTS = {
  fire: { icon: Flame, color: '#e87a4a' },
  spice: { icon: Utensils, color: '#d9b557' },
  sea: { icon: Waves, color: '#8fc0b3' },
  field: { icon: Sprout, color: '#7fae6a' },
  table: { icon: Landmark, color: '#e9cf84' },
} as const

function CultureHero() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 140])

  return (
    <section ref={root} className="relative flex min-h-[70svh] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <DishImage
          src={CULTURE_IMAGE}
          alt="Traditional tea ceremony with steam rising"
          gradient="linear-gradient(135deg,#15130e 0%,#4c3a20 100%)"
          accent="#c9a74e"
          label="Culture"
          className="h-full w-full"
          eager
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/25" />
      <div className="mx-auto w-full max-w-6xl px-6 pb-14 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Culture &amp; tradition</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.04] text-cream-gradient sm:text-6xl md:text-7xl">
            Five moments that changed how the world eats
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-300 sm:text-lg">
            Scroll the archive of food&rsquo;s greatest turning points — from the first fire to the
            revival on today&rsquo;s farms. Each chapter is one hinge in a very long story.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ChapterTimeline() {
  const [active, setActive] = useState(0)
  const chapter = cultureChapters[active]
  const accent = ACCENTS[chapter.accent]
  const Icon = accent.icon

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.6fr)_1fr] lg:gap-16">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">The timeline</p>
          <p className="mt-2 text-sm leading-relaxed text-cream-500">
            Five eras, one continuous kitchen. Pick a chapter to read it.
          </p>
          <div className="no-scrollbar mt-6 flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {cultureChapters.map((item, index) => (
              <button
                key={item.era}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={cn(
                  'group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:w-full',
                  active === index
                    ? 'border-gold-500/40 bg-gold-500/10'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/15',
                )}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300"
                  style={{ background: ACCENTS[item.accent].color }}
                  aria-hidden="true"
                />
                <div>
                  <p className={cn('text-xs tracking-wide', active === index ? 'text-gold-300' : 'text-cream-500')}>
                    {item.era}
                  </p>
                  <p className={cn('text-sm font-medium', active === index ? 'text-cream-100' : 'text-cream-400')}>
                    {item.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.era}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative overflow-hidden rounded-[32px] p-8 sm:p-12"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-40"
              style={{ background: `radial-gradient(ellipse 70% 60% at 100% 0%, ${accent.color}22, transparent 65%)` }}
            />
            <div className="flex flex-wrap items-center gap-4">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: `${accent.color}1f`, color: accent.color }}
              >
                <Icon size={24} />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">{chapter.era}</p>
                <h3 className="font-display text-2xl font-light text-cream-100 sm:text-3xl">{chapter.title}</h3>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-300">{chapter.text}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {chapter.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs leading-relaxed text-cream-400"
                >
                  <span className="mb-2 block text-gold-400" aria-hidden="true">✦</span>
                  {fact}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function FestivalCard({
  name,
  country,
  flag,
  month,
  dish,
  dishId,
  text,
  index,
}: (typeof festivals)[number] & { index: number }) {
  const dishData = getDish(dishId)
  const imagery = dishData ? dishImagery(dishData) : undefined

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="glass group flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/30 hover:shadow-lift">
        <div className="relative overflow-hidden">
          {imagery && dishData ? (
            <DishImage
              src={imagery.src}
              alt={`${dish} served at ${name}`}
              gradient={imagery.gradient}
              accent={imagery.accent}
              label={dishData.name}
              className="aspect-[16/10]"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
            />
          ) : (
            <div className="aspect-[16/10] bg-gradient-to-br from-ink-800 to-ink-700" />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-950/45 px-3 py-1.5 text-xs font-medium text-cream-100 backdrop-blur-md">
            <CalendarDays size={13} className="text-gold-300" aria-hidden="true" />
            {month}
          </span>
          <span className="absolute bottom-3 left-4 font-display text-4xl font-light" aria-hidden="true">
            {flag}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl font-light text-cream-100">{name}</h3>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-gold-400">{country}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-400">{text}</p>
          <Link
            to={`/discover/${dishId}`}
            className="mt-5 inline-flex items-center gap-2 border-t border-white/5 pt-4 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
          >
            {dish}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </Reveal>
  )
}

function Festivals() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
      <SectionHeading
        eyebrow="Festivals & customs"
        title="When food becomes the calendar"
        description="Around the world, entire festivals are organised around a single dish. Here are six where eating is the ceremony."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival, index) => (
          <FestivalCard key={festival.name} {...festival} index={index} />
        ))}
      </div>
    </section>
  )
}

function QuoteBand() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <Reveal>
        <Quote className="mx-auto text-gold-500/60" size={36} aria-hidden="true" />
        <blockquote className="mt-6 font-display text-2xl font-light italic leading-snug text-cream-200 sm:text-3xl">
          &ldquo;Tell me what you eat and I will tell you who you are.&rdquo;
        </blockquote>
        <p className="mt-5 text-sm uppercase tracking-[0.2em] text-cream-500">Jean Anthelme Brillat-Savarin, 1825</p>
      </Reveal>
    </section>
  )
}

export function CulturePage() {
  return (
    <Page>
      <CultureHero />
      <ChapterTimeline />
      <QuoteBand />
      <Festivals />
    </Page>
  )
}
