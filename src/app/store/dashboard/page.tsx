"use client";
import React, { useContext, useState } from "react";
import { AuthContext, AuthProvider } from "@/app/shared/store/authStore";
import AddProductModal from "./components/AddProductButton";
import EditProductModal from "./components/ui/EditProductModal";
import DashboardHeader from "./components/DashboardHeader";
import ContentSection from "./components/ContentSection";
import OrdersView from "./components/OrdersView";
import ProductsView from "./components/ProductsView";
import StatsCards from "./components/StatusCards";
import Sidebar from "./components/SideBar";
import { useProducts } from "./hooks/UseProducts";
import { Product } from "./components/Types";
import { mockOrders } from "./data/MockData";

const DashboardContent = () => {
  const auth = useContext(AuthContext);
  const isLoading = auth?.isLoading;
  const user = auth?.user;

  // State management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Custom hook for products
  const { products, loading, error, addProduct, editProduct } = useProducts();


  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductModalOpen(true);
  };

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        storeName={user?.storeName}
        ownerName={user?.ownerName}
        email={user?.email}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-18.25 bg-white z-30 p-4 shadow-lg">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <StatsCards products={products} />

          {/* Content Section */}
          <ContentSection
            activeTab={activeTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddProduct={() => setIsAddProductModalOpen(true)}
          >
            {activeTab === "products" && (
              <ProductsView
                products={products}
                searchQuery={searchQuery}
                loading={loading}
                error={error}
                expandedRow={expandedRow}
                setExpandedRow={setExpandedRow}
                onEdit={openEditModal}
                onAddProduct={() => setIsAddProductModalOpen(true)}
              />
            )}
            {activeTab === "orders" && (
              <OrdersView
                orders={mockOrders}
                searchQuery={searchQuery}
                expandedRow={expandedRow}
                setExpandedRow={setExpandedRow}
              />
            )}
            {activeTab === "dashboard" && (
              <div className="text-center py-20 text-gray-500">
                Dashboard charts and analytics coming soon...
              </div>
            )}
          </ContentSection>
        </main>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={addProduct}
      />

      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={() => {
          setIsEditProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={editProduct}
        product={selectedProduct}
      />
    </div>
  );
};

// Main component exported as wrapper
const StoreOwnerPortal = () => {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
};

export default StoreOwnerPortal;
