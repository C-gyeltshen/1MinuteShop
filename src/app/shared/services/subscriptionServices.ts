const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export type PaymentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface SubscriptionStatus {
  state: "TRIALING" | "ACTIVE" | "EXPIRED";
  hasAccess: boolean;
  daysLeft: number;
  trialEndsAt: string;
  subscriptionEndsAt: string | null;
  accessEndsAt: string;
  monthlyPrice: number;
  currency: string;
  hasPendingPayment: boolean;
  paymentInstructions: string | null;
}

export interface SubscriptionPayment {
  id: string;
  months: number;
  amount: string;
  reference: string | null;
  status: PaymentStatus;
  rejectReason: string | null;
  createdAt: string;
  reviewedAt: string | null;
}

export interface AdminSubscriptionPayment extends SubscriptionPayment {
  screenshotUrl: string | null;
  storeOwner: {
    id: string;
    storeName: string;
    ownerName: string;
    email: string;
    storeSubdomain: string | null;
    state: "TRIALING" | "ACTIVE" | "EXPIRED";
    accessEndsAt: string;
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "include", ...init });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Request failed (${res.status})`);
  }
  return json as T;
}

export const subscriptionServices = {
  getStatus: async () => (await request<{ data: SubscriptionStatus }>("/subscription")).data,

  listMine: async () => (await request<{ data: SubscriptionPayment[] }>("/subscription/payments")).data,

  submitPayment: async (file: File, months: number, reference: string) => {
    const form = new FormData();
    form.append("file", file);
    form.append("months", String(months));
    if (reference.trim()) form.append("reference", reference.trim());
    return request("/subscription/payments", { method: "POST", body: form });
  },

  adminList: (status?: PaymentStatus) =>
    request<{
      data: AdminSubscriptionPayment[];
      counts: Record<PaymentStatus, number>;
    }>(`/admin/subscription-payments${status ? `?status=${status}` : ""}`),

  approve: (id: string) =>
    request(`/admin/subscription-payments/${id}/approve`, { method: "PATCH" }),

  reject: (id: string, reason: string) =>
    request(`/admin/subscription-payments/${id}/reject`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    }),
};
