import { Variants } from 'framer-motion';

// Optimized animation variants for better performance
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0] // Smoother easing
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    scale: 0.95, 
    opacity: 0,
    transition: { duration: 0.2 }
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

export const slideInFromLeft: Variants = {
  hidden: { 
    x: -30, 
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

// Optimized transition presets
export const smoothTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1.0] // Smooth cubic-bezier
};

export const quickTransition = {
  duration: 0.2,
  ease: [0.25, 0.1, 0.25, 1.0]
};

// Viewport settings for better performance
export const optimizedViewport = {
  once: true, // Only animate once
  margin: '0px 0px -100px 0px' // Start animation slightly before element is visible
};

// Reduced motion support
export const getReducedMotionVariants = (variants: Variants): Variants => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (reducedMotion) {
    // Return instant transitions for reduced motion
    return Object.keys(variants).reduce((acc, key) => {
      acc[key] = {
        ...variants[key],
        transition: { duration: 0.1 }
      };
      return acc;
    }, {} as Variants);
  }
  
  return variants;
};