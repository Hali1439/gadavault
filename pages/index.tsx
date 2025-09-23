// pages/index.tsx

import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

// Layout Components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/layout/Banner";
import FlashSale from "@/components/layout/FlashSale";

// Product Components
import ProductsList from "@/components/products/ProductsList";

// -------------------------------------
// Mock Data (replace with API later)
// -------------------------------------
const rawProducts = [
  { id: 1, name: "Qorii", price: 120, oldPrice: 160, discount: 40, image: "/qorii.png" },
  { id: 2, name: "Ak-900 Wired Keyboard", price: 960, oldPrice: 1160, discount: 5, image: "/Liputa.png" },
  { id: 3, name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, discount: 10, image: "/Zulu shield and spear.png" },
  { id: 4, name: "S-Series Comfort Chair", price: 375, oldPrice: 400, discount: 25, image: "/Madiba Shirt.png" },
];

// ✅ Transform raw data into Product type
const mockProducts: Product[] = rawProducts.map((item) => {
  const images = [
    {
      url: item.image,
      alt: item.name,
      order: 1,
    },
  ];

  return {
    id: String(item.id),
    name: item.name,
    description: "A beautiful piece of African traditional craft.",
    images,
    imageUrl: images[0].url, // ensure imageUrl is present
    price: item.price,
    salePrice: item.price, // 👈 adjust later if you need sale logic
    regularPrice: item.oldPrice,
    stock: 10,
    href: `/products/${item.id}`,
  } as Product;
});

// -------------------------------------
// Home Page
// -------------------------------------
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>GadaVault - Preserving Roots, Designing Futures</title>
        <meta
          name="description"
          content="Discover and shop authentic African traditional crafts and designs."
        />
        <meta property="og:title" content="GadaVault" />
        <meta
          property="og:description"
          content="A vault of African traditional crafts, connecting buyers, sellers, and designers."
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 py-12 bg-white">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to GadaVault
          </h1>

          <p className="text-lg text-gray-700 max-w-2xl mb-8">
            Your marketplace for authentic African traditional crafts and designs. Explore products,
            connect with sellers, and preserve cultural heritage.
          </p>

          <Image
            src="/qorii.png"
            alt="Showcase of African traditional crafts"
            width={700}
            height={450}
            priority
            className="rounded-xl shadow-lg mb-8"
          />

          {/* ✅ Fixed Link (no nested Link issue) */}
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
        </section>

        {/* Featured Banner */}
        <section className="container mx-auto px-4 py-12">
          <Banner
            imageSrc="/qorii.png"
            altText="African art banner"
            title="Preserving Roots, while Designing Futures"
          />
        </section>

        {/* Flash Sale */}
        <section className="container mx-auto px-4 py-12">
          <FlashSale products={mockProducts} saleEndsAt="2025-09-30T23:59:59" />
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <ProductsList products={mockProducts} />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
