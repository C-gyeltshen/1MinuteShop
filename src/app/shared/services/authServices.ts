import { redirect } from "next/navigation";

interface SignupResponse {
  data?: {
    id: string;
    email: string;
    name: string;
    storeId: string;
  };
  message?: string;
  error?: string;
}

interface LoginResponse {
  data?: {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  };
  message?: string;
  error?: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/store-owners/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.data?.accessToken;
      if (token) {
        let accessToken = localStorage.getItem('accessToken');
        console.log("old access token", accessToken)
        localStorage.removeItem("accessToken");
        console.log("deleted old token")
        localStorage.setItem("accessToken", token);
        globalThis.location.href = "/store/dashboard"; // redirect() doesn't work the same here
      }else{
        console.error("Login error:", data);
      return { error: data.error || data.message || "Login failed" };
      }
    }
    console.log("Login successful. JWT token stored in local Storage");

    redirect("/store/dashboard");
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error("Unexpected error during login:", error);
    return { error: "An unexpected error occurred during login" };
  }
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const ownerName = formData.get("ownerName") as string;
  const storeName = formData.get("storeName") as string;
  const status = formData.get("status") as string;

  if (!email || !password || !ownerName || !storeName) {
    return { error: "All fields are required" };
  }

  try {
    // Step 1: Register the user
    const signupResponse = await fetch(`${BACKEND_URL}/store-owners/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        ownerName,
        storeName,
        status,
      }),
    });

    const text = await signupResponse.text();
    let signupData: SignupResponse;
    try {
      signupData = JSON.parse(text);
    } catch (e) {
      // FIX S2486: Handle the logic and log the actual error object
      console.error("Failed to parse signup response JSON:", e);
      return { error: "Unexpected server response: " + text };
    }

    if (!signupResponse.ok) {
      return { error: signupData.error || "Signup failed" };
    }

    // Step 2: Auto-login the user
    const loginResponse = await fetch(`${BACKEND_URL}/store-owners/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginResponse.ok) {
      const data = await loginResponse.json();
      const token = data.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        globalThis.location.href = "/store/dashboard"; // redirect() doesn't work the same here
      }else{
        console.error("Login error:", data);
        redirect("/login");
      return { error: data.error || data.message || "Login failed" };
      }
    }

    redirect("/store/dashboard");
  } catch (error: any) {
    // Crucial: Let Next.js handle its own redirect "errors"
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred" };
  }
}
