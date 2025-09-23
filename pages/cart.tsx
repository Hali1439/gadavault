// pages/cart.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cart from "@/components/cart/Cart";

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <Cart />
      </main>
      <Footer />
    </>
  );
}
