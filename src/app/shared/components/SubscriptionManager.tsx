"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "@/app/shared/store/authStore";
import {
  subscriptionServices,
  SubscriptionPayment,
  SubscriptionStatus,
} from "@/app/shared/services/subscriptionServices";

const card = "bg-[#131316] border border-white/[0.07] rounded-[18px] p-5";
const field =
  "w-full bg-[#0c0c0c] text-[#f0ede8] placeholder:text-white/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#E07328] [color-scheme:dark]";
const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const fmtSize = (b: number) => (b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const fmt = (d: string) => new Date(d).toLocaleDateString(undefined, { dateStyle: "medium" });

const STATUS_STYLE: Record<string, string> = {
  PENDING: "text-yellow-300 bg-yellow-400/10",
  APPROVED: "text-green-300 bg-green-400/10",
  REJECTED: "text-red-300 bg-red-400/10",
};

export default function SubscriptionManager() {
  const auth = useContext(AuthContext);
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [payments, setPayments] = useState<SubscriptionPayment[]>([]);
  const [months, setMonths] = useState(1);
  const [reference, setReference] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = (f: File | null | undefined) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) return setError("Please choose a JPEG, PNG, WEBP or AVIF image");
    if (f.size > MAX_BYTES) return setError("Screenshot must be smaller than 5 MB");
    setError(null);
    setFile(f);
  };

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

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
      if (inputRef.current) inputRef.current.value = "";
      setReference("");
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const headline = !status
    ? "Loading…"
    : status.state === "TRIALING"
      ? `Free trial — ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"} left`
      : status.state === "ACTIVE"
        ? `Active — ${status.daysLeft} day${status.daysLeft === 1 ? "" : "s"} left`
        : "Expired — your store is paused";

  return (
    <div className="flex flex-col gap-5 text-[#f0ede8] font-space-grotesk">

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
            <form onSubmit={submit} className="flex flex-col gap-5">
              <label className="text-sm flex flex-col gap-1.5 text-[rgba(240,237,232,0.7)]">
                Months
                <select value={months} onChange={(e) => setMonths(Number(e.target.value))} className={field}>
                  {[1, 3, 6, 12].map((m) => (
                    <option key={m} value={m}>
                      {m} month{m > 1 ? "s" : ""} — BTN {(status?.monthlyPrice ?? 99) * m}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm flex flex-col gap-1.5 text-[rgba(240,237,232,0.7)]">
                Transaction / journal number <span className="text-white/30">(optional)</span>
                <input
                  value={reference}
                  maxLength={100}
                  placeholder="e.g. 20260312345"
                  onChange={(e) => setReference(e.target.value)}
                  className={field}
                />
              </label>

              <div className="text-sm flex flex-col gap-1.5 text-[rgba(240,237,232,0.7)]">
                Payment screenshot
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED.join(",")}
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0])}
                />

                {file && preview ? (
                  <div className="flex items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/[0.06] p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Selected screenshot" className="h-20 w-20 shrink-0 rounded-lg object-cover bg-black" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-green-300 font-medium">
                        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth={2}><path d="M2 6l3 3 5-5" /></svg>
                        Screenshot attached
                      </div>
                      <div className="truncate text-[#f0ede8]">{file.name}</div>
                      <div className="text-xs text-white/40">{fmtSize(file.size)}</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button type="button" onClick={() => inputRef.current?.click()} className="rounded-md border border-white/15 px-2.5 py-1 text-xs text-[#f0ede8] hover:bg-white/5">
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ""; }}
                        className="rounded-md border border-red-500/30 px-2.5 py-1 text-xs text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }}
                    className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
                      dragging ? "border-[#E07328] bg-[#E07328]/10" : "border-white/15 hover:border-[#E07328]/60 hover:bg-white/[0.03]"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-[#E07328]" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 16V4m0 0L7 9m5-5l5 5M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" />
                    </svg>
                    <span className="text-[#f0ede8] font-medium">Click to upload or drag &amp; drop</span>
                    <span className="text-xs text-white/40">JPEG, PNG, WEBP or AVIF · up to 5 MB</span>
                  </button>
                )}
              </div>

              <button
                disabled={submitting || !file}
                className="rounded-xl bg-[#E07328] py-3 font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Submitting…" : file ? "Submit payment" : "Attach a screenshot to continue"}
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
  );
}
