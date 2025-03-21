import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  CheckCircle2,
  Star,
  Calendar,
  Send,
  FileEdit,
  BarChart3,
  Clock,
  Users,
  Smile,
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar as CalendarIcon,
  ArrowUp,
  Phone,
  MessageSquare
} from 'lucide-react';

const AIActionShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  // Reset animations when showcase item changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeIndex]);

  // Handle notification timeout
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showNotification]);
  
  // Define actions for the showcase buttons - moved inside component
  const handleSendCampaign = () => {
    // Create a React-based notification instead of DOM manipulation
    setNotificationMessage('Campaign successfully sent!');
    setShowNotification(true);
    
    // Here you would add the actual logic for sending the campaign, such as API calls
    console.log('Campaign sent event triggered');
  };

  const handleEditTemplate = () => {
    setNotificationMessage('Template editor opened');
    setShowNotification(true);
    console.log('Edit template clicked');
  };

  const handleActionButton = (action: string) => {
    setNotificationMessage(`${action} action triggered`);
    setShowNotification(true);
    console.log(`${action} button clicked`);
  };
  
  const nextItem = () => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  };
  
  const prevItem = () => {
    setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };
  
  // Define the showcase items inside the component so they can access handlers
  const showcaseItems = [
    {
      id: 'email-outreach',
      title: 'AI Crafts & Sends Personalized Emails',
      description: 'Watch as Enai analyzes prospect data, writes tailored messages, and automatically sends them at the optimal time.',
      mockup: (
        <div className="bg-dark-800 rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto border border-dark-700">
          {/* Email composition interface */}
          <div className="bg-dark-900 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">New Outreach Sequence</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-500 px-2 py-0.5 rounded text-xs">Active</span>
            </div>
          </div>
          
          <div className="p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-400/20 flex items-center justify-center text-primary-400 font-semibold mr-3">AI</div>
              <div>
                <h4 className="text-white font-medium">Enai Assistant</h4>
                <p className="text-xs text-gray-400">Working on your campaign</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Target Recipients</label>
                <span className="text-xs text-primary-400">42 prospects matched</span>
              </div>
              <div className="bg-dark-900 rounded-md p-2 flex items-center justify-between border border-dark-700">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-300">VP of Operations in SaaS Companies</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-300 block mb-2">Suggested Email Template</label>
              <div className="border border-dark-700 rounded-md p-3 bg-dark-900">
                <div className="mb-2">
                  <div className="text-sm text-gray-300 font-medium">Subject: </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="text-sm text-gray-400">Streamlining operations at {"{company_name}"}</span>
                  </motion.div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-300 font-medium">Message: </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-sm text-gray-400 mt-1">Hi {"{first_name}"},</p>
                    <p className="text-sm text-gray-400 mt-2">I noticed from your recent LinkedIn post that you're looking to optimize your team's workflow. </p>
                    <motion.p 
                      className="text-sm text-gray-400 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      We've helped companies like <span className="text-primary-400 font-medium">{"{competitor_name}"}</span> achieve <span className="text-primary-400 font-medium">42% efficiency gains</span> in their operations processes.
                    </motion.p>
                    <motion.p 
                      className="text-sm text-gray-400 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      Would you be open to a quick 15-minute call to explore if we could help you too?
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Sending Schedule</label>
                <span className="text-xs text-green-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Optimized timing
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-dark-700 rounded p-2 bg-dark-900">
                  <div className="text-xs text-gray-400">First Contact</div>
                  <div className="text-sm font-medium text-gray-300">Tuesday, 10:15 AM</div>
                </div>
                <div className="border border-dark-700 rounded p-2 bg-dark-900">
                  <div className="text-xs text-gray-400">Follow-up</div>
                  <div className="text-sm font-medium text-gray-300">Friday, 8:30 AM</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <motion.button 
                className="px-4 py-2 border border-primary-400 text-primary-400 rounded-md text-sm font-medium hover:bg-primary-400/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEditTemplate}
              >
                Edit Template
              </motion.button>
              <motion.button 
                className="px-4 py-2 bg-primary-400 text-white rounded-md text-sm font-medium flex items-center relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(79, 70, 229, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 1 }}
                animate={{
                  boxShadow: ['0 2px 8px rgba(79, 70, 229, 0.3)', '0 4px 12px rgba(22, 163, 74, 0.4)', '0 2px 8px rgba(79, 70, 229, 0.3)'],
                  backgroundColor: ['#4f46e5', '#16a34a', '#4f46e5'],
                  transition: { delay: 3, duration: 1 }
                }}
                onClick={handleSendCampaign}
                id="send-campaign-button"
                aria-label="Send campaign"
              >
                <Send className="w-4 h-4 mr-2 flex-shrink-0" />
                <motion.span
                  animate={{ 
                    opacity: [1, 0, 1],
                    transition: { delay: 3, duration: 1 }
                  }}
                  className="whitespace-nowrap"
                >
                  Run Campaign
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, width: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    width: ['0px', 'auto', '0px'],
                    transition: { delay: 3, duration: 1 }
                  }}
                  className="flex items-center justify-center whitespace-nowrap"
                >
                  <Check className="w-4 h-4 mr-1 flex-shrink-0" /> Sent!
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'lead-scoring',
      title: 'AI Scores & Prioritizes Your Best Leads',
      description: 'Enai analyzes thousands of data points to rank your prospects by fit, intent, and buying signals.',
      mockup: (
        <div className="bg-dark-800 rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto border border-dark-700">
          <div className="bg-indigo-900 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Lead Scoring Dashboard</span>
            </div>
            <div className="text-xs text-indigo-200">Updated 12 minutes ago</div>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-white font-bold text-lg">Today's Top Prospects</h3>
                <p className="text-sm text-gray-400">Scored by AI based on 48 signals</p>
              </div>
              <div className="bg-green-900/30 text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                17 new leads
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", title: "VP of Operations", company: "TechFlow Inc", score: 94, signals: ["Recent website visit", "Downloaded whitepaper", "LinkedIn engagement"] },
                { name: "Michael Chen", title: "CTO", company: "Quantum Systems", score: 87, signals: ["Event attendee", "Multiple page views", "Competitor customer"] },
                { name: "Alex Rivera", title: "Head of Sales", company: "NexGen Software", score: 82, signals: ["Email engagement", "Product demo request", "Budget discussion"] },
              ].map((lead, index) => (
                <motion.div 
                  key={index}
                  className="border border-dark-700 rounded-lg p-3 hover:border-primary-400 transition-all hover:shadow-md bg-dark-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-400/20 flex items-center justify-center text-indigo-400 font-semibold mr-3">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{lead.name}</h4>
                        <p className="text-xs text-gray-400">{lead.title} at {lead.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className={`text-lg font-bold ${
                        lead.score > 90 ? 'text-green-400' : 
                        lead.score > 80 ? 'text-yellow-400' : 'text-gray-400'
                      }`}>{lead.score}</span>
                      <span className="text-xs text-gray-500">Score</span>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="text-xs text-gray-400 mb-1">Key Signals:</div>
                    <div className="flex flex-wrap gap-1">
                      {lead.signals.map((signal, i) => (
                        <span key={i} className="text-xs bg-dark-800 px-2 py-0.5 rounded text-gray-300">
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3 space-x-2">
                    <button 
                      className="text-xs text-primary-400 flex items-center hover:underline"
                      onClick={() => handleActionButton('Message')}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Message
                    </button>
                    <button 
                      className="text-xs text-primary-400 flex items-center hover:underline"
                      onClick={() => handleActionButton('Call')}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call
                    </button>
                    <button 
                      className="text-xs text-primary-400 flex items-center hover:underline"
                      onClick={() => handleActionButton('Schedule')}
                    >
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      Schedule
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-5 flex items-center justify-between">
              <div className="text-sm text-gray-400">Showing 3 of 28 leads</div>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-1 border border-gray-700 rounded hover:border-primary-400"
                  onClick={prevItem}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400" />
                </button>
                <button 
                  className="p-1 border border-gray-700 rounded hover:border-primary-400"
                  onClick={nextItem}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'calendar-booking',
      title: 'AI Books Meetings & Follows Up Automatically',
      description: 'Enai coordinates meetings with prospects, sends reminders, and handles all the scheduling logistics for you.',
      mockup: (
        <div className="bg-dark-800 rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto border border-dark-700">
          <div className="bg-teal-900 text-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Automatic Meeting Scheduler</span>
            </div>
            <div className="text-xs text-teal-200">AI-powered</div>
          </div>
          
          <div className="p-5">
            <div className="mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-400/20 flex items-center justify-center text-teal-400 font-semibold mr-3">MR</div>
                <div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center">
                      <h4 className="text-white font-medium">Meeting with Michael Rodriguez</h4>
                      <span className="ml-2 bg-yellow-900/30 text-yellow-400 text-xs px-2 py-0.5 rounded-full">Lead</span>
                    </div>
                    <p className="text-xs text-gray-400">CTO at Enterprise Solutions Inc.</p>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div className="mb-5">
              <div className="flex justify-between mb-3">
                <div className="text-sm font-medium text-gray-300">Conversation History</div>
                <button 
                  className="text-xs text-teal-400 hover:underline"
                  onClick={() => handleActionButton('View all conversations')}
                >
                  View all
                </button>
              </div>
              
              <div className="space-y-3 mb-4">
                <motion.div 
                  className="bg-dark-900 rounded-lg p-2 text-sm border border-dark-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-xs text-gray-400 mb-1">Michael Rodriguez - 2 days ago</div>
                  <p className="text-gray-300">I'm interested in learning more about your solution. Could we set up a time to chat?</p>
                </motion.div>
                
                <motion.div 
                  className="bg-teal-900/30 rounded-lg p-2 text-sm ml-4 border border-teal-900/50"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-xs text-gray-400 mb-1">Enai AI - 2 days ago</div>
                  <p className="text-teal-300">Of course! I'd be happy to schedule a call. When would be a good time for you?</p>
                </motion.div>
                
                <motion.div 
                  className="bg-dark-900 rounded-lg p-2 text-sm border border-dark-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="text-xs text-gray-400 mb-1">Michael Rodriguez - 1 day ago</div>
                  <p className="text-gray-300">I'm available Thursday afternoon or Friday morning.</p>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              className="mb-5 border border-teal-900/50 rounded-lg p-3 bg-teal-900/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <div className="flex items-center text-teal-300 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-medium">AI Scheduled Meeting</span>
              </div>
              
              <div className="bg-dark-900 rounded-md p-3 border border-teal-900/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-teal-400 mr-2" />
                    <span className="text-white font-medium">Product Demo Call</span>
                  </div>
                  <span className="text-xs bg-teal-900/30 text-teal-300 px-2 py-0.5 rounded-full">Confirmed</span>
                </div>
                
                <div className="text-sm text-gray-300 mb-2">
                  <div><span className="text-gray-400">When:</span> Thursday, April 20 at 2:00 PM</div>
                  <div><span className="text-gray-400">Duration:</span> 30 minutes</div>
                </div>
                
                <div className="text-xs text-gray-400">
                  Calendar invites sent to michael@enterprisesolutions.com and your team
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <div className="text-sm font-medium text-gray-300 mb-2">Follow-up Actions (Automated)</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-300">Meeting confirmation email sent</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-gray-300">Calendar invite created and delivered</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-300">24-hour reminder scheduled for Wednesday</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-300">Post-meeting follow-up email prepared</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <motion.button 
                className="px-4 py-2 border border-teal-400 text-teal-400 rounded-md text-sm font-medium hover:bg-teal-400/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleActionButton('Edit Meeting Details')}
              >
                <FileEdit className="w-4 h-4 mr-1 inline-block" />
                Edit Details
              </motion.button>
              <motion.button 
                className="px-4 py-2 bg-teal-500 text-white rounded-md text-sm font-medium flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleActionButton('View Meeting Insights')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Meeting Insights
              </motion.button>
            </div>
          </div>
        </div>
      )
    },
  ];

  const activeItem = showcaseItems[activeIndex];
  
  return (
    <section className="py-24 bg-gradient-to-b from-dark-800 to-dark relative overflow-hidden">
      {/* Notification toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            {notificationMessage}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            See Enai AI in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience how our AI workers handle critical sales tasks with intelligence and precision
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Showcase Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <div className="max-w-lg">
              <h3 className="text-3xl font-bold text-white mb-4">{activeItem.title}</h3>
              <p className="text-gray-300 mb-8">{activeItem.description}</p>
              
              <div className="flex space-x-2 mb-8">
                {showcaseItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-primary-400 scale-125' : 'bg-dark-700 hover:bg-dark-600'
                    }`}
                    aria-label={`View showcase item ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={prevItem}
                  className="px-4 py-3 border border-dark-700 hover:border-primary-400 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </motion.button>
                <motion.button
                  onClick={nextItem}
                  className="px-4 py-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Showcase UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              {/* Glow effect behind mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl blur-xl transform scale-95 -z-10"></div>
              
              {/* UI Mockup */}
              <motion.div
                key={`${activeIndex}-${animationKey}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="transform perspective-1200 rotateY-3 rotateX-3 shadow-2xl"
              >
                {activeItem.mockup}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIActionShowcase;