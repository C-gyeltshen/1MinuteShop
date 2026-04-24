"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./shared/store/authStore";
import LandingPage from "./LandingPage";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/store/dashboard");
    }
  }, [user, isLoading, router]);

  // Show a minimal loading state while auth hydrates
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-[#E07328] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in — show the landing page
  if (!user) {
    return <LandingPage />;
  }

  // Logged in — redirect handled by useEffect above; return null in the meantime
  return null;
}
