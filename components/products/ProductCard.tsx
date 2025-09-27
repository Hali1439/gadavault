// components/products/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/features/cart/cartSlice";
import { showNotification } from "@/features/ui/uiSlice";
import Button from "@/components/common/Button";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const formatNumber = (v: number | string | undefined, fallback = 0) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const formatPriceStr = (v: number | string | undefined) =>
  formatNumber(v).toFixed(2);

/** Resolve a usable image URL from multiple possible shapes */
const resolveMainImage = (product: Product) => {
  // 1) images array expected shape: [{ url, alt }]
  const imgArr = (product as any).images;
  if (Array.isArray(imgArr) && imgArr.length > 0 && imgArr[0]?.url) {
    return { url: imgArr[0].url as string, alt: imgArr[0]?.alt || product.name };
  }

  // 2) legacy single `image_url`
  if ((product as any).image_url) {
    return { url: (product as any).image_url as string, alt: product.name };
  }

  // 3) public folder placeholder
  return { url: "/placeholder.jpg", alt: product.name };
};

const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    // prevent Link navigation when clicking the button overlay
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(
      showNotification({
        message: `${product.name} added to cart`,
        type: "success",
      })
    );
  };

  const { url: mainImage, alt: mainAlt } = resolveMainImage(product);
  const price = formatNumber((product as any).price);
  const salePrice = (product as any).salePrice
    ? formatNumber((product as any).salePrice)
    : undefined;
  const displayPrice = salePrice && salePrice < price ? salePrice : price;
  const hasSale = salePrice !== undefined && salePrice < price;
  const stock = Number.isFinite(Number((product as any).stock))
    ? Number((product as any).stock)
    : 0;

  return (
    <div className={className}>
      <Link href={`/products/${product.slug ?? product.id}`} className="group block">
        <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={mainImage}
                alt={mainAlt || product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {hasSale && (
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Sale
                </div>
              )}

              {/* Wishlist button */}
              <button
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // keep as no-op for now, or wire to wishlist
                }}
              >
                <Heart className="w-4 h-4 text-gray-600" />
              </button>

              {/* Add to Cart overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddToCart}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-200"
                >
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                  {product.name}
                </h3>
                <button
                  aria-label="quick-favorite"
                  className="ml-2 p-1 hover:bg-gray-100 rounded"
                >
                  <Heart className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>

              {/* Rating (static) */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">(24)</span>
              </div>

              {/* Price & Stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${formatPriceStr(displayPrice)}
                  </span>
                  {hasSale && (
                    <span className="text-sm text-gray-500 line-through">
                      ${formatPriceStr(price)}
                    </span>
                  )}
                </div>

                {stock > 0 ? (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>
      </Link>
    </div>
  );
};

export default ProductCard;
