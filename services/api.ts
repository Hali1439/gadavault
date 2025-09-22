// services/api.ts
import api from "@/utils/api";
import axios from "axios";

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  } else {
    console.error("Unexpected Error:", error);
    throw error;
  }
};

//
// =========================
// PRODUCTS
// =========================
//
export const fetchProducts = async () => {
  try {
    const response = await api.get("/products/");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const fetchProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//
// =========================
// ORDERS
// =========================
//
export const createOrder = async (orderData: Record<string, unknown>) => {
  try {
    const response = await api.post("/orders/", orderData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

//
// =========================
// AUTH (JWT support ready)
// =========================
//
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login/", credentials);
    const token = response.data?.access;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (userData: Record<string, unknown>) => {
  try {
    const response = await api.post("/auth/register/", userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
