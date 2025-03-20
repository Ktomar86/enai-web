import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
  keywords: string[];
};

// Enhanced FAQ items with more comprehensive content and additional questions
const faqItems: FAQItem[] = [
  {
    question: "What is Enai.ai and how does it help B2B sales teams?",
    answer: "Enai.ai is an AI-powered sales automation platform that provides dedicated AI workers designed to understand your business and help you scale efficiently. Our AI agents automate lead qualification based on 40+ buying signals, create hyper-personalized content for outreach, provide 24/7 intelligent support, and continuously analyze performance data to optimize your sales strategy. Most Enai.ai customers report a 40-60% reduction in their sales cycle length and a 25-45% increase in qualified lead generation within the first quarter of implementation.",
    keywords: ["AI sales automation", "B2B AI tools", "sales AI", "AI workers for sales", "sales automation platform"]
  },
  {
    question: "How does Enai.ai's lead qualification process work?",
    answer: "Enai.ai's lead qualification process uses advanced machine learning algorithms to analyze prospects across 40+ buying signals. Our ARES agent automatically identifies perfect-fit prospects by evaluating firmographic data (company size, industry, growth rate), technographic information (tech stack, recent implementations), engagement metrics (website visits, content downloads), and behavioral patterns (email opens, response sentiment). This comprehensive approach scores leads based on their likelihood to convert, prioritizes high-intent accounts, and continuously learns from conversion patterns to improve accuracy over time. The system then routes the highest-quality leads to your sales team while nurturing others with automated, personalized content.",
    keywords: ["lead generation AI", "B2B lead scoring", "AI lead qualification", "prospect scoring", "sales intelligence"]
  },
  {
    question: "What kinds of AI agents does Enai.ai offer?",
    answer: "Enai.ai offers a specialized team of AI agents, each with specific functions: LEO handles communication automation across email, SMS, and voice, with natural language generation capabilities that match your brand voice; ARES manages customer profiling and targeting through advanced data analysis; ZEUS handles call scheduling and follow-ups, resolving calendar conflicts automatically; TECHNO tracks campaign performance with detailed insights and predictive analytics; CRONUS generates personalized content for each prospect based on their industry, role, and engagement history; and CLIO creates optimized sales funnels with multi-channel touchpoints. Each agent operates both independently and collaboratively within your existing sales workflow.",
    keywords: ["AI agents for sales", "sales automation AI", "AI workers", "sales AI assistants", "intelligent sales agents"]
  },
  {
    question: "How does Enai.ai's market analysis capability benefit my business?",
    answer: "Enai.ai's market analysis capability provides real-time intelligence for competitive advantage through our proprietary AI models. It maps your total addressable market with precision, identifying ideal customer profile segments based on conversion likelihood; discovers untapped customer segments through pattern recognition in industry and demographic data; tracks competitor strategies by monitoring digital footprints and market positioning; and predicts emerging market trends using natural language processing across industry news, social media, and economic indicators. This comprehensive analysis enables your team to make data-driven decisions, discover new growth opportunities, and stay ahead of market shifts with actionable insights delivered through intuitive dashboards.",
    keywords: ["AI market analysis", "competitive intelligence", "business intelligence AI", "market trend prediction", "TAM analysis"]
  },
  {
    question: "How does Enai.ai measure and improve sales performance?",
    answer: "Enai.ai continuously analyzes your sales performance through our TECHNO agent, which uses advanced analytics to identify bottlenecks in your pipeline, recommend tactical improvements based on success patterns, forecast results with predictive modeling, and surface insights you might otherwise miss. The platform provides actionable analytics dashboards that help optimize every aspect of your sales process through A/B testing of outreach strategies, content effectiveness measurement, conversion rate analysis by channel and message type, and individual performance coaching recommendations. Our system automatically adapts based on what's working, continuously refining strategies to maximize results.",
    keywords: ["sales analytics AI", "sales performance AI", "sales optimization", "revenue intelligence", "conversion optimization"]
  },
  {
    question: "What makes Enai.ai different from other AI sales tools?",
    answer: "Unlike generic AI tools that require extensive setup and training, Enai.ai provides purpose-built AI workers specifically designed for B2B sales workflows. Our platform is differentiated by its ability to understand industry context (with pre-trained models for 27+ B2B sectors), seamlessly integrate with your existing tech stack (CRM, email, calendar, etc.), continuously learn from your sales data to improve performance, operate autonomously while maintaining human oversight, and deliver actionable insights rather than just raw data. Additionally, Enai.ai's end-to-end approach automates the entire sales process rather than just individual tasks, creating a cohesive system that works together to drive results.",
    keywords: ["best AI sales platform", "advanced sales AI", "AI sales automation comparison", "enterprise AI for sales", "sales AI differentiation"]
  },
  {
    question: "How quickly can I implement Enai.ai and see results?",
    answer: "Enai.ai is designed for rapid implementation and time-to-value. Most customers complete the initial setup within 1-2 weeks, which includes integrating with your existing systems (CRM, email, calendar, etc.), customizing AI agents to match your sales process, and training your team on the platform. Preliminary results typically emerge within the first 30 days as the AI begins qualifying leads and automating outreach. Significant performance improvements are usually evident by the 60-90 day mark, with most customers achieving full ROI within the first quarter of implementation. Our customer success team provides dedicated support throughout the process, ensuring smooth adoption and optimal configuration.",
    keywords: ["AI sales implementation", "sales automation ROI", "quick deployment AI", "AI sales onboarding", "fast AI implementation"]
  },
  {
    question: "How does Enai.ai ensure data security and compliance?",
    answer: "Enai.ai employs enterprise-grade security measures to protect your sensitive sales data. Our platform uses end-to-end encryption for all data in transit and at rest, maintains SOC 2 Type II compliance, and implements role-based access controls to ensure information is only accessible to authorized users. We're fully compliant with major regulations including GDPR, CCPA, and industry-specific requirements. Our AI models are trained using privacy-preserving techniques that maintain data confidentiality, and we conduct regular third-party security audits. Additionally, all customer data is segregated with strict logical boundaries, and we maintain comprehensive audit trails for all system activities.",
    keywords: ["AI sales security", "GDPR compliant sales AI", "secure sales automation", "data protection sales AI", "enterprise security AI"]
  },
  {
    question: "Can Enai.ai integrate with my existing CRM and sales tools?",
    answer: "Yes, Enai.ai is designed with integration flexibility as a core feature. We offer native integrations with all major CRM platforms (Salesforce, HubSpot, Microsoft Dynamics, Zoho, etc.), email services (Gmail, Outlook, etc.), calendar applications, communication tools (Slack, Teams), and marketing automation platforms. Our open API architecture also enables custom integrations with specialized or proprietary systems. The platform synchronizes data bi-directionally, ensuring that all information is current across your tech stack without creating duplicate entries or information silos. This seamless integration allows Enai.ai to work within your existing workflow while enhancing capabilities without disrupting your established processes.",
    keywords: ["AI sales integration", "CRM AI integration", "sales stack AI", "AI sales ecosystem", "integrated sales AI"]
  },
  {
    question: "How does Enai.ai personalize content for each prospect?",
    answer: "Enai.ai's CRONUS agent handles content personalization using advanced natural language generation models specifically trained for B2B sales contexts. The system analyzes each prospect's company information (industry, size, growth trajectory), role (responsibilities, seniority, buying influence), digital behavior (content engagement, website navigation patterns), and historical interactions to create truly personalized communications. Unlike template-based approaches that simply insert names, Enai.ai's content generation considers the prospect's specific pain points, business objectives, industry terminology, and communication preferences to craft messages that resonate on a deeper level. The system continuously improves its personalization based on response data, learning which approaches yield the best results for different prospect segments.",
    keywords: ["AI personalized sales", "dynamic content generation", "personalized outreach AI", "custom messaging AI", "adaptive sales content"]
  }
];

