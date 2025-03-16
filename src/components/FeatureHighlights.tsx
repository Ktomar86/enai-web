import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import {
  Search,
  MessageCircle,
  BarChart2,
  Clock,
  Users,
  Brain,
  Database,
  BarChart3,
  Settings,
  LineChart,
  Workflow,
  Bot,
  ChevronRight,
  Zap,
  ChevronsRight
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

export default function FeatureHighlights() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const [hoverFeature, setHoverFeature] = useState<string | null>(null);
  const [dataFlowActive, setDataFlowActive] = useState(true);
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
            className={`absolute bg-dark-800/90 border text-xs px-2 py-1 text-white rounded-md shadow-lg z-10 ${
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
              backgroundColor: i === flowLineIndex ? `rgba(var(--color-${feature.animationColor}-900-rgb), 0.9)` : 'rgba(15, 23, 42, 0.9)'
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
    <section className="py-24 bg-dark-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            Sales Acceleration Suite
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A complete toolkit to streamline your sales process, increase productivity, and drive revenue growth for businesses of any size
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Feature Navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className={`
                  p-4 rounded-xl cursor-pointer transition-all duration-300 relative
                  ${activeFeature === feature.id ? 
                    `bg-gradient-to-br ${feature.color} shadow-lg shadow-${feature.animationColor}-500/30` : 
                    'bg-dark-800/80 hover:bg-dark-800 border border-dark-700'
                  }
                `}
                onClick={() => setActiveFeature(feature.id)}
                onMouseEnter={() => setHoverFeature(feature.id)}
                onMouseLeave={() => setHoverFeature(null)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Connection lines - only shown on active/adjacent features */}
                {activeFeature === feature.id && (
                  <motion.div 
                    className="absolute top-1/2 -right-4 w-4 h-0.5 bg-gradient-to-r from-transparent to-primary-400"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: [0, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  />
                )}
                
                <div className="flex flex-col items-center text-center">
                  <div className={`
                    p-3 rounded-full mb-3 relative
                    ${activeFeature === feature.id ? 
                      'bg-white/20' : 
                      `${feature.textColor} bg-opacity-20`
                    }
                  `}>
                    {feature.icon}
                    
                    {/* Add active indicator dot */}
                    {activeFeature === feature.id && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  
                  <h3 className={`
                    font-medium text-sm
                    ${activeFeature === feature.id ? 
                      'text-white' : 
                      'text-gray-300'
                    }
                  `}>
                    {feature.title}
                  </h3>
                  
                  {/* Animated workflow indicator */}
                  {activeFeature === feature.id && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`h-0.5 mt-2 bg-gradient-to-r ${feature.color}`}
                    />
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
            transition={{ duration: 0.3 }}
            className="bg-dark-800/80 backdrop-blur-sm rounded-2xl p-8 border border-dark-700 relative overflow-hidden"
          >
            {/* Background pattern for card */}
            <motion.div 
              className="absolute inset-0 bg-grid-pattern opacity-5"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            {/* Workflow indicator line at top */}
            <motion.div 
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentFeature.color}`}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="flex items-start mb-6 relative">
              <div className={`p-4 rounded-lg ${currentFeature.textColor} bg-opacity-20 mr-4 relative`}>
                {currentFeature.icon}
                
                {/* Active animation indicator */}
                <motion.span
                  className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${currentFeature.bgColor}`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                  {currentFeature.title}
                  <motion.div 
                    className="ml-2 inline-flex"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronsRight className={`w-5 h-5 ${currentFeature.textColor}`} />
                  </motion.div>
                </h3>
                <p className="text-gray-300">{currentFeature.description}</p>
              </div>
            </div>
            
            <div className="h-64 rounded-lg overflow-hidden mb-6 bg-dark-900/50 flex items-center justify-center border border-dark-700">
              {/* Enhanced animation component */}
              <EnhancedAnimation feature={currentFeature} />
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                Key Benefits
                <div className={`ml-2 w-2 h-2 rounded-full ${currentFeature.bgColor}`}></div>
              </h4>
              <ul className="space-y-3">
                {currentFeature.benefits.map((benefit, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center bg-dark-900/50 rounded-lg p-3 border border-dark-700 hover:border-primary-400 transition-colors duration-300"
                  >
                    <div className={`w-2 h-2 rounded-full ${currentFeature.textColor} mr-3`}></div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg text-white font-medium shadow-lg shadow-primary-500/30 relative overflow-hidden group"
            >
              <span className="relative z-10">Get Your Personalized Demo</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-white/20 to-primary-500/0"
                animate={{ 
                  x: ['-100%', '200%']
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  repeatDelay: 1
                }}
              />
            </motion.button>
          </div>
          <p className="text-gray-400 mt-3 text-sm">Experience how these tools can work for your specific business needs</p>
        </motion.div>
      </div>
    </section>
  );
} 