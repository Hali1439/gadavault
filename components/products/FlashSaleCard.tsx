import Image from "next/image";

export interface FlashSaleProduct {
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

interface FlashSaleCardProps {
  product: FlashSaleProduct;
}

export default function FlashSaleCard({ product }: FlashSaleCardProps) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-red-600 font-bold">${product.price}</p>
        <p className="line-through text-gray-500">${product.oldPrice}</p>
        <span className="text-sm text-green-600">{product.discount}% OFF</span>
      </div>
    </div>
  );
}
