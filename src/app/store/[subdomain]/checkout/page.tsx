"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { useCart } from "../context/Cartcontext ";
import CheckoutStepper from "../components/Checkoutstepper";
import CustomerInfoStep from "../components/Customerinfostep";
import ShippingInfoStep from "../components/Shippinginfostep";
import PaymentStep from "../components/Paymentstep";
import OrderSummary from "../components/Ordersummary";
import { getStoreOwnerId } from "../helper/storeHelper";

export interface CustomerInfo {
  customerName: string;
  email: string;
  phoneNumber: string;
}

export interface ShippingInfo {
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  customerNotes?: string;
}

export interface PaymentInfo {
  paymentScreenshot: File | null;
  paymentScreenshotPreview?: string;
}

export default function CheckoutPage() {

  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    customerName: "",
    email: "",
    phoneNumber: "",
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPostalCode: "",
    shippingCountry: "Bhutan",
    customerNotes: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentScreenshot: null,
    paymentScreenshotPreview: undefined,
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      console.log("Cart is empty, redirecting to home");
      globalThis.location.href = "/";
    }
  }, [cartItems]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    try {
      // Get subdomain
      const hostname = globalThis.location.hostname;
      const parts = hostname.split(".");
      const subdomain = parts[0];

      const storeOwnerId = await getStoreOwnerId(subdomain);
      console.log(subdomain)

      // 1. Create or get customer
      const customerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: customerInfo.customerName,
            email: customerInfo.email,
            phoneNumber: customerInfo.phoneNumber,
          }),
        },
      );

      if (!customerResponse.ok) {
        throw new Error("Failed to create customer");
      }

      const customerData = await customerResponse.json();
      const customerId = customerData.data.id;

      // 2. Upload payment screenshot if provided
      let paymentScreenshotUrl = "";
      if (paymentInfo.paymentScreenshot) {
        const formData = new FormData();
        formData.append("file", paymentInfo.paymentScreenshot);
        formData.append("userId", subdomain); // ✅ required by controller

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload/payment-screenshot`, 
          {
            method: "POST",
            body: formData,
          },
        );

        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          throw new Error(
            uploadError.message || "Failed to upload payment screenshot",
          );
        }

        const uploadData = await uploadResponse.json();
        paymentScreenshotUrl = uploadData.url; // ✅ no .data wrapper
      }

      // 3. Create order with the correct endpoint
      const orderData = {
        storeOwnerId: storeOwnerId,
        storeSubdomain: subdomain,
        customerId: customerId,
        totalAmount: getTotalPrice(),
        paymentScreenshotUrl: paymentScreenshotUrl,
        shippingAddress: shippingInfo.shippingAddress,
        shippingCity: shippingInfo.shippingCity,
        shippingState: shippingInfo.shippingState,
        shippingPostalCode: shippingInfo.shippingPostalCode,
        shippingCountry: shippingInfo.shippingCountry,
        customerNotes: shippingInfo.customerNotes || "",
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: Number.parseFloat(item.price),
        })),
      };

      const orderResponse = await fetch(
        "https://oneminuteshop-be.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        },
      );

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        console.error("Order creation failed:", errorData);
        throw new Error(errorData.message || "Failed to create order");
      }

      const orderResult = await orderResponse.json();

      // 4. Clear cart and redirect to success page
      clearCart();
      globalThis.location.href = `/success?orderId=${orderResult.data.id}`;
    } catch (error) {
      console.error("Order submission failed:", error);
      alert(
        `Failed to submit order: ${error instanceof Error ? error.message : "Please try again."}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show checkout form if cart has items
  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => (globalThis.location.href = "/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your order in just a few steps
          </p>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {currentStep === 1 && (
                <CustomerInfoStep
                  customerInfo={customerInfo}
                  setCustomerInfo={setCustomerInfo}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && (
                <ShippingInfoStep
                  shippingInfo={shippingInfo}
                  setShippingInfo={setShippingInfo}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <PaymentStep
                  paymentInfo={paymentInfo}
                  setPaymentInfo={setPaymentInfo}
                  onBack={handleBack}
                  onSubmit={handleSubmitOrder}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
