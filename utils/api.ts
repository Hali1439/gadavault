import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle errors in a unified way
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
// AUTH (if you add JWT later)
// =========================
//
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login/", credentials);
    const token = response.data?.access;

    if (token) {
      // Save token for authenticated requests
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

//
// =========================
// EXPORT DEFAULT
// =========================
//
export default api;