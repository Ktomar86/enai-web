import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Users,
  Settings,
  LineChart,
  Workflow,
  Bot,
  ChevronRight,
  ChevronsRight,
  BellRing
} from 'lucide-react';

// Feature data array with animations and details
const features = [
  {
    id: 'prospecting',
    icon: <Search className="w-6 h-6" />,
    title: 'AI-Powered Prospecting',
    description: 'Identify and prioritize high-value accounts with data-driven insights tailored to your business goals',
    benefits: ['Multi-source data enrichment', 'Adaptive targeting algorithms', 'Real-time intent signal tracking'],
    color: 'from-blue-400 to-indigo-500',
    textColor: 'text-blue-400',
    bgColor: 'bg-blue-400',
    animationColor: 'blue',
    flowSteps: ['Data Collection', 'Analysis', 'Scoring', 'Distribution']
  },
  {
    id: 'multichannel',
    icon: <Bot className="w-6 h-6" />,
    title: 'Intelligent Outreach',
    description: 'Create personalized, multi-channel communication sequences that resonate with your target audience',
    benefits: ['Role-based message personalization', 'Smart response handling', 'Cross-channel campaign coordination'],
    color: 'from-purple-400 to-indigo-500',
    textColor: 'text-purple-400',
    bgColor: 'bg-purple-400',
    animationColor: 'purple',
    flowSteps: ['Template Design', 'Personalization', 'Delivery', 'Analysis']
  },
  {
    id: 'analytics',
    icon: <LineChart className="w-6 h-6" />,
    title: 'Predictive Analytics',
    description: 'Make data-driven decisions with AI-powered insights that optimize your sales strategy and timing',
    benefits: ['Revenue forecasting', 'Pipeline opportunity analysis', 'Conversion optimization'],
    color: 'from-emerald-400 to-teal-500',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-400',
    animationColor: 'emerald',
    flowSteps: ['Data Integration', 'Pattern Recognition', 'Prediction', 'Recommendation']
  },
  {
    id: 'workflows',
    icon: <Workflow className="w-6 h-6" />,
    title: 'Sales Process Automation',
    description: 'Eliminate repetitive tasks and streamline your sales process with customizable, intelligent workflows',
    benefits: ['No-code workflow builder', 'Time-saving automation rules', 'Consistent process execution'],
    color: 'from-red-400 to-rose-500',
    textColor: 'text-red-400',
    bgColor: 'bg-red-400',
    animationColor: 'red',
    flowSteps: ['Process Mapping', 'Automation Rules', 'Integration', 'Execution']
  },
  {
    id: 'engagement',
    icon: <Users className="w-6 h-6" />,
    title: 'Stakeholder Engagement',
    description: 'Build relationships with the right decision-makers through targeted, value-driven communication',
    benefits: ['Key contact identification', 'Relationship strength tracking', 'Engagement sequence automation'],
    color: 'from-amber-400 to-yellow-500',
    textColor: 'text-amber-400',
    bgColor: 'bg-amber-400',
    animationColor: 'amber',
    flowSteps: ['Contact Mapping', 'Engagement Planning', 'Value Delivery', 'Relationship Nurturing']
  },
  {
    id: 'integrations',
    icon: <Settings className="w-6 h-6" />,
    title: 'Seamless Integrations',
    description: 'Integrate with your existing tools to create a unified, efficient sales technology ecosystem',
    benefits: ['Two-way data synchronization', 'Fast implementation with popular CRMs', 'Extensible API platform'],
    color: 'from-cyan-400 to-blue-500',
    textColor: 'text-cyan-400',
    bgColor: 'bg-cyan-400',
    animationColor: 'cyan',
    flowSteps: ['System Mapping', 'Connection Setup', 'Data Flow Configuration', 'Sync Validation']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const lightBlackColor = '#222222'; // Use this color in styles where light black is applied

export default function FeatureHighlights() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  // hoverFeature is used in event handlers for button hover effects
  const [hoverFeature, setHoverFeature] = useState<string | null>(null);
  const [flowLineIndex, setFlowLineIndex] = useState(0);
  
  // Find the currently active feature
  const currentFeature = features.find(feature => feature.id === activeFeature) || features[0];

  // Effect to animate flow lines
  useEffect(() => {
    const timer = setInterval(() => {
      setFlowLineIndex(prev => (prev + 1) % 4);
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);
  
  const EnhancedAnimation = ({ feature }: { feature: typeof features[0] }) => {
    // Positions for workflow nodes
    const nodePositions = [
      { x: 25, y: 30 },
      { x: 75, y: 30 },
      { x: 75, y: 70 },
      { x: 25, y: 70 }
    ];
    
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background gradient and pattern */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 rounded-lg`}
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid pattern for workflow background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Workflow nodes and connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Connection lines between steps */}
          <motion.line 
            x1={nodePositions[0].x} 
            y1={nodePositions[0].y} 
            x2={nodePositions[1].x} 
            y2={nodePositions[1].y}
            stroke={`var(--color-${feature.animationColor}-500)`}
            strokeWidth="1"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: flowLineIndex === 0 ? 0.9 : 0.3
            }}
            transition={{ duration: 1 }}
          />
          
          <motion.line 
            x1={nodePositions[1].x} 
            y1={nodePositions[1].y} 
            x2={nodePositions[2].x} 
            y2={nodePositions[2].y}
            stroke={`var(--color-${feature.animationColor}-500)`}
            strokeWidth="1"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: flowLineIndex === 1 ? 0.9 : 0.3
            }}
            transition={{ duration: 1 }}
          />
          
          <motion.line 
            x1={nodePositions[2].x} 
            y1={nodePositions[2].y} 
            x2={nodePositions[3].x} 
            y2={nodePositions[3].y}
            stroke={`var(--color-${feature.animationColor}-500)`}
            strokeWidth="1"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: flowLineIndex === 2 ? 0.9 : 0.3
            }}
            transition={{ duration: 1 }}
          />
          
          <motion.line 
            x1={nodePositions[3].x} 
            y1={nodePositions[3].y} 
            x2={nodePositions[0].x} 
            y2={nodePositions[0].y}
            stroke={`var(--color-${feature.animationColor}-500)`}
            strokeWidth="1"
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              opacity: flowLineIndex === 3 ? 0.9 : 0.3
            }}
            transition={{ duration: 1 }}
          />
          
          {/* Active flow particle */}
          <motion.circle
            r="1.5"
            fill={`var(--color-${feature.animationColor}-500)`}
            filter="drop-shadow(0 0 2px var(--color-${feature.animationColor}-300))"
            animate={{
              cx: [
                nodePositions[flowLineIndex].x,
                nodePositions[(flowLineIndex + 1) % 4].x
              ],
              cy: [
                nodePositions[flowLineIndex].y,
                nodePositions[(flowLineIndex + 1) % 4].y
              ],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          />
        </svg>
        
        {/* Workflow step nodes */}
        {feature.flowSteps.map((step, i) => (
          <motion.div
            key={`${feature.id}-step-${i}`}
            className={`absolute bg-${lightBlackColor}/90 border text-xs px-2 py-1 text-white rounded-md shadow-lg z-10 ${
              i === flowLineIndex 
                ? `border-${feature.animationColor}-400 shadow-${feature.animationColor}-500/30` 
                : 'border-dark-700'
            }`}
            style={{
              left: `${nodePositions[i].x}%`,
              top: `${nodePositions[i].y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              scale: i === flowLineIndex ? 1.1 : 1,
              backgroundColor: i === flowLineIndex ? `rgba(var(--color-${feature.animationColor}-900-rgb), 0.9)` : `rgba(51, 51, 51, 0.9)`
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              {i === flowLineIndex && (
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`w-1.5 h-1.5 rounded-full ${feature.bgColor} mr-1.5`}
                />
              )}
              {step}
              {i === flowLineIndex && (
                <motion.div 
                  className="ml-1 inline-block"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ChevronRight className={`w-3 h-3 ${feature.textColor}`} />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Center feature icon */}
        <motion.div
          className={`relative z-20 p-5 rounded-full ${feature.bgColor} bg-opacity-20 flex items-center justify-center`}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              `0 0 0px rgba(var(--color-${feature.animationColor}-500-rgb), 0.3)`,
              `0 0 15px rgba(var(--color-${feature.animationColor}-500-rgb), 0.6)`,
              `0 0 0px rgba(var(--color-${feature.animationColor}-500-rgb), 0.3)`
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {React.cloneElement(feature.icon, { className: `w-10 h-10 ${feature.textColor}` })}
          </motion.div>
          
          {/* Orbiting particles */}
          <motion.div 
            className={`absolute w-2 h-2 rounded-full ${feature.bgColor}`}
            animate={{
              x: [0, 15, 0, -15, 0],
              y: [15, 0, -15, 0, 15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div 
            className={`absolute w-1.5 h-1.5 rounded-full ${feature.bgColor}`}
            animate={{
              x: [0, -12, 0, 12, 0],
              y: [-12, 0, 12, 0, -12],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
        
        {/* Pulsing rings */}
        <motion.div
          className={`absolute rounded-full border border-${feature.animationColor}-400/50`}
          style={{ width: '60px', height: '60px' }}
          animate={{
            scale: [1, 1.8],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className={`absolute rounded-full border border-${feature.animationColor}-400/30`}
          style={{ width: '60px', height: '60px' }}
          animate={{
            scale: [1, 2.2],
            opacity: [0.3, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3
          }}
        />
      </div>
    );
  };
  
  return (
    <section className="py-24 bg-${lightBlackColor} overflow-hidden relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <motion.div 
        className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(247, 183, 51, 0.15) 0%, transparent 50%), 
                           radial-gradient(circle at 70% 30%, rgba(252, 74, 26, 0.1) 0%, transparent 50%)`
        }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-6 relative inline-block">
              Sales Acceleration Suite
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary-400/0 via-primary-400 to-primary-400/0"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A complete toolkit to streamline your sales process, increase productivity, and drive revenue growth for businesses of any size
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Feature Navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className={`
                  p-5 rounded-xl cursor-pointer transition-all duration-500 relative overflow-hidden group
                  ${activeFeature === feature.id ? 
                    `bg-gradient-to-br ${feature.color} shadow-lg shadow-${feature.animationColor}-500/40` : 
                    'bg-${lightBlackColor}/90 hover:bg-${lightBlackColor} border border-${lightBlackColor}'
                  }
                `}
                onClick={() => setActiveFeature(feature.id)}
                onMouseEnter={() => setHoverFeature(feature.id)}
                onMouseLeave={() => setHoverFeature(null)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {/* Enhanced glass-like effect for cards */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  animate={activeFeature === feature.id ? { opacity: 0.15 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Subtle animated background pattern */}
                <motion.div 
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, var(--color-${feature.animationColor}-500) 0%, transparent 25%),
                                     radial-gradient(circle at 70% 50%, var(--color-${feature.animationColor}-500) 0%, transparent 25%)`
                  }}
                  animate={activeFeature === feature.id ? 
                    { opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] } : 
                    { opacity: 0.03 }
                  }
                  transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Connection lines with animated particles */}
                {activeFeature === feature.id && (
                  <>
                    <motion.div 
                      className="absolute top-1/2 -right-6 w-6 h-0.5 bg-gradient-to-r from-transparent to-white/50"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: [0, 0.8, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    {/* Animated particle */}
                    <motion.div
                      className={`absolute top-1/2 -right-1 w-1.5 h-1.5 rounded-full bg-${feature.animationColor}-400 shadow-sm shadow-${feature.animationColor}-400`}
                      animate={{ 
                        x: [0, -30, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
                    />
                  </>
                )}
                
                <div className="flex flex-col items-center text-center z-10 relative">
                  <motion.div 
                    className={`
                      w-16 h-16 flex items-center justify-center rounded-full mb-4 relative
                      ${activeFeature === feature.id ? 
                        'bg-white/20' : 
                        `bg-${feature.animationColor}-500/10`
                      }
                    `}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div
                      animate={activeFeature === feature.id ? 
                        { scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] } : 
                        {}
                      }
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      {React.cloneElement(feature.icon, { 
                        className: `w-8 h-8 ${activeFeature === feature.id ? 'text-white' : feature.textColor}` 
                      })}
                    </motion.div>
                    
                    {/* Pulsing rings for active feature */}
                    {activeFeature === feature.id && (
                      <>
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-white/20"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div 
                          className="absolute inset-0 rounded-full border border-white/10"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                        />
                      </>
                    )}
                  </motion.div>
                  
                  <motion.h3 
                    className={`
                      font-semibold text-base mb-1
                      ${activeFeature === feature.id ? 
                        'text-white' : 
                        'text-gray-200'
                      }
                    `}
                    animate={activeFeature === feature.id ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  {/* Enhanced workflow indicator */}
                  {activeFeature === feature.id ? (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 1 }}
                      className={`h-0.5 mt-2 bg-gradient-to-r from-white/50 via-white to-white/50 rounded-full overflow-hidden relative`}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-white/90"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  ) : (
                    <motion.p 
                      className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 5, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                    >
                      Click to explore
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Feature Details */}
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-${lightBlackColor}/80 backdrop-blur-sm rounded-2xl p-8 border border-${lightBlackColor} relative overflow-hidden shadow-xl shadow-${lightBlackColor}/50"
          >
            {/* Advanced background effects */}
            <motion.div 
              className="absolute inset-0 bg-grid-pattern opacity-5"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            {/* Enhanced gradient overlay */}
            <motion.div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `radial-gradient(circle at 30% 70%, var(--color-${currentFeature.animationColor}-500) 0%, transparent 50%), 
                                 radial-gradient(circle at 70% 30%, var(--color-${currentFeature.animationColor}-400) 0%, transparent 50%)`
              }}
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Improved workflow indicator line with animation */}
            <motion.div 
              className="absolute top-0 left-0 right-0 h-1 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-r ${currentFeature.color}`}
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              {/* Animated shine effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ opacity: 0.3 }}
              />
            </motion.div>
            
            <div className="flex flex-col sm:flex-row sm:items-start mb-8 relative">
              <div className="flex-shrink-0 sm:mr-6 mb-6 sm:mb-0 flex items-center justify-center">
                <motion.div 
                  className={`p-5 rounded-xl ${currentFeature.textColor} bg-opacity-10 relative`}
                  style={{ 
                    background: `radial-gradient(circle at center, var(--color-${currentFeature.animationColor}-500/20) 0%, transparent 70%)` 
                  }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ 
                    boxShadow: [
                      `0 0 0px 0px var(--color-${currentFeature.animationColor}-500/0)`,
                      `0 0 20px 5px var(--color-${currentFeature.animationColor}-500/20)`,
                      `0 0 0px 0px var(--color-${currentFeature.animationColor}-500/0)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                  >
                    {React.cloneElement(currentFeature.icon, { className: `w-12 h-12 ${currentFeature.textColor}` })}
                  </motion.div>
                  
                  {/* Animated rings */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl border border-current opacity-20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-xl border border-current opacity-10"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0, 0.1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                  />
                </motion.div>
              </div>
              
              <div className="flex-1">
                <motion.h3 
                  className="text-3xl font-bold mb-3 bg-clip-text text-transparent relative inline-block"
                  style={{ 
                    backgroundImage: `linear-gradient(90deg, white, var(--color-${currentFeature.animationColor}-200))`,
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
                >
                  {currentFeature.title}
                  <motion.div 
                    className="ml-2 inline-flex absolute -right-8 top-1/2 transform -translate-y-1/2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronsRight className={`w-6 h-6 ${currentFeature.textColor}`} />
                  </motion.div>
                </motion.h3>
                
                <motion.p 
                  className="text-gray-200 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentFeature.description}
                </motion.p>
                
                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {currentFeature.flowSteps.map((step, idx) => (
                    <motion.span 
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${currentFeature.animationColor}-500/10 text-${currentFeature.animationColor}-300 border border-${currentFeature.animationColor}-500/20`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {step}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-72 rounded-xl overflow-hidden mb-8 bg-${lightBlackColor}/70 flex items-center justify-center border border-${lightBlackColor} shadow-inner relative">
              {/* Enhanced feature visualization */}
              <EnhancedAnimation feature={currentFeature} />
              
              {/* Glass overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-${lightBlackColor}/40" />
              
              {/* Feature highlight badge */}
              <motion.div 
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-${lightBlackColor}/90 border border-${lightBlackColor} flex items-center gap-2 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full bg-${currentFeature.animationColor}-400`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-medium text-white">AI-Powered Feature</span>
              </motion.div>
            </div>
            
            <div>
              <motion.h4 
                className={`text-xl font-semibold mb-5 flex items-center`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-gradient-subtle mr-2" style={{ 
                  background: `linear-gradient(90deg, white, var(--color-${currentFeature.animationColor}-200))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent" 
                }}>
                  Key Benefits
                </span>
                <motion.div 
                  className={`w-2 h-2 rounded-full bg-${currentFeature.animationColor}-400`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentFeature.benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="group"
                  >
                    <motion.div 
                      className="flex items-center p-4 rounded-xl bg-${lightBlackColor}/50 border border-${lightBlackColor} group-hover:border-${lightBlackColor} group-hover:bg-${lightBlackColor}/70 transition-all duration-300 h-full"
                      whileHover={{ y: -3, x: 0, boxShadow: `0 10px 25px -5px rgba(var(--color-${currentFeature.animationColor}-500-rgb), 0.15)` }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <motion.div 
                        className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center bg-${currentFeature.animationColor}-500/10 flex-shrink-0`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <motion.div 
                          className={`w-1.5 h-1.5 rounded-full bg-${currentFeature.animationColor}-400`}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      <span className="text-gray-200 group-hover:text-white transition-colors duration-300">{benefit}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 mb-8"
        >

          {/* Background decorative elements */}
          <div className="relative max-w-4xl mx-auto">
            {/* Animated background glow */}
            <div className="absolute inset-0 -z-10">
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full blur-[80px] opacity-30 bg-primary-500"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
              />
              <motion.div 
                className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full blur-[80px] opacity-60 bg-blue-500"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
              />
            </div>

            <div className="backdrop-blur-sm bg-${lightBlackColor}/50 border border-${lightBlackColor} p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
              {/* Grid pattern overlay */}
              <motion.div 
                className="absolute inset-0 opacity-10 bg-grid-pattern"
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* Content */}
              <div className="max-w-2xl mx-auto text-center relative z-10">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 to-white mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Ready to Transform Your Sales Process?
                </motion.h3>

                <motion.p 
                  className="text-lg text-gray-200 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Book a personalized demo and see how our AI-powered sales acceleration platform can drive results for your specific business needs.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl text-white font-medium shadow-xl shadow-primary-500/30 relative overflow-hidden group"
                    onClick={() => window.open("https://calendly.com/enai-ai2024", "_blank")}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center">
                      <BellRing className="w-4 h-4 mr-2" />
                      Schedule Demo
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-white/30 to-primary-500/0"
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "200%", opacity: 1 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.button>

                  <motion.a
                    href="#features"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="px-8 py-4 bg-${lightBlackColor} border border-${lightBlackColor} hover:border-primary-500/50 rounded-xl text-white font-medium relative overflow-hidden group flex items-center justify-center"
                  >
                    <span className="relative z-10">Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-1 relative z-10" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/0 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                    />
                  </motion.a>
                </motion.div>

                <motion.div 
                  className="flex justify-center items-center mt-8 space-x-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-${lightBlackColor} flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900"
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + (i * 0.1) }}
                      >
                        <span className="text-xs font-medium text-white">{String.fromCharCode(65 + i)}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.span 
                    className="text-sm text-gray-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 }}
                  >
                    Join companies already using our platform
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
