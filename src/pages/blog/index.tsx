import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import Navigation from '../../components/Navigation';

const blogPosts = [
  {
    id: 'ai-sales-automation-guide',
    title: 'The Complete Guide to AI-Powered Sales Automation in 2025',
    excerpt: 'Learn how AI-powered sales automation tools are revolutionizing B2B sales processes and how to implement them in your business for maximum efficiency.',
    date: 'March 20, 2025',
    image: 'https://i.postimg.cc/5j48qtcH/logo.png',
    categories: ['AI Sales', 'Automation', 'B2B'],
    tags: ['AI sales automation', 'B2B AI tools', 'sales AI', 'lead generation AI', 'AI-powered sales']
  },
  {
    id: 'ai-sales-tools',
    title: '7 AI Tools Every B2B Sales Team Needs in 2025',
    excerpt: 'Discover the essential AI applications that are transforming how successful sales teams operate and win more deals with less effort.',
    date: 'March 15, 2025',
    image: 'https://i.postimg.cc/5j48qtcH/logo.png',
    categories: ['AI Tools', 'Sales Strategy'],
    tags: ['AI sales tools', 'sales technology', 'B2B tools']
  },
  {
    id: 'ai-vs-traditional-sales',
    title: 'AI vs Traditional Sales Methods: The Data-Driven Comparison',
    excerpt: 'A comprehensive analysis of how AI-powered approaches consistently outperform conventional sales methods across key performance metrics.',
    date: 'March 10, 2025',
    image: 'https://i.postimg.cc/5j48qtcH/logo.png',
    categories: ['AI Sales', 'Research'],
    tags: ['sales comparison', 'AI effectiveness', 'sales metrics']
  },
  {
    id: 'lead-qualification-ai',
    title: 'How AI is Revolutionizing Lead Qualification for B2B Companies',
    excerpt: 'Explore how advanced AI algorithms are helping sales teams identify high-value prospects with unprecedented accuracy.',
    date: 'March 5, 2025',
    image: 'https://i.postimg.cc/5j48qtcH/logo.png',
    categories: ['Lead Generation', 'AI Technology'],
    tags: ['lead qualification', 'B2B leads', 'AI prospecting']
  },
  {
    id: 'ai-sales-conversation-analysis',
    title: 'The Power of AI-Driven Sales Conversation Analysis',
    excerpt: 'How machine learning and natural language processing are giving sales teams powerful insights from every customer interaction.',
    date: 'February 28, 2025',
    image: 'https://i.postimg.cc/5j48qtcH/logo.png',
    categories: ['Conversation Intelligence', 'AI Sales'],
    tags: ['conversation analytics', 'sales calls', 'NLP']
  }
];

const categories = ['All', 'AI Sales', 'Automation', 'B2B', 'Lead Generation', 'Sales Strategy', 'AI Tools', 'Research'];

export default function BlogIndex() {
  useEffect(() => {
    // Add structured data for blog
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Enai.ai Blog - AI Sales Automation Insights",
      "description": "Expert insights, guides, and analysis on AI-powered sales automation, B2B lead generation, and sales process optimization.",
      "url": "https://www.enai.ai/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Enai.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.enai.ai/enai-logo.png"
        }
      },
      "blogPosts": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date
      }))
    });
    
    document.head.appendChild(script);
    
    // Clean up
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                Blog & Resources
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
                Expert insights, guides, and analysis on AI-powered sales automation, B2B lead generation, and sales process optimization
              </p>
              
              {/* Search and Filtering */}
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center bg-dark-800 rounded-lg px-4 py-2 mb-8">
                  <Search className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    className="bg-transparent border-none outline-none text-white w-full"
                  />
                </div>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm ${
                        index === 0 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
                      } transition-colors`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </header>
          
          {/* Featured Post */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl overflow-hidden"
            >
              <div className="h-64 md:h-auto overflow-hidden">
                <Link to={`/blog/${blogPosts[0].id}`}>
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime="2025-03-20">{blogPosts[0].date}</time>
                  <span className="mx-2">•</span>
                  <span className="text-primary-400">{blogPosts[0].categories[0]}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link to={`/blog/${blogPosts[0].id}`} className="hover:text-primary-400 transition-colors">
                    {blogPosts[0].title}
                  </Link>
                </h3>
                <p className="text-gray-300 mb-6">{blogPosts[0].excerpt}</p>
                <Link 
                  to={`/blog/${blogPosts[0].id}`}
                  className="inline-flex items-center text-primary-400 font-medium hover:underline"
                >
                  Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.article>
          </section>
          
          {/* All Posts */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Latest Articles</h2>
              <div className="text-gray-400 text-sm">
                Showing 5 of 5 articles
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300"
                >
                  <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      <time dateTime={post.date.replace(',', '').replace(' ', '-')}>{post.date}</time>
                      <span className="mx-2">•</span>
                      <span className="text-primary-400">{post.categories[0]}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      <Link to={`/blog/${post.id}`} className="hover:text-primary-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary-400 text-sm font-medium hover:underline"
                    >
                      Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
          
          {/* Newsletter Signup */}
          <section className="mt-20 bg-gradient-to-r from-primary-500/20 to-primary-400/10 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 md:max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated on AI Sales Innovations</h2>
                <p className="text-gray-300">
                  Subscribe to our newsletter for the latest insights, trends, and practical guides on AI-powered sales automation.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-white focus:border-primary-400 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium"
                  >
                    Subscribe
                  </motion.button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-dark-900 text-white py-12 border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-8 md:mb-0">
              <img src="https://i.postimg.cc/5j48qtcH/logo.png" alt="ENAI" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold gradient-text">ENAI</span>
            </div>
            <div className="flex space-x-8 mb-8 md:mb-0">
              <Link 
                to="/privacy-policy"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service"
                className="text-gray-300 hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-gray-400">
            © {new Date().getFullYear()} Enai.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
