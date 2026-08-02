import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { RouteFallback } from '@/components/ui/RouteFallback'
import { HomePage } from '@/pages/HomePage'
import { DiscoverPage } from '@/pages/DiscoverPage'

const DishDetailPage = lazy(() => import('@/pages/DishDetailPage').then((m) => ({ default: m.DishDetailPage })))
const CulturePage = lazy(() => import('@/pages/CulturePage').then((m) => ({ default: m.CulturePage })))
const NutritionPage = lazy(() => import('@/pages/NutritionPage').then((m) => ({ default: m.NutritionPage })))
const RecipesPage = lazy(() => import('@/pages/RecipesPage').then((m) => ({ default: m.RecipesPage })))
const GalleryPage = lazy(() => import('@/pages/GalleryPage').then((m) => ({ default: m.GalleryPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/discover/:id" element={<DishDetailPage />} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AnimatedRoutes />
      </AppShell>
    </BrowserRouter>
  )
}
