import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { animated } from 'react-spring';
import { Bot, Brain, MessageSquare, ChevronRight, BarChart3, Target, Users, ArrowRight, Terminal, Database, Shield } from 'lucide-react';

// Animation data for different AI behaviors - using reliable public animations
const animationUrls = {
  processing: "https://lottie.host/80869e0a-51a9-4888-84e4-c70f1f41dfe1/UuxkH9a10z.json", // loading animation
  analyzing: "https://lottie.host/e6af1371-a8c8-4274-829b-5dc232f6441c/5VJ5U4FVNY.json",  // data processing
  responding: "https://lottie.host/b8ad4438-a4dc-4e57-8773-63c559f65822/oqv6ZuSYG4.json" // checkmark
};

const demoScenarios = [
  {
    title: "Lead Qualification",
    description: "Watch AI analyze prospect data and make real-time qualification decisions",
    metrics: {
      accuracy: "95%",
      speed: "2.3s",
      improvement: "+60%"
    },
    icon: <Target className="w-6 h-6" />,
    demo: {
      input: "Company: TechCorp\nSize: 500-1000\nIndustry: SaaS\nRevenue: $50M",
      processing: "Analyzing company profile...\nChecking market signals...\nEvaluating engagement history...",
      output: "Qualification Score: 85/100\nRecommendation: High-priority lead\nNext Action: Schedule sales call"
    }
  },
  {
    title: "Email Response",
    description: "See how AI crafts personalized responses based on context and intent",
    metrics: {
      accuracy: "98%",
      speed: "1.5s",
      improvement: "+75%"
    },
    icon: <MessageSquare className="w-6 h-6" />,
    demo: {
      input: "Subject: Product Demo Request\nMessage: Interested in seeing how your platform works...",
      processing: "Analyzing intent...\nChecking availability...\nPersonalizing response...",
      output: "Personalized response with:\n- Custom demo options\n- Available time slots\n- Relevant case studies"
    }
  },
  {
    title: "Market Analysis",
    description: "Experience real-time market trend analysis and opportunity identification",
    metrics: {
      accuracy: "92%",
      speed: "3.1s",
      improvement: "+45%"
    },
    icon: <BarChart3 className="w-6 h-6" />,
    demo: {
      input: "Market: Enterprise Software\nRegion: North America\nSegment: Mid-market",
      processing: "Gathering market data...\nIdentifying trends...\nMapping opportunities...",
      output: "Key Insights:\n- Growing demand in remote work solutions\n- Increasing security concerns\n- Price sensitivity in mid-market"
    }
  }
];

