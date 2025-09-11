import ProductCard from "./ProductCard";

const flashSaleProducts = [
  { name: "Qorii", price: 120, oldPrice: 160, discount: 40, image: "/gamepad.png" },
  { name: "Ak-900 Wired Keyboard", price: 96, oldPrice: 116, discount: 5, image: "/keyboard.png" },
  { name: "IPS LCD Monitor", price: 370, oldPrice: 400, discount: 10, image: "/monitor.png" },
  { name: "S-Series Comfort Chair", price: 375, oldPrice: 400, discount: 25, image: "/chair.png" },
];

export default function FlashSale() {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">🔥 Flash Sales</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {flashSaleProducts.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}
