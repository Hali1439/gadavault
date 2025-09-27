import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/features/products/productsSlice";
import { apiService } from "@/services/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/layout/Banner";
import ProductsGrid from "@/components/products/ProductsGrid";
import CategoryFilter from "@/components/products/CategoryFilter";
import FlashSale from "@/components/layout/FlashSale";
import LoadingSpinner from "@/components/common/LoadingSpinner";

// ✅ Category type
interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: products = [], loading, error } = useAppSelector(
    (state) => state.products
  );

  // ✅ fix never[] inference
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    // Fetch products
    dispatch(fetchProducts());

    // Fetch categories
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await apiService.getCategories();
        if (response.success) {
          setCategories(response.data as ProductCategory[]);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, [dispatch]);

  const featuredProducts = (products || [])
  .filter((product: Product | undefined) => product?.published) // Add type assertion here
  .slice(0, 8);

  return (
    <>
      <Head>
        <title>GadaVault - Preserving Roots, Designing Futures</title>
        <meta
          name="description"
          content="Discover authentic African traditional crafts, designs, and fashion. Shop unique products while supporting local artisans."
        />
        <meta
          name="keywords"
          content="African fashion, traditional crafts, artisans, cultural products"
        />
        <meta
          property="og:title"
          content="GadaVault - African Heritage Marketplace"
        />
        <meta
          property="og:description"
          content="Discover authentic African traditional crafts and designs"
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://gadavault.com" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <Banner
          imageSrc="/images/hero-banner.jpg"
          altText="African heritage crafts and designs"
          title="Preserving Roots, Designing Futures"
          subtitle="Discover authentic African craftsmanship and support local artisans"
          buttonText="Explore Collection"
          buttonHref="/products"
        />

        {/* Featured Categories */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated collections of traditional African products
              </p>
            </div>

            {loadingCategories ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <CategoryFilter
                categories={categories}
                onSelect={(categorySlug: string | null) => {
                  dispatch(fetchProducts(categorySlug ?? undefined));
                }}
              />
            )}
          </div>
        </section>

        {/* Flash Sales */}
        <FlashSale />

        {/* Featured Products */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Handpicked items from our collection
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Failed to load products</p>
                <button
                  onClick={() => dispatch(fetchProducts())}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <ProductsGrid products={featuredProducts} />
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-purple-100 mb-6">
              Get notified about new products, exclusive deals, and cultural
              insights
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
