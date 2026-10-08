import { getBank } from "../banks";

// Logo on a white tile so it reads on both the dark dashboard and the light storefront.
export default function BankLogo({ code, size = 36 }: { code?: string; size?: number }) {
  const bank = getBank(code);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white"
      style={{ width: size, height: size, padding: size * 0.1 }}
    >
      {bank && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bank.logo} alt={bank.name} className="max-h-full max-w-full object-contain" />
      )}
    </span>
  );
}
