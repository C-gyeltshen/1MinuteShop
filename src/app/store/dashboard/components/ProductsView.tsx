import React from "react";
import { Edit, Trash2, Package, Search, Plus } from "lucide-react";

import ProductCard from "./ProductCard";
import { Product } from "./Types";

interface ProductsViewProps {
  products: Product[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  expandedRow: string | null;
  setExpandedRow: (id: string | null) => void;
  onEdit: (product: Product) => void;
  onAddProduct: () => void;
}

const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  searchQuery,
  loading,
  error,
  expandedRow,
  setExpandedRow,
  onEdit,
  onAddProduct,
}) => {
  const filteredProducts = products.filter((p) =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show loading state while fetching products
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">Loading products...</p>
      </div>
    );
  }

  // Show error state if there was an error fetching products
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-red-100 rounded-full mb-4">
          <Package className="text-red-600" size={48} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Error Loading Products
        </h3>
        <p className="text-gray-600 mb-6 text-center max-w-sm">{error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0 && searchQuery === "") {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <Package className="text-gray-400" size={48} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Products Yet
        </h3>
        <p className="text-gray-600 mb-6 text-center max-w-sm">
          Start building your product catalog by adding your first product
        </p>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Your First Product
        </button>
      </div>
    );
  }

  if (filteredProducts.length === 0 && searchQuery !== "") {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <Search className="text-gray-400" size={48} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600">
          No products match your search "{searchQuery}"
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.productImageUrl}
                      alt={product.productName}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.productName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Added{" "}
                        {new Date(product.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Nu.{product.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stockQuantity > 20
                        ? "bg-green-100 text-green-800"
                        : product.stockQuantity > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stockQuantity} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isExpanded={expandedRow === product.id}
            onToggle={() =>
              setExpandedRow(expandedRow === product.id ? null : product.id)
            }
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsView;