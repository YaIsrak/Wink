import Nav from "@/components/layout/nav";
import StoreProvider from "@/components/provider/store-provider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Nav />
      <main className="container mx-auto min-h-screen max-w-screen-lg">
        {children}
      </main>
    </StoreProvider>
  );
}
