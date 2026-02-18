"use client";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import TrustBadgeSection from "./components/TrustBadgeSection";
import ProductsSection from "./components/ProductSection";
import StoreLayout from "./layout/StoreLayout";
// Products Section

export default function LiveStore() {
  return (
    <div className="min-h-screen bg-white">
      <StoreLayout>
        <Navbar />
        <HeroSection />
        <TrustBadgeSection />
        <ProductsSection />
        <Footer />
      </StoreLayout>
    </div>
  );
}
