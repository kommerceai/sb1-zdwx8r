import React, { useEffect, useState } from 'react';
import { ShopifyStorefrontAPI } from '../../lib/shopifyApi';

interface Product {
  id: string;
  title: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const api = new ShopifyStorefrontAPI();
        const response = await api.listProducts({ limit: 10 });
        
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          // If we're using demo data, create some mock products
          setProducts([
            { id: '1', title: 'Demo Product 1' },
            { id: '2', title: 'Demo Product 2' },
            { id: '3', title: 'Demo Product 3' },
          ]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products. Using demo data.');
        // Set demo products even if there's an error
        setProducts([
          { id: '1', title: 'Demo Product 1' },
          { id: '2', title: 'Demo Product 2' },
          { id: '3', title: 'Demo Product 3' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Note: {error}</div>;

  return (
    <div>
      <h3>Shopify Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;