"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Copy, 
  ExternalLink, 
  ArrowRight, 
  Store, 
  CheckCircle2 
} from "lucide-react";

type StoreData = {
  storeName: string;
  ownerName: string;
  email: string;
  subdomain: string;
  storeUrl: string;
  createdAt: string;
};

export default function StoreSuccessPage() {
  const router = useRouter();
  
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: "Druk Gifts",
    ownerName: "Tashi Wangchuk",
    email: "tashi@drukgifts.bt",
    subdomain: "druk-gifts",
    storeUrl: "https://druk-gifts.1minuteshop.com",
    createdAt: new Date().toISOString(),
  });

  const [copied, setCopied] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(8);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Populate real user data from context or props in real implementation
  useEffect(() => {
    // TODO: Replace with real data from AuthContext or API
    // const user = auth?.user;
    // if (user) {
    //   setStoreData({
    //     storeName: user.storeName || "Your Store",
    //     ownerName: user.ownerName || "Store Owner",
    //     email: user.email || "",
    //     subdomain: user.storeSubdomain || "",
    //     storeUrl: `https://${user.storeSubdomain}.1minuteshop.com`,
    //     createdAt: new Date().toISOString(),
    //   });
    // }
  }, []);

  // Auto redirect countdown
  useEffect(() => {
    if (!autoRedirect) return;

    const timer = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/store/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, router]);

  const copyStoreUrl = async () => {
    try {
      await navigator.clipboard.writeText(storeData.storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  const goToDashboard = () => {
    router.push("/store/dashboard");
  };

  const visitStore = () => {
    window.open(storeData.storeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ede8] overflow-hidden relative">
      {/* Background Canvases */}
      <canvas id="canvas-hyperspeed" className="fixed inset-0 z-0 opacity-35 pointer-events-none" />
      <canvas id="canvas-dotgrid" className="fixed inset-0 z-1 pointer-events-none" />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E07328] rounded-lg flex items-center justify-center font-mono text-xs font-bold text-white">
              01<br />10
            </div>
            <span className="text-xl font-semibold tracking-tight">1MinuteShop</span>
          </a>

          <div className="flex items-center gap-4">
            <button
              onClick={goToDashboard}
              className="px-5 py-2 text-sm font-medium text-[#f0ede8]/70 hover:text-white transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#E07328] hover:bg-[#f07d30] text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
            >
              New Store
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(224,115,40,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_70%_80%,rgba(224,115,40,0.08),transparent_60%)]" />

          <div className="inline-flex items-center gap-2 bg-[#E07328]/10 border border-[#E07328]/30 rounded-full px-6 py-2 text-sm font-semibold text-[#E07328] mb-8">
            INSTANT • LIVE • READY
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] max-w-4xl mb-6">
            Congratulations, <span className="text-[#E07328]">{storeData.ownerName.split(" ")[0]}</span>!
            <br />
            Your store is <span className="text-[#E07328]">live</span>.
          </h1>

          <p className="text-xl md:text-2xl text-[#f0ede8]/60 max-w-2xl mx-auto mb-16">
            Built in under a minute. No code. No waiting.<br />
            Your full e-commerce store is now online and ready to sell.
          </p>

          {/* Store Card */}
          <div className="w-full max-w-2xl mx-auto bg-[#0C0C0C] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
            {/* Browser Bar */}
            <div className="h-14 bg-[#111] border-b border-white/10 flex items-center px-5 gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-lg py-1 px-4 text-xs font-mono text-[#f0ede8]/60 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                {storeData.storeUrl}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-3xl font-semibold tracking-tight">{storeData.storeName}</div>
                  <div className="text-[#E07328] text-sm font-medium mt-1">YOUR STORE • 1MINUTESHOP</div>
                </div>
                <div className="flex items-center gap-2 bg-[#27c93f]/10 text-[#27c93f] text-sm font-semibold px-5 py-1.5 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27c93f] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#27c93f]" />
                  </span>
                  LIVE NOW
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="uppercase text-xs tracking-widest text-[#f0ede8]/50 mb-1">Subdomain</div>
                  <div className="font-mono text-lg font-medium">{storeData.subdomain}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="uppercase text-xs tracking-widest text-[#f0ede8]/50 mb-1">Owner</div>
                  <div className="text-lg font-medium">{storeData.ownerName}</div>
                  <div className="text-sm text-[#f0ede8]/60">{storeData.email}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="uppercase text-xs tracking-widest text-[#f0ede8]/50 mb-1">Created</div>
                  <div className="text-lg font-medium">
                    {new Date(storeData.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="uppercase text-xs tracking-widest text-[#f0ede8]/50 mb-1">Trial</div>
                  <div className="text-[#27c93f] text-lg font-semibold">30 days free</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={copyStoreUrl}
                  className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all py-4 rounded-2xl font-medium"
                >
                  {copied ? (
                    <>✓ Copied to clipboard</>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy Store URL
                    </>
                  )}
                </button>

                <button
                  onClick={visitStore}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#E07328] hover:bg-[#f07d30] transition-all py-4 rounded-2xl font-semibold text-white"
                >
                  Visit Your Store
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 mt-16 text-center">
            <div>
              <div className="text-5xl font-bold text-[#E07328]">1</div>
              <div className="text-xs uppercase tracking-[2px] text-[#f0ede8]/50 mt-2">Minute to launch</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10 self-center" />
            <div>
              <div className="text-5xl font-bold">BTN 0</div>
              <div className="text-xs uppercase tracking-[2px] text-[#f0ede8]/50 mt-2">Upfront cost</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10 self-center" />
            <div>
              <div className="text-5xl font-bold text-[#27c93f]">30</div>
              <div className="text-xs uppercase tracking-[2px] text-[#f0ede8]/50 mt-2">Days free trial</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 text-[#E07328] text-sm font-semibold tracking-widest mb-4">
                <div className="h-px w-8 bg-[#E07328]" /> NEXT STEPS <div className="h-px w-8 bg-[#E07328]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Everything you need is already here
              </h2>
              <p className="text-[#f0ede8]/60 text-lg max-w-md mx-auto">
                Your dashboard is ready. Start adding products and watching orders roll in.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Store, title: "Auto-generated Storefront", desc: "Your beautiful store is already live at your custom subdomain." },
                { icon: Copy, title: "Product Management", desc: "Add unlimited products, images, prices, and manage stock easily." },
                { icon: ArrowRight, title: "Order Tracking", desc: "Real-time order management and customer updates." },
                { icon: CheckCircle2, title: "Built for Bhutan", desc: "Local currency (BTN), local support, and seamless experience." },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group bg-[#0C0C0C] border border-white/10 hover:border-[#E07328]/30 rounded-3xl p-8 transition-all hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-[#E07328]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-[#E07328]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-[#f0ede8]/70 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-white/10 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-5xl font-bold tracking-tighter mb-6">
              Ready to start selling?
            </h2>
            <p className="text-xl text-[#f0ede8]/60 mb-10">
              Your dashboard is waiting. Add your first product in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goToDashboard}
                className="px-10 py-4 bg-[#E07328] hover:bg-[#f07d30] text-white font-semibold rounded-2xl text-lg transition-all flex items-center justify-center gap-3"
              >
                Open Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={visitStore}
                className="px-10 py-4 border border-white/20 hover:border-white/40 font-semibold rounded-2xl text-lg transition-all"
              >
                Preview Store
              </button>
            </div>

            {autoRedirect && (
              <div className="mt-10 text-sm text-[#f0ede8]/50 flex items-center justify-center gap-2">
                Auto-redirecting to dashboard in{" "}
                <span className="font-mono font-bold text-[#E07328] text-base">{redirectCountdown}</span> seconds
                <button
                  onClick={() => setAutoRedirect(false)}
                  className="underline hover:text-white ml-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-[#f0ede8]/40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#E07328] rounded-md flex items-center justify-center font-mono text-[8px]">01<br/>10</div>
            <span>1MinuteShop — Built for Bhutan</span>
          </div>
          <div>© 2026 1MinuteShop. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}