import React from "react";
import { Search, Plus } from "lucide-react";

interface ContentSectionProps {
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddProduct: () => void;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  onAddProduct,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {activeTab === "products" && (
              <button
                onClick={onAddProduct}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <Plus size={20} />
                Add Product
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default ContentSection;