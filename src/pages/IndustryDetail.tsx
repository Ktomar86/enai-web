import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  ArrowLeft, 
  Zap, 
  BarChart, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  DollarSign, 
  Brain, 
  TrendingUp,
  Code,
  Briefcase,
  HeartPulse,
  Home,
  ShoppingBag,
  Truck,
  BookOpen,
  Layers
} from 'lucide-react';

// Enhanced industry insights with startup-appropriate positioning
const industryInsights = {
  saas: {
    title: "Technology (SaaS)",
    subtitle: "Empower your SaaS business with AI-driven automation",
    icon: <Code className="w-12 h-12 text-primary-400" />,
    description: "Our AI platform enables growing SaaS companies to streamline operations, improve customer engagement, and drive revenue growth through intelligent automation and data-driven insights.",
    insights: [
      {
        title: "AI-Powered Customer Service Automation",
        description: "Implement AI-powered customer service automation to significantly improve response times and customer satisfaction, while reducing the workload on your support team.",
        source: "Based on industry best practices",
        impact: [
          "Potential for immediate response to customer queries",
          "Up to 45% increase in customer satisfaction scores",
          "Reduced support team workload by up to 60%"
        ],
        metrics: {
          time: "Response time reduced from hours to minutes",
          cost: "Support costs decreased by up to 40%"
        }
      },
      {
        title: "AI-Driven Lead Scoring & Qualification",
        description: "Utilize AI to automatically qualify and score leads based on behavior, engagement, and firmographic data, helping sales teams focus on the most promising opportunities.",
        source: "Optimized for SaaS sales processes",
        impact: [
          "Potential for more accurate lead prioritization",
          "Up to 35% shorter sales cycles",
          "Improved conversion rates by focusing on qualified prospects"
        ],
        metrics: {
          efficiency: "Sales team efficiency increased by up to 78%",
          revenue: "Potential revenue increase of 25%+"
        }
      },
      {
        title: "Intelligent Customer Onboarding",
        description: "Create personalized, automated onboarding experiences that adapt to each customer's needs and usage patterns, dramatically improving product adoption.",
        source: "Built on customer success principles",
        impact: [
          "Streamlined onboarding experience reduces time-to-value",
          "Potential for higher customer retention rates",
          "Reduced support requirements during critical adoption phase"
        ],
        metrics: {
          adoption: "Product adoption rates improved by up to 52%",
          churn: "Customer churn reduced by up to 38%"
        }
      }
    ],
    benefits: [
      "Automate repetitive customer service tasks",
      "Focus sales efforts on the most promising leads",
      "Scale customer success operations efficiently",
      "Reduce customer acquisition costs"
    ]
  },
  "financial-services": {
    title: "Financial Services",
    subtitle: "Transform client engagement and compliance processes",
    icon: <Briefcase className="w-12 h-12 text-primary-400" />,
    description: "Our AI solutions help financial services firms enhance client relationships, streamline compliance processes, and improve operational efficiency through intelligent automation.",
    insights: [
      {
        title: "Advanced Risk Detection & Compliance",
        description: "Implement AI-driven risk assessment and compliance monitoring to enhance fraud detection while reducing false positives and compliance workload.",
        source: "Based on financial industry standards",
        impact: [
          "Potential for enhanced fraud prevention with up to 85% accuracy",
          "Improved risk assessment precision",
          "Significantly reduced false positives"
        ],
        metrics: {
          compliance: "Compliance processing time reduced by up to 85%",
          accuracy: "Detection accuracy improved by up to 76%"
        }
      },
      {
        title: "AI-Enhanced Client Onboarding",
        description: "Streamline client onboarding through intelligent workflow automation that maintains compliance while dramatically improving the client experience.",
        source: "Designed for regulatory compliance",
        impact: [
          "Faster client onboarding potentially reducing time by 70%",
          "Enhanced compliance accuracy through automated checks",
          "Significantly improved client experience"
        ],
        metrics: {
          time: "Onboarding time potentially reduced from weeks to days",
          satisfaction: "Client satisfaction scores could increase by 65%"
        }
      },
      {
        title: "Intelligent Portfolio Management",
        description: "Leverage AI-driven insights to enhance portfolio management strategies, leading to more informed decision-making and improved client outcomes.",
        source: "Built on financial analytics best practices",
        impact: [
          "Enhanced portfolio performance through data-driven insights",
          "Better risk management with predictive analytics",
          "Increased client satisfaction through personalized strategies"
        ],
        metrics: {
          performance: "Portfolio analysis efficiency improved by up to 58%",
          insights: "10x more data points analyzed for investment decisions"
        }
      }
    ],
    benefits: [
      "Ensure regulatory compliance with automated checks",
      "Enhance client relationships through personalized service",
      "Improve decision-making with data-driven insights",
      "Reduce operational costs while improving service quality"
    ]
  },
  healthcare: {
    title: "Healthcare",
    subtitle: "Optimize patient care and administrative efficiency",
    icon: <HeartPulse className="w-12 h-12 text-primary-400" />,
    description: "Our AI platform helps healthcare providers enhance patient engagement, streamline administrative tasks, and improve care coordination through intelligent automation.",
    insights: [
      {
        title: "Intelligent Appointment Scheduling",
        description: "Implement AI-powered scheduling to optimize appointment management and reduce no-shows across healthcare networks.",
        source: "Designed for healthcare providers",
        impact: [
          "Optimized appointment scheduling reducing wait times by up to 45%",
          "Potential reduction in no-shows by up to 42%",
          "Improved overall patient experience and satisfaction"
        ],
        metrics: {
          efficiency: "Staff time on scheduling reduced by up to 72%",
          utilization: "Facility utilization potentially increased by 32%"
        }
      },
      {
        title: "AI-Driven Care Coordination",
        description: "Utilize AI to coordinate patient care across departments and providers, ensuring seamless communication and follow-up procedures.",
        source: "Built on healthcare best practices",
        impact: [
          "Enhanced care coordination through automated workflows",
          "Potential for better patient outcomes with consistent follow-up",
          "Streamlined communication between providers"
        ],
        metrics: {
          communication: "Provider communication delays reduced by up to 68%",
          outcomes: "Patient adherence to care plans improved by up to 47%"
        }
      },
      {
        title: "Resource Optimization & Staffing",
        description: "Leverage AI to optimize resource allocation and staffing, leading to more efficient operations and improved patient care.",
        source: "Based on healthcare operations research",
        impact: [
          "Optimized staff scheduling matching demand patterns",
          "Improved resource utilization across departments",
          "Enhanced care quality through appropriate staffing levels"
        ],
        metrics: {
          staffing: "Staffing cost optimized by up to 23%",
          satisfaction: "Staff satisfaction potentially increased by 34%"
        }
      }
    ],
    benefits: [
      "Reduce administrative burden on healthcare staff",
      "Improve patient satisfaction and engagement",
      "Enhance care coordination and follow-up",
      "Optimize resource allocation for better patient care"
    ]
  },
  ecommerce: {
    title: "E-commerce & Retail",
    subtitle: "Drive sales and enhance customer experiences",
    icon: <ShoppingBag className="w-12 h-12 text-primary-400" />,
    description: "Our AI solutions help e-commerce and retail businesses personalize customer experiences, optimize inventory management, and increase sales through intelligent automation.",
    insights: [
      {
        title: "AI-Powered Recommendation Engine",
        description: "Implement an intelligent recommendation system to deliver personalized shopping experiences and increase customer engagement.",
        source: "Optimized for e-commerce platforms",
        impact: [
          "Highly personalized shopping experiences tailored to individual customers",
          "Potential for increased customer engagement by up to 85%",
          "Higher repeat purchases through relevant recommendations"
        ],
        metrics: {
          conversion: "Conversion rates potentially increased by 37%",
          aov: "Average order value could increase by 28%"
        }
      },
      {
        title: "Intelligent Inventory Management",
        description: "Utilize AI-driven inventory forecasting to optimize stock levels and predict demand patterns with remarkable accuracy.",
        source: "Based on retail analytics best practices",
        impact: [
          "Improved inventory accuracy reducing overstocking and stockouts",
          "Better demand forecasting through pattern recognition",
          "Reduced warehousing costs through optimal inventory levels"
        ],
        metrics: {
          stockouts: "Stockout incidents potentially reduced by 62%",
          carrying: "Inventory carrying costs decreased by up to 31%"
        }
      },
      {
        title: "AI Customer Support Automation",
        description: "Implement automated customer support systems that resolve common issues instantly while escalating complex problems to human agents.",
        source: "Designed for retail customer service",
        impact: [
          "Faster response times to customer inquiries",
          "Enhanced customer satisfaction through immediate assistance",
          "Efficient issue resolution prioritizing human intervention where needed"
        ],
        metrics: {
          resolution: "First-contact resolution rate improved by up to 58%",
          cost: "Support costs potentially reduced by 45%"
        }
      }
    ],
    benefits: [
      "Increase sales through personalized customer experiences",
      "Optimize inventory levels and reduce carrying costs",
      "Enhance customer service while reducing support costs",
      "Gain actionable insights from customer behavior data"
    ]
  },
  "real-estate": {
    title: "Real Estate",
    subtitle: "Transform property marketing and client engagement",
    icon: <Home className="w-12 h-12 text-primary-400" />,
    description: "Our AI platform helps real estate professionals qualify leads, match properties to buyers, and automate client communications to close more deals with less effort.",
    insights: [
      {
        title: "AI-Powered Lead Qualification",
        description: "Implement intelligent lead qualification to identify the most promising potential buyers and sellers, helping agents focus their time effectively.",
        source: "Optimized for real estate sales",
        impact: [
          "More effectively qualified leads based on behavioral patterns",
          "Potential for faster deal closures with pre-qualified prospects",
          "Improved agent efficiency through automated prioritization"
        ],
        metrics: {
          quality: "Lead quality potentially improved by up to 63%",
          conversion: "Lead-to-client conversion increased by up to 48%"
        }
      },
      {
        title: "Intelligent Property Matching",
        description: "Utilize AI to match properties with potential buyers based on preferences, behavior, and historical data, dramatically increasing showing-to-sale conversion.",
        source: "Based on property analytics",
        impact: [
          "More accurate property matches based on buyer preferences",
          "Improved buyer satisfaction through relevant recommendations",
          "Faster property sales through qualified showings"
        ],
        metrics: {
          showings: "Required showings per sale reduced by up to 56%",
          satisfaction: "Buyer satisfaction potentially increased by 74%"
        }
      },
      {
        title: "Virtual Tour & Viewing Automation",
        description: "Implement AI-enhanced virtual tours and viewing scheduling that streamline the property discovery process for buyers.",
        source: "Designed for modern real estate marketing",
        impact: [
          "Enhanced viewing experience with interactive virtual tours",
          "Increased efficiency in showing scheduling and follow-up",
          "Better buyer engagement through immersive property experiences"
        ],
        metrics: {
          reach: "Property reach potentially increased by 3.5x",
          efficiency: "Agent time on showings reduced by up to 42%"
        }
      }
    ],
    benefits: [
      "Focus on the highest-quality leads and opportunities",
      "Match buyers with properties more efficiently",
      "Automate routine client communications and follow-ups",
      "Increase showing-to-sale conversion rates"
    ]
  },
  manufacturing: {
    title: "Manufacturing",
    subtitle: "Optimize production and supply chain operations",
    icon: <Truck className="w-12 h-12 text-primary-400" />,
    description: "Our AI solutions help manufacturing companies enhance production efficiency, improve quality control, and optimize supply chain operations through intelligent automation.",
    insights: [
      {
        title: "Predictive Maintenance & Equipment Optimization",
        description: "Implement AI-driven predictive maintenance to anticipate equipment failures before they occur, minimizing downtime and maximizing production efficiency.",
        source: "Based on manufacturing analytics",
        impact: [
          "Optimized maintenance scheduling based on equipment condition",
          "Potential for improved equipment life and performance",
          "Enhanced inventory management for maintenance parts"
        ],
        metrics: {
          downtime: "Unplanned downtime potentially reduced by 76%",
          costs: "Maintenance costs decreased by up to 42%"
        }
      },
      {
        title: "AI-Powered Quality Control",
        description: "Utilize computer vision and AI for quality inspection, catching defects that human inspectors might miss while processing at scale.",
        source: "Designed for manufacturing quality assurance",
        impact: [
          "Reduced defect rates through consistent inspection standards",
          "Improved maintenance efficiency through targeted interventions",
          "Extended equipment life through early problem detection"
        ],
        metrics: {
          defects: "Quality control accuracy improved by up to 43%",
          returns: "Customer returns potentially reduced by 37%"
        }
      },
      {
        title: "Supply Chain Optimization",
        description: "Leverage AI for supply chain management to set new standards in efficiency and logistics optimization across the manufacturing process.",
        source: "Based on supply chain best practices",
        impact: [
          "Optimized supply chain through predictive analytics",
          "Improved delivery times with intelligent logistics",
          "Enhanced inventory management reducing carrying costs"
        ],
        metrics: {
          efficiency: "Supply chain efficiency potentially increased by 52%",
          costs: "Logistics costs reduced by up to 31%"
        }
      }
    ],
    benefits: [
      "Reduce unplanned downtime and maintenance costs",
      "Improve product quality and consistency",
      "Optimize inventory levels and supply chain operations",
      "Enhance production scheduling and resource allocation"
    ]
  },
  education: {
    title: "Education",
    subtitle: "Enhance student engagement and operational efficiency",
    icon: <BookOpen className="w-12 h-12 text-primary-400" />,
    description: "Our AI platform helps educational institutions improve student engagement, personalize learning experiences, and streamline administrative processes through intelligent automation.",
    insights: [
      {
        title: "AI-Enhanced Student Engagement",
        description: "Implement intelligent student engagement systems that transform recruitment, retention, and communication processes throughout the student lifecycle.",
        source: "Designed for educational institutions",
        impact: [
          "Enhanced student engagement through personalized communications",
          "Potential for improved enrollment and retention rates",
          "Better student experience from application to graduation"
        ],
        metrics: {
          engagement: "Student engagement potentially increased by 65%",
          retention: "Student retention improved by up to 42%"
        }
      },
      {
        title: "Adaptive Learning Support Systems",
        description: "Utilize AI-driven learning support to revolutionize online education and improve student outcomes through personalized educational paths.",
        source: "Based on educational technology research",
        impact: [
          "Improved course completion rates through targeted interventions",
          "Enhanced learning outcomes with personalized support",
          "Better student support through early identification of challenges"
        ],
        metrics: {
          completion: "Course completion rates potentially increased by 58%",
          satisfaction: "Student satisfaction improved by up to 63%"
        }
      },
      {
        title: "Administrative Process Automation",
        description: "Leverage AI for resource scheduling and administrative tasks to transform educational efficiency and the overall student experience.",
        source: "Optimized for educational operations",
        impact: [
          "Optimized scheduling of classes, faculty, and facilities",
          "Better resource utilization across the institution",
          "Enhanced learning experience through efficient operations"
        ],
        metrics: {
          efficiency: "Administrative efficiency potentially increased by 47%",
          costs: "Operational costs reduced by up to 28%"
        }
      }
    ],
    benefits: [
      "Improve student recruitment and retention rates",
      "Enhance learning outcomes through personalized support",
      "Streamline administrative processes and reduce costs",
      "Gain insights from educational data for continuous improvement"
    ]
  },
  logistics: {
    title: "Logistics & Supply Chain",
    subtitle: "Optimize routing, forecasting, and delivery operations",
    icon: <Layers className="w-12 h-12 text-primary-400" />,
    description: "Our AI solutions help logistics and supply chain companies optimize routes, forecast demand, and improve delivery reliability through intelligent automation.",
    insights: [
      {
        title: "Intelligent Route Optimization",
        description: "Implement AI-powered route optimization to calculate the most efficient delivery paths considering multiple variables including traffic, weather, and vehicle constraints.",
        source: "Based on logistics analytics",
        impact: [
          "Optimized delivery routes reducing fuel consumption and time",
          "Improved driver efficiency and productivity",
          "Enhanced customer satisfaction through on-time deliveries"
        ],
        metrics: {
          costs: "Transportation costs potentially reduced by 32%",
          efficiency: "Driver productivity increased by up to 28%"
        }
      },
      {
        title: "AI-Driven Demand Forecasting",
        description: "Utilize advanced predictive analytics to forecast inventory needs with remarkable accuracy, reducing both stockouts and excess inventory.",
        source: "Designed for supply chain management",
        impact: [
          "More accurate demand predictions through pattern recognition",
          "Reduced inventory costs through optimal stock levels",
          "Improved customer satisfaction by ensuring product availability"
        ],
        metrics: {
          accuracy: "Forecasting accuracy potentially improved by 53%",
          inventory: "Inventory carrying costs reduced by up to 27%"
        }
      },
      {
        title: "Delivery Performance Optimization",
        description: "Leverage AI to improve on-time delivery performance through predictive analytics and real-time adjustments to logistics operations.",
        source: "Optimized for delivery operations",
        impact: [
          "Enhanced on-time delivery through predictive logistics",
          "Improved customer satisfaction with reliable service",
          "Better resource utilization across the delivery network"
        ],
        metrics: {
          otd: "On-time delivery potentially improved by 47%",
          satisfaction: "Customer satisfaction scores increased by up to 58%"
        }
      }
    ],
    benefits: [
      "Reduce transportation costs and improve delivery efficiency",
      "Optimize inventory levels based on accurate demand forecasts",
      "Enhance visibility across the supply chain",
      "Improve customer satisfaction through reliable deliveries"
    ]
  }
};

