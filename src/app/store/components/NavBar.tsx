"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, Heart } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const BackendUrl = process.env.NEXT_PUBLIC_API_URL

export default function Navbar() {
  const params = useParams();
  const router = useRouter();
  
  // 'subdomain' is extracted from your dynamic route [subdomain]
  const subdomain = params.subdomain as string;

  const [storeName, setStoreName] = useState<string>("Loading...");
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch store data from your backend
  useEffect(() => {
    const fetchStoreData = async () => {
      if (!subdomain) return;

      try {
        const response = await fetch(`${BackendUrl}/stores/check-subdomain`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subDomain: subdomain }),
        });

        const result = await response.json();

        if (response.ok && result.data) {
          setStoreName(result.data.storeName);
        } else {
          setStoreName("Store Not Found");
        }
      } catch (error) {
        console.error("Failed to fetch store data:", error);
        setStoreName("Shop"); // Fallback name
      }
    };

    fetchStoreData();
  }, [subdomain]);

  // Navigation handlers using router.push for better SPA performance
  const handleAboutClick = () => router.push("/aboutUs");
  const handleContactClick = () => router.push("/contactUs");
  const handleShopClick = () => router.push("/");

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Store Name */}
          <div className="shrink-0">
            <button
              onClick={handleShopClick}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {storeName}
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <button onClick={handleShopClick} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Shop
            </button>
            <button onClick={handleAboutClick} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              About
            </button>
            <button onClick={handleContactClick} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 ml-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t pt-2">
            <button
              onClick={() => { handleShopClick(); closeMenu(); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded"
            >
              Shop
            </button>
            <button
              onClick={() => { handleAboutClick(); closeMenu(); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded"
            >
              About
            </button>
            <button
              onClick={() => { handleContactClick(); closeMenu(); }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}