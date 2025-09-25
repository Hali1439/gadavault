import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types/product";

export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

// 🔮 helper: calculate total dynamically
const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Payload is Product + quantity (not CartItem)
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const index = state.items.findIndex((i) => i.id === product.id);

      if (index >= 0) {
        // increment existing
        state.items[index].quantity += quantity;
      } else {
        // create new CartItem
        state.items.push({ ...product, quantity });
      }

      state.total = calculateTotal(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // 🚨 guard: no 0 or negative
      }
      state.total = calculateTotal(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
