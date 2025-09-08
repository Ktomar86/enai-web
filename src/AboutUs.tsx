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
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';

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
            <Separator className="w-full max-w-3xl mx-auto mb-8" />
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
              >
                <Card className="overflow-hidden">
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                    </div>
                    <CardTitle className="text-sm md:text-lg text-white">Prospect</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-xs md:text-sm">AI finds & qualifies ideal leads</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Animated workflow - Step 2 */}
              <motion.div 
                initial={{ y: 10, opacity: 0.8 }}
                animate={{ y: [10, 0, 10], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                    </div>
                    <CardTitle className="text-sm md:text-lg text-white">Engage</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-xs md:text-sm">Multi-channel outreach at scale</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Animated workflow - Step 3 */}
              <motion.div 
                initial={{ y: 10, opacity: 0.8 }}
                animate={{ y: [10, 0, 10], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="text-center pb-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />
                    </div>
                    <CardTitle className="text-sm md:text-lg text-white">Convert</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pt-0">
                    <CardDescription className="text-xs md:text-sm">Book meetings & close deals</CardDescription>
                  </CardContent>
                </Card>
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
                    <Card className="shadow-xl">
                      <CardHeader>
                        <Badge className="w-fit" variant="default">2024</Badge>
                        <CardTitle className="text-2xl">🚀 Founding & Vision</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">Enai was founded with a mission to transform sales automation through AI-driven innovation. Our team recognized the inefficiencies in traditional sales processes, where businesses lose valuable time on manual prospecting and unqualified leads. Enai was built to automate, optimize, and accelerate sales workflows using cutting-edge AI technology.</p>
                      </CardContent>
                    </Card>
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
                    <Card className="shadow-xl">
                      <CardHeader>
                        <Badge className="w-fit" variant="default">2025</Badge>
                        <CardTitle className="text-2xl">🔬 Beta Launch & Early Success</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">In our first year, we launched a closed beta with select clients, testing our AI-driven approach to lead qualification and outreach. Our models quickly demonstrated a significant increase in engagement rates and precision in targeting high-intent leads—proving that AI-powered sales automation can outperform conventional methods.</p>
                      </CardContent>
                    </Card>
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
                    <Card className="shadow-xl">
                      <CardHeader>
                        <Badge className="w-fit" variant="default">2025 & Beyond</Badge>
                        <CardTitle className="text-2xl">📈 Expanding Capabilities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">Enai is growing, refining its AI models, and expanding integrations with CRM systems and outreach platforms. As we scale, our focus remains on enhancing accuracy in lead qualification, optimizing outreach timing, and improving workflow automation to support sales teams in various industries.</p>
                      </CardContent>
                    </Card>
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
              className="relative overflow-hidden"
            >
              <Card className="bg-white text-dark rounded-2xl p-6 md:p-8 shadow-2xl">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-4xl font-bold text-dark">Who is Enai?</CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <p className="text-xl text-gray-700">
                    Enai is an AI-powered <span className="font-semibold">sales automation platform</span> designed to <span className="font-semibold">eliminate manual prospecting</span> and streamline outreach.
                  </p>
                  <p className="text-xl text-gray-700">
                    Our mission is to <span className="font-semibold">help sales teams scale faster</span>, close more deals, and <span className="font-semibold">leverage AI-driven automation</span> to outperform the competition.
                  </p>
                </CardContent>
                <CardFooter className="px-0 pt-4">
                  <Button className="mt-2">
                    Learn More <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
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
                  
                  {/* AI Message Components */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">ENAI</span>
                      </div>
                    </div>
                    <div>
                      <Card className="max-w-[85%] bg-dark-800 border-dark-700 mb-2">
                        <CardContent className="p-3 text-sm">
                          <p>I'm Enai, your AI sales assistant. I can help your team find, engage, and convert high-quality leads 24/7.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="flex items-start justify-end">
                    <Card className="max-w-[85%] bg-dark/60 border-dark-700">
                      <CardContent className="p-3 text-sm">
                        <p>How do you qualify leads to ensure they're high-intent?</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">ENAI</span>
                      </div>
                    </div>
                    <div>
                      <Card className="max-w-[85%] bg-dark-800 border-dark-700 mb-2">
                        <CardContent className="p-3 text-sm">
                          <p>I analyze multiple factors including:</p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-gray-300">
                            <li>Company growth signals</li>
                            <li>Digital engagement patterns</li>
                            <li>Technographic fit with your solution</li>
                            <li>Recent organizational changes</li>
                            <li>Behavioral scoring across channels</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card className="max-w-[85%] bg-dark-800 border-dark-700">
                        <CardContent className="p-3 text-sm">
                          <p>This creates a comprehensive qualification score to ensure you're focusing on prospects most likely to convert.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Typing indicator */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">ENAI</span>
                      </div>
                    </div>
                    <div className="bg-dark-800 px-4 py-2 rounded-full">
                      <div className="flex space-x-1">
                        <motion.div 
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                        <motion.div 
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                        <motion.div 
                          animate={{ y: [0, -3, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Input */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="w-full bg-dark/50 border border-dark-700 rounded-full pl-4 pr-12 py-2 text-gray-200 text-sm focus:outline-none focus:border-orange-500/50"
                  />
                  <Button size="sm" variant="default" className="absolute right-1 top-1 rounded-full w-8 h-8 p-0 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z"/>
                      <path d="M22 2 11 13"/>
                    </svg>
                  </Button>
                </div>
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
              src="/enai-product-image.jpg" 
              alt="ENAI dashboard" 
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
                    src="/enai-dashboard.png" 
                    alt="ENAI AI Dashboard" 
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
                  className="w-12 h-12 rounded-full border border-dashed border-white/60 flex items-center justify-center"
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
{/*             <motion.div
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
            </motion.div> */}
            
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
                href="https://calendly.com/enai-ai2024/30min"
                target="_blank"
                rel="noopener noreferrer"
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
      
      {/* Core Values Section with Enhanced UI */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-full blur-3xl"
          />
        </div>
        
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
                  Our Core Values
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The guiding principles that drive our innovation and commitment to excellence
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1: Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="scroll-fade"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-orange-400" />
                  </div>
                  <CardTitle className="text-2xl">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">We constantly push the boundaries of what's possible in AI-driven sales automation, staying ahead of market trends and technological advancements to deliver cutting-edge solutions.</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Value 2: Customer Success */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="scroll-fade"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-orange-400" />
                  </div>
                  <CardTitle className="text-2xl">Customer Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Your success is our success. We build deep partnerships with our clients, focusing on delivering measurable results and helping them achieve their sales and revenue goals.</p>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Value 3: Data-Driven */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="scroll-fade"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="w-7 h-7 text-orange-400" />
                  </div>
                  <CardTitle className="text-2xl">Data-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Our approach is rooted in analytics and measurable outcomes. We leverage data intelligence to optimize sales strategies, make informed decisions, and drive continuous improvement.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Join Our Team Section With Enhanced UI */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="scroll-fade"
          >
            <Card className="bg-gradient-to-br from-dark-900 to-dark-800 border-dark-700 overflow-hidden relative">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0.1, scale: 0.9 }}
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1/4 -right-1/4 w-full h-full bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"
                />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center">
                <div className="md:w-2/3 p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
                  <Separator className="w-20 mb-6" />
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                    We're always looking for passionate, innovative people to join our mission of transforming sales automation with AI. Help us build the future of intelligent sales.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg">
                      View Open Positions
                    </Button>
                    <Button variant="outline" size="lg">
                      Our Culture
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3 bg-dark-900/50 p-8 md:p-12 border-t md:border-t-0 md:border-l border-dark-700">
                  <h3 className="text-2xl font-bold mb-6">Perks & Benefits</h3>
                  <ul className="space-y-3">
                    {['Remote-first culture', 'Competitive compensation', 'Health & wellness programs', 'Learning & development', 'Cutting-edge tech stack'].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                        className="flex items-center"
                      >
                        <Badge variant="outline" className="mr-2">
                          <ChevronRight className="w-3 h-3" />
                        </Badge>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-900 border-t border-dark-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img 
                  src="/enai-logo.png" 
                  alt="Enai Logo" 
                  className="h-10 mr-3 filter brightness-0 invert"
                />
                <span className="text-xl font-bold text-orange-500">ENAI</span>
              </div>
              <p className="text-gray-400 mt-2 max-w-md">
                AI-powered sales automation platform helping teams prospect, qualify, and convert leads 24/7
              </p>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ENAI. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-orange-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
