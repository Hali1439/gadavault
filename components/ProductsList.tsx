// components/ProductsList.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadProducts } from "@/features/productsSlice"; 

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
