import { useState, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Code, 
  Briefcase, 
  HeartPulse, 
  ShoppingCart, 
  Home, 
  Factory,
  ArrowRight,
  Users,
  Shield,
  CheckCircle,
  Target,
  Zap,
  Building,
  TrendingUp
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Navigation from '../components/Navigation';

// Lazy load heavy components for performance
const IndustryDetailModal = lazy(() => import('../components/IndustryDetailModal'));

interface IndustryData {
  id: string;
  title: string;
  subtitle: string;
  icon: JSX.Element;
  description: string;
  challenges: string[];
  solutions: string[];
  compliance: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  deployment: {
    timeline: string;
    integration: string;
    support: string;
  };
  caseStudy?: {
    company: string;
    challenge: string;
    solution: string;
    result: string;
  };
}

const industries: IndustryData[] = [
  {
    id: 'saas',
    title: 'SaaS & Technology',
    subtitle: 'AI-powered outbound BDR solutions for high-growth software companies',
    icon: <Code className="w-8 h-8" />,
    description: 'Purpose-built AI BDR agents that understand complex software buying cycles, technical decision-makers, and product-led growth strategies. Scale your outbound engine while maintaining the personalization that converts enterprise prospects.',
    challenges: [
      'Long, complex B2B software sales cycles requiring persistent nurturing',
      'Technical prospects who demand knowledgeable, credible outbound engagement',
      'Scaling outbound while maintaining product development focus and resources',
      'Converting freemium users to paid enterprise accounts at scale'
    ],
    solutions: [
      'AI agents trained on technical documentation and use cases for credible conversations',
      'Multi-touch sequences optimized for software buying committee dynamics',
      'Integration-ready workflows that sync with your existing CRM and product analytics',
      'Automated lead scoring based on product usage, firmographic, and engagement signals'
    ],
    compliance: [
      'SOC 2 Type II compliant data handling for enterprise prospect information',
      'GDPR-compliant outbound engagement for European software markets',
      'Integration security protocols for CRM, marketing automation, and product analytics',
      'Data residency options for regulated software verticals'
    ],
    results: [
      {
        metric: 'Pipeline Velocity',
        value: '3.2x faster',
        description: 'Average time from prospect identification to qualified opportunity'
      },
      {
        metric: 'Outbound Conversion',
        value: '240% increase',
        description: 'Cold outreach to qualified meeting conversion rate'
      },
      {
        metric: 'BDR Productivity',
        value: '85% efficiency gain',
        description: 'Hours saved per qualified opportunity generated'
      }
    ],
    deployment: {
      timeline: '2-3 weeks for full deployment with CRM integration',
      integration: 'Native integrations with Salesforce, HubSpot, Outreach, and product analytics',
      support: '24/7 technical support with dedicated SaaS industry specialists'
    },
    caseStudy: {
      company: 'CloudFlow (Series B SaaS)',
      challenge: 'Needed to 5x outbound pipeline while maintaining product development velocity',
      solution: 'Deployed AI BDR agents with product usage data integration and technical conversation capabilities',
      result: '240% increase in trial-to-paid conversion with 60% reduction in sales team time investment'
    }
  },
  {
    id: 'fintech',
    title: 'Financial Services',
    subtitle: 'Compliant AI BDR solutions for banks, fintech, and financial institutions',
    icon: <Briefcase className="w-8 h-8" />,
    description: 'Regulatory-compliant AI BDR agents designed for the financial services sector. Navigate complex compliance requirements while building trust through personalized, compliant outbound engagement that respects financial industry regulations.',
    challenges: [
      'Strict regulatory compliance requirements (GDPR, CCPA, MiFID II, SOX) for client outreach',
      'High-trust sales environment where credibility and expertise are paramount',
      'Complex decision-making processes involving multiple stakeholders and risk assessments',
      'Sensitive prospect data handling requiring enhanced security and audit trails'
    ],
    solutions: [
      'Compliance-first AI trained on financial regulations and industry best practices',
      'Trust-building conversation flows designed for high-stakes financial discussions',
      'Multi-stakeholder engagement strategies for complex financial buying committees',
      'Encrypted, auditable communication channels with complete interaction logging'
    ],
    compliance: [
      'PCI DSS Level 1 compliance for payment industry prospect data',
      'SOC 2 Type II + ISO 27001 certification for financial data security',
      'GDPR Article 25 "Privacy by Design" implementation for EU prospects',
      'Configurable data retention and right-to-be-forgotten workflows'
    ],
    results: [
      {
        metric: 'Compliance Score',
        value: '100%',
        description: 'Regulatory audit compliance rate across all outbound activities'
      },
      {
        metric: 'Trust Conversion',
        value: '180% increase',
        description: 'Cold outreach to qualified financial consultation rate'
      },
      {
        metric: 'Risk Mitigation',
        value: '78% reduction',
        description: 'Decrease in compliance-related outbound communication issues'
      }
    ],
    deployment: {
      timeline: '3-4 weeks including compliance validation and regulatory review',
      integration: 'Secure APIs for Salesforce Financial Cloud, Microsoft Dynamics, and compliance tools',
      support: 'Dedicated compliance specialists and 24/7 security monitoring'
    },
    caseStudy: {
      company: 'Regional Investment Bank',
      challenge: 'Required compliant outbound prospecting for high-net-worth individuals while meeting MiFID II requirements',
      solution: 'Implemented AI BDR with regulatory compliance training and audit-ready conversation logging',
      result: '180% increase in qualified prospects with zero regulatory compliance issues over 12 months'
    }
  },
  {
    id: 'healthcare',
    title: 'Healthcare & MedTech',
    subtitle: 'HIPAA-compliant AI BDR solutions for healthcare and medical technology companies',
    icon: <HeartPulse className="w-8 h-8" />,
    description: 'Healthcare-specialized AI BDR agents that understand medical decision-making processes, clinical workflows, and regulatory requirements. Engage healthcare professionals with the clinical credibility and compliance rigor the industry demands.',
    challenges: [
      'HIPAA and medical privacy regulations requiring specialized compliance protocols',
      'Clinical decision-makers with limited time and high skepticism of sales outreach',
      'Complex healthcare buying processes involving clinical, financial, and IT stakeholders',
      'Evidence-based selling requirements with peer-reviewed research and clinical outcomes'
    ],
    solutions: [
      'HIPAA-compliant AI trained on medical terminology and clinical decision-making factors',
      'Evidence-based conversation flows incorporating clinical studies and peer research',
      'Multi-department engagement strategies for hospital and health system buying committees',
      'Clinical outcome tracking and ROI modeling specific to healthcare environments'
    ],
    compliance: [
      'HIPAA Business Associate Agreement (BAA) compliance with audit-ready documentation',
      'FDA regulated medical device marketing compliance for MedTech companies',
      'State medical board advertising compliance for licensed healthcare services',
      'Protected health information (PHI) handling with encrypted communication channels'
    ],
    results: [
      {
        metric: 'Clinical Credibility',
        value: '2.1x higher',
        description: 'Healthcare professional engagement rate vs. traditional outbound'
      },
      {
        metric: 'Compliance Rate',
        value: '100%',
        description: 'HIPAA and medical advertising compliance across all interactions'
      },
      {
        metric: 'Decision Speed',
        value: '65% faster',
        description: 'Time from initial contact to clinical evaluation meeting'
      }
    ],
    deployment: {
      timeline: '4-5 weeks including HIPAA compliance validation and clinical training',
      integration: 'Secure integrations with Epic, Cerner, Salesforce Health Cloud, and medical CRMs',
      support: 'Healthcare compliance specialists and clinical workflow experts available 24/7'
    },
    caseStudy: {
      company: 'MedTech Imaging Solutions',
      challenge: 'Needed to reach hospital radiology departments while maintaining HIPAA compliance and clinical credibility',
      solution: 'Deployed AI BDR with clinical imaging expertise and evidence-based conversation capabilities',
      result: '165% increase in qualified clinical evaluations with zero compliance violations across 18-month deployment'
    }
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Retail',
    subtitle: 'AI BDR solutions for e-commerce platforms, retail technology, and consumer brands',
    icon: <ShoppingCart className="w-8 h-8" />,
    description: 'E-commerce-focused AI BDR agents that understand retail buying cycles, seasonal demand patterns, and omnichannel commerce strategies. Accelerate B2B partnerships, vendor relationships, and enterprise retail technology adoption.',
    challenges: [
      'Seasonal buying patterns requiring precise timing and inventory-aware outreach',
      'Multi-channel retail decision-makers spanning online, in-store, and mobile commerce',
      'Price-sensitive market requiring value-driven conversations and ROI justification',
      'Rapid technology adoption cycles demanding up-to-date knowledge of commerce trends'
    ],
    solutions: [
      'Seasonally-aware AI trained on retail calendar patterns and consumer behavior data',
      'Omnichannel conversation flows addressing online, mobile, and brick-and-mortar challenges',
      'ROI-focused messaging with retail-specific metrics and benchmark comparisons',
      'Real-time commerce trend integration for timely and relevant outbound conversations'
    ],
    compliance: [
      'PCI DSS compliance for payment processing and customer data discussions',
      'CCPA and GDPR compliance for consumer data privacy in retail technology conversations',
      'E-commerce platform security standards (Shopify, Magento, WooCommerce) awareness',
      'Consumer protection regulation compliance for retail marketing technology'
    ],
    results: [
      {
        metric: 'Seasonal Optimization',
        value: '4.1x increase',
        description: 'Peak season partnership and vendor opportunity conversion'
      },
      {
        metric: 'Channel Expansion',
        value: '320% growth',
        description: 'New retail channel and marketplace partnership development'
      },
      {
        metric: 'Technology Adoption',
        value: '92% faster',
        description: 'Enterprise retail technology evaluation to pilot timeline'
      }
    ],
    deployment: {
      timeline: '2-3 weeks with seasonal calendar integration and retail platform connectivity',
      integration: 'Native connections to Shopify, Magento, Salesforce Commerce Cloud, and retail CRMs',
      support: 'Retail industry specialists with peak season scaling and 24/7 availability'
    },
    caseStudy: {
      company: 'Enterprise Retail Technology Platform',
      challenge: 'Needed to accelerate enterprise retail client acquisition during competitive peak seasons',
      solution: 'Implemented seasonally-intelligent AI BDR with retail-specific value proposition training',
      result: '320% increase in qualified enterprise retail demos with 90% improvement in seasonal timing accuracy'
    }
  },
  {
    id: 'realestate',
    title: 'Real Estate & PropTech',
    subtitle: 'AI BDR solutions for real estate technology, property management, and construction companies',
    icon: <Home className="w-8 h-8" />,
    description: 'Real estate-specialized AI BDR agents that understand property cycles, regional market dynamics, and real estate professional workflows. Engage property managers, real estate agents, and construction decision-makers with market-relevant insights.',
    challenges: [
      'Regional market variations requiring localized knowledge and market-specific insights',
      'Transaction-based sales cycles with long lead times and multiple stakeholder involvement',
      'Relationship-driven industry where trust and local reputation are critical factors',
      'Regulatory compliance varying by state, county, and municipality requirements'
    ],
    solutions: [
      'Geographically-aware AI trained on local market conditions and regional regulations',
      'Long-term nurturing sequences designed for extended real estate decision cycles',
      'Relationship-building conversation flows emphasizing local expertise and market knowledge',
      'Multi-jurisdictional compliance awareness for varied real estate regulatory environments'
    ],
    compliance: [
      'Real Estate Settlement Procedures Act (RESPA) compliance for mortgage-related discussions',
      'State real estate licensing law compliance for regulated service conversations',
      'Fair Housing Act compliance for property-related marketing and outreach',
      'Local MLS and real estate board regulation adherence for market data usage'
    ],
    results: [
      {
        metric: 'Market Penetration',
        value: '2.5x improvement',
        description: 'New geographic market and territory expansion success rate'
      },
      {
        metric: 'Professional Trust',
        value: '195% increase',
        description: 'Real estate professional engagement and referral generation'
      },
      {
        metric: 'Deal Velocity',
        value: '70% faster',
        description: 'Time from initial contact to property technology evaluation'
      }
    ],
    deployment: {
      timeline: '3-4 weeks including regional market data integration and compliance validation',
      integration: 'MLS integration, Salesforce Real Estate Edition, and property management CRMs',
      support: 'Regional real estate specialists with local market expertise and compliance knowledge'
    },
    caseStudy: {
      company: 'PropTech Construction Management Platform',
      challenge: 'Required expansion into new regional markets while building trust with local construction and property management professionals',
      solution: 'Deployed regionally-aware AI BDR with local market knowledge and relationship-building capabilities',
      result: '195% increase in qualified regional partnerships with 85% improvement in local market credibility scores'
    }
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Industrial',
    subtitle: 'AI BDR solutions for manufacturing technology, industrial automation, and supply chain companies',
    icon: <Factory className="w-8 h-8" />,
    description: 'Manufacturing-focused AI BDR agents that understand industrial processes, supply chain complexities, and operational efficiency requirements. Engage plant managers, procurement teams, and industrial engineers with process-relevant solutions.',
    challenges: [
      'Long capital equipment sales cycles requiring extensive technical validation and ROI justification',
      'Risk-averse decision-making culture prioritizing proven solutions and operational continuity',
      'Complex buying committees spanning operations, engineering, procurement, and executive leadership',
      'Industry-specific regulations and safety standards requiring specialized knowledge and compliance'
    ],
    solutions: [
      'Industrial process-trained AI with deep understanding of manufacturing workflows and efficiency metrics',
      'Risk-mitigation focused conversations emphasizing proven implementations and operational reliability',
      'Multi-stakeholder engagement strategies addressing technical, financial, and operational concerns',
      'Compliance-aware messaging incorporating relevant safety standards and regulatory requirements'
    ],
    compliance: [
      'OSHA workplace safety regulation compliance for industrial technology discussions',
      'ISO 9001/14001 quality and environmental management system awareness',
      'Industry-specific standards (NIST, ANSI, IEC) compliance for manufacturing technology',
      'Supply chain security requirements (CMMC, ISO 28000) for defense and critical infrastructure'
    ],
    results: [
      {
        metric: 'Technical Credibility',
        value: '1.9x higher',
        description: 'Engineering and operations professional engagement rate'
      },
      {
        metric: 'Capital Investment',
        value: '145% increase',
        description: 'Manufacturing technology evaluation to purchase conversion'
      },
      {
        metric: 'Process Efficiency',
        value: '60% improvement',
        description: 'Time from initial contact to technical proof-of-concept approval'
      }
    ],
    deployment: {
      timeline: '4-6 weeks including industrial process training and compliance certification',
      integration: 'ERP system integration (SAP, Oracle), MES platforms, and industrial IoT connectivity',
      support: 'Manufacturing industry engineers and compliance specialists with 24/7 technical support'
    },
    caseStudy: {
      company: 'Industrial Automation Solutions Provider',
      challenge: 'Needed to penetrate automotive and aerospace manufacturing markets with complex technical buying processes',
      solution: 'Implemented manufacturing-specialized AI BDR with industry process expertise and multi-stakeholder engagement',
      result: '145% increase in qualified technical evaluations with 75% improvement in engineering stakeholder engagement'
    }
  }
];


// Industry Card Component
const IndustryCard = ({ industry, onSelect, index }: { industry: IndustryData; onSelect: (industry: IndustryData) => void; index: number }) => {
  const getGradient = (id: string) => {
    const gradients = {
      saas: 'from-blue-500 to-cyan-600',
      fintech: 'from-emerald-500 to-teal-600', 
      healthcare: 'from-pink-500 to-rose-600',
      ecommerce: 'from-purple-500 to-indigo-600',
      realestate: 'from-orange-500 to-amber-600',
      manufacturing: 'from-slate-500 to-gray-600'
    };
    return gradients[id as keyof typeof gradients] || 'from-primary-500 to-primary-600';
  };

  const gradient = getGradient(industry.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group cursor-pointer"
      onClick={() => onSelect(industry)}
    >
      <div className="relative h-auto bg-dark-light border border-dark-700/50 hover:border-primary-400/30 transition-all duration-500 overflow-hidden rounded-xl">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
        
        <div className="p-4 relative z-10 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {industry.icon}
            </div>
            <div className="px-2 py-1 bg-primary-400/10 text-primary-400 border border-primary-400/20 rounded text-xs font-medium">
              AI Ready
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
              {industry.title}
            </h3>
            
            <p className="text-primary-400 text-sm font-medium mb-3">
              {industry.subtitle}
            </p>
            
            <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
              {industry.description.substring(0, 120)}...
            </p>

            {/* Key Solutions */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                <Target className="w-3 h-3 text-primary-400" />
                Key Solutions
              </h4>
              <ul className="space-y-1">
                {industry.solutions.slice(0, 2).map((solution: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <div className="w-1 h-1 bg-primary-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    {solution.substring(0, 45)}...
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {industry.results.slice(0, 3).map((result, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-sm font-bold text-primary-400">{result.value}</div>
                  <div className="text-xs text-gray-400 truncate">{result.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-dark-700/30">
            <div className="flex items-center justify-between text-gray-300 group-hover:text-white transition-colors duration-300">
              <span className="font-medium">View Solutions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>

          {/* Case Study Preview */}
          {industry.caseStudy && (
            <div className="mt-3 p-2 bg-dark-800/50 rounded-lg border border-dark-700/30">
              <div className="flex items-center gap-1 mb-1">
                <Building className="w-3 h-3 text-primary-400" />
                <span className="text-xs font-medium text-primary-400">Case Study</span>
              </div>
              <p className="text-xs text-gray-300 font-medium truncate">{industry.caseStudy.company}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{industry.caseStudy.result}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryData | null>(null);

  const handleSelectIndustry = useCallback((industry: IndustryData) => {
    setSelectedIndustry(industry);
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Solutions by Industry | Enai.ai - Outbound BDR Automation</title>
        <meta name="description" content="Discover how Enai.ai's AI outbound BDR agents transform sales across industries. SaaS, FinTech, Healthcare, E-commerce, Real Estate & Manufacturing solutions." />
        <meta name="keywords" content="AI outbound BDR, industry automation, SaaS sales AI, fintech automation, healthcare AI, ecommerce AI, real estate AI, manufacturing AI" />
        <link rel="canonical" href="https://www.enai.ai/industries" />
        
        {/* Industry-specific schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Solutions by Industry",
            "description": "Discover how our AI outbound BDR agents transform sales across different industries",
            "provider": {
              "@type": "Organization",
              "name": "Enai.ai",
              "url": "https://www.enai.ai"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": industries.map((industry, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Service",
                  "name": `AI Solutions for ${industry.title}`,
                  "description": industry.description
                }
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-dark text-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-dark relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary-400/10 border border-primary-400/20 rounded-full">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <span className="text-primary-400 text-sm font-medium">INDUSTRY SOLUTIONS</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  AI Solutions by 
                  <span className="bg-gradient-to-r from-primary-400 to-primary-500 bg-clip-text text-transparent"> Industry</span>
                </h1>
                
                <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Purpose-built AI BDR agents designed for your industry's unique challenges, 
                  compliance requirements, and growth opportunities.
                </p>

                {/* Trust indicators */}
                <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">6+</div>
                    <div className="text-gray-400 text-sm">Industries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">240%</div>
                    <div className="text-gray-400 text-sm">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">85%</div>
                    <div className="text-gray-400 text-sm">Efficiency Gain</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Industry-Specific AI */}
        <section className="py-16 bg-dark-light">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Why Industry-Specific AI Matters
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Generic outbound approaches fail because they ignore the unique challenges and decision-making 
                  processes that define each industry. Our AI is purpose-built for your vertical.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Sector-Specific Training",
                    description: "AI trained on your industry's language, challenges, and success patterns",
                    iconColor: "text-primary-400"
                  },
                  {
                    icon: Shield,
                    title: "Built-in Compliance",
                    description: "Regulatory compliance and industry standards embedded from day one",
                    iconColor: "text-primary-400"
                  },
                  {
                    icon: Users,
                    title: "Buyer Journey Optimization",
                    description: "Conversations designed for your industry's decision-making process",
                    iconColor: "text-primary-400"
                  },
                  {
                    icon: TrendingUp,
                    title: "Proven ROI",
                    description: "Measurable results across all industry verticals we serve",
                    iconColor: "text-primary-400"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="p-4 bg-primary-400/10 rounded-xl w-fit mx-auto mb-4 border border-primary-400/20">
                      <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 bg-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Choose Your Industry
                </h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Select your industry to discover how our AI BDR agents address your specific challenges, 
                  compliance requirements, and growth opportunities.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {industries.map((industry, index) => (
                  <IndustryCard 
                    key={industry.id}
                    industry={industry}
                    onSelect={handleSelectIndustry}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-dark-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Industry?
                </h2>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Join industry leaders who've already seen 240%+ ROI with our AI outbound BDR agents. 
                  Get a custom demo for your specific industry.
                </p>
                
                {/* Trust indicators */}
                <div className="grid grid-cols-3 gap-8 mb-8 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">SOC 2</div>
                    <div className="text-sm text-gray-400">Type II Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">24/7</div>
                    <div className="text-sm text-gray-400">Expert Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-400 mb-1">2-3 weeks</div>
                    <div className="text-sm text-gray-400">Deployment Time</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    Get Industry Demo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <Link to="/contact">
                    <button className="px-8 py-4 border border-dark-600 text-gray-300 hover:bg-dark-800 font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                      <Users className="w-5 h-5" />
                      Talk to Expert
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Industry Detail Modal */}
        <Suspense fallback={null}>
          {selectedIndustry && (
            <IndustryDetailModal 
              industry={selectedIndustry}
              onClose={() => setSelectedIndustry(null)}
            />
          )}
        </Suspense>
      </div>
    </>
  );
}