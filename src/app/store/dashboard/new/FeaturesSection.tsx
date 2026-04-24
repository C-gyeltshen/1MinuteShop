export default function FeaturesSection() {
  return (
    <section
      className="py-[120px]"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(224,115,40,0.03) 50%, transparent)",
      }}
      id="features"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[#E07328] mb-4 before:content-[''] before:w-5 before:h-px before:bg-[#E07328]">
              Features
            </div>
            <h2
              className="font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}
            >
              Everything your store needs, out of the box
            </h2>
            <p className="text-[17px] text-[rgba(240,237,232,0.45)] leading-[1.65] max-w-[520px]">
              Built for Bhutanese sellers. Simple to use, powerful enough to
              scale.
            </p>

            <div className="mt-10 flex flex-col gap-1">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#f0ede8] fill-none" strokeWidth={1.8}>
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8m-4-4v4" />
                    </svg>
                  ),
                  title: "Auto-generated storefront",
                  desc: "A complete, polished e-commerce website is created the second you register — no design skills needed.",
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
                  desc: "Track every order, update statuses, and keep customers informed — all from your dashboard.",
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
                      <strong className="text-[#E07328]">yourstore.laso.la</strong>{" "}
                      address — free forever, no DNS hassle.
                    </>
                  ),
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 border-b border-[rgba(255,255,255,0.07)] last:border-b-0 cursor-pointer transition-all group"
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-[10px] flex items-center justify-center transition-all group-hover:bg-[rgba(224,115,40,0.15)] group-hover:border-[rgba(224,115,40,0.4)]">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#f0ede8] mb-1">
                      {f.title}
                    </h4>
                    <p className="text-sm text-[rgba(240,237,232,0.45)] leading-[1.55]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock browser */}
          <div className="relative">
            <div className="bg-[rgba(12,12,12,0.85)] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden backdrop-blur-[20px]">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f56]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#27c93f]" />
                <div className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-[6px] px-3 py-[5px] text-xs text-[rgba(240,237,232,0.45)] font-mono ml-2">
                  druk-gifts.laso.la
                </div>
              </div>

              {/* Browser content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-lg font-bold text-[#f0ede8]">
                    Druk Gifts 🛍
                  </span>
                  <span className="text-[11px] text-[#E07328] bg-[rgba(224,115,40,0.15)] border border-[rgba(224,115,40,0.2)] px-[10px] py-[3px] rounded-full">
                    ● Live
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-[10px] mb-5">
                  {[
                    { name: "Handwoven Kira", price: "BTN 2,400" },
                    { name: "Ara Bottle", price: "BTN 850" },
                    { name: "Incense Set", price: "BTN 620" },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-lg p-3"
                    >
                      <div
                        className="w-full h-[54px] rounded-md mb-2 flex items-center justify-center"
                        style={{
                          background:
                            "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 50%)",
                          backgroundSize: "6px 6px",
                        }}
                      >
                        <span className="text-[9px] text-[rgba(240,237,232,0.45)]">
                          product
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold text-[#f0ede8] mb-[2px]">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-[#E07328] font-bold">
                        {p.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[12px] font-semibold text-[rgba(240,237,232,0.45)] uppercase tracking-[0.08em] mb-[10px]">
                  Recent Orders
                </div>
                {[
                  { id: "#0041", name: "Handwoven Kira", status: "New", cls: "bg-[rgba(224,115,40,0.15)] text-[#E07328]" },
                  { id: "#0040", name: "Incense Set", status: "Shipped", cls: "bg-[rgba(59,130,246,0.12)] text-[#60a5fa]" },
                  { id: "#0039", name: "Ara Bottle", status: "Delivered", cls: "bg-[rgba(39,201,63,0.12)] text-[#27c93f]" },
                ].map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between px-[10px] py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.07)] rounded-md mb-[6px] text-[11px]"
                  >
                    <span className="text-[rgba(240,237,232,0.45)] font-mono">
                      {o.id}
                    </span>
                    <span className="text-[#f0ede8]">{o.name}</span>
                    <span className={`px-2 py-[2px] rounded-full text-[10px] font-semibold ${o.cls}`}>
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
