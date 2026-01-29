import React from "react";
import { motion } from "framer-motion";
import { Testimonial } from "../types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  return (
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
  );
};

export default TestimonialsSection;