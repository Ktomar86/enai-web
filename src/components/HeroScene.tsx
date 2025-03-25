import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Main HeroScene component with Spline viewer
const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  // Use Intersection Observer to only load Spline when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Only load Spline when component is in viewport
  useEffect(() => {
    if (!isInViewport) return;

    // Dynamically load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.79/build/spline-viewer.js';
    
    script.onload = () => {
      setIsSplineLoaded(true);
    };
    
    document.head.appendChild(script);

    // Clean up script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [isInViewport]);

  useEffect(() => {
    if (!isSplineLoaded || !isInViewport) return;
    
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
      
      /* Create a much larger overlay in the bottom-right corner */
      spline-viewer::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 300px; /* Wider overlay to ensure coverage */
        height: 100px; /* Taller overlay to ensure coverage */
        background-color: #000000; /* Pure black for complete hiding */
        z-index: 9999999;
      }
      
      /* Enhanced scene with a darker overlay for better contrast */
      spline-viewer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
        z-index: 1;
        pointer-events: none;
      }
      
      /* Disable all links inside spline-viewer */
      spline-viewer a {
        pointer-events: none !important;
        opacity: 0 !important;
        display: none !important;
      }

      /* Target specific elements that might contain the spline branding */
      spline-viewer [style*="position: absolute"][style*="right: 8px"][style*="bottom: 8px"],
      spline-viewer [style*="position: fixed"][style*="right: 8px"][style*="bottom: 8px"],
      spline-viewer div[style*="z-index: 999"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
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
                el.getAttribute?.('href')?.includes?.('spline') ||
                el.textContent?.toLowerCase()?.includes?.('spline') ||
                el.textContent?.toLowerCase()?.includes?.('built with')
              ) {
                el.remove();
              }
              
              // Also check for elements positioned in the bottom-right corner
              const style = window.getComputedStyle(el);
              if (
                style.position === 'absolute' && 
                (style.bottom === '0px' || parseInt(style.bottom) < 30) && 
                (style.right === '0px' || parseInt(style.right) < 30)
              ) {
                el.remove();
              }
            }
          });
        }
      });
    });
    
    // Start observing the spline-viewer after a short delay
    const timeoutId = setTimeout(() => {
      const splineViewer = document.querySelector('spline-viewer');
      if (splineViewer) {
        observer.observe(splineViewer, {
          childList: true,
          subtree: true,
          attributes: true
        });
        
        // Create a larger, completely black overlay as a child
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;bottom:0;right:0;width:300px;height:100px;background:#000000;z-index:9999999;';
        splineViewer.appendChild(overlay);
        
        // Add an additional overlay specifically targeting the bottom right corner
        const cornerOverlay = document.createElement('div');
        cornerOverlay.style.cssText = 'position:absolute;bottom:0;right:0;width:200px;height:50px;background:#000000;z-index:9999999;';
        splineViewer.appendChild(cornerOverlay);
      }
    }, 1000);
    
    // Make an additional attempt to hide the watermark after a longer delay
    const secondAttemptTimeoutId = setTimeout(() => {
      document.querySelectorAll('[class*="watermark"], [class*="spline"], a[href*="spline"]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        }
      });
    }, 3000);

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(secondAttemptTimeoutId);
    };
  }, [isSplineLoaded, isInViewport]);

  // Reduce the number of animated particles for better performance
  const renderParticles = () => {
    // Only render 8 particles instead of 12 for better performance
    return Array.from({ length: 8 }).map((_, i) => (
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
    ));
  };

  return (
    <div className="w-full h-[600px] absolute top-0 left-0 z-0 overflow-hidden" ref={containerRef}>
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} // Reduced from 2s to 1s for faster initial render
      >
        {/* Optimized glowing orbs effect - reduced blur radius and simplified animations */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div 
            className="absolute w-[300px] h-[300px] rounded-full bg-primary-500/15 blur-[80px] z-10"
            style={{ top: '10%', left: '10%' }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-[250px] h-[250px] rounded-full bg-blue-500/15 blur-[80px] z-10"
            style={{ top: '30%', right: '15%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
        
        {/* Add a subtle dark vignette overlay for better contrast with content */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 z-5 pointer-events-none"></div>
        
        {/* Conditionally render Spline viewer */}
        {isInViewport && (
          <spline-viewer 
            url="https://prod.spline.design/7dqUlpFgEXNPUap8/scene.splinecode"
            className="w-full h-full"
            loading="lazy"
          ></spline-viewer>
        )}
        
        {/* Animated particles with reduced number */}
        <motion.div 
          className="absolute bottom-0 right-0 w-[200px] h-[60px] overflow-hidden z-[600]" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Optimized animated dots */}
          {renderParticles()}
          
          {/* Animated small pulse */}
          <motion.div
            className="absolute bottom-[15px] right-[20px] w-[6px] h-[6px] bg-orange-400 rounded-full"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                '0 0 0px rgba(245, 158, 11, 0.0)',
                '0 0 8px rgba(245, 158, 11, 0.7)',
                '0 0 0px rgba(245, 158, 11, 0.0)'
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroScene;
