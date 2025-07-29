"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/superbase/server";
import { supabaseAdmin } from "../../../../utils/superbase/admin";

// import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("name") as string;
  const shopName = formData.get("shopName") as string;

  if (!email || !password || !fullName || !shopName) {
    return { error: "All fields are required" };
  }

  try {
    // Step 1: Create auth user (this will trigger user creation via database trigger)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      console.error("Error creating user:", authError);
      return { error: authError.message };
    }

    if (!authData.user) {
      return { error: "Failed to create user account" };
    }

    console.log("User created successfully with ID:", authData.user.id);

    // Step 2: Create the store
    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .insert({ name: shopName })
      .select("id")
      .single();

    if (storeError) {
      console.error("Error creating store:", storeError);
      return { error: "Failed to create store: " + storeError.message };
    }

    console.log("Store created successfully with ID:", storeData.id);

    console.log("checking payload store", storeData);
    console.log("check", authData);
    const { data, error } = await supabaseAdmin
      .from("users")
      .update({ store_id: storeData.id })
      .eq("email", authData.user.email)
      .select();

    if (error) {
      console.error("Failed to link user to store:", error);
      return { errorMessage: "Failed to link user to store: " + error };
    }
    console.log("response from store id update to user", data);
    return {
      success: true,
      user: authData.user,
      storeId: storeData.id,
    };
  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred during registration" };
  }
}
