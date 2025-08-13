import React from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalIcon, CheckCircle, Database } from 'lucide-react'

interface BookingIllustrationProps {
  className?: string
}

const BookingIllustration: React.FC<BookingIllustrationProps> = ({ className }) => {
  const squares = Array.from({ length: 18 })

  return (
    <div className={`w-full h-full bg-dark-900/50 ${className || ''}`} aria-hidden>
      <div className="relative w-full h-full p-4 sm:p-6">
        {/* Glow accents */}
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary-400/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full" />

        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Calendar panel */}
          <motion.div 
            className="col-span-7 md:col-span-8 bg-dark-800/70 border border-dark-700/50 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700/50 bg-dark-900/50">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <CalIcon className="w-4 h-4 monoline-icon text-primary-300" />
                Calendar
              </div>
              <div className="text-xs text-gray-500">Demo scheduling</div>
            </div>

            <div className="p-4 grid grid-cols-6 gap-3">
              {squares.map((_, i) => {
                const isAvailable = [2, 3, 7, 8, 12, 13, 16].includes(i)
                const isSelected = i === 8
                return (
                  <motion.div
                    key={i}
                    className={`h-10 rounded-md border text-center text-[10px] flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-primary-400 bg-primary-400/20 text-primary-200'
                        : isAvailable
                          ? 'border-dark-700 bg-dark-900/40 text-gray-400 hover:border-primary-400/40'
                          : 'border-dark-800 bg-dark-900/30 text-dark-500'
                    }`}
                    whileHover={isAvailable ? { scale: 1.05 } : {}}
                  >
                    {i + 1}
                  </motion.div>
                )
              })}
            </div>

            {/* Confirmation card */}
            <motion.div 
              className="mx-4 mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-300">Meeting confirmed — Thu 2:00 PM</span>
            </motion.div>
          </motion.div>

          {/* CRM panel */}
          <motion.div 
            className="col-span-5 md:col-span-4 bg-dark-800/70 border border-dark-700/50 rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700/50 bg-dark-900/50">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Database className="w-4 h-4 monoline-icon text-primary-300" />
                CRM Sync
              </div>
              <div className="text-xs text-gray-500">Salesforce</div>
            </div>

            <div className="p-4 space-y-3">
              {[ 
                { label: 'Contact created', ok: true },
                { label: 'Activity logged', ok: true },
                { label: 'Deal stage → Discovery', ok: true },
              ].map((row, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between rounded-md border border-dark-700/50 bg-dark-900/40 px-3 py-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + idx * 0.1 }}
                >
                  <span className="text-sm text-gray-300">{row.label}</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BookingIllustration


