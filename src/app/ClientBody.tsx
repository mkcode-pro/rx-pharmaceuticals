"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { CartProvider } from "@/lib/cart-context";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <CartProvider>
      <div className="antialiased overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        <main className="min-h-[calc(100vh-120px)] pt-16 md:pt-[72px] pb-14 md:pb-0 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </CartProvider>
  );
}
