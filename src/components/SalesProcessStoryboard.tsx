import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Sparkles,
  Zap,
  Brain,
  Mail,
  CalendarClock,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Users,
  Laptop,
  CheckCircle2,
  Clock,
  Bot
} from 'lucide-react';

// Define the process step interface
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  visualization: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    id: 'research',
    title: 'Market Research',
    description: 'AI analyzes market trends and identifies qualified leads that match your ideal customer profile.',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-500',
    visualization: (
      <div className="relative">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-blue-500/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.5, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap gap-2 w-32 h-32"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div 
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: `hsl(${210 + i * 5}, 70%, ${50 + i * 2}%)` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: Math.random() * 0.5 + 0.5, 
                scale: Math.random() * 0.5 + 0.5,
                y: [Math.random() * 10, Math.random() * -10, Math.random() * 10]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3 + i * 0.2, 
                delay: i * 0.1,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>
        <motion.div 
          className="relative z-10 bg-blue-600 text-white p-4 rounded-xl shadow-lg w-full max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <Sparkles className="w-4 h-4 mr-2 text-blue-200" />
            <h4 className="text-sm font-semibold">Ideal Customer Match</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-xs bg-blue-700/50 p-2 rounded">
              <span className="block font-medium">Industry</span>
              <span className="text-blue-100">SaaS / Fintech</span>
            </div>
            <div className="text-xs bg-blue-700/50 p-2 rounded">
              <span className="block font-medium">Company Size</span>
              <span className="text-blue-100">50-250 employees</span>
            </div>
            <div className="text-xs bg-blue-700/50 p-2 rounded">
              <span className="block font-medium">Revenue</span>
              <span className="text-blue-100">$5M-$50M</span>
            </div>
            <div className="text-xs bg-blue-700/50 p-2 rounded">
              <span className="block font-medium">Buying Signals</span>
              <span className="text-blue-100">High (87%)</span>
            </div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 'outreach',
    title: 'Personalized Outreach',
    description: 'AI creates hyper-personalized messages based on prospect data, triggering multi-channel campaigns.',
    icon: <Mail className="w-6 h-6" />,
    color: 'bg-teal-500',
    visualization: (
      <div className="relative h-full">
        <motion.div 
          className="absolute w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute w-32 h-32 bg-teal-500/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          
          <motion.div 
            className="absolute bg-dark-800 border border-dark-700 p-4 rounded-lg shadow-lg max-w-xs"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-2">
              <Bot className="w-4 h-4 mr-2 text-teal-400" />
              <span className="text-xs font-medium text-teal-400">AI Writer</span>
            </div>
            <div className="text-sm text-white mb-2">Analyzing prospect data...</div>
            <motion.div 
              className="h-2 bg-dark-700 rounded overflow-hidden"
              initial={{ width: "100%" }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-300"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="absolute w-64 rounded-lg overflow-hidden bg-white shadow-xl"
            style={{ top: "40%", left: "50%", transform: "translate(-50%, 0)" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <div className="bg-teal-500 text-white px-3 py-1 text-xs font-medium flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              New Outreach Message
            </div>
            <div className="p-3">
              <div className="mb-1 text-xs text-gray-500">To: Sarah Johnson, VP of Operations</div>
              <div className="mb-1 text-xs text-gray-500">Subject: Streamlining Operations at Acme Inc</div>
              <div className="text-sm text-gray-800">
                Hi Sarah,
                <br/>
                <br/>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3 }}
                >
                  I noticed from your recent post about <span className="text-teal-600 font-medium">optimization challenges</span> in your logistics workflow...
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  },
  {
    id: 'nurture',
    title: '24/7 Conversation',
    description: 'AI engages with prospects in real-time, answering questions and nurturing leads around the clock.',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'bg-purple-500',
    visualization: (
      <div className="relative h-full">
        <div className="w-full max-w-xs mx-auto bg-dark-800 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-purple-600 px-4 py-2 text-white flex justify-between items-center">
            <span className="text-sm font-medium">Enai Chat</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="p-3 space-y-3">
            <motion.div 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-dark-700 rounded-lg p-2 text-xs text-gray-300 max-w-[80%]">
                I'd like to know more about how your AI handles data security.
              </div>
            </motion.div>
            
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-6 -left-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <div className="text-xs text-purple-300 italic">Enai is typing...</div>
                </motion.div>
                <div className="bg-purple-500 rounded-lg p-2 text-xs text-white max-w-[80%]">
                  Our platform uses enterprise-grade encryption and is SOC 2 compliant...
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
            >
              <div className="bg-dark-700 rounded-lg p-2 text-xs text-gray-300 max-w-[80%]">
                Sounds good. When can we schedule a demo?
              </div>
            </motion.div>
            
            <motion.div 
              className="flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              <div className="bg-purple-500 rounded-lg p-2 text-xs text-white max-w-[80%]">
                <p className="mb-1">I can help you schedule that right now!</p>
                <div className="bg-purple-600/50 p-1 rounded flex items-center">
                  <CalendarClock className="w-3 h-3 mr-1" />
                  <span>Schedule Demo</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'schedule',
    title: 'Meeting Scheduling',
    description: 'AI coordinates and schedules meetings with qualified leads when they express interest.',
    icon: <CalendarClock className="w-6 h-6" />,
    color: 'bg-amber-500',
    visualization: (
      <div className="relative">
        <motion.div
          className="max-w-xs mx-auto bg-dark-800 border border-dark-700 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-amber-500 px-3 py-2 text-white">
            <h3 className="font-medium">Demo Scheduling Assistant</h3>
          </div>
          <div className="p-4 space-y-3">
            <motion.div 
              className="grid grid-cols-7 gap-1 text-center text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-gray-400">{day}</div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className={`p-1 rounded cursor-pointer ${
                    i === 8 || i === 12 || i === 15 
                      ? 'bg-amber-500 text-white' 
                      : 'hover:bg-dark-700 text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.01 }}
                >
                  {i + 1}
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h4 className="text-gray-300 text-sm">Available Times</h4>
              <div className="grid grid-cols-2 gap-2">
                {['10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM'].map((time, i) => (
                  <motion.div
                    key={i}
                    className={`p-2 border text-center rounded text-xs cursor-pointer ${
                      i === 1 
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300' 
                        : 'border-dark-700 text-gray-400 hover:border-amber-500/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    animate={i === 1 ? { 
                      boxShadow: ['0 0 0 rgba(245, 158, 11, 0)', '0 0 8px rgba(245, 158, 11, 0.3)', '0 0 0 rgba(245, 158, 11, 0)'] 
                    } : {}}
                    transition={i === 1 ? { repeat: Infinity, duration: 2 } : {}}
                  >
                    {time}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="bg-amber-500/10 border border-amber-500/30 rounded p-2"
            >
              <div className="flex items-center text-amber-400 text-xs mb-1">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                <span>Meeting with John Smith confirmed</span>
              </div>
              <div className="text-gray-300 text-xs">Wednesday, 11:30 AM - 12:30 PM</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    id: 'analyze',
    title: 'Performance Analytics',
    description: 'AI analyzes campaign performance, learns from outcomes, and continuously optimizes your sales process.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'bg-rose-500',
    visualization: (
      <div className="relative">
        <motion.div
          className="max-w-xs mx-auto bg-dark-800 border border-dark-700 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-rose-500 px-3 py-2 text-white flex items-center justify-between">
            <h3 className="font-medium">Campaign Analytics</h3>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div 
                className="bg-dark-700/50 p-3 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-gray-400 text-xs mb-1">Response Rate</div>
                <div className="text-xl font-bold text-white">38%</div>
                <div className="flex items-center text-green-400 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+12% vs prev</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-dark-700/50 p-3 rounded"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-gray-400 text-xs mb-1">Meetings Booked</div>
                <div className="text-xl font-bold text-white">24</div>
                <div className="flex items-center text-green-400 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+8% vs prev</span>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">Email Campaign</span>
                  <span className="text-xs font-medium text-rose-300">42% open rate</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">LinkedIn Campaign</span>
                  <span className="text-xs font-medium text-rose-300">36% response rate</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: '36%' }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">SMS Campaign</span>
                  <span className="text-xs font-medium text-rose-300">28% CTR</span>
                </div>
                <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-500"
                    initial={{ width: 0 }}
                    animate={{ width: '28%' }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-4 p-2 bg-rose-500/10 border border-rose-500/20 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-start">
                <Brain className="w-4 h-4 text-rose-400 mr-2 mt-0.5" />
                <div>
                  <div className="text-xs font-medium text-rose-300 mb-1">AI Recommendation:</div>
                  <div className="text-xs text-gray-300">Adjust LinkedIn messaging to focus more on ROI metrics based on response pattern analysis.</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }
];

const SalesProcessStoryboard: React.FC = () => {
  const [activeStep, setActiveStep] = useState(processSteps[0].id);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  // Get current step data
  const currentStep = processSteps.find(step => step.id === activeStep) || processSteps[0];
  
  // Auto advance steps when in view
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const currentIndex = processSteps.findIndex(step => step.id === prev);
        const nextIndex = (currentIndex + 1) % processSteps.length;
        return processSteps[nextIndex].id;
      });
    }, 6000); // Change step every 6 seconds
    
    return () => clearInterval(interval);
  }, [inView]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <section className="py-24 bg-dark" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            Your AI Sales Team at Work
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch how Enai works around the clock to generate leads, manage conversations, and close deals - even while you sleep
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-10">
          {/* Process Step Timeline */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className={`relative ${index < processSteps.length - 1 ? 'pb-8' : ''}`}
                >
                  {/* Timeline connector */}
                  {index < processSteps.length - 1 && (
                    <span className="absolute left-6 top-8 -ml-px h-full w-0.5 bg-dark-700" aria-hidden="true" />
                  )}
                  
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className="w-full flex items-start space-x-4 focus:outline-none"
                  >
                    {/* Icon */}
                    <div className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${step.color} shadow-lg ${activeStep === step.id ? 'ring-2 ring-white/20' : ''}`}>
                      {React.cloneElement(step.icon, { 
                        className: 'text-white'
                      })}
                      {activeStep === step.id && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white/30"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 0, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 p-4 rounded-lg transition-all duration-300 ${
                      activeStep === step.id ? 'bg-dark-800 shadow-lg' : 'hover:bg-dark-900'
                    }`}>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm text-gray-300">{step.description}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Visualization */}
          <div className="md:col-span-3">
            <motion.div
              className="h-[400px] bg-dark-800/50 backdrop-blur rounded-2xl p-6 overflow-hidden"
              animate={{ 
                boxShadow: inView 
                  ? [
                      `0 0 0 rgba(0,0,0,0)`,
                      `0 0 20px rgba(${currentStep.color === 'bg-blue-500' ? '59, 130, 246' : 
                                       currentStep.color === 'bg-teal-500' ? '20, 184, 166' : 
                                       currentStep.color === 'bg-purple-500' ? '168, 85, 247' : 
                                       currentStep.color === 'bg-amber-500' ? '245, 158, 11' : 
                                       '244, 63, 94'}, 0.3)`,
                      `0 0 0 rgba(0,0,0,0)`
                    ]
                  : '0 0 0 rgba(0,0,0,0)',
                borderColor: inView
                  ? `rgba(${currentStep.color === 'bg-blue-500' ? '59, 130, 246' : 
                            currentStep.color === 'bg-teal-500' ? '20, 184, 166' : 
                            currentStep.color === 'bg-purple-500' ? '168, 85, 247' : 
                            currentStep.color === 'bg-amber-500' ? '245, 158, 11' : 
                            '244, 63, 94'}, 0.5)`
                  : 'rgba(31, 41, 55, 0.5)'
              }}
              transition={{ duration: 1, repeat: inView ? Infinity : 0, repeatType: "reverse" }}
              style={{ border: '1px solid rgba(31, 41, 55, 0.5)' }}
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeStep === step.id ? 1 : 0,
                    x: activeStep === step.id ? 0 : 20,
                    display: activeStep === step.id ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  {step.visualization}
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-6">
              <div className="inline-flex rounded-md shadow-sm">
                {processSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`relative inline-flex items-center justify-center w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                      activeStep === step.id 
                        ? step.color 
                        : 'bg-dark-700 hover:bg-dark-600'
                    }`}
                    aria-label={`View ${step.title}`}
                  >
                    {activeStep === step.id && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        animate={{ 
                          scale: [1, 1.8, 1],
                          opacity: [1, 0, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        style={{ backgroundColor: `var(--${step.color})` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesProcessStoryboard; 