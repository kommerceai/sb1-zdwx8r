import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../utils/supabaseClient';
import { TikTokShopAPI, TikTokShopProduct } from '../types';

const TikTokShopSettings: React.FC = () => {
  const { user } = useUser();
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [shopId, setShopId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchAPISettings();
    }
  }, [user]);

  const fetchAPISettings = async () => {
    const { data, error } = await supabase
      .from('tiktok_shop_settings')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (data) {
      setApiKey(data.api_key);
      setApiSecret(data.api_secret);
      setShopId(data.shop_id);
      setIsConnected(true);
      setLastSyncDate(data.last_sync_date);
    }
  };

  const handleConnect = async () => {
    const { data, error } = await supabase
      .from('tiktok_shop_settings')
      .upsert({
        user_id: user?.id,
        api_key: apiKey,
        api_secret: apiSecret,
        shop_id: shopId,
      });

    if (!error) {
      setIsConnected(true);
      alert('TikTok Shop API connected successfully!');
    } else {
      alert('Error connecting to TikTok Shop API. Please try again.');
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      // Fetch data from TikTok Shop API
      const tikTokData = await fetchTikTokShopData(apiKey, apiSecret, shopId);
      
      // Map TikTok Shop data to our product format
      const mappedProducts = mapTikTokDataToProducts(tikTokData);
      
      // Store mapped products in Supabase
      const { data, error } = await supabase
        .from('products')
        .upsert(mappedProducts);

      if (!error) {
        const now = new Date().toISOString();
        await supabase
          .from('tiktok_shop_settings')
          .update({ last_sync_date: now })
          .eq('user_id', user?.id);

        setLastSyncDate(now);
        alert('Data synced successfully!');
      } else {
        throw new Error('Error storing data in Supabase');
      }
    } catch (error) {
      alert('Error syncing data. Please try again.');
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TikTok Shop API Settings</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiKey">
            API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your TikTok Shop API Key"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apiSecret">
            API Secret
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiSecret"
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Enter your TikTok Shop API Secret"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopId">
            Shop ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="shopId"
            type="text"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            placeholder="Enter your TikTok Shop ID"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleConnect}
            disabled={isConnected}
          >
            {isConnected ? 'Connected' : 'Connect'}
          </button>
          {isConnected && (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? 'Syncing...' : 'Sync Data'}
            </button>
          )}
        </div>
        {lastSyncDate && (
          <p className="mt-4 text-sm text-gray-600">
            Last synced: {new Date(lastSyncDate).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default TikTokShopSettings;