// Get SEO-optimized schema markup for the industry
const getSchemaMarkup = (slug: string | undefined, industry: any) => {
  const safeSlug = slug || 'default';
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `AI Solutions for ${industry.title}`,
    "description": industry.description,
    "image": `https://yourcompany.com/images/industries/${safeSlug}.jpg`,
    "author": {
      "@type": "Organization",
      "name": "Your Company Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Company Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourcompany.com/logo.png"
      }
    },
    "datePublished": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourcompany.com/industries/${safeSlug}`
    }
  };
};

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = industryInsights[slug as keyof typeof industryInsights];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  if (!industry) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Industry Not Found</h1>
          <p className="text-gray-400 mb-8">The industry you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/industries"
            className="px-6 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors"
          >
            View All Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <Helmet>
        <title>AI Solutions for {industry.title} | Intelligent Automation Platform</title>
        <meta name="description" content={industry.description} />
        <meta name="keywords" content={`ai solutions, ${slug}, automation, ${slug} optimization, ai for ${slug}, ${slug} efficiency, business intelligence, ${industry.title.toLowerCase()}`} />
        <link rel="canonical" href={`https://yourcompany.com/industries/${slug}`} />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`AI Solutions for ${industry.title} | Intelligent Automation Platform`} />
        <meta property="og:description" content={industry.description} />
        <meta property="og:url" content={`https://yourcompany.com/industries/${slug}`} />
        <meta property="og:image" content={`https://yourcompany.com/images/industries/${slug}.jpg`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`AI Solutions for ${industry.title} | Intelligent Automation Platform`} />
        <meta name="twitter:description" content={industry.description} />
        <meta name="twitter:image" content={`https://yourcompany.com/images/industries/${slug}.jpg`} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(getSchemaMarkup(slug, industry))}
        </script>
      </Helmet>
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark to-dark-800">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/industries"
            className="inline-flex items-center text-gray-300 hover:text-primary-400 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Link>
          
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-dark-900/80 border border-primary-400/30 flex items-center justify-center mr-6">
              {industry.icon}
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">{industry.title}</span>
              </h1>
              <p className="text-xl text-gray-300 mt-3">{industry.subtitle}</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mt-8">
            {industry.description}
          </p>
          
          <div className="mt-12 flex flex-wrap gap-4">
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
              Request Information
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits for {industry.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industry.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-dark-900/80 border border-dark-700 hover:border-primary-400 transition-all duration-300"
              >
                <CheckCircle className="w-10 h-10 text-primary-400 mb-4" />
                <p className="text-gray-200">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">How Our AI Platform Can Transform {industry.title}</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Discover the potential applications and benefits of our AI solutions for your business
          </p>
          <div className="grid lg:grid-cols-3 gap-10">
            {industry.insights.map((insight, index) => (
              <div 
                key={index}
                className="bg-dark-800 border border-dark-700 hover:border-primary-400 transition-all duration-300 rounded-2xl overflow-hidden"
              >
                {/* Header Section */}
                <div className="p-8 border-b border-dark-700">
                  <h3 className="text-2xl font-semibold mb-4 text-white">{insight.title}</h3>
                  <p className="text-gray-300 mb-6">{insight.description}</p>
                  <div className="text-sm text-primary-400 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    {insight.source}
                  </div>
                </div>
                
                {/* Impact Section */}
                <div className="p-8 pt-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center text-white">
                    <Zap className="w-5 h-5 mr-2 text-primary-400" />
                    Potential Impact
                  </h4>
                  <div className="space-y-3 mb-8">
                    {insight.impact.map((item, idx) => (
                      <div key={idx} className="flex items-center text-gray-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-primary-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  
                  {/* Metrics Section */}
                  {insight.metrics && (
                    <div>
                      <h4 className="text-lg font-medium mb-4 flex items-center text-white">
                        <BarChart className="w-5 h-5 mr-2 text-primary-400" />
                        Expected Metrics
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(insight.metrics).map(([key, value]) => (
                          <div key={key} className="bg-dark-900/60 rounded-lg p-4">
                            <div className="text-primary-400 font-medium capitalize text-sm mb-1">{key}</div>
                            <div className="text-white">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Implementation Process</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Our streamlined approach ensures a smooth transition to AI-powered operations
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-dark-900/80 border border-dark-700 hover:border-primary-400 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-400/20 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-xl font-semibold mb-2">1. Discovery</div>
              <p className="text-gray-300">We analyze your existing workflows and identify key opportunities for AI enhancement</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-dark-900/80 border border-dark-700 hover:border-primary-400 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-400/20 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-xl font-semibold mb-2">2. Solution Design</div>
              <p className="text-gray-300">Our team creates a tailored AI solution designed specifically for your business needs</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-dark-900/80 border border-dark-700 hover:border-primary-400 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-400/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-xl font-semibold mb-2">3. Implementation</div>
              <p className="text-gray-300">Quick deployment with minimal disruption to your existing operations</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-dark-900/80 border border-dark-700 hover:border-primary-400 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-full bg-primary-400/20 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary-400" />
              </div>
              <div className="text-xl font-semibold mb-2">4. Optimization</div>
              <p className="text-gray-300">Continuous improvement based on performance data and your feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-dark-800 to-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-8">Ready to Transform Your {industry.title} Business?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Our AI solutions are specifically designed to address the unique challenges and opportunities in the {industry.title.toLowerCase()} industry.
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
    </div>
  );
}