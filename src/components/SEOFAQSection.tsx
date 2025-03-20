import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
  keywords: string[];
};

const faqItems: FAQItem[] = [
  {
    question: "What is Enai.ai and how does it help B2B sales teams?",
    answer: "Enai.ai is an AI-powered sales automation platform that provides dedicated AI workers designed to understand your business and help you scale efficiently. Our AI agents automate lead qualification based on 40+ buying signals, create hyper-personalized content for outreach, provide 24/7 intelligent support, and continuously analyze performance data to optimize your sales strategy.",
    keywords: ["AI sales automation", "B2B AI tools", "sales AI"]
  },
  {
    question: "How does Enai.ai's lead qualification process work?",
    answer: "Enai.ai's lead qualification process uses advanced AI to analyze prospects across 40+ buying signals. Our ARES agent automatically identifies perfect-fit prospects, scores leads based on their likelihood to convert, prioritizes high-intent accounts, and continuously learns from conversion patterns to improve accuracy over time. This ensures your sales team focuses only on the most promising opportunities.",
    keywords: ["lead generation AI", "B2B lead scoring", "AI lead qualification"]
  },
  {
    question: "What kinds of AI agents does Enai.ai offer?",
    answer: "Enai.ai offers a specialized team of AI agents, each with specific functions: LEO handles communication automation across email, SMS, and voice; ARES manages customer profiling and targeting; ZEUS handles call scheduling and follow-ups; TECHNO tracks campaign performance with detailed insights; CRONUS generates personalized content; and CLIO creates optimized sales funnels.",
    keywords: ["AI agents for sales", "sales automation AI", "AI workers"]
  },
  {
    question: "How does Enai.ai's market analysis capability benefit my business?",
    answer: "Enai.ai's market analysis capability provides real-time intelligence for competitive advantage. It maps your total addressable market, identifies untapped customer segments, tracks competitor strategies, and predicts emerging market trends. This enables your team to make data-driven decisions, discover new growth opportunities, and stay ahead of market shifts.",
    keywords: ["AI market analysis", "competitive intelligence", "business intelligence AI"]
  },
  {
    question: "How does Enai.ai measure and improve sales performance?",
    answer: "Enai.ai continuously analyzes your sales performance through our TECHNO agent, which identifies bottlenecks in your pipeline, recommends tactical improvements based on data patterns, forecasts results with predictive modeling, and surfaces insights you might otherwise miss. The platform provides actionable analytics dashboards that help optimize every aspect of your sales process.",
    keywords: ["sales analytics AI", "sales performance AI", "sales optimization"]
  },
  {
    question: "What makes Enai.ai different from other AI sales tools?",
    answer: "Unlike generic AI tools, Enai.ai provides dedicated AI workers that understand your specific business context and industry. Our platform offers end-to-end automation across the entire sales process, not just isolated tasks. With continuous learning capabilities, Enai.ai improves over time, adapting to your unique sales patterns and customer behaviors for increasingly effective results.",
    keywords: ["best AI sales platform", "advanced sales AI", "AI sales automation comparison"]
  }
];

export default function SEOFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden" id="faq">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get answers to common questions about our AI-powered sales automation platform
          </p>
        </motion.div>

        {/* Schema.org FAQ markup for SEO */}
        <div itemScope itemType="https://schema.org/FAQPage">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-6 border ${
                openIndex === index 
                  ? 'border-primary-400 bg-dark-900/80' 
                  : 'border-dark-700 bg-dark-900/50'
              } rounded-lg overflow-hidden transition-all duration-300`}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <h3 
                  className={`text-lg md:text-xl font-semibold ${
                    openIndex === index ? 'text-primary-400' : 'text-white'
                  } transition-colors duration-300`}
                  itemProp="name"
                >
                  {item.question}
                </h3>
                <div className={`text-primary-400 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : 'rotate-0'
                }`}>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>

              <div
                id={`faq-content-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div className="p-6 pt-0 border-t border-dark-700" itemProp="text">
                  <p className="text-gray-300">{item.answer}</p>
                  
                  {/* Hidden SEO keywords related to question */}
                  <div className="hidden">
                    {item.keywords.map((keyword, kIndex) => (
                      <span key={kIndex} className="seo-keyword">{keyword}</span>
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
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Have more questions? We're here to help.
          </p>
          <motion.a
            href="mailto:info@enai.ai"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-lg text-white font-medium shadow-lg shadow-primary-500/20"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl opacity-50" />
    </section>
  );
}
