import { Product } from "../../lib/data";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productName: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const handleAddToCart = () => {
    onAddToCart(product.name);
  };

  // Use image_url from database or fallback to a placeholder
  const imageUrl = product.image_url || "/placeholder-product.svg";

  // Extract category from name if available, otherwise use a default
  const category =
    product.category || product.name.split(" - ")[0] || "Product";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to placeholder icon if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              `;
            }
          }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Stock status and quantity */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  product.quantity > 10
                    ? "bg-green-500"
                    : product.quantity > 5
                    ? "bg-yellow-500"
                    : product.quantity > 0
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {product.quantity > 0
                  ? `${product.quantity} in stock`
                  : "Out of stock"}
              </span>
            </div>
            {product.quantity <= 5 && product.quantity > 0 && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                Low stock
              </span>
            )}
          </div>

          {/* Stock level indicator bar */}
          {product.quantity > 0 && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    product.quantity > 10
                      ? "bg-green-500"
                      : product.quantity > 5
                      ? "bg-yellow-500"
                      : "bg-orange-500"
                  }`}
                  style={{
                    width: `${Math.min((product.quantity / 20) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            $
            {typeof product.price === "number"
              ? product.price.toFixed(2)
              : product.price}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transform transition-all duration-200 shadow-md ${
              product.quantity === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg"
            }`}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
            {product.quantity > 0 && (
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 8h16M7 13l-2-8m10 8v8m0-8h4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
