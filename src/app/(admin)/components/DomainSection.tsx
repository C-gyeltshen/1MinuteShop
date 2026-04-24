"use client";

const domains = [
  { store: "yourstore", tld: ".laso.la" },
  { store: "druk-crafts", tld: ".laso.la" },
  { store: "mountain-goods", tld: ".laso.la" },
];

export default function DomainSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-12">

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h2 className="text-[clamp(20px,2.5vw,32px)] font-bold tracking-[-1px] text-[#f0ede8] mb-3">
              Your own corner of the web — free.
            </h2>
            <p className="text-[15px] text-[rgba(240,237,232,0.45)] leading-relaxed max-w-[420px]">
              Every store on Laso.la gets a clean, professional subdomain at no cost. Share
              it anywhere, no technical setup required.
            </p>
          </div>

          {/* Domain pills */}
          <div className="flex flex-col gap-2.5 w-full md:w-auto md:min-w-[260px]">
            {domains.map((d, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full px-5 py-2.5 text-sm font-mono text-[#f0ede8] transition-all duration-200 hover:border-[rgba(224,115,40,0.3)] hover:bg-[rgba(224,115,40,0.05)] cursor-default"
              >
                <span className="w-1.5 h-1.5 bg-[#27c93f] rounded-full shrink-0 inline-block" />
                <span>{d.store}</span>
                <em className="text-[#E07328] not-italic">{d.tld}</em>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
