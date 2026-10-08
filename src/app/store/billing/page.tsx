"use client";
import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/shared/store/authStore";
import SubscriptionManager from "@/app/shared/components/SubscriptionManager";

export default function BillingPage() {
  const auth = useContext(AuthContext);

  if (auth && !auth.isLoading && !auth.isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#080808] text-[#f0ede8] flex items-center justify-center">
        <Link href="/login" className="underline">Log in to manage your subscription</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-[#f0ede8] font-space-grotesk px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <Link href="/store/dashboard" className="text-sm text-[rgba(240,237,232,0.5)] hover:text-white">← Back to dashboard</Link>
        <h1 className="text-2xl font-bold">Subscription</h1>
        <SubscriptionManager />
      </div>
    </main>
  );
}
