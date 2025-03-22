import React, { useState, useRef, useEffect } from 'react';
import { observeElementVisibility, getResponsiveImageProps, isSlowConnection, prefersReducedMotion } from '../utils/performance';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  placeholderColor?: string;
  blur?: boolean;
  loadingPriority?: 'lazy' | 'eager' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * LazyImage - An optimized image component with lazy loading, responsive sizing,
 * blur-up effect, and placeholder functionality
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes,
  placeholderColor = '#1f2937',
  blur = true,
  loadingPriority = 'lazy',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if we should use loading="eager" based on connection and priority
  const shouldEagerLoad = 
    loadingPriority === 'eager' || 
    (loadingPriority === 'auto' && !isSlowConnection());

  const prefersReduced = prefersReducedMotion();

  // Generate responsive image attributes
  const responsiveProps = getResponsiveImageProps(src);

  useEffect(() => {
    // Set up intersection observer
    if (loadingPriority !== 'eager' && containerRef.current) {
      const cleanup = observeElementVisibility(
        containerRef.current,
        (visible) => {
          if (visible) {
            setIsVisible(true);
          }
        },
        { rootMargin: '200px' } // Start loading when image is 200px from viewport
      );

      return cleanup;
    } else {
      // If eager loading, set visible immediately
      setIsVisible(true);
    }
  }, [loadingPriority]);

  // Handle image load success
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image load error
  const handleImageError = () => {
    setError(true);
    if (onError) onError();
  };

  // Generate the actual style based on state
  const generateStyle = () => {
    const style: React.CSSProperties = {};
    
    // Set placeholder background color
    if (!isLoaded || error) {
      style.backgroundColor = placeholderColor;
    }
    
    // Apply blur effect when enabled and loading
    if (blur && !isLoaded && !error && !prefersReduced) {
      style.filter = 'blur(10px)';
      style.transform = 'scale(1.05)';
      style.transition = 'filter 0.3s ease-out, transform 0.3s ease-out';
    }

    // Apply transition to remove blur
    if (blur && isLoaded && !prefersReduced) {
      style.filter = 'blur(0)';
      style.transform = 'scale(1)';
      style.transition = 'filter 0.3s ease-out, transform 0.3s ease-out';
    }

    return style;
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        height: height ? `${height}px` : 'auto',
        width: width ? `${width}px` : '100%', 
        aspectRatio: width && height ? `${width}/${height}` : undefined 
      }}
      aria-hidden={error ? true : undefined}
    >
      {/* Placeholder or error state */}
      {(!isVisible || error) && (
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        >
          {error && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Unable to load image
            </div>
          )}
        </div>
      )}

      {/* Actual image */}
      {isVisible && !error && (
        <img
          ref={imgRef}
          src={responsiveProps.src}
          srcSet={responsiveProps.srcSet}
          sizes={sizes || responsiveProps.sizes}
          alt={alt}
          loading={shouldEagerLoad ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={generateStyle()}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </div>
  );
};

export default LazyImage; 