// components/layout/FlashSale.tsx
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { Product } from '@/types/product';

interface FlashSaleProps {
  products: Product[];
  saleEndsAt: string; // ISO timestamp
}

const FlashSale: React.FC<FlashSaleProps> = ({ products, saleEndsAt }) => {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const diff = new Date(saleEndsAt).getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });
 
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1000;
        return next > 0 ? next : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  if (products.length === 0) {
    return null; // or a placeholder / skeleton
  }

  return (
    <section aria-label="Flash Sale" className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Timer */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Flash Sale</h3>
          <div className="text-lg font-mono text-red-600">
            {timeLeft > 0 ? (
              <span>Ends in: {formatTime(timeLeft)}</span>
            ) : (
              <span className="text-gray-500">Sale ended</span>
            )}
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={product.href || '#'} passHref>
              <a className="block group bg-white rounded-lg shadow hover:shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl || '/placeholder.jpg'}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                    {product.name}
                  </h4>
                  <div className="mt-2">
                    <span className="text-red-600 font-bold">${product.salePrice?.toFixed(2) || '0.00'}</span>{' '}
                    <span className="text-gray-500 line-through">${product.regularPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FlashSale);
