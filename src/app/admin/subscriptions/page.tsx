"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/shared/store/authStore";
import {
  subscriptionServices,
  AdminSubscriptionPayment,
  PaymentStatus,
} from "@/app/shared/services/subscriptionServices";

const TABS: PaymentStatus[] = ["PENDING", "APPROVED", "REJECTED"];
const fmt = (d: string) => new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

export default function AdminSubscriptionsPage() {
  const auth = useContext(AuthContext);
  const [tab, setTab] = useState<PaymentStatus>("PENDING");
  const [rows, setRows] = useState<AdminSubscriptionPayment[]>([]);
  const [counts, setCounts] = useState<Record<PaymentStatus, number>>({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await subscriptionServices.adminList(tab);
      setRows(res.data);
      setCounts(res.counts);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    if (auth?.user?.isAdmin) load();
  }, [auth?.user?.isAdmin, load]);

  // New requests show up without a manual refresh
  useEffect(() => {
    if (!auth?.user?.isAdmin) return;
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [auth?.user?.isAdmin, load]);

  const act = async (id: string, fn: () => Promise<unknown>) => {
    setBusyId(id);
    setError(null);
    try {
      await fn();
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  const reject = (id: string) => {
    const reason = window.prompt("Reason for rejection (shown to the store owner):");
    if (reason && reason.trim().length >= 3) act(id, () => subscriptionServices.reject(id, reason.trim()));
  };

  if (auth?.isLoading) return <main className="min-h-screen bg-[#080808]" />;

  if (!auth?.user?.isAdmin) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#f0ede8] flex items-center justify-center">
        Not authorised.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-[#f0ede8] font-space-grotesk px-4 py-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        <Link href="/store/dashboard" className="text-sm text-[rgba(240,237,232,0.5)] hover:text-white">← Back to dashboard</Link>
        <h1 className="text-2xl font-bold">Subscription payments</h1>

        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm border ${
                tab === t ? "bg-[#E07328] border-[#E07328] text-white" : "border-white/10 text-[rgba(240,237,232,0.6)]"
              }`}
            >
              {t[0] + t.slice(1).toLowerCase()} ({counts[t]})
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {loading && rows.length === 0 && <p className="text-sm text-[rgba(240,237,232,0.5)]">Loading…</p>}
        {!loading && rows.length === 0 && <p className="text-sm text-[rgba(240,237,232,0.5)]">Nothing here.</p>}

        <ul className="flex flex-col gap-4">
          {rows.map((p) => (
            <li key={p.id} className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-5 flex flex-col sm:flex-row gap-4">
              {p.screenshotUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.screenshotUrl}
                  alt="Payment screenshot"
                  onClick={() => setPreview(p.screenshotUrl)}
                  className="w-full sm:w-36 h-44 object-cover rounded-lg cursor-zoom-in bg-black"
                />
              ) : (
                <div className="w-full sm:w-36 h-44 rounded-lg bg-black/40 text-xs flex items-center justify-center">Screenshot unavailable</div>
              )}

              <div className="flex-1 text-sm flex flex-col gap-1">
                <div className="font-semibold text-base">{p.storeOwner.storeName}</div>
                <div className="text-[rgba(240,237,232,0.6)]">{p.storeOwner.ownerName} · {p.storeOwner.email}</div>
                <div>BTN {p.amount} for {p.months} month{p.months > 1 ? "s" : ""}</div>
                {p.reference && <div>Ref: {p.reference}</div>}
                <div className="text-xs text-[rgba(240,237,232,0.45)]">
                  Submitted {fmt(p.createdAt)} · Store is {p.storeOwner.state.toLowerCase()}, live until {fmt(p.storeOwner.accessEndsAt)}
                </div>
                {p.rejectReason && <div className="text-xs text-red-300">Rejected: {p.rejectReason}</div>}

                {p.status === "PENDING" && (
                  <div className="flex gap-2 mt-auto pt-3">
                    <button
                      disabled={busyId === p.id}
                      onClick={() => act(p.id, () => subscriptionServices.approve(p.id))}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-60"
                    >
                      Approve
                    </button>
                    <button
                      disabled={busyId === p.id}
                      onClick={() => reject(p.id)}
                      className="px-4 py-2 rounded-lg border border-red-500/40 text-red-300 disabled:opacity-60"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {preview && (
        <div onClick={() => setPreview(null)} className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out z-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Payment screenshot" className="max-h-full max-w-full object-contain" />
        </div>
      )}
    </main>
  );
}
