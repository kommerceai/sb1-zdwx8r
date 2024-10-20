import React from 'react';
import { Link } from 'react-router-dom';
import CampaignDataIntegration from './CampaignDataIntegration';
import BudgetTracking from './BudgetTracking';
import ROICalculator from './ROICalculator';
import GoalTracker from './GoalTracker';
import PerformanceDashboard from './PerformanceDashboard';

const KommerceDashboard: React.FC = () => {
  return (
    <div className="kommerce-dashboard">
      <h1>Kommerce Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/kommerce/landing-page-builder">Landing Page Builder</Link></li>
        </ul>
      </nav>
      <CampaignDataIntegration />
      <BudgetTracking />
      <ROICalculator />
      <GoalTracker />
      <PerformanceDashboard />
    </div>
  );
};

export default KommerceDashboard;