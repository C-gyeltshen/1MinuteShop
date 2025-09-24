"use client";

import useSWR from "swr";
import ProductCard from "./product-cart";
import { Product } from "../../lib/data";

interface ProductGridProps {
  subdomain: string | null;
  onAddToCartAction: (productName: string) => void;
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return Array.isArray(data) ? data : [];
    });

// Skeleton component for loading state
const ProductSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-10 w-28 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="col-span-full text-center py-20">
    <div className="mx-auto w-24 h-24 mb-6">
      <svg
        className="w-full h-full text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No Products Available
    </h3>
    <p className="text-gray-600 max-w-md mx-auto">
      We're currently updating our inventory. Please check back later for
      amazing products!
    </p>
  </div>
);

export default function ProductGrid({
  subdomain,
  onAddToCartAction,
}: ProductGridProps) {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR<Product[]>(
    subdomain ? `/api/stores/${subdomain}/products` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1 minute
    }
  );

  // Filter only active products (quantity > 0 as proxy for active)
  const activeProducts =
    products?.filter((product) => product.quantity > 0) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="col-span-full text-center py-20">
        <div className="mx-auto w-24 h-24 mb-6">
          <svg
            className="w-full h-full text-red-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Unable to Load Products
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We're having trouble loading the products. Please try refreshing the
          page.
        </p>
      </div>
    );
  }

  // Empty state
  if (!activeProducts.length) {
    return <EmptyState />;
  }

  // Success state with products
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {activeProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCartAction}
        />
      ))}
    </div>
  );
}
