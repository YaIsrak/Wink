import Nav from "@/components/layout/nav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="container mx-auto min-h-screen max-w-screen-lg">
        {children}
      </main>
    </>
  );
}
