import { redirect } from "next/navigation";

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
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || data.message || "Login failed" };
    }

    globalThis.location.href = "/store/dashboard";
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
    const signupResponse = await fetch(`${BACKEND_URL}/store-owners/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, ownerName, storeName, status }),
    });

    const text = await signupResponse.text();
    let signupData: { error?: string };
    try {
      signupData = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse signup response JSON:", e);
      return { error: "Unexpected server response: " + text };
    }

    if (!signupResponse.ok) {
      return { error: signupData.error || "Signup failed" };
    }

    // Cookie is already set by the register endpoint (auto-login included)
    globalThis.location.href = "/store/success";
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred" };
  }
}
