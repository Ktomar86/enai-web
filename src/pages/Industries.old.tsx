import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Briefcase, 
  Layers, 
  BookOpen, 
  ShoppingBag, 
  Home, 
  Code, 
  Truck, 
  HeartPulse,
  Search,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import { Helmet } from 'react-helmet-async';
import LazySection from '../components/LazySection';
// Removed header images for cleaner, text-first layout
import { debounce, isLowEndDevice, prefersReducedMotion } from '../utils/performance';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Define interfaces for better typing
interface IndustryApplication {
  title: string;
  description: string;
}

interface IndustryStats {
  impactPercent: string;
  impactText: string;
  clientText: string;
}

interface Industry {
  title: string;
  slug: string;
  icon: JSX.Element;
  image: string;
  description: string;
  applications: IndustryApplication[];
  benefits: string[];
  stats: IndustryStats;
}

// Replaced local UI mocks with shared UI components

// Updated industries with startup-appropriate positioning
const industries: Industry[] = [
  {
    title: "Technology (SaaS)",
    slug: "saas",
    icon: <Code className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Empower your SaaS company with AI-driven lead enrichment, sales process automation, and customer engagement tools that increase conversion rates while reducing manual workload.",
    applications: [
      {
        title: "AI-Powered Lead Enrichment",
        description: "Automatically enrich lead data with missing fields such as LinkedIn profiles and job titles, ensuring actionable leads for sales teams."
      },
      {
        title: "Automated Sales Funnel Creation",
        description: "Create sales funnels tailored to lead behavior, segmenting audiences, nurturing leads, and streamlining qualification stages."
      }
    ],
    benefits: [
      "Improved lead quality and sales efficiency",
      "Faster decision-making with complete, enriched data",
      "Simplified workflows for small teams, allowing focus on growth"
    ],
    stats: {
      impactPercent: "78%",
      impactText: "potential sales productivity increase",
      clientText: "Perfect for growing SaaS companies"
    }
  },
  {
    title: "Financial Services",
    slug: "financial-services",
    icon: <Briefcase className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Transform client engagement and operational efficiency with AI-driven solutions that optimize client interactions, automate regulatory compliance, and streamline financial processes.",
    applications: [
      {
        title: "Voice AI for Client Engagement",
        description: "Schedule consultations and follow up with clients seamlessly through AI-powered voice calls that sound natural and professional."
      },
      {
        title: "Personalized Client Communications",
        description: "Generate customized messages tailored to client financial goals and real-time engagement signals."
      }
    ],
    benefits: [
      "Reduce manual client outreach workload by up to 85%",
      "Enhanced personalization to build stronger client relationships",
      "Faster compliance checks with increased accuracy"
    ],
    stats: {
      impactPercent: "85%",
      impactText: "reduction in compliance processing time",
      clientText: "Ideal for financial advisors and institutions"
    }
  },
  {
    title: "Healthcare",
    slug: "healthcare",
    icon: <HeartPulse className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Elevate patient care and operational efficiency with AI-powered patient engagement, administrative automation, and care coordination systems designed specifically for healthcare providers.",
    applications: [
      {
        title: "Intelligent Appointment Management",
        description: "Automate scheduling, confirmations, and follow-ups with patients while reducing no-shows by up to 42%."
      },
      {
        title: "Care Coordination Automation",
        description: "Streamline communication between providers, patients, and care teams to ensure seamless healthcare delivery."
      }
    ],
    benefits: [
      "Potential for 70%+ enhancement in patient satisfaction scores",
      "Reduced administrative burden allowing focus on patient care",
      "Improved appointment adherence and treatment plan compliance"
    ],
    stats: {
      impactPercent: "72%",
      impactText: "potential increase in patient satisfaction",
      clientText: "Designed for medical practices and clinics"
    }
  },
  {
    title: "Real Estate",
    slug: "real-estate",
    icon: <Home className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Revolutionize property management and client engagement with AI-powered lead qualification, automated property matching, and intelligent scheduling that converts more prospects into clients.",
    applications: [
      {
        title: "Intelligent Property Matching",
        description: "Automatically match properties to client preferences and behaviors, dramatically increasing showing-to-sale conversion rates."
      },
      {
        title: "Automated Lead Nurturing",
        description: "Build customized nurture campaigns that respond to lead behavior, ensuring qualified leads progress efficiently through the sales process."
      }
    ],
    benefits: [
      "Up to 68% faster response times to client inquiries",
      "Reduced manual efforts in lead qualification and follow-ups",
      "Potential for 48% higher conversion rates for property sales or rentals"
    ],
    stats: {
      impactPercent: "48%",
      impactText: "potential increase in showing-to-sale conversion",
      clientText: "Built for brokerages and individual agents"
    }
  },
  {
    title: "E-commerce & Retail",
    slug: "ecommerce",
    icon: <ShoppingBag className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Transform customer experiences and drive sales with AI-powered personalization, inventory optimization, and automated customer service solutions that scale with your business.",
    applications: [
      {
        title: "Dynamic Customer Engagement",
        description: "Send personalized promotions and content based on customer behavior, purchase history, and engagement signals."
      },
      {
        title: "Intelligent Inventory Management",
        description: "Optimize stock levels and predict demand patterns using AI analysis of historical data and market trends."
      }
    ],
    benefits: [
      "Potential for 90%+ improvement in customer loyalty through tailored communication",
      "Up to 37% higher sales conversions with behavior-driven messaging",
      "Reduced out-of-stock incidents by forecasting demand"
    ],
    stats: {
      impactPercent: "37%",
      impactText: "potential increase in conversion rates",
      clientText: "Perfect for online stores and retailers"
    }
  },
  {
    title: "Manufacturing",
    slug: "manufacturing",
    icon: <Truck className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1533417479674-81754ee6c123?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Optimize production processes and supply chain operations with AI-powered predictive maintenance, quality control, and inventory management solutions designed for manufacturers.",
    applications: [
      {
        title: "Predictive Maintenance Automation",
        description: "Anticipate equipment failures before they occur, scheduling maintenance precisely when needed to minimize downtime."
      },
      {
        title: "Quality Control AI",
        description: "Implement vision-based quality inspection that catches defects human inspectors might miss while processing at scale."
      }
    ],
    benefits: [
      "Potential for 76% reduction in unplanned downtime",
      "Up to 43% improvement in quality control accuracy",
      "Optimized production scheduling efficiency"
    ],
    stats: {
      impactPercent: "76%",
      impactText: "potential reduction in unplanned downtime",
      clientText: "Tailored for modern manufacturing operations"
    }
  },
  {
    title: "Education",
    slug: "education",
    icon: <BookOpen className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Enhance learning outcomes and administrative efficiency with AI-powered student engagement, personalized learning paths, and automated administrative processes for educational institutions.",
    applications: [
      {
        title: "Intelligent Student Engagement",
        description: "Automate personalized communication with prospective and current students to boost enrollment and retention rates."
      },
      {
        title: "Learning Support Systems",
        description: "Develop AI-driven tutoring and support tools that adapt to individual student needs and learning styles."
      }
    ],
    benefits: [
      "Potential for 65% improvement in student engagement metrics",
      "Up to 42% reduction in administrative workload",
      "Enhance course completion rates significantly"
    ],
    stats: {
      impactPercent: "65%",
      impactText: "potential improvement in student engagement",
      clientText: "Designed for schools and online education providers"
    }
  },
  {
    title: "Logistics & Supply Chain",
    slug: "logistics",
    icon: <Layers className="w-10 h-10 text-primary-400" />,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=500",
    description: "Optimize your supply chain with AI-powered logistics planning, demand forecasting, and route optimization solutions that reduce costs and improve delivery reliability.",
    applications: [
      {
        title: "Intelligent Route Optimization",
        description: "Automatically calculate the most efficient delivery routes considering traffic, weather, and vehicle capacity constraints."
      },
      {
        title: "Demand Forecasting AI",
        description: "Predict inventory needs with remarkable accuracy using AI analysis of historical data, market trends, and seasonal patterns."
      }
    ],
    benefits: [
      "Potential for 32% reduction in transportation costs",
      "Up to 47% improvement in on-time delivery performance",
      "Significant decrease in overstocking and stockout situations"
    ],
    stats: {
      impactPercent: "47%",
      impactText: "potential improvement in on-time delivery",
      clientText: "Built for logistics companies and supply chain managers"
    }
  }
];

