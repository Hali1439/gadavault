// utils/config.ts

// Dev: .env.local or fallback
const DEV_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// Prod: Railway deployment (default)
const PROD_API_URL = "https://gadavaultbackend-production.up.railway.app/api";

export const API_URL: string = (() => {
  if (typeof window === "undefined") {
    // Server-side: prefer environment variable, fallback to Railway
    return process.env.NEXT_PUBLIC_API_URL || PROD_API_URL;
  } else {
    // Client-side: same logic
    return process.env.NEXT_PUBLIC_API_URL || PROD_API_URL;
  }
})();
