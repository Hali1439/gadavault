// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@/features/productsSlice";
import cartReducer from "@/features/cartSlice";
import userReducer from "@/features/userSlice";

// ----------------------------
// Configure Store
// ----------------------------
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 JWT tokens & API payloads often break serializability
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools in dev mode only
});

// ----------------------------
// Types for TS
// ----------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
