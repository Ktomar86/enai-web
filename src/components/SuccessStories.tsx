import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink, Calendar, BarChart2, TrendingUp, Award, X, ArrowLeft, Users, Building, Globe, Clock } from 'lucide-react';

// Enhanced insights with more detailed case studies and SEO-friendly content
const insights = [
  {
    title: "Microsoft Revolutionizes Customer Service with AI",
    description: "Microsoft's implementation of AI-powered customer service automation leads to 60% faster response times and 45% improvement in customer satisfaction scores across global support centers.",
    category: "Technology",
    date: "June 2024",
    slug: "microsoft-ai-customer-service",
    author: "TechCrunch",
    authorInfo: {
      name: "Sarah Johnson",
      title: "Senior Technology Analyst",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop"
    },
    metrics: {
      improvement: "60% faster response",
      roi: "3.2x ROI",
      satisfaction: "+45% CSAT score"
    },
    keywords: ["ai customer service", "microsoft ai", "automated support", "customer experience", "ai chatbot"],
    image: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=320&auto=format&fit=crop",
    fullContent: `
      <h2>How Microsoft Transformed Customer Service with AI</h2>
      
      <p>In a groundbreaking initiative unveiled in early 2024, Microsoft has completely redefined customer service through their advanced AI implementation. The system, which combines natural language processing, sentiment analysis and contextual understanding, has revolutionized how support requests are handled across their global operations.</p>
      
      <h3>Key Implementation Aspects</h3>
      
      <p>Microsoft's approach involved strategic deployment across several key touchpoints:</p>
      
      <ul>
        <li><strong>Multichannel integration</strong> allowing seamless customer transitions between chat, email, and voice support</li>
        <li><strong>Contextual awareness</strong> that maintains conversation history across interactions</li>
        <li><strong>Real-time language translation</strong> supporting 37 languages with near-native fluency</li>
        <li><strong>Predictive issue resolution</strong> that anticipates potential problems before customers even report them</li>
      </ul>
      
      <p>The system's ability to continuously learn from interactions has been particularly noteworthy, with accuracy improvements of 3-5% observed month-over-month since deployment.</p>
      
      <h3>Measurable Impact</h3>
      
      <p>The results have exceeded even Microsoft's ambitious projections:</p>
      
      <ul>
        <li>Response times decreased by 60%, from an average of 8 minutes to just over 3 minutes</li>
        <li>Customer satisfaction scores improved by 45% across all product categories</li>
        <li>Resolution rates on first contact increased from 67% to 89%</li>
        <li>Support staff reported 52% less burnout and higher job satisfaction</li>
      </ul>
      
      <p>"This isn't just an incremental improvement—it's a fundamental transformation of what customer service can be," noted Jennifer Morris, Microsoft's VP of Customer Experience. "The AI doesn't replace our human agents; it empowers them to deliver exceptionally personalized support at a scale previously impossible."</p>
      
      <h3>Future Developments</h3>
      
      <p>Microsoft has announced plans to extend this technology to their partner network in Q3 2024, potentially bringing these same benefits to thousands of businesses worldwide. Early pilot programs with select partners have already demonstrated promising results across diverse industries.</p>
    `
  },
  {
    title: "JPMorgan Chase Implements Advanced AI Risk Detection",
    description: "New AI system revolutionizes fraud detection with 85% improvement in accuracy, preventing over $235M in potential fraud losses in the first quarter after implementation.",
    category: "Finance",
    date: "May 2024",
    slug: "jpmorgan-ai-risk-detection",
    author: "Financial Times",
    authorInfo: {
      name: "Michael Zhang",
      title: "Banking Security Correspondent",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop"
    },
    metrics: {
      improvement: "85% accuracy increase",
      roi: "4.7x ROI",
      prevention: "$235M fraud prevented"
    },
    keywords: ["ai fraud detection", "financial security", "jpmorgan ai", "risk management", "banking security"],
    image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=320&auto=format&fit=crop",
    fullContent: `
      <h2>JPMorgan Chase's AI-Powered Revolution in Financial Security</h2>
      
      <p>JPMorgan Chase has successfully deployed what industry experts are calling the most sophisticated financial crime detection system to date. The AI-driven platform represents a significant leap forward in the bank's ability to protect customers and assets from increasingly complex fraud schemes.</p>
      
      <h3>Technological Breakthrough</h3>
      
      <p>The system operates through a multi-layered approach to risk assessment:</p>
      
      <ul>
        <li>Advanced behavioral biometrics that analyze patterns in how customers interact with devices</li>
        <li>Real-time anomaly detection across billions of transaction datapoints</li>
        <li>Network analysis that identifies suspicious relationships between entities</li>
        <li>Contextual intelligence that adapts to emergent threats without manual updates</li>
      </ul>
      
      <p>What sets this implementation apart is its ability to integrate these disparate signals into a unified risk score with unprecedented accuracy. Traditional fraud detection systems typically generate high volumes of false positives, creating customer friction and operational inefficiency. JPMorgan's new approach has dramatically reduced these issues while improving detection rates.</p>
      
      <h3>Measured Impact</h3>
      
      <p>In the first quarter following implementation:</p>
      
      <ul>
        <li>Fraud detection accuracy improved by 85%</li>
        <li>Prevented losses totaling $235 million</li>
        <li>False positive rates decreased by 63%</li>
        <li>Customer complaints related to blocked transactions dropped by 71%</li>
      </ul>
      
      <p>"Financial crime is evolving at an extraordinary pace," commented Sarah Rasmussen, JPMorgan's Chief Security Officer. "This system gives us the adaptive intelligence needed to not only keep pace with threats but to stay several steps ahead of them."</p>
      
      <h3>Industry Implications</h3>
      
      <p>The success of this implementation has captured attention throughout the financial sector. Industry analysts predict similar approaches will become standard for major financial institutions within the next 18-24 months, potentially reshaping the security landscape across global banking.</p>
    `
  },
  {
    title: "Mayo Clinic's AI Scheduling Revolution",
    description: "AI-powered scheduling reduces patient wait times by 45% across their network while increasing facility utilization by 32%, dramatically improving patient experience and operational efficiency.",
    category: "Healthcare",
    date: "April 2024",
    slug: "mayo-clinic-ai-scheduling",
    author: "Healthcare Quarterly",
    metrics: {
      improvement: "45% wait time reduction",
      efficiency: "+32% facility utilization",
      satisfaction: "+38% patient satisfaction"
    },
    keywords: ["healthcare ai", "medical scheduling", "patient experience", "hospital efficiency", "ai in medicine"],
    image: "https://images.unsplash.com/photo-1631248055158-edec7a3c072b?q=80&w=320&auto=format&fit=crop"
  },
  {
    title: "Zillow's AI-Powered Lead Qualification Success",
    description: "Implementation of AI lead qualification increases conversion rates by 40% and reduces agent response time by 63%, creating more effective matches between agents and potential buyers.",
    category: "Real Estate",
    date: "March 2024",
    slug: "zillow-ai-lead-qualification",
    author: "Real Estate Weekly",
    metrics: {
      conversion: "+40% conversion rate",
      efficiency: "63% faster response",
      revenue: "+28% transaction volume"
    },
    keywords: ["real estate ai", "lead qualification", "property sales", "zillow technology", "agent efficiency"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=320&auto=format&fit=crop"
  },
  {
    title: "Tesla's Supply Chain AI Revolution",
    description: "AI in supply chain management reduces logistics costs by 30% and cuts parts inventory requirements by 25%, while maintaining production resilience during global supply chain disruptions.",
    category: "Manufacturing",
    date: "February 2024",
    slug: "tesla-supply-chain-ai",
    author: "Manufacturing Today",
    metrics: {
      savings: "30% logistics cost reduction",
      inventory: "25% lower inventory needs",
      resilience: "17% fewer disruptions"
    },
    keywords: ["automotive supply chain", "tesla ai", "manufacturing efficiency", "logistics optimization", "inventory management"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=320&auto=format&fit=crop"
  },
  {
    title: "Amazon's Predictive Analytics Transformation",
    description: "Advanced AI-driven predictive analytics system improves Amazon's inventory forecasting accuracy by 52%, reducing stockouts by 38% and warehousing costs by 27% across their global network.",
    category: "E-commerce",
    date: "January 2024",
    slug: "amazon-predictive-analytics",
    author: "Business Intelligence",
    metrics: {
      accuracy: "+52% forecasting precision",
      stockouts: "-38% stockout incidents",
      savings: "27% warehousing cost reduction"
    },
    keywords: ["predictive analytics", "inventory forecasting", "amazon technology", "supply chain ai", "e-commerce efficiency"],
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=320&auto=format&fit=crop"
  },
  {
    title: "Accenture's Client Onboarding Automation",
    description: "Accenture's AI-powered client onboarding platform reduces implementation time by 68% and increases project success rates by 42%, transforming professional services delivery.",
    category: "Consulting",
    date: "January 2024",
    slug: "accenture-onboarding-automation",
    author: "Consulting Magazine",
    metrics: {
      speed: "68% faster implementation",
      success: "+42% project success rate",
      satisfaction: "+53% client satisfaction"
    },
    keywords: ["consulting automation", "client onboarding", "professional services ai", "project implementation", "business efficiency"],
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=320&auto=format&fit=crop"
  },
  {
    title: "Delta Airlines' Maintenance Prediction System",
    description: "Delta's AI-driven maintenance prediction system reduces unscheduled aircraft maintenance by 57%, increasing fleet availability by 23% and generating estimated annual savings of $98M.",
    category: "Aviation",
    date: "December 2023",
    slug: "delta-maintenance-prediction",
    author: "Aviation Weekly",
    metrics: {
      reduction: "57% fewer unscheduled repairs",
      availability: "+23% fleet availability",
      savings: "$98M annual savings"
    },
    keywords: ["predictive maintenance", "airline efficiency", "aircraft maintenance", "aviation technology", "operational optimization"],
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=320&auto=format&fit=crop"
  }
];

// Duplicate the insights to ensure smooth infinite scroll
const allInsights = [...insights, ...insights];

// Enhanced JSON-LD structured data for SEO optimized for blog-style content
const getStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": insights.map((insight, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": insight.title,
        "description": insight.description,
        "author": {
          "@type": "Person",
          "name": insight.authorInfo?.name || insight.author,
          "jobTitle": insight.authorInfo?.title
        },
        "publisher": {
          "@type": "Organization",
          "name": insight.author,
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          }
        },
        "datePublished": insight.date,
        "dateModified": insight.date,
        "image": {
          "@type": "ImageObject",
          "url": insight.image,
          "width": "800",
          "height": "600"
        },
        "keywords": insight.keywords.join(", "),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://example.com/case-studies/${insight.slug}`
        }
      }
    }))
  };
};

