// types/product.d.ts

export interface ProductImage {
  url: string;
  alt?: string;
  order?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  regularPrice?: number;
  currency: string;
  stock: number;
  published: boolean;
  images: ProductImage[];
  category: ProductCategory;
  categorySlug: string;
  attributes?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// ✅ CartItem extends Product but adds quantity
export interface CartItem extends Product {
  quantity: number;
}

// ✅ Flash sale items are still products, with extra info
export interface FlashSaleProduct extends Product {
  discount: number;     // percentage discount, e.g. 20
  saleEnds: string;     // ISO string for sale end date
}
