// --- Product image ---
export interface ProductImage {
  url: string;
  alt?: string;
  order?: number;
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
  images: ProductImage[];

  // Pricing
  price: number;
  salePrice?: number;      // current discounted price (if any)
  regularPrice?: number;   // original / compare-at price
  currency?: string;
  royalty_percent?: number;

  // Useful frontend link
  href?: string;

  // Inventory & publication
  stock: number;
  published?: boolean;

  // Category info
  category?: {
    id: string;
    name: string;
    slug?: string;
  } | string | null;

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

// convenience export
export type Products = Product[];
