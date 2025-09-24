"use client";

import { useState, useEffect } from "react";
import ProductGrid from "./product-grid";

interface ProductsSectionProps {
  onAddToCartAction: (productName: string) => void;
}

// Function to extract subdomain from URL
function getSubdomainFromHost(): string | null {
  if (typeof window === "undefined") return null;

  const hostname = window.location.hostname;
  const parts = hostname.split(".");

  // For development with custom hosts (e.g., shop1.localhost)
  if (parts.length >= 2 && parts[parts.length - 1] === "localhost") {
    const subdomain = parts[0];
    return subdomain === "localhost" ? null : subdomain;
  }

  // For laso.la domain (e.g., shop1.laso.la)
  if (
    parts.length >= 3 &&
    parts[parts.length - 2] === "laso" &&
    parts[parts.length - 1] === "la"
  ) {
    const subdomain = parts[0];
    return subdomain === "www" ? null : subdomain;
  }

  // For production domains (e.g., shop1.example.com)
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}

export default function ProductsSection({
  onAddToCartAction,
}: ProductsSectionProps) {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    // Get subdomain on client side
    setSubdomain(getSubdomainFromHost());
  }, []);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated collection of premium products,
            designed to enhance your daily life with style and functionality.
          </p>
        </div>

        {/* Products grid with SWR data fetching */}
        <ProductGrid
          subdomain={subdomain}
          onAddToCartAction={onAddToCartAction}
        />

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-sm">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Free shipping on orders over $100
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
