"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AddProductModal, {
  ProductFormData,
} from "../components/ui/AddProductButton";
import { AuthProvider } from "@/app/shared/store/authStore";
// import AuthProvider from "@/app/shared/store/authStore";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  tab: string;
};

type StatusBadgeProps = {
  status: string;
  type?: "order" | "payment";
};

type Product = {
  id: string;
  productName: string;
  price: number;

  stockQuantity: number;
  description: string;
  productImageUrl: string;
  createdAt: string;
};

type ProductCardProps = {
  product: Product;
  isExpanded: boolean;
  onToggle: () => void;
};

type Order = (typeof mockOrders)[number];
type OrderCardProps = {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
};

// Mock data
const mockOrders = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "John Doe",
    totalAmount: 159.98,
    orderStatus: "DELIVERED",
    paymentStatus: "PAID",
    createdAt: "2024-01-20",
    items: 2,
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Jane Smith",
    totalAmount: 79.99,
    orderStatus: "SHIPPED",
    paymentStatus: "PAID",
    createdAt: "2024-01-21",
    items: 1,
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerName: "Bob Johnson",
    totalAmount: 234.97,
    orderStatus: "PROCESSING",
    paymentStatus: "PAID",
    createdAt: "2024-01-22",
    items: 3,
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customerName: "Alice Brown",
    totalAmount: 49.99,
    orderStatus: "PENDING",
    paymentStatus: "PENDING",
    createdAt: "2024-01-23",
    items: 1,
  },
];

const StoreOwnerPortal = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      productName: "Wireless Headphones",
      price: 79.99,
      stockQuantity: 45,
      description: "Premium noise-canceling headphones",
      productImageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      productName: "Smart Watch",
      price: 199.99,
      stockQuantity: 12,
      description: "Fitness tracker with heart rate monitor",
      productImageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      createdAt: "2024-01-14",
    },
    {
      id: "3",
      productName: "Laptop Stand",
      price: 34.99,
      stockQuantity: 0,
      description: "Ergonomic aluminum laptop stand",
      productImageUrl:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
      createdAt: "2024-01-10",
    },
    {
      id: "4",
      productName: "USB-C Hub",
      price: 49.99,
      stockQuantity: 67,
      description: "7-in-1 multiport adapter",
      productImageUrl:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=100&h=100&fit=crop",
      createdAt: "2024-01-08",
    },
  ]);

  const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, tab }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeTab === tab
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    type = "order",
  }) => {
    const getStatusColor = () => {
      if (type === "order") {
        switch (status) {
          case "DELIVERED":
            return "bg-green-100 text-green-800";
          case "SHIPPED":
            return "bg-blue-100 text-blue-800";
          case "PROCESSING":
            return "bg-yellow-100 text-yellow-800";
          case "PENDING":
            return "bg-orange-100 text-orange-800";
          case "CANCELLED":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      } else {
        switch (status) {
          case "PAID":
            return "bg-green-100 text-green-800";
          case "PENDING":
            return "bg-yellow-100 text-yellow-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
      >
        {status}
      </span>
    );
  };

  const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isExpanded,
    onToggle,
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
            <p className="text-sm text-gray-600">${product.price}</p>
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
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
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

  const OrderCard: React.FC<OrderCardProps> = ({
    order,
    isExpanded,
    onToggle,
  }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
          <p className="text-sm text-gray-600">{order.customerName}</p>
        </div>
        <div className="text-right mr-2">
          <p className="font-semibold text-gray-900">${order.totalAmount}</p>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Order Status:</span>
              <div className="mt-1">
                <StatusBadge status={order.orderStatus} type="order" />
              </div>
            </div>
            <div>
              <span className="text-gray-600">Payment:</span>
              <div className="mt-1">
                <StatusBadge status={order.paymentStatus} type="payment" />
              </div>
            </div>
            <div>
              <span className="text-gray-600">Items:</span>
              <p className="font-semibold text-gray-900">{order.items}</p>
            </div>
            <div>
              <span className="text-gray-600">Date:</span>
              <p className="font-semibold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
              <Eye size={16} /> View Details
            </button>
            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              <Edit size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const ProductsView = () => {
    const filteredProducts = products.filter((p) =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()),
    );

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
            onClick={() => setIsAddProductModalOpen(true)}
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
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.productImageUrl}
                          alt={product.productName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {product.productName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${product.stockQuantity === 0 ? "text-red-600" : "text-gray-900"}`}
                      >
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
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
              />
            ))}
          </div>
        </div>
    );
  };

  const OrdersView = () => {
    const filteredOrders = mockOrders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      <div className="space-y-4">
        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.orderStatus} type="order" />
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.paymentStatus} type="payment" />
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit size={18} />
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
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={expandedRow === order.id}
              onToggle={() =>
                setExpandedRow(expandedRow === order.id ? null : order.id)
              }
            />
          ))}
        </div>
      </div>
    );
  };

  const handleAddProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: String(products.length + 1),
      productName: formData.productName,
      price: parseFloat(formData.price),
      stockQuantity: parseInt(formData.stockQuantity),
      description: formData.description,
      productImageUrl: formData.productImageUrl,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProducts([newProduct, ...products]);
  };

  return (
    <AuthProvider>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                My Store Portal
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            <NavItem icon={BarChart3} label="Dashboard" tab="dashboard" />
            <NavItem icon={Package} label="Products" tab="products" />
            <NavItem icon={ShoppingCart} label="Orders" tab="orders" />
          </nav>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[73px] bg-white z-30 p-4">
            <nav className="space-y-2">
              <NavItem icon={BarChart3} label="Dashboard" tab="dashboard" />
              <NavItem icon={Package} label="Products" tab="products" />
              <NavItem icon={ShoppingCart} label="Orders" tab="orders" />
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {products.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingCart className="text-green-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    $12,450
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ShoppingCart className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {activeTab === "products"
                    ? "Products"
                    : activeTab === "orders"
                      ? "Orders"
                      : "Dashboard"}
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {activeTab === "products" && (
                    <button
                      onClick={() => setIsAddProductModalOpen(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={20} />
                      <span>Add Product</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === "products" && <ProductsView />}
              {activeTab === "orders" && <OrdersView />}
              {activeTab === "dashboard" && (
                <div className="text-center py-12">
                  <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Dashboard Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    Analytics and insights will be displayed here
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Import and use the AddProductModal component */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
    </AuthProvider>
  );
};

export default StoreOwnerPortal;
