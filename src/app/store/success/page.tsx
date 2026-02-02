"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/shared/store/authStore";
import {
  Store,
  Globe,
  Package,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

type StoreData = {
  storeName: string;
  ownerName: string;
  email: string;
  subdomain: string;
  storeUrl: string;
  createdAt: string;
};

const StoreSuccessPage = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const user = auth?.user;
  console.log("user data:", user)

  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Mock store data - replace with actual data from your API/context
  const storeData: StoreData = {
    storeName: user?.storeName || "Amazing Store",
    ownerName: user?.ownerName || "Store Owner",
    email: user?.email || "owner@example.com",
    subdomain: user?.storeSubdomain || "amazing-store",
    storeUrl: `https://${user?.storeSubdomain}.laso.la`,
    createdAt: new Date().toISOString(),
  };

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-advance through celebration steps - only after mount
  useEffect(() => {
    if (!mounted) return;
    
    const stepTimers = [
      setTimeout(() => setCurrentStep(1), 1000),
      setTimeout(() => setCurrentStep(2), 2000),
      setTimeout(() => setCurrentStep(3), 3000),
      setTimeout(() => setCurrentStep(4), 4000),
    ];

    return () => stepTimers.forEach(clearTimeout);
  }, [mounted]);

  // Countdown timer for auto-redirect
  useEffect(() => {
    if (!autoRedirect) return;

    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRedirect]);

  // Handle redirect when countdown reaches 0
  useEffect(() => {
    if (redirectCountdown === 0 && autoRedirect) {
      router.push("/store/dashboard");
    }
  }, [redirectCountdown, autoRedirect, router]);

  // Hide confetti after animation - only after mount
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [mounted]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(storeData.storeUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleGoToDashboard = () => {
    router.push("/store/dashboard");
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Package,
      title: "Product Management",
      description: "Add and organize your products with ease",
      color: "bg-blue-500",
    },
    {
      icon: ShoppingCart,
      title: "Order Tracking",
      description: "Monitor and fulfill customer orders",
      color: "bg-green-500",
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Track your performance and growth",
      color: "bg-purple-500",
    },
    {
      icon: Globe,
      title: "Live Storefront",
      description: "Your store is live and ready for customers",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Confetti Effect */}
      {mounted && showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-3 h-3 ${
                  ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-yellow-500", "bg-green-500"][
                    Math.floor(Math.random() * 5)
                  ]
                }`}
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {/* Success Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-6 animate-scale-in">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3 flex-wrap">
            <span>Congratulations</span>
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-2">
            Welcome, <span className="font-semibold text-blue-600">{storeData.ownerName}</span>!
          </p>
          
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Your online store is now live and ready to start selling. Let's get you started with managing your business.
          </p>
        </div>

        {/* Store Details Card */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
            {/* Store Header */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 p-6 sm:p-8 text-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Store className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">{storeData.storeName}</h2>
                    <p className="text-blue-100 text-sm sm:text-base">Your Online Store</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    Live Now! 🎉
                  </div>
                </div>
              </div>

              {/* Store URL Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <Globe className="w-4 h-4" />
                    <span>Your Store URL</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyUrl}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
                    >
                      {copiedUrl ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span className="hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>
                    <a
                      href={storeData.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <span className="hidden sm:inline">Visit Store</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="font-mono text-lg sm:text-xl font-semibold break-all">
                  {storeData.storeUrl}
                </div>
              </div>
            </div>

            {/* Store Info Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-500 font-medium">Store Name</div>
                <div className="text-lg font-semibold text-gray-900">{storeData.storeName}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500 font-medium">Owner Email</div>
                <div className="text-lg font-semibold text-gray-900">{storeData.email}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500 font-medium">Subdomain</div>
                <div className="text-lg font-semibold text-gray-900">{storeData.subdomain}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-500 font-medium">Created On</div>
                <div className="text-lg font-semibold text-gray-900">
                  {new Date(storeData.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
            What's Next? Explore Your Dashboard
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  currentStep >= index ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Managing Your Store?
            </h3>
            
            <p className="text-gray-600 mb-6">
              Head to your dashboard to add products, manage orders, and grow your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGoToDashboard}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={storeData.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all"
              >
                <span>Preview Store</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {autoRedirect && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>Auto-redirecting to dashboard in</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold">
                    {redirectCountdown}
                  </span>
                  <span>seconds</span>
                </div>
                <button
                  onClick={() => setAutoRedirect(false)}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StoreSuccessPage;