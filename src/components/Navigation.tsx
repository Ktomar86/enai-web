import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';

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

  // reserved for future quick-contact action

  const handleNavClick = (item: string) => {
    const sectionMap: { [key: string]: string } = {
      'Features': 'features',
      'Solutions': 'solutions',
      'Team': 'team',
      'Contact': 'contact',
      'About Us': 'about-us'
    };

    if (item === 'About Us') {
      if (location.pathname !== '/about-us') {
        window.location.href = '/about-us';
      }
      setIsMobileMenuOpen(false);
      return;
    }

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

  const navItems = ['Features', 'Industries', 'About Us', 'Contact'];

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
    if (item === 'Contact') {
      return location.pathname === '/contact';
    }
    
    return activeSection === sectionMap[item];
  };

  // Mobile menu animation variants
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 fixed-element ${
        isScrolled ? 'glass-effect py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-safe-area" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16 nav-container">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group" 
            aria-label="ENAI homepage"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/enai-logo.png" 
              alt="ENAI Logo" 
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 filter brightness-0 invert" 
              loading="eager"
              width="42"
              height="32"
            />
            <span className="ml-2 text-xl font-bold gradient-text">ENAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="navigation">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => (item === 'Industries' || item === 'About Us' || item === 'Contact') ? null : handleNavClick(item)}
                className={`relative px-3 py-2 rounded-md transition-colors hover:bg-dark-800/40 ${
                  isActive(item) 
                    ? 'text-primary-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-primary-400 after:rounded-full' 
                    : 'text-gray-300'
                }`}
                aria-label={item}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {item === 'Industries' ? (
                  <Link 
                    to="/industries" 
                    className="inline-flex items-center w-full h-full"
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </Link>
                ) : item === 'About Us' ? (
                  <Link 
                    to="/about-us" 
                    className="inline-flex items-center w-full h-full"
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </Link>
                ) : item === 'Contact' ? (
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center w-full h-full"
                    aria-current={isActive(item) ? 'page' : undefined}
                  >
                    {item}
                  </Link>
                ) : (
                  item
                )}
                {isActive(item) && (
                  <span className="sr-only">(current page)</span>
                )}
              </button>
            ))}
            
            <Button 
              variant="outline" 
              className="ml-4 text-white bg-transparent border-primary-400 hover:bg-primary-400/10"
              asChild
            >
              <a 
                href="https://calendly.com/enai-ai2024/30min" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Get Demo
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center text-gray-300 hover:text-white hover:bg-dark-800 focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
  id="mobile-menu"
  ref={mobileMenuRef}
  style={{
    backgroundColor: '#000000', // solid black
    backdropFilter: 'none',     // disables blur
    WebkitBackdropFilter: 'none'
  }}
  className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 shadow-xl"
  initial="closed"
  animate="open"
  exit="closed"
  variants={menuVariants}
  aria-label="Mobile navigation"
>

            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <Link 
                  to="/" 
                  className="flex items-center" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  aria-label="ENAI homepage"
                >
                  <img 
                    src="/enai-logo.png" 
                    alt="ENAI Logo" 
                    className="h-8 w-8 filter brightness-0 invert" 
                    width="32"
                    height="32"
                  />
                  <span className="ml-2 text-xl font-bold text-orange-500">ENAI</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-dark-800"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              
              <Separator className="mb-6" />
              
              <nav className="flex-grow">
                <ul className="space-y-6">
                  {navItems.map((item) => (
                    <motion.li key={item} variants={itemVariants}>
                      <button
                        onClick={() => (item === 'Industries' || item === 'About Us' || item === 'Contact') ? null : handleNavClick(item)}
                        className={`group flex items-center w-full text-left py-2 text-lg font-medium transition-colors ${
                          isActive(item) ? 'text-primary-400' : 'text-gray-300 hover:text-white'
                        }`}
                        aria-current={isActive(item) ? 'page' : undefined}
                      >
                        {isActive(item) && (
                          <motion.span 
                            layoutId="activeMobileIndicator"
                            className="absolute left-0 w-1 h-8 bg-primary-400 rounded-r-full"
                          />
                        )}
                        {item === 'Industries' ? (
                          <Link 
                            to="/industries" 
                            className="flex items-center w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative pl-4">{item}</span>
                            <ChevronRight className="ml-auto w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : item === 'About Us' ? (
                          <Link 
                            to="/about-us" 
                            className="flex items-center w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative pl-4">{item}</span>
                            <ChevronRight className="ml-auto w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : item === 'Contact' ? (
                          <Link 
                            to="/contact" 
                            className="flex items-center w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative pl-4">{item}</span>
                            <ChevronRight className="ml-auto w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        ) : (
                          <>
                            <span className="relative pl-4">{item}</span>
                            <ChevronRight className="ml-auto w-5 h-5 opacity-70 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-auto pt-6">
                <Separator className="mb-6" />
                <Button 
                  className="w-full bg-gradient-to-r from-primary-400 to-primary-500"
                >
                  <a 
                    href="https://calendly.com/enai-ai2024/30min" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-full"
                  >
                    <span>Get Demo</span>
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                
                <div className="mt-8 flex items-center justify-center space-x-4">
                  <Badge variant="outline" className="hover:bg-dark-800 transition-colors">
                    <a 
                      href="https://www.linkedin.com/company/enai-ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Enai LinkedIn Profile"
                    >
                      LinkedIn
                    </a>
                  </Badge>
                  <Badge variant="outline" className="hover:bg-dark-800 transition-colors">
                    <Link to="/privacy-policy">Privacy</Link>
                  </Badge>
                  <Badge variant="outline" className="hover:bg-dark-800 transition-colors">
                    <Link to="/terms-of-service">Terms</Link>
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
