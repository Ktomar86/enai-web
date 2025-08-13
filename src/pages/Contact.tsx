import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Mail, Building, MessageSquare, User, Linkedin, MapPin, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';

export default function Contact() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document
      .querySelectorAll('.scroll-fade, .scroll-reveal, .progress-indicator')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />

      <section className="pt-32 pb-24 bg-gradient-to-b from-dark-800 to-dark relative overflow-hidden scroll-fade" aria-labelledby="contact-heading">
        {/* LocalBusiness structured data for London GEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Enai.ai',
            url: 'https://www.enai.ai/',
            image: 'https://www.enai.ai/enai-logo.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: "Unit 3, Bradbury's Court, Lyon Rd",
              addressLocality: 'London',
              postalCode: 'HA1 2BY',
              addressCountry: 'GB',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 51.5074, longitude: -0.1278 },
            sameAs: ['https://www.linkedin.com/company/enai-ai']
          })}
        </script>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 id="contact-heading" className="text-5xl font-bold gradient-text mb-4">Get in Touch</h1>
            <Separator className="mb-4 max-w-md mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have a question or ready to explore how our AI workers can transform your business? Reach out to us today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="relative overflow-hidden glass-card glass-accent transition-all duration-500 hover-lift">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 [mask-image:linear-gradient(white,transparent)]" aria-hidden="true" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary-400/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-xl mb-6 mx-auto md:mx-0" aria-hidden="true">
                    <Mail className="w-8 h-8 text-primary-400" />
                  </div>
                  <CardTitle className="text-2xl text-white text-center md:text-left">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8">
                    <div className="flex items-start mb-4">
                      <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" aria-hidden="true" />
                      <address className="text-gray-300 ml-4 not-italic">
                        Unit 3, Bradbury's Court<br />
                        Lyon Rd, London HA1 2BY<br />
                        United Kingdom
                      </address>
                    </div>

                    <div className="flex items-center mb-3">
                      <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                      <a href="mailto:contact@enai.ai" className="ml-4 text-gray-300 hover:text-primary-400 transition-colors">
                        contact@enai.ai
                      </a>
                    </div>

                    <div className="flex items-center">
                      <Linkedin className="w-5 h-5 text-primary-400 flex-shrink-0" aria-hidden="true" />
                      <a 
                        href="https://www.linkedin.com/company/enai-ai" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-4 text-gray-300 hover:text-primary-400 transition-colors"
                        aria-label="Enai company LinkedIn"
                      >
                        Company LinkedIn
                      </a>
                    </div>
                  </div>

                  <h4 className="text-lg font-medium text-white mb-4 text-center md:text-left">Team</h4>
                  <ul className="space-y-5">
                    <li className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center" aria-hidden="true">
                          <User className="w-6 h-6 text-primary-400" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-white font-medium">Madhav Mohan</h5>
                          <a 
                            href="https://www.linkedin.com/in/madhavmohankatarya/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-400 hover:text-primary-400 transition-colors"
                            aria-label="Madhav Mohan's LinkedIn profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Badge variant="outline" className="mr-2 px-2 py-0 text-xs">Co-founder</Badge>
                          <a href="mailto:madhav@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                            madhav@enai.ai
                          </a>
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center" aria-hidden="true">
                          <Building className="w-6 h-6 text-primary-400" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-white font-medium">Nikhil Nehra</h5>
                          <a 
                            href="https://www.linkedin.com/in/nikhil-nehra-57716a23b/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-400 hover:text-primary-400 transition-colors"
                            aria-label="Nikhil Nehra's LinkedIn profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Badge variant="outline" className="mr-2 px-2 py-0 text-xs">Founder & CTO</Badge>
                          <a href="mailto:nikhil@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                            nikhil@enai.ai
                          </a>
                        </div>
                      </div>
                    </li>
                    
                    <li className="flex items-center group p-3 rounded-xl transition-all duration-300 hover:bg-dark-700/50">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center" aria-hidden="true">
                          <MessageSquare className="w-6 h-6 text-primary-400" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-white font-medium">Zeeshan Idrees</h5>
                          <a 
                            href="https://www.linkedin.com/in/zidrees/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-400 hover:text-primary-400 transition-colors"
                            aria-label="Zeeshan Idrees's LinkedIn profile"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <Badge variant="outline" className="mr-2 px-2 py-0 text-xs">CSO</Badge>
                          <a href="mailto:zeeshan@enai.ai" className="truncate hover:text-primary-400 transition-colors">
                            zeeshan@enai.ai
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="relative overflow-hidden glass-card glass-accent transition-all duration-500 hover-lift">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 [mask-image:linear-gradient(white,transparent)]" aria-hidden="true" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary-400/20 via-transparent to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form action="mailto:contact@enai.ai" method="get" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/70 border border-dark-700 text-white input-glow focus:border-primary-400 focus-ring-soft transition-all duration-300"
                            aria-required="true"
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/70 border border-dark-700 text-white input-glow focus:border-primary-400 focus-ring-soft transition-all duration-300"
                            aria-required="true"
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                        Company <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          placeholder="Your Company"
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/70 border border-dark-700 text-white input-glow focus:border-primary-400 focus-ring-soft transition-all duration-300"
                          aria-required="true"
                        />
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message <span className="text-primary-400" aria-hidden="true">*</span><span className="sr-only">(required)</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="body"
                          rows={4}
                          required
                          placeholder="Tell us about your project and how we can help..."
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-900/70 border border-dark-700 text-white input-glow focus:border-primary-400 focus-ring-soft transition-all duration-300"
                          aria-required="true"
                        />
                        <MessageSquare className="absolute left-3 top-6 w-4 h-4 text-gray-500" aria-hidden="true" />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full cta-button text-white px-6 py-6 rounded-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


