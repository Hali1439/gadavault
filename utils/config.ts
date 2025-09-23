// utils/config.ts

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
