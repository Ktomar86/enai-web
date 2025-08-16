import React from 'react'
import { motion } from 'framer-motion'
import { Search, MessageSquare, Calendar, TrendingUp, Users, Zap } from 'lucide-react'

const ValueProposition: React.FC = () => {
  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "AI-Powered Discovery",
      description: "Intelligent prospect research and signal detection across web and CRM data"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Multi-Channel Outreach",
      description: "Personalized sequences across email, LinkedIn, SMS, and voice"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Automated Booking",
      description: "Seamless meeting scheduling with automatic CRM synchronization"
    }
  ]

  const stats = [
    { value: "3x", label: "Pipeline Growth" },
    { value: "85%", label: "Time Saved" },
    { value: "40%", label: "Higher Response Rate" }
  ]

  return (
    <section className="py-28 bg-gradient-to-b from-dark-900 to-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-amber-400/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-geist font-bold tracking-tight gradient-text mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Sales Process
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto [text-wrap:balance]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From manual prospecting to automated pipeline generation. 
            Our AI handles the heavy lifting so you can focus on closing deals.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative bg-dark-800/60 border border-dark-700/50 rounded-2xl p-8 h-full hover:border-primary-400/30 transition-all duration-300 hover:bg-dark-800/80">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary-400/10 border border-primary-400/20 flex items-center justify-center text-primary-300 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition