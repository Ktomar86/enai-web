import { StrictMode, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { initPerformanceMonitoring } from './utils/performanceMonitor';

// Initialize performance monitoring in development mode
if (import.meta.env.DEV) {
  initPerformanceMonitoring(true); // Enable console reporting
} else {
  initPerformanceMonitoring(false); // Disable console reporting in production
}

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
const StyleGuide = lazy(() => import('./pages/StyleGuide'));

// Add prefetch for primary routes
const prefetchRoutes = () => {
  // Prefetch the most likely next pages after a short delay when the main page loads
  setTimeout(() => {
    const links = [
      './pages/Industries.tsx',
      './AboutUs.tsx',
      './pages/Contact.tsx'
    ];
    
    links.forEach(link => {
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.as = 'script';
      prefetchLink.href = link;
      document.head.appendChild(prefetchLink);
    });
  }, 2000);
};

// Call prefetch function once DOM is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', prefetchRoutes);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/style" element={<StyleGuide />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  </StrictMode>
);