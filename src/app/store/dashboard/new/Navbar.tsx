"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 h-[68px] bg-[rgba(8,8,8,0.7)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.07)]">
      <Link href="/" className="flex items-center gap-[10px] no-underline">
        <div className="w-9 h-9 bg-[#E07328] rounded-lg flex items-center justify-center font-mono text-[11px] font-bold text-white leading-[1.1] text-center tracking-[-0.5px]">
          01<br />10
        </div>
        <span className="text-lg font-bold text-[#f0ede8] tracking-[-0.5px]">
          laso<span className="text-[#E07328]">.la</span>
        </span>
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {[
          { href: "#how", label: "How it works" },
          { href: "#features", label: "Features" },
          { href: "#pricing", label: "Pricing" },
        ].map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="no-underline text-[rgba(240,237,232,0.45)] text-sm font-medium transition-colors hover:text-[#f0ede8]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex gap-3 items-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-lg text-sm font-semibold no-underline cursor-pointer transition-all bg-transparent text-[rgba(240,237,232,0.45)] border border-[rgba(255,255,255,0.07)] hover:text-[#f0ede8] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.03)]"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-[22px] py-[10px] rounded-lg text-sm font-semibold no-underline cursor-pointer transition-all bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
        >
          Start free trial →
        </Link>
      </div>
    </nav>
  );
}
