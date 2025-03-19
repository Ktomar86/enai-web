import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll state for navbar transparency/glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Detect which section is currently in view
      const sections = ['features', 'solutions', 'team', 'contact'];
      let currentSection = null;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Add body class to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  // Listen for route changes to close the mobile menu
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToContact = () => {
    window.open('https://login.enai.ai', '_blank', 'noopener,noreferrer');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item: string) => {
    const sectionMap: { [key: string]: string } = {
      'Features': 'features',
      'Solutions': 'solutions',
      'Team': 'team',
      'Contact': 'contact'
    };

    if (location.pathname !== '/') {
      window.location.href = `/#${sectionMap[item]}`;
    } else {
      const element = document.getElementById(sectionMap[item]);
      if (element) {
        // Use smooth scroll with a slight delay to ensure menu closes first
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = ['Features', 'Solutions', 'Team', 'Industries', 'About Us'];

  // Check if an item is active
  const isActive = (item: string) => {
    const sectionMap: { [key: string]: string } = {
      'Features': 'features',
      'Solutions': 'solutions',
      'Team': 'team',
      'Contact': 'contact'
    };
    
    if (item === 'Industries') {
      return location.pathname.includes('/industries');
    }
    
    if (item === 'About Us') {
      return location.pathname === '/about-us';
    }
    
    return activeSection === sectionMap[item];
  };

  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 fixed-element ${
        isScrolled ? 'glass-effect py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-safe-area">
        <div className="flex justify-between items-center h-16 nav-container">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group" 
            aria-label="ENAI homepage"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="https://i.postimg.cc/5j48qtcH/logo.png" 
              alt="" 
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" 
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
            />
            <span className="ml-2 text-xl font-bold gradient-text">ENAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => (item === 'Industries' || item === 'About Us') ? null : handleNavClick(item)}
                className={`nav-link relative overflow-hidden ${isActive(item) ? 'text-primary-400' : 'text-gray-300'}`}
                aria-label={item}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {item === 'Industries' ? (
                  <Link 
                    to="/industries" 
                    className={`nav-link ${isActive(item) ? 'text-primary-400' : 'text-gray-300'}`}
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </Link>
                ) : item === 'About Us' ? (
                  <Link 
                    to="/about-us" 
                    className={`nav-link ${isActive(item) ? 'text-primary-400' : 'text-gray-300'}`}
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </Link>
                ) : (
                  item
                )}
              </button>
            ))}
{/*             <button 
              onClick={scrollToContact}
              className="button-glow text-white px-6 py-2 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-glow mobile-touch-target"
              aria-label="Start Free Trial"
            >
              Start Free
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-400 transition-colors mobile-touch-target mobile-icon"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed inset-0 z-40 md:hidden smooth-scrolling"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="fixed inset-0 mobile-menu-backdrop">
              <motion.div 
                className="flex flex-col h-full py-20 px-4 overflow-y-auto mobile-safe-area"
                variants={menuVariants}
              >
                {/* Close button for accessibility */}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-dark-800 text-gray-300 mobile-touch-target"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 mobile-icon" />
                </button>

                {/* Logo in mobile menu */}
                <motion.div 
                  className="flex items-center justify-center mb-12"
                  variants={itemVariants}
                >
                  <img 
                    src="https://i.postimg.cc/5j48qtcH/logo.png" 
                    alt="" 
                    className="h-10 w-10" 
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-2xl font-bold gradient-text">ENAI</span>
                </motion.div>

                {/* Nav items */}
                <div className="flex flex-col space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div 
                      key={item} 
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 10 }}
                      className="border-b border-dark-700 pb-4"
                    >
                      {item === 'Industries' ? (
                        <Link 
                          to="/industries" 
                          className={`mobile-nav-item text-xl font-medium hover:text-primary-400 transition-colors flex items-center justify-between mobile-touch-target ${isActive(item) ? 'mobile-active text-primary-400' : 'text-white'}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-current={isActive(item) ? 'page' : undefined}
                        >
                          <span className="mobile-active-indicator">{item}</span>
                          <ChevronRight className="w-5 h-5 ml-2 mobile-icon mobile-transition" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item)}
                          className={`mobile-nav-item text-xl font-medium hover:text-primary-400 transition-colors w-full text-left flex items-center justify-between mobile-touch-target ${isActive(item) ? 'mobile-active text-primary-400' : 'text-white'}`}
                          aria-current={isActive(item) ? 'page' : undefined}
                        >
                          <span className="mobile-active-indicator">{item}</span>
                          <ChevronRight className="w-5 h-5 ml-2 mobile-icon mobile-transition" />
                        </button>
                      )}
                    </motion.div>
                  ))}

                  {/* CTA button */}
                  <motion.div 
                    variants={itemVariants} 
                    className="pt-8"
                    whileHover={{ scale: 1.05 }}
                  >
                    <button 
                      onClick={scrollToContact}
                      className="w-full button-glow text-white py-4 px-6 rounded-xl text-xl font-semibold transform transition-all duration-300 mobile-touch-target"
                    >
                      Start Free
                    </button>
                  </motion.div>
                </div>

                {/* Additional useful links */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-auto pt-12"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <Link 
                      to="/#features" 
                      className="hover:text-primary-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Why Choose ENAI
                    </Link>
                    <Link 
                      to="/#team" 
                      className="hover:text-primary-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      AI Team
                    </Link>
                    <Link 
                      to="/#contact" 
                      className="hover:text-primary-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get in Touch
                    </Link>
                    <a 
                      href="https://login.enai.ai" 
                      className="hover:text-primary-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Login
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
