"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import LandingNavbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";
import DomainSection from "../components/DomainSection";
import PricingSection from "../components/PricingSection";
import CTASection from "../components/CTASection";
import LandingFooter from "../components/Footer";
import SplashScreen from "../components/SplashScreen";

// Dynamically import the canvas-heavy AnimatedBackground (no SSR)
const AnimatedBackground = dynamic(() => import("../components/AnimatedBackground"), {
  ssr: false,
});

export default function LandingPage() {
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #080808;
          color: #f0ede8;
          overflow-x: hidden;
          min-height: 100vh;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(224,115,40,0.3); border-radius: 4px; }
      `}</style>

      {/* Splash screen — shows first */}
      <SplashScreen onComplete={handleSplashComplete} />

      {/* Main page — fades in after splash */}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.9s ease",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        {/* Background canvas layers (z-index 0 & 1) */}
        <AnimatedBackground />

        {/* Page content (z-index 2) */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <LandingNavbar />
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          <DomainSection />
          <PricingSection />
          <CTASection />
          <LandingFooter />
        </div>
      </div>
    </>
  );
}
