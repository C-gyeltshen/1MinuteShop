"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-10 transition-all duration-300 ${
          scrolled
            ? "h-[60px] bg-[rgba(8,8,8,0.85)] shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "h-[68px] bg-[rgba(8,8,8,0.55)]"
        } backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.07)]`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-[34px] h-[34px] bg-[#E07328] rounded-[8px] flex items-center justify-center shadow-[0_0_18px_rgba(224,115,40,0.4)]">
            <span
              className="font-mono text-[10px] font-bold text-white leading-tight text-center"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              1<br />M
            </span>
          </div>
          <span
            className="text-[17px] font-bold text-[#f0ede8] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            1Minute<span className="text-[#E07328]">Shop</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-7 list-none">
          {[
            { label: "Features", href: "/#features" },
            { label: "Pricing", href: "/#pricing" },
            { label: "How it works", href: "/#how" },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-[13px] font-medium text-[rgba(240,237,232,0.5)] hover:text-[#f0ede8] transition-colors duration-200"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {!isLogin && (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-[18px] py-[9px] rounded-[8px] text-[13px] font-semibold text-[rgba(240,237,232,0.6)] border border-[rgba(255,255,255,0.08)] hover:text-[#f0ede8] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Sign in
            </Link>
          )}
          {!isRegister && (
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-[18px] py-[9px] rounded-[8px] text-[13px] font-semibold text-white bg-[#E07328] shadow-[0_0_20px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_30px_rgba(224,115,40,0.5)] hover:-translate-y-px transition-all duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Get started free
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-[6px] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-[rgba(240,237,232,0.7)] transition-all duration-200 ${mobileOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}`}
          />
          <span
            className={`block h-[1.5px] bg-[rgba(240,237,232,0.7)] transition-all duration-200 ${mobileOpen ? "opacity-0 w-5" : "w-4"}`}
          />
          <span
            className={`block h-[1.5px] bg-[rgba(240,237,232,0.7)] transition-all duration-200 ${mobileOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}`}
          />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-[68px] left-0 right-0 bg-[rgba(10,10,10,0.97)] border-b border-[rgba(255,255,255,0.07)] p-6 flex flex-col gap-5 transition-all duration-300 ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          {[
            { label: "Features", href: "/#features" },
            { label: "Pricing", href: "/#pricing" },
            { label: "How it works", href: "/#how" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-[rgba(240,237,232,0.6)] hover:text-[#f0ede8] transition-colors py-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 border-t border-[rgba(255,255,255,0.07)] flex flex-col gap-3">
            {!isLogin && (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-[8px] text-[14px] font-semibold text-[rgba(240,237,232,0.7)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200"
              >
                Sign in
              </Link>
            )}
            {!isRegister && (
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3 rounded-[8px] text-[14px] font-semibold text-white bg-[#E07328] shadow-[0_0_20px_rgba(224,115,40,0.3)] hover:bg-[#f07d30] transition-all duration-200"
              >
                Get started free
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
