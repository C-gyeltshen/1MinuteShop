import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-[120px] relative text-center">
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 300,
          background: "rgba(224,115,40,0.07)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        <h2
          className="font-bold tracking-[-1.5px] leading-[1.1] text-[#f0ede8] mb-5"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          Ready to open your store?
        </h2>
        <p className="text-[18px] text-[rgba(240,237,232,0.45)] max-w-[480px] mx-auto mb-10 leading-[1.65]">
          Join store owners building their business on laso.la — free for your
          first 30 days.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-8 py-[14px] rounded-[10px] text-[15px] font-semibold no-underline cursor-pointer transition-all bg-[#E07328] text-white shadow-[0_0_24px_rgba(224,115,40,0.35)] hover:bg-[#f07d30] hover:shadow-[0_0_36px_rgba(224,115,40,0.5)] hover:-translate-y-px"
        >
          Get started free →
        </Link>
      </div>
    </section>
  );
}
