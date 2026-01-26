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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<StoreOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Store tokens in memory (or localStorage for persistence)
  const getStoredTokens = () => {
    if (typeof window === "undefined") return { accessToken: null, refreshToken: null };
    
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  };

  const storeTokens = (accessToken: string, refreshToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  const clearTokens = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { accessToken } = getStoredTokens();

        if (!accessToken) {
          setUser(null);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/store-owners/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.data);
          router.push("/store/dashboard");
        } else {
          clearTokens();
          setUser(null);
          router.push("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

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
      
      // Store tokens from response
      if (data.data) {
        setUser(data.data);
      }
      
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
      
      // Extract tokens from response if they're returned
      // Otherwise they'll be in cookies from the backend
      if (data.accessToken && data.refreshToken) {
        storeTokens(data.accessToken, data.refreshToken);
      }
      
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
      const { accessToken } = getStoredTokens();

      await fetch(`${API_URL}/store-owners/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      clearTokens();
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
      const { refreshToken } = getStoredTokens();

      if (!refreshToken) {
        setUser(null);
        return;
      }

      const res = await fetch(`${API_URL}/store-owners/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${refreshToken}`,
        },
      });

      if (!res.ok) {
        clearTokens();
        setUser(null);
        return;
      }

      const data = await res.json();
      
      // Update access token if returned
      if (data.accessToken) {
        const { refreshToken: rt } = getStoredTokens();
        storeTokens(data.accessToken, rt || "");
      }
      
      setUser(data.data);
    } catch (err) {
      console.error("Token refresh failed:", err);
      clearTokens();
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