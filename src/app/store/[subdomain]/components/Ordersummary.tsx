"use client";

import { ShoppingBag, Tag } from "lucide-react";
import { useCart } from "../context/Cartcontext ";

export default function OrderSummary() {
  const { cartItems, getTotalPrice } = useCart();

  const subtotal: number = getTotalPrice();
  const shipping: number = 0; // Free shipping or calculate based on location
  const tax: number = 0; // Calculate tax if needed
  const total: number = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={item.productImageUrl}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                {item.productName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  Nu.{(Number.parseFloat(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />

      {/* Pricing Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            Nu.{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">
            {shipping === 0 ? "FREE" : `Nu.${shipping.toFixed(2)}`}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">
              Nu.{tax.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6" />

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-gray-900">
          Nu.{total.toFixed(2)}
        </span>
      </div>

      {/* Promo Code Section (Optional) */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">
            Have a promo code?
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>Free shipping on all orders</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span>30-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}