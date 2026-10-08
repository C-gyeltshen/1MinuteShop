"use client";
import { useEffect, useState } from "react";
import {
  paymentAccountServices,
  type PaymentAccount,
} from "@/app/shared/services/paymentAccountServices";

// Customer-side: the store's payment account. `account === null` once loaded means
// the store is not accepting orders yet.
export function useStorePaymentAccount() {
  const [account, setAccount] = useState<PaymentAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const subdomain = globalThis.location.hostname.split(".")[0];
    paymentAccountServices
      .getPublic(subdomain)
      .then(setAccount)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load payment details"))
      .finally(() => setLoading(false));
  }, []);

  return { account, loading, error, acceptingOrders: loading || error ? undefined : account !== null };
}
