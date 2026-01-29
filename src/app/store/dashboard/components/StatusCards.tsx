import React from "react";
import { BarChart3, Package, ShoppingCart } from "lucide-react";
import { Product } from "./Types";


interface StatsCardsProps {
  products: Product[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ products }) => {
  const lowStockCount = products.filter((p) => p.stockQuantity < 20).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">$12,456</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <BarChart3 className="text-blue-600" size={24} />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Orders</p>
            <p className="text-2xl font-bold text-gray-900">456</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <ShoppingCart className="text-green-600" size={24} />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Products</p>
            <p className="text-2xl font-bold text-gray-900">
              {products.length}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Package className="text-purple-600" size={24} />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Low Stock</p>
            <p className="text-2xl font-bold text-orange-600">
              {lowStockCount}
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded-full">
            <BarChart3 className="text-orange-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;