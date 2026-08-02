import type { Dish } from '../types'
import { ALL_DISHES } from './catalog'

/** Deterministic PRNG so a given seed always yields the same "issue". */
function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function shuffle<T>(input: readonly T[], rng: () => number): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function pickCollection(size: number): Dish[] {
  const rng = mulberry32(SESSION_SEED)
  const byContinent = new Map<string, Dish[]>()
  for (const dish of ALL_DISHES) {
    const list = byContinent.get(dish.continent) ?? []
    list.push(dish)
    byContinent.set(dish.continent, list)
  }

  const pools = [...byContinent.entries()].map(([, list]) => shuffle(list, rng))
  const picked: Dish[] = []
  const total = ALL_DISHES.length
  const perContinent = pools.map((pool) => Math.max(1, Math.round((pool.length / total) * size)))

  let i = 0
  while (picked.length < size && pools.some((pool) => pool.length)) {
    const pool = pools[i % pools.length]
    const target = perContinent[i % pools.length]
    if (pool.length && picked.filter((d) => d.continent === pool[0].continent).length < target) {
      picked.push(pool.shift()!)
    }
    i++
  }
  return picked
}

const SESSION_SEED = (() => Math.floor(Math.random() * 2 ** 31))()
export const sessionSeed = SESSION_SEED
export const sessionIssue = 1 + (SESSION_SEED % 999)

export const COLLECTION_SIZE = 40
export const sessionDishes: Dish[] = pickCollection(COLLECTION_SIZE)

export function featuredDishes(n = 3): Dish[] {
  const rng = mulberry32((SESSION_SEED ^ 0x9e3779b9) >>> 0)
  return shuffle(sessionDishes, rng).slice(0, n)
}

export function countriesOf(collection: Dish[]): string[] {
  return [...new Set(collection.map((dish) => dish.country))]
}

export function searchDishes(collection: Dish[], query: string): Dish[] {
  const needle = query.toLocaleLowerCase().trim()
  if (!needle) return collection
  return collection.filter((dish) =>
    `${dish.name} ${dish.localName} ${dish.country} ${dish.region} ${dish.continent} ${dish.cuisine} ${dish.category} ${dish.tags.join(' ')} ${dish.story}`.toLocaleLowerCase().includes(needle),
  )
}

export function filterByCountry(collection: Dish[], country: string): Dish[] {
  if (country === 'All') return collection
  return collection.filter((dish) => dish.country === country)
}

export function filterByTag(collection: Dish[], tag: string): Dish[] {
  if (tag === 'All') return collection
  return collection.filter((dish) => dish.tags.includes(tag))
}

/** Recommendations that lean on the dish's own suggested neighbours first. */
export function relatedDishes(dish: Dish, n = 3): Dish[] {
  const related = dish.related.map((id) => ALL_DISHES.find((d) => d.id === id)).filter((d): d is Dish => Boolean(d))
  if (related.length >= n) return related.slice(0, n)
  const extras = ALL_DISHES.filter(
    (d) => d.id !== dish.id && !related.includes(d) && (d.cuisine === dish.cuisine || d.country === dish.country),
  )
  return [...related, ...extras].slice(0, n)
}

/** A "what everyone is cooking" list: dishes whose tags appear most often across this issue. */
export function trendingDishes(n = 6): Dish[] {
  const frequency = new Map<string, number>()
  sessionDishes.forEach((dish) => dish.tags.forEach((tag) => frequency.set(tag, (frequency.get(tag) ?? 0) + 1)))
  const scored = [...sessionDishes].map((dish) => ({
    dish,
    score: dish.tags.reduce((sum, tag) => sum + (frequency.get(tag) ?? 0), 0),
  }))
  return scored.sort((a, b) => b.score - a.score).slice(0, n).map((entry) => entry.dish)
}

const SEASON_TAGS: Record<string, string[]> = {
  winter: ['Winter', 'Slow', 'Braise', 'Comfort', 'One-Pot', 'Soup'],
  spring: ['Spring', 'Fresh', 'Herbs', 'Light', 'Green'],
  summer: ['Summer', 'Grill', 'Fresh', 'Street Food', 'Salad', 'Cold'],
  autumn: ['Autumn', 'Root', 'Braise', 'Slow', 'One-Pot', 'Harvest'],
}

export function seasonalDishes(n = 4): Dish[] {
  const month = new Date().getMonth()
  const season = month <= 1 || month === 11 ? 'winter' : month <= 4 ? 'spring' : month <= 7 ? 'summer' : 'autumn'
  const tags = SEASON_TAGS[season]
  const scored = [...sessionDishes]
    .map((dish) => ({
      dish,
      score: dish.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, n).map((entry) => entry.dish)
}

export function numberToWords(n: number): string {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  if (n < 20) return ones[n] || String(n)
  if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? '-' + ones[n % 10] : ''}`
  if (n < 1000) {
    const rest = n % 100
    return `${ones[Math.floor(n / 100)]} hundred${rest ? ` and ${numberToWords(rest)}` : ''}`
  }
  return String(n)
}
