import { useEffect } from 'react';
import { 
  ChevronRight, 
  Target,
  MessageSquare,
  BarChart3,
  Calendar,
  Zap,
  Users
} from 'lucide-react';
import Navigation from './components/Navigation';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

// Enhanced SEO data for the About Us page
const SEO_DATA = {
  title: "About Enai | AI-Powered Sales Automation & Lead Generation Platform",
  description: "Discover how Enai's AI sales automation platform helps sales teams eliminate manual prospecting, qualify leads, and scale outreach. Learn about our mission, values, and the technology behind our platform.",
  keywords: "AI sales automation, Enai AI, sales platform, sales outreach, lead generation, AI sales assistant, B2B sales automation, AI prospecting tools, sales team efficiency, automated lead qualification",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Enai",
    "url": "https://enai.ai",
    "logo": "https://i.postimg.cc/5j48qtcH/logo.png",
    "description": "Enai is an AI-powered sales automation platform that helps sales teams scale faster by eliminating manual prospecting and streamlining outreach.",
    "foundingDate": "2024",
    "founders": [{
      "@type": "Person",
      "name": "Enai Founding Team"
    }],
    "sameAs": [
      "https://linkedin.com/company/enai-ai",
      "https://twitter.com/enai_ai"
    ]
  }
};