// Helper function to limit re-renders - throttle search input (unused for now)

// Memoized Card component to avoid unnecessary re-renders
const IndustryCard = memo(({ 
  industry, 
  onIndustryClick 
}: { 
  industry: Industry; 
  onIndustryClick: (industry: Industry) => void;
}) => {
  return (
    <Card className="h-full bg-dark-800/80 backdrop-blur-sm border-dark-700 hover:border-primary-400/50 transition-all rounded-xl flex flex-col">
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{industry.title}</h3>
          <div className="w-10 h-10 rounded-full bg-dark-700/60 flex items-center justify-center border border-dark-600/50">
            {industry.icon}
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 flex-grow">
        <p className="text-gray-300 mb-6">{industry.description}</p>
        
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-dark-900/60 rounded-md p-3 text-center">
            <div className="text-2xl font-bold text-primary-400">{industry.stats.impactPercent}</div>
            <div className="text-[11px] text-gray-300 mt-0.5">{industry.stats.impactText}</div>
          </div>
          <div className="bg-dark-900/60 rounded-md p-3 text-center">
            <div className="text-xs font-medium text-white">{industry.stats.clientText}</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-2">Plays</h4>
          <ul className="space-y-2">
            {industry.applications.slice(0, 2).map((app, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="mt-1 inline-block w-2 h-2 rounded-full bg-primary-400" />
                <span className="text-gray-300">{app.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          variant="outline" 
          className="w-full bg-primary-400/10 hover:bg-primary-400/20 border border-primary-400/20 hover:border-primary-400/40 text-primary-400"
          onClick={() => onIndustryClick(industry)}
        >
          Explore Solutions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
});

// SEO Schema Data
const getSchemaMarkup = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Solutions for Industries | AI-Powered Automation",
    "description": "Discover how our AI solutions can transform different industries with intelligent automation and personalized engagement. Explore industry-specific applications and benefits.",
    "url": "https://yourcompany.com/industries",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": industries.map((industry, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": `AI Solutions for ${industry.title}`,
          "description": industry.description,
          "url": `https://yourcompany.com/industries/${industry.slug}`,
          "provider": {
            "@type": "Organization",
            "name": "Your Company Name",
            "url": "https://yourcompany.com"
          }
        }
      }))
    }
  };
};

