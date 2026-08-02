import type { Dish } from '../types'
import { dishes as legacyDishes, type LegacyDish } from './legacy'
import { ENRICH } from './enrich'
import { asiaDishes } from './asia'
import { middleEastDishes } from './middle-east'
import { europeDishes } from './europe'
import { africaDishes } from './africa'
import { americasDishes } from './americas'
import { oceaniaDishes } from './oceania'

const enrich = (dish: LegacyDish): Dish => {
  const extra = ENRICH[dish.id]
  return extra ? ({ ...dish, ...extra } as Dish) : (dish as Dish)
}

export const ALL_DISHES: Dish[] = [
  ...legacyDishes.map(enrich),
  ...asiaDishes,
  ...middleEastDishes,
  ...europeDishes,
  ...africaDishes,
  ...americasDishes,
  ...oceaniaDishes,
]

export const dishById = new Map(ALL_DISHES.map((dish) => [dish.id, dish]))
export const getDish = (id: string) => dishById.get(id)
