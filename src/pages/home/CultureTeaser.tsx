import { Link } from 'react-router-dom'
import { Landmark, ArrowRight } from 'lucide-react'
import { CULTURE_IMAGE } from '@/data/images'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DishImage } from '@/components/ui/DishImage'

export function CultureTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <DishImage
              src={CULTURE_IMAGE}
              alt="Tea being poured in a traditional ceremony"
              gradient="linear-gradient(135deg,#15130e 0%,#4c3a20 100%)"
              accent="#c9a74e"
              label="Culture"
              className="aspect-[4/5] rounded-[32px] shadow-lift sm:aspect-[4/4.2]"
              eager
            />
            <div className="relative z-10 -mt-8 flex justify-end pr-2 sm:absolute sm:-bottom-6 sm:right-6 sm:mt-0">
              <div className="glass-strong flex items-center gap-3 rounded-3xl px-5 py-4 shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
                  <Landmark size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-cream-100">5,000 years</p>
                  <p className="text-xs text-cream-400">of stories on one table</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Culture & tradition"
            title="A dish is a diary of a civilisation"
            description="Every recipe hides an archive. Fire, spice roads, colonial exchanges and family hearths all left fingerprints on what you taste today. The Culture archive reads them, era by era."
          />
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {['The Fire', 'Spice Roads', 'Columbian Exchange', 'The Return'].map((chapter) => (
                <span
                  key={chapter}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream-300"
                >
                  {chapter}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={4}>
            <Link
              to="/culture"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-cream-50 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-white"
            >
              Enter the archive
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
