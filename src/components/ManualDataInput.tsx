import React, { useState } from 'react';
import { Client, SalesData, BudgetData } from '../types';

interface ManualDataInputProps {
  onDataSubmit: (data: {
    clients: Client[];
    salesData: { [key: number]: SalesData[] };
    budgetData: { [key: number]: BudgetData };
  }) => void;
}

const ManualDataInput: React.FC<ManualDataInputProps> = ({ onDataSubmit }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [salesData, setSalesData] = useState<{ [key: number]: SalesData[] }>({});
  const [budgetData, setBudgetData] = useState<{ [key: number]: BudgetData }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataSubmit({ clients, salesData, budgetData });
  };

  const addClient = () => {
    const newClient: Client = {
      id: clients.length + 1,
      name: '',
      email: '',
      created_at: new Date().toISOString(),
      total_revenue: 0,
      total_orders: 0,
      active_creators: 0,
      active_campaigns: 0,
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (index: number, field: keyof Client, value: string | number) => {
    const updatedClients = [...clients];
    updatedClients[index] = { ...updatedClients[index], [field]: value };
    setClients(updatedClients);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">Manual Data Input</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Clients</h3>
        {clients.map((client, index) => (
          <div key={client.id} className="mb-4 p-4 border rounded">
            <input
              type="text"
              value={client.name}
              onChange={(e) => updateClient(index, 'name', e.target.value)}
              placeholder="Client Name"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="email"
              value={client.email}
              onChange={(e) => updateClient(index, 'email', e.target.value)}
              placeholder="Client Email"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="number"
              value={client.total_revenue}
              onChange={(e) => updateClient(index, 'total_revenue', Number(e.target.value))}
              placeholder="Total Revenue"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="number"
              value={client.total_orders}
              onChange={(e) => updateClient(index, 'total_orders', Number(e.target.value))}
              placeholder="Total Orders"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="number"
              value={client.active_creators}
              onChange={(e) => updateClient(index, 'active_creators', Number(e.target.value))}
              placeholder="Active Creators"
              className="mb-2 p-2 border rounded"
            />
            <input
              type="number"
              value={client.active_campaigns}
              onChange={(e) => updateClient(index, 'active_campaigns', Number(e.target.value))}
              placeholder="Active Campaigns"
              className="mb-2 p-2 border rounded"
            />
          </div>
        ))}
        <button type="button" onClick={addClient} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Client
        </button>
      </div>

      {/* Add similar sections for salesData and budgetData */}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit Data
      </button>
    </form>
  );
};

export default ManualDataInput;