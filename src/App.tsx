import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import KommerceDashboard from './components/kommerce/KommerceDashboard';
import AffiliateDashboard from './components/affiliate-market/AffiliateDashboard';
import LandingPageBuilder from './components/kommerce/LandingPageBuilder';
import DemoLandingPageBuilder from './components/kommerce/DemoLandingPageBuilder';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<KommerceDashboard />} />
          <Route path="/affiliate" element={<AffiliateDashboard />} />
          <Route path="/kommerce/landing-page-builder" element={<LandingPageBuilder />} />
          <Route path="/kommerce/demo-landing-page-builder" element={<DemoLandingPageBuilder />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;