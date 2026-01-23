"use client";

import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              Discover Your Next
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Favorite Product
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-8">
              Curated collection of premium products handpicked for quality and
              style.
            </p>
            <button className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl">
              Shop Now →
            </button>
          </div>
          <div className="hidden md:block">
            <div className="w-full h-80 lg:h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center text-5xl lg:text-6xl">
              📦
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  const badges = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
    { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
    { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: Star, title: "Quality Guaranteed", desc: "Premium products only" },
  ];

  return (
    <section className="py-6 sm:py-8 md:py-12 bg-gray-50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-2xl sm:text-3xl text-blue-600 mb-2 sm:mb-3">
                <badge.icon />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Section
function ProductsSection() {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      rating: 4.8,
      reviews: 328,
      image: "🎧",
      badge: "Popular",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 199,
      rating: 4.7,
      reviews: 245,
      image: "⌚",
      badge: "New",
    },
    {
      id: 3,
      name: "USB-C Hub Elite",
      price: 79,
      rating: 4.6,
      reviews: 156,
      image: "🔌",
      badge: null,
    },
    {
      id: 4,
      name: "Phone Case Armor",
      price: 49,
      rating: 4.9,
      reviews: 412,
      image: "📱",
      badge: "Best Seller",
    },
    {
      id: 5,
      name: "Premium Wireless Headphones",
      price: 299,
      rating: 4.8,
      reviews: 328,
      image: "🎧",
      badge: "Popular",
    },
    {
      id: 6,
      name: "Smart Watch Pro",
      price: 199,
      rating: 4.7,
      reviews: 245,
      image: "⌚",
      badge: "New",
    },
    {
      id: 7,
      name: "USB-C Hub Elite",
      price: 79,
      rating: 4.6,
      reviews: 156,
      image: "🔌",
      badge: null,
    },
    {
      id: 8,
      name: "Phone Case Armor",
      price: 49,
      rating: 4.9,
      reviews: 412,
      image: "📱",
      badge: "Best Seller",
    },
    {
      id: 9,
      name: "Premium Wireless Headphones",
      price: 299,
      rating: 4.8,
      reviews: 328,
      image: "🎧",
      badge: "Popular",
    },
    {
      id: 10,
      name: "Smart Watch Pro",
      price: 199,
      rating: 4.7,
      reviews: 245,
      image: "⌚",
      badge: "New",
    },
    {
      id: 11,
      name: "USB-C Hub Elite",
      price: 79,
      rating: 4.6,
      reviews: 156,
      image: "🔌",
      badge: null,
    },
    {
      id: 12,
      name: "Phone Case Armor",
      price: 49,
      rating: 4.9,
      reviews: 412,
      image: "📱",
      badge: "Best Seller",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Discover our best-selling items
            </p>
          </div>
          <button className="text-blue-600 text-sm sm:text-base font-semibold hover:text-blue-700">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-4xl sm:text-5xl md:text-6xl group-hover:scale-110 transition-transform">
                  {product.image}
                </span>
                {product.badge && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
                <button className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 mb-1.5 sm:mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center mb-2 sm:mb-3 gap-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-xs text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <button className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function LiveStore() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <Hero />
      <TrustBadges />
      <ProductsSection />
      <Footer />
    </div>
  );
}
