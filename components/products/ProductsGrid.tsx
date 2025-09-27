// components/products/ProductsGrid.tsx
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  className?: string;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products = [], className = "" }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id ?? product.slug} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
