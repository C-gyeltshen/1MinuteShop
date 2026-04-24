"use client";

import Link from "next/link";

const stats = [
  { val: "1", unit: " min", label: "To launch your store" },
  { val: "BTN ", unit: "0", label: "Upfront cost" },
  { val: "30", unit: " days", label: "Free trial" },
  { val: "0", unit: "", label: "Maintenance fees" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 md:px-10 pt-[120px] pb-16 md:pb-20">

      {/* Glow orb */}
      <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[rgba(224,115,40,0.08)] -top-[150px] left-1/2 -translate-x-1/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[rgba(224,115,40,0.15)] border border-[rgba(224,115,40,0.3)] rounded-full px-4 py-1.5 text-xs font-semibold text-[#E07328] uppercase tracking-[0.08em] mb-8">
        <span className="w-1.5 h-1.5 bg-[#E07328] rounded-full inline-block animate-[pulseDot_2s_infinite]" />
        1-minute setup · zero code
      </div>

      {/* Headline */}
      <h1 className="text-[clamp(36px,6vw,82px)] font-bold leading-[1.06] tracking-[-2px] max-w-[900px] text-[#f0ede8] mb-6">
        Your store, <span className="text-[#E07328]">live</span>
        <br />
        in under a minute.
      </h1>

      {/* Subheading */}
      <p className="text-[clamp(15px,2vw,20px)] text-[rgba(240,237,232,0.45)] max-w-[560px] leading-relaxed mb-10 md:mb-12 font-normal px-2">
        Laso.la builds your complete e-commerce store the moment you register — free
        subdomain, product management, order tracking, and more.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center flex-wrap mb-14 md:mb-16 w-full sm:w-auto">
        <Link
          href="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold no-underline bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] transition-all duration-200 hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
        >
          Get started free →
        </Link>
        <a
          href="#how"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-[15px] font-semibold no-underline bg-transparent text-[#f0ede8] border border-white/[0.07] transition-all duration-200 hover:border-[#E07328] hover:text-[#E07328] hover:bg-[rgba(224,115,40,0.15)]"
        >
          See how it works
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-2xl md:text-[28px] font-bold text-[#f0ede8] tracking-[-1px]">
                <span className="text-[#E07328]">{stat.val}</span>
                {stat.unit}
              </div>
              <div className="text-[11px] text-[rgba(240,237,232,0.45)] font-medium uppercase tracking-[0.08em] mt-0.5">
                {stat.label}
              </div>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden sm:block w-px h-9 bg-white/[0.07]" />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
}
