"use client";
import React from "react";
import { StatusBadgeProps } from "./Types";

const ORDER_STATUS: Record<string, { label: string; classes: string; dot: string }> = {
  PENDING:    { label: "Pending",    classes: "bg-amber-400/[0.12] text-amber-400 border border-amber-400/[0.20]",   dot: "bg-amber-400" },
  CONFIRMED:  { label: "Confirmed",  classes: "bg-blue-400/[0.12] text-blue-400 border border-blue-400/[0.20]",       dot: "bg-blue-400" },
  PROCESSING: { label: "Processing", classes: "bg-violet-400/[0.12] text-violet-400 border border-violet-400/[0.20]", dot: "bg-violet-400" },
  SHIPPED:    { label: "Shipped",    classes: "bg-sky-400/[0.12] text-sky-400 border border-sky-400/[0.22]",          dot: "bg-sky-400" },
  DELIVERED:  { label: "Delivered",  classes: "bg-emerald-400/[0.12] text-emerald-400 border border-emerald-400/[0.25]", dot: "bg-emerald-400" },
  CANCELLED:  { label: "Cancelled",  classes: "bg-red-400/[0.12] text-red-400 border border-red-400/[0.20]",          dot: "bg-red-400" },
};

const PAYMENT_STATUS: Record<string, { label: string; classes: string; dot: string }> = {
  PENDING:  { label: "Awaiting",  classes: "bg-amber-400/[0.12] text-amber-400 border border-amber-400/[0.20]",    dot: "bg-amber-400" },
  RECEIVED: { label: "Received",  classes: "bg-emerald-400/[0.12] text-emerald-400 border border-emerald-400/[0.25]", dot: "bg-emerald-400" },
  FAILED:   { label: "Failed",    classes: "bg-red-400/[0.12] text-red-400 border border-red-400/[0.20]",           dot: "bg-red-400" },
};

const FALLBACK = { label: "", classes: "bg-white/[0.06] text-[#F0EDE8]/46 border border-white/[0.08]", dot: "bg-[#F0EDE8]/34" };

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = "order" }) => {
  const map = type === "payment" ? PAYMENT_STATUS : ORDER_STATUS;
  const cfg = map[status] ?? { ...FALLBACK, label: status };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

export default StatusBadge;
