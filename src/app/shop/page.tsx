"use client";

import { useState } from "react";
import Navbar from "../../../components/layout/navbar";
import HeroSection from "../../../components/ui/hero-section";
import AboutSection from "../../../components/ui/about-section";
import ProductsSection from "../../../components/ui/products-section";
import ContactSection from "../../../components/ui/contect-section";
import Footer from "../../../components/layout/footer";

export default function HomePage() {
  const [cartMessage, setCartMessage] = useState<string>("");

  const showCartMessage = (productName: string) => {
    setCartMessage(`${productName} added to cart!`);
    setTimeout(() => setCartMessage(""), 3000);
  };

  return (
    <div className="relative">
      {/* Cart notification */}
      {cartMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {cartMessage}
        </div>
      )}

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection onAddToCartAction={showCartMessage} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
