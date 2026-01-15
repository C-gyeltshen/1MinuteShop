"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      console.error("Login error:", data);
      return { error: data.error || data.message || "Login failed" };
    }

    // 1. Get ALL cookies sent by Hono (AccessToken & RefreshToken)
    const setCookieHeaders = response.headers.getSetCookie();
    const cookieStore = await cookies();

    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieString) => {
        // Parse the individual cookie string (e.g., "accessToken=xyz; HttpOnly; Path=/")
        const [fullCookie] = cookieString.split(";");
        const [name, value] = fullCookie.split("=");

        // 2. Set each cookie into the Next.js cookie store
        cookieStore.set(name.trim(), value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // Note: If your Hono backend sets specific Max-Age,
          // you'd need a parser like 'cookie' to extract it perfectly.
        });
      });
    }

    console.log("Login successful. Cookies forwarded to browser.");

    revalidatePath("/", "layout");
    redirect("/shop/dashboard");
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
      }),
    });

    const text = await signupResponse.text();
    let signupData: SignupResponse;
    try {
      signupData = JSON.parse(text);
    } catch (e) {
      // Log or handle the unexpected response
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

    if (!loginResponse.ok) {
      // If auto-login fails, send them to manual login
      redirect("/login");
    }

    // Step 3: Extract and forward cookies (Access & Refresh Tokens)
    const setCookieHeaders = loginResponse.headers.getSetCookie();
    const cookieStore = await cookies();

    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieString) => {
        const [fullCookie] = cookieString.split(";");
        const [name, value] = fullCookie.split("=");

        cookieStore.set(name.trim(), value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      });
    }

    // Step 4: Finalize session
    revalidatePath("/", "layout");
    redirect("/shop/dashboard");
  } catch (error: any) {
    // Crucial: Let Next.js handle its own redirect "errors"
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred" };
  }
}
