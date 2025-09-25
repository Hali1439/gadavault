// utils/api.ts
import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  } else {
    console.error("Unexpected Error:", error);
    throw error;
  }
};

// ---------------- Auth ----------------
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const { data } = await api.post("/users/token/", credentials);
    return data; // { access, refresh, user }
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async (payload: { email: string; password: string }) => {
  try {
    const { data } = await api.post("/users/signup/", payload);
    return data; // { user, access, refresh }
  } catch (error) {
    handleError(error);
  }
};

// ---------------- Contact ----------------
export const sendContact = async (payload: { name: string; email: string; message: string }) => {
  try {
    const { data } = await api.post("/users/contact/", payload);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// ---------------- Social Login ----------------
export const socialLogin = async (provider: string, token: string) => {
  try {
    const { data } = await api.post(`/users/social-login/`, { provider, token });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export default api;
