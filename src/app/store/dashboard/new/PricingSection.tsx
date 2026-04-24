import Link from "next/link";

export default function PricingSection() {
  const leftPerks = [
    {
      bold: "30-day free trial",
      rest: "— explore every feature with zero commitment.",
    },
    {
      bold: "No maintenance fee",
      rest: "— ever. We don't charge you just to keep the lights on.",
    },
    { bold: "Cancel anytime", rest: "— no lock-ins, no surprises." },
  ];

  const rightPerks = [
    {
      bold: "3% transaction fee",
      rest: "— only when you make a sale. We grow with you.",
    },
    {
      bold: "Instant store generation",
      rest: "— live in under 1 minute from signup.",
    },
    {
      bold: "Built for Bhutan",
      rest: "— local currency, local sellers, real support.",
    },
  ];

  const CheckIcon = () => (
    <div className="w-5 h-5 rounded-full bg-[rgba(224,115,40,0.15)] border border-[rgba(224,115,40,0.3)] flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-[#E07328] fill-none" strokeWidth={1.8}>
        <path d="M2 6l3 3 5-5" />
      </svg>
    </div>
  );

  return (
    <section className="py-[120px]" id="pricing">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#E07328] mb-4">
            Pricing
          </div>
          <h2
            className="font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}
          >
            Simple, honest pricing
          </h2>
          <p className="text-[17px] text-[rgba(240,237,232,0.45)] leading-[1.65] max-w-[520px] mx-auto">
            No maintenance fees. Pay only when your business succeeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px_1fr] gap-6 items-center max-w-[900px] mx-auto">
          {/* Left perks */}
          <div className="flex flex-col gap-5">
            {leftPerks.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckIcon />
                <p className="text-[14px] text-[rgba(240,237,232,0.6)] leading-[1.55]">
                  <strong className="text-[#f0ede8]">{p.bold}</strong> {p.rest}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing card */}
          <div className="bg-[rgba(12,12,12,0.85)] border border-[rgba(224,115,40,0.25)] rounded-2xl overflow-hidden backdrop-blur-[20px] shadow-[0_0_60px_rgba(224,115,40,0.08)]">
            <div className="bg-[rgba(224,115,40,0.12)] border-b border-[rgba(224,115,40,0.2)] px-6 py-3 text-center text-[12px] font-bold text-[#E07328] tracking-[0.08em] uppercase">
              ✦ Everything included
            </div>
            <div className="p-7">
              <h3 className="text-xl font-bold text-[#f0ede8] mb-1">
                1MinuteShop
              </h3>
              <p className="text-[13px] text-[rgba(240,237,232,0.45)] mb-6">
                Full platform, all features
              </p>

              <div className="mb-6">
                <div className="inline-block bg-[rgba(224,115,40,0.12)] border border-[rgba(224,115,40,0.2)] rounded-full px-3 py-1 text-[11px] text-[#E07328] font-semibold mb-3">
                  First 30 days — FREE
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-sm text-[rgba(240,237,232,0.45)] font-mono">
                    BTN
                  </span>
                  <span className="text-[52px] font-bold text-[#f0ede8] tracking-[-2px] leading-none">
                    99
                  </span>
                </div>
                <div className="text-[13px] text-[rgba(240,237,232,0.45)]">
                  per month after trial
                </div>
                <div className="text-[12px] text-[#E07328] font-semibold mt-1">
                  + 3% per transaction
                </div>
              </div>

              <div className="h-px bg-[rgba(255,255,255,0.07)] mb-6" />

              <ul className="flex flex-col gap-[10px] mb-7">
                {[
                  <><strong>Auto-generated storefront</strong></>,
                  <>Free <strong>yourstore.laso.la</strong> domain</>,
                  <>Unlimited products</>,
                  <>Order management dashboard</>,
                  <>No maintenance fees</>,
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-[10px] text-[14px] text-[rgba(240,237,232,0.7)]"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 stroke-[#E07328] fill-none flex-shrink-0"
                      strokeWidth={1.8}
                    >
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="flex w-full justify-center items-center px-4 py-[14px] rounded-xl text-sm font-semibold no-underline cursor-pointer transition-all bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
              >
                Start 30-day free trial
              </Link>
              <p className="text-center text-[11px] text-[rgba(240,237,232,0.3)] mt-3">
                No credit card required to start.
              </p>
            </div>
          </div>

          {/* Right perks */}
          <div className="flex flex-col gap-5">
            {rightPerks.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckIcon />
                <p className="text-[14px] text-[rgba(240,237,232,0.6)] leading-[1.55]">
                  <strong className="text-[#f0ede8]">{p.bold}</strong> {p.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
