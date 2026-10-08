"use client";

interface Props {
  onAdd: () => void;
}

export default function PaymentAccountBanner({ onAdd }: Props) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      <span>
        Your store isn&apos;t accepting orders yet. Add the bank account where customers should send payment.
      </span>
      <button
        onClick={onAdd}
        className="rounded-lg bg-[#E07328] px-3 py-1.5 font-semibold text-white hover:bg-[#f07d30]"
      >
        Add payment account
      </button>
    </div>
  );
}
