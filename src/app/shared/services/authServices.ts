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

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await fetch(
      "http://localhost:8080/api/store-owners/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

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
  const ownerName = formData.get("name") as string;
  const storeName = formData.get("storeName") as string;

  if (!email || !password || !ownerName || !storeName) {
    return { error: "All fields are required" };
  }

  try {
    // Step 1: Register the user
    const signupResponse = await fetch(
      "http://localhost:8080/api/store-owners/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          ownerName: ownerName,
          storeName: storeName,
        }),
      }
    );

    const signupData: SignupResponse = await signupResponse.json();

    if (!signupResponse.ok) {
      console.error("Signup error:", signupData);
      return {
        error: signupData.error || signupData.message || "Signup failed",
      };
    }

    console.log("User and store created successfully:", signupData);

    // Step 2: Auto-login the user after successful signup
    try {
      const loginResponse = await fetch(
        "http://localhost:8080/api/store-owners/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const loginData: LoginResponse = await loginResponse.json();

      if (!loginResponse.ok) {
        console.error("Auto-login error:", loginData);
        // Don't return error, user can login manually
        // Just redirect to login page
        redirect("/login");
      }

      console.log("Auto-login successful:", loginData);

      // Step 3: Revalidate cache and redirect to dashboard
      revalidatePath("/", "layout");
      redirect("/shop/dashboard");
    } catch (loginError: any) {
      if (loginError?.digest?.startsWith("NEXT_REDIRECT")) throw loginError;
      console.error("Auto-login failed:", loginError);
      // If auto-login fails, redirect to login page
      redirect("/login");
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred during registration" };
  }
}
