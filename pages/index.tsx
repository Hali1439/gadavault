import Head from "next/head";

// Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/layout/Banner";
import FlashSale from "@/components/layout/FlashSale";

// Products
import ProductsList from "@/components/products/ProductsList";

export default function Home() {
  return (
    <>
      <Head>
        <title>GadaVault - Preserving Roots, Designing Futures</title>
        <meta
          name="description"
          content="Discover and shop authentic African traditional crafts and designs."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        <Banner
          imageSrc="/images/hero-banner.jpg"
          altText="African heritage crafts"
          title="Preserving Roots, Designing Futures"
          subtitle="Authentic crafts from artisans across Africa."
          buttonText="Shop Now"
          buttonHref="/products"
        />

        <FlashSale />

        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          {/* Empty for now until you wire API */}
          <ProductsList products={[]} />
        </section>
      </main>

      <Footer />
    </>
  );
}
