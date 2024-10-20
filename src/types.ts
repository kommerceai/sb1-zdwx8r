// ... (keep existing types)

export interface TikTokShopAPI {
  data: {
    products: TikTokShopProduct[];
  };
}

export interface TikTokShopProduct {
  id: string;
  name: string;
  description: string;
  price: {
    original_price: number;
    currency: string;
  };
  images: { url: string }[];
  category_name: string;
  brand: string;
  stock_infos: { available_stock: number }[];
  skus: TikTokShopSKU[];
}

export interface TikTokShopSKU {
  id: string;
  name: string;
  price: {
    original_price: number;
  };
  stock_infos: { available_stock: number }[];
  sales_attributes: { name: string; value: string }[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  brand: string;
  inventory: number;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  inventory: number;
  options: { name: string; value: string }[];
}