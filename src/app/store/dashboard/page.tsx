"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "@/app/shared/store/authStore";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Menu,
} from "lucide-react";
import AddProductModal from "../components/ui/AddProductButton";

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

// Interface for the form data coming from AddProductModal
export interface ProductFormData {
  productName: string;
  price: string;
  stockQuantity: string;
  description: string;
  productImageUrl: string;
}

// --- Mock Data ---

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

// --- Sub-Components ---

const NavItem: React.FC<
  NavItemProps & {
    activeTab: string;
    setActiveTab: (t: string) => void;
    setIsMobileMenuOpen: (o: boolean) => void;
  }
> = ({
  icon: Icon,
  label,
  tab,
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
}) => (
  <button
    onClick={() => {
      setActiveTab(tab);
      setIsMobileMenuOpen(false);
    }}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full ${
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

const DashboardContent = () => {
  const auth = useContext(AuthContext);
  const isLoading = auth?.isLoading;
  const user = auth?.user;

  if (user) {
    console.log("Current Auth User:", user.id);
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize products as empty array
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchStoreProducts = async () => {
      try {
        // 1. Extract token from local storage
        const token = localStorage.getItem("accessToken");

        if (!token) {
          throw new Error("No authentication token found in local storage.");
        }

        // 2. Make the HTTP GET request
        const response = await fetch(
          "https://oneminuteshop-be.onrender.com/api/products/store",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        
        // Set the products from the API response
        if (result && Array.isArray(result)) {
          setProducts(result);
        } else if (result && result.products && Array.isArray(result.products)) {
          setProducts(result.products);
        } else if (result && result.data && Array.isArray(result.data)) {
          setProducts(result.data);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreProducts();
  }, []);

  // View Components defined inside to access state
  const ProductsView = () => {
    const filteredProducts = products.filter((p) =>
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()),
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
          <p className="text-gray-600 mb-6 text-center max-w-sm">
            {error}
          </p>
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
                    ${product.price}
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
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
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
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.orderStatus} />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
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
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {user?.storeName || "My Store Portal"}
                </h1>
                {user && (
                  <span className="text-xs text-gray-500 font-normal">
                    Welcome, {user.ownerName || user.email}
                  </span>
                )}
              </div>
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
            <NavItem
              icon={BarChart3}
              label="Dashboard"
              tab="dashboard"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <NavItem
              icon={Package}
              label="Products"
              tab="products"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            <NavItem
              icon={ShoppingCart}
              label="Orders"
              tab="orders"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </nav>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[73px] bg-white z-30 p-4 shadow-lg">
            <nav className="space-y-2">
              <NavItem
                icon={BarChart3}
                label="Dashboard"
                tab="dashboard"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
              <NavItem
                icon={Package}
                label="Products"
                tab="products"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
              <NavItem
                icon={ShoppingCart}
                label="Orders"
                tab="orders"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
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
                  <p className="text-sm font-medium text-gray-500">
                    Total Sales
                  </p>
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
                    {products.filter(p => p.stockQuantity < 20).length}
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-full">
                  <BarChart3 className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div className="relative">
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
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === "products" && <ProductsView />}
              {activeTab === "orders" && <OrdersView />}
              {activeTab === "dashboard" && (
                <div className="text-center py-20 text-gray-500">
                  Dashboard charts and analytics coming soon...
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

// 2. Main component exported as wrapper
const StoreOwnerPortal = () => {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
};

export default StoreOwnerPortal;