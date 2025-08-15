import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageSquare, Calendar, CheckCircle, Mail, Linkedin, Phone } from 'lucide-react'

type Step = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const DEFAULT_STEPS: Step[] = [
  {
    id: 'discover',
    title: 'Discover',
    description: 'AI researches accounts and surfaces buying signals from the web and CRM.',
    icon: <Search className="w-5 h-5 monoline-icon" />,
  },
  {
    id: 'engage',
    title: 'Engage',
    description: 'Channel‑aware sequences send human‑quality messages with brand guardrails.',
    icon: <MessageSquare className="w-5 h-5 monoline-icon" />,
  },
  {
    id: 'book',
    title: 'Book',
    description: 'Positive replies trigger auto‑booking, holds, and CRM sync—no manual steps.',
    icon: <Calendar className="w-5 h-5 monoline-icon" />,
  },
]

interface ScrollyStepsProps {
  steps?: Step[]
}

const ScrollySteps: React.FC<ScrollyStepsProps> = ({ steps = DEFAULT_STEPS }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Set initial state
    setActiveIndex(0)

    const cards = Array.from(container.querySelectorAll('[data-step-card="true"]'))
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = (entry.target as HTMLElement).dataset.index
          if (!idxAttr) return
          const idx = parseInt(idxAttr, 10)
          
          // More reliable intersection detection
          if (entry.isIntersecting) {
            if (entry.intersectionRatio > 0.3 || entry.boundingClientRect.top < window.innerHeight * 0.5) {
              setActiveIndex(idx)
            }
          }
        })
      },
      { 
        root: null, 
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '-10% 0px -20% 0px'
      }
    )

    // Ensure observer starts working immediately
    setTimeout(() => {
      cards.forEach((el) => observer.observe(el))
    }, 100)
    
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-28 bg-gradient-to-b from-dark-900 to-dark scroll-fade relative" aria-labelledby="scrolly-steps-heading">
      {/* background accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-56 h-56 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start" ref={containerRef}>
          {/* Sticky narrative */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-6">
              <h2 id="scrolly-steps-heading" className="text-4xl md:text-5xl font-geist font-bold tracking-tight gradient-text [text-wrap:balance]">
                Your sales motion in 3 steps
              </h2>
              <p className="text-gray-300 mt-3 text-lg">
                A lightweight story as you scroll. Clear, fast, and focused.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  className={`flex items-start gap-3 rounded-xl border p-4 transition-all duration-300 ${
                    i === activeIndex ? 'border-primary-400 bg-primary-400/5' : 'border-dark-700 bg-dark-800/40'
                  }`}
                  animate={{ y: i === activeIndex ? -2 : 0 }}
                >
                  <div className="mt-0.5 text-primary-300">{step.icon}</div>
                  <div>
                    <div className="text-white font-medium">{step.title}</div>
                    <div className="text-sm text-gray-400 leading-relaxed">{step.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cards that drive the scrollytelling */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.article
                key={`card-${step.id}`}
                data-step-card="true"
                data-index={i}
                className="rounded-2xl overflow-hidden border border-dark-700/50 bg-dark-800/60 hover:bg-dark-800 transition-colors product-mockup glass-accent"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="p-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-dark-900/60 border border-dark-700 px-3 py-1 text-xs text-gray-300 mb-3">
                    <span className="text-primary-300">{i + 1}</span>
                    <span className="text-gray-400">{step.title}</span>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />
                <div className="p-5">
                  {/* Lightweight illustrative blocks per step */}
                  {i === 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {["ICP fit", "Signals", "Brief"].map((chip, idx) => (
                        <div key={idx} className="rounded-lg bg-dark-900/60 border border-dark-700 p-3 text-center text-xs text-gray-300 hover:border-primary-400/40 transition-colors">
                          {chip}
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Email', icon: <Mail className="w-4 h-4 monoline-icon" /> },
                        { label: 'LinkedIn', icon: <Linkedin className="w-4 h-4 monoline-icon" /> },
                        { label: 'SMS', icon: <MessageSquare className="w-4 h-4 monoline-icon" /> },
                        { label: 'Voice', icon: <Phone className="w-4 h-4 monoline-icon" /> },
                      ].map((chip, idx) => (
                        <div key={idx} className="rounded-lg bg-dark-900/60 border border-dark-700 p-3 text-sm text-gray-300 hover:border-primary-400/40 transition-colors flex items-center justify-center gap-2">
                          {chip.icon}
                          {chip.label}
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 2 && (
                    <div className="grid grid-cols-3 gap-3">
                      {["Hold", "Invite", "CRM"].map((chip, idx) => (
                        <div key={idx} className="rounded-lg bg-dark-900/60 border border-dark-700 p-3 text-sm text-gray-300 hover:border-primary-400/40 transition-colors flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {chip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollySteps


