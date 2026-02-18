"use client";

import { useState } from "react";
import { MapPin, Home, MessageSquare } from "lucide-react";
import { ShippingInfo } from "../checkout/page";

interface ShippingInfoStepProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ShippingInfoStep({
  shippingInfo,
  setShippingInfo,
  onNext,
  onBack,
}: ShippingInfoStepProps) {
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  const bhutanDistricts = [
    "Bumthang",
    "Chukha",
    "Dagana",
    "Gasa",
    "Haa",
    "Lhuntse",
    "Mongar",
    "Paro",
    "Pemagatshel",
    "Punakha",
    "Samdrup Jongkhar",
    "Samtse",
    "Sarpang",
    "Thimphu",
    "Trashigang",
    "Trashiyangtse",
    "Trongsa",
    "Tsirang",
    "Wangdue Phodrang",
    "Zhemgang",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    if (!shippingInfo.shippingAddress.trim()) {
      newErrors.shippingAddress = "Address is required";
    }

    if (!shippingInfo.shippingCity.trim()) {
      newErrors.shippingCity = "City/Town is required";
    }

    if (!shippingInfo.shippingState.trim()) {
      newErrors.shippingState = "District is required";
    }

    if (!shippingInfo.shippingPostalCode.trim()) {
      newErrors.shippingPostalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Shipping Information
        </h2>
        <p className="text-gray-600">
          Where should we deliver your order?
        </p>
      </div>

      {/* Street Address */}
      <div>
        <label
          htmlFor="shippingAddress"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Street Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="shippingAddress"
            value={shippingInfo.shippingAddress}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                shippingAddress: e.target.value,
              })
            }
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors.shippingAddress ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="House no, Building name, Street"
          />
        </div>
        {errors.shippingAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.shippingAddress}</p>
        )}
      </div>

      {/* City/Town */}
      <div>
        <label
          htmlFor="shippingCity"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          City/Town *
        </label>
        <input
          type="text"
          id="shippingCity"
          value={shippingInfo.shippingCity}
          onChange={(e) =>
            setShippingInfo({
              ...shippingInfo,
              shippingCity: e.target.value,
            })
          }
          className={`block w-full px-3 py-2 border ${
            errors.shippingCity ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder="Phuntsholing, Thimphu, Paro..."
        />
        {errors.shippingCity && (
          <p className="mt-1 text-sm text-red-600">{errors.shippingCity}</p>
        )}
      </div>

      {/* District and Postal Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* District */}
        <div>
          <label
            htmlFor="shippingState"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            District (Dzongkhag) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="shippingState"
              value={shippingInfo.shippingState}
              onChange={(e) =>
                setShippingInfo({
                  ...shippingInfo,
                  shippingState: e.target.value,
                })
              }
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.shippingState ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Select District</option>
              {bhutanDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          {errors.shippingState && (
            <p className="mt-1 text-sm text-red-600">{errors.shippingState}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label
            htmlFor="shippingPostalCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Postal Code *
          </label>
          <input
            type="text"
            id="shippingPostalCode"
            value={shippingInfo.shippingPostalCode}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                shippingPostalCode: e.target.value,
              })
            }
            className={`block w-full px-3 py-2 border ${
              errors.shippingPostalCode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="11001"
          />
          {errors.shippingPostalCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.shippingPostalCode}
            </p>
          )}
        </div>
      </div>

      {/* Country (Read-only) */}
      <div>
        <label
          htmlFor="shippingCountry"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Country
        </label>
        <input
          type="text"
          id="shippingCountry"
          value={shippingInfo.shippingCountry}
          readOnly
          className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
        />
      </div>

      {/* Customer Notes */}
      <div>
        <label
          htmlFor="customerNotes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Delivery Instructions (Optional)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="customerNotes"
            value={shippingInfo.customerNotes}
            onChange={(e) =>
              setShippingInfo({
                ...shippingInfo,
                customerNotes: e.target.value,
              })
            }
            rows={4}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any special instructions for delivery? (e.g., landmarks, best time to deliver)"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}