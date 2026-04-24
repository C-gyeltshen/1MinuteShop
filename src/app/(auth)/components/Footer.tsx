"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[rgba(255,255,255,0.07)] px-5 sm:px-8 lg:px-10 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 flex-wrap">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] bg-[#E07328] rounded-[6px] flex items-center justify-center">
            <span
              className="font-mono text-[8px] font-bold text-white leading-tight text-center"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              1<br />M
            </span>
          </div>
          <span
            className="text-[13px] font-bold text-[rgba(240,237,232,0.5)]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            1MinuteShop
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {[
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Support", href: "/support" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[12px] font-medium text-[rgba(240,237,232,0.4)] hover:text-[rgba(240,237,232,0.8)] transition-colors duration-200"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-[11px] text-[rgba(240,237,232,0.3)]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          © {new Date().getFullYear()} 1MinuteShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