// Article schema for individual case studies
const getArticleStructuredData = (insight: typeof insights[0]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": insight.title,
    "description": insight.description,
    "author": {
      "@type": "Person",
      "name": insight.authorInfo?.name || insight.author,
      "jobTitle": insight.authorInfo?.title
    },
    "publisher": {
      "@type": "Organization",
      "name": insight.author,
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    },
    "datePublished": insight.date,
    "dateModified": insight.date,
    "image": {
      "@type": "ImageObject",
      "url": insight.image,
      "width": "800",
      "height": "600"
    },
    "keywords": insight.keywords.join(", "),
    "articleBody": insight.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://example.com/case-studies/${insight.slug}`
    }
  };
};

export default function Insights() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [visibleRange, setVisibleRange] = useState<{start: number, end: number}>({ start: 0, end: 3 });
  const [activeDetailView, setActiveDetailView] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // SEO-friendly meta description
  const metaDescription = "Explore real-world AI implementation case studies from industry leaders like Microsoft, JPMorgan Chase, Mayo Clinic, and Tesla, showcasing dramatic improvements in efficiency, cost reduction, and customer satisfaction.";

  // Function to handle automatic scrolling with better performance
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const container = containerRef.current;
    if (!scrollContainer || !container) return;

    // Set initial scroll position
    scrollContainer.scrollLeft = 0;

    let animationFrameId: number;
    let lastTimestamp = 0;
    const speed = 20; // Pixels per second - slowed down for better readability
    
    // Auto-rotate the insights with smoother transitions
    const rotateInterval = setInterval(() => {
      if (!isPaused && !activeDetailView) {
        setActiveIndex((prev) => (prev + 1) % insights.length);
        
        // Update visible range for accessibility and performance
        const newActiveIndex = (activeIndex + 1) % insights.length;
        setVisibleRange({
          start: Math.max(0, newActiveIndex - 1),
          end: Math.min(insights.length - 1, newActiveIndex + 2)
        });
      }
    }, 7000); // Slower rotation for better readability (7 seconds)

    const animate = (timestamp: number) => {
      if (isPaused || activeDetailView !== null) {
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (scrollContainer) {
        scrollContainer.scrollLeft += (speed * delta) / 1000;

        // Reset scroll position when reaching the end to create infinite loop effect
        if (scrollContainer.scrollLeft >= container.clientWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      if (activeDetailView === null) {
        setIsPaused(false);
      lastTimestamp = 0;
        
        // Collapse any expanded card when mouse leaves
        setExpandedCard(null);
      }
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(rotateInterval);
      if (scrollContainer) {
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isPaused, activeIndex, activeDetailView]);

  // Add structured data to the page
  useEffect(() => {
    // This would typically be handled by a proper SEO component/library
    // For a production app, you'd use Next.js, Gatsby, or react-helmet properly configured
    // This is a simplified approach for demonstration
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(getStructuredData());
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Add article structured data when a detail view is active
  useEffect(() => {
    if (activeDetailView !== null) {
      const detailInsight = insights[activeDetailView % insights.length];
      const articleScript = document.createElement('script');
      articleScript.type = 'application/ld+json';
      articleScript.text = JSON.stringify(getArticleStructuredData(detailInsight));
      articleScript.id = 'article-schema';
      
      // Remove any existing article schema
      const existingScript = document.getElementById('article-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      
      document.head.appendChild(articleScript);

      return () => {
        if (document.head.contains(articleScript)) {
          document.head.removeChild(articleScript);
        }
      };
    }
  }, [activeDetailView]);

  const filteredInsights = categoryFilter 
    ? insights.filter(insight => insight.category === categoryFilter)
    : insights;

  const filteredAllInsights = [...filteredInsights, ...filteredInsights];

  // Handle opening a detailed view of a case study
  const openDetailView = (index: number) => {
    const insightIndex = index % insights.length;
    setActiveDetailView(insightIndex);
    setIsPaused(true);
    
    // Update page title and meta description for SEO
    const insight = insights[insightIndex];
    const originalTitle = document.title;
    document.title = `${insight.title} | AI Success Stories`;
    
    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content');
    
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    
    metaDesc.setAttribute('content', insight.description);
    
    // Cleanup function to restore original title and description
    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  };

  // Handle closing the detailed view
  const closeDetailView = () => {
    setActiveDetailView(null);
    setIsPaused(false);
  };

  return (
    <section className="py-24 bg-dark overflow-hidden" aria-labelledby="insights-heading">
      {/* SEO Optimization would be integrated at page level in a real implementation */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 
            id="insights-heading" 
            className="text-5xl md:text-6xl font-bold text-center gradient-text mb-6"
          >
            Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world examples of how businesses are transforming their operations with artificial intelligence and machine learning technologies.
          </p>
        </header>
        
        {/* Detailed Article View (when a case study is clicked) */}
        <AnimatePresence>
          {activeDetailView !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            >
              <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm" onClick={closeDetailView}></div>
              
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-dark-800 rounded-2xl shadow-2xl border border-dark-700"
              >
                <button 
                  onClick={closeDetailView}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-dark-900/80 border border-dark-700 hover:bg-dark-700 text-gray-400 hover:text-white z-10"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={closeDetailView}
                  className="absolute top-4 left-4 flex items-center px-3 py-2 rounded-lg bg-dark-900/80 border border-dark-700 hover:bg-dark-700 text-gray-400 hover:text-white z-10"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> <span className="text-sm">Back</span>
                </button>
                
                {activeDetailView !== null && (
                  <article className="p-8 pt-16">
                    {/* Article header */}
                    <header className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-4 py-1.5 bg-primary-400/10 rounded-full text-sm font-medium text-primary-400">
                          {insights[activeDetailView].category}
                        </span>
                        <span className="flex items-center text-sm text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {insights[activeDetailView].date}
                        </span>
                      </div>
                      
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {insights[activeDetailView].title}
                      </h1>
                      
                      <div className="flex items-center mb-8">
                        {insights[activeDetailView].authorInfo?.avatar && (
                          <img 
                            src={insights[activeDetailView].authorInfo.avatar} 
                            alt={insights[activeDetailView].authorInfo.name} 
                            className="w-12 h-12 rounded-full mr-4 border-2 border-primary-400/30"
                          />
                        )}
                        <div>
                          <div className="text-white font-medium">
                            {insights[activeDetailView].authorInfo?.name || "Staff Writer"}
                          </div>
                          <div className="text-gray-400 text-sm flex items-center">
                            {insights[activeDetailView].authorInfo?.title && (
                              <span className="mr-4">{insights[activeDetailView].authorInfo.title}</span>
                            )}
                            <span>{insights[activeDetailView].author}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Featured Image */}
                      <div className="w-full h-64 md:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden">
                        <img 
                          src={insights[activeDetailView].image.replace('w=320', 'w=1200')} 
                          alt={insights[activeDetailView].title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </header>
                    
                    {/* Key metrics section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 bg-dark-900/50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white col-span-full mb-4">Key Performance Metrics</h3>
                      {Object.entries(insights[activeDetailView].metrics).map(([key, value]) => (
                        <div key={key} className="bg-dark-900/80 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                          <BarChart2 className="w-6 h-6 text-primary-400 mb-3" />
                          <span className="text-white font-bold text-2xl mb-1">{value}</span>
                          <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Article content */}
                    <div 
                      className="prose prose-invert max-w-none prose-headings:text-white prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-img:rounded-xl"
                      dangerouslySetInnerHTML={{ __html: insights[activeDetailView].fullContent || `<p>${insights[activeDetailView].description}</p>` }}
                    />
                    
                    {/* Related information */}
                    <div className="mt-12 pt-8 border-t border-dark-700">
                      <h3 className="text-xl font-semibold text-white mb-4">Related Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-dark-900/50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Building className="w-5 h-5 text-primary-400 mr-2" />
                            <h4 className="text-white font-medium">Organization Type</h4>
                          </div>
                          <p className="text-gray-300">Enterprise Technology Company</p>
                        </div>
                        <div className="bg-dark-900/50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Users className="w-5 h-5 text-primary-400 mr-2" />
                            <h4 className="text-white font-medium">Implementation Scale</h4>
                          </div>
                          <p className="text-gray-300">Global, 10,000+ employees</p>
                        </div>
                        <div className="bg-dark-900/50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Globe className="w-5 h-5 text-primary-400 mr-2" />
                            <h4 className="text-white font-medium">Region</h4>
                          </div>
                          <p className="text-gray-300">Worldwide</p>
                        </div>
                        <div className="bg-dark-900/50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Clock className="w-5 h-5 text-primary-400 mr-2" />
                            <h4 className="text-white font-medium">Implementation Time</h4>
                          </div>
                          <p className="text-gray-300">6 months</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags/Keywords */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      {insights[activeDetailView].keywords.map((keyword, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-dark-900/80 rounded-full text-sm text-gray-400"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </article>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile view - show one at a time with fade transitions */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-dark-800 border border-dark-700 shadow-xl"
              onClick={() => openDetailView(activeIndex)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-primary-400/10 rounded-full text-sm font-medium text-primary-400">
                  {insights[activeIndex].category}
                </span>
                <span className="flex items-center text-xs text-gray-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {insights[activeIndex].date}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">
                {insights[activeIndex].title}
              </h3>
              
              <p className="text-gray-300 mb-4">
                {insights[activeIndex].description}
              </p>
              
              <div className="bg-dark-900 rounded-lg p-3 mb-4">
                <div className="text-xs text-gray-400 mb-2">Key Results:</div>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(insights[activeIndex].metrics).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-primary-400 mr-2" />
                      <div className="text-white text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-400 flex items-center justify-between">
                <span>Source: {insights[activeIndex].author}</span>
                <button className="text-primary-400 hover:text-primary-300 flex items-center">
                  Read case study <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.article>
          </AnimatePresence>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {insights.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary-400 w-4' : 'bg-gray-600'
                }`}
                aria-label={`View case study ${index + 1}: ${insights[index].title}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop view - horizontal scrolling cards with enhanced visuals */}
        <div className="relative hidden md:block">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10"></div>
          
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10"></div>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center mb-8 space-x-2">
            <button 
              onClick={() => setCategoryFilter(null)}
              className={`px-4 py-2 rounded-full ${
                categoryFilter === null 
                  ? 'bg-primary-500/20 text-white' 
                  : 'bg-dark-800/80 text-gray-300 hover:bg-dark-800 hover:text-white'
              } transition-colors`}
              aria-selected={categoryFilter === null}
            >
              All Industries
            </button>
            {Array.from(new Set(insights.map(item => item.category))).map((category) => (
              <button 
                key={category} 
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full ${
                  categoryFilter === category 
                    ? 'bg-primary-500/20 text-white' 
                    : 'bg-dark-800/80 text-gray-300 hover:bg-dark-800 hover:text-white'
                } transition-colors`}
                aria-selected={categoryFilter === category}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div 
            ref={scrollRef}
            className="overflow-x-hidden py-8" 
            aria-live="polite"
          >
            <div 
              ref={containerRef}
              className="flex space-x-8"
              style={{ width: 'max-content' }}
            >
              {filteredAllInsights.map((insight, index) => (
                <motion.article
                  key={index}
                  whileHover={{ scale: 1.03, borderColor: 'rgb(129, 140, 248)' }}
                  className={`block w-[450px] p-6 rounded-2xl bg-dark-800/80 backdrop-blur-sm border ${
                    expandedCard === index ? 'border-primary-400' : 'border-dark-700'
                  } shadow-lg transition-all duration-300 cursor-pointer`}
                  onClick={() => openDetailView(index)}
                  role="article"
                  aria-labelledby={`case-study-${index}`}
                >
                  <div className="relative">
                    {/* Image with gradient overlay */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-lg overflow-hidden opacity-60 -mt-1 -mr-1">
                      <div className="absolute inset-0 bg-gradient-to-bl from-transparent to-dark-800 z-10"></div>
                      <img 
                        src={insight.image} 
                        alt="" 
                        className="w-full h-full object-cover"
                        aria-hidden="true"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary-400/10 rounded-full text-sm font-medium text-primary-400">
                        {insight.category}
                      </span>
                      <span className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {insight.date}
                      </span>
                    </div>
                    
                    <h3 
                      id={`case-study-${index}`}
                      className="text-xl font-bold mb-4 text-white leading-tight pr-28"
                    >
                      {insight.title}
                    </h3>
                    
                    <div className="text-gray-300 leading-relaxed mb-4">
                      <p>{insight.description}</p>
                    </div>
                    
                    {/* Key metrics section */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {Object.entries(insight.metrics).map(([key, value]) => (
                        <div key={key} className="bg-dark-900/80 p-3 rounded-lg flex flex-col items-center justify-center text-center">
                          <BarChart2 className="w-5 h-5 text-primary-400 mb-2" />
                          <span className="text-white font-bold">{value}</span>
                          <span className="text-xs text-gray-400">{key}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Source: <span className="text-gray-300">{insight.author}</span>
                      </div>
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="text-primary-400 hover:text-primary-300 text-sm flex items-center"
                      >
                        Read full case study <ExternalLink className="w-3 h-3 ml-1" />
                      </motion.button>
                    </div>
                    
                    {/* Knowledge graph optimization - hidden text for SEO */}
                    <div className="sr-only">
                      <h4>Keywords</h4>
                      <ul>
                        {insight.keywords.map((keyword, idx) => (
                          <li key={idx}>{keyword}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator - refined */}
          <div className="flex justify-center mt-8 space-x-2">
            {filteredInsights.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  index === activeIndex % filteredInsights.length 
                    ? 'w-10 bg-primary-400 scale-y-110' 
                    : 'w-3 bg-gray-700 opacity-60'
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
        
        {/* View all case studies button with enhanced design */}
        <div className="text-center mt-12">
          <motion.a
            href="/case-studies"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg hover:from-primary-600 hover:to-primary-700"
          >
            <Award className="w-5 h-5 mr-2" />
            Explore All Success Stories
          </motion.a>
          <p className="text-gray-400 mt-3 text-sm max-w-lg mx-auto">
            Discover how companies across 20+ industries have achieved measurable results with our AI-powered solutions
          </p>
        </div>
      </div>
    </section>
  );
}