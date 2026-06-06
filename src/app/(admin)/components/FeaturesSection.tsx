"use client";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#f0ede8] fill-none" strokeWidth={1.8}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: "Auto-generated storefront",
    desc: "A complete, polished e-commerce website is created the second you register, no design skills needed.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#f0ede8] fill-none" strokeWidth={1.8}>
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Product management",
    desc: "Add, edit, and organise your entire catalogue. Upload images, set prices, and manage stock effortlessly.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#f0ede8] fill-none" strokeWidth={1.8}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: "Order management",
    desc: "Track every order, update statuses, and keep customers informed all from your dashboard.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#f0ede8] fill-none" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Free subdomain included",
    desc: (
      <>
        Your store gets a clean{" "}
        <strong className="text-[#E07328]">yourstore.laso.la</strong> address free
        forever, no DNS hassle.
      </>
    ),
  },
];

const mockOrders = [
  { id: "#0041", item: "Handwoven Kira", status: "New", cls: "bg-[rgba(224,115,40,0.15)] text-[#E07328]" },
  { id: "#0040", item: "Incense Set", status: "Shipped", cls: "bg-[rgba(59,130,246,0.12)] text-[#60a5fa]" },
  { id: "#0039", item: "Ara Bottle", status: "Delivered", cls: "bg-[rgba(39,201,63,0.12)] text-[#27c93f]" },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 md:py-[120px]"
      style={{ background: "linear-gradient(to bottom, transparent, rgba(224,115,40,0.03) 50%, transparent)" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">

          {/* Left: text + feature list */}
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#E07328] mb-4">
              <span className="w-5 h-px bg-[#E07328] inline-block" />
              Features
            </div>
            <h2 className="text-[clamp(26px,3.5vw,46px)] font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-4">
              Everything your store needs, out of the box
            </h2>
            <p className="text-[17px] text-[rgba(240,237,232,0.45)] leading-relaxed max-w-[520px]">
              Built for Bhutanese sellers. Simple to use, powerful enough to scale.
            </p>

            <div className="mt-10 flex flex-col gap-1">
              {features.map((f, i) => (
                <FeatureItem key={i} feature={f} />
              ))}
            </div>
          </div>

          {/* Right: mock browser — hidden on small, shown on lg */}
          <div className="hidden lg:block relative">
            <div className="bg-[rgba(12,12,12,0.85)] border border-white/[0.07] rounded-[14px] overflow-hidden backdrop-blur-xl">

              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <div className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-md px-3 py-1 text-xs text-[rgba(240,237,232,0.45)] font-mono ml-2">
                  druk-gifts.laso.la
                </div>
              </div>

              {/* Browser content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-lg font-bold text-[#f0ede8]">Druk Gifts 🛍</span>
                  <span className="text-[11px] text-[#E07328] bg-[rgba(224,115,40,0.15)] border border-[rgba(224,115,40,0.2)] px-2.5 py-0.5 rounded-full">
                    ● Live
                  </span>
                </div>

                {/* Mock products */}
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {[
                    { name: "Handwoven Kira", price: "BTN 2,400" },
                    { name: "Ara Bottle", price: "BTN 850" },
                    { name: "Incense Set", price: "BTN 620" },
                  ].map((p, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-3">
                      <div
                        className="w-full h-[54px] rounded-md mb-2 flex items-center justify-center"
                        style={{
                          background: "repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 0,transparent 50%)",
                          backgroundSize: "6px 6px",
                        }}
                      >
                        <span className="text-[9px] text-[rgba(240,237,232,0.45)]">product</span>
                      </div>
                      <div className="text-[10px] font-semibold text-[#f0ede8] mb-0.5">{p.name}</div>
                      <div className="text-[10px] font-bold text-[#E07328]">{p.price}</div>
                    </div>
                  ))}
                </div>

                {/* Mock orders */}
                <div className="text-xs font-semibold text-[rgba(240,237,232,0.45)] uppercase tracking-[0.08em] mb-2.5">
                  Recent Orders
                </div>
                {mockOrders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between px-2.5 py-2 bg-white/[0.02] border border-white/[0.07] rounded-md mb-1.5 text-[11px]"
                  >
                    <span className="text-[rgba(240,237,232,0.45)] font-mono">{o.id}</span>
                    <span className="text-[#f0ede8]">{o.item}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${o.cls}`}>
                      {o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature }: { feature: (typeof features)[0] }) {
  return (
    <div className="group flex items-start gap-4 py-5 border-b border-white/[0.07] last:border-0 cursor-pointer transition-all duration-200">
      <div className="feature-icon w-10 h-10 shrink-0 bg-white/[0.03] border border-white/[0.07] rounded-[10px] flex items-center justify-center transition-all duration-200 group-hover:bg-[rgba(224,115,40,0.15)] group-hover:border-[rgba(224,115,40,0.4)]">
        {feature.icon}
      </div>
      <div>
        <h4 className="text-base font-semibold text-[#f0ede8] mb-1">{feature.title}</h4>
        <p className="text-sm text-[rgba(240,237,232,0.45)] leading-[1.55]">{feature.desc}</p>
      </div>
    </div>
  );
}
