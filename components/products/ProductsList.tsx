import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products?: Product[] | null; // allow undefined/null too
}

export default function ProductsList({ products }: ProductsListProps) {
  // Guard: if products is missing or not an array
  if (!Array.isArray(products)) {
    return <p className="text-red-500">⚠️ Invalid products data.</p>;
  }

  if (products.length === 0) {
    return <p className="text-gray-500">No products found.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
