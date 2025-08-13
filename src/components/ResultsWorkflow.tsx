import React from 'react'
import { motion } from 'framer-motion'
import { Search, Send, CalendarCheck } from 'lucide-react'

type Metric = {
  label: string
  value: string
  helper?: string
}

interface ResultsWorkflowProps {
  metrics?: Metric[]
  className?: string
}

const DEFAULT_METRICS: Metric[] = [
  { label: 'More replies', value: '+8–20%', helper: 'Typical 30‑day range' },
  { label: 'Research time saved', value: '~2–4 min', helper: 'Per lead on average' },
  { label: 'Cleaner CRM', value: 'Fewer manual steps', helper: 'Logging + sync automated' },
]

const ResultsWorkflow: React.FC<ResultsWorkflowProps> = ({ metrics = DEFAULT_METRICS, className }) => {
  return (
    <div className={`w-full h-full bg-dark-900/50 ${className || ''}`} aria-hidden>
      <svg viewBox="0 0 1200 520" className="w-full h-full">
        <defs>
          <linearGradient id="rw-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F7B733" />
            <stop offset="100%" stopColor="#FC4A1A" />
          </linearGradient>
          <linearGradient id="rw-node" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7B733" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FC4A1A" stopOpacity="0.6" />
          </linearGradient>
          <filter id="rw-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#FC4A1A" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* background grid glow */}
        <rect x="0" y="0" width="1200" height="520" fill="#0A0B0D" opacity="0.25" />

        {/* path */}
        <motion.path
          d="M120 180 C 320 80, 480 80, 680 180 S 980 300, 1080 240"
          stroke="url(#rw-line)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.8 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4 }}
          filter="url(#rw-shadow)"
        />

        {/* moving particle */}
        <motion.circle r="8" fill="url(#rw-line)" filter="url(#rw-shadow)"
          initial={{ cx: 120, cy: 180 }}
          animate={{ cx: [120, 680, 1080], cy: [180, 180, 240] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* nodes */}
        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <rect x="80" y="140" rx="16" ry="16" width="160" height="80" fill="#121317" stroke="url(#rw-node)" />
          <foreignObject x="80" y="140" width="160" height="80">
            <div className="w-full h-full flex items-center justify-center gap-2 text-gray-200 text-sm">
              <Search className="w-4 h-4" /> Discover
            </div>
          </foreignObject>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <rect x="620" y="140" rx="16" ry="16" width="160" height="80" fill="#121317" stroke="url(#rw-node)" />
          <foreignObject x="620" y="140" width="160" height="80">
            <div className="w-full h-full flex items-center justify-center gap-2 text-gray-200 text-sm">
              <Send className="w-4 h-4" /> Engage
            </div>
          </foreignObject>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <rect x="1040" y="200" rx="16" ry="16" width="160" height="80" fill="#121317" stroke="url(#rw-node)" />
          <foreignObject x="1040" y="200" width="160" height="80">
            <div className="w-full h-full flex items-center justify-center gap-2 text-gray-200 text-sm">
              <CalendarCheck className="w-4 h-4" /> Book
            </div>
          </foreignObject>
        </motion.g>

        {/* metric callouts */}
        <foreignObject x="120" y="260" width="260" height="120">
          <div className="rounded-xl border border-dark-700 bg-dark-900/60 p-3">
            <div className="text-xs text-gray-400">{metrics[0]?.label}</div>
            <div className="text-2xl font-semibold text-white">{metrics[0]?.value}</div>
            <div className="text-[11px] text-gray-500">{metrics[0]?.helper}</div>
          </div>
        </foreignObject>

        <foreignObject x="620" y="260" width="260" height="120">
          <div className="rounded-xl border border-dark-700 bg-dark-900/60 p-3">
            <div className="text-xs text-gray-400">{metrics[1]?.label}</div>
            <div className="text-2xl font-semibold text-white">{metrics[1]?.value}</div>
            <div className="text-[11px] text-gray-500">{metrics[1]?.helper}</div>
          </div>
        </foreignObject>

        <foreignObject x="1020" y="320" width="260" height="120">
          <div className="rounded-xl border border-dark-700 bg-dark-900/60 p-3">
            <div className="text-xs text-gray-400">{metrics[2]?.label}</div>
            <div className="text-2xl font-semibold text-white">{metrics[2]?.value}</div>
            <div className="text-[11px] text-gray-500">{metrics[2]?.helper}</div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

export default ResultsWorkflow


