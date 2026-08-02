import { useMemo, useState } from 'react'
import type { Ingredient } from '@/data/types'

export function useServingCalculator(ingredients: Ingredient[], baseServings = 4) {
  const [servings, setServings] = useState(baseServings)

  const scaled = useMemo(
    () =>
      ingredients.map((ingredient) => ({
        ...ingredient,
        amount: scaleAmount(ingredient.amount, servings / baseServings),
      })),
    [ingredients, servings, baseServings],
  )

  const step = servings >= 12 ? 2 : 1

  return { servings, setServings, scaled, step }
}

const NUMBER_PATTERN = /^([\d.,/]+)(.*)$/

function scaleAmount(raw: string, factor: number): string {
  const match = raw.trim().match(NUMBER_PATTERN)
  if (!match) return raw

  const value = parseFraction(match[1])
  const unit = match[2] ? ` ${match[2].trim()}` : ''

  return factor === 1 ? raw : `${roundNice(value * factor)}${unit}`
}

function parseFraction(input: string): number {
  const normalized = input.replace(',', '.')
  if (normalized.includes('/')) {
    const [num, den] = normalized.split('/').map((part) => parseFloat(part))
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) return num / den
  }
  return Number.parseFloat(normalized)
}

function roundNice(value: number): string {
  if (value < 1 && value !== 0) {
    const quarter = Math.round(value * 4) / 4
    if (Number.isInteger(quarter * 4)) return fractionOf(quarter)
  }
  if (Number.isInteger(value)) return String(value)
  const rounded = Math.round(value * 2) / 2
  return Number.isInteger(rounded) ? String(rounded) : String(rounded)
}

function fractionOf(value: number): string {
  const map: Record<string, string> = {
    '0.25': '¼',
    '0.5': '½',
    '0.75': '¾',
  }
  return map[String(value)] ?? String(value)
}
