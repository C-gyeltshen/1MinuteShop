"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Package,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ShoppingBag,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  StickyNote,
  ImageOff,
  X,
  ZoomIn,
  Check,
  AlertTriangle,
  Receipt,
} from "lucide-react";
import { Order, OrdersViewProps } from "./Types";
import { useOrders } from "../hooks/Useorders";
import {
  ORDER_STATUS_CONFIG,
  PAYMENT_STATUS_CONFIG,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from "../assets/contents/OrdersViewContents";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PendingUpdate {
  orderId: string;
  type: "order" | "payment";
  newStatus: string;
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{message}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check size={15} />
            )}
            {isLoading ? "Updating…" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Screenshot Lightbox ──────────────────────────────────────────────────────

const ScreenshotLightbox = ({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-2xl w-full max-h-[90vh] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <X size={16} className="text-gray-700" />
        </button>
        <img
          src={url}
          alt="Payment screenshot"
          className="rounded-xl max-h-[85vh] w-auto object-contain shadow-2xl"
        />
        <p className="text-white/60 text-xs mt-3">
          Payment Screenshot · Press Esc to close
        </p>
      </div>
    </div>
  );
};

// ─── Static Status Badge (collapsed row) ─────────────────────────────────────

const StaticOrderBadge = ({ status }: { status: string }) => {
  const cfg = ORDER_STATUS_CONFIG[status] ?? {
    label: status,
    dot: "bg-gray-400",
    badge: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

const StaticPaymentBadge = ({ status }: { status: string }) => {
  const cfg = PAYMENT_STATUS_CONFIG[status] ?? {
    label: status,
    dot: "bg-gray-400",
    badge: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─── Status Dropdown (expanded row only) ─────────────────────────────────────

interface StatusDropdownProps {
  type: "order" | "payment";
  current: string;
  orderId: string;
  onUpdate: (
    orderId: string,
    type: "order" | "payment",
    newStatus: string
  ) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  type,
  current,
  orderId,
  onUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const config = type === "order" ? ORDER_STATUS_CONFIG : PAYMENT_STATUS_CONFIG;
  const options = type === "order" ? ORDER_STATUSES : PAYMENT_STATUSES;
  const currentCfg = config[current] ?? {
    label: current,
    dot: "bg-gray-400",
    badge: "bg-gray-50 text-gray-600 ring-1 ring-gray-200",
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all hover:opacity-80 active:scale-95 ${currentCfg.badge}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${currentCfg.dot}`} />
        {currentCfg.label}
        <ChevronDown
          size={11}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 z-30 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[150px]"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
            {type === "order" ? "Order Status" : "Payment Status"}
          </p>
          {options.map((status) => {
            const cfg = config[status];
            const isActive = status === current;
            return (
              <button
                key={status}
                onClick={() => {
                  setOpen(false);
                  if (!isActive) onUpdate(orderId, type, status);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors text-left ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                {cfg.label}
                {isActive && (
                  <Check size={12} className="ml-auto text-indigo-500" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Expanded Detail Panel ────────────────────────────────────────────────────

interface OrderDetailProps {
  order: Order;
  onUpdate: (
    orderId: string,
    type: "order" | "payment",
    newStatus: string
  ) => void;
  onViewScreenshot: (url: string) => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  onUpdate,
  onViewScreenshot,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
    {/* Left col: all order items */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <Receipt size={13} className="text-gray-400" />
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Order Items
        </h4>
      </div>
      <div className="divide-y divide-gray-100">
        {order.orderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            {item.product?.productImageUrl ? (
              <img
                src={item.product.productImageUrl}
                alt={item.product.productName}
                className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                <Package size={18} className="text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {item.product?.productName ?? "Unknown Product"}
              </p>
              <p className="text-xs text-gray-500">
                Qty: {item.quantity} × Nu.
                {Number.parseFloat(item.unitPrice).toLocaleString()}
              </p>
            </div>
            <span className="text-sm font-semibold text-gray-900 shrink-0">
              Nu.
              {(
                item.quantity * Number.parseFloat(item.unitPrice)
              ).toLocaleString()}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
          <span className="text-sm font-semibold text-gray-600">Total</span>
          <span className="text-sm font-bold text-gray-900">
            Nu.{Number.parseFloat(order.totalAmount).toLocaleString()}
          </span>
        </div>
      </div>
    </div>

    {/* Right col: status controls, screenshot, customer, shipping, notes */}
    <div className="space-y-3">
      {/* Status dropdowns */}
      <div className="bg-white rounded-xl border border-gray-200 px-4 py-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Update Status
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Order</span>
            <StatusDropdown
              type="order"
              current={order.orderStatus}
              orderId={order.id}
              onUpdate={onUpdate}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 font-medium">Payment</span>
            <StatusDropdown
              type="payment"
              current={order.paymentStatus}
              orderId={order.id}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      </div>

      {/* Payment screenshot */}
      {order.paymentScreenshotUrl && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Payment Screenshot
            </h4>
          </div>
          <div className="p-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewScreenshot(order.paymentScreenshotUrl!);
              }}
              className="relative group w-full rounded-lg overflow-hidden border border-gray-200 block"
            >
              <img
                src={order.paymentScreenshotUrl}
                alt="Payment screenshot"
                className="w-full h-36 object-cover transition-transform group-hover:scale-105 duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-lg">
                  <ZoomIn size={18} className="text-gray-700" />
                </div>
              </div>
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Click to view full screenshot
            </p>
          </div>
        </div>
      )}

      {/* Customer */}
      {order.customer && (
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-4 space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Customer
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <ShoppingBag size={13} className="text-gray-400" />
            <span className="font-medium">{order.customer.customerName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={13} className="text-gray-400" />
            {order.customer.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={13} className="text-gray-400" />
            {order.customer.phoneNumber}
          </div>
        </div>
      )}

      {/* Shipping */}
      {order.shippingAddress && (
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Shipping
          </h4>
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <MapPin size={13} className="text-gray-400 mt-0.5 shrink-0" />
            <span>
              {order.shippingAddress}, {order.shippingCity},{" "}
              {order.shippingState}, {order.shippingCountry}
            </span>
          </div>
        </div>
      )}

      {/* Notes */}
      {order.customerNotes && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 px-4 py-3">
          <div className="flex items-start gap-2 text-sm text-amber-800">
            <StickyNote size={13} className="text-amber-500 mt-0.5 shrink-0" />
            <span>{order.customerNotes}</span>
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-gray-400 px-1">
        <span>Store: {order.storeSubdomain}</span>
        {order.createdAt && (
          <>
            <span>·</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </>
        )}
      </div>
    </div>
  </div>
);

// ─── Desktop Table Row (lg+) ──────────────────────────────────────────────────

interface OrderRowProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (
    orderId: string,
    type: "order" | "payment",
    newStatus: string
  ) => void;
  onViewScreenshot: (url: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  isExpanded,
  onToggle,
  onUpdate,
  onViewScreenshot,
}) => {
  const itemCount = order.orderItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      {/* ── Collapsed row ── */}
      <tr
        className={`group transition-colors cursor-pointer select-none ${
          isExpanded ? "bg-indigo-50/60" : "hover:bg-gray-50"
        }`}
        onClick={onToggle}
      >
        {/* Order # */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
              <ShoppingBag size={14} className="text-indigo-600" />
            </div>
            <span className="font-semibold text-gray-900 tabular-nums">
              #{order.orderNumber}
            </span>
          </div>
        </td>

        {/* Payment screenshot thumbnail */}
        <td className="px-5 py-4">
          {order.paymentScreenshotUrl ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewScreenshot(order.paymentScreenshotUrl!);
              }}
              className="relative group/thumb w-10 h-10 rounded-lg overflow-hidden border border-gray-200 block shrink-0 hover:ring-2 hover:ring-indigo-400 transition-all"
            >
              <img
                src={order.paymentScreenshotUrl}
                alt="Payment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn
                  size={12}
                  className="text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                />
              </div>
            </button>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
              <ImageOff size={13} className="text-gray-400" />
            </div>
          )}
        </td>

        {/* Order status — static badge when collapsed */}
        <td className="px-5 py-4">
          <StaticOrderBadge status={order.orderStatus} />
        </td>

        {/* Payment status — static badge when collapsed */}
        <td className="px-5 py-4">
          <StaticPaymentBadge status={order.paymentStatus} />
        </td>

        {/* Total */}
        <td className="px-5 py-4">
          <span className="font-semibold text-gray-900">
            Nu.{Number.parseFloat(order.totalAmount).toLocaleString()}
          </span>
        </td>

        {/* Qty */}
        <td className="px-5 py-4 text-center">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold rounded-full px-2.5 py-0.5">
            {itemCount}
          </span>
        </td>

        {/* Expand chevron */}
        <td className="px-5 py-4 text-right">
          <span className="text-gray-400 group-hover:text-indigo-500 transition-colors">
            {isExpanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </span>
        </td>
      </tr>

      {/* ── Expanded detail row ── */}
      {isExpanded && (
        <tr className="bg-indigo-50/40 border-t border-indigo-100">
          <td colSpan={7} className="px-5 py-5">
            <OrderDetail
              order={order}
              onUpdate={onUpdate}
              onViewScreenshot={onViewScreenshot}
            />
          </td>
        </tr>
      )}
    </>
  );
};

// ─── Tablet + Mobile Card (below lg) ─────────────────────────────────────────

interface TabletOrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (
    orderId: string,
    type: "order" | "payment",
    newStatus: string
  ) => void;
  onViewScreenshot: (url: string) => void;
}

const TabletOrderCard: React.FC<TabletOrderCardProps> = ({
  order,
  isExpanded,
  onToggle,
  onUpdate,
  onViewScreenshot,
}) => {
  const itemCount = order.orderItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div
      className={`rounded-2xl border bg-white overflow-hidden transition-shadow ${
        isExpanded
          ? "shadow-md border-indigo-200"
          : "shadow-sm border-gray-200 hover:shadow-md"
      }`}
    >
      {/* ── Collapsed header — click anywhere to expand ── */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer"
        onClick={onToggle}
      >
        {/* Payment screenshot thumbnail */}
        {order.paymentScreenshotUrl ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewScreenshot(order.paymentScreenshotUrl!);
            }}
            className="relative group/thumb w-14 h-14 rounded-xl overflow-hidden border border-gray-100 shrink-0 hover:ring-2 hover:ring-indigo-400 transition-all"
          >
            <img
              src={order.paymentScreenshotUrl}
              alt="Payment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
              <ZoomIn
                size={14}
                className="text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity"
              />
            </div>
          </button>
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-100 flex items-center justify-center shrink-0">
            <ImageOff size={20} className="text-gray-400" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {/* Order # + total */}
          <div className="flex items-start justify-between gap-2">
            <span className="font-bold text-gray-900">#{order.orderNumber}</span>
            <span className="font-semibold text-gray-900 shrink-0">
              Nu.{Number.parseFloat(order.totalAmount).toLocaleString()}
            </span>
          </div>

          {/* Qty */}
          <p className="text-xs text-gray-400 mt-0.5">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </p>

          {/* Static badges in collapsed state */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <StaticOrderBadge status={order.orderStatus} />
            <StaticPaymentBadge status={order.paymentStatus} />
          </div>
        </div>

        <span className="text-gray-400 ml-1 shrink-0">
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </div>

      {/* ── Expanded detail ── */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          <OrderDetail
            order={order}
            onUpdate={onUpdate}
            onViewScreenshot={onViewScreenshot}
          />
        </div>
      )}
    </div>
  );
};

// ─── Empty State ──────────────────────────────────────────────────────────────

const EmptyOrders = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
      <ShoppingBag size={28} className="text-indigo-400" />
    </div>
    <h3 className="text-base font-semibold text-gray-800 mb-1">
      No orders yet
    </h3>
    <p className="text-sm text-gray-500 max-w-xs">
      When customers place orders in your store, they'll show up here.
    </p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const OrdersView: React.FC<OrdersViewProps> = ({
  searchQuery,
  expandedRow,
  setExpandedRow,
}) => {
  const {
    orders,
    loading,
    error,
    refetch,
    updateOrderStatus,
    updatePaymentStatus,
  } = useOrders();

  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [pendingUpdate, setPendingUpdate] = useState<PendingUpdate | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChangeRequest = (
    orderId: string,
    type: "order" | "payment",
    newStatus: string
  ) => {
    setPendingUpdate({ orderId, type, newStatus });
  };

  const handleConfirmUpdate = async () => {
    if (!pendingUpdate) return;
    setIsUpdating(true);
    try {
      if (pendingUpdate.type === "order") {
        await updateOrderStatus(pendingUpdate.orderId, pendingUpdate.newStatus);
      } else {
        await updatePaymentStatus(pendingUpdate.orderId, pendingUpdate.newStatus);
      }
    } finally {
      setIsUpdating(false);
      setPendingUpdate(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      String(o.orderNumber).includes(searchQuery) ||
      o.storeSubdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderItems.some((item) =>
        item.product?.productName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "ALL" || o.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
    return acc;
  }, {});

  const confirmMessage = pendingUpdate
    ? `Change ${pendingUpdate.type === "order" ? "order" : "payment"} status to "${
        pendingUpdate.type === "order"
          ? ORDER_STATUS_CONFIG[pendingUpdate.newStatus]?.label
          : PAYMENT_STATUS_CONFIG[pendingUpdate.newStatus]?.label
      }"?`
    : "";

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-100 rounded-xl animate-pulse"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <AlertCircle size={22} className="text-red-400" />
        </div>
        <p className="text-sm font-medium text-gray-700">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {/* Status filter pills */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {[
              "ALL",
              "PENDING",
              "CONFIRMED",
              "PROCESSING",
              "SHIPPED",
              "DELIVERED",
              "CANCELLED",
            ].map((s) => {
              const cfg = ORDER_STATUS_CONFIG[s];
              const count =
                s === "ALL" ? orders.length : (statusCounts[s] ?? 0);
              const isActive = statusFilter === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {cfg && (
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  )}
                  {s === "ALL" ? "All" : (cfg?.label ?? s)}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            onClick={refetch}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>

        {/* Desktop Table — lg and above */}
        <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {filteredOrders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    "Order",
                    "Screenshot",
                    "Status",
                    "Payment",
                    "Total",
                    "Qty",
                    "",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                        h === "Qty" ? "text-center" : ""
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <OrderRow
                    key={order.id}
                    order={order}
                    isExpanded={expandedRow === order.id}
                    onToggle={() =>
                      setExpandedRow(
                        expandedRow === order.id ? null : order.id
                      )
                    }
                    onUpdate={handleStatusChangeRequest}
                    onViewScreenshot={setScreenshotUrl}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Tablet + Mobile Cards — below lg */}
        <div className="lg:hidden space-y-3">
          {filteredOrders.length === 0 ? (
            <EmptyOrders />
          ) : (
            filteredOrders.map((order) => (
              <TabletOrderCard
                key={order.id}
                order={order}
                isExpanded={expandedRow === order.id}
                onToggle={() =>
                  setExpandedRow(expandedRow === order.id ? null : order.id)
                }
                onUpdate={handleStatusChangeRequest}
                onViewScreenshot={setScreenshotUrl}
              />
            ))
          )}
        </div>

        {filteredOrders.length > 0 && (
          <p className="text-xs text-gray-400 text-right">
            Showing {filteredOrders.length} of {orders.length} order
            {orders.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Screenshot lightbox */}
      {screenshotUrl && (
        <ScreenshotLightbox
          url={screenshotUrl}
          onClose={() => setScreenshotUrl(null)}
        />
      )}

      {/* Confirm status change dialog */}
      <ConfirmDialog
        isOpen={!!pendingUpdate}
        title="Update Status"
        message={confirmMessage}
        onConfirm={handleConfirmUpdate}
        onCancel={() => setPendingUpdate(null)}
        isLoading={isUpdating}
      />
    </>
  );
};

export default OrdersView;