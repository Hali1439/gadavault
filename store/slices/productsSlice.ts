import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';
import type { Product } from '../../types/product';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products (all or by category slug)
export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'products/fetchProducts',
  async (categorySlug, { rejectWithValue }) => {
    try {
      const url = categorySlug ? `/products/?category=${categorySlug}` : '/products/';
      const response = await api.get(url);
      return response.data;
    } catch (err: unknown) {
      const error = err as { response?: { data: unknown }; message: string };
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
