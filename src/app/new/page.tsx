"use client";

import React, { useState, useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "@/app/shared/store/authStore";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Menu,
  X,
  ChevronRight,
  Star,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Package,
  Sparkles,
} from "lucide-react";

// Types matching your Product structure
type Product = {
  id: string;
  productName: string;
  price: number;
  stockQuantity: number;
  description: string;
  productImageUrl: string;
  createdAt: string;
};

type StoreData = {
  storeName: string;
  ownerName: string;
  products: Product[];
  logoUrl?: string;
  tagline?: string;
  primaryColor?: string;
};

// Sample products for initial preview (if store has no products yet)
const sampleProducts: Product[] = [
  {
    id: "sample-1",
    productName: "Premium Wireless Headphones",
    price: 199.99,
    stockQuantity: 50,
    description: "High-fidelity sound with active noise cancellation",
    productImageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    productName: "Smart Fitness Watch",
    price: 299.99,
    stockQuantity: 30,
    description: "Track your health and fitness goals in style",
    productImageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-3",
    productName: "Minimalist Backpack",
    price: 89.99,
    stockQuantity: 75,
    description: "Sleek design meets functionality",
    productImageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-4",
    productName: "Ergonomic Desk Setup",
    price: 449.99,
    stockQuantity: 20,
    description: "Transform your workspace with premium ergonomics",
    productImageUrl:
      "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=600&h=600&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-5",
    productName: "Artisan Coffee Set",
    price: 129.99,
    stockQuantity: 40,
    description: "Elevate your morning ritual",
    productImageUrl:
      "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=600&h=600&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-6",
    productName: "Premium Leather Wallet",
    price: 79.99,
    stockQuantity: 60,
    description: "Handcrafted with Italian leather",
    productImageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop",
    createdAt: new Date().toISOString(),
  },
];

// Product Card Component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              Out of Stock
            </span>
          </div>
        )}
        <button
          className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <Heart size={20} className="text-gray-700" />
        </button>
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="w-full py-2 px-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Quick View
          </button>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900 line-clamp-2">
          {product.productName}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Onboarding Overlay Component
const OnboardingOverlay: React.FC<{
  onDashboard: () => void;
  onCustomize: () => void;
  onDismiss: () => void;
}> = ({ onDashboard, onCustomize, onDismiss }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  🎉 Your store is live!
                </h3>
                <p className="text-sm text-white/90">
                  This is how your customers see it. Ready to customize?
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onCustomize}
                className="hidden sm:block px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Customize Theme
              </button>
              <button
                onClick={onDashboard}
                className="px-6 py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight size={18} />
              </button>
              <button
                onClick={onDismiss}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Storefront Component
const StorefrontPreviewContent: React.FC = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch actual store products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await fetch(
            "https://oneminuteshop-be.onrender.com/api/products/store",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStoreProducts(data.products || []);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Use actual products if available, otherwise use samples
  const displayProducts =
    storeProducts.length > 0 ? storeProducts : sampleProducts;
  const storeName = user?.storeName || "My Store";

  const handleDashboard = () => {
    window.location.href = "/dashboard"; // Adjust to your dashboard route
  };

  const handleCustomize = () => {
    window.location.href = "/dashboard?tab=settings"; // Adjust to your settings route
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading your store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {storeName}
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Collections
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={20} className="text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User size={20} className="text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag size={20} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X size={20} className="text-gray-700" />
                ) : (
                  <Menu size={20} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-3">
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  Shop
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  Collections
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Handpicked selection of premium products designed to elevate your
              everyday life
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-lg">
                Shop Now
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                View Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 grid grid-cols-3 gap-6 border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {displayProducts.length}+
            </div>
            <div className="text-sm text-gray-600">Products</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-1">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">1k+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Explore our carefully curated collection
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 px-6 py-3 text-gray-900 hover:text-gray-700 font-medium transition-colors group">
              View All
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {storeProducts.length === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <Package className="text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Sample Products Display
                  </h3>
                  <p className="text-sm text-blue-700">
                    You haven't added products yet. These are sample products to
                    show how your store will look. Add your own products from
                    the dashboard!
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <button className="w-full px-6 py-3 text-gray-900 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white">{storeName}</span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Your trusted destination for quality products and exceptional
                service.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sale
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 {storeName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Onboarding Overlay */}
      {showOnboarding && (
        <OnboardingOverlay
          onDashboard={handleDashboard}
          onCustomize={handleCustomize}
          onDismiss={() => setShowOnboarding(false)}
        />
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

// Main export with AuthProvider wrapper
const StorefrontPreview: React.FC = () => {
  return (
    <AuthProvider>
      <StorefrontPreviewContent />
    </AuthProvider>
  );
};

export default StorefrontPreview;