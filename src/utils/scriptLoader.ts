/**
 * Script Loader Utility
 * 
 * Efficiently loads external scripts with performance optimizations:
 * - Prevents duplicate script loading
 * - Supports async and defer loading
 * - Enables script preloading for critical resources
 * - Provides callbacks for load and error events
 * - Manages script cleanup
 */

interface ScriptAttributes {
  async?: boolean;
  defer?: boolean;
  id?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  nonce?: string;
  integrity?: string;
  type?: string;
  referrerPolicy?: string;
  noModule?: boolean;
}

interface ScriptOptions extends ScriptAttributes {
  preload?: boolean;
  preloadTimeout?: number;
  removeOnUnmount?: boolean;
  preventDuplicates?: boolean;
}

// Track loaded scripts to avoid duplicates
const loadedScripts: Record<string, boolean> = {};

/**
 * Preload a script without executing it
 * @param src - Script URL
 * @param timeout - Time to wait before switching to full load (ms)
 * @returns Promise that resolves when preload is complete
 */
const preloadScript = (src: string, timeout: number = 1500): Promise<void> => {
  return new Promise((resolve) => {
    // Create a preload link
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = src;
    
    document.head.appendChild(link);
    
    // Resolve after timeout to allow browser to preload
    setTimeout(resolve, timeout);
  });
};

/**
 * Load a script dynamically with options
 * @param src - Script URL
 * @param options - Loading options
 * @returns Promise that resolves when script is loaded or rejects on error
 */
export const loadScript = (
  src: string,
  options: ScriptOptions = {}
): Promise<HTMLScriptElement> => {
  const {
    preload = false,
    preloadTimeout = 1500,
    async = true,
    defer = false,
    removeOnUnmount = false,
    preventDuplicates = true,
    ...scriptAttributes
  } = options;

  // Check if script is already loaded when duplicate prevention is enabled
  if (preventDuplicates && loadedScripts[src]) {
    return Promise.resolve(document.querySelector(`script[src="${src}"]`) as HTMLScriptElement);
  }

  const loadScriptElement = (): Promise<HTMLScriptElement> => {
    return new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;
      
      // Apply additional attributes
      Object.entries(scriptAttributes).forEach(([key, value]) => {
        if (value !== undefined) {
          script.setAttribute(key.toLowerCase(), value.toString());
        }
      });
      
      // Setup event handlers
      script.onload = () => {
        loadedScripts[src] = true;
        resolve(script);
      };
      
      script.onerror = () => {
        if (removeOnUnmount) {
          document.head.removeChild(script);
        }
        reject(new Error(`Failed to load script: ${src}`));
      };
      
      // Add to document
      document.head.appendChild(script);
    });
  };

  // Preload if requested, then load the script
  if (preload) {
    return preloadScript(src, preloadTimeout).then(loadScriptElement);
  }
  
  return loadScriptElement();
};

/**
 * Unload a previously loaded script
 * @param src - Script URL
 * @returns Promise that resolves when script is removed
 */
export const unloadScript = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const script = document.querySelector(`script[src="${src}"]`);
    
    if (script) {
      script.remove();
      delete loadedScripts[src];
    }
    
    resolve();
  });
};

/**
 * React hook for loading scripts in components
 * @param src - Script URL
 * @param options - Loading options
 * @returns Object with loading status and error information
 */
export const useScript = (
  src: string | null,
  options: ScriptOptions = {}
): { 
  loaded: boolean; 
  error: Error | null;
  scriptElement: HTMLScriptElement | null;
} => {
  // This is a stub for the hook - in a React environment, 
  // this would be implemented with useState and useEffect
  console.warn('useScript hook called outside React environment');
  
  return { 
    loaded: false, 
    error: null,
    scriptElement: null
  };
};

/**
 * Load multiple scripts in sequence
 * @param scripts - Array of script URLs
 * @param options - Loading options applied to all scripts
 * @returns Promise that resolves when all scripts are loaded
 */
export const loadScriptsSequentially = (
  scripts: string[],
  options: ScriptOptions = {}
): Promise<HTMLScriptElement[]> => {
  return scripts.reduce(
    (promise, src) => 
      promise.then((loadedScripts) => 
        loadScript(src, options).then((script) => [...loadedScripts, script])
      ),
    Promise.resolve<HTMLScriptElement[]>([])
  );
};

/**
 * Load multiple scripts in parallel
 * @param scripts - Array of script URLs
 * @param options - Loading options applied to all scripts
 * @returns Promise that resolves when all scripts are loaded
 */
export const loadScriptsParallel = (
  scripts: string[],
  options: ScriptOptions = {}
): Promise<HTMLScriptElement[]> => {
  return Promise.all(scripts.map((src) => loadScript(src, options)));
};

/**
 * Check if a script is already loaded
 * @param src - Script URL
 * @returns Boolean indicating if script is loaded
 */
export const isScriptLoaded = (src: string): boolean => {
  return !!document.querySelector(`script[src="${src}"]`) || !!loadedScripts[src];
}; 