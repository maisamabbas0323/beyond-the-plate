import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { GalleryItem } from '@/data/types'
import { useEscape, useScrollLock } from '@/hooks/useMedia'

interface LightboxProps {
  items: GalleryItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  useScrollLock(open)
  useEscape(onClose, open)

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNavigate((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      restoreRef.current?.focus()
    }
  }, [open, index, items.length, onNavigate])

  const current = open ? items[index] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink-950/95 p-4 backdrop-blur-xl sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream-100 transition-all duration-300 hover:scale-105 hover:border-gold-500/40 hover:text-gold-200"
          >
            <X size={18} />
          </button>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-6 z-10 rounded-full border border-white/10 bg-ink-950/60 px-3.5 py-1.5 text-xs tabular-nums text-cream-300 backdrop-blur-md"
          >
            {index + 1} <span className="text-cream-500">/</span> {items.length}
          </span>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onNavigate((index - 1 + items.length) % items.length)
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream-100 transition-all duration-300 hover:scale-105 hover:border-gold-500/40 hover:text-gold-200 sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onNavigate((index + 1) % items.length)
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cream-100 transition-all duration-300 hover:scale-105 hover:border-gold-500/40 hover:text-gold-200 sm:right-6"
          >
            <ChevronRight size={20} />
          </button>

          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-full flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[78vh] overflow-hidden rounded-2xl shadow-lift">
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[78vh] max-w-full object-contain"
              />
            </div>
            <figcaption className="mt-5 text-center">
              <span className="font-display text-lg font-light text-cream-50">{current.caption}</span>
              <span className="mt-1 block text-xs text-cream-500">{current.sub}</span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
