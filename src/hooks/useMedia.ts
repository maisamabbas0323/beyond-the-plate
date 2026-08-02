import { useCallback, useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    setMatches(media.matches)
    return () => media.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function useIsMobile(breakpoint = '(max-width: 768px)') {
  return useMediaQuery(breakpoint)
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

export function useEscape(callback: () => void, active = true) {
  const onKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') callback()
    },
    [callback],
  )

  useEffect(() => {
    if (!active) return
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey, active])
}
