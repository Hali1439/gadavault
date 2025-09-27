// components/layout/FlashSale.tsx
import FlashSaleCard, { FlashSaleProduct } from "@/components/products/FlashSaleCard";

const flashSaleProducts: FlashSaleProduct[] = [
  {
    name: "Qorii",
    price: 120,
    oldPrice: 160,
    discount: 40,
    image: "https://res.cloudinary.com/dxmxjdval/image/upload/v1757544835/qori_poll60.png",
  },
  {
    name: "Madiba Shirt",
    price: 96,
    oldPrice: 116,
    discount: 5,
    image: "https://res.cloudinary.com/dxmxjdval/image/upload/v1757630241/Madiba_Shirt_xph6qn.jpg",
  },
  {
    name: "Zulu Shield and Spear",
    price: 370,
    oldPrice: 400,
    discount: 10,
    image: "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897228/Zulu_shield_and_spear_kdoufo.jpg",
  },
  {
    name: "Liputa (DRC)",
    price: 375,
    oldPrice: 400,
    discount: 25,
    image: "https://res.cloudinary.com/dxmxjdval/image/upload/v1757897077/Liputa_DRC_tbj1un.jpg",
  },
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
