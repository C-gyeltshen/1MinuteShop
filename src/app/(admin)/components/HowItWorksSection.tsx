import React from "react";
import { motion } from "framer-motion";
import { Step } from "../types";

interface HowItWorksSectionProps {
  steps: Step[];
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ steps }) => {
  return (
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
  );
};

export default HowItWorksSection;