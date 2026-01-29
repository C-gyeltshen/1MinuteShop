import React from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onWatchDemo?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onWatchDemo,
}) => {
  return (
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
            No coding. No complexity. Just pure ecommerce magic. From zero to
            selling in less time than it takes to order lunch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={onGetStarted}
              className="bg-[#ff6800] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#e55f00] transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg shadow-[#ff6800]/20"
            >
              <PlayCircle className="w-6 h-6" />
              <span>Start Building Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {onWatchDemo && (
              <button
                onClick={onWatchDemo}
                className="border-2 border-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-[#ff6800] hover:bg-[#ff6800]/10 transition-all duration-200"
              >
                Watch Demo
              </button>
            )}
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
  );
};

export default HeroSection;