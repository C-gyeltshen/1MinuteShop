'use client';

import Dashboard from "./(admin)/dashboard/page";
import { AuthProvider } from "./shared/store/authStore";

export default function HomePage (){
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  )
}