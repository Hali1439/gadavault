import axios from "axios";
import type { CartItem } from "@/types/product";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------
// Error handling utility
// -----------------------------
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  } else {
    console.error("Unexpected Error:", error);
    throw error;
  }
};

// -----------------------------
// Auth API helpers
// -----------------------------
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const { data } = await api.post("/auth/login/", credentials);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (credentials: { name?: string; email: string; password: string }) => {
  try {
    const { data } = await api.post("/auth/register/", credentials);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// -----------------------------
// Order API helpers
// -----------------------------
export interface CreateOrderData {
  items: {
    product_id: string;
    quantity: number;
  }[];
}

export const createOrder = async (orderData: CreateOrderData) => {
  try {
    const { data } = await api.post("/orders/", orderData);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export default api;
