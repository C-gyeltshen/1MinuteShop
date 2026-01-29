import React from "react";
import { ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import { Product } from "./Types";

interface ProductCardProps {
  product: Product;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isExpanded,
  onToggle,
  onEdit,
}) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
    <div
      className="p-4 flex items-center justify-between cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 flex-1">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="w-12 h-12 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {product.productName}
          </h3>
          <p className="text-sm text-gray-600">Nu.{product.price}</p>
        </div>
      </div>
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>

    {isExpanded && (
      <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Stock:</span>
            <p
              className={`font-semibold ${product.stockQuantity === 0 ? "text-red-600" : "text-gray-900"}`}
            >
              {product.stockQuantity} units
            </p>
          </div>
        </div>
        <div>
          <span className="text-gray-600 text-sm">Description:</span>
          <p className="text-sm text-gray-900 mt-1">{product.description}</p>
        </div>
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Edit size={16} /> Edit
          </button>
          <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    )}
  </div>
);

export default ProductCard;