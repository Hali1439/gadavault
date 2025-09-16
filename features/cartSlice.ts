import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder } from "../utils/api";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Optional: send cart to backend as order
export const checkout = (items: CartItem[]) => async () => {
  try {
    const orderData = { items };
    await createOrder(orderData);
    console.log("Order placed successfully!");
  } catch (error) {
    console.error("Checkout failed:", error);
  }
};

export default cartSlice.reducer;
