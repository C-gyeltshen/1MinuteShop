"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/superbase/server";

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

  // Get all required data from form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("name") as string;
  const shopName = formData.get("shopName") as string;

  // Validate required fields
  if (!email || !password || !fullName || !shopName) {
    return { error: "All fields are required" };
  }

  try {
    // Step 1: Create the auth user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
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
      .from('stores')
      .insert({ 
        name: shopName
      })
      .select('id')
      .single();

    if (storeError) {
      console.error("Error creating store:", storeError);
      // Consider cleanup: delete the auth user if store creation fails
      return { error: "Failed to create store: " + storeError.message };
    }

    console.log("Store created successfully with ID:", storeData.id);

    // Step 3: Wait for user record to be created by trigger
    // The trigger will automatically create the user with name from metadata
    let retries = 0;
    const maxRetries = 10;
    let userData = null;

    while (retries < maxRetries && !userData) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms
      
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();
      
      userData = data;
      retries++;
    }

    if (!userData) {
      console.error("User record not found after retries");
      return { error: "User profile creation failed" };
    }

    console.log("User data found, user_id:", userData.id);

    // Step 4: Update user with store_id (name should already be set by trigger)
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        store_id: storeData.id
      })
      .eq('id', authData.user.id);

    if (updateError) {
      console.error("Failed to link user to store:", updateError.message);
      console.error("Details:", updateError.details);
      console.error("Hint:", updateError.hint);
      console.error("Error updating user with store_id:", updateError);
      return { error: "Failed to link user to store: " + updateError.message };
    }

    console.log("Registration successful!");
    
    return { 
      success: true, 
      user: authData.user,
      storeId: storeData.id 
    };

  } catch (error) {
    console.error("Unexpected error during signup:", error);
    return { error: "An unexpected error occurred during registration" };
  }
}