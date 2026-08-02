import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { sessionDishes, searchDishes, filterByCountry, filterByTag, numberToWords } from '@/data/dishes'
import { DishCard } from '@/components/dish/DishCard'
import { Page } from '@/components/ui/Page'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FilterChips } from '@/components/ui/FilterChips'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

export function DiscoverPage() {
  const [country, setCountry] = useState('All')
  const [tag, setTag] = useState('All')
  const [query, setQuery] = useState('')

  const countries = useMemo(
    () => ['All', ...Array.from(new Set(sessionDishes.map((dish) => dish.country)))],
    [],
  )

  const tags = useMemo(() => {
    const counts = new Map<string, number>()
    sessionDishes.forEach((dish) => dish.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)))
    return ['All', ...Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).map(([t]) => t)]
  }, [])

  const visible = useMemo(
    () => filterByTag(filterByCountry(searchDishes(sessionDishes, query), country), tag),
    [country, tag, query],
  )

  const hasFilters = country !== 'All' || tag !== 'All' || query !== ''

  return (
    <Page className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Discover"
          title={`${numberToWords(sessionDishes.length)} dishes, one long table`}
          description="Pick a plate and read it like a place — its history, its ingredients, its ceremony, its people. Search by name, mood or region, or simply follow your hunger. The table is rebuilt fresh every visit."
        />

        <Reveal delay={2}>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative max-w-md">
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream-500"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search dishes, regions, flavours…"
                aria-label="Search dishes"
                className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-cream-100 placeholder:text-cream-500 focus:border-gold-500/40 focus:outline-none focus-visible:border-gold-500/40 [&::-webkit-search-cancel-button]:hidden"
              />
            </div>
            <div className="hidden items-center gap-2 text-xs text-cream-500 lg:flex">
              <SlidersHorizontal size={13} aria-hidden="true" />
              <span>
                Showing <span className="font-semibold text-cream-200">{visible.length}</span> of {sessionDishes.length} dishes
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-6 space-y-3">
            <FilterChips
              options={countries.map((name) => ({ value: name, label: name }))}
              value={country}
              onChange={setCountry}
              ariaLabel="Filter dishes by country"
            />
            <FilterChips
              options={tags.map((name) => ({ value: name, label: name }))}
              value={tag}
              onChange={setTag}
              ariaLabel="Filter dishes by mood or style"
            />
          </div>
        </Reveal>

        <p className="mt-8 text-sm text-cream-500 lg:hidden">
          Showing <span className="font-semibold text-cream-200">{visible.length}</span> of {sessionDishes.length} dishes
        </p>

        <motion.div layout className="mt-8 grid gap-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((dish, index) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <DishCard dish={dish} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="glass mx-auto mb-10 flex max-w-xl flex-col items-center rounded-[32px] px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
              <Search size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-light text-cream-100">
              Nothing on the pass for that
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-400">
              The kitchen searched every shelf — no dish matches those filters. Try a different
              country, drop the flavour filter, or clear it all and start again.
            </p>
            {hasFilters && (
              <MagneticButton
                onClick={() => {
                  setCountry('All')
                  setTag('All')
                  setQuery('')
                }}
                className={cn(
                  'mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-sm font-semibold text-ink-950 shadow-gold',
                )}
              >
                Clear the filters
              </MagneticButton>
            )}
          </div>
        )}
      </div>
    </Page>
  )
}
