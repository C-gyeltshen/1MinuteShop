"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import SplashScreen from "../components/SplashScreen";
import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FeaturesSection from "../components/FeaturesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import { useSplashScreen } from "../hooks/useSplashScreen";
import { features, splashMessages, steps, testimonials } from "../data/landingData";

export default function Dashboard() {
  const router = useRouter();
  const { showSplash, currentMessage, isLastMessage } =
    useSplashScreen(splashMessages);

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleWatchDemo = () => {
    // Implement demo video logic
    console.log("Watch demo clicked");
  };

  return (
    <>
      <SplashScreen
        show={showSplash}
        currentMessage={currentMessage}
        isLastMessage={isLastMessage}
      />

      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          <Navbar />

          <HeroSection
            onGetStarted={handleGetStarted}
            onWatchDemo={handleWatchDemo}
          />

          <HowItWorksSection steps={steps} />

          <FeaturesSection features={features} />

          <TestimonialsSection testimonials={testimonials} />

          <CTASection onGetStarted={handleGetStarted} />

          <Footer />
        </div>
      )}
    </>
  );
}