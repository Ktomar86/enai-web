import { StrictMode, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor';

// Initialize performance monitoring
if (import.meta.env.DEV) {
  initPerformanceMonitoring(true); // Enable console reporting in dev
} else {
  initPerformanceMonitoring(false); // Disable console reporting in production
}

// Optimize for performance
const optimizePerformance = () => {
  // Enable aggressive garbage collection
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Cleanup unused resources during idle time
      if ('gc' in window) {
        (window as any).gc();
      }
    });
  }

  // Prefetch critical routes based on user behavior
  const prefetchCriticalRoutes = () => {
    const criticalRoutes = ['/about-us', '/contact', '/industries'];
    criticalRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  };

  // Prefetch after initial load
  setTimeout(prefetchCriticalRoutes, 3000);
};

// Run performance optimizations
optimizePerformance();

// Loading component
const LoadingFallback = () => (
  <div className="w-full min-h-screen flex items-center justify-center bg-dark">
    <div className="flex flex-col items-center">
      <div className="spinner w-12 h-12 rounded-full border-4 border-primary-400/20 border-t-primary-400 animate-spin"></div>
      <p className="mt-4 text-gray-400">Loading...</p>
    </div>
  </div>
);

// Lazy load components for better performance
const App = lazy(() => import('./App.tsx'));
const Industries = lazy(() => import('./pages/Industries.tsx'));
const IndustryDetail = lazy(() => import('./pages/IndustryDetail.tsx'));
const PrivacyPolicy = lazy(() => import('./PrivacyPolicy.tsx').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./TermsOfService.tsx').then(module => ({ default: module.TermsOfService })));
const AboutUs = lazy(() => import('./AboutUs.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const London = lazy(() => import('./pages/London.tsx'));
const StyleGuide = lazy(() => import('./pages/StyleGuide'));

// Add prefetch for primary routes
const prefetchRoutes = () => {
  // Prefetch the most likely next pages after a short delay when the main page loads
  setTimeout(() => {
    const routes = ['/industries', '/about-us', '/contact'];
    
    routes.forEach(route => {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = route;
      document.head.appendChild(prefetchLink);
    });
  }, 2000);
};

// Call prefetch function once DOM is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', prefetchRoutes);
}

// Create router with future flags enabled
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/industries",
    element: <Industries />
  },
  {
    path: "/industries/:slug",
    element: <IndustryDetail />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />
  },
  {
    path: "/about-us",
    element: <AboutUs />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/london",
    element: <London />
  },
  {
    path: "/style",
    element: <StyleGuide />
  }
], {
  future: {
    v7_relativeSplatPath: true
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);