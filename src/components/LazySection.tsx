import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  /**
   * Dynamic import returning a React component
   */
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  /** Placeholder element shown before section loads */
  placeholder?: React.ReactNode;
  /** Margin around root for preloading */
  rootMargin?: string;
}

const defaultPlaceholder = (
  <div className="w-full py-20 flex items-center justify-center animate-pulse bg-dark-800/30">
    <span className="text-gray-500">Loading...</span>
  </div>
);

/**
 * LazySection – defers loading of heavy sections until they are about to enter the viewport.
 * This reduces JS payload on first paint and speeds up initial navigation.
 */
const LazySection: React.FC<LazySectionProps> = ({ loader, placeholder = defaultPlaceholder, rootMargin = '200px' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin });

  // Memo‐ize the lazy component so we don't recreate it on every render
  const LazyComponent = React.useMemo(() => React.lazy(loader), [loader]);

  return (
    <div ref={ref} style={{ minHeight: '20vh' }}>
      {inView ? (
        <Suspense fallback={placeholder}>{<LazyComponent />}</Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
};

export default LazySection; 