import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById } from "../utils/api";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const loadProducts = createAsyncThunk("products/load", async () => {
  const data = await fetchProducts();
  return data as Product[];
});

export const loadProductById = createAsyncThunk(
  "products/loadById",
  async (id: string) => {
    const data = await fetchProductById(id);
    return data as Product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.error = action.error.message || "Failed to load products";
        state.loading = false;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        const existing = state.items.find((p) => p.id === action.payload.id);
        if (!existing) state.items.push(action.payload);
      });
  },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;
