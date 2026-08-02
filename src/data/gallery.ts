import type { GalleryItem } from './types'
import { ALL_DISHES } from './dishes'
import { GALLERY_EXTRA } from './images'

const CONTINENT_TAG: Record<string, string> = {
  'Europe': 'Europe',
  'Asia': 'Asia',
  'Americas': 'Americas',
  'Africa': 'Africa',
  'MiddleEast': 'Middle East',
  'Oceania': 'Oceania',
}

function regionTag(continent: string): string {
  return CONTINENT_TAG[continent] ?? 'World'
}

const dishShots = ALL_DISHES.map((dish, index): GalleryItem => {
  const ratios: GalleryItem['ratio'][] = ['portrait', 'square', 'landscape', 'square', 'portrait', 'landscape', 'square', 'portrait', 'landscape']
  return {
    src: dish.image,
    alt: dish.imageAlt,
    caption: dish.name,
    sub: `${dish.region} · ${dish.country}`,
    tag: regionTag(dish.continent),
    ratio: ratios[index % ratios.length],
    dishId: dish.id,
  }
})

const extraShots: GalleryItem[] = GALLERY_EXTRA.map((img, index) => ({
  src: img.src,
  alt: ['A toast topped with seasonal produce', 'A bowl of market-fresh vegetables', 'A plated salmon dish with herbs', 'A delicate dessert in a glass jar', 'A chef plating at a fine restaurant', 'A communal feast table from above'][index],
  caption: ['Golden hour toast', 'Market mornings', 'The catch of the day', 'Sweet endings', 'Behind the pass', 'The long table'][index],
  sub: 'Scenes from the journey',
  tag: 'Crafted',
  ratio: (['square', 'portrait', 'landscape', 'square', 'landscape', 'landscape'] as const)[index],
}))

export const galleryItems: GalleryItem[] = [...dishShots, ...extraShots]
