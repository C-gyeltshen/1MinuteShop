"use client";

import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: number;
}

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const steps = [
    { number: 1, title: "Customer Info", description: "Your details" },
    { number: 2, title: "Shipping", description: "Delivery address" },
    { number: 3, title: "Payment", description: "Complete order" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep > step.number
                    ? "bg-green-500 text-white"
                    : currentStep === step.number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              
              {/* Step Title - Hidden on mobile */}
              <div className="hidden sm:block text-center mt-2">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? "text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 transition-all ${
                  currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Step Title */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-gray-900">
          {steps[currentStep - 1].title}
        </p>
        <p className="text-xs text-gray-500">
          {steps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );
}