// types/product.d.ts

// --- Product image ---
export interface ProductImage {
  url: string;
  alt?: string;
  order?: number;
}

// --- Category type ---
export interface ProductCategory {
  id: string;
  name: string;
  slug?: string;
}

// --- Core Product ---
export interface Product {
  // Identity
  id: string;
  name: string;
  slug?: string;
  description?: string;

  // Convenience single-image (maps to first images[] if present)
  imageUrl?: string;

  // Full media array
  images: ProductImage[]; // required, but can be empty []

  // Pricing
  price: number;            // normalized "current price" (could match salePrice)
  salePrice?: number;       // discounted price (if any)
  regularPrice?: number;    // original / compare-at price
  currency?: string;
  royalty_percent?: number;

  // Useful frontend link
  href?: string;

  // Inventory & publication
  stock: number;            // always required (default: 0 for demo data)
  published?: boolean;

  // Category info
  category?: ProductCategory | string | null;

  // Optional metadata / extensible fields
  attributes?: Record<string, unknown>;
  provenance?: Record<string, unknown>;
  story_markdown?: string;
  origin_region?: string;

  // Audit timestamps
  created_at?: string;
  updated_at?: string;
}

// --- Cart Item (extends Product) ---
export interface CartItem extends Product {
  quantity: number;
}

// --- Convenience exports ---
export type Products = Product[];

/**
 * A lighter product shape for UI demos (e.g. FlashSale placeholders)
 * Ensures dummy products don't break type checks.
 */
export type DemoProduct = Omit<
  Product,
  "images" | "stock" | "price"
> & {
  imageUrl: string;             // single demo image
  regularPrice: number;
  salePrice?: number;
  price?: number;               // allow optional override
  stock?: number;               // optional in demo
  images?: ProductImage[];      // optional in demo
};
