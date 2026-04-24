import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="flex items-center justify-between flex-wrap gap-4 px-10 py-7 border-t border-[rgba(255,255,255,0.07)]">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-[#E07328] rounded-lg flex items-center justify-center font-mono text-[9px] font-bold text-white leading-[1.1] text-center">
          01<br />10
        </div>
        <span className="text-sm font-bold text-[rgba(240,237,232,0.45)]">
          laso.la
        </span>
      </div>

      <div className="flex gap-6">
        {["Terms", "Privacy", "Support"].map((label) => (
          <Link
            key={label}
            href="#"
            className="text-sm text-[rgba(240,237,232,0.35)] no-underline transition-colors hover:text-[rgba(240,237,232,0.7)]"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="text-xs text-[rgba(240,237,232,0.25)]">
        © 2026 1MinuteShop / laso.la. All rights reserved.
      </div>
    </footer>
  );
}
