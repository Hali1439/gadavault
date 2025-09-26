import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductBySlug } from "@/features/products/productsSlice";
import Head from "next/head";
import Image from "next/image";

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (slug && typeof slug === "string") {
      dispatch(fetchProductBySlug(slug));
    }
  }, [dispatch, slug]);

  return (
    <>
      <Head>
        <title>
          {selectedProduct
            ? `GadaVault | ${selectedProduct.name}`
            : "GadaVault | Product"}
        </title>
        <meta
          name="description"
          content={
            selectedProduct
              ? selectedProduct.description
              : "African fashion product"
          }
        />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading && (
            <p className="text-gray-600 animate-pulse">Loading product...</p>
          )}
          {error && <p className="text-red-500">{error}</p>}

          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="flex justify-center relative w-full h-[500px]">
                <Image
                  src={selectedProduct.images[0]?.url || "/default-product.png"}
                  alt={selectedProduct.images[0]?.alt || selectedProduct.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-2xl shadow-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedProduct.name}
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  {selectedProduct.description}
                </p>
                <p className="text-2xl font-semibold text-green-700 mb-6">
                  ${selectedProduct.price.toFixed(2)}
                </p>

                <button
                  onClick={() =>
                    dispatch({
                      type: "cart/addToCart",
                      payload: { product: selectedProduct, quantity: 1 },
                    })
                  }
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
