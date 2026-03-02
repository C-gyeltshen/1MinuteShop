import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "@/app/shared/store/authStore";
import { Order } from "../components/Types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const useOrders = () => {
  const auth = useContext(AuthContext);
  const storeOwnerId = auth?.user?.id;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!storeOwnerId) return;

    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(`${API_BASE}/orders/${storeOwnerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch orders: ${res.statusText}`);

      const json = await res.json();

      if (json.success) {
        setOrders(json.data);
      } else {
        throw new Error(json.message || "Failed to load orders");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [storeOwnerId]);

  // PATCH /orders/:orderId/status
  const updateOrderStatus = useCallback(
    async (orderId: string, orderStatus: string) => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus }),
        });

        if (!res.ok) throw new Error("Failed to update order status");
        await fetchOrders();
      } catch (err: any) {
        setError(err.message);
        throw err; // re-throw so the confirm dialog knows it failed
      }
    },
    [fetchOrders]
  );

  // PATCH /orders/:orderId/payment-status
  const updatePaymentStatus = useCallback(
    async (orderId: string, paymentStatus: string) => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(`${API_BASE}/orders/${orderId}/payment-status`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentStatus }),
        });

        if (!res.ok) throw new Error("Failed to update payment status");
        await fetchOrders();
      } catch (err: any) {
        setError(err.message);
        throw err; // re-throw so the confirm dialog knows it failed
      }
    },
    [fetchOrders]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    updateOrderStatus,
    updatePaymentStatus,
  };
};