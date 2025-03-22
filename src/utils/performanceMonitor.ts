/**
 * Performance Monitoring Utility
 * 
 * Tracks and reports key performance metrics to help identify bottlenecks.
 * Features:
 * - First Contentful Paint (FCP) tracking
 * - Largest Contentful Paint (LCP) tracking
 * - First Input Delay (FID) tracking
 * - Cumulative Layout Shift (CLS) tracking
 * - Component render timing
 * - Custom performance marks and measures
 */

// Add proper performance entry type definitions
interface PerformanceEntryWithStartTime extends PerformanceEntry {
  startTime: number;
}

interface FirstInputPerformanceEntry extends PerformanceEntryWithStartTime {
  processingStart: number;
}

interface LayoutShiftPerformanceEntry extends PerformanceEntryWithStartTime {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface ComponentRenderTiming {
  componentName: string;
  renderTime: number;
  timestamp: number;
}

// Core Web Vitals thresholds
const thresholds = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 },   // milliseconds
  CLS: { good: 0.1, poor: 0.25 },  // unitless
  FCP: { good: 1800, poor: 3000 }, // milliseconds
  TTI: { good: 3800, poor: 7300 }, // milliseconds
};

// Store for performance metrics
const metrics: Record<string, PerformanceMetric> = {};

// Store for component render timings
const renderTimings: ComponentRenderTiming[] = [];

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = (reportToConsole = false) => {
  // Avoid re-initialization
  if (typeof window === 'undefined' || (window as any).__PERFORMANCE_INITIALIZED__) {
    return;
  }
  
  (window as any).__PERFORMANCE_INITIALIZED__ = true;
  
  // Observe FCP
  observeFCP();
  
  // Observe LCP
  observeLCP();
  
  // Observe FID
  observeFID();
  
  // Observe CLS
  observeCLS();
  
  // Log performance metrics to console if enabled
  if (reportToConsole) {
    window.addEventListener('load', () => {
      setTimeout(logPerformanceMetrics, 3000);
    });
  }
};

/**
 * Get the rating of a metric based on thresholds
 * @param name - Metric name
 * @param value - Metric value
 * @returns Rating as 'good', 'needs-improvement', or 'poor'
 */
const getRating = (name: keyof typeof thresholds, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = thresholds[name];
  
  if (!threshold) {
    return 'good'; // Default if no thresholds defined
  }
  
  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.poor) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
};

/**
 * Observe First Contentful Paint
 */
const observeFCP = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0];
        const value = fcp.startTime;
        
        metrics.FCP = {
          name: 'First Contentful Paint',
          value,
          rating: getRating('FCP', value),
        };
        
        fcpObserver.disconnect();
      }
    });
    
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.error('Failed to observe FCP:', e);
  }
};

/**
 * Observe Largest Contentful Paint
 */
const observeLCP = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const value = lastEntry.startTime;
        
        metrics.LCP = {
          name: 'Largest Contentful Paint',
          value,
          rating: getRating('LCP', value),
        };
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Disconnect after load event
    window.addEventListener('load', () => {
      setTimeout(() => {
        lcpObserver.disconnect();
      }, 5000); // Allow for some delay after load
    });
  } catch (e) {
    console.error('Failed to observe LCP:', e);
  }
};

/**
 * Observe First Input Delay
 */
const observeFID = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0] as FirstInputPerformanceEntry;
        const inputDelay = firstInput.processingStart - firstInput.startTime;
        
        metrics.FID = {
          name: 'First Input Delay',
          value: inputDelay,
          rating: getRating('FID', inputDelay),
        };
        
        fidObserver.disconnect();
      }
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.error('Failed to observe FID:', e);
  }
};

/**
 * Observe Cumulative Layout Shift
 */
