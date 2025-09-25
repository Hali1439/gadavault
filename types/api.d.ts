import { Product, CartItem } from "./product";
import { User, AuthResponse } from "./user";

/**
 * Designer type coming from backend.
 */
export interface Designer {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

/**
 * API Endpoints & Expected Payloads
 */
export interface ApiEndpoints {
  // Products
  getProducts: ApiResponse<Product[]>;
  getProductById: ApiResponse<Product>;
  createProduct: ApiResponse<Product>;
  updateProduct: ApiResponse<Product>;
  deleteProduct: ApiResponse<null>;

  // Cart
  getCart: ApiResponse<CartItem[]>;
  addToCart: ApiResponse<CartItem>;
  updateCartItem: ApiResponse<CartItem>;
  removeCartItem: ApiResponse<null>;

  // Users & Auth
  signup: ApiResponse<AuthResponse>;
  login: ApiResponse<AuthResponse>;
  getProfile: ApiResponse<User>;
  updateProfile: ApiResponse<User>;

  // Designers
  getDesigners: ApiResponse<Designer[]>;
  getDesignerById: ApiResponse<Designer>;

  // Orders
  createOrder: ApiResponse<{ orderId: string }>;
  getOrders: ApiResponse<unknown[]>; // refine once backend schema confirmed
  getOrderById: ApiResponse<unknown>;
}
