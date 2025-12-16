"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Zap,
  Palette,
  CreditCard,
  BarChart3,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  PlayCircle,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const splashMessages = [
  {
    text: "Building your digital empire...",
    icon: <Store className="w-8 h-8" />,
  },
  {
    text: "Crafting beautiful storefronts...",
    icon: <Palette className="w-8 h-8" />,
  },
  {
    text: "Powering up your sales engine...",
    icon: <Zap className="w-8 h-8" />,
  },
  { text: "Welcome to 1MinuteShop!", icon: <Sparkles className="w-8 h-8" /> },
];

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "1-Minute Setup",
    description: "Launch your store faster than making coffee",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Drag & Drop Builder",
    description: "Design like a pro without any coding",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payments",
    description: "Accept payments from day one",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Optimized",
    description: "Perfect on every device",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track your success in real-time",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Reach",
    description: "Sell worldwide from day one",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    business: "Artisan Jewelry",
    quote: "From idea to first sale in under 10 minutes!",
    revenue: "$50K in first month",
  },
  {
    name: "Mike Rodriguez",
    business: "Tech Gadgets",
    quote: "The easiest way to start selling online. Period.",
    revenue: "$25K weekly sales",
  },
  {
    name: "Emma Thompson",
    business: "Handmade Crafts",
    quote: "Finally, a platform that just works!",
    revenue: "200% growth",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Template",
    description: "Pick from 100+ stunning designs",
  },
  {
    number: "02",
    title: "Customize Everything",
    description: "Drag, drop, and make it yours",
  },
  {
    number: "03",
    title: "Go Live",
    description: "Launch and start selling immediately",
  },
];

export default function Dashboard() {
  const [splashIndex, setSplashIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (splashIndex < splashMessages.length - 1) {
      const timer = setTimeout(() => setSplashIndex(splashIndex + 1), 1200);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => setShowSplash(false), 2500);
      return () => clearTimeout(finalTimer);
    }
  }, [splashIndex]);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-50 bg-gradient-to-br from-[#101828] via-[#ff6800] to-[#101828] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <div className="text-center">
              <motion.div
                key={splashIndex}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-white text-center"
              >
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {splashMessages[splashIndex].icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {splashMessages[splashIndex].text}
                </h2>
                {splashIndex === splashMessages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-yellow-400 text-lg"
                  >
                    Build. Launch. Succeed.
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          {/* Navigation */}
          <Navbar />

          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block bg-[#ff6800]/10 border border-[#ff6800]/30 rounded-full px-6 py-2 mb-8">
                  <span className="text-[#ff6800] font-medium">
                    🚀 Launch Your Store in 60 Seconds
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Build Your Dream Store
                  <span className="block bg-gradient-to-r from-[#ff6800] to-[#ff9d4d] bg-clip-text text-transparent">
                    Without the Hassle
                  </span>
                </h1>

                <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                  No coding. No complexity. Just pure ecommerce magic. From zero
                  to selling in less time than it takes to order lunch.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <button className="bg-[#ff6800] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e55f00] transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-[#ff6800]/20">
                    <PlayCircle className="w-6 h-6" />
                    <span>Start Building Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-[#ff6800] hover:bg-[#ff6800]/10 transition-all duration-200">
                    Watch Demo
                  </button>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#ff6800]" />
                    <span>Free forever plan</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#ff6800]" />
                    <span>No credit card needed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-[#ff6800]" />
                    <span>Launch instantly</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-slate-800/50" id="features">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-slate-400">
                  Three simple steps to ecommerce success
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="text-center group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 hover:border-[#ff6800]/50 transition-all duration-300">
                      <div className="bg-gradient-to-r from-[#ff6800] to-[#ff9d4d] text-white text-2xl font-bold w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#ff6800]/30">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-400">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Everything You Need to Succeed
                </h2>
                <p className="text-xl text-slate-400">
                  Powerful features that grow with your business
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-8 rounded-2xl hover:border-[#ff6800]/50 transition-all duration-300 group"
                  >
                    <div className="text-[#ff6800] mb-4 group-hover:scale-110 transition-transform duration-200">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-20 bg-slate-800/50" id="testimonials">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Join Thousands of Successful Sellers
                </h2>
                <p className="text-xl text-slate-400">
                  Real stories from real entrepreneurs
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 p-8 rounded-2xl hover:border-[#ff6800]/50 transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-[#ff6800] mb-4">
                      {testimonial.revenue}
                    </div>
                    <p className="text-slate-300 mb-6 italic text-lg">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t border-slate-600/50 pt-4">
                      <div className="font-semibold text-white text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {testimonial.business}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff6800]/20 to-[#ff9d4d]/20 blur-3xl"></div>
            <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Build Your Empire?
                </h2>
                <p className="text-xl text-slate-300 mb-8">
                  Join over 50,000 entrepreneurs who chose 1MinuteShop to launch
                  their dreams
                </p>
                <button className="bg-[#ff6800] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#e55f00] transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-3 shadow-xl shadow-[#ff6800]/30">
                  <Zap className="w-6 h-6" />
                  <span>Start Your Free Store Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-slate-400 text-sm mt-6">
                  No credit card required • Free forever plan available
                </p>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
