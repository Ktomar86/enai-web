import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Building, BarChart2, Briefcase, Users, Shield, Globe, Zap, Layers, BookOpen, ShoppingBag, Home, Code, Truck, HeartPulse } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Helmet } from 'react-helmet';
import SEOFAQSection from '../components/SEOFAQSection';

// Updated industries with startup-appropriate positioning
const industries = [
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToContact = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-dark text-white animate-fade-in">
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
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-800 animate-slide-down">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up">
            <span className="gradient-text">AI Solutions for Every Industry</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Our innovative AI platform can revolutionize how businesses operate across sectors, delivering intelligent automation, personalized engagement, and data-driven insights.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            {industries.map((industry, idx) => (
              <a 
                key={idx}
                href={`#${industry.slug}`}
                className="px-4 py-2 rounded-full text-sm bg-dark-800 border border-dark-700 hover:border-primary-400 transition-all duration-300"
              >
                {industry.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Overview Stats */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary-400 mb-2">8+</div>
              <div className="text-xs text-gray-300">Industries We Can Serve</div>
            </div>
            <div className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary-400 mb-2">24/7</div>
              <div className="text-xs text-gray-300">AI Automation</div>
            </div>
            <div className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary-400 mb-2">60%+</div>
              <div className="text-xs text-gray-300">Potential Efficiency Gain</div>
            </div>
            <div className="text-center p-6 border border-dark-700 rounded-xl bg-dark-900/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
              <div className="text-xs text-gray-300">Dedicated Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index}
                id={industry.slug}
                className="rounded-2xl bg-dark-800 border border-dark-700 transition-all duration-300 hover:border-primary-400 hover:transform hover:scale-105 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    srcSet={`${industry.image}?w=400 400w, ${industry.image}?w=800 800w`}
                    sizes="(max-width: 600px) 400px, 800px"
                    alt={`AI Solutions for ${industry.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent opacity-60"></div>
                  
                  {/* Industry icon */}
                  <div className="absolute top-4 right-4 w-14 h-14 rounded-full bg-dark-800/80 backdrop-blur-sm flex items-center justify-center border border-primary-400/30">
                    {industry.icon}
                  </div>
                  
                  <h3 className="absolute bottom-4 left-4 text-2xl font-semibold text-white">{industry.title}</h3>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6">{industry.description}</p>
                  
                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-dark-900/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary-400">{industry.stats.impactPercent}</div>
                      <div className="text-xs text-gray-300 mt-1">{industry.stats.impactText}</div>
                    </div>
                    <div className="bg-dark-900/50 rounded-lg p-4 text-center">
                      <div className="text-sm font-medium text-white">{industry.stats.clientText}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Applications</h4>
                    <div className="space-y-4">
                      {industry.applications.map((app, idx) => (
                        <div key={idx} className="space-y-2">
                          <h5 className="text-primary-400 font-medium">{app.title}</h5>
                          <p className="text-gray-300 text-sm">{app.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Potential Benefits</h4>
                    <ul className="space-y-3">
                      {industry.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <ChevronRight className="w-4 h-4 text-primary-400 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    to={`/industries/${industry.slug}`}
                    className="inline-block w-full text-center py-3 px-6 bg-primary-400/10 hover:bg-primary-400/20 border border-primary-400/20 hover:border-primary-400/40 rounded-lg text-primary-400 font-medium transition-all duration-300 mt-2"
                    aria-label={`Explore AI solutions for ${industry.title}`}
                  >
                    Explore Solutions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-dark-800 to-dark animate-fade-in-up">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Our AI solutions are designed to help businesses of any size achieve remarkable efficiency gains and competitive advantages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="button-glow text-white px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              Schedule a Demo
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full text-lg font-semibold inline-flex items-center justify-center border border-gray-700 hover:border-primary-400 text-gray-300 hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section optimized for SEO */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SEOFAQSection />
      </div>
    </div>
  );
}