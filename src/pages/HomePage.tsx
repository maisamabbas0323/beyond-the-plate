import { Page } from '@/components/ui/Page'
import { Hero } from './home/Hero'
import { Stats } from './home/Stats'
import { FeaturedDishes } from './home/FeaturedDishes'
import { CultureTeaser } from './home/CultureTeaser'
import { NutritionTeaser } from './home/NutritionTeaser'
import { ClosingCta } from './home/ClosingCta'

export function HomePage() {
  return (
    <Page>
      <Hero />
      <div id="after-hero">
        <Stats />
        <FeaturedDishes />
        <CultureTeaser />
        <NutritionTeaser />
        <ClosingCta />
      </div>
    </Page>
  )
}
