"use client";
import React, { useMemo } from "react";
import { Coins, ShoppingCart, Package, Clock } from "lucide-react";
import { StatsCardsProps } from "./Types";

// ── Sparkline ─────────────────────────────────────────────────────────────

function Sparkline({ data, color = "#E07328", w = 92, h = 34 }: {
  data: number[]; color?: string; w?: number; h?: number;
}) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = (max - min) || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((v - min) / range) * (h - 8),
  ]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  const id = `sp${color.replace(/[^a-z0-9]/gi, "")}${w}`;

  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {last && <circle cx={last[0]} cy={last[1]} r="2.6" fill={color} />}
    </svg>
  );
}

// ── Spark data (matches design) ────────────────────────────────────────────

const SPARK = {
  revenue:  { data: [12, 18, 15, 22, 19, 28, 26, 34], color: "#E07328" },
  orders:   { data: [8,  11,  9, 14, 12, 16, 15, 19], color: "#60A5FA" },
  products: { data: [10, 10, 11, 11, 12, 12, 12, 12], color: "#A78BFA" },
  pending:  { data: [2,   4,  3,  5,  4,  6,  5,  7], color: "#FBBF24" },
};

// ── Icon box — all cards use same accent orange (matches design) ──────────

const ICON_BG    = "rgba(224, 115, 40, 0.12)";
const ICON_COLOR = "#E07328";

// ── Delta arrow SVGs ──────────────────────────────────────────────────────

function ArrowUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 2.5V9.5M6 9.5L2.5 6M6 9.5L9.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Single stat card ──────────────────────────────────────────────────────

function StatCard({
  label, value, delta, deltaUp = true, spark, icon: Icon, delay = 0,
}: {
  label: string; value: string; delta?: string; deltaUp?: boolean;
  spark: { data: number[]; color: string };
  icon: React.ElementType; delay?: number;
}) {
  return (
    <div
      className="relative bg-[#131316] border border-white/[0.07] rounded-[18px] p-5 hover:border-white/[0.12] hover:bg-[#16161a] transition-all duration-200 motion-safe:animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      {/* Top row: icon + label on left, delta on right */}
      <div className="flex items-start justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
            style={{ background: ICON_BG, color: ICON_COLOR }}
          >
            <Icon size={17} />
          </div>
          <span className="text-[13px] font-medium font-space-grotesk" style={{ color: "rgba(240,237,232,0.58)" }}>
            {label}
          </span>
        </div>

        {delta && (
          <span
            className="inline-flex items-center gap-1 text-[12px] font-semibold font-space-grotesk"
            style={{ color: deltaUp ? "#27C93F" : "#EF4444" }}
          >
            {deltaUp ? <ArrowUp /> : <ArrowDown />}
            {delta}
          </span>
        )}
      </div>

      {/* Bottom row: value on left, sparkline on right */}
      <div className="flex items-end justify-between gap-2">
        <span
          className="text-[26px] font-bold tracking-tight leading-none font-space-grotesk"
          style={{ color: "#F0EDE8" }}
        >
          {value}
        </span>
        <div className="pb-0.5">
          <Sparkline data={spark.data} color={spark.color} />
        </div>
      </div>
    </div>
  );
}

// ── Stats grid ────────────────────────────────────────────────────────────

const StatsCards: React.FC<StatsCardsProps> = ({ products, orders }) => {
  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0),
    [orders]
  );

  const pendingCount = useMemo(
    () => orders.filter(
      (o) => o.orderStatus === "PENDING" || o.paymentStatus === "PENDING"
    ).length,
    [orders]
  );

  const lowStockCount = products.filter((p) => p.stockQuantity < 20).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        label="Total revenue"
        value={`Nu.${totalRevenue.toLocaleString("en-IN")}`}
        delta="12.4%"
        deltaUp
        spark={SPARK.revenue}
        icon={Coins}
        delay={0}
      />
      <StatCard
        label="Orders"
        value={String(orders.length)}
        delta="8.1%"
        deltaUp
        spark={SPARK.orders}
        icon={ShoppingCart}
        delay={60}
      />
      <StatCard
        label="Products"
        value={String(products.length)}
        delta={lowStockCount > 0 ? `${lowStockCount} low` : "2 new"}
        deltaUp={lowStockCount === 0}
        spark={SPARK.products}
        icon={Package}
        delay={120}
      />
      <StatCard
        label="Pending action"
        value={String(pendingCount)}
        delta="needs review"
        deltaUp={false}
        spark={SPARK.pending}
        icon={Clock}
        delay={180}
      />
    </div>
  );
};

export default StatsCards;
