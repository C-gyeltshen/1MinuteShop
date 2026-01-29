import { Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

interface Product {
  id: string | number;
  productImageUrl: string;
  productName: string;
  description: string;
  stockQuantity: number;
  price: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const hostname = globalThis.location.hostname;
        const parts = hostname.split(".");
        const subdomain = parts[0];

        const response = await fetch(
          `${BACKEND_URL}/products/subdomain/${subdomain}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const responseData = await response.json();
        
        // Extract products from { success, data, total } response
        const productList = responseData.data || [];
        
        if (!Array.isArray(productList)) {
          throw new TypeError("Invalid product data format");
        }
        
        setProducts(productList);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">No products found</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Discover our best-selling items
            </p>
          </div>
          <button className="text-blue-600 text-sm sm:text-base font-semibold hover:text-blue-700">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all flex flex-col"
            >
              <div className="relative h-32 sm:h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                {product.stockQuantity < 30 && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    Low Stock
                  </div>
                )}
                <button className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 mb-1 sm:mb-1.5 line-clamp-2">
                  {product.productName}
                </h3>

                <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="mb-2 sm:mb-3">
                  <span className="text-xs text-gray-500">
                    {product.stockQuantity} in stock
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3 sm:pt-4 border-t border-gray-200">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    Nu.{product.price}
                  </span>
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}