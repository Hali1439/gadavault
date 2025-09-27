// pages/products/index.tsx
import { useEffect } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/features/products/productsSlice";
import ProductsList from "@/components/products/ProductsList";
import CategoryFilter from "@/components/products/CategoryFilter";
import { Product } from "@/types/product";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProductCatalog() {
  const dispatch = useAppDispatch();
  const { items: products = [], loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(undefined)); // initial load
  }, [dispatch]);

  const handleCategorySelect = (slug: string | null) => {
    dispatch(fetchProducts(slug ?? undefined));
  };

  // TODO: Replace with backend `/categories/` fetch
  const categories: { id: string; name: string; slug: string }[] = [
    { id: "1", name: "Clothing", slug: "clothing" },
    { id: "2", name: "Cultural Artifact", slug: "Cultural Artifact" },
  ];

  return (
    <>
      <Head>
        <title>GadaVault | Products</title>
        <meta
          name="description"
          content="Explore curated African fashion products on GadaVault."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
            Product Catalog
          </h1>

          <CategoryFilter
            categories={categories}
            onSelect={handleCategorySelect}
          />

          {loading && (
            <p className="text-gray-600 animate-pulse">Loading products...</p>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p className="text-gray-500">No products available.</p>
          )}

          <ProductsList products={products as Product[]} />
        </div>
      </main>

      <Footer />
    </>
  );
}
