// pages/index.tsx
import Header from "@/components/layout/Header";
import Banner from "@/components/layout/Banner";
import FlashSale from "@/components/layout/FlashSale";
import { ProductsList } from "@/components/products/ProductsList";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero / Banner */}
      <Banner />

      {/* Flash Sale Section */}
      <FlashSale />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductsList />
      </section>

      <Footer />
    </div>
  );
}
