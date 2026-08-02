import { motion, useMotionValue, useSpring } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { navItems } from '@/data/site'
import { Tooltip } from '@/components/ui/Tooltip'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

function isActivePath(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  return pathname.startsWith(to)
}

/**
 * Floating glass rail pinned to the left edge with generous breathing room.
 * Icon-only by design — every icon carries an accessible tooltip, the active
 * item glows behind a shared layout motion pill, and a soft light follows
 * the cursor down the rail.
 */
export function Sidebar() {
  const { pathname } = useLocation()
  const railRef = useRef<HTMLDivElement>(null)
  const glowX = useMotionValue(-100)
  const glowY = useMotionValue(-100)
  const glowOpacity = useMotionValue(0)
  const gx = useSpring(glowX, { stiffness: 260, damping: 28, mass: 0.5 })
  const gy = useSpring(glowY, { stiffness: 260, damping: 28, mass: 0.5 })

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!railRef.current) return
    const rect = railRef.current.getBoundingClientRect()
    glowX.set(event.clientX - rect.left)
    glowY.set(event.clientY - rect.top)
    glowOpacity.set(1)
  }

  function handleLeave() {
    glowOpacity.set(0)
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed left-4 top-1/2 z-[60] hidden -translate-y-1/2 lg:block xl:left-6"
    >
      <motion.div
        ref={railRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-reflect glass-strong relative flex flex-col items-center gap-1 rounded-[30px] px-3 py-4 shadow-lift"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[30px]">
          <motion.span
            style={{ left: gx, top: gy, opacity: glowOpacity }}
            className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,181,87,0.16),transparent_65%)]"
          />
        </div>

        <Tooltip title="Beyond the Plate" description="Food, culture and tradition" side="right">
          <NavLink
            to="/"
            aria-label="Beyond The Plate — home"
            className="group relative z-10 mb-1 flex h-10 w-10 items-center justify-center rounded-full p-1.5 transition-transform duration-300 hover:scale-110"
          >
            <Logo className="drop-shadow-[0_0_10px_rgba(217,181,87,0.35)] transition-transform duration-500 group-hover:rotate-[8deg]" />
          </NavLink>
        </Tooltip>

        <span
          aria-hidden="true"
          className="relative z-10 my-1 h-px w-8 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />

        {navItems.map(({ to, label, icon: Icon, hint, desc }) => {
          const active = isActivePath(pathname, to)
          return (
            <Tooltip key={to} title={hint} description={desc} side="right">
              <NavLink
                to={to}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition-colors duration-300',
                  active ? 'text-gold-300' : 'text-cream-400 hover:text-cream-100',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="sidebar-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-2xl border border-gold-500/35 bg-gradient-to-br from-gold-500/15 to-gold-500/5 shadow-[0_0_28px_-6px_rgba(201,154,46,0.55)]"
                  />
                )}
                <Icon
                  size={21}
                  strokeWidth={active ? 2 : 1.75}
                  className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                />
              </NavLink>
            </Tooltip>
          )
        })}
      </motion.div>
    </nav>
  )
}
