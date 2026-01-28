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

      let accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      let response = await fetch(`${API_BASE_URL}/store-owners/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        const refreshRes = await fetch(`${API_BASE_URL}/store-owners/refresh`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          // Adjust this if your refresh endpoint structure is different
          if (refreshData.accessToken) {
            localStorage.setItem("accessToken", refreshData.accessToken);
            accessToken = refreshData.accessToken;
          }

          response = await fetch(`${API_BASE_URL}/store-owners/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          });
        }
      }

      if (response.ok) {
        const resData = await response.json();
        // FIX: Access user data from resData.data instead of resData.user
        const userData = resData.data || resData.user; 
        
        setUser(userData);
        console.log("User authenticated:");
      } else {
        localStorage.removeItem("accessToken");
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNumber,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Registration failed");
        }

        await login(phoneNumber, password);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const login = useCallback(async (phoneNumber: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/store-owners/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Login failed");
      }

      // Store Access Token
      if (resData.accessToken) {
        localStorage.setItem("accessToken", resData.accessToken);
      } else if (resData.data?.accessToken) {
         // handle case where token is inside data object
         localStorage.setItem("accessToken", resData.data.accessToken);
      }

      // FIX: Access user data correctly
      const userData = resData.data || resData.user;
      setUser(userData);
      
      console.log("Login successful:", userData?.email || userData?.ownerName);
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
      const accessToken = localStorage.getItem("accessToken");
      localStorage.removeItem("accessToken");

      await fetch(`${API_BASE_URL}/store-owners/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        },
      });

      setUser(null);
      router.push("/dashboard");
    } catch (err) {
      setUser(null); 
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
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