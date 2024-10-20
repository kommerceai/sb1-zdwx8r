import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/affiliate-market/shopifyClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
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

      const products = data.products.edges.map((edge: any) => edge.node);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Shopify products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}