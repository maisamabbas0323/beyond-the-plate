import { ALL_DISHES } from '@/data/dishes'

export function Marquee() {
  const items = [...ALL_DISHES, ...ALL_DISHES]

  return (
    <div
      className="relative overflow-hidden border-y border-white/5 bg-ink-900/60 py-5"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {items.map((dish, index) => (
          <span
            key={`${dish.id}-${index}`}
            className="inline-flex items-center gap-3 text-sm tracking-wide text-cream-400"
          >
            <span>{dish.flag}</span>
            <span className="font-display text-lg italic text-cream-200">{dish.name}</span>
            <span className="text-gold-500">—</span>
            <span>{dish.country}</span>
            <span className="ml-4 text-gold-500/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
