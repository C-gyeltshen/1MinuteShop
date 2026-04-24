export default function DomainSection() {
  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="bg-[rgba(12,12,12,0.85)] border border-[rgba(255,255,255,0.07)] rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 relative overflow-hidden">
          {/* Glow */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 400,
              height: 400,
              background: "rgba(224,115,40,0.05)",
              top: "50%",
              right: -100,
              transform: "translateY(-50%)",
            }}
          />

          <div className="relative z-10 max-w-lg">
            <h2
              className="font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 38px)" }}
            >
              Your own corner of the web — free.
            </h2>
            <p className="text-[16px] text-[rgba(240,237,232,0.45)] leading-[1.65]">
              Every store on laso.la gets a clean, professional subdomain at no
              cost. Share it anywhere, no technical setup required.
            </p>
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            {["yourstore", "druk-crafts", "mountain-goods"].map((name) => (
              <div
                key={name}
                className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl px-5 py-3 transition-all hover:border-[rgba(224,115,40,0.3)] hover:bg-[rgba(224,115,40,0.05)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#E07328] flex-shrink-0" />
                <span className="font-mono text-[15px] text-[#f0ede8] font-semibold">
                  {name}
                </span>
                <em className="not-italic font-mono text-[15px] text-[rgba(240,237,232,0.45)]">
                  .laso.la
                </em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
