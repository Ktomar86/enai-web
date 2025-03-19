import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Zap, 
  BookOpen, 
  Mail, 
  MessageSquare, 
  BarChart3,
  Target,
  Users,
  Bot,
  ChevronRight,
  Linkedin,
  LineChart,
  HeadphonesIcon,
  MapPin,
  User,
  Code,
  TrendingUp,
  Send,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Insights from './components/SuccessStories';
import SalesProcessGuide from './components/SalesProcessGuide';
import AIAgentShowcase from './components/AIAgentShowcase';
import Testimonials from './components/Testimonials';
import FeatureHighlights from './components/FeatureHighlights';
import SalesProcessStoryboard from './components/SalesProcessStoryboard';
import AIInsightsVisualizer from './components/AIInsightsVisualizer';
import AIActionShowcase from './components/AIActionShowcase';
import { motion } from 'framer-motion';

const solutions = [
  {
    title: 'AI Finds & Qualifies Your Ideal Leads',
    icon: <Target className="w-12 h-12 text-primary-400" />,
    description: 'Stop chasing cold leads that go nowhere',
    bullets: [
      'Automatically identifies perfect-fit prospects',
      'Scores leads based on 40+ buying signals',
      'Prioritizes high-intent accounts',
      'Continuously learns from conversion patterns'
    ]
  },
  {
    title: 'AI Researches Markets & Discovers Opportunities',
    icon: <BarChart3 className="w-12 h-12 text-primary-400" />,
    description: 'Turn market intelligence into competitive advantage',
    bullets: [
      'Maps your total addressable market',
      'Identifies untapped customer segments',
      'Tracks competitor strategies',
      'Predicts emerging market trends'
    ]
  },
  {
    title: 'AI Automates Your Entire Sales Process',
    icon: <Zap className="w-12 h-12 text-primary-400" />,
    description: 'Focus on strategy while AI handles the workflow',
    bullets: [
      'Creates multi-channel outreach campaigns',
      'Automates follow-ups and nurturing',
      'Books meetings without calendar conflicts',
      'Handles admin tasks and data entry'
    ]
  },
  {
    title: 'AI Provides 24/7 Intelligent Support',
    icon: <MessageSquare className="w-12 h-12 text-primary-400" />,
    description: 'Never miss a customer question again',
    bullets: [
      'Responds instantly to prospect inquiries',
      'Answers complex product questions',
      'Escalates important conversations to humans',
      'Gathers feedback and sentiment data'
    ]
  },
  {
    title: 'AI Creates & Personalizes All Content',
    icon: <BookOpen className="w-12 h-12 text-primary-400" />,
    description: 'Every message tailored to each recipient',
    bullets: [
      'Writes hyper-personalized email sequences',
      'Generates custom proposals and pitches',
      'Creates targeted social outreach',
      'Adapts messaging based on response data'
    ]
  },
  {
    title: 'AI Analyzes Performance & Optimizes Strategy',
    icon: <BarChart3 className="w-12 h-12 text-primary-400" />,
    description: 'Continuous improvement driven by data',
    bullets: [
      'Identifies bottlenecks in your pipeline',
      'Recommends tactical improvements',
      'Forecasts results with predictive modeling',
      'Surfaces insights you would otherwise miss'
    ]
  }
];

const aiTeam = [
  {
    name: 'LEO',
    icon: <Bot className="w-16 h-16 text-primary-400" />,
    description: 'Automates communication across email, SMS, voice, and video'
  },
  {
    name: 'ARES',
    icon: <Target className="w-16 h-16 text-primary-400" />,
    description: 'Advanced analytics for customer profiling and market niche targeting'
  },
  {
    name: 'ZEUS',
    icon: <MessageSquare className="w-16 h-16 text-primary-400" />,
    description: 'Voice call scheduling and follow-ups'
  },
  {
    name: 'TECHNO',
    icon: <BarChart3 className="w-16 h-16 text-primary-400" />,
    description: 'Tracks campaign performance with detailed insights'
  },
  {
    name: 'CRONUS',
    icon: <Mail className="w-16 h-16 text-primary-400" />,
    description: 'Generates personalized content for email and SMS'
  },
  {
    name: 'CLIO',
    icon: <Zap className="w-16 h-16 text-primary-400" />,
    description: 'Creates optimized sales funnels'
  }
];

