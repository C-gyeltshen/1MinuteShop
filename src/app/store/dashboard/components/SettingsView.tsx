"use client";
import React, { useState } from "react";
import { Check, ExternalLink, Info } from "lucide-react";

const ACCENT_COLORS = [
  { label: "Brand orange", hex: "#E07328" },
  { label: "Sky blue",     hex: "#60A5FA" },
  { label: "Emerald",      hex: "#10B981" },
  { label: "Amber",        hex: "#FBBF24" },
  { label: "Purple",       hex: "#A78BFA" },
  { label: "Teal",         hex: "#2DD4BF" },
];

const DENSITY_OPTIONS  = ["Compact", "Standard", "Relaxed"] as const;
const CORNER_OPTIONS   = ["Sharp", "Standard", "Relaxed", "Rounded"] as const;

const THEMES = [
  { name: "Purple Luxe",   dot: "#A78BFA", bg: "linear-gradient(160deg,#1a0533 0%,#0d0d1a 100%)" },
  { name: "Emerald Fresh", dot: "#10B981", bg: "linear-gradient(160deg,#021a0e 0%,#050d09 100%)" },
  { name: "Ocean Blue",    dot: "#60A5FA", bg: "linear-gradient(160deg,#021233 0%,#050b1a 100%)" },
  { name: "Rose Bold",     dot: "#F472B6", bg: "linear-gradient(160deg,#220a18 0%,#0f050b 100%)" },
  { name: "Charcoal Pro",  dot: "#9CA3AF", bg: "linear-gradient(160deg,#111113 0%,#080808 100%)" },
];

const FIELD = "w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[13px] text-[#F0EDE8] font-space-grotesk outline-none transition-colors placeholder:text-[#F0EDE8]/20";

interface SettingsViewProps {
  storeName?: string;
  email?: string;
  storeUrl?: string;
}

