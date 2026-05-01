"use client";

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.07] px-5 md:px-10 py-8">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#E07328] rounded-md flex items-center justify-center font-mono text-[9px] font-bold text-white leading-tight text-center">
            01<br />10
          </div>
          <span className="text-[15px] font-bold text-[#f0ede8] tracking-tight">
            1Minute<span className="text-[#E07328]">Shop</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          {["Privacy", "Terms", "Support"].map((link) => (
            <a
              key={link}
              href="#"
              className="no-underline text-[13px] text-[rgba(240,237,232,0.45)] transition-colors duration-200 hover:text-[#f0ede8]"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs text-[rgba(240,237,232,0.45)]">
          © 2026 1MinuteShop All rights reserved.
        </div>

      </div>
    </footer>
  );
}
