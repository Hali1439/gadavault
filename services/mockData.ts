import { Product, ProductCategory, FlashSaleProduct } from '@/types/product';

export const mockCategories: ProductCategory[] = [
  { id: '1', name: 'Clothing', slug: 'clothing', description: 'Traditional African clothing' },
  { id: '2', name: 'Accessories', slug: 'accessories', description: 'Cultural accessories' },
  { id: '3', name: 'Art', slug: 'art', description: 'African art and crafts' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Qorii Traditional Dress',
    slug: 'qorii-traditional-dress',
    description: 'Beautiful traditional dress with authentic patterns',
    price: 120,
    regularPrice: 160,
    currency: 'USD',
    stock: 15,
    published: true,
    category: mockCategories[0],
    images: [
      { url: '/qorii.png', alt: 'Qorii Traditional Dress', order: 1 }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  // Add more mock products...
];

export const mockFlashSaleProducts: FlashSaleProduct[] = mockProducts.map(product => ({
  ...product,
  discount: 25,
  saleEnds: '2024-12-31T23:59:59Z',
}));