import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Mail, Building, MessageSquare, User, Linkedin, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto URL with form data
    const subject = `Contact inquiry from ${formData.name} - ${formData.company}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:contact@enai.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />

      <section className="pt-32 pb-24 bg-dark relative overflow-hidden scroll-fade" aria-labelledby="contact-heading">
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
            <div className="inline-flex items-center justify-center px-4 py-2 bg-dark-800/60 border border-primary-400/30 rounded-full mb-6">
              <MessageSquare className="w-4 h-4 text-primary-400 mr-2" />
              <span className="text-sm font-medium text-primary-400">Let's Connect</span>
            </div>
            <h1 id="contact-heading" className="text-6xl font-bold bg-gradient-to-r from-white via-text-1 to-text-2/80 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with AI? Our team of experts is here to guide you through 
              <span className="text-primary-400 font-medium"> every step of your automation journey</span>.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">            
            {/* Quick Contact Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-dark-800/60 rounded-xl border border-dark-700 hover:border-primary-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400/10 rounded-xl mb-4">
                    <Clock className="w-6 h-6 text-primary-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Quick Response</h4>
                  <p className="text-gray-400 text-sm">We typically respond within 2-4 business hours</p>
                </div>
                
                <div className="text-center p-6 bg-dark-800/60 rounded-xl border border-dark-700 hover:border-primary-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-400/10 rounded-xl mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Free Consultation</h4>
                  <p className="text-gray-400 text-sm">30-minute strategy session to explore opportunities</p>
                </div>
                
                <div className="text-center p-6 bg-dark-800/60 rounded-xl border border-dark-700 hover:border-primary-400/50 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-400/10 rounded-xl mb-4">
                    <Building className="w-6 h-6 text-primary-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Enterprise Ready</h4>
                  <p className="text-gray-400 text-sm">Scalable solutions for businesses of all sizes</p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 space-y-8">
              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="relative overflow-hidden bg-dark-800/80 border border-dark-700 hover:border-primary-400/50 transition-all duration-500">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" aria-hidden="true" />
                  <CardHeader className="pb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary-400/10 rounded-xl flex items-center justify-center mr-4">
                        <Send className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                        <p className="text-gray-400 text-sm mt-1">We'll get back to you within 24 hours</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative group">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name <span className="text-primary-400">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              placeholder="John Doe"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-900/60 border border-dark-700 text-white placeholder:text-gray-500 focus:border-primary-400/50 focus:ring-2 focus:ring-primary-400/20 focus:bg-dark-900/80 transition-all duration-300 hover:border-dark-600"
                            />
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                          </div>
                        </div>
                        
                        <div className="relative group">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address <span className="text-primary-400">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              placeholder="you@example.com"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-900/60 border border-dark-700 text-white placeholder:text-gray-500 focus:border-primary-400/50 focus:ring-2 focus:ring-primary-400/20 focus:bg-dark-900/80 transition-all duration-300 hover:border-dark-600"
                            />
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                          Company <span className="text-primary-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            placeholder="Your Company"
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-900/60 border border-dark-700 text-white placeholder:text-gray-500 focus:border-primary-400/50 focus:ring-2 focus:ring-primary-400/20 focus:bg-dark-900/80 transition-all duration-300 hover:border-dark-600"
                          />
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message <span className="text-primary-400">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Tell us about your project and how we can help transform your business with AI..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark-900/60 border border-dark-700 text-white placeholder:text-gray-500 focus:border-primary-400/50 focus:ring-2 focus:ring-primary-400/20 focus:bg-dark-900/80 transition-all duration-300 hover:border-dark-600 resize-none"
                          />
                          <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-400 hover:bg-primary-500 text-black px-8 py-6 rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        By submitting this form, you agree to our terms of service and privacy policy.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="relative overflow-hidden bg-dark-800/60 border border-dark-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-primary-400" />
                    </div>
                    <CardTitle className="text-lg text-white">Our Office</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <address className="text-gray-300 not-italic leading-relaxed">
                    Unit 3, Bradbury's Court<br />
                    Lyon Rd, London HA1 2BY<br />
                    United Kingdom
                  </address>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-dark-800/60 border border-dark-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-primary-400" />
                    </div>
                    <CardTitle className="text-lg text-white">Email Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <a href="mailto:contact@enai.ai" className="text-gray-300 hover:text-primary-400 transition-colors inline-flex items-center">
                    contact@enai.ai
                  </a>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-dark-800/60 border border-dark-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-400/10 rounded-lg flex items-center justify-center mr-3">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                    </div>
                    <CardTitle className="text-lg text-white">Follow Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <a 
                    href="https://www.linkedin.com/company/enai-ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-blue-400 transition-colors inline-flex items-center"
                  >
                    Company LinkedIn
                  </a>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bg-dark-800/60 border border-dark-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-primary-400/10 rounded-lg flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-primary-400" />
                    </div>
                    <CardTitle className="text-lg text-white">Leadership Team</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-900/30 hover:bg-dark-900/50 transition-colors">
                    <div>
                      <h5 className="text-white font-medium text-sm">Nikhil Nehra</h5>
                      <p className="text-gray-400 text-xs">Founder & CTO</p>
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/nikhil-nehra-57716a23b/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-dark-900/30 hover:bg-dark-900/50 transition-colors">
                    <div>
                      <h5 className="text-white font-medium text-sm">Zeeshan Idrees</h5>
                      <p className="text-gray-400 text-xs">CSO</p>
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/zidrees/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}


