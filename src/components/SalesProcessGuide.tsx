import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  UserPlus,
  MessageSquare,
  Target,
  CheckCircle,
  BarChart,
  Zap,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Database,
  Cog,
  Cpu,
  BarChart2,
  Mail,
  Calendar,
  PieChart,
  Layers
} from 'lucide-react';

// Workflow process stages with more detailed automation information
const workflowStages = [
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Collection & Enrichment",
    description: "Automatically gather and enhance lead data from multiple sources with AI-driven data enrichment.",
    automation: "24/7 automated data collection",
    efficiency: "93% reduction in manual data entry",
    integrations: "CRM, LinkedIn, ZoomInfo, Clearbit",
    insights: "Predictive lead scoring algorithms",
    animationColor: "from-blue-500 to-indigo-600",
    automationSteps: ["Data Mining", "Profile Enrichment", "Validation", "Scoring"]
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Segmentation & Targeting",
    description: "Automatically segment prospects based on intent signals, firmographics, and behavioral patterns.",
    automation: "AI-powered audience segmentation",
    efficiency: "4.5x faster targeting setup",
    integrations: "Marketing platforms, Analytics tools",
    insights: "Adaptive targeting optimization",
    animationColor: "from-purple-500 to-indigo-600",
    automationSteps: ["Pattern Recognition", "Segment Creation", "Prioritization", "Audience Mapping"]
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Multi-Channel Orchestration",
    description: "Coordinate personalized outreach across email, social, phone, and ads with intelligent sequencing.",
    automation: "Dynamic content generation",
    efficiency: "78% increase in response rates",
    integrations: "Email, LinkedIn, SMS, Ad platforms",
    insights: "Performance-based channel selection",
    animationColor: "from-cyan-500 to-blue-600",
    automationSteps: ["Template Creation", "Dynamic Personalization", "Channel Selection", "Delivery Timing"]
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Engagement Automation",
    description: "Automate follow-ups, meeting scheduling, and task creation based on prospect interactions.",
    automation: "Intelligent follow-up sequences",
    efficiency: "89% reduction in no-shows",
    integrations: "Calendar, Sales Engagement, Tasks",
    insights: "Optimal timing algorithms",
    animationColor: "from-green-500 to-emerald-600",
    automationSteps: ["Response Detection", "Follow-up Triggers", "Meeting Coordination", "Task Assignment"]
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Sales Intelligence & Next Steps",
    description: "AI recommends best actions, provides conversation insights, and automates deal advancement.",
    automation: "Real-time conversation analysis",
    efficiency: "41% shorter sales cycles",
    integrations: "Call transcription, Deal management",
    insights: "Competitive intelligence automation",
    animationColor: "from-pink-500 to-rose-600",
    automationSteps: ["Conversation Analysis", "Insight Generation", "Competitive Intelligence", "Next-Best-Action"]
  },
  {
    icon: <PieChart className="w-8 h-8" />,
    title: "Reporting & Optimization",
    description: "Automated performance tracking, analytics, and AI-driven workflow optimization.",
    automation: "Continuous workflow optimization",
    efficiency: "4.7x productivity increase",
    integrations: "Analytics, CRM, Business Intelligence",
    insights: "Predictive pipeline analysis",
    animationColor: "from-amber-500 to-orange-600",
    automationSteps: ["Performance Tracking", "Workflow Analysis", "Bottleneck Detection", "Automated Reporting"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export default function SalesProcessGuide() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [activeConnections, setActiveConnections] = useState<number[]>([]);
  const [dataFlowAnimation, setDataFlowAnimation] = useState(false);

  // Start data flow animation on component mount
  useEffect(() => {
    setDataFlowAnimation(true);
    
    // Set active connections every few seconds to simulate automation flow
    const timer = setInterval(() => {
      const randomConnections = Array.from(
        { length: Math.floor(Math.random() * 3) + 1 }, 
        () => Math.floor(Math.random() * (workflowStages.length - 1))
      );
      setActiveConnections(randomConnections);
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);

  // Enhanced animation component that simulates workflow automation
  const WorkflowAnimation = ({ stage, index }: { stage: typeof workflowStages[0], index: number }) => {
    // Initial positions for automation step nodes
    const stepPositions = [
      { x: 30, y: 30 }, 
      { x: 70, y: 30 }, 
      { x: 30, y: 70 }, 
      { x: 70, y: 70 }
    ];
    
    return (
      <div className="flex flex-col items-center justify-center h-full w-full relative">
        {/* Background gradient for workflow node */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${stage.animationColor} opacity-10 rounded-lg`}
          animate={{
            scale: [1, 1.03, 1],
            opacity: hoveredStage === index ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Automation steps and connections */}
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Connecting lines between automation steps */}
          <motion.path
            d={`M30,30 L70,30`}
            stroke="var(--color-primary-400)"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: dataFlowAnimation ? 1 : 0,
              opacity: hoveredStage === index ? 0.8 : 0.4
            }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
          <motion.path
            d={`M70,30 L70,70`}
            stroke="var(--color-primary-400)"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: dataFlowAnimation ? 1 : 0,
              opacity: hoveredStage === index ? 0.8 : 0.4 
            }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path
            d={`M70,70 L30,70`}
            stroke="var(--color-primary-400)"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: dataFlowAnimation ? 1 : 0,
              opacity: hoveredStage === index ? 0.8 : 0.4 
            }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
          />
          <motion.path
            d={`M30,70 L30,30`}
            stroke="var(--color-primary-400)"
            strokeWidth="1"
            strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: dataFlowAnimation ? 1 : 0,
              opacity: hoveredStage === index ? 0.8 : 0.4 
            }}
            transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
          />
          
          {/* Data flow particles */}
          {dataFlowAnimation && (
            <>
              <motion.circle
                cx="30"
                cy="30"
                r="1.5"
                fill="var(--color-primary-500)"
                animate={{
                  cx: [30, 70, 70, 30, 30],
                  cy: [30, 30, 70, 70, 30],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
              />
              <motion.circle
                cx="30"
                cy="30"
                r="1.5"
                fill="var(--color-primary-300)"
                animate={{
                  cx: [30, 70, 70, 30, 30],
                  cy: [30, 30, 70, 70, 30],
                  opacity: [0, 1, 1, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1 + Math.random() * 2
                }}
              />
            </>
          )}
        </svg>
        
        {/* Automation steps as nodes */}
        {stage.automationSteps.map((step, i) => (
          <motion.div
            key={`${stage.title}-step-${i}`}
            className="absolute bg-dark-800 border border-primary-400/30 rounded-md text-xs px-2 py-1 text-white shadow-lg z-10"
            style={{
              left: `${stepPositions[i].x}%`,
              top: `${stepPositions[i].y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: dataFlowAnimation ? 1 : 0.9,
              opacity: dataFlowAnimation ? (hoveredStage === index ? 1 : 0.8) : 0.5
            }}
            transition={{ 
              duration: 0.3,
              delay: i * 0.2
            }}
            whileHover={{ scale: 1.1 }}
          >
            {step}
          </motion.div>
        ))}
        
        {/* Center icon */}
        <motion.div 
          className="relative z-20 bg-dark-900/80 rounded-full p-4 border-2 border-primary-400/30 shadow-lg"
          animate={{ 
            scale: [1, 1.05, 1],
            borderColor: ['rgba(79, 70, 229, 0.3)', 'rgba(79, 70, 229, 0.6)', 'rgba(79, 70, 229, 0.3)']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {React.cloneElement(stage.icon as React.ReactElement, { className: "w-8 h-8 text-primary-400" })}
        </motion.div>
      </div>
    );
  };

  // Process connection lines component
  const ProcessConnections = () => (
    <div className="hidden lg:block absolute w-full top-[25%] bottom-[25%]">
      {/* Main process flow line */}
      <motion.div 
        className="absolute left-[16.66%] right-[16.66%] top-1/2 h-0.5 bg-primary-400/30 transform -translate-y-1/2 z-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Vertical connection lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div 
          key={`vline-${i}`}
          className={`absolute w-0.5 h-[60%] bg-primary-400/30 top-1/2 transform -translate-y-1/2 z-0
            ${i % 2 === 0 ? 'translate-y-[30%]' : '-translate-y-[30%]'}`}
          style={{ left: `${16.66 + i * 13.33}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
        />
      ))}
      
      {/* Animated data flow particles */}
      {activeConnections.map((connection, idx) => (
        <motion.div
          key={`connection-${idx}-${connection}`}
          className="absolute w-2 h-2 rounded-full bg-primary-400 shadow-md shadow-primary-400/50 z-10"
          style={{ 
            left: `${16.66 + connection * 13.33}%`,
            top: '50%'
          }}
          animate={{
            left: [`${16.66 + connection * 13.33}%`, `${16.66 + (connection + 1) * 13.33}%`],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16 relative"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              AI-Powered Sales That Never Sleep
              </h2>
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary-400/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our intelligent automation platform streamlines every step of your sales process with AI-powered workflows
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Process connections that visualize the workflow */}
        <ProcessConnections />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
        >
          {workflowStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              variants={itemVariants}
              className={`relative p-6 rounded-2xl bg-dark-800/80 backdrop-blur-sm border border-dark-700 hover:border-primary-400 transition-all duration-500 group
                ${index % 2 === 0 ? 'lg:translate-y-12' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 0 25px rgba(79, 70, 229, 0.4)",
                borderColor: "rgba(79, 70, 229, 0.8)",
                transition: { 
                  duration: 0.3, 
                  ease: "easeOut"
                }
              }}
              onHoverStart={() => setHoveredStage(index)}
              onHoverEnd={() => setHoveredStage(null)}
            >
              {/* Node number indicator */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center text-dark-800 font-bold z-10 shadow-lg">
                {index + 1}
              </div>
              
              {/* Glow effect on hover */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                animate={{ 
                  boxShadow: hoveredStage === index ? 
                    "0 0 30px rgba(79, 70, 229, 0.4)" : 
                    "0 0 0 rgba(79, 70, 229, 0)"
                }}
              />
              
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-lg bg-primary-400 bg-opacity-20 text-primary-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {stage.icon}
                </div>
                <div className="ml-4 min-w-0">
                  <h3 className="text-xl font-semibold text-white truncate">{stage.title}</h3>
                </div>
              </div>

              <div className="h-40 mb-6 relative overflow-hidden rounded-lg bg-dark-900/70 border border-dark-700">
                <WorkflowAnimation stage={stage} index={index} />
              </div>
              
              <p className="text-gray-300 mb-4 text-sm line-clamp-3 h-[60px]">{stage.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="flex items-center p-3 rounded-lg bg-dark-900/50 backdrop-blur-sm border border-dark-700 hover:border-primary-400 transition-all duration-300 h-full">
                        <div className="p-2 rounded-lg bg-primary-400/20 shrink-0">
                          <Cog className="w-5 h-5 text-primary-400" />
                        </div>
                        <div className="ml-3 min-w-0">
                          <div className="text-sm font-medium text-white">Automation</div>
                          <div className="text-xs text-gray-400 truncate w-full">{stage.automation}</div>
                        </div>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-dark-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs"
                        sideOffset={5}
                      >
                        {stage.automation}
                        <Tooltip.Arrow className="fill-dark-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="flex items-center p-3 rounded-lg bg-dark-900/50 backdrop-blur-sm border border-dark-700 hover:border-green-400 transition-all duration-300 h-full">
                        <div className="p-2 rounded-lg bg-green-400/20 shrink-0">
                          <BarChart2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="ml-3 min-w-0">
                          <div className="text-sm font-medium text-white">Efficiency</div>
                          <div className="text-xs text-gray-400 truncate w-full">{stage.efficiency}</div>
                        </div>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-dark-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs"
                        sideOffset={5}
                      >
                        {stage.efficiency}
                        <Tooltip.Arrow className="fill-dark-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="flex items-center p-3 rounded-lg bg-dark-900/50 backdrop-blur-sm border border-dark-700 hover:border-blue-400 transition-all duration-300 h-full">
                        <div className="p-2 rounded-lg bg-blue-400/20 shrink-0">
                          <Database className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="ml-3 min-w-0">
                          <div className="text-sm font-medium text-white">Integrations</div>
                          <div className="text-xs text-gray-400 truncate w-full">{stage.integrations.split(',')[0] + (stage.integrations.includes(',') ? '...' : '')}</div>
                        </div>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-dark-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs"
                        sideOffset={5}
                      >
                        {stage.integrations}
                        <Tooltip.Arrow className="fill-dark-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="flex items-center p-3 rounded-lg bg-dark-900/50 backdrop-blur-sm border border-dark-700 hover:border-amber-400 transition-all duration-300 h-full">
                        <div className="p-2 rounded-lg bg-amber-400/20 shrink-0">
                          <Cpu className="w-5 h-5 text-amber-400" />
                        </div>
                        <div className="ml-3 min-w-0">
                          <div className="text-sm font-medium text-white">AI Insights</div>
                          <div className="text-xs text-gray-400 truncate w-full">{stage.insights.split(' ').slice(0, 2).join(' ') + '...'}</div>
                        </div>
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-dark-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm max-w-xs"
                        sideOffset={5}
                      >
                        {stage.insights}
                        <Tooltip.Arrow className="fill-dark-800" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">End-to-End Automation Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { metric: "94%", label: "Task Automation", subtext: "Reduced manual work" },
              { metric: "76%", label: "Time Saved", subtext: "More time for strategic selling" },
              { metric: "3.2X", label: "Productivity", subtext: "Increased output per rep" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-xl bg-dark-800/80 backdrop-blur-sm border border-dark-700 hover:border-primary-400 transition-all duration-500 group hover:shadow-lg hover:shadow-primary-400/20"
              >
                <motion.div 
                  className="text-4xl font-bold gradient-text mb-2 relative"
                  animate={{
                    scale: [1, 1.1, 1],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {item.metric}
                </motion.div>
                <div className="text-gray-300 group-hover:text-white transition-colors duration-300">{item.label}</div>
                <div className="text-xs text-gray-400 mt-1">{item.subtext}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg text-white font-medium shadow-lg shadow-primary-500/30"
            >
              Schedule Workflow Demo
            </motion.button>
            <p className="text-gray-400 mt-3 text-sm">See how our automation platform can transform your specific sales process</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}