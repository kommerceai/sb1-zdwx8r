import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";

export class ShopifyStorefrontAPI {
  private client: AxiosInstance;
  private shopify: any;

  constructor() {
    const shopName = process.env.REACT_APP_SHOPIFY_SHOP_NAME || 'demo-shop';
    const accessToken = process.env.REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN || 'demotoken1234567890abcdef';
    const apiKey = process.env.REACT_APP_SHOPIFY_API_KEY || 'demokey123456789';
    const apiSecretKey = process.env.REACT_APP_SHOPIFY_API_SECRET_KEY || 'demosecret987654321';

    this.client = axios.create({
      baseURL: `https://${shopName}.myshopify.com/admin/api/${LATEST_API_VERSION}`,
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    this.shopify = shopifyApi({
      apiKey: apiKey,
      apiSecretKey: apiSecretKey,
      scopes: ['read_products', 'write_products'],
      hostName: shopName
    });
  }

  public readonly get = {
    "/products": async (props: any, config?: AxiosRequestConfig): Promise<AxiosResponse> =>
      this.client.get<unknown, AxiosResponse, unknown>("/products.json", {
        params: {
          limit: props.limit,
          fields: props.fields,
        },
        ...config,
      }),

    "/products/{productId}": async (props: any, config?: AxiosRequestConfig): Promise<AxiosResponse> =>
      this.client.get<unknown, AxiosResponse, unknown>(`/products/${props.productId}.json`, config),
  } as const;

  public readonly listProducts = this.get["/products"];
  public readonly getProduct = this.get["/products/{productId}"];
}