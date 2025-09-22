// features/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { Product } from "@/types/product";

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// --- Fetch all products (optionally by category slug) ---
export const fetchProducts = createAsyncThunk<
  Product[],
  string | undefined,
  { rejectValue: string }
>("products/fetchAll", async (categorySlug, { rejectWithValue }) => {
  try {
    const endpoint = categorySlug
      ? `/products/?category=${categorySlug}`
      : "/products/";
    const response = await api.get<Product[]>(endpoint);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.detail || "Failed to fetch products");
  }
});

// --- Fetch by ID ---
export const fetchProductById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<Product>(`/products/${id}/`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.detail || "Failed to fetch product");
  }
});

// --- Fetch by Slug ---
export const fetchProductBySlug = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/fetchBySlug", async (slug, { rejectWithValue }) => {
  try {
    const response = await api.get<Product>(`/products/${slug}/`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.detail || "Failed to fetch product");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    // --- fetchProducts ---
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load products";
    });

    // --- fetchProductById ---
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    });

    // --- fetchProductBySlug ---
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    });
  },
});

export const { addProduct, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
