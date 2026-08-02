import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Dish } from '@/data/types'
import { dishImagery } from '@/data/images'
import { DishImage } from '@/components/ui/DishImage'
import { DishMeta } from '@/components/ui/DifficultyBadge'
import { Pill } from '@/components/ui/Pill'

interface DishCardProps {
  dish: Dish
  index?: number
}

export function DishCard({ dish, index = 0 }: DishCardProps) {
  const imagery = dishImagery(dish)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
    >
      <Link
        to={`/discover/${dish.id}`}
        aria-label={`Explore ${dish.name}, a ${dish.country} classic`}
        className="glass flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-gold-500/30 group-hover:shadow-lift"
      >
        <div className="relative overflow-hidden">
          <DishImage
            src={imagery.src}
            alt={dish.imageAlt}
            gradient={imagery.gradient}
            accent={imagery.accent}
            label={dish.name}
            className="aspect-[4/3]"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <Pill tone="gold" className="backdrop-blur-md">
              <span aria-hidden="true">{dish.flag}</span> {dish.country}
            </Pill>
          </div>

          <span
            aria-hidden="true"
            className="absolute -right-2 top-2 select-none font-display text-7xl font-light italic text-white/[0.07] transition-colors duration-500 group-hover:text-gold-300/20"
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-ink-950/40 text-gold-300 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-light leading-tight text-cream-50 sm:text-2xl">
                {dish.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs italic text-cream-500">
                <MapPin size={11} className="text-gold-500" aria-hidden="true" />
                {dish.region}, {dish.country}
              </p>
            </div>
          </div>

          <p className="line-clamp-2 font-display text-sm italic leading-relaxed text-gold-300/90">
            {dish.tagline}
          </p>

          <p className="line-clamp-2 text-sm leading-relaxed text-cream-400">{dish.story}</p>

          <div className="mt-auto border-t border-white/5 pt-4">
            <DishMeta calories={dish.calories} cookTime={dish.cookTime} difficulty={dish.difficulty} />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
