import React, { useEffect } from 'react';
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
import ElevenLabsOrb from './components/ElevenLabsOrb';
import HeroScene from './components/HeroScene';
import { motion } from 'framer-motion';
// Import Shadcn UI components
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';

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
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-900 relative overflow-hidden" aria-labelledby="hero-heading">
        {/* 3D Mountain Scene with Lost Orb */}
        <HeroScene />
        
        {/* Additional tech elements layered on top */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
          {/* Animated grid lines - darker and more subtle */}
          <motion.div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(247, 183, 51, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(247, 183, 51, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 2 }}
          />

          {/* Digital particles layered on top - more refined */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 id="hero-heading" className="mb-10">
              <motion.span 
                className="text-white text-lg md:text-2xl font-medium tracking-wider uppercase block mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Meet Your New
              </motion.span>
              <motion.span 
                className="text-6xl md:text-8xl font-bold tracking-tight ai-workers-text block leading-tight"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              >
                AI WORKERS
              </motion.span>
              {/* Enhanced hero border - darker, cleaner, and more polished */}
              <motion.div 
                className="h-2 w-48 md:w-80 bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 mx-auto mt-5 rounded-full shadow-sm shadow-orange-500/20"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                style={{ 
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)' 
                }}
                aria-hidden="true"
              />
              <motion.div 
                className="h-px w-24 md:w-40 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 mx-auto mt-2 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                style={{ 
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
                aria-hidden="true"
              />
            </h1>
          </motion.div>
          <Separator className="w-full max-w-3xl mx-auto mb-8 opacity-30" />
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Empower your business with our AI workers. Get a dedicated team of <motion.span 
              className="font-semibold text-white relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10">AI agents</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 to-yellow-400"
                layoutId="highlight"
                aria-hidden="true"
              />
            </motion.span> that understand your business and help you <motion.span 
              className="font-semibold text-white relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10">scale efficiently</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-orange-400 to-yellow-400"
                layoutId="highlight"
                aria-hidden="true"
              />
            </motion.span>.
          </motion.p>

          <motion.div 
            className="flex justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button 
                size="lg"
                variant="default"
                className="px-8 py-7 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg text-white font-medium shadow-lg shadow-primary-500/30 relative overflow-hidden group mx-4 text-lg"
                onClick={() => window.open("https://calendly.com/enai-ai2024/30min", "_blank")}
                aria-label="Schedule a demo with Enai.ai"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mr-2"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    aria-hidden="true"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </motion.svg>
                  Get Demo
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-white/20 to-primary-500/0"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  aria-hidden="true"
                />
                <motion.div 
                  className="absolute -inset-1 rounded-lg"
                  style={{ 
                    background: "linear-gradient(90deg, #f97316, #facc15, #f97316)", 
                    backgroundSize: "200% 200%",
                    zIndex: -1, 
                    filter: "blur(8px)" 
                  }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.5 }}
                  aria-hidden="true"
                />
              </Button>
            </motion.div>
          </motion.div>
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
      <section id="features" className="py-24 bg-gradient-to-b from-dark-800 to-dark" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="features-heading" className="text-4xl font-bold text-center gradient-text mb-6">Why Choose ENAI?</h2>
          <Separator className="mb-16 max-w-md mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-dark-800 border-dark-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-400/10" aria-hidden="true">
                    <Brain className="w-10 h-10 text-primary-400" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white text-center">Intelligent Automation</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Our AI agents are more than tools—they're virtual team members that adapt to your unique business needs, learning and evolving to provide optimal results over time.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-dark-800 border-dark-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-400/10" aria-hidden="true">
                    <Zap className="w-10 h-10 text-primary-400" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white text-center">Rapid Deployment</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Pre-trained, customizable AI models</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-800 border-dark-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-400/10" aria-hidden="true">
                    <Users className="w-10 h-10 text-primary-400" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white text-center">Scalable and Cost-Effective</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Scale your business operations without the need for extensive hiring or training. Our AI solutions are designed to grow alongside your business, ensuring cost efficiency at every stage.</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            <Card className="bg-dark-800 border-dark-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-400/10" aria-hidden="true">
                    <LineChart className="w-10 h-10 text-primary-400" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white text-center">Real-Time Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Leverage real-time analytics and actionable insights to make informed decisions. Our AI workers provide detailed reports to help you optimize performance and maximize ROI.</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-800 border-dark-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-400/10" aria-hidden="true">
                    <HeadphonesIcon className="w-10 h-10 text-primary-400" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white text-center">Exceptional Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>We're with you every step of the way. Our dedicated support team ensures smooth implementation and provides ongoing assistance to help you achieve your business objectives.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-24 bg-dark" aria-labelledby="solutions-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="solutions-heading" className="text-4xl font-bold text-center gradient-text mb-6">Solutions</h2>
          <Separator className="mb-16 max-w-md mx-auto" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-dark-800 border-dark-700 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="text-primary-400 mb-2" aria-hidden="true">{solution.icon}</div>
                    <CardTitle className="text-xl text-white">{solution.title}</CardTitle>
                    <CardDescription className="text-gray-300">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2" aria-label={`Benefits of ${solution.title}`}>
                      {solution.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-primary-400 mt-1 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Team */}
      <section id="team" className="py-24 bg-gradient-to-b from-dark to-dark-800" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="team-heading" className="text-4xl font-bold text-center gradient-text mb-6">Meet Our AI Team</h2>
          <Separator className="mb-16 max-w-md mx-auto" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTeam.map((member, index) => (
              <Card key={index} className="bg-dark-800 border-dark-700 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="mb-4 text-primary-400 flex justify-center" aria-hidden="true">{member.icon}</div>
                  <CardTitle className="text-2xl text-white">
                    <Badge variant="outline" className="text-lg px-4 py-1 bg-primary-400/10 border-primary-400/20">
                      {member.name}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Insights */}
      <Insights />

      {/* Contact */}
      <section id="contact" className="py-24 bg-gradient-to-b from-dark-800 to-dark relative overflow-hidden" aria-labelledby="contact-heading">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
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
            <h2 id="contact-heading" className="text-5xl font-bold gradient-text mb-4">Get in Touch</h2>
            <Separator className="mb-4 max-w-md mx-auto" />
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
            >
              <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-700 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-xl mb-6 mx-auto md:mx-0" aria-hidden="true">
                    <Mail className="w-8 h-8 text-primary-400" />
                  </div>
                  <CardTitle className="text-2xl text-white text-center md:text-left">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <div className="flex items-start mb-4">
                      <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" aria-hidden="true" />
                      <address className="text-gray-300 ml-4 not-italic">
                        Unit 3, Bradbury's Court<br />
                        Lyon Rd, London HA1 2BY<br />
                        United Kingdom
                      </address>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-medium text-white mb-4 text-center md:text-left">Team</h4>
                  <ul className="space-y-5">
                    <li className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center" aria-hidden="true">
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
                          <Badge variant="outline" className="mr-2 px-2 py-0 text-xs">Co-founder</Badge>
                          <a href="mailto:madhav@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                            madhav@enai.ai
                          </a>
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center" aria-hidden="true">
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
                          <Badge variant="outline" className="mr-2 px-2 py-0 text-xs">Founder & CTO</Badge>
                          <a href="mailto:nikhil@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                            nikhil@enai.ai
                          </a>
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center" aria-hidden="true">
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
                          <Badge variant="outline" className="mr-2 px-2 py-0 text-xs">CSO</Badge>
                          <a href="mailto:zeeshan@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                            zeeshan@enai.ai
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-dark-800/80 backdrop-blur-sm border-dark-700 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                            aria-required="true"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                            aria-required="true"
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                        Company <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          placeholder="Your Company"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                          aria-required="true"
                        />
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          placeholder="Tell us about your project and how we can help..."
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900 border border-dark-700 text-white input-glow focus:border-primary-400 transition-all duration-300"
                          aria-required="true"
                        />
                        <MessageSquare className="absolute left-3 top-6 w-4 h-4 text-gray-500" aria-hidden="true" />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="privacy-policy"
                        name="privacy-policy"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-600 bg-dark-900 text-primary-400 focus:ring-primary-400"
                        aria-required="true"
                      />
                      <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-400">
                        I agree to the <Link to="/privacy-policy" className="text-primary-400 hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-400 to-purple-500 text-white px-6 py-6 rounded-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      Send Message
                    </Button>
                    
                    <p className="text-xs text-gray-400 text-center mt-4">
                      We'll get back to you within 24 hours
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12 border-t border-dark-800" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <img 
                src="/enai-logo.png" 
                alt="ENAI Logo" 
                className="h-10 filter brightness-0 invert" 
                width="40"
                height="40"
              />
              <span className="ml-2 text-xl font-bold text-orange-500">ENAI</span>
            </div>
            <nav aria-label="Footer Navigation">
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
            </nav>
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/company/enai-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-primary-400 transition-colors"
                aria-label="Visit Enai on LinkedIn"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Enai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <ElevenLabsOrb agentId="FeDHh9EmNfMMKCvrYZyn" className="w-80 h-80" aria-label="AI Assistant Chat" />
      </div>
    </div>
  );
}

export default App;
