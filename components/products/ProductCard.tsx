import { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].alt || product.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {product.description}
        </p>
        <p className="text-xl font-bold text-indigo-600 mt-3">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