export default function Industries() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredIndustries, setFilteredIndustries] = useState<Industry[]>(industries);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [isDetailView, setIsDetailView] = useState<boolean>(false);
  
  // Check for reduced motion preference
  const shouldReduceMotion = useMemo(() => prefersReducedMotion() || isLowEndDevice(), []);

  // Optimize search effect to prevent unnecessary re-renders
  useEffect(() => {
    filterIndustries(searchTerm, activeTab);
  }, [searchTerm, activeTab]);

  // Debounced search handler to prevent excessive state updates
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const debouncedSearch = debounce((value: string) => {
      setSearchTerm(value);
    }, 300);
    
    debouncedSearch(e.target.value);
  }, []);

  // Memoized filter logic for better performance
  const filterIndustries = useCallback((term: string, tab: string) => {
    let filtered = industries;
    
    if (term) {
      const lowerTerm = term.toLowerCase();
      filtered = filtered.filter(industry => 
        industry.title.toLowerCase().includes(lowerTerm) ||
        industry.description.toLowerCase().includes(lowerTerm) ||
        industry.applications.some(app => app.title.toLowerCase().includes(lowerTerm)) ||
        industry.benefits.some(benefit => benefit.toLowerCase().includes(lowerTerm))
      );
    }
    
    if (tab !== "all") {
      filtered = filtered.filter(industry => industry.slug === tab);
    }
    
    setFilteredIndustries(filtered);
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleIndustryClick = useCallback((industry: Industry) => {
    setSelectedIndustry(industry);
    setIsDetailView(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, []);

  const handleBackClick = useCallback(() => {
    setIsDetailView(false);
    setSelectedIndustry(null);
  }, []);

  const scrollToContact = useCallback(() => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [navigate]);

  // Optimized animation variants with reduced complexity for better performance
  const containerVariants = useMemo(() => shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  } : {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, // Reduced from 0.1
        delayChildren: 0.1
      }
    }
  }, [shouldReduceMotion]);

  const itemVariants = useMemo(() => shouldReduceMotion ? {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  } : {
    hidden: { y: 15, opacity: 0 }, 
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 } // Faster animation
    }
  }, [shouldReduceMotion]);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Helmet>
        <title>Industries We Serve | AI Solutions for Business Growth</title>
        <meta name="description" content="Discover how our innovative AI solutions can revolutionize your industry with intelligent automation, personalized engagement, and data-driven insights. Explore industry-specific applications and potential benefits." />
        <meta name="keywords" content="AI solutions, industry automation, SaaS AI, financial services automation, healthcare AI, real estate AI, retail AI, manufacturing AI, education technology, AI applications" />
        <link rel="canonical" href="https://yourcompany.com/industries" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Industries We Serve | Innovative AI Solutions" />
        <meta property="og:description" content="Explore how our AI solutions can revolutionize your industry with intelligent automation and personalized engagement." />
        <meta property="og:url" content="https://yourcompany.com/industries" />
        <meta property="og:image" content="https://yourcompany.com/images/industries-og.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Industries We Serve | Innovative AI Solutions" />
        <meta name="twitter:description" content="Explore how our AI solutions can revolutionize your industry with intelligent automation and personalized engagement." />
        <meta name="twitter:image" content="https://yourcompany.com/images/industries-og.jpg" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(getSchemaMarkup())}
        </script>
      </Helmet>
      
      <Navigation />
      
      <AnimatePresence mode="wait">
        {!isDetailView ? (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section with motion effects */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark pointer-events-none"></div>
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern pointer-events-none"></div>
              <div className="absolute -top-20 right-0 w-1/3 h-1/3 bg-primary-400/5 rounded-full blur-[120px]"></div>
              <div className="absolute -bottom-24 left-0 w-1/3 h-1/3 bg-yellow-400/5 rounded-full blur-[100px]"></div>
              
              <motion.div 
                className="max-w-7xl mx-auto text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="outline" className="mb-6 px-4 py-1 border-primary-400/30 bg-primary-400/5 backdrop-blur-sm text-primary-300">
                  Industry Solutions
                </Badge>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight [text-wrap:balance]">
                  <span className="gradient-text">AI, tailored to your industry</span>
                </h1>
                
                <motion.p 
                  className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Purpose‑built automations for your motion. Research, outreach, booking and sync—fully controlled, fully compliant, built for outcomes.
                </motion.p>
                
                {/* Search and filter container */}
                <motion.div 
                  className="mt-12 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="search"
                      placeholder="Search industry solutions..."
                      className="pl-10 bg-dark-800/70 border border-dark-700 focus:border-primary-400 h-12 w-full rounded-md text-white"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </motion.div>
                
                {/* Category chips */}
                <motion.div 
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                    {[
                      { slug: 'all', label: 'All Industries' },
                      { slug: 'saas', label: 'Technology' },
                      { slug: 'financial-services', label: 'Finance' },
                      { slug: 'healthcare', label: 'Healthcare' },
                      { slug: 'real-estate', label: 'Real Estate' },
                      { slug: 'ecommerce', label: 'E‑commerce' },
                      { slug: 'manufacturing', label: 'Manufacturing' },
                      { slug: 'education', label: 'Education' },
                      { slug: 'logistics', label: 'Logistics' }
                    ].map(cat => (
                      <Button
                        key={cat.slug}
                        variant="outline"
                        className={`rounded-full px-4 py-1 border ${activeTab === cat.slug ? 'border-primary-400 bg-primary-400/10 text-primary-400' : 'border-dark-700 text-gray-300 hover:border-gray-500'}`}
                        onClick={() => setActiveTab(cat.slug)}
                      >
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Capabilities Section */}
            <section className="py-16 bg-dark relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern"></div>
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-400/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-yellow-400/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                    <span className="gradient-text">What our AI does for you</span>
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Fast deployment. Human‑approved messaging. Real outcomes.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <LazySection loader={() => import('../components/ui/glowing-effect-demo').then(mod => ({ default: mod.GlowingEffectDemo }))} />
                </motion.div>
              </div>
            </section>

            {/* Industry Overview Stats */}
            <section className="py-16 bg-dark-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-4 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.div 
                    variants={itemVariants}
                    className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm hover:border-primary-400/50 transition-all duration-300"
                  >
                    <div className="text-4xl font-bold text-primary-400 mb-2">9+</div>
                    <div className="text-xs text-gray-300">Industries served</div>
                  </motion.div>
                  <motion.div 
                    variants={itemVariants}
                    className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm hover:border-primary-400/50 transition-all duration-300"
                  >
                    <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
                    <div className="text-xs text-gray-300">AI automation</div>
                  </motion.div>
                  <motion.div 
                    variants={itemVariants}
                    className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm hover:border-primary-400/50 transition-all duration-300"
                  >
                    <div className="text-4xl font-bold text-primary-400 mb-2">60%+</div>
                    <div className="text-xs text-gray-300">Efficiency gain potential</div>
                  </motion.div>
                  <motion.div 
                    variants={itemVariants}
                    className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm hover:border-primary-400/50 transition-all duration-300"
                  >
                    <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
                    <div className="text-xs text-gray-300">Dedicated support</div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Industries Grid with Shadcn UI Card components */}
            <section className="py-24 bg-dark relative">
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-400/5 rounded-full blur-[150px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {filteredIndustries.length === 0 ? (
                  <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4">No industries found matching your search</h3>
                    <p className="text-gray-400 mb-8">Try changing your search term or selecting a different category</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setActiveTab("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {filteredIndustries.map((industry) => (
                      <motion.div 
                        key={industry.slug}
                        variants={itemVariants}
                        id={industry.slug}
                        whileHover={shouldReduceMotion ? {} : { y: -8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IndustryCard 
                          industry={industry} 
                          onIndustryClick={handleIndustryClick}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-b from-dark-800 to-dark relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern"></div>
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold gradient-text mb-8">Ready to Transform Your Business?</h2>
                  <p className="text-xl text-gray-300 mb-12">
                    Our AI solutions are designed to help businesses of any size achieve remarkable efficiency gains and competitive advantages.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="default" 
                      size="lg" 
                      onClick={scrollToContact}
                      className="button-glow text-white rounded-full text-lg font-semibold group hover:scale-105 transition-all duration-300"
                    >
                      Schedule a Demo
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="rounded-full text-lg font-semibold border-gray-700 hover:border-primary-400 text-gray-300 hover:text-white"
                    >
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="detail-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-32"
          >
            {selectedIndustry && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button 
                  variant="ghost" 
                  onClick={handleBackClick}
                  className="mb-8 text-gray-300 hover:text-white"
                >
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  Back to all industries
                </Button>
                
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge variant="outline" className="mb-4 px-3 py-1 border-primary-400/30 bg-primary-400/5 backdrop-blur-sm text-primary-300">
                      Industry Solution
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                      <span className="gradient-text">AI for {selectedIndustry.title}</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">{selectedIndustry.description}</p>
                    
                    <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-xl p-6 mb-8">
                      <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
                      <ul className="space-y-4">
                        {selectedIndustry.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="bg-primary-400/10 rounded-full p-1 mr-3 mt-1">
                              <ChevronRight className="w-4 h-4 text-primary-400" />
                            </div>
                            <span className="text-gray-200">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                      <Button 
                        size="lg" 
                        className="button-glow"
                        onClick={scrollToContact}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        asChild
                      >
                        <Link to="/contact">
                          Contact Sales
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="rounded-2xl overflow-hidden border border-dark-700 shadow-xl">
                      <div className="p-8 bg-dark-800">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center">
                              {selectedIndustry.icon}
                            </div>
                            <h3 className="text-2xl font-semibold">{selectedIndustry.title}</h3>
                          </div>
                          <Badge variant="secondary" className="bg-primary-400/10 text-primary-400 border-primary-400/20">
                            {selectedIndustry.stats.impactPercent}
                          </Badge>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-4">Applications</h4>
                            <div className="space-y-6">
                              {selectedIndustry.applications.map((app, idx) => (
                                <div key={idx} className="bg-dark-900/50 p-4 rounded-lg">
                                  <h5 className="text-primary-400 font-medium mb-2">{app.title}</h5>
                                  <p className="text-gray-300">{app.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Client Profile</h4>
                            <p className="text-gray-300">{selectedIndustry.stats.clientText}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Impact Potential</h4>
                            <p className="text-gray-300">{selectedIndustry.stats.impactText} of {selectedIndustry.stats.impactPercent}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute -z-10 top-1/2 right-0 w-64 h-64 bg-primary-400/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2"></div>
                  </motion.div>
                </div>
                
                {/* Related Industries */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-24"
                >
                  <h2 className="text-3xl font-bold mb-8">Explore Other Industries</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {industries
                      .filter(industry => industry.slug !== selectedIndustry.slug)
                      .slice(0, 4)
                      .map((industry, idx) => (
                        <Card 
                          key={idx} 
                          className="bg-dark-800/80 backdrop-blur-sm border-dark-700 hover:border-primary-400/50 cursor-pointer"
                          onClick={() => handleIndustryClick(industry)}
                        >
                          <CardHeader className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-400/10 flex items-center justify-center">
                                {React.cloneElement(industry.icon, { className: "w-5 h-5 text-primary-400" })}
                              </div>
                              <CardTitle className="text-lg">{industry.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <CardDescription className="text-gray-400 line-clamp-2">
                              {industry.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section optimized for SEO */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <LazySection loader={() => import('../components/SEOFAQSection')} />
      </div>
    </div>
  );
}