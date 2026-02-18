"use client";

import CartDrawer from "../components/Cartdrawer";
import { CartProvider } from "../context/Cartcontext ";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}