const observeCLS = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];
    let sessionId = Date.now();
    
    const entryHandler = (entries: PerformanceEntry[]) => {
      entries.forEach((entry) => {
        // Only count layout shifts without recent user input
        const layoutShiftEntry = entry as LayoutShiftPerformanceEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          const currentSessionId = Date.now();
          
          // If more than 1s since last entry or more than 5s since session start,
          // start a new session
          if (
            clsEntries.length &&
            currentSessionId - sessionId > 1000 &&
            currentSessionId - sessionId > 5000
          ) {
            // If current session value is larger than stored, update it
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              clsEntries = sessionEntries;
            }
            
            sessionValue = 0;
            sessionEntries = [];
            sessionId = currentSessionId;
          }
          
          // Add entry to current session
          sessionEntries.push(entry);
          
          // Update session CLS value
          sessionValue += layoutShiftEntry.value;
          
          // Update metrics with current highest session value
          metrics.CLS = {
            name: 'Cumulative Layout Shift',
            value: Math.max(clsValue, sessionValue),
            rating: getRating('CLS', Math.max(clsValue, sessionValue)),
          };
        }
      });
    };
    
    const clsObserver = new PerformanceObserver((entryList) => {
      entryHandler(entryList.getEntries());
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Report final CLS value after page unload
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && sessionValue > clsValue) {
        clsValue = sessionValue;
        
        // Store the final CLS value
        metrics.CLS = {
          name: 'Cumulative Layout Shift',
          value: clsValue,
          rating: getRating('CLS', clsValue),
        };
      }
    });
  } catch (e) {
    console.error('Failed to observe CLS:', e);
  }
};

/**
 * Measure component render time
 * @param componentName - Name of the component being measured
 * @param callback - Function to measure
 * @returns Result of the callback function
 */
export const measureComponentRender = <T>(componentName: string, callback: () => T): T => {
  if (typeof performance === 'undefined') {
    return callback();
  }
  
  const start = performance.now();
  const result = callback();
  const end = performance.now();
  
  renderTimings.push({
    componentName,
    renderTime: end - start,
    timestamp: Date.now(),
  });
  
  return result;
};

/**
 * Get all collected performance metrics
 * @returns Object containing all metrics
 */
export const getPerformanceMetrics = (): Record<string, PerformanceMetric> => {
  return { ...metrics };
};

/**
 * Get component render timings
 * @param componentName - Optional component name to filter timings
 * @returns Array of component render timings
 */
export const getComponentRenderTimings = (componentName?: string): ComponentRenderTiming[] => {
  if (componentName) {
    return renderTimings.filter(timing => timing.componentName === componentName);
  }
  
  return [...renderTimings];
};

/**
 * Mark a performance point
 * @param name - Name of the mark
 */
export const markPerformance = (name: string): void => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name);
  }
};

/**
 * Measure time between two marks
 * @param name - Name of the measure
 * @param startMark - Starting mark
 * @param endMark - Ending mark
 * @returns Duration in milliseconds
 */
export const measurePerformance = (
  name: string,
  startMark: string,
  endMark: string
): number => {
  if (typeof performance === 'undefined' || !performance.measure) {
    return 0;
  }
  
  try {
    performance.measure(name, startMark, endMark);
    const entries = performance.getEntriesByName(name, 'measure');
    
    if (entries.length > 0) {
      return entries[0].duration;
    }
  } catch (e) {
    console.error(`Failed to measure performance between ${startMark} and ${endMark}:`, e);
  }
  
  return 0;
};

/**
 * Clear all performance marks and measures
 */
export const clearPerformanceMarks = (): void => {
  if (typeof performance !== 'undefined') {
    if (performance.clearMarks) {
      performance.clearMarks();
    }
    
    if (performance.clearMeasures) {
      performance.clearMeasures();
    }
  }
};

/**
 * Log current performance metrics to console
 */
export const logPerformanceMetrics = (): void => {
  console.group('Performance Metrics');
  
  Object.values(metrics).forEach((metric) => {
    const color = 
      metric.rating === 'good' ? 'green' :
      metric.rating === 'needs-improvement' ? 'orange' : 'red';
    
    console.log(
      `%c${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`,
      `color: ${color}; font-weight: bold;`
    );
  });
  
  console.log('Component Render Times:');
  
  const componentAverages: Record<string, { total: number, count: number }> = {};
  
  renderTimings.forEach((timing) => {
    if (!componentAverages[timing.componentName]) {
      componentAverages[timing.componentName] = { total: 0, count: 0 };
    }
    
    componentAverages[timing.componentName].total += timing.renderTime;
    componentAverages[timing.componentName].count += 1;
  });
  
  Object.entries(componentAverages)
    .sort((a, b) => (b[1].total / b[1].count) - (a[1].total / a[1].count))
    .forEach(([name, { total, count }]) => {
      const average = total / count;
      const color = average < 16 ? 'green' : average < 50 ? 'orange' : 'red';
      
      console.log(
        `%c${name}: ${average.toFixed(2)}ms (avg of ${count} renders)`,
        `color: ${color};`
      );
    });
  
  console.groupEnd();
}; 