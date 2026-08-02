import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ALL_DISHES, numberToWords } from '@/data/dishes'

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,154,46,0.14),transparent_70%)]"
      />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-display text-5xl font-light leading-[1.08] text-cream-gradient sm:text-6xl md:text-7xl">
            The table is set.
          </p>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-400 md:text-lg">
            Pull up a chair. Meet all {numberToWords(ALL_DISHES.length)} dishes the way their homelands
            eat them — with history on the side and seconds, always, on the way.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-sm font-semibold text-ink-950 shadow-gold transition-shadow hover:shadow-[0_16px_48px_-8px_rgba(201,154,46,0.5)]"
              >
                Feast your eyes
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/about"
                className="glass-strong inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-cream-100 transition-colors hover:border-gold-500/40"
              >
                Our story
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
