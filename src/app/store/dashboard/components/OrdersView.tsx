"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  RefreshCw, ShoppingBag, AlertCircle, MapPin, Phone, Mail,
  StickyNote, ImageOff, X, ZoomIn, Check, AlertTriangle,
  Receipt, ChevronRight, Package, ChevronDown
} from "lucide-react";
import { Order, OrdersViewProps } from "./Types";
import StatusBadge from "./StatusBadge";
import {
  ORDER_STATUS_CONFIG, PAYMENT_STATUS_CONFIG, ORDER_STATUSES, PAYMENT_STATUSES,
} from "../assets/contents/OrdersViewContents";

// ── Colorful customer avatar ───────────────────────────────────────────────

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
function CustomerAvatar({ name, size = 34 }: { name: string; size?: number }) {
  const color = avatarColor(name);
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-bold text-white font-space-grotesk"
      style={{
        width: size, height: size, fontSize: size * 0.38, letterSpacing: "-0.02em",
        background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #000))`,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

const ORDER_FLOW = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"] as const;
const NEXT_LABEL: Record<string, string> = {
  PENDING: "Confirm order",
  CONFIRMED: "Start processing",
  PROCESSING: "Mark as shipped",
  SHIPPED: "Mark as delivered",
};

// ── Confirm dialog ──────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  isOpen: boolean; title: string; message: string;
  onConfirm: () => void; onCancel: () => void; isLoading?: boolean;
}
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-[#131316] border border-white/[0.07] rounded-[18px] shadow-dm-card max-w-sm w-full p-6 motion-safe:animate-scale-in">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-dm-warning/[0.12] border border-dm-warning/[0.20] flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-dm-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#F0EDE8] text-[15px] font-space-grotesk">{title}</h3>
            <p className="text-[13px] text-[#F0EDE8]/46 mt-1 font-space-grotesk">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-[10px] border border-white/[0.08] text-[13px] font-semibold text-[#F0EDE8]/72 hover:bg-white/[0.06] transition-colors disabled:opacity-50 font-space-grotesk">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-[10px] bg-brand-orange text-[13px] font-semibold text-white shadow-glow-orange hover:bg-brand-orange-hover transition-all disabled:opacity-60 flex items-center justify-center gap-2 font-space-grotesk">
            {isLoading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check size={14} />}
            {isLoading ? "Updating…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Screenshot lightbox ────────────────────────────────────────────────────

const ScreenshotLightbox = ({ url, onClose }: { url: string; onClose: () => void }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center">
        <button onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-[#131316] border border-white/[0.07] flex items-center justify-center hover:bg-white/[0.08] transition-colors">
          <X size={14} className="text-[#F0EDE8]/72" />
        </button>
        <img src={url} alt="Payment screenshot"
          className="rounded-[12px] max-h-[85vh] w-auto object-contain shadow-dm-card" />
        <p className="text-[#F0EDE8]/34 text-[11px] mt-3 font-space-grotesk">Payment Screenshot · Press Esc to close</p>
      </div>
    </div>
  );
};

// ── Status dropdown (in drawer) ────────────────────────────────────────────

interface StatusDropdownProps {
  type: "order" | "payment"; current: string; orderId: string;
  onUpdate: (id: string, type: "order" | "payment", status: string) => void;
}
const StatusDropdown: React.FC<StatusDropdownProps> = ({ type, current, orderId, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const config = type === "order" ? ORDER_STATUS_CONFIG : PAYMENT_STATUS_CONFIG;
  const options = type === "order" ? ORDER_STATUSES : PAYMENT_STATUSES;
  const cur = config[current] ?? { label: current, dot: "bg-gray-400", badge: "" };

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border transition-all duration-150 hover:opacity-80">
        <span className={`w-1.5 h-1.5 rounded-full ${cur.dot}`} />
        <span className="text-[#F0EDE8]/72">{cur.label}</span>
        <ChevronDown size={11} className={`text-[#F0EDE8]/34 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-30 bg-[#131316] border border-white/[0.07] rounded-[10px] shadow-dm-drop py-1 min-w-[150px] motion-safe:animate-slide-down"
          onClick={(e) => e.stopPropagation()}>
          <p className="px-3 py-1.5 text-[10px] font-semibold text-[#F0EDE8]/34 uppercase tracking-wider border-b border-white/[0.05] mb-1 font-space-grotesk">
            {type === "order" ? "Order Status" : "Payment Status"}
          </p>
          {options.map((s) => {
            const cfg = config[s];
            const isActive = s === current;
            return (
              <button key={s} onClick={() => { setOpen(false); if (!isActive) onUpdate(orderId, type, s); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium transition-colors text-left font-space-grotesk
                  ${isActive ? "bg-brand-orange/[0.12] text-brand-orange" : "text-[#F0EDE8]/58 hover:bg-white/[0.04]"}`}>
                <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                {cfg.label}
                {isActive && <Check size={12} className="ml-auto text-brand-orange" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── Order drawer ────────────────────────────────────────────────────────────

interface OrderDrawerProps {
  order: Order;
  onClose: () => void;
  onUpdate: (id: string, type: "order" | "payment", status: string) => void;
  onViewScreenshot: (url: string) => void;
}

const OrderDrawer: React.FC<OrderDrawerProps> = ({ order, onClose, onUpdate, onViewScreenshot }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const itemsCount = order.orderItems.reduce((s, i) => s + i.quantity, 0);
  const stepIdx = ORDER_FLOW.indexOf(order.orderStatus as typeof ORDER_FLOW[number]);
  const cancelled = order.orderStatus === "CANCELLED";

  const payBg = order.paymentStatus === "PENDING"
    ? "border-dm-warning/[0.20] bg-dm-warning/[0.07]"
    : order.paymentStatus === "FAILED"
    ? "border-dm-danger/[0.20] bg-dm-danger/[0.07]"
    : "border-dm-success/[0.20] bg-dm-success/[0.07]";

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] motion-safe:animate-fade-in" onClick={onClose} />
      <aside className="relative w-full max-w-[460px] h-full bg-[#0f0f11] border-l border-white/[0.07] shadow-dm-drawer overflow-y-auto dm-scroll motion-safe:animate-drawer-in flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0f0f11] border-b border-white/[0.07] px-5 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-[19px] font-bold text-[#F0EDE8] tracking-tight font-space-grotesk">
                Order #{order.orderNumber}
              </h2>
              <StatusBadge status={order.orderStatus} type="order" />
            </div>
            <p className="text-[12.5px] text-[#F0EDE8]/46 mt-1 font-space-grotesk">
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"} · {itemsCount} item{itemsCount > 1 ? "s" : ""}
            </p>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-[8px] border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-[#F0EDE8]/46 hover:bg-white/[0.08] transition-all shrink-0">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 px-5 py-5 space-y-5">
          {/* Payment verification */}
          <section className={`border rounded-[14px] overflow-hidden ${payBg}`}>
            <div className="px-4 pt-4 pb-0 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#F0EDE8] font-space-grotesk">
                <Receipt size={15} /> Payment verification
              </div>
              <StatusBadge status={order.paymentStatus} type="payment" />
            </div>
            <div className="p-4 flex gap-4">
              {order.paymentScreenshotUrl ? (
                <button onClick={() => onViewScreenshot(order.paymentScreenshotUrl!)}
                  className="relative w-24 shrink-0 rounded-[8px] overflow-hidden border border-white/[0.07] group cursor-zoom-in">
                  <img src={order.paymentScreenshotUrl} alt="Payment" className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <ZoomIn size={18} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ) : (
                <div className="w-24 h-24 shrink-0 rounded-[8px] border border-dashed border-dm-danger/[0.20] flex flex-col items-center justify-center gap-1.5 text-dm-danger">
                  <ImageOff size={18} />
                  <span className="text-[10px] font-space-grotesk">No screenshot</span>
                </div>
              )}
              <div className="flex-1 min-w-0 space-y-2">
                {order.totalAmount && (
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-[#F0EDE8]/34 font-space-grotesk">Amount</span>
                    <span className="text-[#F0EDE8] font-bold font-space-mono">
                      Nu.{parseFloat(order.totalAmount).toLocaleString()}
                    </span>
                  </div>
                )}
                {order.storeSubdomain && (
                  <div className="flex justify-between text-[12.5px]">
                    <span className="text-[#F0EDE8]/34 font-space-grotesk">Store</span>
                    <span className="text-[#F0EDE8]/72 font-space-mono">{order.storeSubdomain}</span>
                  </div>
                )}
              </div>
            </div>
            {order.paymentStatus === "PENDING" && !cancelled && (
              <div className="px-4 pb-4 flex gap-2">
                <button onClick={() => onUpdate(order.id, "payment", "RECEIVED")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] bg-dm-success/[0.12] text-dm-success border border-dm-success/[0.20] text-[13px] font-semibold hover:bg-dm-success/[0.20] transition-colors font-space-grotesk">
                  <Check size={14} /> Approve
                </button>
                <button onClick={() => onUpdate(order.id, "payment", "FAILED")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] bg-dm-danger/[0.12] text-dm-danger border border-dm-danger/[0.20] text-[13px] font-semibold hover:bg-dm-danger/[0.20] transition-colors font-space-grotesk">
                  <X size={14} /> Reject
                </button>
              </div>
            )}
            {order.paymentStatus === "RECEIVED" && (
              <div className="px-4 pb-3 flex items-center gap-1.5 text-[12.5px] text-dm-success font-space-grotesk">
                <Check size={13} /> Verified — funds confirmed.
              </div>
            )}
          </section>

          {/* Order status flow */}
          {!cancelled ? (
            <section>
              <p className="text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-widest font-space-grotesk mb-3">
                Order status
              </p>
              <div className="flex items-center mb-4">
                {ORDER_FLOW.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className="flex flex-col items-center gap-1.5 flex-none w-14">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${i <= stepIdx ? "bg-brand-orange text-white shadow-glow-orange" : "bg-white/[0.06] text-[#F0EDE8]/34"}`}>
                        {i < stepIdx ? <Check size={12} /> : i + 1}
                      </div>
                      <span className={`text-[9px] text-center leading-tight font-space-grotesk
                        ${i <= stepIdx ? "text-[#F0EDE8]/58" : "text-[#F0EDE8]/24"}`}>
                        {ORDER_STATUS_CONFIG[s]?.label ?? s}
                      </span>
                    </div>
                    {i < ORDER_FLOW.length - 1 && (
                      <div className={`flex-1 h-0.5 mb-4 ${i < stepIdx ? "bg-brand-orange" : "bg-white/[0.06]"}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex gap-2">
                {NEXT_LABEL[order.orderStatus] && (
                  <button
                    onClick={() => {
                      const ni = stepIdx + 1;
                      if (ni < ORDER_FLOW.length) onUpdate(order.id, "order", ORDER_FLOW[ni]);
                    }}
                    disabled={order.paymentStatus !== "RECEIVED"}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[10px] bg-brand-orange text-white text-[13px] font-semibold shadow-glow-orange hover:bg-brand-orange-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed font-space-grotesk">
                    <ChevronRight size={14} /> {NEXT_LABEL[order.orderStatus]}
                  </button>
                )}
                {order.orderStatus !== "DELIVERED" && (
                  <button onClick={() => onUpdate(order.id, "order", "CANCELLED")}
                    className="px-4 py-2.5 rounded-[10px] border border-white/[0.08] text-[13px] font-semibold text-[#F0EDE8]/58 hover:bg-white/[0.06] transition-colors font-space-grotesk">
                    Cancel
                  </button>
                )}
              </div>
              {order.paymentStatus !== "RECEIVED" && order.orderStatus === "PENDING" && (
                <p className="mt-2 text-[11.5px] text-[#F0EDE8]/34 font-space-grotesk">
                  Verify the payment above before confirming this order.
                </p>
              )}
            </section>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 rounded-[10px] bg-dm-danger/[0.12] border border-dm-danger/[0.20] text-[13px] text-dm-danger font-space-grotesk">
              <X size={14} /> This order was cancelled.
            </div>
          )}

          {/* Items */}
          <section>
            <p className="text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-widest font-space-grotesk mb-3">Items</p>
            <div className="border border-white/[0.07] rounded-[10px] overflow-hidden">
              {order.orderItems.map((item, i) => (
                <div key={item.id ?? i}
                  className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-white/[0.05]" : ""}`}>
                  {item.product?.productImageUrl ? (
                    <img src={item.product.productImageUrl} alt={item.product.productName}
                      className="w-11 h-11 rounded-[8px] object-cover border border-white/[0.07] shrink-0" />
                  ) : (
                    <div className="w-11 h-11 rounded-[8px] bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0">
                      <Package size={16} className="text-[#F0EDE8]/34" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#F0EDE8] truncate font-space-grotesk">
                      {item.product?.productName ?? "Unknown"}
                    </p>
                    <p className="text-[11.5px] text-[#F0EDE8]/46 font-space-mono">
                      Nu.{parseFloat(item.unitPrice).toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-[13px] font-bold text-[#F0EDE8] font-space-mono shrink-0">
                    Nu.{(item.quantity * parseFloat(item.unitPrice)).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 border-t border-white/[0.07] bg-white/[0.02]">
                <span className="text-[13px] font-semibold text-[#F0EDE8]/58 font-space-grotesk">Total</span>
                <span className="text-[15px] font-bold text-brand-orange font-space-mono">
                  Nu.{parseFloat(order.totalAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </section>

          {/* Customer */}
          {order.customer && (
            <section>
              <p className="text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-widest font-space-grotesk mb-3">Customer</p>
              <div className="space-y-2 text-[12.5px] text-[#F0EDE8]/58 font-space-grotesk">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={13} className="text-[#F0EDE8]/34 shrink-0" />
                  <span className="font-semibold text-[#F0EDE8]/72">{order.customer.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-[#F0EDE8]/34 shrink-0" />
                  {order.customer.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-[#F0EDE8]/34 shrink-0" />
                  {order.customer.phoneNumber}
                </div>
              </div>
            </section>
          )}

          {/* Shipping */}
          {order.shippingAddress && (
            <section>
              <p className="text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-widest font-space-grotesk mb-3">Shipping</p>
              <div className="flex items-start gap-2 text-[12.5px] text-[#F0EDE8]/58 font-space-grotesk">
                <MapPin size={13} className="text-[#F0EDE8]/34 mt-0.5 shrink-0" />
                <span>{order.shippingAddress}, {order.shippingCity}, {order.shippingState}, {order.shippingCountry}</span>
              </div>
            </section>
          )}

          {/* Notes */}
          {order.customerNotes && (
            <div className="flex items-start gap-2 px-4 py-3 rounded-[10px] bg-dm-warning/[0.07] border border-dm-warning/[0.20] text-[12.5px] text-dm-warning font-space-grotesk">
              <StickyNote size={13} className="mt-0.5 shrink-0" />
              <span>{order.customerNotes}</span>
            </div>
          )}

          {/* Update status controls */}
          <section>
            <p className="text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-widest font-space-grotesk mb-3">Update Status</p>
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-[10px] px-4 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#F0EDE8]/58 font-space-grotesk">Order</span>
                <StatusDropdown type="order" current={order.orderStatus} orderId={order.id} onUpdate={onUpdate} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#F0EDE8]/58 font-space-grotesk">Payment</span>
                <StatusDropdown type="payment" current={order.paymentStatus} orderId={order.id} onUpdate={onUpdate} />
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
};

// ── Empty state ────────────────────────────────────────────────────────────

const EmptyOrders = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-14 h-14 rounded-[14px] bg-brand-orange/[0.10] border border-brand-orange/[0.20] flex items-center justify-center mb-4">
      <ShoppingBag size={24} className="text-brand-orange" />
    </div>
    <h3 className="text-[15px] font-semibold text-[#F0EDE8] mb-1 font-space-grotesk">No orders found</h3>
    <p className="text-[13px] text-[#F0EDE8]/46 max-w-xs font-space-grotesk">
      Try a different filter or search term.
    </p>
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────

const OrdersView: React.FC<OrdersViewProps> = ({
  orders, loading, error, refetch,
  updateOrderStatus, updatePaymentStatus,
  searchQuery, expandedRow, setExpandedRow,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [pendingUpdate, setPendingUpdate] = useState<{
    orderId: string; type: "order" | "payment"; newStatus: string;
  } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const ORDER_TABS = ["ALL", "PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

  const handleStatusChangeRequest = useCallback(
    (orderId: string, type: "order" | "payment", newStatus: string) => {
      setPendingUpdate({ orderId, type, newStatus });
    }, []
  );

  const handleConfirmUpdate = useCallback(async () => {
    if (!pendingUpdate) return;
    setIsUpdating(true);
    try {
      if (pendingUpdate.type === "order") await updateOrderStatus(pendingUpdate.orderId, pendingUpdate.newStatus);
      else await updatePaymentStatus(pendingUpdate.orderId, pendingUpdate.newStatus);
    } finally {
      setIsUpdating(false);
      setPendingUpdate(null);
    }
  }, [pendingUpdate, updateOrderStatus, updatePaymentStatus]);

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      String(o.orderNumber).includes(searchQuery) ||
      o.storeSubdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderItems.some((item) =>
        item.product?.productName?.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      (o.customer?.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchTab = statusFilter === "ALL" || o.orderStatus === statusFilter;
    return matchSearch && matchTab;
  });

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.orderStatus] = (acc[o.orderStatus] ?? 0) + 1;
    return acc;
  }, {});

  const pages = Math.ceil(filteredOrders.length / perPage);
  const shown = filteredOrders.slice((page - 1) * perPage, page * perPage);

  useEffect(() => { setPage(1); }, [statusFilter, searchQuery]);

  const selectedOrder = expandedRow ? orders.find((o) => o.id === expandedRow) ?? null : null;

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/[0.04] rounded-[12px] animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-dm-danger/[0.12] border border-dm-danger/[0.20] flex items-center justify-center">
          <AlertCircle size={20} className="text-dm-danger" />
        </div>
        <p className="text-[13px] font-medium text-[#F0EDE8]/72 font-space-grotesk">{error}</p>
        <button onClick={refetch}
          className="flex items-center gap-1.5 text-[13px] text-brand-orange hover:text-brand-orange-hover font-semibold font-space-grotesk transition-colors">
          <RefreshCw size={13} /> Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {/* Filters row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {ORDER_TABS.map((s) => {
              const cfg = ORDER_STATUS_CONFIG[s];
              const count = s === "ALL" ? orders.length : (statusCounts[s] ?? 0);
              const isActive = statusFilter === s;
              return (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-150 font-space-grotesk
                    ${isActive
                      ? "bg-brand-orange/[0.15] text-brand-orange border border-brand-orange/[0.30]"
                      : "bg-white/[0.04] text-[#F0EDE8]/46 border border-white/[0.08] hover:border-white/[0.14] hover:text-[#F0EDE8]/72"
                    }`}>
                  {cfg && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
                  {s === "ALL" ? "All" : (cfg?.label ?? s)}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold font-space-mono
                    ${isActive ? "bg-brand-orange/[0.20] text-brand-orange" : "bg-white/[0.06] text-[#F0EDE8]/34"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <button onClick={refetch}
            className="flex items-center gap-1.5 text-[12px] text-[#F0EDE8]/46 hover:text-brand-orange transition-colors font-space-grotesk">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block bg-[#131316] border border-white/[0.07] rounded-[18px] overflow-hidden">
          {shown.length === 0 ? <EmptyOrders /> : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  {["Order", "Customer", "Items", "Total", "Payment", "Status", ""].map((h, i) => (
                    <th key={i} className="px-5 py-3.5 text-left text-[11px] font-semibold text-[#F0EDE8]/34 uppercase tracking-[0.06em] font-space-grotesk">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((order) => {
                  const items = order.orderItems.reduce((s, i) => s + i.quantity, 0);
                  const needsAttention = order.paymentStatus === "PENDING";
                  return (
                    <tr key={order.id}
                      className={`border-b border-white/[0.05] cursor-pointer transition-colors
                        ${needsAttention ? "bg-dm-warning/[0.02] hover:bg-dm-warning/[0.04]" : "hover:bg-white/[0.03]"}`}
                      style={needsAttention ? { boxShadow: "inset 3px 0 0 #FBBF24" } : undefined}
                      onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0
                            ${needsAttention ? "bg-dm-warning/[0.12] border border-dm-warning/[0.20]" : "bg-brand-orange/[0.12]"}`}>
                            <ShoppingBag size={14} className={needsAttention ? "text-dm-warning" : "text-brand-orange"} />
                          </div>
                          <div>
                            <span className="font-bold text-[#F0EDE8] font-space-mono">#{order.orderNumber}</span>
                            {order.createdAt && (
                              <p className="text-[11px] text-[#F0EDE8]/34 font-space-mono">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <CustomerAvatar name={order.customer?.customerName ?? "?"} size={32} />
                          <div>
                            <p className="text-[13px] font-semibold text-[#F0EDE8] font-space-grotesk">
                              {order.customer?.customerName ?? "—"}
                            </p>
                            {order.shippingCity && (
                              <p className="text-[11px] text-[#F0EDE8]/34 font-space-grotesk">{order.shippingCity}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[13px] text-[#F0EDE8]/46 font-space-grotesk">
                        {items} item{items > 1 ? "s" : ""}
                      </td>
                      <td className="px-5 py-4 font-bold text-[#F0EDE8] font-space-mono text-[13.5px]">
                        Nu.{parseFloat(order.totalAmount).toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.paymentStatus} type="payment" />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.orderStatus} type="order" />
                      </td>
                      <td className="px-5 py-4 text-right">
                        {needsAttention ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dm-warning/[0.12] border border-dm-warning/[0.25] text-[11px] font-semibold text-dm-warning font-space-grotesk whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-dm-warning animate-pulse-dot shrink-0" />
                            Verify payment
                          </span>
                        ) : (
                          <ChevronRight size={15} className="text-[#F0EDE8]/34 inline" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {shown.length > 0 && (
            <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.07] flex-wrap gap-3">
              <span className="text-[12.5px] text-[#F0EDE8]/34 font-space-grotesk">
                Showing {shown.length} of {filteredOrders.length} orders
              </span>
              {pages > 1 && (
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                    <button key={n} onClick={() => setPage(n)}
                      className={`w-8 h-8 rounded-[8px] text-[12px] font-semibold transition-colors font-space-mono
                        ${n === page
                          ? "bg-brand-orange text-white shadow-glow-orange"
                          : "bg-white/[0.04] text-[#F0EDE8]/46 border border-white/[0.08] hover:bg-white/[0.08]"
                        }`}>
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-3">
          {shown.length === 0 ? <EmptyOrders /> : shown.map((order) => {
            const items = order.orderItems.reduce((s, i) => s + i.quantity, 0);
            const needsAttention = order.paymentStatus === "PENDING";
            return (
              <div key={order.id}
                className={`rounded-[14px] border overflow-hidden cursor-pointer transition-all duration-200
                  ${needsAttention
                    ? "bg-dm-warning/[0.02] border-dm-warning/[0.30]"
                    : `bg-[#131316] ${expandedRow === order.id ? "border-brand-orange/[0.25]" : "border-white/[0.07] hover:border-white/[0.12]"}`
                  }`}
                style={needsAttention ? { boxShadow: "inset 3px 0 0 #FBBF24" } : undefined}
                onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}>
                <div className="p-4 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#F0EDE8] font-space-mono">#{order.orderNumber}</span>
                        {needsAttention && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-dm-warning/[0.12] border border-dm-warning/[0.25] text-[10px] font-semibold text-dm-warning font-space-grotesk">
                            <span className="w-1 h-1 rounded-full bg-dm-warning animate-pulse-dot" />
                            Verify
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-[#F0EDE8] font-space-mono text-[14px] shrink-0">
                        Nu.{parseFloat(order.totalAmount).toLocaleString()}
                      </span>
                    </div>
                    {order.customer && (
                      <p className="text-[12px] text-[#F0EDE8]/46 mt-0.5 font-space-grotesk">{order.customer.customerName}</p>
                    )}
                    <p className="text-[11px] text-[#F0EDE8]/34 mt-0.5 font-space-grotesk">
                      {items} item{items !== 1 ? "s" : ""}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <StatusBadge status={order.orderStatus} type="order" />
                      <StatusBadge status={order.paymentStatus} type="payment" />
                    </div>
                  </div>
                  <ChevronRight size={16} className={`text-[#F0EDE8]/34 mt-1 shrink-0 transition-transform duration-200 ${expandedRow === order.id ? "rotate-90" : ""}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order drawer */}
      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          onClose={() => setExpandedRow(null)}
          onUpdate={handleStatusChangeRequest}
          onViewScreenshot={setScreenshotUrl}
        />
      )}

      {/* Screenshot lightbox */}
      {screenshotUrl && <ScreenshotLightbox url={screenshotUrl} onClose={() => setScreenshotUrl(null)} />}

      {/* Confirm dialog */}
      <ConfirmDialog
        isOpen={!!pendingUpdate}
        title="Update Status"
        message={pendingUpdate
          ? `Change ${pendingUpdate.type} status to "${
              pendingUpdate.type === "order"
                ? ORDER_STATUS_CONFIG[pendingUpdate.newStatus]?.label
                : PAYMENT_STATUS_CONFIG[pendingUpdate.newStatus]?.label
            }"?`
          : ""}
        onConfirm={handleConfirmUpdate}
        onCancel={() => setPendingUpdate(null)}
        isLoading={isUpdating}
      />
    </>
  );
};

export default OrdersView;
