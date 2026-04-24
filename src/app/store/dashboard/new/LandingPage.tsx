"use client";

import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import DomainSection from "./components/DomainSection";
import PricingSection from "./components/PricingSection";
import CTASection from "./components/CTASection";
import LandingFooter from "./components/LandingFooter";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "#080808",
        color: "#f0ede8",
      }}
    >
      {/* Google Fonts — add to layout.tsx <head> instead if you prefer */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .animate-pulse-dot {
          animation: pulse-dot 2s infinite;
        }
      `}</style>

      {/* Animated canvas backgrounds */}
      <AnimatedBackground />

      {/* Page content sits above canvases */}
      <div className="relative z-[2]">
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <DomainSection />
        <PricingSection />
        <CTASection />
        <LandingFooter />
      </div>
    </div>
  );
}
