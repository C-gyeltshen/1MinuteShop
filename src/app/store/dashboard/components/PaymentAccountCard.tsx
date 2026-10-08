"use client";
import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Landmark } from "lucide-react";
import BankLogo from "@/app/shared/components/BankLogo";
import { BANKS, getBank, type BankCode } from "@/app/shared/banks";
import {
  paymentAccountServices,
  type PaymentAccount,
} from "@/app/shared/services/paymentAccountServices";

const FIELD = "w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-[8px] text-[13px] text-[#F0EDE8] font-space-grotesk outline-none transition-colors placeholder:text-[#F0EDE8]/20 focus:border-brand-orange/60";
const LABEL = "block text-[11px] font-semibold uppercase tracking-[0.07em] text-[#F0EDE8]/34 font-space-grotesk mb-2";

interface Props {
  account: PaymentAccount | null;
  loaded: boolean;
  onSaved: (account: PaymentAccount) => void;
}

export default function PaymentAccountCard({ account, loaded, onSaved }: Props) {
  const [bank, setBank] = useState<BankCode | "">("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Fill the form once the saved account arrives
  useEffect(() => {
    if (!account) return;
    setBank(account.bank);
    setAccountNumber(account.accountNumber);
    setAccountName(account.accountName);
  }, [account]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = getBank(bank);

  const handleSave = async () => {
    setStatus(null);
    if (!bank) return setStatus({ type: "error", message: "Please select your bank" });
    if (!/^\d{6,20}$/.test(accountNumber.replace(/[\s-]/g, "")))
      return setStatus({ type: "error", message: "Account number must be 6-20 digits" });
    if (accountName.trim().length < 2)
      return setStatus({ type: "error", message: "Please enter the account holder name" });

    setSaving(true);
    try {
      const saved = await paymentAccountServices.save({ bank, accountNumber, accountName });
      onSaved(saved);
      setStatus({ type: "success", message: "Payment account saved" });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div id="payment-account" className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-6">
      <div className="flex items-center gap-2 mb-1">
        <Landmark size={16} className="text-brand-orange" />
        <h2 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk">Payment account</h2>
      </div>
      <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk mb-6">
        Customers transfer their payment to this account at checkout. Your store can&apos;t take orders until it&apos;s added.
      </p>

      {loaded && !account && (
        <div className="mb-5 rounded-[10px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-[12.5px] text-red-200 font-space-grotesk">
          No payment account yet — your store is not accepting orders.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Bank dropdown */}
        <div ref={wrapRef} className="relative sm:col-span-2">
          <label className={LABEL} id="bank-label">Bank</label>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby="bank-label"
            onClick={() => setOpen((v) => !v)}
            className={`${FIELD} flex items-center gap-3 text-left`}
          >
            {selected ? (
              <>
                <BankLogo code={selected.code} size={30} />
                <span className="flex-1">{selected.name}</span>
              </>
            ) : (
              <span className="flex-1 text-[#F0EDE8]/30">Select your bank</span>
            )}
            <ChevronDown size={16} className={`text-[#F0EDE8]/46 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <ul
              role="listbox"
              aria-labelledby="bank-label"
              className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-[10px] border border-white/[0.1] bg-[#1a1a1e] shadow-xl"
            >
              {BANKS.map((b) => (
                <li
                  key={b.code}
                  role="option"
                  aria-selected={bank === b.code}
                  onClick={() => {
                    setBank(b.code);
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-[13px] text-[#F0EDE8] font-space-grotesk hover:bg-white/[0.06]"
                >
                  <BankLogo code={b.code} size={30} />
                  <span className="flex-1">{b.name}</span>
                  {bank === b.code && <Check size={14} className="text-brand-orange" />}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className={LABEL} htmlFor="account-number">Account number</label>
          <input
            id="account-number"
            inputMode="numeric"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g. 200123456"
            className={FIELD}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="account-name">Account holder name</label>
          <input
            id="account-name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Name as on the account"
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {status && (
          <span
            role="status"
            className={`text-[12.5px] font-space-grotesk ${status.type === "success" ? "text-emerald-400" : "text-red-400"}`}
          >
            {status.message}
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded-[10px] text-[12.5px] font-semibold font-space-grotesk bg-brand-orange text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving…" : account ? "Update account" : "Save account"}
        </button>
      </div>
    </div>
  );
}
