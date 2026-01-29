import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
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
            Join over 50,000 entrepreneurs who chose 1MinuteShop to launch their
            dreams
          </p>
          <button
            onClick={onGetStarted}
            className="bg-[#ff6800] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#e55f00] transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-3 shadow-xl shadow-[#ff6800]/30"
          >
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
  );
};

export default CTASection;