export default function AIAgentShowcase() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [demoState, setDemoState] = useState<'input' | 'processing' | 'output'>('input');
  const [progress, setProgress] = useState(0);
  const [animationData, setAnimationData] = useState<{[key: string]: any}>({});
  const [animationErrors, setAnimationErrors] = useState<{[key: string]: boolean}>({});
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load animation data
  useEffect(() => {
    const loadAnimations = async () => {
      try {
        // Attempt to load each animation
        for (const [key, url] of Object.entries(animationUrls)) {
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to load animation ${key}`);
            const data = await response.json();
            setAnimationData(prev => ({ ...prev, [key]: data }));
          } catch (error) {
            console.error(`Error loading animation ${key}:`, error);
            setAnimationErrors(prev => ({ ...prev, [key]: true }));
          }
        }
      } catch (error) {
        console.error("Error loading animations:", error);
      }
    };

    loadAnimations();

    // Clean up timeouts when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnimationError = (animationType: string) => {
    console.error(`Animation error for ${animationType}`);
    setAnimationErrors(prev => ({ ...prev, [animationType]: true }));
  };

  const runDemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default to ensure button click works as expected
    event.preventDefault();
    event.stopPropagation();
    
    console.log("Run demo clicked, current state:", demoState, "isRunning:", isRunning);
    
    if (isRunning) return; // Prevent multiple clicks
    
    // If we're already showing output, reset to input first
    if (demoState === 'output') {
      setDemoState('input');
      setProgress(0);
      
      // Small delay before starting the new demo
      setTimeout(() => {
        startDemo();
      }, 300);
    } else {
      startDemo();
    }
  };
  
  const startDemo = () => {
    setIsRunning(true);
    setDemoState('processing');
    
    const scenario = demoScenarios[activeScenario];
    const steps = scenario.demo.processing.split('\n').length;
    const totalTime = 4000; // Total time in ms
    const intervalTime = totalTime / steps;
    
    let stepIndex = 0;
    
    const processStep = () => {
      if (stepIndex < steps) {
        setProgress((stepIndex / steps) * 100);
        stepIndex++;
        timeoutRef.current = setTimeout(processStep, intervalTime);
      } else {
        setProgress(100);
        setDemoState('output');
        setIsRunning(false);
      }
    };
    
    timeoutRef.current = setTimeout(processStep, 300);
  };

  const resetDemo = () => {
    // Only allow reset if not currently processing
    if (demoState !== 'processing') {
      setDemoState('input');
    }
  };

  return (
    <section id="ai-agents" className="py-24 bg-dark overflow-hidden" aria-labelledby="ai-agents-heading" itemScope itemType="https://schema.org/Product">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <h2 id="ai-agents-heading" className="text-5xl md:text-6xl font-bold gradient-text mb-6" itemProp="name">
              AI Agents in Action
            </h2>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-primary-400/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" itemProp="description">
            Experience the power of our AI agents through interactive demonstrations of lead qualification, email response, and market analysis capabilities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Scenario Selection */}
          <div className="space-y-6">
            {demoScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-500 group hover:shadow-lg ${
                  activeScenario === index
                    ? 'bg-dark-800/80 backdrop-blur-sm border-primary-400 shadow-primary-400/20'
                    : 'bg-dark-900/60 backdrop-blur-sm border-dark-700'
                } border`}
                onClick={() => {
                  setActiveScenario(index);
                  resetDemo();
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <animated.div
                      className="p-2 rounded-lg bg-primary-400 bg-opacity-20 text-primary-400 group-hover:scale-110 transition-transform duration-300"
                    >
                      {scenario.icon}
                    </animated.div>
                    <h3 className="text-lg font-semibold ml-4 text-white">
                      {scenario.title}
                    </h3>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    activeScenario === index ? 'rotate-90 text-primary-400' : 'text-gray-500'
                  }`} />
                </div>
                
                <p className="mt-2 text-gray-300 text-sm" itemProp="feature">
                  {scenario.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Accuracy</div>
                    <div className="text-primary-400 font-semibold">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                      {scenario.metrics.accuracy}
                      </motion.span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Speed</div>
                    <div className="text-primary-400 font-semibold">
                      {scenario.metrics.speed}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Improvement</div>
                    <div className="text-green-400 font-semibold">
                      {scenario.metrics.improvement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-8 border border-dark-700 hover:border-primary-400 transition-all duration-500 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Bot className="w-6 h-6 text-primary-400" />
                <span className="ml-2 text-white font-semibold">
                  Live Demo
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  demoState === 'processing' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <span className="text-sm text-gray-400">
                  {demoState === 'input' ? 'Ready' : 
                   demoState === 'processing' ? 'Processing' : 'Complete'}
                </span>
              </div>
            </div>

            <div className="h-64 bg-dark-900/60 backdrop-blur-sm rounded-lg p-4 font-mono text-sm overflow-auto mb-6 border border-dark-700 group-hover:border-primary-400/50 transition-all duration-500 relative">
              {/* Add visual Lottie animation background */}
              {demoState === 'processing' && animationData.processing && !animationErrors.processing && (
                <div className="absolute top-0 right-0 w-24 h-24 opacity-40 pointer-events-none">
                  <Lottie 
                    animationData={animationData.processing} 
                    loop={true} 
                    autoplay={true} 
                    onError={() => handleAnimationError('processing')}
                  />
                </div>
              )}
              
              {demoState === 'output' && animationData.responding && !animationErrors.responding && (
                <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none">
                  <Lottie 
                    animationData={animationData.responding} 
                    loop={false} 
                    autoplay={true} 
                    onError={() => handleAnimationError('responding')}
                  />
                </div>
              )}

              {/* Input/Processing/Output displays */}
              {demoState === 'input' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-300"
                >
                  {demoScenarios[activeScenario].demo.input.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </motion.div>
              )}
              {demoState === 'processing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-yellow-400 h-full"
                >
                  {demoScenarios[activeScenario].demo.processing.split('\n').map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: i * 0.8,  // Match the timing with the runDemo function (800ms per step)
                        duration: 0.3 
                      }}
                      className="flex items-center"
                    >
                      <motion.div
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2"
                      />
                      {line}
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {demoState === 'output' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 relative"
                >
                  {/* Success indicator animation */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute -left-2 -top-2 bg-green-500/20 rounded-full p-1"
                  >
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  
                  {/* Result content with staggered animation */}
                  <div className="mt-6">
                    {demoScenarios[activeScenario].demo.output.split('\n').map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex items-start mb-2"
                      >
                        {line.includes(':') ? (
                          <>
                            <span className="font-semibold">{line.split(':')[0]}:</span>
                            <span className="ml-2">{line.split(':').slice(1).join(':')}</span>
                          </>
                        ) : (
                          <span>{line}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {demoScenarios.map((scenario, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-2 rounded-md text-sm ${
                      activeScenario === index
                        ? 'bg-primary-500/20 text-white'
                        : 'bg-dark-700/50 text-gray-400 hover:bg-dark-700'
                    }`}
                    onClick={() => {
                      if (!isRunning) {
                        setActiveScenario(index);
                        setDemoState('input');
                      }
                    }}
                    disabled={isRunning}
                  >
                    {scenario.title}
                  </motion.button>
                ))}
              </div>
              
              <motion.button
                onClick={runDemo}
                disabled={isRunning}
                whileHover={!isRunning ? { scale: 1.05 } : {}}
                whileTap={!isRunning ? { scale: 0.98 } : {}}
                className={`relative overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-primary-400 to-primary-500 text-white ${
                  isRunning ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary-400/40'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  {demoState === 'output' ? 'Run Again' : 'Run Demo'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
                {/* Add animated fill effect */}
                {isRunning && (
                  <motion.div
                    className="absolute inset-0 bg-primary-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-3xl font-bold text-center gradient-text mb-12" id="ai-comparison">
            AI vs Traditional Methods: The Enai.ai Advantage
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-dark-800/80 backdrop-blur-sm border border-primary-400 hover:shadow-lg hover:shadow-primary-400/20 transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-primary-400" />
                <h4 className="text-lg font-semibold ml-3 text-white">AI-Powered</h4>
              </div>
              <ul className="space-y-3">
                {[
                  "24/7 availability and instant responses",
                  "Consistent quality across all interactions",
                  "Real-time learning and adaptation",
                  "Scalable to any volume of interactions",
                  "Data-driven decision making"
                ].map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-300 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-primary-400 mr-2" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-dark-800/80 backdrop-blur-sm border border-dark-700 hover:shadow-lg transition-all duration-500 group">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-gray-400" />
                <h4 className="text-lg font-semibold ml-3 text-white">Traditional</h4>
              </div>
              <ul className="space-y-3">
                {[
                  "Limited by working hours and capacity",
                  "Variable quality depending on staff",
                  "Manual learning curve and training",
                  "Limited by team size and resources",
                  "Intuition-based decisions"
                ].map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-300 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500 mr-2" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}