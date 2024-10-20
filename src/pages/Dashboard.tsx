import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, Package, ShoppingCart, Users, Store, BarChart2, ArrowRight, RefreshCw } from 'lucide-react';
import { Client, SalesData, BudgetData } from '../types';
import DashboardBetaV2 from './DashboardBetaV2';

interface DashboardProps {
  manualData: {
    clients: Client[];
    salesData: { [key: number]: SalesData[] };
    budgetData: { [key: number]: BudgetData };
  } | null;
}

const Dashboard: React.FC<DashboardProps> = ({ manualData }) => {
  const [showBetaV2, setShowBetaV2] = useState(false);

  const clients = manualData?.clients || [];
  const salesData = manualData?.salesData || {};

  const totalRevenue = clients.reduce((sum, client) => sum + client.total_revenue, 0);
  const totalOrders = clients.reduce((sum, client) => sum + client.total_orders, 0);
  const totalCreators = clients.reduce((sum, client) => sum + client.active_creators, 0);
  const totalCampaigns = clients.reduce((sum, client) => sum + client.active_campaigns, 0);

  const overallSalesData = Object.values(salesData).reduce((acc, clientSales) => {
    clientSales.forEach(sale => {
      const existingMonth = acc.find(item => item.month === sale.month);
      if (existingMonth) {
        existingMonth.sales += sale.sales;
      } else {
        acc.push({ ...sale });
      }
    });
    return acc;
  }, [] as { month: string; sales: number }[]);

  if (showBetaV2) {
    return <DashboardBetaV2 onSwitchBack={() => setShowBetaV2(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Rest of the component remains the same, just use the new data sources */}
    </div>
  );
};

export default Dashboard;