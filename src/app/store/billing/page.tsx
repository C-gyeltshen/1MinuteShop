"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/shared/store/authStore";
import {
  subscriptionServices,
  SubscriptionPayment,
  SubscriptionStatus,
} from "@/app/shared/services/subscriptionServices";

const card = "bg-[#131316] border border-white/[0.07] rounded-[18px] p-5";
const fmt = (d: string) => new Date(d).toLocaleDateString(undefined, { dateStyle: "medium" });

const STATUS_STYLE: Record<string, string> = {
  PENDING: "text-yellow-300 bg-yellow-400/10",
  APPROVED: "text-green-300 bg-green-400/10",
  REJECTED: "text-red-300 bg-red-400/10",
};

export default function BillingPage() {
  const auth = useContext(AuthContext);
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [payments, setPayments] = useState<SubscriptionPayment[]>([]);
  const [months, setMonths] = useState(1);
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const [s, p] = await Promise.all([subscriptionServices.getStatus(), subscriptionServices.listMine()]);
      setStatus(s);
      setPayments(p);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    if (auth?.isAuthenticated) load();
  }, [auth?.isAuthenticated, load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setError("Please attach your payment screenshot");
    setSubmitting(true);
    setError(null);
    setNotice(null);
    try {
      await subscriptionServices.submitPayment(file, months, reference);
      setNotice("Payment submitted. We'll review it shortly and notify you.");
      setFile(null);
      setReference("");
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (auth && !auth.isLoading && !auth.isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#f0ede8] flex items-center justify-center">
        <Link href="/login" className="underline">Log in to manage your subscription</Link>
      </main>
    );
  }

  const headline = !status
    ? "Loading…"
    : status.state === "TRIALING"
      ? `Free trial — ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"} left`
      : status.state === "ACTIVE"
        ? `Active — ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"} left`
        : "Expired — your store is paused";

  return (
    <main className="min-h-screen bg-[#080808] text-[#f0ede8] font-space-grotesk px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <Link href="/store/dashboard" className="text-sm text-[rgba(240,237,232,0.5)] hover:text-white">← Back to dashboard</Link>
        <h1 className="text-2xl font-bold">Subscription</h1>

        <section className={card}>
          <div className="text-xs uppercase tracking-widest text-[#E07328] mb-1">Status</div>
          <div className="text-xl font-semibold">{headline}</div>
          {status && (
            <p className="text-sm text-[rgba(240,237,232,0.5)] mt-1">
              Store is live until {fmt(status.accessEndsAt)} · BTN {status.monthlyPrice}/month
            </p>
          )}
        </section>

        <section className={card}>
          <h2 className="font-semibold mb-3">Pay for a subscription</h2>
          {status?.paymentInstructions && (
            <p className="text-sm bg-white/[0.04] rounded-lg p-3 mb-4 whitespace-pre-line">{status.paymentInstructions}</p>
          )}

          {status?.hasPendingPayment ? (
            <p className="text-sm text-yellow-300">Your payment is waiting for review. You can submit another once it&apos;s processed.</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <label className="text-sm flex flex-col gap-1">
                Months
                <select
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="bg-[#0c0c0c] border border-white/10 rounded-lg px-3 py-2"
                >
                  {[1, 3, 6, 12].map((m) => (
                    <option key={m} value={m}>
                      {m} month{m > 1 ? "s" : ""} — BTN {(status?.monthlyPrice ?? 99) * m}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm flex flex-col gap-1">
                Transaction / journal number (optional)
                <input
                  value={reference}
                  maxLength={100}
                  onChange={(e) => setReference(e.target.value)}
                  className="bg-[#0c0c0c] border border-white/10 rounded-lg px-3 py-2"
                />
              </label>

              <label className="text-sm flex flex-col gap-1">
                Payment screenshot
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="text-sm"
                />
              </label>

              <button
                disabled={submitting}
                className="rounded-xl bg-[#E07328] py-3 font-semibold text-white disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit payment"}
              </button>
            </form>
          )}

          {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
          {notice && <p className="text-sm text-green-400 mt-3">{notice}</p>}
        </section>

        <section className={card}>
          <h2 className="font-semibold mb-3">Payment history</h2>
          {payments.length === 0 ? (
            <p className="text-sm text-[rgba(240,237,232,0.5)]">No payments yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-white/[0.06]">
              {payments.map((p) => (
                <li key={p.id} className="py-3 flex items-start justify-between gap-3 text-sm">
                  <div>
                    <div>BTN {p.amount} · {p.months} month{p.months > 1 ? "s" : ""}</div>
                    <div className="text-xs text-[rgba(240,237,232,0.45)]">{fmt(p.createdAt)}</div>
                    {p.rejectReason && <div className="text-xs text-red-300 mt-1">Reason: {p.rejectReason}</div>}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
