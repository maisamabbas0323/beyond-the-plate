import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '@/data/site'
import { cn } from '@/lib/utils'

function isActivePath(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to)
}

export function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-3 z-[60] px-3 lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-reflect glass-strong mx-auto flex max-w-md items-center justify-between rounded-[26px] px-2 py-2 shadow-lift"
      >
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = isActivePath(pathname, to)
          return (
            <NavLink
              key={to}
              to={to}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-colors',
                active ? 'text-gold-300' : 'text-cream-400',
              )}
            >
              {active && (
                <motion.span
                  layoutId="bottomnav-active"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold-500/5"
                />
              )}
              <Icon
                size={21}
                strokeWidth={active ? 2 : 1.75}
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              />
              {active && (
                <motion.span
                  layoutId="bottomnav-dot"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute bottom-0.5 h-1 w-1 rounded-full bg-gold-400"
                  aria-hidden="true"
                />
              )}
            </NavLink>
          )
        })}
      </motion.div>
    </nav>
  )
}
