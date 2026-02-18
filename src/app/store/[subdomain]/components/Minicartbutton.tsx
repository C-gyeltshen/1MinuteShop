"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/Cartcontext ";

export default function MiniCartButton() {
  const { cartCount, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-30 p-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
    >
      <ShoppingCart className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-6` h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-2 font-bold">
          {cartCount}
        </span>
      )}
    </button>
  );
}