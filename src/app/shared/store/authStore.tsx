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
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

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
      try {
        const res = await fetch(`${API_URL}/store-owners/me`, {
          method: "GET",
          credentials: "include", // Include httpOnly cookies
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
        } else {
          setUser(null);
          router.push('/login')
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/store-owners/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await res.json();
      setUser(data.data);
      router.push("/shop");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed";
      setError(message);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/store-owners/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();
      setUser(data.data);
      router.push("/shop");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await fetch(`${API_URL}/store-owners/logout`, {
        method: "POST",
        credentials: "include",
      });

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
    register,
    login,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
