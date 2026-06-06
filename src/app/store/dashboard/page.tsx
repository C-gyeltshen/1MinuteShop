"use client";
import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import { AuthContext, AuthProvider } from "@/app/shared/store/authStore";
import AddProductModal from "./components/AddProductButton";
import EditProductModal from "./components/ui/EditProductModal";
import DashboardHeader from "./components/DashboardHeader";
import ContentSection from "./components/ContentSection";
import OrdersView from "./components/OrdersView";
import ProductsView from "./components/ProductsView";
import Sidebar from "./components/SideBar";
import StatsCards from "./components/StatusCards";
import SettingsView from "./components/SettingsView";
import { useProducts } from "./hooks/UseProducts";
import { useOrders } from "./hooks/Useorders";
import { Order, Product } from "./components/Types";

// ── Shared color helpers ───────────────────────────────────────────────────

const AV_COLORS = ["#E07328", "#60A5FA", "#A78BFA", "#27C93F", "#FBBF24", "#2DD4BF", "#F472B6"];
function avatarColor(name: string) {
  let h = 0;
  for (const c of name) h = ((h * 31 + c.charCodeAt(0)) >>> 0);
  return AV_COLORS[h % AV_COLORS.length];
}
function getInitials(name: string) {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] ?? "") + (p[1]?.[0] ?? "")).toUpperCase();
}
function ColorAvatar({ name, size = 34 }: { name: string; size?: number }) {
  const color = avatarColor(name);
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold text-white font-space-grotesk"
      style={{
        width: size, height: size, fontSize: size * 0.38, letterSpacing: "-0.02em",
        background: `linear-gradient(135deg, ${color}, ${color}66)`,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

// ── Smooth bezier path (catmull-rom → bezier, matches design) ─────────────

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i], p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)},${c2x.toFixed(1)} ${c2y.toFixed(1)},${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

// ── Chart range data (matches design) ────────────────────────────────────

const RANGES: Record<string, { labels: string[]; revenue: number[]; orders: number[] }> = {
  weekly:  { labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
             revenue: [4200,5100,4800,6300,7400,9200,8100], orders: [12,15,14,19,22,28,24] },
  monthly: { labels: ["Wk 1","Wk 2","Wk 3","Wk 4"],
             revenue: [28400,31200,29800,38600], orders: [86,94,88,118] },
  yearly:  { labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
             revenue: [42000,38000,51000,47000,62000,58000,71000,69000,82000,78000,94000,103000],
             orders:  [128,116,151,142,188,176,214,206,248,236,284,312] },
};

// ── Business Performance area chart ──────────────────────────────────────

function AnalyticsChart({
  range, showRevenue, showOrders, height = 260,
}: {
  range: string; showRevenue: boolean; showOrders: boolean; height?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(600);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((es) => setW(es[0].contentRect.width));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const data = RANGES[range] ?? RANGES.monthly;
  const { labels, revenue: rev, orders: ord } = data;
  const n = labels.length;
  const padL = 46, padR = 14, padT = 14, padB = 28;
  const iw = Math.max(w - padL - padR, 1), ih = height - padT - padB;

  const maxRev = Math.max(...rev) * 1.12;
  const maxOrd = Math.max(...ord) * 1.12;
  const X = (i: number) => padL + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const Yr = (v: number) => padT + ih - (v / maxRev) * ih;
  const Yo = (v: number) => padT + ih - (v / maxOrd) * ih;

  const revPts: [number, number][] = rev.map((v, i) => [X(i), Yr(v)]);
  const ordPts: [number, number][] = ord.map((v, i) => [X(i), Yo(v)]);
  const revLine = smoothPath(revPts);
  const ordLine = smoothPath(ordPts);
  const revArea = revLine + ` L${X(n - 1)} ${padT + ih} L${X(0)} ${padT + ih} Z`;

  const yTicks = 4;

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let idx = Math.round(((e.clientX - rect.left - padL) / iw) * (n - 1));
    idx = Math.max(0, Math.min(n - 1, idx));
    setHover(idx);
  };

  return (
    <div ref={wrapRef} style={{ width: "100%" }}>
      <svg
        width={w} height={height}
        onMouseMove={onMove} onMouseLeave={() => setHover(null)}
        style={{ display: "block", cursor: "crosshair" }}
      >
        <defs>
          <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E07328" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#E07328" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid lines + y labels */}
        {Array.from({ length: yTicks + 1 }).map((_, i) => {
          const y = padT + (i / yTicks) * ih;
          const val = maxRev * (1 - i / yTicks);
          return (
            <g key={i}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x={padL - 10} y={y + 4} textAnchor="end" fontSize="10.5" fill="rgba(240,237,232,0.34)" fontFamily="'Space Mono', monospace">
                {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : Math.round(val)}
              </text>
            </g>
          );
        })}

        {/* x labels */}
        {labels.map((l, i) => (
          <text key={i} x={X(i)} y={height - 9} textAnchor="middle" fontSize="11" fill="rgba(240,237,232,0.46)" fontFamily="'Space Grotesk', sans-serif">
            {l}
          </text>
        ))}

        {/* revenue area + line */}
        {showRevenue && <>
          <path d={revArea} fill="url(#revFill)" />
          <path d={revLine} fill="none" stroke="#E07328" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </>}

        {/* orders dotted line */}
        {showOrders && (
          <path d={ordLine} fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="0.5 6" />
        )}

        {/* hover crosshair */}
        {hover != null && <>
          <line x1={X(hover)} y1={padT} x2={X(hover)} y2={padT + ih} stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="3 3" />
          {showRevenue && <circle cx={X(hover)} cy={Yr(rev[hover])} r="4.5" fill="#E07328" stroke="#080808" strokeWidth="2" />}
          {showOrders && <circle cx={X(hover)} cy={Yo(ord[hover])} r="4.5" fill="#60A5FA" stroke="#080808" strokeWidth="2" />}
        </>}
      </svg>

      {/* hover tooltip */}
      {hover != null && (
        <div className="inline-flex items-center gap-4 mt-1 px-3 py-2 bg-white/[0.05] border border-white/[0.07] rounded-[8px] text-[12.5px]">
          <span className="text-[#F0EDE8]/46 font-space-grotesk">{labels[hover]}</span>
          {showRevenue && (
            <span className="font-semibold text-[#F0EDE8] font-space-mono">
              <span className="text-brand-orange">● </span>Nu.{rev[hover].toLocaleString()}
            </span>
          )}
          {showOrders && (
            <span className="font-semibold text-[#F0EDE8] font-space-mono">
              <span className="text-dm-info">● </span>{ord[hover]} orders
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Sales by category donut ───────────────────────────────────────────────

const STATUS_SEGMENTS = [
  { key: "DELIVERED",  label: "Delivered",  color: "#27C93F" },
  { key: "SHIPPED",    label: "Shipped",    color: "#60A5FA" },
  { key: "PROCESSING", label: "Processing", color: "#A78BFA" },
  { key: "CONFIRMED",  label: "Confirmed",  color: "#2DD4BF" },
  { key: "PENDING",    label: "Pending",    color: "#FBBF24" },
  { key: "CANCELLED",  label: "Cancelled",  color: "#EF4444" },
];

function SalesByCategory({ orders }: { orders: Order[] }) {
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    orders.forEach((o) => { m[o.orderStatus] = (m[o.orderStatus] ?? 0) + 1; });
    return m;
  }, [orders]);

  const total = orders.length;
  const segments = STATUS_SEGMENTS.map((s) => ({ ...s, value: counts[s.key] ?? 0 }))
    .filter((s) => s.value > 0);

  const size = 158, stroke = 20;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;

  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / (total || 1)) * C;
    const el = { ...s, len, offset };
    offset += len;
    return el;
  });

  return (
    <div>
      {/* Donut */}
      <div className="flex justify-center mb-5">
        <div style={{ position: "relative", width: size, height: size }}>
          <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
            {arcs.map((arc, i) => (
              <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={arc.color} strokeWidth={stroke}
                strokeDasharray={`${arc.len} ${C - arc.len}`}
                strokeDashoffset={-arc.offset}
                strokeLinecap="butt" />
            ))}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span className="text-[11px] text-[#F0EDE8]/46 font-space-grotesk">Orders</span>
            <span className="text-[24px] font-bold text-[#F0EDE8] font-space-grotesk leading-none">{total}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2.5">
        {arcs.map((s) => (
          <div key={s.key} className="flex items-center gap-2.5 text-[12.5px]">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[#F0EDE8]/58 flex-1 font-space-grotesk">{s.label}</span>
            <span className="text-[#F0EDE8]/46 font-space-mono">{s.value}</span>
          </div>
        ))}
        {total === 0 && (
          <p className="text-center text-[12px] text-[#F0EDE8]/34 font-space-grotesk py-4">No orders yet</p>
        )}
      </div>
    </div>
  );
}

// ── Product thumbnail with image + initials fallback ─────────────────────

function ProductThumb({
  name, imageUrl, color, initials,
}: {
  name: string; imageUrl?: string; color: string; initials: string;
}) {
  const [imgErr, setImgErr] = React.useState(false);

  if (imageUrl && !imgErr) {
    return (
      <img
        src={imageUrl}
        alt={name}
        onError={() => setImgErr(true)}
        className="w-9 h-9 rounded-[8px] object-cover border border-white/[0.07] shrink-0"
      />
    );
  }

  return (
    <div
      className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[12px] font-bold shrink-0"
      style={{ background: `${color}22`, border: `1px solid ${color}44`, color }}
    >
      {initials}
    </div>
  );
}

// ── Top products ──────────────────────────────────────────────────────────

function TopProducts({
  orders, products, onViewAll,
}: {
  orders: Order[]; products: Product[]; onViewAll: () => void;
}) {
  const topList = useMemo(() => {
    const sales: Record<string, { product: Product; qty: number }> = {};
    orders.forEach((o) => {
      o.orderItems.forEach((item) => {
        const found = products.find((p) => p.productName === item.product?.productName);
        if (!found) return;
        if (!sales[found.id]) sales[found.id] = { product: found, qty: 0 };
        sales[found.id].qty += item.quantity;
      });
    });
    return Object.values(sales).sort((a, b) => b.qty - a.qty).slice(0, 5);
  }, [orders, products]);

  const maxQty = Math.max(...topList.map((t) => t.qty), 1);

  return (
    <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-5 motion-safe:animate-fade-up" style={{ animationDelay: "350ms", animationFillMode: "both" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#F0EDE8] font-space-grotesk">Top products</h3>
          <p className="text-[12px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk">By units sold</p>
        </div>
        <button onClick={onViewAll} className="text-[13px] text-brand-orange hover:text-brand-orange-hover font-semibold transition-colors font-space-grotesk">
          All products →
        </button>
      </div>

      {topList.length === 0 ? (
        <p className="text-[12px] text-[#F0EDE8]/34 font-space-grotesk py-8 text-center">No sales data yet</p>
      ) : (
        <div className="space-y-4">
          {topList.map((item, i) => {
            const color = avatarColor(item.product.productName);
            const initials = getInitials(item.product.productName);
            const pct = (item.qty / maxQty) * 100;
            return (
              <div key={item.product.id} className="flex items-center gap-3">
                <span className="text-[11px] font-bold font-space-mono w-4 shrink-0 text-center"
                  style={{ color }}>
                  {i + 1}
                </span>
                <ProductThumb
                  name={item.product.productName}
                  imageUrl={item.product.productImageUrl}
                  color={color}
                  initials={initials}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[13px] font-semibold text-[#F0EDE8] truncate font-space-grotesk">
                      {item.product.productName}
                    </span>
                    <span className="text-[12px] font-space-mono shrink-0" style={{ color }}>
                      {item.qty} sold
                    </span>
                  </div>
                  <div className="h-[6px] rounded-full overflow-hidden" style={{ background: `${color}18` }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}cc, ${color})` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Dashboard home section ────────────────────────────────────────────────

function DashboardHomeSection({
  products, orders, onViewOrders, onViewProducts,
}: {
  products: Product[];
  orders: Order[];
  onViewOrders: () => void;
  onViewProducts: () => void;
}) {
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const [showRevenue, setShowRevenue] = useState(true);
  const [showOrders, setShowOrders] = useState(true);

  const recentOrders = useMemo(() => [...orders].slice(0, 6), [orders]);

  return (
    <div className="flex flex-col gap-5">
      {/* KPI stat cards */}
      <StatsCards products={products} orders={orders} />

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.9fr_1fr] gap-5">
        {/* Business performance area chart */}
        <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-5 motion-safe:animate-fade-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
            <div>
              <h3 className="text-[15px] font-semibold text-[#F0EDE8] font-space-grotesk">Business performance</h3>
              <p className="text-[12px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk">Revenue and order volume over time</p>
            </div>
            {/* Segmented control */}
            <div className="inline-flex bg-white/[0.04] border border-white/[0.08] rounded-[8px] p-[3px] gap-[2px]">
              {(["weekly", "monthly", "yearly"] as const).map((r) => (
                <button key={r} onClick={() => setRange(r)}
                  className={`px-3 py-1.5 text-[12px] font-semibold font-space-grotesk rounded-[6px] capitalize transition-all duration-150
                    ${range === r
                      ? "bg-brand-orange text-white shadow-sm"
                      : "text-[#F0EDE8]/46 hover:text-[#F0EDE8]/72 hover:bg-white/[0.04]"
                    }`}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Series toggles */}
          <div className="flex items-center gap-4 mb-2">
            {([["revenue", "Revenue", "#E07328"], ["orders", "Orders", "#60A5FA"]] as const).map(([k, l, c]) => {
              const active = k === "revenue" ? showRevenue : showOrders;
              return (
                <button key={k}
                  onClick={() => k === "revenue" ? setShowRevenue((v) => !v) : setShowOrders((v) => !v)}
                  className={`flex items-center gap-1.5 text-[12.5px] font-semibold font-space-grotesk transition-all border-none bg-transparent cursor-pointer ${active ? "opacity-100" : "opacity-40"}`}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  {l}
                </button>
              );
            })}
          </div>

          <AnalyticsChart range={range} showRevenue={showRevenue} showOrders={showOrders} />
        </div>

        {/* Sales by category donut */}
        <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-5 motion-safe:animate-fade-up" style={{ animationDelay: "250ms", animationFillMode: "both" }}>
          <h3 className="text-[15px] font-semibold text-[#F0EDE8] font-space-grotesk mb-0.5">Sales by category</h3>
          <p className="text-[12px] text-[#F0EDE8]/46 mb-5 font-space-grotesk">Order status share</p>
          <SalesByCategory orders={orders} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-5">
        {/* Recent orders */}
        <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] overflow-hidden motion-safe:animate-fade-up" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
          <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <div>
              <h3 className="text-[15px] font-semibold text-[#F0EDE8] font-space-grotesk">Recent orders</h3>
              <p className="text-[12px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk">Latest activity from your store</p>
            </div>
            <button onClick={onViewOrders} className="text-[13px] text-brand-orange hover:text-brand-orange-hover font-semibold transition-colors font-space-grotesk">
              View all →
            </button>
          </div>
          {recentOrders.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-[13px] text-[#F0EDE8]/34 font-space-grotesk">No orders yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentOrders.map((order) => {
                const customerName = order.customer?.customerName ?? "Unknown";
                const initials = getInitials(customerName);
                return (
                  <div key={order.id} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-white/5 transition-colors">
                    <ColorAvatar name={customerName} size={40} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[13.5px] font-semibold text-[#F0EDE8] truncate font-space-grotesk leading-snug">
                          {customerName}
                        </p>
                        <span className="shrink-0 px-1.5 py-0.5 rounded-[5px] bg-white/[0.06] border border-white/[0.08] text-[10px] font-bold text-[#F0EDE8]/46 font-space-mono tracking-wide">
                          {initials}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#F0EDE8]/34 font-space-mono mt-0.5">
                        #{order.orderNumber}{order.createdAt ? ` · ${new Date(order.createdAt).toLocaleDateString()}` : ""}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border shrink-0
                      ${order.orderStatus === "DELIVERED" ? "bg-emerald-400/12 text-emerald-400 border-emerald-400/20" :
                        order.orderStatus === "SHIPPED"   ? "bg-sky-400/12 text-sky-400 border-sky-400/22" :
                        order.orderStatus === "CONFIRMED" ? "bg-blue-400/12 text-blue-400 border-blue-400/20" :
                        order.orderStatus === "PROCESSING"? "bg-violet-400/12 text-violet-400 border-violet-400/20" :
                        order.orderStatus === "CANCELLED" ? "bg-red-400/12 text-red-400 border-red-400/20" :
                                                            "bg-amber-400/12 text-amber-400 border-amber-400/20"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0
                        ${order.orderStatus === "DELIVERED" ? "bg-emerald-400" :
                          order.orderStatus === "SHIPPED"   ? "bg-sky-400" :
                          order.orderStatus === "CONFIRMED" ? "bg-blue-400" :
                          order.orderStatus === "PROCESSING"? "bg-violet-400" :
                          order.orderStatus === "CANCELLED" ? "bg-red-400" : "bg-amber-400"}`} />
                      {order.orderStatus.charAt(0) + order.orderStatus.slice(1).toLowerCase()}
                    </span>
                    <span className="text-[13px] font-bold text-[#F0EDE8] font-space-mono shrink-0">
                      Nu.{Number.parseFloat(order.totalAmount).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top products */}
        <TopProducts orders={orders} products={products} onViewAll={onViewProducts} />
      </div>
    </div>
  );
}

// ── Main dashboard content ─────────────────────────────────────────────────

const DashboardContent = () => {
  const auth = useContext(AuthContext);
  const isLoading = auth?.isLoading;
  const user = auth?.user;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { products, loading: productsLoading, error: productsError, addProduct, editProduct, deleteProduct } = useProducts();
  const { orders, loading: ordersLoading, error: ordersError, refetch, updateOrderStatus, updatePaymentStatus } = useOrders();

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductModalOpen(true);
  };

  const orderBadge = useMemo(
    () => orders.filter((o) =>
      o.orderStatus !== "CANCELLED" && o.orderStatus !== "DELIVERED" &&
      (o.orderStatus === "PENDING" || o.paymentStatus === "PENDING")
    ).length,
    [orders]
  );
  const productBadge = useMemo(() => products.filter((p) => p.stockQuantity <= 0).length, [products]);
  const notificationCount = orderBadge + productBadge;

  const storeUrl = user?.storeName
    ? `https://${user.storeName.toLowerCase().replace(/\s+/g, "-")}.laso.la`
    : undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dm-bg">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-[#F0EDE8]/46 text-[13px] font-space-grotesk">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#080808] dm-bg-field font-space-grotesk">
      {/* Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[248px] flex-col bg-[rgba(10,10,12,0.92)] backdrop-blur-xl border-r border-white/[0.07] z-40 overflow-y-auto dm-scroll">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orderBadge={orderBadge}
          productBadge={productBadge}
          ownerName={user?.ownerName ?? user?.email ?? "Store Owner"}
          storeName={user?.storeName}
        />
      </aside>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="relative w-[248px] max-w-[85vw] h-full bg-[rgba(10,10,12,0.96)] backdrop-blur-xl border-r border-white/[0.07] flex flex-col overflow-y-auto dm-scroll">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              orderBadge={orderBadge}
              productBadge={productBadge}
              ownerName={user?.ownerName ?? user?.email ?? "Store Owner"}
              storeName={user?.storeName}
            />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-[248px] min-h-screen">
        <DashboardHeader
          storeName={user?.storeName}
          ownerName={user?.ownerName}
          email={user?.email}
          isMobileMenuOpen={isMobileMenuOpen}
          storeUrl={storeUrl}
          onToggleMobileMenu={() => setIsMobileMenuOpen((v) => !v)}
          activeTab={activeTab}
          notificationCount={notificationCount}
          products={products}
          orders={orders}
          onSearchSelect={(tab, id) => {
            setActiveTab(tab);
            setExpandedRow(id ?? null);
          }}
        />

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-[26px] lg:py-6 w-full max-w-[1320px]">
          <ContentSection activeTab={activeTab}>
            {activeTab === "dashboard" && (
              <DashboardHomeSection
                products={products}
                orders={orders}
                onViewOrders={() => setActiveTab("orders")}
                onViewProducts={() => setActiveTab("products")}
              />
            )}
            {activeTab === "products" && (
              <ProductsView
                products={products}
                loading={productsLoading}
                error={productsError}
                expandedRow={expandedRow}
                setExpandedRow={setExpandedRow}
                onEdit={openEditModal}
                onDelete={deleteProduct}
                onAddProduct={() => setIsAddProductModalOpen(true)}
              />
            )}
            {activeTab === "orders" && (
              <OrdersView
                orders={orders}
                loading={ordersLoading}
                error={ordersError}
                refetch={refetch}
                updateOrderStatus={updateOrderStatus}
                updatePaymentStatus={updatePaymentStatus}
                searchQuery=""
                expandedRow={expandedRow}
                setExpandedRow={setExpandedRow}
              />
            )}
            {activeTab === "settings" && (
              <SettingsView
                storeName={user?.storeName}
                email={user?.email}
                storeUrl={storeUrl}
              />
            )}
          </ContentSection>
        </main>
      </div>

      <AddProductModal isOpen={isAddProductModalOpen} onClose={() => setIsAddProductModalOpen(false)} onSubmit={addProduct} />
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={() => { setIsEditProductModalOpen(false); setSelectedProduct(null); }}
        onSubmit={editProduct}
        product={selectedProduct}
      />
    </div>
  );
};

const StoreOwnerPortal = () => (
  <AuthProvider>
    <DashboardContent />
  </AuthProvider>
);

export default StoreOwnerPortal;
