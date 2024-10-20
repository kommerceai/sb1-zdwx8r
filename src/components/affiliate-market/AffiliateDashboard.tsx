import React from 'react';
import DragAndDropEditor from './DragAndDropEditor';
import ShopifyProducts from './ShopifyProducts';

const AffiliateDashboard: React.FC = () => {
  return (
    <div className="affiliate-dashboard">
      <h1>Affiliate Market Dashboard</h1>
      <DragAndDropEditor />
      <ShopifyProducts />
    </div>
  );
};

export default AffiliateDashboard;