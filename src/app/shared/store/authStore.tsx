"use client";

import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface StoreOwner {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: StoreOwner | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<StoreOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      // 1. EXIT EARLY: If we already have a user, don't fetch again
      if (user) {
        setLoading(false);
        return;
      }

      const accessToken = localStorage.getItem("accessToken");

      // 2. EXIT EARLY: If there is no token, don't even bother calling the API
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/store-owners/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
          // Only redirect if they are currently on the login page
          if (window.location.pathname === "/login") {
            router.push("/store/dashboard");
          }
        } else {
          // If the token is invalid/expired, clear it
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user, router]); // Dependency array includes 'user' to handle state changes safely

  const logout = async () => {
    try {
      setError(null);
      const accessToken = localStorage.getItem("accessToken");

      await fetch(`${API_URL}/store-owners/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      });

      // Clear token from localstorage
      localStorage.removeItem("accessToken");
      setUser(null);
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setError(message);
      throw err;
    }
  };

  const refreshAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/store-owners/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.data);
    } catch (err) {
      console.error("Token refresh failed:", err);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,

    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
function getCookie(arg0: string) {
  throw new Error("Function not implemented.");
}
