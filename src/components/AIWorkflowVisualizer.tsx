import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Clock,
  Mail,
  Calendar,
  CheckCircle2,
  UserPlus,
  MessageCircle,
  Search,
  BarChart3,
  Brain,
  PhoneCall,
  RefreshCcw,
  Sparkles,
  Award,
  Check,
  User,
  AlarmClock,
  Zap,
  ArrowRight
} from 'lucide-react';

const AIWorkflowVisualizer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Auto-advance steps when in view
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % workflowSteps.length);
      setIsAnimating(true);
      
      // Reset animation flag after animation completes
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView]);

  // Workflow steps showing how Enai works while you sleep
  const workflowSteps = [
    {
      title: "Lead Identification",
      description: "While you sleep, Enai scans databases and enriches profiles to find your ideal customers",
      icon: <Search className="w-8 h-8" />,
      color: "from-blue-400 to-blue-600",
      visualization: (
        <div className="relative h-64 w-full bg-dark-900/40 rounded-xl border border-dark-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="grid grid-cols-3 gap-3 w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-dark-800 rounded-lg p-2 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: i * 0.1 }
                  }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-2"
                    animate={{
                      scale: [1, 1.1, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: i * 0.2
                      }
                    }}
                  >
                    <User className="w-4 h-4 text-blue-400" />
                  </motion.div>
                  <motion.div 
                    className="w-full h-1 bg-blue-500/30 rounded-full overflow-hidden"
                  >
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="absolute bottom-3 right-3 p-2 rounded-lg bg-blue-500/10 border border-blue-500/30"
            animate={{
              opacity: [0.7, 1, 0.7],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <motion.div 
              className="flex items-center"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-xs text-blue-400">AI Processing</span>
            </motion.div>
          </motion.div>
        </div>
      )
    },
    {
      title: "Personalized Outreach",
      description: "Enai crafts personalized messages tailored to each prospect's needs and pain points",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-green-400 to-emerald-600",
      visualization: (
        <div className="relative h-64 w-full bg-dark-900/40 rounded-xl border border-dark-700 overflow-hidden">
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="w-full max-w-sm bg-dark-800 rounded-lg p-4 shadow-lg border border-dark-700 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 text-green-400 mr-2" />
                <div className="text-sm font-medium text-white">Personalized Email</div>
              </div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="h-3 bg-dark-700 rounded-full w-full"
                  initial={{ width: "60%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
                <motion.div 
                  className="h-3 bg-dark-700 rounded-full w-3/4"
                  initial={{ width: "40%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
                <motion.div 
                  className="h-3 bg-dark-700 rounded-full w-1/2"
                  initial={{ width: "20%" }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.div>
              
              <motion.div
                className="mt-4 bg-green-500/20 text-green-400 text-xs p-2 rounded flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                <span>Optimized for 68% open rate</span>
              </motion.div>
            </motion.div>
            
            <div className="flex justify-between w-full max-w-sm">
              {["LinkedIn", "Email", "SMS"].map((channel, idx) => (
                <motion.div
                  key={channel}
                  className="flex flex-col items-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.2 }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 rgba(16, 185, 129, 0.4)",
                        "0 0 20px rgba(16, 185, 129, 0.6)",
                        "0 0 0 rgba(16, 185, 129, 0.4)"
                      ]
                    }}
                    transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }}
                  >
                    {idx === 0 && <UserPlus className="w-5 h-5 text-green-400" />}
                    {idx === 1 && <Mail className="w-5 h-5 text-green-400" />}
                    {idx === 2 && <PhoneCall className="w-5 h-5 text-green-400" />}
                  </motion.div>
                  <span className="text-xs text-gray-400">{channel}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      title: "24/7 Response Monitoring",
      description: "Enai monitors all channels for responses and engages leads in real-time, any time of day",
      icon: <AlarmClock className="w-8 h-8" />,
      color: "from-purple-400 to-indigo-600",
      visualization: (
        <div className="relative h-64 w-full bg-dark-900/40 rounded-xl border border-dark-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 24-hour clock visualization */}
            <motion.div 
              className="relative w-40 h-40 rounded-full border-4 border-purple-500/30 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Clock markings */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-3 bg-purple-400/50"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-62px)`,
                    transformOrigin: "center center"
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
              
              {/* Clock hands */}
              <motion.div 
                className="absolute w-1 h-16 bg-gradient-to-t from-transparent to-purple-500 rounded-full"
                style={{ transformOrigin: "bottom center" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute w-1 h-12 bg-gradient-to-t from-transparent to-indigo-500 rounded-full"
                style={{ transformOrigin: "bottom center" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center dot */}
              <motion.div 
                className="w-4 h-4 rounded-full bg-purple-500"
                animate={{ 
                  boxShadow: [
                    "0 0 0 rgba(168, 85, 247, 0.4)",
                    "0 0 20px rgba(168, 85, 247, 0.8)",
                    "0 0 0 rgba(168, 85, 247, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
          
          {/* Notification bubbles */}
          <div className="absolute inset-0">
            {["top-10 right-12", "bottom-10 left-10", "top-1/2 right-8", "bottom-20 right-20"].map((position, i) => (
              <motion.div 
                key={i}
                className={`absolute ${position} bg-dark-800 rounded-lg p-2 flex items-center border border-purple-500/30`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  scale: { delay: i * 0.3 + 0.5, duration: 0.5 },
                  opacity: { delay: i * 0.3 + 0.5, duration: 0.5 },
                  y: { 
                    delay: i * 0.3 + 1, 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <motion.div 
                  className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    backgroundColor: ["rgba(168, 85, 247, 0.2)", "rgba(168, 85, 247, 0.4)", "rgba(168, 85, 247, 0.2)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {i % 3 === 0 && <Mail className="w-3 h-3 text-purple-400" />}
                  {i % 3 === 1 && <MessageCircle className="w-3 h-3 text-purple-400" />}
                  {i % 3 === 2 && <Calendar className="w-3 h-3 text-purple-400" />}
                </motion.div>
                <div className="text-xs text-purple-300">
                  {i % 2 === 0 ? "New response" : "Meeting request"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Automatic Meeting Scheduling",
      description: "Enai handles calendar coordination, sends confirmations, and ensures your schedule stays full",
      icon: <Calendar className="w-8 h-8" />,
      color: "from-amber-400 to-orange-600",
      visualization: (
        <div className="relative h-64 w-full bg-dark-900/40 rounded-xl border border-dark-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-full max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Calendar visualization */}
              <motion.div 
                className="bg-dark-800 rounded-lg border border-amber-500/30 p-3 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white font-medium text-sm">November 2023</div>
                  <div className="flex">
                    <div className="w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:bg-dark-700">
                      <ArrowRight className="w-3 h-3 transform rotate-180" />
                    </div>
                    <div className="w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:bg-dark-700 ml-1">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                    <div key={`header-${i}`} className="text-center text-xs text-gray-500 py-1">{day}</div>
                  ))}
                  
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                    <motion.div 
                      key={`date-${date}`}
                      className={`text-center text-xs py-1 rounded-sm ${
                        [8, 15, 22, 25].includes(date) 
                          ? 'bg-amber-500/30 text-amber-300' 
                          : 'text-gray-400 hover:bg-dark-700'
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: date * 0.02 }}
                    >
                      {date}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Meeting confirmations */}
              <div className="space-y-2">
                {[
                  { time: "3:00 PM", client: "Acme Corp", date: "Today" },
                  { time: "10:30 AM", client: "Globex Inc", date: "Tomorrow" }
                ].map((meeting, i) => (
                  <motion.div 
                    key={`meeting-${i}`}
                    className="flex items-center bg-dark-800 rounded-lg p-2 border border-amber-500/20"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3"
                      animate={{
                        scale: [1, 1.1, 1],
                        backgroundColor: ["rgba(251, 191, 36, 0.2)", "rgba(251, 191, 36, 0.3)", "rgba(251, 191, 36, 0.2)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <Calendar className="w-4 h-4 text-amber-400" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-white mb-0.5">{meeting.client}</div>
                      <div className="text-xs text-gray-400">{meeting.time} · {meeting.date}</div>
                    </div>
                    <motion.div 
                      className="bg-amber-500/20 rounded-full p-1"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 1, delay: 0.8 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Follow-Ups",
      description: "Enai ensures no lead falls through the cracks with intelligent, timely follow-ups",
      icon: <RefreshCcw className="w-8 h-8" />,
      color: "from-red-400 to-rose-600",
      visualization: (
        <div className="relative h-64 w-full bg-dark-900/40 rounded-xl border border-dark-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Follow-up sequence timeline */}
              <div className="relative pl-8 pb-2">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-red-500/30" />
                
                {[
                  { day: "Day 1", action: "Initial Contact", status: "Sent" },
                  { day: "Day 3", action: "Value-Add Follow-Up", status: "Scheduled" },
                  { day: "Day 7", action: "Case Study Share", status: "Planned" },
                  { day: "Day 14", action: "Final Check-In", status: "Planned" }
                ].map((step, i) => (
                  <motion.div 
                    key={`step-${i}`}
                    className="mb-4 relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <motion.div 
                      className={`absolute left-0 w-6 h-6 -ml-3 rounded-full flex items-center justify-center
                        ${i === 0 ? 'bg-red-500' : 'bg-dark-800 border border-red-500/50'}`}
                      animate={i === 0 ? {
                        boxShadow: [
                          "0 0 0 rgba(239, 68, 68, 0.4)",
                          "0 0 15px rgba(239, 68, 68, 0.6)",
                          "0 0 0 rgba(239, 68, 68, 0.4)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {i === 0 && <Check className="w-3 h-3 text-white" />}
                    </motion.div>
                    
                    <div className="bg-dark-800 rounded-lg p-3 border border-red-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-white">{step.day}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          i === 0 ? 'bg-red-500/20 text-red-400' : 
                          i === 1 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mt-1">{step.action}</div>
                      
                      {i === 0 && (
                        <motion.div 
                          className="mt-2 flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <Mail className="w-3 h-3 text-red-400 mr-1" />
                          <div className="text-xs text-gray-400">Opened 2 hours ago</div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 mx-auto max-w-xs flex items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Zap className="w-4 h-4 text-red-400 mr-2" />
                <span className="text-xs text-red-300">Smart follow-ups increase response rates by 78%</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Performance Analytics",
      description: "Enai tracks all activities and provides insights to continuously improve your outreach",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-sky-400 to-cyan-600",
      visualization: (
        <div className="relative h-64 w-full bg-dark-900/40 rounded-xl border border-dark-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Chart visualizations */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <motion.div 
                  className="bg-dark-800 rounded-lg p-3 border border-sky-500/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-xs text-gray-400 mb-2">Response Rate</div>
                  <div className="flex items-end h-20 space-x-1">
                    {[30, 45, 42, 60, 72, 65, 78].map((value, i) => (
                      <motion.div 
                        key={`bar-${i}`}
                        className="flex-1 bg-gradient-to-t from-sky-500/40 to-sky-400/80 rounded-t"
                        style={{ height: `${value}%` }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 * i }}
                      />
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-dark-800 rounded-lg p-3 border border-sky-500/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-xs text-gray-400 mb-2">Meetings Booked</div>
                  <div className="flex items-center justify-center h-20">
                    <div className="relative h-16 w-16">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <motion.path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(14, 165, 233, 0.2)"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                        />
                        <motion.path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="3"
                          strokeDasharray="100, 100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 35 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="text-lg font-semibold text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.7 }}
                        >
                          65%
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="bg-dark-800 rounded-lg p-3 border border-sky-500/30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-xs text-gray-400 mb-2">Key Insights</div>
                <div className="space-y-2">
                  {[
                    "Best time to send: Tuesdays at 10 AM",
                    "Most engaging subject line: \"Quick question about...\"",
                    "Follow-up sweet spot: 3 days after initial contact"
                  ].map((insight, i) => (
                    <motion.div 
                      key={`insight-${i}`}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + (i * 0.2) }}
                    >
                      <motion.div 
                        className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center mr-2"
                        animate={{
                          scale: [1, 1.2, 1],
                          backgroundColor: ["rgba(14, 165, 233, 0.2)", "rgba(14, 165, 233, 0.4)", "rgba(14, 165, 233, 0.2)"]
                        }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      >
                        <Sparkles className="w-3 h-3 text-sky-400" />
                      </motion.div>
                      <div className="text-xs text-white">{insight}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-dark-900 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            How Enai Books Meetings While You Sleep
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our AI workers handle your entire outreach process 24/7, ensuring you wake up to a calendar full of qualified meetings
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Step Selection */}
          <div className="space-y-4 order-2 md:order-1">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-500 border ${
                  activeStep === index
                    ? `bg-dark-800/80 backdrop-blur-sm border-${step.color.split(' ')[0].replace('from-', '')} shadow-lg`
                    : 'bg-dark-900/60 backdrop-blur-sm border-dark-700 hover:border-gray-600'
                }`}
                onClick={() => setActiveStep(index)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} bg-opacity-20 flex items-center justify-center mr-4`}>
                    {React.cloneElement(step.icon as React.ReactElement, { 
                      className: "w-5 h-5 text-white"
                    })}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {activeStep === index && (
                  <motion.div 
                    className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-4"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Visualization Area */}
          <div className="order-1 md:order-2">
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${workflowSteps[activeStep].color} flex items-center justify-center mr-4`}>
                  {React.cloneElement(workflowSteps[activeStep].icon as React.ReactElement, { 
                    className: "w-6 h-6 text-white"
                  })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {workflowSteps[activeStep].title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {workflowSteps[activeStep].description}
                  </p>
                </div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visualization-${activeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {workflowSteps[activeStep].visualization}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl px-6 py-4">
            <div className="flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-400 mr-3" />
              <span className="text-lg font-medium text-white">Your AI team works 24/7 so you don't have to</span>
            </div>
          </div>
          
          <div className="mt-12">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Clock className="w-5 h-5 mr-2" />
              See AI Automation in Action
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIWorkflowVisualizer; 