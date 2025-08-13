import React from 'react'
import { motion } from 'framer-motion'

interface WorkflowIllustrationProps {
  className?: string
}

const WorkflowIllustration: React.FC<WorkflowIllustrationProps> = ({ className }) => {
  return (
    <div className={`w-full h-full bg-dark-900/60 ${className || ''}`} aria-hidden>
      <svg viewBox="0 0 600 338" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F7B733" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FC4A1A" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7B733" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FC4A1A" stopOpacity="0.6" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#F7B733" floodOpacity="0.15" />
          </filter>
        </defs>

        <rect x="0" y="0" width="600" height="338" fill="#0A0B0D" opacity="0.2" />

        {/* connectors */}
        <motion.path
          d="M110 90 L290 90 L290 170 L470 170"
          stroke="url(#g1)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          filter="url(#shadow)"
        />

        {/* nodes */}
        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <rect x="60" y="60" rx="14" ry="14" width="120" height="60" fill="#121317" stroke="url(#g2)" />
          <text x="120" y="95" textAnchor="middle" fontSize="13" fill="#e5e7eb">Discover</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <rect x="240" y="140" rx="14" ry="14" width="120" height="60" fill="#121317" stroke="url(#g2)" />
          <text x="300" y="175" textAnchor="middle" fontSize="13" fill="#e5e7eb">Engage</text>
        </motion.g>

        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <rect x="420" y="140" rx="14" ry="14" width="120" height="60" fill="#121317" stroke="url(#g2)" />
          <text x="480" y="175" textAnchor="middle" fontSize="13" fill="#e5e7eb">Book</text>
        </motion.g>

        {/* pulsing dots along path */}
        <motion.circle r="5" fill="url(#g1)" filter="url(#shadow)"
          initial={{ cx: 110, cy: 90 }}
          animate={{ cx: [110, 290, 290, 470], cy: [90, 90, 170, 170] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}

export default WorkflowIllustration


