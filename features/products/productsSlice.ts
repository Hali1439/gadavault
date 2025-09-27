// features/products/productsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { Product } from "@/types/product";
import { getMockProducts, getMockProductBySlug } from "@/services/mockData";

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  status: "idle",
};

// Normalize API response (array or paginated object)
const normalizeProducts = (data: unknown): Product[] => {
  if (Array.isArray(data)) return data as Product[];
  if (data && typeof data === "object" && "results" in (data as any)) {
    return (data as { results: Product[] }).results;
  }
  return [];
};

// -----------------------------
// Thunks
// -----------------------------
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (categorySlug?: string) => {
    const url = categorySlug ? `/products/?category=${categorySlug}` : "/products/";
    try {
      const { data } = await api.get(url);
      const products = normalizeProducts(data);
      // if backend returns unexpected empty array, still allow mock fallback
      if (products.length === 0) {
        const fallback = getMockProducts();
        return categorySlug
          ? fallback.filter(
              (p) =>
                p.categorySlug === categorySlug ||
                (p.category && p.category.slug === categorySlug)
            )
          : fallback;
      }
      return products;
    } catch (err) {
      // API failed -> fallback to local mock data
      // eslint-disable-next-line no-console
      console.warn("fetchProducts: API failed, falling back to mock products", err);
      const fallback = getMockProducts();
      return categorySlug
        ? fallback.filter(
            (p) =>
              p.categorySlug === categorySlug ||
              (p.category && p.category.slug === categorySlug)
          )
        : fallback;
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchBySlug",
  async (slug: string) => {
    try {
      const { data } = await api.get(`/products/${slug}`);
      // Backend might return a product object or 404; assume product or throw
      if (data && (data as any).id) {
        return data as Product;
      }
      // if API returned weird shape, try to normalize
      if (Array.isArray(data) && data.length > 0) return (data[0] as Product);
      // fall through to mock
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("fetchProductBySlug: API failed, falling back to mock product", err);
    }

    const fallback = getMockProductBySlug(slug);
    if (fallback) return fallback;
    // final: throw to let the rejected handler run
    throw new Error("Product not found");
  }
);

// -----------------------------
// Slice
// -----------------------------
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.items = action.payload; // always a clean array
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // fetchProductBySlug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

// -----------------------------
// Exports
// -----------------------------
export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
