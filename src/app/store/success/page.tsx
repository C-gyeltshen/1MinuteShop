"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  ExternalLink,
  ArrowRight,
  Store,
  CheckCircle2,
} from "lucide-react";
import { AuthContext } from "@/app/shared/store/authStore";
import LandingNavbar from "@/app/(admin)/components/Navbar";
import LandingFooter from "@/app/(admin)/components/Footer";

type StoreData = {
  storeName: string;
  ownerName: string;
  email: string;
  subdomain: string;
  storeUrl: string;
  createdAt: string;
};

export default function StoreSuccessPage() {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const router = useRouter();

  const [storeData, setStoreData] = useState<StoreData>({
    storeName: user?.storeName || "Store Name",
    ownerName: user?.ownerName || "Owner Name",
    email: user?.email || "",
    subdomain: user?.storeSubdomain || "",
    storeUrl: user?.storeUrl || "",
    createdAt: user?.createdAt || new Date().toISOString(),
  });

  const [copied, setCopied] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(8);
  const [autoRedirect, setAutoRedirect] = useState(true);

  // Keep a ref so the interval never closes over a stale value
  const autoRedirectRef = useRef(autoRedirect);
  useEffect(() => {
    autoRedirectRef.current = autoRedirect;
  }, [autoRedirect]);

  // Populate store data from auth context
  useEffect(() => {
    if (user) {
      setStoreData({
        storeName: user.storeName || "Your Store",
        ownerName: user.ownerName || "Store Owner",
        email: user.email || "",
        subdomain: user.storeSubdomain || "",
        storeUrl: user.storeUrl || "",
        createdAt: user.createdAt || new Date().toISOString(),
      });
    }
  }, [user]);

  // Tick the countdown every second
  useEffect(() => {
    if (!autoRedirect) return;
    const timer = setInterval(() => {
      setRedirectCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [autoRedirect]);

  // Redirect AFTER render, in a separate effect watching the count — never inside setState
  useEffect(() => {
    if (autoRedirect && redirectCountdown === 0) {
      router.push("/store/dashboard");
    }
  }, [redirectCountdown, autoRedirect, router]);

  const copyStoreUrl = async () => {
    try {
      await navigator.clipboard.writeText(storeData.storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  const goToDashboard = () => router.push("/store/dashboard");
  const visitStore = () =>
    window.open(storeData.storeUrl, "_blank", "noopener,noreferrer");

  const firstName = storeData.ownerName.split(" ")[0];

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ede8] overflow-x-hidden relative">
      {/* Background Canvases */}
      <canvas id="canvas-hyperspeed" className="fixed inset-0 z-0 opacity-35 pointer-events-none" />
      <canvas id="canvas-dotgrid" className="fixed inset-0 z-1 pointer-events-none" />

      <div className="relative z-10">
        {/* ── Navigation ── */}
        <LandingNavbar />

        {/* ── Hero Section ── */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24 relative">
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_20%,rgba(224,115,40,0.12),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_70%_80%,rgba(224,115,40,0.08),transparent_60%)]" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E07328]/10 border border-[#E07328]/30 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#E07328] mb-6 sm:mb-8">
            INSTANT • LIVE • READY
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] max-w-4xl mb-4 sm:mb-6 px-2">
            Congratulations,{" "}
            <span className="text-[#E07328]">{firstName}</span>!
            <br />
            Your store is <span className="text-[#E07328]">live</span>.
          </h1>

          <p className="text-sm sm:text-xl md:text-2xl text-[#f0ede8]/60 max-w-xl mx-auto mb-10 sm:mb-16 px-2">
            Built in under a minute. No code. No waiting.{" "}
            Your full e-commerce store is now online and ready to sell.
          </p>

          {/* ── Store Card ── */}
          <div className="w-full max-w-2xl mx-auto bg-[#0C0C0C] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
            {/* Browser Bar */}
            <div className="h-11 sm:h-14 bg-[#111] border-b border-white/10 flex items-center px-3 sm:px-5 gap-2 sm:gap-3">
              <div className="flex gap-1 sm:gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex-1 min-w-0 bg-[#1A1A1A] border border-white/10 rounded-md sm:rounded-lg py-1 px-2 sm:px-4 text-[10px] sm:text-xs font-mono text-[#f0ede8]/60 text-center overflow-hidden text-ellipsis whitespace-nowrap">
                {storeData.storeUrl}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-8 md:p-10">
              {/* Store Header */}
              <div className="flex flex-row justify-between items-start gap-3 mb-6 sm:mb-8">
                <div className="min-w-0">
                  <div className="text-lg sm:text-3xl font-semibold tracking-tight truncate">
                    {storeData.storeName}
                  </div>
                  <div className="text-[#E07328] text-[10px] sm:text-sm font-medium mt-1">
                    YOUR STORE • 1MINUTESHOP
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-[#27c93f]/10 text-[#27c93f] text-[10px] sm:text-sm font-semibold px-2.5 sm:px-5 py-1 sm:py-1.5 rounded-full shrink-0">
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27c93f] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#27c93f]" />
                  </span>
                  LIVE NOW
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-10">
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="uppercase text-[9px] sm:text-xs tracking-widest text-[#f0ede8]/50 mb-1">
                    Subdomain
                  </div>
                  <div className="font-mono text-xs sm:text-lg font-medium break-all">
                    {storeData.subdomain}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="uppercase text-[9px] sm:text-xs tracking-widest text-[#f0ede8]/50 mb-1">
                    Owner
                  </div>
                  <div className="text-xs sm:text-lg font-medium truncate">{storeData.ownerName}</div>
                  <div className="text-[10px] sm:text-sm text-[#f0ede8]/60 truncate">{storeData.email}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="uppercase text-[9px] sm:text-xs tracking-widest text-[#f0ede8]/50 mb-1">
                    Created
                  </div>
                  <div className="text-xs sm:text-lg font-medium">
                    {new Date(storeData.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="uppercase text-[9px] sm:text-xs tracking-widest text-[#f0ede8]/50 mb-1">
                    Trial
                  </div>
                  <div className="text-[#27c93f] text-xs sm:text-lg font-semibold">30 days free</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={copyStoreUrl}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium"
                >
                  {copied ? (
                    <>✓ Copied!</>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                      Copy Store URL
                    </>
                  )}
                </button>

                <button
                  onClick={visitStore}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#E07328] hover:bg-[#f07d30] transition-all py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold text-white"
                >
                  Visit Your Store
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-6 mt-12 sm:mt-16 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#E07328]">1</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[2px] text-[#f0ede8]/50 mt-2">
                Minute to launch
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10 self-center" />
            <div>
              <div className="text-4xl sm:text-5xl font-bold">BTN 0</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[2px] text-[#f0ede8]/50 mt-2">
                Upfront cost
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10 self-center" />
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#27c93f]">30</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-[2px] text-[#f0ede8]/50 mt-2">
                Days free trial
              </div>
            </div>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section className="py-16 sm:py-24 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-3 text-[#E07328] text-xs sm:text-sm font-semibold tracking-widest mb-4">
                <div className="h-px w-6 sm:w-8 bg-[#E07328]" />
                NEXT STEPS
                <div className="h-px w-6 sm:w-8 bg-[#E07328]" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 px-2">
                Everything you need is already here
              </h2>
              <p className="text-[#f0ede8]/60 text-sm sm:text-lg max-w-md mx-auto">
                Your dashboard is ready. Start adding products and watching orders roll in.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  icon: Store,
                  title: "Auto-generated Storefront",
                  desc: "Your beautiful store is already live at your custom subdomain.",
                },
                {
                  icon: Copy,
                  title: "Product Management",
                  desc: "Add unlimited products, images, prices, and manage stock easily.",
                },
                {
                  icon: ArrowRight,
                  title: "Order Tracking",
                  desc: "Real-time order management and customer updates.",
                },
                {
                  icon: CheckCircle2,
                  title: "Built for Bhutan",
                  desc: "Local currency (BTN), local support, and seamless experience.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group bg-[#0C0C0C] border border-white/10 hover:border-[#E07328]/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E07328]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#E07328]" />
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-[#f0ede8]/70 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-14 sm:py-20 border-t border-white/10 text-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter mb-4 sm:mb-6">
              Ready to start selling?
            </h2>
            <p className="text-sm sm:text-xl text-[#f0ede8]/60 mb-8 sm:mb-10">
              Your dashboard is waiting. Add your first product in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={goToDashboard}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#E07328] hover:bg-[#f07d30] text-white font-semibold rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all flex items-center justify-center gap-3"
              >
                Open Dashboard
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={visitStore}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border border-white/20 hover:border-white/40 font-semibold rounded-xl sm:rounded-2xl text-base sm:text-lg transition-all"
              >
                Preview Store
              </button>
            </div>

            {autoRedirect && (
              <div className="mt-8 sm:mt-10 text-xs sm:text-sm text-[#f0ede8]/50 flex items-center justify-center gap-2 flex-wrap">
                Auto-redirecting to dashboard in{" "}
                <span className="font-mono font-bold text-[#E07328] text-sm sm:text-base">
                  {redirectCountdown}
                </span>{" "}
                seconds
                <button
                  onClick={() => setAutoRedirect(false)}
                  className="underline hover:text-white ml-1"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ── Footer ── */}
      <LandingFooter />
    </div>
  );
}