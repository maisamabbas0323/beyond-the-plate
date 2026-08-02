import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { featuredDishes } from '@/data/dishes'
import { DishCard } from '@/components/dish/DishCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function FeaturedDishes() {
  const featured = featuredDishes(3)

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Where to start"
          title="Three bowls worth a detour"
          description="A broth that hums with history, a taco with a thousand-year lineage, and a sauce so complex it takes a village. These are the ones we keep coming back to."
        />
        <Reveal delay={2}>
          <Link
            to="/discover"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
          >
            See every dish
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((dish, index) => (
          <DishCard key={dish.id} dish={dish} index={index} />
        ))}
      </div>
    </section>
  )
}
