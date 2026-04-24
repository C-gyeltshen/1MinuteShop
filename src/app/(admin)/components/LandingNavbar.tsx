"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

export default function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-10 h-[68px] bg-[rgba(8,8,8,0.7)] backdrop-blur-xl border-b border-white/[0.07]">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
        <div className="w-9 h-9 bg-[#E07328] rounded-lg flex items-center justify-center font-mono text-[11px] font-bold text-white leading-tight text-center">
          01<br />10
        </div>
        <span className="text-lg font-bold text-[#f0ede8] tracking-tight">
          Laso<span className="text-[#E07328]">.la</span>
        </span>
      </Link>

      {/* Desktop nav links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {navLinks.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="no-underline text-[rgba(240,237,232,0.45)] text-sm font-medium transition-colors duration-200 hover:text-[#f0ede8]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:flex gap-3 items-center">
        <Link
          href="/login"
          className="inline-flex items-center px-[22px] py-2.5 rounded-lg text-sm font-semibold no-underline bg-transparent text-[rgba(240,237,232,0.45)] border border-white/[0.07] transition-all duration-200 hover:text-[#f0ede8] hover:border-white/20 hover:bg-white/[0.03]"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center px-[22px] py-2.5 rounded-lg text-sm font-semibold no-underline bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] transition-all duration-200 hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
        >
          Start free trial →
        </Link>
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer p-2"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-[1.5px] bg-[#f0ede8] transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-[#f0ede8] transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-5 h-[1.5px] bg-[#f0ede8] transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
      </button>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden absolute top-[68px] left-0 right-0 bg-[rgba(8,8,8,0.97)] backdrop-blur-xl border-b border-white/[0.07] flex flex-col px-5 py-5 gap-1 transition-all duration-200 z-50 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="no-underline text-[rgba(240,237,232,0.6)] text-sm font-medium py-3 border-b border-white/[0.05] last:border-0 hover:text-[#f0ede8] transition-colors"
          >
            {item.label}
          </a>
        ))}
        <div className="flex flex-col gap-2 pt-3">
          <Link
            href="/login"
            className="text-center py-3 rounded-lg text-sm font-semibold no-underline text-[rgba(240,237,232,0.6)] border border-white/[0.07] hover:text-[#f0ede8] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-center py-3 rounded-lg text-sm font-semibold no-underline bg-[#E07328] text-white hover:bg-[#f07d30] transition-all"
          >
            Start free trial →
          </Link>
        </div>
      </div>
    </nav>
  );
}
