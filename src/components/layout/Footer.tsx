import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { navItems } from '@/data/site'

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 pb-32 pt-16 lg:pb-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-3xl font-light tracking-tight text-cream-gradient">
              Beyond the Plate
            </p>
            <p className="mt-2 text-sm italic text-cream-400">Explore food, culture, and tradition.</p>
            <p className="mt-6 text-sm leading-relaxed text-cream-500">
              A digital field kitchen documenting the stories simmering behind the world&rsquo;s most
              beloved dishes — one bowl at a time.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="group inline-flex items-center gap-1 text-sm text-cream-400 transition-colors hover:text-gold-300"
              >
                {label}
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 text-xs text-cream-500 sm:flex-row sm:items-center">
          <p>© 2026 Beyond The Plate. Cooked with patience, served with context.</p>
          <p className="inline-flex items-center gap-2">
            <span className="text-gold-400">✦</span> A field guide to the world&rsquo;s table
          </p>
        </div>
      </div>
    </footer>
  )
}
