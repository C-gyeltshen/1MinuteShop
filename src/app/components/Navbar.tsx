"use client";

import { Menu, X, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navbar({ logoSrc }: Readonly<{ logoSrc?: string }>) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md z-40 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Image
              src={logoSrc || "/logo.png"}
              alt="Logo"
              width={40}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-white">1MinuteShop</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Testimonials
            </a>
            <button
              className="text-slate-300 hover:text-white transition-colors font-medium"
              type="button"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
            <button
              className="bg-[#ff6800] text-white px-6 py-2.5 rounded-xl hover:bg-[#e55f00] transition-all duration-200 font-medium shadow-lg shadow-[#ff6800]/20 hover:shadow-xl hover:shadow-[#ff6800]/30 transform hover:scale-105"
              type="button"
              onClick={() => router.push("/register")}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <button
                className="text-slate-300 hover:text-white transition-colors font-medium py-2 text-left"
                type="button"
                onClick={() => {
                  router.push("/login");
                  setIsMobileMenuOpen(false);
                }}
              >
                Login
              </button>
              <button
                className="bg-[#ff6800] text-white px-6 py-3 rounded-xl hover:bg-[#e55f00] transition-all duration-200 font-medium shadow-lg shadow-[#ff6800]/20 w-full"
                type="button"
                onClick={() => {
                  router.push("/register");
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
