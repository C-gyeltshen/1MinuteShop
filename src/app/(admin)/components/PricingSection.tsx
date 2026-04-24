"use client";

import Link from "next/link";

const leftPerks = [
  { bold: "30-day free trial", rest: " — explore every feature with zero commitment." },
  { bold: "No maintenance fee", rest: " — ever. We don't charge you just to keep the lights on." },
  { bold: "Cancel anytime", rest: " — no lock-ins, no surprises." },
];

const rightPerks = [
  { bold: "3% transaction fee", rest: " — only when you make a sale. We grow with you." },
  { bold: "Instant store generation", rest: " — live in under 1 minute from signup." },
  { bold: "Built for Bhutan", rest: " — local currency, local sellers, real support." },
];

const pricingFeatures = [
  "Auto-generated storefront",
  "Free yourstore.laso.la domain",
  "Unlimited products",
  "Order management dashboard",
  "No maintenance fees",
];

function CheckCircle() {
  return (
    <div className="w-5 h-5 shrink-0 rounded-full bg-[rgba(39,201,63,0.12)] border border-[rgba(39,201,63,0.25)] flex items-center justify-center mt-0.5">
      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 stroke-[#27c93f] fill-none" strokeWidth={2}>
        <path d="M2 6l3 3 5-5" />
      </svg>
    </div>
  );
}

function PerkList({ perks }: { perks: typeof leftPerks }) {
  return (
    <div className="flex flex-col gap-5">
      {perks.map((p, i) => (
        <div key={i} className="flex items-start gap-3">
          <CheckCircle />
          <p className="text-sm text-[rgba(240,237,232,0.6)] leading-snug">
            <strong className="text-[#f0ede8]">{p.bold}</strong>
            {p.rest}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#E07328] mb-4">
            Pricing
          </div>
          <h2 className="text-[clamp(26px,3.5vw,46px)] font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-[17px] text-[rgba(240,237,232,0.45)] leading-relaxed max-w-[520px] mx-auto">
            No maintenance fees. Pay only when your business succeeds.
          </p>
        </div>

        {/* Layout: stacked on mobile, 3-col on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_360px_1fr] gap-8 md:gap-6 items-start md:items-center max-w-[900px] mx-auto">

          {/* Left perks — hidden on mobile, shown on md+ */}
          <div className="hidden md:block">
            <PerkList perks={leftPerks} />
          </div>

          {/* Pricing card — always shown */}
          <div className="relative bg-[rgba(12,12,12,0.9)] border border-[rgba(224,115,40,0.25)] rounded-2xl p-8 md:p-9 shadow-[0_0_60px_rgba(224,115,40,0.08)] w-full">
            <div className="text-[11px] font-bold text-[#E07328] tracking-[0.1em] uppercase mb-4">
              ✦ Everything included
            </div>
            <h3 className="text-[22px] font-bold text-[#f0ede8] tracking-[-0.5px] mb-1">
              Laso.la
            </h3>
            <p className="text-[13px] text-[rgba(240,237,232,0.45)] mb-6">
              Full platform, all features
            </p>

            {/* Price block */}
            <div className="mb-6">
              <div className="text-xs font-bold text-[#E07328] tracking-[0.08em] uppercase mb-2 font-mono">
                First 30 days — FREE
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-semibold text-[rgba(240,237,232,0.45)] font-mono">BTN</span>
                <span className="text-[52px] font-bold text-[#f0ede8] tracking-[-2px] leading-none">99</span>
              </div>
              <div className="text-[13px] text-[rgba(240,237,232,0.45)] mt-1">per month after trial</div>
              <div className="text-xs text-[rgba(240,237,232,0.3)] mt-1">+ 3% per transaction</div>
            </div>

            <div className="h-px bg-white/[0.07] mb-5" />

            {/* Features list */}
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 mb-6">
              {pricingFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px] text-[rgba(240,237,232,0.7)]">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 stroke-[#27c93f] fill-none shrink-0" strokeWidth={2}>
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="block text-center py-3.5 rounded-xl bg-[#E07328] text-white text-sm font-semibold no-underline shadow-[0_0_24px_rgba(224,115,40,0.35)] transition-all duration-200 hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)]"
            >
              Start 30-day free trial
            </Link>
            <p className="text-center text-[11px] text-[rgba(240,237,232,0.3)] mt-3">
              No credit card required to start.
            </p>
          </div>

          {/* Right perks — hidden on mobile, shown on md+ */}
          <div className="hidden md:block">
            <PerkList perks={rightPerks} />
          </div>

          {/* Mobile: show all perks combined below card */}
          <div className="md:hidden flex flex-col gap-4">
            <PerkList perks={[...leftPerks, ...rightPerks]} />
          </div>
        </div>
      </div>
    </section>
  );
}
