"use client";

const steps = [
  {
    num: "01 ——",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#E07328] fill-none" strokeWidth={1.8}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Register your store",
    desc: "Sign up and fill in your store details. That's it — we do the rest.",
    hasArrow: true,
  },
  {
    num: "02 ——",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#E07328] fill-none" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Go live instantly",
    desc: (
      <>
        Your full e-commerce site is generated and published at{" "}
        <strong className="text-[#E07328]">yourstore.laso.la</strong> — no setup required.
      </>
    ),
    hasArrow: true,
  },
  {
    num: "03 ——",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#E07328] fill-none" strokeWidth={1.8}>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Manage & grow",
    desc: "Add products, track orders, and manage everything from one clean dashboard.",
    hasArrow: false,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="py-20 md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#E07328] mb-4">
            How it works
          </div>
          <h2 className="text-[clamp(26px,3.5vw,46px)] font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-4">
            Three steps to a live store
          </h2>
          <p className="text-[17px] text-[rgba(240,237,232,0.45)] leading-relaxed max-w-[520px] mx-auto">
            No developers, no configuration headaches. Your store is auto-generated and
            ready to sell.
          </p>
        </div>

        {/* Steps — 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: (typeof steps)[0] }) {
  return (
    <div className="group relative bg-[rgba(12,12,12,0.85)] p-8 md:p-12 transition-colors duration-200 hover:bg-[rgba(16,16,16,0.95)] cursor-default">
      <div className="font-mono text-[11px] font-bold text-[#E07328] tracking-[0.1em] mb-6">
        {step.num}
      </div>
      <div className="w-[52px] h-[52px] bg-[rgba(224,115,40,0.15)] border border-[rgba(224,115,40,0.25)] rounded-xl flex items-center justify-center mb-6">
        {step.icon}
      </div>
      <h3 className="text-xl font-bold tracking-[-0.5px] mb-3 text-[#f0ede8]">
        {step.title}
      </h3>
      <p className="text-[15px] text-[rgba(240,237,232,0.45)] leading-relaxed">
        {step.desc}
      </p>

      {/* Connector arrow — hidden on mobile, visible on md+ */}
      {step.hasArrow && (
        <div className="hidden md:flex absolute top-12 -right-[14px] w-7 h-7 bg-[#080808] border border-white/[0.07] rounded-full items-center justify-center z-10">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#E07328] fill-none" strokeWidth={2.5}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      )}
    </div>
  );
}
