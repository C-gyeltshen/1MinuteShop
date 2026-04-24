import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-10 pt-[120px] pb-20 relative">
      {/* Glow orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "rgba(224,115,40,0.08)",
          top: -150,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-[rgba(224,115,40,0.15)] border border-[rgba(224,115,40,0.3)] rounded-full px-4 py-[6px] text-xs font-semibold text-[#E07328] uppercase tracking-[0.08em] mb-8">
        <span className="w-[6px] h-[6px] bg-[#E07328] rounded-full animate-pulse-dot" />
        1-minute setup · zero code
      </div>

      {/* Headline */}
      <h1
        className="font-bold leading-[1.06] tracking-[-2px] max-w-[900px] text-[#f0ede8] mb-6"
        style={{ fontSize: "clamp(42px, 6vw, 82px)" }}
      >
        Your store, <span className="text-[#E07328]">live</span>
        <br />
        in under a minute.
      </h1>

      {/* Subheading */}
      <p
        className="text-[rgba(240,237,232,0.45)] max-w-[560px] leading-[1.6] mb-12 font-normal"
        style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
      >
        laso.la builds your complete e-commerce store the moment you register —
        free subdomain, product management, order tracking, and more.
      </p>

      {/* Actions */}
      <div className="flex gap-[14px] items-center flex-wrap justify-center mb-16">
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] text-[15px] font-semibold no-underline cursor-pointer transition-all bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
        >
          Get started free →
        </Link>
        <a
          href="#how"
          className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] text-[15px] font-semibold no-underline cursor-pointer transition-all bg-transparent text-[#f0ede8] border border-[rgba(255,255,255,0.07)] hover:border-[#E07328] hover:text-[#E07328] hover:bg-[rgba(224,115,40,0.15)]"
        >
          See how it works
        </a>
      </div>

      {/* Stats */}
      <div className="flex gap-12 items-center flex-wrap justify-center">
        <div className="text-center">
          <div className="text-[28px] font-bold text-[#f0ede8] tracking-[-1px]">
            <span className="text-[#E07328]">1</span> min
          </div>
          <div className="text-xs text-[rgba(240,237,232,0.45)] font-medium uppercase tracking-[0.08em] mt-[2px]">
            To launch your store
          </div>
        </div>
        <div className="w-px h-9 bg-[rgba(255,255,255,0.07)]" />
        <div className="text-center">
          <div className="text-[28px] font-bold text-[#f0ede8] tracking-[-1px]">
            BTN <span className="text-[#E07328]">0</span>
          </div>
          <div className="text-xs text-[rgba(240,237,232,0.45)] font-medium uppercase tracking-[0.08em] mt-[2px]">
            Upfront cost
          </div>
        </div>
        <div className="w-px h-9 bg-[rgba(255,255,255,0.07)]" />
        <div className="text-center">
          <div className="text-[28px] font-bold text-[#f0ede8] tracking-[-1px]">
            <span className="text-[#E07328]">30</span> days
          </div>
          <div className="text-xs text-[rgba(240,237,232,0.45)] font-medium uppercase tracking-[0.08em] mt-[2px]">
            Free trial
          </div>
        </div>
        <div className="w-px h-9 bg-[rgba(255,255,255,0.07)]" />
        <div className="text-center">
          <div className="text-[28px] font-bold text-[#f0ede8] tracking-[-1px]">
            <span className="text-[#E07328]">0</span>
          </div>
          <div className="text-xs text-[rgba(240,237,232,0.45)] font-medium uppercase tracking-[0.08em] mt-[2px]">
            Maintenance fees
          </div>
        </div>
      </div>
    </section>
  );
}
