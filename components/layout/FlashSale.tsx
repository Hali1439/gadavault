import FlashSaleCard, { FlashSaleProduct } from "@/components/products/FlashSaleCard";

const flashSaleProducts: FlashSaleProduct[] = [
  { name: "Qorii", price: 120, oldPrice: 160, discount: 40, image: "/qorii.png" },
  { name: "Madiba Shirt", price: 96, oldPrice: 116, discount: 5, image: "/Madiba Shirt (South Africa).png" },
  { name: "Zulu Shield and Spear", price: 370, oldPrice: 400, discount: 10, image: "/Zulu shield and spear.png" },
  { name: "Liputa (DRC)", price: 375, oldPrice: 400, discount: 25, image: "/Liputa (DRC).png" },
];

export default function FlashSale() {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">🔥 Flash Sales</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {flashSaleProducts.map((p, i) => (
          <FlashSaleCard key={i} product={p} />
        ))}
      </div>
    </section>
  );
}
