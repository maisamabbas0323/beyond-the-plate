import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

/**
 * The mark: a steaming plate — a single bowl and two rising wisps,
 * drawn to read clearly at icon size.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e9cf84" />
          <stop offset="55%" stopColor="#d9b557" />
          <stop offset="100%" stopColor="#9c7a22" />
        </linearGradient>
      </defs>

      <path
        d="M13 10c1 3.2 3.6 4.6 7 4.6s6-1.4 7-4.6"
        stroke="url(#logo-gold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11.5 13.4h17a10.4 10.4 0 0 1-8.5 9.6"
        stroke="url(#logo-gold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20.6 23a10.4 10.4 0 0 1-9.9-4.4"
        stroke="url(#logo-gold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 24.5a11.8 11.8 0 0 0 18 0l1.2 2.2a8.4 8.4 0 0 1-14.4 0l-4.8-2.2Z"
        fill="url(#logo-gold)"
      />
      <path
        d="M13.5 17.5c2 1.4 4.3 1.4 6.4 0"
        stroke="url(#logo-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
