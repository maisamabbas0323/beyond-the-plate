import { HeartHandshake, Sprout, Rocket } from 'lucide-react'
import { Page } from '@/components/ui/Page'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DishImage } from '@/components/ui/DishImage'
import { philosophy, inside } from '@/data/site'
import { ALL_DISHES, countriesOf } from '@/data/dishes'
import { ABOUT_IMAGE } from '@/data/images'

const PHILOSOPHY_ICONS = [HeartHandshake, Sprout, Rocket]

export function AboutPage() {
  return (
    <Page className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="About the project"
          title="Why we built a kitchen-shaped museum"
          description="Beyond The Plate began with a single question: what if every meal came with its passport? This is the answer — an editorial, data-rich tour of the food we love and the cultures that made it."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <DishImage
                src={ABOUT_IMAGE}
                alt="A chef plating a dish in a professional kitchen"
                gradient="linear-gradient(135deg,#141417 0%,#4c4638 100%)"
                accent="#cfb98c"
                label="About"
                className="aspect-[4/3] rounded-[32px] shadow-lift"
                eager
              />
              <div className="glass-strong absolute -bottom-5 -left-4 rounded-2xl px-5 py-4 shadow-lift sm:-left-6">
                <p className="font-display text-2xl font-light text-gold-gradient">{ALL_DISHES.length} dishes</p>
                <p className="text-xs text-cream-400">{countriesOf(ALL_DISHES).length} countries, one shared table</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={1}>
              <p className="leading-relaxed text-cream-300">
                Food is the most democratic museum in the world — free to enter, impossible to leave
                unchanged. We document the dishes that carry whole civilisations in their broth: the
                fire that began cooking, the spice routes that stitched continents together, and the
                family recipes that quietly outlast empires.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="leading-relaxed text-cream-300">
                Every entry pairs careful research — history, nutrition, ceremony — with an interface
                designed to feel like sitting down at a well-loved table. We are a field kitchen with
                a filing cabinet, and everything here is real: real dishes, real places, real patience.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
        <SectionHeading
          eyebrow="The journey"
          title="How the table came to be set"
          description="Every archive has an origin story. Ours began with a hungry question and grew, bowl by bowl, into a small atlas of flavour."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-3">
          {[
            {
              step: 'I',
              title: 'The first question',
              text: 'What if a menu told you not just what to eat, but who to thank? We started with a single bowl of phở and followed the trail of its broth — across borders, centuries and families.',
            },
            {
              step: 'II',
              title: 'The archive grew',
              text: 'One dish became a hundred-odd entries. Each one demanded its history, its recipe, its nutrition and its ceremony — until the collection became a place you could wander, the way you would a museum after closing time.',
            },
            {
              step: 'III',
              title: 'The table is open',
              text: 'This is not a finished exhibition. New dishes, new festivals and new stories keep arriving — because the world keeps cooking. Pull up a chair whenever you are hungry for context.',
            },
          ].map((chapter, index) => (
            <Reveal key={chapter.title} delay={index * 0.1}>
              <article className="group relative h-full border-l border-white/10 pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border border-gold-500/50 bg-ink-950 transition-colors duration-300 group-hover:bg-gold-400"
                />
                <p className="font-display text-4xl font-light text-gold-500/40">{chapter.step}</p>
                <h3 className="mt-3 font-display text-xl font-light text-cream-100">{chapter.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-400">{chapter.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionHeading eyebrow="Philosophy" title="Three rules of the kitchen" align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {philosophy.map((item, index) => {
            const Icon = PHILOSOPHY_ICONS[index]
            return (
              <Reveal key={item.title} delay={index * 0.1}>
                <article className="glass group h-full rounded-[28px] p-8 transition-colors duration-500 hover:border-gold-500/25">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300 transition-transform duration-500 group-hover:-translate-y-1">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-light text-cream-100">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-400">{item.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <SectionHeading
          eyebrow="Inside the archive"
          title="What you will find"
          description="A collection built to be read slowly, like a good meal — each number attached to something you can actually taste."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inside.map((item, index) => (
            <Reveal key={item.value} delay={(index % 4) * 0.06}>
              <div className="glass flex h-full flex-col items-start gap-4 rounded-3xl p-6 transition-colors duration-500 hover:border-gold-500/25">
                <p className="font-display text-4xl font-light text-gold-gradient">{item.value}</p>
                <p className="text-xs leading-relaxed text-cream-400">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 md:px-10">
        <div className="glass-strong relative overflow-hidden rounded-[36px] p-8 text-center sm:p-14">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(201,154,46,0.1),transparent_65%)]"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Acknowledgements</p>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-cream-300">
            Our deepest thanks to the home cooks, taqueros, ramen masters and grandmothers who keep
            these traditions alive. Photography graciously referenced from Unsplash contributors.
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.22em] text-cream-500">
            A living archive — the table keeps growing
          </p>
        </div>
      </section>
    </Page>
  )
}
