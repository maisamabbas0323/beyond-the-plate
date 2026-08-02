import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface SteamProps {
  className?: string
  intensity?: number
}

const WISPS = [
  { left: '18%', delay: 0, duration: 4.2, drift: 26 },
  { left: '42%', delay: 1.1, duration: 5.0, drift: -30 },
  { left: '66%', delay: 0.5, duration: 4.6, drift: 20 },
  { left: '86%', delay: 1.7, duration: 5.4, drift: -22 },
]

/**
 * Rising steam wisps, choreographed with GSAP. An ambient layer that makes a
 * static dish image feel alive — worth the dependency for a single effect.
 */
export function Steam({ className, intensity = 1 }: SteamProps) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = root.current
    if (!container) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const wisps = container.querySelectorAll('[data-wisp]')
    const ctx = gsap.context(() => {
      wisps.forEach((wisp, index) => {
        const config = WISPS[index % WISPS.length]
        gsap.fromTo(
          wisp,
          { yPercent: 14, opacity: 0, scale: 0.7 },
          {
            yPercent: -130,
            opacity: 0.55,
            scale: 1.1,
            duration: config.duration * (1 / intensity),
            delay: config.delay,
            repeat: -1,
            repeatDelay: 0.6,
            ease: 'none',
          },
        )
        gsap.to(wisp, {
          x: config.drift,
          duration: config.duration / 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        })
      })
    }, container)

    return () => ctx.revert()
  }, [intensity])

  return (
    <div ref={root} className={className} aria-hidden="true">
      {WISPS.map((wisp, index) => (
        <span
          key={index}
          data-wisp
          className="absolute h-14 w-4 rounded-full"
          style={{
            left: wisp.left,
            bottom: '12%',
            background:
              'radial-gradient(closest-side, rgba(245,239,225,0.5), rgba(245,239,225,0.12) 60%, transparent)',
            filter: 'blur(6px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
