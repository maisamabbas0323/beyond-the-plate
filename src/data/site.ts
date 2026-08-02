import type { LucideIcon } from 'lucide-react'
import { Home, Compass, Landmark, Apple, ChefHat, Images, Info } from 'lucide-react'
import { ALL_DISHES, countriesOf } from './dishes'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  hint: string
  desc: string
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home, hint: 'Home', desc: 'Where the journey begins' },
  { to: '/discover', label: 'Discover', icon: Compass, hint: 'Discover', desc: 'A living table, rebuilt every visit' },
  { to: '/culture', label: 'Culture', icon: Landmark, hint: 'Culture', desc: 'History, festivals and tradition' },
  { to: '/nutrition', label: 'Nutrition', icon: Apple, hint: 'Nutrition', desc: 'Every plate, decoded' },
  { to: '/recipes', label: 'Recipes', icon: ChefHat, hint: 'Recipes', desc: 'Cook step by step with us' },
  { to: '/gallery', label: 'Gallery', icon: Images, hint: 'Gallery', desc: 'Frames from the table' },
  { to: '/about', label: 'About', icon: Info, hint: 'About', desc: 'Our story and philosophy' },
]

export const stats = [
  { value: ALL_DISHES.length, suffix: '', label: 'Documented dishes' },
  { value: countriesOf(ALL_DISHES).length, suffix: '', label: 'Countries visited' },
  { value: 30, suffix: '+', label: 'Ingredients per mole' },
  { value: Math.max(...ALL_DISHES.map((dish) => dish.totalTime)), suffix: ' min', label: 'Longest cook' },
]

export const philosophy = [
  {
    title: 'Taste is memory',
    text: 'Every recipe we document is a keepsake — a family, a region, a season sealed in flavour. We cook to remember.',
  },
  {
    title: 'Respect the origin',
    text: 'We trace each dish to its place, its people and its moment. Culture is the ingredient that can never be substituted.',
  },
  {
    title: 'Simplicity is mastery',
    text: 'The best cooking is disciplined reduction — three ingredients, one flame, infinite patience.',
  },
]

export const inside = [
  { value: String(ALL_DISHES.length), label: 'dishes fully documented — history, recipe, nutrition, ceremony' },
  { value: String(countriesOf(ALL_DISHES).length), label: 'countries visited, across six continents' },
  { value: '7', label: 'world festivals where the food is the calendar' },
  { value: '1', label: 'rule only — every story is told with respect' },
]
