"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Menu, Bell, Store, Copy, Check, ExternalLink, Search, X, Package, ShoppingBag, Download, CreditCard, ArrowRight } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { DashboardHeaderProps } from "./Types";

const PAGE_TITLES: Record<string, [string, string]> = {
  dashboard: ["Dashboard", "Overview of your store's performance"],
  orders:    ["Orders",    "Review, verify and fulfil customer orders"],
  products:  ["Products",  "Manage your catalogue and stock"],
  settings:  ["Settings",  "Store profile, commerce and appearance"],
};

interface TopbarProps extends DashboardHeaderProps {
  activeTab?: string;
  notificationCount?: number;
}

const DashboardHeader: React.FC<TopbarProps> = ({
  storeName,
  ownerName,
  isMobileMenuOpen,
  storeUrl,
  onToggleMobileMenu,
  activeTab = "dashboard",
  notificationCount = 0,
  products = [],
  orders = [],
  onSearchSelect,
}) => {
  const [pillOpen, setPillOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pillRef = useRef<HTMLButtonElement>(null);
  const pillMenuRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const notifBtnRef = useRef<HTMLButtonElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const displayUrl = storeUrl ?? "";
  const shortUrl = displayUrl.replace(/^https?:\/\//, "");

  const handleDownloadQr = useCallback(() => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${(storeName ?? "store").toLowerCase().replace(/\s+/g, "-")}-qr.png`;
    a.click();
  }, [storeName]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(displayUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = displayUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [displayUrl]);

  useEffect(() => {
    if (!pillOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        pillMenuRef.current &&
        !pillMenuRef.current.contains(e.target as Node) &&
        pillRef.current &&
        !pillRef.current.contains(e.target as Node)
      ) {
        setPillOpen(false);
      }
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setPillOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", key);
    };
  }, [pillOpen]);

  useEffect(() => {
    if (!searchFocused) return;
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchFocused]);

  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node) &&
        notifBtnRef.current && !notifBtnRef.current.contains(e.target as Node)
      ) setNotifOpen(false);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setNotifOpen(false);
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", key);
    };
  }, [notifOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { products: [], orders: [] };

    const matchedProducts = products
      .filter((p) =>
        p.productName.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
      .slice(0, 5);

    const matchedOrders = orders
      .filter((o) =>
        String(o.orderNumber).includes(q) ||
        o.customer?.customerName?.toLowerCase().includes(q) ||
        o.customer?.email?.toLowerCase().includes(q) ||
        o.customer?.phoneNumber?.toLowerCase().includes(q)
      )
      .slice(0, 5);

    return { products: matchedProducts, orders: matchedOrders };
  }, [searchQuery, products, orders]);

  const hasResults = searchResults.products.length > 0 || searchResults.orders.length > 0;
  const showDropdown = searchFocused && searchQuery.trim().length > 0;

  const notifications = useMemo(() => {
    return orders
      .filter((o) => o.paymentStatus === "PENDING")
      .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
  }, [orders]);

  const unreadCount = notifications.filter((n) => !readIds.has(n.id)).length;

  function relativeTime(iso?: string): string {
    if (!iso) return "Just now";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  const handleSelectResult = (tab: string, id?: string) => {
    onSearchSelect?.(tab, id);
    setSearchQuery("");
    setSearchFocused(false);
  };

  const [title, subtitle] = PAGE_TITLES[activeTab] ?? [storeName ?? "Dashboard", `Welcome back, ${ownerName?.split(" ")[0] ?? "there"}`];
  const effectiveTitle = activeTab === "dashboard" ? (storeName ?? "Dashboard") : title;
  const effectiveSubtitle = activeTab === "dashboard" ? `Welcome back, ${ownerName?.split(" ")[0] ?? "there"}` : subtitle;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-white/[0.07] bg-[rgba(10,10,12,0.82)] backdrop-blur-xl">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/58 hover:bg-white/[0.08] transition-all duration-150 shrink-0"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="text-[19px] font-bold tracking-tight text-[#F0EDE8] truncate font-space-grotesk leading-none">
            {effectiveTitle}
          </h1>
          <p className="text-[12px] text-[#F0EDE8]/46 font-space-grotesk mt-0.5 truncate">
            {effectiveSubtitle}
          </p>
        </div>
      </div>

      {/* Right: search + url pill + bell */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Desktop search */}
        <div ref={searchRef} className="hidden md:block relative">
          <div className={`flex items-center gap-2 border rounded-[8px] px-3 h-9 w-52 lg:w-60 transition-all duration-150
            ${searchFocused
              ? "bg-white/[0.06] border-white/[0.16]"
              : "bg-white/[0.04] border-white/[0.08]"
            }`}>
            <Search size={14} className="text-[#F0EDE8]/34 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchQuery("");
                  setSearchFocused(false);
                }
              }}
              placeholder="Search products, orders…"
              className="bg-transparent text-[13px] text-[#F0EDE8]/72 placeholder:text-[#F0EDE8]/28 outline-none w-full font-space-grotesk"
            />
            {searchQuery && (
              <button
                onMouseDown={(e) => { e.preventDefault(); setSearchQuery(""); }}
                className="text-[#F0EDE8]/34 hover:text-[#F0EDE8]/60 transition-colors shrink-0"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Search results dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 w-[320px] bg-[#131316] border border-white/[0.07] rounded-[14px] shadow-dm-card z-50 overflow-hidden">
              {!hasResults ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-[12px] text-[#F0EDE8]/34 font-space-grotesk">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto dm-scroll">
                  {searchResults.products.length > 0 && (
                    <div>
                      <div className="px-4 pt-3 pb-1.5">
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#F0EDE8]/34 font-space-grotesk">
                          Products
                        </span>
                      </div>
                      {searchResults.products.map((product) => (
                        <button
                          key={product.id}
                          onMouseDown={() => handleSelectResult("products", product.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-[7px] bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
                            <Package size={14} className="text-brand-orange" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-[#F0EDE8] truncate font-space-grotesk">
                              {product.productName}
                            </p>
                            <p className="text-[11px] text-[#F0EDE8]/34 font-space-mono">
                              Nu.{product.price.toLocaleString()} · {product.stockQuantity} in stock
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.orders.length > 0 && (
                    <div>
                      <div className={`px-4 pb-1.5 ${searchResults.products.length > 0 ? "pt-2 border-t border-white/[0.05]" : "pt-3"}`}>
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#F0EDE8]/34 font-space-grotesk">
                          Orders
                        </span>
                      </div>
                      {searchResults.orders.map((order) => (
                        <button
                          key={order.id}
                          onMouseDown={() => handleSelectResult("orders", order.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-[7px] bg-sky-400/10 border border-sky-400/20 flex items-center justify-center shrink-0">
                            <ShoppingBag size={14} className="text-sky-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-semibold text-[#F0EDE8] truncate font-space-grotesk">
                              {order.customer?.customerName ?? "Unknown"} · #{order.orderNumber}
                            </p>
                            <p className="text-[11px] text-[#F0EDE8]/34 font-space-mono">
                              Nu.{Number.parseFloat(order.totalAmount).toLocaleString()} · {order.orderStatus.toLowerCase()}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Store URL pill */}
        {displayUrl && (
          <div className="relative">
            <button
              ref={pillRef}
              onClick={() => setPillOpen((v) => !v)}
              className="hidden sm:inline-flex items-center gap-2 px-3 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.04] hover:border-white/[0.14] hover:bg-white/[0.06] transition-all duration-150 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-dm-success shadow-[0_0_7px_#27C93F] animate-pulse-dot" />
              <span className="font-space-mono text-[12px] text-[#F0EDE8]/72 max-w-[160px] truncate">
                {shortUrl}
              </span>
              <Store size={13} className="text-[#F0EDE8]/34 shrink-0" />
            </button>

            {/* URL pill popover */}
            {pillOpen && (
              <div
                ref={pillMenuRef}
                className="absolute top-full right-0 mt-2 w-72 bg-[#131316] border border-white/[0.07] rounded-[14px] shadow-dm-card motion-safe:animate-scale-in overflow-hidden z-50"
                style={{ transformOrigin: "top right" }}
              >
              <div className="px-4 pt-4 pb-3 border-b border-white/[0.07]">
                <div className="flex items-center gap-2 text-[13px] font-semibold text-[#F0EDE8] font-space-grotesk">
                  <span className="w-2 h-2 rounded-full bg-dm-success shadow-[0_0_8px_#27C93F]" />
                  Your store is live
                </div>
                <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.07] rounded-[8px]">
                  <Store size={13} className="text-[#F0EDE8]/34 shrink-0" />
                  <span className="font-space-mono text-[12px] text-[#F0EDE8]/58 flex-1 truncate">{shortUrl}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[8px] text-[12px] font-semibold font-space-grotesk transition-all duration-150
                      ${copied
                        ? "bg-dm-success/[0.15] text-dm-success border border-dm-success/[0.25]"
                        : "bg-white/[0.06] text-[#F0EDE8]/72 border border-white/[0.08] hover:bg-white/[0.10]"
                      }`}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Copied" : "Copy URL"}
                  </button>
                  <a
                    href={displayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-[8px] text-[12px] font-semibold font-space-grotesk bg-transparent border border-white/[0.08] text-[#F0EDE8]/72 hover:bg-white/[0.06] transition-all duration-150"
                  >
                    <ExternalLink size={13} />
                    Visit
                  </a>
                </div>
              </div>
              <div className="px-4 py-4 text-center">
                <p className="text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.06em] font-space-grotesk mb-3">
                  Store QR code
                </p>
                <div className="w-[144px] h-[144px] mx-auto rounded-[10px] bg-white p-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                  <QRCodeCanvas
                    ref={qrRef}
                    value={displayUrl}
                    size={120}
                    bgColor="#ffffff"
                    fgColor="#131316"
                    level="M"
                    style={{ display: "block" }}
                  />
                </div>
                <p className="text-[11px] text-[#F0EDE8]/34 mt-3 font-space-grotesk">
                  Print it, share it, put it on your shopfront.
                </p>
                <button
                  onClick={handleDownloadQr}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 h-8 rounded-[8px] text-[12px] font-semibold font-space-grotesk bg-white/[0.06] text-[#F0EDE8]/72 border border-white/[0.08] hover:bg-white/[0.10] transition-all duration-150"
                >
                  <Download size={13} />
                  Download QR
                </button>
              </div>
            </div>
          )}
          </div>
        )}

        {/* Notifications bell */}
        <div className="relative">
          <button
            ref={notifBtnRef}
            onClick={() => setNotifOpen((v) => !v)}
            className="w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/58 hover:bg-white/[0.08] hover:text-[#F0EDE8]/72 transition-all duration-150"
            aria-label="Notifications"
          >
            <Bell size={16} />
          </button>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#0b0b0d] shadow-glow-orange font-space-mono pointer-events-none">
              {unreadCount}
            </span>
          )}

          {/* Notification panel */}
          {notifOpen && (
            <div
              ref={notifMenuRef}
              className="absolute top-full right-0 mt-2 w-[340px] bg-[#131316] border border-white/[0.07] rounded-[16px] shadow-dm-card motion-safe:animate-scale-in overflow-hidden z-50"
              style={{ transformOrigin: "top right" }}
            >
              {/* Header */}
              <div className="px-4 pt-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#F0EDE8] font-space-grotesk">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-brand-orange text-white text-[10px] font-bold font-space-mono">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#F0EDE8]/34 font-space-grotesk mt-0.5">
                    {notifications.length === 0 ? "You're all caught up" : "Payments awaiting your review"}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setReadIds(new Set(notifications.map((n) => n.id)))}
                    className="text-[11px] text-brand-orange hover:text-[#f07d30] font-semibold font-space-grotesk transition-colors shrink-0"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-[360px] overflow-y-auto dm-scroll">
                {notifications.length === 0 ? (
                  <div className="px-4 py-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
                      <Bell size={18} className="text-[#F0EDE8]/24" />
                    </div>
                    <p className="text-[12px] text-[#F0EDE8]/34 font-space-grotesk text-center">
                      No pending payments to review
                    </p>
                  </div>
                ) : (
                  notifications.map((order) => {
                    const isRead = readIds.has(order.id);
                    return (
                      <div
                        key={order.id}
                        className={`flex items-start gap-3 px-4 py-3.5 border-b border-white/[0.04] last:border-0 transition-colors ${isRead ? "opacity-50" : "hover:bg-white/[0.02]"}`}
                      >
                        {/* Icon */}
                        <div className="w-9 h-9 rounded-[9px] bg-brand-orange/[0.12] border border-brand-orange/[0.20] flex items-center justify-center shrink-0 mt-0.5">
                          <CreditCard size={15} className="text-brand-orange" />
                        </div>
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-[#F0EDE8] font-space-grotesk leading-snug">
                            Payment to verify
                          </p>
                          <p className="text-[11px] text-[#F0EDE8]/46 font-space-grotesk mt-0.5 truncate">
                            #{order.orderNumber} · {order.customer?.customerName ?? "Customer"} · Nu.{Number.parseFloat(order.totalAmount).toLocaleString()}
                          </p>
                          <p className="text-[10.5px] text-[#F0EDE8]/28 font-space-mono mt-1">
                            {relativeTime(order.createdAt)}
                          </p>
                        </div>
                        {/* View button */}
                        <button
                          onClick={() => {
                            setReadIds((prev) => new Set([...prev, order.id]));
                            setNotifOpen(false);
                            onSearchSelect?.("orders", order.id);
                          }}
                          className="shrink-0 mt-0.5 px-2.5 py-1 rounded-[6px] text-[11px] font-semibold font-space-grotesk border border-white/[0.08] text-[#F0EDE8]/58 hover:border-brand-orange/[0.30] hover:text-brand-orange hover:bg-brand-orange/[0.08] transition-all duration-150"
                        >
                          View
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-white/[0.06]">
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                      onSearchSelect?.("orders");
                    }}
                    className="w-full flex items-center justify-center gap-1.5 h-8 rounded-[8px] text-[12px] font-semibold font-space-grotesk text-brand-orange hover:bg-brand-orange/[0.08] transition-colors"
                  >
                    Go to orders
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
