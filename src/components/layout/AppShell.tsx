import { ReactLenis } from 'lenis/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { cn } from '@/lib/utils'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <ReactLenis root options={{ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <ScrollProgress />
      <Sidebar />
      <BottomNav />
      <div id="main-content" className={cn('relative', className)}>
        {children}
      </div>
      <Footer />
    </ReactLenis>
  )
}
