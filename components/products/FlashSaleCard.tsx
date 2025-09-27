// components/products/FlashSaleCard.tsx
import Image from "next/image";
import { resolveMainImage, formatPrice } from "@/lib/productUtils";

export type FlashSaleProduct = {
  name: string;
  price: number | string;
  oldPrice?: number | string;
  discount?: number;
  // accept string path/url OR an object with image_url / images[] to be flexible
  image?: string | { image_url?: string } | { images?: { url?: string; alt?: string }[] };
};

interface FlashSaleCardProps {
  product: FlashSaleProduct;
}

export default function FlashSaleCard({ product }: FlashSaleCardProps) {
  const { url: imgUrl, alt: imgAlt } = resolveMainImage(product as any);

  return (
    <div className="bg-white rounded-xl shadow p-3 flex flex-col items-center text-center">
      <div className="w-full h-40 relative mb-3">
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-md"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{product.name}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-red-600">${formatPrice(product.price)}</span>
        {product.oldPrice !== undefined && (
          <span className="text-sm text-gray-400 line-through">${formatPrice(product.oldPrice)}</span>
        )}
      </div>
      {product.discount !== undefined && (
        <div className="text-xs text-green-700 mt-2 bg-green-50 px-2 py-1 rounded-full">
          {product.discount}% off
        </div>
      )}
    </div>
  );
}
