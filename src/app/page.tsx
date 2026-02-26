"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./shared/store/authStore";
import Dashboard from "./(admin)/dashboard/page";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth check is done and we HAVE a user, send them to the dashboard
    if (!isLoading && user) {
      router.push("/store/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="loading-screen"></div>;

  return <Dashboard />;
}
