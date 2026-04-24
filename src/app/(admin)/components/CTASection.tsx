"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-[120px] text-center overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-5 md:px-10">

        {/* Glow orb */}
        <div className="absolute w-[300px] md:w-[500px] h-[200px] md:h-[300px] bg-[rgba(224,115,40,0.07)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] pointer-events-none" />

        <h2 className="relative text-[clamp(26px,4vw,52px)] font-bold tracking-[-2px] text-[#f0ede8] mb-4">
          Ready to open your store?
        </h2>
        <p className="relative text-[17px] text-[rgba(240,237,232,0.45)] leading-relaxed max-w-[480px] mx-auto mb-10">
          Join store owners building their business on Laso.la — free for your first 30 days.
        </p>
        <Link
          href="/register"
          className="relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold no-underline bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] transition-all duration-200 hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
        >
          Get started free →
        </Link>
      </div>
    </section>
  );
}
