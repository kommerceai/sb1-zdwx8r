import React, { useEffect, useState } from 'react';
import { client } from '../utils/shopifyClient';

interface Product {
  id: string;
  title: string;
  handle: string;
}

const ShopifyProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await client.query({
        query: `
          query {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
          }
        `,
      });

      setProducts(data.products.edges.map((edge: any) => edge.node));
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Shopify Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShopifyProducts;