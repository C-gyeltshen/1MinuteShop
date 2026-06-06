"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { BarChart3, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { SidebarProps } from "./Types";
import { useAuth } from "@/app/shared/store/authStore";

const NAV_ITEMS = [
  { icon: BarChart3, label: "Dashboard", tab: "dashboard" },
  { icon: ShoppingCart, label: "Orders",    tab: "orders" },
  { icon: Package,     label: "Products",   tab: "products" },
  { icon: Settings,    label: "Settings",   tab: "settings" },
];

function Logo({ compact }: { compact: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="1MinuteShop"
        width={36}
        height={36}
        className="rounded-[9px] shrink-0"
      />
      {!compact && (
        <span className="text-base font-bold tracking-tight text-[#F0EDE8] whitespace-nowrap font-space-grotesk">
          1Minute<span className="text-brand-orange">Shop</span>
        </span>
      )}
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase();
}

const AV_COLORS = ["#E07328", "#60A5FA", "#A78BFA", "#27C93F", "#FBBF24"];
function avatarColor(name: string) {
  let h = 0;
  for (const c of name) h = ((h * 31 + c.charCodeAt(0)) >>> 0);
  return AV_COLORS[h % AV_COLORS.length];
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const color = avatarColor(name);
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.38, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em",
        background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #000))`,
      }}
    >
      {initials(name)}
    </div>
  );
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  setIsMobileMenuOpen,
  orderBadge = 0,
  productBadge = 0,
  ownerName = "Store Owner",
  storeName,
}) => {
  const { logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const badges: Record<string, number> = { orders: orderBadge, products: productBadge };

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLogout = async () => {
    setConfirmOpen(false);
    setLoggingOut(true);
    await logout();
  };

  return (
    <>
    <nav className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 pt-5 pb-6">
        <Logo compact={false} />
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3 space-y-1">
        <p className="px-3 pb-2 text-[10.5px] font-semibold text-[#F0EDE8]/24 uppercase tracking-[0.1em] font-space-grotesk">
          Manage
        </p>
        {NAV_ITEMS.map(({ icon: Icon, label, tab }) => {
          const isActive = activeTab === tab;
          const count = badges[tab] ?? 0;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsMobileMenuOpen?.(false);
              }}
              style={isActive
                ? { background: "rgba(224,115,40,0.15)", color: "#E07328" }
                : { color: "rgba(240,237,232,0.58)" }
              }
              className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-semibold font-space-grotesk transition-all duration-150 ease-out hover:bg-white/5"
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.72)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(240,237,232,0.58)"; }}
            >
              {/* Active left bar */}
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                  style={{ background: "#E07328", boxShadow: "0 0 10px rgba(224,115,40,0.5)" }}
                />
              )}
              <Icon size={19} className="shrink-0" />
              <span>{label}</span>
              {count > 0 && (
                <span
                  className="ml-auto min-w-[20px] h-5 px-1.5 rounded-full inline-flex items-center justify-center text-[11px] font-bold font-space-mono"
                  style={isActive
                    ? { background: "#E07328", color: "#fff", boxShadow: "0 0 10px rgba(224,115,40,0.4)" }
                    : { background: "rgba(224,115,40,0.15)", color: "#E07328" }
                  }
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Owner footer */}
      <div className="px-3 py-3 mt-auto border-t border-white/[0.07]">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative">
            <Avatar name={ownerName} size={36} />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-dm-success border-2 border-[#0b0b0d]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#F0EDE8] truncate font-space-grotesk">
              {ownerName}
            </p>
            <p className="text-[11px] text-[#F0EDE8]/34 font-space-grotesk">Store owner</p>
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={loggingOut}
            className="w-8 h-8 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/46 hover:bg-dm-danger/[0.15] hover:border-dm-danger/[0.30] hover:text-dm-danger transition-all duration-150 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Sign out"
            title="Sign out"
          >
            {loggingOut
              ? <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              : <LogOut size={15} />
            }
          </button>
        </div>
      </div>

    </nav>

    {/* Portalled to document.body so backdrop-blur on sidebar doesn't trap it */}
    {confirmOpen && createPortal(
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setConfirmOpen(false)}
        />
        <div className="relative bg-[#131316] border border-white/[0.07] rounded-[18px] shadow-dm-card w-full max-w-sm p-6 motion-safe:animate-scale-in">
          <div className="w-11 h-11 rounded-full bg-dm-danger/[0.12] border border-dm-danger/[0.20] flex items-center justify-center mx-auto mb-4">
            <LogOut size={18} className="text-dm-danger" />
          </div>
          <h3 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk text-center mb-1">
            Sign out?
          </h3>
          <p className="text-[13px] text-[#F0EDE8]/46 font-space-grotesk text-center leading-relaxed">
            You&apos;ll be signed out of{" "}
            <span className="text-[#F0EDE8]/72 font-semibold">{storeName ?? "your store"}</span>.
            {" "}Any unsaved changes will be lost.
          </p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setConfirmOpen(false)}
              className="flex-1 py-2.5 rounded-[10px] border border-white/[0.08] text-[13px] font-semibold text-[#F0EDE8]/58 hover:bg-white/[0.06] transition-colors font-space-grotesk"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-2.5 rounded-[10px] bg-dm-danger/[0.15] border border-dm-danger/[0.25] text-[13px] font-semibold text-dm-danger hover:bg-dm-danger/[0.25] transition-colors font-space-grotesk"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
};

export default Sidebar;
