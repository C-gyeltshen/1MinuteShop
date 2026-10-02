"use client";
import Link from "next/link";
import { SubscriptionInfo } from "@/app/shared/store/authStore";

interface Props {
  subscription?: SubscriptionInfo;
  isAdmin?: boolean;
}

export default function SubscriptionBanner({ subscription, isAdmin }: Props) {
  if (!subscription && !isAdmin) return null;

  const expired = subscription && !subscription.hasAccess;
  const endingSoon = subscription?.state === "TRIALING" || (subscription?.state === "ACTIVE" && subscription.daysLeft <= 7);

  return (
    <div className="flex flex-col gap-3 mb-5">
      {isAdmin && (
        <Link
          href="/admin/subscriptions"
          className="rounded-xl border border-white/[0.07] bg-[#131316] px-4 py-3 text-sm text-[#f0ede8] hover:border-[#E07328]/40"
        >
          Admin: review subscription payments →
        </Link>
      )}

      {subscription && (expired || endingSoon) && (
        <div
          className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm ${
            expired
              ? "border-red-500/30 bg-red-500/10 text-red-200"
              : "border-[#E07328]/30 bg-[#E07328]/10 text-[#f0ede8]"
          }`}
        >
          <span>
            {expired
              ? "Your trial has ended and your store is paused. Subscribe to bring it back online."
              : subscription.state === "TRIALING"
                ? `Free trial: ${subscription.daysLeft} day${subscription.daysLeft === 1 ? "" : "s"} left.`
                : `Subscription ends in ${subscription.daysLeft} day${subscription.daysLeft === 1 ? "" : "s"}.`}
          </span>
          <Link
            href="/store/billing"
            className="rounded-lg bg-[#E07328] px-3 py-1.5 font-semibold text-white hover:bg-[#f07d30]"
          >
            {expired ? "Subscribe now" : "Manage subscription"}
          </Link>
        </div>
      )}
    </div>
  );
}
