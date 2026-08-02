export type Difficulty = 'easy' | 'intermediate' | 'advanced'

export type SpiceLevel = 0 | 1 | 2 | 3

export interface Ingredient {
  item: string
  amount: string
}

export interface RecipeStep {
  title: string
  text: string
  time?: number
}

export interface Nutrient {
  name: string
  value: number
  unit: string
  dv: number
}

export interface Nutrition {
  serving: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
  vitamins: Nutrient[]
  minerals: Nutrient[]
  healthScore: number
}

export interface TimelineEntry {
  era: string
  title: string
  text: string
}

export interface Variation {
  name: string
  text: string
}

export interface Dish {
  id: string
  name: string
  localName: string
  country: string
  region: string
  flag: string
  continent: string
  category: string
  cuisine: string
  tagline: string
  story: string
  image: string
  imageAlt: string
  galleryImages: string[]
  calories: number
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
  difficulty: Difficulty
  spiceLevel: SpiceLevel
  allergens: string[]
  tags: string[]
  history: string
  significance: string
  ingredients: Ingredient[]
  recipe: RecipeStep[]
  nutrition: Nutrition
  chefNotes: string[]
  tradition: string
  funFacts: string[]
  variations: Variation[]
  related: string[]
  timeline: TimelineEntry[]
  festival?: string
}

export interface CultureChapter {
  era: string
  title: string
  text: string
  facts: string[]
  accent: 'fire' | 'spice' | 'sea' | 'field' | 'table'
}

export interface Festival {
  name: string
  country: string
  flag: string
  month: string
  dish: string
  dishId: string
  text: string
}

export interface GalleryItem {
  src: string
  alt: string
  caption: string
  sub: string
  tag: string
  ratio: 'square' | 'portrait' | 'landscape'
  dishId?: string
}