export default function SEOFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden" id="faq" aria-labelledby="faq-heading">
      {/* Enhanced decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="block text-sm uppercase tracking-wider text-primary-400 mb-3 font-medium">Knowledge Base</span>
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Frequently Asked Questions
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our AI-powered sales automation platform
          </p>
        </motion.div>

        {/* Category navigation */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          <button 
            onClick={() => setOpenIndex(null)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${openIndex === null ? 'bg-primary-400 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          >
            All Questions
          </button>
          <button 
            onClick={() => setOpenIndex(0)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${openIndex === 0 ? 'bg-primary-400 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          >
            Getting Started
          </button>
          <button 
            onClick={() => setOpenIndex(4)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${openIndex === 4 ? 'bg-primary-400 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          >
            Performance
          </button>
          <button 
            onClick={() => setOpenIndex(7)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${openIndex === 7 ? 'bg-primary-400 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          >
            Security
          </button>
          <button 
            onClick={() => setOpenIndex(9)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${openIndex === 9 ? 'bg-primary-400 text-white' : 'bg-dark-700 text-gray-300 hover:bg-dark-600'}`}
          >
            Personalization
          </button>
        </div>

        {/* Schema.org FAQ markup for SEO */}
        <div itemScope itemType="https://schema.org/FAQPage" className="grid gap-6 md:grid-cols-1">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`border ${openIndex === index 
                ? 'border-primary-400 bg-gradient-to-br from-dark-900 to-dark-800 shadow-lg shadow-primary-500/5' 
                : 'border-dark-700/50 bg-dark-900/50 hover:border-dark-500/70'
              } rounded-xl overflow-hidden transition-all duration-300`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-6 md:p-8 text-left focus:outline-none group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <h3 
                  className={`text-lg md:text-xl font-semibold pr-6 group-hover:text-primary-300 ${openIndex === index ? 'text-primary-400' : 'text-white'} transition-colors duration-300`}
                  itemProp="name"
                >
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 bg-dark-800/80 rounded-full p-2 text-primary-400 transition-all duration-300 ${openIndex === index ? 'bg-primary-400/10 rotate-180' : 'group-hover:bg-dark-700'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <div
                id={`faq-content-${index}`}
                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div className="px-6 pb-8 md:px-8 md:pb-8 border-t border-dark-700/50" itemProp="text">
                  <div className="pt-6 text-gray-300 leading-relaxed space-y-4">
                    {item.answer.split('. ').map((sentence, sIndex, arr) => {
                      // Add period back except for the last sentence if it doesn't end with punctuation
                      const text = sIndex < arr.length - 1 ? sentence + '.' : sentence;
                      // Create paragraph breaks for readability
                      return sIndex % 2 === 0 || sIndex === arr.length - 1 ? (
                        <p key={sIndex}>{text}</p>
                      ) : null;
                    }).filter(Boolean)}
                  </div>
                  
                  {/* Keyword tags for SEO visibility */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.keywords.slice(0, 3).map((keyword, kIndex) => (
                      <span key={kIndex} className="inline-block px-3 py-1 text-xs font-medium text-primary-300 bg-primary-900/20 rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hidden SEO keywords */}
                  <div className="hidden">
                    {item.keywords.map((keyword, kIndex) => (
                      <span key={`hidden-${kIndex}`} className="seo-keyword">{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-8 md:p-10 border border-dark-700/50 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-400 max-w-md">
                Our team of AI sales experts is ready to answer any additional questions about how Enai.ai can transform your sales process.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="mailto:info@enai.ai"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg text-white font-medium shadow-lg shadow-primary-500/20 whitespace-nowrap"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="https://calendly.com/enai-ai2024"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block px-6 py-3 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg text-white font-medium whitespace-nowrap transition-colors"
              >
                Schedule a Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
