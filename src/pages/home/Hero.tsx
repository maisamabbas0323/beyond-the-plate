import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { Fragment, useRef } from 'react'
import { ArrowRight, ChevronDown, Flame } from 'lucide-react'
import { HERO_IMAGE, dishImagery } from '@/data/images'
import { featuredDishes, ALL_DISHES, countriesOf } from '@/data/dishes'
import { Steam } from '@/components/ui/Steam'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Pill } from '@/components/ui/Pill'
import { DishImage } from '@/components/ui/DishImage'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import type { Dish } from '@/data/types'

const HERO_COPY = ['Explore', 'food,', 'culture,', 'and tradition.'] as const

function StaggerLine({ words, delay = 0 }: { words: readonly string[]; delay?: number }) {
  return (
    <span className="block">
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </span>
  )
}

/** Slow Ken Burns pan behind everything — motion that never fights the type. */
function BackgroundImage({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 -z-30"
      style={{ scale: reduced ? 1.08 : undefined }}
      animate={reduced ? undefined : { scale: [1.06, 1.14, 1.06], x: [0, -18, 0], y: [0, 12, 0] }}
      transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img
        src={HERO_IMAGE}
        alt=""
        className="h-full w-full object-cover blur-[1.5px]"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </motion.div>
  )
}

/** A quiet constellation of gold dust drifting over the hero. */
function GoldDust({ reduced }: { reduced: boolean }) {
  if (reduced) return null
  const particles = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 71 + 17) % 100}%`,
    top: `${(i * 53 + 9) % 100}%`,
    size: i % 3 === 0 ? 5 : 3,
    delay: (i * 0.47) % 5,
    duration: 6 + (i % 5) * 1.4,
    drift: (i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 10),
  }))

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold-300"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px 2px rgba(217,181,87,0.35)',
          }}
          animate={{ y: [0, -90, 0], x: [0, p.drift, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/** The featured dish, alive: floats, tilts toward the cursor, and catches the light. */
function HeroDishCard({ dish }: { dish: Dish }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 170, damping: 18 })

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 9)
    rx.set(-py * 9)
  }

  function handleLeave() {
    rx.set(0)
    ry.set(0)
  }

  const imagery = dishImagery(dish)

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 950 }}
      className="origin-center"
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="glass-reflect glass-strong overflow-hidden rounded-3xl p-2 shadow-[0_44px_100px_-28px_rgba(0,0,0,0.85)]">
          <div className="relative overflow-hidden rounded-2xl">
            <DishImage
              src={imagery.src}
              alt={dish.imageAlt}
              gradient={imagery.gradient}
              accent={imagery.accent}
              label={dish.name}
              className="aspect-[4/3]"
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={reduced ? undefined : { x: ['-120%', '480%'] }}
              transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
          </div>
          <div className="flex items-center justify-between px-3 pb-2 pt-3">
            <div>
              <p className="text-sm font-medium text-cream-100">{dish.name}</p>
              <p className="text-xs text-cream-500">{dish.country}</p>
            </div>
            <motion.span
              aria-hidden="true"
              className="text-lg"
              animate={reduced ? undefined : { rotate: [0, 6, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {dish.flag}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/** The live counter pill — numbers that climb, a flame that keeps watch. */
function StatPill() {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="glass-reflect glass-strong flex items-center gap-3 rounded-full py-3 pl-4 pr-5 shadow-lift"
      animate={reduced ? undefined : { scale: [1, 1.02, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.span
        className="flex h-8 w-8 items-center justify-center rounded-full bg-flame-500/20 text-flame-400"
        animate={reduced ? undefined : { scale: [1, 1.14, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Flame size={16} />
      </motion.span>
      <p className="text-sm text-cream-200">
        <AnimatedNumber value={ALL_DISHES.length} className="font-semibold text-gold-300" /> dishes
        <span className="mx-1.5 text-cream-500">·</span>
        <AnimatedNumber value={countriesOf(ALL_DISHES).length} className="font-semibold text-gold-300" /> countries
      </p>
    </motion.div>
  )
}

function scrollToNext() {
  const target = document.getElementById('after-hero')
  if (!target) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
}

function ScrollIndicator() {
  const reduced = useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={scrollToNext}
      aria-label="Scroll to explore the collection"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7, duration: 0.8 }}
      className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full p-2 text-gold-400 transition-colors hover:text-gold-200"
    >
      <span className="relative flex h-11 w-11 items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-gold-500/25"
          animate={reduced ? undefined : { scale: [1, 1.55], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold-500/10"
          animate={reduced ? undefined : { scale: [1, 1.3], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.35 }}
        />
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 group-hover:border-gold-400/40 group-hover:bg-gold-500/10">
          <motion.span
            aria-hidden="true"
            animate={reduced ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={17} />
          </motion.span>
        </span>
      </span>
      <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400/80 animate-pulse-soft">Scroll</span>
    </motion.button>
  )
}

export function Hero() {
  const reducedMotion = useReducedMotion()
  const root = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, reducedMotion ? 0 : -60])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -140])
  const pillY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -90])

  const featured = featuredDishes(3)
  const dish = featured[2]

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden">
      <BackgroundImage reduced={Boolean(reducedMotion)} />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-ink-950/80 via-ink-950/45 to-ink-950"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_75%_65%_at_35%_42%,rgba(10,10,12,0.62),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_32%_46%,rgba(217,181,87,0.14),transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noise opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(5,5,7,0.55)_100%)]"
      />

      <GoldDust reduced={Boolean(reducedMotion)} />
      <Steam className="absolute bottom-[16%] left-1/2 z-0 h-40 w-40 -translate-x-1/2" intensity={0.7} />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-28 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Pill tone="gold" className="gap-2 px-4 py-1.5 text-xs sm:text-sm">
            <span className="text-gold-300">✦</span> The stories behind the dishes we love
          </Pill>
        </motion.div>

        <h1 className="mt-7 font-display text-[2.7rem] font-light leading-[1.04] tracking-tight text-white sm:text-7xl md:text-8xl">
          <StaggerLine words={[HERO_COPY[0], HERO_COPY[1]]} delay={0.35} />
          <StaggerLine words={[HERO_COPY[2], HERO_COPY[3]]} delay={0.62} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-cream-300 sm:text-lg"
        >
          Every dish carries a history worth tasting. Geography, memory, family and fire —
          served on a plate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <Link
              to="/discover"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-gold transition-shadow duration-300 hover:shadow-[0_16px_48px_-8px_rgba(201,154,46,0.55)]"
            >
              Start exploring
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              to="/recipes"
              className="glass-strong inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-500/40"
            >
              Cook with us
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: cardY }}
        className="absolute right-[6%] top-[17%] z-10 hidden w-60 2xl:block"
      >
        <HeroDishCard dish={dish} />
      </motion.div>

      <motion.div
        style={{ y: pillY }}
        className="absolute bottom-[22%] right-[10%] z-10 hidden xl:block"
      >
        <StatPill />
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
