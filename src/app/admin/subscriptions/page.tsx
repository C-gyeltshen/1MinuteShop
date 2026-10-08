"use client";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/shared/store/authStore";
import {
  subscriptionServices,
  AdminSubscriptionPayment,
  PaymentStatus,
} from "@/app/shared/services/subscriptionServices";

const TABS: { key: PaymentStatus; label: string }[] = [
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
];

const STATUS_STYLE: Record<PaymentStatus, string> = {
  PENDING: "text-yellow-300 bg-yellow-400/10 border-yellow-400/20",
  APPROVED: "text-green-300 bg-green-400/10 border-green-400/20",
  REJECTED: "text-red-300 bg-red-400/10 border-red-400/20",
};

const STORE_STATE_STYLE: Record<string, string> = {
  TRIALING: "text-blue-300 bg-blue-400/10",
  ACTIVE: "text-green-300 bg-green-400/10",
  EXPIRED: "text-red-300 bg-red-400/10",
};

const date = (d?: string | null) => (d ? new Date(d).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—");
const dateTime = (d?: string | null) =>
  d ? new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/40 whitespace-nowrap";
const td = "px-4 py-3 align-top";

export default function AdminSubscriptionsPage() {
  const auth = useContext(AuthContext);
  const isAdmin = auth?.user?.isAdmin;

  const [tab, setTab] = useState<PaymentStatus>("PENDING");
  const [rows, setRows] = useState<AdminSubscriptionPayment[]>([]);
  const [counts, setCounts] = useState<Record<PaymentStatus, number>>({ PENDING: 0, APPROVED: 0, REJECTED: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [rejecting, setRejecting] = useState<AdminSubscriptionPayment | null>(null);
  const [reason, setReason] = useState("");

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
    if (isAdmin) load();
  }, [isAdmin, load]);

  // New requests show up without a manual refresh
  useEffect(() => {
    if (!isAdmin) return;
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [isAdmin, load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((p) =>
      [p.storeOwner.storeName, p.storeOwner.ownerName, p.storeOwner.email, p.storeOwner.storeSubdomain, p.reference]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const totalShown = useMemo(() => filtered.reduce((sum, p) => sum + Number(p.amount), 0), [filtered]);

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

  const confirmReject = async () => {
    if (!rejecting || reason.trim().length < 3) return;
    const id = rejecting.id;
    const text = reason.trim();
    setRejecting(null);
    setReason("");
    await act(id, () => subscriptionServices.reject(id, text));
  };

  if (auth?.isLoading) return <main className="min-h-screen bg-[#080808]" />;

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#f0ede8] flex items-center justify-center">
        Not authorised.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-[#f0ede8] font-space-grotesk px-4 py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <Link href="/store/dashboard" className="text-sm text-white/50 hover:text-white">← Back to dashboard</Link>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Subscription payments</h1>
            <p className="text-sm text-white/45">Review payment screenshots and activate stores.</p>
          </div>
          <button onClick={load} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/5">
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* Summary cards double as tabs */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-2xl border p-4 text-left transition-colors ${
                tab === t.key ? "border-[#E07328] bg-[#E07328]/10" : "border-white/[0.07] bg-[#131316] hover:border-white/20"
              }`}
            >
              <div className="text-xs uppercase tracking-wider text-white/45">{t.label}</div>
              <div className="text-3xl font-bold">{counts[t.key]}</div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search store, owner, email, subdomain or reference…"
            className="w-full max-w-md rounded-lg border border-white/10 bg-[#0c0c0c] px-3 py-2.5 text-sm text-[#f0ede8] outline-none placeholder:text-white/30 focus:border-[#E07328]"
          />
          <div className="text-sm text-white/50">
            {filtered.length} request{filtered.length === 1 ? "" : "s"} · BTN {totalShown.toLocaleString()}
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#131316]">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead className="border-b border-white/[0.07] bg-white/[0.02]">
              <tr>
                <th className={th}>Store</th>
                <th className={th}>Owner</th>
                <th className={th}>Amount</th>
                <th className={th}>Reference</th>
                <th className={th}>Submitted</th>
                <th className={th}>Store status</th>
                <th className={th}>Proof</th>
                <th className={th}>{tab === "PENDING" ? "Status" : "Review"}</th>
                {tab === "PENDING" && <th className={`${th} text-right`}>Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className={td}>
                    <div className="font-semibold">{p.storeOwner.storeName}</div>
                    <div className="text-xs text-white/40">{p.storeOwner.storeSubdomain ? `${p.storeOwner.storeSubdomain}.laso.la` : "—"}</div>
                  </td>

                  <td className={td}>
                    <div>{p.storeOwner.ownerName}</div>
                    <div className="text-xs text-white/40">{p.storeOwner.email}</div>
                  </td>

                  <td className={`${td} whitespace-nowrap`}>
                    <div className="font-semibold">BTN {Number(p.amount).toLocaleString()}</div>
                    <div className="text-xs text-white/40">{p.months} month{p.months > 1 ? "s" : ""}</div>
                  </td>

                  <td className={`${td} font-mono text-xs`}>{p.reference || <span className="text-white/30">—</span>}</td>

                  <td className={`${td} whitespace-nowrap text-xs text-white/70`}>{dateTime(p.createdAt)}</td>

                  <td className={`${td} whitespace-nowrap`}>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${STORE_STATE_STYLE[p.storeOwner.state]}`}>
                      {p.storeOwner.state.charAt(0) + p.storeOwner.state.slice(1).toLowerCase()}
                    </span>
                    <div className="mt-1 text-xs text-white/40">
                      {p.storeOwner.state === "EXPIRED" ? "Ended" : "Live until"} {date(p.storeOwner.accessEndsAt)}
                    </div>
                    <div className="text-xs text-white/30">Trial ends {date(p.storeOwner.trialEndsAt)}</div>
                  </td>

                  <td className={td}>
                    {p.screenshotUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.screenshotUrl}
                        alt="Payment screenshot"
                        onClick={() => setPreview(p.screenshotUrl)}
                        className="h-16 w-12 cursor-zoom-in rounded-md bg-black object-cover ring-1 ring-white/10 hover:ring-[#E07328]"
                      />
                    ) : (
                      <span className="text-xs text-white/30">Unavailable</span>
                    )}
                  </td>

                  <td className={td}>
                    <span className={`inline-block rounded-full border px-2 py-0.5 text-xs ${STATUS_STYLE[p.status]}`}>
                      {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                    </span>
                    {p.status === "APPROVED" && (
                      <div className="mt-1 text-xs text-white/40">
                        {date(p.periodStart)} → {date(p.periodEnd)}
                      </div>
                    )}
                    {p.status !== "PENDING" && <div className="text-xs text-white/30">on {dateTime(p.reviewedAt)}</div>}
                    {p.rejectReason && <div className="mt-1 max-w-[220px] text-xs text-red-300">“{p.rejectReason}”</div>}
                  </td>

                  {tab === "PENDING" && (
                    <td className={`${td} whitespace-nowrap text-right`}>
                      <button
                        disabled={busyId === p.id}
                        onClick={() => act(p.id, () => subscriptionServices.approve(p.id))}
                        className="mr-2 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500 disabled:opacity-50"
                      >
                        {busyId === p.id ? "…" : "Approve"}
                      </button>
                      <button
                        disabled={busyId === p.id}
                        onClick={() => { setRejecting(p); setReason(""); }}
                        className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={tab === "PENDING" ? 9 : 8} className="px-4 py-12 text-center text-white/40">
                    {query ? "No requests match your search." : `No ${tab.toLowerCase()} payments.`}
                  </td>
                </tr>
              )}
              {loading && rows.length === 0 && (
                <tr>
                  <td colSpan={tab === "PENDING" ? 9 : 8} className="px-4 py-12 text-center text-white/40">Loading…</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {preview && (
        <div onClick={() => setPreview(null)} className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Payment screenshot" className="max-h-full max-w-full object-contain" />
        </div>
      )}

      {rejecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131316] p-5">
            <h2 className="mb-1 text-lg font-semibold">Reject payment</h2>
            <p className="mb-3 text-sm text-white/50">
              {rejecting.storeOwner.storeName} · BTN {Number(rejecting.amount).toLocaleString()}. The owner will see this reason.
            </p>
            <textarea
              autoFocus
              value={reason}
              maxLength={300}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Amount doesn't match, screenshot unreadable…"
              rows={3}
              className="w-full resize-none rounded-lg border border-white/10 bg-[#0c0c0c] px-3 py-2.5 text-sm text-[#f0ede8] outline-none placeholder:text-white/30 focus:border-[#E07328]"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setRejecting(null)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/5">
                Cancel
              </button>
              <button
                disabled={reason.trim().length < 3}
                onClick={confirmReject}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Reject payment
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
