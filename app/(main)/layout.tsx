import Nav from "@/components/layout/nav";
import React, { Suspense } from "react";
import Loading from "./(routes)/loading";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <Nav />
      <main className="container mx-auto min-h-screen max-w-screen-lg">
        {children}
      </main>
    </Suspense>
  );
}
