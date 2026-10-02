"use client";

import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// FIX: Updated User interface to match your API response
export interface User {
  id: string;
  ownerName: string; // Changed from name
  email: string;     // Changed from phoneNumber
  storeName?: string;
  storeSubdomain?: string;
  storeUrl?: string;
  storeURL?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  register: (
    name: string,
    phoneNumber: string,
    password: string,
  ) => Promise<void>;
  login: (phoneNumber: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const normalizeUser = (userData: User | null | undefined): User | null => {
  if (!userData) return null;

  return {
    ...userData,
    storeUrl: userData.storeURL ?? userData.storeUrl,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let response = await fetch(`${API_BASE_URL}/store-owners/me`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 401) {
        const refreshRes = await fetch(`${API_BASE_URL}/store-owners/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (refreshRes.ok) {
          response = await fetch(`${API_BASE_URL}/store-owners/me`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      if (response.ok) {
        const resData = await response.json();
        const userData = normalizeUser(resData.data || resData.user);
        setUser(userData);
      } else {
        setUser(null);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(
    async (name: string, phoneNumber: string, password: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/store-owners/register`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phoneNumber, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Registration failed");
        }

        const userData = normalizeUser(data.data?.user || data.user);
        setUser(userData);
        router.push("/store/dashboard");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const login = useCallback(async (phoneNumber: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/store-owners/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Login failed");
      }

      const userData = normalizeUser(resData.data?.user || resData.data || resData.user);
      setUser(userData);
      router.push("/store/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetch(`${API_BASE_URL}/store-owners/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push("/dashboard");
    }
  }, [router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    register,
    login,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};