export default function SettingsView({ storeName, email, storeUrl }: SettingsViewProps) {
  // ── Appearance ──────────────────────────────────────────────────
  const [accentColor, setAccentColor] = useState("#E07328");
  const [density,     setDensity]     = useState<typeof DENSITY_OPTIONS[number]>("Standard");
  const [corners,     setCorners]     = useState<typeof CORNER_OPTIONS[number]>("Rounded");
  const [theme,       setTheme]       = useState("Emerald Fresh");
  const [liveTheme,   setLiveTheme]   = useState("Charcoal Pro");

  // ── Store profile ────────────────────────────────────────────────
  const [profileName,    setProfileName]    = useState(storeName ?? "");
  const [description,    setDescription]    = useState("");
  const [contactEmail,   setContactEmail]   = useState(email ?? "");
  const [contactPhone,   setContactPhone]   = useState("");
  const [pickupAddress,  setPickupAddress]  = useState("");

  // ── Commerce ─────────────────────────────────────────────────────
  const [tax,             setTax]             = useState("0");
  const [shippingEnabled, setShippingEnabled] = useState(true);
  const [shippingCost,    setShippingCost]    = useState("60");

  const displayUrl = storeUrl ?? `https://${(storeName ?? "my-store").toLowerCase().replace(/\s+/g, "-")}.laso.la`;
  const shortUrl   = displayUrl.replace("https://", "");

  const selectedTheme = THEMES.find(t => t.name === theme) ?? THEMES[1];

  const handleReset = () => {
    setProfileName(storeName ?? "");
    setDescription("");
    setContactEmail(email ?? "");
    setContactPhone("");
    setPickupAddress("");
    setTax("0");
    setShippingEnabled(true);
    setShippingCost("60");
  };

  return (
    <div className="flex flex-col gap-5 pb-4">

      {/* ── Dashboard appearance ─────────────────────────────────── */}
      <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-6">
        <h2 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk mb-1">
          Dashboard appearance
        </h2>
        <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk mb-6">
          Customize how the dashboard looks — just for you
        </p>

        {/* Accent color */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#F0EDE8]/34 font-space-grotesk mb-3">
            Accent color
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setAccentColor(c.hex)}
                title={c.label}
                className="relative w-9 h-9 rounded-[10px] transition-all duration-150 hover:scale-110 shrink-0"
                style={{ background: c.hex, boxShadow: accentColor === c.hex ? `0 0 0 2px #131316, 0 0 0 3.5px ${c.hex}` : "none" }}
              >
                {accentColor === c.hex && (
                  <Check size={14} className="text-white absolute inset-0 m-auto drop-shadow" />
                )}
              </button>
            ))}
            <span className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk">
              {ACCENT_COLORS.find(c => c.hex === accentColor)?.label}
            </span>
          </div>
        </div>

        {/* Density */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#F0EDE8]/34 font-space-grotesk mb-3">
            Density
          </p>
          <div className="flex items-center gap-2">
            {DENSITY_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`px-4 py-2 rounded-[8px] text-[12.5px] font-semibold font-space-grotesk border transition-all duration-150
                  ${density === d
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white/[0.04] text-[#F0EDE8]/46 border-white/[0.08] hover:border-white/[0.16] hover:text-[#F0EDE8]/72"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Corners */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[#F0EDE8]/34 font-space-grotesk mb-3">
            Corners
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {CORNER_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCorners(c)}
                className={`px-4 py-2 rounded-[8px] text-[12.5px] font-semibold font-space-grotesk border transition-all duration-150
                  ${corners === c
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white/[0.04] text-[#F0EDE8]/46 border-white/[0.08] hover:border-white/[0.16] hover:text-[#F0EDE8]/72"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Storefront theme ─────────────────────────────────────── */}
      <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] overflow-hidden">
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk mb-1">
                Storefront theme
              </h2>
              <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk">
                Style your public store — changes apply to your live storefront
              </p>
            </div>
            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors font-space-grotesk shrink-0"
            >
              Open storefront <ExternalLink size={13} />
            </a>
          </div>

          {/* Theme selector pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12.5px] font-semibold font-space-grotesk border transition-all duration-150
                  ${theme === t.name
                    ? "text-white"
                    : "bg-white/[0.04] text-[#F0EDE8]/58 border-white/[0.08] hover:border-white/[0.16] hover:text-[#F0EDE8]/72"
                  }`}
                style={theme === t.name
                  ? { background: `${t.dot}22`, borderColor: `${t.dot}55`, color: t.dot }
                  : {}}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.dot }} />
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Live store preview */}
        <div className="mx-6 mb-0 rounded-[12px] overflow-hidden border border-white/[0.08]">
          {/* Browser chrome bar */}
          <div className="bg-[#0d0d0f] border-b border-white/[0.07] px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.05] border border-white/[0.07] rounded-[6px] w-full max-w-[280px]">
                <span className="w-2 h-2 rounded-full bg-dm-success shrink-0" />
                <span className="text-[11px] text-[#F0EDE8]/46 font-space-mono truncate">{shortUrl}</span>
              </div>
            </div>
          </div>

          {/* Store mockup */}
          <div style={{ background: selectedTheme.bg }}>
            {/* Navbar */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-white/[0.06]">
              <span className="text-[14px] font-bold font-space-grotesk" style={{ color: selectedTheme.dot }}>
                {storeName ?? "My Store"} 🛍
              </span>
              <div className="hidden sm:flex items-center gap-6 text-[11.5px] text-[#F0EDE8]/40 font-space-grotesk">
                <span>Shop</span><span>About</span><span>Contact</span>
              </div>
              <span
                className="text-[11px] font-bold font-space-mono px-3 py-1.5 rounded-full"
                style={{ background: `${selectedTheme.dot}22`, color: selectedTheme.dot, border: `1px solid ${selectedTheme.dot}44` }}
              >
                Cart (0)
              </span>
            </div>

            {/* Hero */}
            <div className="flex items-center px-8 py-8 gap-6">
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-[0.14em] font-space-grotesk mb-2" style={{ color: selectedTheme.dot }}>
                  New arrivals · Spring 2025
                </p>
                <h3 className="text-[22px] font-bold text-[#F0EDE8] font-space-grotesk leading-[1.2] mb-3">
                  Discover your<br />next favourite<br />product
                </h3>
                <p className="text-[11.5px] text-[#F0EDE8]/46 font-space-grotesk mb-4 max-w-[220px] leading-relaxed">
                  Curated collection of premium products handpicked for quality and style.
                </p>
                <button
                  className="px-4 py-2 rounded-[8px] text-[11.5px] font-semibold font-space-grotesk text-white"
                  style={{ background: selectedTheme.dot }}
                >
                  Shop now →
                </button>
              </div>
              <div
                className="w-28 h-28 rounded-[14px] flex items-center justify-center shrink-0"
                style={{ background: `${selectedTheme.dot}18`, border: `1px solid ${selectedTheme.dot}22` }}
              >
                <span className="text-5xl">📦</span>
              </div>
            </div>

            {/* Featured products */}
            <div className="px-8 pb-6">
              <p className="text-[9px] uppercase tracking-[0.12em] text-[#F0EDE8]/28 font-space-grotesk mb-3">
                Featured products
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: "Wireless Earbuds Pro", price: "Nu. 3,499" },
                  { name: "Ceramic Coffee Mug",   price: "Nu. 649" },
                  { name: "Leather Bifold Wallet", price: "Nu. 1,299" },
                  { name: "Canvas Daypack",         price: "Nu. 1,899" },
                ].map((p) => (
                  <div key={p.name} className="rounded-[10px] overflow-hidden border border-white/[0.06]">
                    <div
                      className="h-16 flex items-center justify-center"
                      style={{ background: `${selectedTheme.dot}14` }}
                    >
                      <span className="text-2xl">🛍</span>
                    </div>
                    <div className="px-2.5 py-2 bg-white/[0.03]">
                      <p className="text-[9.5px] font-semibold text-[#F0EDE8] font-space-grotesk truncate">{p.name}</p>
                      <p className="text-[9px] font-space-mono mt-0.5" style={{ color: selectedTheme.dot }}>{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Publish bar */}
        <div className="flex items-center justify-between px-6 py-4 mt-0 border-t border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center gap-2 text-[12.5px] text-dm-success font-space-grotesk">
            <span className="w-2 h-2 rounded-full bg-dm-success" />
            {liveTheme} is live on your storefront
          </div>
          <button
            onClick={() => setLiveTheme(theme)}
            className="px-4 py-2 rounded-[10px] text-[13px] font-semibold font-space-grotesk text-white transition-all hover:opacity-90"
            style={{ background: "#E07328", boxShadow: "0 0 16px rgba(224,115,40,0.28)" }}
          >
            Publish to storefront
          </button>
        </div>
      </div>

      {/* ── Store profile + Commerce ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Store profile */}
        <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-6">
          <h2 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk mb-1">Store profile</h2>
          <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk mb-5">
            Shown on your storefront and receipts
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                Store name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                placeholder="Your store name"
                className={FIELD}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                Description
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Tell customers about your store…"
                className={`${FIELD} resize-none`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                Contact email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                className={FIELD}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                Contact phone
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="+975 17 000 000"
                className={FIELD}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                Pickup address
              </label>
              <input
                type="text"
                value={pickupAddress}
                onChange={e => setPickupAddress(e.target.value)}
                placeholder="Street, City, Country"
                className={FIELD}
              />
            </div>
          </div>
        </div>

        {/* Commerce */}
        <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-6">
          <h2 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk mb-1">Commerce</h2>
          <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk mb-5">
            Currency, tax and shipping
          </p>

          <div className="space-y-5">
            {/* Currency + Tax */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                  Currency
                </label>
                <div className="flex items-center justify-between px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[13px] text-[#F0EDE8] font-space-grotesk cursor-not-allowed opacity-60">
                  <span>Nu. (BTN)</span>
                  <span className="text-[10px] text-[#F0EDE8]/34">▼</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                  Tax (%)
                </label>
                <input
                  type="number"
                  value={tax}
                  onChange={e => setTax(e.target.value)}
                  min="0"
                  max="100"
                  className={FIELD}
                />
              </div>
            </div>

            {/* Enable shipping toggle */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] font-semibold text-[#F0EDE8] font-space-grotesk">
                    Enable shipping
                  </p>
                  <p className="text-[11.5px] text-[#F0EDE8]/46 font-space-grotesk mt-0.5">
                    Charge a flat delivery fee at checkout
                  </p>
                </div>
                <button
                  onClick={() => setShippingEnabled(v => !v)}
                  className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
                  style={{ background: shippingEnabled ? "#E07328" : "rgba(255,255,255,0.12)" }}
                  aria-label="Toggle shipping"
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
                    style={{ left: shippingEnabled ? "calc(100% - 22px)" : "2px" }}
                  />
                </button>
              </div>

              {shippingEnabled && (
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <label className="block text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.07em] font-space-grotesk mb-1.5">
                    Shipping cost (Nu.)
                  </label>
                  <input
                    type="number"
                    value={shippingCost}
                    onChange={e => setShippingCost(e.target.value)}
                    min="0"
                    className={FIELD}
                  />
                </div>
              )}
            </div>

            {/* Transaction fee notice */}
            <div className="flex items-start gap-2.5 px-4 py-3.5 rounded-[10px] bg-white/[0.03] border border-white/[0.07]">
              <Info size={14} className="text-[#F0EDE8]/34 mt-0.5 shrink-0" />
              <p className="text-[12px] text-[#F0EDE8]/46 font-space-grotesk leading-relaxed">
                <span className="font-semibold text-[#F0EDE8]/72">1MinuteShop</span> charges a flat{" "}
                <span className="font-semibold text-brand-orange">5% transaction fee</span>. No monthly or maintenance fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Actions ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pb-2">
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-[10px] border border-white/[0.08] text-[13px] font-semibold text-[#F0EDE8]/58 hover:bg-white/[0.06] transition-colors font-space-grotesk"
        >
          Reset
        </button>
        <button
          className="px-5 py-2.5 rounded-[10px] text-[13px] font-semibold text-white font-space-grotesk hover:opacity-90 transition-opacity"
          style={{ background: "#E07328", boxShadow: "0 0 16px rgba(224,115,40,0.25)" }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
