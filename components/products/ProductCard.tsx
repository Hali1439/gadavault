// components/products/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';
import Button from '@/components/common/Button';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(addToCart({ product, quantity: 1 })); // 👈 FIXED
  dispatch(
    showNotification({
      message: `${product.name} added to cart`,
      type: "success",
    })
  );
};


  const mainImage = product.images?.[0]?.url || '/placeholder-product.jpg';
  const displayPrice = product.salePrice || product.price;
  const hasSale = product.salePrice && product.salePrice < product.price;

  return (
    <div className={className}>
      <Link href={`/products/${product.slug}`}>
        <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            
            {/* Sale Badge */}
            {hasSale && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Sale
              </div>
            )}

            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>

            {/* Add to Cart Overlay */}
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

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                {product.name}
              </h3>
              <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                <Heart className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">(24)</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  ${displayPrice}
                </span>
                {hasSale && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              
              {product.stock > 0 ? (
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