function App() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message')
    };

    // Send email to madhav@enai.ai
    window.location.href = `mailto:madhav@enai.ai?subject=New Contact Form Submission&body=Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0ACompany: ${data.company}%0D%0AMessage: ${data.message}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-fade').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-800 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-red-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center scroll-fade relative z-10">
          <h1 className="mb-10">
            <span className="text-white text-lg md:text-2xl font-medium tracking-wider uppercase block mb-3">Meet Your New</span>
            <span className="text-6xl md:text-8xl font-bold tracking-tight ai-workers-text block leading-tight">AI WORKERS</span>
            <div className="h-1.5 w-48 md:w-80 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 mx-auto mt-5 rounded-full divider-animation"></div>
            <div className="h-px w-24 md:w-40 bg-gradient-to-r from-orange-400/30 to-yellow-400/30 mx-auto mt-2 rounded-full divider-animation-delayed"></div>
          </h1>
          <div className="w-full max-w-3xl mx-auto mb-8 h-px bg-dark-700/50"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed">
            Empower your business with our AI workers. Get a dedicated team of <span className="font-semibold text-white">AI agents</span> that understand your business and help you <span className="font-semibold text-white">scale efficiently</span>.
          </p>
{/*          <button
  onClick={() => window.open('about:blank', '_self')}
  className="start-free-btn bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-lg text-xl font-semibold inline-flex items-center group transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 border border-orange-400/20 pulse-subtle"
>
  Start Free
  <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform bounce-subtle" />
</button> */}



{/*         //<a 
         //   href = "/"        // href="https://login.enai.ai"
          //  target="_blank"
           // rel="noopener noreferrer"
           // className="start-free-btn bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-lg text-xl font-semibold inline-flex items-center group transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105 border border-orange-400/20 pulse-subtle"
         // >
           // Start Free
           // <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform bounce-subtle" />
          //</a> */}
        </div>
      </section>

      {/* ENHANCED: Visual Sales Process Storyboard */}
      <SalesProcessStoryboard />

      {/* NEW: Real UI Mockups Showcase */}
      <AIActionShowcase />

      {/* Feature Highlights */}
      <FeatureHighlights />

      {/* ENHANCED: Visual AI Insights */}
      <AIInsightsVisualizer />

      {/* AI Agent Showcase */}
      <AIAgentShowcase />

      {/* Why Choose ENAI */}
      <section id="features" className="py-24 bg-gradient-to-b from-dark-800 to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center gradient-text mb-16">Why Choose ENAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-dark-800 shadow-xl hover:shadow-2xl transition-shadow border border-dark-700 h-full">
              <Brain className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Intelligent Automation</h3>
              <p className="text-gray-300 text-center">Our AI agents are more than tools—they're virtual team members that adapt to your unique business needs, learning and evolving to provide optimal results over time.</p>
            </div>
            <div className="p-8 rounded-2xl bg-dark-800 shadow-xl hover:shadow-2xl transition-shadow border border-dark-700 h-full">
              <Zap className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Rapid Deployment</h3>
              <p className="text-gray-300 text-center">Pre-trained, customizable AI models</p>
            </div>
            <div className="p-8 rounded-2xl bg-dark-800 shadow-xl hover:shadow-2xl transition-shadow border border-dark-700 h-full">
              <Users className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Scalable and Cost-Effective</h3>
              <p className="text-gray-300 text-center">Scale your business operations without the need for extensive hiring or training. Our AI solutions are designed to grow alongside your business, ensuring cost efficiency at every stage.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-dark-800 shadow-xl hover:shadow-2xl transition-shadow border border-dark-700 h-full">
              <LineChart className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Real-Time Insights</h3>
              <p className="text-gray-300 text-center">Leverage real-time analytics and actionable insights to make informed decisions. Our AI workers provide detailed reports to help you optimize performance and maximize ROI.</p>
            </div>
            <div className="p-8 rounded-2xl bg-dark-800 shadow-xl hover:shadow-2xl transition-shadow border border-dark-700 h-full">
              <HeadphonesIcon className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-white text-center">Exceptional Support</h3>
              <p className="text-gray-300 text-center">We're with you every step of the way. Our dedicated support team ensures smooth implementation and provides ongoing assistance to help you achieve your business objectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center gradient-text mb-16">Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div 
                key={index} 
                className="card-hover p-8 rounded-2xl bg-dark-800 border border-dark-700 hover:border-primary-400 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
              >
                <div className="text-primary-400 mb-6">{solution.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{solution.title}</h3>
                <p className="text-gray-300 mb-5">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-primary-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Team */}
      <section id="team" className="py-24 bg-gradient-to-b from-dark to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center gradient-text mb-16">Meet Our AI Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTeam.map((member, index) => (
              <div key={index} className="p-8 rounded-2xl bg-dark-800 shadow-lg hover:shadow-xl transition-shadow border border-dark-700 text-center">
                <div className="mb-6 text-primary-400">{member.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{member.name}</h3>
                <p className="text-gray-300">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Insights */}
      <Insights />

      {/* Contact */}
      <section id="contact" className="py-24 bg-gradient-to-b from-dark-800 to-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl"></div>
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
            <h2 className="text-5xl font-bold gradient-text mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a question or ready to explore how our AI workers can transform your business? Reach out to us today.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:border-dark-600 transition-all duration-500"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-xl mb-6 mx-auto md:mx-0">
                <Mail className="w-8 h-8 text-primary-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">Contact Information</h3>
              
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 ml-4">
                    Unit 3, Bradbury's Court<br />
                    Lyon Rd, London HA1 2BY<br />
                    United Kingdom
                  </p>
                </div>
              </div>
              
              <h4 className="text-lg font-medium text-white mb-4 text-center md:text-left">Team</h4>
              <div className="space-y-5">
                <div className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white font-medium">Madhav Mohan</h5>
                      <a 
                        href="https://www.linkedin.com/in/madhavmohankatarya/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                        aria-label="Madhav Mohan's LinkedIn profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">Co-founder</span>
                      <a href="mailto:madhav@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                        madhav@enai.ai
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center">
                      <Code className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white font-medium">Nikhil Nehra</h5>
                      <a 
                        href="https://www.linkedin.com/in/nikhil-nehra-57716a23b/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                        aria-label="Nikhil Nehra's LinkedIn profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2"> Founder & CTO</span>
                      <a href="mailto:nikhil@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                        nikhil@enai.ai
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white font-medium">Zeeshan Idrees</h5>
                      <a 
                        href="https://www.linkedin.com/in/zidrees/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                        aria-label="Zeeshan Idrees's LinkedIn profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-2">CSO</span>
                      <a href="mailto:zeeshan@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                        zeeshan@enai.ai
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name <span className="text-primary-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address <span className="text-primary-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                    Company <span className="text-primary-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      placeholder="Your Company"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                    />
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message <span className="text-primary-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your project and how we can help..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                    />
                    <MessageSquare className="absolute left-3 top-6 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="privacy-policy"
                    name="privacy-policy"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-600 bg-dark-900 text-primary-400 focus:ring-primary-400"
                  />
                  <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-400">
                    I agree to the <a href="/privacy-policy" className="text-primary-400 hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-400 to-purple-500 text-white px-6 py-4 rounded-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </motion.button>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  We'll get back to you within 24 hours
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12 border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <img src="https://i.postimg.cc/5j48qtcH/logo.png" alt="ENAI" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold gradient-text">ENAI</span>
            </div>
            <div className="flex space-x-8 mb-8 md:mb-0">
              <Link 
                to="/privacy-policy"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/company/enai-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
