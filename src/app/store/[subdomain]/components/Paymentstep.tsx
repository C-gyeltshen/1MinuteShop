"use client";

import { useState, useRef } from "react";
import { Upload, X, CreditCard, AlertCircle, Image as ImageIcon } from "lucide-react";
import { PaymentInfo } from "../checkout/page";

interface PaymentStepProps {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function PaymentStep({
  paymentInfo,
  setPaymentInfo,
  onBack,
  onSubmit,
  isSubmitting,
}: PaymentStepProps) {
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setError("");
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      setPaymentInfo({
        paymentScreenshot: file,
        paymentScreenshotPreview: previewUrl,
      });
    }
  };

  const handleRemoveFile = () => {
    if (paymentInfo.paymentScreenshotPreview) {
      URL.revokeObjectURL(paymentInfo.paymentScreenshotPreview);
    }
    setPaymentInfo({
      paymentScreenshot: null,
      paymentScreenshotPreview: undefined,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentInfo.paymentScreenshot) {
      setError("Please upload payment proof");
      return;
    }

    setError("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Payment Information
        </h2>
        <p className="text-gray-600">
          Complete your payment and upload proof
        </p>
      </div>

      {/* Payment Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Payment Instructions
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Transfer the total amount to our bank account</li>
              <li>Take a screenshot of the payment confirmation</li>
              <li>Upload the screenshot below</li>
              <li>Submit your order</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Bank Account Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-600">Bank Name</p>
            <p className="font-medium text-gray-900">Bank of Bhutan</p>
          </div>
          <div>
            <p className="text-gray-600">Account Name</p>
            <p className="font-medium text-gray-900">1MinuteShop</p>
          </div>
          <div>
            <p className="text-gray-600">Account Number</p>
            <p className="font-medium text-gray-900">123-456-789-0</p>
          </div>
          <div>
            <p className="text-gray-600">Account Type</p>
            <p className="font-medium text-gray-900">Current Account</p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Payment Screenshot *
        </label>
        
        {!paymentInfo.paymentScreenshot ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Click to upload payment proof
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, JPEG up to 5MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-start gap-4">
              {/* Preview Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={paymentInfo.paymentScreenshotPreview}
                    alt="Payment proof"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ImageIcon className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {paymentInfo.paymentScreenshot.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {(paymentInfo.paymentScreenshot.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Upload ready
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Replace Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Replace image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {/* Important Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">Important</p>
            <p>
              Your order will be processed after we verify your payment. This usually
              takes 1-2 business days. You'll receive a confirmation email once verified.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </form>
  );
}