import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Industries from './pages/Industries.tsx';
import IndustryDetail from './pages/IndustryDetail.tsx';
import { PrivacyPolicy } from './PrivacyPolicy.tsx';
import { TermsOfService } from './TermsOfService.tsx';
import AboutUs from './AboutUs.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  </StrictMode>
);