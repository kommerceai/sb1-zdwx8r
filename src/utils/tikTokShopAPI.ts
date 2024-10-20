import axios from 'axios';
import { TikTokShopAPI, TikTokShopProduct, Product } from '../types';

const TIKTOK_SHOP_API_URL = 'https://open-api.tiktokglobalshop.com';

export const fetchTikTokShopData = async (apiKey: string, apiSecret: string, shopId: string): Promise<TikTokShopAPI> => {
  try {
    const response = await axios.get(`${TIKTOK_SHOP_API_URL}/api/products/search`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
        'X-API-SECRET': apiSecret,
        'X-SHOP-ID': shopId,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data from TikTok Shop API:', error);
    throw error;
  }
};

export const mapTikTokDataToProducts = (tikTokData: TikTokShopAPI): Product[] => {
  return tikTokData.data.products.map((tikTokProduct: TikTokShopProduct) => ({
    id: tikTokProduct.id,
    title: tikTokProduct.name,
    description: tikTokProduct.description,
    price: tikTokProduct.price.original_price,
    currency: tikTokProduct.price.currency,
    images: tikTokProduct.images.map((image) => image.url),
    category: tikTokProduct.category_name,
    brand: tikTokProduct.brand,
    inventory: tikTokProduct.stock_infos.reduce((total, stock) => total + stock.available_stock, 0),
    variants: tikTokProduct.skus.map((sku) => ({
      id: sku.id,
      title: sku.name,
      price: sku.price.original_price,
      inventory: sku.stock_infos.reduce((total, stock) => total + stock.available_stock, 0),
      options: sku.sales_attributes.map((attr) => ({
        name: attr.name,
        value: attr.value,
      })),
    })),
  }));
};