function AboutUs() {
  // Data for AI assistant activities
  const aiActivityData = [
    { text: "Finding new prospects...", delay: 0 },
    { text: "Qualifying leads...", delay: 5 },
    { text: "Sending personalized emails...", delay: 10 },
    { text: "Analyzing response data...", delay: 15 },
    { text: "Scheduling follow-ups...", delay: 20 },
    { text: "Lead converted!", delay: 25, isHighlight: true },
    { text: "Generating sales insights...", delay: 30 },
  ];

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
    <div className="min-h-screen bg-dark text-white relative">
      {/* Enhanced SEO Optimization */}
      <Helmet>
        <title>{SEO_DATA.title}</title>
        <meta name="description" content={SEO_DATA.description} />
        <meta name="keywords" content={SEO_DATA.keywords} />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={SEO_DATA.title} />
        <meta property="og:description" content={SEO_DATA.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://enai.ai/about-us" />
        <meta property="og:image" content="https://i.postimg.cc/5j48qtcH/logo.png" />
        <meta property="og:site_name" content="Enai" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@enai_ai" />
        <meta name="twitter:title" content={SEO_DATA.title} />
        <meta name="twitter:description" content={SEO_DATA.description} />
        <meta name="twitter:image" content="https://i.postimg.cc/5j48qtcH/logo.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://enai.ai/about-us" />
        
        {/* Structured data for better search engine understanding */}
        <script type="application/ld+json">
          {JSON.stringify(SEO_DATA.structuredData)}
        </script>
      </Helmet>
      <Navigation />
      
      {/* Persistent AI Assistant - Floating indicator showing Enai working */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-8 right-8 z-50 hidden md:block"
      >
        <div className="relative">
          {/* AI Assistant Circle */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl shadow-orange-500/20 cursor-pointer border-2 border-orange-400/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="w-12 h-12 rounded-full border border-dashed border-white/80 flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  scale: [0.9, 1, 0.9],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <span className="font-bold text-white text-xs">ENAI</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* AI Activity Indicator */}
          <div className="absolute bottom-0 right-16 min-w-[180px]">
            {aiActivityData.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [10, 0, -10],
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatDelay: 28, // Total cycle time minus animation duration
                  duration: 3,
                  delay: activity.delay,
                  ease: "easeInOut"
                }}
                className={`${activity.isHighlight ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-dark-800'} 
                  px-3 py-1.5 rounded-md text-xs font-medium shadow-lg 
                  ${activity.isHighlight ? 'text-white' : 'text-gray-200'} 
                  border ${activity.isHighlight ? 'border-orange-400' : 'border-dark-700'}
                  absolute bottom-0 right-0
                `}
              >
                {activity.text}
              </motion.div>
            ))}
          </div>
          
          {/* Pulse effect */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
              ease: "easeOut"
            }}
            className="absolute inset-0 rounded-full bg-orange-500/30"
          />
        </div>
      </motion.div>

      {/* Hero Section: Enhanced with Animations */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
              opacity: [0.2, 0.3, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-red-500/10 rounded-full blur-3xl"
          />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-10">
              <span className="text-6xl md:text-8xl font-bold tracking-tight ai-workers-text block leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400">
                  AI-Powered Sales Automation
                </span>
              </span>
              <span className="text-4xl md:text-5xl font-bold block mt-4">for High-Performance Teams</span>
            </h1>
            <div className="w-full max-w-3xl mx-auto mb-8 h-px bg-dark-700/50"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Enai is redefining how sales teams prospect, qualify, and convert leads—24/7, powered by AI.
            </p>
          </motion.div>
          
          {/* Animated workflow illustration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative z-10 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              {/* Animated workflow - Step 1 */}
              <motion.div 
                initial={{ y: 10, opacity: 0.8 }}
                animate={{ y: [10, 0, 10], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-dark border border-dark-700 hover:border-orange-500/50 rounded-lg p-4 md:p-6 text-center transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1">Prospect</h3>
                <p className="text-xs md:text-sm text-gray-400">AI finds & qualifies ideal leads</p>
              </motion.div>
              
              {/* Animated workflow - Step 2 */}
              <motion.div 
                initial={{ y: 10, opacity: 0.8 }}
                animate={{ y: [10, 0, 10], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                className="bg-dark border border-dark-700 hover:border-orange-500/50 rounded-lg p-4 md:p-6 text-center transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1">Engage</h3>
                <p className="text-xs md:text-sm text-gray-400">Multi-channel outreach at scale</p>
              </motion.div>
              
              {/* Animated workflow - Step 3 */}
              <motion.div 
                initial={{ y: 10, opacity: 0.8 }}
                animate={{ y: [10, 0, 10], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                className="bg-dark border border-dark-700 hover:border-orange-500/50 rounded-lg p-4 md:p-6 text-center transition-all duration-300"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1">Convert</h3>
                <p className="text-xs md:text-sm text-gray-400">Book meetings & close deals</p>
              </motion.div>
            </div>
            
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-[29%] w-[8%] h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 left-0 w-12 h-px bg-orange-400"
              />
            </div>
            <div className="hidden md:block absolute top-1/2 right-[29%] w-[8%] h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute top-0 left-0 w-12 h-px bg-orange-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Timeline Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400">
                  Our Journey
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From idea to innovation: how we've transformed the sales automation landscape
              </p>
            </motion.div>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500/50 via-yellow-500/50 to-red-500/50 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {/* 2024 - Founding */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                    <div className="bg-dark-900 border border-dark-700 rounded-xl p-8 hover:border-orange-500/30 transition-colors duration-300 shadow-xl">
                      <span className="inline-block text-orange-400 font-bold text-xl mb-2">2024</span>
                      <h3 className="text-2xl font-bold text-white mb-4">🚀 Founding & Vision</h3>
                      <p className="text-gray-300">Enai was founded with a mission to transform sales automation through AI-driven innovation. Our team recognized the inefficiencies in traditional sales processes, where businesses lose valuable time on manual prospecting and unqualified leads. Enai was built to automate, optimize, and accelerate sales workflows using cutting-edge AI technology.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left hidden md:block"></div>
                </div>
              </motion.div>
              
              {/* 2024 - Beta Launch */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 hidden md:block"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left">
                    <div className="bg-dark-900 border border-dark-700 rounded-xl p-8 hover:border-orange-500/30 transition-colors duration-300 shadow-xl">
                      <span className="inline-block text-orange-400 font-bold text-xl mb-2">2025</span>
                      <h3 className="text-2xl font-bold text-white mb-4">🔬 Beta Launch & Early Success</h3>
                      <p className="text-gray-300">In our first year, we launched a closed beta with select clients, testing our AI-driven approach to lead qualification and outreach. Our models quickly demonstrated a significant increase in engagement rates and precision in targeting high-intent leads—proving that AI-powered sales automation can outperform conventional methods.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* 2025 & Beyond */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                    <div className="bg-dark-900 border border-dark-700 rounded-xl p-8 hover:border-orange-500/30 transition-colors duration-300 shadow-xl">
                      <span className="inline-block text-orange-400 font-bold text-xl mb-2">2025 & Beyond</span>
                      <h3 className="text-2xl font-bold text-white mb-4">📈 Expanding Capabilities</h3>
                      <p className="text-gray-300">Enai is growing, refining its AI models, and expanding integrations with CRM systems and outreach platforms. As we scale, our focus remains on enhancing accuracy in lead qualification, optimizing outreach timing, and improving workflow automation to support sales teams in various industries.</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left hidden md:block"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* "Who We Are" Section with AI Assistant Visualization */}
      <section className="py-24 relative">
        {/* Dynamic background with pulsing elements */}
        <div className="absolute inset-0 bg-dark-900 overflow-hidden">
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              y: [0, -20, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-radial from-dark-800 to-transparent opacity-20"
          />
          {/* Animated grid pattern */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,102,0,0.05) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(255,102,0,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '-1px -1px'
          }}>
            <motion.div 
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-dark/50 via-transparent to-dark/80"
            />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - "Who is Enai" card */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-10 md:p-12 shadow-2xl"
            >
              <h2 className="text-4xl font-bold text-dark mb-8">Who is Enai?</h2>
              <p className="text-xl text-gray-700 mb-6">
                Enai is an AI-powered <span className="font-semibold">sales automation platform</span> designed to <span className="font-semibold">eliminate manual prospecting</span> and streamline outreach.
              </p>
              <p className="text-xl text-gray-700">
                Our mission is to <span className="font-semibold">help sales teams scale faster</span>, close more deals, and <span className="font-semibold">leverage AI-driven automation</span> to outperform the competition.
              </p>
            </motion.div>
            
            {/* Right side - Enhanced AI Message Generation Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px] bg-dark-900 rounded-2xl overflow-hidden border border-dark-700 p-6 shadow-2xl shadow-orange-500/10"
            >
              {/* Chat Interface Simulation */}
              <div className="absolute inset-0 flex flex-col p-4 z-10">
                {/* Chat Header */}
                <div className="flex items-center justify-between mb-4 border-b border-dark-700/80 pb-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center border border-orange-400/30 shadow-lg shadow-orange-500/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="w-8 h-8 rounded-full border border-dashed border-white/40 flex items-center justify-center"
                      >
                        <span className="text-sm font-bold text-white">ENAI</span>
                      </motion.div>
                    </motion.div>
                    <div className="ml-3">
                      <h3 className="text-white font-semibold">Enai Assistant</h3>
                      <div className="flex items-center">
                        <motion.span 
                          className="h-2 w-2 rounded-full bg-green-500 mr-2"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-xs text-green-500">Online & Ready</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <motion.div 
                      whileHover={{ backgroundColor: '#f97316' }}
                      className="w-2 h-2 rounded-full bg-gray-500 cursor-pointer"
                    />
                    <motion.div 
                      whileHover={{ backgroundColor: '#f97316' }}
                      className="w-2 h-2 rounded-full bg-gray-500 cursor-pointer"
                    />
                    <motion.div 
                      whileHover={{ backgroundColor: '#f97316' }}
                      className="w-2 h-2 rounded-full bg-gray-500 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 relative">
                  {/* Dynamic background elements */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 10,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* User Message */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-end"
                  >
                    <div className="flex items-end gap-2 max-w-[85%]">
                      <div className="max-w-full bg-orange-500/20 text-white p-3 rounded-lg rounded-tr-none border border-orange-500/10 shadow-md">
                        <p className="text-sm">Hi Enai, I need to find some new <span className="text-orange-300 font-medium">leads</span> for our SaaS product</p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 border border-gray-600/30">
                        <span className="text-xs font-bold text-gray-300">JD</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* AI Thinking Animation */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="flex"
                  >
                    <div className="max-w-[80%] bg-dark-700 p-3 rounded-lg rounded-tl-none relative overflow-hidden">
                      <motion.div
                        className="flex space-x-2 items-center py-1"
                      >
                        <motion.span 
                          className="text-sm text-white"
                        >
                          Enai is thinking
                        </motion.span>
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0.3 }}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ 
                                duration: 0.8, 
                                repeat: Infinity, 
                                delay: i * 0.2,
                                repeatDelay: 0.2
                              }}
                              className="w-1.5 h-1.5 rounded-full bg-orange-500"
                            />
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* Processing Animation */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, delay: 1.5 }}
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"
                      />
                    </div>
                  </motion.div>
                  
                  {/* AI Response Generation */}
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 3.8, duration: 0.5 }}
                    className="flex"
                  >
                    <div className="max-w-[80%] bg-gradient-to-r from-dark-700 to-dark-700/90 p-3 rounded-lg rounded-tl-none text-white border border-dark-600/50 shadow-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 border border-orange-300/20">
                          <span className="text-[10px] font-bold">AI</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <p className="text-xs text-orange-300 font-medium">Enai Assistant</p>
                            <motion.span 
                              className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 ml-2"
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          </div>
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 4, duration: 0.5 }}
                            className="text-sm"
                          >
                            I've analyzed your market and identified <span className="text-orange-400 font-medium">high-conversion opportunities</span> for your SaaS product. Based on your <span className="text-orange-400 font-medium">ICP data</span>:
                          </motion.p>
                        </div>
                      </div>
                      
                      {/* Animated typing effect for the message */}
                      <motion.div 
                        className="text-sm mt-2 space-y-2"
                      >
                        {[
                          "1. I've identified 250+ decision-makers in tech companies",
                          "2. Filtered for companies with 50-200 employees", 
                          "3. Targeting prospects showing product-fit signals"
                        ].map((item, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 4.3 + (i * 0.7), duration: 0.3 }}
                            className="flex items-start"
                          >
                            <div className="text-orange-500 mr-2 flex-shrink-0">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 4.3 + (i * 0.7), duration: 0.4, type: "spring" }}
                                className="flex items-center justify-center w-4 h-4 bg-orange-500/20 rounded-full"
                              >
                                <span className="text-[10px]">→</span>
                              </motion.div>
                            </div>
                            <motion.span
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ delay: 4.3 + (i * 0.7), duration: 0.7 }}
                              className="whitespace-nowrap overflow-hidden"
                              style={{ display: 'block' }}
                            >
                              {item.split('key decision-makers').join(
                                '<span class="text-orange-400 font-medium">key decision-makers</span>'
                              ).split('high-growth companies').join(
                                '<span class="text-orange-400 font-medium">high-growth companies</span>'
                              ).split('intent and product-fit signals').join(
                                '<span class="text-orange-400 font-medium">intent and product-fit signals</span>'
                              )}
                            </motion.span>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 6.5, duration: 0.5 }}
                        className="mt-3 text-sm"
                      >
                        I can launch <span className="text-orange-400 font-medium">multi-channel campaigns</span> with <span className="text-orange-400 font-medium">personalized messaging</span> to these prospects today. Shall we proceed?
                      </motion.p>
                      <motion.div 
                        className="flex mt-1 space-x-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ 
                          delay: 7.5,
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatDelay: 2
                        }}
                      >
                        <span className="w-1 h-1 bg-orange-400 rounded-full"/>
                        <span className="w-1 h-1 bg-orange-400 rounded-full"/>
                        <span className="w-1 h-1 bg-orange-400 rounded-full"/>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Glowing Data Processing Effects */}
                <motion.div 
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-orange-500/10 rounded-full blur-md"></div>
                    <div className="w-4 h-20 bg-gradient-to-b from-orange-500/50 to-transparent rounded-full"></div>
                  </div>
                </motion.div>
                
                {/* AI Processing indicator */}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ 
                    opacity: [0, 0.9, 0],
                    y: [-5, 0, -5]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5,
                    repeatDelay: 1.5
                  }}
                  className="absolute right-6 top-20 bg-dark-700/90 backdrop-blur-sm border border-orange-500/30 text-xs text-white px-3 py-1.5 rounded-lg shadow-lg shadow-orange-500/10"
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full"
                    />
                    <span>Processing customer data<motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >...</motion.span></span>
                  </div>
                </motion.div>
              </div>
              
              {/* Background processing effects */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Additional subtle animated background gradients */}
                <motion.div
                  className="absolute -top-20 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                {/* Data Processing Beams */}
                {[...Array(5)].map((_, i) => {
                  const delay = i * 2;
                  const positions = [
                    { start: { x: '10%', y: '20%' }, end: { x: '90%', y: '40%' } },
                    { start: { x: '80%', y: '15%' }, end: { x: '20%', y: '75%' } },
                    { start: { x: '50%', y: '90%' }, end: { x: '30%', y: '10%' } },
                    { start: { x: '70%', y: '80%' }, end: { x: '40%', y: '30%' } },
                    { start: { x: '30%', y: '60%' }, end: { x: '80%', y: '50%' } },
                  ];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: delay,
                        repeatDelay: 8
                      }}
                      className="absolute w-full h-full"
                    >
                      <motion.div
                        animate={{
                          left: [positions[i].start.x, positions[i].end.x],
                          top: [positions[i].start.y, positions[i].end.y],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: delay,
                          repeatDelay: 8
                        }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-orange-500 blur-[1px]"
                        style={{
                          boxShadow: '0 0 12px 3px rgba(249, 115, 22, 0.4)',
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement: Simple & Bold */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Faded background dashboard image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3" 
              alt="AI Dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight">
              "Enai is redefining AI-powered sales—turning conversations into conversions, effortlessly."
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Vision & How We Help */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                "At Enai, we believe sales teams should focus on closing—not chasing leads."
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Our AI SDRs handle prospecting, qualification, and multi-channel outreach—so your team can focus on revenue.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="ml-4 text-gray-700">Eliminate manual prospecting tasks</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="ml-4 text-gray-700">Scale your outreach without growing headcount</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="ml-4 text-gray-700">Convert more leads with personalized AI interactions</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Dashboard Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-2xl p-1">
                <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3" 
                    alt="Enai AI Dashboard" 
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">Leads Engaged: <span className="text-orange-500">347</span></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">Meetings Booked: <span className="text-orange-500">28</span></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-gray-800">Conversion Rate: <span className="text-orange-500">8.1%</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Introduction: Professional & Clean */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-dark text-center mb-16">Meet the Team Behind Enai</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-dark-800 to-dark border border-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-orange-400">N</span>
                </div>
                <h3 className="text-xl font-bold text-white">Nikhil Nehra</h3>
                <p className="text-orange-500 font-medium">Founder & CTO</p>
                <p className="mt-3 text-gray-300">
                  Entrepreneur and AI expert leading Enai's technological innovation.
                </p>
                <a href="mailto:nikhil@enai.ai" className="inline-block mt-4 text-orange-400 hover:text-orange-300 transition-colors">
                  nikhil@enai.ai
                </a>
              </div>
            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-dark-800 to-dark border border-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-orange-400">M</span>
                </div>
                <h3 className="text-xl font-bold text-white">Madhav M Katarya</h3>
                <p className="text-orange-500 font-medium">Co-Founder</p>
                <p className="mt-3 text-gray-300">
                  Revenue strategist focused on scaling Enai's market presence and client success.
                </p>
                <a href="mailto:madhav@enai.ai" className="inline-block mt-4 text-orange-400 hover:text-orange-300 transition-colors">
                  madhav@enai.ai
                </a>
              </div>
            </motion.div>
            
            {/* Team Member 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gradient-to-br from-dark-800 to-dark border border-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-orange-400">Z</span>
                </div>
                <h3 className="text-xl font-bold text-white">Zeeshan Idrees</h3>
                <p className="text-orange-500 font-medium">CSO</p>
                <p className="mt-3 text-gray-300">
                  Strategic leader driving Enai's partnerships and long-term business development.
                </p>
                <a href="mailto:zeeshan@enai.ai" className="inline-block mt-4 text-orange-400 hover:text-orange-300 transition-colors">
                  zeeshan@enai.ai
                </a>
              </div>
            </motion.div>

            {/* Team Member 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gradient-to-br from-dark-800 to-dark border border-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.2)" }}
            >
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-orange-400">K</span>
                </div>
                <h3 className="text-xl font-bold text-white">Ketan Tomar</h3>
                <p className="text-orange-500 font-medium">Software Engineer</p>
                <p className="mt-3 text-gray-300">
                  Design, develop, and enhance our CRM platform to optimize customer relationship and business operation.
                </p>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call-to-Action (Final Section) - Enhanced with Interactive Animations */}
      <section className="py-20 bg-gradient-to-b from-dark to-dark-800 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div 
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"
          />
          
          {/* Floating AI Assistant Animation */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            }}
            className="absolute top-[10%] right-[10%] md:right-[15%] hidden md:block"
          >
            <div className="relative">
              {/* AI Assistant Icon */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/40 to-red-500/40 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center"
                >
                  <span className="text-sm font-bold text-white">ENAI</span>
                </motion.div>
              </div>
              
              {/* Processing Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.8, 1, 0.8],
                  x: [20, 50, 100],
                  y: [0, -10, -20]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeOut",
                  repeatDelay: 1
                }}
                className="absolute top-0 right-0 bg-dark-700/90 backdrop-blur-sm text-xs text-white px-3 py-1 rounded-full border border-orange-500/30 shadow-lg"
              >
                Processing data...
              </motion.div>
              
              {/* Message Bubble Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.8, 1, 0.8],
                  x: [-20, -40, -80],
                  y: [0, 10, 20]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeOut",
                  delay: 1.5,
                  repeatDelay: 1.5
                }}
                className="absolute top-0 left-0 bg-orange-500/90 text-xs text-white px-3 py-1 rounded-full shadow-lg"
              >
                Lead generated!
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400">
                Ready to Scale Your Sales with AI?
              </span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              Enai's AI-powered sales automation works 24/7 to generate and convert leads while your team focuses on closing deals.
            </motion.p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            {/* Start Free Button with Enhanced Animations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
                className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition-all duration-500"
              />
              <a 
                href="https://login.enai.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-lg text-xl font-semibold inline-flex items-center transition-all duration-300 border border-orange-400/20"
              >
                <motion.span
                  animate={{ 
                    backgroundPosition: ["0% center", "100% center", "0% center"]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear" 
                  }}
                  className="absolute inset-0 rounded-lg opacity-20 bg-[length:400%_100%] bg-gradient-to-r from-transparent via-white to-transparent"
                />
                Start Free
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  className="ml-3"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </a>
            </motion.div>
            
            {/* Book a Demo Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <a 
                href="#contact"
                className="bg-dark-800 text-white border border-gray-700 hover:border-orange-400 px-10 py-5 rounded-lg text-xl font-semibold inline-flex items-center group transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
              >
                Book a Demo
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-col items-center"
          >
            <p className="text-gray-300 mb-3">
              Join companies automating their sales with Enai
            </p>
            <div className="flex space-x-2 items-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    delay: i * 0.3,
                    ease: "easeInOut" 
                  }}
                  className="w-2 h-2 rounded-full bg-orange-500"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
