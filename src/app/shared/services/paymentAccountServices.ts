import type { BankCode } from "../banks";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export interface PaymentAccount {
  bank: BankCode;
  accountNumber: string;
  accountName: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "include", ...init });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json?.errors?.[0]?.message || json.message || `Request failed (${res.status})`);
  }
  return json as T;
}

export const paymentAccountServices = {
  // Owner: null until an account has been added
  getMine: async () => (await request<{ data: PaymentAccount | null }>("/payment-account")).data,

  save: async (account: PaymentAccount) =>
    (
      await request<{ data: PaymentAccount }>("/payment-account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      })
    ).data,

  // Customer: resolves to null when the store has not added an account (not accepting orders)
  getPublic: async (subDomain: string): Promise<PaymentAccount | null> => {
    const res = await fetch(`${API_BASE}/payment-account/public/${subDomain}`);
    if (res.status === 409) return null;
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.message || `Request failed (${res.status})`);
    return json.data;
  },
};
