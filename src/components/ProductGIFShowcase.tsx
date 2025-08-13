import React from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import LazyImage from './LazyImage'

type ProductMedia = {
  id: string
  title: string
  caption: string
  mediaSrc?: string
  alt?: string
  media?: React.ReactNode
}

interface ProductGIFShowcaseProps {
  items?: ProductMedia[]
}

const DEFAULT_ITEMS: ProductMedia[] = [
  {
    id: 'research-loop',
    title: 'Prospect research loop',
    caption: 'Enai analyzes profiles, sites, and signals to prep outreach in seconds.',
    mediaSrc: '/enai-product-image.jpg',
    alt: 'Prospect research visualization'
  },
  {
    id: 'orchestrate',
    title: 'Channel-aware sequences',
    caption: 'Email, LinkedIn, and voice—coordinated with your brand guardrails.',
    mediaSrc: '/enai-dashboard.png',
    alt: 'Sequence orchestration visualization'
  },
  {
    id: 'book-sync',
    title: 'Auto book & sync',
    caption: 'Calendar holds, confirmations, and CRM updates—handled for you.',
    mediaSrc: '/enai-og-image.jpg',
    alt: 'Booking and CRM sync visualization'
  }
]

function isVideo(src: string) {
  return /(\.mp4|\.webm)$/i.test(src)
}

const ProductGIFShowcase: React.FC<ProductGIFShowcaseProps> = ({ items = DEFAULT_ITEMS }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-dark to-dark-900 relative" aria-labelledby="product-gif-heading">
      {/* Decorative brand glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[26rem] h-[26rem] bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center mb-5">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-dark-800/60 border border-primary-400/20 text-primary-300">
              <Sparkles className="w-3.5 h-3.5 mr-1 monoline-icon" />
              Visual storytelling
            </span>
          </div>
          <h2 id="product-gif-heading" className="text-4xl md:text-5xl font-geist font-bold tracking-tight gradient-text">
            See the product in motion
          </h2>
          <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            Short loops that show how Enai works—no filler, just the important beats.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              className="relative rounded-2xl overflow-hidden border border-dark-700/50 bg-dark-800/60 hover:bg-dark-800 transition-colors product-mockup hover-lift glass-accent"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="relative aspect-video">
                {item.media ? (
                  <div className="w-full h-full">{item.media}</div>
                ) : item.mediaSrc && isVideo(item.mediaSrc) ? (
                  <video
                    className="w-full h-full object-cover"
                    src={item.mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={item.alt}
                  />
                ) : (
                  <LazyImage
                    src={item.mediaSrc || ''}
                    alt={item.alt || item.title}
                    className="w-full h-full"
                    blur
                    loadingPriority="lazy"
                  />
                )}

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Motion affordance */}
                <div className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur px-2.5 py-1 text-[11px] text-white border border-white/10">
                  <Play className="w-3.5 h-3.5 monoline-icon" />
                  Loop
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-white font-medium text-base tracking-tight">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{item.caption}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGIFShowcase


