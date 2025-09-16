// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cartSlice";
import productsReducer from "@/features/productsSlice";
import userReducer from "@/features/userSlice";

// ----------------------------
// Create the store
// ----------------------------
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // useful for JWT tokens, API payloads, etc.
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in dev mode only
});

// ----------------------------
// Types
// ----------------------------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
