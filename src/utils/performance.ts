/**
 * Performance optimization utilities
 * This file contains utility functions to optimize performance in the application
 */

// Add type definition for Navigator.connection
interface NetworkInformation {
  effectiveType: string;
  saveData: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

/**
 * Throttle function to limit how often a function can be called
 * @param fn The function to throttle
 * @param delay The minimum time between function calls in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Schedule a call after the remaining time of the delay
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        fn(...args);
        timeoutId = null;
      }, delay - timeSinceLastCall);
    }
  };
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param fn The function to debounce
 * @param delay The wait time in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Simple memoization function for expensive calculations
 * @param fn The function to memoize
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Check if the Intersection Observer API is available
 */
export const isIntersectionObserverSupported = (): boolean => {
  return 'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype;
};

/**
 * Determines if a component is in the viewport using Intersection Observer
 * @param element The DOM element to observe
 * @param callback Function to call when visibility changes
 * @param options IntersectionObserver options
 */
export const observeElementVisibility = (
  element: Element | null,
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
): (() => void) => {
  if (!element || !isIntersectionObserverSupported()) {
    callback(true); // Fallback to always visible
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    callback(entries[0]?.isIntersecting ?? false);
  }, options);

  observer.observe(element);

  // Return cleanup function
  return () => observer.disconnect();
};

/**
 * Optimizes image loading by determining appropriate sizes
 * @param imageUrl The base image URL
 * @param sizes An array of sizes to generate srcSet
 */
export const getResponsiveImageProps = (
  imageUrl: string,
  sizes: number[] = [320, 640, 960, 1280]
): { src: string; srcSet: string; sizes: string } => {
  // Extract base URL without query parameters
  const baseUrl = imageUrl.split('?')[0];
  
  // Generate the srcSet string
  const srcSet = sizes
    .map((size) => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');

  return {
    src: imageUrl,
    srcSet,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  };
};

/**
 * Request idle callback with fallback for browsers that don't support it
 * @param callback Function to execute when idle
 * @param options Options for requestIdleCallback
 */
export const requestIdleCallback = (
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  } else {
    return setTimeout(() => {
      const start = Date.now();
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      });
    }, 1) as unknown as number; // Cast to number to satisfy TypeScript
  }
};

/**
 * Cancel idle callback with fallback
 * @param id The ID returned by requestIdleCallback
 */
export const cancelIdleCallback = (id: number): void => {
  'cancelIdleCallback' in window
    ? window.cancelIdleCallback(id)
    : clearTimeout(id);
};

/**
 * React hook to detect if the device has a slow connection
 * @returns Boolean indicating if the connection is slow
 */
export const isSlowConnection = (): boolean => {
  // Use the extended navigator type
  const nav = navigator as NavigatorWithConnection;
  
  if (!nav.connection) {
    return false;
  }
  
  if (nav.connection.saveData) {
    return true; // User has requested data saving mode
  }
  
  const effectiveType = nav.connection.effectiveType;
  return effectiveType === 'slow-2g' || effectiveType === '2g';
};

/**
 * Checks if the device is likely a low-end device based on hardware concurrency
 * @returns Boolean indicating if it's likely a low-end device
 */
export const isLowEndDevice = (): boolean => {
  return navigator.hardwareConcurrency !== undefined && 
         navigator.hardwareConcurrency <= 2;
};

/**
 * Determines if the user has enabled reduced motion preference
 * @returns Boolean indicating if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Creates a lightweight event bus for communication between components
 * without creating unnecessary re-renders
 */
export const createEventBus = () => {
  const listeners: Record<string, Function[]> = {};

  return {
    subscribe: (event: string, callback: Function): (() => void) => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      
      listeners[event].push(callback);
      
      return () => {
        listeners[event] = listeners[event].filter(cb => cb !== callback);
      };
    },
    publish: (event: string, data?: any): void => {
      if (!listeners[event]) return;
      
      listeners[event].forEach(callback => {
        callback(data);
      });
    }
  };
};

/**
 * Global event bus instance
 */
export const EventBus = createEventBus(); 