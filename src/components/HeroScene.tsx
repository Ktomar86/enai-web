import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Main HeroScene component with Spline viewer
const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.79/build/spline-viewer.js';
    document.head.appendChild(script);

    // Clean up script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Add CSS to completely hide all Spline branding
    const style = document.createElement('style');
    style.textContent = `
      /* Aggressive hiding of all Spline branding elements */
      .spline-watermark,
      [data-name="watermark"],
      [class*="watermark"],
      [id*="watermark"],
      [data-name*="spline"],
      [class*="spline"],
      a[href*="spline"],
      spline-viewer div[style*="right: 8px"],
      spline-viewer div[style*="position: absolute"][style*="bottom: 0"],
      spline-viewer div[style*="position: absolute"][style*="right: 0"],
      spline-viewer div[style*="bottom"][style*="right"],
      .version {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        bottom: -9999px !important;
      }
      
      /* Create a large overlay in the bottom-right corner */
      spline-viewer::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 250px;
        height: 80px;
        background-color: rgba(0, 0, 0, 0.85);
        z-index: 9999999;
      }
      
      /* Disable all links inside spline-viewer */
      spline-viewer a {
        pointer-events: none !important;
        opacity: 0 !important;
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Additional approach: Use MutationObserver to remove branding elements
    const observer = new MutationObserver((mutations) => {
      // Check for added nodes that might be branding elements
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Only process Element nodes
              const el = node as Element;
              
              // Check various attributes that might indicate Spline branding
              if (
                el.className?.includes?.('watermark') ||
                el.className?.includes?.('spline') ||
                el.getAttribute?.('data-name')?.includes?.('watermark') ||
                el.getAttribute?.('data-name')?.includes?.('spline') ||
                el.getAttribute?.('href')?.includes?.('spline')
              ) {
                el.remove();
              }
              
              // Also check for elements positioned in the bottom-right corner
              const style = window.getComputedStyle(el);
              if (
                style.position === 'absolute' && 
                (style.bottom === '0px' || parseInt(style.bottom) < 20) && 
                (style.right === '0px' || parseInt(style.right) < 20)
              ) {
                el.remove();
              }
            }
          });
        }
      });
    });
    
    // Start observing the spline-viewer after a short delay
    setTimeout(() => {
      const splineViewer = document.querySelector('spline-viewer');
      if (splineViewer) {
        observer.observe(splineViewer, {
          childList: true,
          subtree: true,
          attributes: true
        });
        
        // Also add the black overlay directly as a child
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;bottom:0;right:0;width:250px;height:80px;background:#111827;z-index:9999999;';
        splineViewer.appendChild(overlay);
      }
    }, 1000);

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-[600px] absolute top-0 left-0 z-0 overflow-hidden" ref={containerRef}>
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Glowing orbs effect */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div 
            className="absolute w-[300px] h-[300px] rounded-full bg-primary-500/20 blur-[100px] z-10"
            style={{ top: '10%', left: '10%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-[250px] h-[250px] rounded-full bg-blue-500/20 blur-[80px] z-10"
            style={{ top: '30%', right: '15%' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute w-[200px] h-[200px] rounded-full bg-purple-500/20 blur-[60px] z-10"
            style={{ bottom: '20%', left: '25%' }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        {/* Spline viewer */}
        <spline-viewer 
          url="https://prod.spline.design/7dqUlpFgEXNPUap8/scene.splinecode"
          className="w-full h-full"
        ></spline-viewer>
        
        {/* We're removing the dark blue overlay as requested */}
        
        {/* Animated particles */}
        <motion.div 
          className="absolute bottom-0 right-0 w-[200px] h-[60px] overflow-hidden z-[600]" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Animated dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-orange-400"
              style={{
                width: 2 + Math.random() * 4 + 'px',
                height: 2 + Math.random() * 4 + 'px',
                bottom: Math.random() * 50 + 'px',
                right: Math.random() * 180 + 'px',
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Animated small pulse */}
          <motion.div
            className="absolute bottom-[15px] right-[20px] w-[6px] h-[6px] bg-orange-400 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                '0 0 0px rgba(245, 158, 11, 0.0)',
                '0 0 10px rgba(245, 158, 11, 0.8)',
                '0 0 0px rgba(245, 158, 11, 0.0)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated line */}
          <motion.div
            className="absolute bottom-[15px] right-[30px] h-[3px] bg-gradient-to-r from-transparent via-primary-400 to-primary-400/30 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
          
          {/* Small digital circuit elements */}
          <motion.div 
            className="absolute bottom-[25px] right-[60px] w-[20px] h-[20px] border border-orange-400/50 rounded-sm"
            animate={{
              borderColor: ['rgba(245, 158, 11, 0.2)', 'rgba(245, 158, 11, 0.8)', 'rgba(245, 158, 11, 0.2)'],
              rotate: [0, 180, 0],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Additional rotating element */}
          <motion.div 
            className="absolute bottom-[20px] right-[100px] w-[10px] h-[10px] bg-orange-400/20 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
              boxShadow: [
                '0 0 0px rgba(245, 158, 11, 0)',
                '0 0 8px rgba(245, 158, 11, 0.6)',
                '0 0 0px rgba(245, 158, 11, 0)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Gradient overlay for better text visibility */}
      <div className="absolute pointer-events-none top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-dark opacity-80 z-10" />
    </div>
  );
};

export default HeroScene;
