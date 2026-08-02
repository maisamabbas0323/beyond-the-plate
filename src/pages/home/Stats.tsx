import { stats } from '@/data/site'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { Reveal } from '@/components/ui/Reveal'

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            delay={index * 0.1}
            className="flex flex-col items-center gap-2 text-center"
          >
            <p className="font-display text-5xl font-light text-gold-gradient sm:text-6xl">
              <AnimatedNumber value={stat.value} />
              {stat.suffix}
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-cream-500">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
