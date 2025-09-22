// types/product.d.ts

// --- Core Product ---
export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;

  // Media
  imageUrl?: string; // convenience for frontend (maps to first images[] if present)
  images: { url: string; alt?: string; order?: number }[];

  // Pricing
  price: number;
  currency?: string;
  royalty_percent?: number;

  // Inventory
  stock: number;
  published?: boolean;

  // Category
  category?: {
    id: string;
    name: string;
    slug: string;
  } | string | null;

  // Metadata
  attributes?: Record<string, any>;
  provenance?: Record<string, any>;
  story_markdown?: string;
  origin_region?: string;

  // Audit
  created_at?: string;
  updated_at?: string;
}

// --- Cart Item (extends Product) ---
export interface CartItem extends Product {
  quantity: number;
}
