"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 15 * 60 * 1000;

interface TelegramStatus {
  available: boolean;
  connected: boolean;
  notificationsEnabled: boolean;
}

const jsonHeaders = { "Content-Type": "application/json" };

const BTN = "px-4 py-2 rounded-[10px] text-[12.5px] font-semibold font-space-grotesk transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export default function TelegramCard() {
  const [status, setStatus] = useState<TelegramStatus | null>(null);
  const [linking, setLinking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = null;
    setLinking(false);
  }, []);

  const loadStatus = useCallback(async (): Promise<TelegramStatus | null> => {
    try {
      const res = await fetch(`${API_BASE}/telegram/status`, { credentials: "include", headers: jsonHeaders });
      if (!res.ok) return null;
      const json = await res.json();
      setStatus(json.data);
      return json.data;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    loadStatus();
    return stopPolling;
  }, [loadStatus, stopPolling]);

  const call = async (path: string, method: string, body?: unknown, okText?: string) => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE}/telegram${path}`, {
        method,
        credentials: "include",
        headers: jsonHeaders,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.message || "Something went wrong");
      if (okText) setMessage({ type: "success", text: okText });
      return json;
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Something went wrong" });
      return null;
    } finally {
      setBusy(false);
    }
  };

  const handleConnect = async () => {
    const json = await call("/link", "POST");
    if (!json) return;

    window.open(json.data.url, "_blank", "noopener,noreferrer");
    setLinking(true);

    // The owner taps Start in Telegram; poll until the webhook has saved the chat
    const startedAt = Date.now();
    pollRef.current = setInterval(async () => {
      const latest = await loadStatus();
      if (latest?.connected) {
        stopPolling();
        setMessage({ type: "success", text: "Telegram connected" });
      } else if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
        stopPolling();
        setMessage({ type: "error", text: "The link expired. Tap Connect to try again." });
      }
    }, POLL_INTERVAL_MS);
  };

  const handleToggle = async () => {
    if (!status) return;
    const json = await call("/settings", "PATCH", { enabled: !status.notificationsEnabled });
    if (json) await loadStatus();
  };

  const handleDisconnect = async () => {
    const json = await call("/connection", "DELETE", undefined, "Telegram disconnected");
    if (json) await loadStatus();
  };

  const enabled = status?.notificationsEnabled ?? false;

  return (
    <div className="bg-[#131316] border border-white/[0.07] rounded-[18px] p-6">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-[16px] font-bold text-[#F0EDE8] font-space-grotesk mb-1 flex items-center gap-2">
            <Send size={15} className="text-[#60A5FA]" />
            Telegram notifications
          </h2>
          <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk">
            Get a Telegram message the moment a customer places an order
          </p>
        </div>
        {status?.connected && (
          <span className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold font-space-grotesk bg-emerald-500/10 text-emerald-400">
            Connected
          </span>
        )}
      </div>

      {status && !status.available && (
        <p className="text-[12.5px] text-[#F0EDE8]/46 font-space-grotesk">
          Telegram notifications aren&apos;t available yet. Please check back soon.
        </p>
      )}

      {status?.available && !status.connected && (
        <div className="space-y-3">
          <p className="text-[12.5px] text-[#F0EDE8]/58 font-space-grotesk">
            Tap Connect, then press <span className="font-semibold">Start</span> in the Telegram chat that opens.
          </p>
          <button
            onClick={handleConnect}
            disabled={busy || linking}
            className={`${BTN} text-white`}
            style={{ background: "#E07328" }}
          >
            {linking ? "Waiting for Telegram…" : "Connect Telegram"}
          </button>
        </div>
      )}

      {status?.connected && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/[0.06] rounded-[12px]">
            <div>
              <p className="text-[13px] font-semibold text-[#F0EDE8] font-space-grotesk">New order alerts</p>
              <p className="text-[11.5px] text-[#F0EDE8]/46 font-space-grotesk mt-0.5">
                Send a message for every new order
              </p>
            </div>
            <button
              onClick={handleToggle}
              disabled={busy}
              className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
              style={{ background: enabled ? "#E07328" : "rgba(255,255,255,0.12)" }}
              aria-label="Toggle Telegram notifications"
              aria-pressed={enabled}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200"
                style={{ left: enabled ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => call("/test", "POST", undefined, "Test message sent, check Telegram")}
              disabled={busy}
              className={`${BTN} border border-white/[0.08] text-[#F0EDE8]/72 hover:bg-white/[0.06]`}
            >
              Send test message
            </button>
            <button
              onClick={handleDisconnect}
              disabled={busy}
              className={`${BTN} border border-red-500/30 text-red-400 hover:bg-red-500/10`}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {message && (
        <p
          role="status"
          className={`mt-4 text-[12.5px] font-space-grotesk ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
