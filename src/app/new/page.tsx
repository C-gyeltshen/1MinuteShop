"use client";
import React from "react";
// Import the new hook
import { useCurrentUser } from "@/app/shared/store/authStore";

const MyComponent = () => {
  // 1. Call the function to get the data
  const user = useCurrentUser();
  console.log(user?.id)

  // 2. Handle the case where user might not be loaded yet
  if (!user) {
    return <div>Loading or not logged in...</div>;
  }

  // 3. Use the data directly
  return (
    <div>
      <h1>Welcome, {user.ownerName}!</h1>
      <p>Store: {user.storeName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default MyComponent;