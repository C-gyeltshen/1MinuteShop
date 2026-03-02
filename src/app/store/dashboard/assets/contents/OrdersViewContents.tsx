// Order status options
export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

// Payment status options
export const PAYMENT_STATUSES = ["PENDING", "RECEIVED", "FAILED"] as const;

// Order status display config
export const ORDER_STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  PENDING: {
    label: "Pending",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  CONFIRMED: {
    label: "Confirmed",
    dot: "bg-blue-400",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  },
  PROCESSING: {
    label: "Processing",
    dot: "bg-violet-400",
    badge: "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
  },
  SHIPPED: {
    label: "Shipped",
    dot: "bg-cyan-400",
    badge: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",
  },
  DELIVERED: {
    label: "Delivered",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  CANCELLED: {
    label: "Cancelled",
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
};

// Payment status display config
export const PAYMENT_STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  PENDING: {
    label: "Awaiting",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },
  RECEIVED: {
    label: "Received",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },
  FAILED: {
    label: "Failed",
    dot: "bg-red-400",
    badge: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
};