import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Maximize2 } from 'lucide-react'
import { galleryItems } from '@/data/gallery'
import type { GalleryItem } from '@/data/types'
import { Page } from '@/components/ui/Page'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Lightbox } from '@/components/ui/Lightbox'
import { cn } from '@/lib/utils'

const RATIO_CLASS: Record<GalleryItem['ratio'], string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

function FrameCaption({ item }: { item: GalleryItem }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 via-ink-950/35 to-transparent px-5 pb-4 pt-14">
        <p className="font-display text-lg font-light text-cream-50">{item.caption}</p>
        <p className="mt-0.5 text-xs text-cream-300">{item.sub}</p>
      </div>
      {item.dishId ? (
        <span className="pointer-events-none absolute right-4 top-4 inline-flex translate-y-0 items-center gap-1 rounded-full border border-white/15 bg-ink-950/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-300 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          Read the story <ArrowUpRight size={12} />
        </span>
      ) : (
        <span className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-950/45 text-gold-300 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 size={15} />
        </span>
      )}
    </>
  )
}

export function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')

  const tags = useMemo(() => ['All', ...new Set(galleryItems.map((item) => item.tag))], [])
  const items = filter === 'All' ? galleryItems : galleryItems.filter((item) => item.tag === filter)
  const lightboxItems = items.filter((item) => !item.dishId)

  const openLightbox = (item: GalleryItem) => {
    const index = lightboxItems.indexOf(item)
    setActiveIndex(index)
  }

  return (
    <Page className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Gallery"
          title="Frames from the table"
          description="Dishes we photographed along the way, plus scenes from the kitchens and tables that fed this collection. Click a dish to read its story; click a scene to step inside."
        />

        <Reveal delay={2}>
          <div
            className="-mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
            role="group"
            aria-label="Filter gallery"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                aria-pressed={filter === tag}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300',
                  filter === tag
                    ? 'border-gold-500/50 bg-gold-500/15 text-gold-200'
                    : 'border-white/10 bg-white/[0.02] text-cream-400 hover:border-white/25',
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <motion.figure
              key={`${item.src}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn('group relative mb-5 overflow-hidden rounded-3xl', item.dishId ? 'cursor-pointer' : 'cursor-zoom-in')}
            >
              {item.dishId ? (
                <Link
                  to={`/discover/${item.dishId}`}
                  aria-label={`Open the story of ${item.caption}`}
                  className={cn('block w-full', RATIO_CLASS[item.ratio])}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openLightbox(item)}
                  aria-label={`Open ${item.caption}`}
                  className={cn('block w-full', RATIO_CLASS[item.ratio])}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                </button>
              )}

              <FrameCaption item={item} />
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <Lightbox
        items={lightboxItems}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </Page>
  )
}
