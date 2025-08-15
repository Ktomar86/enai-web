import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const londonBusinessStats = [
  { metric: "40%", description: "Average increase in qualified leads for London businesses using Enai.ai" },
  { metric: "£250k", description: "Additional revenue generated per year for typical London SME clients" },
  { metric: "85%", description: "Reduction in manual sales tasks for UK businesses" },
  { metric: "24/7", description: "AI support covering all UK time zones and beyond" }
];

const londonCaseStudies = [
  {
    company: "London FinTech Startup",
    industry: "Financial Technology",
    challenge: "Scaling B2B sales in competitive London market",
    solution: "AI-powered lead qualification and personalized outreach campaigns",
    results: "300% increase in qualified meetings, £500k ARR in 6 months",
    location: "Canary Wharf, London"
  },
  {
    company: "Manchester SaaS Company",
    industry: "Software as a Service", 
    challenge: "Expanding from Manchester to London market",
    solution: "Geo-targeted AI campaigns and local market intelligence",
    results: "Successfully entered London market, 200% revenue growth",
    location: "Expanding to London"
  },
  {
    company: "Birmingham Manufacturing Firm",
    industry: "Industrial Manufacturing",
    challenge: "Modernizing traditional sales processes",
    solution: "AI workflow automation and CRM integration",
    results: "60% reduction in sales cycle, 45% increase in deal size",
    location: "Birmingham, expanding UK-wide"
  }
];

const ukMarketInsights = [
  "London represents 23% of UK GDP - our AI helps tap into this massive market",
  "UK B2B buyers prefer email and LinkedIn - channels our AI excels at",
  "GDPR compliance built-in for all EU and UK operations",
  "Local business hours optimization (9 AM - 5 PM GMT) for maximum engagement",
  "Integration with UK-specific tools like Sage, Xero, and local CRM systems"
];

export default function LondonPage() {
  return (
    <>
      <Helmet>
        <title>AI Sales Automation London UK - Enai.ai | B2B Sales AI for London Businesses</title>
        <meta name="description" content="Transform your London business with Enai.ai's AI sales automation. Serving London, Manchester, Birmingham & UK-wide. Get 40% more qualified leads with our AI agents designed for the UK market." />
        <meta name="keywords" content="AI sales automation London, B2B sales AI UK, London sales software, UK lead generation AI, Manchester sales automation, Birmingham AI sales, British AI sales tools, UK CRM automation" />
        <link rel="canonical" href="https://www.enai.ai/london" />
        
        {/* Local SEO Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Enai.ai - AI Sales Automation London",
            "description": "Leading AI-powered sales automation serving London and UK businesses",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "London",
              "addressRegion": "Greater London", 
              "addressCountry": "GB"
            },
            "areaServed": [
              { "@type": "City", "name": "London" },
              { "@type": "City", "name": "Manchester" },
              { "@type": "City", "name": "Birmingham" },
              { "@type": "Country", "name": "United Kingdom" }
            ],
            "serviceType": "AI Sales Automation",
            "priceRange": "££-£££"
          })}
        </script>

        {/* FAQ Schema for London */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Does Enai.ai work for London-based businesses?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Enai.ai is designed specifically for UK businesses including London, Manchester, Birmingham and nationwide. Our AI is trained on UK market data, supports GDPR compliance, and optimizes for UK business hours and communication preferences."
              }
            }, {
              "@type": "Question", 
              "name": "How much does AI sales automation cost in London?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enai.ai offers flexible pricing starting from £59/month per user for London businesses. Most London clients see ROI within 30-60 days through increased lead generation and sales efficiency."
              }
            }]
          })}
        </script>
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-dark via-dark-light to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-600/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <MapPin className="w-5 h-5 text-primary-400" />
              <span className="text-gray-300">Proudly Serving London & UK Businesses</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              AI Sales Automation for
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"> London</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Transform your London business with AI agents that understand the UK market. 
              Get 40% more qualified leads while reducing manual sales work by 85%. 
              GDPR compliant and optimized for British business culture.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-full">
                Get Free UK Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+44 20 3807 0369</span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {londonBusinessStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-2">{stat.metric}</div>
                  <div className="text-sm text-gray-400 leading-tight">{stat.description}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* London Market Insights */}
      <section className="py-20 bg-dark-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Built for the UK Market
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Our AI agents are specifically trained on UK business data, communication patterns, and market dynamics to deliver better results for British businesses.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    UK Market Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {ukMarketInsights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-dark border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary-400" />
                    Local Support & Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>UK Business Hours Support:</strong> 9 AM - 5 PM GMT with extended hours available
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>London Office:</strong> Local team understanding UK market dynamics
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>GDPR Compliant:</strong> Full compliance with UK and EU data protection laws
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Local Integrations:</strong> Seamless integration with UK business tools
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* UK Case Studies */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
              Success Stories from Across the UK
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              See how British businesses are transforming their sales with Enai.ai's AI automation
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {londonCaseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-dark-light border-gray-800 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-primary-400 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {study.location}
                      </div>
                      <CardTitle className="text-white text-lg">{study.company}</CardTitle>
                      <p className="text-gray-400 text-sm">{study.industry}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-semibold mb-1">Challenge:</h4>
                          <p className="text-gray-300 text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-1">Solution:</h4>
                          <p className="text-gray-300 text-sm">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-primary-400 font-semibold mb-1">Results:</h4>
                          <p className="text-white text-sm font-medium">{study.results}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your UK Business?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join hundreds of successful London and UK businesses using AI to scale their sales. 
              Get a free demo tailored to the British market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="px-8 py-3 rounded-full">
                Book Your UK Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-primary-100">
                <Phone className="w-4 h-4" />
                <span>+44 20 3807 0369 - Local London Number</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}