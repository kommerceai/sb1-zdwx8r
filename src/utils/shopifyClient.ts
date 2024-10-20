import { createStorefrontClient } from '@shopify/hydrogen';

export const client = createStorefrontClient({
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_TOKEN,
  storeDomain: process.env.STORE_DOMAIN,
  storefrontApiVersion: '2023-01',
});